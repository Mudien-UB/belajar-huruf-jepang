import {
    HiraganaData,
    ExampleWordsData,
    HiraganaCharacter,
    ExampleWord,
    HiraganaType,
    SambungCocokQuiz
} from '@/type/hiragana';

export async function getHiragana(type?: HiraganaType): Promise<HiraganaData | HiraganaCharacter[][]> {
  const response = await fetch('/data/hiragana.json');
  if (!response.ok) throw new Error('Failed to fetch hiragana');
  const data: HiraganaData = await response.json();
  if (type && data[type]) return data[type];
  return data;
}

export async function getExampleWords(char?: string): Promise<ExampleWordsData | ExampleWord[]> {
  const response = await fetch('/data/hiragana-example-words.json');
  if (!response.ok) throw new Error('Failed to fetch examples');
  const data: ExampleWordsData = await response.json();
  if (char && data[char]) return data[char];
  return data;
}

export async function getCharactersByLevel(level: number): Promise<HiraganaCharacter[]> {
  const data = (await getHiragana()) as HiraganaData;
  const activeChars: HiraganaCharacter[] = [];

  const getBasicSet = (lv: number) => {
    if (lv >= 3) return data.basic;
    if (lv === 2) return data.basic.slice(0, 4);
    return data.basic.slice(0, 2);
  };

  const getDakutenSet = (lv: number) => {
    if (lv >= 5) return data.dakuten;
    if (lv === 4) return data.dakuten.slice(0, 2);
    return [];
  };

  const getHandakutenSet = (lv: number) => {
    return lv >= 6 ? data.handakuten : [];
  };

  const getYoonSet = (lv: number) => {
    if (lv >= 9) return data.yoon;
    if (lv === 8) return data.yoon.slice(0, 8);
    if (lv === 7) return data.yoon.slice(0, 4);
    return [];
  };

  const sets = [
    ...getBasicSet(level),
    ...getDakutenSet(level),
    ...getHandakutenSet(level),
    ...getYoonSet(level),
  ];

  sets.forEach((set) => activeChars.push(...set));
  return activeChars;
}

export async function getWordsByLevel(level: number): Promise<ExampleWord[]> {
  const activeChars = await getCharactersByLevel(level);
  const activeCharStrings = new Set(activeChars.map((char) => char.character));
  const allWordsData = (await getExampleWords()) as ExampleWordsData;

  const filteredWords: ExampleWord[] = [];

  // Flatten words from all characters
  Object.values(allWordsData).forEach((wordList) => {
    wordList.forEach((word) => {
      // Check if all characters in the word are in the active pool
      const isWordLearnable = [...word.word].every((char) =>
        activeCharStrings.has(char)
      );

      if (isWordLearnable) {
        filteredWords.push(word);
      }
    });
  });

  return filteredWords;
}
function distributeItems<T>(items: T[], itemsPerSession: number): T[][] {
    if (items.length === 0) return [];

    const sessions: T[][] = [];

    // Create at most 3 sessions
    for (let i = 0; i < 3; i++) {
        const start = i * itemsPerSession;
        const end = start + itemsPerSession;

        // Only add if we have enough items for a full session
        if (items.length >= end) {
            sessions.push(items.slice(start, end));
        } else {
            break;
        }
    }

    return sessions;
}

export async function getQuizCharacters(level: number, itemsPerSession: number = 6): Promise<HiraganaCharacter[][]> {
    const data = await getCharactersByLevel(level);

    // Shuffle and pick enough items for 3 sessions of `itemsPerSession`
    const maxTotalItems = itemsPerSession * 3;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, maxTotalItems);

    return distributeItems(selected, itemsPerSession);
}

export async function getQuizWords(level: number, itemsPerSession: number = 6): Promise<ExampleWord[][]> {
    const data = await getWordsByLevel(level);

    // Shuffle and pick enough items for 3 sessions of `itemsPerSession`
    const maxTotalItems = itemsPerSession * 3;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, maxTotalItems);

    return distributeItems(selected, itemsPerSession);
}

export async function getSambungCocokQuiz(level: number, length: number): Promise<SambungCocokQuiz[]> {
    const chars = await getCharactersByLevel(level);
    const quizPairs: SambungCocokQuiz[] = [];
    const usedCombinations = new Set<string>();
    const charUsageCount: Record<string, number> = {};

    // Helper untuk membuat kata dari karakter acak
    const generatePair = (): SambungCocokQuiz | null => {

        // Coba buat kata unik
        for (let attempt = 0; attempt < 50; attempt++) {
            const tempChars: string[] = [];
            let tempWord = "";
            let tempReading = "";

            for (let i = 0; i < length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                tempWord += char.character;
                tempReading += char.romaji;
                tempChars.push(char.character);
            }

            const combo = tempWord + "-" + tempReading;

            // Cek keunikan kombinasi
            if (usedCombinations.has(combo)) continue;

            // Cek batasan penggunaan huruf yang sama (max 3 kombinasi dalam sesi)
            let canUse = true;
            for (const char of tempChars) {
                if ((charUsageCount[char] || 0) >= 3) {
                    canUse = false;
                    break;
                }
            }

            if (canUse) {
                usedCombinations.add(combo);
                for (const char of tempChars) {
                    charUsageCount[char] = (charUsageCount[char] || 0) + 1;
                }
                return { word: tempWord, romaji: tempReading };
            }
        }
        return null;
    };

    while (quizPairs.length < 5) {
        const pair = generatePair();
        if (pair) {
            quizPairs.push(pair);
        } else {
            break;
        }
    }

    return quizPairs;
}

import { HiraganaData, ExampleWordsData, HiraganaCharacter, ExampleWord, HiraganaType } from '@/type/hiragana';

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

export async function getQuizCharacters(level: number, itemsPerSession: number = 5): Promise<HiraganaCharacter[][]> {
    const data = await getCharactersByLevel(level);
    
    // Shuffle and pick 15 items total (3 sessions * 5 items)
    const totalItems = itemsPerSession * 3;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, totalItems);
    
    // Distribute into 3 sessions
    return [
        selected.slice(0, itemsPerSession),
        selected.slice(itemsPerSession, itemsPerSession * 2),
        selected.slice(itemsPerSession * 2, itemsPerSession * 3),
    ];
}

export async function getQuizWords(level: number, itemsPerSession: number = 5): Promise<ExampleWord[][]> {
    const data = await getWordsByLevel(level);
    
    // Shuffle and pick 15 items total (3 sessions * 5 items)
    const totalItems = itemsPerSession * 3;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, totalItems);
    
    // Distribute into 3 sessions
    return [
        selected.slice(0, itemsPerSession),
        selected.slice(itemsPerSession, itemsPerSession * 2),
        selected.slice(itemsPerSession * 2, itemsPerSession * 3),
    ];
}


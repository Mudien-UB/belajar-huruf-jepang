export type HiraganaCharacter = {
    character: string;
    romaji: string;
    stroke_count?: number;
    svgPath: string;
};

export type HiraganaType = 'basic' | 'dakuten' | 'handakuten' | 'yoon';

export type HiraganaData = {
    [key in HiraganaType]: HiraganaCharacter[][];
};

export type ExampleWord = {
    word: string;
    kanji?: string;
    romaji: string;
    meaning: {
        id: string;
    };
};

export type ExampleWordsData = {
    [char: string]: ExampleWord[];
};

export type SambungCocokQuiz = {
    word: string;
    romaji: string;
}

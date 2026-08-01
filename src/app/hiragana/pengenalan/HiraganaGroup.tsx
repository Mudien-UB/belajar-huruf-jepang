"use client";

import {useState} from "react";
import {Card} from "@/components/organisms/Card";
import {InsightModal} from "@/components/organisms/InsightModal";
import {HiraganaCharacter, ExampleWord, HiraganaType} from "@/type/hiragana";
import {getExampleWords} from "@/lib/hiragana";

interface HiraganaGroupProps {
    group: HiraganaCharacter[];
    groupIdx: number;
    type: HiraganaType;
}

export function HiraganaGroup({group, groupIdx, type}: HiraganaGroupProps) {
    const [selectedCharacter, setSelectedCharacter] = useState<{
        data: ExampleWord[];
        char: HiraganaCharacter;
    } | null>(null);

    const handleCardClick = async (char: HiraganaCharacter) => {
        const examples = await getExampleWords(char.character);
        setSelectedCharacter({data: Array.isArray(examples) ? examples : [], char});
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {group.map((char, charIdx) => (
                    <Card
                        key={`${groupIdx}-${charIdx}`}
                        onClick={() => handleCardClick(char)}
                        className="aspect-square flex flex-col items-center justify-center cursor-pointer border border-sakura/30 hover:border-sakura hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        <span className="text-5xl font-serif text-nowrap">{char.character}</span>
                        <span className="text-xs font-medium text-navy/60 mt-2">{char.romaji}</span>
                    </Card>
                ))}
            </div>
            {selectedCharacter && (
                <InsightModal
                    isOpen={!!selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                    exampleWords={selectedCharacter.data}
                    svgChar={{
                        character: selectedCharacter.char.character,
                        romaji: selectedCharacter.char.romaji,
                        type: type,
                        svgPath: selectedCharacter.char.svgPath
                    }}
                />
            )}
        </>
    );
}

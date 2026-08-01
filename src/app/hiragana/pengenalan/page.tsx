import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import {HiraganaData, HiraganaType} from "@/type/hiragana";
import {HiraganaGroup} from "./HiraganaGroup";

export const metadata: Metadata = {
    title: "Pengenalan Huruf Hiragana",
    description: "Pelajari daftar lengkap huruf Hiragana, mulai dari huruf dasar, dakuten, handakuten, hingga yoon.",
};

async function getHiraganaData(): Promise<HiraganaData> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'hiragana.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export default async function PengenalanPage() {
    const data = await getHiraganaData();

    const categories: HiraganaType[] = [
        "basic",
        "dakuten",
        "handakuten",
        "yoon",
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold mb-10 text-navy">Pengenalan Hiragana</h1>

            {/* Navigation */}
            <nav className="sticky top-0 z-20 mb-10 bg-paper/90 backdrop-blur-sm border-b border-sakura py-4">
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <a
                            key={category}
                            href={`#${category}`}
                            className="
                                px-4 py-2
                                rounded-full
                                text-sm
                                font-semibold
                                capitalize
                                bg-white
                                border border-sakura
                                text-navy
                                hover:bg-sakura
                                hover:text-white
                                transition-all
                                duration-300
                            "
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </nav>

            {categories.map((category) => (
                <section
                    key={category}
                    id={category}
                    className="mb-16 scroll-mt-24"
                >
                    <h2 className="text-3xl font-serif font-semibold mb-8 capitalize text-navy">
                        {category}
                    </h2>

                    <div className="space-y-6">
                        {data[category].map((group, groupIdx) => (
                            <HiraganaGroup
                                key={`${category}-${groupIdx}`}
                                group={group}
                                groupIdx={groupIdx}
                                type={category}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
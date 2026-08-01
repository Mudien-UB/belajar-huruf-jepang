"use client";
import { useState, useMemo, useEffect } from 'react';
import { getSambungCocokQuiz } from '@/lib/hiragana';
import { LevelSelector } from '@/components/molecules/LevelSelector';
import { CharSizeSelector } from '@/components/molecules/CharSizeSelector';
import { QuizSessionSelector } from '@/components/molecules/QuizSessionSelector';
import { SambungCocokTutorialModal } from '@/components/organisms/SambungCocokTutorialModal';
import { useAutoHint } from '@/context/AutoHintContext';
import type {SambungCocokQuiz} from "@/type/hiragana";

type Selection = { item: SambungCocokQuiz; isHiragana: boolean };

export default function LatihanSambungCocok() {
    const [level, setLevel] = useState<number | null>(null);
    const [charSize, setCharSize] = useState<number | null>(null);
    const [sessionCount, setSessionCount] = useState<number | null>(3);
    const [sessions, setSessions] = useState<SambungCocokQuiz[][]>([]);
    const [currentSession, setCurrentSession] = useState(0);
    const [started, setStarted] = useState(false);
    const [totalErrors, setTotalErrors] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [selected, setSelected] = useState<Selection | null>(null);
    const [matches, setMatches] = useState<Record<string, string>>({}); // hiragana: romaji
    const [error, setError] = useState<string | null>(null);
    
    const { hasBeenShown, setHasBeenShown } = useAutoHint();
    const [isTutorialOpen, setIsTutorialOpen] = useState(() => !hasBeenShown['sambung-cocok']);

    const handleCloseTutorial = () => {
        setIsTutorialOpen(false);
        setHasBeenShown('sambung-cocok', true);
    };

    const startQuiz = async (selectedLevel: number, selectedSize: number, selectedSessionCount: number) => {
        const newSessions = [];
        for(let i=0; i<selectedSessionCount; i++) {
            newSessions.push(await getSambungCocokQuiz(selectedLevel, selectedSize));
        }
        setSessions(newSessions);
        setTotalQuestions(newSessions.reduce((acc, sess) => acc + sess.length, 0));
        setCurrentSession(0);
        setMatches({});
        setSelected(null);
        setError(null);
        setTotalErrors(0);
        setStarted(true);
    };

    const quizItems = sessions[currentSession] || [];
    const hiraganaList = useMemo(() => [...quizItems].sort(() => Math.random() - 0.5), [quizItems, currentSession]);
    const romajiList = useMemo(() => [...quizItems].sort(() => Math.random() - 0.5), [quizItems, currentSession]);

    const handleSelect = (item: SambungCocokQuiz, isHiragana: boolean) => {
        if (!selected) {
            setSelected({ item, isHiragana });
            setError(null);
            return;
        }

        if (selected.isHiragana === isHiragana) {
            setSelected({ item, isHiragana });
            setError(null);
            return;
        }

        const isCorrect = isHiragana
            ? (selected.item.romaji === item.romaji)
            : (selected.item.word === item.word);

        if (isCorrect) {
            const hWord = isHiragana ? item.word : selected.item.word;
            const rRead = isHiragana ? selected.item.romaji : item.romaji;
            setMatches(prev => ({ ...prev, [hWord]: rRead }));
            setSelected(null);
            setError(null);
        } else {
            setError('Salah! Coba lagi.');
            setTotalErrors(prev => prev + 1);
            setSelected(null);
        }
    };

    const isSessionComplete = Object.keys(matches).length === quizItems.length && quizItems.length > 0;
    const isQuizFinished = isSessionComplete && currentSession === (sessionCount! - 1);

    useEffect(() => {
        if (isSessionComplete && !isQuizFinished) {
            const timer = setTimeout(() => {
                setCurrentSession(s => s + 1);
                setMatches({});
                setSelected(null);
                setError(null);
            }, 1000); // 1-second delay for feedback
            return () => clearTimeout(timer);
        }
    }, [isSessionComplete, currentSession, isQuizFinished]);

    if (!started) {
        return (
            <main className="p-8 flex flex-col items-center relative">
                <button 
                    onClick={() => setIsTutorialOpen(true)}
                    className="absolute top-4 right-4 p-2 bg-navy text-paper rounded-full hover:bg-navy/90"
                    aria-label="Tutorial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold mb-6">Latihan Sambung Cocok</h1>
                <div className="mb-6">
                    <LevelSelector currentLevel={level || 0} onLevelChange={(l) => setLevel(l)} />
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Pilih Jumlah Huruf:</h2>
                    <CharSizeSelector currentSize={charSize} onSizeChange={(s) => setCharSize(s)} />
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Pilih Jumlah Sesi:</h2>
                    <QuizSessionSelector currentSessionCount={sessionCount} onSessionCountChange={(s) => setSessionCount(s)} />
                </div>
                <button
                    disabled={level === null || charSize === null || sessionCount === null}
                    onClick={() => startQuiz(level!, charSize!, sessionCount!)}
                    className="px-6 py-2 bg-navy text-paper rounded-lg disabled:opacity-50"
                >
                    Mulai Latihan
                </button>
                <SambungCocokTutorialModal isOpen={isTutorialOpen} onClose={handleCloseTutorial} />
            </main>
        );
    }

    if (isQuizFinished) {
        const accuracy = Math.round((totalQuestions / (totalQuestions + totalErrors)) * 100);
        const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
        
        return (
            <main className="p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Latihan Selesai!</h1>
                <p className="text-2xl font-bold mb-4">Akurasi: {accuracy}%</p>
                <div className="text-4xl mb-8">
                    {'⭐'.repeat(stars)}
                    {'☆'.repeat(3 - stars)}
                </div>
                <p className="text-lg mb-8">Total Kesalahan: {totalErrors}</p>
                <button onClick={() => setStarted(false)} className="px-6 py-2 bg-navy text-paper rounded-lg">Kembali ke Menu</button>
            </main>
        );
    }

    return (
        <main className="p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Sambung Cocok (Sesi {currentSession + 1}/{sessionCount})</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                    {hiraganaList.map((item, index) => (
                        <button
                            key={`h-${index}`}
                            onClick={() => handleSelect(item, true)}
                            className={`w-24 h-24 flex items-center justify-center text-2xl font-bold border-2 rounded-xl transition-all duration-300 ${
                                matches[item.word]
                                    ? 'opacity-30 cursor-not-allowed bg-green-200'
                                    : (selected?.isHiragana && selected.item.word === item.word)
                                        ? 'bg-navy text-paper scale-105'
                                        : 'bg-paper hover:scale-105'
                            }`}
                            disabled={!!matches[item.word]}
                        >
                            {item.word}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    {romajiList.map((item, index) => (
                        <button
                            key={`r-${index}`}
                            onClick={() => handleSelect(item, false)}
                            className={`w-24 h-24 flex items-center justify-center font-bold border-2 rounded-xl transition-all duration-300 ${
                                Object.values(matches).includes(item.romaji)
                                    ? 'opacity-30 cursor-not-allowed bg-green-200'
                                    : (!selected?.isHiragana && selected?.item.romaji === item.romaji)
                                        ? 'bg-navy text-paper scale-105'
                                        : 'bg-paper hover:scale-105'
                            }`}
                            disabled={Object.values(matches).includes(item.romaji)}
                        >
                            {item.romaji}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={() => setStarted(false)} className="mt-8 text-navy underline">Ulangi/Ganti Pengaturan</button>
        </main>
    );
}

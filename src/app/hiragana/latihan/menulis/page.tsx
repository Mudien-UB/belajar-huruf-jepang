"use client";
import { useState } from 'react';
import { getQuizCharacters } from '@/lib/hiragana';
import { HiraganaCharacter } from '@/type/hiragana';
import { LevelSelector } from '@/components/molecules/LevelSelector';
import { TutorialModal } from '@/components/organisms/TutorialModal';

export default function LatihanMenulisHiragana() {
  const [level, setLevel] = useState<number | null>(null);
  const [sessions, setSessions] = useState<HiraganaCharacter[][]>([]);
  const [currentSession, setCurrentSession] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const startQuiz = async (selectedLevel: number) => {
    setLevel(selectedLevel);
    const preparedSessions = await getQuizCharacters(selectedLevel, 6);
    
    setSessions(preparedSessions);
    setCurrentSession(0);
    setQuizCompleted(false);
  };


  const currentChars = sessions[currentSession] || [];

  if (level === null) {
    return (
      <main className="p-8 flex flex-col items-center">
        <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
        <h1 className="text-3xl font-bold mb-6">Latihan Huruf</h1>
        <LevelSelector currentLevel={0} onLevelChange={startQuiz} />
      </main>
    );
  }

  if (quizCompleted) {
      return (
          <main className="p-8 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-6">Hasil Kuis - Kunci Jawaban</h1>
              {sessions.map((chars, i) => (
                  <div key={i} className="w-full max-w-2xl mb-8">
                      <h2 className="text-xl font-bold mb-2">Sesi {i + 1}</h2>
                      <table className="w-full border-collapse border border-navy">
                          <thead>
                              <tr className="bg-navy text-paper">
                                  <th className="border border-navy p-2">Karakter</th>
                                  <th className="border border-navy p-2">Romaji</th>
                                  <th className="border border-navy p-2">Jumlah Stroke</th>
                              </tr>
                          </thead>
                          <tbody>
                              {chars.map(char => (
                                  <tr key={char.character} className="text-center">
                                      <td className="border border-navy p-2">{char.character}</td>
                                      <td className="border border-navy p-2">{char.romaji}</td>
                                      <td className="border border-navy p-2">{char.stroke_count || '-'}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              ))}
              <button onClick={() => startQuiz(level)} className="mt-8 px-6 py-2 bg-navy text-paper rounded-lg">Ulangi</button>
              <button onClick={() => setLevel(null)} className="mt-8 px-6 py-2  text-navy border-navy border-2 rounded-lg hover:bg-navy/10">Ganti Level</button>
          </main>
      )
  }

  return (
    <main className="p-8 flex flex-col items-center relative">
      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      
      <button 
        onClick={() => setShowTutorial(true)}
        className="absolute top-4 right-4 p-2 bg-navy text-paper rounded-full hover:bg-navy/90"
        aria-label="Tutorial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <h1 className="text-3xl font-bold mb-6">Latihan Huruf - Level {level} (Sesi {currentSession + 1}/{sessions.length})</h1>
      <button onClick={() => setLevel(null)} className="mb-4 text-navy underline">Ganti Level</button>
      
      <h2 className="text-xl font-bold mb-4">Sesi {currentSession + 1}</h2>
      <div className="grid grid-cols-3 gap-6">
        {currentChars.map((char) => (
            <div key={char.character} className="flex flex-col items-center gap-2">
                <button
                    className="text-6xl font-bold p-8 border-2 border-sakura rounded-2xl bg-paper"
                >
                    {char.character}
                </button>
            </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-8">
        <button disabled={currentSession === 0} onClick={() => setCurrentSession(s => s - 1)} className="px-6 py-2 bg-navy text-paper rounded-lg disabled:opacity-50">Back</button>
        {currentSession < sessions.length - 1 ? (
            <button onClick={() => setCurrentSession(s => s + 1)} className="px-6 py-2 bg-navy text-paper rounded-lg">Next</button>
        ) : (
            <button onClick={() => setQuizCompleted(true)} className="px-6 py-2 bg-navy text-paper rounded-lg">Selesai</button>
        )}
      </div>
    </main>
  );
}

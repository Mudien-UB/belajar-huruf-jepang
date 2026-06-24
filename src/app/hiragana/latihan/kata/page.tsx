"use client";
import { useState } from 'react';
import { getQuizWords } from '@/lib/hiragana';
import { ExampleWord } from '@/type/hiragana';
import { LevelSelector } from '@/component/LevelSelector';

export default function LatihanKataPage() {
  const [level, setLevel] = useState<number | null>(null);
  const [sessions, setSessions] = useState<ExampleWord[][]>([]);
  const [currentSession, setCurrentSession] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = async (selectedLevel: number) => {
    setLevel(selectedLevel);
    const preparedSessions = await getQuizWords(selectedLevel, 6);
    
    setSessions(preparedSessions);
    setCurrentSession(0);
    setQuizCompleted(false);
  };

  const currentWords = sessions[currentSession] || [];

  if (level === null) {
    return (
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Pilih Level Latihan Kata</h1>
        <LevelSelector currentLevel={0} onLevelChange={startQuiz} />
      </main>
    );
  }

  if (quizCompleted) {
      return (
          <main className="p-8 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-6">Hasil Kuis - Kunci Jawaban</h1>
              {sessions.map((words, i) => (
                  <div key={i} className="w-full max-w-2xl mb-8">
                      <h2 className="text-xl font-bold mb-2">Sesi {i + 1}</h2>
                      <table className="w-full border-collapse border border-navy">
                          <thead>
                              <tr className="bg-navy text-paper">
                                  <th className="border border-navy p-2">Kata</th>
                                  <th className="border border-navy p-2">Kanji</th>
                                  <th className="border border-navy p-2">Romaji</th>
                                  <th className="border border-navy p-2">Arti</th>
                              </tr>
                          </thead>
                          <tbody>
                              {words.map((word, i) => (
                                  <tr key={i} className="text-center">
                                      <td className="border border-navy p-2">{word.word}</td>
                                      <td className="border border-navy p-2">{word.kanji || '-'}</td>
                                      <td className="border border-navy p-2">{word.romaji}</td>
                                      <td className="border border-navy p-2">{word.meaning.id}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              ))}
              <button onClick={() => startQuiz(level)} className="mt-8 px-6 py-2 bg-navy text-paper rounded-lg">Ulangi</button>
          </main>
      )
  }

  return (
    <main className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Latihan Kata - Level {level} (Sesi {currentSession + 1}/3)</h1>
      <button onClick={() => setLevel(null)} className="mb-4 text-navy underline">Ganti Level</button>
      
      <h2 className="text-xl font-bold mb-4">Sesi {currentSession + 1}</h2>
      <div className="grid grid-cols-2 gap-6">
        {currentWords.map((word, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
                <div 
                    className="text-4xl font-bold p-8 border-2 border-sakura rounded-2xl bg-paper"
                >
                    {word.word}
                </div>
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

import React, { useState } from 'react';

interface QuizInteractiveInputProps {
  answer: string;
  revealed: boolean;
  onReveal: () => void;
}

export const QuizInteractiveInput: React.FC<QuizInteractiveInputProps> = ({ answer, revealed, onReveal }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onReveal}
        className={`px-4 py-2 rounded-lg font-bold text-lg transition-all ${
            revealed ? 'bg-muted-gold' : 'bg-navy'
        } text-background`}
      >
        {revealed ? answer : 'Lihat Kunci'}
      </button>
    </div>
  );
};

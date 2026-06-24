import React from 'react';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onLevelChange }) => {
  return (
    <div className="flex gap-2 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
        <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={`px-4 py-2 rounded-full font-medium transition-colors border ${
            level === currentLevel 
              ? 'bg-sakura text-foreground' 
              : 'bg-background text-navy border-muted-gold'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

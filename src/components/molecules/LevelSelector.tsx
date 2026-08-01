import React, { useState } from 'react';
import { LevelInfoModal } from '../organisms/LevelInfoModal';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onLevelChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-navy">Pilih Level:</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-navy underline hover:text-navy/80"
        >
          Lihat Keterangan Level
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center items-center">
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
      <LevelInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

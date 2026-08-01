import React from 'react';

interface CharSizeSelectorProps {
  currentSize: number | null;
  onSizeChange: (size: number) => void;
}

export const CharSizeSelector: React.FC<CharSizeSelectorProps> = ({ currentSize, onSizeChange }) => {
  const sizes = [1, 2, 3];

  return (
    <div className="flex gap-4 mb-6">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeChange(size)}
          className={`px-4 py-2 rounded-lg border-2 ${
            currentSize === size
              ? 'bg-sakura text-paper border-navy'
              : 'bg-paper text-navy border-muted-gold hover:bg-navy/10'
          }`}
        >
          {size} Huruf
        </button>
      ))}
    </div>
  );
};

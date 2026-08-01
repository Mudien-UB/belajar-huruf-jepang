import React from 'react';

interface LevelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LevelInfoModal: React.FC<LevelInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="p-8 rounded-2xl w-full max-w-2xl bg-paper text-foreground max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-navy text-center">Deskripsi Level</h2>
        <table className="w-full text-left border-collapse mb-6">
          <thead>
            <tr>
              <th className="border-b-2 py-2">Level</th>
              <th className="border-b-2 py-2">Basic</th>
              <th className="border-b-2 py-2">Dakuten</th>
              <th className="border-b-2 py-2">Handakuten</th>
              <th className="border-b-2 py-2">Yoon</th>
            </tr>
          </thead>
          <tbody>
            {[
              { level: 1, basic: '[0, 1]', dakuten: '-', handakuten: '-', yoon: '-' },
              { level: 2, basic: '[0..3]', dakuten: '-', handakuten: '-', yoon: '-' },
              { level: 3, basic: 'All', dakuten: '-', handakuten: '-', yoon: '-' },
              { level: 4, basic: 'All', dakuten: '[0, 1]', handakuten: '-', yoon: '-' },
              { level: 5, basic: 'All', dakuten: 'All', handakuten: '-', yoon: '-' },
              { level: 6, basic: 'All', dakuten: 'All', handakuten: 'All', yoon: '-' },
              { level: 7, basic: 'All', dakuten: 'All', handakuten: 'All', yoon: '[0..3]' },
              { level: 8, basic: 'All', dakuten: 'All', handakuten: 'All', yoon: '[0..7]' },
              { level: 9, basic: 'All', dakuten: 'All', handakuten: 'All', yoon: 'All' },
            ].map((row) => (
              <tr key={row.level} className="border-b">
                <td className="py-3 font-bold">{row.level}</td>
                <td className="py-3">{row.basic}</td>
                <td className="py-3">{row.dakuten}</td>
                <td className="py-3">{row.handakuten}</td>
                <td className="py-3">{row.yoon}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button 
          onClick={onClose}
          className="w-full text-paper py-2 rounded-lg font-medium bg-navy hover:bg-navy/90 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

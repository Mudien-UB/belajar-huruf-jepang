import React from 'react';
import { ExampleWord, HiraganaType } from '@/type/hiragana';

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgChar: {
    character: string;
    romaji: string;
    type: HiraganaType;
  };
  exampleWords: ExampleWord[];
}

export const InsightModal: React.FC<InsightModalProps> = ({ isOpen, onClose, svgChar, exampleWords }) => {
  if (!isOpen) return null;

  const getSvgPath = () => {
    if (svgChar.type === 'dakuten' && (svgChar.romaji === 'ji' || svgChar.romaji === 'zu')) {
      return `/svg/hiragana-stroke-order/${svgChar.type}/${svgChar.romaji}_${svgChar.character}.svg`;
    }
    return `/svg/hiragana-stroke-order/${svgChar.type}/${svgChar.romaji}.svg`;
  };

  return (
    <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="p-8 rounded-2xl w-full max-w-4xl bg-paper text-foreground max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-navy">Stroke Order</h2>
            <img src={getSvgPath()} alt={`Stroke order for ${svgChar.character}`} className="w-48 h-48" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-navy">Contoh Kata</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 py-2">Kata</th>
                  <th className="border-b-2 py-2">Romaji</th>
                  <th className="border-b-2 py-2">Arti</th>
                </tr>
              </thead>
              <tbody>
                {exampleWords.slice(0, 5).map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 font-semibold text-navy">
                      {item.word} {item.kanji && <span className="text-sm text-foreground/60">({item.kanji})</span>}
                    </td>
                    <td className="py-3">{item.romaji}</td>
                    <td className="py-3">{item.meaning.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="mt-6 w-full text-paper py-2 rounded-lg font-medium bg-navy hover:bg-navy/90 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

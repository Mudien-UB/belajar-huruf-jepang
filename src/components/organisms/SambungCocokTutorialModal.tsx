import React, { useState } from 'react';

interface SambungCocokTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SambungCocokTutorialModal: React.FC<SambungCocokTutorialModalProps> = ({ isOpen, onClose }) => {
  const [slide, setSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Pengaturan Latihan",
      content: (
        <div className="space-y-4">
          <p>Sebelum memulai sesi "Sambung Cocok", Anda dapat menyesuaikan pengaturan berikut:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Pilih Kategori:</strong> Tentukan tingkat kesulitan atau grup karakter yang ingin Anda latih.</li>
            <li><strong>Jumlah Soal:</strong> Atur berapa banyak pasangan yang ingin Anda cocokkan dalam satu sesi.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Cara Bermain",
      content: (
        <div className="space-y-4">
          <p>Tujuan permainan ini adalah mencocokkan karakter Hiragana dengan cara membacanya yang tepat:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Di layar akan muncul daftar karakter Hiragana dan daftar pilihan cara membacanya (Romaji).</li>
            <li>Klik karakter Hiragana, lalu klik cara membacanya yang sesuai untuk menyambungkan keduanya.</li>
            <li>Jika salah menyambung, Anda bisa membatalkannya dengan mengklik ulang pasangan yang salah tersebut.</li>
            <li>Setelah semua pasangan terhubung, tekan tombol <strong>"Cek Jawaban"</strong> untuk melihat hasil Anda.</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="p-8 rounded-2xl w-full max-w-md bg-paper text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-navy">{slides[slide].title}</h2>
        
        <div className="min-h-[250px]">
          {slides[slide].content}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          {slide > 0 ? (
            <button 
              onClick={() => setSlide(slide - 1)}
              className="flex-1 text-navy py-2 rounded-lg font-medium border border-navy hover:bg-navy/10 transition-colors"
            >
              Kembali
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {slide < slides.length - 1 ? (
            <button 
              onClick={() => setSlide(slide + 1)}
              className="flex-1 text-paper py-2 rounded-lg font-medium bg-navy hover:bg-navy/90 transition-colors"
            >
              Selanjutnya
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="flex-1 text-paper py-2 rounded-lg font-medium bg-navy hover:bg-navy/90 transition-colors"
            >
              Mulai Permainan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

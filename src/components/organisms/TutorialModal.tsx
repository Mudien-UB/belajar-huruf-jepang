import React from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="p-8 rounded-2xl w-full max-w-md bg-paper text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-navy">Panduan Latihan Menulis</h2>
        <div className="space-y-4 text-foreground">
          <p>
            Selamat datang di sesi latihan menulis! Ikuti langkah-langkah berikut agar latihan Anda maksimal:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Siapkan kertas atau buku tulis dan alat tulis Anda.</li>
            <li>Perhatikan karakter yang muncul di layar.</li>
            <li>Tulis karakter tersebut di kertas Anda sesuai dengan urutan guratan yang benar.</li>
            <li>Setelah selesai, tekan tombol <strong>"Next"</strong> untuk lanjut ke karakter berikutnya.</li>
            <li>Jika sudah mencapai sesi terakhir, tekan tombol <strong>"Selesai"</strong>.</li>
            <li>Kunci jawaban akan ditampilkan di akhir sesi agar Anda bisa mencocokkan tulisan Anda.</li>
          </ol>
          <p className="font-semibold text-navy">
            Selamat berlatih dan semoga berhasil!
          </p>
        </div>
        <button 
          onClick={onClose}
          className="mt-6 w-full text-paper py-2 rounded-lg font-medium bg-navy hover:bg-navy/90 transition-colors"
        >
          Mengerti, Mulai Latihan
        </button>

      </div>
    </div>
  );
};

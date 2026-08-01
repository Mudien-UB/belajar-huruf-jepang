# Belajar Hiragana

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Status](https://img.shields.io/badge/Status-In_Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

Aplikasi web interaktif untuk mempelajari sistem penulisan Hiragana Jepang.

## Deskripsi
Belajar Hiragana adalah platform pembelajaran bahasa Jepang yang dirancang untuk membantu pengguna menguasai penulisan dan pengenalan karakter Hiragana melalui metode interaktif, latihan kuis, dan visualisasi *stroke order*.

## Fitur
- **Pengenalan Hiragana:** Referensi visual karakter Hiragana yang dikelompokkan (Basic, Dakuten, Handakuten, Yoon).
- **Latihan Huruf:** Kuis interaktif untuk menguji kemampuan mengenali karakter Hiragana.
- **Latihan Sambung Cocok:** Latihan mencocokkan karakter Hiragana dengan Romaji, dilengkapi fitur tutorial dan *preview* pasangan karakter.
- **Visualisasi Stroke Order:** Panduan visual cara menulis setiap karakter.

## Tech Stack
- **Framework:** Next.js
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (via PostCSS)
- **Data:** JSON-based data storage

## Cara Install
1. Clone repositori:
   ```bash
   git clone <url-repositori>
   cd belajar-bahasa-jepang
   ```
2. Install dependensi:
   ```bash
   npm install
   ```

## Cara Menjalankan
Untuk menjalankan dalam mode pengembangan:
```bash
npm run dev
```
Buka `http://localhost:3000` di browser Anda.

## Cara Build
Untuk melakukan build produksi:
```bash
npm run build
```

## Struktur Folder
```text
├── src/
│   ├── app/           # Halaman Next.js
│   ├── components/    # Komponen UI (atoms, molecules, organisms)
│   ├── context/       # State management global
│   ├── lib/           # Logika bisnis/utility
│   └── type/          # Definisi TypeScript
├── public/            # Aset statis (data JSON, SVG)
└── ...
```

## Roadmap
- [x] Implementasi Hiragana (Pengenalan & Latihan)
- [x] Implementasi Sambung Cocok Hiragana
- [ ] **Implementasi Katakana** (Pengenalan & Latihan)
- [ ] Implementasi Sambung Cocok Katakana

## Cara Berkontribusi
Kami sangat terbuka untuk kontribusi! Silakan buat *issue* atau *pull request* untuk fitur baru atau perbaikan bug.

## Lisensi
[MIT](LICENSE)

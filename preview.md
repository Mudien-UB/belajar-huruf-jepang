# Dokumentasi Proyek: Belajar Hiragana

Aplikasi web interaktif untuk mempelajari sistem penulisan Hiragana Jepang.

## Fitur Utama

### 1. Pengenalan Hiragana (`/hiragana/pengenalan`)
- **Fungsi:** Referensi visual untuk semua karakter hiragana.
- **Detail:**
  - Karakter dikelompokkan ke dalam kategori: Basic, Dakuten, Handakuten, dan Yoon.
  - Komponen `HiraganaGroup` menampilkan tabel/daftar karakter dengan Romaji.
  - Menggunakan **Sticky Navigation** untuk akses cepat antar kategori.
  - Data diambil secara asinkron dari file `hiragana.json`.

### 2. Latihan Huruf (`/hiragana/latihan/huruf`)
- **Fungsi:** Kuis interaktif untuk menguji pengenalan karakter.
- **Mekanisme:**
  - Pengguna memilih level (1-9) melalui komponen `LevelSelector`.
  - Logika kuis diatur di `src/lib/hiragana.ts` yang memproses data JSON berdasarkan level.
  - Antarmuka sesi: Menampilkan karakter, navigasi antar sesi (Back/Next), dan status penyelesaian kuis.
  - **Hasil:** Menampilkan kunci jawaban lengkap dalam format tabel (Karakter, Romaji, Stroke Count).

## Struktur Data & Level
Data diatur dalam level kesulitan:

| Level | Basic | Dakuten | Handakuten | Yoon |
| :--- | :--- | :--- | :--- | :--- |
| **1** | [0, 1] | - | - | - |
| **2** | [0..3] | - | - | - |
| **3** | All | - | - | - |
| **4** | All | [0, 1] | - | - |
| **5** | All | All | - | - |
| **6** | All | All | All | - |
| **7** | All | All | All | [0..3] |
| **8** | All | All | All | [0..7] |
| **9** | All | All | All | All |

## Komponen Utama
- `LevelSelector`: Komponen input untuk pemilihan level kuis.
- `HiraganaGroup`: Komponen UI untuk merender kelompok hiragana pada halaman pengenalan.
- `QuizInteractiveInput`: (Potensial) Komponen untuk input jawaban kuis.

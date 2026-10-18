# Pernyataan Penggunaan Kecerdasan Buatan (AI)

**Mata Kuliah:** Algoritma dan Pengantar Pemrograman (SSI1144)  
**Kelompok:** 09 – Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa  
**Anggota Kelompok:**  
1. Nadin Arifa Salsabila (NIM: 322610009)  
2. Bryant Anthony Kores Obhetan (NIM: 322610003)  

Sesuai dengan **Kebijakan Penggunaan AI (Bagian M)** pada panduan Proyek Ujian Tengah Semester, kelompok kami menyatakan telah memanfaatkan alat bantu berbasis kecerdasan buatan (*Artificial Intelligence*) secara bertanggung jawab untuk menunjang proses pembelajaran, perbaikan sintaks, dan pemahaman konsep algoritma.

Berikut adalah rincian transparansi penggunaan AI dalam proyek ini:

---

## 1. Identitas Alat Bantu AI yang Digunakan
- **Nama Alat:** Google Gemini / Antigravity AI Assistant
- **Pengembang:** Google DeepMind
- **Model:** Generative Language Model (Coding & Reasoning Assistant)

---

## 2. Tujuan Penggunaan AI
1. Membantu memahami pesan galat (*error message*) kompiler C++ pada terminal, khususnya kendala *command not found* pada `g++` dan tata cara konfigurasi *Environment Variables*.
2. Mempelajari sintaks pembersihan buffer input C++ (`cin.clear()` dan `cin.ignore()`) untuk mengatasi masalah pembacaan `getline()` yang terlewati pada perulangan.
3. Memberikan referensi contoh penulisan pseudocode dan flowchart standar akademik yang konsisten dengan kode program.
4. Memeriksa potensi galat (*edge cases* dan *bug analysis*) seperti kesalahan pembagian dengan nol (*division by zero*) dan presisi bilangan riil (*floating-point precision*).

---

## 3. Daftar Prompt Utama yang Diajukan Mahasiswa

Berikut beberapa contoh prompt utama yang diajukan selama proses konsultasi:
- *"Bagaimana cara mengatasi error `'g++' is not recognized as an internal or external command` di terminal VS Code Windows?"*
- *"Mengapa fungsi `getline` langsung dilewati tanpa menerima input saat berada di dalam perulangan `do...while` setelah membaca data angka dengan `cin`?"*
- *"Bagaimana merancang logika pelacakan komponen dengan nominal pembengkakan anggaran terbesar tanpa menggunakan struktur data array di C++?"*
- *"Tolong berikan rekomendasi perancangan skenario pengujian dan trace table untuk sistem evaluasi anggaran kegiatan mahasiswa."*

---

## 4. Bagian Hasil AI yang Digunakan
1. **Panduan Instalasi Kompiler:** Rekomendasi penggunaan perintah `winget install -e --id BrechtSanders.WinLibs.POSIX.UCRT` untuk memasang GCC/MinGW di Windows.
2. **Snippet Pembersihan Buffer:** Penggunaan pola `cin.clear(); cin.ignore(1000, '\n');` pada blok validasi masukan numerik.
3. **Format Dokumentasi:** Kerangka penyusunan trace table dan tabel pengujian 8 skenario sesuai rubrik penugasan.

---

## 5. Pemeriksaan dan Perubahan yang Dilakukan oleh Mahasiswa
Mahasiswa **tidak menerima mentah-mentah** saran dari AI, melainkan melakukan pemeriksaan ketat dan penyesuaian:
- **Pembersihan Fitur di Luar Silabus:** Ketika AI sempat memberikan draf menggunakan `std::vector` dan `struct`, mahasiswa menolak dan menginstruksikan ulang agar kode ditulis murni menggunakan variabel primitif dan variabel akumulator sesuai batasan UTS semester 1.
- **Penyesuaian Ketentuan Kasus 09:** Mahasiswa secara manual memverifikasi bahwa aturan batas toleransi evaluasi $10\%$ dihitung berbasis perkalian silang agar akurat tanpa pembagian desimal berulang.
- **Pengujian Mandiri di Konsol:** Mahasiswa mengetikkan ulang, mengompilasi dengan `g++`, dan menjalankan program secara langsung di terminal lokal untuk menguji seluruh skenario kasus sebelum tangkapan layar diambil.

---

## 6. Hasil Verifikasi dan Pernyataan Akuntabilitas Mahasiswa

> **Pernyataan:**  
> Kami menyatakan dengan sesungguhnya bahwa seluruh anggota kelompok telah memahami sepenuhnya alur algoritma, pseudocode, flowchart, dan setiap baris kode sumber C++ pada Modul A, Modul B, maupun Program Terintegrasi. Kami siap menjelaskan logika program, melakukan penelusuran nilai variabel (*trace table*), memprediksi luaran (*output*), serta melakukan modifikasi langsung pada saat sesi presentasi dan verifikasi individual di hadapan dosen pengampu.

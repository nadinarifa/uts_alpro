# Proyek UTS Algoritma dan Pengantar Pemrograman (SSI1144)
**Program Studi Sistem Informasi - Fakultas Teknologi dan Desain**  
**Universitas Ma Chung**

---

## 📌 Identitas Proyek

- **Mata Kuliah:** Algoritma dan Pengantar Pemrograman (SSI1144)
- **Studi Kasus 09:** Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa
- **Bahasa Pemrograman:** C++ (Console / Terminal Application)
- **Repository GitHub:** [nadinarifa/uts_alpro](https://github.com/nadinarifa/uts_alpro)

### 👥 Anggota Kelompok

| No. | Nama Mahasiswa | NIM | Tanggung Jawab Utama |
|:---:|---|:---:|---|
| 1 | **Nadin Arifa Salsabila** | 322610009 | **Modul A** (Proses Utama Evaluasi Komponen) |
| 2 | **Bryant Anthony Kores Obhetan** | 322610003 | **Modul B** (Proses Rekapitulasi & Kondisi Akhir) |

---

## 📖 Deskripsi Singkat Studi Kasus 09

Organisasi mahasiswa membutuhkan program berbasis konsol untuk mengevaluasi penggunaan anggaran kegiatan secara akurat dan transparan:
1. **Modul A (Proses Utama):**
   - Menerima masukan nama komponen, anggaran rencana (> 0), dan realisasi pengeluaran (>= 0).
   - Menghitung selisih dan persentase penyimpangan terhadap anggaran rencana.
   - Menentukan status komponen (**Hemat**, **Tepat**, atau **Melebihi Anggaran**).
   - Menentukan keterangan jika melebihi anggaran (**Perlu Evaluasi** jika kelebihan $\le 10\%$, atau **Peringatan** jika kelebihan $> 10\%$).
2. **Modul B (Rekapitulasi):**
   - Menghitung akumulasi Total Rencana dan Total Realisasi.
   - Menghitung Total Penghematan dan Total Kelebihan Pengeluaran.
   - Menghitung statistik banyaknya komponen Hemat, Tepat, dan Melebihi Anggaran.
   - Menghitung persentase penyerapan anggaran dengan proteksi pembagian nol.
   - Menentukan komponen dengan penyimpangan nominal terbesar secara dinamis tanpa array.
   - **Hasil Akhir:** Menentukan kondisi kegiatan secara keseluruhan (**Hemat**, **Sesuai Anggaran**, atau **Melebihi Anggaran**).
3. **Program Terintegrasi:**
   - Menggabungkan Modul A dan Modul B secara simultan dalam satu perulangan. Memberikan evaluasi instan pada setiap komponen, sekaligus merangkum seluruh rekapitulasi dan menetapkan kesimpulan agregat kegiatan di akhir eksekusi.

---

## 📁 Struktur Direktori Proyek

```text
uts_alpro/
├── beranda.md                               # Informasi umum proyek & anggota
├── README.md                                # Dokumentasi utama repository
├── Modul-A/                                 # Dokumentasi & Kode Modul A (Nadin)
│   ├── algoritma_deskriptif.md
│   ├── pseudocode.md
│   ├── modul_a.cpp
│   ├── flowchart.md
│   ├── source_code_dan_penjelasan.md
│   ├── hasil_eksekusi_dan_pengujian.md
│   └── gambar/                              # Tangkapan layar pengujian Modul A
├── Modul-B/                                 # Dokumentasi & Kode Modul B (Bryant)
│   ├── modul_b.cpp                          # Source code C++ mandiri Modul B
│   ├── algoritma_deskriptif.md
│   ├── pseudocode.md
│   ├── flowchart.md
│   ├── source_code_dan_penjelasan.md
│   ├── hasil_eksekusi_dan_pengujian.md
│   └── gambar/                              # Tangkapan layar pengujian Modul B
├── Integrasi/                               # Dokumentasi & Kode Program Terintegrasi
│   ├── program_terintegrasi.cpp             # Source code C++ program terintegrasi final
│   ├── proses_integrasi.md                  # Strategi & arsitektur penggabungan modul
│   ├── pseudocode.md                        # Pseudocode final terintegrasi
│   ├── flowchart.md                         # Flowchart final terintegrasi
│   ├── source_code_dan_penjelasan.md        # Source code & penjelasan rinci
│   ├── hasil_eksekusi_dan_pengujian.md      # 8 skenario uji & trace table integrasi
│   └── daftar_kesalahan_dan_perbaikan.md    # Log pencatatan & solusi perbaikan bug
└── Refleksi/                                # Evaluasi Diri & Kebijakan AI
    ├── refleksi.md                          # Refleksi pembagian kerja, kesulitan & UAS
    └── pernyataan_penggunaan_ai.md          # Transparansi & kepatuhan penggunaan AI
```

---

## 💻 Cara Kompilasi dan Menjalankan Program (C++)

Untuk menjalankan program di terminal lokal (menggunakan MinGW / GCC / Clang):

### 1. Menjalankan Program Terintegrasi (Rekomendasi Utama):
```bash
cd Integrasi
g++ program_terintegrasi.cpp -o program_terintegrasi
./program_terintegrasi
```

### 2. Menjalankan Modul B Secara Mandiri:
```bash
cd Modul-B
g++ modul_b.cpp -o modul_b
./modul_b
```

---

## 📋 Fitur Utama & Validasi Input

- **Validasi String:** Menolak input nama komponen kosong.
- **Validasi Angka:** Menolak input non-numerik (huruf/simbol) dan angka yang secara logis tidak valid (rencana $\le 0$, realisasi $< 0$).
- **Perulangan Interaktif:** Menggunakan `do...while` dengan validasi pilihan pengulangan (`y/t`).
- **Bebas Array / Library Eksternal:** Seluruh kalkulasi rekapitulasi dan penentuan nilai maksimum diselesaikan menggunakan konsep dasar variabel akumulator sesuai silabus UTS semester 1.

# Proses Integrasi Program

**Mata Kuliah:** Algoritma dan Pengantar Pemrograman (SSI1144)  
**Program Studi:** Sistem Informasi - Universitas Ma Chung  
**Studi Kasus 09:** Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa  

---

## 1. Latar Belakang dan Tujuan Integrasi

Pada proyek UTS ini, sistem dikembangkan melalui dua modul utama yang saling melengkapi:
- **Modul A (Penanggung Jawab: Nadin Arifa Salsabila / 322610009):** Berfokus pada proses utama pemeriksaan per komponen, mencakup validasi masukan komponen, perhitungan selisih, persentase penyimpangan individual, klasifikasi status (*Hemat*, *Tepat*, *Melebihi Anggaran*), serta penentuan keterangan evaluasi (*Perlu Evaluasi* atau *Peringatan*).
- **Modul B (Penanggung Jawab: Bryant Anthony Kores Obhetan / 322610003):** Berfokus pada proses rekapitulasi agregat, mencakup akumulasi total rencana dan realisasi, perhitungan total penghematan dan kelebihan pengeluaran, pengelompokan statistik jumlah komponen, pelacakan komponen dengan pembengkakan nominal terbesar, rasio penyerapan dana, serta evaluasi kondisi kegiatan secara keseluruhan.

Tujuan dari proses integrasi ini adalah menggabungkan kedua modul tersebut ke dalam **satu program eksekusi tunggal yang utuh, harmonis, dan efisien**, sehingga pengguna mendapatkan evaluasi instan untuk setiap komponen yang diinput sekaligus memperoleh laporan rekapitulasi komprehensif di akhir proses.

---

## 2. Strategi Desain Integrasi (*Single-Loop Architecture*)

Sesuai dengan batasan proyek (Bagian E):
> *"Program belum diwajibkan menggunakan array, function atau prosedur kompleks, class dan object, inheritance, database, Graphical User Interface, framework, atau library eksternal."*

Kedua modul diintegrasikan menggunakan arsitektur **Perulangan Tunggal (*Single-Loop Data Flow*)**:

```text
       [Mulai Program]
              │
              ▼
   ┌──────────────────────┐
   │ Inisialisasi Akumulator (Modul B)
   └──────────────────────┘
              │
              ▼
   ┌────────────────────────────────────────────────────────┐
   │ PERULANGAN (do ... while)                              │
   │                                                        │
   │  1. Input & Validasi Data Komponen                     │
   │  2. Evaluasi Status & Cetak Rincian (Modul A)          │
   │  3. Akumulasi Total & Lacak Penyimpangan (Modul B)     │
   │  4. Pertanyaan Ulangi/Selesai (y/t)                    │
   └────────────────────────────────────────────────────────┘
              │
      (Pilihan == 't')
              │
              ▼
   ┌────────────────────────────────────────────────────────┐
   │ EVALUASI AKHIR & LAPORAN REKAPITULASI (Modul B)        │
   │  - Hitung Persentase Penyerapan                        │
   │  - Tentukan Kondisi Anggaran Keseluruhan Kegiatan      │
   │  - Tampilkan Laporan Agregat Akhir                     │
   └────────────────────────────────────────────────────────┘
              │
              ▼
       [Selesai Program]
```

### Keunggulan Strategi Ini:
1. **Bebas Array / Memori Dinamis:** Data tidak perlu disimpan ke dalam array atau struktur data berukuran besar. Variabel akumulator Modul B langsung menangkap dan mengagregasi nilai dari Modul A pada saat komponen selesai divalidasi.
2. **Efisiensi Waktu Eksekusi $O(N)$:** Pemeriksaan rincian dan pembaruan rekapitulasi dilakukan dalam satu kali pembacaan data tanpa iterasi ganda.
3. **Pengalaman Pengguna (UX) yang Jelas:** Pengguna langsung mengetahui status komponen yang baru dimasukkan (apakah hemat atau perlu dievaluasi), dan setelah semua data dimasukkan, langsung disajikan kesimpulan akhir kegiatan.

---

## 3. Matriks Komunikasi dan Aliran Data Antarmodul

Berikut tabel yang memetakan bagaimana data mengalir dari Modul A ke Modul B dalam program terintegrasi:

| Data / Variabel | Modul Asal | Modul Tujuan | Peran dalam Program Terintegrasi |
|---|:---:|:---:|---|
| `namaKomponen` | Modul A | Modul B | Ditampilkan pada rincian per komponen (Modul A) dan dicatat sebagai `komponenTerbesar` jika mengalami kelebihan terbesar (Modul B). |
| `anggaranRencana` | Modul A | Modul B | Divalidasi dan dihitung penyimpangannya (Modul A), lalu diakumulasikan ke `totalRencana` (Modul B). |
| `realisasi` | Modul A | Modul B | Divalidasi (Modul A), lalu diakumulasikan ke `totalRealisasi` (Modul B). |
| `selisih` | Modul A | Modul B | Menentukan status Hemat/Tepat/Melebihi (Modul A), lalu diakumulasikan ke `totalPenghematan` atau `totalKelebihan` serta dibandingkan dengan `penyimpanganTerbesar` (Modul B). |
| `status` & `keterangan` | Modul A | Pengguna | Dicetak langsung di konsol sebagai umpan balik instan untuk bendahara kegiatan. |
| `pilihan` (`y`/`t`) | Antarmuka Bersama | Kontrol Loop | Mengatur apakah program terus menerima komponen baru atau melangkah ke rekapitulasi akhir. |
| `kondisiKegiatan` | Modul B | Pengguna | Menentukan hasil akhir kondisi kegiatan (Hemat / Sesuai Anggaran / Melebihi Anggaran) sebagai penutup laporan. |

---

## 4. Mekanisme Validasi dan Pencegahan Error

Program terintegrasi menerapkan standar validasi ketat dari kedua modul:
1. **Pencegahan Data Kosong:** `namaKomponen` dicek dengan `namaKomponen.empty()` agar tidak menerima input kosong dari tombol Enter.
2. **Pencegahan Tipe Data Rusak:** `anggaranRencana` dan `realisasi` divalidasi dengan `cin.fail()`. Jika pengguna memasukkan huruf atau karakter khusus, program melakukan pembersihan memori stream (`cin.clear()` dan `cin.ignore()`).
3. **Pencegahan Nilai Tidak Logis:** Anggaran rencana wajib $> 0$, realisasi wajib $\ge 0$.
4. **Pencegahan Crash Pembagian Nol:** Pada perhitungan persentase penyerapan (`totalRealisasi / totalRencana`), program memeriksa kondisi `if (totalRencana > 0)` sebelum melakukan operasi pembagian.
5. **Pembersihan Buffer Input:** Perintah `cin.ignore(1000, '\n')` dipasang setelah pembacaan karakter `pilihan`, sehingga iterasi berikutnya dapat membaca `getline()` nama komponen baru dengan sempurna tanpa terpotong.

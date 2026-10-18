# Hasil Eksekusi dan Pengujian Program Terintegrasi

**Penanggung Jawab:** Nadin Arifa Salsabila (322610009) & Bryant Anthony Kores Obhetan (322610003)

---

## 1. Tabel Pengujian Program Terintegrasi (8 Skenario Uji)

Pengujian program terintegrasi memverifikasi sinkronisasi antara evaluasi instan per komponen (Modul A) dan agregasi akumulasi rekapitulasi akhir (Modul B).

| No. | Skenario Pengujian | Data Masukan | Hasil yang Diharapkan | Hasil Aktual | Status |
|:---:|---|---|---|---|:---:|
| 1 | **Uji Normal Campuran**<br>(Hemat, Tepat, dan Melebihi) | 1. Konsumsi: 500000, 400000<br>2. Dekorasi: 300000, 300000<br>3. Publikasi: 200000, 350000 | **Modul A:**<br>- K1: Hemat, selisih -100rb (-20%), ket `-`<br>- K2: Tepat, selisih 0 (0%), ket `-`<br>- K3: Melebihi, selisih +150rb (+75%), ket Peringatan<br>**Modul B:**<br>- Total Rencana: Rp1.000.000<br>- Total Realisasi: Rp1.050.000<br>- Penghematan: Rp100.000, Kelebihan: Rp150.000<br>- Penyerapan: 105.00%<br>- Hemat: 1, Tepat: 1, Melebihi: 1<br>- Penyimpangan Terbesar: Publikasi (+Rp150.000)<br>- Kondisi Kegiatan: Melebihi Anggaran | Evaluasi Modul A tercetak tepat untuk tiap komponen; Rekapitulasi Modul B menghasilkan Total Rencana Rp1.000.000, Realisasi Rp1.050.000, Penghematan Rp100.000, Kelebihan Rp150.000, Penyerapan 105.00%, Penyimpangan Terbesar Publikasi (+Rp150.000), Kondisi: Melebihi Anggaran | **Berhasil** |
| 2 | **Uji Seluruhnya Hemat** | 1. Transportasi: 800000, 600000<br>2. Perlengkapan: 1200000, 1000000 | **Modul A:** Kedua komponen berstatus Hemat.<br>**Modul B:** Total Rencana Rp2.000.000, Realisasi Rp1.600.000, Total Penghematan Rp400.000, Kelebihan Rp0, Penyerapan 80%, Penyimpangan Terbesar: `-`, Kondisi: Hemat | Modul A & B berjalan serasi; akumulasi penghematan tercatat Rp400.000, kelebihan Rp0, penyerapan 80.00%, status akhir kegiatan Hemat | **Berhasil** |
| 3 | **Uji Seluruhnya Tepat Sasaran** | 1. Honor Pemateri: 1500000, 1500000<br>2. Sewa Zoom: 250000, 250000 | **Modul A:** Kedua komponen Tepat, selisih 0.<br>**Modul B:** Total Rencana Rp1.750.000, Realisasi Rp1.750.000, Penyerapan 100%, Hemat: 0, Tepat: 2, Melebihi: 0, Penyimpangan: `-`, Kondisi: Sesuai Anggaran | Modul A menampilkan Tepat; Modul B menampilkan Penyerapan 100.00%, Penyimpangan `-`, Kondisi: Sesuai Anggaran | **Berhasil** |
| 4 | **Batas Toleransi 10% (Perlu Evaluasi vs Peringatan)** | 1. Spanduk: 500000, 550000 (+10%)<br>2. Konsumsi: 400000, 460000 (+15%) | **Modul A:**<br>- Spanduk: Melebihi, Keterangan "Perlu Evaluasi"<br>- Konsumsi: Melebihi, Keterangan "Peringatan"<br>**Modul B:** Melebihi: 2, Penyimpangan Terbesar: Konsumsi (+Rp60.000) | Modul A membedakan batas 10% dengan tepat; Modul B mencatat Konsumsi (+Rp60.000) sebagai kelebihan tertinggi | **Berhasil** |
| 5 | **Batas Bawah Nilai Nol pada Realisasi** | 1. Cadangan: 1000000, 0 | **Modul A:** Hemat, selisih -1.000.000 (-100%).<br>**Modul B:** Total Rencana Rp1.000.000, Realisasi Rp0, Penghematan Rp1.000.000, Penyerapan 0.00%, Kondisi: Hemat | Program menerima angka 0 tanpa error; selisih penuh dicatat sebagai penghematan | **Berhasil** |
| 6 | **Batas Minimal Satu Komponen Saja** | 1. Kebersihan: 200000, 180000, langsung pilih 't' | **Modul A:** Rincian Kebersihan Hemat.<br>**Modul B:** Total Komponen: 1, Total Rencana Rp200.000, Realisasi Rp180.000, Penyerapan 90.00%, Kondisi: Hemat | Program memproses satu siklus dengan sempurna dan keluar normal saat diberi opsi 't' | **Berhasil** |
| 7 | **Uji Ketahanan Input Salah (Robustness)** | Enter kosong, "Konsumsi", rencana: `0`, `-50000`, `abc`, `400000`; realisasi: `-10000`, `xyz`, `350000`; pilihan: `x`, `t` | Semua kesalahan ditolak dengan pesan peringatan ramah; program tidak mengalami crash; data valid diproses; program berhenti bersih pada pilihan 't' | Program berhasil menolak semua input salah dan melanjutkan eksekusi hingga menghasilkan laporan akhir | **Berhasil** |
| 8 | **Uji Keseimbangan Agregat (Impas Total)** | 1. Panggung: 600000, 500000 (Hemat 100rb)<br>2. Sound: 400000, 500000 (Lebih 100rb) | **Modul A:** K1 Hemat, K2 Melebihi (Peringatan).<br>**Modul B:** Rencana Rp1.000.000, Realisasi Rp1.000.000, Penghematan Rp100.000, Kelebihan Rp100.000, Penyerapan 100.00%, Kondisi: Sesuai Anggaran | Modul A menampilkan detail masing-masing; Modul B secara tepat menyatakan kondisi keseluruhan Sesuai Anggaran | **Berhasil** |

---

## 2. Trace Table Program Terintegrasi

### Trace Table Integrasi Lengkap (Aliran Data Skenario 1)

Trace table berikut menggambarkan sinkronisasi variabel per komponen (Modul A) ke variabel akumulator (Modul B):

| Tahap | Komponen | Rencana | Realisasi | Selisih | Modul A: Status | Modul A: Keterangan | Modul B: Total Rencana | Modul B: Total Realisasi | Modul B: Total Hemat | Modul B: Total Lebih | Modul B: Peak Komponen | Modul B: Loop Pilihan |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Awal | - | - | - | - | - | - | 0.0 | 0.0 | 0.0 | 0.0 | `"-"` | - |
| Data 1 | Konsumsi | 500000 | 400000 | -100000 | **Hemat** | `"-"` | 500000.0 | 400000.0 | 100000.0 | 0.0 | `"-"` | `"y"` (Lanjut) |
| Data 2 | Dekorasi | 300000 | 300000 | 0 | **Tepat** | `"-"` | 800000.0 | 700000.0 | 100000.0 | 0.0 | `"-"` | `"y"` (Lanjut) |
| Data 3 | Publikasi | 200000 | 350000 | +150000 | **Melebihi Anggaran** | **Peringatan** | 1000000.0 | 1050000.0 | 100000.0 | 150000.0 | **"Publikasi"** | `"t"` (Selesai) |

**Hasil Akhir Pasca Perulangan:**
- `persentasePenyerapan = (1050000.0 / 1000000.0) * 100.0 = 105.00%`
- Perbandingan: `1050000.0 > 1000000.0` $\rightarrow$ `kondisiKegiatan = "Melebihi Anggaran"`

---

## 3. Contoh Output Eksekusi Terminal Terintegrasi

```text
======================================================================
      SISTEM EVALUASI & REKAPITULASI ANGGARAN KEGIATAN MAHASISWA      
                      (PROGRAM TERINTEGRASI)                          
======================================================================

--------------------------------------------------
 INPUT KOMPONEN ANGGARAN KE-1
--------------------------------------------------
Nama komponen               : Konsumsi Acara
Anggaran rencana (Rp)       : 500000
Realisasi pengeluaran (Rp)  : 400000

>>> HASIL PEMERIKSAAN KOMPONEN (MODUL A) <<<
Komponen                    : Konsumsi Acara
Anggaran Rencana            : Rp500000.00
Realisasi                   : Rp400000.00
Selisih                     : Rp-100000.00
Persentase Penyimpangan     : -20.00%
Status                      : Hemat
Keterangan                  : -

Periksa/tambah komponen lain? (y/t): y

--------------------------------------------------
 INPUT KOMPONEN ANGGARAN KE-2
--------------------------------------------------
Nama komponen               : Dekorasi Panggung
Anggaran rencana (Rp)       : 300000
Realisasi pengeluaran (Rp)  : 300000

>>> HASIL PEMERIKSAAN KOMPONEN (MODUL A) <<<
Komponen                    : Dekorasi Panggung
Anggaran Rencana            : Rp300000.00
Realisasi                   : Rp300000.00
Selisih                     : Rp0.00
Persentase Penyimpangan     : 0.00%
Status                      : Tepat
Keterangan                  : -

Periksa/tambah komponen lain? (y/t): y

--------------------------------------------------
 INPUT KOMPONEN ANGGARAN KE-3
--------------------------------------------------
Nama komponen               : Publikasi dan Medsos
Anggaran rencana (Rp)       : 200000
Realisasi pengeluaran (Rp)  : 350000

>>> HASIL PEMERIKSAAN KOMPONEN (MODUL A) <<<
Komponen                    : Publikasi dan Medsos
Anggaran Rencana            : Rp200000.00
Realisasi                   : Rp350000.00
Selisih                     : Rp150000.00
Persentase Penyimpangan     : 75.00%
Status                      : Melebihi Anggaran
Keterangan                  : Peringatan

Periksa/tambah komponen lain? (y/t): t

======================================================================
              LAPORAN REKAPITULASI AKHIR KEGIATAN MAHASISWA           
======================================================================
Total Komponen Terperiksa   : 3
Total Rencana Anggaran      : Rp1000000.00
Total Realisasi Pengeluaran : Rp1050000.00
Total Penghematan           : Rp100000.00
Total Kelebihan Pengeluaran : Rp150000.00
Persentase Penyerapan       : 105.00%

--- Statistik Jumlah Komponen ---
Komponen Hemat              : 1
Komponen Tepat Sasaran      : 1
Komponen Melebihi Anggaran  : 1

--- Analisis Penyimpangan & Hasil Akhir ---
Komponen Penyimpangan Terbesar : Publikasi dan Medsos (+Rp150000.00)
KONDISI KEGIATAN KESELURUHAN   : Melebihi Anggaran
======================================================================
Pemeriksaan dan rekapitulasi anggaran selesai dieksekusi.
```

---

## 4. Kesimpulan Hasil Pengujian Integrasi

1. **Sinkronisasi Sempurna:** Evaluasi detail per komponen dari Modul A dan akumulasi rekapitulasi dari Modul B bekerja secara harmonis tanpa saling menimpa data variabel.
2. **Kesesuaian dengan Ketentuan Kasus 09:** Seluruh indikator yang diminta pada Studi Kasus 09 (perhitungan selisih, persentase penyimpangan, status hemat/tepat/melebihi, keterangan evaluasi $\le 10\%$, total agregat, statistik kategori, penyerapan dana, penyimpangan tertinggi, dan kesimpulan kondisi kegiatan) terbukti berfungsi 100%.
3. **Ketahanan Eksekusi:** Sistem terbukti kebal terhadap input salah (*robust*) dan tidak berhenti mendadak (*crash*).

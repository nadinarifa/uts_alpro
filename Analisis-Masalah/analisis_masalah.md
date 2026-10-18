# Analisis Masalah

**Mata Kuliah:** Algoritma dan Pengantar Pemrograman (SSI1144)  
**Program Studi:** Sistem Informasi - Fakultas Teknologi dan Desain, Universitas Ma Chung  
**Studi Kasus 09:** Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa  

---

## 1. Latar Belakang dan Rumusan Masalah

### A. Latar Belakang
Dalam setiap organisasi kemahasiswaan (BEM, Himpunan Mahasiswa, maupun Kepanitiaan Program Kerja), akuntabilitas pengelolaan anggaran kegiatan merupakan aspek krusial. Setiap kegiatan memiliki rencana anggaran biaya (RAB) yang telah disetujui sebelumnya. Namun, selama masa realisasi, sering kali terjadi variasi pengeluaran: ada pos anggaran yang berhasil dihemat, pos yang terealisasi tepat sesuai anggaran, dan pos yang mengalami pembengkakan biaya (*overbudget*).

Tanpa sistem komputasi yang otomatis, bendahara sering kali kesulitan melacak penyimpangan pada setiap pos secara cepat, menentukan persentase serapan dana, serta mengidentifikasi pos pengeluaran mana yang mengalami kebocoran anggaran paling parah. Oleh karena itu, dibutuhkan sebuah program konsol berbasis algoritma yang mampu mengevaluasi penggunaan anggaran secara presisi, objektif, dan transparan.

### B. Rumusan Masalah
1. Bagaimana merancang program untuk menghitung selisih dan persentase penyimpangan belanja per komponen terhadap anggaran rencana?
2. Bagaimana mengklasifikasikan status pengeluaran tiap komponen ke dalam kategori *Hemat*, *Tepat*, atau *Melebihi Anggaran*?
3. Bagaimana memberikan peringatan proporsional (*Perlu Evaluasi* vs *Peringatan*) saat terjadi pembengkakan di atas ambang batas toleransi 10%?
4. Bagaimana mengagregasi total rencana, total realisasi, penghematan, kelebihan pengeluaran, rasio penyerapan dana, serta menemukan pos dengan penyimpangan terbesar tanpa menggunakan array?
5. Bagaimana menyimpulkan kondisi anggaran kegiatan secara keseluruhan (*Hemat*, *Sesuai Anggaran*, atau *Melebihi Anggaran*)?

---

## 2. Tujuan dan Pengguna Program

### A. Tujuan Program
1. Membantu otomatisasi evaluasi pengeluaran kegiatan per pos anggaran.
2. Memberikan umpan balik instan (*real-time feedback*) terkait efisiensi belanja.
3. Menyajikan laporan rekapitulasi komprehensif bagi pimpinan organisasi.
4. Mencegah terjadinya defisit anggaran dengan mendeteksi pembengkakan secara dini.

### B. Sasaran Pengguna Program
- **Bendahara Kegiatan / Organisasi:** Sebagai operator utama pemeriksa bukti kuitansi dan realisasi pengeluaran.
- **Ketua Panitia / Pimpinan Organisasi:** Sebagai pihak pengambil keputusan berbasis laporan rekapitulasi akhir.
- **Dosen Pembimbing / Auditor Kampus:** Sebagai pihak verifikator laporan pertanggungjawaban (LPJ) keuangan.

---

## 3. Ketentuan dan Batasan Program

### A. Ketentuan Perhitungan (Studi Kasus 09)
1. **Perhitungan Selisih dan Persentase:**
   $$\text{Selisih} = \text{Realisasi} - \text{Anggaran Rencana}$$
   $$\text{Persentase Penyimpangan} = \left(\frac{\text{Selisih}}{\text{Anggaran Rencana}}\right) \times 100\%$$
2. **Kategori Status Komponen:**
   - Realisasi < Anggaran Rencana: **Hemat** (Keterangan: `-`)
   - Realisasi == Anggaran Rencana: **Tepat** (Keterangan: `-`)
   - Realisasi > Anggaran Rencana: **Melebihi Anggaran**
3. **Keterangan Evaluasi Pembengkakan:**
   - Kelebihan $\le 10\%$ dari anggaran rencana: **Perlu Evaluasi**
   - Kelebihan $> 10\%$ dari anggaran rencana: **Peringatan**
4. **Rekapitulasi Agregat:**
   - Akumulasi total rencana dan total realisasi.
   - Akumulasi total penghematan ($\sum (\text{rencana} - \text{realisasi})$ pada pos hemat).
   - Akumulasi total kelebihan pengeluaran ($\sum \text{selisih}$ pada pos melebihi).
   - Persentase Penyerapan: $\left(\frac{\text{Total Realisasi}}{\text{Total Rencana}}\right) \times 100\%$
   - Pelacakan komponen dengan nominal pembengkakan terbesar.
5. **Hasil Akhir Kondisi Kegiatan:**
   - Total Realisasi < Total Rencana: **Hemat**
   - Total Realisasi == Total Rencana: **Sesuai Anggaran**
   - Total Realisasi > Total Rencana: **Melebihi Anggaran**

### B. Batasan Sistem (Sesuai Silabus UTS Semester 1)
- Dijalankan murni melalui **terminal / console**.
- Menggunakan bahasa **C++**.
- Menerapkan tipe data primitif, operator aritmetika/relasional/logika, percabangan (`if-else`), dan perulangan (`do...while`).
- **Belum menggunakan** array, struct/class, fungsi kompleks, database, atau framework eksternal.
- Menolak input yang tidak logis: anggaran rencana $\le 0$, realisasi $< 0$, string kosong, dan non-numerik.

---

## 4. Analisis Input - Process - Output (Tabel IPO)

| Tahap | Deskripsi Data & Logika |
|---|---|
| **Input (Masukan)** | 1. `namaKomponen` (string): Nama pos belanja (misal: "Konsumsi", "Dekorasi").<br>2. `anggaranRencana` (double): Alokasi pagu dana rencana (wajib $> 0$).<br>3. `realisasi` (double): Pengeluaran aktual (wajib $\ge 0$).<br>4. `pilihan` (char/string): Konfirmasi pengulangan data (`y` / `t`). |
| **Process (Proses)** | 1. **Validasi Masukan:** Pengecekan nama tidak kosong, pengecekan `cin.fail()`, nilai positif.<br>2. **Perhitungan Selisih:** `selisih = realisasi - anggaranRencana`.<br>3. **Perhitungan Persen Penyimpangan:** `persenPenyimpangan = (selisih / anggaranRencana) * 100`.<br>4. **Penentuan Status & Keterangan (Modul A):** Logika percabangan menentukan status Hemat/Tepat/Melebihi dan ambang 10%.<br>5. **Akumulasi Rekapitulasi (Modul B):** `totalRencana += ...`, `totalRealisasi += ...`, pencacahan kategori, akumulasi penghematan/kelebihan.<br>6. **Pelacakan Maksimum:** Jika `selisih > penyimpanganTerbesar`, perbarui nilai rekor dan catat nama komponen.<br>7. **Kalkulasi Penyerapan Dana:** `(totalRealisasi / totalRencana) * 100`.<br>8. **Penentuan Kondisi Akhir Kegiatan:** Perbandingan `totalRealisasi` terhadap `totalRencana`. |
| **Output (Keluaran)** | 1. **Rincian Per Komponen:** Nama komponen, anggaran rencana, realisasi, selisih nominal, persentase penyimpangan, status, dan keterangan.<br>2. **Laporan Rekapitulasi Akhir:** Total komponen, total rencana, total realisasi, total penghematan, total kelebihan, persentase penyerapan, statistik jumlah komponen per kategori, nama komponen penyimpangan terbesar beserta nominalnya, dan kesimpulan kondisi kegiatan secara keseluruhan. |

---

## 5. Variabel dan Tipe Data

| Nama Variabel | Tipe Data | Nilai Awal | Lingkup / Modul | Deskripsi & Kegunaan |
|---|:---:|:---:|:---:|---|
| `namaKomponen` | `string` | `""` | Modul A | Menyimpan nama deskriptif pos pengeluaran anggaran. |
| `anggaranRencana`| `double` | `0.0` | Modul A | Menyimpan nominal pagu anggaran yang direncanakan. |
| `realisasi` | `double` | `0.0` | Modul A | Menyimpan nominal belanja aktual yang dikeluarkan. |
| `selisih` | `double` | `0.0` | Modul A & B | Menyimpan hasil pengurangan `realisasi - anggaranRencana`. |
| `persenPenyimpangan`| `double`| `0.0` | Modul A | Menyimpan rasio persentase penyimpangan belanja per komponen. |
| `status` | `string` | `""` | Modul A | Menyimpan kategori status komponen ("Hemat", "Tepat", "Melebihi Anggaran"). |
| `keterangan` | `string` | `"-"` | Modul A | Menyimpan catatan evaluasi ("-", "Perlu Evaluasi", "Peringatan"). |
| `pilihan` | `string` | `""` | Antarmuka Bersama | Menyimpan opsi pengguna untuk mengulang (`y`) atau mengakhiri (`t`). |
| `totalKomponen` | `int` | `0` | Modul B | Pencacah jumlah total komponen yang berhasil diproses. |
| `jumlahHemat` | `int` | `0` | Modul B | Pencacah banyaknya komponen yang berstatus Hemat. |
| `jumlahTepat` | `int` | `0` | Modul B | Pencacah banyaknya komponen yang berstatus Tepat. |
| `jumlahMelebihi`| `int` | `0` | Modul B | Pencacah banyaknya komponen yang berstatus Melebihi Anggaran. |
| `totalRencana` | `double` | `0.0` | Modul B | Akumulator penjumlahan seluruh anggaran rencana komponen. |
| `totalRealisasi`| `double` | `0.0` | Modul B | Akumulator penjumlahan seluruh realisasi pengeluaran. |
| `totalPenghematan`| `double`| `0.0` | Modul B | Akumulator total dana yang berhasil dihemat. |
| `totalKelebihan`| `double` | `0.0` | Modul B | Akumulator total pembengkakan biaya (*overbudget*). |
| `penyimpanganTerbesar`| `double`| `0.0`| Modul B | Menampung nilai nominal pembengkakan tertinggi yang tercatat. |
| `komponenTerbesar`| `string`| `"-"` | Modul B | Menampung nama pos anggaran dengan pembengkakan tertinggi. |
| `persentasePenyerapan`| `double`| `0.0`| Modul B | Menyimpan persentase realisasi terhadap rencana secara agregat. |
| `kondisiKegiatan`| `string`| `"-"` | Modul B | Menyimpan status agregat kegiatan ("Hemat", "Sesuai Anggaran", "Melebihi Anggaran"). |

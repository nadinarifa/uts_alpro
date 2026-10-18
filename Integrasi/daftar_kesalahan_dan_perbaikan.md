# Daftar Kesalahan dan Perbaikan (Bug Tracking Log)

**Proyek:** Evaluasi & Rekapitulasi Anggaran Kegiatan Mahasiswa (Studi Kasus 09)  
**Kelompok:** Nadin Arifa Salsabila (322610009) & Bryant Anthony Kores Obhetan (322610003)

Selama proses perancangan, implementasi, dan integrasi program, ditemukan beberapa kendala teknis serta kesalahan logika program (*logical/runtime bugs*). Berikut catatan inventarisasi kesalahan beserta solusi perbaikannya:

---

### 1. Kesalahan Buffer Input pada `getline()` Setelah `cin >>`
- **Gejala Masalah:**  
  Ketika pengguna memilih lanjut (`y`) pada iterasi kedua, program langsung mencetak peringatan `"Nama komponen tidak boleh kosong"` tanpa memberi kesempatan pengguna untuk mengetik nama komponen baru.
- **Penyebab:**  
  Perintah `cin >> pilihan` hanya membaca karakter huruf dan meninggalkan karakter *Enter/Newline* (`\n`) di dalam memori buffer input. Ketika perulangan kembali ke atas dan mengeksekusi `getline(cin, namaKomponen)`, `getline` langsung menangkap sisa karakter `\n` tersebut sebagai string kosong.
- **Solusi Perbaikan:**  
  Menambahkan pembersihan buffer `cin.ignore(1000, '\n')` tepat setelah masukan `pilihan` berhasil divalidasi. Dengan begitu, buffer kembali bersih sebelum `getline` dieksekusi.

---

### 2. Terjadinya *Infinite Loop* Saat Pengguna Memasukkan Karakter Huruf pada Angka
- **Gejala Masalah:**  
  Jika pengguna tidak sengaja mengetik huruf (misalnya `"lima ratus ribu"` bukannya `500000`) pada masukan anggaran atau realisasi, konsol terminal mengalami *looping* tanpa henti dan mencetak pesan peringatan terus-menerus.
- **Penyebab:**  
  Saat tipe data angka menerima masukan karakter huruf, stream `cin` mengalami kegagalan (*fail state* / `cin.fail() == true`). Karakter salah tersebut tidak terambil dari buffer, sehingga setiap perulangan memeriksa karakter yang sama berulang kali.
- **Solusi Perbaikan:**  
  Menyisipkan penanganan kesalahan:
  ```cpp
  cin.clear();            // Mereset status error stream input
  cin.ignore(1000, '\n'); // Membuang karakter salah dari antrean buffer
  ```
  Sehingga program dapat meminta input baru secara normal tanpa berhenti mendadak.

---

### 3. Ketidakakuratan Batas Toleransi 10% Akibat Presisi Pecahan (*Floating-Point Rounding Error*)
- **Gejala Masalah:**  
  Pada skenario uji di mana kelebihan pengeluaran tepat $10\%$ dari rencana (misalnya rencana $500.000$ dan realisasi $550.000$, selisih $50.000$), rumus pembagian `(selisih / anggaranRencana) <= 0.1` terkadang menghasilkan evaluasi `false` karena representasi bilangan pecahan pada memori komputer (misal `0.10000000149`). Hal ini menyebabkan status melonjak menjadi `"Peringatan"`.
- **Penyebab:**  
  Ketidaktelitian representasi bilangan biner terhadap pecahan desimal berulang.
- **Solusi Perbaikan:**  
  Mengubah formula evaluasi menjadi perkalian silang bilangan bulat:
  ```cpp
  if (selisih * 100.0 <= anggaranRencana * 10.0)
  ```
  Formula ini ekuivalen secara matematis namun bebas dari galat pembagian desimal.

---

### 4. Risiko Kesalahan Pembagian Nol (*Division by Zero*)
- **Gejala Masalah:**  
  Pada pengujian kondisi batas di mana program dijalankan tanpa komponen bernilai anggaran rencana ($totalRencana = 0$), perhitungan persentase penyerapan menghasilkan nilai `NaN` (*Not a Number*) atau `inf` (*Infinity*).
- **Penyebab:**  
  Operasi pembagian langsung `totalRealisasi / totalRencana` saat penyebut bernilai nol.
- **Solusi Perbaikan:**  
  Menambahkan pengondisian defensif sebelum kalkulasi:
  ```cpp
  if (totalRencana > 0) {
      persentasePenyerapan = (totalRealisasi / totalRencana) * 100.0;
  } else {
      persentasePenyerapan = 0.0;
  }
  ```

---

### 5. Penggunaan Fitur di Luar Silabus pada Draf Awal Modul B
- **Gejala Masalah:**  
  Pada draf awal Modul B, kode menggunakan `struct Komponen` dan `vector<Komponen>`. Hal ini tidak sesuai dengan batasan penugasan UTS semester 1 (Bagian E batasan proyek) yang menghendaki murni pemahaman variabel, operator, percabangan, dan perulangan. Selain itu, program draf awal tidak memiliki perulangan input terminal interaktif.
- **Penyebab:**  
  Rancangan awal mengasumsikan data Modul B disuplai dari struktur data statis, bukan dijalankan mandiri di terminal.
- **Solusi Perbaikan:**  
  Mengeliminasi penggunaan `struct` dan `vector`, lalu menyusun ulang logika menggunakan konsep variabel akumulator dasar (`totalRencana += ...`) dan perbandingan nilai maksimum langsung (`if (selisih > penyimpanganTerbesar)`). Program menjadi jauh lebih sederhana, ringan, efisien, dan 100% mematuhi kaidah materi perkuliahan UTS.

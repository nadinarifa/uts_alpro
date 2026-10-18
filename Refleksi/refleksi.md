# Refleksi Proyek UTS Algoritma dan Pemrograman

**Mata Kuliah:** Algoritma dan Pengantar Pemrograman (SSI1144)  
**Program Studi:** Sistem Informasi - Fakultas Teknologi dan Desain, Universitas Ma Chung  
**Studi Kasus 09:** Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa  

---

## 1. Pembagian Pekerjaan

Proyek Ujian Tengah Semester (UTS) ini diselesaikan melalui kolaborasi berkelompok beranggotakan dua mahasiswa, dengan pembagian peran utama yang jelas dan saling mendukung:

| No. | Nama Mahasiswa | NIM | Peran Utama | Tanggung Jawab Spesifik |
|:---:|---|:---:|---|---|
| 1 | **Nadin Arifa Salsabila** | 322610009 | Penanggung Jawab **Modul A** | - Menganalisis kebutuhan masukan data komponen individual.<br>- Merancang algoritma deskriptif, pseudocode, dan flowchart Modul A.<br>- Mengimplementasikan logika evaluasi status (*Hemat*, *Tepat*, *Melebihi Anggaran*) dan keterangan evaluasi batas 10%.<br>- Melakukan pengujian individual 8 skenario Modul A.<br>- Berkolaborasi dalam proses integrasi program. |
| 2 | **Bryant Anthony Kores Obhetan** | 322610003 | Penanggung Jawab **Modul B** | - Menganalisis kebutuhan data agregasi rekapitulasi anggaran.<br>- Merancang algoritma deskriptif, pseudocode, dan flowchart Modul B.<br>- Mengimplementasikan logika variabel akumulator, kalkulasi penyerapan dana, penentuan penyimpangan terbesar tanpa array, dan kesimpulan kondisi kegiatan akhir.<br>- Menyiapkan pengujian 8 skenario Modul B serta 2 *trace table*.<br>- Mengembangkan source code mandiri `modul_b.cpp` dan menguji di konsol terminal.<br>- Berkolaborasi dalam proses integrasi dan penyusunan refleksi. |

---

## 2. Kontribusi Anggota dan Dinamika Kelompok

Kedua anggota kelompok bekerja secara aktif dengan prinsip **pemeriksaan silang (*cross-checking*)** dan saling melengkapi:
- **Pemeriksaan Silang Algoritma:** Sebelum source code digabungkan, Nadin dan Bryant saling meninjau algoritma deskriptif dan pseudocode pasangannya untuk memastikan variabel yang digunakan konsisten dalam penamaan tipe data serta tidak terjadi tumpang tindih logika.
- **Kolaborasi Integrasi:** Pada tahap integrasi, Bryant menyatukan mekanisme akumulator Modul B ke dalam alur proses perulangan Modul A milik Nadin, sehingga kedua modul dapat berjalan simultan dalam satu perulangan tanpa memerlukan struktur array tambahan.
- **Pengujian Bersama:** Kedua anggota saling menjalankan dan memverifikasi skenario pengujian di lingkungan lokal masing-masing untuk memastikan program tidak mengalami *crash* dan menolak masukan salah dengan tepat.

---

## 3. Bagian Tersulit Selama Pengerjaan

Selama proses perancangan hingga implementasi, beberapa tantangan teknis paling menantang yang dihadapi meliputi:
1. **Pembersihan Buffer Input Konsol C++:**  
   Mengombinasikan pembacaan teks berspasi menggunakan `getline()` dengan pembacaan tipe data angka menggunakan `cin >>` sempat menimbulkan masalah *buffer flush*. Karakter Enter (`\n`) yang tertinggal menyebabkan input nama komponen pada perulangan berikutnya langsung terlewati. Diperlukan pemahaman mendalam tentang fungsi `cin.ignore()` dan `cin.clear()` untuk mengatasinya.
2. **Pelacakan Penyimpangan Terbesar Tanpa Menggunakan Array:**  
   Karena batasan proyek UTS semester 1 melarang penggunaan array dan memori dinamis, pelacakan komponen dengan pembengkakan nominal terbesar harus diselesaikan secara dinamis *on-the-fly* pada setiap iterasi dengan membandingkan nilai selisih terhadap variabel rekor `penyimpanganTerbesar`.
3. **Penanganan Presisi Desimal dan Kondisi Batas Toleransi 10%:**  
   Menguji batas toleransi $10\%$ menggunakan operasi pembagian desimal sempat menimbulkan galat pembulatan bilangan pecahan (*floating point precision*). Masalah ini berhasil dipecahkan dengan mengubah formula evaluasi menjadi perkalian silang tanpa pembagian.

---

## 4. Kesalahan dan Pembelajaran Perbaikan

Beberapa pelajaran berharga yang dipetik dari kesalahan yang terjadi:
- **Pentingnya Validasi Defensif:** Mengasumsikan pengguna selalu memasukkan data yang benar adalah kesalahan fatal dalam rekayasa perangkat lunak. Penambahan validasi `cin.fail()` dan penolakan nilai negatif membuat aplikasi jauh lebih andal (*robust*).
- **Kepatuhan Terhadap Batasan Proyek:** Draf awal Modul B yang sempat menggunakan `vector` dan `struct` harus direfaktor ulang agar sesuai dengan capaian pembelajaran mata kuliah semester 1. Proses refaktor ini mengajarkan bahwa solusi yang lebih sederhana (*fundamental programming*) sering kali jauh lebih elegan dan efisien.

---

## 5. Pengetahuan dan Keterampilan yang Diperoleh

Melalui pengerjaan proyek UTS ini, mahasiswa berhasil memperoleh penguasaan kompetensi praktis:
1. **Pemahaman Algoritmik yang Terstruktur:** Mampu mengubah deskripsi studi kasus dunia nyata menjadi pemodelan logika terurut (analisis IPO, algoritma deskriptif, pseudocode formal, dan flowchart standar ISO/Mermaid).
2. **Penguasaan Sintaks dan Kontrol Aliran C++:** Menguasai penggunaan tipe data primitif, operator relasional/logika, percabangan bersarang (*nested if-else*), serta perulangan terkontrol (`do ... while`).
3. **Pengujian dan Penelusuran Variabel (*Trace Table*):** Memahami cara menelusuri eksekusi program langkah demi langkah di atas kertas sebelum menulis baris kode, sehingga memudahkan proses pelacakan *bug*.
4. **Keterampilan Git dan GitHub:** Mampu mengelola repositori tim, mencatat riwayat *commit* bermakna secara berkala, dan mempublikasikan dokumentasi teknis via GitHub.

---

## 6. Rencana Pengembangan untuk Ujian Akhir Semester (UAS)

Berdasarkan fondasi sistem yang telah dibangun pada UTS, kelompok merencanakan beberapa peningkatan arsitektural untuk proyek UAS mendatang:
1. **Modularisasi Kode dengan Fungsi dan Prosedur:**  
   Memecah program terintegrasi yang monolitik menjadi fungsi-fungsi independen (misal `validasiInput()`, `hitungStatusKomponen()`, `cetakLaporan()`) dengan parameter passing (*by value* dan *by reference*).
2. **Penyimpanan Data Menggunakan Array of Struct:**  
   Menerapkan konsep `struct` untuk membungkus atribut komponen, sehingga data riwayat seluruh komponen dapat disimpan di memori dan dipanggil kembali untuk fitur pencarian (*searching*) atau pengurutan (*sorting* berdasarkan nominal pengeluaran terbesar).
3. **Persistensi Data Melalui File I/O:**  
   Menambahkan kemampuan untuk mengekspor laporan rekapitulasi ke berkas teks (`.txt` atau `.csv`) dan membaca rancangan anggaran dari berkas eksternal.
4. **Antarmuka Grafis (GUI) atau Integrasi Web:**  
   Mengembangkan tampilan berbasis antarmuka grafis yang lebih interaktif dan ramah pengguna.

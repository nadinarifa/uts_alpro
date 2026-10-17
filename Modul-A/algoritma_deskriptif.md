**Penanggung jawab:** Nadin Arifa Salsabila / 322610009

## Algoritma Deskriptif

1. Mulai.
2. Program menampilkan judul pemeriksaan anggaran.
3. Pengguna memasukkan nama komponen. Jika nama kosong, program menampilkan pesan kesalahan dan meminta input ulang sampai terisi.
4. Pengguna memasukkan anggaran rencana. Jika bukan angka atau nilainya kurang dari atau sama dengan nol, program menampilkan pesan kesalahan dan meminta input ulang sampai nilainya valid.
5. Pengguna memasukkan realisasi pengeluaran. Jika bukan angka atau nilainya negatif, program menampilkan pesan kesalahan dan meminta input ulang sampai nilainya valid.
6. Program menghitung selisih = realisasi - anggaran rencana.
7. Program menghitung persentase penyimpangan = (selisih / anggaran rencana) x 100.
8. Program mengisi keterangan dengan tanda "-".
9. Jika realisasi lebih kecil dari anggaran rencana, status = Hemat.
10. Jika tidak, dan realisasi sama dengan anggaran rencana, status = Tepat.
11. Jika tidak (realisasi lebih besar dari anggaran rencana), status = Melebihi Anggaran, lalu:
    1. Jika kelebihan tidak lebih dari 10% dari anggaran rencana, keterangan = Perlu Evaluasi.
    2. Jika kelebihan lebih dari 10% dari anggaran rencana, keterangan = Peringatan.
12. Program menampilkan rincian: nama komponen, anggaran rencana, realisasi, selisih, persentase penyimpangan, status, dan keterangan.
13. Program menanyakan apakah pengguna ingin memeriksa komponen lain (y/t). Jika pilihan bukan y, Y, t, atau T, program menampilkan pesan kesalahan dan meminta input ulang.
14. Jika pilihan y atau Y, kembali ke langkah 3. Jika pilihan t atau T, lanjut ke langkah 15.
15. Program menampilkan pesan bahwa proses selesai.
16. Selesai.
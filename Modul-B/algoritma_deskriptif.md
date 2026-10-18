**Penanggung jawab:** Bryant Anthony Kores Obhetan / 322610003

## Algoritma Deskriptif

1. Mulai.
2. Program menginisialisasi seluruh variabel akumulator dan pencacah:
   - `totalRencana = 0`
   - `totalRealisasi = 0`
   - `totalPenghematan = 0`
   - `totalKelebihan = 0`
   - `persentasePenyerapan = 0`
   - `jumlahHemat = 0`
   - `jumlahTepat = 0`
   - `jumlahMelebihi = 0`
   - `totalKomponen = 0`
   - `penyimpanganTerbesar = 0`
   - `komponenTerbesar = "-"`
   - `kondisiKegiatan = "-"`
3. Program menampilkan judul antarmuka rekapitulasi anggaran kegiatan mahasiswa.
4. Program memulai perulangan penerimaan data komponen:
   1. Program menampilkan label urutan komponen ke-`(totalKomponen + 1)`.
   2. Pengguna memasukkan nama komponen. Jika nama komponen berupa string kosong (hanya menekan tombol Enter), program menampilkan pesan kesalahan dan meminta input ulang hingga valid.
   3. Pengguna memasukkan nilai anggaran rencana. Jika input bukan merupakan angka atau bernilai kurang dari atau sama dengan 0, program membersihkan status kesalahan buffer, menampilkan pesan kesalahan, dan meminta input ulang hingga valid.
   4. Pengguna memasukkan nilai realisasi pengeluaran. Jika input bukan merupakan angka atau bernilai negatif (< 0), program membersihkan buffer, menampilkan pesan kesalahan, dan meminta input ulang hingga valid. (Nilai 0 tetap diterima).
   5. Program menambah pencacah total komponen: `totalKomponen = totalKomponen + 1`.
   6. Program mengakumulasikan total rencana: `totalRencana = totalRencana + anggaranRencana`.
   7. Program mengakumulasikan total realisasi: `totalRealisasi = totalRealisasi + realisasi`.
   8. Program menghitung selisih: `selisih = realisasi - anggaranRencana`.
   9. Program mengevaluasi status per komponen:
      - **Jika `realisasi < anggaranRencana`:**
        * Tambah pencacah hemat: `jumlahHemat = jumlahHemat + 1`.
        * Tambah total penghematan: `totalPenghematan = totalPenghematan + (anggaranRencana - realisasi)`.
      - **Jika tidak, dan `realisasi == anggaranRencana`:**
        * Tambah pencacah tepat: `jumlahTepat = jumlahTepat + 1`.
      - **Jika tidak (`realisasi > anggaranRencana`):**
        * Tambah pencacah melebihi: `jumlahMelebihi = jumlahMelebihi + 1`.
        * Tambah total kelebihan: `totalKelebihan = totalKelebihan + selisih`.
        * Jika `selisih > penyimpanganTerbesar`, perbarui nilai rekor:
          - `penyimpanganTerbesar = selisih`
          - `komponenTerbesar = namaKomponen`
   10. Program menampilkan pesan konfirmasi bahwa data komponen berhasil dicatat.
   11. Program menanyakan apakah pengguna ingin memasukkan data komponen lain (`y/t`).
   12. Jika pengguna memasukkan karakter selain `y`, `Y`, `t`, atau `T`, program menampilkan pesan kesalahan dan meminta input ulang sampai valid.
5. Jika pengguna memilih `y` atau `Y`, program kembali mengulang ke langkah 4. Jika pengguna memilih `t` atau `T`, perulangan dihentikan dan program lanjut ke langkah 6.
6. Program menghitung persentase penyerapan anggaran:
   - Jika `totalRencana > 0`, hitung `persentasePenyerapan = (totalRealisasi / totalRencana) * 100`.
   - Jika tidak, set `persentasePenyerapan = 0`.
7. Program mengevaluasi kondisi anggaran kegiatan secara keseluruhan (Hasil Akhir):
   - Jika `totalRealisasi < totalRencana`, maka `kondisiKegiatan = "Hemat"`.
   - Jika tidak, dan `totalRealisasi == totalRencana`, maka `kondisiKegiatan = "Sesuai Anggaran"`.
   - Jika tidak (`totalRealisasi > totalRencana`), maka `kondisiKegiatan = "Melebihi Anggaran"`.
8. Program mencetak laporan rekapitulasi akhir yang memuat:
   - Total komponen yang diproses.
   - Total rencana anggaran, total realisasi pengeluaran, total penghematan, dan total kelebihan pengeluaran.
   - Persentase penyerapan anggaran dengan format 2 desimal.
   - Statistik jumlah komponen (Hemat, Tepat, dan Melebihi Anggaran).
   - Nama komponen dengan penyimpangan (kelebihan) terbesar beserta nominal pembengkakannya.
   - Kesimpulan kondisi anggaran kegiatan secara keseluruhan.
9. Program menampilkan pesan bahwa proses rekapitulasi telah selesai.
10. Selesai.
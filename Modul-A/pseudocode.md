**Penanggung jawab:** Nadin Arifa Salsabila / 322610009

## Pseudocode

```text
ALGORITMA PemeriksaanAnggaranModulA

DEKLARASI
    namaKomponen, status, keterangan, pilihan : string
    anggaranRencana, realisasi, selisih, persenPenyimpangan : real

MULAI
    TAMPILKAN "PEMERIKSAAN ANGGARAN KEGIATAN MAHASISWA"

    ULANGI
        TAMPILKAN "Nama komponen"
        BACA namaKomponen
        SELAMA namaKomponen kosong LAKUKAN
            TAMPILKAN "Nama komponen tidak boleh kosong"
            TAMPILKAN "Nama komponen"
            BACA namaKomponen
        AKHIR SELAMA

        TAMPILKAN "Anggaran rencana"
        BACA anggaranRencana
        SELAMA anggaranRencana bukan angka ATAU anggaranRencana <= 0 LAKUKAN
            TAMPILKAN "Input tidak valid"
            TAMPILKAN "Anggaran rencana"
            BACA anggaranRencana
        AKHIR SELAMA

        TAMPILKAN "Realisasi"
        BACA realisasi
        SELAMA realisasi bukan angka ATAU realisasi < 0 LAKUKAN
            TAMPILKAN "Input tidak valid"
            TAMPILKAN "Realisasi"
            BACA realisasi
        AKHIR SELAMA

        selisih <- realisasi - anggaranRencana
        persenPenyimpangan <- selisih / anggaranRencana * 100
        keterangan <- "-"

        JIKA realisasi < anggaranRencana MAKA
            status <- "Hemat"
        LAINNYA JIKA realisasi = anggaranRencana MAKA
            status <- "Tepat"
        LAINNYA
            status <- "Melebihi Anggaran"
            JIKA selisih * 100 <= anggaranRencana * 10 MAKA
                keterangan <- "Perlu Evaluasi"
            LAINNYA
                keterangan <- "Peringatan"
            AKHIR JIKA
        AKHIR JIKA

        TAMPILKAN namaKomponen, anggaranRencana, realisasi, selisih,
                  persenPenyimpangan, status, keterangan

        TAMPILKAN "Periksa komponen lain? (y/t)"
        BACA pilihan
        SELAMA pilihan bukan "y" DAN pilihan bukan "Y" DAN pilihan bukan "t" DAN pilihan bukan "T" LAKUKAN
            TAMPILKAN "Pilihan tidak valid"
            BACA pilihan
        AKHIR SELAMA
    SAMPAI pilihan = "t" ATAU pilihan = "T"

    TAMPILKAN "Proses pemeriksaan selesai"
SELESAI
```
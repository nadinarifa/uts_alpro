**Penanggung jawab:** Bryant Anthony Kores Obhetan / 322610003

## Pseudocode

```text
ALGORITMA RekapitulasiAnggaranModulB

DEKLARASI
    namaKomponen, pilihan, komponenTerbesar, kondisiKegiatan : string
    anggaranRencana, realisasi, selisih : real
    totalRencana, totalRealisasi, totalPenghematan, totalKelebihan : real
    persentasePenyerapan, penyimpanganTerbesar : real
    jumlahHemat, jumlahTepat, jumlahMelebihi, totalKomponen : integer

MULAI
    TAMPILKAN "=================================================="
    TAMPILKAN "   REKAPITULASI ANGGARAN KEGIATAN MAHASISWA       "
    TAMPILKAN "                 (MODUL B)                        "
    TAMPILKAN "=================================================="

    totalRencana <- 0
    totalRealisasi <- 0
    totalPenghematan <- 0
    totalKelebihan <- 0
    persentasePenyerapan <- 0
    jumlahHemat <- 0
    jumlahTepat <- 0
    jumlahMelebihi <- 0
    totalKomponen <- 0
    penyimpanganTerbesar <- 0
    komponenTerbesar <- "-"
    kondisiKegiatan <- "-"

    ULANGI
        totalKomponen <- totalKomponen + 1
        TAMPILKAN "--- Input Komponen Anggaran Ke-", totalKomponen, " ---"

        TAMPILKAN "Nama komponen          : "
        BACA namaKomponen
        SELAMA namaKomponen kosong LAKUKAN
            TAMPILKAN "Input tidak valid. Nama komponen tidak boleh kosong."
            TAMPILKAN "Nama komponen          : "
            BACA namaKomponen
        AKHIR SELAMA

        TAMPILKAN "Anggaran rencana (Rp)  : "
        BACA anggaranRencana
        SELAMA anggaranRencana bukan angka ATAU anggaranRencana <= 0 LAKUKAN
            TAMPILKAN "Input tidak valid. Anggaran harus berupa angka lebih dari 0."
            TAMPILKAN "Anggaran rencana (Rp)  : "
            BACA anggaranRencana
        AKHIR SELAMA

        TAMPILKAN "Realisasi (Rp)         : "
        BACA realisasi
        SELAMA realisasi bukan angka ATAU realisasi < 0 LAKUKAN
            TAMPILKAN "Input tidak valid. Realisasi harus berupa angka tidak negatif."
            TAMPILKAN "Realisasi (Rp)         : "
            BACA realisasi
        AKHIR SELAMA

        totalRencana <- totalRencana + anggaranRencana
        totalRealisasi <- totalRealisasi + realisasi
        selisih <- realisasi - anggaranRencana

        JIKA realisasi < anggaranRencana MAKA
            jumlahHemat <- jumlahHemat + 1
            totalPenghematan <- totalPenghematan + (anggaranRencana - realisasi)
        LAINNYA JIKA realisasi = anggaranRencana MAKA
            jumlahTepat <- jumlahTepat + 1
        LAINNYA
            jumlahMelebihi <- jumlahMelebihi + 1
            totalKelebihan <- totalKelebihan + selisih
            JIKA selisih > penyimpanganTerbesar MAKA
                penyimpanganTerbesar <- selisih
                komponenTerbesar <- namaKomponen
            AKHIR JIKA
        AKHIR JIKA

        TAMPILKAN ">> Data komponen berhasil dicatat."

        TAMPILKAN "Input data komponen lain? (y/t): "
        BACA pilihan
        SELAMA pilihan bukan "y" DAN pilihan bukan "Y" DAN pilihan bukan "t" DAN pilihan bukan "T" LAKUKAN
            TAMPILKAN "Pilihan tidak valid. Silakan ketik y atau t: "
            BACA pilihan
        AKHIR SELAMA

    SAMPAI pilihan = "t" ATAU pilihan = "T"

    JIKA totalRencana > 0 MAKA
        persentasePenyerapan <- (totalRealisasi / totalRencana) * 100
    LAINNYA
        persentasePenyerapan <- 0
    AKHIR JIKA

    JIKA totalRealisasi < totalRencana MAKA
        kondisiKegiatan <- "Hemat"
    LAINNYA JIKA totalRealisasi = totalRencana MAKA
        kondisiKegiatan <- "Sesuai Anggaran"
    LAINNYA
        kondisiKegiatan <- "Melebihi Anggaran"
    AKHIR JIKA

    TAMPILKAN "=================================================="
    TAMPILKAN "           LAPORAN REKAPITULASI ANGGARAN          "
    TAMPILKAN "=================================================="
    TAMPILKAN "Total Komponen Diproses       : ", totalKomponen
    TAMPILKAN "Total Rencana Anggaran        : Rp", totalRencana
    TAMPILKAN "Total Realisasi Pengeluaran   : Rp", totalRealisasi
    TAMPILKAN "Total Penghematan             : Rp", totalPenghematan
    TAMPILKAN "Total Kelebihan Pengeluaran   : Rp", totalKelebihan
    TAMPILKAN "Persentase Penyerapan         : ", persentasePenyerapan, "%"

    TAMPILKAN "--- Statistik Komponen ---"
    TAMPILKAN "Jumlah Komponen Hemat         : ", jumlahHemat
    TAMPILKAN "Jumlah Komponen Tepat         : ", jumlahTepat
    TAMPILKAN "Jumlah Komponen Melebihi      : ", jumlahMelebihi

    TAMPILKAN "--- Analisis Penyimpangan & Kondisi Akhir ---"
    TAMPILKAN "Komponen Penyimpangan Terbesar: ", komponenTerbesar
    TAMPILKAN "Kondisi Anggaran Keseluruhan  : ", kondisiKegiatan
    TAMPILKAN "=================================================="
    TAMPILKAN "Proses rekapitulasi selesai."
SELESAI
```
# Pseudocode Program Terintegrasi

**Penanggung Jawab:** Nadin Arifa Salsabila (322610009) & Bryant Anthony Kores Obhetan (322610003)

```text
ALGORITMA EvaluasiDanRekapitulasiAnggaranTerintegrasi

DEKLARASI
    // Variabel Modul A (Komponen Individual)
    namaKomponen, status, keterangan, pilihan : string
    anggaranRencana, realisasi, selisih, persenPenyimpangan : real

    // Variabel Modul B (Akumulator & Statistik)
    totalKomponen, jumlahHemat, jumlahTepat, jumlahMelebihi : integer
    totalRencana, totalRealisasi, totalPenghematan, totalKelebihan : real
    persentasePenyerapan, penyimpanganTerbesar : real
    komponenTerbesar, kondisiKegiatan : string

MULAI
    TAMPILKAN "SISTEM EVALUASI & REKAPITULASI ANGGARAN KEGIATAN MAHASISWA"

    // Inisialisasi Akumulator Modul B
    totalKomponen <- 0
    jumlahHemat <- 0
    jumlahTepat <- 0
    jumlahMelebihi <- 0
    totalRencana <- 0
    totalRealisasi <- 0
    totalPenghematan <- 0
    totalKelebihan <- 0
    persentasePenyerapan <- 0
    penyimpanganTerbesar <- 0
    komponenTerbesar <- "-"
    kondisiKegiatan <- "-"

    ULANGI
        totalKomponen <- totalKomponen + 1
        TAMPILKAN "--- INPUT KOMPONEN ANGGARAN KE-", totalKomponen, " ---"

        // Input & Validasi Nama Komponen
        TAMPILKAN "Nama komponen: "
        BACA namaKomponen
        SELAMA namaKomponen kosong LAKUKAN
            TAMPILKAN "Nama komponen tidak boleh kosong."
            TAMPILKAN "Nama komponen: "
            BACA namaKomponen
        AKHIR SELAMA

        // Input & Validasi Anggaran Rencana (> 0)
        TAMPILKAN "Anggaran rencana (Rp): "
        BACA anggaranRencana
        SELAMA anggaranRencana bukan angka ATAU anggaranRencana <= 0 LAKUKAN
            TAMPILKAN "Input tidak valid. Anggaran harus angka lebih dari 0."
            TAMPILKAN "Anggaran rencana (Rp): "
            BACA anggaranRencana
        AKHIR SELAMA

        // Input & Validasi Realisasi (>= 0)
        TAMPILKAN "Realisasi pengeluaran (Rp): "
        BACA realisasi
        SELAMA realisasi bukan angka ATAU realisasi < 0 LAKUKAN
            TAMPILKAN "Input tidak valid. Realisasi harus angka tidak negatif."
            TAMPILKAN "Realisasi pengeluaran (Rp): "
            BACA realisasi
        AKHIR SELAMA

        // ==========================================
        // PROSES MODUL A: EVALUASI STATUS KOMPONEN
        // ==========================================
        selisih <- realisasi - anggaranRencana
        persenPenyimpangan <- (selisih / anggaranRencana) * 100
        keterangan <- "-"

        JIKA realisasi < anggaranRencana MAKA
            status <- "Hemat"
        LAINNYA JIKA realisasi = anggaranRencana MAKA
            status <- "Tepat"
        LAINNYA
            status <- "Melebihi Anggaran"
            JIKA (selisih * 100) <= (anggaranRencana * 10) MAKA
                keterangan <- "Perlu Evaluasi"
            LAINNYA
                keterangan <- "Peringatan"
            AKHIR JIKA
        AKHIR JIKA

        // Output Rincian Modul A
        TAMPILKAN "HASIL PEMERIKSAAN KOMPONEN"
        TAMPILKAN "Komponen               : ", namaKomponen
        TAMPILKAN "Anggaran Rencana       : Rp", anggaranRencana
        TAMPILKAN "Realisasi              : Rp", realisasi
        TAMPILKAN "Selisih                : Rp", selisih
        TAMPILKAN "Persentase Penyimpangan: ", persenPenyimpangan, "%"
        TAMPILKAN "Status                 : ", status
        TAMPILKAN "Keterangan             : ", keterangan

        // ==========================================
        // PROSES MODUL B: AKUMULASI DATA REKAPITULASI
        // ==========================================
        totalRencana <- totalRencana + anggaranRencana
        totalRealisasi <- totalRealisasi + realisasi

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

        // Pertanyaan Loop
        TAMPILKAN "Periksa/tambah komponen lain? (y/t): "
        BACA pilihan
        SELAMA pilihan bukan "y" DAN pilihan bukan "Y" DAN pilihan bukan "t" DAN pilihan bukan "T" LAKUKAN
            TAMPILKAN "Pilihan tidak valid. Silakan ketik y atau t: "
            BACA pilihan
        AKHIR SELAMA

    SAMPAI pilihan = "t" ATAU pilihan = "T"

    // ==========================================
    // PROSES MODUL B: REKAPITULASI AKHIR & HASIL
    // ==========================================
    JIKA totalRencana > 0 MAKA
        persentasePenyerapan <- (totalRealisasi / totalRencana) * 100
    LAINNYA
        persentasePenyerapan <- 0
    AKHIR JIKA

    // Evaluasi Kondisi Kegiatan Keseluruhan
    JIKA totalRealisasi < totalRencana MAKA
        kondisiKegiatan <- "Hemat"
    LAINNYA JIKA totalRealisasi = totalRencana MAKA
        kondisiKegiatan <- "Sesuai Anggaran"
    LAINNYA
        kondisiKegiatan <- "Melebihi Anggaran"
    AKHIR JIKA

    // Output Laporan Rekapitulasi Akhir
    TAMPILKAN "=== LAPORAN REKAPITULASI AKHIR KEGIATAN ==="
    TAMPILKAN "Total Komponen Terperiksa  : ", totalKomponen
    TAMPILKAN "Total Rencana Anggaran     : Rp", totalRencana
    TAMPILKAN "Total Realisasi Pengeluaran: Rp", totalRealisasi
    TAMPILKAN "Total Penghematan          : Rp", totalPenghematan
    TAMPILKAN "Total Kelebihan Pengeluaran: Rp", totalKelebihan
    TAMPILKAN "Persentase Penyerapan      : ", persentasePenyerapan, "%"
    TAMPILKAN "--- Statistik Jumlah Komponen ---"
    TAMPILKAN "Komponen Hemat             : ", jumlahHemat
    TAMPILKAN "Komponen Tepat Sasaran     : ", jumlahTepat
    TAMPILKAN "Komponen Melebihi Anggaran : ", jumlahMelebihi
    TAMPILKAN "--- Analisis Penyimpangan & Hasil Akhir ---"
    TAMPILKAN "Komponen Penyimpangan Terbesar: ", komponenTerbesar
    TAMPILKAN "Kondisi Kegiatan Keseluruhan  : ", kondisiKegiatan
    TAMPILKAN "Pemeriksaan dan rekapitulasi anggaran selesai."
SELESAI
```

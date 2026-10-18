#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

int main() {
    // ==========================================================
    // 1. DEKLARASI VARIABEL MODUL A (PROSES UTAMA PER KOMPONEN)
    // ==========================================================
    string namaKomponen, status, keterangan, pilihan;
    double anggaranRencana = 0.0;
    double realisasi = 0.0;
    double selisih = 0.0;
    double persenPenyimpangan = 0.0;

    // ==========================================================
    // 2. DEKLARASI VARIABEL MODUL B (AKUMULATOR REKAPITULASI)
    // ==========================================================
    int totalKomponen = 0;
    int jumlahHemat = 0;
    int jumlahTepat = 0;
    int jumlahMelebihi = 0;

    double totalRencana = 0.0;
    double totalRealisasi = 0.0;
    double totalPenghematan = 0.0;
    double totalKelebihan = 0.0;
    double persentasePenyerapan = 0.0;

    double penyimpanganTerbesar = 0.0;
    string komponenTerbesar = "-";
    string kondisiKegiatan = "-";

    cout << "======================================================================" << endl;
    cout << "      SISTEM EVALUASI & REKAPITULASI ANGGARAN KEGIATAN MAHASISWA      " << endl;
    cout << "                      (PROGRAM TERINTEGRASI)                          " << endl;
    cout << "======================================================================" << endl;

    // ==========================================================
    // 3. PERULANGAN UTAMA (INTEGRASI MODUL A DAN MODUL B)
    // ==========================================================
    do {
        totalKomponen++;
        cout << endl << "--------------------------------------------------" << endl;
        cout << " INPUT KOMPONEN ANGGARAN KE-" << totalKomponen << endl;
        cout << "--------------------------------------------------" << endl;

        // Validasi Masukan Nama Komponen (Tidak boleh string kosong)
        cout << "Nama komponen               : ";
        getline(cin, namaKomponen);
        while (namaKomponen.empty()) {
            cout << "[PERINGATAN] Nama komponen tidak boleh kosong." << endl;
            cout << "Nama komponen               : ";
            getline(cin, namaKomponen);
        }

        // Validasi Masukan Anggaran Rencana (Harus angka dan > 0)
        cout << "Anggaran rencana (Rp)       : ";
        cin >> anggaranRencana;
        while (cin.fail() || anggaranRencana <= 0) {
            cout << "[PERINGATAN] Input tidak valid. Anggaran harus berupa angka lebih dari 0." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Anggaran rencana (Rp)       : ";
            cin >> anggaranRencana;
        }

        // Validasi Masukan Realisasi Pengeluaran (Harus angka dan >= 0)
        cout << "Realisasi pengeluaran (Rp)  : ";
        cin >> realisasi;
        while (cin.fail() || realisasi < 0) {
            cout << "[PERINGATAN] Input tidak valid. Realisasi harus angka dan tidak boleh negatif." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Realisasi pengeluaran (Rp)  : ";
            cin >> realisasi;
        }

        // ----------------------------------------------------------
        // LOGIKA MODUL A: PEMERIKSAAN & EVALUASI STATUS KOMPONEN
        // ----------------------------------------------------------
        selisih = realisasi - anggaranRencana;
        persenPenyimpangan = (selisih / anggaranRencana) * 100.0;
        keterangan = "-";

        if (realisasi < anggaranRencana) {
            status = "Hemat";
        } else if (realisasi == anggaranRencana) {
            status = "Tepat";
        } else {
            status = "Melebihi Anggaran";
            // Jika selisih <= 10% dari anggaran rencana
            if (selisih * 100.0 <= anggaranRencana * 10.0) {
                keterangan = "Perlu Evaluasi";
            } else {
                keterangan = "Peringatan";
            }
        }

        // Tampilkan Rincian Pemeriksaan Komponen (Output Modul A)
        cout << endl << ">>> HASIL PEMERIKSAAN KOMPONEN (MODUL A) <<<" << endl;
        cout << fixed << setprecision(2);
        cout << "Komponen                    : " << namaKomponen << endl;
        cout << "Anggaran Rencana            : Rp" << anggaranRencana << endl;
        cout << "Realisasi                   : Rp" << realisasi << endl;
        cout << "Selisih                     : Rp" << selisih << endl;
        cout << "Persentase Penyimpangan     : " << persenPenyimpangan << "%" << endl;
        cout << "Status                      : " << status << endl;
        cout << "Keterangan                  : " << keterangan << endl;

        // ----------------------------------------------------------
        // LOGIKA MODUL B: AKUMULASI DATA REKAPITULASI SECARA REAL-TIME
        // ----------------------------------------------------------
        totalRencana += anggaranRencana;
        totalRealisasi += realisasi;

        if (realisasi < anggaranRencana) {
            jumlahHemat++;
            totalPenghematan += (anggaranRencana - realisasi);
        } else if (realisasi == anggaranRencana) {
            jumlahTepat++;
        } else {
            jumlahMelebihi++;
            totalKelebihan += selisih;

            // Penentuan komponen penyimpangan pembengkakan terbesar
            if (selisih > penyimpanganTerbesar) {
                penyimpanganTerbesar = selisih;
                komponenTerbesar = namaKomponen;
            }
        }

        // Pertanyaan perulangan (Validasi pilihan y/t)
        cout << endl << "Periksa/tambah komponen lain? (y/t): ";
        cin >> pilihan;
        while (pilihan != "y" && pilihan != "Y" && pilihan != "t" && pilihan != "T") {
            cout << "[PERINGATAN] Pilihan tidak valid. Silakan ketik y atau t: ";
            cin >> pilihan;
        }

        // Membersihkan karakter newline dari buffer
        cin.ignore(1000, '\n');

    } while (pilihan == "y" || pilihan == "Y");

    // ==========================================================
    // 4. LOGIKA MODUL B: KALKULASI AKHIR & HASIL EVALUASI
    // ==========================================================
    if (totalRencana > 0) {
        persentasePenyerapan = (totalRealisasi / totalRencana) * 100.0;
    } else {
        persentasePenyerapan = 0.0;
    }

    // Penentuan Kondisi Anggaran Kegiatan Secara Keseluruhan (Hasil Akhir)
    if (totalRealisasi < totalRencana) {
        kondisiKegiatan = "Hemat";
    } else if (totalRealisasi == totalRencana) {
        kondisiKegiatan = "Sesuai Anggaran";
    } else {
        kondisiKegiatan = "Melebihi Anggaran";
    }

    // ==========================================================
    // 5. TAMPILAN LAPORAN REKAPITULASI AKHIR (OUTPUT MODUL B)
    // ==========================================================
    cout << endl;
    cout << "======================================================================" << endl;
    cout << "              LAPORAN REKAPITULASI AKHIR KEGIATAN MAHASISWA           " << endl;
    cout << "======================================================================" << endl;
    cout << "Total Komponen Terperiksa   : " << totalKomponen << endl;
    cout << "Total Rencana Anggaran      : Rp" << totalRencana << endl;
    cout << "Total Realisasi Pengeluaran : Rp" << totalRealisasi << endl;
    cout << "Total Penghematan           : Rp" << totalPenghematan << endl;
    cout << "Total Kelebihan Pengeluaran : Rp" << totalKelebihan << endl;
    cout << "Persentase Penyerapan       : " << persentasePenyerapan << "%" << endl;

    cout << endl << "--- Statistik Jumlah Komponen ---" << endl;
    cout << "Komponen Hemat              : " << jumlahHemat << endl;
    cout << "Komponen Tepat Sasaran      : " << jumlahTepat << endl;
    cout << "Komponen Melebihi Anggaran  : " << jumlahMelebihi << endl;

    cout << endl << "--- Analisis Penyimpangan & Hasil Akhir ---" << endl;
    cout << "Komponen Penyimpangan Terbesar : " << komponenTerbesar;
    if (penyimpanganTerbesar > 0) {
        cout << " (+Rp" << penyimpanganTerbesar << ")";
    }
    cout << endl;
    cout << "KONDISI KEGIATAN KESELURUHAN   : " << kondisiKegiatan << endl;
    cout << "======================================================================" << endl;
    cout << "Pemeriksaan dan rekapitulasi anggaran selesai dieksekusi." << endl;

    return 0;
}

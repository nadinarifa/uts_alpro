#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

int main() {
    // Variabel untuk data komponen per iterasi
    string namaKomponen, pilihan;
    double anggaranRencana = 0.0;
    double realisasi = 0.0;
    double selisih = 0.0;

    // Variabel akumulator rekapitulasi
    double totalRencana = 0.0;
    double totalRealisasi = 0.0;
    double totalPenghematan = 0.0;
    double totalKelebihan = 0.0;
    double persentasePenyerapan = 0.0;

    // Variabel penghitung kategori
    int jumlahHemat = 0;
    int jumlahTepat = 0;
    int jumlahMelebihi = 0;
    int totalKomponen = 0;

    // Variabel penentu penyimpangan terbesar
    double penyimpanganTerbesar = 0.0;
    string komponenTerbesar = "-";

    // Variabel kesimpulan kondisi kegiatan keseluruhan (Hasil Akhir)
    string kondisiKegiatan = "-";

    cout << "==================================================" << endl;
    cout << "   REKAPITULASI ANGGARAN KEGIATAN MAHASISWA       " << endl;
    cout << "                 (MODUL B)                        " << endl;
    cout << "==================================================" << endl;

    // Perulangan untuk menerima data komponen anggaran
    do {
        cout << endl << "--- Input Komponen Anggaran Ke-" << (totalKomponen + 1) << " ---" << endl;

        // 1. Input nama komponen (tidak boleh kosong)
        cout << "Nama komponen          : ";
        getline(cin, namaKomponen);
        while (namaKomponen.empty()) {
            cout << "Input tidak valid. Nama komponen tidak boleh kosong." << endl;
            cout << "Nama komponen          : ";
            getline(cin, namaKomponen);
        }

        // 2. Input anggaran rencana (harus berupa angka > 0)
        cout << "Anggaran rencana (Rp)  : ";
        cin >> anggaranRencana;
        while (cin.fail() || anggaranRencana <= 0) {
            cout << "Input tidak valid. Anggaran harus berupa angka lebih dari 0." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Anggaran rencana (Rp)  : ";
            cin >> anggaranRencana;
        }

        // 3. Input realisasi pengeluaran (harus berupa angka >= 0)
        cout << "Realisasi (Rp)         : ";
        cin >> realisasi;
        while (cin.fail() || realisasi < 0) {
            cout << "Input tidak valid. Realisasi harus berupa angka tidak negatif." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Realisasi (Rp)         : ";
            cin >> realisasi;
        }

        // 4. Akumulasi data ke rekapitulasi
        totalKomponen++;
        totalRencana += anggaranRencana;
        totalRealisasi += realisasi;
        selisih = realisasi - anggaranRencana;

        // 5. Evaluasi kategori dan akumulasi penghematan/kelebihan
        if (realisasi < anggaranRencana) {
            jumlahHemat++;
            totalPenghematan += (anggaranRencana - realisasi);
        } else if (realisasi == anggaranRencana) {
            jumlahTepat++;
        } else {
            jumlahMelebihi++;
            totalKelebihan += selisih;

            // Evaluasi penyimpangan (pembengkakan) terbesar
            if (selisih > penyimpanganTerbesar) {
                penyimpanganTerbesar = selisih;
                komponenTerbesar = namaKomponen;
            }
        }

        cout << ">> Data komponen berhasil dicatat." << endl;

        // 6. Validasi pertanyaan mengulang atau mengakhiri
        cout << endl << "Input data komponen lain? (y/t): ";
        cin >> pilihan;
        while (pilihan != "y" && pilihan != "Y" && pilihan != "t" && pilihan != "T") {
            cout << "Pilihan tidak valid. Silakan ketik y atau t: ";
            cin >> pilihan;
        }

        // Membersihkan karakter newline dari buffer cin
        cin.ignore(1000, '\n');

    } while (pilihan == "y" || pilihan == "Y");

    // 7. Perhitungan persentase penyerapan anggaran
    if (totalRencana > 0) {
        persentasePenyerapan = (totalRealisasi / totalRencana) * 100.0;
    } else {
        persentasePenyerapan = 0.0;
    }

    // 8. Penentuan kondisi kegiatan secara keseluruhan (Hasil Akhir)
    if (totalRealisasi < totalRencana) {
        kondisiKegiatan = "Hemat";
    } else if (totalRealisasi == totalRencana) {
        kondisiKegiatan = "Sesuai Anggaran";
    } else {
        kondisiKegiatan = "Melebihi Anggaran";
    }

    // 9. Menampilkan rincian laporan rekapitulasi
    cout << endl;
    cout << "==================================================" << endl;
    cout << "           LAPORAN REKAPITULASI ANGGARAN          " << endl;
    cout << "==================================================" << endl;

    cout << fixed << setprecision(2);
    cout << "Total Komponen Diproses       : " << totalKomponen << endl;
    cout << "Total Rencana Anggaran        : Rp" << totalRencana << endl;
    cout << "Total Realisasi Pengeluaran   : Rp" << totalRealisasi << endl;
    cout << "Total Penghematan             : Rp" << totalPenghematan << endl;
    cout << "Total Kelebihan Pengeluaran   : Rp" << totalKelebihan << endl;
    cout << "Persentase Penyerapan         : " << persentasePenyerapan << "%" << endl;

    cout << endl << "--- Statistik Komponen ---" << endl;
    cout << "Jumlah Komponen Hemat         : " << jumlahHemat << endl;
    cout << "Jumlah Komponen Tepat         : " << jumlahTepat << endl;
    cout << "Jumlah Komponen Melebihi      : " << jumlahMelebihi << endl;

    cout << endl << "--- Analisis Penyimpangan & Kondisi Akhir ---" << endl;
    cout << "Komponen Penyimpangan Terbesar: " << komponenTerbesar;
    if (penyimpanganTerbesar > 0) {
        cout << " (+Rp" << penyimpanganTerbesar << ")";
    }
    cout << endl;
    cout << "Kondisi Anggaran Keseluruhan  : " << kondisiKegiatan << endl;
    cout << "==================================================" << endl;
    cout << "Proses rekapitulasi selesai." << endl;

    return 0;
}

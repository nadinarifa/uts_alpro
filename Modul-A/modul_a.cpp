#include <iostream>
#include <string>
using namespace std;

int main() {
    string namaKomponen, status, keterangan, pilihan;
    double anggaranRencana, realisasi, selisih, persenPenyimpangan;

    cout << "=== PEMERIKSAAN ANGGARAN KEGIATAN MAHASISWA ===" << endl;

    do {
        cout << endl << "--- Komponen Baru ---" << endl;

        // Input nama komponen (boleh berspasi, tidak boleh kosong)
        cout << "Nama komponen          : ";
        getline(cin, namaKomponen);
        while (namaKomponen.empty()) {
            cout << "Nama komponen tidak boleh kosong." << endl;
            cout << "Nama komponen          : ";
            getline(cin, namaKomponen);
        }

        // Input anggaran rencana (harus angka dan lebih dari 0)
        cout << "Anggaran rencana (Rp)  : ";
        cin >> anggaranRencana;
        while (cin.fail() || anggaranRencana <= 0) {
            cout << "Input tidak valid. Anggaran harus berupa angka lebih dari 0." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Anggaran rencana (Rp)  : ";
            cin >> anggaranRencana;
        }

        // Input realisasi (harus angka dan tidak boleh negatif)
        cout << "Realisasi (Rp)         : ";
        cin >> realisasi;
        while (cin.fail() || realisasi < 0) {
            cout << "Input tidak valid. Realisasi harus berupa angka tidak negatif." << endl;
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Realisasi (Rp)         : ";
            cin >> realisasi;
        }

        // Hitung selisih dan persentase penyimpangan (dari anggaran rencana)
        selisih = realisasi - anggaranRencana;
        persenPenyimpangan = (selisih / anggaranRencana) * 100;
        keterangan = "-";

        // Tentukan status dan keterangan
        if (realisasi < anggaranRencana) {
            status = "Hemat";
        } else if (realisasi == anggaranRencana) {
            status = "Tepat";
        } else {
            status = "Melebihi Anggaran";
            // Selisih <= 10% dari anggaran (ditulis tanpa pembagian)
            if (selisih * 100 <= anggaranRencana * 10) {
                keterangan = "Perlu Evaluasi";
            } else {
                keterangan = "Peringatan";
            }
        }

        // Tampilkan rincian hasil pemeriksaan
        cout << endl << "--- Hasil Pemeriksaan ---" << endl;
        cout << "Komponen               : " << namaKomponen << endl;
        cout << "Anggaran rencana       : Rp" << anggaranRencana << endl;
        cout << "Realisasi              : Rp" << realisasi << endl;
        cout << "Selisih                : Rp" << selisih << endl;
        cout << "Persentase penyimpangan: " << persenPenyimpangan << "%" << endl;
        cout << "Status                 : " << status << endl;
        cout << "Keterangan             : " << keterangan << endl;

        // Tanya lanjut atau selesai (harus y atau t)
        cout << endl << "Periksa komponen lain? (y/t): ";
        cin >> pilihan;
        while (pilihan != "y" && pilihan != "Y" && pilihan != "t" && pilihan != "T") {
            cout << "Pilihan tidak valid. Ketik y atau t: ";
            cin >> pilihan;
        }
        // Buang Enter sisa agar getline berikutnya tidak membaca baris kosong
        cin.ignore(1000, '\n');

    } while (pilihan == "y" || pilihan == "Y");

    cout << endl << "Proses pemeriksaan selesai." << endl;
    return 0;
}
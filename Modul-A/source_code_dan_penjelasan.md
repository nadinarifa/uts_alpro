**Penanggung jawab:** Nadin Arifa Salsabila / 322610009

# Source Code dan Penjelasan

## Source Code

```cpp
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
```

## Penjelasan

Program ini untuk memeriksa apakah uang yang dipakai (realisasi) sesuai dengan uang yang direncanakan (anggaran) pada suatu kegiatan mahasiswa. Berikut penjelasan urutan program dari atas ke bawah.

### 1. Persiapan program

- `#include <iostream>` supaya program bisa menerima ketikan dari pengguna (`cin`) dan menampilkan tulisan ke layar (`cout`).
- `#include <string>` supaya program bisa menyimpan teks, misalnya nama komponen.
- `using namespace std;` supaya kita cukup menulis `cout` dan `cin`, tidak perlu menulis `std::cout` dan `std::cin`.

### 2. Menyiapkan tempat penyimpanan data (variabel)

Variabel itu seperti kotak untuk menyimpan data.

- Kotak untuk **teks** (`string`): `namaKomponen`, `status`, `keterangan`, `pilihan`.
- Kotak untuk **angka** (`double`): `anggaranRencana`, `realisasi`, `selisih`, `persenPenyimpangan`. Dipakai `double` karena angkanya bisa memiliki koma, misalnya persentase 12,5%.

### 3. Perulangan utama (`do ... while`)

Seluruh proses pemeriksaan ditaruh di dalam `do ... while`. Artinya, program mengerjakan pemeriksaan **sekali dulu**, lalu bertanya apakah mau memeriksa komponen lain. Kalau pengguna menjawab `y`, proses diulang dari awal. Kalau menjawab `t`, program berhenti. Jadi banyak komponen bisa diperiksa tanpa harus menjalankan program berkali-kali.

### 4. Memasukkan nama komponen

- `getline` dipakai supaya nama komponen boleh memakai spasi, misalnya "Konsumsi Acara". Kalau memakai `cin >>`, program hanya membaca sampai spasi pertama, jadi nama akan terpotong menjadi "Konsumsi".
- `while (namaKomponen.empty())` artinya: selama nama masih kosong, tampilkan pesan lalu minta pengguna mengetik lagi. Program baru lanjut kalau nama sudah terisi.

### 5. Memasukkan anggaran rencana

Program membaca angka yang diketik pengguna, lalu mengeceknya. Input dianggap salah kalau:

- yang diketik **bukan angka** (misalnya huruf), diperiksa dengan `cin.fail()`, atau
- angkanya **nol atau negatif**, diperiksa dengan `anggaranRencana <= 0`.

Kalau salah, program menampilkan pesan "Input tidak valid" dan meminta input lagi. Dua baris yang mengikutinya punya tugas membersihkan:

- `cin.clear()` menghilangkan kondisi error, supaya program mau membaca input lagi.
- `cin.ignore(1000, '\n')` membuang ketikan salah yang masih tersisa.

### 6. Memasukkan realisasi

Caranya sama dengan anggaran rencana. Bedanya, yang ditolak hanya angka **negatif** (`realisasi < 0`). Angka 0 tetap boleh karena bisa saja belum ada uang yang dipakai.

### 7. Menghitung selisih dan persentase penyimpangan

- `selisih = realisasi - anggaranRencana` menghitung beda antara uang yang dipakai dan yang direncanakan. Hasil **positif** berarti uang yang dipakai lebih banyak dari rencana, hasil **negatif** berarti lebih sedikit.
- `persenPenyimpangan = (selisih / anggaranRencana) * 100` mengubah selisih tadi menjadi persen dibanding anggaran rencana.
- `keterangan = "-"` adalah isi awal. Keterangan hanya akan berubah kalau anggaran terlampaui.

Contoh: anggaran Rp1.000.000 dan realisasi Rp1.050.000 menghasilkan selisih Rp50.000, atau penyimpangan 5%.

### 8. Menentukan status dan keterangan

Program membandingkan realisasi dengan anggaran rencana:

| Kondisi | Status | Keterangan |
|---|---|---|
| Realisasi lebih kecil dari anggaran | Hemat | - |
| Realisasi sama dengan anggaran | Tepat | - |
| Realisasi lebih besar dari anggaran, dan lebihnya paling banyak 10% | Melebihi Anggaran | Perlu Evaluasi |
| Realisasi lebih besar dari anggaran, dan lebihnya lebih dari 10% | Melebihi Anggaran | Peringatan |

Batas 10% ditulis `selisih * 100 <= anggaranRencana * 10`. Maksudnya sama dengan "selisih tidak lebih dari 10% anggaran", hanya saja ditulis tanpa pembagian supaya lebih sederhana.

### 9. Menampilkan hasil pemeriksaan

Program menampilkan semua hasil ke layar: nama komponen, anggaran rencana, realisasi, selisih, persentase penyimpangan, status, dan keterangan. Titik dua dibuat sejajar supaya tampilan lebih rapi dan mudah dibaca.

### 10. Menanyakan mau lanjut atau selesai

- Pengguna ditanya "Periksa komponen lain? (y/t)", lalu jawabannya disimpan di `pilihan`.
- `while (pilihan != "y" && ...)` memastikan jawaban hanya `y`, `Y`, `t`, atau `T`. Kalau mengetik yang lain, program meminta jawaban lagi.
- `cin.ignore(1000, '\n')` membuang tombol Enter yang masih tersisa setelah jawaban diketik. Kalau baris ini tidak ada, saat pemeriksaan diulang, `getline` langsung membaca Enter sisa itu sebagai nama kosong, sehingga pengguna tidak sempat mengetik nama komponen.

### 11. Akhir program

Kalau jawaban pengguna bukan `y` atau `Y`, perulangan berhenti. Program menampilkan "Proses pemeriksaan selesai." lalu `return 0` menandakan program berakhir dengan normal.
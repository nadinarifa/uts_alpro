**Penanggung jawab:** Bryant Anthony Kores Obhetan / 322610003

# Source Code dan Penjelasan

## Source Code

```cpp
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
```

## Penjelasan

Program Modul B ini berfungsi untuk menghitung dan menampilkan rekapitulasi komprehensif dari seluruh penggunaan anggaran kegiatan mahasiswa. Program dirancang murni menggunakan konsep dasar pemrograman terstruktur (variabel, operator, percabangan, dan perulangan) tanpa menggunakan array maupun struktur data lanjutan, sehingga sesuai dengan batasan silabus UTS Semester 1.

Berikut penjelasan terperinci dari setiap bagian program dari baris awal hingga akhir:

### 1. Persiapan Pustaka Standar (Library)

- `#include <iostream>` digunakan agar program dapat berinteraksi dengan pengguna melalui konsol, yaitu membaca masukan (`cin`) dan mencetak teks keluaran (`cout`).
- `#include <string>` digunakan agar program dapat memproses tipe data teks, seperti nama komponen anggaran dan pilihan kontrol perulangan.
- `#include <iomanip>` menyediakan manipulator format aliran data, seperti `fixed` dan `setprecision(2)`, agar nominal keuangan dan persentase dicetak rapi dengan dua angka di belakang koma desimal.
- `using namespace std;` memungkinkan pemanggilan entitas standar C++ tanpa menuliskan awalan `std::` berulang-ulang.

### 2. Deklarasi dan Inisialisasi Variabel

Variabel dideklarasikan secara terpisah sesuai fungsinya:
- **Variabel Data Per Komponen:**
  - `namaKomponen` (`string`): menyimpan nama pos pengeluaran yang sedang diinput.
  - `anggaranRencana` (`double`): menyimpan besaran pagu anggaran rencana yang dialokasikan.
  - `realisasi` (`double`): menyimpan nominal dana yang benar-benar dibelanjakan.
  - `selisih` (`double`): menyimpan hasil pengurangan `realisasi - anggaranRencana`.
  - `pilihan` (`string`): menyimpan respons pengguna apakah ingin mengulang proses (`y`) atau mengakhiri (`t`).
- **Variabel Akumulator Rekapitulasi (dimulai dari 0.0):**
  - `totalRencana`: menampung penjumlahan nilai anggaran seluruh komponen.
  - `totalRealisasi`: menampung penjumlahan seluruh realisasi pengeluaran.
  - `totalPenghematan`: menampung akumulasi dana yang berhasil dihemat (saat realisasi < anggaran).
  - `totalKelebihan`: menampung akumulasi pembengkakan biaya (saat realisasi > anggaran).
  - `persentasePenyerapan`: menampung rasio realisasi terhadap rencana.
- **Variabel Pencacah Kategori (dimulai dari 0):**
  - `jumlahHemat`: menghitung berapa banyak komponen yang pengeluarannya hemat.
  - `jumlahTepat`: menghitung berapa banyak komponen yang tepat sasaran.
  - `jumlahMelebihi`: menghitung berapa banyak komponen yang mengalami *overbudget*.
  - `totalKomponen`: menghitung total komponen yang telah berhasil dimasukkan.
- **Variabel Pelacak Penyimpangan Terbesar:**
  - `penyimpanganTerbesar` (`double`, awal `0.0`): mencatat nilai pembengkakan nominal terbesar yang ditemukan selama perulangan.
  - `komponenTerbesar` (`string`, awal `"-"`): mencatat nama komponen yang mengalami pembengkakan terbesar tersebut.
- **Variabel Kondisi Keseluruhan:**
  - `kondisiKegiatan` (`string`): menyimpan evaluasi status akhir kegiatan secara agregat ("Hemat", "Sesuai Anggaran", atau "Melebihi Anggaran").

### 3. Perulangan Utama (`do ... while`)

Seluruh proses penerimaan data komponen ditempatkan di dalam konstruksi perulangan `do ... while`. Struktur ini menjamin bahwa pengguna pasti memasukkan setidaknya satu komponen data pada awal program, lalu di akhir iterasi ditanya apakah ingin memasukkan data komponen lainnya. Selama pengguna menjawab `'y'` atau `'Y'`, perulangan akan terus berlanjut tanpa menghapus data total yang sudah diakumulasikan.

### 4. Validasi Masukan Nama Komponen

- Program membaca masukan nama komponen dengan fungsi `getline(cin, namaKomponen)`. Fungsi ini memungkinkan nama komponen terdiri atas beberapa kata berspasi (misalnya: "Sewa Sound System").
- `while (namaKomponen.empty())`: Memeriksa jika pengguna hanya menekan tombol *Enter* tanpa mengetik teks apa pun. Selama nama masih kosong, sistem akan menampilkan pesan peringatan dan meminta pengguna mengisi kembali hingga valid.

### 5. Validasi Masukan Anggaran Rencana

- Masukan dibaca dengan `cin >> anggaranRencana`.
- Kondisi kesalahan diperiksa menggunakan logika: `cin.fail() || anggaranRencana <= 0`.
  - `cin.fail()` bernilai `true` apabila pengguna memasukkan karakter yang bukan angka (misalnya huruf atau simbol).
  - `anggaranRencana <= 0` memastikan anggaran harus lebih besar dari nol, karena rencana anggaran suatu kegiatan yang logis harus bernilai positif.
- Jika terdeteksi salah, program menjalankan:
  - `cin.clear()` untuk membersihkan *error flag* pada stream input.
  - `cin.ignore(1000, '\n')` untuk membuang sisa karakter salah dari memori buffer.
  - Kemudian meminta pengguna memasukkan angka kembali hingga benar.

### 6. Validasi Masukan Realisasi Pengeluaran

- Masukan dibaca dengan `cin >> realisasi`.
- Validasi dilakukan dengan syarat: `cin.fail() || realisasi < 0`.
- Realisasi tidak boleh bernilai negatif (`< 0`), tetapi nilai `0` diperbolehkan karena dapat menggambarkan pos anggaran yang belum digunakan sama sekali atau kegiatannya ditunda tanpa biaya.
- Penanganan kesalahan dilakukan secara robust menggunakan `cin.clear()` dan `cin.ignore()` serupa dengan langkah anggaran rencana.

### 7. Proses Akumulasi dan Penentuan Kategori Rekapitulasi

Setiap kali data komponen lolos validasi:
1. `totalKomponen` bertambah 1 (`totalKomponen++`).
2. `totalRencana` ditambah dengan nilai `anggaranRencana`.
3. `totalRealisasi` ditambah dengan nilai `realisasi`.
4. Selisih dihitung: `selisih = realisasi - anggaranRencana`.
5. Percabangan tiga arah mengevaluasi status:
   - **Kasus Hemat (`realisasi < anggaranRencana`):** Nilai `jumlahHemat` bertambah 1, dan penghematan dihitung dari `anggaranRencana - realisasi`, lalu ditambahkan ke `totalPenghematan`.
   - **Kasus Tepat (`realisasi == anggaranRencana`):** Nilai `jumlahTepat` bertambah 1.
   - **Kasus Melebihi Anggaran (`realisasi > anggaranRencana`):** Nilai `jumlahMelebihi` bertambah 1, dan kelebihan diakumulasikan ke `totalKelebihan`. Selanjutnya diperiksa apakah pembengkakan ini lebih besar dari rekor sebelumnya:
     ```cpp
     if (selisih > penyimpanganTerbesar) {
         penyimpanganTerbesar = selisih;
         komponenTerbesar = namaKomponen;
     }
     ```
     Dengan metode ini, komponen dengan penyimpangan terbesar dapat ditemukan secara dinamis tanpa memerlukan array sama sekali.

### 8. Validasi Pertanyaan Mengulang atau Mengakhiri

- Pengguna diberikan pertanyaan `"Input data komponen lain? (y/t): "`.
- Masukan disimpan ke variabel `pilihan`.
- Menggunakan `while (pilihan != "y" && pilihan != "Y" && ...)` untuk memastikan hanya karakter `y`, `Y`, `t`, atau `T` yang diterima.
- Karakter *newline* sisa pada buffer dibersihkan dengan `cin.ignore(1000, '\n')` agar pemanggilan `getline` pada iterasi berikutnya tidak langsung membaca baris kosong.

### 9. Perhitungan Persentase Penyerapan Anggaran

Setelah perulangan selesai (pengguna memilih `t` atau `T`):
- Persentase penyerapan dihitung dengan rumus:
  $$\text{Persentase Penyerapan} = \left(\frac{\text{totalRealisasi}}{\text{totalRencana}}\right) \times 100$$
- Program menyertakan percabangan `if (totalRencana > 0)` untuk menjamin tidak terjadi *runtime error* akibat pembagian dengan nol (*division by zero*).

### 10. Penentuan Kondisi Kegiatan Keseluruhan (Hasil Akhir)

Sesuai ketentuan penugasan Studi Kasus 09, program harus menentukan kondisi kegiatan secara keseluruhan:
- Jika `totalRealisasi < totalRencana`, maka kondisi kegiatan berstatus **"Hemat"**.
- Jika `totalRealisasi == totalRencana`, maka kondisi kegiatan berstatus **"Sesuai Anggaran"**.
- Jika `totalRealisasi > totalRencana`, maka kondisi kegiatan berstatus **"Melebihi Anggaran"**.

### 11. Penyajian Laporan Rekapitulasi Akhir

Program menampilkan hasil akhir dalam format laporan yang rapi dan terstruktur:
- Rangkuman total anggaran (rencana, realisasi, penghematan, kelebihan, dan persentase penyerapan dengan format 2 desimal).
- Statistik jumlah komponen per kategori.
- Analisis komponen dengan penyimpangan nominal terbesar beserta nominal pembengkakannya.
- Kesimpulan kondisi anggaran kegiatan secara keseluruhan.

### 12. Terminasi Program

Program mencetak pesan konfirmasi `"Proses rekapitulasi selesai."` dan mengembalikan nilai `0` (`return 0`), yang mengindikasikan bahwa seluruh tahapan komputasi berhasil dieksekusi tanpa kendala.
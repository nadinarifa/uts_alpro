/**
 * Dataset Default Studi Kasus Algoritma dan Pemrograman (C++)
 * Disusun untuk keperluan repositori, tugas, dan UTS Alpro.
 */

const DEFAULT_CASE_STUDIES = [
  {
    id: "kasus-1",
    title: "Sistem Kasir Rumah Makan Padang Sederhana",
    category: "Percabangan & Perulangan",
    difficulty: "Mudah",
    date: "2026-10-01",
    author: "Mahasiswa Alpro",
    summary: "Program kasir interaktif untuk menghitung total pesanan menu, diskon member, pajak PPN 11%, dan cetak struk pembayaran.",
    problemStatement: `Sebuah rumah makan membutuhkan aplikasi kasir sederhana berbasis konsol (CLI).
Ketentuan:
1. Menampilkan daftar menu makanan dan minuman beserta harganya.
2. Pengguna dapat memilih menu berkali-kali menggunakan perulangan (looping) hingga selesai.
3. Memberikan diskon 10% jika total belanja minimal Rp 100.000.
4. Menambahkan PPN 11% dari total setelah diskon.
5. Menghitung uang kembalian dan validasi jika uang pembayaran kurang.`,
    flowchartSteps: [
      "Mulai program dan inisialisasi total = 0, status perulangan.",
      "Tampilkan daftar menu dan harga.",
      "Input nomor menu dan jumlah porsi (akumulasi ke total).",
      "Tanyakan apakah ingin menambah pesanan (Y/T). Ulangi jika 'Y'.",
      "Hitung diskon: Jika total >= 100.000, diskon = 10%, selain itu 0%.",
      "Hitung PPN 11% dari (total - diskon).",
      "Hitung total bayar akhir = (total - diskon) + PPN.",
      "Input nominal uang pembayaran, validasi uang cukup, lalu hitung kembalian.",
      "Cetak struk belanja dan selesai."
    ],
    sampleInput: `Menu: 1 (Rendang - 20000), Porsi: 4
Tambah lagi? Y
Menu: 3 (Es Teh - 5000), Porsi: 4
Tambah lagi? T
Bayar: 120000`,
    sampleOutput: `=== STRUK PEMBAYARAN RM PADANG ===
Total Pesanan : Rp 100000
Diskon (10%)  : Rp 10000
Total Bersih  : Rp 90000
PPN (11%)     : Rp 9900
Total Akhir   : Rp 99900
-----------------------------------
Uang Bayar    : Rp 120000
Kembalian     : Rp 20100
Terima kasih atas kunjungan Anda!`,
    complexity: "Waktu: O(N) di mana N adalah jumlah iterasi pemesanan | Ruang: O(1)",
    code: `#include <iostream>
#include <iomanip>
#include <string>

using namespace std;

void tampilkanMenu() {
    cout << "\\n========================================\\n";
    cout << "        MENU RUMAH MAKAN PADANG         \\n";
    cout << "========================================\\n";
    cout << "1. Nasi Rendang Daging    - Rp 20.000\\n";
    cout << "2. Nasi Ayam Gulai         - Rp 18.000\\n";
    cout << "3. Nasi Dendeng Batokok    - Rp 22.000\\n";
    cout << "4. Es Teh Manis            - Rp  5.000\\n";
    cout << "5. Es Jeruk Nipis          - Rp  7.000\\n";
    cout << "========================================\\n";
}

int main() {
    int pilihan, porsi;
    char lanjut;
    long long totalBelanja = 0;
    
    cout << ">>> PROGRAM KASIR RESTORAN C++ <<<\\n";

    do {
        tampilkanMenu();
        cout << "Pilih nomor menu (1-5): ";
        cin >> pilihan;
        
        while (pilihan < 1 || pilihan > 5) {
            cout << "Pilihan tidak valid! Masukkan nomor (1-5): ";
            cin >> pilihan;
        }

        cout << "Masukkan jumlah porsi : ";
        cin >> porsi;
        while (porsi <= 0) {
            cout << "Jumlah porsi minimal 1: ";
            cin >> porsi;
        }

        long long hargaSatuan = 0;
        switch (pilihan) {
            case 1: hargaSatuan = 20000; break;
            case 2: hargaSatuan = 18000; break;
            case 3: hargaSatuan = 22000; break;
            case 4: hargaSatuan = 5000;  break;
            case 5: hargaSatuan = 7000;  break;
        }

        long long subtotal = hargaSatuan * porsi;
        totalBelanja += subtotal;
        cout << "Subtotal ditambahkan : Rp " << subtotal << "\\n";

        cout << "Ada pesanan lain? (y/t): ";
        cin >> lanjut;
    } while (lanjut == 'y' || lanjut == 'Y');

    // Perhitungan Diskon & Pajak
    double diskon = 0.0;
    if (totalBelanja >= 100000) {
        diskon = 0.10 * totalBelanja; // Diskon 10%
    }

    double setelahDiskon = totalBelanja - diskon;
    double ppn = 0.11 * setelahDiskon; // PPN 11%
    double totalBayar = setelahDiskon + ppn;

    // Output Pembayaran
    cout << "\\n========================================\\n";
    cout << "           STRUK PEMBAYARAN             \\n";
    cout << "========================================\\n";
    cout << fixed << setprecision(0);
    cout << "Total Kotor   : Rp " << totalBelanja << "\\n";
    cout << "Potongan Disc : Rp " << diskon << "\\n";
    cout << "PPN (11%)     : Rp " << ppn << "\\n";
    cout << "----------------------------------------\\n";
    cout << "TOTAL AKHIR   : Rp " << totalBayar << "\\n";
    cout << "========================================\\n";

    double uangBayar;
    do {
        cout << "Masukkan Uang Pembayaran: Rp ";
        cin >> uangBayar;
        if (uangBayar < totalBayar) {
            cout << "[PERINGATAN] Uang tidak cukup! Kurang Rp " << (totalBayar - uangBayar) << "\\n";
        }
    } while (uangBayar < totalBayar);

    double kembalian = uangBayar - totalBayar;
    cout << "Kembalian Anda          : Rp " << kembalian << "\\n";
    cout << "========================================\\n";
    cout << " Terima kasih, silakan berkunjung lagi! \\n\\n";

    return 0;
}`
  },
  {
    id: "kasus-2",
    title: "Manajemen Data Mahasiswa & Ranking Nilai (Array of Struct)",
    category: "Array & Struct",
    difficulty: "Menengah",
    date: "2026-10-02",
    author: "Mahasiswa Alpro",
    summary: "Pengelolaan data akademik mahasiswa, kalkulasi bobot nilai (Tugas, UTS, UAS), konversi Grade Huruf, dan perankingan dengan Bubble Sort.",
    problemStatement: `Sebuah program pengolah nilai mahasiswa kelas Algoritma & Pemrograman:
1. Menggunakan struct 'Mahasiswa' dengan atribut: NIM, Nama, Nilai Tugas (20%), Nilai UTS (35%), Nilai UAS (45%), Nilai Akhir, dan Huruf Mutu.
2. Mampu menampung data hingga N mahasiswa (array of struct).
3. Melakukan kalkulasi otomatis Nilai Akhir = (0.2 * Tugas) + (0.35 * UTS) + (0.45 * UAS).
4. Menentukan Huruf Mutu (A: >=85, B: >=70, C: >=55, D: >=40, E: <40).
5. Mengurutkan mahasiswa dari nilai tertinggi ke terendah (Descending) menggunakan Bubble Sort.`,
    flowchartSteps: [
      "Definisikan tipe struct Mahasiswa dengan field terkait.",
      "Input jumlah mahasiswa N.",
      "Looping untuk input data masing-masing mahasiswa (NIM, Nama, Nilai).",
      "Kalkulasi Nilai Akhir & Huruf Mutu di dalam fungsi.",
      "Terapkan algoritma Bubble Sort descending berdasarkan Nilai Akhir.",
      "Tampilkan tabel data mahasiswa yang sudah terurut rapi.",
      "Cetak statistik: Mahasiswa Terbaik (Rank 1) dan Rata-rata Kelas."
    ],
    sampleInput: `Jumlah Mahasiswa: 3
1. NIM: 230101, Nama: Budi, Tugas: 80, UTS: 85, UAS: 90
2. NIM: 230102, Nama: Siti, Tugas: 90, UTS: 95, UAS: 95
3. NIM: 230103, Nama: Joko, Tugas: 60, UTS: 65, UAS: 70`,
    sampleOutput: `=== TABEL PERINGKAT NILAI MAHASISWA ===
Rank  NIM     Nama    Tugas  UTS  UAS  Akhir  Grade Status
1     230102  Siti    90     95   95   94.0   A     Lulus
2     230101  Budi    80     85   90   86.25  A     Lulus
3     230103  Joko    60     65   70   66.25  C     Lulus

Rata-rata Nilai Kelas : 82.17
Mahasiswa Terbaik      : Siti (NIM: 230102) dengan Nilai 94.0`,
    complexity: "Waktu: O(N^2) untuk Bubble Sort | Ruang: O(N) untuk array of struct",
    code: `#include <iostream>
#include <iomanip>
#include <string>
#include <vector>

using namespace std;

struct Mahasiswa {
    string nim;
    string nama;
    double nilaiTugas;
    double nilaiUTS;
    double nilaiUAS;
    double nilaiAkhir;
    char grade;
    string status;
};

void hitungNilai(Mahasiswa &mhs) {
    mhs.nilaiAkhir = (0.20 * mhs.nilaiTugas) + (0.35 * mhs.nilaiUTS) + (0.45 * mhs.nilaiUAS);
    
    if (mhs.nilaiAkhir >= 85) {
        mhs.grade = 'A';
        mhs.status = "Lulus (Sangat Memuaskan)";
    } else if (mhs.nilaiAkhir >= 70) {
        mhs.grade = 'B';
        mhs.status = "Lulus (Memuaskan)";
    } else if (mhs.nilaiAkhir >= 55) {
        mhs.grade = 'C';
        mhs.status = "Lulus (Cukup)";
    } else if (mhs.nilaiAkhir >= 40) {
        mhs.grade = 'D';
        mhs.status = "Tidak Lulus (Kurang)";
    } else {
        mhs.grade = 'E';
        mhs.status = "Tidak Lulus (Gagal)";
    }
}

void bubbleSortDescending(vector<Mahasiswa> &daftar) {
    int n = daftar.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (daftar[j].nilaiAkhir < daftar[j + 1].nilaiAkhir) {
                Mahasiswa temp = daftar[j];
                daftar[j] = daftar[j + 1];
                daftar[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n;
    cout << "============================================\\n";
    cout << "     SISTEM PENGOLAHAN NILAI MAHASISWA      \\n";
    cout << "============================================\\n";
    cout << "Masukkan jumlah mahasiswa: ";
    cin >> n;

    vector<Mahasiswa> kelas(n);
    double totalNilai = 0.0;

    for (int i = 0; i < n; i++) {
        cout << "\\nData Mahasiswa ke-" << (i + 1) << ":\\n";
        cout << "NIM         : "; cin >> kelas[i].nim;
        cin.ignore();
        cout << "Nama        : "; getline(cin, kelas[i].nama);
        cout << "Nilai Tugas : "; cin >> kelas[i].nilaiTugas;
        cout << "Nilai UTS   : "; cin >> kelas[i].nilaiUTS;
        cout << "Nilai UAS   : "; cin >> kelas[i].nilaiUAS;

        hitungNilai(kelas[i]);
        totalNilai += kelas[i].nilaiAkhir;
    }

    // Urutkan mahasiswa dari nilai tertinggi
    bubbleSortDescending(kelas);

    // Tampilkan tabel ranking
    cout << "\\n\\n========================================================================\\n";
    cout << "                       TABEL RANKING MAHASISWA                          \\n";
    cout << "========================================================================\\n";
    cout << left << setw(6) << "Rank"
         << setw(12) << "NIM"
         << setw(20) << "Nama"
         << right << setw(8) << "Tugas"
         << setw(8) << "UTS"
         << setw(8) << "UAS"
         << setw(10) << "Akhir"
         << setw(8) << "Grade" << "\\n";
    cout << "------------------------------------------------------------------------\\n";

    cout << fixed << setprecision(2);
    for (int i = 0; i < n; i++) {
        cout << left << setw(6) << (i + 1)
             << setw(12) << kelas[i].nim
             << setw(20) << kelas[i].nama
             << right << setw(8) << kelas[i].nilaiTugas
             << setw(8) << kelas[i].nilaiUTS
             << setw(8) << kelas[i].nilaiUAS
             << setw(10) << kelas[i].nilaiAkhir
             << setw(8) << kelas[i].grade << "\\n";
    }
    cout << "========================================================================\\n";
    cout << "Rata-rata Nilai Kelas : " << (totalNilai / n) << "\\n";
    cout << "Juara Kelas / Top 1   : " << kelas[0].nama << " (" << kelas[0].nim 
         << ") dengan Nilai " << kelas[0].nilaiAkhir << "\\n";
    cout << "========================================================================\\n";

    return 0;
}`
  },
  {
    id: "kasus-3",
    title: "Operasi Aritmatika & Perkalian Matriks 2 Dimensi",
    category: "Array 2D & Matriks",
    difficulty: "Menengah",
    date: "2026-10-02",
    author: "Mahasiswa Alpro",
    summary: "Implementasi matriks 2D untuk operasi penjumlahan, transpose, dan perkalian dua matriks (Ordo M x K dan K x N) dengan fungsi modular.",
    problemStatement: `Dalam komputasi aljabar linier, operasi matriks merupakan materi fundamental pemrograman.
Ketentuan:
1. Membaca dimensi Matriks A (baris x kolom) dan Matriks B (baris x kolom).
2. Memeriksa validitas syarat perkalian matriks (Kolom A == Baris B).
3. Melakukan perkalian elemen: C[i][j] = sum(A[i][k] * B[k][j]).
4. Menghasilkan Matriks Transpose dari hasil perkalian tersebut.
5. Menampilkan seluruh matriks dalam format grid beraturan.`,
    flowchartSteps: [
      "Input ordo matriks A (r1 x c1) dan matriks B (r2 x c2).",
      "Cek kondisi: Jika c1 != r2, perkalian tidak dapat dilakukan (tampilkan error lalu keluar).",
      "Input elemen matriks A dan matriks B.",
      "Lakukan perkalian menggunakan 3 nested loop (i: 0..r1, j: 0..c2, k: 0..c1).",
      "Lakukan transpose matriks hasil (C_transpose[j][i] = C[i][j]).",
      "Cetak hasil matriks C dan matriks Transpose C."
    ],
    sampleInput: `Matriks A (2x2):
[1 2]
[3 4]
Matriks B (2x2):
[5 6]
[7 8]`,
    sampleOutput: `Hasil Perkalian Matriks A x B (2x2):
[ 19  22 ]
[ 43  50 ]

Hasil Transpose Matriks:
[ 19  43 ]
[ 22  50 ]`,
    complexity: "Waktu: O(r1 * c2 * c1) ~ O(N^3) | Ruang: O(N^2)",
    code: `#include <iostream>
#include <iomanip>
#include <vector>

using namespace std;

void inputMatriks(vector<vector<int>> &mat, int r, int c, const string &nama) {
    cout << "Input elemen Matriks " << nama << " (" << r << "x" << c << "):\\n";
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << nama << "[" << i << "][" << j << "]: ";
            cin >> mat[i][j];
        }
    }
}

void cetakMatriks(const vector<vector<int>> &mat, const string &judul) {
    cout << "\\n" << judul << ":\\n";
    for (const auto &baris : mat) {
        cout << "[ ";
        for (int val : baris) {
            cout << setw(6) << val << " ";
        }
        cout << "]\\n";
    }
}

int main() {
    int r1, c1, r2, c2;
    cout << "=== KALKULATOR PERKALIAN MATRIKS C++ ===\\n";
    cout << "Masukkan baris & kolom Matriks A: ";
    cin >> r1 >> c1;

    cout << "Masukkan baris & kolom Matriks B: ";
    cin >> r2 >> c2;

    // Validasi syarat perkalian matriks
    if (c1 != r2) {
        cout << "\\n[ERROR] Syarat perkalian tidak terpenuhi! (Kolom A harus sama dengan Baris B)\\n";
        return 1;
    }

    vector<vector<int>> A(r1, vector<int>(c1));
    vector<vector<int>> B(r2, vector<int>(c2));
    vector<vector<int>> C(r1, vector<int>(c2, 0));
    vector<vector<int>> C_trans(c2, vector<int>(r1, 0));

    inputMatriks(A, r1, c1, "A");
    inputMatriks(B, r2, c2, "B");

    // Perkalian Matriks (O(r1 * c2 * c1))
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    // Transpose Matriks C
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C_trans[j][i] = C[i][j];
        }
    }

    cetakMatriks(A, "Matriks A");
    cetakMatriks(B, "Matriks B");
    cetakMatriks(C, "Hasil Perkalian (A x B)");
    cetakMatriks(C_trans, "Transpose dari Hasil Perkalian (C^T)");

    return 0;
}`
  },
  {
    id: "kasus-4",
    title: "Pencarian Katalog Buku Perpustakaan (Quick Sort & Binary Search)",
    category: "Searching & Sorting",
    difficulty: "Menengah",
    date: "2026-10-03",
    author: "Mahasiswa Alpro",
    summary: "Optimasi pencarian kode ISBN buku perpustakaan berkecepatan tinggi O(log N) menggunakan Quick Sort partition dan Binary Search.",
    problemStatement: `Perpustakaan kampus memiliki ribuan buku yang kodenya tersimpan secara acak.
Ketentuan:
1. Menerima kumpulan data buku (Kode Buku, Judul, Pengarang, Tahun Terbit).
2. Melakukan pengurutan berdasarkan Kode Buku secara ascending menggunakan Algoritma Quick Sort (Divide and Conquer).
3. Menerapkan Algoritma Binary Search untuk mencari buku tertentu berdasarkan input Kode Buku dari pengguna.
4. Menampilkan berapa kali proses perbandingan (step) hingga buku ditemukan atau dinyatakan tidak ada.`,
    flowchartSteps: [
      "Inisialisasi daftar buku.",
      "Jalankan fungsi QuickSort(daftar, low, high) dengan pivot elemen terakhir.",
      "Tampilkan daftar buku yang telah terurut.",
      "Input kode buku yang dicari oleh pengguna.",
      "Jalankan BinarySearch(daftar, target): Hitung mid = low + (high - low) / 2.",
      "Jika ketemu, tampilkan detail buku dan jumlah iterasi langkah.",
      "Jika low > high, tampilkan informasi bahwa buku tidak terdaftar."
    ],
    sampleInput: `Daftar buku belum terurut: [108, 102, 115, 101, 109, 104]
Cari kode buku: 109`,
    sampleOutput: `Buku terurut: 101, 102, 104, 108, 109, 115
Buku DITEMUKAN pada iterasi ke-2!
Judul Buku : Struktur Data & Algoritma
Pengarang  : Dr. Indrajit
Tahun      : 2024`,
    complexity: "Quick Sort: Rata-rata O(N log N) | Binary Search: O(log N)",
    code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Buku {
    int kode;
    string judul;
    string pengarang;
    int tahun;
};

// Partisi Quick Sort
int partition(vector<Buku> &arr, int low, int high) {
    int pivot = arr[high].kode;
    int i = (low - 1);

    for (int j = low; j < high; j++) {
        if (arr[j].kode < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<Buku> &arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Binary Search dengan pencatat langkah
int binarySearch(const vector<Buku> &arr, int target, int &langkah) {
    int low = 0;
    int high = arr.size() - 1;
    langkah = 0;

    while (low <= high) {
        langkah++;
        int mid = low + (high - low) / 2;

        if (arr[mid].kode == target) {
            return mid; // Ditemukan
        }
        if (arr[mid].kode < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Tidak ditemukan
}

int main() {
    vector<Buku> katalog = {
        {108, "Pemrograman C++ Modern", "Bjarne S.", 2023},
        {102, "Algoritma Pemrograman Dasar", "Rinaldi Munir", 2020},
        {115, "Kecerdasan Buatan & AI", "Stuart Russell", 2022},
        {101, "Pengantar Ilmu Komputer", "Jogiyanto", 2019},
        {109, "Struktur Data Lanjut", "Robert Sedgewick", 2021},
        {104, "Basis Data Relasional", "Korth & Silberschatz", 2020}
    };

    cout << "=== SISTEM PENCARIAN KATALOG PERPUSTAKAAN ===\\n";
    cout << "Katalog awal belum terurut:\\n";
    for (const auto &b : katalog) {
        cout << "[" << b.kode << "] " << b.judul << "\\n";
    }

    // Urutkan katalog dengan Quick Sort
    quickSort(katalog, 0, katalog.size() - 1);

    cout << "\\nKatalog setelah diurutkan (Quick Sort):\\n";
    for (const auto &b : katalog) {
        cout << "[" << b.kode << "] " << b.judul << "\\n";
    }

    int targetKode;
    cout << "\\nMasukkan Kode Buku yang ingin dicari: ";
    cin >> targetKode;

    int totalLangkah = 0;
    int index = binarySearch(katalog, targetKode, totalLangkah);

    if (index != -1) {
        cout << "\\n>>> BUKU DITEMUKAN! <<<\\n";
        cout << "Ditemukan pada indeks : " << index << "\\n";
        cout << "Jumlah langkah biner  : " << totalLangkah << " kali pembandingan\\n";
        cout << "Kode Buku             : " << katalog[index].kode << "\\n";
        cout << "Judul Buku            : " << katalog[index].judul << "\\n";
        cout << "Penulis               : " << katalog[index].pengarang << "\\n";
        cout << "Tahun Terbit          : " << katalog[index].tahun << "\\n";
    } else {
        cout << "\\n[NOT FOUND] Buku dengan kode " << targetKode 
             << " tidak ditemukan setelah " << totalLangkah << " langkah pengecekan.\\n";
    }

    return 0;
}`
  },
  {
    id: "kasus-5",
    title: "Penyelesaian Teka-Teki Menara Hanoi (Rekursif & Stack Call)",
    category: "Fungsi & Rekursi",
    difficulty: "Sulit",
    date: "2026-10-04",
    author: "Mahasiswa Alpro",
    summary: "Simulasi matematis pemindahan N piringan emas dari tiang Asal ke tiang Tujuan melalui tiang Bantu sesuai aturan Menara Hanoi.",
    problemStatement: `Teka-teki Menara Hanoi memiliki 3 tiang (A: Asal, B: Bantu, C: Tujuan) dan N piringan berbeda ukuran.
Aturan:
1. Hanya 1 piringan yang boleh dipindahkan dalam satu waktu.
2. Piringan yang lebih besar tidak boleh diletakkan di atas piringan yang lebih kecil.
3. Tentukan langkah minimum perpindahan: 2^N - 1 langkah.
4. Cetak setiap langkah pemindahan secara rekursif langkah demi langkah.`,
    flowchartSteps: [
      "Fungsi hanoi(n, tiangA, tiangC, tiangB).",
      "Base Case: Jika n == 1, langsung pindahkan piringan 1 dari tiangA ke tiangC.",
      "Recursive Step 1: hanoi(n-1, tiangA, tiangB, tiangC) -> pindahkan n-1 piringan ke tiang Bantu.",
      "Pindahkan piringan ke-n dari tiangA ke tiangC.",
      "Recursive Step 2: hanoi(n-1, tiangB, tiangC, tiangA) -> pindahkan n-1 piringan dari Bantu ke Tujuan.",
      "Hitung total langkah pemindahan = 2^n - 1."
    ],
    sampleInput: `Jumlah piringan: 3
Tiang: A (Asal), B (Bantu), C (Tujuan)`,
    sampleOutput: `Langkah 1: Pindahkan piringan 1 dari A ke C
Langkah 2: Pindahkan piringan 2 dari A ke B
Langkah 3: Pindahkan piringan 1 dari C ke B
Langkah 4: Pindahkan piringan 3 dari A ke C
Langkah 5: Pindahkan piringan 1 dari B ke A
Langkah 6: Pindahkan piringan 2 dari B ke C
Langkah 7: Pindahkan piringan 1 dari A ke C

Total langkah minimum: 7`,
    complexity: "Waktu: O(2^N) eksponensial | Ruang: O(N) stack call kedalaman rekursi",
    code: `#include <iostream>
#include <cmath>

using namespace std;

int nomorLangkah = 0;

void menaraHanoi(int n, char asal, char tujuan, char bantu) {
    // Base Case
    if (n == 1) {
        nomorLangkah++;
        cout << "Langkah " << nomorLangkah << ": Pindahkan piringan 1 dari Tiang " 
             << asal << " ke Tiang " << tujuan << "\\n";
        return;
    }

    // Pindahkan n-1 piringan dari Asal ke Bantu (menggunakan Tujuan sebagai perantara)
    menaraHanoi(n - 1, asal, bantu, tujuan);

    // Pindahkan piringan ke-n dari Asal ke Tujuan
    nomorLangkah++;
    cout << "Langkah " << nomorLangkah << ": Pindahkan piringan " << n << " dari Tiang " 
         << asal << " ke Tiang " << tujuan << "\\n";

    // Pindahkan n-1 piringan dari Bantu ke Tujuan (menggunakan Asal sebagai perantara)
    menaraHanoi(n - 1, bantu, tujuan, asal);
}

int main() {
    int jumlahPiringan;
    cout << "=============================================\\n";
    cout << "   SIMULASI TEKA-TEKI MENARA HANOI (C++)     \\n";
    cout << "=============================================\\n";
    cout << "Masukkan jumlah piringan (rekomendasi 1-6): ";
    cin >> jumlahPiringan;

    if (jumlahPiringan <= 0) {
        cout << "Jumlah piringan harus lebih besar dari 0!\\n";
        return 1;
    }

    long long totalTeoritis = pow(2, jumlahPiringan) - 1;
    cout << "\\nTotal langkah minimum teoritis (2^N - 1) = " << totalTeoritis << " langkah.\\n";
    cout << "Proses perpindahan:\\n";
    cout << "---------------------------------------------\\n";

    nomorLangkah = 0;
    menaraHanoi(jumlahPiringan, 'A', 'C', 'B');

    cout << "---------------------------------------------\\n";
    cout << "Semua piringan berhasil dipindahkan ke Tiang C!\\n";

    return 0;
}`
  },
  {
    id: "kasus-6",
    title: "Simulasi Antrean Teller Bank (Queue FIFO dengan Struct & Array)",
    category: "Struktur Data Sederhana",
    difficulty: "Menengah",
    date: "2026-10-05",
    author: "Mahasiswa Alpro",
    summary: "Simulasi antrean nasabah bank dengan prinsip First-In First-Out (FIFO) yang mencakup operasi Enqueue, Dequeue, dan status kapasitas antrean.",
    problemStatement: `Bank Swasta membutuhkan modul antrean nasabah untuk teller:
1. Menggunakan struktur data Queue berbasis array melingkar atau linear sederhana.
2. Fitur Enqueue: Menambahkan nomor dan nama nasabah ke antrean (cek antrean penuh / overflow).
3. Fitur Dequeue: Memanggil nasabah terdepan untuk dilayani (cek antrean kosong / underflow).
4. Fitur View: Menampilkan daftar nomor antrean yang masih menunggu di lobi.
5. Menu interaktif berbasis switch-case yang terus berjalan sampai pengguna memilih keluar.`,
    flowchartSteps: [
      "Inisialisasi queue: depan = -1, belakang = -1, kapasitas MAX.",
      "Pilihan Menu: 1. Ambil Antrean, 2. Panggil Nasabah, 3. Tampilkan Antrean, 4. Keluar.",
      "Enqueue: Jika (belakang == MAX - 1), antrean penuh. Jika tidak, belakang++ dan isi data.",
      "Dequeue: Jika kosong (depan == -1 atau depan > belakang), cetak kosong. Jika ada, layani data pada posisi depan, lalu depan++.",
      "Jika depan > belakang setelah dequeue, reset depan = belakang = -1.",
      "Ulangi menu hingga opsi keluar."
    ],
    sampleInput: `1. Enqueue("Andi", "Setor Tunai")
2. Enqueue("Budi", "Buka Rekening")
3. Dequeue()
4. View Queue`,
    sampleOutput: `[INFO] Andi berhasil mengambil antrean nomor: A-1
[INFO] Budi berhasil mengambil antrean nomor: A-2
[CALL] Nomor A-1 (Andi) dipersilakan menuju ke Teller!
=== DAFTAR ANTREAN SAAT INI ===
1. [A-2] Budi - Keperluan: Buka Rekening
Total antrean tersisa: 1 orang`,
    complexity: "Enqueue: O(1) | Dequeue: O(1) | Display: O(N)",
    code: `#include <iostream>
#include <string>

using namespace std;

const int MAX_QUEUE = 5;

struct Nasabah {
    int nomorAntrean;
    string nama;
    string keperluan;
};

class BankQueue {
private:
    Nasabah antrean[MAX_QUEUE];
    int depan;
    int belakang;
    int counterNomor;

public:
    BankQueue() {
        depan = -1;
        belakang = -1;
        counterNomor = 1;
    }

    bool isFull() {
        return (belakang == MAX_QUEUE - 1);
    }

    bool isEmpty() {
        return (depan == -1 || depan > belakang);
    }

    void enqueue(string nama, string keperluan) {
        if (isFull()) {
            cout << "\\n[PERINGATAN] Antrean penuh! Harap tunggu sampai ada nasabah yang selesai.\\n";
            return;
        }

        if (depan == -1) {
            depan = 0;
        }

        belakang++;
        antrean[belakang].nomorAntrean = counterNomor++;
        antrean[belakang].nama = nama;
        antrean[belakang].keperluan = keperluan;

        cout << "\\n[BERHASIL] Nasabah " << nama 
             << " terdaftar dengan Nomor Antrean: A-" << antrean[belakang].nomorAntrean << "\\n";
    }

    void dequeue() {
        if (isEmpty()) {
            cout << "\\n[INFO] Antrean kosong! Tidak ada nasabah yang menunggu.\\n";
            return;
        }

        cout << "\\n========================================\\n";
        cout << " [PANGGILAN TELLER]\\n";
        cout << " Nomor Antrean: A-" << antrean[depan].nomorAntrean << "\\n";
        cout << " Atas Nama    : " << antrean[depan].nama << "\\n";
        cout << " Keperluan    : " << antrean[depan].keperluan << "\\n";
        cout << " Silakan menuju Teller 1.\\n";
        cout << "========================================\\n";

        depan++;

        // Reset indeks jika semua antrean sudah habis
        if (depan > belakang) {
            depan = -1;
            belakang = -1;
        }
    }

    void display() {
        if (isEmpty()) {
            cout << "\\n[INFO] Saat ini antrean kosong.\\n";
            return;
        }

        cout << "\\n=== DAFTAR ANTREAN YANG MENUNGGU ===\\n";
        int no = 1;
        for (int i = depan; i <= belakang; i++) {
            cout << no++ << ". [A-" << antrean[i].nomorAntrean << "] "
                 << antrean[i].nama << " (" << antrean[i].keperluan << ")\\n";
        }
        cout << "Total menunggu: " << (belakang - depan + 1) << " nasabah.\\n";
        cout << "Sisa kuota antrean: " << (MAX_QUEUE - 1 - belakang) << "\\n";
    }
};

int main() {
    BankQueue bq;
    int menu;
    string nama, keperluan;

    do {
        cout << "\\n========================================\\n";
        cout << "    SISTEM ANTREAN BANK SEJAHTERA       \\n";
        cout << "========================================\\n";
        cout << "1. Ambil Antrean Baru (Enqueue)\\n";
        cout << "2. Panggil Nasabah Berikutnya (Dequeue)\\n";
        cout << "3. Lihat Daftar Antrean Menunggu\\n";
        cout << "4. Keluar Program\\n";
        cout << "Pilih opsi (1-4): ";
        cin >> menu;

        switch (menu) {
            case 1:
                cin.ignore();
                cout << "Masukkan Nama Nasabah   : ";
                getline(cin, nama);
                cout << "Masukkan Jenis Transaksi: ";
                getline(cin, keperluan);
                bq.enqueue(nama, keperluan);
                break;
            case 2:
                bq.dequeue();
                break;
            case 3:
                bq.display();
                break;
            case 4:
                cout << "\\nTerima kasih telah menggunakan sistem antrean.\\n";
                break;
            default:
                cout << "\\nPilihan menu tidak valid!\\n";
        }
    } while (menu != 4);

    return 0;
}`
  }
];

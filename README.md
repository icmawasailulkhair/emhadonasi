# EMHA Donasi (emhadonasi)
## Sistem Pencatatan Donasi & Laporan Keuangan

Proyek web manajemen pencatatan donasi dan laporan keuangan untuk **EMHA Donasi** bertema **SaaS Minimalis** dengan latar belakang putih dan aksen biru royal/elektrik.

---

## 📁 Lokasi Penyimpanan Proyek
Kodingan ini disimpan di folder Download komputer Anda:
`C:\Users\user\Downloads\icma-donasi\`

---

## 🚀 Cara Menjalankan Aplikasi

### Opsi 1: Langsung Buka di Browser (Tanpa Instalasi / Siap Pakai)
1. Buka File Explorer dan masuk ke folder `C:\Users\user\Downloads\icma-donasi\`
2. Klik ganda (double-click) pada file **`index.html`**
3. Aplikasi akan langsung terbuka di browser favorit Anda (Chrome/Edge/Firefox) dengan fitur 100% aktif!

### Opsi 2: Menggunakan Node.js / React (Server Dev)
Jika di komputer Anda sudah terpasang Node.js:
1. Buka Terminal / Command Prompt pada folder `C:\Users\user\Downloads\icma-donasi\`
2. Jalankan perintah instalasi paket:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka alamat `http://localhost:5173/` (terpisah dan tidak akan bentrok dengan server lain).

---

## 🔐 Kredensial Akses Admin
- **Username**: `admin`
- **Password**: `admin123`

---

## ✨ Fitur-Fitur Utama

1. **Dashboard Overview**:
   - Total Nominal Donasi, Total Donatur, Jumlah Transaksi, Rata-Rata Donasi.
   - Grafik Pemasukan Bulanan (Line Chart).
   - Grafik Distribusi Tujuan Donasi (Doughnut Chart).

2. **Kelola Donasi (Full CRUD + Soft Delete)**:
   - **Preloaded Data**: Sudah otomatis terisi **32 data donasi nyata** sesuai tabel sampel Anda (termasuk Ibu Sukirah & Bapak Sutomo, Ibu Ratih Sulanjari, Idola Rizki, Bp Sukiman, dll.).
   - **Pencarian & Filter**: Berdasarkan kata kunci donatur, 5 Tujuan Donasi, dan Provinsi.
   - **Tambah Donasi**: Input nama, tanggal, jumlah, 5 tujuan, wilayah, metode, dan doa/catatan.
   - **Edit Data**: Mengubah record transaksi existing.
   - **Hapus ke Sampah (Soft Delete)**: Data tidak langsung hilang permanen, bisa di-restore dari menu Sampah.

3. **5 Kategori Tujuan Donasi**:
   - Wakaf Jariyah
   - Zakat
   - Infaq
   - Shodaqoh
   - Dana Riba

4. **Sampah / Trash & Restore**:
   - Menu tempat penampungan data sementara.
   - Memungkinkan **Restore** data kembali ke tabel aktif atau **Hapus Permanen**.

5. **Cetak & Unduh Invoice Bukti Donasi**:
   - Preview Kwitansi Bukti Penerimaan Donasi resmi.
   - Perhitungan **Terbilang Rupiah** otomatis (Contoh: *"Lima Ratus Juta Rupiah"*).
   - **Unduh PDF** (berkas format surat PDF resmi).
   - **Unduh JPG** (gambar resolusi tinggi).
   - **Cetak Langsung** (tombol print kwitansi).

6. **Unduh Rekap Excel (`.xlsx`)**:
   - Tombol ekspor instan seluruh data donasi aktif ke berkas spreadsheet `.xlsx` siap cetak laporan keuangan.

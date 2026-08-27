# 🚀 Panduan Hosting Backend REST API MySQL - EMHA Donasi

Panduan ini menjelaskan cara memasang database MySQL dan file REST API pada hosting Anda (cPanel / Niagahoster / Hostinger / DomaiNesia / VPS / dll.) sehingga aplikasi EMHA Donasi dapat online dan tersinkronisasi lintas perangkat.

---

## 📋 Langkah 1: Buat Database MySQL di Hosting
1. Masuk ke **cPanel / Panel Hosting** Anda.
2. Buka menu **MySQL Databases** (atau **Database Wizard**).
3. Buat database baru, contoh nama: `u12345_emhadonasi`.
4. Buat user database baru, contoh: `u12345_emhauser` dengan password kuat.
5. Hubungkan user tersebut ke database dan centang **ALL PRIVILEGES** (Semua Izin Hak Akses).

---

## 📥 Langkah 2: Import Skema Tabel Database
1. Di cPanel, buka menu **phpMyAdmin**.
2. Pilih database yang baru saja Anda buat (`u12345_emhadonasi`).
3. Klik tab **Import** di menu atas.
4. Klik tombol **Choose File / Telusuri**, lalu pilih berkas **`database.sql`** yang ada di folder ini (`backend/database.sql`).
5. Klik tombol **Import / Kirim** di bagian bawah. Seluruh tabel (`donors`, `donations`, `expenses`, `trash`, `admin_account`, dll.) akan otomatis terbuat beserta data sampel awal.

---

## ⚙️ Langkah 3: Sesuaikan Konfigurasi di `api.php`
Buka file **`api.php`** dengan teks editor, lalu sesuaikan baris 13-17:

```php
define('DB_HOST', 'localhost');          // Biasanya tetap 'localhost'
define('DB_NAME', 'u12345_emhadonasi');  // Nama database hosting Anda
define('DB_USER', 'u12345_emhauser');    // Username database hosting Anda
define('DB_PASS', 'PasswordDatabaseAnda123!'); // Password database hosting Anda
```

---

## 📤 Langkah 4: Upload `api.php` ke Hosting
1. Masuk ke **File Manager** di cPanel Anda.
2. Masuk ke folder **`public_html`** (atau subdomain misal `api.domainanda.com`).
3. Unggah file **`api.php`** ke folder tersebut.
4. Uji coba buka di browser:
   👉 `https://domainanda.com/api.php?action=ping`
   Jika muncul respon JSON:
   `{"status": "ok", "message": "EMHA Donasi REST API Online & Terhubung ke MySQL!"}`
   maka backend REST API Anda telah **100% AKTIF dan SIAP DIGUNAKAN**!

---

## 🔗 Langkah 5: Hubungkan ke Frontend EMHA Donasi
1. Buka aplikasi web EMHA Donasi di browser (atau via GitHub Pages Anda).
2. Masuk ke menu **Pengaturan Akun** $\rightarrow$ Bagian **Koneksi Database REST API (MySQL Online)**.
3. Masukkan URL API Anda, contoh: `https://domainanda.com/api.php`
4. Klik tombol **Tes Koneksi & Aktifkan Mode Online**.
5. Klik **Migrasi / Sinkronkan Data ke MySQL** untuk menyalin seluruh data lokal Anda ke MySQL hosting.

Selesai! Aplikasi kini tersinkronisasi online secara *real-time* ke MySQL! 🎉

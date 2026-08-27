# ⚡ Panduan Setup Database Supabase Cloud - EMHA Donasi

Dengan Supabase, Anda **tidak perlu mengelola server/hosting backend**! Database PostgreSQL di-hosting langsung di cloud Supabase secara gratis, aman, dan online 24/7.

---

## 📋 Langkah 1: Buat Proyek di Supabase (Gratis)
1. Buka [https://supabase.com](https://supabase.com) dan login/daftar (bisa login instan dengan akun GitHub Anda).
2. Klik tombol **New Project**.
3. Masukkan:
   - **Name**: `emhadonasi`
   - **Database Password**: *(Buat password aman)*
   - **Region**: Pilih **Singapore (ap-southeast-1)** *(terdekat & tercepat dari Indonesia)*.
4. Klik **Create new project** dan tunggu 1-2 menit hingga statusnya siap.

---

## 📥 Langkah 2: Jalankan Skrip SQL di Supabase
1. Di dashboard Supabase proyek Anda, klik menu **SQL Editor** (ikon `<_>` di bilah navigasi kiri).
2. Klik tombol **+ New query**.
3. Buka file **`supabase/schema.sql`** di proyek ini, copy (salin) seluruh isinya, lalu paste (tempel) ke SQL Editor Supabase.
4. Klik tombol hijau **RUN** (di pojok kanan bawah editor).
5. Pesan *"Success. No rows returned"* akan muncul. Seluruh tabel (`donors`, `donations`, `expenses`, `trash`, `admin_account`, dll.) dan kebijakan keamanan (RLS) telah otomatis aktif!

---

## 🔑 Langkah 3: Ambil Project URL & Anon Key
1. Di dashboard Supabase, klik menu **Project Settings** (ikon gerigi ⚙️ di kiri bawah) $\rightarrow$ **API**.
2. Salin 2 nilai berikut:
   - **Project URL** (contoh: `https://abcdefghijkl.supabase.co`)
   - **Project API Keys** $\rightarrow$ salin kunci bertanda **`anon` `public`** (kunci panjang berawalan `eyJhbGci...`)

---

## 🔗 Langkah 4: Hubungkan ke Aplikasi EMHA Donasi
1. Buka aplikasi web EMHA Donasi (atau via GitHub Pages).
2. Buka menu **Pengaturan Akun** $\rightarrow$ Bagian **Koneksi Database Cloud (Supabase Online)**.
3. Masukkan:
   - **Supabase Project URL**
   - **Supabase Anon Key**
4. Klik tombol **Tes Koneksi Supabase** $\rightarrow$ Lalu klik **Simpan & Aktifkan Supabase**.
5. Klik **Migrasi / Upload Data Lokal ke Supabase** untuk menyalin seluruh data lokal Anda ke cloud.

Selesai! Aplikasi kini 100% online di cloud Supabase secara *real-time* lintas komputer & HP! 🎉

-- ============================================================================
-- EMHA DONASI - DATABASE SCHEMA (MySQL 5.7+ / MariaDB 10.2+)
-- ============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- 1. Tabel Donatur (donors)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donors` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL,
  `hp` VARCHAR(30) DEFAULT NULL,
  `provinsi` VARCHAR(100) DEFAULT NULL,
  `kabupaten` VARCHAR(100) DEFAULT NULL,
  `kecamatan` VARCHAR(100) DEFAULT NULL,
  `kelurahan` VARCHAR(100) DEFAULT NULL,
  `alamat_maps` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 2. Tabel Transaksi Donasi Masuk (donations)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donations` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `donor_id` VARCHAR(50) DEFAULT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `tanggal` DATE NOT NULL,
  `jumlah` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `tujuan` VARCHAR(100) NOT NULL,
  `metode` VARCHAR(50) NOT NULL DEFAULT 'Transfer',
  `catatan` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_donations_donor` (`donor_id`),
  INDEX `idx_donations_tanggal` (`tanggal`),
  INDEX `idx_donations_tujuan` (`tujuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 3. Tabel Pengeluaran Kas / Operasional (expenses)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `tanggal` DATE NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `jumlah` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `metode` VARCHAR(50) NOT NULL DEFAULT 'Tunai',
  `catatan` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_expenses_tanggal` (`tanggal`),
  INDEX `idx_expenses_kategori` (`kategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 4. Tabel Kategori Kas Masuk (categories_masuk)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories_masuk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 5. Tabel Kategori Kas Keluar (categories_keluar)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories_keluar` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 6. Tabel Keranjang Sampah / Soft Delete (trash)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `trash` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `item_type` VARCHAR(50) NOT NULL,
  `item_data` LONGTEXT NOT NULL,
  `deleted_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 7. Tabel Akun Administrator (admin_account)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_account` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `name` VARCHAR(150) DEFAULT 'Bendahara EMHA',
  `signature_base64` LONGTEXT DEFAULT NULL,
  `profile_photo_base64` LONGTEXT DEFAULT NULL,
  `app_theme` VARCHAR(50) DEFAULT 'navy',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- DATA AWAL / SEED DATA
-- ----------------------------------------------------------------------------

-- Kategori Masuk Default
INSERT IGNORE INTO `categories_masuk` (`id`, `nama`) VALUES
(1, 'Wakaf Jariyah'),
(2, 'Zakat'),
(3, 'Infaq'),
(4, 'Shodaqoh'),
(5, 'Dana Riba');

-- Kategori Keluar Default
INSERT IGNORE INTO `categories_keluar` (`id`, `nama`) VALUES
(1, 'Operasional Kantor'),
(2, 'Penyaluran Santunan'),
(3, 'Logistik & Sarana'),
(4, 'Penyaluran Wakaf'),
(5, 'Gaji & Honor');

-- Akun Admin Default (username: admin, password: admin123)
INSERT IGNORE INTO `admin_account` (`id`, `username`, `password`, `email`, `phone`, `name`, `app_theme`) VALUES
(1, 'admin', 'admin123', 'admin@emhadonasi.com', '0895393181822', 'Bendahara EMHA', 'navy');

-- Sampel Donatur Awal
INSERT IGNORE INTO `donors` (`id`, `nama`, `hp`, `provinsi`, `kabupaten`, `kecamatan`, `kelurahan`, `alamat_maps`) VALUES
('DNR-001', 'H. Mile & Hj. Masita', '081234567891', 'JAWA TENGAH', 'KOTA SEMARANG', 'PEDURUNGAN', 'PEDURUNGAN KIDUL', 'Jl. Pedurungan Raya No. 12'),
('DNR-002', 'Ibu Lulu', '081234567892', 'JAWA TENGAH', 'KOTA SEMARANG', 'BANYUMANIK', 'BANYUMANIK', 'Jl. Banyumanik Indah No. 5'),
('DNR-003', 'Ibu Siti Rahayu', '081234567893', 'JAWA TENGAH', 'KOTA SEMARANG', 'TEMBALANG', 'TEMBALANG', 'Perum Tembalang Asri Blok B'),
('DNR-004', 'Bp Sumadi', '081234567894', 'JAWA TENGAH', 'KOTA SEMARANG', 'CANDISARI', 'CANDISARI', 'Jl. Candi Prambanan No. 8'),
('DNR-005', 'Ibu Tri Isti Rahayu', '081234567895', 'JAWA TENGAH', 'KOTA SEMARANG', 'GAJAHMUNGKUR', 'GAJAHMUNGKUR', 'Jl. Gajahmungkur No. 20');

-- Sampel Transaksi Donasi Awal
INSERT IGNORE INTO `donations` (`id`, `donor_id`, `nama`, `tanggal`, `jumlah`, `tujuan`, `metode`, `catatan`) VALUES
('DON-20260801-001', 'DNR-001', 'H. Mile & Hj. Masita', '2026-08-01', 1500000.00, 'Wakaf Jariyah', 'Transfer', 'Wakaf pembangunan gedung EMHA'),
('DON-20260802-002', 'DNR-002', 'Ibu Lulu', '2026-08-02', 1000000.00, 'Zakat', 'Transfer', 'Zakat Maal Penghasilan'),
('DON-20260803-003', 'DNR-003', 'Ibu Siti Rahayu', '2026-08-03', 250000.00, 'Infaq', 'Tunai', 'Infaq operasional dakwah'),
('DON-20260804-004', 'DNR-004', 'Bp Sumadi', '2026-08-04', 500000.00, 'Shodaqoh', 'Tunai', 'Sedekah subuh berkah'),
('DON-20260805-005', 'DNR-005', 'Ibu Tri Isti Rahayu', '2026-08-05', 200000.00, 'Dana Riba', 'Transfer', 'Penyucian dana jasa giro');

-- Sampel Kas Keluar Awal
INSERT IGNORE INTO `expenses` (`id`, `tanggal`, `kategori`, `jumlah`, `metode`, `catatan`) VALUES
('EXP-20260802-001', '2026-08-02', 'Operasional Kantor', 450000.00, 'Transfer', 'Tagihan Listrik & Air Kantor EMHA'),
('EXP-20260805-002', '2026-08-05', 'Penyaluran Santunan', 1000000.00, 'Tunai', 'Santunan 10 Anak Yatim & Dhuafa'),
('EXP-20260810-003', '2026-08-10', 'Logistik & Sarana', 500000.00, 'Transfer', 'Pengadaan Al-Qur\'an & Sound System'),
('EXP-20260815-004', '2026-08-15', 'Penyaluran Wakaf', 1200000.00, 'Transfer', 'Bantuan Pengeboran Sumur Air Bersih'),
('EXP-20260818-005', '2026-08-18', 'Gaji & Honor', 300000.00, 'Tunai', 'Honor Pemateri Kajian Pekanan');

SET FOREIGN_KEY_CHECKS = 1;

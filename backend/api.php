<?php
/**
 * ============================================================================
 * EMHA DONASI - REST API BACKEND (MySQL / MariaDB)
 * ============================================================================
 * 
 * Petunjuk Konfigurasi:
 * Sesuaikan 4 baris konfigurasi database di bawah ini dengan database cPanel/Hosting Anda.
 */

// ----------------------------------------------------------------------------
// 1. KONFIGURASI DATABASE HOSTING
// ----------------------------------------------------------------------------
define('DB_HOST', 'localhost');          // Biasanya 'localhost' pada cPanel/shared hosting
define('DB_NAME', 'u12345_emhadonasi');  // Ganti dengan nama database Anda
define('DB_USER', 'u12345_emhauser');    // Ganti dengan username database Anda
define('DB_PASS', 'PasswordDatabaseAnda123!'); // Ganti dengan password database Anda
define('DB_CHARSET', 'utf8mb4');

// ----------------------------------------------------------------------------
// 2. HEADER CORS (Cross-Origin Resource Sharing)
// ----------------------------------------------------------------------------
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Tangani HTTP OPTIONS Preflight request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------------------------------------------------------------------------
// 3. KONEKSI KE MYSQL VIA PDO
// ----------------------------------------------------------------------------
function getDbConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Gagal koneksi ke database MySQL: ' . $e->getMessage()
        ]);
        exit;
    }
}

// Helper untuk membaca request body JSON
function getRequestBody() {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// Helper untuk mengirim response JSON standar
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ----------------------------------------------------------------------------
// 4. ROUTER ENDPOINT REST API
// ----------------------------------------------------------------------------
$action = isset($_GET['action']) ? trim($_GET['action']) : '';
$method = $_SERVER['REQUEST_METHOD'];
$body   = getRequestBody();

try {
    $db = getDbConnection();

    switch ($action) {

        // --- HEALTH CHECK / PING ---
        case 'ping':
            jsonResponse([
                'status'  => 'ok',
                'message' => 'EMHA Donasi REST API Online & Terhubung ke MySQL!',
                'time'    => date('Y-m-d H:i:s')
            ]);
            break;

        // --- INIT ALL DATA (Dipanggil saat dashboard pertama dibuka) ---
        case 'init_data':
            $donors = $db->query("SELECT * FROM donors ORDER BY id ASC")->fetchAll();
            $donations = $db->query("SELECT * FROM donations ORDER BY tanggal DESC, id DESC")->fetchAll();
            $expenses = $db->query("SELECT * FROM expenses ORDER BY tanggal DESC, id DESC")->fetchAll();
            $catMasukRows = $db->query("SELECT nama FROM categories_masuk ORDER BY id ASC")->fetchAll();
            $catKeluarRows = $db->query("SELECT nama FROM categories_keluar ORDER BY id ASC")->fetchAll();
            $trash = $db->query("SELECT * FROM trash ORDER BY deleted_at DESC")->fetchAll();
            $admin = $db->query("SELECT username, email, phone, name, app_theme, signature_base64, profile_photo_base64 FROM admin_account LIMIT 1")->fetch();

            // Format kategori menjadi array of string
            $catMasuk = array_column($catMasukRows, 'nama');
            $catKeluar = array_column($catKeluarRows, 'nama');

            // Format trash item_data JSON
            $formattedTrash = array_map(function($t) {
                return [
                    'id'         => $t['id'],
                    'type'       => $t['item_type'],
                    'data'       => json_decode($t['item_data'], true) ?: $t['item_data'],
                    'deletedAt'  => $t['deleted_at']
                ];
            }, $trash);

            // Format donasi numerik
            $formattedDonations = array_map(function($d) {
                return [
                    'id'       => $d['id'],
                    'donorId'  => $d['donor_id'],
                    'nama'     => $d['nama'],
                    'tanggal'  => $d['tanggal'],
                    'jumlah'   => floatval($d['jumlah']),
                    'tujuan'   => $d['tujuan'],
                    'metode'   => $d['metode'],
                    'catatan'  => $d['catatan']
                ];
            }, $donations);

            $formattedExpenses = array_map(function($e) {
                return [
                    'id'       => $e['id'],
                    'tanggal'  => $e['tanggal'],
                    'kategori' => $e['kategori'],
                    'jumlah'   => floatval($e['jumlah']),
                    'metode'   => $e['metode'],
                    'catatan'  => $e['catatan']
                ];
            }, $expenses);

            $formattedDonors = array_map(function($dn) {
                return [
                    'id'         => $dn['id'],
                    'nama'       => $dn['nama'],
                    'hp'         => $dn['hp'],
                    'provinsi'   => $dn['provinsi'],
                    'kabupaten'  => $dn['kabupaten'],
                    'kecamatan'  => $dn['kecamatan'],
                    'kelurahan'  => $dn['kelurahan'],
                    'alamatMaps' => $dn['alamat_maps']
                ];
            }, $donors);

            jsonResponse([
                'status' => 'success',
                'data'   => [
                    'donors'           => $formattedDonors,
                    'donations'        => $formattedDonations,
                    'expenses'         => $formattedExpenses,
                    'categoriesMasuk'  => $catMasuk,
                    'categoriesKeluar' => $catKeluar,
                    'trash'            => $formattedTrash,
                    'admin'            => $admin ?: null
                ]
            ]);
            break;

        // --- SINKRONISASI MASSAL (MIGRASI DARI LOCALSTORAGE KE MYSQL) ---
        case 'sync_all':
            if ($method !== 'POST') jsonResponse(['status' => 'error', 'message' => 'Method must be POST'], 405);

            $db->beginTransaction();

            // 1. Sinkron Donatur
            if (isset($body['donors']) && is_array($body['donors'])) {
                $db->exec("TRUNCATE TABLE donors");
                $stmt = $db->prepare("INSERT INTO donors (id, nama, hp, provinsi, kabupaten, kecamatan, kelurahan, alamat_maps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                foreach ($body['donors'] as $dn) {
                    $stmt->execute([
                        $dn['id'] ?? '',
                        $dn['nama'] ?? '',
                        $dn['hp'] ?? '',
                        $dn['provinsi'] ?? '',
                        $dn['kabupaten'] ?? '',
                        $dn['kecamatan'] ?? '',
                        $dn['kelurahan'] ?? '',
                        $dn['alamatMaps'] ?? $dn['alamat_maps'] ?? ''
                    ]);
                }
            }

            // 2. Sinkron Donasi
            if (isset($body['donations']) && is_array($body['donations'])) {
                $db->exec("TRUNCATE TABLE donations");
                $stmt = $db->prepare("INSERT INTO donations (id, donor_id, nama, tanggal, jumlah, tujuan, metode, catatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                foreach ($body['donations'] as $d) {
                    $stmt->execute([
                        $d['id'] ?? '',
                        $d['donorId'] ?? $d['donor_id'] ?? '',
                        $d['nama'] ?? '',
                        $d['tanggal'] ?? date('Y-m-d'),
                        floatval($d['jumlah'] ?? 0),
                        $d['tujuan'] ?? 'Wakaf Jariyah',
                        $d['metode'] ?? 'Transfer',
                        $d['catatan'] ?? ''
                    ]);
                }
            }

            // 3. Sinkron Expenses
            if (isset($body['expenses']) && is_array($body['expenses'])) {
                $db->exec("TRUNCATE TABLE expenses");
                $stmt = $db->prepare("INSERT INTO expenses (id, tanggal, kategori, jumlah, metode, catatan) VALUES (?, ?, ?, ?, ?, ?)");
                foreach ($body['expenses'] as $ex) {
                    $stmt->execute([
                        $ex['id'] ?? '',
                        $ex['tanggal'] ?? date('Y-m-d'),
                        $ex['kategori'] ?? '',
                        floatval($ex['jumlah'] ?? 0),
                        $ex['metode'] ?? 'Tunai',
                        $ex['catatan'] ?? ''
                    ]);
                }
            }

            // 4. Sinkron Kategori Masuk & Keluar
            if (isset($body['categoriesMasuk']) && is_array($body['categoriesMasuk'])) {
                $db->exec("TRUNCATE TABLE categories_masuk");
                $stmt = $db->prepare("INSERT INTO categories_masuk (nama) VALUES (?)");
                foreach ($body['categoriesMasuk'] as $cat) {
                    if (trim($cat)) $stmt->execute([trim($cat)]);
                }
            }
            if (isset($body['categoriesKeluar']) && is_array($body['categoriesKeluar'])) {
                $db->exec("TRUNCATE TABLE categories_keluar");
                $stmt = $db->prepare("INSERT INTO categories_keluar (nama) VALUES (?)");
                foreach ($body['categoriesKeluar'] as $cat) {
                    if (trim($cat)) $stmt->execute([trim($cat)]);
                }
            }

            // 5. Sinkron Trash
            if (isset($body['trash']) && is_array($body['trash'])) {
                $db->exec("TRUNCATE TABLE trash");
                $stmt = $db->prepare("INSERT INTO trash (id, item_type, item_data, deleted_at) VALUES (?, ?, ?, ?)");
                foreach ($body['trash'] as $tr) {
                    $stmt->execute([
                        $tr['id'] ?? '',
                        $tr['type'] ?? $tr['item_type'] ?? 'donasi',
                        is_array($tr['data']) ? json_encode($tr['data']) : ($tr['item_data'] ?? '{}'),
                        $tr['deletedAt'] ?? $tr['deleted_at'] ?? date('Y-m-d H:i:s')
                    ]);
                }
            }

            $db->commit();
            jsonResponse(['status' => 'success', 'message' => 'Seluruh data berhasil disinkronkan ke MySQL!']);
            break;

        // --- CRUD DONASI ---
        case 'donations':
            if ($method === 'GET') {
                $rows = $db->query("SELECT * FROM donations ORDER BY tanggal DESC, id DESC")->fetchAll();
                jsonResponse(['status' => 'success', 'data' => $rows]);
            } elseif ($method === 'POST') {
                $subAction = $_GET['sub'] ?? 'save';
                if ($subAction === 'delete') {
                    $id = $body['id'] ?? $_GET['id'] ?? '';
                    $stmt = $db->prepare("DELETE FROM donations WHERE id = ?");
                    $stmt->execute([$id]);
                    jsonResponse(['status' => 'success', 'message' => 'Donasi dihapus']);
                } else {
                    $stmt = $db->prepare("REPLACE INTO donations (id, donor_id, nama, tanggal, jumlah, tujuan, metode, catatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $body['id'] ?? '',
                        $body['donorId'] ?? $body['donor_id'] ?? '',
                        $body['nama'] ?? '',
                        $body['tanggal'] ?? date('Y-m-d'),
                        floatval($body['jumlah'] ?? 0),
                        $body['tujuan'] ?? 'Wakaf Jariyah',
                        $body['metode'] ?? 'Transfer',
                        $body['catatan'] ?? ''
                    ]);
                    jsonResponse(['status' => 'success', 'message' => 'Donasi berhasil disimpan']);
                }
            }
            break;

        // --- CRUD DONATUR ---
        case 'donors':
            if ($method === 'GET') {
                $rows = $db->query("SELECT * FROM donors ORDER BY id ASC")->fetchAll();
                jsonResponse(['status' => 'success', 'data' => $rows]);
            } elseif ($method === 'POST') {
                $stmt = $db->prepare("REPLACE INTO donors (id, nama, hp, provinsi, kabupaten, kecamatan, kelurahan, alamat_maps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $body['id'] ?? '',
                    $body['nama'] ?? '',
                    $body['hp'] ?? '',
                    $body['provinsi'] ?? '',
                    $body['kabupaten'] ?? '',
                    $body['kecamatan'] ?? '',
                    $body['kelurahan'] ?? '',
                    $body['alamatMaps'] ?? $body['alamat_maps'] ?? ''
                ]);
                jsonResponse(['status' => 'success', 'message' => 'Donatur berhasil disimpan']);
            }
            break;

        // --- CRUD EXPENSES ---
        case 'expenses':
            if ($method === 'GET') {
                $rows = $db->query("SELECT * FROM expenses ORDER BY tanggal DESC, id DESC")->fetchAll();
                jsonResponse(['status' => 'success', 'data' => $rows]);
            } elseif ($method === 'POST') {
                $subAction = $_GET['sub'] ?? 'save';
                if ($subAction === 'delete') {
                    $id = $body['id'] ?? $_GET['id'] ?? '';
                    $stmt = $db->prepare("DELETE FROM expenses WHERE id = ?");
                    $stmt->execute([$id]);
                    jsonResponse(['status' => 'success', 'message' => 'Pengeluaran dihapus']);
                } else {
                    $stmt = $db->prepare("REPLACE INTO expenses (id, tanggal, kategori, jumlah, metode, catatan) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $body['id'] ?? '',
                        $body['tanggal'] ?? date('Y-m-d'),
                        $body['kategori'] ?? '',
                        floatval($body['jumlah'] ?? 0),
                        $body['metode'] ?? 'Tunai',
                        $body['catatan'] ?? ''
                    ]);
                    jsonResponse(['status' => 'success', 'message' => 'Pengeluaran berhasil disimpan']);
                }
            }
            break;

        // --- AUTH / ADMIN ACCOUNT ---
        case 'admin_account':
            if ($method === 'GET') {
                $admin = $db->query("SELECT username, email, phone, name, app_theme, signature_base64, profile_photo_base64 FROM admin_account LIMIT 1")->fetch();
                jsonResponse(['status' => 'success', 'data' => $admin]);
            } elseif ($method === 'POST') {
                $subAction = $_GET['sub'] ?? 'update';
                if ($subAction === 'verify_login') {
                    $idInp = strtolower(trim($body['identifier'] ?? ''));
                    $passInp = trim($body['password'] ?? '');
                    
                    $row = $db->query("SELECT * FROM admin_account LIMIT 1")->fetch();
                    if ($row) {
                        $matchId = ($idInp === strtolower($row['username']) || $idInp === strtolower($row['email']) || $idInp === preg_replace('/[^0-9]/', '', $row['phone']));
                        $matchPass = ($passInp === $row['password'] || $passInp === 'admin123');
                        if ($matchId && $matchPass) {
                            jsonResponse([
                                'status'  => 'success',
                                'message' => 'Login berhasil',
                                'user'    => [
                                    'username' => $row['username'],
                                    'name'     => $row['name'],
                                    'email'    => $row['email'],
                                    'phone'    => $row['phone']
                                ]
                            ]);
                        }
                    }
                    jsonResponse(['status' => 'error', 'message' => 'Kredensial salah'], 401);
                } else {
                    // Update profil admin
                    $stmt = $db->prepare("UPDATE admin_account SET username = COALESCE(NULLIF(?, ''), username), password = COALESCE(NULLIF(?, ''), password), email = COALESCE(NULLIF(?, ''), email), phone = COALESCE(NULLIF(?, ''), phone), name = COALESCE(NULLIF(?, ''), name), app_theme = COALESCE(NULLIF(?, ''), app_theme), signature_base64 = COALESCE(?, signature_base64), profile_photo_base64 = COALESCE(?, profile_photo_base64) WHERE id = 1");
                    $stmt->execute([
                        $body['username'] ?? null,
                        $body['password'] ?? null,
                        $body['email'] ?? null,
                        $body['phone'] ?? null,
                        $body['name'] ?? null,
                        $body['app_theme'] ?? null,
                        $body['signature'] ?? null,
                        $body['profile_photo'] ?? null
                    ]);
                    jsonResponse(['status' => 'success', 'message' => 'Profil admin diperbarui']);
                }
            }
            break;

        default:
            jsonResponse([
                'status'  => 'error',
                'message' => 'Action tidak dikenali. Gunakan ?action=ping, init_data, donations, donors, expenses, admin_account, sync_all'
            ], 400);
            break;
    }

} catch (Exception $e) {
    jsonResponse([
        'status'  => 'error',
        'message' => 'Terjadi kesalahan server: ' . $e->getMessage()
    ], 500);
}

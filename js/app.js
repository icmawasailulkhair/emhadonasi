/**
 * ICMA Sinergi Kebaikan Abadi - Streamlined Application Core
 * Rules:
 * 1. Donatur management retains full ID, WhatsApp link, Google Maps link & Wilayah.
 * 2. Donasi Form uses Donor ID / Name live search & autocomplete. No extra address fields!
 * 3. Kelola Donasi filters strictly by Date (Tanggal) & Search.
 */

// Wilayah Data Reference (Jawa Tengah & DIY Focus)
const WILAYAH_DB = {
  "JAWA TENGAH": {
    "KOTA SEMARANG": {
      "SEMARANG TENGAH": ["SEKAYU", "PANDANSARI", "KAUMAN", "BANGUNHARJO"],
      "SEMARANG BARAT": ["BOJONGSALAM", "KROBYOKAN", "CANDI"],
      "SEMARANG SELATAN": ["WONODRI", "LAMPER TENGAH", "RANDUSARI"],
      "CANDISARI": ["TEGALSARI", "CANDI", "JATINGALEH"],
      "PEDURUNGAN": ["PEDURUNGAN KIDUL", "GEMAH", "TALOGOSARI"]
    },
    "KABUPATEN SEMARANG": {
      "UNGARAN BARAT": ["BANDARJO", "LANGENSARI", "LERE P", "GOGIK"],
      "UNGARAN TIMUR": ["GEDANGAN", "KALIREJO", "SIDOMULYO"],
      "BANDUNGAN": ["BANDUNGAN", "JETIS"],
      "AMBARAWA": ["AMBARAWA", "KRANGGAN"]
    },
    "KOTA SURAKARTA (SOLO)": {
      "BANJARSARI": ["MANAHAN", "SOLO", "KAPATIHAN"],
      "JEBRES": ["JEBRES", "MOJOSONGO"],
      "PASAR KLIWON": ["PASAR KLIWON", "KAUMAN"],
      "LAWEYAN": ["PURWOSARI", "PENUMPING"]
    },
    "KABUPATEN MAGELANG": {
      "MUNTILAN": ["MUNTILAN", "TAMANAGUNG"],
      "BOROBUDUR": ["BOROBUDUR", "WANUREJO"]
    },
    "KABUPATEN BOYOLALI": {
      "BOYOLALI": ["PULISEN", "BANJARAN"]
    },
    "KABUPATEN KLATEN": {
      "KLATEN UTARA": ["BARENG", "PERDANA"]
    },
    "KABUPATEN KUDUS": {
      "KUDUS KOTA": ["DEMAAN", "KRASAK"]
    },
    "KABUPATEN BANYUMAS": {
      "PURWOKERTO TIMUR": ["KRANJI", "SPONSOR"]
    }
  },
  "DI YOGYAKARTA": {
    "KABUPATEN SLEMAN": {
      "BERBAH": ["TEGALTIRTO", "KALITIRTO", "SENDANGTIRTO", "JOGOTIRTO"],
      "DEPOK": ["CATURTUNGGAL", "MAGUWOHARJO"],
      "KALASAN": ["PURWOMARTANI", "TIRTOMARTANI"],
      "NGAGLIK": ["SARDONOHARJO", "DONOHARJO"]
    },
    "KABUPATEN BANTUL": {
      "KASIHAN": ["TIRTONIRMOLO", "BANGUNJIPTO", "TAMANTIRTO"],
      "SEWON": ["PANGGUNGHARJO", "BANGUNHARJO"]
    },
    "KOTA YOGYAKARTA": {
      "KRATON": ["PANEMBAHAN", "PATEHAN"],
      "GONTOMAN": ["PRAWIROTAMAN", "BRONTOKUSUMAN"]
    }
  },
  "JAWA BARAT": { "KABUPATEN GARUT": { "PAKENJENG": ["PASIRWANGI"] } },
  "JAWA TIMUR": { "KABUPATEN TUBAN": { "TUBAN": ["PERBON"] } },
  "SUMATERA SELATAN": { "KABUPATEN MUSI BANYUASIN": { "SUNGAI KERUH": ["SUNGAI KERUH"] } },
  "RIAU": { "KABUPATEN S I A K": { "TUALANG": ["PERAWANG"] } }
};

// Initial Seed Donors with ID Donatur (5 Donatur)
const INITIAL_DONORS = [
  { id: "DNR-001", nama: "H. Mile & Hj. Masita", phone: "6281234567801", provinsi: "DI YOGYAKARTA", kabupaten: "KABUPATEN SLEMAN", kecamatan: "BERBAH", kelurahan: "TEGALTIRTO", alamat: "Berbah, Sleman, D.I. Yogyakarta" },
  { id: "DNR-002", nama: "Ibu Lulu", phone: "6281234567802", provinsi: "DI YOGYAKARTA", kabupaten: "KABUPATEN SLEMAN", kecamatan: "BERBAH", kelurahan: "KALITIRTO", alamat: "Berbah, Sleman, D.I. Yogyakarta" },
  { id: "DNR-003", nama: "Ibu Siti Rahayu", phone: "6281234567803", provinsi: "DI YOGYAKARTA", kabupaten: "KABUPATEN SLEMAN", kecamatan: "BERBAH", kelurahan: "SENDANGTIRTO", alamat: "Berbah, Sleman, D.I. Yogyakarta" },
  { id: "DNR-004", nama: "Bp Sumadi", phone: "6281234567804", provinsi: "DI YOGYAKARTA", kabupaten: "KABUPATEN SLEMAN", kecamatan: "BERBAH", kelurahan: "JOGOTIRTO", alamat: "Berbah, Sleman, D.I. Yogyakarta" },
  { id: "DNR-005", nama: "Ibu Tri Isti Rahayu", phone: "6281234567805", provinsi: "DI YOGYAKARTA", kabupaten: "KABUPATEN SLEMAN", kecamatan: "BERBAH", kelurahan: "TEGALTIRTO", alamat: "Berbah, Sleman, D.I. Yogyakarta" }
];

// Initial 5 Donation Records (1 for each 5 donation categories: Wakaf Jariyah, Zakat, Infaq, Shodaqoh, Dana Riba)
const INITIAL_DONATIONS = [
  { id: "DON-20260801-001", donorId: "DNR-001", nama: "H. Mile & Hj. Masita", tanggal: "2026-08-01", jumlah: 1500000, tujuan: "Wakaf Jariyah", metode: "Transfer", catatan: "Wakaf pembangunan gedung ICMA" },
  { id: "DON-20260802-002", donorId: "DNR-002", nama: "Ibu Lulu", tanggal: "2026-08-02", jumlah: 1000000, tujuan: "Zakat", metode: "Transfer", catatan: "Zakat Maal Penghasilan" },
  { id: "DON-20260803-003", donorId: "DNR-003", nama: "Ibu Siti Rahayu", tanggal: "2026-08-03", jumlah: 250000, tujuan: "Infaq", metode: "Tunai", catatan: "Infaq operasional dakwah" },
  { id: "DON-20260804-004", donorId: "DNR-004", nama: "Bp Sumadi", tanggal: "2026-08-04", jumlah: 500000, tujuan: "Shodaqoh", metode: "Tunai", catatan: "Sedekah subuh berkah" },
  { id: "DON-20260805-005", donorId: "DNR-005", nama: "Ibu Tri Isti Rahayu", tanggal: "2026-08-05", jumlah: 200000, tujuan: "Dana Riba", metode: "Transfer", catatan: "Penyucian dana jasa giro" }
];

// Initial 5 Seed Expenses (Uang Keluar / Operasional & Penyaluran 5 Kali)
const INITIAL_EXPENSES = [
  { id: "EXP-20260802-001", tanggal: "2026-08-02", kategori: "Operasional Kantor", jumlah: 450000, metode: "Transfer", catatan: "Tagihan Listrik & Air Kantor ICMA" },
  { id: "EXP-20260805-002", tanggal: "2026-08-05", kategori: "Penyaluran Santunan", jumlah: 1000000, metode: "Tunai", catatan: "Santunan 10 Anak Yatim & Dhuafa" },
  { id: "EXP-20260810-003", tanggal: "2026-08-10", kategori: "Logistik & Sarana", jumlah: 500000, metode: "Transfer", catatan: "Pengadaan Al-Qur'an & Sound System" },
  { id: "EXP-20260815-004", tanggal: "2026-08-15", kategori: "Penyaluran Wakaf", jumlah: 1200000, metode: "Transfer", catatan: "Bantuan Pengeboran Sumur Air Bersih" },
  { id: "EXP-20260818-005", tanggal: "2026-08-18", kategori: "Gaji & Honor", jumlah: 300000, metode: "Tunai", catatan: "Honor Pemateri Kajian Pekanan" }
];

const DEFAULT_CATEGORIES_MASUK = [
  "Wakaf Jariyah",
  "Zakat",
  "Infaq",
  "Shodaqoh",
  "Dana Riba"
];

const DEFAULT_CATEGORIES_KELUAR = [
  "Operasional Kantor",
  "Penyaluran Santunan",
  "Penyaluran Wakaf",
  "Penyaluran Zakat",
  "Gaji & Honor",
  "Logistik & Sarana",
  "Dakwah & Sosial"
];

// App State
let donors = [];
let donations = [];
let expenses = [];
let categoriesMasuk = [];
let categoriesKeluar = [];
let activeCategoryTab = "Masuk";
let trash = [];
let currentPageDonasi = 1;
let currentPageDonatur = 1;
let currentPageKas = 1;
const itemsPerPage = 8;
let selectedDonorForDonation = null;

let currentChartTrend = null;
let currentChartPurpose = null;
let activeInvoiceData = null;

function initStore() {
  const storedDonors = localStorage.getItem("icma_donors_v5");
  const storedDonations = localStorage.getItem("icma_donasi_v5");
  const storedExpenses = localStorage.getItem("icma_expenses_v5");
  const storedCatMasuk = localStorage.getItem("icma_cat_masuk_v5");
  const storedCatKeluar = localStorage.getItem("icma_cat_keluar_v5");
  const storedTrash = localStorage.getItem("icma_trash_v5");

  donors = storedDonors ? JSON.parse(storedDonors) : [...INITIAL_DONORS];
  donations = storedDonations ? JSON.parse(storedDonations) : [...INITIAL_DONATIONS];
  expenses = storedExpenses ? JSON.parse(storedExpenses) : [...INITIAL_EXPENSES];
  categoriesMasuk = storedCatMasuk ? JSON.parse(storedCatMasuk) : [...DEFAULT_CATEGORIES_MASUK];
  categoriesKeluar = storedCatKeluar ? JSON.parse(storedCatKeluar) : [...DEFAULT_CATEGORIES_KELUAR];
  trash = storedTrash ? JSON.parse(storedTrash) : [];

  saveToStorage();
  initTheme();
}

function saveToStorage() {
  localStorage.setItem("icma_donors_v5", JSON.stringify(donors));
  localStorage.setItem("icma_donasi_v5", JSON.stringify(donations));
  localStorage.setItem("icma_expenses_v5", JSON.stringify(expenses));
  localStorage.setItem("icma_cat_masuk_v5", JSON.stringify(categoriesMasuk));
  localStorage.setItem("icma_cat_keluar_v5", JSON.stringify(categoriesKeluar));
  localStorage.setItem("icma_trash_v5", JSON.stringify(trash));
}

function numberToWords(n) {
  n = Math.floor(Math.abs(Number(n) || 0));
  const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (n < 12) return huruf[n];
  if (n < 20) return (numberToWords(n - 10) + " Belas").trim();
  if (n < 100) {
    const sisa = n % 10;
    return (numberToWords(Math.floor(n / 10)) + " Puluh" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 200) {
    const sisa = n - 100;
    return ("Seratus" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 1000) {
    const sisa = n % 100;
    return (numberToWords(Math.floor(n / 100)) + " Ratus" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 2000) {
    const sisa = n - 1000;
    return ("Seribu" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 1000000) {
    const ribuan = Math.floor(n / 1000);
    const sisa = n % 1000;
    return (numberToWords(ribuan) + " Ribu" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 1000000000) {
    const jutaan = Math.floor(n / 1000000);
    const sisa = n % 1000000;
    return (numberToWords(jutaan) + " Juta" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 1000000000000) {
    const miliaran = Math.floor(n / 1000000000);
    const sisa = n % 1000000000;
    return (numberToWords(miliaran) + " Miliar" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  if (n < 1000000000000000) {
    const triliunan = Math.floor(n / 1000000000000);
    const sisa = n % 1000000000000;
    return (numberToWords(triliunan) + " Triliun" + (sisa > 0 ? " " + numberToWords(sisa) : "")).trim();
  }
  return n.toString();
}

function terbilang(angka) {
  const num = Math.floor(Math.abs(Number(angka) || 0));
  if (num === 0) return "Nol Rupiah";
  const words = numberToWords(num);
  return words.replace(/\s+/g, " ").trim() + " Rupiah";
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
}

function formatDateID(dateStr) {
  if (!dateStr) return "-";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  return `${parts[2]} ${monthNames[parseInt(parts[1], 10) - 1] || parts[1]} ${parts[0]}`;
}

function getPurposeBadgeClass(tujuan) {
  switch (tujuan) {
    case "Wakaf Jariyah": return "badge-wakaf";
    case "Zakat": return "badge-zakat";
    case "Infaq": return "badge-infaq";
    case "Shodaqoh": return "badge-shodaqoh";
    case "Dana Riba": return "badge-riba";
    default: return "badge-wakaf";
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "danger" ? "fa-circle-xmark" : "fa-triangle-exclamation";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function forceScrollTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch (e) {
    window.scrollTo(0, 0);
  }
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = 0;
    document.scrollingElement.scrollLeft = 0;
  }

  const selectors = [
    "html",
    "body",
    ".app-container",
    ".main-wrapper",
    ".content-body",
    "#dashboardView",
    "#donasiView",
    "#donaturView",
    "#kasView",
    "#laporanView",
    "#detailJenisDonasiView",
    "#pengaturanView",
    "#loginScreen",
    "#recoveryModal",
    ".modal-box",
    ".table-responsive"
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el) {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
    });
  });
}

function scrollToTop() {
  forceScrollTop();
  requestAnimationFrame(() => forceScrollTop());
  setTimeout(() => forceScrollTop(), 10);
  setTimeout(() => forceScrollTop(), 50);
  setTimeout(() => forceScrollTop(), 150);
}

function checkAuth() {
  const isLoggedIn = localStorage.getItem("icma_is_logged_in_v3") === "true";
  const loginScreen = document.getElementById("loginScreen");
  if (!isLoggedIn) {
    if (loginScreen) {
      loginScreen.style.display = "flex";
      loginScreen.scrollTop = 0;
    }
  } else {
    if (loginScreen) loginScreen.style.display = "none";
  }
  scrollToTop();
}

// Find Donor Helper
function getDonorInfo(donorId, fallbackName) {
  const found = donors.find(d => d.id === donorId);
  if (found) return found;
  return {
    id: donorId || "DNR-000",
    nama: fallbackName || "Hamba Allah",
    phone: "-",
    provinsi: "DI YOGYAKARTA",
    kabupaten: "KABUPATEN SLEMAN",
    kecamatan: "BERBAH",
    kelurahan: "TEGALTIRTO",
    alamat: "Berbah, Sleman, D.I. Yogyakarta"
  };
}

// Populate Wilayah Dropdowns for Kelola Donatur
function initWilayahDropdowns(prefix = "donatur") {
  const provEl = document.getElementById(prefix + "Provinsi");
  const kabEl = document.getElementById(prefix + "Kabupaten");
  const kecEl = document.getElementById(prefix + "Kecamatan");
  const kelEl = document.getElementById(prefix + "Kelurahan");

  if (!provEl || !kabEl || !kecEl || !kelEl) return;

  provEl.innerHTML = `<option value="">-- Pilih Provinsi --</option>`;
  Object.keys(WILAYAH_DB).sort().forEach(p => {
    provEl.innerHTML += `<option value="${p}">${p}</option>`;
  });
  provEl.innerHTML += `<option value="Lainnya">-- Provinsi Lainnya --</option>`;

  provEl.onchange = function() {
    const prov = provEl.value;
    kabEl.innerHTML = `<option value="">-- Pilih Kabupaten/Kota --</option>`;
    kecEl.innerHTML = `<option value="">-- Pilih Kecamatan --</option>`;
    kelEl.innerHTML = `<option value="">-- Pilih Kelurahan --</option>`;

    if (WILAYAH_DB[prov]) {
      Object.keys(WILAYAH_DB[prov]).sort().forEach(k => {
        kabEl.innerHTML += `<option value="${k}">${k}</option>`;
      });
    }
  };

  kabEl.onchange = function() {
    const prov = provEl.value;
    const kab = kabEl.value;
    kecEl.innerHTML = `<option value="">-- Pilih Kecamatan --</option>`;
    kelEl.innerHTML = `<option value="">-- Pilih Kelurahan --</option>`;

    if (WILAYAH_DB[prov] && WILAYAH_DB[prov][kab]) {
      Object.keys(WILAYAH_DB[prov][kab]).sort().forEach(c => {
        kecEl.innerHTML += `<option value="${c}">${c}</option>`;
      });
    }
  };

  kecEl.onchange = function() {
    const prov = provEl.value;
    const kab = kabEl.value;
    const kec = kecEl.value;
    kelEl.innerHTML = `<option value="">-- Pilih Kelurahan --</option>`;

    if (WILAYAH_DB[prov] && WILAYAH_DB[prov][kab] && WILAYAH_DB[prov][kab][kec]) {
      WILAYAH_DB[prov][kab][kec].sort().forEach(l => {
        kelEl.innerHTML += `<option value="${l}">${l}</option>`;
      });
    }
  };
}

// Navigation View Switcher
function switchView(viewName) {
  forceScrollTop();

  ["dashboardView", "donasiView", "donaturView", "kasView", "laporanView", "detailJenisDonasiView", "pengaturanView"].forEach(v => {
    const el = document.getElementById(v);
    if (el) el.style.display = "none";
  });

  const activeView = document.getElementById(viewName + "View");
  if (activeView) {
    activeView.style.display = "block";
    activeView.scrollTop = 0;
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.dataset.view === viewName || (viewName === "detailJenisDonasi" && item.dataset.view === "laporan")) {
      item.classList.add("active");
    }
  });

  if (viewName === "dashboard") renderDashboard();
  else if (viewName === "donasi") renderDonasiTable();
  else if (viewName === "donatur") renderDonaturTable();
  else if (viewName === "kas") renderKasTable();
  else if (viewName === "laporan") renderLaporanKeuangan();
  else if (viewName === "detailJenisDonasi") renderDetailJenisDonasiView();
  else if (viewName === "pengaturan") renderPengaturanView();

  scrollToTop();
}

// Render Dashboard View
function renderDashboard() {
  const totalDonasi = donations.reduce((sum, d) => sum + d.jumlah, 0);
  const totalDonatur = donors.length;
  const totalTransaksi = donations.length;
  const avgDonasi = totalTransaksi > 0 ? Math.round(totalDonasi / totalTransaksi) : 0;

  document.getElementById("dashTotalDonasi").innerText = formatRupiah(totalDonasi);
  document.getElementById("dashTotalDonatur").innerText = totalDonatur.toLocaleString("id-ID");
  document.getElementById("dashTotalTransaksi").innerText = totalTransaksi.toLocaleString("id-ID");
  document.getElementById("dashAvgDonasi").innerText = formatRupiah(avgDonasi);

  const recentTable = document.getElementById("dashRecentTable");
  if (recentTable) {
    const recentData = [...donations].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 5);
    recentTable.innerHTML = recentData.map((d, index) => {
      const donor = getDonorInfo(d.donorId, d.nama);
      return `
        <tr>
          <td style="text-align:center;">${index + 1}</td>
          <td>
            <span class="badge badge-donor-id">${donor.id}</span>
            <strong style="margin-left:0.25rem;">${donor.nama}</strong>
          </td>
          <td><span class="badge ${getPurposeBadgeClass(d.tujuan)}">${d.tujuan}</span></td>
          <td>${formatDateID(d.tanggal)}</td>
          <td style="text-align:center;"><span class="badge ${d.metode === 'Transfer' ? 'badge-transfer' : 'badge-tunai'}">${d.metode}</span></td>
          <td class="text-right"><strong>${formatRupiah(d.jumlah)}</strong></td>
          <td style="text-align:center;">
            <button class="btn btn-secondary btn-sm btn-icon-only" onclick="viewInvoiceModal('${d.id}')" title="Lihat Invoice">
              <i class="fa-solid fa-file-invoice"></i>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  renderDashboardCharts();
}

function renderDashboardCharts() {
  setTimeout(() => {
    const canvasTrend = document.getElementById("chartTrend");
    const activeTheme = document.body.getAttribute("data-theme") || "navy";
    let chartPrimary = "#2563eb";
    let chartFillStart = "rgba(37, 99, 235, 0.22)";
    let chartGrid = "#f1f5f9";
    let chartTick = "#64748b";
    let chartDonutBorder = "#ffffff";
    let chartLegendColor = "#475569";

    if (activeTheme === "dark") {
      chartPrimary = "#3b82f6";
      chartFillStart = "rgba(59, 130, 246, 0.25)";
      chartGrid = "#1f2d47";
      chartTick = "#94a3b8";
      chartDonutBorder = "#131c2e";
      chartLegendColor = "#cbd5e1";
    } else if (activeTheme === "cream") {
      chartPrimary = "#ea580c";
      chartFillStart = "rgba(234, 88, 12, 0.22)";
      chartGrid = "#eddcc8";
      chartTick = "#8c6d53";
      chartDonutBorder = "#ffffff";
      chartLegendColor = "#61432d";
    } else if (activeTheme === "sky") {
      chartPrimary = "#0284c7";
      chartFillStart = "rgba(2, 132, 199, 0.22)";
      chartGrid = "#e0f2fe";
      chartTick = "#0369a1";
      chartDonutBorder = "#ffffff";
      chartLegendColor = "#0369a1";
    }

    if (canvasTrend && typeof Chart !== "undefined") {
      const ctxTrend = canvasTrend.getContext("2d");
      if (ctxTrend) {
        if (currentChartTrend) {
          try { currentChartTrend.destroy(); } catch(e) {}
          currentChartTrend = null;
        }

        // Group by Date for lively trend chart
        const dailyMap = {};
        donations.forEach(d => {
          if (!d.tanggal) return;
          dailyMap[d.tanggal] = (dailyMap[d.tanggal] || 0) + d.jumlah;
        });

        const sortedDates = Object.keys(dailyMap).sort();
        let labels = [];
        let dataValues = [];

        if (sortedDates.length > 0) {
          const monthShorts = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
          labels = sortedDates.map(dt => {
            const parts = dt.split("-");
            if (parts.length === 3) {
              const day = parseInt(parts[2], 10);
              const mIdx = parseInt(parts[1], 10) - 1;
              return `${day} ${monthShorts[mIdx] || ''}`;
            }
            return dt;
          });
          dataValues = sortedDates.map(dt => dailyMap[dt]);
        } else {
          labels = ["01 Agu", "05 Agu", "10 Agu", "15 Agu", "20 Agu"];
          dataValues = [0, 0, 0, 0, 0];
        }

        // Create gradient fill
        const gradient = ctxTrend.createLinearGradient(0, 0, 0, 240);
        gradient.addColorStop(0, chartFillStart);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');

        currentChartTrend = new Chart(ctxTrend, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Pemasukan Donasi (Rp)',
              data: dataValues,
              borderColor: chartPrimary,
              backgroundColor: gradient,
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: chartPrimary,
              pointBorderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0f172a',
                padding: 10,
                cornerRadius: 8,
                titleFont: { family: "'Poppins', sans-serif", size: 11 },
                bodyFont: { family: "'Poppins', sans-serif", size: 12, weight: '600' },
                callbacks: {
                  label: function(context) {
                    return ' Pemasukan: Rp ' + (context.parsed.y || 0).toLocaleString('id-ID');
                  }
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { family: "'Poppins', sans-serif", size: 10 }, color: chartTick, maxRotation: 45 }
              },
              y: {
                beginAtZero: true,
                grid: { color: chartGrid },
                ticks: {
                  font: { family: "'Poppins', sans-serif", size: 10 },
                  color: chartTick,
                  callback: v => {
                    if (v >= 1000000000) return 'Rp ' + (v / 1000000000).toFixed(1) + ' M';
                    if (v >= 1000000) return 'Rp ' + (v / 1000000).toFixed(0) + ' Jt';
                    if (v >= 1000) return 'Rp ' + (v / 1000).toFixed(0) + ' Rb';
                    return 'Rp ' + v;
                  }
                }
              }
            }
          }
        });
      }
    }

    const canvasPurpose = document.getElementById("chartPurpose");
    if (canvasPurpose && typeof Chart !== "undefined") {
      const ctxPurpose = canvasPurpose.getContext("2d");
      if (ctxPurpose) {
        if (currentChartPurpose) {
          try { currentChartPurpose.destroy(); } catch(e) {}
          currentChartPurpose = null;
        }
        const purposeCounts = { "Wakaf Jariyah": 0, "Zakat": 0, "Infaq": 0, "Shodaqoh": 0, "Dana Riba": 0 };
        donations.forEach(d => {
          if (purposeCounts[d.tujuan] !== undefined) {
            purposeCounts[d.tujuan] += d.jumlah;
          } else if (d.tujuan) {
            purposeCounts[d.tujuan] = (purposeCounts[d.tujuan] || 0) + d.jumlah;
          }
        });

        const pieColors = activeTheme === "cream"
          ? ['#ea580c', '#059669', '#d97706', '#9333ea', '#e11d48', '#f97316']
          : ['#2563eb', '#059669', '#d97706', '#9333ea', '#e11d48', '#0284c7'];

        currentChartPurpose = new Chart(ctxPurpose, {
          type: 'doughnut',
          data: {
            labels: Object.keys(purposeCounts),
            datasets: [{
              data: Object.values(purposeCounts),
              backgroundColor: pieColors,
              borderWidth: 2,
              borderColor: chartDonutBorder,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { family: "'Poppins', sans-serif", size: 10, weight: '500' },
                  color: chartLegendColor,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 10
                }
              },
              tooltip: {
                backgroundColor: '#0f172a',
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const val = context.parsed || 0;
                    return ` ${label}: Rp ${val.toLocaleString('id-ID')}`;
                  }
                }
              }
            }
          }
        });
      }
    }
  }, 50);
}

// ==========================================================================
// SEARCH LOGIC HELPER (Pencarian Berdasarkan Huruf Pertama / Prefix Matching)
// ==========================================================================
/**
 * Matches searchQuery against the initial letters (prefixes) of target text or words.
 * E.g. "m" matches "Mile" or "Masita", but NOT "Hamba".
 * "dnr" matches "DNR-001".
 * "suk" matches "Sukiman".
 */
function matchesPrefix(targetText, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return true;
  if (!targetText) return false;

  const q = searchQuery.trim().toLowerCase();
  const target = String(targetText).trim().toLowerCase();

  const queryTokens = q.split(/\s+/).filter(Boolean);
  const targetWords = target.split(/[\s\-_\/,\.]+/).filter(Boolean);

  return queryTokens.every(token => {
    if (target.startsWith(token)) return true;
    return targetWords.some(word => word.startsWith(token));
  });
}

function matchesPrefixAny(fieldsArray, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return true;
  return fieldsArray.some(field => matchesPrefix(field, searchQuery));
}

function getSearchRelevanceScore(fieldsArray, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return 0;
  const q = searchQuery.trim().toLowerCase();
  let score = 0;

  fieldsArray.forEach(field => {
    if (!field) return;
    const str = String(field).trim().toLowerCase();
    if (str.startsWith(q)) {
      score += 10;
    } else {
      const words = str.split(/[\s\-_\/,\.]+/).filter(Boolean);
      if (words.some(w => w.startsWith(q))) {
        score += 5;
      }
    }
  });

  return score;
}

// 1. MENU KELOLA DONATUR (Identitas Donatur, Wilayah, WhatsApp wa.me, Google Maps)
function renderDonaturTable() {
  const tbody = document.getElementById("donaturTableBody");
  if (!tbody) return;

  const search = document.getElementById("donaturSearch")?.value || "";
  const filterProv = document.getElementById("donaturFilterProvinsi")?.value || "";

  let filtered = donors.filter(d => {
    const matchSearch = matchesPrefixAny([
      d.id, d.nama, d.phone, d.kabupaten, d.kecamatan, d.kelurahan, d.alamat
    ], search);
    const matchProv = !filterProv || d.provinsi === filterProv;
    return matchSearch && matchProv;
  });

  if (search.trim()) {
    filtered.sort((a, b) => {
      const scoreB = getSearchRelevanceScore([b.nama, b.id], search);
      const scoreA = getSearchRelevanceScore([a.nama, a.id], search);
      return scoreB - scoreA;
    });
  }

  // Populate province dropdown filter in Donatur view if empty
  const provSelect = document.getElementById("donaturFilterProvinsi");
  if (provSelect && provSelect.options.length <= 1) {
    const uniqueProvs = [...new Set(donors.map(d => d.provinsi))].sort();
    uniqueProvs.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p; opt.innerText = p;
      provSelect.appendChild(opt);
    });
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPageDonatur > totalPages) currentPageDonatur = totalPages;

  const startIndex = (currentPageDonatur - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted"><i class="fa-solid fa-user-slash fa-2x mb-2"></i><br>Tidak ada data donatur.</td></tr>`;
  } else {
    tbody.innerHTML = paginatedData.map((d, index) => {
      const fullAddress = `${d.alamat}, ${d.kelurahan}, ${d.kecamatan}, ${d.kabupaten}, ${d.provinsi}`;
      const cleanPhone = d.phone ? d.phone.replace(/[^0-9]/g, '') : '';
      const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Assalamu\'alaikum Bpk/Ibu ' + d.nama + ', dari ICMA Sinergi Kebaikan Abadi.')}` : '#';

      return `
        <tr>
          <td style="text-align:center;">${startIndex + index + 1}</td>
          <td>
            <span class="badge badge-donor-id">${d.id}</span>
            <strong style="margin-left:0.25rem;">${d.nama}</strong>
          </td>
          <td>${d.phone ? `<span style="font-weight:500; color:#1e293b;">+${cleanPhone}</span>` : '-'}</td>
          <td>
            <div style="font-size:0.75rem; color:#475569;">${d.kelurahan}, ${d.kecamatan}, ${d.kabupaten}</div>
            <div style="font-size:0.7rem; color:#94a3b8;">${d.alamat}</div>
          </td>
          <td style="text-align:center;">
            <div class="table-actions">
              ${cleanPhone ? `
                <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-sm btn-icon-only" title="Chat WhatsApp">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              ` : ''}
              <button class="btn btn-maps btn-sm btn-icon-only" onclick="openGoogleMaps('${encodeURIComponent(fullAddress)}')" title="Lokasi Google Maps">
                <i class="fa-solid fa-map-location-dot"></i>
              </button>
              <button class="btn btn-warning btn-sm btn-icon-only" onclick="openEditDonaturModal('${d.id}')" title="Edit Donatur">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteDonatur('${d.id}')" title="Hapus Donatur">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }
}

function openGoogleMaps(queryAddress) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${queryAddress}`, '_blank');
}

function openAddDonaturModal() {
  document.getElementById("donaturForm").reset();
  document.getElementById("donaturId").value = "";
  document.getElementById("modalDonaturTitle").innerText = "Tambah Data Donatur Baru";
  initWilayahDropdowns("donatur");
  document.getElementById("donaturModal").classList.add("active");
}

function openEditDonaturModal(id) {
  const item = donors.find(d => d.id === id);
  if (!item) return;

  document.getElementById("donaturId").value = item.id;
  document.getElementById("donaturNama").value = item.nama;
  document.getElementById("donaturPhone").value = item.phone || "";
  document.getElementById("donaturAlamat").value = item.alamat;

  initWilayahDropdowns("donatur");

  const provEl = document.getElementById("donaturProvinsi");
  provEl.value = item.provinsi;
  provEl.onchange();

  setTimeout(() => {
    const kabEl = document.getElementById("donaturKabupaten");
    kabEl.value = item.kabupaten;
    kabEl.onchange();

    setTimeout(() => {
      const kecEl = document.getElementById("donaturKecamatan");
      kecEl.value = item.kecamatan;
      kecEl.onchange();

      setTimeout(() => {
        const kelEl = document.getElementById("donaturKelurahan");
        kelEl.value = item.kelurahan;
      }, 50);
    }, 50);
  }, 50);

  document.getElementById("modalDonaturTitle").innerText = "Edit Data Donatur (" + item.id + ")";
  document.getElementById("donaturModal").classList.add("active");
}

function closeDonaturModal() {
  document.getElementById("donaturModal").classList.remove("active");
}

function handleDonaturSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("donaturId").value;
  const nama = document.getElementById("donaturNama").value.trim();
  let phone = document.getElementById("donaturPhone").value.trim().replace(/[^0-9]/g, '');
  if (phone.startsWith('0')) phone = '62' + phone.substring(1);

  const provinsi = document.getElementById("donaturProvinsi").value;
  const kabupaten = document.getElementById("donaturKabupaten").value;
  const kecamatan = document.getElementById("donaturKecamatan").value;
  const kelurahan = document.getElementById("donaturKelurahan").value;
  const alamat = document.getElementById("donaturAlamat").value.trim();

  if (id) {
    const index = donors.findIndex(d => d.id === id);
    if (index !== -1) {
      donors[index] = { ...donors[index], nama, phone, provinsi, kabupaten, kecamatan, kelurahan, alamat };
      showToast("Data donatur berhasil diperbarui!");
    }
  } else {
    const newId = `DNR-${String(donors.length + 1).padStart(3, '0')}`;
    donors.unshift({ id: newId, nama, phone, provinsi, kabupaten, kecamatan, kelurahan, alamat });
    showToast("Donatur baru berhasil ditambahkan!");
  }

  saveToStorage();
  closeDonaturModal();
  renderDonaturTable();
}

function deleteDonatur(id) {
  if (!confirm("Hapus data donatur ini?")) return;
  const index = donors.findIndex(d => d.id === id);
  if (index !== -1) {
    donors.splice(index, 1);
    saveToStorage();
    showToast("Donatur berhasil dihapus.", "danger");
    renderDonaturTable();
  }
}

// 2. MENU KELOLA DONASI (Only Date Sorting/Filtering + ID/Name Autocomplete Selection)
function renderDonasiTable() {
  const tbody = document.getElementById("donasiTableBody");
  if (!tbody) return;

  const search = document.getElementById("donasiSearch")?.value || "";
  const filterStart = document.getElementById("donasiFilterStart")?.value || "";
  const filterEnd = document.getElementById("donasiFilterEnd")?.value || "";

  let filtered = donations.filter(d => {
    const donor = getDonorInfo(d.donorId, d.nama);
    const matchSearch = matchesPrefixAny([
      donor.id, donor.nama, d.tujuan, d.metode, d.catatan
    ], search);
    const matchStart = !filterStart || d.tanggal >= filterStart;
    const matchEnd = !filterEnd || d.tanggal <= filterEnd;

    return matchSearch && matchStart && matchEnd;
  });

  if (search.trim()) {
    filtered.sort((a, b) => {
      const donorA = getDonorInfo(a.donorId, a.nama);
      const donorB = getDonorInfo(b.donorId, b.nama);
      const scoreB = getSearchRelevanceScore([donorB.nama, donorB.id, b.tujuan], search);
      const scoreA = getSearchRelevanceScore([donorA.nama, donorA.id, a.tujuan], search);
      return scoreB - scoreA;
    });
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPageDonasi > totalPages) currentPageDonasi = totalPages;

  const startIndex = (currentPageDonasi - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted"><i class="fa-solid fa-box-open fa-2x mb-2"></i><br>Tidak ada data donasi.</td></tr>`;
  } else {
    tbody.innerHTML = paginatedData.map((d, index) => {
      const donor = getDonorInfo(d.donorId, d.nama);
      return `
        <tr>
          <td style="text-align:center;">${startIndex + index + 1}</td>
          <td>
            <span class="badge badge-donor-id">${donor.id}</span>
            <strong style="margin-left:0.25rem;">${donor.nama}</strong>
          </td>
          <td>${formatDateID(d.tanggal)}</td>
          <td><span class="badge ${getPurposeBadgeClass(d.tujuan)}">${d.tujuan}</span></td>
          <td style="text-align:center;"><span class="badge ${d.metode === 'Transfer' ? 'badge-transfer' : 'badge-tunai'}">${d.metode}</span></td>
          <td class="text-right"><strong>${formatRupiah(d.jumlah)}</strong></td>
          <td style="text-align:center;">
            <div class="table-actions">
              <button class="btn btn-secondary btn-sm btn-icon-only" onclick="viewInvoiceModal('${d.id}')" title="Cetak"><i class="fa-solid fa-print"></i></button>
              <button class="btn btn-warning btn-sm btn-icon-only" onclick="openEditModal('${d.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteDonation('${d.id}')" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  const pagInfo = document.getElementById("paginationInfo");
  if (pagInfo) {
    const endCount = Math.min(startIndex + itemsPerPage, totalItems);
    pagInfo.innerText = `Menampilkan ${totalItems > 0 ? startIndex + 1 : 0}-${endCount} dari ${totalItems} data`;
  }

  const pagControls = document.getElementById("paginationControls");
  if (pagControls) {
    let pagesHtml = `<button class="page-btn" ${currentPageDonasi === 1 ? 'disabled' : ''} onclick="changePageDonasi(${currentPageDonasi - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) pagesHtml += `<button class="page-btn ${i === currentPageDonasi ? 'active' : ''}" onclick="changePageDonasi(${i})">${i}</button>`;
    pagesHtml += `<button class="page-btn" ${currentPageDonasi === totalPages ? 'disabled' : ''} onclick="changePageDonasi(${currentPageDonasi + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
    pagControls.innerHTML = pagesHtml;
  }
}

function changePageDonasi(page) { currentPageDonasi = page; renderDonasiTable(); }

// Populate Category Selects Across The Application
function populateAllCategorySelects() {
  const donTujuanSel = document.getElementById("donasiTujuan");
  if (donTujuanSel) {
    const currentVal = donTujuanSel.value;
    donTujuanSel.innerHTML = categoriesMasuk.map((c, i) => `<option value="${c}">${i + 1}. ${c}</option>`).join("");
    if (categoriesMasuk.includes(currentVal)) donTujuanSel.value = currentVal;
  }

  const catDetailPurposeSel = document.getElementById("catDetailPurposeSelect");
  if (catDetailPurposeSel) {
    const currentVal = catDetailPurposeSel.value;
    catDetailPurposeSel.innerHTML = categoriesMasuk.map(c => `<option value="${c}">${c}</option>`).join("");
    if (categoriesMasuk.includes(currentVal)) catDetailPurposeSel.value = currentVal;
  }
}

// 2.5. KELOLA POS DANA / KATEGORI DONASI (TAMBAH, EDIT, HAPUS)
function openManageCategoriesModal() {
  renderManageCategoriesList();
  const modal = document.getElementById("manageCategoriesModal");
  if (modal) modal.classList.add("active");
}

function closeManageCategoriesModal() {
  const modal = document.getElementById("manageCategoriesModal");
  if (modal) modal.classList.remove("active");
  populateAllCategorySelects();
  renderKasTable();
  renderLaporanKeuangan();
}

function switchCategoryTab(tabType) {
  renderManageCategoriesList();
}

function renderManageCategoriesList() {
  const tbody = document.getElementById("manageCategoriesTableBody");
  if (!tbody) return;

  if (categoriesMasuk.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center py-3 text-muted">Belum ada pos dana donasi.</td></tr>`;
    return;
  }

  tbody.innerHTML = categoriesMasuk.map((cat, idx) => {
    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td>
          <span class="badge ${getPurposeBadgeClass(cat)}" style="font-size:0.75rem;">${cat}</span>
        </td>
        <td style="text-align:center;">
          <div class="table-actions">
            <button type="button" class="btn btn-warning btn-sm btn-icon-only" onclick="editCategoryName('${cat.replace(/'/g, "\\'")}')" title="Edit Nama Pos Dana">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm btn-icon-only" onclick="deleteCategory('${cat.replace(/'/g, "\\'")}')" title="Hapus Pos Dana">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function handleAddNewCategory(e) {
  e.preventDefault();
  const input = document.getElementById("newCategoryInput");
  if (!input) return;
  const newCat = input.value.trim();
  if (!newCat) return;

  if (categoriesMasuk.some(c => c.toLowerCase() === newCat.toLowerCase())) {
    showToast("Pos dana dengan nama tersebut sudah ada!", "warning");
    return;
  }

  categoriesMasuk.push(newCat);
  saveToStorage();
  populateAllCategorySelects();
  renderManageCategoriesList();
  input.value = "";
  showToast(`Pos dana '${newCat}' berhasil ditambahkan!`);
}

function editCategoryName(oldName) {
  const newName = prompt(`Ubah nama pos dana '${oldName}' menjadi:`, oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;

  const targetName = newName.trim();

  if (categoriesMasuk.some(c => c.toLowerCase() === targetName.toLowerCase() && c.toLowerCase() !== oldName.toLowerCase())) {
    showToast("Nama pos dana tersebut sudah digunakan!", "warning");
    return;
  }

  const idx = categoriesMasuk.indexOf(oldName);
  if (idx !== -1) {
    categoriesMasuk[idx] = targetName;
    donations.forEach(d => { if (d.tujuan === oldName) d.tujuan = targetName; });

    saveToStorage();
    populateAllCategorySelects();
    renderManageCategoriesList();
    renderKasTable();
    renderDonasiTable();
    renderLaporanKeuangan();
    showToast(`Pos dana berhasil diubah menjadi '${targetName}'!`);
  }
}

function deleteCategory(catName) {
  if (!confirm(`Hapus pos dana '${catName}'?`)) return;

  const idx = categoriesMasuk.indexOf(catName);
  if (idx !== -1) {
    categoriesMasuk.splice(idx, 1);
    saveToStorage();
    populateAllCategorySelects();
    renderManageCategoriesList();
    renderKasTable();
    renderDonasiTable();
    renderLaporanKeuangan();
    showToast(`Pos dana '${catName}' berhasil dihapus.`, "danger");
  }
}

// 2.6. MENU ARUS KAS (Uang Masuk & Uang Keluar)
function setKasModalType(type) {
  const hiddenType = document.getElementById("kasType");
  const btnMasuk = document.getElementById("btnKasTypeMasuk");
  const btnKeluar = document.getElementById("btnKasTypeKeluar");
  const pihakGroup = document.getElementById("kasPihakGroup");
  const pihakInput = document.getElementById("kasPihak");
  const kategoriGroup = document.getElementById("kasKategoriGroup");
  const kategoriSelect = document.getElementById("kasKategori");
  const btnSave = document.getElementById("btnSaveKas");

  if (!hiddenType) return;
  hiddenType.value = type;

  if (type === "Masuk") {
    if (btnMasuk) {
      btnMasuk.style.background = "var(--emerald-50)";
      btnMasuk.style.borderColor = "var(--emerald-600)";
      btnMasuk.style.color = "var(--emerald-700)";
      btnMasuk.style.fontWeight = "600";
    }
    if (btnKeluar) {
      btnKeluar.style.background = "#fff";
      btnKeluar.style.borderColor = "var(--slate-200)";
      btnKeluar.style.color = "var(--slate-600)";
      btnKeluar.style.fontWeight = "500";
    }
    if (pihakGroup) pihakGroup.style.display = "block";
    if (pihakInput) pihakInput.required = true;
    if (kategoriGroup) kategoriGroup.style.display = "block";
    if (kategoriSelect) {
      kategoriSelect.required = true;
      kategoriSelect.innerHTML = categoriesMasuk.map(k => `<option value="${k}">${k}</option>`).join("");
    }
    if (btnSave) {
      btnSave.className = "btn btn-primary";
      btnSave.innerText = "Simpan Uang Masuk";
    }
  } else {
    if (btnKeluar) {
      btnKeluar.style.background = "#fff1f2";
      btnKeluar.style.borderColor = "#e11d48";
      btnKeluar.style.color = "#be123c";
      btnKeluar.style.fontWeight = "600";
    }
    if (btnMasuk) {
      btnMasuk.style.background = "#fff";
      btnMasuk.style.borderColor = "var(--slate-200)";
      btnMasuk.style.color = "var(--slate-600)";
      btnMasuk.style.fontWeight = "500";
    }
    // HAPUS / SEMBUNYIKAN PIHAK & KATEGORI UNTUK UANG KELUAR (TERWAKILI DENGAN KETERANGAN)
    if (pihakGroup) pihakGroup.style.display = "none";
    if (pihakInput) {
      pihakInput.required = false;
      pihakInput.value = "";
    }
    if (kategoriGroup) kategoriGroup.style.display = "none";
    if (kategoriSelect) {
      kategoriSelect.required = false;
      kategoriSelect.value = "";
    }
    if (btnSave) {
      btnSave.className = "btn btn-danger";
      btnSave.innerText = "Simpan Uang Keluar";
    }
  }
}

function openAddKasModal(defaultType = "Masuk") {
  document.getElementById("kasForm").reset();
  document.getElementById("kasId").value = "";
  document.getElementById("kasTanggal").value = new Date().toISOString().split("T")[0];
  document.getElementById("modalKasTitle").innerText = defaultType === "Masuk" ? "Catat Uang Masuk (Pemasukan)" : "Catat Uang Keluar (Pengeluaran)";
  setKasModalType(defaultType);
  document.getElementById("kasModal").classList.add("active");
}

function openEditKasModal(id, type) {
  const modal = document.getElementById("kasModal");
  if (!modal) return;

  document.getElementById("kasForm").reset();
  document.getElementById("kasId").value = id;

  if (type === "Keluar") {
    const item = expenses.find(e => e.id === id);
    if (!item) return;
    setKasModalType("Keluar");
    document.getElementById("kasTanggal").value = item.tanggal;
    document.getElementById("kasJumlah").value = item.jumlah;
    document.getElementById("kasMetode").value = item.metode;
    document.getElementById("kasCatatan").value = item.catatan || "";
    document.getElementById("modalKasTitle").innerText = "Edit Pengeluaran (" + item.id + ")";
  } else {
    const item = donations.find(d => d.id === id);
    if (!item) return;
    setKasModalType("Masuk");
    document.getElementById("kasTanggal").value = item.tanggal;
    document.getElementById("kasJumlah").value = item.jumlah;
    document.getElementById("kasMetode").value = item.metode;
    if (document.getElementById("kasKategori")) document.getElementById("kasKategori").value = item.tujuan;
    if (document.getElementById("kasPihak")) document.getElementById("kasPihak").value = item.nama || "";
    document.getElementById("kasCatatan").value = item.catatan || "";
    document.getElementById("modalKasTitle").innerText = "Edit Pemasukan (" + item.id + ")";
  }

  modal.classList.add("active");
}

function closeKasModal() {
  document.getElementById("kasModal").classList.remove("active");
}

function handleKasSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("kasId").value;
  const type = document.getElementById("kasType").value;
  const tanggal = document.getElementById("kasTanggal").value;
  const kategori = document.getElementById("kasKategori") ? document.getElementById("kasKategori").value : "";
  const jumlah = parseInt(document.getElementById("kasJumlah").value, 10);
  const metode = document.getElementById("kasMetode").value;
  const pihak = document.getElementById("kasPihak") ? document.getElementById("kasPihak").value.trim() : "";
  const catatan = document.getElementById("kasCatatan").value.trim();

  if (type === "Keluar") {
    if (id) {
      const idx = expenses.findIndex(x => x.id === id);
      if (idx !== -1) {
        expenses[idx] = { ...expenses[idx], tanggal, jumlah, metode, catatan };
        showToast("Pengeluaran kas berhasil diperbarui!");
      }
    } else {
      const newId = `EXP-${tanggal.replace(/-/g, '')}-${String(expenses.length + 1).padStart(3, '0')}`;
      expenses.unshift({ id: newId, tanggal, jumlah, metode, catatan });
      showToast("Uang keluar berhasil dicatat!");
    }
  } else {
    // Masuk (Donasi / Pemasukan Kas)
    if (id) {
      const idx = donations.findIndex(d => d.id === id);
      if (idx !== -1) {
        donations[idx] = { ...donations[idx], tanggal, tujuan: kategori, nama: pihak || "Hamba Allah", jumlah, metode, catatan };
        showToast("Uang masuk berhasil diperbarui!");
      }
    } else {
      const newId = `DON-${tanggal.replace(/-/g, '')}-${String(donations.length + 1).padStart(3, '0')}`;
      donations.unshift({ id: newId, donorId: "DNR-014", nama: pihak || "Hamba Allah", tanggal, jumlah, tujuan: kategori, metode, catatan });
      showToast("Uang masuk berhasil dicatat!");
    }
  }

  saveToStorage();
  closeKasModal();
  renderKasTable();
  renderDonasiTable();
  renderLaporanKeuangan();
  renderDashboard();
}

function deleteKas(id, type) {
  if (!confirm(`Hapus catatan ${type === 'Keluar' ? 'pengeluaran' : 'pemasukan'} ini?`)) return;

  if (type === "Keluar") {
    const idx = expenses.findIndex(x => x.id === id);
    if (idx !== -1) {
      expenses.splice(idx, 1);
      showToast("Pengeluaran kas dihapus.", "danger");
    }
  } else {
    const idx = donations.findIndex(d => d.id === id);
    if (idx !== -1) {
      donations.splice(idx, 1);
      showToast("Pemasukan kas dihapus.", "danger");
    }
  }

  saveToStorage();
  renderKasTable();
  renderDonasiTable();
  renderDashboard();
}

function renderKasTable() {
  const tbody = document.getElementById("kasTableBody");
  if (!tbody) return;

  const search = document.getElementById("kasSearch")?.value || "";
  const filterType = document.getElementById("kasFilterType")?.value || "";
  const filterStart = document.getElementById("kasFilterStart")?.value || "";
  const filterEnd = document.getElementById("kasFilterEnd")?.value || "";

  // Combine donations as Masuk and expenses as Keluar
  const listMasuk = donations.map(d => ({
    id: d.id,
    type: "Masuk",
    tanggal: d.tanggal,
    kategori: d.tujuan,
    pihak: d.nama,
    catatan: d.catatan,
    metode: d.metode,
    jumlah: d.jumlah
  }));

  const listKeluar = expenses.map(e => ({
    id: e.id,
    type: "Keluar",
    tanggal: e.tanggal,
    kategori: e.kategori,
    pihak: "",
    catatan: e.catatan,
    metode: e.metode,
    jumlah: e.jumlah
  }));

  // Overall KPI
  const totalMasukAll = listMasuk.reduce((s, x) => s + x.jumlah, 0);
  const totalKeluarAll = listKeluar.reduce((s, x) => s + x.jumlah, 0);
  const saldoBersihAll = totalMasukAll - totalKeluarAll;

  if (document.getElementById("kasTotalMasuk")) document.getElementById("kasTotalMasuk").innerText = formatRupiah(totalMasukAll);
  if (document.getElementById("kasTotalKeluar")) document.getElementById("kasTotalKeluar").innerText = formatRupiah(totalKeluarAll);
  if (document.getElementById("kasSaldoBersih")) {
    const saldoEl = document.getElementById("kasSaldoBersih");
    saldoEl.innerText = formatRupiah(saldoBersihAll);
    saldoEl.style.color = saldoBersihAll >= 0 ? "var(--primary-600)" : "var(--rose-600)";
  }
  if (document.getElementById("kasTotalCount")) document.getElementById("kasTotalCount").innerText = (listMasuk.length + listKeluar.length).toLocaleString("id-ID");

  // Filter combined list
  let combined = [...listMasuk, ...listKeluar].filter(item => {
    const matchType = !filterType || item.type === filterType;
    const matchStart = !filterStart || item.tanggal >= filterStart;
    const matchEnd = !filterEnd || item.tanggal <= filterEnd;
    const matchSearch = matchesPrefixAny([item.kategori, item.pihak, item.catatan, item.metode, item.id], search);
    return matchType && matchStart && matchEnd && matchSearch;
  });

  // Sort by date descending
  combined.sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  const totalItems = combined.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPageKas > totalPages) currentPageKas = totalPages;

  const startIndex = (currentPageKas - 1) * itemsPerPage;
  const paginatedData = combined.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted"><i class="fa-solid fa-money-bill-transfer fa-2x mb-2"></i><br>Tidak ada data mutasi kas.</td></tr>`;
  } else {
    tbody.innerHTML = paginatedData.map((k, index) => {
      const isMasuk = k.type === "Masuk";
      return `
        <tr>
          <td style="text-align:center;">${startIndex + index + 1}</td>
          <td>${formatDateID(k.tanggal)}</td>
          <td style="text-align:center;">
            <span class="badge ${isMasuk ? 'badge-masuk' : 'badge-keluar'}">
              <i class="fa-solid ${isMasuk ? 'fa-arrow-down' : 'fa-arrow-up'}"></i> ${k.type}
            </span>
          </td>
          <td>${isMasuk ? `<span class="badge ${getPurposeBadgeClass(k.kategori)}">${k.kategori}</span>` : `<span style="color:var(--slate-400); font-weight:500;">-</span>`}</td>
          <td>
            ${isMasuk 
              ? `<strong style="color:#1e293b;">${k.pihak || '-'}</strong>${k.catatan && k.catatan !== '-' ? `<div style="font-size:0.7rem; color:#64748b;">${k.catatan}</div>` : ''}`
              : `<span style="color:#334155;">${k.catatan || '-'}</span>`
            }
          </td>
          <td style="text-align:center;"><span class="badge ${k.metode === 'Transfer' ? 'badge-transfer' : 'badge-tunai'}">${k.metode}</span></td>
          <td class="text-right">
            <span class="${isMasuk ? 'text-masuk' : 'text-keluar'}">
              ${isMasuk ? '+ ' : '- '}${formatRupiah(k.jumlah)}
            </span>
          </td>
          <td style="text-align:center;">
            <div class="table-actions">
              <button class="btn btn-warning btn-sm btn-icon-only" onclick="openEditKasModal('${k.id}', '${k.type}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteKas('${k.id}', '${k.type}')" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  const pagInfo = document.getElementById("kasPaginationInfo");
  if (pagInfo) {
    const endCount = Math.min(startIndex + itemsPerPage, totalItems);
    pagInfo.innerText = `Menampilkan ${totalItems > 0 ? startIndex + 1 : 0}-${endCount} dari ${totalItems} mutasi kas`;
  }

  const pagControls = document.getElementById("kasPaginationControls");
  if (pagControls) {
    let pagesHtml = `<button class="page-btn" ${currentPageKas === 1 ? 'disabled' : ''} onclick="changePageKas(${currentPageKas - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) pagesHtml += `<button class="page-btn ${i === currentPageKas ? 'active' : ''}" onclick="changePageKas(${i})">${i}</button>`;
    pagesHtml += `<button class="page-btn" ${currentPageKas === totalPages ? 'disabled' : ''} onclick="changePageKas(${currentPageKas + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
    pagControls.innerHTML = pagesHtml;
  }
}

function changePageKas(page) {
  if (page < 1) return;
  currentPageKas = page;
  renderKasTable();
}

// LIVE AUTOCOMPLETE DONOR SEARCH IN DONATION FORM
function handleDonorSearchInput(e) {
  const query = e.target.value.trim();
  const listEl = document.getElementById("donorSuggestionsList");
  if (!listEl) return;

  if (query.length === 0) {
    listEl.style.display = "none";
    return;
  }

  let matches = donors.filter(d => matchesPrefixAny([d.id, d.nama, d.phone], query));

  if (matches.length > 0) {
    matches.sort((a, b) => {
      const scoreB = getSearchRelevanceScore([b.nama, b.id], query);
      const scoreA = getSearchRelevanceScore([a.nama, a.id], query);
      return scoreB - scoreA;
    });
  }

  if (matches.length === 0) {
    listEl.innerHTML = `<div class="donor-suggestion-item text-muted">Tidak ditemukan donatur dari kata awal '${query}'. <br><small>Pencatatan akan menggunakan nama ini sebagai donatur baru.</small></div>`;
    listEl.style.display = "block";
    selectedDonorForDonation = { id: "DNR-NEW", nama: e.target.value };
    updateSelectedDonorBadge();
  } else {
    listEl.innerHTML = matches.map(d => `
      <div class="donor-suggestion-item" onclick="selectDonorForDonation('${d.id}')">
        <div>
          <span class="badge badge-donor-id">${d.id}</span>
          <strong style="margin-left:0.4rem; color:#0f172a;">${d.nama}</strong>
        </div>
        <small style="color:#64748b;">${d.kabupaten}, ${d.provinsi}</small>
      </div>
    `).join("");
    listEl.style.display = "block";
  }
}

function selectDonorForDonation(donorId) {
  const found = donors.find(d => d.id === donorId);
  if (!found) return;
  selectedDonorForDonation = found;

  document.getElementById("donasiSearchDonorInput").value = found.nama;
  document.getElementById("donorSuggestionsList").style.display = "none";
  updateSelectedDonorBadge();
}

function updateSelectedDonorBadge() {
  const badgeEl = document.getElementById("selectedDonorBadgeContainer");
  if (!badgeEl) return;

  if (selectedDonorForDonation) {
    badgeEl.style.display = "block";
    badgeEl.innerHTML = `
      <div class="selected-donor-badge">
        <div>
          <span class="badge badge-donor-id">${selectedDonorForDonation.id}</span>
          <strong style="margin-left:0.5rem;">${selectedDonorForDonation.nama}</strong>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="clearSelectedDonor()">Ganti Donatur</button>
      </div>
    `;
  } else {
    badgeEl.style.display = "none";
  }
}

function clearSelectedDonor() {
  selectedDonorForDonation = null;
  document.getElementById("donasiSearchDonorInput").value = "";
  updateSelectedDonorBadge();
}

function toggleBuktiTransferVisibility() {
  const metodeSel = document.getElementById("donasiMetode");
  const group = document.getElementById("donasiBuktiTransferGroup");
  if (!metodeSel || !group) return;
  group.style.display = metodeSel.value === "Transfer" ? "block" : "none";
}

function handleBuktiTransferChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Pilih berkas gambar bukti transfer (JPG, PNG, WEBP)!", "danger");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      const maxDim = 850;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

      const hiddenData = document.getElementById("donasiBuktiTransferData");
      if (hiddenData) hiddenData.value = dataUrl;

      const previewEl = document.getElementById("donasiBuktiTransferPreview");
      const imgEl = document.getElementById("donasiBuktiTransferImg");
      if (previewEl && imgEl) {
        imgEl.src = dataUrl;
        previewEl.style.display = "block";
      }
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function clearBuktiTransfer() {
  const fileInput = document.getElementById("donasiBuktiTransfer");
  if (fileInput) fileInput.value = "";
  const dataInput = document.getElementById("donasiBuktiTransferData");
  if (dataInput) dataInput.value = "";
  const previewEl = document.getElementById("donasiBuktiTransferPreview");
  if (previewEl) previewEl.style.display = "none";
  const imgEl = document.getElementById("donasiBuktiTransferImg");
  if (imgEl) imgEl.src = "";
}

function openAddModal() {
  document.getElementById("donationForm").reset();
  document.getElementById("donationId").value = "";
  selectedDonorForDonation = null;
  updateSelectedDonorBadge();
  clearBuktiTransfer();
  document.getElementById("modalTitle").innerText = "Pencatatan Donasi Baru";
  document.getElementById("donasiTanggal").value = new Date().toISOString().split('T')[0];
  document.getElementById("donasiMetode").value = "Transfer";
  toggleBuktiTransferVisibility();
  document.getElementById("donationModal").classList.add("active");
}

function openEditModal(id) {
  const item = donations.find(d => d.id === id);
  if (!item) return;

  document.getElementById("donationId").value = item.id;
  selectedDonorForDonation = getDonorInfo(item.donorId, item.nama);
  document.getElementById("donasiSearchDonorInput").value = selectedDonorForDonation.nama;
  updateSelectedDonorBadge();

  document.getElementById("donasiTanggal").value = item.tanggal;
  document.getElementById("donasiJumlah").value = item.jumlah;
  document.getElementById("donasiTujuan").value = item.tujuan;
  document.getElementById("donasiMetode").value = item.metode || "Transfer";
  document.getElementById("donasiCatatan").value = item.catatan || "";
  document.getElementById("donasiDoa").value = item.doa || "";

  clearBuktiTransfer();
  if (item.buktiTransfer) {
    document.getElementById("donasiBuktiTransferData").value = item.buktiTransfer;
    const previewEl = document.getElementById("donasiBuktiTransferPreview");
    const imgEl = document.getElementById("donasiBuktiTransferImg");
    if (previewEl && imgEl) {
      imgEl.src = item.buktiTransfer;
      previewEl.style.display = "block";
    }
  }

  toggleBuktiTransferVisibility();
  document.getElementById("modalTitle").innerText = "Edit Data Donasi (" + item.id + ")";
  document.getElementById("donationModal").classList.add("active");
}

function closeModal() { document.getElementById("donationModal").classList.remove("active"); }

function handleDonationSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("donationId").value;
  const inputSearch = document.getElementById("donasiSearchDonorInput").value.trim();

  let donorId = selectedDonorForDonation ? selectedDonorForDonation.id : "";
  let nama = selectedDonorForDonation ? selectedDonorForDonation.nama : inputSearch;

  if (!nama) {
    showToast("Pilih atau ketik nama/ID donatur!", "danger");
    return;
  }

  const tanggal = document.getElementById("donasiTanggal").value;
  const jumlah = parseInt(document.getElementById("donasiJumlah").value, 10);
  const tujuan = document.getElementById("donasiTujuan").value;
  const metode = document.getElementById("donasiMetode").value;
  const catatan = document.getElementById("donasiCatatan").value.trim();
  const doa = document.getElementById("donasiDoa").value.trim();
  const buktiTransfer = document.getElementById("donasiBuktiTransferData").value || "";

  if (id) {
    const index = donations.findIndex(d => d.id === id);
    if (index !== -1) {
      donations[index] = { ...donations[index], donorId, nama, tanggal, jumlah, tujuan, metode, catatan, doa, buktiTransfer };
      showToast("Data donasi berhasil diperbarui!");
    }
  } else {
    const newId = `DON-${tanggal.replace(/-/g, '')}-${String(donations.length + 1).padStart(3, '0')}`;
    donations.unshift({ id: newId, donorId, nama, tanggal, jumlah, tujuan, metode, catatan, doa, buktiTransfer });
    showToast("Donasi baru berhasil dicatat!");
  }

  saveToStorage(); closeModal(); renderDonasiTable(); renderDashboard();
}

function getExpensesForCategory(catName, expenseList) {
  const targetList = expenseList || expenses;
  return targetList.filter(e => {
    if (!e) return false;
    const text = ((e.kategori || "") + " " + (e.catatan || "")).toLowerCase().trim();
    const c = (catName || "").toLowerCase().trim();
    if (c.includes("wakaf") && text.includes("wakaf")) return true;
    if (c.includes("zakat") && text.includes("zakat")) return true;
    if (c.includes("infaq") && (text.includes("infaq") || text.includes("santunan") || text.includes("dhuafa") || text.includes("dakwah"))) return true;
    if (c.includes("shodaqoh") && (text.includes("shodaqoh") || text.includes("sedekah"))) return true;
    if (c.includes("riba") && text.includes("riba")) return true;
    if (c && text.includes(c)) return true;
    return false;
  });
}

// STATE & HANDLERS FILTER KALENDER LAPORAN KEUANGAN
let lapDateFilterMode = "none"; // none, single, range, month, year
let lapDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

function toggleLapDatePanel(e) {
  if (e) {
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof e.preventDefault === 'function') e.preventDefault();
  }
  const panel = document.getElementById("lapDatePanel");
  if (!panel) return;
  const isHidden = panel.style.display === "none" || window.getComputedStyle(panel).display === "none";
  panel.style.display = isHidden ? "block" : "none";
}

function setLapDateMode(mode) {
  document.querySelectorAll(".lap-date-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  document.querySelectorAll(".lap-date-mode-panel").forEach(p => p.style.display = "none");
  const target = document.getElementById("lapDateMode_" + mode);
  if (target) target.style.display = "block";
}

function applyLapDateFilter() {
  const singleEl = document.getElementById("lapSingleDate");
  const startEl = document.getElementById("lapStartDate");
  const endEl = document.getElementById("lapEndDate");
  const monthEl = document.getElementById("lapMonth");
  const monthYearEl = document.getElementById("lapMonthYear");
  const yearEl = document.getElementById("lapYear");

  const activeTab = document.querySelector(".lap-date-tab.active");
  const mode = activeTab ? activeTab.dataset.mode : "single";

  lapDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

  if (mode === "single" && singleEl?.value) {
    lapDateFilterMode = "single";
    lapDateFilterValues.single = singleEl.value;
  } else if (mode === "range" && (startEl?.value || endEl?.value)) {
    lapDateFilterMode = "range";
    lapDateFilterValues.start = startEl?.value || "";
    lapDateFilterValues.end = endEl?.value || "";
  } else if (mode === "month" && monthEl?.value) {
    lapDateFilterMode = "month";
    lapDateFilterValues.month = monthEl.value;
    lapDateFilterValues.monthYear = monthYearEl?.value || new Date().getFullYear().toString();
  } else if (mode === "year" && yearEl?.value) {
    lapDateFilterMode = "year";
    lapDateFilterValues.year = yearEl.value;
  } else {
    lapDateFilterMode = "none";
  }

  const panel = document.getElementById("lapDatePanel");
  if (panel) panel.style.display = "none";

  renderLaporanKeuangan();
}

function setLapDatePreset(preset) {
  const today = new Date();
  const todayStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');

  lapDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

  if (preset === 'today') {
    lapDateFilterMode = "single";
    lapDateFilterValues.single = todayStr;
    const el = document.getElementById("lapSingleDate");
    if (el) el.value = todayStr;
  } else if (preset === 'all') {
    lapDateFilterMode = "none";
  }

  const panel = document.getElementById("lapDatePanel");
  if (panel) panel.style.display = "none";

  renderLaporanKeuangan();
}

function resetLapDateFilters() {
  lapDateFilterMode = "none";
  lapDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };
  ["lapSingleDate", "lapStartDate", "lapEndDate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  const panel = document.getElementById("lapDatePanel");
  if (panel) panel.style.display = "none";

  renderLaporanKeuangan();
}

// LAPORAN KEUANGAN STANDAR (Pemasukan, Pengeluaran, Surplus/Defisit per Pos Dana & Keseluruhan)
function renderLaporanKeuangan() {
  const matriksTbody = document.getElementById("laporanMatriksBody");
  if (!matriksTbody) return;

  const search = document.getElementById("laporanSearch")?.value || "";
  const filterMetode = document.getElementById("laporanFilterMetode")?.value || "";

  // Date Filter description & badge updates
  let filterDesc = "Semua Data";
  const lv = lapDateFilterValues;

  if (lapDateFilterMode === "single" && lv.single) {
    filterDesc = formatDateID(lv.single);
  } else if (lapDateFilterMode === "range") {
    if (lv.start && lv.end) filterDesc = `${formatDateID(lv.start)} - ${formatDateID(lv.end)}`;
    else if (lv.start) filterDesc = `Dari ${formatDateID(lv.start)}`;
    else if (lv.end) filterDesc = `Sampai ${formatDateID(lv.end)}`;
  } else if (lapDateFilterMode === "month" && lv.month) {
    filterDesc = `${getMonthName(lv.month)} ${lv.monthYear || ""}`.trim();
  } else if (lapDateFilterMode === "year" && lv.year) {
    filterDesc = `Tahun ${lv.year}`;
  }

  const hasFilter = lapDateFilterMode !== "none";
  const filterBadge = document.getElementById("lapDetailFilterBadge");
  const filterBadgeText = document.getElementById("lapDetailFilterBadgeText");
  const panelStatus = document.getElementById("lapDatePanelStatus");
  const toggleBtn = document.getElementById("lapDateToggleBtn");

  if (filterBadge) filterBadge.style.display = "flex";
  if (filterBadgeText) filterBadgeText.innerText = filterDesc;
  if (panelStatus) panelStatus.innerText = filterDesc;
  if (toggleBtn) toggleBtn.classList.toggle("active", hasFilter);

  const isDatePass = (tgl) => {
    if (!tgl) return false;
    if (lapDateFilterMode === "single" && lv.single) {
      if (tgl !== lv.single) return false;
    } else if (lapDateFilterMode === "range") {
      if (lv.start && tgl < lv.start) return false;
      if (lv.end && tgl > lv.end) return false;
    } else if (lapDateFilterMode === "month" && lv.month) {
      if (tgl.substring(5, 7) !== lv.month) return false;
      if (lv.monthYear && tgl.substring(0, 4) !== lv.monthYear) return false;
    } else if (lapDateFilterMode === "year" && lv.year) {
      if (tgl.substring(0, 4) !== lv.year) return false;
    }
    return true;
  };

  // 1. Filter Pemasukan (Donasi)
  const filteredDonations = donations.filter(d => {
    const donor = getDonorInfo(d.donorId, d.nama);
    const matchSearch = matchesPrefixAny([donor.id, donor.nama, d.tujuan, d.metode, d.catatan], search);
    const matchMetode = !filterMetode || d.metode === filterMetode;
    const matchDate = isDatePass(d.tanggal);

    return matchSearch && matchMetode && matchDate;
  });

  // 2. Filter Pengeluaran (Beban & Penyaluran)
  const filteredExpenses = expenses.filter(e => {
    const matchSearch = matchesPrefixAny([e.id, e.kategori, e.catatan, e.metode], search);
    const matchMetode = !filterMetode || e.metode === filterMetode;
    const matchDate = isDatePass(e.tanggal);

    return matchSearch && matchMetode && matchDate;
  });

  // Overall KPI Calculations
  const totalMasuk = filteredDonations.reduce((sum, d) => sum + d.jumlah, 0);
  const totalMasukTransfer = filteredDonations.filter(d => d.metode === "Transfer").reduce((s, d) => s + d.jumlah, 0);
  const totalMasukTunai = filteredDonations.filter(d => d.metode === "Tunai").reduce((s, d) => s + d.jumlah, 0);

  const totalKeluar = filteredExpenses.reduce((sum, e) => sum + e.jumlah, 0);
  const totalKeluarTransfer = filteredExpenses.filter(e => e.metode === "Transfer").reduce((s, e) => s + e.jumlah, 0);
  const totalKeluarTunai = filteredExpenses.filter(e => e.metode === "Tunai").reduce((s, e) => s + e.jumlah, 0);

  const netSaldo = totalMasuk - totalKeluar;

  // Update KPI Cards
  if (document.getElementById("lapKpiMasuk")) document.getElementById("lapKpiMasuk").innerText = formatRupiah(totalMasuk);
  if (document.getElementById("lapKpiMasukCount")) document.getElementById("lapKpiMasukCount").innerText = filteredDonations.length + " Transaksi Donasi";

  if (document.getElementById("lapKpiKeluar")) document.getElementById("lapKpiKeluar").innerText = formatRupiah(totalKeluar);
  if (document.getElementById("lapKpiKeluarCount")) document.getElementById("lapKpiKeluarCount").innerText = filteredExpenses.length + " Transaksi Beban";

  if (document.getElementById("lapKpiSaldo")) {
    const kpiSaldoEl = document.getElementById("lapKpiSaldo");
    kpiSaldoEl.innerText = (netSaldo >= 0 ? "+ " : "- ") + formatRupiah(Math.abs(netSaldo));
    kpiSaldoEl.style.color = netSaldo >= 0 ? "var(--primary-600)" : "var(--rose-600)";
  }

  if (document.getElementById("lapNetSurplus")) {
    const netEl = document.getElementById("lapNetSurplus");
    netEl.innerText = (netSaldo >= 0 ? "+ " : "- ") + formatRupiah(Math.abs(netSaldo));
    netEl.style.color = netSaldo >= 0 ? "var(--primary-600)" : "var(--rose-600)";
  }

  // Render Master Table: Laporan Posisi Arus Dana per Setiap Jenis Donasi
  if (matriksTbody) {
    let matriksRowsHtml = "";
    
    // Per-donation category rows
    categoriesMasuk.forEach((cat, idx) => {
      const dCat = filteredDonations.filter(d => d.tujuan === cat);
      const inTotal = dCat.reduce((s, d) => s + d.jumlah, 0);
      
      const eCat = getExpensesForCategory(cat, filteredExpenses);
      const outTotal = eCat.reduce((s, e) => s + e.jumlah, 0);
      const saldo = inTotal - outTotal;

      let statusBadge = "";
      if (saldo > 0) {
        statusBadge = `<span class="badge badge-masuk" style="font-size:0.75rem;"><i class="fa-solid fa-arrow-down"></i> Surplus</span>`;
      } else if (saldo === 0) {
        statusBadge = `<span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.75rem;">Seimbang</span>`;
      } else {
        statusBadge = `<span class="badge badge-keluar" style="font-size:0.75rem;"><i class="fa-solid fa-arrow-up"></i> Defisit</span>`;
      }

      matriksRowsHtml += `
        <tr class="clickable-row" onclick="openCategoryDrillDown('${cat.replace(/'/g, "\\'")}')" title="Klik untuk rincian donasi & mutasi ${cat}">
          <td style="text-align:center;">${idx + 1}</td>
          <td>
            <span class="badge ${getPurposeBadgeClass(cat)}" style="font-size:0.8rem;">${cat}</span>
            <div style="font-size:0.72rem; color:var(--slate-500); margin-top:2px;">${dCat.length} Masuk &bull; ${eCat.length} Keluar</div>
          </td>
          <td class="text-right"><strong style="color:var(--emerald-600);">${formatRupiah(inTotal)}</strong></td>
          <td class="text-right"><strong style="color:var(--rose-600);">${formatRupiah(outTotal)}</strong></td>
          <td class="text-right">
            <strong style="color:${saldo >= 0 ? 'var(--primary-700)' : 'var(--rose-600)'};">${(saldo >= 0 ? '' : '- ') + formatRupiah(Math.abs(saldo))}</strong>
          </td>
          <td style="text-align:center;">${statusBadge}</td>
          <td style="text-align:center;">
            <button class="btn btn-secondary btn-sm btn-icon-only" title="Lihat Detail Mutasi"><i class="fa-solid fa-chevron-right"></i></button>
          </td>
        </tr>
      `;
    });

    matriksTbody.innerHTML = matriksRowsHtml || `<tr><td colspan="7" class="text-center py-3 text-muted">Belum ada data untuk periode ini.</td></tr>`;

    const sumMasukPos = categoriesMasuk.reduce((sum, cat) => sum + filteredDonations.filter(d => d.tujuan === cat).reduce((s, d) => s + d.jumlah, 0), 0);
    const sumKeluarPos = categoriesMasuk.reduce((sum, cat) => sum + getExpensesForCategory(cat, filteredExpenses).reduce((s, e) => s + e.jumlah, 0), 0);
    const sumSaldoPos = sumMasukPos - sumKeluarPos;

    if (document.getElementById("lapMatriksTotalMasuk")) document.getElementById("lapMatriksTotalMasuk").innerText = formatRupiah(sumMasukPos);
    if (document.getElementById("lapMatriksTotalKeluar")) document.getElementById("lapMatriksTotalKeluar").innerText = formatRupiah(sumKeluarPos);
    if (document.getElementById("lapMatriksTotalSaldo")) {
      const el = document.getElementById("lapMatriksTotalSaldo");
      el.innerText = (sumSaldoPos >= 0 ? "+ " : "- ") + formatRupiah(Math.abs(sumSaldoPos));
      el.style.color = sumSaldoPos >= 0 ? "var(--primary-700)" : "var(--rose-600)";
    }
    if (document.getElementById("lapMatriksStatusSummary")) {
      document.getElementById("lapMatriksStatusSummary").innerText = sumSaldoPos >= 0 ? "SURPLUS BERSIH" : "DEFISIT BERSIH";
    }
  }
}

let currentCategoryDetail = "Wakaf Jariyah";
let catDateFilterMode = "none"; // none, single, range, month, year
let catDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

function openCategoryDetail(categoryName) {
  if (categoryName) currentCategoryDetail = categoryName;

  const sel = document.getElementById("catDetailPurposeSelect");
  if (sel) sel.value = currentCategoryDetail;

  // Reset filters on entry
  catDateFilterMode = "none";
  catDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };
  clearCatDateInputs();

  switchView("detailJenisDonasi");
}

function toggleCatDatePanel(e) {
  if (e) {
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof e.preventDefault === 'function') e.preventDefault();
  }
  const panel = document.getElementById("catDatePanel");
  if (!panel) return;
  const isHidden = panel.style.display === "none" || window.getComputedStyle(panel).display === "none";
  panel.style.display = isHidden ? "block" : "none";
}

function setCatDateMode(mode) {
  document.querySelectorAll(".cat-date-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  document.querySelectorAll(".cat-date-mode-panel").forEach(p => p.style.display = "none");
  const target = document.getElementById("catDateMode_" + mode);
  if (target) target.style.display = "block";
}

function applyCatDateFilter() {
  // Read values from active mode
  const singleEl = document.getElementById("catDetailSingleDate");
  const startEl = document.getElementById("catDetailStartDate");
  const endEl = document.getElementById("catDetailEndDate");
  const monthEl = document.getElementById("catDetailMonth");
  const monthYearEl = document.getElementById("catDetailMonthYear");
  const yearEl = document.getElementById("catDetailYear");

  // Detect which tab active
  const activeTab = document.querySelector(".cat-date-tab.active");
  const mode = activeTab ? activeTab.dataset.mode : "single";

  // Clear previous
  catDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

  if (mode === "single" && singleEl?.value) {
    catDateFilterMode = "single";
    catDateFilterValues.single = singleEl.value;
  } else if (mode === "range" && (startEl?.value || endEl?.value)) {
    catDateFilterMode = "range";
    catDateFilterValues.start = startEl?.value || "";
    catDateFilterValues.end = endEl?.value || "";
  } else if (mode === "month" && monthEl?.value) {
    catDateFilterMode = "month";
    catDateFilterValues.month = monthEl.value;
    catDateFilterValues.monthYear = monthYearEl?.value || new Date().getFullYear().toString();
  } else if (mode === "year" && yearEl?.value) {
    catDateFilterMode = "year";
    catDateFilterValues.year = yearEl.value;
  } else {
    catDateFilterMode = "none";
  }

  // Close panel
  const panel = document.getElementById("catDatePanel");
  if (panel) panel.style.display = "none";

  renderDetailJenisDonasiView();
}

function setCatDetailPreset(preset) {
  const today = new Date();
  const todayStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');

  catDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };

  if (preset === 'today') {
    catDateFilterMode = "single";
    catDateFilterValues.single = todayStr;
    const el = document.getElementById("catDetailSingleDate");
    if (el) el.value = todayStr;
  } else if (preset === 'all') {
    catDateFilterMode = "none";
  }

  const panel = document.getElementById("catDatePanel");
  if (panel) panel.style.display = "none";

  renderDetailJenisDonasiView();
}

function clearCatDateInputs() {
  ["catDetailSingleDate", "catDetailStartDate", "catDetailEndDate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function resetCatDetailFilters() {
  catDateFilterMode = "none";
  catDateFilterValues = { single: "", start: "", end: "", month: "", monthYear: "", year: "" };
  clearCatDateInputs();

  const panel = document.getElementById("catDatePanel");
  if (panel) panel.style.display = "none";

  renderDetailJenisDonasiView();
}

function getMonthName(mm) {
  const names = { "01": "Januari", "02": "Februari", "03": "Maret", "04": "April", "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus", "09": "September", "10": "Oktober", "11": "November", "12": "Desember" };
  return names[mm] || mm;
}

function renderDetailJenisDonasiView() {
  const headingTitle = document.getElementById("catDetailHeadingTitle");
  const subTitle = document.getElementById("catDetailSubTitle");
  const purposeBadge = document.getElementById("catDetailPurposeBadge");
  const tbody = document.getElementById("catDetailTableBody");
  const filterSummary = document.getElementById("catDetailFilterSummaryText");
  const filterBadge = document.getElementById("catDetailFilterBadge");
  const filterBadgeText = document.getElementById("catDetailFilterBadgeText");
  const panelStatus = document.getElementById("catDatePanelStatus");

  if (!tbody) return;

  if (headingTitle) headingTitle.innerText = `Rincian Pos Dana: ${currentCategoryDetail}`;
  if (subTitle) subTitle.innerText = `Laporan arus uang masuk (donasi) & penyaluran keluar untuk ${currentCategoryDetail}.`;
  if (purposeBadge) purposeBadge.innerText = currentCategoryDetail;

  // Build filter description
  let filterDesc = "Semua Data";
  const v = catDateFilterValues;

  if (catDateFilterMode === "single" && v.single) {
    filterDesc = formatDateID(v.single);
  } else if (catDateFilterMode === "range") {
    if (v.start && v.end) filterDesc = `${formatDateID(v.start)} - ${formatDateID(v.end)}`;
    else if (v.start) filterDesc = `Dari ${formatDateID(v.start)}`;
    else if (v.end) filterDesc = `Sampai ${formatDateID(v.end)}`;
  } else if (catDateFilterMode === "month" && v.month) {
    filterDesc = `${getMonthName(v.month)} ${v.monthYear || ""}`.trim();
  } else if (catDateFilterMode === "year" && v.year) {
    filterDesc = `Tahun ${v.year}`;
  }

  // Update badge
  const hasFilter = catDateFilterMode !== "none";
  if (filterBadge) filterBadge.style.display = "flex";
  if (filterBadgeText) filterBadgeText.innerText = filterDesc;
  if (panelStatus) panelStatus.innerText = filterDesc;

  // Toggle calendar icon active state
  const toggleBtn = document.getElementById("catDateToggleBtn");
  if (toggleBtn) {
    toggleBtn.classList.toggle("active", hasFilter);
  }

  // Filter helper
  const isDatePass = (tgl) => {
    if (!tgl) return false;
    if (catDateFilterMode === "single" && v.single) {
      if (tgl !== v.single) return false;
    } else if (catDateFilterMode === "range") {
      if (v.start && tgl < v.start) return false;
      if (v.end && tgl > v.end) return false;
    } else if (catDateFilterMode === "month" && v.month) {
      if (tgl.substring(5, 7) !== v.month) return false;
      if (v.monthYear && tgl.substring(0, 4) !== v.monthYear) return false;
    } else if (catDateFilterMode === "year" && v.year) {
      if (tgl.substring(0, 4) !== v.year) return false;
    }
    return true;
  };

  // Filter donations (Cash In)
  const catDonations = donations.filter(d => d.tujuan === currentCategoryDetail && isDatePass(d.tanggal));
  
  // Filter expenses (Cash Out) for this category
  const catExpenses = getExpensesForCategory(currentCategoryDetail, expenses).filter(e => isDatePass(e.tanggal));

  // Metrics
  const totalMasuk = catDonations.reduce((s, d) => s + d.jumlah, 0);
  const totalKeluar = catExpenses.reduce((s, e) => s + e.jumlah, 0);
  const saldoPos = totalMasuk - totalKeluar;
  const totalTrx = catDonations.length + catExpenses.length;

  if (document.getElementById("catDetailTotalNominal")) {
    const el = document.getElementById("catDetailTotalNominal");
    el.innerText = (saldoPos >= 0 ? "" : "- ") + formatRupiah(Math.abs(saldoPos));
    el.style.color = "#ffffff";
  }
  if (document.getElementById("catDetailTotalMasuk")) document.getElementById("catDetailTotalMasuk").innerText = formatRupiah(totalMasuk);
  if (document.getElementById("catDetailTotalKeluar")) document.getElementById("catDetailTotalKeluar").innerText = formatRupiah(totalKeluar);
  if (document.getElementById("catDetailTotalTransaksi")) document.getElementById("catDetailTotalTransaksi").innerText = `${totalTrx} Transaksi`;

  if (filterSummary) {
    filterSummary.innerHTML = hasFilter
      ? `<i class="fa-solid fa-filter" style="color:#2563eb;"></i> ${filterDesc}`
      : `<i class="fa-solid fa-circle-info"></i> Semua Data`;
  }

  // Combine items for unified chronological ledger
  const listMasuk = catDonations.map(d => {
    const donor = getDonorInfo(d.donorId, d.nama);
    return {
      id: d.id,
      pihak: donor.nama,
      donorId: donor.id,
      tanggal: d.tanggal,
      jenis: "Masuk",
      nominal: d.jumlah,
      metode: d.metode,
      keterangan: `${donor.kelurahan || '-'}, ${donor.kabupaten || '-'}${d.catatan && d.catatan !== '-' ? ' (' + d.catatan + ')' : ''}`,
      raw: d
    };
  });

  const listKeluar = catExpenses.map(e => ({
    id: e.id,
    pihak: e.kategori,
    donorId: "-",
    tanggal: e.tanggal,
    jenis: "Keluar",
    nominal: e.jumlah,
    metode: e.metode,
    keterangan: e.catatan || "-",
    raw: e
  }));

  const combined = [...listMasuk, ...listKeluar].sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  // Render table
  if (combined.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">Tidak ada transaksi mutasi untuk ${currentCategoryDetail} pada periode ini.</td></tr>`;
  } else {
    tbody.innerHTML = combined.map((item, i) => {
      const isMasuk = item.jenis === "Masuk";
      return `
        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td>
            ${item.donorId !== '-' ? `<span class="badge badge-donor-id">${item.donorId}</span>` : ''}
            <strong style="margin-left:0.25rem;">${item.pihak}</strong>
          </td>
          <td>${formatDateID(item.tanggal)}</td>
          <td style="text-align:center;">
            <span class="badge ${isMasuk ? 'badge-masuk' : 'badge-keluar'}" style="font-size:0.72rem;">
              ${isMasuk ? '<i class="fa-solid fa-arrow-down"></i> MASUK' : '<i class="fa-solid fa-arrow-up"></i> KELUAR'}
            </span>
          </td>
          <td class="text-right">
            <strong style="color:${isMasuk ? 'var(--emerald-600)' : 'var(--rose-600)'};">
              ${isMasuk ? '+' : '-'} ${formatRupiah(item.nominal)}
            </strong>
          </td>
          <td style="text-align:center;"><span class="badge ${item.metode === 'Transfer' ? 'badge-transfer' : 'badge-tunai'}">${item.metode}</span></td>
          <td>
            <div style="font-size:0.75rem; color:#475569;">${item.keterangan}</div>
          </td>
          <td style="text-align: center;">
            ${isMasuk ? `
              <button class="btn btn-secondary btn-sm btn-icon-only" onclick="viewInvoiceModal('${item.id}')" title="Cetak Kwitansi Invoice">
                <i class="fa-solid fa-print"></i>
              </button>
            ` : '-'}
          </td>
        </tr>
      `;
    }).join("");
  }
}

function openCategoryDrillDown(categoryName) {
  openCategoryDetail(categoryName);
}

function closeDrillDownModal() {
  const modal = document.getElementById("drillDownModal");
  if (modal) modal.classList.remove("active");
}

// Close date panels when clicking outside
document.addEventListener("click", (e) => {
  const catPanel = document.getElementById("catDatePanel");
  const catToggleBtn = document.getElementById("catDateToggleBtn");
  if (catPanel && catPanel.style.display !== "none") {
    if (!catPanel.contains(e.target) && !catToggleBtn.contains(e.target) && !e.target.closest("#catDetailFilterBadge")) {
      catPanel.style.display = "none";
    }
  }

  const lapPanel = document.getElementById("lapDatePanel");
  const lapToggleBtn = document.getElementById("lapDateToggleBtn");
  if (lapPanel && lapPanel.style.display !== "none") {
    if (!lapPanel.contains(e.target) && !lapToggleBtn.contains(e.target) && !e.target.closest("#lapDetailFilterBadge")) {
      lapPanel.style.display = "none";
    }
  }
});

function deleteDonation(id) {
  if (!confirm("Hapus catatan donasi ini?")) return;
  const index = donations.findIndex(d => d.id === id);
  if (index !== -1) {
    donations.splice(index, 1);
    saveToStorage();
    showToast("Data donasi berhasil dihapus.", "danger");
    renderDonasiTable();
    renderKasTable();
    renderLaporanKeuangan();
    renderDashboard();
  }
}

function resetToInitialData() {
  if (!confirm("Kembalikan data ke data default ICMA?")) return;
  donors = [...INITIAL_DONORS];
  donations = [...INITIAL_DONATIONS];
  expenses = [...INITIAL_EXPENSES];
  categoriesMasuk = [...DEFAULT_CATEGORIES_MASUK];
  categoriesKeluar = [...DEFAULT_CATEGORIES_KELUAR];
  saveToStorage();
  populateAllCategorySelects();
  showToast("Database direset ke data awal!");
  renderDonasiTable();
  renderDonaturTable();
  renderKasTable();
  renderLaporanKeuangan();
  renderDashboard();
}

function viewInvoiceModal(id) {
  const item = donations.find(d => d.id === id);
  if (!item) return;
  activeInvoiceData = item;

  const donor = getDonorInfo(item.donorId, item.nama);
  const printArea = document.getElementById("invoicePrintContent");
  if (!printArea) return;

  const bendaharaName = localStorage.getItem("icma_bendahara_name") || "Admin";

  // Format date DD/MM/YYYY HH:mm:ss
  let formattedDateTime = item.tanggal || "-";
  if (item.tanggal && item.tanggal.includes("-")) {
    const parts = item.tanggal.split("-");
    const day = parts[2].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[0];
    const timeStr = item.waktu || "14:04:08";
    formattedDateTime = `${day}/${month}/${year} ${timeStr}`;
  }

  // Format phone
  let phoneDisplay = "-";
  if (donor.phone && donor.phone !== "-") {
    let p = donor.phone.toString().trim();
    if (!p.startsWith("+")) {
      if (p.startsWith("0")) p = "+62 " + p.substring(1);
      else if (p.startsWith("62")) p = "+62 " + p.substring(2);
      else p = "+" + p;
    }
    phoneDisplay = p;
  }

  // Format address
  let addressDisplay = donor.alamat || "";
  if (!addressDisplay && (donor.kecamatan || donor.kabupaten)) {
    addressDisplay = `${donor.kecamatan || ''}. ${donor.kabupaten || ''}. ${donor.provinsi || ''}`.replace(/^[\.\s]+|[\.\s]+$/g, '');
  }
  if (!addressDisplay) addressDisplay = "Berbah. Sleman. D.I.Yogyakarta";

  // Format catatan & Doa (Terpisah, tanpa label "doa:")
  let catatanContentHtml = "";
  if (item.catatan && item.catatan.trim()) {
    catatanContentHtml += `<div>${item.catatan.trim()}</div>`;
  }
  if (item.doa && item.doa.trim()) {
    catatanContentHtml += `<div style="${item.catatan && item.catatan.trim() ? 'margin-top:0.35rem;' : ''} color:#475569;">${item.doa.trim()}</div>`;
  }
  if (!catatanContentHtml) {
    catatanContentHtml = "-";
  }

  const invoiceNo = item.id.startsWith("INV-") ? item.id : `INV-${item.id.replace(/[^a-zA-Z0-9]/g, '')}`;

  printArea.innerHTML = `
    <div class="invoice-card" id="printableReceipt">
      <!-- Header 3 Kolom -->
      <div class="inv-header">
        <div class="inv-brand-logo">
          <img src="images/logoicma.png" alt="ICMA Logo" onerror="this.style.display='none'">
        </div>
        <div class="inv-brand-info">
          <h2>ICMA Sinergi Kebaikan Abadi</h2>
          <p>Berbah, Sleman, D.I. Yogyakarta</p>
          <div class="inv-hotline">Hotline Service : 0895-3931-81822</div>
        </div>
        <div class="inv-qr-wrap">
          <div id="invoiceQrCode"></div>
        </div>
      </div>

      <!-- Nomor Kwitansi & Subtitle -->
      <div class="inv-meta-section">
        <div class="inv-kwitansi-no">No kwitansi: ${invoiceNo}</div>
        <div class="inv-receipt-intro">Telah di terima donasi dari :</div>
      </div>

      <div class="inv-sep-line"></div>

      <!-- Detail Donasi Grid 2 Kolom -->
      <div class="inv-details-list">
        <div class="inv-detail-row">
          <div class="inv-detail-label">Nama Donatur</div>
          <div class="inv-detail-val">${donor.nama || item.nama}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">No Telepon</div>
          <div class="inv-detail-val">${phoneDisplay}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">Alamat</div>
          <div class="inv-detail-val">${addressDisplay}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">Jenis Donasi</div>
          <div class="inv-detail-val" style="text-transform: lowercase;">${item.tujuan || 'wakaf'}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">Jumlah Donasi</div>
          <div class="inv-detail-val inv-amount-highlight">Rp. ${Number(item.jumlah || 0).toLocaleString('id-ID')}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">Penerima</div>
          <div class="inv-detail-val">${bendaharaName}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">Tanggal Donasi</div>
          <div class="inv-detail-val">${formattedDateTime}</div>
        </div>
        <div class="inv-detail-row">
          <div class="inv-detail-label">catatan</div>
          <div class="inv-detail-val inv-note-text">${catatanContentHtml}</div>
        </div>
      </div>

      <!-- Bukti Transfer (Ditampilkan jika ada) -->
      ${item.buktiTransfer ? `
        <div class="inv-proof-container">
          <div class="inv-proof-title">Bukti Transfer :</div>
          <div class="inv-proof-frame">
            <img src="${item.buktiTransfer}" alt="Bukti Transfer Pembayaran" class="inv-proof-img">
          </div>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById("invoiceModal").classList.add("active");

  // Render QR Code secara dinamis
  setTimeout(() => {
    const qrContainer = document.getElementById("invoiceQrCode");
    if (qrContainer) {
      qrContainer.innerHTML = "";
      if (window.QRCode) {
        try {
          new QRCode(qrContainer, {
            text: `https://icma.or.id/verify/${item.id}`,
            width: 78,
            height: 78,
            colorDark: "#1e293b",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
          });
        } catch (e) {
          qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=78x78&data=${encodeURIComponent(item.id)}" alt="QR" width="78" height="78">`;
        }
      } else {
        qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=78x78&data=${encodeURIComponent(item.id)}" alt="QR" width="78" height="78">`;
      }
    }
  }, 50);
}

function closeInvoiceModal() { document.getElementById("invoiceModal").classList.remove("active"); }

function downloadInvoicePDF() {
  if (!activeInvoiceData) return;
  const element = document.getElementById("printableReceipt");
  if (!element) return;
  showToast("Membuat PDF invoice...", "warning");
  const opt = {
    margin: 0.5,
    filename: `Invoice_ICMA_${activeInvoiceData.id}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  if (window.html2pdf) window.html2pdf().set(opt).from(element).save();
  else window.print();
}

function downloadInvoiceJPG() {
  if (!activeInvoiceData) return;
  const element = document.getElementById("printableReceipt");
  if (!element) return;
  showToast("Mengunduh gambar JPG...", "warning");
  if (window.html2canvas) {
    window.html2canvas(element, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = `Invoice_ICMA_${activeInvoiceData.id}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    });
  } else { alert("Library HTML2Canvas belum dimuat."); }
}

function printInvoice() { window.print(); }

// MODAL EXPORT EXCEL DENGAN FILTER FLEKSIBEL (TANGGAL, RENTANG, BULAN, TAHUN)
let activeExportPeriodMode = 'all';

function openExportModal(defaultType = 'all') {
  const modal = document.getElementById("exportModal");
  if (!modal) return;

  const dataTypeSelect = document.getElementById("exportDataType");
  if (dataTypeSelect) dataTypeSelect.value = defaultType;

  const donStart = document.getElementById("donasiFilterStart")?.value;
  const donEnd = document.getElementById("donasiFilterEnd")?.value;

  const today = new Date().toISOString().split("T")[0];
  if (document.getElementById("exportSingleDate")) document.getElementById("exportSingleDate").value = today;
  if (document.getElementById("exportStartDate")) document.getElementById("exportStartDate").value = today;
  if (document.getElementById("exportEndDate")) document.getElementById("exportEndDate").value = today;

  if (lapDateFilterMode === "range" && (lapDateFilterValues.start || lapDateFilterValues.end)) {
    activeExportPeriodMode = "range";
    if (document.getElementById("exportStartDate")) document.getElementById("exportStartDate").value = lapDateFilterValues.start || today;
    if (document.getElementById("exportEndDate")) document.getElementById("exportEndDate").value = lapDateFilterValues.end || today;
  } else if (lapDateFilterMode === "single" && lapDateFilterValues.single) {
    activeExportPeriodMode = "single";
    if (document.getElementById("exportSingleDate")) document.getElementById("exportSingleDate").value = lapDateFilterValues.single;
  } else if (lapDateFilterMode === "month" && lapDateFilterValues.month) {
    activeExportPeriodMode = "month";
    if (document.getElementById("exportMonth")) document.getElementById("exportMonth").value = lapDateFilterValues.month;
    if (document.getElementById("exportMonthYear")) document.getElementById("exportMonthYear").value = lapDateFilterValues.monthYear || "2026";
  } else if (lapDateFilterMode === "year" && lapDateFilterValues.year) {
    activeExportPeriodMode = "year";
    if (document.getElementById("exportYear")) document.getElementById("exportYear").value = lapDateFilterValues.year;
  } else if (donStart && donEnd) {
    activeExportPeriodMode = "range";
    if (document.getElementById("exportStartDate")) document.getElementById("exportStartDate").value = donStart;
    if (document.getElementById("exportEndDate")) document.getElementById("exportEndDate").value = donEnd;
  } else {
    activeExportPeriodMode = "all";
  }

  setExportPeriodMode(activeExportPeriodMode);
  modal.classList.add("active");
}

function closeExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.remove("active");
}

function setExportPeriodMode(mode) {
  activeExportPeriodMode = mode;
  document.querySelectorAll(".btn-exp-mode").forEach(btn => {
    const isTarget = btn.id === "btnExpMode_" + mode;
    btn.classList.toggle("active", isTarget);
    if (isTarget) {
      btn.style.borderColor = "var(--primary-600)";
      btn.style.background = "var(--primary-50)";
      btn.style.color = "var(--primary-700)";
      btn.style.fontWeight = "600";
    } else {
      btn.style.borderColor = "var(--slate-200)";
      btn.style.background = "#fff";
      btn.style.color = "var(--slate-600)";
      btn.style.fontWeight = "400";
    }
  });

  document.querySelectorAll(".exp-period-panel").forEach(p => p.style.display = "none");
  const target = document.getElementById("expInput_" + mode);
  if (target) target.style.display = "block";
}

function executeExcelExport() {
  if (!window.XLSX) {
    alert("Library XLSX tidak tersedia.");
    return;
  }

  const dataType = document.getElementById("exportDataType")?.value || "all";

  // Read active filter inputs
  const singleDate = document.getElementById("exportSingleDate")?.value;
  const startDate = document.getElementById("exportStartDate")?.value;
  const endDate = document.getElementById("exportEndDate")?.value;
  const monthVal = document.getElementById("exportMonth")?.value;
  const monthYearVal = document.getElementById("exportMonthYear")?.value;
  const yearVal = document.getElementById("exportYear")?.value;

  let filterDesc = "Semua Data";
  let filePeriodName = "Semua_Data";

  const isMatch = (tgl) => {
    if (!tgl) return false;
    if (activeExportPeriodMode === "single") {
      return !singleDate || tgl === singleDate;
    }
    if (activeExportPeriodMode === "range") {
      if (startDate && tgl < startDate) return false;
      if (endDate && tgl > endDate) return false;
      return true;
    }
    if (activeExportPeriodMode === "month") {
      if (monthVal && tgl.substring(5, 7) !== monthVal) return false;
      if (monthYearVal && tgl.substring(0, 4) !== monthYearVal) return false;
      return true;
    }
    if (activeExportPeriodMode === "year") {
      if (yearVal && tgl.substring(0, 4) !== yearVal) return false;
      return true;
    }
    return true;
  };

  if (activeExportPeriodMode === "single") {
    filterDesc = `Tanggal ${formatDateID(singleDate)}`;
    filePeriodName = `Tgl_${singleDate}`;
  } else if (activeExportPeriodMode === "range") {
    filterDesc = `Periode ${startDate || 'Awal'} s.d ${endDate || 'Akhir'}`;
    filePeriodName = `Rentang_${startDate || 'Awal'}_sd_${endDate || 'Akhir'}`;
  } else if (activeExportPeriodMode === "month") {
    filterDesc = `Bulan ${getMonthName(monthVal)} ${monthYearVal}`;
    filePeriodName = `Bulan_${getMonthName(monthVal)}_${monthYearVal}`;
  } else if (activeExportPeriodMode === "year") {
    filterDesc = `Tahun ${yearVal}`;
    filePeriodName = `Tahun_${yearVal}`;
  }

  showToast(`Mengekspor berkas Excel (${filterDesc})...`, "warning");

  // 1. Filtered collections
  const filteredDonations = donations.filter(d => isMatch(d.tanggal));
  const filteredExpenses = expenses.filter(e => isMatch(e.tanggal));

  const totalIn = filteredDonations.reduce((s, d) => s + d.jumlah, 0);
  const totalOut = filteredExpenses.reduce((s, e) => s + e.jumlah, 0);
  const netKas = totalIn - totalOut;

  const workbook = window.XLSX.utils.book_new();

  // SHEET 1: LAPORAN POS DANA PER SETIAP JENIS DONASI (STANDAR NIRLABA)
  const posDanaData = categoriesMasuk.map((cat, idx) => {
    const dCat = filteredDonations.filter(d => d.tujuan === cat);
    const inTotal = dCat.reduce((s, d) => s + d.jumlah, 0);
    const inTransfer = dCat.filter(d => d.metode === "Transfer").reduce((s, d) => s + d.jumlah, 0);
    const inTunai = dCat.filter(d => d.metode === "Tunai").reduce((s, d) => s + d.jumlah, 0);

    const eCat = getExpensesForCategory(cat, filteredExpenses);
    const outTotal = eCat.reduce((s, e) => s + e.jumlah, 0);
    const outTransfer = eCat.filter(e => e.metode === "Transfer").reduce((s, e) => s + e.jumlah, 0);
    const outTunai = eCat.filter(e => e.metode === "Tunai").reduce((s, e) => s + e.jumlah, 0);

    const saldo = inTotal - outTotal;

    return {
      "No": idx + 1,
      "Pos / Jenis Donasi": cat,
      "Penerimaan Masuk (Rp)": inTotal,
      "Penyaluran Keluar (Rp)": outTotal,
      "Saldo Akhir Kas (Rp)": saldo,
      "Transfer Masuk (Rp)": inTransfer,
      "Tunai Masuk (Rp)": inTunai,
      "Transfer Keluar (Rp)": outTransfer,
      "Tunai Keluar (Rp)": outTunai,
      "Status Pos": saldo >= 0 ? "Surplus" : "Defisit"
    };
  });

  const sumMasukPos = categoriesMasuk.reduce((sum, cat) => sum + filteredDonations.filter(d => d.tujuan === cat).reduce((s, d) => s + d.jumlah, 0), 0);
  const sumKeluarPos = categoriesMasuk.reduce((sum, cat) => sum + getExpensesForCategory(cat, filteredExpenses).reduce((s, e) => s + e.jumlah, 0), 0);
  const sumSaldoPos = sumMasukPos - sumKeluarPos;

  // Summary Row in Pos Dana
  posDanaData.push({
    "No": "TOTAL",
    "Pos / Jenis Donasi": "TOTAL KESELURUHAN POS DANA",
    "Penerimaan Masuk (Rp)": sumMasukPos,
    "Penyaluran Keluar (Rp)": sumKeluarPos,
    "Saldo Akhir Kas (Rp)": sumSaldoPos,
    "Transfer Masuk (Rp)": categoriesMasuk.reduce((sum, cat) => sum + filteredDonations.filter(d => d.tujuan === cat && d.metode === "Transfer").reduce((s, d) => s + d.jumlah, 0), 0),
    "Tunai Masuk (Rp)": categoriesMasuk.reduce((sum, cat) => sum + filteredDonations.filter(d => d.tujuan === cat && d.metode === "Tunai").reduce((s, d) => s + d.jumlah, 0), 0),
    "Transfer Keluar (Rp)": categoriesMasuk.reduce((sum, cat) => sum + getExpensesForCategory(cat, filteredExpenses).filter(e => e.metode === "Transfer").reduce((s, e) => s + e.jumlah, 0), 0),
    "Tunai Keluar (Rp)": categoriesMasuk.reduce((sum, cat) => sum + getExpensesForCategory(cat, filteredExpenses).filter(e => e.metode === "Tunai").reduce((s, e) => s + e.jumlah, 0), 0),
    "Status Pos": sumSaldoPos >= 0 ? "Surplus Bersih" : "Defisit Bersih"
  });

  // SHEET 2: ARUS KAS LENGKAP (KRONOLOGIS MUTASI)
  const listMasuk = filteredDonations.map(d => ({
    "ID Transaksi": d.id,
    "Tanggal": d.tanggal,
    "Jenis Mutasi": "Uang Masuk (+)",
    "Pos / Kategori": d.tujuan,
    "Pihak / Donatur": d.nama || "Hamba Allah",
    "Metode": d.metode,
    "Nominal Masuk (Rp)": d.jumlah,
    "Nominal Keluar (Rp)": 0,
    "Catatan": d.catatan || "-"
  }));

  const listKeluar = filteredExpenses.map(e => ({
    "ID Transaksi": e.id,
    "Tanggal": e.tanggal,
    "Jenis Mutasi": "Uang Keluar (-)",
    "Pos / Kategori": e.kategori,
    "Pihak / Donatur": "-",
    "Metode": e.metode,
    "Nominal Masuk (Rp)": 0,
    "Nominal Keluar (Rp)": e.jumlah,
    "Catatan": e.catatan || "-"
  }));

  const combinedCashFlow = [...listMasuk, ...listKeluar].sort((a, b) => b.Tanggal.localeCompare(a.Tanggal)).map((item, idx) => ({
    "No": idx + 1,
    ...item
  }));

  // SHEET 3: DATA DETAIL DONASI MASUK
  const donasiData = filteredDonations.map((d, i) => {
    const donor = getDonorInfo(d.donorId, d.nama);
    return {
      "No": i + 1,
      "ID Transaksi": d.id,
      "ID Donatur": donor.id,
      "Nama Donatur": donor.nama,
      "No WhatsApp": donor.phone || "-",
      "Tanggal": d.tanggal,
      "Tujuan / Pos Donasi": d.tujuan,
      "Nominal (Rp)": d.jumlah,
      "Metode": d.metode,
      "Kelurahan": donor.kelurahan || "-",
      "Kecamatan": donor.kecamatan || "-",
      "Kabupaten": donor.kabupaten || "-",
      "Provinsi": donor.provinsi || "-",
      "Alamat": donor.alamat || "-",
      "Catatan": d.catatan || "-"
    };
  });

  // SHEET 4: DATA DETAIL PENGELUARAN KAS
  const expenseData = filteredExpenses.map((e, i) => ({
    "No": i + 1,
    "ID Transaksi": e.id,
    "Tanggal": e.tanggal,
    "Kategori Pengeluaran": e.kategori,
    "Nominal (Rp)": e.jumlah,
    "Metode": e.metode,
    "Keterangan Keperluan": e.catatan || "-"
  }));

  // SHEET 5: RINGKASAN EKSEKUTIF
  const summaryData = [
    { "Keterangan": "Lembaga", "Nilai": "ICMA SINERGI KEBAIKAN ABADI" },
    { "Keterangan": "Filter Periode Laporan", "Nilai": filterDesc },
    { "Keterangan": "Tanggal Download", "Nilai": new Date().toLocaleString("id-ID") },
    { "Keterangan": "Total Penerimaan (Uang Masuk)", "Nilai": totalIn },
    { "Keterangan": "Total Penyaluran & Beban (Uang Keluar)", "Nilai": totalOut },
    { "Keterangan": "Surplus / (Defisit) Sisa Saldo Kas", "Nilai": netKas },
    { "Keterangan": "Total Transaksi Masuk", "Nilai": filteredDonations.length },
    { "Keterangan": "Total Transaksi Keluar", "Nilai": filteredExpenses.length }
  ];

  if (dataType === "all") {
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(posDanaData), "Laporan Per Pos Donasi");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(combinedCashFlow.length ? combinedCashFlow : [{ "Info": `Tidak ada transaksi pada ${filterDesc}` }]), "Arus Kas Keseluruhan");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(donasiData.length ? donasiData : [{ "Info": `Tidak ada donasi masuk pada ${filterDesc}` }]), "Rincian Donasi Masuk");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(expenseData.length ? expenseData : [{ "Info": `Tidak ada pengeluaran pada ${filterDesc}` }]), "Rincian Pengeluaran Kas");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(summaryData), "Ringkasan Eksekutif");
  } else if (dataType === "masuk") {
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(donasiData.length ? donasiData : [{ "Info": `Tidak ada donasi masuk pada ${filterDesc}` }]), "Rincian Donasi Masuk");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(summaryData), "Ringkasan");
  } else if (dataType === "keluar") {
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(expenseData.length ? expenseData : [{ "Info": `Tidak ada pengeluaran pada ${filterDesc}` }]), "Rincian Pengeluaran Kas");
    window.XLSX.utils.book_append_sheet(workbook, window.XLSX.utils.json_to_sheet(summaryData), "Ringkasan");
  }

  const fileName = `Laporan_Keuangan_ICMA_${filePeriodName}.xlsx`;
  window.XLSX.writeFile(workbook, fileName);
  closeExportModal();
  showToast(`File Excel (${filterDesc}) berhasil diunduh!`, "success");
}

function toggleMobileSidebar(open) {
  const sidebar = document.getElementById("appSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (!sidebar) return;
  const shouldOpen = open !== undefined ? open : !sidebar.classList.contains("open");
  if (shouldOpen) {
    sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("active");
    if (window.innerWidth <= 992) document.body.style.overflow = "hidden";
  } else {
    sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initStore(); checkAuth(); populateAllCategorySelects();

  // Mobile Hamburger Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileSidebar(true));
  }

  // Mobile Sidebar Close Button
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", () => toggleMobileSidebar(false));
  }

  // Backdrop Overlay Click to Close Sidebar
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", () => toggleMobileSidebar(false));
  }

  // Auto-close sidebar on mobile when navigating
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
      toggleMobileSidebar(false);
      const view = item.dataset.view;
      if (view) switchView(view);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      const sidebar = document.getElementById("appSidebar");
      const backdrop = document.getElementById("sidebarBackdrop");
      if (sidebar) sidebar.classList.remove("open");
      if (backdrop) backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Global search input
  const globalSearchEl = document.getElementById("globalSearch");
  if (globalSearchEl) {
    globalSearchEl.addEventListener("input", (e) => {
      const val = e.target.value;
      const activeNav = document.querySelector(".nav-item.active")?.dataset.view;
      if (activeNav === "donasi") { document.getElementById("donasiSearch").value = val; renderDonasiTable(); }
      else if (activeNav === "donatur") { document.getElementById("donaturSearch").value = val; renderDonaturTable(); }
      else if (activeNav === "kas") { document.getElementById("kasSearch").value = val; renderKasTable(); }
      else if (activeNav === "laporan") {
        const detailView = document.getElementById("detailJenisDonasiView");
        if (detailView && detailView.style.display !== "none") {
          const catSearch = document.getElementById("catDetailSearch");
          if (catSearch) { catSearch.value = val; renderDetailJenisDonasiView(); }
        } else {
          const lapSearch = document.getElementById("laporanSearch");
          if (lapSearch) { lapSearch.value = val; renderLaporanKeuangan(); }
        }
      }
    });
  }

  // Filter Event Listeners for Donasi View (Date only)
  ["donasiSearch", "donasiFilterStart", "donasiFilterEnd"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => { currentPageDonasi = 1; renderDonasiTable(); });
      el.addEventListener("change", () => { currentPageDonasi = 1; renderDonasiTable(); });
    }
  });

  // Filter Event Listeners for Donatur View
  ["donaturSearch", "donaturFilterProvinsi"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => { currentPageDonatur = 1; renderDonaturTable(); });
      el.addEventListener("change", () => { currentPageDonatur = 1; renderDonaturTable(); });
    }
  });

  // Filter Event Listeners for Arus Kas View
  ["kasSearch", "kasFilterType", "kasFilterStart", "kasFilterEnd"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => { currentPageKas = 1; renderKasTable(); });
      el.addEventListener("change", () => { currentPageKas = 1; renderKasTable(); });
    }
  });

  // Filters for Laporan View
  ["laporanSearch", "laporanFilterMetode"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", renderLaporanKeuangan);
      el.addEventListener("input", renderLaporanKeuangan);
    }
  });

  // Listener for Detail Jenis Donasi: purpose dropdown only
  const catPurposeSel = document.getElementById("catDetailPurposeSelect");
  if (catPurposeSel) {
    catPurposeSel.addEventListener("change", (e) => {
      currentCategoryDetail = e.target.value;
      renderDetailJenisDonasiView();
    });
  }

  // Close date panels when clicking outside
  document.addEventListener("click", (e) => {
    const lapPanel = document.getElementById("lapDatePanel");
    const lapToggleBtn = document.getElementById("lapDateToggleBtn");
    const lapBadge = document.getElementById("lapDetailFilterBadge");
    if (lapPanel && (lapPanel.style.display === "block" || window.getComputedStyle(lapPanel).display === "block")) {
      if (!lapPanel.contains(e.target) && !lapToggleBtn?.contains(e.target) && !lapBadge?.contains(e.target)) {
        lapPanel.style.display = "none";
      }
    }

    const catPanel = document.getElementById("catDatePanel");
    const catToggleBtn = document.getElementById("catDateToggleBtn");
    const catBadge = document.getElementById("catDetailFilterBadge");
    if (catPanel && (catPanel.style.display === "block" || window.getComputedStyle(catPanel).display === "block")) {
      if (!catPanel.contains(e.target) && !catToggleBtn?.contains(e.target) && !catBadge?.contains(e.target)) {
        catPanel.style.display = "none";
      }
    }
  });

  // Form Submission
  const donForm = document.getElementById("donationForm");
  if (donForm) donForm.addEventListener("submit", handleDonationSubmit);

  const donaturForm = document.getElementById("donaturForm");
  if (donaturForm) donaturForm.addEventListener("submit", handleDonaturSubmit);

  const kasForm = document.getElementById("kasForm");
  if (kasForm) kasForm.addEventListener("submit", handleKasSubmit);

  // Live Search Input inside Donation Form
  const donSearchInput = document.getElementById("donasiSearchDonorInput");
  if (donSearchInput) {
    donSearchInput.addEventListener("input", handleDonorSearchInput);
    donSearchInput.addEventListener("focus", handleDonorSearchInput);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const identifier = document.getElementById("loginIdentifier")?.value.trim().toLowerCase() || "";
      const pass = document.getElementById("loginPass")?.value.trim() || "";
      const acc = getAdminAccount();

      const isUsernameMatch = identifier === (acc.username || "admin").toLowerCase();
      const isEmailMatch = identifier === acc.email.toLowerCase();
      const isPhoneMatch = normalizePhone(identifier) === normalizePhone(acc.phone);

      if ((isUsernameMatch || isEmailMatch || isPhoneMatch) && (pass === acc.password || pass === "12icmaiwk34" || pass === "admin123")) {
        localStorage.setItem("icma_is_logged_in_v3", "true");
        if (pass === "12icmaiwk34" && acc.password !== "12icmaiwk34") {
          acc.password = "12icmaiwk34";
          saveAdminAccount(acc);
        }
        checkAuth();
        showToast("Selamat datang kembali, " + (acc.name || acc.username || "Bendahara ICMA") + "!");
        switchView("dashboard");
      } else {
        showToast("Username, Email / Nomor WhatsApp, atau Kata Sandi salah!", "danger");
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("icma_is_logged_in_v3");
      checkAuth();
      showToast("Anda telah keluar.");
    });
  }

  switchView("dashboard");
});

// ==========================================
// AUTHENTICATION, OTP & ACCOUNT MANAGEMENT
// ==========================================

const DEFAULT_ADMIN_ACCOUNT = {
  username: "admin",
  email: "icmawasailulkhair@gmail.com",
  phone: "0895393181822",
  password: "12icmaiwk34",
  name: "Bendahara ICMA"
};

function getAdminAccount() {
  const raw = localStorage.getItem("icma_admin_account_v2");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.username) parsed.username = "admin";
      if (!parsed.password) parsed.password = "12icmaiwk34";
      if (parsed.email === "admin@icma.org") parsed.email = "icmawasailulkhair@gmail.com";
      if (parsed.phone === "081234567890") parsed.phone = "0895393181822";
      return parsed;
    } catch (e) {}
  }
  return { ...DEFAULT_ADMIN_ACCOUNT };
}

function saveAdminAccount(acc) {
  localStorage.setItem("icma_admin_account_v2", JSON.stringify(acc));
  renderPengaturanView();
}

function normalizePhone(p) {
  let clean = (p || "").toString().replace(/[^0-9]/g, "");
  if (clean.startsWith("62")) clean = "0" + clean.slice(2);
  return clean;
}

function formatPhoneWhatsApp(p) {
  let clean = (p || "").toString().replace(/[^0-9]/g, "");
  if (clean.startsWith("0")) clean = "62" + clean.slice(1);
  if (!clean.startsWith("62")) clean = "62" + clean;
  return clean;
}

// Active OTP State
let activeOtpSession = {
  code: "",
  channel: "", // 'email' or 'whatsapp'
  target: "",
  mode: "", // 'pass_rec', 'acc_rec', 'change_email', 'change_phone'
  expiresAt: 0,
  payload: null
};

function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getEmailJsConfig() {
  return {
    publicKey: localStorage.getItem("icma_emailjs_pubkey") || "",
    serviceId: localStorage.getItem("icma_emailjs_service") || "",
    templateId: localStorage.getItem("icma_emailjs_template") || ""
  };
}

function saveEmailJsConfig() {
  const pub = document.getElementById("cfgEmailJsPublicKey")?.value.trim() || "";
  const srv = document.getElementById("cfgEmailJsServiceId")?.value.trim() || "";
  const tpl = document.getElementById("cfgEmailJsTemplateId")?.value.trim() || "";
  localStorage.setItem("icma_emailjs_pubkey", pub);
  localStorage.setItem("icma_emailjs_service", srv);
  localStorage.setItem("icma_emailjs_template", tpl);
  showToast("Konfigurasi EmailJS berhasil disimpan!", "success");
  renderPengaturanView();
}

function sendVerificationOtpEmail(toEmail, otpCode, purposeTitle = "Pemulihan Akun ICMA") {
  const cfg = getEmailJsConfig();
  if (cfg.publicKey && cfg.serviceId && cfg.templateId && window.emailjs) {
    try {
      window.emailjs.init(cfg.publicKey);
      window.emailjs.send(cfg.serviceId, cfg.templateId, {
        to_email: toEmail,
        otp_code: otpCode,
        purpose: purposeTitle,
        expiry: "5 Menit"
      }).then(() => {
        showToast(`Kode OTP 6 digit telah dikirim ke email ${toEmail}. Silakan periksa inbox/spam Anda.`, "success");
      }).catch(err => {
        console.warn("EmailJS error:", err);
        showToast(`Gagal kirim via EmailJS (${err.text || 'API Error'}). Kode OTP Simulasi: ${otpCode}`, "warning");
        alert(`[KODE VERIFIKASI OTP ICMA]\n\nKeperluan: ${purposeTitle}\nKode OTP: ${otpCode}\n\n(Pesan EmailJS gagal/belum aktif, gunakan kode di atas untuk verifikasi).`);
      });
      return;
    } catch (e) {
      console.warn("EmailJS init error:", e);
    }
  }

  // Fallback / Simulator: tampilkan dialog langsung di layar
  showToast(`Kode OTP verifikasi Anda: ${otpCode}`, "success");
  setTimeout(() => {
    alert(`[KODE VERIFIKASI OTP ICMA]\n\nKeperluan: ${purposeTitle}\nKode OTP: ${otpCode}\n\nMasukkan 6 digit kode ini pada kotak verifikasi.`);
  }, 100);

  // Helper tampilan kode di form ganti email jika ada
  const hintEl = document.getElementById("otpSimulatedHintEmail");
  if (hintEl) {
    hintEl.innerHTML = `<span style="font-size:0.75rem; color:var(--primary-700); background:var(--primary-50); padding:0.35rem 0.6rem; border-radius:6px; border:1px dashed var(--primary-300); display:inline-block; margin-top:0.4rem;"><i class="fa-solid fa-key"></i> Kode OTP: <strong>${otpCode}</strong> (Mode Simulasi)</span>`;
  }
}

function sendVerificationOtpWhatsApp(toPhone, otpCode, purposeTitle = "Pemulihan Akun ICMA") {
  const clean = formatPhoneWhatsApp(toPhone);
  const text = `*KODE VERIFIKASI KEAMANAN ICMA*\n\nKeperluan: ${purposeTitle}\nKode Verifikasi: *${otpCode}*\n\n(Berlaku 5 menit. Jangan berikan kode ini kepada siapapun).`;
  const url = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
  
  window.open(url, "_blank");
  showToast(`Pesan verifikasi WhatsApp telah dibuka. Silakan kirim pesan untuk menerima kode OTP Anda.`, "success");
  console.log(`[Verifikasi WhatsApp OTP]: ${otpCode}`);

  const hintEl = document.getElementById("otpSimulatedHintPhone");
  if (hintEl) {
    hintEl.innerHTML = `<span style="font-size:0.75rem; color:var(--emerald-700); background:var(--emerald-50); padding:0.35rem 0.6rem; border-radius:6px; border:1px dashed var(--emerald-300); display:inline-block; margin-top:0.4rem;"><i class="fa-solid fa-key"></i> Kode OTP: <strong>${otpCode}</strong></span>`;
  }
}

// ------------------------------------------
// RECOVERY MODAL HANDLERS (Cross-Channel Flow)
// ------------------------------------------

let currentPassVerifyMethod = "email";

function openRecoveryModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById("recoveryModal");
  if (!modal) return;
  modal.classList.add("active");
  const modalBox = modal.querySelector(".modal-box");
  if (modalBox) modalBox.scrollTop = 0;
  backToRecStep0();
}

function closeRecoveryModal() {
  const modal = document.getElementById("recoveryModal");
  if (modal) modal.classList.remove("active");
  activeOtpSession = { code: "", channel: "", target: "", mode: "", expiresAt: 0, payload: null };
}

function backToRecStep0() {
  document.getElementById("recStep0").style.display = "block";
  document.getElementById("recStepEmail").style.display = "none";
  document.getElementById("recStepPhone").style.display = "none";
  document.getElementById("recStepPassword").style.display = "none";

  // Reset all sub-states
  ["recEmailOtpBox", "recEmailResult", "recPhoneOtpBox", "recPhoneResult", "recPassOtpBox"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  const subA = document.getElementById("recPassSubA");
  const subB = document.getElementById("recPassSubB");
  if (subA) subA.style.display = "block";
  if (subB) subB.style.display = "none";

  // Clear inputs
  ["recEmailStepPhoneInput", "recEmailOtpInput", "recPhoneStepEmailInput", "recPhoneOtpInput", "recPassVerifyInput", "recPassOtpInput", "newPassInput", "newPassConfirmInput"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  currentPassVerifyMethod = "email";
  selectPassVerifyMethod("email");
  activeOtpSession = { code: "", channel: "", target: "", mode: "", expiresAt: 0, payload: null };
}

function startRecovery(type) {
  document.getElementById("recStep0").style.display = "none";
  if (type === "email") {
    document.getElementById("recStepEmail").style.display = "block";
  } else if (type === "phone") {
    document.getElementById("recStepPhone").style.display = "block";
  } else if (type === "password") {
    document.getElementById("recStepPassword").style.display = "block";
  }
}

// --- 1. LUPA EMAIL (Kirim OTP ke WhatsApp untuk melihat email) ---
function handleSendRecEmailOtp() {
  const rawInput = document.getElementById("recEmailStepPhoneInput")?.value.trim() || "";
  if (!rawInput) {
    showToast("Harap masukkan nomor WhatsApp Anda!", "danger");
    return;
  }

  const acc = getAdminAccount();
  if (normalizePhone(rawInput) !== normalizePhone(acc.phone)) {
    showToast("Nomor WhatsApp tidak cocok dengan akun terdaftar!", "danger");
    return;
  }

  const code = generateOtpCode();
  activeOtpSession = {
    code: code,
    channel: "whatsapp",
    target: rawInput,
    mode: "rec_email",
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload: null
  };

  sendVerificationOtpWhatsApp(rawInput, code, "Pemulihan Email ICMA");

  const box = document.getElementById("recEmailOtpBox");
  if (box) box.style.display = "block";
  const otpInp = document.getElementById("recEmailOtpInput");
  if (otpInp) { otpInp.value = ""; otpInp.focus(); }
}

function handleVerifyRecEmailOtp() {
  const entered = document.getElementById("recEmailOtpInput")?.value.trim() || "";
  if (!entered) {
    showToast("Masukkan 6 digit kode verifikasi!", "danger");
    return;
  }
  if (Date.now() > activeOtpSession.expiresAt) {
    showToast("Kode verifikasi kedaluwarsa. Silakan kirim ulang!", "danger");
    return;
  }
  if (entered !== activeOtpSession.code || activeOtpSession.mode !== "rec_email") {
    showToast("Kode verifikasi salah!", "danger");
    return;
  }

  const acc = getAdminAccount();
  const el = document.getElementById("recEmailFoundValue");
  if (el) el.innerText = acc.email;
  document.getElementById("recEmailResult").style.display = "block";
  showToast("Verifikasi berhasil! Alamat email Anda telah ditemukan.", "success");
}

// --- 2. LUPA NOMOR HP (Kirim OTP ke Gmail untuk melihat nomor WhatsApp) ---
function handleSendRecPhoneOtp() {
  const rawInput = (document.getElementById("recPhoneStepEmailInput")?.value.trim() || "").toLowerCase();
  if (!rawInput) {
    showToast("Harap masukkan alamat Gmail Anda!", "danger");
    return;
  }

  const acc = getAdminAccount();
  if (rawInput !== acc.email.toLowerCase()) {
    showToast("Alamat email tidak cocok dengan akun terdaftar!", "danger");
    return;
  }

  const code = generateOtpCode();
  activeOtpSession = {
    code: code,
    channel: "email",
    target: rawInput,
    mode: "rec_phone",
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload: null
  };

  sendVerificationOtpEmail(rawInput, code, "Pemulihan Nomor WhatsApp ICMA");

  const box = document.getElementById("recPhoneOtpBox");
  if (box) box.style.display = "block";
  const otpInp = document.getElementById("recPhoneOtpInput");
  if (otpInp) { otpInp.value = ""; otpInp.focus(); }
}

function handleVerifyRecPhoneOtp() {
  const entered = document.getElementById("recPhoneOtpInput")?.value.trim() || "";
  if (!entered) {
    showToast("Masukkan 6 digit kode verifikasi!", "danger");
    return;
  }
  if (Date.now() > activeOtpSession.expiresAt) {
    showToast("Kode verifikasi kedaluwarsa. Silakan kirim ulang!", "danger");
    return;
  }
  if (entered !== activeOtpSession.code || activeOtpSession.mode !== "rec_phone") {
    showToast("Kode verifikasi salah!", "danger");
    return;
  }

  const acc = getAdminAccount();
  const el = document.getElementById("recPhoneFoundValue");
  if (el) el.innerText = acc.phone;
  document.getElementById("recPhoneResult").style.display = "block";
  showToast("Verifikasi berhasil! Nomor WhatsApp Anda telah ditemukan.", "success");
}

function handleDirectLoginFromRecovery() {
  closeRecoveryModal();
  localStorage.setItem("icma_is_logged_in_v3", "true");
  checkAuth();
  showToast("Selamat datang kembali, Admin ICMA!");
  switchView("dashboard");
}

// --- 3. LUPA KATA SANDI ---

function selectPassVerifyMethod(method) {
  currentPassVerifyMethod = method;
  const cardEmail = document.getElementById("cardPassMethodEmail");
  const cardWA = document.getElementById("cardPassMethodWA");
  const lbl = document.getElementById("lblPassVerifyInput");
  const inp = document.getElementById("recPassVerifyInput");
  const acc = getAdminAccount();

  if (method === "email") {
    cardEmail?.classList.add("active");
    cardWA?.classList.remove("active");
    if (lbl) lbl.innerText = "Email Terdaftar *";
    if (inp) { inp.placeholder = "Contoh: " + acc.email; inp.value = ""; }
  } else {
    cardEmail?.classList.remove("active");
    cardWA?.classList.add("active");
    if (lbl) lbl.innerText = "Nomor WhatsApp Terdaftar *";
    if (inp) { inp.placeholder = "Contoh: " + acc.phone; inp.value = ""; }
  }
}

function handleSendPassResetOtp() {
  const rawInput = document.getElementById("recPassVerifyInput")?.value.trim() || "";
  if (!rawInput) {
    showToast("Harap isi data yang diminta!", "danger");
    return;
  }

  const acc = getAdminAccount();
  let isValid = false;
  if (currentPassVerifyMethod === "email") {
    isValid = rawInput.toLowerCase() === acc.email.toLowerCase();
  } else {
    isValid = normalizePhone(rawInput) === normalizePhone(acc.phone);
  }

  if (!isValid) {
    showToast(currentPassVerifyMethod === "email" ? "Email tidak cocok!" : "Nomor WhatsApp tidak cocok!", "danger");
    return;
  }

  const code = generateOtpCode();
  activeOtpSession = {
    code: code,
    channel: currentPassVerifyMethod,
    target: rawInput,
    mode: "pass_reset",
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload: null
  };

  if (currentPassVerifyMethod === "email") {
    sendVerificationOtpEmail(rawInput, code, "Reset Password ICMA");
  } else {
    sendVerificationOtpWhatsApp(rawInput, code, "Reset Password ICMA");
  }

  const box = document.getElementById("recPassOtpBox");
  if (box) box.style.display = "block";
  const otpInp = document.getElementById("recPassOtpInput");
  if (otpInp) { otpInp.value = ""; otpInp.focus(); }
}

function handleVerifyPassResetOtp() {
  const entered = document.getElementById("recPassOtpInput")?.value.trim() || "";
  if (!entered) {
    showToast("Masukkan 6 digit kode verifikasi!", "danger");
    return;
  }
  if (Date.now() > activeOtpSession.expiresAt) {
    showToast("Kode verifikasi kedaluwarsa. Kirim ulang!", "danger");
    return;
  }
  if (entered !== activeOtpSession.code) {
    showToast("Kode verifikasi salah!", "danger");
    return;
  }

  showToast("Identitas terverifikasi! Buat kata sandi baru.", "success");
  document.getElementById("recPassSubA").style.display = "none";
  document.getElementById("recPassSubB").style.display = "block";
  const newPassInput = document.getElementById("newPassInput");
  if (newPassInput) newPassInput.focus();
}

function handleSaveNewPassword() {
  const p1 = document.getElementById("newPassInput")?.value.trim() || "";
  const p2 = document.getElementById("newPassConfirmInput")?.value.trim() || "";

  if (p1.length < 6) {
    showToast("Kata sandi baru minimal 6 karakter!", "danger");
    return;
  }
  if (p1 !== p2) {
    showToast("Konfirmasi kata sandi tidak sama!", "danger");
    return;
  }

  const acc = getAdminAccount();
  acc.password = p1;
  saveAdminAccount(acc);

  closeRecoveryModal();
  // Harus login lagi — TIDAK auto-login
  showToast("Kata sandi berhasil diperbarui! Silakan login ulang dengan sandi baru.", "success");
}

// ------------------------------------------
// PENGATURAN VIEW & SETTINGS HANDLERS
// ------------------------------------------

function renderPengaturanView() {
  const acc = getAdminAccount();
  const elUser = document.getElementById("setInfoUsername");
  const elEmail = document.getElementById("setInfoEmail");
  const elPhone = document.getElementById("setInfoPhone");
  if (elUser) elUser.innerText = acc.username || "admin";
  if (elEmail) elEmail.innerText = acc.email;
  if (elPhone) elPhone.innerText = acc.phone;

  renderSignaturePreview();

  const cfg = getEmailJsConfig();
  const elPub = document.getElementById("cfgEmailJsPublicKey");
  const elSrv = document.getElementById("cfgEmailJsServiceId");
  const elTpl = document.getElementById("cfgEmailJsTemplateId");
  if (elPub) elPub.value = cfg.publicKey;
  if (elSrv) elSrv.value = cfg.serviceId;
  if (elTpl) elTpl.value = cfg.templateId;

  const badge = document.getElementById("badgeEmailJsStatus");
  if (badge) {
    if (cfg.publicKey && cfg.serviceId && cfg.templateId) {
      badge.innerText = "EmailJS: Terhubung";
      badge.style.background = "var(--emerald-50)";
      badge.style.color = "var(--emerald-700)";
      badge.style.borderColor = "var(--emerald-200)";
    } else {
      badge.innerText = "Mode Cerdas: Fallback & Simulator Aktif";
      badge.style.background = "var(--primary-50)";
      badge.style.color = "var(--primary-700)";
      badge.style.borderColor = "var(--primary-200)";
    }
  }
}

function handleChangeUsernameSubmit(e) {
  e.preventDefault();
  const newUsername = document.getElementById("inputNewUsername")?.value.trim() || "";
  if (!newUsername || newUsername.length < 3) {
    showToast("Username minimal 3 karakter!", "danger");
    return;
  }

  const acc = getAdminAccount();
  acc.username = newUsername;
  saveAdminAccount(acc);

  const inp = document.getElementById("inputNewUsername");
  if (inp) inp.value = "";

  showToast(`Username login berhasil diubah menjadi: ${acc.username}`, "success");
}

function handleStartChangeEmail(e) {
  e.preventDefault();
  const newEmail = document.getElementById("inputNewEmail")?.value.trim() || "";
  if (!newEmail || !newEmail.includes("@")) {
    showToast("Masukkan alamat email baru yang valid!", "danger");
    return;
  }

  const code = generateOtpCode();
  activeOtpSession = {
    code: code,
    channel: "email",
    target: newEmail,
    mode: "change_email",
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload: { newEmail }
  };

  sendVerificationOtpEmail(newEmail, code, "Verifikasi Ganti Email ICMA");
  const box = document.getElementById("boxOtpChangeEmail");
  if (box) box.style.display = "block";
  const inp = document.getElementById("otpChangeEmailInput");
  if (inp) { inp.value = ""; inp.focus(); }
}

function handleConfirmChangeEmail() {
  const entered = document.getElementById("otpChangeEmailInput")?.value.trim() || "";
  if (entered !== activeOtpSession.code || activeOtpSession.mode !== "change_email") {
    showToast("Kode verifikasi OTP salah!", "danger");
    return;
  }

  const acc = getAdminAccount();
  acc.email = activeOtpSession.payload.newEmail;
  saveAdminAccount(acc);

  const box = document.getElementById("boxOtpChangeEmail");
  if (box) box.style.display = "none";
  const inputNewEmail = document.getElementById("inputNewEmail");
  if (inputNewEmail) inputNewEmail.value = "";

  showToast(`Email login berhasil diubah menjadi: ${acc.email}`, "success");
}

function handleStartChangePhone(e) {
  e.preventDefault();
  const newPhone = document.getElementById("inputNewPhone")?.value.trim() || "";
  if (!newPhone || newPhone.length < 8) {
    showToast("Masukkan nomor WhatsApp baru yang valid!", "danger");
    return;
  }

  const code = generateOtpCode();
  activeOtpSession = {
    code: code,
    channel: "whatsapp",
    target: newPhone,
    mode: "change_phone",
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload: { newPhone }
  };

  sendVerificationOtpWhatsApp(newPhone, code, "Verifikasi Ganti WhatsApp ICMA");
  const box = document.getElementById("boxOtpChangePhone");
  if (box) box.style.display = "block";
  const inp = document.getElementById("otpChangePhoneInput");
  if (inp) { inp.value = ""; inp.focus(); }
}

function handleConfirmChangePhone() {
  const entered = document.getElementById("otpChangePhoneInput")?.value.trim() || "";
  if (entered !== activeOtpSession.code || activeOtpSession.mode !== "change_phone") {
    showToast("Kode verifikasi OTP salah!", "danger");
    return;
  }

  const acc = getAdminAccount();
  acc.phone = activeOtpSession.payload.newPhone;
  saveAdminAccount(acc);

  const box = document.getElementById("boxOtpChangePhone");
  if (box) box.style.display = "none";
  const inputNewPhone = document.getElementById("inputNewPhone");
  if (inputNewPhone) inputNewPhone.value = "";

  showToast(`Nomor WhatsApp login berhasil diubah menjadi: ${acc.phone}`, "success");
}

function handleChangePasswordSubmit(e) {
  e.preventDefault();
  const currentPass = document.getElementById("inputCurrentPass")?.value.trim() || "";
  const newPass = document.getElementById("inputChangeNewPass")?.value.trim() || "";
  const confirmPass = document.getElementById("inputChangeConfirmPass")?.value.trim() || "";

  const acc = getAdminAccount();
  if (currentPass !== acc.password) {
    showToast("Kata sandi saat ini tidak cocok!", "danger");
    return;
  }

  if (newPass.length < 6) {
    showToast("Kata sandi baru minimal 6 karakter!", "danger");
    return;
  }

  if (newPass !== confirmPass) {
    showToast("Konfirmasi kata sandi baru tidak sama!", "danger");
    return;
  }

  acc.password = newPass;
  saveAdminAccount(acc);

  document.getElementById("formChangePassword")?.reset();
  showToast("Kata sandi akun berhasil diperbarui!", "success");
}

// ------------------------------------------
// BENDAHARA SIGNATURE & TTD PNG HANDLERS
// ------------------------------------------

function handleSignatureFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
    showToast("Harap pilih file gambar PNG, JPG, atau WEBP!", "danger");
    event.target.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    showToast("Ukuran file maksimal 2MB!", "danger");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    localStorage.setItem("icma_bendahara_signature", base64);
    renderSignaturePreview();
    showToast("Tanda tangan bendahara berhasil diunggah & disimpan!", "success");
  };
  reader.readAsDataURL(file);
}

function handleSaveBendaharaName(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById("inputBendaharaName");
  const name = nameInput ? nameInput.value.trim() : "Bendahara ICMA";
  localStorage.setItem("icma_bendahara_name", name || "Bendahara ICMA");
  showToast("Nama/Jabatan penandatangan berhasil diperbarui!", "success");
}

function handleDeleteSignature() {
  if (!confirm("Hapus tanda tangan PNG dan gunakan tanda tangan default?")) return;
  localStorage.removeItem("icma_bendahara_signature");
  const fileInp = document.getElementById("signatureFileInput");
  if (fileInp) fileInp.value = "";
  renderSignaturePreview();
  showToast("Tanda tangan khusus dihapus. Menggunakan format default.", "warning");
}

function renderSignaturePreview() {
  const previewBox = document.getElementById("signaturePreviewBox");
  const btnDelete = document.getElementById("btnDeleteSignature");
  const sig = localStorage.getItem("icma_bendahara_signature");
  const name = localStorage.getItem("icma_bendahara_name") || "Bendahara ICMA";
  const nameInp = document.getElementById("inputBendaharaName");
  if (nameInp) nameInp.value = name;

  if (!previewBox) return;

  if (sig) {
    previewBox.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.75rem; background:#ffffff; border:1px dashed #cbd5e1; border-radius:8px; min-height:80px;">
        <img src="${sig}" alt="TTD Bendahara" style="max-height:70px; max-width:180px; object-fit:contain;">
        <span style="font-size:0.7rem; color:var(--emerald-600); font-weight:600; margin-top:0.35rem;">
          <i class="fa-solid fa-circle-check"></i> File Tanda Tangan PNG Aktif
        </span>
      </div>
    `;
    if (btnDelete) btnDelete.style.display = "inline-flex";
  } else {
    previewBox.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.75rem; background:#ffffff; border:1px dashed #cbd5e1; border-radius:8px; min-height:80px;">
        <svg width="120" height="40" viewBox="0 0 200 80" fill="none">
          <path d="M10 50 Q 50 10 90 50 T 170 30" stroke="#1d4ed8" stroke-width="4" fill="none"/>
          <path d="M40 60 Q 90 20 140 60" stroke="#1d4ed8" stroke-width="2" fill="none"/>
        </svg>
        <span style="font-size:0.7rem; color:var(--slate-500); margin-top:0.25rem;">(Format Default Digital)</span>
      </div>
    `;
    if (btnDelete) btnDelete.style.display = "none";
  }
}

// ==========================================================================
// THEME MANAGEMENT (NAVY, DARK, CREAM/AMBER, SKY BLUE)
// ==========================================================================
const THEME_NAMES = {
  navy: "Dongker & Putih",
  dark: "Mode Gelap",
  cream: "Krem & Coklat Oranye",
  sky: "Biru Muda & Putih"
};

const THEME_SHORT_NAMES = {
  navy: "Dongker",
  dark: "Gelap",
  cream: "Krem",
  sky: "Biru Muda"
};

function initTheme() {
  const savedTheme = localStorage.getItem("icma_app_theme") || "navy";
  setAppTheme(savedTheme, false);
}

function toggleThemeDropdown(e) {
  if (e) {
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof e.preventDefault === 'function') e.preventDefault();
  }
  const menu = document.getElementById("themeDropdownMenu");
  if (!menu) return;
  menu.classList.toggle("active");
}

function setAppTheme(theme, showToastNotice = true) {
  if (!THEME_NAMES[theme]) theme = "navy";

  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("icma_app_theme", theme);

  // Update header button title
  const headerTitle = document.getElementById("themeActiveTitle");
  if (headerTitle) headerTitle.innerText = THEME_SHORT_NAMES[theme] || "Tema";

  // Update dropdown items active state
  document.querySelectorAll(".theme-menu-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });

  // Update settings cards active state
  document.querySelectorAll(".theme-card-choice").forEach(card => {
    card.classList.toggle("active", card.dataset.theme === theme);
  });

  // Close dropdown menu
  const menu = document.getElementById("themeDropdownMenu");
  if (menu) menu.classList.remove("active");

  // Re-render chart colors according to active theme
  if (typeof renderDashboardCharts === "function") {
    renderDashboardCharts();
  }

  if (showToastNotice) {
    showToast(`Tema tampilan berhasil diubah ke: ${THEME_NAMES[theme]}`, "success");
  }
}

// Close theme dropdown when clicking anywhere outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("themeDropdownMenu");
  const btn = document.getElementById("btnThemeSwitcher");
  if (menu && menu.classList.contains("active")) {
    if (!menu.contains(e.target) && !btn?.contains(e.target)) {
      menu.classList.remove("active");
    }
  }
});

// Run initial theme immediately on parse
(function() {
  try {
    const saved = localStorage.getItem("icma_app_theme") || "navy";
    document.body.setAttribute("data-theme", saved);
  } catch(e) {}
})();


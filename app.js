/**
 * Muhibbin Gus Baha - Portal Galeri & Koleksi Tautan YouTube
 * ---------------------------------------------------------
 * Mengelola rendering kartu ceramah, pencarian, pengelompokan kategori,
 * sinkronisasi dinamis dari server, serta penambahan tautan lokal.
 */

// 1. DATASET DEFAULTS (Sebagai cadangan jika berkas JSON gagal dimuat)
const DEFAULT_VIDEOS = [
  {
    "id": "lo_Fedw62vE",
    "title": "Tafsir Jalalain: Kenapa Banyak Orang Tidak Bahagia?",
    "channel": "Official LP3IA",
    "duration": "34:52",
    "category": "Tafsir Al-Qur'an",
    "description": "Kajian mendalam Kitab Tafsir Jalalain bersama Gus Baha mengenai cara-cara menyikapi cobaan dan menghadirkan rasa syukur agar hidup selalu bahagia.",
    "thumbnail": "https://img.youtube.com/vi/lo_Fedw62vE/hqdefault.jpg"
  },
  {
    "id": "4Qiiv22YlLs",
    "title": "Tafsir Jalalain: Tafsir Ayat-Ayat Syukur dan Sabar",
    "channel": "Official LP3IA",
    "duration": "51:04",
    "category": "Tafsir Al-Qur'an",
    "description": "Kajian tafsir surah-surah Al-Qur'an, menelusuri bagaimana Allah menggambarkan karakter hamba yang sabar dan pandai bersyukur.",
    "thumbnail": "https://img.youtube.com/vi/4Qiiv22YlLs/hqdefault.jpg"
  },
  {
    "id": "0k5F-8K_sI4",
    "title": "Ngaji Bareng Gus Baha: Peluncuran Ulang Al-Qur'an dan Terjemahan Kemenag",
    "channel": "Official LP3IA",
    "duration": "45:12",
    "category": "Tafsir Al-Qur'an",
    "description": "Kajian spesial dalam peluncuran ulang Al-Qur'an terjemahan Kemenag RI, membahas metodologi pemahaman ayat suci secara kontekstual.",
    "thumbnail": "https://img.youtube.com/vi/0k5F-8K_sI4/hqdefault.jpg"
  },
  {
    "id": "-MRXL2aS2io",
    "title": "Tafsir Al-Qur'an: Ayat-Ayat Pilihan yang Penuh Rahmat",
    "channel": "Santri Gayeng",
    "duration": "25:30",
    "category": "Tafsir Al-Qur'an",
    "description": "Menguraikan beberapa ayat pilihan yang menyejukkan hati dan menunjukkan betapa luasnya kasih sayang dan ampunan Allah SWT.",
    "thumbnail": "https://img.youtube.com/vi/-MRXL2aS2io/hqdefault.jpg"
  },
  {
    "id": "GVVauLw8fD0",
    "title": "Kitab Hikam: Konsep Rida terhadap Takdir Allah",
    "channel": "Official LP3IA",
    "duration": "42:15",
    "category": "Kitab Tasawuf",
    "description": "Penjelasan untaian hikmah dari Kitab Al-Hikam karya Ibnu Athaillah As-Sakandari mengenai konsep rida terhadap seluruh ketetapan takdir Allah.",
    "thumbnail": "https://img.youtube.com/vi/GVVauLw8fD0/hqdefault.jpg"
  },
  {
    "id": "zBu_4PofhBI",
    "title": "Kitab Hikam: Hakikat Rezeki dan Keberkahan Hidup",
    "channel": "Official LP3IA",
    "duration": "36:18",
    "category": "Kitab Tasawuf",
    "description": "Menjelaskan esensi rezeki menurut kacamata tasawuf, di mana rezeki batiniah berupa ketenangan hati jauh lebih utama dibanding materi semata.",
    "thumbnail": "https://img.youtube.com/vi/zBu_4PofhBI/hqdefault.jpg"
  },
  {
    "id": "_6D1hs1mEY8",
    "title": "Kitab Hikam: Ibadah Selama Apapun Tak Akan Cukup untuk Beli Surga",
    "channel": "Official LP3IA",
    "duration": "38:40",
    "category": "Kitab Tasawuf",
    "description": "Kajian mendalam tentang hakikat ibadah dan rahmat Allah SWT. Gus Baha menjelaskan secara logis mengapa surga diperoleh karena rahmat-Nya.",
    "thumbnail": "https://img.youtube.com/vi/_6D1hs1mEY8/hqdefault.jpg"
  },
  {
    "id": "zqnHe1Ru4Hc",
    "title": "Kitab Hikam: Cara Ber-Nego dengan Tuhan dalam Doa",
    "channel": "Santri Gayeng",
    "duration": "30:15",
    "category": "Kitab Tasawuf",
    "description": "Menjelaskan bab kepasrahan dan pengharapan dalam berdoa kepada Allah, berdasar ajaran para wali di Kitab Hikam.",
    "thumbnail": "https://img.youtube.com/vi/zqnHe1Ru4Hc/hqdefault.jpg"
  },
  {
    "id": "81Bn_KrA3WI",
    "title": "Hikmah & Fiqih: Cara Menyikapi Perbedaan Pandangan Fiqih",
    "channel": "Official LP3IA",
    "duration": "28:10",
    "category": "Fiqih & Hukum",
    "description": "Pandangan fiqih yang luwes dan logis khas Gus Baha dalam mengurai problematika fiqih sehari-hari dan bagaimana menyikapi perbedaan pandangan.",
    "thumbnail": "https://img.youtube.com/vi/81Bn_KrA3WI/hqdefault.jpg"
  },
  {
    "id": "DH2Ksi6E6iY",
    "title": "Fiqih Logika: Hubungan Sifat Mendengar dan Mengetahui",
    "channel": "Santri Gayeng",
    "duration": "35:10",
    "category": "Fiqih & Hukum",
    "description": "Diskusi teologis dan fiqih mengenai sifat-sifat wajib bagi Allah dan implementasinya dalam keyakinan tauhid yang kokoh.",
    "thumbnail": "https://img.youtube.com/vi/DH2Ksi6E6iY/hqdefault.jpg"
  },
  {
    "id": "x744J85iY8w",
    "title": "Fiqih Sosial: Bukti Nyata Islam Bukan Cuma Milik Orang Arab!",
    "channel": "Official LP3IA",
    "duration": "29:30",
    "category": "Fiqih & Hukum",
    "description": "Kajian tentang universalitas hukum Islam yang adaptif dengan tradisi lokal nusantara selama tidak melanggar syariat inti.",
    "thumbnail": "https://img.youtube.com/vi/x744J85iY8w/hqdefault.jpg"
  },
  {
    "id": "m6yAZ4iEMpg",
    "title": "Ceramah Umum: Beragama Secara Simpel dan Santai",
    "channel": "Official LP3IA",
    "duration": "25:40",
    "category": "Ceramah Umum",
    "description": "Pentingnya beragama dengan cara yang menyenangkan, tidak mempersulit umat, serta bersikap moderat dalam berdakwah.",
    "thumbnail": "https://img.youtube.com/vi/m6yAZ4iEMpg/hqdefault.jpg"
  },
  {
    "id": "kYv_kHhH2Sg",
    "title": "Logika Keimanan: Kebaikan Tanpa Tuhan & Menghadapi Tabiat Perempuan",
    "channel": "Santri Gayeng",
    "duration": "48:15",
    "category": "Ceramah Umum",
    "description": "Kajian penuh hikmah tentang logika keimanan dalam menjawab argumen ateisme, serta nasihat bijak membina rumah tangga islami yang harmonis.",
    "thumbnail": "https://img.youtube.com/vi/kYv_kHhH2Sg/hqdefault.jpg"
  },
  {
    "id": "c5ZEXh7feNw",
    "title": "Dialog Ilmiah: Ngaji Penuh Humor Ilmiah bersama Prof. Quraish Shihab",
    "channel": "Official LP3IA",
    "duration": "1:15:30",
    "category": "Ceramah Umum",
    "description": "Pertemuan hangat dua ulama besar Indonesia, mendiskusikan khazanah tafsir, hukum Islam, dan dakwah ramah di era modern.",
    "thumbnail": "https://img.youtube.com/vi/c5ZEXh7feNw/hqdefault.jpg"
  },
  {
    "id": "d_2a5k3H6r0",
    "title": "Tematik: Agar Hidup Mudah Bersyukur yang Benar",
    "channel": "Official LP3IA",
    "duration": "36:45",
    "category": "Ceramah Umum",
    "description": "Gus Baha menjabarkan seni bersyukur yang sesungguhnya secara teologis dan psikologis agar terhindar dari rasa dengki dan stres.",
    "thumbnail": "https://img.youtube.com/vi/d_2a5k3H6r0/hqdefault.jpg"
  },
  {
    "id": "2z-bqgloByU",
    "title": "Tematik: Serius, Hal Sederhana Ini Bikin Masuk Surga",
    "channel": "Santri Gayeng",
    "duration": "22:15",
    "category": "Ceramah Umum",
    "description": "Kajian ringan dengan pesan mendalam bahwa jalan menuju surga itu luas dan dapat diraih lewat amalan-amalan kecil yang ikhlas.",
    "thumbnail": "https://img.youtube.com/vi/2z-bqgloByU/hqdefault.jpg"
  }
];

// STATE APLIKASI
let playlist = [];
let filteredPlaylist = [];
let categoriesList = [];

// DOM ELEMENTS
const lecturesGrid = document.getElementById("lecturesGrid");
const videoCountBadge = document.getElementById("videoCountBadge");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const categoryTabs = document.getElementById("categoryTabs");

// STATS DOM ELEMENTS
const statTotalVids = document.getElementById("statTotalVids");
const statTotalCats = document.getElementById("statTotalCats");
const statLastUpdate = document.getElementById("statLastUpdate");

// ACTIONS DOM ELEMENTS
const syncBtn = document.getElementById("syncBtn");
const syncIcon = document.getElementById("syncIcon");
const addVideoBtn = document.getElementById("addVideoBtn");
const addVideoModal = document.getElementById("addVideoModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const addVideoForm = document.getElementById("addVideoForm");
const installPwaBtn = document.getElementById("installPwaBtn");
const toastContainer = document.getElementById("toastContainer");

// 2. INITIAL DATA LOADING & SERVER SYNC
async function loadInitialData(isSyncRequest = false) {
  if (isSyncRequest && syncIcon) {
    syncIcon.classList.add("rotating");
    syncBtn.disabled = true;
  }

  // A. Muat data default bawaan
  let serverList = [];
  try {
    // Tambahkan timestamp untuk menghindari caching peramban
    const response = await fetch(`./lectures.json?t=${new Date().getTime()}`);
    if (response.ok) {
      serverList = await response.json();
      console.log("Data ceramah berhasil dimuat dari server:", serverList.length);
      
      // Update info sinkronisasi terakhir
      const today = new Date();
      const timeString = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";
      localStorage.setItem("gusbaha_last_sync", timeString);
      statLastUpdate.textContent = timeString;
    } else {
      throw new Error("Respon server bermasalah");
    }
  } catch (error) {
    console.warn("Gagal memuat lectures.json, menggunakan data cadangan.", error);
    serverList = [...DEFAULT_VIDEOS];
    
    // Set fallback time
    if (!localStorage.getItem("gusbaha_last_sync")) {
      statLastUpdate.textContent = "Offline (Lokal)";
    } else {
      statLastUpdate.textContent = localStorage.getItem("gusbaha_last_sync");
    }
  }

  // B. Muat data kustom dari LocalStorage
  const customStored = localStorage.getItem("gusbaha_custom_videos");
  let customList = [];
  if (customStored) {
    try {
      customList = JSON.parse(customStored);
    } catch (e) {
      console.error("Gagal membaca data LocalStorage:", e);
    }
  }

  // C. Gabungkan keduanya secara unik berdasarkan Video ID
  const allIds = new Set();
  playlist = [];

  // Pertama masukkan item server
  serverList.forEach(vid => {
    if (!allIds.has(vid.id)) {
      allIds.add(vid.id);
      playlist.push(vid);
    }
  });

  // Kedua masukkan item kustom
  customList.forEach(vid => {
    if (!allIds.has(vid.id)) {
      allIds.add(vid.id);
      playlist.push(vid);
    }
  });

  filteredPlaylist = [...playlist];

  // D. Selesaikan UI state sinkronisasi
  if (isSyncRequest) {
    setTimeout(() => {
      if (syncIcon) syncIcon.classList.remove("rotating");
      syncBtn.disabled = false;
      showToast("Koleksi Tautan Berhasil Diperbarui!");
    }, 800);
  }

  // E. Hitung statistik & render
  updateStats();
  applyFilters();
}

// UPDATE STATISTIK KOLEKSI
function updateStats() {
  statTotalVids.textContent = playlist.length;
  
  // Hitung jumlah kategori unik
  const cats = new Set();
  playlist.forEach(vid => cats.add(vid.category));
  statTotalCats.textContent = cats.size;
  
  const lastSync = localStorage.getItem("gusbaha_last_sync");
  if (lastSync) {
    statLastUpdate.textContent = lastSync;
  } else {
    statLastUpdate.textContent = "Baru Saja";
  }
}

// 3. RENDERING KARTU GALERI LECTURES
function renderGallery() {
  lecturesGrid.innerHTML = "";
  
  if (filteredPlaylist.length === 0) {
    lecturesGrid.innerHTML = `
      <div class="empty-state">
        <i data-lucide="info" style="width: 48px; height: 48px; color: var(--clr-gold); opacity: 0.7;"></i>
        <p>Ceramah Gus Baha tidak ditemukan. Coba gunakan filter atau kata kunci pencarian lain.</p>
      </div>
    `;
    videoCountBadge.textContent = "0 Video";
    if (window.lucide) lucide.createIcons();
    return;
  }
  
  videoCountBadge.textContent = `${filteredPlaylist.length} Video`;
  
  filteredPlaylist.forEach(video => {
    const card = document.createElement("article");
    card.className = "lecture-card";
    
    // Tautan youtube orisinil
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;
    
    card.innerHTML = `
      <div class="card-thumb">
        <img src="${video.thumbnail}" alt="Thumbnail ${video.title}" loading="lazy">
        <span class="duration-badge">${video.duration}</span>
        <div class="play-overlay">
          <div class="play-circle">
            <i data-lucide="play" style="fill: var(--bg-deepest); stroke: none;"></i>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-cat-badge">${video.category}</span>
          <span class="card-channel">${video.channel}</span>
        </div>
        <h3 class="card-title">${video.title}</h3>
        <p class="card-desc">${video.description}</p>
        <div class="card-actions">
          <a href="${youtubeUrl}" target="_blank" rel="noopener" class="listen-btn" title="Dengarkan di YouTube">
            <i data-lucide="external-link"></i>
            <span>Dengarkan</span>
          </a>
          <button class="share-btn" title="Salin Tautan Video">
            <i data-lucide="copy"></i>
            <span>Salin</span>
          </button>
        </div>
      </div>
    `;
    
    // Event listener untuk tombol "Salin"
    const shareBtn = card.querySelector(".share-btn");
    shareBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      navigator.clipboard.writeText(youtubeUrl).then(() => {
        showToast("Tautan YouTube berhasil disalin!");
      }).catch(err => {
        // Fallback jika Clipboard API gagal
        const tempInput = document.createElement("input");
        tempInput.value = youtubeUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Tautan YouTube berhasil disalin!");
      });
    });

    // Klik pada thumbnail atau kartu juga langsung membuka YouTube
    const thumbArea = card.querySelector(".card-thumb");
    const titleArea = card.querySelector(".card-title");
    [thumbArea, titleArea].forEach(elem => {
      elem.addEventListener("click", () => {
        window.open(youtubeUrl, "_blank", "noopener");
      });
    });
    
    lecturesGrid.appendChild(card);
  });
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

// 4. FILTERING & LIVE SEARCH
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length > 0) {
    clearSearchBtn.style.display = "block";
  } else {
    clearSearchBtn.style.display = "none";
  }
  
  applyFilters();
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const activeTab = categoryTabs.querySelector('.cat-btn.active');
  const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
  
  filteredPlaylist = playlist.filter(video => {
    const matchesQuery = video.title.toLowerCase().includes(query) || 
                         video.description.toLowerCase().includes(query);
                         
    // Jika Kategori Kustom / Tautan Anda dipilih
    if (selectedCategory === "Kustom / Muhibbin") {
      return matchesQuery && video.channel === "Kustom / Muhibbin";
    }
    
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });
  
  renderGallery();
}

// 5. INPUT VIDEO BARU (LOCAL STORAGE)
function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  } else if (url.trim().length === 11) {
    return url.trim();
  }
  return null;
}

function handleAddVideo() {
  const urlInput = document.getElementById("videoUrl").value.trim();
  const titleInput = document.getElementById("videoTitle").value.trim();
  const catInput = document.getElementById("videoCategory").value;
  const descInput = document.getElementById("videoDescription").value.trim();
  
  const videoId = extractYouTubeId(urlInput);
  
  if (!videoId) {
    alert("Tautan YouTube atau Video ID tidak valid! Harap masukkan format link yang benar.");
    return;
  }
  
  // Cek duplikasi
  if (playlist.some(v => v.id === videoId)) {
    alert("Video ini sudah terdaftar di dalam playlist!");
    return;
  }
  
  const newVideo = {
    id: videoId,
    title: titleInput,
    channel: "Kustom / Muhibbin",
    duration: "00:00", // Default dummy duration
    category: catInput,
    description: descInput || "Tautan pengajian tambahan yang dimasukkan secara lokal oleh pengguna.",
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  };
  
  // Simpan ke array
  playlist.push(newVideo);
  
  // Dapatkan video custom lama untuk di-merge ke LocalStorage
  const customStored = localStorage.getItem("gusbaha_custom_videos");
  let customList = [];
  if (customStored) {
    try {
      customList = JSON.parse(customStored);
    } catch(e) {}
  }
  customList.push(newVideo);
  localStorage.setItem("gusbaha_custom_videos", JSON.stringify(customList));
  
  // Reset Form & Tutup Modal
  addVideoForm.reset();
  addVideoModal.classList.remove("open");
  
  // Re-render
  updateStats();
  applyFilters();
  showToast("Pengajian baru berhasil ditambahkan!");
}

// 6. UTILITIES (TOAST NOTIFICATIONS)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i data-lucide="check-circle" style="color: var(--clr-gold); width: 20px; height: 20px;"></i>
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();
  
  // Animate in
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  // Animate out
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// 7. EVENT LISTENERS SETUP
function setupEventListeners() {
  // Live Search Input
  searchInput.addEventListener('input', handleSearch);
  
  // Tombol Hapus Input Pencarian
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    applyFilters();
  });
  
  // Filter Kategori
  categoryTabs.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest('.cat-btn');
    if (!clickedBtn) return;
    
    categoryTabs.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
    
    applyFilters();
  });
  
  // Sinkronisasi Manual
  syncBtn.addEventListener('click', () => {
    loadInitialData(true);
  });
  
  // Modal Buka & Tutup
  addVideoBtn.addEventListener('click', () => {
    addVideoModal.classList.add('open');
  });
  
  closeModalBtn.addEventListener('click', () => {
    addVideoModal.classList.remove('open');
  });
  
  addVideoModal.addEventListener('click', (e) => {
    if (e.target === addVideoModal) {
      addVideoModal.classList.remove('open');
    }
  });
  
  addVideoForm.addEventListener('submit', handleAddVideo);
}

// 8. PWA SERVICE WORKER & TOMBOL INSTALASI
function setupPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('PWA ServiceWorker registered. Scope:', reg.scope))
        .catch((err) => console.error('PWA ServiceWorker registration failed:', err));
    });
  }

  // Menangani Instalasi Aplikasi
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installPwaBtn) {
      installPwaBtn.style.display = 'inline-flex';
      if (window.lucide) lucide.createIcons();
    }
  });

  if (installPwaBtn) {
    installPwaBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA Install Choice Outcome: ${outcome}`);
      
      deferredPrompt = null;
      installPwaBtn.style.display = 'none';
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('PWA Muhibbin Gus Baha installed successfully');
    if (installPwaBtn) installPwaBtn.style.display = 'none';
    deferredPrompt = null;
  });
}

// INIASIALISASI APLIKASI
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadInitialData();
  setupPwa();
  
  if (window.lucide) {
    lucide.createIcons();
  }
});

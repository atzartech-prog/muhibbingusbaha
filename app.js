/**
 * Muhibbin Gus Baha - Portal Koleksi Tautan YouTube Sederhana
 */

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

// DOM ELEMENTS
const linksContainer = document.getElementById("linksContainer");
const videoCountBadge = document.getElementById("videoCountBadge");
const syncTimeBadge = document.getElementById("syncTimeBadge");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// ACTIONS DOM ELEMENTS
const syncBtn = document.getElementById("syncBtn");
const syncIcon = document.getElementById("syncIcon");
const addVideoBtn = document.getElementById("addVideoBtn");
const addVideoModal = document.getElementById("addVideoModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const addVideoForm = document.getElementById("addVideoForm");
const installPwaBtn = document.getElementById("installPwaBtn");
const toastContainer = document.getElementById("toastContainer");

// 1. DATA INITIALIZER & SINKRONISASI
async function loadInitialData(isSyncRequest = false) {
  if (isSyncRequest && syncIcon) {
    syncIcon.classList.add("rotating");
    syncBtn.disabled = true;
  }

  let serverList = [];
  try {
    const response = await fetch(`./lectures.json?t=${new Date().getTime()}`);
    if (response.ok) {
      serverList = await response.json();
      const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";
      localStorage.setItem("gusbaha_last_sync", timeString);
      syncTimeBadge.textContent = "Sinkronisasi: " + timeString;
    } else {
      throw new Error();
    }
  } catch (error) {
    serverList = [...DEFAULT_VIDEOS];
    const lastSync = localStorage.getItem("gusbaha_last_sync");
    syncTimeBadge.textContent = lastSync ? "Sinkronisasi: " + lastSync : "Basis data: Lokal";
  }

  // Muat data kustom lokal
  const customStored = localStorage.getItem("gusbaha_custom_videos");
  let customList = [];
  if (customStored) {
    try {
      customList = JSON.parse(customStored);
    } catch (e) {}
  }

  // Gabungkan unik berdasarkan Video ID
  const allIds = new Set();
  playlist = [];

  serverList.forEach(vid => {
    if (!allIds.has(vid.id)) {
      allIds.add(vid.id);
      playlist.push(vid);
    }
  });

  customList.forEach(vid => {
    if (!allIds.has(vid.id)) {
      allIds.add(vid.id);
      playlist.push(vid);
    }
  });

  filteredPlaylist = [...playlist];

  if (isSyncRequest) {
    setTimeout(() => {
      if (syncIcon) syncIcon.classList.remove("rotating");
      syncBtn.disabled = false;
      showToast("Tautan berhasil diperbarui!");
    }, 800);
  }

  applyFilters();
}

// 2. RENDERING LINK LIST GROUPED BY CATEGORY
function renderLinkList() {
  linksContainer.innerHTML = "";
  
  if (filteredPlaylist.length === 0) {
    linksContainer.innerHTML = `
      <div class="empty-state">
        <i data-lucide="info" style="width: 36px; height: 36px; color: var(--clr-gold); opacity: 0.7; margin-bottom: 10px;"></i>
        <p>Tidak ada link ceramah yang cocok.</p>
      </div>
    `;
    videoCountBadge.textContent = "0 Tautan";
    if (window.lucide) lucide.createIcons();
    return;
  }
  
  videoCountBadge.textContent = `${filteredPlaylist.length} Tautan`;
  
  // Kelompokkan data berdasarkan Kategori
  const grouped = {};
  filteredPlaylist.forEach(video => {
    const cat = video.category || "Umum";
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(video);
  });

  // Tentukan urutan kategori agar konsisten
  const categoriesOrder = ["Tafsir Al-Qur'an", "Kitab Tasawuf", "Fiqih & Hukum", "Ceramah Umum", "Kustom / Muhibbin"];
  
  // Ambil juga kategori dinamis yang di luar default
  Object.keys(grouped).forEach(cat => {
    if (!categoriesOrder.includes(cat)) {
      categoriesOrder.push(cat);
    }
  });

  // Render per Kategori
  categoriesOrder.forEach(categoryName => {
    const listVideos = grouped[categoryName];
    if (!listVideos || listVideos.length === 0) return;

    // A. Buat Header Kategori
    const sectionElement = document.createElement("section");
    sectionElement.className = "category-section";
    
    sectionElement.innerHTML = `
      <h2 class="category-title">
        <i data-lucide="folder" class="category-icon"></i>
        <span>${categoryName}</span>
        <span class="category-count">${listVideos.length}</span>
      </h2>
      <div class="links-list"></div>
    `;

    const listContainer = sectionElement.querySelector(".links-list");

    // B. Masukkan baris link di dalamnya
    listVideos.forEach(video => {
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;
      const linkItem = document.createElement("div");
      linkItem.className = "link-item";
      
      linkItem.innerHTML = `
        <a href="${youtubeUrl}" target="_blank" rel="noopener" class="link-anchor" title="Buka di YouTube / Aplikasi">
          <div class="link-left">
            <span class="link-play-icon">
              <i data-lucide="youtube"></i>
            </span>
            <div class="link-texts">
              <h3 class="link-title">${video.title}</h3>
              <div class="link-meta">
                <span class="meta-channel">${video.channel}</span>
                <span class="meta-dot">&bull;</span>
                <span class="meta-duration">${video.duration}</span>
                ${video.description ? `<span class="meta-dot">&bull;</span><span class="meta-desc-preview">${video.description}</span>` : ''}
              </div>
            </div>
          </div>
        </a>
        <button class="link-copy-btn" title="Salin Tautan">
          <i data-lucide="copy"></i>
        </button>
      `;

      // Event listener tombol salin
      const copyBtn = linkItem.querySelector(".link-copy-btn");
      copyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        navigator.clipboard.writeText(youtubeUrl).then(() => {
          showToast("Link disalin!");
        }).catch(() => {
          const temp = document.createElement("input");
          temp.value = youtubeUrl;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          showToast("Link disalin!");
        });
      });

      listContainer.appendChild(linkItem);
    });

    linksContainer.appendChild(sectionElement);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 3. PENCARIAN & FILTER
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
  
  filteredPlaylist = playlist.filter(video => {
    return video.title.toLowerCase().includes(query) || 
           video.category.toLowerCase().includes(query) ||
           video.description.toLowerCase().includes(query);
  });
  
  renderLinkList();
}

// 4. INPUT LINK KUSTOM LOKAL
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
    alert("Tautan YouTube tidak valid! Masukkan format URL YouTube yang benar.");
    return;
  }
  
  if (playlist.some(v => v.id === videoId)) {
    alert("Tautan ini sudah ada di dalam list!");
    return;
  }
  
  const newVideo = {
    id: videoId,
    title: titleInput,
    channel: "Kustom / Muhibbin",
    duration: "00:00",
    category: catInput,
    description: descInput || "Ditambahkan oleh pengguna.",
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  };
  
  playlist.push(newVideo);
  
  const customStored = localStorage.getItem("gusbaha_custom_videos");
  let customList = [];
  if (customStored) {
    try {
      customList = JSON.parse(customStored);
    } catch(e) {}
  }
  customList.push(newVideo);
  localStorage.setItem("gusbaha_custom_videos", JSON.stringify(customList));
  
  addVideoForm.reset();
  addVideoModal.classList.remove("open");
  
  applyFilters();
  showToast("Tautan baru berhasil disimpan!");
}

// 5. TOAST UTILITY
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i data-lucide="check-circle" style="color: var(--clr-gold); width: 16px; height: 16px;"></i>
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();
  
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

// 6. EVENT LISTENERS SETUP
function setupEventListeners() {
  searchInput.addEventListener('input', handleSearch);
  
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    applyFilters();
  });
  
  syncBtn.addEventListener('click', () => {
    loadInitialData(true);
  });
  
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

// 7. PWA SERVICE WORKER & TOMBOL INSTALASI APLIKASI
function setupPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('ServiceWorker registered'))
        .catch((err) => console.error('ServiceWorker failed', err));
    });
  }

  const pwaBanner = document.getElementById("pwaBanner");
  const pwaInstruction = document.getElementById("pwaInstruction");
  const pwaInstallActionBtn = document.getElementById("pwaInstallActionBtn");
  const pwaDismissBtn = document.getElementById("pwaDismissBtn");

  // Cek apakah aplikasi sudah berjalan dalam mode standalone PWA
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const isDismissed = localStorage.getItem("gusbaha_pwa_dismissed") === "true";
  
  if (isStandalone) {
    console.log("App is running in standalone PWA mode");
    return;
  }

  // Deteksi perangkat iOS (Safari)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS && !isDismissed) {
    if (pwaBanner && pwaInstruction && pwaInstallActionBtn) {
      pwaBanner.style.display = "block";
      setTimeout(() => pwaBanner.classList.add("show"), 100);
      
      pwaInstruction.innerHTML = 'Klik tombol bagikan <i data-lucide="share" style="width:14px;height:14px;vertical-align:middle;color:var(--clr-gold);"></i> lalu pilih <strong>"Tambahkan ke Layar Utama"</strong>.';
      pwaInstallActionBtn.style.display = "none";
      
      if (window.lucide) lucide.createIcons();
    }
  }

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Tampilkan tombol instal di header
    if (installPwaBtn) {
      installPwaBtn.style.display = 'inline-flex';
      if (window.lucide) lucide.createIcons();
    }

    // Tampilkan banner di bagian bawah jika belum di-dismiss
    if (pwaBanner && !isDismissed) {
      pwaBanner.style.display = "block";
      setTimeout(() => pwaBanner.classList.add("show"), 100);
    }
  });

  // Aksi instalasi pada banner bawah
  if (pwaInstallActionBtn) {
    pwaInstallActionBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA Prompt Outcome: ${outcome}`);
      
      deferredPrompt = null;
      if (pwaBanner) {
        pwaBanner.classList.remove("show");
        setTimeout(() => pwaBanner.style.display = "none", 300);
      }
      if (installPwaBtn) installPwaBtn.style.display = 'none';
    });
  }

  // Aksi abaikan banner bawah
  if (pwaDismissBtn) {
    pwaDismissBtn.addEventListener('click', () => {
      if (pwaBanner) {
        pwaBanner.classList.remove("show");
        setTimeout(() => pwaBanner.style.display = "none", 300);
      }
      localStorage.setItem("gusbaha_pwa_dismissed", "true");
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    if (pwaBanner) {
      pwaBanner.classList.remove("show");
      setTimeout(() => pwaBanner.style.display = "none", 300);
    }
    if (installPwaBtn) installPwaBtn.style.display = 'none';
    deferredPrompt = null;
  });
}

// 8. TEMA TERANG / GELAP
function setupTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  
  if (!themeToggleBtn || !themeIcon) return;

  // Baca tema dari local storage, default adalah dark
  const currentTheme = localStorage.getItem("gusbaha_theme") || "dark";
  
  // Terapkan tema saat awal muat
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.setAttribute("data-lucide", "moon");
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeIcon.setAttribute("data-lucide", "sun");
  }
  
  // Listener klik ganti tema
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.setAttribute("data-lucide", "sun");
      localStorage.setItem("gusbaha_theme", "dark");
      showToast("Mode gelap aktif");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.setAttribute("data-lucide", "moon");
      localStorage.setItem("gusbaha_theme", "light");
      showToast("Mode terang aktif");
    }
    
    if (window.lucide) {
      lucide.createIcons();
    }
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupEventListeners();
  loadInitialData();
  setupPwa();
});

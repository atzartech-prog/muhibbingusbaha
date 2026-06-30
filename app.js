/**
 * Muhibbin Gus Baha - Portal Audio & Video Player
 * ----------------------------------------------
 * Integrasi API YouTube resmi untuk menonton & mendengarkan pengajian KH Bahauddin Nursalim.
 */

// 1. DATASET DEFAULTS (Pengajian Resmi LP3IA)
const DEFAULT_VIDEOS = [
    {
        id: "X8vB4zO_B_Y",
        title: "Tafsir Jalalain: Hakikat Bersyukur dalam Keadaan Sempit",
        channel: "Official LP3IA",
        duration: "34:52",
        category: "Tafsir Jalalain",
        description: "Kajian mendalam Kitab Tafsir Jalalain bersama Gus Baha mengenai cara-cara para Nabi menyikapi cobaan dan menghadirkan rasa syukur.",
        thumbnail: "https://img.youtube.com/vi/X8vB4zO_B_Y/hqdefault.jpg"
    },
    {
        id: "n4P_T9e_5fM",
        title: "Kitab Hikam: Rahasia Keikhlasan dan Ma'rifatullah",
        channel: "Official LP3IA",
        duration: "42:15",
        category: "Kitab Hikam",
        description: "Penjelasan untaian hikmah dari Kitab Al-Hikam karya Ibnu Athaillah As-Sakandari mengenai maqam ikhlas dan mendekatkan diri kepada Allah.",
        thumbnail: "https://img.youtube.com/vi/n4P_T9e_5fM/hqdefault.jpg"
    },
    {
        id: "5XyC2FvP5Gk",
        title: "Hikmah & Fiqih: Solusi Syariat Menghadapi Masalah Ekonomi",
        channel: "Official LP3IA",
        duration: "28:10",
        category: "Hikmah & Fiqih",
        description: "Pandangan fiqih yang luwes dan logis khas Gus Baha dalam mengurai problematika ekonomi rumah tangga di era modern sesuai syariat.",
        thumbnail: "https://img.youtube.com/vi/5XyC2FvP5Gk/hqdefault.jpg"
    },
    {
        id: "wJpxeXpGfSg",
        title: "Umum: Cara Mengaji Secara Benar Agar Tidak Tersesat",
        channel: "Official LP3IA",
        duration: "25:40",
        category: "Umum",
        description: "Pentingnya sanad keilmuan dan bagaimana menyikapi perbedaan mazhab dengan hati yang lapang sesuai tuntunan ulama salaf.",
        thumbnail: "https://img.youtube.com/vi/wJpxeXpGfSg/hqdefault.jpg"
    },
    {
        id: "z-Fm9pWbL_E",
        title: "Tafsir Jalalain: Pembahasan Tafsir Surah Al-Kahfi",
        channel: "Official LP3IA",
        duration: "51:04",
        category: "Tafsir Jalalain",
        description: "Kajian surah Al-Kahfi, kisah Ashabul Kahfi, dan hikmah tersembunyi di balik bertemunya Nabi Musa as dan Nabi Khidir as.",
        thumbnail: "https://img.youtube.com/vi/z-Fm9pWbL_E/hqdefault.jpg"
    },
    {
        id: "9i4q0D0i2fI",
        title: "Kitab Hikam: Pentingnya Menghormati Manusia & Sesama",
        channel: "Official LP3IA",
        duration: "36:18",
        category: "Kitab Hikam",
        description: "Menghilangkan kesombongan rohani (kibr) dan memahami bahwa rahmat Allah sangat luas, mencakup seluruh makhluk.",
        thumbnail: "https://img.youtube.com/vi/9i4q0D0i2fI/hqdefault.jpg"
    }
];

// STATE APLIKASI
let playlist = [];
let filteredPlaylist = [];
let currentVideoIndex = 0;
let currentMode = "video"; // "video" atau "audio"
let isPlayerReady = false;
let progressUpdateInterval;

// Konfigurasi Playlist Loops
let isShuffle = false;
let isLoop = false; // false = no loop, true = loop active track

// DOM ELEMENTS
const playlistItemsContainer = document.getElementById("playlistItems");
const videoCountBadge = document.getElementById("videoCountBadge");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const categoryTabsContainer = document.getElementById("categoryTabs");

// DOM PLAYER ELEMENTS
const videoContainer = document.getElementById("videoContainer");
const audioContainer = document.getElementById("audioContainer");
const playerOverlay = document.getElementById("playerOverlay");
const audioLabelTitle = document.getElementById("audioLabelTitle");
const currentTrackTitle = document.getElementById("currentTrackTitle");
const currentTrackChannel = document.getElementById("currentTrackChannel");

const progressBar = document.getElementById("progressBar");
const currentTimeLabel = document.getElementById("currentTimeLabel");
const totalTimeLabel = document.getElementById("totalTimeLabel");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const loopBtn = document.getElementById("loopBtn");

const volumeBar = document.getElementById("volumeBar");
const volumeMuteBtn = document.getElementById("volumeMuteBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumeValue = document.getElementById("volumeValue");

// MODAL ELEMENTS
const addVideoBtn = document.getElementById("addVideoBtn");
const addVideoModal = document.getElementById("addVideoModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const addVideoForm = document.getElementById("addVideoForm");

// PWA INSTALL BUTTON
const installPwaBtn = document.getElementById("installPwaBtn");

// 2. YOUTUBE IFRAME API LOAD
// Load YouTube Iframe Player API secara asinkron
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayer;

// Fungsi callback otomatis saat API YouTube siap
window.onYouTubeIframeAPIReady = function() {
    console.log("YouTube API is ready");
    initPlayer();
};

function initPlayer() {
    // Muat video pertama sebagai default cue
    const defaultVideoId = playlist.length > 0 ? playlist[0].id : "X8vB4zO_B_Y";
    
    ytPlayer = new YT.Player('youtubePlayer', {
        height: '100%',
        width: '100%',
        videoId: defaultVideoId,
        playerVars: {
            'playsinline': 1,
            'controls': 0, // Kita buat panel kontrol premium kita sendiri
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    if (playerOverlay) {
        playerOverlay.style.opacity = '0';
        setTimeout(() => playerOverlay.style.display = 'none', 500);
    }
    
    // Set volume default
    ytPlayer.setVolume(volumeBar.value);
    
    // Sinkronisasi data awal trek aktif
    updateActiveTrackUI();
    
    console.log("YouTube Player is ready");
}

function onPlayerStateChange(event) {
    // event.data mewakili status pemutar:
    // YT.PlayerState.PLAYING (1), YT.PlayerState.PAUSED (2), YT.PlayerState.ENDED (0), YT.PlayerState.BUFFERING (3)
    
    const audioScreen = document.getElementById("audioContainer");
    
    if (event.data === YT.PlayerState.PLAYING) {
        playIcon.setAttribute("data-lucide", "pause");
        lucide.createIcons();
        
        audioScreen.classList.add("playing");
        startProgressTracking();
        updateMediaSessionState("playing");
    } else {
        playIcon.setAttribute("data-lucide", "play");
        lucide.createIcons();
        
        audioScreen.classList.remove("playing");
        stopProgressTracking();
        
        if (event.data === YT.PlayerState.PAUSED) {
            updateMediaSessionState("paused");
        } else if (event.data === YT.PlayerState.ENDED) {
            handleTrackEnded();
        }
    }
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    alert("Gagal memuat video YouTube. Pastikan koneksi internet aktif dan tautan video valid.");
}

// 3. LOGIKA PEMUTAR & SINKRONISASI
function playTrack(index) {
    if (!isPlayerReady || playlist.length === 0) return;
    
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    
    currentVideoIndex = index;
    const track = playlist[currentVideoIndex];
    
    // Load & mainkan video
    ytPlayer.loadVideoById(track.id);
    
    // Update tampilan aktif
    updateActiveTrackUI();
    setupMediaSession(track);
}

function togglePlay() {
    if (!isPlayerReady) return;
    
    const state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
}

function handleTrackEnded() {
    if (isLoop) {
        // Ulangi video yang sama
        ytPlayer.seekTo(0);
        ytPlayer.playVideo();
    } else if (isShuffle) {
        // Pilih acak indeks video berikutnya
        const randomIndex = Math.floor(Math.random() * playlist.length);
        playTrack(randomIndex);
    } else {
        // Putar trek berikutnya
        playTrack(currentVideoIndex + 1);
    }
}

// SINKRONISASI PROGRESS BAR & WAKTU
function startProgressTracking() {
    stopProgressTracking();
    progressUpdateInterval = setInterval(() => {
        if (!isPlayerReady) return;
        
        const currentTime = ytPlayer.getCurrentTime() || 0;
        const duration = ytPlayer.getDuration() || 0;
        
        // Update label waktu
        currentTimeLabel.textContent = formatTime(currentTime);
        totalTimeLabel.textContent = formatTime(duration);
        
        // Update slider progress
        if (duration > 0) {
            const percentage = (currentTime / duration) * 100;
            progressBar.value = percentage;
        } else {
            progressBar.value = 0;
        }
        
        // Update media session position state jika didukung
        if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
            try {
                navigator.mediaSession.setPositionState({
                    duration: duration,
                    playbackRate: 1,
                    position: currentTime
                });
            } catch (e) {
                // Abaikan jika ada galat durasi tidak sinkron
            }
        }
    }, 500);
}

function stopProgressTracking() {
    if (progressUpdateInterval) {
        clearInterval(progressUpdateInterval);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === null) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const displayMins = minutes < 10 ? "0" + minutes : minutes;
    const displaySecs = secs < 10 ? "0" + secs : secs;
    return `${displayMins}:${displaySecs}`;
}

// 4. METODE MEDIA SESSION API (Dukungan Pemutaran Latar Belakang & Lockscreen)
function setupMediaSession(track) {
    if ('mediaSession' in navigator) {
        console.log("Setting up Media Session API for:", track.title);
        
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: "KH Bahauddin Nursalim (Gus Baha)",
            album: "Pengajian Resmi LP3IA",
            artwork: [
                { src: track.thumbnail, sizes: '480x360', type: 'image/jpeg' },
                { src: './icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: './icon-512.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        // Kontrol Lockscreen / Tray Sistem
        navigator.mediaSession.setActionHandler('play', () => {
            ytPlayer.playVideo();
        });
        
        navigator.mediaSession.setActionHandler('pause', () => {
            ytPlayer.pauseVideo();
        });
        
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            playTrack(currentVideoIndex - 1);
        });
        
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            playTrack(currentVideoIndex + 1);
        });

        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && ytPlayer.seekTo) {
                ytPlayer.seekTo(details.seekTime, true);
            } else if (ytPlayer.seekTo) {
                ytPlayer.seekTo(details.seekTime, true);
            }
        });
    }
}

function updateMediaSessionState(state) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = state;
    }
}

// 5. MODUL ANTARMUKA (TABS, LISTS, MODAL)
function updateActiveTrackUI() {
    if (playlist.length === 0) return;
    
    const track = playlist[currentVideoIndex];
    
    // Label teks aktif
    currentTrackTitle.textContent = track.title;
    currentTrackChannel.textContent = `Kanal: ${track.channel} | Kategori: ${track.category}`;
    audioLabelTitle.textContent = track.title;
    
    // Hapus tanda aktif dari playlist list lama, tambahkan pada yang baru
    const items = playlistItemsContainer.querySelectorAll('.video-item');
    items.forEach((item, index) => {
        if (index === currentVideoIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function switchMode(mode) {
    if (mode === currentMode) return;
    currentMode = mode;
    
    // Toggle Tombol Tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Sembunyikan/Tampilkan container pemutar
    if (mode === "video") {
        videoContainer.style.display = "block";
        audioContainer.style.display = "none";
    } else {
        videoContainer.style.display = "none";
        audioContainer.style.display = "flex";
        
        // Pastikan visualizer aktif berputar jika sedang memutar audio
        if (isPlayerReady && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            audioContainer.classList.add("playing");
        }
    }
}

function renderPlaylist() {
    playlistItemsContainer.innerHTML = "";
    
    if (filteredPlaylist.length === 0) {
        playlistItemsContainer.innerHTML = `
            <div class="playlist-loading">
                <i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i>
                <p>Kajian tidak ditemukan.</p>
            </div>
        `;
        videoCountBadge.textContent = "0 Video";
        lucide.createIcons();
        return;
    }
    
    videoCountBadge.textContent = `${filteredPlaylist.length} Video`;
    
    filteredPlaylist.forEach((video, idx) => {
        // Tentukan index asli dalam playlist induk untuk navigasi putar
        const originalIndex = playlist.findIndex(v => v.id === video.id);
        
        const videoElement = document.createElement("div");
        videoElement.className = "video-item";
        if (originalIndex === currentVideoIndex) {
            videoElement.classList.add("active");
        }
        
        videoElement.innerHTML = `
            <div class="thumb-wrapper">
                <img src="${video.thumbnail}" alt="Thumbnail">
                <span class="duration-badge">${video.duration}</span>
            </div>
            <div class="item-meta">
                <h4>${video.title}</h4>
                <div class="channel-name">${video.channel}</div>
                <div class="badge-row">
                    <span class="cat-badge">${video.category}</span>
                </div>
            </div>
        `;
        
        videoElement.addEventListener("click", () => {
            playTrack(originalIndex);
        });
        
        playlistItemsContainer.appendChild(videoElement);
    });
    
    lucide.createIcons();
}

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
    const activeTab = categoryTabsContainer.querySelector('.cat-btn.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    
    filteredPlaylist = playlist.filter(video => {
        const matchesQuery = video.title.toLowerCase().includes(query) || 
                             video.description.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
        
        return matchesQuery && matchesCategory;
    });
    
    renderPlaylist();
}

// 6. MANAJEMEN INPUT VIDEO BARU (LOCAL STORAGE)
function extractYouTubeId(url) {
    // Regex pendeteksi ID YouTube standar
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        return match[2];
    } else if (url.trim().length === 11) {
        return url.trim(); // User menginputkan langsung Video ID
    }
    return null;
}

function handleAddVideo(e) {
    const urlInput = document.getElementById("videoUrl").value.trim();
    const titleInput = document.getElementById("videoTitle").value.trim();
    const catInput = document.getElementById("videoCategory").value;
    const descInput = document.getElementById("videoDescription").value.trim();
    
    const videoId = extractYouTubeId(urlInput);
    
    if (!videoId) {
        alert("Tautan YouTube atau Video ID tidak valid! Harap masukkan format link yang benar.");
        return;
    }
    
    // Cek apakah video sudah terdaftar
    if (playlist.some(v => v.id === videoId)) {
        alert("Video ini sudah terdaftar di dalam playlist!");
        return;
    }
    
    const newVideo = {
        id: videoId,
        title: titleInput,
        channel: "Kustom / Muhibbin",
        duration: "00:00", // Default dummy duration, YouTube API will load stream info
        category: catInput,
        description: descInput || "Video pengajian tambahan yang diinput oleh pengguna.",
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
    
    // Tambahkan ke array dan simpan ke LocalStorage
    playlist.push(newVideo);
    localStorage.setItem("gusbaha_custom_videos", JSON.stringify(playlist.filter(v => v.channel === "Kustom / Muhibbin")));
    
    // Reset Form & Tutup Modal
    addVideoForm.reset();
    addVideoModal.classList.remove("open");
    
    // Re-render
    applyFilters();
    alert("Pengajian baru berhasil ditambahkan!");
    
    // Mainkan langsung video yang baru ditambahkan
    playTrack(playlist.length - 1);
}

function loadInitialData() {
    // Muat data custom dari LocalStorage jika ada
    const customStored = localStorage.getItem("gusbaha_custom_videos");
    let customList = [];
    
    if (customStored) {
        try {
            customList = JSON.parse(customStored);
        } catch (e) {
            console.error("Gagal membaca LocalStorage:", e);
        }
    }
    
    // Gabungkan default dengan custom list
    playlist = [...DEFAULT_VIDEOS, ...customList];
    filteredPlaylist = [...playlist];
}

// 7. EVENT LISTENERS SETUP
function setupEventListeners() {
    // Mode Selector Tab Event
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = btn.getAttribute('data-mode');
            switchMode(mode);
        });
    });
    
    // Search Bar Input
    searchInput.addEventListener('input', handleSearch);
    
    // Clear Search Input Button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        searchInput.focus();
        applyFilters();
    });
    
    // Category Tab Filters
    categoryTabsContainer.addEventListener('click', (e) => {
        const clickedBtn = e.target.closest('.cat-btn');
        if (!clickedBtn) return;
        
        categoryTabsContainer.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        applyFilters();
    });
    
    // Controls: Play / Pause
    playBtn.addEventListener('click', togglePlay);
    
    // Controls: Next & Prev
    nextBtn.addEventListener('click', () => {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            playTrack(randomIndex);
        } else {
            playTrack(currentVideoIndex + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        playTrack(currentVideoIndex - 1);
    });
    
    // Controls: Shuffle Toggle
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    });
    
    // Controls: Loop Single Track Toggle
    loopBtn.addEventListener('click', () => {
        isLoop = !isLoop;
        loopBtn.classList.toggle('active', isLoop);
    });
    
    // Volume Control Actions
    volumeBar.addEventListener('input', (e) => {
        const val = e.target.value;
        volumeValue.textContent = `${val}%`;
        
        if (isPlayerReady) {
            ytPlayer.setVolume(val);
            if (ytPlayer.isMuted() && val > 0) {
                ytPlayer.unMute();
                updateVolumeIcon(false);
            } else if (val == 0) {
                updateVolumeIcon(true);
            } else {
                updateVolumeIcon(false);
            }
        }
    });
    
    volumeMuteBtn.addEventListener('click', () => {
        if (!isPlayerReady) return;
        
        const isMuted = ytPlayer.isMuted();
        if (isMuted) {
            ytPlayer.unMute();
            ytPlayer.setVolume(volumeBar.value);
            updateVolumeIcon(false);
        } else {
            ytPlayer.mute();
            updateVolumeIcon(true);
        }
    });
    
    function updateVolumeIcon(muted) {
        if (muted) {
            volumeIcon.setAttribute("data-lucide", "volume-x");
        } else {
            const val = volumeBar.value;
            if (val < 30) {
                volumeIcon.setAttribute("data-lucide", "volume");
            } else if (val < 70) {
                volumeIcon.setAttribute("data-lucide", "volume-1");
            } else {
                volumeIcon.setAttribute("data-lucide", "volume-2");
            }
        }
        lucide.createIcons();
    }
    
    // Drag Progress Bar to Seek
    progressBar.addEventListener('input', (e) => {
        if (!isPlayerReady) return;
        
        const percentage = e.target.value;
        const duration = ytPlayer.getDuration() || 0;
        const targetSeconds = (percentage / 100) * duration;
        
        // Seek ke detik target, keep playing state
        ytPlayer.seekTo(targetSeconds, true);
        currentTimeLabel.textContent = formatTime(targetSeconds);
    });
    
    // Modal Open & Close events
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

// 8. PWA SERVICE WORKER & TOMBOL INSTALASI APLIKASI
function setupPwa() {
    // Registrasi Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((reg) => console.log('PWA ServiceWorker registered with scope:', reg.scope))
                .catch((err) => console.error('PWA ServiceWorker registration failed:', err));
        });
    }

    // Tombol Install Aplikasi Seluler/Dekstop
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

// KICKSTART PORTAL APLIKASI
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
    setupEventListeners();
    renderPlaylist();
    setupPwa();
    
    // Inisialisasi ikon Lucide
    if (window.lucide) {
        lucide.createIcons();
    }
});

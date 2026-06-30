# 🕌 Muhibbin Gus Baha | Portal Audio Pengajian Resmi (PWA)

Aplikasi portal web premium berbasis **Progressive Web App (PWA)** yang dirancang khusus untuk mendengarkan rekaman audio pengajian resmi dari **KH Bahauddin Nursalim (Gus Baha)**. Seluruh aliran suara bersumber langsung dari kanal resmi YouTube seperti **Official LP3IA**.

---

## ✨ Fitur Utama

1.  **🛡️ Kepatuhan Hak Cipta (Copyright Compliant)**:
    Aplikasi ini menggunakan **YouTube Iframe Player API** resmi untuk memutar konten. Cara ini 100% legal, tidak melakukan penggandaan berkas video/audio, dan tetap menyalurkan lalu lintas tontonan (*views*) serta tayangan iklan kepada pemilik hak cipta resmi (Official LP3IA/kreator asli).
2.  **🎧 Versi Audio Saja (Dedicated Audio-Only)**:
    Antarmuka aplikasi didesain khusus sebagai pemutar audio kaset analog pita berputar yang indah dengan visualisasi gelombang frekuensi dinamis, sementara pemutaran video YouTube tetap berjalan secara tersembunyi di latar belakang untuk mematuhi hak cipta tanpa memakan area layar utama.
3.  **📶 Pemutaran Latar Belakang (Background Playback)**:
    Terintegrasi dengan **HTML5 Media Session API**. Saat aplikasi diposisikan di latar belakang, perangkat diminimalkan, atau layar ponsel terkunci, audio pengajian tetap dapat diputar dan dikendalikan langsung melalui menu tray notifikasi sistem atau layar kunci (*lockscreen*).
4.  **📱 Dukungan PWA & Tombol Instalasi**:
    Dapat diinstal langsung di perangkat desktop (Chrome/Edge) maupun ponsel cerdas (Android/iOS) sebagai aplikasi mandiri (*standalone*). Tersedia tombol instalasi kustom yang muncul otomatis saat PWA siap dipasang.
5.  **💾 Daftar Putar Kustom Terintegrasi (Local Storage)**:
    Selain daftar bawaan, pengguna dapat menambahkan tautan video pengajian Gus Baha lainnya dari YouTube secara dinamis melalui tombol "Tambah Pengajian". Data ini disimpan secara lokal di dalam memori peramban (*LocalStorage*).
6.  **🔍 Pencarian & Filter Kategori**:
    Memudahkan pengguna mencari penggalan kajian berdasarkan judul atau deskripsi kitab, serta memfilternya berdasarkan kategori Kitab (Tafsir Jalalain, Kitab Hikam, Hikmah & Fiqih, Umum).

---

## 📂 Struktur Berkas Proyek

```bash
muhibbin-gus-baha/
├── index.html              # Struktur utama antarmuka dengan PWA meta-tags & modal form
├── style.css               # Desain bertema hijau-emas islami premium, layout grid, & animasi kaset
├── app.js                  # Logika pemutar, integrasi API YouTube, Media Session, & LocalStorage
├── sw.js                   # Service Worker untuk penanganan cache & dukungan akses offline
├── manifest.json           # Manifes Web App untuk identitas standalone PWA & jalur ikon
├── icon.svg                # Master desain ikon vektor (SVG) dengan motif kubah masjid emas
├── icon-192.png            # PNG launcher icon (192x192)
├── icon-512.png            # PNG splash screen icon (512x512)
├── icon-192-maskable.png   # PNG adaptive icon (192x192) untuk launcher mobile
├── icon-512-maskable.png   # PNG adaptive icon (512x512) untuk launcher mobile
└── README.md               # Dokumentasi lengkap petunjuk ini
```

---

## 🛠️ Detail Implementasi Pemutaran Latar Belakang

*   **Pembatasan Sistem**: Kebijakan peramban modern (seperti Chrome & Safari) melarang pemutaran audio otomatis (*autoplay*) sebelum adanya interaksi pertama dari pengguna. Pengguna harus menekan tombol putar (*play*) sekali di awal agar audio dapat berjalan di latar belakang.
*   **Keadaan Browser Ditutup**: Secara teknis, jika aplikasi/peramban **ditutup paksa (force close/kill process)** dari daftar tugas sistem operasi, semua pemrosesan JavaScript akan dihentikan dan suara akan mati. Namun, jika peramban/jendela PWA **diminimalkan (minimized)**, layar ponsel redup/terkunci, atau tab dialihkan, audio tetap berjalan terus berkat integrasi **Media Session API** yang kami sediakan di dalam berkas [app.js](file:///C:/Users/imron/Downloads/muhibbin-gus-baha/app.js).

---

## 🔧 Panduan Mengembangkan / Menambah Daftar Default

Untuk mengubah daftar putar bawaan yang langsung muncul saat aplikasi pertama kali dibuka oleh pengguna baru, buka berkas [app.js](file:///C:/Users/imron/Downloads/muhibbin-gus-baha/app.js) dan ubah data pada konstanta `DEFAULT_VIDEOS`:

```javascript
const DEFAULT_VIDEOS = [
    {
        id: "VIDEO_ID_YOUTUBE",          // Isikan 11 karakter kode ID di akhir link video youtube
        title: "Judul Pengajian...",
        channel: "Official LP3IA",
        duration: "30:45",
        category: "Tafsir Jalalain",     // Pilihan: 'Tafsir Jalalain', 'Kitab Hikam', 'Hikmah & Fiqih', 'Umum'
        description: "Tulis ringkasan isi kajian pengajian disini.",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_YOUTUBE/hqdefault.jpg"
    },
    // tambahkan entri lainnya...
];
```

---

## 💻 Menjalankan Uji Coba Secara Lokal

Agar Service Worker PWA dapat teregistrasi, aplikasi harus diakses menggunakan protokol keamanan **`localhost`** atau **`https`**.

### Menjalankan Server Lokal dengan Python:
1.  Buka terminal/Command Prompt di dalam direktori `C:\Users\imron\Downloads\muhibbin-gus-baha`.
2.  Jalankan perintah berikut:
    ```bash
    python -m http.server 8080
    ```
3.  Buka browser dan buka alamat: **`http://localhost:8080`**

### Menjalankan Server Lokal dengan Node.js:
1.  Jalankan perintah berikut di terminal:
    ```bash
    npx http-server -p 8080
    ```
2.  Akses alamat: **`http://localhost:8080`**

---

## 🚀 Panduan Deploy ke GitHub Pages

1.  Buat repositori baru di GitHub (misal bernama `muhibbin-gus-baha`).
2.  Salin seluruh isi berkas di direktori ini ke dalam repositori git lokal Anda.
3.  Commit dan Push kode Anda ke GitHub:
    ```bash
    git init
    git remote add origin https://github.com/USERNAME/muhibbin-gus-baha.git
    git branch -M main
    git add .
    git commit -m "feat: inisialisasi portal PWA Muhibbin Gus Baha"
    git push -u origin main
    ```
4.  Buka halaman repositori Anda di GitHub, pilih **Settings -> Pages**.
5.  Di bagian **Build and deployment**, ubah Source menjadi **Deploy from a branch** dan pilih branch **`main`** / folder **`/ (root)`**, lalu tekan **Save**.
6.  Situs Anda akan aktif beberapa saat kemudian di alamat **`https://USERNAME.github.io/muhibbin-gus-baha/`** dengan HTTPS aktif sehingga fitur PWA & Pemutaran Latar Belakang siap digunakan secara luas oleh para jamaah dan muhibbin.

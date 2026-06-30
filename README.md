# 🕌 Muhibbin Gus Baha | Portal Koleksi Ceramah Lengkap (PWA)

Aplikasi portal web premium berbasis **Progressive Web App (PWA)** yang dirancang sebagai direktori dan galeri tautan ceramah resmi dari **KH Bahauddin Nursalim (Gus Baha)**. Aplikasi ini membagi seluruh rekaman kajian langsung ke dalam berbagai kategori ceramah yang rapi dan mempermudah pengguna untuk mendengarkan kajian secara tertata.

Seluruh tautan mengarah langsung ke video orisinil pada kanal YouTube resmi seperti **Official LP3IA**, **Santri Gayeng**, dan **NU Online**.

---

## ✨ Fitur Utama

1.  **📱 Direct YouTube Deep-Linking**:
    Saat tautan ceramah diklik, sistem akan langsung membuka halaman YouTube asli. Pada perangkat ponsel (Android/iOS), tautan ini secara otomatis akan dialihkan untuk langsung membuka aplikasi YouTube bawaan, memberikan pengalaman mendengarkan yang mulus.
2.  **🛡️ Kepatuhan Hak Cipta (Copyright Compliant)**:
    Aplikasi ini tidak melakukan penggandaan, pengunggahan ulang (*reupload*), ataupun pengunduhan berkas media. Lalu lintas tontonan (*views*) dan perolehan iklan tetap tersalurkan penuh kepada para pemilik hak cipta resmi (Official LP3IA/Santri Gayeng/NU Online).
3.  **🔄 Sinkronisasi Tautan Otomatis ("Perbarui Tautan")**:
    Aplikasi dilengkapi tombol sinkronisasi yang secara dinamis mengambil pembaharuan daftar ceramah dari berkas `lectures.json` di server. Jika terdapat pembaharuan tautan ceramah baru di repositori GitHub, pengguna dapat memperbaruinya secara instan tanpa perlu memasang ulang aplikasi.
4.  **💾 Tautan Kustom Lokal (LocalStorage)**:
    Pengguna dapat menambahkan video ceramah Gus Baha lainnya yang tidak ada di daftar utama menggunakan tombol "Tambah Tautan". Data ini disimpan secara lokal di memori peramban pengguna dan dikelompokkan ke dalam kategori tersendiri.
5.  **🔍 Pencarian Instan & Filter Kategori**:
    Memudahkan pencarian tema tertentu menggunakan kata kunci pada judul dan deskripsi, serta memfilternya berdasarkan kategori Kitab (Tafsir Al-Qur'an, Kitab Tasawuf, Fiqih & Hukum, Ceramah Umum, Tautan Anda).
6.  **📊 Dasbor Statistik**:
    Menampilkan data jumlah ceramah, jumlah kategori aktif, serta waktu pembaruan basis data terakhir secara *real-time*.

---

## 📂 Struktur Berkas Proyek

```bash
muhibbingusbaha/
├── index.html              # Struktur utama antarmuka dengan PWA meta-tags & modal form
├── style.css               # Desain bertema hijau-emas islami premium, layout grid responsif
├── app.js                  # Logika filter pencarian, integrasi sinkronisasi JSON & LocalStorage
├── lectures.json           # Basis data utama daftar ceramah Gus Baha (Format JSON)
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

## ✍️ Cara Menambahkan / Memperbarui Tautan Baru

Untuk melakukan pembaharuan daftar ceramah bawaan agar dapat diakses oleh semua pengguna:

1.  Buka berkas `lectures.json` di dalam repositori ini.
2.  Tambahkan entri JSON baru di dalam array dengan format berikut:

```json
  {
    "id": "KODE_VIDEO_YOUTUBE",
    "title": "Judul Kajian Pengajian...",
    "channel": "Kanal Sumber (e.g. Official LP3IA / Santri Gayeng)",
    "duration": "Durasi (e.g. 35:20)",
    "category": "Pilihan Kategori (Tafsir Al-Qur'an / Kitab Tasawuf / Fiqih & Hukum / Ceramah Umum)",
    "description": "Tulis ringkasan isi kajian pengajian Gus Baha di sini.",
    "thumbnail": "https://img.youtube.com/vi/KODE_VIDEO_YOUTUBE/hqdefault.jpg"
  }
```

*Catatan: `id` adalah 11 karakter unik di bagian akhir URL video YouTube (misalnya pada `youtube.com/watch?v=lo_Fedw62vE`, ID-nya adalah `lo_Fedw62vE`).*

3.  Setelah melakukan perubahan pada `lectures.json`, lakukan commit dan push ke GitHub.
4.  Pengguna aplikasi di peramban tinggal mengeklik tombol **"Perbarui Tautan"** pada aplikasi untuk langsung memuat data terbaru secara asinkron.

---

## 💻 Menjalankan Uji Coba Secara Lokal

Agar Service Worker PWA dapat teregistrasi dengan baik, aplikasi harus diakses menggunakan protokol keamanan **`localhost`** atau **`https`**.

### Menjalankan Server Lokal dengan Python:
1.  Buka terminal di dalam direktori `muhibbingusbaha`.
2.  Jalankan perintah berikut:
    ```bash
    python3 -m http.server 8080
    ```
3.  Buka browser dan akses alamat: **`http://localhost:8080`**

### Menjalankan Server Lokal dengan Node.js:
1.  Jalankan perintah berikut di terminal:
    ```bash
    npx http-server -p 8080
    ```
2.  Akses alamat: **`http://localhost:8080`**

---

## 🚀 Pemasangan ke GitHub Pages

Aplikasi ini sudah diprogram untuk dipasang pada GitHub Pages dengan tautan utama:
**`https://atzartech-prog.github.io/muhibbingusbaha/`**

### Melakukan Push Pembaruan:
Jika Anda telah mengedit berkas lokasl dan ingin mengunggah perubahan tersebut:
```bash
git add .
git commit -m "update: perbarui tautan ceramah Gus Baha dan redesign antarmuka galeri"
git push origin main
```
Beberapa menit setelah proses push selesai, perubahan akan langsung aktif dan dapat diakses publik dengan HTTPS aktif, siap digunakan oleh para jamaah dan muhibbin.

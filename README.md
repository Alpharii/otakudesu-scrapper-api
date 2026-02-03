# Otakudesu Scrapper API

**Unofficial Otakudesu REST API** yang dibangun menggunakan **Elysia** dan berjalan di **Bun runtime**.

🔗 Website sumber: https://otakudesu.best/

Project ini menyediakan REST API yang cepat dan ringan untuk mengambil data anime seperti anime ongoing, completed, detail anime, daftar episode, hingga link download dari Otakudesu.

---

## ✨ Fitur

- ⚡ Server super cepat dengan **Bun**
- 🧩 Dibangun menggunakan **Elysia** (minimal & modern)
- 📺 Mengambil data anime ongoing dan completed
- 🔎 Pencarian anime
- 📄 Detail lengkap anime
- 🎬 Ekstraksi daftar episode
- ⬇️ Scraping link download
- 🚀 Endpoint REST sederhana dan mudah digunakan

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Bun  
- **Framework:** Elysia  
- **Scraping:** Cheerio  

---

## 🚀 Cara Menjalankan

### 1. Install Bun

Jika belum memiliki Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

Cek instalasi:

```bash
bun --version
```

---

### 2. Clone Repository

```bash
git clone https://github.com/Alpharii/otakudesu-scrapper.git
cd otakudesu-scrapper
```

---

### 3. Install Dependencies

```bash
bun install
```

---

### 4. Jalankan Development Server

```bash
bun run dev
```

Server akan berjalan di:

👉 http://localhost:3000

---

## 📡 Endpoint

> Endpoint yang tersedia di project ini

### 🔹 Halaman Utama
```bash
GET /
```

### 🔹 Anime Ongoing
```bash
GET /ongoing
```

### 🔹 Anime Completed
```bash
GET /completed
```

### 🔹 Search Anime
```bash
GET /search?q=naruto
```

### 🔹 Detail Anime
```bash
GET /anime/:slug
```

### 🔹 Detail Episode
```bash
GET /episode/:slug
```

---

## ⚠️ Disclaimer

Project ini **tidak berafiliasi dengan Otakudesu**.

- API ini dibuat hanya untuk **tujuan edukasi**.
- Seluruh konten adalah milik pemilik aslinya.
- Mohon dukung platform streaming resmi.

---

## 🤝 Kontribusi

Kontribusi sangat terbuka!

1. Fork repository  
2. Buat branch fitur  
   ```bash
   git checkout -b feature/fitur-baru
   ```
3. Commit perubahan  
   ```bash
   git commit -m "Menambahkan fitur baru"
   ```
4. Push ke branch  
   ```bash
   git push origin feature/fitur-baru
   ```
5. Buka Pull Request 🚀  

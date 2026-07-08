# FIXNIKAH — Undangan Pernikahan Bertema Netflix 💍🎬

Undangan pernikahan digital satu halaman bergaya **Netflix**, dalam **Bahasa Indonesia**.
Tanpa proses build — hanya HTML, CSS, dan JavaScript biasa. Cocok untuk GitHub Pages.

Bertema **Kirito & Asuna** (Sword Art Online) sebagai contoh sementara.

## ✨ Fitur

- **Gerbang pembuka** — dua pintu (foto Kirito & Asuna) yang terbuka ke samping saat tombol "Buka Undangan" ditekan
- **Nama tamu otomatis** dari URL (`?to=`) + monogram "K & A"
- **Dua gaya berbeda**: desktop memakai *sidebar* tetap gaya "browse" Netflix; ponsel memakai tata letak *reel* satu kolom imersif
- **Banyak animasi**: Ken Burns pada hero, partikel hati melayang, judul berkilau (shimmer), efek *tilt* kartu, hitung mundur ber-*bump*, tombol ber-*pulse*, indikator "LIVE"
- **Hero** ala Netflix: 99% Cocok, hitung mundur langsung, hashtag
- **Ayat/kutipan**, **Breaking News**, **Cast Utama** (poster mempelai), **Timeline** (Akad & Resepsi + tombol Konfirmasi Kehadiran)
- **Tanda Kasih** (amplop digital) dengan tombol **Salin Rekening / Salin Alamat**
- **Our Love Story**, **Our Memories** (galeri geser), **Turut Mengundang**
- **Form RSVP** (email atau Formspree) + tampilan ucapan
- **Musik latar** dengan tombol putar/hentikan; hormati `prefers-reduced-motion`

## 🔗 Nama tamu otomatis

Tambahkan `?to=` di akhir link, contoh:

```
https://domainanda.com/?to=Budi-Santoso
```

Nama akan tampil di layar sampul (tanda hubung `-` / garis bawah `_` otomatis jadi spasi).
Tanpa parameter, akan tampil "Tamu Undangan".

## 📝 Mengubah isi (tanpa ngoding)

Semua teks ada di **`js/data.js`**:

- `couple`, `date`, `dateText`, hashtag — data utama (`date` menggerakkan hitung mundur)
- `verse`, `news`, `groom`, `bride`, `events`, `gift`, `story`, `memories`, `invited`, `closing`
- `rsvpEmail` — tujuan email RSVP
- `formspreeEndpoint` — opsional, agar RSVP masuk ke inbox (lihat bawah)
- `music` — path lagu latar

### Mengganti gambar Kirito & Asuna

> ⚠️ **Penting soal hak cipta.** Gambar di `assets/*.webp` adalah cuplikan anime *Sword Art
> Online* dari fandom wiki — dipakai **hanya sebagai placeholder sementara**. Karya ini
> berhak cipta. Sebelum menerbitkan/menyebarkan undangan (apalagi untuk keperluan komersial),
> **ganti dengan foto asli Anda sendiri.**

Cukup timpa file di `assets/` (mis. `assets/kirito.webp`, `assets/asuna.webp`) dengan gambar
Anda, atau taruh file baru lalu ubah path-nya di `js/data.js`:

- `gateGroom` / `gateBride` — foto pada kedua pintu gerbang pembuka
- `groom.poster` / `bride.poster` — poster mempelai
- `heroImg` — latar besar hero
- `events[].img`, `memories[].img` — thumbnail acara & galeri

Ukuran disarankan: potret ±1080×1440 untuk poster, dan gambar lebar/tinggi ±1920px untuk hero.

### Musik latar

File di `assets/music.mp3` adalah **"Bittersweet" oleh Kevin MacLeod** (incompetech.com),
lisensi [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) — bebas
royalti, cukup mencantumkan kredit (sudah ada di bagian penutup halaman).

Untuk mengganti lagu, timpa `assets/music.mp3` dengan file Anda (nama harus persis `music.mp3`).
Jika lagu baru bukan CC-BY, sesuaikan/ hapus kredit di bagian penutup `index.html`. Musik mulai
saat tamu menekan "Buka Undangan" (kebijakan autoplay browser). Kosongkan `music: ""` di
`js/data.js` untuk menonaktifkan.

### RSVP masuk ke inbox (disarankan)

Secara default form membuka aplikasi email. Untuk kotak masuk sungguhan:

1. Daftar gratis di **[formspree.io](https://formspree.io)**
2. Buat form → dapat endpoint seperti `https://formspree.io/f/abcdwxyz`
3. Tempel ke `formspreeEndpoint` di `js/data.js`

## 🚀 Deploy ke GitHub Pages

1. Buat repo di GitHub lalu push:
   ```bash
   git add .
   git commit -m "FIXNIKAH undangan"
   git branch -M main
   git remote add origin https://github.com/<kamu>/<repo>.git
   git push -u origin main
   ```
2. GitHub: **Settings → Pages → Source: "Deploy from a branch"**, branch **`main`**, folder **`/ (root)`**. Save.
3. Situs live di `https://<kamu>.github.io/<repo>/` dalam ±1 menit.

## 🌐 Domain kustom

1. Edit file **`CNAME`** — isi domain Anda satu baris (mis. `kiritoasuna.com`).
2. Di registrar domain, tambahkan DNS:
   - **Apex** (`contoh.com`): empat record `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **`www`**: satu record `CNAME` → `<kamu>.github.io`
3. GitHub: **Settings → Pages**, isi domain, centang **Enforce HTTPS** setelah sertifikat siap.

## 🖥️ Pratinjau lokal

Server statis apa pun bisa. Dari folder ini:
```bash
npx serve -l 8080 .
# buka http://localhost:8080/?to=nama-tamu
```

Selamat, dan sampai jumpa di hari bahagia! 🍿

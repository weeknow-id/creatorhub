# WeeKnow Creator Hub

Website statis WeeKnow: kumpulan prompt AI, link hardware/produk, resources AI + workflow ComfyUI, FAQ, komunitas, dan video — gratis, tanpa backend, tanpa database.

Stack: Next.js (App Router) + React + Tailwind CSS v4 + Framer Motion + Lenis. Di-build jadi HTML statis (`npm run build`) dan bisa di-host di mana saja (termasuk GitHub Pages).

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # cek production build lolos
```

## Edit konten manual (aman, tanpa utak-atik komponen)

- **Isi Vault (prompt, produk, link, workflow):** `lib/vault-data.ts`
  - Judul, deskripsi, eyebrow, dan tombol tiap kartu ada di `vaultCategories`.
  - 18 prompt asisten ada di `lib/prompt-asisten-data.ts` (`allAsistenPrompts`) — badge jumlah ngikutin otomatis.
- **FAQ:** `lib/faq-data.ts` — tambah/ubah kategori & pertanyaan di `faqCategories`. Format ID: `VC-Q1`, `GA-Q1`, dst. (nomor urut per kategori). Badge jumlah ngikutin otomatis.
- **Ikon tiap item:** `lib/card-icons.ts` (`itemIconMap`, `itemTileAccent`).
- **Video featured:** `components/featured-videos.tsx` (`videos`: judul, link, durasi, tanggal, views).
- **Statistik community:** `components/community-section.tsx` (`stats`: angka + link sosmed).
- **Teks section lain:** masing-masing di `components/*-section.tsx`, halaman detail di `components/category-detail.tsx` dan `components/faq-detail.tsx`.
- **Ikon sosmed (satu sumber):** `components/social-icons.tsx`.
- **Warna aksen kartu:** field `accent` di tiap kategori (`lib/vault-data.ts`). Teks kecil otomatis digelapkan via `lib/color.ts` supaya tetap terbaca.

Aturan praktis: ubah **teks, link, dan isi data** sesukamu. Kalau mau **tambah kartu, section, atau kategori baru** (ubah struktur/kode), minta tolong developer/AI.

## Catatan deploy (GitHub Pages)

- Project ini static export penuh (`output: "export"` di `next.config.mjs`) untuk URL subpath `/creatorhub/`.
- Dev lokal jalan di `http://localhost:3000/creatorhub/` (bukan `/`).
- Aturan aset penting: `next/image` otomatis ikut prefix, tapi `<img>` biasa, `url()` CSS, dan path di file data **wajib** diawali `/creatorhub` (contoh: `/creatorhub/images/...`).
- File `public/.nojekyll` jangan dihapus (wajib buat Pages).
- Deploy otomatis via `.github/workflows/deploy.yml` tiap push ke `main`. Sebelum push pertama: repo Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
- Jangan commit file `.env*` (sudah di-`.gitignore`).
- Hanya `package-lock.json` yang dipakai (npm). Jangan menambah lockfile lain.

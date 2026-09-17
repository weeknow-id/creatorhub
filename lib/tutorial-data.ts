// Data Panduan Video (kartu Panduan V4).
// Cara edit manual: ubah/ganti array `tutorials` di bawah.
// Tiap item: title, description, youtubeUrl, duration (opsional),
// summary (bullet ringkasan di kartu), steps (langkah bernomor di popup),
// relatedLinks (tombol link di popup).

export interface TutorialStep {
  title: string
  description: string
}

export interface TutorialRelatedLink {
  label: string
  url: string
}

export interface Tutorial {
  id: string
  title: string
  description: string
  youtubeUrl: string
  // Thumbnail lokal di public/images (wajib diawali /creatorhub).
  thumbnail: string
  duration?: string
  // Ringkasan poin isi video (tampil sebagai bullet di kartu).
  // Kalau kosong, kartu otomatis pakai judul langkah sebagai fallback.
  summary?: string[]
  steps: TutorialStep[]
  relatedLinks: TutorialRelatedLink[]
}

// Teks kartu Tutorials di Vault (biar tidak nyebar di komponen).
export const tutorialsCardMeta = {
  title: "Tutorials",
  description: "Ikuti langkah video YouTube WeeKnow dari awal sampai bisa. Klik untuk lihat checklist + link tools-nya.",
  cta: "Tonton & Ikuti",
}

export const tutorials: Tutorial[] = [
  {
    id: "t1",
    title: "Tutorial RVC okada 2024",
    description: "Install RVC w-okada dari nol sampai suaramu berubah. Gratis, open source, dan paling enteng buat pemula.",
    youtubeUrl: "https://www.youtube.com/watch?v=NC9W8syBAy4",
    thumbnail: "/creatorhub/images/tutorial-rvc-okada.webp",
    duration: "8:20",
    summary: [
      "Buat yang baru pertama kali pakai AI Voice Changer di PC/laptop.",
      "Dari download, install, sampai setting mic biar suara masuk.",
      "Cara pasang voice model dan troubleshooting kalau suara nggak keluar.",
    ],
    steps: [
      { title: "Download RVC w-okada", description: "Ambil versi terbaru lewat link di deskripsi video. Gratis dan open source." },
      { title: "Download voice model", description: "Cari suara favoritmu di voice-models.com, lalu taruh di folder models." },
      { title: "Setting mic dan output", description: "Pilih mic + speaker yang benar, atur pitch dan VRAM sesuai spek PC-mu." },
      { title: "Test dan troubleshooting", description: "Coba ngomong dan dengarkan hasilnya. Kalau suara nggak masuk, cek mic level, restart, atau install ulang." },
    ],
    relatedLinks: [
      { label: "RVC w-okada (GitHub)", url: "https://github.com/w-okada/voice-changer" },
      { label: "Download voice model", url: "https://voice-models.com/" },
    ],
  },
  {
    id: "t2",
    title: "Tier List Voice Changer 2026",
    description: "Bingung pilih aplikasi voice changer? Video ini ngebandingin semuanya biar kamu pilih yang pas sama spek dan kebutuhanmu.",
    youtubeUrl: "https://www.youtube.com/watch?v=_N3nsfOnTVA",
    thumbnail: "/creatorhub/images/tutorial-tier-list.webp",
    duration: "7:22",
    summary: [
      "Perbandingan jujur semua aplikasi AI Voice Changer populer.",
      "Rekomendasi sesuai spek: gratis ringan, gratis lengkap, sampai berbayar.",
      "Biar nggak salah install dan buang-buang waktu.",
    ],
    steps: [
      { title: "Tonton tier list-nya", description: "Lihat kelebihan dan kekurangan tiap aplikasi di videonya." },
      { title: "Cek spek PC-mu", description: "Minimal VRAM 4GB buat jalan, 8GB ke atas biar delay rendah sambil main game." },
      { title: "Pilih aplikasimu", description: "Mau ringan pakai RVC w-okada, mau fitur banyak pakai Applio, mau gampang pakai Voicewave." },
      { title: "Download lewat Link Tools AI", description: "Semua link download resminya sudah dikumpulin di kategori Link Tools AI." },
    ],
    relatedLinks: [
      { label: "Applio (gratis, fitur banyak)", url: "https://applio.org/" },
      { label: "Voicewave (gampang, berbayar)", url: "https://bit.ly/4fAuYfi" },
    ],
  },
  {
    id: "t3",
    title: "Sambungin Voice Changer PC ke Android",
    description: "Cuma butuh 3 kabel biar suara voice changer dari PC bisa dipakai di HP Android. Ada skema coloknya di video.",
    youtubeUrl: "https://www.youtube.com/watch?v=2reJB9VSMx8",
    thumbnail: "/creatorhub/images/tutorial-pc-android.webp",
    duration: "8:02",
    summary: [
      "Buat yang cuma punya HP tapi mau pakai voice changer real-time dari PC.",
      "Cuma butuh 3 kabel murah, tanpa aplikasi tambahan.",
      "Ikuti skema coloknya langkah demi langkah di video.",
    ],
    steps: [
      { title: "Siapkan 3 kabel", description: "Kabel aux male-to-male TRS, splitter 4-pole TRRS, dan converter Type-C buat HP tanpa jack." },
      { title: "Colok sesuai skema", description: "Sambungkan output PC ke splitter lalu ke HP, ikuti urutan di video biar nggak ketukar." },
      { title: "Setting audio HP", description: "Pastikan HP membaca input dari kabel, bukan mic internal." },
      { title: "Test bareng", description: "Coba voice call atau record, suara yang keluar harusnya sudah jadi suara changer." },
    ],
    relatedLinks: [
      { label: "Kabel Aux TRS", url: "https://s.shopee.co.id/30nRX4uaKi?share_channel_code=1" },
      { label: "Splitter TRRS", url: "https://s.shopee.co.id/112N9qz04x?share_channel_code=1" },
      { label: "Converter Type-C", url: "https://s.shopee.co.id/2qU1L2Ewqo?share_channel_code=1" },
    ],
  },
]

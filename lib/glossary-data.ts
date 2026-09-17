// Data Glosarium AI (kartu mini kanan di Vault).
// Cara edit manual: tambah/ubah array `glossaryTerms`.
// - Format ID: gl-<nama> (contoh: gl-vram). ID harus unik se-repo.
// - `group`: "ai" (istilah universal AI), "vc" (dunia Voice Changer),
//   "gen" (dunia Generative AI / ComfyUI). Judul section ada di `glossaryGroups`.

export type GlossaryGroupId = "ai" | "vc" | "gen"

export interface GlossaryGroup {
  id: GlossaryGroupId
  title: string
  subtitle: string
  accent: string
}

export const glossaryGroups: GlossaryGroup[] = [
  { id: "ai", title: "Artificial Intelligence", subtitle: "Istilah universal di dunia AI", accent: "#06AED5" },
  { id: "vc", title: "AI Voice", subtitle: "Istilah dunia AI voice dan voice changer", accent: "#4ADE80" },
  { id: "gen", title: "Generative AI", subtitle: "Istilah dunia generative AI, terutama ComfyUI", accent: "#FA8333" },
]

export interface GlossaryTerm {
  id: string
  group: GlossaryGroupId
  term: string
  definition: string
  example?: string
}

export const glossaryTerms: GlossaryTerm[] = [
  // --- Artificial Intelligence (universal) ---
  {
    id: "gl-vram",
    group: "ai",
    term: "VRAM",
    definition: "Memori khusus di VGA/GPU buat menampung model AI saat jalan. Makin besar VRAM, makin berat model yang bisa dipakai dan makin kecil delay-nya.",
    example: "RVC real-time minimal 4GB, nyaman di 8GB ke atas.",
  },
  {
    id: "gl-token",
    group: "ai",
    term: "Token",
    definition: "Satuan hitung teks buat AI. Satu kata bisa jadi 1-2 token. Limit konteks dan harga API biasanya dihitung per token.",
  },
  {
    id: "gl-prompt",
    group: "ai",
    term: "Prompt",
    definition: "Perintah atau instruksi yang kamu tulis ke AI. Kualitas output 90% ditentukan kualitas prompt-nya.",
  },
  {
    id: "gl-gpu",
    group: "ai",
    term: "GPU",
    definition: "Kartu grafis, otaknya komputasi AI. Semua model berat (RVC, ComfyUI) larinya di GPU, bukan prosesor biasa.",
  },
  {
    id: "gl-ram",
    group: "ai",
    term: "RAM",
    definition: "Memori utama PC yang menampung aplikasi dan data sementara. Buat AI-an, 16GB itu titik nyamannya.",
  },
  {
    id: "gl-training",
    group: "ai",
    term: "Training",
    definition: "Proses melatih model AI pakai dataset sampai bisa. Butuh waktu lama dan spek besar, makanya kebanyakan orang pakai model yang sudah jadi.",
  },
  {
    id: "gl-inference",
    group: "ai",
    term: "Inference",
    definition: "Proses menjalankan model AI yang sudah jadi buat dipakai sehari-hari. Ini yang kamu lakukan tiap generate gambar atau pakai voice changer.",
  },
  {
    id: "gl-open-source",
    group: "ai",
    term: "Open Source",
    definition: "Kode atau model yang bebas dipakai, diubah, dan disebar. RVC dan ComfyUI gratis karena open source.",
  },
  {
    id: "gl-llm",
    group: "ai",
    term: "LLM",
    definition: "Large Language Model. Model AI yang dilatih dari teks raksasa biar bisa ngobrol, nulis, dan mikir pakai bahasa.",
    example: "ChatGPT, Gemini, Claude.",
  },
  {
    id: "gl-hallucination",
    group: "ai",
    term: "Hallucination",
    definition: "Ngawurnya AI: ngarang fakta dengan pede. Terjadi karena AI nebak pola bahasa, bukan cek fakta beneran.",
  },
  {
    id: "gl-context-window",
    group: "ai",
    term: "Context Window",
    definition: "Batas teks yang diingat AI dalam satu obrolan. Kepanjangan, bagian awal kelupaan duluan.",
  },
  {
    id: "gl-open-weight",
    group: "ai",
    term: "Open-Weight",
    definition: "Model AI yang file hasilnya dibagi gratis, tapi resep training lengkapnya tidak ikut dibuka.",
    example: "Llama, Qwen.",
  },
  {
    id: "gl-system-prompt",
    group: "ai",
    term: "System Prompt",
    definition: "Instruksi peran AI yang dipasang dari belakang layar, biasanya tidak kelihatan user.",
  },
  {
    id: "gl-multimodal",
    group: "ai",
    term: "Multimodal",
    definition: "Kemampuan AI ngerti banyak jenis input sekaligus: teks, gambar, audio, dan video.",
  },
  {
    id: "gl-fine-tuning",
    group: "ai",
    term: "Fine-Tuning",
    definition: "Latih ulang model AI pakai dataset baru biar jago di bidang tertentu.",
  },
  {
    id: "gl-ai-agent",
    group: "ai",
    term: "AI Agent",
    definition: "AI yang bisa mutusin dan eksekusi tugas sendiri pakai tools, bukan cuma jawab chat.",
  },
  {
    id: "gl-temperature",
    group: "ai",
    term: "Temperature",
    definition: "Parameter keacakan jawaban LLM. Rendah bikin konsisten, tinggi bikin kreatif tapi ngawur.",
  },
  {
    id: "gl-rag",
    group: "ai",
    term: "RAG",
    definition: "Retrieval-Augmented Generation. Teknik bikin AI nyari referensi eksternal dulu sebelum jawab, biar minim ngarang.",
  },
  {
    id: "gl-kuantisasi",
    group: "ai",
    term: "Kuantisasi",
    definition: "Teknik ngecilin ukuran model AI biar muat di VRAM kecil, dengan kualitas turun dikit.",
  },
  {
    id: "gl-ai-slop",
    group: "ai",
    term: "AI Slop",
    definition: "Konten AI generik massal yang penting banyak, bukan penting bagus.",
  },
  {
    id: "gl-hags",
    group: "ai",
    term: "HAGS",
    definition: "Hardware-Accelerated GPU Scheduling. Setting Windows yang kadang ganggu aplikasi AI lokal sampai lag.",
  },
  {
    id: "gl-tts",
    group: "vc",
    term: "TTS",
    definition: "Text-to-Speech: AI yang mengubah teks menjadi suara. Beda dengan voice changer yang mengubah suara jadi suara lain.",
    example: "ElevenLabs itu tools TTS.",
  },
  {
    id: "gl-stt",
    group: "vc",
    term: "STT",
    definition: "Speech-to-Text: kebalikan TTS, AI yang mengubah omongan menjadi teks. Dipakai buat subtitle otomatis dan transkrip.",
  },
  // --- Voice Changer ---
  {
    id: "gl-rvc",
    group: "vc",
    term: "RVC",
    definition: "Retrieval-based Voice Conversion: teknologi AI yang mengubah suaramu menjadi suara orang lain, bisa real-time maupun dari rekaman.",
    example: "RVC w-okada, Applio, dan Voicewave semuanya berbasis RVC.",
  },
  {
    id: "gl-voice-model",
    group: "vc",
    term: "Voice Model",
    definition: "File suara hasil training yang dipakai RVC buat meniru seseorang. Makin bagus dataset-nya, makin mirip hasilnya.",
    example: "Download yang sudah jadi di voice-models.com.",
  },
  {
    id: "gl-pitch",
    group: "vc",
    term: "Pitch",
    definition: "Tinggi-rendahnya nada suara. Pitch yang tidak pas bikin hasil voice changer kedengaran aneh atau tidak natural.",
  },
  {
    id: "gl-latency",
    group: "vc",
    term: "Latency",
    definition: "Jeda antara kamu ngomong sampai suara changer keluar. Makin kecil makin enak dipakai real-time, tapi butuh spek lebih.",
  },
  {
    id: "gl-dataset",
    group: "vc",
    term: "Dataset",
    definition: "Kumpulan rekaman suara bersih buat training voice model. Idealnya beberapa menit audio jernih tanpa noise dan musik.",
  },
  {
    id: "gl-voice-changer",
    group: "vc",
    term: "Voice Changer",
    definition: "Software yang mengubah suara aslimu jadi suara orang atau karakter lain, real-time maupun dari rekaman.",
  },
  {
    id: "gl-sample-rate",
    group: "vc",
    term: "Sample Rate",
    definition: "Jumlah sampel audio per detik (Hz). Mismatch sama device bikin suara pitchy atau lag.",
  },
  {
    id: "gl-buffer",
    group: "vc",
    term: "Buffer",
    definition: "Antrian data audio sementara. Dinaikkan biar proses real-time tidak kejar-kejaran, trade-off-nya delay naik dikit.",
  },
  // --- Generative AI (ComfyUI) ---
  {
    id: "gl-lora",
    group: "gen",
    term: "LoRA",
    definition: "File tambahan kecil yang ditempel ke model gambar biar bisa meniru gaya atau karakter tertentu tanpa download model raksasa baru.",
  },
  {
    id: "gl-checkpoint",
    group: "gen",
    term: "Checkpoint",
    definition: "File model utama di ComfyUI yang menentukan gaya gambar (anime, fotorealistik, dan sebagainya). Ibarat mesinnya, LoRA itu aksesorisnya.",
  },
  {
    id: "gl-sampler",
    group: "gen",
    term: "Sampler",
    definition: "Algoritma yang mengatur cara AI mengubah noise acak menjadi gambar. Beda sampler beda kecepatan dan beda rasa hasilnya.",
    example: "Euler, DPM++, dan UniPC itu contoh nama sampler.",
  },
  {
    id: "gl-seed",
    group: "gen",
    term: "Seed",
    definition: "Angka acak penentu hasil generate. Seed sama + prompt sama = hasil sama persis. Catat seed kalau mau variasikan gambar favoritmu.",
  },
  {
    id: "gl-embedding",
    group: "gen",
    term: "Embedding",
    definition: "File teks kecil berisi konsep yang susah dijelaskan pakai kata biasa. Dipanggil dengan kata kunci khusus di prompt.",
    example: "Embedding 'bad-hands' buat mengurangi jari aneh di gambar.",
  },
  {
    id: "gl-controlnet",
    group: "gen",
    term: "ControlNet",
    definition: "Fitur yang mengatur pose, komposisi, atau bentuk gambar pakai gambar acuan, supaya hasilnya tidak ngarang bebas.",
  },
  {
    id: "gl-upscaler",
    group: "gen",
    term: "Upscaler",
    definition: "AI yang memperbesar resolusi gambar burem jadi tajam tanpa sekadar di-stretch. Cocok buat HD-kan hasil generate.",
  },
  {
    id: "gl-negative-prompt",
    group: "gen",
    term: "Negative Prompt",
    definition: "Prompt khusus berisi hal yang TIDAK boleh muncul di gambar. Senjata utama melawan jari aneh dan artefak.",
    example: "blurry, bad hands, extra fingers.",
  },
  {
    id: "gl-batch",
    group: "gen",
    term: "Batch",
    definition: "Jumlah gambar yang di-generate sekaligus dalam sekali jalan. Batch besar butuh VRAM besar.",
  },
  {
    id: "gl-flux",
    group: "gen",
    term: "Flux",
    definition: "Model image generation populer di ComfyUI, besutan Black Forest Labs (ex tim Stable Diffusion).",
  },
  {
    id: "gl-cfg",
    group: "gen",
    term: "CFG Scale",
    definition: "Angka seberapa nurut AI ke prompt. Ketinggian malah bikin hasil aneh.",
  },
  {
    id: "gl-img2img",
    group: "gen",
    term: "img2img",
    definition: "Teknik generate gambar mulai dari gambar referensi yang diubah gayanya.",
  },
  {
    id: "gl-txt2img",
    group: "gen",
    term: "txt2img",
    definition: "Teknik generate gambar mulai dari teks doang, tanpa gambar referensi.",
  },
  {
    id: "gl-vae",
    group: "gen",
    term: "VAE",
    definition: "Penerjemah terakhir dari data mentah ke gambar. Salah pasang VAE, warna bisa pecah.",
  },
  {
    id: "gl-denoise",
    group: "gen",
    term: "Denoise",
    definition: "Parameter seberapa bebas AI mengubah gambar. Ketinggian bikin dia ngarang detail baru.",
  },
]

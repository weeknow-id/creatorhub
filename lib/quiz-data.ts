// Data Quiz AI (popup, dibuka dari kartu mini kanan di Vault).
// Cara edit manual: ubah/tambah soal di tiap pool.
// - 4 tema (Easy, Medium, Hard, Ball Knowledge Elite), tiap tema pool 20 soal.
// - Tiap mulai diambil 10 soal + urutannya diacak. Pilihan jawaban juga
//   diacak tiap main (kunci ngikutin yang benar).
// - Tiap soal 4 pilihan, `answer` = index jawaban benar (0-3).
// - Aturan tulis: keempat pilihan dibuat seimbang panjangnya supaya kunci
//   tidak ketebak dari format. Penjelasan 1-2 kalimat pendek.

export interface QuizQuestion {
  question: string
  choices: [string, string, string, string]
  answer: number
  explanation: string
}

export interface QuizTheme {
  id: string
  title: string
  mode: string
  description: string
  accent: string
  questionCount: number
  pool: QuizQuestion[]
}

const easyPool: QuizQuestion[] = [
  {
    question: "Apa itu prompt dalam dunia AI?",
    choices: ["Perintah atau instruksi yang kamu ketik ke AI", "Nama resmi tiap model AI", "Password buat login ke aplikasi AI", "Hasil akhir yang dikeluarkan AI"],
    answer: 0,
    explanation: "Kualitas output AI itu 90% ditentukan dari kualitas prompt yang kamu kasih.",
  },
  {
    question: "GPU beda sama CPU di mana?",
    choices: ["GPU jago proses banyak hitungan sekaligus (paralel), makanya jadi otak AI", "GPU cuma buat nyimpen file-file gede", "Sebenernya GPU cuma versi murah dari CPU", "GPU dan CPU fungsinya identik, beda merek doang"],
    answer: 0,
    explanation: "CPU jago tugas satu-satu berurutan, GPU ngerjain ribuan hitungan bareng.",
  },
  {
    question: "ChatGPT, Gemini, dan Claude itu contoh dari apa?",
    choices: ["LLM (Large Language Model)", "Voice changer buat ubah suara", "Antivirus komputer", "Aplikasi edit foto"],
    answer: 0,
    explanation: "LLM itu model bahasa, jagoannya ngobrol, nulis, dan mikir pakai teks.",
  },
  {
    question: "Kenapa AI kadang ngarang fakta dengan pede padahal salah?",
    choices: ["Itu hallucination, AI nebak pola bahasa bukan cek fakta beneran", "Karena AI-nya lagi ngambek sama user", "Karena koneksi internet sedang lemot", "Karena prompt yang diketik kurang panjang"],
    answer: 0,
    explanation: "AI nyusun jawaban dari pola, bukan database fakta. Info penting tetap wajib double check.",
  },
  {
    question: "Token dalam dunia AI itu satuan buat apa?",
    choices: ["Motong-motong teks (kira-kira 1-2 token per kata)", "Koin digital buat top-up aplikasi AI", "Nama fitur keamanan akun premium", "Jenis GPU murah buat AI"],
    answer: 0,
    explanation: "Limit obrolan dan harga API biasanya dihitung per token, bukan per kata.",
  },
  {
    question: "Model AI open source itu maksudnya gimana?",
    choices: ["Source code dan modelnya boleh dipakai, diubah, dan disebarluaskan gratis", "Gratis tapi cuma bisa dipakai 1 hari", "Semua percakapanmu jadi kelihatan publik", "Otomatis jalan sendiri tanpa perlu di-install"],
    answer: 0,
    explanation: "RVC dan ComfyUI gratis salah satunya karena open source, beda sama model tertutup yang cuma lewat API berbayar.",
  },
  {
    question: "Bedanya AI generate gambar dari nol sama AI edit gambar yang udah ada?",
    choices: ["Generate bikin gambar baru dari teks, edit ubah gambar yang udah ada", "Generate lebih mahal, edit lebih murah", "Sama aja, cuma beda nama tombol", "Generate cuma buat anime, edit cuma buat foto asli"],
    answer: 0,
    explanation: "Dua kemampuan ini sekarang sering nyatu di satu model yang sama.",
  },
  {
    question: "Fungsi utama AI Voice Changer itu apa?",
    choices: ["Mengubah suara aslimu jadi suara orang atau karakter lain", "Menghilangkan noise di rekaman", "Nerjemahin suara ke bahasa lain", "Ngerekam suara jadi file teks"],
    answer: 0,
    explanation: "Beda sama noise remover atau transkrip. Voice changer emang khusus buat ganti karakter suara.",
  },
  {
    question: "Kenapa VRAM penting buat Voice Changer real-time?",
    choices: ["Makin besar VRAM, proses makin ringan dan cepat (delay makin kecil)", "VRAM cuma buat nyimpen file hasil rekaman", "VRAM itu baterai cadangan laptop", "VRAM nggak ada hubungannya sama voice changer"],
    answer: 0,
    explanation: "RVC real-time minimal butuh VRAM 4GB, nyaman di 8GB ke atas biar delay-nya kecil.",
  },
  {
    question: "Bedanya TTS (Text-to-Speech) sama Voice Changer?",
    choices: ["TTS ubah tulisan jadi suara, Voice Changer ubah suara jadi suara lain", "TTS cuma bisa dipakai buat bahasa Inggris", "Voice Changer nggak butuh mic sama sekali", "Sama aja, dua-duanya ubah tulisan jadi suara"],
    answer: 0,
    explanation: "ElevenLabs contohnya TTS, RVC contohnya Voice Changer. Dua kategori dengan tujuan beda.",
  },
  {
    question: "Buat pakai Voice Changer real-time pas nge-game atau live, device apa yang wajib ada?",
    choices: ["Mikrofon buat nangkep suara aslimu", "Kamera webcam buat facecam", "Speaker aktif tambahan", "Printer"],
    answer: 0,
    explanation: "Tanpa input suara asli, nggak ada bahan mentah yang bisa diproses jadi suara lain.",
  },
  {
    question: "Kalau Voice Changer cuma dipakai lewat HP (bukan PC), keterbatasannya apa?",
    choices: ["Kebanyakan cuma bisa convert dari rekaman, belum bisa real-time", "Nggak bisa dipakai sama sekali", "Justru lebih cepat dari PC", "Hasilnya otomatis lebih bagus daripada di PC"],
    answer: 0,
    explanation: "RVC real-time butuh spek berat, jadi opsi di HP umumnya baru sebatas convert file, belum live.",
  },
  {
    question: "Istilah Pitch dalam voice changing ngatur soal apa?",
    choices: ["Tinggi-rendahnya nada suara", "Volume atau kerasnya suara", "Kecepatan omongan", "Kejernihan suara"],
    answer: 0,
    explanation: "Pitch yang nggak pas bikin hasil suaranya kedengeran aneh dan nggak natural.",
  },
  {
    question: "Voice model dalam RVC itu sebenarnya apa?",
    choices: ["File hasil belajar AI dari suara seseorang buat niruin suara itu", "Software aplikasi voice changer itu sendiri", "Microphone digital buat rekaman suara", "Filter audio bawaan dari Windows"],
    answer: 0,
    explanation: "Makin bagus dan bersih data suara buat training-nya, makin mirip juga hasil voice model-nya.",
  },
  {
    question: "ComfyUI itu apa?",
    choices: ["Software node buat jalanin AI generative (gambar, video, suara) di PC sendiri, gratis", "Aplikasi chatting kayak WhatsApp buat ngobrol sehari-hari", "Merk kartu grafis khusus buat main game", "Situs marketplace buat jual-beli prompt AI"],
    answer: 0,
    explanation: "Berbasis node artinya kamu nyambung-nyambungin blok proses, bukan ngetik baris kode.",
  },
  {
    question: "LoRA dalam generative AI fungsinya buat apa?",
    choices: ["File kecil tambahan buat bikin AI niruin gaya atau karakter tertentu", "Virus komputer yang nyerang dan ngerusak file gambar", "Jenis kabel VGA buat nyambungin monitor", "Aplikasi buat crop dan resize foto"],
    answer: 0,
    explanation: "LoRA ditempel ke model utama (checkpoint), jadi nggak perlu download model raksasa baru tiap mau gaya beda.",
  },
  {
    question: "Kalau seed dan prompt-nya sama persis, hasil generate gambarnya bakal…",
    choices: ["Sama persis", "Selalu beda dikit", "Otomatis error", "Random total"],
    answer: 0,
    explanation: "Seed itu kunci yang bikin proses generate bisa direproduksi ulang.",
  },
  {
    question: "Apa itu Negative Prompt?",
    choices: ["Daftar hal yang TIDAK boleh muncul di hasil generate", "Prompt yang isinya kata-kata kasar", "Prompt khusus buat menghapus gambar", "Bagian yang wajib diisi paling akhir"],
    answer: 0,
    explanation: "Senjata utama buat ngelawan tangan aneh, jari kelebihan, dan artefak lain di gambar AI.",
  },
  {
    question: "CivitAI itu platform buat apa?",
    choices: ["Download model dan workflow generative AI, gratis", "Toko online beli hardware PC", "Forum diskusi umum soal PC", "Marketplace jual-beli akun game"],
    answer: 0,
    explanation: "Gudangnya model checkpoint, LoRA, sampe workflow siap pakai buat ComfyUI.",
  },
  {
    question: "Upscaler dalam generative AI dipakai buat…",
    choices: ["Menajamkan gambar beresolusi kecil jadi HD, bukan cuma di-stretch", "Mengecilkan ukuran file gambar biar ringan", "Menghapus background foto secara otomatis", "Nambahin watermark ke gambar otomatis"],
    answer: 0,
    explanation: "Upscaler AI menggambar ulang detailnya, beda sama sekadar narik-narik pixel biasa.",
  },
]

const mediumPool: QuizQuestion[] = [
  {
    question: "Context window pada LLM itu maksudnya apa?",
    choices: ["Batas jumlah teks (token) yang bisa diingat AI dalam satu obrolan", "Jendela pop-up buat setting akun", "Waktu maksimal AI boleh mikir sebelum jawab", "Jumlah gambar yang bisa di-upload sekaligus"],
    answer: 0,
    explanation: "Kalau obrolan kepanjangan ngelewatin batasnya, bagian paling awal bakal kelupaan duluan.",
  },
  {
    question: "Bedanya model AI open-weight sama open-source murni?",
    choices: ["Open-weight cuma bagi hasil modelnya, bukan resep dan kode trainingnya", "Nggak ada bedanya sama sekali, cuma istilah", "Open-weight harus bayar, open-source gratis selamanya", "Open-weight cuma bisa jalan di cloud"],
    answer: 0,
    explanation: "Banyak model kayak Llama atau Qwen disebut open padahal yang dibagi cuma file bobotnya.",
  },
  {
    question: "System prompt beda sama prompt biasa yang kamu ketik gimana?",
    choices: ["System prompt ngatur peran AI dari belakang layar, nggak kelihatan user", "System prompt cuma ada di versi AI yang gratis", "Nggak ada bedanya sama sekali, cuma istilah doang", "System prompt wajib lebih pendek dari prompt biasa"],
    answer: 0,
    explanation: "Developer biasanya nyetel system prompt buat nentuin gaya bicara atau batasan AI.",
  },
  {
    question: "Istilah multimodal pada AI kayak Gemini maksudnya apa?",
    choices: ["Bisa ngerti teks, gambar, audio, dan video sekaligus", "Bisa dipakai bareng di banyak device sekaligus", "Punya banyak pilihan tema warna tampilan", "Bisa jawab dalam banyak bahasa sekaligus"],
    answer: 0,
    explanation: "Dulu AI cuma jago teks doang, sekarang bisa lihat gambar dan dengar audio dalam obrolan yang sama.",
  },
  {
    question: "Fine-tuning pada model AI beda sama sekadar kasih prompt panjang di mana?",
    choices: ["Fine-tuning latih ulang bobot model, bukan cuma instruksi obrolan", "Fine-tuning cuma istilah keren buat prompt yang panjang", "Fine-tuning berarti AI-nya di-restart total", "Fine-tuning cuma bisa dilakuin developer resmi si AI"],
    answer: 0,
    explanation: "Makanya fine-tuning butuh dataset dan proses training sendiri, efeknya permanen bukan tempelan sesi.",
  },
  {
    question: "AI Agent beda sama chatbot biasa di mana?",
    choices: ["Agent bisa mutusin dan eksekusi tugas sendiri pakai tools", "Agent itu cuma versi chatbot yang lebih lambat", "Agent sama sekali nggak bisa diajak ngobrol", "Cuma istilah marketing, fungsinya identik sama chatbot"],
    answer: 0,
    explanation: "Chatbot biasa nunggu kamu nanya terus, agent bisa mikir multi-step dan gerak sendiri pakai tools.",
  },
  {
    question: "RVC resminya singkatan dari apa?",
    choices: ["Retrieval-based Voice Conversion", "Realtime Voice Changer", "Rapid Voice Cloning", "Recorded Voice Clip"],
    answer: 0,
    explanation: "Meski sering dipakai real-time, RVC sendiri sama sekali nggak ada kata realtime-nya.",
  },
  {
    question: "w-okada dan Applio sama-sama berbasis RVC, tapi beda fokusnya di mana?",
    choices: ["w-okada ringan fokus real-time, Applio lengkap termasuk training", "w-okada berbayar sedangkan Applio gratis", "w-okada cuma jalan di Mac, Applio cuma di Windows", "Nggak ada bedanya sama sekali, cuma beda logo"],
    answer: 0,
    explanation: "w-okada itu OG-nya real-time voice changer yang ringan, Applio lebih all-in-one.",
  },
  {
    question: "EaseUS VoiceWave itu kategori Voice Changer berbasis apa?",
    choices: ["Pitch-based, geser nada suara, bukan RVC", "RVC, sama kayak w-okada dan Applio", "TTS murni buat baca teks", "Speech-to-Text buat transkrip"],
    answer: 0,
    explanation: "VoiceWave gampang dipakai dan fiturnya lengkap, tapi cara kerjanya geser pitch, bukan menirukan suara orang lewat AI kayak RVC.",
  },
  {
    question: "Kenapa RAM tetep penting buat voice changing atau generative AI, di luar VRAM?",
    choices: ["RAM nanganin OS, aplikasi lain, dan caching di sekitar model", "RAM sebenarnya yang proses model AI-nya, bukan VRAM", "RAM cuma buat nyimpen hasil akhir", "Nggak penting sama sekali, cuma VRAM yang ngaruh"],
    answer: 0,
    explanation: "VRAM buat otaknya model jalan, RAM buat semua proses pendukung di sekitarnya biar nggak macet.",
  },
  {
    question: "Dataset ideal buat training voice model itu kayak gimana?",
    choices: ["Rekaman suara jernih, beberapa menit, minim noise dan musik", "Rekaman konser biar variasi nadanya banyak", "Sebanyak-banyaknya file, kualitas nomor dua", "Cukup 1 kalimat pendek aja"],
    answer: 0,
    explanation: "Sampah masuk, sampah keluar. Dataset berisik bikin hasilnya ikutan berisik dan nggak mirip.",
  },
  {
    question: "Latency dalam voice changing real-time itu maksudnya apa?",
    choices: ["Jeda waktu antara kamu ngomong sampai suara hasil olahan keluar", "Kualitas akhir suara yang dihasilkan", "Jumlah voice model yang bisa disimpan", "Volume maksimum yang bisa diatur"],
    answer: 0,
    explanation: "Makin kecil latency-nya, makin nyaman dipakai real-time, tapi biasanya nuntut spek yang lebih gede.",
  },
  {
    question: "Device audio-mu punya banyak pilihan sample rate dan bingung pilih yang mana. Aturan amannya gimana?",
    choices: ["Ikuti sample rate asli device, jangan asal pilih", "Selalu pilih yang paling tinggi biar paling jernih", "Selalu pilih yang paling rendah biar ringan", "Sample rate nggak ngaruh ke apa pun"],
    answer: 0,
    explanation: "Sample rate yang mismatch salah satu penyebab suara jadi pitchy atau malah lag, bukan soal makin tinggi makin bagus.",
  },
  {
    question: "Checkpoint dan LoRA hubungannya kayak apa?",
    choices: ["Checkpoint itu model utama atau mesinnya, LoRA aksesoris tambahan buat gaya spesifik", "Checkpoint versi gratis, LoRA versi berbayar", "Keduanya hal yang identik, cuma beda istilah", "LoRA itu upgrade dari checkpoint, checkpoint jadi nggak kepake lagi"],
    answer: 0,
    explanation: "Kamu bisa pasang beberapa LoRA sekaligus di atas 1 checkpoint buat gabungin beberapa gaya.",
  },
  {
    question: "ControlNet dipakai buat ngatur apa di hasil generate?",
    choices: ["Pose, komposisi, atau bentuk gambar pakai referensi gambar lain", "Mengatur warna dominan yang dipakai gambar", "Mengatur ukuran file hasil akhirnya", "Mengatur kecepatan proses generate"],
    answer: 0,
    explanation: "Tanpa ControlNet, AI bebas nentuin pose dan komposisi sendiri, kadang hasilnya ngarang jauh dari yang dibayangin.",
  },
  {
    question: "Batch besar pas generate gambar atau video butuh apa yang lebih banyak?",
    choices: ["VRAM", "Internet", "HDD", "Monitor"],
    answer: 0,
    explanation: "Generate banyak sekaligus berarti banyak proses yang harus di-load bareng ke VRAM.",
  },
  {
    question: "Embedding di generative AI (misal buat ngurangin jari aneh) dipanggil lewat apa?",
    choices: ["Kata kunci khusus yang diketik di prompt", "Klik kanan di gambar hasil", "Menu setting terpisah", "Nggak perlu dipanggil, otomatis aktif"],
    answer: 0,
    explanation: "Contohnya embedding bad-hands yang tinggal disebut di negative prompt.",
  },
  {
    question: "Flux, model image generation yang belakangan populer di ComfyUI, dikembangin oleh siapa?",
    choices: ["Black Forest Labs", "Tim yang sama persis kayak ComfyUI", "OpenAI", "Midjourney"],
    answer: 0,
    explanation: "Makanya kualitas dan filosofinya kerasa mirip keluarga sama Stable Diffusion, meski beda perusahaan.",
  },
  {
    question: "CFG Scale di ComfyUI atau Stable Diffusion ngatur soal apa?",
    choices: ["Tingkat AI nurut ke prompt (makin tinggi makin ketat)", "Mengatur kecepatan proses render", "Mengatur batas resolusi maksimal gambar", "Jumlah gambar yang di-generate sekaligus"],
    answer: 0,
    explanation: "CFG kelewat tinggi malah bisa bikin gambar over-saturated atau aneh, bukan makin bagus.",
  },
  {
    question: "Bedanya workflow img2img sama txt2img?",
    choices: ["img2img ubah gambar referensi, txt2img bikin baru dari teks", "img2img cuma buat gaya anime, txt2img cuma buat foto realistis", "Sama aja sebenernya, cuma beda nama doang", "img2img nggak butuh model atau checkpoint sama sekali"],
    answer: 0,
    explanation: "img2img cocok kalau kamu udah punya komposisi atau pose yang pas dan tinggal diubah gayanya.",
  },
]

const hardPool: QuizQuestion[] = [
  {
    question: "Kenapa hasil generate LLM bisa beda dikit walau prompt-nya sama persis (nggak kayak image gen yang bisa dikunci seed)?",
    choices: ["Ada sampling acak (temperature), token berikutnya nggak selalu pasti", "LLM-nya emang selalu error total", "Server yang dipakai beda tiap kali nanya", "Prompt yang keliatan sama sebenernya beda karakter tersembunyi"],
    answer: 0,
    explanation: "Parameter kayak temperature sengaja bikin variasi biar jawaban nggak kaku kayak dibaca dari skrip.",
  },
  {
    question: "Kalau LLM kehabisan context window di tengah obrolan panjang, yang biasanya kejadian apa?",
    choices: ["Bagian paling awal obrolan mulai kelupaan AI", "Aplikasinya otomatis crash total", "AI otomatis mulai ngomong bahasa lain", "Obrolan otomatis ke-lock, nggak bisa lanjut"],
    answer: 0,
    explanation: "Kalau AI mulai lupa instruksi awal, itu bukan bug, itu emang batasan context window.",
  },
  {
    question: "RAG (Retrieval-Augmented Generation) cara kerjanya gimana secara singkat?",
    choices: ["AI nyari dulu info relevan dari sumber eksternal (dokumen atau database), baru jawab berdasarkan itu", "AI ngelatih ulang dirinya sendiri tiap ada pertanyaan baru", "Mode aman biar nggak ngasih jawaban yang kontroversial", "Fitur buat generate gambar dari teks yang panjang"],
    answer: 0,
    explanation: "RAG salah satu cara ngurangin hallucination. AI nggak cuma modal ingatan internal, tapi beneran nyari referensi dulu.",
  },
  {
    question: "Model AI lokal biasanya dalam format terkuantisasi (misal GGUF). Tujuan kuantisasi ini apa?",
    choices: ["Ngecilin ukuran dan VRAM model, kualitas turun dikit", "Bikin model jadi lebih pintar dari versi aslinya", "Mempercepat koneksi internet saat generate", "Mengubah bahasa utama yang dipakai model"],
    answer: 0,
    explanation: "Makanya model raksasa yang harusnya butuh puluhan GB VRAM bisa dipaksa muat di GPU konsumen lewat kuantisasi.",
  },
  {
    question: "Istilah AI slop makin sering dipakai buat ngritik apa di ekosistem konten kreator?",
    choices: ["Konten AI generik template massal ngejar engagement", "Semua jenis konten yang dibantu AI tanpa terkecuali", "Konten AI yang gagal di-render atau error total", "Fitur monetisasi baru di YouTube Studio"],
    answer: 0,
    explanation: "Bukan berarti pakai AI = slop. Bedanya ada di niat dan effort: asal produksi banyak vs beneran diriset dan dikurasi.",
  },
  {
    question: "Kenapa dua provider LLM besar bisa punya harga API yang jauh beda padahal sama-sama pintar?",
    choices: ["Beda arsitektur, efisiensi, dan strategi bisnisnya", "Yang mahal harganya pasti selalu lebih pintar", "Harga API itu random dan nggak ada hitungannya", "Semua provider LLM sebenernya motornya sama persis"],
    answer: 0,
    explanation: "Makanya penting compare berdasarkan use-case kamu, bukan cuma yang mahal pasti terbaik.",
  },
  {
    question: "VRAM cukup, tapi training atau real-time voice changer tetep lag dan patah-patah. Biang keladi yang sering keluput dicek?",
    choices: ["HAGS (GPU Scheduling) nyala dan ganggu VRAM aplikasi AI", "VRAM-nya kurang gede meski tulisannya cukup", "Mik yang dipakai rusak total", "Softwarenya emang selalu lag parah"],
    answer: 0,
    explanation: "HAGS ini setting Windows yang niatnya bantu gaming, tapi sering malah ganggu aplikasi AI lokal. Coba dimatiin dulu kalau ngalamin lag aneh.",
  },
  {
    question: "Di Applio, fitur yang nge-gabung dua model .pth jadi satu model hybrid baru disebut apa?",
    choices: ["Voice Blender", "Model Merger Pro", "Blend Mode", "Auto Fusion AI"],
    answer: 0,
    explanation: "Fitur Model Fusion ini cuma nge-blend file bobotnya (.pth). Index-nya tetap generate ulang manual.",
  },
  {
    question: "Suara hasil voice changer kedengeran robotic atau patah-patah pas real-time. Solusi standarnya?",
    choices: ["Naikin buffer size biar proses lebih lega", "Turunin volume mic sampai paling minim", "Matiin GPU yang dipakai sekalian", "Ganti bahasa sistem operasinya"],
    answer: 0,
    explanation: "Buffer kekecilan bikin prosesnya kejar-kejaran sama input real-time. Nambahin dikit biasanya udah cukup nolong.",
  },
  {
    question: "Aplikasi voice changer nggak kedeteksi Discord atau game. Penyebab klasiknya?",
    choices: ["Urutan bukanya kebalik (changer dulu baru Discord)", "Discord memang nggak pernah kompatibel sama voice changer apa pun", "Device audio-nya rusak permanen total", "RAM kepenuhan total sampai mentok"],
    answer: 0,
    explanation: "Aplikasi yang buka duluan sering nggak notice ada virtual device baru yang nongol belakangan.",
  },
  {
    question: "Metode ekstraksi pitch (F0) kayak RMVPE, Crepe, atau FCPE di RVC atau Applio fungsinya secara umum ngapain?",
    choices: ["Cara sistem baca nada asli buat dipetakan ke target", "Menentukan resolusi video hasil convert", "Mengompres ukuran file audionya", "Memblokir noise bising sekitar mic"],
    answer: 0,
    explanation: "Beda metode F0 punya trade-off akurasi vs kecepatan beda-beda. Makanya opsinya lebih dari satu, bukan cuma gaya-gayaan.",
  },
  {
    question: "Mic udah dicolok bener tapi aplikasi voice changer nggak baca suaranya sama sekali. Setting Windows apa yang wajib dicek?",
    choices: ["Mode exclusive di properti mic (Sound Control Panel)", "Pengaturan dark mode di Windows", "Pengaturan ukuran font sistem", "Mode hemat baterai yang nyala"],
    answer: 0,
    explanation: "Kalau mode exclusive ini nyala atau salah setting, aplikasi lain jadi rebutan izin akses mic-nya.",
  },
  {
    question: "Cuma 1 voice model tertentu doang yang keluar suara robot aneh (model lain normal). Kemungkinan besar penyebabnya?",
    choices: ["File model itu corrupt atau gagal download sempurna", "Semua model pasti bakal begitu cepat atau lambat", "Mic-nya cuma rusak khusus buat model itu", "Settingan Windows beda-beda tiap model"],
    answer: 0,
    explanation: "Kalau cuma 1 file yang bermasalah, itu tanda paling kuat filenya sendiri yang gagal, bukan setup kamu.",
  },
  {
    question: "Muncul error CUDA out of memory pas generate. Selain beli VGA baru, solusi cepat apa yang bisa dicoba?",
    choices: ["Turunin resolusi atau batch, pakai model kuantisasi", "Restart PC berkali-kali sampai hilang sendiri", "Ganti nama file workflow-nya satu-satu", "Update Windows ke versi paling terbaru"],
    answer: 0,
    explanation: "Error ini murni soal VRAM kehabisan ruang. Ngecilin beban kerja jauh lebih cepat daripada nunggu keajaiban.",
  },
  {
    question: "Custom nodes di ComfyUI bikin error pas startup. Cara paling gampang kelola install atau update-nya?",
    choices: ["Pakai ComfyUI Manager, tinggal klik tanpa oprek manual", "Install ulang seluruh ComfyUI dari nol tiap ada masalah", "Edit file Python-nya manual satu-satu", "Custom node nggak bisa di-uninstall, cuma bisa dibiarin"],
    answer: 0,
    explanation: "ComfyUI Manager itu semacam app store-nya buat urusan custom node, jauh lebih aman daripada oprek manual.",
  },
  {
    question: "Gambar hasil generate keluar warna aneh atau pecah walau workflow-nya keliatan normal. Penyebab klasik yang sering keluput?",
    choices: ["VAE nggak cocok atau mismatch sama checkpoint", "Warna monitor kamu emang udah salah dari awal", "Prompt yang diketik kepanjangan", "Sampler yang dipilih ilegal aturannya"],
    answer: 0,
    explanation: "VAE itu semacam penerjemah terakhir dari data mentah ke gambar. Salah pasang VAE, hasilnya bisa washed-out atau pecah warnanya.",
  },
  {
    question: "Workflow ComfyUI-mu jalan mulus, tapi dibuka di PC lain error model not found atau node missing. Kenapa?",
    choices: ["File workflow cuma referensi nama, model dan node-nya download manual", "File workflow-nya emang rusak total", "ComfyUI di PC lain wajib beda versi", "Itu bug ComfyUI yang nggak ada solusinya"],
    answer: 0,
    explanation: "Makanya kalau share workflow, biasain sertain juga daftar model dan custom node yang dipakai biar orang lain nggak bingung.",
  },
  {
    question: "RunComfy dan layanan cloud ComfyUI sejenis itu solusi buat masalah apa spesifiknya?",
    choices: ["Nggak punya VRAM cukup tapi tetap mau pakai ComfyUI", "Biar nggak perlu internet sama sekali", "Biar hasil generate-nya otomatis lebih bagus", "Biar nggak perlu belajar workflow atau node"],
    answer: 0,
    explanation: "Trade-off-nya cuma soal biaya (bayar per pemakaian), bukan soal kualitas atau kemudahan belajar node-nya.",
  },
  {
    question: "Upscaler AI dipasang tapi hasilnya malah muncul detail atau tekstur aneh yang nggak ada di gambar aslinya. Gejala umum dari apa?",
    choices: ["Denoise ketinggian, upscaler ngarang detail baru", "Kapasitas VRAM-nya kelebihan beban", "Resolusi awal gambarnya udah kegedean", "Itu tandanya harus ganti checkpoint total"],
    answer: 0,
    explanation: "Upscaler AI itu setengah menggambar ulang. Kalau parameternya kelewat agresif, dia mulai improvisasi sendiri.",
  },
  {
    question: "Dua model open video generation yang sering disebut buat workflow image-to-video di ComfyUI belakangan ini datang dari perusahaan mana aja?",
    choices: ["Alibaba dan Lightricks", "Cuma dari satu perusahaan yang sama", "Microsoft dan Apple", "Nggak ada yang open, semuanya tertutup atau berbayar"],
    answer: 0,
    explanation: "Dua-duanya rutin update, jadi wajar kalau versi yang kamu tau sekarang udah nggak versi terbaru lagi beberapa bulan ke depan. Emang secepat itu majunya.",
  },
]

const ballPool: QuizQuestion[] = [
  {
    question: "VGA PC utama admin WeeKnow sekarang seri apa?",
    choices: ["RTX 5060 Ti 16GB", "RTX 4090 24GB", "RTX 3060 12GB", "GTX 1660 Super"],
    answer: 0,
    explanation: "Laptopnya malah cuma RTX 3050 6GB. Video berat kebanyakan digarap dari PC utama.",
  },
  {
    question: "Video WeeKnow yang paling banyak ditonton ngebahas soal apa?",
    choices: ["Tutorial RVC w-okada 2024", "Review dasar-dasar ComfyUI", "Tier list GPU buat AI", "Cara bikin thumbnail YouTube"],
    answer: 0,
    explanation: "Kalah tayang duluan dari video Tier List atau VoiceWave, tapi tetep video RVC 2024 ini yang paling ngangkat.",
  },
  {
    question: "Menurut FAQ resmi WeeKnow, cara paling ampuh bikin admin senang itu ngapain?",
    choices: ["Klik tombol orange di kanan atas", "Kirim donasi gede-gedean", "Spam chat Discord", "Subscribe 10 akun sekaligus"],
    answer: 0,
    explanation: "Simpel, receh, tapi work. Literally tertulis di FAQ bagian Other Questions.",
  },
  {
    question: "Paket kabel buat nyambungin voice changer dari PC ke HP Android butuh total berapa item?",
    choices: ["3 kabel: AUX, splitter, converter", "Cuma 1 kabel USB biasa", "Butuh 5 kabel plus solder manual", "Nggak butuh kabel, wireless semua"],
    answer: 0,
    explanation: "Ribet emang di awal, tapi begitu paham urutannya, tinggal colok-colok doang tiap mau live.",
  },
  {
    question: "Video Tier List Voice Changer WeeKnow itu nyakup device apa aja?",
    choices: ["PC dan Android", "Cuma iPhone doang", "Konsol game", "Smart TV"],
    answer: 0,
    explanation: "Judul lengkapnya emang nyebut eksplisit dua platform itu biar penonton nggak salah ekspektasi.",
  },
  {
    question: "Sebelum resmi diumumin sebagai produk Google, Nano Banana awalnya dites diam-diam (anonim) di platform mana?",
    choices: ["LMArena", "Discord komunitas", "Reddit", "GitHub"],
    answer: 0,
    explanation: "Biar penilaiannya nggak bias gara-gara oh ini buatan Google pasti bagus, makanya ditest pakai nama samaran dulu.",
  },
  {
    question: "Nama Nano Banana itu asal-usulnya dari gabungan apa?",
    choices: ["Gabungan 2 nickname pribadi si product manager-nya sendiri", "Akronim resmi divisi riset Google", "Hasil voting netizen pas peluncuran", "Terinspirasi merek pisang lokal"],
    answer: 0,
    explanation: "Submit dadakan jam setengah 3 pagi buat tes anonim, eh nama iseng itu malah lebih nempel daripada nama teknisnya.",
  },
  {
    question: "Tren AI yang bikin foto orang berubah gaya kartun ala Studio Ghibli itu jadi salah satu momen meme AI paling gede. Fitur AI dari siapa yang jadi biang keroknya?",
    choices: ["Fitur generate dan edit gambar ChatGPT", "Fitur voice changer yang viral", "Update algoritma TikTok terbaru", "Game AI baru yang lagi hits"],
    answer: 0,
    explanation: "Saking booming-nya, tren ini disebut salah satu momen meme AI terbesar sepanjang 2025-2026.",
  },
  {
    question: "Aplikasi standalone bikinan OpenAI yang isinya feed video-video AI mirip TikTok itu namanya apa?",
    choices: ["Sora", "Runway", "Pika", "Kling"],
    answer: 0,
    explanation: "Modelnya sendiri masih idup di dalam ChatGPT, tapi aplikasi terpisahnya udah ditutup.",
  },
  {
    question: "Istilah AI Slop resmi dinobatin jadi apa sama kamus Merriam-Webster?",
    choices: ["Word of the Year 2025", "Kata paling dilarang dipakai", "Nama fitur moderasi baru", "Bahasa resmi ke-2 kamus itu"],
    answer: 0,
    explanation: "Bukti nyata betapa berisiknya konten AI generik yang banjirin sosmed belakangan ini.",
  },
  {
    question: "Meme DLSS 5 ON di kalangan gamer ngeledekin soal apa?",
    choices: ["AI upscaling dan frame-gen kelewat mulus", "Harga VGA yang makin kemahalan parah", "Loading game yang lama banget", "Bug aneh di dalam menu setting"],
    answer: 0,
    explanation: "Teknologi AI upscaling makin canggih, tapi makin sempurna kadang malah makin aneh dilihat mata.",
  },
  {
    question: "Video AI yang paling sering dipake buat nunjukin dulu vs sekarang kemajuan AI video adalah video dengan tema…",
    choices: ["Will Smith makan spaghetti", "Presiden nge-dance TikTok", "Kucing ngomong bahasa Inggris", "Robot masak nasi goreng"],
    answer: 0,
    explanation: "Versi awalnya jadi bahan bercandaan saking anehnya, sekarang sering dipake buat perbandingan before-after kemajuan AI video.",
  },
  {
    question: "Istilah slang Clanker di internet dipakai buat nyebut apa?",
    choices: ["Robot atau AI secara umum", "Orang yang jago ngoding", "Sebutan buat GPU generasi lama", "Julukan buat AI yang error terus"],
    answer: 0,
    explanation: "Istilah receh yang mendadak populer jadi julukan buat robot atau AI, mirip fungsi nama ejekan di film fiksi ilmiah lama.",
  },
  {
    question: "Salah satu contoh AI hallucination paling terkenal (dari fitur AI Overview Google) adalah saran nambahin apa ke pizza biar kejunya nggak melorot?",
    choices: ["Lem (glue)", "Garam", "Susu", "Es batu"],
    answer: 0,
    explanation: "Saran ngaco ini jadi contoh klasik kenapa jangan telan mentah-mentah semua jawaban AI.",
  },
  {
    question: "Tes klasik buat ngukur apakah AI bisa ngibulin manusia supaya dikira ngobrol sama sesama manusia disebut apa?",
    choices: ["Turing Test", "CAPTCHA", "Beta Test", "Stress Test"],
    answer: 0,
    explanation: "Dicetusin sama Alan Turing tahun 1950, jauh sebelum chatbot modern kayak sekarang ada.",
  },
  {
    question: "Dead Internet Theory itu teori (agak konspiratif) yang bilang sebagian besar konten dan interaksi di internet sekarang digerakin oleh apa?",
    choices: ["Bot dan AI, bukan manusia asli", "Pemerintah yang nyensor semua konten", "Alien yang menyamar", "Perusahaan iklan doang"],
    answer: 0,
    explanation: "Teori ini makin sering diomongin lagi belakangan gara-gara banjirnya AI slop di berbagai platform.",
  },
  {
    question: "Seedance itu model video generation AI besutan perusahaan mana?",
    choices: ["ByteDance", "Meta (Facebook)", "Amazon", "Sony"],
    answer: 0,
    explanation: "Wajar aja perusahaan yang jago banget ngerti tren video pendek ikutan bikin model video generation sendiri.",
  },
  {
    question: "Istilah lawas yang sering dipake buat nyindir hasil AI yang kelewat sempurna sampe malah nyeremin itu disebut apa dalam bahasa Inggris?",
    choices: ["Uncanny valley", "Deja vu", "Plot twist", "Glitch in the matrix"],
    answer: 0,
    explanation: "Istilah ini sebenernya lebih tua dari AI generative modern. Awalnya dipake buat robot humanoid yang hampir mirip manusia tapi malah bikin ngeri.",
  },
  {
    question: "Watermark invisible yang katanya nempel di hasil AI image generation itu teknologinya biasa disebut apa (contoh besutan Google)?",
    choices: ["SynthID", "BigWatermark", "AI Stamp Pro", "GhostMark"],
    answer: 0,
    explanation: "Tujuannya biar konten AI masih bisa dilacak asal-usulnya meski udah nggak ada tulisan Made by AI-nya.",
  },
  {
    question: "Istilah vibe coding yang lagi hits ngegambarin gaya ngoding kayak gimana?",
    choices: ["Deskripsiin maksud ke AI, biar AI yang nulis kodenya", "Ngoding sambil dengerin musik lo-fi doang", "Metode ngoding yang paling formal dan terstruktur", "Ngoding tanpa pakai komputer sama sekali"],
    answer: 0,
    explanation: "Istilah yang sempet viral ini nyeritain gimana developer sekarang lebih banyak mengarahkan AI buat nulis kode ketimbang ngetik manual baris per baris.",
  },
]

export const quizThemes: QuizTheme[] = [
  {
    id: "quiz-easy",
    title: "Quiz AI",
    mode: "Easy",
    description: "Pemanasan. Dasar-dasar AI, Voice Changer, dan Generative AI.",
    accent: "#06AED5",
    questionCount: 10,
    pool: easyPool,
  },
  {
    id: "quiz-medium",
    title: "Quiz AI",
    mode: "Medium",
    description: "Mulai serius. Spek, tools, dan istilah yang lebih dalam.",
    accent: "#FA8333",
    questionCount: 10,
    pool: mediumPool,
  },
  {
    id: "quiz-hard",
    title: "Quiz AI",
    mode: "Hard",
    description: "Buat sepuh. Detail teknis dan troubleshooting workflow.",
    accent: "#EF4444",
    questionCount: 10,
    pool: hardPool,
  },
  {
    id: "quiz-ball",
    title: "Ball Knowledge",
    mode: "Elite",
    description: "Reference, lore, meme, dan trivia internet. Yang ngeh-ngeh aja.",
    accent: "#8B5CF6",
    questionCount: 10,
    pool: ballPool,
  },
]

// Acak urutan + ambil N soal. Dipanggil tiap mulai/ulang kuis.
// Pilihan jawaban juga diacak (biar kunci jawaban tidak selalu A)
// dengan `answer` disesuaikan mengikuti pilihan yang benar.
export function sampleQuestions(theme: QuizTheme): QuizQuestion[] {
  const copy = [...theme.pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, theme.questionCount).map((q) => {
    const order = [0, 1, 2, 3]
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    return {
      ...q,
      choices: [q.choices[order[0]], q.choices[order[1]], q.choices[order[2]], q.choices[order[3]]],
      answer: order.indexOf(q.answer),
    }
  })
}

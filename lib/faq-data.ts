export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqCategory {
  id: string
  title: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "voice-changer",
    title: "AI Voice Changer",
    items: [
      {
        id: "VC-Q1",
        question: "Apa itu RVC Voice Changer?",
        answer:
          "RVC (Retrieval-based Voice Conversion) adalah teknologi AI yang mengubah suaramu menjadi suara orang lain, bisa dipakai real-time maupun dari rekaman.",
      },
      {
        id: "VC-Q2",
        question: "Butuh spek PC atau laptop seperti apa?",
        answer:
          "Minimal VGA dengan VRAM 4GB untuk jalan real-time, tapi delay-nya masih tinggi. Biar delay rendah sambil main game, pakai VRAM 8GB ke atas. RAM 8-16GB menyesuaikan pemakaian.",
      },
      {
        id: "VC-Q3",
        question: "Cara install dan pakainya gimana?",
        answer:
          'Tutorial lengkapnya cek video "Tutorial RVC okada 2024" di channel YouTube WeeKnow, caranya masih relevan. Ikuti saja link versi terbaru di deskripsi video. Aplikasinya open source dan gratis.',
      },
      {
        id: "VC-Q4",
        question: "Download RVC voice model-nya di mana?",
        answer:
          'Lengkapnya di voice-models.com. Link-nya juga ada di "Link Tools AI".',
      },
      {
        id: "VC-Q5",
        question: "Ada aplikasi AI Voice Changer di HP Android nggak?",
        answer:
          "Ada, tapi tidak real-time. Soalnya RVC real-time butuh spek besar buat jalan.",
      },
      {
        id: "VC-Q6",
        question: "Kalau cuma punya HP tapi mau pakai Voice Changer, gimana?",
        answer:
          "Cari website yang menyediakan konversi audio-ke-audio gratis sesuai suara yang kamu mau. Kekurangannya: hanya bisa konversi, tidak bisa real-time.",
      },
      {
        id: "VC-Q7",
        question: "Apakah suara Voice Changer dari PC bisa disambungin ke Android?",
        answer:
          'Bisa banget! Cuma butuh 3 kabel, link belinya di "Product Links" bagian kabel. Tutorial nyambunginnya ada di video "Cara Sambungin Voice Changer dari PC ke Android".',
      },
      {
        id: "VC-Q8",
        question: "Aplikasi AI Voice Changer apa yang paling direkomendasikan?",
        answer:
          "Mau yang gratis dan ringan, pakai RVC w-okada. Mau yang gratis dan fiturnya banyak, pakai Applio. Mau yang berbayar, fiturnya lengkap, dan gampang dipakai, pakai Voicewave.",
      },
      {
        id: "VC-Q9",
        question: "PC atau laptop saya cocoknya pakai yang mana, min?",
        answer:
          'Cek video "Tier List AI Voice Changer 2026" buat cari aplikasi yang cocok dengan kebutuhan kalian.',
      },
      {
        id: "VC-Q10",
        question: "Kok suaranya nggak masuk ya, min? Padahal sudah ikutin tutorial.",
        answer:
          "Gatau. Banyak kemungkinan, bisa masalah setting mic level, sounds, hardware error, harus restart, harus re-install. Kalau mau tanya admin langsung, jelaskan dengan detail apa yang gabisa dan apa saja yang sudah dicoba.",
      },
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    items: [
      {
        id: "GA-Q1",
        question: "Apa itu ComfyUI?",
        answer:
          "ComfyUI adalah interface berbasis node buat jalanin berbagai model generative AI di PC sendiri. Kamu bisa bikin gambar, video, bahkan suara secara gratis dengan model dan workflow yang sudah di-install.",
      },
      {
        id: "GA-Q2",
        question: "Berapa spek minimal buat jalanin ComfyUI?",
        answer:
          "Tergantung model dan workflow yang dipakai. Mulai VRAM 6GB sudah bisa generate gambar simpel, tapi disarankan 8-16GB ke atas. RAM 16-32GB, dan storage sebaiknya SSD.",
      },
      {
        id: "GA-Q3",
        question: "Di mana download model dan workflow?",
        answer:
          'Model yang lengkap dan gratis ada di CivitAI. Workflow gratis dari gua ada di "Link Tools AI".',
      },
    ],
  },
  {
    id: "tentang-admin",
    title: "Tentang Admin",
    items: [
      {
        id: "TA-Q1",
        question: "Spek VGA PC dan laptop admin apa?",
        answer: "PC sekarang pakai RTX 5060 Ti 16GB, laptop pakai RTX 3050 6GB.",
      },
      {
        id: "TA-Q2",
        question: "Gimana cara nanya langsung ke admin?",
        answer:
          "DM Discord atau Instagram, tapi slow respon. Atau nanya langsung di server Discord.",
      },
      {
        id: "TA-Q3",
        question: "Bagaimana cara kolaborasi dengan admin?",
        answer:
          'Untuk collab antar content creator atau brand, langsung email lewat bagian "Contact".',
      },
    ],
  },
  {
    id: "tentang-weeknow",
    title: "Tentang WeeKnow",
    items: [
      {
        id: "TW-Q1",
        question: "Apa itu WeeKnow?",
        answer:
          "WeeKnow adalah platform edutainment AI dan Teknologi tempat kamu belajar tools terbaru, tips & trik, update berita, dan saling berdiskusi. Semua dibahas pakai bahasa kasual, bergaya santai dan bercanda, tapi tetap bernilai tinggi.",
      },
      {
        id: "TW-Q2",
        question: "Perbedaan WeeKnow dibanding channel lainnya?",
        answer:
          "WeeKnow fokus memberikan step-by-step workflow atau tutorial yang bisa langsung dipraktekin tanpa kebanyakan basa-basi. Ditambah gaya pembawaan dan jokes WeeKnow yang cocok buat audiens yang relate dengan budaya internet, meme, wibu, gaming, dan sejenisnya. Jadi di sini rasanya seperti nongkrong tapi sambil belajar.",
      },
      {
        id: "TW-Q3",
        question: "Gimana cara gabung komunitas WeeKnow?",
        answer:
          "Join Discord dan diskusi di sana. Subscribe YouTube buat dapet update tutorial dan pembahasan terbaru. Follow Instagram dan TikTok biar nggak ketinggalan update.",
      },
      {
        id: "TW-Q4",
        question: "Apakah WeeKnow membuka kelas untuk belajar langsung secara private?",
        answer:
          "Bisa, tergantung kebutuhan kalian. Khusus ini bisa lewat DM Discord atau email.",
      },
      {
        id: "TW-Q5",
        question: "Bagaimana cara paid collaboration dan endorsement dengan WeeKnow?",
        answer: 'Jangan sungkan email langsung ke WeeKnow lewat bagian "Contact".',
      },
    ],
  },
  {
    id: "other",
    title: "Other Questions",
    items: [
      {
        id: "OQ-Q1",
        question: "Ini website apa?",
        answer: "Semua yang kalian cari, biar ada di satu tempat.",
      },
      {
        id: "OQ-Q2",
        question: "Kok yang gua cari nggak ada?",
        answer: "Coba tanya admin langsung aja.",
      },
      {
        id: "OQ-Q3",
        question: "Cara membuat admin senang?",
        answer: "Klik tombol orange di kanan atas hehe.. Makasih~",
      },
    ],
  },
]

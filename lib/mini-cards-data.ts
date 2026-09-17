// Teks kartu mini kanan di Vault (FAQ, Glosarium, Quiz AI).
// Cara edit manual: ubah teks di bawah. Icon + angka count dihitung
// otomatis di komponen (tidak perlu disentuh).
// PENTING: `id` jangan diganti (dipakai routing di vault-section.tsx),
// dan file ini sengaja tidak ikut `npm run check` karena id-nya memang
// sama dengan id kategori (faq).

export interface MiniCardContent {
  id: "faq" | "glossary" | "quiz"
  title: string
  description: string
  cta: string
  accent: string
}

export const miniCardsContent: MiniCardContent[] = [
  {
    id: "faq",
    title: "FAQ",
    description: "Mentok error atau kepo? Jawabannya kemungkinan besar sudah ada di sini.",
    cta: "Cari Pertanyaan",
    accent: "#22D3EE",
  },
  {
    id: "glossary",
    title: "Glosarium",
    description: "Bedah istilah AI biar ngobrol sama tutorialnya nyambung.",
    cta: "Cari Istilah",
    accent: "#10B981",
  },
  {
    id: "quiz",
    title: "Quiz AI",
    description: "Empat mode, sepuluh badge. Seberapa sepuh kamu?",
    cta: "Mulai Kuis",
    accent: "#F59E0B",
  },
]

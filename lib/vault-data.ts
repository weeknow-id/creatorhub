import type { ComponentType, CSSProperties } from "react"
import { CircleHelp, Link2, Package, Sparkles } from "lucide-react"
import { allAsistenPrompts } from "@/lib/prompt-asisten-data"
import { faqCategories } from "@/lib/faq-data"

export type CategoryKind = "prompt" | "product" | "link" | "workflow" | "cable" | "faq"

export interface VaultItem {
  id: string
  name: string
  description: string
  badge?: string
  content: string
  logo?: string
}

export interface VaultCategory {
  id: string
  kind: CategoryKind
  icon: ComponentType<{ className?: string; style?: CSSProperties; strokeWidth?: string | number }>
  eyebrow: string
  title: string
  description: string
  subtitle?: string
  accent: string
  cta: string
  items: VaultItem[]
  sections?: Array<{
    heading: string
    subtitle: string
    items: VaultItem[]
    accent?: string
  }>
}

// Prompt Generative AI - 6 prompts
const promptGenAiItems = [
  { id: "g1", name: "Upscaler", description: "Ubah foto atau gambar burem jadi HD & Crispy", badge: "IMG", content: "A high-fidelity, ultra-sharp enhancement of this image. Recreate the original composition and subjects with pristine, crystalline clarity. Eliminate all motion blur, compression artifacts, and lens defocus, transforming the scene into a tack-sharp photograph captured on a professional DSLR with a high-end prime lens. Focus heavily on rendering crisp micro-textures: clean defined edges, visible intricate surface details, and lifelike depth. The lighting must be clean and natural, accentuating the sharp focus and high resolution without altering the original colors or structural layout of the subjects." },
  { id: "g2", name: "Product Photography", description: "Ubah foto jelek jadi foto produk yang lebih proper", badge: "IMG", content: "Professional commercial product photography enhancement and studio staging based on the uploaded reference photo. Strictly preserve the authentic design, exact silhouette, structural proportions, materials, labels, and color fidelity of the main item: [INSERT PRODUCT NAME / DESCRIPTION HERE]." },
  { id: "g3", name: "Formal Photoshoot", description: "Ubah foto selfie jelek jadi foto formal yang lebih rapih", badge: "IMG", content: "Professional formal ID portrait and headshot transformation based on the uploaded selfie photo, tailored specifically for [KOTAK 1: TUJUAN FOTO - e.g., Professional CV / Official Marriage Book / Academic Diploma]." },
  { id: "g4", name: "PP Wibu Misteriuzz", description: "Ubah foto lo jadi keren sangat", badge: "IMG", content: "Create an image using the original face from the reference photo without changing facial structure, skin tone, or identity. The face must remain identical, natural, and realistic (not AI-generated looking). mirror selfie layar MacBook, medium close-up (dada ke atas), framing sedikit miring (subtle tilt), fokus utama ke layar laptop." },
  { id: "g5", name: "Dikelilingi oleh 5 Waifu", description: "Taro foto lo, ganti nama waifunya", badge: "IMG", content: "A grainy selfie, with great motion blur, taken with an iPhone 17 Pro Max in front of a mirror, in 9:16 format. In a dark room, with an unmade bed and uncombed sheets in the background. In the foreground, [WAIFU 1] is to the left of [WAIFU 2], [WAIFU 3] leans from a higher angle to join the selfie, and [WAIFU 4] has her hand in hair, and to the right is [WAIFU 5]." },
  { id: "g6", name: "Selfie with You", description: "Taro foto lo + Taro foto Waifu = Selfie mereka", badge: "IMG", content: "ULTRA-REALISTIC, SMARTPHONE SELFIE. High-resolution photo captured on a modern smartphone camera (like an iPhone or Samsung). The image strictly preserves the identity, facial structure, and smiling expression of the user from [INSERT USER PHOTO REFERENCE] and depicts them taking a joyful, close-up selfie with the anime character [INSERT ANIME CHARACTER NAME & REFERENCE]." }
]

// Link Hardware Products - 6 products
const hardwareItems = [
  { id: "h1", name: "RTX 5060 Ti", description: "Buat Gaming & AI yang lebih kompleks", badge: "VRAM 16GB", content: "https://s.shopee.co.id/50YkU54EK4?share_channel_code=1" },
  { id: "h2", name: "RTX 5060", description: "Buat Gaming & AI starter pack", badge: "VRAM 8GB", content: "https://s.shopee.co.id/20v8uljaaK?share_channel_code=1" },
  { id: "h3", name: "Laptop Lenovo di Video", description: "RTX 3050, VRAM 6GB, RAM 16GB", badge: "VRAM 6GB", content: "https://s.shopee.co.id/1BM1wVhain?share_channel_code=1" },
  { id: "h4", name: "Mic Condenser", description: "Cocok buat Voice Changer dan Livestreaming", badge: "500k", content: "https://s.shopee.co.id/6q0OgtF3i9?share_channel_code=1" },
  { id: "h5", name: "Keyboard Saya", description: "Warnanya mirip zeta...", badge: "700k", content: "https://s.shopee.co.id/5AsAhtrP7b?share_channel_code=1" },
  { id: "h6", name: "Mouse Fantech WG9", description: "Yang Zeta udah Sold Out hehe", badge: "300k", content: "https://s.shopee.co.id/5VV16aEuxF?share_channel_code=1" }
]

// Connection Cables - 3 cables
const cableItems = [
  { id: "c1", name: "Kabel Aux Male to Male TRS", description: "Buat sambungin dari Laptop ke Splitter", badge: "TRS", content: "https://s.shopee.co.id/30nRX4uaKi?share_channel_code=1" },
  { id: "c2", name: "Kabel Splitter 4-Pole", description: "Buat Split Mic dan Headset", badge: "TRRS", content: "https://s.shopee.co.id/112N9qz04x?share_channel_code=1" },
  { id: "c3", name: "Kabel Audio Converter Type-C", description: "Buat Convert ke HP yang gaada lobang Jack", badge: "Type-C", content: "https://s.shopee.co.id/2qU1L2Ewqo?share_channel_code=1" }
]

// Link Resources - 9 links
const resourceItems = [
  { id: "r1", name: "ComfyUI", description: "Tool Generative AI yang Local & Gratis tapi butuh VRAM", badge: "Free", content: "https://comfy.org/", logo: "/creatorhub/images/logos/comfyui.png" },
  { id: "r2", name: "RunComfy", description: "ComfyUI tanpa VRAM tapi bayar", badge: "Premium", content: "https://www.runcomfy.com/", logo: "/creatorhub/images/logos/runcomfy.png" },
  { id: "r3", name: "CivitAI", description: "Download Models dan Workflows buat ComfyUI", badge: "Free", content: "https://civitai.com/", logo: "/creatorhub/images/logos/civitai.png" },
  { id: "r4", name: "RVC Voice Models", description: "Tempat download model suara RVC paling lengkap ada di sini", badge: "Free", content: "https://voice-models.com/", logo: "/creatorhub/images/logos/rvc-voice-models.png" },
  { id: "r5", name: "RVC w-okada", description: "RVC Voice Changer paling enteng", badge: "Free", content: "https://github.com/w-okada/voice-changer", logo: "/creatorhub/images/logos/rvc-w-okada.png" },
  { id: "r6", name: "Applio", description: "RVC Voice Changer paling lengkap", badge: "Free", content: "https://applio.org/", logo: "/creatorhub/images/logos/applio.png" },
  { id: "r7", name: "Voicewave", description: "Voice Changer paling gampang di-install dengan banyak fitur", badge: "Freemium", content: "https://bit.ly/4fAuYfi", logo: "/creatorhub/images/logos/voicewave.png" },
  { id: "r8", name: "Elevenlabs", description: "Text to Speech paling natural", badge: "Premium", content: "https://elevenlabs.io/", logo: "/creatorhub/images/logos/elevenlabs.png" },
  { id: "r9", name: "Kimi AI", description: "LLM Top Tier dan Worth it", badge: "Freemium", content: "https://www.kimi.com/en", logo: "/creatorhub/images/logos/kimi-ai.png" }
]

// ComfyUI Workflows - 6 workflows
const workflowItems = [
  { id: "w1", name: "Anime T2I & CNet", description: "Text to Image", badge: "ANI", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" },
  { id: "w2", name: "Anime I2I", description: "Image to Image", badge: "ANI", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" },
  { id: "w3", name: "Flux T2I", description: "Text to Image", badge: "IMG", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" },
  { id: "w4", name: "Flux Image Edit (Low VRAM)", description: "Image Editing", badge: "IMG", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" },
  { id: "w5", name: "WAN 2.2", description: "Image to Video", badge: "VID", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" },
  { id: "w6", name: "LTX 2.5", description: "Image to Video with Audio", badge: "VID/AUDIO", content: "https://drive.google.com/drive/folders/1QSEz3TXUwBjnSQIBK5urIqYrARhiQ77T?usp=sharing" }
]

export const vaultCategories: VaultCategory[] = [
  {
    id: "free-prompt",
    kind: "prompt",
    icon: Sparkles,
    eyebrow: "PROMPTS",
    title: "Free Prompt",
    description: "Kumpulan prompt siap pakai buat ChatGPT, Claude, Gemini & AI tools lainnya",
    accent: "#06AED5",
    cta: "Lihat Prompt",
    items: [...allAsistenPrompts, ...promptGenAiItems],
    sections: [
      {
        heading: "Prompt Asisten AI",
        subtitle: "Buat ngobrol dan dibantu AI (ChatGPT, Claude, Gemini)",
        items: allAsistenPrompts
      },
      {
        heading: "Prompt Generative AI",
        subtitle: "Buat bikin gambar (ComfyUI dan website AI gambar). Cara pakai: copy teksnya, tempel, lalu ganti teks [KURUNG] sesuai keinginan.",
        items: promptGenAiItems
      }
    ]
  },
  {
    id: "link-hardware",
    kind: "product",
    icon: Package,
    eyebrow: "Hardware",
    title: "Product Links",
    description: "Produk dan Tools yang biasa gua pakai buat bikin konten dan kebutuhan penunjang lainnya",
    accent: "#FA8333",
    cta: "Lihat Produk",
    items: [...hardwareItems, ...cableItems],
    sections: [
      {
        heading: "Produk Rekomendasi",
        subtitle: "Produk yang biasa gua pake dan rekomendasi untuk kalian coba",
        items: hardwareItems
      },
      {
        heading: "Connection Cable",
        subtitle: "Kabel yang bisa bantu kalian koneksiin Voice Changer dari PC ke Android",
        items: cableItems
      }
    ]
  },
  {
    id: "link-resources",
    kind: "link",
    icon: Link2,
    eyebrow: "Resources & Workflows",
    title: "Link Tools AI",
    description: "Link website Tools AI, Resources, dan Workflow ComfyUI yang bisa bantu kerjaan kalian",
    accent: "#06AED5",
    cta: "Cari Tools",
    items: [...resourceItems, ...workflowItems],
    sections: [
      {
        heading: "Resources AI Websites",
        subtitle: "Website dan tools AI yang akan kalian cari ada disini",
        items: resourceItems
      },
      {
        heading: "ComfyUI Workflows",
        subtitle: "File workflow .json siap import ke ComfyUI",
        items: workflowItems,
        accent: "#FA8333"
      }
    ]
  },
  {
    id: "faq",
    kind: "faq",
    icon: CircleHelp,
    eyebrow: "Baca Sebelum Bertanya",
    title: "FAQ",
    description: "Kalo kalian ada pertanyaan atau bingung soal cara pakai tools AI, cari dulu jawabannya disini. Kalo nggak ketemu, baru tanya langsung aja ya~",
    accent: "#22D3EE",
    cta: "Cari Pertanyaan",
    items: faqCategories.flatMap((cat) =>
      cat.items.map((q) => ({
        id: q.id,
        name: q.question,
        description: q.answer,
        badge: cat.title,
        content: q.answer,
      })),
    ),
  },
]

export function getCategory(id: string) {
  return vaultCategories.find((c) => c.id === id)
}

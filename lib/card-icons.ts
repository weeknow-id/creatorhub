import type { ComponentType, CSSProperties } from "react"
import {
  ArrowLeftRight,
  Brush,
  Bug,
  Cable,
  Camera,
  Clapperboard,
  Contact,
  Cpu,
  Dices,
  Dumbbell,
  Film,
  Gamepad2,
  Gauge,
  Ghost,
  Globe,
  HeartHandshake,
  Keyboard,
  Laptop,
  Laugh,
  Languages,
  Lightbulb,
  Megaphone,
  Mic,
  Mouse,
  PcCase,
  Plane,
  Rss,
  Scale,
  Search,
  SlidersHorizontal,
  SmilePlus,
  Split,
  Tv,
  Type,
  Usb,
  Users,
  Video,
  Webcam,
  ZoomIn,
} from "lucide-react"

export type CardIcon = ComponentType<{ className?: string; style?: CSSProperties; strokeWidth?: string | number }>

/**
 * Satu icon unik per item card — dipilih agar sesuai judul & isi,
 * tidak monoton / tidak ada duplikat di seluruh website.
 * (Card resources r1–r9 dikecualikan: tetap memakai logo brand.)
 */
export const itemIconMap: Record<string, CardIcon> = {
  // ── Prompt Asisten AI (p1–p18) ──
  p1: Megaphone, // Creator News Anchor — pengumuman / berita kreator
  p2: Bug, // ComfyUI Debug — debugging error node
  p3: PcCase, // PC Builder — rakitan casing PC
  p4: Rss, // Tech News — feed berita teknologi
  p5: Gamepad2, // Gaming News — berita industri game
  p6: Dices, // Game Recommendation — acak / rekomendasi personal
  p7: Ghost, // Game Character Explainer — karakter / lore game
  p8: Laugh, // Shitpost Assistant — meme lucu / shitpost
  p9: HeartHandshake, // Waifu Companion Maker — persona pasangan virtual
  p10: Search, // Meme Context — investigasi asal-usul meme
  p11: Clapperboard, // Character Explainer — lore anime / film
  p12: Tv, // Anime Recommendation — tontonan anime
  p13: Globe, // Global News — berita dunia / lokal
  p14: Dumbbell, // Personal Trainer — body building / fitness
  p15: Plane, // Travel Planner — itinerary & trip
  p16: Scale, // Decision Maker — timbang pro-kontra keputusan
  p17: Lightbulb, // ELI5 Explainer — penjelasan sederhana
  p18: Languages, // JLPT Study — belajar bahasa Jepang

  // ── Prompt Generative AI (g1–g6) ──
  g1: ZoomIn, // Upscaler — foto burem jadi HD tajam
  g2: Camera, // Product Photography — staging foto produk studio
  g3: Contact, // Formal Photoshoot — foto formal / ID card
  g4: Webcam, // PP Wibu Misteriuzz — mirror selfie depan laptop
  g5: Users, // Dikelilingi 5 Waifu — selfie grup bareng waifu
  g6: SmilePlus, // Selfie with You — selfie joyful bareng karakter

  // ── Link Hardware (h1–h6) ──
  h1: Gauge, // RTX 5060 Ti 16GB — performa tinggi gaming & AI kompleks
  h2: Cpu, // RTX 5060 8GB — GPU starter pack
  h3: Laptop, // Laptop Lenovo — laptop RTX 3050 di video
  h4: Mic, // Mic Condenser — voice changer & livestreaming
  h5: Keyboard, // Keyboard — keyboard mekanikal
  h6: Mouse, // Mouse Fantech — mouse gaming

  // ── Connection Cable (c1–c3) ──
  c1: Cable, // Kabel Aux TRS male-to-male
  c2: Split, // Kabel Splitter TRRS mic + headset
  c3: Usb, // Kabel Converter Type-C audio ke HP

  // ── ComfyUI Workflow (w1–w6) ──
  w1: Brush, // Anime T2I & CNet — gambar / stylize anime
  w2: ArrowLeftRight, // Anime I2I — konversi image-to-image
  w3: Type, // Flux T2I — text-to-image
  w4: SlidersHorizontal, // Flux Image Edit — editing / tuning gambar
  w5: Film, // WAN 2.2 — image-to-video
  w6: Video, // LTX 2.5 — image-to-video with audio
}

/**
 * Warna tile per item — 1 warna unik per card dalam grid yang sama,
 * supaya tidak monoton. Tile dirender sebagai gradient + icon putih
 * di atas card gelap (#1a2340), jadi tetap menyatu dengan tema.
 */
export const itemTileAccent: Record<string, string> = {
  // Prompt Asisten AI — 18 warna berbeda dalam 1 grid
  p1: "#FF6B6B", // coral — hype berita kreator
  p2: "#EF4444", // merah — bug / error
  p3: "#3B82F6", // biru — hardware PC
  p4: "#22D3EE", // cyan — tech
  p5: "#8B5CF6", // violet — gaming
  p6: "#EC4899", // pink — rekomendasi fun
  p7: "#A855F7", // ungu — karakter / ghost
  p8: "#EAB308", // kuning — shitpost lucu
  p9: "#F43F5E", // rose — waifu
  p10: "#14B8A6", // teal — investigasi meme
  p11: "#6366F1", // indigo — film/anime lore
  p12: "#0EA5E9", // sky — tontonan anime
  p13: "#10B981", // emerald — berita dunia
  p14: "#84CC16", // lime — fitness
  p15: "#F97316", // oranye — travel
  p16: "#E879F9", // fuchsia — keputusan
  p17: "#FBBF24", // amber — ide / lampu menyala
  p18: "#2DD4BF", // tosca — bahasa Jepang

  // Prompt Generative AI — 6 warna berbeda
  g1: "#38BDF8", // sky — upscale / zoom tajam
  g2: "#F472B6", // pink — fotografi produk
  g3: "#64748B", // slate — formal / profesional
  g4: "#22D3EE", // cyan — webcam / selfie laptop
  g5: "#FB7185", // rose — grup waifu
  g6: "#FACC15", // kuning — selfie ceria

  // Link Hardware — 6 warna berbeda
  h1: "#EF4444", // merah — flagship bertenaga
  h2: "#3B82F6", // biru — GPU
  h3: "#8B5CF6", // violet — laptop
  h4: "#EC4899", // pink — mic / audio
  h5: "#EAB308", // kuning — keyboard
  h6: "#10B981", // emerald — mouse

  // Connection Cable — 3 warna berbeda
  c1: "#22D3EE", // cyan — aux TRS
  c2: "#F97316", // oranye — splitter
  c3: "#A855F7", // ungu — converter Type-C

  // ComfyUI Workflow — 6 warna berbeda
  w1: "#F472B6", // pink — gambar anime
  w2: "#38BDF8", // sky — konversi I2I
  w3: "#EAB308", // kuning — teks
  w4: "#34D399", // emerald — editing
  w5: "#8B5CF6", // violet — video
  w6: "#EF4444", // merah — video + audio
}

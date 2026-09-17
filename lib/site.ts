// Satu sumber untuk angka, link, dan email seluruh web.
// Cara edit manual: ubah nilai di file ini saja, semua section ikut update.
// - Angka community: `communityStats` (target = angka tampilan, tanpa "+").
// - Pindah hosting: cukup ganti `SITE_URL` dan
//   `BASE_PATH` di sini, jangan ubah satu-satu di komponen.

// Prefix subpath GitHub Pages. Semua path aset di file data WAJIB diawali ini.
export const BASE_PATH = "/creatorhub"

// URL publik web (untuk SEO canonical + share link).
export const SITE_URL = "https://weeknow-id.github.io/creatorhub"

export const CONTACT_EMAIL = "chlimedia.id@gmail.com"
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`

export type SocialPlatform = "YouTube" | "Instagram" | "TikTok" | "Discord"

export interface CommunityStat {
  platform: SocialPlatform
  label: string
  target: number
  href: string
  accent: string
}

export const communityStats: CommunityStat[] = [
  { platform: "YouTube", label: "Subscribers", target: 8000, href: "https://www.youtube.com/@WeeKnowID", accent: "#FA8333" },
  { platform: "Instagram", label: "Followers", target: 6000, href: "https://instagram.com/weeknow.id", accent: "#06AED5" },
  { platform: "TikTok", label: "Followers", target: 7000, href: "https://tiktok.com/@weeknow.id", accent: "#FA8333" },
  { platform: "Discord", label: "Members", target: 600, href: "https://discord.com/invite/A4PcHfwxVu", accent: "#06AED5" },
]

export function getSocialHref(platform: SocialPlatform): string {
  return communityStats.find((s) => s.platform === platform)?.href ?? "#"
}

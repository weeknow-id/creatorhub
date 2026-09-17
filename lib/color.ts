// Util warna kecil-kecilan, tanpa dependency.
//
// darkenHex dipakai KHUSUS untuk teks kecil berwarna aksen di atas background
// terang (eyebrow, badge, link "Lihat...") supaya kontrasnya terbaca.
// lightenHex kebalikannya: KHUSUS teks kecil aksen di atas background GELAP
// (header halaman detail yang navy) — darken di atas navy tidak terbaca.
// Tile, tombol, dan ikon tetap pakai aksen terang aslinya (tidak diubah).
export function darkenHex(hex: string, amount = 0.3): string {
  const m = hex.replace("#", "")
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m
  const num = parseInt(full, 16)
  if (Number.isNaN(num) || full.length !== 6) return hex
  const f = (v: number) => Math.max(0, Math.round(v * (1 - amount)))
  const r = f((num >> 16) & 255)
  const g = f((num >> 8) & 255)
  const b = f(num & 255)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function lightenHex(hex: string, amount = 0.45): string {
  const m = hex.replace("#", "")
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m
  const num = parseInt(full, 16)
  if (Number.isNaN(num) || full.length !== 6) return hex
  const f = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount))
  const r = f((num >> 16) & 255)
  const g = f((num >> 8) & 255)
  const b = f(num & 255)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

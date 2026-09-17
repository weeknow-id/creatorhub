import { BASE_PATH } from "@/lib/site"

// 404 custom — static export mengubahnya jadi out/404.html otomatis.
// Pakai <a> biasa (full reload) supaya selalu jalan tanpa state client.
export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#222E50] px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />
      <div className="relative z-10 text-center max-w-md">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#06AED5]">404 · Nyasar</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-black text-white tracking-tighter">Waduh, kosong!</h1>
        <p className="mt-4 text-sm text-white/60 leading-relaxed">
          Halaman yang kamu cari nggak ada di Creator Hub.
          <br />
          Balik aja, vault-nya masih lengkap kok.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${BASE_PATH}/`}
            className="bg-[#FA8333] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform"
          >
            Balik ke Home
          </a>
          <a
            href={`${BASE_PATH}/#/vault/free-prompt`}
            className="border-2 border-white/25 text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Buka Vault
          </a>
        </div>
      </div>
    </section>
  )
}

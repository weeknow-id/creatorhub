"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { ChevronRight, Link2, Plus, Search, X } from "lucide-react"
import type { VaultCategory } from "@/lib/vault-data"
import { faqCategories, type FaqItem } from "@/lib/faq-data"
import { DetailMiniBar } from "@/components/detail-mini-bar"
import { getSocialHref } from "@/lib/site"
import { darkenHex } from "@/lib/color"

function highlightText(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-[#FA8333]/30 text-inherit rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

function FaqItemRow({
  item,
  badge,
  query,
  isOpen,
  highlighted,
  onToggle,
  onShare,
}: {
  item: FaqItem
  badge?: string
  query: string
  isOpen: boolean
  highlighted: boolean
  onToggle: () => void
  onShare: (id: string) => void
}) {
  return (
    <div
      data-faq-id={item.id}
      className={`bg-white rounded-2xl border transition-colors overflow-hidden ${
        isOpen ? "border-[#06AED5]/25 shadow-lg shadow-[#06AED5]/10" : "border-[#222E50]/10 shadow-sm"
      }`}
      style={highlighted ? { outline: "2px solid #06AED5", outlineOffset: 3 } : undefined}
    >
      <div className="w-full flex items-center gap-2 pl-5 pr-4 py-4">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex-1 flex items-center justify-between gap-4 text-left"
        >
          <span className="font-bold text-[#222E50] text-sm md:text-[15px]">
            <span className="mr-2 inline-flex align-middle rounded-md bg-[#222E50]/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#222E50]/60">
              {highlightText(item.id, query)}
            </span>
            {highlightText(item.question, query)}
            {badge && (
              <span
                className="ml-2.5 inline-flex align-middle text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#06AED5]/10"
                style={{ color: darkenHex("#06AED5") }}
              >
                {badge}
              </span>
            )}
          </span>
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isOpen ? "bg-[#222E50] text-white" : "bg-[#222E50]/5 text-[#222E50]"
            }`}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
        </button>
        <button
          onClick={() => onShare(item.id)}
          aria-label={`Salin link ${item.id}`}
          title="Salin link"
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[#222E50]/40 hover:text-[#222E50] hover:bg-[#222E50]/5 transition-colors"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[#222E50]/80 leading-relaxed">{highlightText(item.answer, query)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FaqDetailProps {
  category: VaultCategory
  onBack: () => void
  focusItemId?: string | null
}

export function FaqDetail({ category, onBack, focusItemId }: FaqDetailProps) {
  const reduceMotion = useReducedMotion()
  const findCatId = (id: string | null | undefined) =>
    (id && faqCategories.find((c) => c.items.some((i) => i.id === id))?.id) || faqCategories[0].id
  const [activeCategoryId, setActiveCategoryId] = useState(() => findCatId(focusItemId))
  const [openIds, setOpenIds] = useState<string[]>(
    focusItemId ? [focusItemId] : [faqCategories[0].items[0]?.id ?? ""],
  )
  const [query, setQuery] = useState("")
  const [toast, setToast] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(focusItemId ?? null)
  const lenis = useLenis()

  // Deep link #/vault/faq/<KODE>: pindah ke tab kategorinya, buka pertanyaannya,
  // scroll ke sana, highlight sesaat.
  useEffect(() => {
    if (!focusItemId) return
    setActiveCategoryId(findCatId(focusItemId))
    setOpenIds([focusItemId])
    setFlashId(focusItemId)
    const t1 = window.setTimeout(() => {
      const el = document.querySelector(`[data-faq-id="${focusItemId}"]`)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -112 })
      else el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 650)
    const t2 = window.setTimeout(() => setFlashId(null), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [focusItemId, lenis])

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }

  const handleShare = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/vault/faq/${id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // clipboard may be unavailable; still surface feedback
    }
    showToast("Link tersalin, silakan share!")
  }

  const toggleId = (id: string, single: boolean) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : single ? [id] : [...prev, id]))

  const normalizedQuery = query.trim().toLowerCase()

  // Global search: cocok di pertanyaan naik ke atas, cocok di jawaban saja di bawahnya.
  const results = useMemo(() => {
    if (!normalizedQuery) return []
    const out: { catId: string; catTitle: string; item: FaqItem; score: number }[] = []
    faqCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        const inQuestion = item.question.toLowerCase().includes(normalizedQuery)
        const inAnswer = item.answer.toLowerCase().includes(normalizedQuery)
        const inId = item.id.toLowerCase().includes(normalizedQuery)
        if (inQuestion || inAnswer || inId)
          out.push({ catId: cat.id, catTitle: cat.title, item, score: inQuestion || inId ? 0 : 1 })
      })
    })
    return out.sort((a, b) => a.score - b.score)
  }, [normalizedQuery])

  const isSearching = normalizedQuery.length > 0

  // Tiap ganti kata kunci, semua hasil langsung terbuka biar highlight kelihatan.
  useEffect(() => {
    if (isSearching) setOpenIds(results.map((r) => r.item.id))
  }, [isSearching, results])

  const activeCategory = faqCategories.find((c) => c.id === activeCategoryId) ?? faqCategories[0]

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id)
    const first = faqCategories.find((c) => c.id === id)?.items[0]
    setOpenIds(first?.id ? [first.id] : [])
    // Sengaja TIDAK scroll: konten ganti di tempat (crossfade cepat),
    // tanpa fase kosong (no exit) dan tanpa scroll programatik,
    // supaya pindah kategori tidak ada sentakan sama sekali.
  }

  const Icon = category.icon

  return (
    <motion.section
      key={category.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative min-h-screen pt-28 pb-20 overflow-hidden"
    >
      <DetailMiniBar onBack={onBack} tone="light" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#222E50]/70 hover:text-[#06AED5] font-bold text-sm mb-8 transition-colors"
          whileHover={{ x: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>
        <div className="mb-5 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${category.accent}, ${category.accent}88)`,
              boxShadow: `0 4px 20px ${category.accent}55`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: "#fff" }} strokeWidth={2.2} />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: darkenHex(category.accent) }}>
              {category.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#222E50] tracking-tight text-balance">
              Frequently Asked Questions
            </h1>
          </div>
        </div>

        <p className="text-sm text-[#222E50]/75 max-w-lg">
          Bingung cara pakainya dan kena error? atau kepo soal WeeKnow?
          <br />
          cari jawabannya disini, kalo nggak ketemu baru tanya Admin ya~
        </p>
            <div className="relative mt-6 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222E50]/40 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pertanyaan..."
                aria-label="Cari pertanyaan di FAQ"
                className="w-full bg-white border border-[#222E50]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#222E50] placeholder:text-[#222E50]/35 outline-none focus:border-[#06AED5]/50 transition-colors shadow-sm"
              />
            </div>
          </div>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none hidden w-60 shrink-0 select-none lg:-mt-3 lg:mr-6 lg:block xl:w-72 xl:mr-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Image
                src="/creatorhub/images/weeknow-character-faq.webp"
                alt=""
                width={480}
                height={480}
                className="h-auto w-full img-fade"
                style={{
                  maskImage: "linear-gradient(to bottom, black 75%, transparent 98%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 98%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {isSearching ? (
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#222E50]/60 mb-4">
              Ketemu {results.length} jawaban
            </p>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map(({ item, catTitle }) => (
                  <FaqItemRow
                    key={item.id}
                    item={item}
                    badge={catTitle}
                    query={query}
                    isOpen={openIds.includes(item.id)}
                    highlighted={flashId === item.id}
                    onToggle={() => toggleId(item.id, false)}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#222E50]/10">
                <p className="text-[#222E50] font-bold">Nggak ketemu &ldquo;{query.trim()}&rdquo; di FAQ.</p>
                <p className="text-[#222E50]/65 text-sm mt-2">Coba kata kunci lain, atau tanya langsung ke Admin.</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setQuery("")}
                    className="text-sm font-bold px-5 py-2.5 rounded-full border border-[#222E50]/20 text-[#222E50]/80 hover:bg-[#222E50]/5 transition-colors"
                  >
                    Hapus pencarian
                  </button>
                  <a
                    href={getSocialHref("Discord")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: "#06AED5" }}
                  >
                    Tanya di Discord
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
        <div className="grid scroll-mt-28 md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
          {/* Category pills */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {faqCategories.map((cat) => {
              const isActive = cat.id === activeCategoryId
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap md:whitespace-normal text-left transition-colors active:scale-[0.98] ${
                    isActive
                      ? "bg-white text-[#222E50] shadow-lg shadow-[#222E50]/10 border border-[#06AED5]/20"
                      : "bg-[#06AED5]/[0.08] text-[#222E50]/70 border border-transparent hover:bg-white hover:text-[#222E50] hover:shadow-md"
                  }`}
                >
                  {cat.title}
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </motion.button>
              )
            })}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-3"
              >
                {activeCategory.items.map((item) => (
                  <FaqItemRow
                    key={item.id}
                    item={item}
                    query=""
                    isOpen={openIds.includes(item.id)}
                    highlighted={flashId === item.id}
                    onToggle={() => toggleId(item.id, true)}
                    onShare={handleShare}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-[#222E50] text-white px-5 py-3 rounded-full shadow-2xl border border-white/15 overflow-hidden"
          >
            <span className="font-bold text-sm">{toast}</span>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] bg-[#06AED5]"
              style={{ animation: "toast-shrink 2.6s linear forwards" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

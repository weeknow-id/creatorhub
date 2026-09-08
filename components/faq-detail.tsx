"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { ChevronRight, Plus, Search, X } from "lucide-react"
import type { VaultCategory } from "@/lib/vault-data"
import { faqCategories, type FaqItem } from "@/lib/faq-data"
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
  onToggle,
}: {
  item: FaqItem
  badge?: string
  query: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`bg-white rounded-2xl border transition-colors overflow-hidden ${
        isOpen ? "border-[#06AED5]/25 shadow-lg shadow-[#06AED5]/10" : "border-[#222E50]/10 shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
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
}

export function FaqDetail({ category, onBack }: FaqDetailProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id)
  const [openIds, setOpenIds] = useState<string[]>([faqCategories[0].items[0]?.id ?? ""])
  const [query, setQuery] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

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
    // Balik ke atas daftar secara instant: kalau user sedang scroll jauh di
    // kategori panjang, pindah ke kategori pendek harus motong, bukan meluncur.
    // Wajib lewat Lenis (bukan window.scrollTo) supaya tidak dilawan balik.
    requestAnimationFrame(() => {
      if (!listRef.current) return
      if (lenis) lenis.scrollTo(listRef.current, { offset: -112, immediate: true })
      else listRef.current.scrollIntoView({ behavior: "auto", block: "start" })
    })
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
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Image
                src="/creatorhub/images/weeknow-character-faq.png"
                alt=""
                width={480}
                height={480}
                className="h-auto w-full"
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
                    onToggle={() => toggleId(item.id, false)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#222E50]/10">
                <p className="text-[#222E50] font-bold">Nggak ketemu &ldquo;{query.trim()}&rdquo; di FAQ.</p>
                <p className="text-[#222E50]/65 text-sm mt-2">Coba kata kunci lain, atau tanya langsung ke Admin.</p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-5 text-sm font-bold px-5 py-2.5 rounded-full border border-[#222E50]/20 text-[#222E50]/80 hover:bg-[#222E50]/5 transition-colors"
                >
                  Hapus pencarian
                </button>
              </div>
            )}
          </div>
        ) : (
        <div ref={listRef} className="grid scroll-mt-28 md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
          {/* Category pills */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {faqCategories.map((cat) => {
              const isActive = cat.id === activeCategoryId
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap md:whitespace-normal text-left transition-colors ${
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-3"
              >
                {activeCategory.items.map((item) => (
                  <FaqItemRow
                    key={item.id}
                    item={item}
                    query=""
                    isOpen={openIds.includes(item.id)}
                    onToggle={() => toggleId(item.id, true)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        )}
      </div>
    </motion.section>
  )
}

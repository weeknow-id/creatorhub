"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLenis } from "lenis/react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { BookOpen, Link2, Search } from "lucide-react"
import { glossaryGroups, glossaryTerms, type GlossaryGroupId, type GlossaryTerm } from "@/lib/glossary-data"
import { getSocialHref } from "@/lib/site"
import { lightenHex } from "@/lib/color"

const ACCENT = "#10B981"

// Highlight teks cocok kayak di FAQ (mark oranye).
function highlightMatch(text: string, query: string) {
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

function GlossaryCard({ term, query, accent, highlighted, onShare }: { term: GlossaryTerm; query: string; accent: string; highlighted: boolean; onShare: (id: string) => void }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
      }}
      data-term-id={term.id}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="paper-card rounded-2xl border border-[#222E50]/10 shadow-lg shadow-black/20 overflow-hidden flex flex-col"
      style={highlighted ? { outline: `2px solid ${accent}`, outlineOffset: 3 } : undefined}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: accent }} aria-hidden="true" />
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="mt-0 text-xl font-black text-[#222E50] tracking-tight leading-snug">
            {highlightMatch(term.term, query)}
          </h3>
          <button
            onClick={() => onShare(term.id)}
            aria-label={`Salin link ${term.term}`}
            title="Salin link"
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 -mt-1 -mr-1 text-[#222E50]/40 hover:text-[#222E50] hover:bg-[#222E50]/5 transition-colors"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="mt-2 text-[13px] text-[#222E50]/80 leading-relaxed flex-1">
          {highlightMatch(term.definition, query)}
        </p>
        {term.example && (
          <p className="mt-3 text-xs text-[#222E50]/60 leading-relaxed border-l-2 pl-3 italic" style={{ borderColor: accent }}>
            {highlightMatch(term.example, query)}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function GlossaryDetail({ onBack, focusTermId }: { onBack: () => void; focusTermId?: string | null }) {
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState(false)
  const [flashId, setFlashId] = useState<string | null>(focusTermId ?? null)
  const [activeGroup, setActiveGroup] = useState<GlossaryGroupId>(() => {
    if (!focusTermId) return "ai"
    return glossaryTerms.find((t) => t.id === focusTermId)?.group ?? "ai"
  })
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const lenis = useLenis()
  const normalizedQuery = query.trim().toLowerCase()

  const matchesQuery = (t: GlossaryTerm) => {
    if (!normalizedQuery) return true
    return `${t.term} ${t.definition} ${t.example ?? ""}`.toLowerCase().includes(normalizedQuery)
  }

  const isSearching = normalizedQuery.length > 0

  // Tanpa query: tampil sesuai kotak aktif (+ filter huruf). Dengan query:
  // cari ke SEMUA kotak kayak FAQ biar tidak "tidak ditemukan" padahal ada.
  const visible = (isSearching
    ? glossaryTerms.filter(matchesQuery)
    : glossaryTerms.filter(
        (t) =>
          t.group === activeGroup &&
          (!selectedLetter || t.term.charAt(0).toUpperCase() === selectedLetter),
      )
  ).sort((a, b) => a.term.localeCompare(b.term, "id"))

  const searchGroups = glossaryGroups
    .map((group) => ({ group, items: visible.filter((t) => t.group === group.id) }))
    .filter(({ items }) => items.length > 0)
  const activeGroupMeta = glossaryGroups.find((g) => g.id === activeGroup)

  const groupLetters = Array.from(
    new Set(glossaryTerms.filter((t) => t.group === activeGroup).map((t) => t.term.charAt(0).toUpperCase())),
  ).sort()

  const toggleLetter = (letter: string) =>
    setSelectedLetter((prev) => (prev === letter ? null : letter))

  // Deep link #/glossary/<idIstilah>: pindah ke kotaknya, scroll ke kartunya + highlight sesaat.
  useEffect(() => {
    if (!focusTermId) return
    const owner = glossaryTerms.find((t) => t.id === focusTermId)?.group
    if (owner) setActiveGroup(owner)
    setFlashId(focusTermId)
    const t1 = window.setTimeout(() => {
      const el = document.querySelector(`[data-term-id="${focusTermId}"]`)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -100 })
      else el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 650)
    const t2 = window.setTimeout(() => setFlashId(null), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [focusTermId, lenis])

  const handleShare = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/glossary/${id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // clipboard may be unavailable; still surface feedback
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2600)
  }

  return (
    <motion.section
      key="glossary"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative min-h-screen bg-[#222E50] pt-28 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/70 hover:text-[#06AED5] font-bold text-sm mb-8 transition-colors"
          whileHover={{ x: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #047857)`,
              boxShadow: `0 4px 20px ${ACCENT}55`,
            }}
          >
            <BookOpen className="w-7 h-7" style={{ color: "#fff" }} strokeWidth={2.2} />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: lightenHex(ACCENT) }}>
              KAMUS SINGKAT
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
              Glosarium AI
            </h1>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-8 max-w-lg">
          Istilah-istilah yang sering muncul di tutorial. Hafalin yang bintang aja dulu juga gapapa.
        </p>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222E50]/40 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari istilah... (misal: VRAM)"
            aria-label="Cari istilah di glosarium"
            className="w-full bg-white border border-[#222E50]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#222E50] placeholder:text-[#222E50]/35 outline-none focus:border-[#10B981]/50 transition-colors shadow-sm"
          />
        </div>

        {normalizedQuery && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 mb-6">
            Menampilkan {visible.length} dari {glossaryTerms.length}
          </p>
        )}
        {!normalizedQuery && <div className="mb-2" />}

        {!isSearching && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10" role="group" aria-label="Pilih kategori istilah">
          {glossaryGroups.map((group) => {
            const isActive = group.id === activeGroup
            const count = glossaryTerms.filter((t) => t.group === group.id).length
            return (
              <motion.button
                key={group.id}
                onClick={() => {
                  setActiveGroup(group.id)
                  setSelectedLetter(null)
                }}
                aria-pressed={isActive}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`text-left rounded-2xl p-4 border-2 transition-all duration-150 active:scale-[0.98] ${
                  isActive
                    ? "bg-white border-transparent shadow-xl"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
                style={isActive ? { boxShadow: `0 8px 28px ${group.accent}44` } : undefined}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: group.accent }}
                    aria-hidden="true"
                  />
                  <span className={`font-black text-sm leading-tight ${isActive ? "text-[#222E50]" : "text-white"}`}>
                    {group.title}
                  </span>
                </span>
                <span className={`block mt-1.5 text-[11px] leading-relaxed ${isActive ? "text-[#222E50]/65" : "text-white/50"}`}>
                  {group.subtitle}
                </span>
                <span
                  className="inline-flex mt-2.5 font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: group.accent }}
                >
                  {count} istilah
                </span>
              </motion.button>
            )
          })}
        </div>
        )}

        {visible.length > 0 ? (
          isSearching ? (
          <div className="space-y-10">
            {searchGroups.map(({ group, items }) => (
              <div key={group.id}>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  {group.title}
                </h2>
                <p className="text-white/60 text-sm mb-5">{group.subtitle}</p>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
                >
                  {items.map((t) => (
                    <GlossaryCard
                      key={t.id}
                      term={t}
                      query={query}
                      accent={group.accent}
                      highlighted={flashId === t.id}
                      onShare={handleShare}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
          ) : (
          <>
            <div className="flex flex-wrap items-center gap-1.5 mb-6" role="group" aria-label="Filter huruf">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mr-1">A–Z</span>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                const has = groupLetters.includes(letter)
                const isActive = selectedLetter === letter
                return (
                  <button
                    key={letter}
                    onClick={() => has && toggleLetter(letter)}
                    disabled={!has}
                    aria-pressed={isActive}
                    aria-label={has ? (isActive ? `Tampilkan semua (batal filter ${letter})` : `Filter huruf ${letter}`) : undefined}
                    className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold transition-colors ${
                      isActive
                        ? "text-[#222E50] bg-white"
                        : has
                          ? "text-white/80 bg-white/10 hover:bg-white/20 hover:text-white"
                          : "text-white/20 bg-transparent cursor-default"
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
            >
              {visible.map((t) => (
                      <GlossaryCard
                        key={t.id}
                        term={t}
                        query={query}
                        accent={activeGroupMeta?.accent ?? ACCENT}
                        highlighted={flashId === t.id}
                        onShare={handleShare}
                      />
              ))}
            </motion.div>
          </>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-white font-bold">Nggak ketemu di sini.</p>
            <p className="text-white/50 text-sm mt-2">Coba kata kunci lain.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setQuery("")}
                className="text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
              >
                Hapus pencarian
              </button>
              <a
                href={getSocialHref("Discord")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
                style={{ backgroundColor: ACCENT }}
              >
                Tanya di Discord
              </a>
            </div>
          </div>
        )}
      </div>

      {copied && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white text-[#222E50] px-5 py-3 rounded-full shadow-2xl border border-[#10B981]/20 overflow-hidden">
          <span className="font-bold text-sm">Link tersalin, silakan share!</span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] bg-[#10B981]"
            style={{ animation: "toast-shrink 2.6s linear forwards" }}
          />
        </div>
      )}
    </motion.section>
  )
}

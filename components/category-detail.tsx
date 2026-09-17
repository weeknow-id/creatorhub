"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect } from "react"
import { useLenis } from "lenis/react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { CheckCircleIcon as Check } from "@solar-icons/react/linear/check-circle"
import { CopyIcon as Copy } from "@solar-icons/react/linear/copy"
import { SquareTopDownIcon as ExternalLink } from "@solar-icons/react/linear/square-top-down"
import { Library, Search, Link2 } from "lucide-react"
import type { VaultCategory, VaultItem } from "@/lib/vault-data"
import { allAsistenPrompts } from "@/lib/prompt-asisten-data"
import { getSocialHref } from "@/lib/site"
import { itemIconMap, itemTileAccent } from "@/lib/card-icons"
import { DetailMiniBar } from "@/components/detail-mini-bar"
import { darkenHex, lightenHex } from "@/lib/color"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
}

function getItemIcon(item: VaultItem) {
  return itemIconMap[item.id] ?? Library
}

// Render isi prompt read-only dengan bagian [VARIABLE] di-highlight.
// Hanya untuk tampilan — tombol Copy tetap menyalin raw `content`.
function renderHighlightedContent(content: string, accent: string) {
  const parts = content.split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <span
        key={i}
        className="font-bold px-1 rounded"
        style={{ backgroundColor: `${accent}33`, color: darkenHex(accent) }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

interface CategoryDetailProps {
  category: VaultCategory
  onBack: () => void
  focusItemId?: string | null
}

function ItemCard({ item, category, accent, highlighted, onAction, onShare }: { item: VaultItem; category: VaultCategory; accent: string; highlighted: boolean; onAction: (content: string) => void; onShare: (hash: string) => void }) {
  const cardAccent = accent
  const tileAccent = itemTileAccent[item.id] ?? cardAccent
  const ActionIcon = category.kind === "prompt" ? Copy : ExternalLink
  const buttonLabel = category.kind === "prompt" ? "Copy Prompt" : "Open Link"
  const [showPreview, setShowPreview] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      data-item-id={item.id}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="paper-card rounded-2xl p-5 md:p-6 border border-[#222E50]/10 flex flex-col group min-h-[230px] shadow-lg shadow-black/20"
      style={highlighted ? { outline: `2px solid ${cardAccent}`, outlineOffset: 3 } : undefined}
    >
      <div className="flex items-start gap-3 mb-5">
        <div
          className="size-11 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${tileAccent}, ${tileAccent}88)`,
            color: "#fff",
            boxShadow: `0 4px 16px ${tileAccent}55`,
          }}
          aria-hidden="true"
        >
          {item.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.logo} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            (() => {
              const ItemIcon = getItemIcon(item)
              return <ItemIcon className="size-5" strokeWidth={2.2} />
            })()
          )}
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-bold text-[#222E50] text-base leading-tight text-pretty">{item.name}</h3>
          <span
            className="inline-flex mt-2 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${cardAccent}22`, color: darkenHex(cardAccent) }}
          >
            {item.badge || category.eyebrow || "Resource"}
          </span>
        </div>
      </div>

      <p className="text-xs text-[#222E50]/75 leading-relaxed flex-1 text-pretty">{item.description}</p>

      {category.kind === "prompt" && (
        <div className="mt-3">
          <button
            onClick={() => setShowPreview((v) => !v)}
            aria-expanded={showPreview}
            className="text-[11px] font-bold text-[#222E50]/60 hover:text-[#222E50] underline underline-offset-2 decoration-dotted transition-colors"
          >
            {showPreview ? "Tutup" : "Lihat Prompt"}
          </button>
          <AnimatePresence initial={false}>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <pre className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap text-[11px] leading-relaxed text-[#222E50]/80 bg-[#222E50]/5 rounded-xl p-3 font-sans">
                  {renderHighlightedContent(item.content, cardAccent)}
                </pre>
                <p className="mt-1.5 text-[10px] text-[#222E50]/50">
                  Bagian berwarna adalah yang perlu kamu ganti sebelum paste ke AI.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <motion.button
          onClick={() => onAction(item.content)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs tracking-wide relative overflow-hidden"
          style={{ backgroundColor: cardAccent, color: "#fff" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <ActionIcon className="w-3.5 h-3.5 relative z-10" />
          <span className="relative z-10">{buttonLabel}</span>
        </motion.button>
        <motion.button
          onClick={() => onShare(`#/vault/${category.id}/${item.id}`)}
          aria-label={`Salin link ${item.name}`}
          title="Salin link"
          className="shrink-0 w-11 rounded-xl border border-[#222E50]/15 text-[#222E50]/60 hover:text-[#222E50] hover:bg-[#222E50]/5 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export function CategoryDetail({ category, onBack, focusItemId }: CategoryDetailProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [activeBadge, setActiveBadge] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(focusItemId ?? null)
  const lenis = useLenis()

  const badgeOf = useCallback(
    (item: VaultItem) => item.badge || category.eyebrow || "Resource",
    [category.eyebrow],
  )

  // Badge unik buat filter (client-side only). Tampil kalau lebih dari 1.
  const allBadges = Array.from(new Set(category.items.map(badgeOf))).sort()

  const normalizedQuery = query.trim().toLowerCase()
  const matchesFilters = useCallback(
    (item: VaultItem) => {
      if (activeBadge && badgeOf(item) !== activeBadge) return false
      if (!normalizedQuery) return true
      return [item.name, item.description, item.badge ?? ""].some((field) =>
        field.toLowerCase().includes(normalizedQuery),
      )
    },
    [normalizedQuery, activeBadge, badgeOf],
  )

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }, [])

  // Deep link: scroll ke item yang dituju lalu kasih highlight sesaat.
  useEffect(() => {
    if (!focusItemId) return
    setFlashId(focusItemId)
    const t1 = window.setTimeout(() => {
      const el = document.querySelector(`[data-item-id="${focusItemId}"]`)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -100 })
      else el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 650)
    const t2 = window.setTimeout(() => setFlashId(null), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [focusItemId, lenis])

  const handleAction = useCallback(
    async (content: string) => {
      if (category.kind === "prompt") {
        try {
          await navigator.clipboard.writeText(content)
        } catch {
          // clipboard may be unavailable; still surface feedback
        }
        showToast("Prompt Copied! Let them cook.")
      } else {
        window.open(content, "_blank", "noopener,noreferrer")
      }
    },
    [category.kind, showToast],
  )

  const handleShare = useCallback(
    async (hash: string) => {
      const url = `${window.location.origin}${window.location.pathname}${hash}`
      try {
        await navigator.clipboard.writeText(url)
      } catch {
        // clipboard may be unavailable; still surface feedback
      }
      showToast("Link tersalin, silakan share!")
    },
    [showToast],
  )

  const Icon = category.icon
  const hasSections = category.sections && category.sections.length > 0

  // Determine grid layout based on category kind and content type
  const getGridClass = (index: number) => {
    if (category.id === "link-hardware") {
      // Section 0 (Products): 2x3 grid, Section 1 (Cables): 3-column grid
      return index === 0 ? "lg:grid-cols-3 md:grid-cols-2" : "lg:grid-cols-3"
    }
    return "lg:grid-cols-3 md:grid-cols-2"
  }

  return (
    <motion.section
      key={category.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative min-h-screen bg-[#222E50] pt-28 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />
      <DetailMiniBar onBack={onBack} />

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

        <div className="flex items-center gap-4 mb-12">
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
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: lightenHex(category.accent) }}>
              {category.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
              {category.title}
            </h1>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222E50]/40 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Cari di ${category.title}...`}
            aria-label={`Cari di ${category.title}`}
            className="w-full bg-white border border-[#222E50]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#222E50] placeholder:text-[#222E50]/35 outline-none focus:border-[#06AED5]/50 transition-colors shadow-sm"
          />
        </div>

        {allBadges.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter berdasarkan badge">
            <button
              onClick={() => setActiveBadge(null)}
              aria-pressed={activeBadge === null}
              className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-colors ${
                activeBadge === null
                  ? "text-white border-transparent"
                  : "text-white/70 border-white/20 hover:bg-white/10"
              }`}
              style={activeBadge === null ? { backgroundColor: category.accent } : undefined}
            >
              Semua
            </button>
            {allBadges.map((badge) => {
              const isActive = activeBadge === badge
              const count = category.items.filter((item) => badgeOf(item) === badge).length
              return (
                <button
                  key={badge}
                  onClick={() => setActiveBadge(isActive ? null : badge)}
                  aria-pressed={isActive}
                  className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-colors ${
                    isActive ? "text-white border-transparent" : "text-white/70 border-white/20 hover:bg-white/10"
                  }`}
                  style={isActive ? { backgroundColor: category.accent } : undefined}
                >
                  {badge} • {count}
                </button>
              )
            })}
          </div>
        )}
        {allBadges.length <= 1 && <div className="mb-10" />}

        {(normalizedQuery || activeBadge) && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 -mt-6 mb-6">
            Menampilkan {category.items.filter(matchesFilters).length} dari {category.items.length}
          </p>
        )}

        {category.id === "free-prompt" && (
          <div className="mb-12">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  step: "Pilih asisten",
                  desc: "Cari yang sesuai kebutuhanmu, misal butuh berita creator atau racikan PC.",
                },
                {
                  step: "Klik Copy Prompt",
                  desc: "Seluruh instruksi langsung tersalin ke clipboard.",
                },
                {
                  step: "Paste di AI favoritmu",
                  desc: "Tempel di ChatGPT, Claude, Gemini, atau Kimi, lalu ikuti pertanyaannya.",
                },
              ].map((item, i) => (
                <div key={item.step} className="paper-card border border-[#222E50]/10 rounded-2xl p-4 shadow-lg shadow-black/20">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ backgroundColor: category.accent }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-bold text-[#222E50] text-sm">{item.step}</p>
                  </div>
                  <p className="text-xs text-[#222E50]/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If category has sections (Free Prompt, Link Hardware), render with sections */}
        {hasSections ? (
          <div className="space-y-14">
            {category
              .sections!.map((section, sectionIndex) => {
                const isPromptAssistantSection = category.id === "free-prompt" && sectionIndex === 0
                const items = (isPromptAssistantSection ? allAsistenPrompts : section.items).filter(matchesFilters)
                return { section, sectionIndex, items }
              })
              .filter(({ items }) => items.length > 0)
              .map(({ section, sectionIndex, items: visibleItems }) => {
                return (
                  <div key={`section-${sectionIndex}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                      className="mb-6"
                    >
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">{section.heading}</h2>
                      {section.subtitle && <p className="text-white/60 text-sm">{section.subtitle}</p>}
                    </motion.div>

                    <motion.div
                      className={`grid grid-cols-1 md:grid-cols-2 ${getGridClass(sectionIndex)} gap-5`}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {visibleItems.map((item) => (
                        <ItemCard key={item.id} item={item} category={category} accent={section.accent ?? category.accent} highlighted={flashId === item.id} onAction={handleAction} onShare={handleShare} />
                      ))}
                    </motion.div>
                  </div>
                )
              })}
            {category.sections!.every((section, sectionIndex) => {
                const items = (category.id === "free-prompt" && sectionIndex === 0 ? allAsistenPrompts : section.items).filter(
                  matchesFilters,
                )
                return items.length === 0
              }) && (
                <div className="text-center py-16">
                  <p className="text-white font-bold">Nggak ketemu di sini.</p>
                  <p className="text-white/50 text-sm mt-2">Coba kata kunci atau filter lain.</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setQuery("")
                        setActiveBadge(null)
                      }}
                      className="text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Hapus pencarian
                    </button>
                    <a
                      href={getSocialHref("Discord")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
                      style={{ backgroundColor: category.accent }}
                    >
                      Tanya di Discord
                    </a>
                  </div>
                </div>
              )}
          </div>
        ) : (
          // Default layout for categories without sections (all current
          // categories use sections; kept as fallback for future ones)
          <>
            {category.items.filter(matchesFilters).length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {category.items
                  .filter(matchesFilters)
                  .map((item) => (
                    <ItemCard key={item.id} item={item} category={category} accent={category.accent} highlighted={flashId === item.id} onAction={handleAction} onShare={handleShare} />
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-white font-bold">Nggak ketemu di sini.</p>
                <p className="text-white/50 text-sm mt-2">Coba kata kunci atau filter lain.</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setQuery("")
                      setActiveBadge(null)
                    }}
                    className="text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                  >
                    Hapus pencarian
                  </button>
                  <a
                    href={getSocialHref("Discord")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: category.accent }}
                  >
                    Tanya di Discord
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white text-[#222E50] px-5 py-3 rounded-full shadow-2xl border border-[#06AED5]/20 overflow-hidden"
          >
            <span className="w-6 h-6 rounded-full bg-[#06AED5] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </span>
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

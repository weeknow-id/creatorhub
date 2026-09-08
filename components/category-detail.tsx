"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { CheckCircleIcon as Check } from "@solar-icons/react/linear/check-circle"
import { CopyIcon as Copy } from "@solar-icons/react/linear/copy"
import { SquareTopDownIcon as ExternalLink } from "@solar-icons/react/linear/square-top-down"
import { Library, Search } from "lucide-react"
import type { VaultCategory, VaultItem } from "@/lib/vault-data"
import { allAsistenPrompts } from "@/lib/prompt-asisten-data"
import { itemIconMap, itemTileAccent } from "@/lib/card-icons"
import { darkenHex } from "@/lib/color"

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

interface CategoryDetailProps {
  category: VaultCategory
  onBack: () => void
}

function ItemCard({ item, category, accent, onAction }: { item: VaultItem; category: VaultCategory; accent: string; onAction: (content: string) => void }) {
  const cardAccent = accent
  const tileAccent = itemTileAccent[item.id] ?? cardAccent
  const ActionIcon = category.kind === "prompt" ? Copy : ExternalLink
  const buttonLabel = category.kind === "prompt" ? "Copy Prompt" : "Open Link"

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="paper-card rounded-2xl p-5 md:p-6 border border-[#222E50]/10 flex flex-col group min-h-[230px] shadow-lg shadow-black/20"
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
            <img src={item.logo} alt="" className="w-full h-full object-cover" />
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

      <motion.button
        onClick={() => onAction(item.content)}
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs tracking-wide relative overflow-hidden"
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
    </motion.div>
  )
}

export function CategoryDetail({ category, onBack }: CategoryDetailProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()
  const matchesQuery = useCallback(
    (item: VaultItem) => {
      if (!normalizedQuery) return true
      return [item.name, item.description, item.badge ?? ""].some((field) =>
        field.toLowerCase().includes(normalizedQuery),
      )
    },
    [normalizedQuery],
  )

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }, [])

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
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: darkenHex(category.accent) }}>
              {category.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
              {category.title}
            </h1>
          </div>
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222E50]/40 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Cari di ${category.title}...`}
            aria-label={`Cari di ${category.title}`}
            className="w-full bg-white border border-[#222E50]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#222E50] placeholder:text-[#222E50]/35 outline-none focus:border-[#06AED5]/50 transition-colors shadow-sm"
          />
        </div>

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
                const items = (isPromptAssistantSection ? allAsistenPrompts : section.items).filter(matchesQuery)
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
                        <ItemCard key={item.id} item={item} category={category} accent={section.accent ?? category.accent} onAction={handleAction} />
                      ))}
                    </motion.div>
                  </div>
                )
              })}
            {normalizedQuery &&
              category.sections!.every((section, sectionIndex) => {
                const items = (category.id === "free-prompt" && sectionIndex === 0 ? allAsistenPrompts : section.items).filter(
                  matchesQuery,
                )
                return items.length === 0
              }) && (
                <div className="text-center py-16">
                  <p className="text-white font-bold">Nggak ketemu &ldquo;{query.trim()}&rdquo; di sini.</p>
                  <p className="text-white/50 text-sm mt-2">Coba kata kunci lain.</p>
                  <button
                    onClick={() => setQuery("")}
                    className="mt-5 text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                  >
                    Hapus pencarian
                  </button>
                </div>
              )}
          </div>
        ) : (
          // Default layout for categories without sections (all current
          // categories use sections; kept as fallback for future ones)
          <>
            {category.items.filter(matchesQuery).length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {category.items
                  .filter(matchesQuery)
                  .map((item) => (
                    <ItemCard key={item.id} item={item} category={category} accent={category.accent} onAction={handleAction} />
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-white font-bold">Nggak ketemu &ldquo;{query.trim()}&rdquo; di sini.</p>
                <p className="text-white/50 text-sm mt-2">Coba kata kunci lain.</p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-5 text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Hapus pencarian
                </button>
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white text-[#222E50] px-5 py-3 rounded-full shadow-2xl border border-[#06AED5]/20"
          >
            <span className="w-6 h-6 rounded-full bg-[#06AED5] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-bold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

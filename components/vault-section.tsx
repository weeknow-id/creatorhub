"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, type ComponentType, type CSSProperties } from "react"
import { AltArrowUpIcon as ArrowUpRight } from "@solar-icons/react/linear/alt-arrow-up"
import { BookOpen, Brain } from "lucide-react"
import { vaultCategories, getCategory, type VaultCategory } from "@/lib/vault-data"
import { glossaryTerms } from "@/lib/glossary-data"
import { quizThemes } from "@/lib/quiz-data"
import { miniCardsContent } from "@/lib/mini-cards-data"
import { TutorialCard } from "@/components/tutorial-card"
import { darkenHex } from "@/lib/color"

const unitLabel: Record<string, string> = {
  "free-prompt": "Prompts",
  "link-hardware": "Products",
  "link-resources": "Links",
}

function VaultCard({
  category,
  index,
  onSelect,
}: {
  category: VaultCategory
  index: number
  onSelect: (id: string) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const Icon = category.icon
  const tileGradient: Record<string, [string, string]> = {
    "free-prompt": ["#06AED5", "#8B5CF6"],
    "link-hardware": ["#FF9E57", "#F87171"],
    "link-resources": ["#06AED5", "#10B981"],
    faq: ["#22D3EE", "#06AED5"],
  }
  const [tileFrom, tileTo] = tileGradient[category.id] ?? [category.accent, category.accent]

  return (
    <motion.button
      onClick={() => onSelect(category.id)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="relative group text-left cursor-pointer w-full"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${category.accent}55, transparent, ${category.accent}55)`,
          filter: "blur(10px)",
        }}
      />

      <div className="relative paper-card rounded-3xl p-6 md:p-8 border border-[#222E50]/10 overflow-hidden h-full min-h-[228px] flex flex-col shadow-lg shadow-[#222E50]/10">
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative shrink-0"
              style={{
                background: `linear-gradient(135deg, ${tileFrom}, ${tileTo})`,
                boxShadow: `0 4px 20px ${category.accent}55`,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-7 h-7 relative z-10" style={{ color: "#fff" }} strokeWidth={2.2} />
            </motion.div>

            <div className="min-w-0">
              <h3 className="text-2xl md:text-3xl font-black text-[#222E50] tracking-tight whitespace-nowrap">
                {category.title}
              </h3>
              <span
                className="inline-flex mt-2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: `${category.accent}18`, color: darkenHex(category.accent) }}
              >
                {category.items.length} {unitLabel[category.id] ?? "Items"}
              </span>
            </div>
          </div>
          <p className="text-sm text-[#222E50]/75 mt-2 leading-relaxed flex-1 text-pretty">
            {category.description}
          </p>

          <div className="flex items-center gap-2 mt-5 font-bold text-sm" style={{ color: darkenHex(category.accent) }}>
            <span>{category.cta}</span>
            <motion.span
              className="inline-flex"
              initial={{ x: 0, y: 0 }}
              animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

interface MiniCardDef {
  id: string
  title: string
  description: string
  countLabel: string
  cta: string
  accent: string
  icon: ComponentType<{ className?: string; style?: CSSProperties; strokeWidth?: string | number }>
}

const faqMini = getCategory("faq")

type MiniIcon = ComponentType<{ className?: string; style?: CSSProperties; strokeWidth?: string | number }>

const miniIcons: Record<string, MiniIcon> = {
  faq: faqMini?.icon ?? BookOpen,
  glossary: BookOpen,
  quiz: Brain,
}

const miniCounts: Record<string, string> = {
  faq: `${faqMini?.items.length ?? 0} Questions`,
  glossary: `${glossaryTerms.length} Istilah`,
  quiz: `${quizThemes.length} Mode`,
}

// Gabung teks (file data, editable manual) + icon + angka (otomatis).
const miniCards: MiniCardDef[] = miniCardsContent.map((c) => ({
  ...c,
  icon: miniIcons[c.id] ?? BookOpen,
  countLabel: miniCounts[c.id] ?? "",
}))

// Kartu bantuan di kolom kanan: judul gede + deskripsi 1-2 baris + CTA bawah
// kayak 4 kartu utama (tanpa eyebrow biar muat).
function VaultMiniCard({ def, index, onSelect }: { def: MiniCardDef; index: number; onSelect: (id: string) => void }) {
  const Icon = def.icon
  return (
    <motion.button
      onClick={() => onSelect(def.id)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="relative group text-left cursor-pointer w-full flex-1"
    >
      <div className="relative paper-card rounded-2xl p-5 border border-[#222E50]/10 overflow-hidden h-full flex flex-col shadow-md shadow-[#222E50]/10">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${def.accent}, ${def.accent}88)`,
              boxShadow: `0 4px 16px ${def.accent}55`,
            }}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" style={{ color: "#fff" }} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-[#222E50] text-xl leading-tight">{def.title}</h3>
            <p
              className="inline-flex font-mono text-[9px] tracking-widest uppercase mt-1 px-2 py-px rounded-full"
              style={{ backgroundColor: `${def.accent}18`, color: darkenHex(def.accent) }}
            >
              {def.countLabel}
            </p>
          </div>
        </div>
        <p className="mt-2.5 text-xs text-[#222E50]/75 leading-relaxed line-clamp-2 flex-1">
          {def.description}
        </p>
        <div className="flex items-center gap-1.5 mt-3 font-bold text-[13px]" style={{ color: darkenHex(def.accent) }}>
          <span>{def.cta}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  )
}

interface VaultSectionProps {
  onSelectCategory: (id: string) => void
  onSelectTutorials: () => void
  onSelectGlossary: () => void
  onOpenQuiz: () => void
}

export function VaultSection({ onSelectCategory, onSelectTutorials, onSelectGlossary, onOpenQuiz }: VaultSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="vault" className="relative py-24 bg-[#222E50] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black text-white tracking-tight text-balance mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
          >
            Yang Kalian Cari, <span className="text-[#06AED5]">Ada Disini</span>
          </motion.h2>

          <motion.p
            className="text-sm text-white/50 mt-3 max-w-lg mx-auto text-pretty"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            Cari kebutuhan kalian sesuai kategori.
            <br />
            Prompt, Produk, Tools AI, sampai Jawaban soal Error ada disini
          </motion.p>

          <motion.div
            className="h-[2px] w-12 bg-[#FA8333] mx-auto mt-4 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-5 items-stretch">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:col-span-2">
            {vaultCategories
              .filter((category) => category.id !== "faq")
              .map((category, index) => (
                <VaultCard key={category.id} category={category} index={index} onSelect={onSelectCategory} />
              ))}
            <TutorialCard onSelect={onSelectTutorials} />
          </div>
          <div className="flex flex-col gap-5 order-last lg:order-none">
            {miniCards.map((def, i) => (
              <VaultMiniCard
                key={def.id}
                def={def}
                index={i}
                onSelect={
                  def.id === "faq"
                    ? onSelectCategory
                    : def.id === "glossary"
                      ? () => onSelectGlossary()
                      : () => onOpenQuiz()
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

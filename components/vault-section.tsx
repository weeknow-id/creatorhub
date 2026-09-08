"use client"

import type React from "react"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { AltArrowUpIcon as ArrowUpRight } from "@solar-icons/react/linear/alt-arrow-up"
import { vaultCategories, type VaultCategory } from "@/lib/vault-data"
import { darkenHex } from "@/lib/color"

const unitLabel: Record<string, string> = {
  "free-prompt": "Prompts",
  "link-hardware": "Products",
  "link-resources": "Links",
  faq: "Questions",
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
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

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
      ref={ref}
      onClick={() => onSelect(category.id)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4 min-w-0">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${tileFrom}, ${tileTo})`,
                boxShadow: `0 4px 20px ${category.accent}55`,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: category.accent }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHovered ? { opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <Icon className="w-6 h-6 relative z-10" style={{ color: "#fff" }} strokeWidth={2.2} />
            </motion.div>

            <div className="min-w-0 pt-0.5">
              <h3 className="text-2xl md:text-3xl font-black text-[#222E50] tracking-tight text-balance">
                {category.title}
              </h3>
              <span className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-2 whitespace-nowrap" style={{ color: darkenHex(category.accent) }}>
                {category.eyebrow || "RESOURCE"}
              </span>
            </div>
            </div>

            <span
              className="shrink-0 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ backgroundColor: `${category.accent}18`, color: darkenHex(category.accent) }}
            >
              {category.items.length} {unitLabel[category.id] ?? "Items"}
            </span>
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

interface VaultSectionProps {
  onSelectCategory: (id: string) => void
}

export function VaultSection({ onSelectCategory }: VaultSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="vault" className="relative py-24 bg-[#222E50] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10" style={{ perspective: 1200 }}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vaultCategories.map((category, index) => (
            <VaultCard key={category.id} category={category} index={index} onSelect={onSelectCategory} />
          ))}
        </div>
      </div>
    </section>
  )
}

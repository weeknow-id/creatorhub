"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { AltArrowUpIcon as ArrowUpRight } from "@solar-icons/react/linear/alt-arrow-up"
import { useState } from "react"
import { tutorials, tutorialsCardMeta } from "@/lib/tutorial-data"
import { darkenHex } from "@/lib/color"

const ACCENT = "#8B5CF6"

export function TutorialCard({ onSelect }: { onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="relative group text-left cursor-pointer w-full h-full"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}55, transparent, ${ACCENT}55)`,
          filter: "blur(10px)",
        }}
      />

      <div className="relative paper-card rounded-3xl p-6 md:p-8 border border-[#222E50]/10 overflow-hidden h-full min-h-[228px] flex flex-col shadow-lg shadow-[#222E50]/10">
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #6D28D9)`,
                boxShadow: `0 4px 20px ${ACCENT}55`,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <GraduationCap className="w-7 h-7 relative z-10" style={{ color: "#fff" }} strokeWidth={2.2} />
            </motion.div>

            <div className="min-w-0">
              <h3 className="text-2xl md:text-3xl font-black text-[#222E50] tracking-tight whitespace-nowrap">
                {tutorialsCardMeta.title}
              </h3>
              <span
                className="inline-flex mt-2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: `${ACCENT}18`, color: darkenHex(ACCENT) }}
              >
                {tutorials.length} Tutorials
              </span>
            </div>
          </div>

          <p className="text-sm text-[#222E50]/75 mt-2 leading-relaxed flex-1 text-pretty">
            {tutorialsCardMeta.description}
          </p>

          <div className="flex items-center gap-2 mt-5 font-bold text-sm" style={{ color: darkenHex(ACCENT) }}>
            <span>{tutorialsCardMeta.cta}</span>
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

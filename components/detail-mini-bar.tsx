"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"

// Bar mini nempel di bawah navbar saat user scroll jauh di halaman detail.
// Isinya tombol Back + judul biar tidak perlu scroll balik ke atas.
export function DetailMiniBar({
  onBack,
  tone = "dark",
}: {
  onBack: () => void
  tone?: "dark" | "light"
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const dark = tone === "dark"

  return (
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none px-6">
      <div className="max-w-5xl mx-auto flex justify-start">
        <AnimatePresence>
          {visible && (
            <motion.button
              onClick={onBack}
              initial={{ y: -16, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto flex items-center gap-2 pl-2 pr-4 py-2 rounded-full shadow-xl backdrop-blur-md border font-bold text-sm ${
                dark
                  ? "bg-[#222E50]/90 border-white/10 shadow-black/30 text-white/85"
                  : "bg-white/90 border-[#222E50]/10 shadow-[#222E50]/15 text-[#222E50]/85"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  dark ? "bg-white/10 text-white" : "bg-[#222E50]/10 text-[#222E50]"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </span>
              Back
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

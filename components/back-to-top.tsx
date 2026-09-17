"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useLenis } from "lenis/react"
import { AltArrowUpIcon as ArrowUp } from "@solar-icons/react/linear/alt-arrow-up"

// Tombol panah ke atas. Muncul setelah scroll >600px, jalan di semua view
// (home + detail) karena di-mount di root hub. Wajib lewat Lenis.
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (lenis) lenis.scrollTo(0, { immediate: reduced })
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={goTop}
          aria-label="Kembali ke atas"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-[80] w-11 h-11 rounded-full bg-[#222E50] text-white shadow-xl shadow-black/25 border border-white/15 flex items-center justify-center hover:bg-[#06AED5] transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

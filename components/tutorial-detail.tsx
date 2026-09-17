"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLenis } from "lenis/react"
import { AltArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/alt-arrow-left"
import { PlayIcon as Play } from "@solar-icons/react/linear/play"
import { CheckCircleIcon as CheckCircle } from "@solar-icons/react/linear/check-circle"
import { GraduationCap, Link2, Search, X } from "lucide-react"
import { tutorials, type Tutorial } from "@/lib/tutorial-data"
import { DetailMiniBar } from "@/components/detail-mini-bar"
import { getSocialHref } from "@/lib/site"
import { darkenHex, lightenHex } from "@/lib/color"

const ACCENT = "#8B5CF6"

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
}

function TutorialItemCard({ tutorial, highlighted, onShare, onReadMore }: { tutorial: Tutorial; highlighted: boolean; onShare: (hash: string) => void; onReadMore: (tutorial: Tutorial) => void }) {
  return (
    <motion.div
      variants={itemVariants}
      data-tutorial-id={tutorial.id}
      className="paper-card rounded-2xl p-5 md:p-6 border border-[#222E50]/10 flex flex-col min-h-[230px] shadow-lg shadow-black/20"
      style={highlighted ? { outline: `2px solid ${ACCENT}`, outlineOffset: 3 } : undefined}
    >
      <a
        href={tutorial.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Tonton ${tutorial.title} di YouTube`}
        className="group/thumb relative rounded-xl overflow-hidden mb-4 aspect-video bg-[#222E50]/10 shrink-0 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          loading="lazy"
          className="w-full h-full object-cover img-fade transition-transform duration-500 group-hover/thumb:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/thumb:bg-black/25 transition-colors duration-300">
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center text-white opacity-90 group-hover/thumb:opacity-100 group-hover/thumb:scale-110 transition-all duration-300 shadow-xl"
            style={{ backgroundColor: ACCENT }}
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </span>
        </span>
        {tutorial.duration && (
          <span className="absolute bottom-2 right-2 font-mono text-[11px] font-bold px-2 py-1 rounded-md bg-black/80 text-white tabular-nums">
            {tutorial.duration}
          </span>
        )}
      </a>

      <span
        className="inline-flex self-start text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white shadow-sm"
        style={{ backgroundColor: ACCENT }}
      >
        Voice Changer
      </span>

      <h3 className="mt-2 font-bold text-[#222E50] text-base leading-tight text-pretty">{tutorial.title}</h3>
      <p className="mt-2 text-xs text-[#222E50]/75 leading-relaxed text-pretty">{tutorial.description}</p>

      <div className="mt-auto pt-4 flex flex-col gap-2">
        <motion.button
          onClick={() => onReadMore(tutorial)}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs tracking-wide"
          style={{ backgroundColor: ACCENT, color: "#fff" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span>Baca Tutorialnya Disini</span>
        </motion.button>
        <div className="flex gap-2">
          <motion.a
            href={tutorial.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs tracking-wide border-2 transition-colors"
            style={{ borderColor: ACCENT, color: darkenHex(ACCENT) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Tonton Video</span>
          </motion.a>
          <motion.button
            onClick={() => onShare(`#/tutorials/${tutorial.id}`)}
            aria-label={`Salin link ${tutorial.title}`}
            title="Salin link"
            className="shrink-0 w-11 rounded-xl border border-[#222E50]/15 text-[#222E50]/60 hover:text-[#222E50] hover:bg-[#222E50]/5 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function TutorialModal({ tutorial, index, onClose }: { tutorial: Tutorial; index: number; onClose: () => void }) {
  const lenis = useLenis()

  // Kunci scroll halaman belakang; area putih popup tetap bisa di-scroll.
  useEffect(() => {
    lenis?.stop()
    return () => lenis?.start()
  }, [lenis])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tutorial.title}
    >
      <motion.div
        className="relative bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full my-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#222E50]/10 flex items-center justify-center text-[#222E50] hover:bg-[#222E50]/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3 pr-10">
          <div
            className="size-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #6D28D9)`, color: "#fff" }}
            aria-hidden="true"
          >
            <GraduationCap className="size-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-[#222E50] text-xl leading-tight text-pretty">{tutorial.title}</h3>
            <span
              className="inline-flex mt-1.5 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${ACCENT}22`, color: darkenHex(ACCENT) }}
            >
              {tutorial.duration ? `Video • ${tutorial.duration}` : "Video"}
            </span>
          </div>
        </div>

        <p className="text-sm text-[#222E50]/75 leading-relaxed">{tutorial.description}</p>

        <h4 className="mt-6 mb-3 font-bold text-[#222E50] text-sm">Langkah-langkah:</h4>
        <ol className="space-y-3">
          {tutorial.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#222E50]/80">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 mt-0.5"
                style={{ backgroundColor: ACCENT }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed">
                <span className="font-bold text-[#222E50]">{step.title}</span>
                {step.description && <span className="block text-[#222E50]/75 mt-0.5">{step.description}</span>}
              </span>
            </li>
          ))}
        </ol>

        {tutorial.relatedLinks.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 font-bold text-[#222E50] text-sm">Link terkait:</h4>
            <div className="flex flex-wrap gap-2">
              {tutorial.relatedLinks.map((link) => (
                <a
                  key={link.url + link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-[#222E50]/15 text-[#222E50]/80 hover:bg-[#222E50]/5 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <motion.a
          href={tutorial.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm tracking-wide"
          style={{ backgroundColor: ACCENT, color: "#fff" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Play className="w-4 h-4" />
          <span>Tonton Video #{index + 1}</span>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export function TutorialDetail({ onBack, focusTutorialId }: { onBack: () => void; focusTutorialId?: string | null }) {
  const [flashId, setFlashId] = useState<string | null>(focusTutorialId ?? null)
  const [copied, setCopied] = useState(false)
  const [selected, setSelected] = useState<Tutorial | null>(null)
  const [query, setQuery] = useState("")
  const lenis = useLenis()

  const normalizedQuery = query.trim().toLowerCase()
  const visibleTutorials = tutorials.filter((t) => {
    if (!normalizedQuery) return true
    return [t.title, t.description, ...(t.summary ?? []), ...t.steps.map((s) => `${s.title} ${s.description}`)]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  })

  // Escape nutup popup tutorial.
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  useEffect(() => {
    if (!focusTutorialId) return
    setFlashId(focusTutorialId)
    const t1 = window.setTimeout(() => {
      const el = document.querySelector(`[data-tutorial-id="${focusTutorialId}"]`)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -100 })
      else el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 650)
    const t2 = window.setTimeout(() => setFlashId(null), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [focusTutorialId, lenis])

  const handleShare = async (hash: string) => {
    const url = `${window.location.origin}${window.location.pathname}${hash}`
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
      key="tutorials"
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
              background: `linear-gradient(135deg, ${ACCENT}, #6D28D9)`,
              boxShadow: `0 4px 20px ${ACCENT}55`,
            }}
          >
            <GraduationCap className="w-7 h-7" style={{ color: "#fff" }} strokeWidth={2.2} />
          </div>
          <div>
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: lightenHex(ACCENT) }}
            >
              TUTORIAL STEP-BY-STEP
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
              Tutorials
            </h1>
          </div>
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222E50]/40 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tutorial..."
            aria-label="Cari tutorial"
            className="w-full bg-white border border-[#222E50]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#222E50] placeholder:text-[#222E50]/35 outline-none focus:border-[#8B5CF6]/50 transition-colors shadow-sm"
          />
        </div>

        {normalizedQuery && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 -mt-6 mb-6">
            Menampilkan {visibleTutorials.length} dari {tutorials.length}
          </p>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        >
          {visibleTutorials.map((tutorial) => (
            <TutorialItemCard key={tutorial.id} tutorial={tutorial} highlighted={flashId === tutorial.id} onShare={handleShare} onReadMore={setSelected} />
          ))}
        </motion.div>

        {visibleTutorials.length === 0 && (
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

      <AnimatePresence>
        {selected && (
          <TutorialModal
            tutorial={selected}
            index={tutorials.findIndex((t) => t.id === selected.id)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {copied && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white text-[#222E50] px-5 py-3 rounded-full shadow-2xl border border-[#8B5CF6]/20 overflow-hidden">
          <span className="font-bold text-sm">Link tersalin, silakan share!</span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] bg-[#8B5CF6]"
            style={{ animation: "toast-shrink 2.6s linear forwards" }}
          />
        </div>
      )}
    </motion.section>
  )
}

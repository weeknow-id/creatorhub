"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "lenis/react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VaultSection } from "@/components/vault-section"
import { CommunitySection } from "@/components/community-section"
import { FeaturedVideos } from "@/components/featured-videos"
import { CareersSection } from "@/components/careers-section"
import { Footer } from "@/components/footer"
import { CategoryDetail } from "@/components/category-detail"
import { FaqDetail } from "@/components/faq-detail"
import { TutorialDetail } from "@/components/tutorial-detail"
import { GlossaryDetail } from "@/components/glossary-detail"
import { QuizModal } from "@/components/quiz-modal"
import { BackToTop } from "@/components/back-to-top"
import { getCategory, vaultCategories } from "@/lib/vault-data"

interface ParsedHash {
  categoryId?: string
  itemId?: string
  tutorials?: boolean
  tutorialId?: string
  glossary?: boolean
  glossaryTermId?: string
}

function findCategoryWithItem(itemId: string): string | null {
  for (const cat of vaultCategories) {
    if (cat.items.some((item) => item.id === itemId)) return cat.id
  }
  return null
}

// Format deep link (hash-only, tanpa butuh server rewrite — aman untuk
// GitHub Pages maupun Vercel):
//   #/vault/<categoryId>/<itemId>   contoh #/vault/free-prompt/p1
//   #/vault/<categoryId>             contoh #/vault/faq
//   #/tutorials[/<tutorialId>]       contoh #/tutorials/t1
//   #prompt-<itemId> / #<itemId>      alias pendek, contoh #prompt-p1
function parseHash(hash: string): ParsedHash | null {
  const raw = hash.replace(/^#\/?/, "")
  if (!raw) return null
  const parts = raw.split("/").filter(Boolean)
  if (parts[0] === "vault" && parts[1]) {
    return { categoryId: parts[1], itemId: parts[2] }
  }
  if (parts[0] === "tutorials") {
    return { tutorials: true, tutorialId: parts[1] }
  }
  if (parts[0] === "glossary") {
    return { glossary: true, glossaryTermId: parts[1] }
  }
  if (parts.length === 1) {
    const id = parts[0].startsWith("prompt-") ? parts[0].slice("prompt-".length) : parts[0]
    const catId = findCategoryWithItem(id)
    if (catId) return { categoryId: catId, itemId: id }
  }
  return null
}

export function Hub() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [showTutorials, setShowTutorials] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [focusItemId, setFocusItemId] = useState<string | null>(null)
  const [focusTutorialId, setFocusTutorialId] = useState<string | null>(null)
  const [focusGlossaryTermId, setFocusGlossaryTermId] = useState<string | null>(null)
  // Tujuan scroll yang dieksekusi SETELAH animasi exit detail selesai
  // (AnimatePresence onExitComplete) — biar tidak balapan dengan mount home.
  const [pendingScrollHref, setPendingScrollHref] = useState<string | null>(null)
  const lenis = useLenis()

  // Smooth-scroll biasa — hanya dipakai saat SUDAH di home (elemen pasti ada).
  const scrollTo = useCallback(
    (href: string) => {
      const el = document.querySelector(href)
      if (!el) return
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -90 })
      } else {
        el.scrollIntoView({ behavior: "smooth" })
      }
    },
    [lenis],
  )

  // Lompat instan + verifikasi posisi (anti-nyasar). Dipakai SETELAH ganti
  // view (detail -> home): layout baru mount, font/gambar bisa geser layout
  // setelah scroll, dan smooth-scroll rawan keinterupsi di tengah jalan.
  // Lompat instan tidak bisa "nanggung" — kalau meleset, verify loop koreksi.
  const jumpToHref = useCallback(
    (href: string) => {
      const el = document.querySelector(href)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90, immediate: true })
      else (el as HTMLElement).scrollIntoView({ block: "start" })
      // Verifikasi + koreksi (font/gambar bisa geser layout setelah jump).
      // Batal total kalau user sudah ambil alih scroll (wheel/sentuh/tombol)
      // supaya tidak narik balik dan teleport 2x.
      let userTookOver = false
      const cancel = () => {
        userTookOver = true
      }
      const cancelOnKeys = (e: KeyboardEvent) => {
        if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
          userTookOver = true
        }
      }
      window.addEventListener("wheel", cancel, { passive: true })
      window.addEventListener("touchmove", cancel, { passive: true })
      window.addEventListener("keydown", cancelOnKeys)
      const cleanup = () => {
        window.removeEventListener("wheel", cancel)
        window.removeEventListener("touchmove", cancel)
        window.removeEventListener("keydown", cancelOnKeys)
      }
      ;[350, 900, 1600].forEach((delay, i, arr) => {
        window.setTimeout(() => {
          if (i === arr.length - 1) cleanup()
          if (userTookOver) return
          const now = document.querySelector(href)
          if (!now) return
          const expected = (now as HTMLElement).getBoundingClientRect().top + window.scrollY - 90
          if (Math.abs(window.scrollY - expected) > 8) {
            if (lenis) lenis.scrollTo(now as HTMLElement, { offset: -90, immediate: true })
            else (now as HTMLElement).scrollIntoView({ block: "start" })
          }
        }, delay)
      })
    },
    [lenis],
  )

  const closeAllViews = useCallback(() => {
    setActiveCategoryId(null)
    setShowTutorials(false)
    setShowGlossary(false)
    setFocusItemId(null)
    setFocusTutorialId(null)
    setFocusGlossaryTermId(null)
  }, [])

  const scrollTopInstant = useCallback(() => {
    // Wajib lewat Lenis: window.scrollTo dilawan balik oleh Lenis
    // sehingga halaman bisa nyasar (misal landing di tengah/bawah).
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }, [lenis])

  const handleNavigate = useCallback(
    (href: string) => {
      if (activeCategoryId || showTutorials || showGlossary) {
        closeAllViews()
        // Jangan scroll sekarang (konten home belum mount) — tunggu exit selesai.
        setPendingScrollHref(href)
      } else {
        scrollTo(href)
      }
    },
    [activeCategoryId, showTutorials, showGlossary, closeAllViews, scrollTo],
  )

  const handleSelectCategory = useCallback((id: string) => {
    closeAllViews()
    setActiveCategoryId(id)
    scrollTopInstant()
  }, [closeAllViews, scrollTopInstant])

  const handleSelectTutorials = useCallback(() => {
    closeAllViews()
    setShowTutorials(true)
    scrollTopInstant()
  }, [closeAllViews, scrollTopInstant])

  const handleSelectGlossary = useCallback(() => {
    closeAllViews()
    setShowGlossary(true)
    scrollTopInstant()
  }, [closeAllViews, scrollTopInstant])

  // Quiz buka sebagai popup (bukan pindah view) — posisi scroll tidak diubah.
  const handleOpenQuiz = useCallback(() => {
    setShowQuiz(true)
  }, [])

  const handleCloseQuiz = useCallback(() => {
    setShowQuiz(false)
  }, [])

  const handleBack = useCallback(() => {
    closeAllViews()
    // Balik ke section vault (bukan hero) — dieksekusi pas exit selesai.
    setPendingScrollHref("#vault")
  }, [closeAllViews])

  // Dipanggil AnimatePresence saat exit detail selesai: home sudah mount,
  // lompat instan (bukan smooth) + verify loop biar tidak nanggung.
  const handleExitComplete = useCallback(() => {
    if (!pendingScrollHref) return
    const href = pendingScrollHref
    setPendingScrollHref(null)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => jumpToHref(href))
    })
  }, [pendingScrollHref, jumpToHref])

  // Buka view langsung dari URL hash (deep link). Jalan saat load pertama
  // dan saat hash berubah (misal user paste link share).
  const openFromHash = useCallback(() => {
    if (typeof window === "undefined") return
    const parsed = parseHash(window.location.hash)
    if (!parsed) return
    if (parsed.tutorials) {
      closeAllViews()
      setShowTutorials(true)
      setFocusTutorialId(parsed.tutorialId ?? null)
    } else if (parsed.glossary) {
      closeAllViews()
      setShowGlossary(true)
      setFocusGlossaryTermId(parsed.glossaryTermId ?? null)
    } else if (parsed.categoryId && getCategory(parsed.categoryId)) {
      closeAllViews()
      setActiveCategoryId(parsed.categoryId)
      setFocusItemId(parsed.itemId ?? null)
    }
    if (!parsed.itemId && !parsed.tutorialId && !parsed.glossaryTermId) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo({ top: 0 })
    }
  }, [lenis, closeAllViews])

  useEffect(() => {
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [openFromHash])

  // Escape nutup halaman detail (tapi bukan modal — modal urus sendiri).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if ((e.target as HTMLElement | null)?.closest?.('[role="dialog"]')) return
      if (activeCategoryId || showTutorials || showGlossary) handleBack()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeCategoryId, showTutorials, showGlossary, handleBack])

  const activeCategory = activeCategoryId ? getCategory(activeCategoryId) : undefined

  return (
    <main className="min-h-screen bg-transparent">
      <Navigation onNavigate={handleNavigate} />
      <BackToTop />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {showTutorials ? (
          <TutorialDetail key="tutorials" onBack={handleBack} focusTutorialId={focusTutorialId} />
        ) : showGlossary ? (
          <GlossaryDetail key="glossary" onBack={handleBack} focusTermId={focusGlossaryTermId} />
        ) : activeCategory ? (
          activeCategory.id === "faq" ? (
            <FaqDetail key={activeCategory.id} category={activeCategory} onBack={handleBack} focusItemId={focusItemId} />
          ) : (
            <CategoryDetail key={activeCategory.id} category={activeCategory} onBack={handleBack} focusItemId={focusItemId} />
          )
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection onNavigate={handleNavigate} />
            <VaultSection onSelectCategory={handleSelectCategory} onSelectTutorials={handleSelectTutorials} onSelectGlossary={handleSelectGlossary} onOpenQuiz={handleOpenQuiz} />
            <CommunitySection />
            <FeaturedVideos />
            <CareersSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showQuiz && <QuizModal key="quiz" onClose={handleCloseQuiz} />}
      </AnimatePresence>
    </main>
  )
}

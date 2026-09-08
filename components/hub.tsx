"use client"

import { useState, useCallback } from "react"
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
import { getCategory } from "@/lib/vault-data"

export function Hub() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const lenis = useLenis()

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

  const handleNavigate = useCallback(
    (href: string) => {
      if (activeCategoryId) {
        setActiveCategoryId(null)
        // wait for the home content to mount before scrolling
        window.setTimeout(() => scrollTo(href), 450)
      } else {
        scrollTo(href)
      }
    },
    [activeCategoryId, scrollTo],
  )

  const handleSelectCategory = useCallback((id: string) => {
    setActiveCategoryId(id)
    // Wajib lewat Lenis: window.scrollTo dilawan balik oleh Lenis
    // sehingga halaman bisa nyasar (misal landing di tengah/bawah).
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }, [lenis])

  const handleBack = useCallback(() => {
    setActiveCategoryId(null)
    window.setTimeout(() => scrollTo("#vault"), 400)
  }, [scrollTo])

  const activeCategory = activeCategoryId ? getCategory(activeCategoryId) : undefined

  return (
    <main className="min-h-screen bg-transparent">
      <Navigation onNavigate={handleNavigate} />
      <AnimatePresence mode="wait">
        {activeCategory ? (
          activeCategory.id === "faq" ? (
            <FaqDetail key={activeCategory.id} category={activeCategory} onBack={handleBack} />
          ) : (
            <CategoryDetail key={activeCategory.id} category={activeCategory} onBack={handleBack} />
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
            <VaultSection onSelectCategory={handleSelectCategory} />
            <CommunitySection />
            <FeaturedVideos />
            <CareersSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { HamburgerMenuIcon as Menu } from "@solar-icons/react/linear/hamburger-menu"
import { CloseIcon as X } from "@solar-icons/react/linear/close"

interface NavigationProps {
  onNavigate: (href: string) => void
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState("#hero")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ids = ["hero", "vault", "community", "featured", "careers", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    // Observe ulang tiap struktur home/detail bertukar: section home di-unmount
    // pas buka detail card dan di-mount ulang pas back, observer lama menunjuk
    // ke node mati. Cukup childList di <main> (tanpa subtree) supaya animasi
    // framer-motion (mutasi style tiap frame) tidak memicu callback sia-sia.
    const observeAll = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }
    observeAll()
    const mo = new MutationObserver(() => observeAll())
    const mainEl = document.querySelector("main")
    mo.observe(mainEl ?? document.body, { childList: true })
    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [])

  const handleClick = (href: string) => {
    onNavigate(href)
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "The Vault", href: "#vault" },
    { label: "Community", href: "#community" },
    { label: "Featured", href: "#featured" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#222E50]/95 backdrop-blur-md border-b border-white/10 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <motion.button
          onClick={() => handleClick("#hero")}
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="WeeKnow home"
        >
          <Image
            src="/creatorhub/images/wk-navbar.png"
            alt="WeeKnow"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </motion.button>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((item, i) => {
            const isActive = activeHref === item.href
            const isContact = item.href === "#contact"
            return (
              <motion.button
                key={item.label}
                onClick={() => handleClick(item.href)}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium tracking-wide transition-colors relative ${
                  isContact
                    ? "border border-white/25 rounded-full px-4 py-1.5 text-white hover:border-[#06AED5] hover:text-[#06AED5]"
                    : isActive
                      ? "text-[#06AED5]"
                      : "text-white/80 hover:text-[#06AED5]"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {!isContact && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#06AED5] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <motion.a
          href="https://trakteer.id/weeknow.id/tip"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-[#FA8333] text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          />
          <span className="relative z-10">Traktir Admin</span>
        </motion.a>

        <motion.button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden bg-[#222E50]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className={`block w-full text-left text-lg font-medium py-2 transition-colors ${
                    activeHref === item.href ? "text-[#06AED5]" : "text-white/80 hover:text-[#06AED5]"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href="https://trakteer.id/weeknow.id/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#FA8333] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Traktir Admin
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

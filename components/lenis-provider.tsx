"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { useCallback, useEffect, useRef, type ReactNode } from "react"

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef | null>(null)

  const setRef = useCallback((instance: LenisRef | null) => {
    lenisRef.current = instance
  }, [])

  useEffect(() => {
    // Fix drag-thumb native vs Lenis: saat user menekan gutter scrollbar
    // (klik di luar lebar viewport = area scrollbar klasik Windows),
    // stop Lenis sementara supaya smoothing-nya tidak berantem dengan
    // geseran manual (gejala: ketahan lalu lompat). Start lagi pas dilepas.
    const onDown = (e: MouseEvent) => {
      if (e.clientX > document.documentElement.clientWidth) lenisRef.current?.lenis?.stop()
    }
    const onUp = () => lenisRef.current?.lenis?.start()
    window.addEventListener("mousedown", onDown, { passive: true })
    window.addEventListener("mouseup", onUp, { passive: true })
    // Pengaman: kalau mouseup kejadian di luar window, tetap start lagi.
    window.addEventListener("blur", onUp)
    return () => {
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("blur", onUp)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={setRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}

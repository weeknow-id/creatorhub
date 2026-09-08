"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { PlayIcon as Play } from "@solar-icons/react/linear/play"
import type { ComponentType } from "react"
import { DiscordIcon, InstagramIcon, TikTokIcon, YoutubeIcon } from "@/components/social-icons"

interface Stat {
  target: number
  label: string
  platform: string
  icon: ComponentType<{ className?: string }>
  accent: string
  href: string
}

const stats: Stat[] = [
  { target: 8000, label: "Subscribers", platform: "YouTube", icon: YoutubeIcon, accent: "#FA8333", href: "https://www.youtube.com/@WeeKnowID" },
  { target: 6000, label: "Followers", platform: "Instagram", icon: InstagramIcon, accent: "#06AED5", href: "https://instagram.com/weeknow.id" },
  { target: 7000, label: "Followers", platform: "TikTok", icon: TikTokIcon, accent: "#FA8333", href: "https://tiktok.com/@weeknow.id" },
  { target: 600, label: "Members", platform: "Discord", icon: DiscordIcon, accent: "#06AED5", href: "https://discord.com/invite/A4PcHfwxVu" },
]

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const duration = 1800
    const startAt = performance.now() + delay * 1000
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - startAt) / duration, 0), 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(t === 1 ? target : Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, delay])

  return <span ref={ref}>{display.toLocaleString("id-ID")}+</span>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
}

export function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="community" className="relative py-24 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-14 pb-3"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#222E50] tracking-tighter overflow-hidden text-balance">Our Community</h2>
          <motion.p
            className="text-sm text-[#222E50]/75 mt-5 max-w-lg mx-auto text-pretty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Komunitas kecil yang aktif dan saling support.
            <br />
            Yuk tumbuh bareng WeeKnow.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.a
                key={stat.href}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka ${stat.platform} WeeKnow`}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="flex flex-col gap-3 bg-[#222E50] rounded-2xl px-5 py-5 border border-white/10 text-left sm:flex-row sm:items-center sm:gap-5 sm:px-6"
              >
                <div
                  className="size-10 sm:size-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.accent}22`, color: stat.accent }}
                >
                  <Icon className="size-5 sm:size-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-2xl sm:text-[28px] font-black text-white tracking-tight tabular-nums leading-none">
                    <CountUp target={stat.target} delay={i * 0.15} />
                  </div>
                  <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 truncate">
                    {stat.label}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://www.youtube.com/@WeeKnowID"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FA8333] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />
            <Play className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Subscribe YouTube</span>
          </motion.a>
          <motion.a
            href="https://discord.com/invite/A4PcHfwxVu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-[#222E50] text-[#222E50] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide"
            whileHover={{ scale: 1.03, backgroundColor: "#222E50", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <DiscordIcon className="w-5 h-5" />
            <span>Join Discord</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

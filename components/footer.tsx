"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { LetterIcon as Mail } from "@solar-icons/react/linear/letter"
import { DiscordIcon, InstagramIcon, TikTokIcon, YoutubeIcon } from "@/components/social-icons"

const socials = [
  { name: "YouTube", href: "https://www.youtube.com/@WeeKnowID", Icon: YoutubeIcon },
  { name: "Instagram", href: "https://www.instagram.com/weeknow.id", Icon: InstagramIcon },
  { name: "TikTok", href: "https://tiktok.com/@weeknow.id", Icon: TikTokIcon },
  { name: "Discord", href: "https://discord.com/invite/A4PcHfwxVu", Icon: DiscordIcon },
]

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#1a2340] pt-20 pb-8 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="mb-8">
            <Image
              src="/creatorhub/images/weeknow-logo-white.png"
              alt="WeeKnow logo"
              width={300}
              height={100}
              className="h-24 w-auto object-contain"
            />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter text-balance">
            Let&apos;s <span className="text-[#06AED5]">Connect</span>
          </h2>
          <p className="text-sm text-white/50 mt-4 max-w-xl text-pretty">
            Punya pertanyaan, kolaborasi, atau sekadar mau say hi?
            <br />
            Kita ada di semua platform.
          </p>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=chlimedia.id@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-[#FA8333] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Email Us</span>
          </motion.a>

          <div className="flex items-center justify-center gap-3 mt-10">
            {socials.map(({ name, href, Icon }, i) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#222E50] hover:bg-[#06AED5] hover:border-[#06AED5] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-16 pt-6 border-t border-white/10">
          <Image
            src="/creatorhub/images/wk-navbar.png"
            alt="WeeKnow"
            width={140}
            height={44}
            className="h-8 w-auto object-contain"
          />
          <p className="text-white/40 font-mono text-xs">© 2026 WeeKnow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PlayIcon as Play } from "@solar-icons/react/linear/play"
import { videos } from "@/lib/video-data"
import { getSocialHref } from "@/lib/site"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
}

export function FeaturedVideos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="featured" className="relative py-24 bg-[#222E50] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#222E50] via-[#1b2544] to-[#222E50]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-14 pb-3"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter overflow-hidden text-balance">Featured Videos</h2>
          <motion.p
            className="text-sm text-white/50 mt-5 max-w-lg mx-auto text-pretty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Tutorial dan tips paling laris dari channel WeeKnow.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {videos.map((video) => (
            <motion.a
              key={video.videoId}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="group block bg-[#1a2340] rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover img-fade"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2340] via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 font-mono text-[11px] font-bold px-2 py-1 rounded-md bg-black/80 text-white tabular-nums">
                  {video.duration}
                </span>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ backgroundColor: video.accent }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </motion.div>
                </motion.div>
              </div>
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-[#06AED5] transition-colors text-balance">
                    {video.title}
                  </h3>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    {video.views} views • {video.uploadedAt}
                  </p>
                </div>
                <motion.div
                  className="flex items-center gap-1 font-bold text-sm shrink-0"
                  style={{ color: video.accent }}
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Watch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href={`${getSocialHref("YouTube")}/videos`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-7 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Lihat Video Lainnya di YouTube
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

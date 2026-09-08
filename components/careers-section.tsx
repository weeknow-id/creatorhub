"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { CloseIcon as Close } from "@solar-icons/react/linear/close"
import { CheckCircleIcon as CheckCircle } from "@solar-icons/react/linear/check-circle"

interface CareersDetailProps {
  onBack: () => void
}

function CareersDetail({ onBack }: CareersDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onBack}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <motion.button
          onClick={onBack}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#222E50]/10 flex items-center justify-center text-[#222E50] hover:bg-[#222E50]/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Close className="w-5 h-5" />
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-3xl font-black text-[#222E50] tracking-tight mb-2">VTuber Talent Recruitment</h3>
          <p className="text-sm text-[#222E50]/75 mb-6">
            We need livestreamer, gamer, or talented entertainer like you to join us to become a faceless talent in
            future WeeKnow Production
          </p>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#222E50] mb-4">Terms & Conditions:</h4>
            <ul className="space-y-3">
              {[
                "Female, aged 18 or older",
                "Proven experience in content creation",
                "Strong passion for teaching and sharing knowledge",
                "Owns a mid-to-high-spec PC or laptop",
                "Able to commit to a minimum one-year contract",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-[#222E50]/80"
                >
                  <CheckCircle className="w-4 h-4 text-[#06AED5] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=chlimedia.id@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center bg-[#06AED5] text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden group mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Apply Early</span>
          </motion.a>

          <motion.button
            onClick={onBack}
            className="w-full px-6 py-3.5 rounded-full font-bold text-sm tracking-wide border-2 border-[#222E50]/20 text-[#222E50] hover:bg-[#222E50]/5 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

interface CareersState {
  showDetail: boolean
}

export function CareersSection() {
  const [state, setState] = useState<CareersState>({ showDetail: false })

  return (
    <section id="careers" className="relative py-24 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 pb-3"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#222E50] tracking-tighter overflow-hidden text-balance">Careers</h2>
          <motion.p
            className="text-sm text-[#222E50]/75 mt-5 max-w-lg mx-auto text-pretty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Kami mencari talenta kreatif yang bersemangat untuk bergabung dengan tim WeeKnow.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => setState({ showDetail: true })}
            className="bg-[#06AED5] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Join Us</span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {state.showDetail && <CareersDetail onBack={() => setState({ showDetail: false })} />}
      </AnimatePresence>
    </section>
  )
}

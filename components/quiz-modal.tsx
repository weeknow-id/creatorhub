"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLenis } from "lenis/react"
import { CloseIcon as Close } from "@solar-icons/react/linear/close"
import { CheckCircleIcon as CheckCircle } from "@solar-icons/react/linear/check-circle"
import { CloseCircleIcon as WrongIcon } from "@solar-icons/react/linear/close-circle"
import { quizThemes, sampleQuestions, type QuizQuestion, type QuizTheme } from "@/lib/quiz-data"

interface BadgeStyle {
  title: string
  comment: string
  // Plakat pastel: base flat + bevel dalam. hi/dark tidak dipakai render
  // saat ini (disimpan biar gampang balik ke metal kalau mau).
  hi: string
  base: string
  dark: string
  text: string
  // Kilau jalan cuma buat badge prestisius (hemat baterai + reduced-motion).
  shine: boolean
}

// 10 badge title hasil kuis (berlaku semua tema). Dicek berurutan dari atas,
// yang pertama cocok yang dipakai. Waktu dalam milidetik.
// Tiap achievement punya metal sendiri: makin prestisius makin menyala.
function badgeInfo(score: number, total: number, ms: number): BadgeStyle {
  if (score === total && ms < 15_000)
    return { title: "Cheater", comment: "10/10 di bawah 15 detik? Antara sepuh atau... ya gitu.", hi: "#FECACA", base: "#FCA5A5", dark: "#F87171", text: "#7F1D1D", shine: true };
  if (score === total && ms < 30_000)
    return { title: "I am Speed", comment: "Cepat dan tepat. Jari-jarimu mencurigakan (dengan cara yang baik).", hi: "#FEF3C7", base: "#FCD34D", dark: "#F59E0B", text: "#78350F", shine: true };
  if (score === total && ms < 60_000)
    return { title: "Speedrun?", comment: "Sempurna di bawah semenit. Speedrunner beneran.", hi: "#FED7AA", base: "#FDBA74", dark: "#FB923C", text: "#7C2D12", shine: true };
  if (ms > 300_000)
    return { title: "La Peace", comment: "Santai, tidak ada yang ngejar. Nikmati prosesnya.", hi: "#A7F3D0", base: "#6EE7B7", dark: "#34D399", text: "#064E3B", shine: false };
  if (score === total)
    return { title: "Big Brain", comment: "Otak encer. 10/10 tanpa cela.", hi: "#FBCFE8", base: "#F9A8D4", dark: "#F472B6", text: "#831843", shine: true };
  if (score >= total - 2)
    return { title: "AI Senior", comment: "Dikit lagi sempurna. Senior memang beda.", hi: "#FEF08A", base: "#FDE047", dark: "#FACC15", text: "#713F12", shine: false };
  if (score >= total - 4)
    return { title: "AI Junior", comment: "Fondasi kuat, tinggal poles dikit.", hi: "#E2E8F0", base: "#CBD5E1", dark: "#94A3B8", text: "#334155", shine: false };
  if (score >= Math.ceil(total / 2) - 1)
    return { title: "Beginner", comment: "Awal yang bagus. Semua sepuh dulunya beginner.", hi: "#BAE6FD", base: "#7DD3FC", dark: "#38BDF8", text: "#0C4A6E", shine: false };
  if (score >= 1)
    return { title: "Really Bro?", comment: "Hmm. Yakin tadi baca soalnya?", hi: "#E7E5E4", base: "#D6D3D1", dark: "#A8A29E", text: "#44403C", shine: false };
  return { title: "God Tier", comment: "Nol besar itu susah loh. Konsisten salah juga butuh skill.", hi: "#DDD6FE", base: "#C4B5FD", dark: "#A78BFA", text: "#4C1D95", shine: true };
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function QuizModal({ onClose }: { onClose: () => void }) {
  const [theme, setTheme] = useState<QuizTheme | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()

  // Kunci scroll halaman belakang; popup tetap bisa di-scroll.
  useEffect(() => {
    lenis?.stop()
    return () => lenis?.start()
  }, [lenis])

  // Escape nutup popup.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const pickTheme = (t: QuizTheme) => {
    setTheme(t)
    setQuestions(sampleQuestions(t))
    setQIndex(0)
    setScore(0)
    setPicked(null)
    setFinished(false)
    setStartTime(Date.now())
    setElapsedMs(0)
  }

  const backToThemes = () => {
    setTheme(null)
    setQuestions([])
    setQIndex(0)
    setScore(0)
    setPicked(null)
    setFinished(false)
    setStartTime(null)
    setElapsedMs(0)
  }

  const answer = (i: number) => {
    if (!theme || picked !== null) return
    const q = questions[qIndex]
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (picked === null) return
    setPicked(null)
    if (qIndex + 1 >= questions.length) {
      setElapsedMs(Date.now() - (startTime ?? Date.now()))
      setFinished(true)
    } else {
      setQIndex((x) => x + 1)
    }
  }

  // Detik berjalan selama main (berhenti pas hasil keluar).
  useEffect(() => {
    if (!theme || finished || startTime === null) return
    const t = window.setInterval(() => setElapsedMs(Date.now() - startTime), 500)
    return () => window.clearInterval(t)
  }, [theme, finished, startTime])

  const accent = theme?.accent ?? "#06AED5"
  const total = questions.length
  const question = questions[qIndex]
  const badge = theme && finished ? badgeInfo(score, total, elapsedMs) : null

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
      aria-label="Quiz AI"
    >
      <motion.div
        className="relative bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full my-8"
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
          <Close className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {!theme ? (
            <motion.div
              key="themes"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#222E50]/50">QUIZ AI</p>
              <h3 className="mt-1 text-2xl font-black text-[#222E50] tracking-tight">Pilih Mode</h3>
              <p className="mt-1.5 text-sm text-[#222E50]/70">Tiap mode ada 10 soal acak. Kumpulin semua badge achievement-nya!</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizThemes.map((t) => (
                  <motion.button
                    key={t.id}
                    onClick={() => pickTheme(t)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="text-left rounded-2xl p-4 border-2 border-[#222E50]/10 hover:border-transparent transition-colors cursor-pointer"
                    style={{ backgroundColor: `${t.accent}14` }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      <span
                        className="inline-flex text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: t.accent }}
                      >
                        {t.mode}
                      </span>
                      <span
                        className="inline-flex text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                        style={{ borderColor: `${t.accent}66`, color: t.accent }}
                      >
                        {t.questionCount} Soal Acak
                      </span>
                    </div>
                    <p className="mt-2 font-black text-[#222E50] text-lg leading-tight">{t.title}</p>
                    <p className="mt-1 text-xs text-[#222E50]/65 leading-relaxed">{t.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : finished && badge ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="text-center py-4"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#222E50]/50">
                HASIL QUIZ
              </p>
              <p className="mt-1.5 font-mono text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
                {theme.title} · MODE {theme.mode}
              </p>
              <div className="mt-4 flex justify-center">
                <motion.span
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                  className="relative inline-flex overflow-hidden rounded-full cursor-pointer"
                  style={{
                    backgroundColor: badge.base,
                    boxShadow: "inset 0 2px 3px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(0,0,0,0.18)",
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
                    whileTap={{ scale: 0.9, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative inline-flex overflow-hidden text-xs font-black tracking-[0.15em] uppercase px-5 py-2 rounded-full"
                    style={{
                      color: badge.text,
                      textShadow: "0 1px 1px rgba(255,255,255,0.5)",
                    }}
                  >
                  {badge.shine && !reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-[-20%] left-0 w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                    animate={{ x: ["-160%", "480%"], y: ["30%", "-30%"] }}
                    transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.4, ease: "easeInOut" }}
                  />
                  )}
                    <span className="relative z-10">{badge.title}</span>
                  </motion.span>
                </motion.span>
              </div>
              <p className="mt-4 text-6xl font-black tracking-tight" style={{ color: accent }}>
                {score}/{total}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#222E50]/55">
                Waktu pengerjaan {formatTime(elapsedMs)}
              </p>
              <p className="mt-3 text-sm text-[#222E50]/75">{badge.comment}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => pickTheme(theme)}
                  className="px-5 py-2.5 rounded-full font-bold text-xs text-white"
                  style={{ backgroundColor: accent }}
                >
                  Coba Lagi
                </button>
                <button
                  onClick={backToThemes}
                  className="px-5 py-2.5 rounded-full font-bold text-xs border border-[#222E50]/20 text-[#222E50]/80 hover:bg-[#222E50]/5 transition-colors"
                >
                  Ganti Mode
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full font-bold text-xs border border-[#222E50]/20 text-[#222E50]/80 hover:bg-[#222E50]/5 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          ) : (
            question && (
              <motion.div
                key={`${theme.id}-${qIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between gap-3 pr-10">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#222E50]/50">
                    {theme.mode} · Soal {qIndex + 1}/{total}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase shrink-0" style={{ color: accent }}>
                    Skor {score} · {formatTime(elapsedMs)}
                  </p>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#222E50]/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((qIndex + 1) / total) * 100}%`, backgroundColor: accent }}
                  />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#222E50] tracking-tight leading-snug">
                  {question.question}
                </h3>
                <div className="mt-4 space-y-2.5">
                  {question.choices.map((choice, i) => {
                    const isAnswer = i === question.answer
                    const isPicked = picked === i
                    const revealed = picked !== null
                    return (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        disabled={revealed}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-2xl border-2 text-sm font-bold transition-colors ${
                          revealed && isAnswer
                            ? "border-green-500 bg-green-500/10 text-[#222E50]"
                            : revealed && isPicked
                              ? "border-red-400 bg-red-400/10 text-[#222E50]"
                              : "border-[#222E50]/10 text-[#222E50]/85 hover:border-[#222E50]/30 hover:bg-[#222E50]/5"
                        } ${revealed ? "cursor-default" : ""}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                            revealed && isAnswer
                              ? "bg-green-500 text-white"
                              : revealed && isPicked
                                ? "bg-red-400 text-white"
                                : "bg-[#222E50]/10 text-[#222E50]/70"
                          }`}
                        >
                          {revealed && isAnswer ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : revealed && isPicked ? (
                            <WrongIcon className="w-4 h-4" />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        {choice}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3 min-h-[44px]">
                  {picked !== null && (
                    <motion.p
                      key={`exp-${qIndex}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs text-[#222E50]/70 leading-relaxed border-l-2 pl-2.5"
                      style={{ borderColor: accent }}
                    >
                      {question.explanation}
                    </motion.p>
                  )}
                </div>
                <motion.button
                  onClick={next}
                  disabled={picked === null}
                  className={`mt-3 w-full py-3 rounded-2xl font-black text-sm transition-colors ${
                    picked === null
                      ? "bg-[#222E50]/10 text-[#222E50]/40 cursor-not-allowed"
                      : "text-white"
                  }`}
                  style={picked === null ? undefined : { backgroundColor: accent }}
                  whileHover={picked === null ? undefined : { scale: 1.02 }}
                  whileTap={picked === null ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {qIndex + 1 >= total ? "Lihat Hasil" : "Lanjut →"}
                </motion.button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

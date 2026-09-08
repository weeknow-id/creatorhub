import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, JetBrains_Mono } from "next/font/google"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
})

export const metadata: Metadata = {
  title: "WeeKnow Creator Hub",
  description:
    "Kumpulan resources AI, workflow, dan prompt gratis yang bisa kalian pake. Tinggal copas dan pake aja.",
  keywords: ["WeeKnow", "AI prompts", "ComfyUI workflow", "AI resources", "creator hub", "generative AI"],
  authors: [{ name: "WeeKnow" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "WeeKnow Creator Hub",
    description:
      "Kumpulan resources AI, workflow, dan prompt gratis yang bisa kalian pake. Tinggal copas dan pake aja.",
    type: "website",
    locale: "id_ID",
    siteName: "WeeKnow",
  },
  twitter: {
    card: "summary",
    title: "WeeKnow Creator Hub",
    description:
      "Kumpulan resources AI, workflow, dan prompt gratis yang bisa kalian pake. Tinggal copas dan pake aja.",
  },
}

export const viewport: Viewport = {
  themeColor: "#222E50",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body className={`font-sans font-medium antialiased`}>
        <div aria-hidden="true" className="paper-fixed" />
        <ClickSpark
          sparkColor="#FA8333"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
      </body>
    </html>
  )
}

// Data Featured Videos (2-3 video, pola thumbnail + link ke YouTube, TANPA embed).
// Cara edit manual: ubah/ganti array `videos` di bawah.
// Thumbnail wajib diawali `/creatorhub` (aturan GitHub Pages di README).

export interface FeaturedVideo {
  accent: string
  title: string
  videoId: string
  url: string
  thumbnail: string
  duration: string
  uploadedAt: string
  views: string
}

export const videos: FeaturedVideo[] = [
  {
    accent: "#06AED5",
    title: "Tier List AI Voice Changer 2026",
    videoId: "_N3nsfOnTVA",
    url: "https://www.youtube.com/watch?v=_N3nsfOnTVA",
    thumbnail: "/creatorhub/images/video-tier-list.webp",
    duration: "7:22",
    uploadedAt: "31 Mar 2026",
    views: "300k+",
  },
  {
    accent: "#06AED5",
    title: "Cara Sambungin Voice Changer dari PC ke Android",
    videoId: "2reJB9VSMx8",
    url: "https://www.youtube.com/watch?v=2reJB9VSMx8",
    thumbnail: "/creatorhub/images/video-voice-changer.webp",
    duration: "8:02",
    uploadedAt: "24 Agu 2026",
    views: "200k+",
  },
]

// Validasi anti-rusak untuk file data (lib/*.ts).
// Jalan via: npm run check
// Cek: ID duplikat, URL aneh (spasi/skema salah), path aset internal yang
// tidak diawali /creatorhub atau filenya tidak ada di public/.
// Sengaja baca file sebagai teks (regex) biar tanpa dependency tambahan.

import { readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const libDir = join(root, "lib")
const publicDir = join(root, "public")

const dataFiles = [
  "lib/vault-data.ts",
  "lib/prompt-asisten-data.ts",
  "lib/faq-data.ts",
  "lib/tutorial-data.ts",
  "lib/video-data.ts",
  "lib/glossary-data.ts",
  "lib/quiz-data.ts",
  "lib/site.ts",
]

let errors = []
const seenIds = new Map() // id -> file pertama yang mendefinisikan

function fail(msg) {
  errors.push(msg)
}

for (const rel of dataFiles) {
  const abs = join(root, rel)
  if (!existsSync(abs)) {
    fail(`${rel}: file tidak ditemukan`)
    continue
  }
  const text = readFileSync(abs, "utf8")

  // 1. Kumpulkan id: "..." / videoId: "..." — harus unik lintas file data.
  const idMatches = [...text.matchAll(/(?:\b|video)id:\s*["']([^"']+)["']/g)]
  const localSeen = new Set()
  for (const m of idMatches) {
    const id = m[1]
    if (localSeen.has(id)) {
      fail(`${rel}: id duplikat dalam file yang sama: "${id}"`)
    }
    localSeen.add(id)
    if (seenIds.has(id)) {
      fail(`${rel}: id "${id}" sudah dipakai di ${seenIds.get(id)}`)
    } else {
      seenIds.set(id, rel)
    }
  }

  // 2. URL http(s): tidak boleh ada spasi, harus diawali http:// atau https://.
  const urlMatches = [...text.matchAll(/["'](https?:[^"']*)["']/g)]
  for (const m of urlMatches) {
    const url = m[1]
    if (/\s/.test(url)) {
      fail(`${rel}: URL mengandung spasi: "${url}"`)
    }
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url)) {
      fail(`${rel}: URL format mencurigakan: "${url}"`)
    }
  }

  // 3. Path aset internal (logo/thumbnail): wajib /creatorhub/... dan filenya ada.
  const assetMatches = [...text.matchAll(/(?:logo|thumbnail):\s*["']([^"']+)["']/g)]
  for (const m of assetMatches) {
    const p = m[1]
    if (!p.startsWith("/creatorhub/")) {
      fail(`${rel}: path aset harus diawali /creatorhub (aturan GitHub Pages): "${p}"`)
      continue
    }
    const fsPath = join(publicDir, p.replace("/creatorhub/", ""))
    if (!existsSync(fsPath)) {
      fail(`${rel}: file aset tidak ada di public/: "${p}"`)
    }
  }
}

// 5. Quiz: tiap soal harus punya blok choices dan answer 0-3.
{
  const rel = "lib/quiz-data.ts"
  const text = readFileSync(join(root, rel), "utf8")
  // (Pola disengaja: hitung field `question:` ber-indentasi.
  //  Baris interface (2 spasi) tidak kehitung.)
  const choiceBlocks = [...text.matchAll(/^ {4,}question:/gm)].length
  const answers = [...text.matchAll(/answer:\s*(\d+)/g)].map((m) => Number(m[1]))
  if (answers.length !== choiceBlocks) {
    fail(`${rel}: jumlah answer (${answers.length}) != jumlah soal (${choiceBlocks})`)
  }
  answers.forEach((a, i) => {
    if (!(a >= 0 && a <= 3)) fail(`${rel}: answer soal #${i + 1} di luar 0-3: ${a}`)
  })
  // (Ukuran pool vs questionCount per tema dicek di uji empiris, bukan regex.)
}

// 6. Glosarium: group tiap istilah harus terdaftar di glossaryGroups.
{
  const rel = "lib/glossary-data.ts"
  const text = readFileSync(join(root, rel), "utf8")
  const defined = new Set([...text.matchAll(/\{ id: "([a-z]+)", title:/g)].map((m) => m[1]))
  const used = [...text.matchAll(/group:\s*"([^"]+)"/g)].map((m) => m[1])
  used.forEach((g) => {
    if (!defined.has(g)) fail(`${rel}: group "${g}" tidak terdaftar di glossaryGroups`)
  })
}

// 7. File yang tidak dipakai di V4 (keputusan desain, jangan dibuat).
const banned = ["lib/changelog.ts", "lib/quiz.ts", "lib/bookmark.ts"]
for (const rel of banned) {
  if (existsSync(join(root, rel))) {
    fail(`${rel}: file ini tidak dipakai di V4, hapus saja`)
  }
}

if (errors.length > 0) {
  console.error(`check-data GAGAL (${errors.length} masalah):`)
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}

console.log(`check-data OK: ${seenIds.size} id unik, ${dataFiles.length} file diperiksa.`)

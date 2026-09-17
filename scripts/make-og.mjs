// Sekali jalan: generate public/og-image.png (1200x630) untuk share preview.
// Hapus file ini setelah dipakai? TIDAK — simpan biar bisa regenerate.
import sharp from "sharp"

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#222E50"/>
<circle cx="1050" cy="90" r="220" fill="#06AED5" opacity="0.15"/>
<circle cx="120" cy="560" r="180" fill="#FA8333" opacity="0.15"/>
<text x="80" y="270" font-family="Arial,Helvetica,sans-serif" font-size="110" font-weight="900" fill="#FFFFFF" letter-spacing="-2">WEEKNOW</text>
<text x="80" y="390" font-family="Arial,Helvetica,sans-serif" font-size="110" font-weight="900" fill="#06AED5" letter-spacing="-2">CREATOR HUB</text>
<text x="80" y="470" font-family="Arial,Helvetica,sans-serif" font-size="34" fill="#FFFFFF" opacity="0.75">Prompt gratis - Tools AI - Workflow - Tutorial</text>
<rect x="80" y="510" width="260" height="56" rx="28" fill="#FA8333"/>
<text x="210" y="547" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF" text-anchor="middle">100% Gratis</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png")
console.log("OG-OK")

// Each rendered PDF page has two cases stacked top/bottom (except page 5).
// This script slices the rendered page-N.png files into the named case-study
// images the UI expects.
//
// Mapping (top-half → case-id, bottom-half → case-id):
//   page-1: fashion-ecommerce-sales / family-entertainment
//   page-2: apparel-digital-presence / real-estate-leads
//   page-3: (top)= real-estate-leads results — keep page-3 top for real-estate banner   |
//           (bottom) interior-design-authority
//   page-4: fitness-wellness-growth / interior-design-leads (start)
//   page-5: interior-design-leads (continuation, single small page) — used as-is
//
// Cropping: the PDF lays each case as a roughly half-page block, so a 50/50
// horizontal split works for pages 1, 2, 4. Page 3 and page 5 are special.

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/case-studies')

async function crop(srcName, destName, region) {
  const src = path.join(DIR, srcName)
  const dest = path.join(DIR, destName)
  const meta = await sharp(src).metadata()
  const { width, height } = meta
  const top = Math.round(region.topPct * height)
  const left = Math.round(region.leftPct * width)
  const w = Math.round(region.widthPct * width)
  const h = Math.round(region.heightPct * height)
  await sharp(src).extract({ left, top, width: w, height: h }).png({ quality: 90 }).toFile(dest)
  console.log(`  ${srcName} [${left},${top} ${w}x${h}] → ${destName}`)
}

async function copy(srcName, destName) {
  await fs.copyFile(path.join(DIR, srcName), path.join(DIR, destName))
  console.log(`  ${srcName} → ${destName}`)
}

async function main() {
  // Top half / bottom half for the 2-up pages
  const topHalf = { topPct: 0.0, leftPct: 0.0, widthPct: 1.0, heightPct: 0.5 }
  const bottomHalf = { topPct: 0.5, leftPct: 0.0, widthPct: 1.0, heightPct: 0.5 }

  console.log('Cropping pages …')

  // Page 1: Fashion (top) + Family Entertainment (bottom)
  await crop('page-1.png', 'fashion-ecommerce-sales.png', topHalf)
  await crop('page-1.png', 'family-entertainment.png', bottomHalf)

  // Page 2: Apparel (top) + Real Estate (bottom)
  await crop('page-2.png', 'apparel-digital-presence.png', topHalf)
  await crop('page-2.png', 'real-estate-leads.png', bottomHalf)

  // Page 3: (top) is real-estate continuation — we already have RE banner from page 2.
  //         (bottom) is Interior Design Authority opener.
  await crop('page-3.png', 'interior-design-authority.png', bottomHalf)

  // Page 4: Fitness (top) + Interior Design Leads (bottom)
  await crop('page-4.png', 'fitness-wellness-growth.png', topHalf)
  await crop('page-4.png', 'interior-design-leads.png', topHalf) // fitness gets top, ID-leads opener is on bottom but visuals continue page 5

  // Page 4 actually: Fitness top, ID-Leads bottom — overwrite ID-leads with bottom half
  await crop('page-4.png', 'interior-design-leads.png', bottomHalf)

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

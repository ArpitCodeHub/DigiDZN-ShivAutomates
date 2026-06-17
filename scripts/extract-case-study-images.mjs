// Render each page of the case-studies PDF to a PNG.
// Pages are mapped to the corresponding case-study id used in the UI.
//
// Usage: node scripts/extract-case-study-images.mjs
//
// First we render every page as page-N.png so we can verify the order,
// then a second pass copies them to the named ids the UI expects.

import { pdf } from 'pdf-to-img'
import fs from 'node:fs/promises'
import path from 'node:path'

const PDF_PATH = path.resolve('public/case-studies/source-full.pdf')
const OUT_DIR = path.resolve('public/case-studies')

// Order of case studies in the PDF (best guess from the doc — adjust after
// inspecting the page-N.png outputs if the real order differs).
const PAGE_TO_ID = {
  // page index (1-based) -> case-study id used in the UI
  1: 'fashion-ecommerce-sales',
  2: 'family-entertainment',
  3: 'apparel-digital-presence',
  4: 'real-estate-leads',
  5: 'interior-design-authority',
  6: 'fitness-wellness-growth',
  7: 'interior-design-leads',
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  console.log('Rendering pages from', PDF_PATH)
  const document = await pdf(PDF_PATH, { scale: 2 })
  console.log('Pages:', document.length)

  let i = 0
  for await (const image of document) {
    i += 1
    const pagePath = path.join(OUT_DIR, `page-${i}.png`)
    await fs.writeFile(pagePath, image)
    console.log('  wrote', pagePath)

    const id = PAGE_TO_ID[i]
    if (id) {
      const idPath = path.join(OUT_DIR, `${id}.png`)
      await fs.writeFile(idPath, image)
      console.log('  → also', idPath)
    }
  }

  console.log('Done. Inspect page-*.png if any case maps to the wrong page.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

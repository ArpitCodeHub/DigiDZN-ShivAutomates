// Extract text per page so we can map each PDF page to the right case-study id.
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const PDF_PATH = path.resolve('public/case-studies/source-full.pdf')

async function main() {
  const data = new Uint8Array(await fs.readFile(PDF_PATH))
  const doc = await getDocument({ data, useSystemFonts: true }).promise
  console.log('Pages:', doc.numPages)
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i)
    const text = await page.getTextContent()
    const str = text.items.map((it) => ('str' in it ? it.str : '')).join(' ')
    console.log(`\n=== PAGE ${i} ===`)
    console.log(str.replace(/\s+/g, ' ').slice(0, 800))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

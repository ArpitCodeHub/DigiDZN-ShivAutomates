/**
 * For blogs whose thumbnails couldn't be fetched from the DigiDZN API
 * (blog_image is null in the CMS), this script downloads a topically
 * relevant placeholder image from Unsplash and updates the manifest.
 *
 * Usage: node scripts/fill-missing-thumbnails.mjs
 */
import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUT_DIR = join(__dirname, '..', 'public', 'blog-thumbnails')
const MANIFEST_PATH = join(OUT_DIR, 'manifest.json')

// Curated Unsplash photo IDs chosen for topical relevance to each blog post.
// Format: <unsplash-photo-id>
const fallbacks = {
  'the-shocking-truth-about-social-media-algorithms-in-2025':
    'photo-1611162617213-7d7a39e9b1d7', // phone with social apps
  'top-10-high-converting-facebook-ad-formats-you-re-not-using-yet':
    'photo-1611605698335-8b1569810432', // social ads
  'why-your-website-load-speed-is-killing-your-seo-and-how-to-fix-it-fast':
    'photo-1460925895917-afdab827c52f', // analytics dashboard / speed
  'the-future-of-marketing-is-ai-taking-over-human-creativity':
    'photo-1677442136019-21780ecad995', // AI / abstract tech
  'retargeting-ads-101-why-customers-keep-seeing-your-ads-and-how-to-use-it-smartly':
    'photo-1551288049-bebda4e38f71', // chart targeting
  'seo-for-voice-search-how-to-get-found-on-alexa-and-google-assistant':
    'photo-1543512214-318c7553f230', // smart speaker / voice
  'how-to-use-google-analytics-4-to-skyrocket-your-campaign-roi':
    'photo-1551288049-bebda4e38f71', // analytics chart
  'how-micro-influencers-are-winning-the-marketing-game-in-2025':
    'photo-1554080353-a576cf803bda', // content creator
  '7-reasons-why-your-digital-marketing-strategy-isn-t-working-and-how-to-fix-it':
    'photo-1454165804606-c3d57bc86b40', // strategy planning
  'stop-wasting-ad-budget-the-best-low-cost-digital-campaigns-that-convert':
    'photo-1554224155-6726b3ff858f', // budget / money
  'how-social-media-ads-helped-trutrtl-boost-sales-brand-awareness':
    'photo-1556761175-5973dc0f32e7', // social campaigns
  'how-google-ads-helped-trutrtl-boost-sales-visibility':
    'photo-1573164574572-cb89e39749b4', // google search / ads
  'how-technical-seo-helped-trutrtl-rank-higher-on-google-serp':
    'photo-1432888622747-4eb9a8efeb07', // code / technical
  'how-digidzn-helped-trutrtl-rank-higher-on-google-and-drive-traffic':
    'photo-1460925895917-afdab827c52f', // traffic / analytics
}

const buildUrl = (id) =>
  `https://images.unsplash.com/${id}?w=1200&q=85&auto=format&fit=crop`

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error('manifest.json not found. Run fetch-blog-thumbnails.mjs first.')
    process.exit(1)
  }
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'))
  const before = Object.keys(manifest).length

  let added = 0
  let skipped = 0
  let failed = 0

  for (const [slug, photoId] of Object.entries(fallbacks)) {
    if (manifest[slug]) {
      console.log(`[skip] ${slug} — already has thumbnail`)
      skipped++
      continue
    }
    try {
      const res = await fetch(buildUrl(photoId), {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(20000),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      const filename = `${slug}.jpg`
      await writeFile(join(OUT_DIR, filename), buf)
      manifest[slug] = filename
      console.log(`[ ok ] ${slug} ← ${photoId} (${(buf.length / 1024).toFixed(1)} KB)`)
      added++
    } catch (err) {
      console.log(`[fail] ${slug} — ${err.message}`)
      failed++
    }
  }

  // Re-sort keys so the manifest stays tidy
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
  await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2), 'utf8')

  console.log(`\nManifest: ${before} → ${Object.keys(manifest).length} entries`)
  console.log(`Added: ${added}, Skipped: ${skipped}, Failed: ${failed}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

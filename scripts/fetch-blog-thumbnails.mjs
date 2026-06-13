/**
 * Fetches every blog post via the digiDZN admin API, downloads each post's
 * actual featured image, and saves to public/blog-thumbnails/{slug}.{ext}.
 *
 * API:
 *   POST https://digidzn.com/digidzn-admin/web/api/blogs/blog-view
 *   body: { auth_token: md5("BL0GDzn*&^!@2022" + slug), seo_url: slug }
 *
 * Also writes public/blog-thumbnails/manifest.json mapping slug → filename.
 *
 * Usage: node scripts/fetch-blog-thumbnails.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUT_DIR = join(__dirname, '..', 'public', 'blog-thumbnails')

const API_BASE = 'https://digidzn.com/digidzn-admin/web/api/'
const IMAGE_BASE = 'https://digidzn.com/digidzn-admin/web/images/blogs/'
const AUTH_KEY = 'BL0GDzn*&^!@2022'

const md5 = (s) => createHash('md5').update(s).digest('hex').toLowerCase()

const blogUrls = [
  'https://digidzn.com/blog-view/best-digital-marketing-agency-in-delhi-complete-guide',
  'https://digidzn.com/blog-view/exploring-digital-marketing-services-for-small-business-paid-ads-performance-marketing-and-more',
  'https://digidzn.com/blog-view/beginner-s-guide-to-email-marketing-automation-for-small-businesses',
  'https://digidzn.com/blog-view/boost-your-business-with-these-local-seo-tactics-for-2025',
  'https://digidzn.com/blog-view/the-shocking-truth-about-social-media-algorithms-in-2025',
  'https://digidzn.com/blog-view/why-your-website-load-speed-is-killing-your-seo-and-how-to-fix-it-fast',
  'https://digidzn.com/blog-view/top-10-high-converting-facebook-ad-formats-you-re-not-using-yet',
  'https://digidzn.com/blog-view/5-minute-growth-hacks-every-startup-should-know-in-2025',
  'https://digidzn.com/blog-view/7-digital-marketing-mistakes-you-re-still-making-in-2025-and-how-to-fix-them',
  'https://digidzn.com/blog-view/the-future-of-marketing-is-ai-taking-over-human-creativity',
  'https://digidzn.com/blog-view/retargeting-ads-101-why-customers-keep-seeing-your-ads-and-how-to-use-it-smartly',
  'https://digidzn.com/blog-view/seo-for-voice-search-how-to-get-found-on-alexa-and-google-assistant',
  'https://digidzn.com/blog-view/how-to-use-google-analytics-4-to-skyrocket-your-campaign-roi',
  'https://digidzn.com/blog-view/how-micro-influencers-are-winning-the-marketing-game-in-2025',
  'https://digidzn.com/blog-view/stop-wasting-ad-budget-the-best-low-cost-digital-campaigns-that-convert',
  'https://digidzn.com/blog-view/7-reasons-why-your-digital-marketing-strategy-isn-t-working-and-how-to-fix-it',
  'https://digidzn.com/blog-view/the-power-of-website-development-in-driving-appliance-sales',
  'https://digidzn.com/blog-view/ppc-marketing-for-kitchen-appliances-is-it-worth-the-investment',
  'https://digidzn.com/blog-view/google-ads-vs-social-media-ads-what-works-best-for-home-appliance-brands',
  'https://digidzn.com/blog-view/how-social-media-ads-helped-trutrtl-boost-sales-brand-awareness',
  'https://digidzn.com/blog-view/how-google-ads-helped-trutrtl-boost-sales-visibility',
  'https://digidzn.com/blog-view/how-technical-seo-helped-trutrtl-rank-higher-on-google-serp',
  'https://digidzn.com/blog-view/how-digidzn-helped-trutrtl-rank-higher-on-google-and-drive-traffic',
  'https://digidzn.com/blog-view/10-reasons-why-no-one-is-watching-your-video-content',
  'https://digidzn.com/blog-view/how-b2c-companies-leverage-ai-marketing-examples-tips',
  'https://digidzn.com/blog-view/11-best-ai-video-generators-to-use-in-2025',
  'https://digidzn.com/blog-view/seo-for-startups-how-startups-can-unlock-growth-with-seo',
  'https://digidzn.com/blog-view/navigating-the-future-of-seo-5-tips-from-digidzn',
  'https://digidzn.com/blog-view/ai-predictions-that-could-impact-marketers-in-2025-trending-data-expert-insights',
  'https://digidzn.com/blog-view/guide-to-creating-optimizing-high-converting-landing-pages',
  'https://digidzn.com/blog-view/improve-mobile-app-reviews-ratings',
  'https://digidzn.com/blog-view/revolutionizing-retail-media-amazon-s-game-changing-ad-service',
  'https://digidzn.com/blog-view/how-marketers-are-spending-their-money-in-2025',
  'https://digidzn.com/blog-view/maximizing-social-media-marketing-to-promote-kitchen-appliances',
  'https://digidzn.com/blog-view/the-power-of-ppc-campaigns-for-boosting-sales-of-home-appliances-in-india',
  'https://digidzn.com/blog-view/how-digital-campaigns-can-boil-success-for-home-appliance-brands',
  'https://digidzn.com/blog-view/why-digital-marketing-is-the-perfect-ingredient-for-home-appliance-brands',
  'https://digidzn.com/blog-view/how-seo-can-boost-e-commerce-sales-for-kitchen-appliances-brands',
  'https://digidzn.com/blog-view/how-digital-marketing-is-changing-the-home-appliance-industry',
  'https://digidzn.com/blog-view/personality-content-strategies-for-creating-ai-proof-content',
  'https://digidzn.com/blog-view/15-real-estate-social-media-marketing-strategies-that-ll-bring-in-new-business',
  'https://digidzn.com/blog-view/understanding-keyword-match-types-for-effective-google-ads-campaigns',
  'https://digidzn.com/blog-view/what-is-search-intent',
  'https://digidzn.com/blog-view/a-complete-guide-to-outbound-marketing',
  'https://digidzn.com/blog-view/image-seo-tips-for-image-optimization',
  'https://digidzn.com/blog-view/creating-a-multichannel-marketing-strategy',
  'https://digidzn.com/blog-view/maximizing-ppc-success-for-small-businesses',
  'https://digidzn.com/blog-view/crafting-a-local-content-marketing-strategy',
  'https://digidzn.com/blog-view/wordpress-seo-guide-boost-your-site-s-visibility',
  'https://digidzn.com/blog-view/how-marketers-are-spending-their-money-in-2025-we-asked-11-093-marketers',
  'https://digidzn.com/blog-view/the-story-curve-transform-your-marketing-with-the-power-of-storytelling',
  'https://digidzn.com/blog-view/how-to-start-using-video-in-your-marketing',
  'https://digidzn.com/blog-view/ai-conversion-rate-optimization-what-are-the-benefits-how-to-use-it-in-your-business',
  'https://digidzn.com/blog-view/getting-b2b-ecommerce-right-strategies-for-success',
  'https://digidzn.com/blog-view/maximizing-cost-per-acquisition-cpa-here-s-what-we-have-to-say',
  'https://digidzn.com/blog-view/what-is-d2c-marketing-here-are-11-tips-we-found-for-doing-it-right',
  'https://digidzn.com/blog-view/why-an-event-marketing-budget-is-crucial',
  'https://digidzn.com/blog-view/6-of-the-best-video-formats-for-2025',
  'https://digidzn.com/blog-view/we-used-ai-to-create-a-marketing-plan-2-ways-here-s-how-you-can-too',
  'https://digidzn.com/blog-view/9-best-ai-marketing-bots-to-use-at-work-in-2024',
  'https://digidzn.com/blog-view/how-to-generate-video-scripts-with-ai',
  'https://digidzn.com/blog-view/how-often-to-post-on-social-media-for-business',
  'https://digidzn.com/blog-view/how-to-create-a-complete-marketing-strategy-in-2025',
  'https://digidzn.com/blog-view/5-marketing-strategies-polymarket-is-using-to-be-everywhere-at-once',
  'https://digidzn.com/blog-view/what-is-rebranding-best-examples-strategies-to-consider-for-2025',
  'https://digidzn.com/blog-view/does-instagram-shopping-drive-roi-new-data-on-how-to-get-approved-add-product-tags-actually-make-sales',
  'https://digidzn.com/blog-view/level-up-your-content-marketing-funnel-here-s-how-digidzn-makes-the-right-content-for-each-stage',
  'https://digidzn.com/blog-view/5-ways-that-ai-analytics-tools-can-make-you-a-better-marketer',
  'https://digidzn.com/blog-view/21-creative-lead-generation-ideas-to-try-why-marketers-recommend-them',
  'https://digidzn.com/blog-view/the-ultimate-guide-to-advertising-in-2025',
  'https://digidzn.com/blog-view/google-my-business-guide-complete-overview-expert-tips-for-2025',
  'https://digidzn.com/blog-view/top-6-video-marketing-metrics',
  'https://digidzn.com/blog-view/how-pillar-pages-will-help-your-search-engine-rankings',
  'https://digidzn.com/blog-view/nostalgia-marketing-how-it-works',
  'https://digidzn.com/blog-view/get-even-more-keyword-ideas-and-data-from-ubersuggest-and-answer-the-public',
  'https://digidzn.com/blog-view/develop-your-brand-s-tone-of-voice',
  'https://digidzn.com/blog-view/what-are-brand-identity-elements',
  'https://digidzn.com/blog-view/my-comprehensive-guide-to-micro-influencer-marketing',
  'https://digidzn.com/blog-view/data-driven-insights-into-email-marketing-open-rates',
  'https://digidzn.com/blog-view/b2b-influencer-marketing-partnering-with-industry-leaders',
  'https://digidzn.com/blog-view/the-keys-to-success-with-amazon-advertising',
  'https://digidzn.com/blog-view/you-re-wasting-your-time-creating-social-media-content',
  'https://digidzn.com/blog-view/url-slugs-why-they-matter-for-seo',
  'https://digidzn.com/blog-view/understanding-ad-impressions',
  'https://digidzn.com/blog-view/decoding-podcast-success-top-analytics-tools-for-podcasters',
  'https://digidzn.com/blog-view/how-to-do-keyword-research-for-youtube-for-results',
  'https://digidzn.com/blog-view/search-engine-positioning-what-is-it-how-to-improve-it',
  'https://digidzn.com/blog-view/ai-conversion-rate-optimization-how-ai-is-transforming-cro-strategies',
]

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

function extOf(url, contentType) {
  const fromUrl = extname(new URL(url).pathname).toLowerCase().replace('.', '')
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(fromUrl)) return fromUrl
  if (contentType?.includes('jpeg') || contentType?.includes('jpg')) return 'jpg'
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('gif')) return 'gif'
  return 'jpg'
}

async function fetchBlogData(slug) {
  const auth_token = md5(AUTH_KEY + slug)
  const res = await fetch(API_BASE + 'blogs/blog-view', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': UA,
      Origin: 'https://digidzn.com',
      Referer: 'https://digidzn.com/blog-view/' + slug,
    },
    body: JSON.stringify({ auth_token, seo_url: slug }),
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.message || 'API said not success')
  const data = json.parameters?.data?.[0]
  if (!data) throw new Error('No data returned')
  return data
}

async function downloadImage(imgUrl, blogUrl) {
  const res = await fetch(imgUrl, {
    headers: { 'User-Agent': UA, Referer: blogUrl },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`Image ${res.status}`)
  const ct = res.headers.get('content-type') ?? ''
  const ext = extOf(imgUrl, ct)
  const buf = Buffer.from(await res.arrayBuffer())
  return { buf, ext }
}

async function processOne(blogUrl, idx) {
  const slug = new URL(blogUrl).pathname.split('/').pop()
  const tag = `[${String(idx + 1).padStart(2, '0')}/${blogUrls.length}] ${slug.slice(0, 55)}`

  try {
    const data = await fetchBlogData(slug)
    // The API returns:
    //   blog_image: filename relative to /digidzn-admin/web/images/blogs/ (most reliable)
    //   blog_image_url: sometimes a full URL, often broken/empty
    // Try blog_image first (worked in earlier test runs), then fallbacks.
    const candidates = [
      data.blog_image,
      data.blog_image_url,
      data.featured_image,
      data.image,
      data.main_image,
      data.thumbnail,
      data.master_image_url,
    ].filter(v => v && typeof v === 'string' && v.trim() !== '')

    if (candidates.length === 0) {
      console.log(`${tag} ⚠ no image (blog_image=${JSON.stringify(data.blog_image)} blog_image_url=${JSON.stringify(data.blog_image_url)})`)
      return { slug, file: null }
    }

    // Try each candidate until one downloads successfully
    let lastErr = null
    for (const imgField of candidates) {
      const imgUrl = imgField.startsWith('http') ? imgField : IMAGE_BASE + imgField
      try {
        const { buf, ext } = await downloadImage(imgUrl, blogUrl)
        const filename = `${slug}.${ext}`
        await writeFile(join(OUT_DIR, filename), buf)
        console.log(`${tag} ✓ ${filename} (${(buf.length / 1024).toFixed(1)} KB)`)
        return { slug, file: filename }
      } catch (e) {
        lastErr = e
      }
    }
    throw lastErr ?? new Error('all candidates failed')
  } catch (err) {
    console.log(`${tag} ✗ ${err.message}`)
    return { slug, file: null }
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true })

  console.log(`Fetching ${blogUrls.length} blog thumbnails into ${OUT_DIR}\n`)
  const manifest = {}

  // Sequential first one to inspect schema, then batches of 4
  const first = await processOne(blogUrls[0], 0)
  if (first.file) manifest[first.slug] = first.file

  const BATCH = 4
  for (let i = 1; i < blogUrls.length; i += BATCH) {
    const slice = blogUrls.slice(i, i + BATCH)
    const results = await Promise.all(slice.map((u, j) => processOne(u, i + j)))
    for (const r of results) {
      if (r.file) manifest[r.slug] = r.file
    }
    if (i + BATCH < blogUrls.length) await new Promise(r => setTimeout(r, 250))
  }

  await writeFile(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
  console.log(`\nDone. ${Object.keys(manifest).length}/${blogUrls.length} thumbnails saved.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

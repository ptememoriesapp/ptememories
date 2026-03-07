// src/app/robots.js
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${process.env.NEXT_SITE_URL}/sitemap.xml`,
  }
}

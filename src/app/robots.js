// src/app/robots.js
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ptememories.com'
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

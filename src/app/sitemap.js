// src/app/sitemap.js
export default function sitemap() {
  const baseUrl = process.env.NEXT_SITE_URL

  return [
    { url: baseUrl,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/memories`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${baseUrl}/how-it-works`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}

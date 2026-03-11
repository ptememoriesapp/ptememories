// src/lib/siteUrl.js
// Single source of truth for the site URL
// Server: reads from env var. Client: reads from env var with window.location fallback.

export function getSiteUrl() {
  if (typeof window !== 'undefined') {
    // Client side — use env var if set, else current origin (works on any domain)
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  // Server side
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://ptememories.com'
}

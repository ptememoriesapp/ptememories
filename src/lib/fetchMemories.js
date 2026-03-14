// src/lib/fetchMemories.js
// Fetches approved memories from Google Sheets and merges with sample data.
// Sheets memories appear first (real, recent), samples appear after.
// Falls back gracefully to samples-only if fetch fails.

import { MEMORIES as SAMPLE_MEMORIES } from './memories'

// Cache in-memory for 5 minutes to avoid hammering the Sheets API
// (Google Apps Script has a 100 req/min rate limit)
let cache = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Transform a raw row from Google Sheets into the same shape as memories.js
 * Sheets columns: id, name, date, location, centre, score, avatarGradient,
 *                 frequency, frequencyRange, priority, sections (JSON), submittedAt
 */
function transformSheetRow(row) {
  try {
    // Parse sections JSON from the sheet
    let sections = []
    if (row.sections) {
      sections = typeof row.sections === 'string'
        ? JSON.parse(row.sections)
        : row.sections
    }

    return {
      id: row.id || `sheet-${Date.now()}-${Math.random()}`,
      name: row.name || 'Anonymous',
      date: row.date || '',
      location: row.location || row.city || '',
      centre: row.centre || null,
      score: row.score ? parseInt(row.score) : null,
      avatarGradient: row.avatarGradient || 'linear-gradient(135deg,#4F46E5,#818CF8)',
      frequency: row.frequency ? parseInt(row.frequency) : 1,
      frequencyRange: row.frequencyRange || row.date || '',
      priority: row.priority || 'medium',
      sections: sections,
      fromSheets: true, // flag so we can show "Verified" badge differently if needed
    }
  } catch (err) {
    console.error('Failed to transform sheet row:', err, row)
    return null
  }
}

/**
 * Fetch approved memories from Google Apps Script doGet() endpoint.
 * Returns empty array on failure — samples will still show.
 */
async function fetchFromSheets() {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')) {
    return [] // dev mode — no real sheet
  }

  try {
    const url = `${scriptUrl}?action=getMemories`
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Next.js cache: revalidate every 5 min
    })

    if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`)

    const data = await res.json()

    if (!Array.isArray(data.memories)) return []

    return data.memories
      .map(transformSheetRow)
      .filter(Boolean) // remove any failed transforms
  } catch (err) {
    console.error('Sheets fetch error:', err)
    return []
  }
}

/**
 * Get all memories: Sheets (approved) first, then samples.
 * Deduplicates by id so a sample won't appear twice if it's also in Sheets.
 */
export async function getAllMemories() {
  // Check in-memory cache
  const now = Date.now()
  if (cache && now - cacheTime < CACHE_TTL) {
    return cache
  }

  const sheetMemories = await fetchFromSheets()

  // Merge: sheet memories first, then samples not already in sheets
  const sheetIds = new Set(sheetMemories.map(m => m.id))
  const samples = SAMPLE_MEMORIES.filter(m => !sheetIds.has(m.id))

  const merged = [...sheetMemories, ...samples]

  // Update cache
  cache = merged
  cacheTime = now

  return merged
}

/**
 * Filter memories by section key (same API as memories.js helper)
 */
export function filterBySection(memories, sectionKey) {
  if (!sectionKey || sectionKey === 'all') return memories
  return memories.filter(m => m.sections.some(s => s.key === sectionKey))
}

/**
 * Find a single memory by id across both sources
 */
export async function getMemoryById(id) {
  const all = await getAllMemories()
  return all.find(m => m.id === id) || null
}

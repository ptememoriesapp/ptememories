// src/app/api/memories/route.js
// Fetches approved memories from Supabase.
// Falls back to sample data if Supabase is not configured.

import { supabase, isSupabaseReady } from '../../../lib/supabase'
import { MEMORIES as SAMPLE_MEMORIES } from '../../../lib/memories'

let cache = null
let cacheTime = 0
const CACHE_TTL = 60 * 1000 // 60 seconds — fast enough for approvals to reflect quickly

// ── Fetch from Supabase ───────────────────────────────
async function fetchFromSupabase() {
  if (!isSupabaseReady || !supabase) return null

  try {
    // Fetch approved memories
    const { data: memories, error } = await supabase
      .from('memories')
      .select(`
        id, name, location, centre, score, exam_date,
        avatar_gradient, frequency, frequency_range,
        priority, status, created_at, slug,
        sections (
          id, key, preview, ord,
          questions (
            id, type, content, sentences, tip, ord
          )
        )
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error.message)
      return null
    }

    // Transform to match the shape memories.js uses
    return memories.map(m => {
      // Format exam_date nicely: "2026-04-04" → "4 Apr 2026"
      let formattedDate = m.exam_date || ''
      if (formattedDate && !formattedDate.includes(' ')) {
        try {
          // Add time to avoid timezone shifting the date
          formattedDate = new Date(formattedDate + 'T12:00:00')
            .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        } catch {}
      }

      return {
        id:             m.slug || m.id,  // use slug for URL, fallback to uuid
        dbId:           m.id,            // keep real uuid for reference
        name:           m.name,
        date:           formattedDate,
        location:       m.location,
        centre:         m.centre,
        score:          m.score,
        avatarGradient: m.avatar_gradient,
        frequency:      m.frequency,
        frequencyRange: formattedDate,
        priority:       m.priority,
        fromSupabase:   true,
        sections: (m.sections || [])
          .sort((a, b) => a.ord - b.ord)
          .map(s => ({
            key:      s.key,
            preview:  s.preview,
            questions: (s.questions || [])
              .sort((a, b) => a.ord - b.ord)
              .map(q => ({
                type:      q.type,
                content:   q.content,
                sentences: q.sentences,
                tip:       q.tip,
              }))
              .filter(q => q.content || q.sentences?.length || q.tip),
          }))
          .filter(s => s.questions.length > 0),
      }
    }).filter(m => m.sections.length > 0)

  } catch (err) {
    console.error('Supabase unexpected error:', err)
    return null
  }
}

export async function GET(request) {
  const now = Date.now()
  const { searchParams } = new URL(request.url)
  const bust = searchParams.get('bust')

  if (!bust && cache && now - cacheTime < CACHE_TTL) {
    return Response.json(cache)
  }
  if (bust) { cache = null; cacheTime = 0 }

  const dbMemories = await fetchFromSupabase()

  let result

  if (dbMemories === null) {
    // Supabase not configured or failed — use samples only
    result = {
      memories:    SAMPLE_MEMORIES,
      fromDb:      0,
      fromSamples: SAMPLE_MEMORIES.length,
      total:       SAMPLE_MEMORIES.length,
      source:      'samples',
      cachedAt:    new Date().toISOString(),
    }
  } else {
    // Supabase working — DB memories already include seeded samples
    // No need to append samples separately since they're in the DB
    result = {
      memories:    dbMemories,
      fromDb:      dbMemories.length,
      fromSamples: 0,
      total:       dbMemories.length,
      source:      'supabase',
      cachedAt:    new Date().toISOString(),
    }
  }

  cache = result
  cacheTime = now

  return Response.json(result, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
  })
}

// scripts/seed.mjs
// Run: node scripts/seed.mjs

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Import the memories data directly as ES module
import  { MEMORIES }  from './memories-seed-data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Load env ──────────────────────────────────────────
const envPath = join(__dirname, '../.env.local')
const envFile = readFileSync(envPath, 'utf-8')
const env = {}
envFile.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return
  const idx = trimmed.indexOf('=')
  if (idx === -1) return
  env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
})

const url = env['NEXT_PUBLIC_SUPABASE_URL']
const key = env['SUPABASE_SERVICE_KEY']

if (!url || url.includes('YOUR_PROJECT') || !key || key.includes('YOUR_SERVICE')) {
  console.error('\n❌ Set real values in .env.local:\n   NEXT_PUBLIC_SUPABASE_URL\n   SUPABASE_SERVICE_KEY\n')
  process.exit(1)
}

console.log(`\n🔗 Connecting to Supabase...`)
const supabase = createClient(url, key)

// ── Seed ──────────────────────────────────────────────
async function seed() {
  console.log(`🌱 Seeding ${MEMORIES.length} memories...\n`)

  let ok = 0, fail = 0

  for (const memory of MEMORIES) {
    try {
      // 1. Memory row
      const { data: mem, error: e1 } = await supabase
        .from('memories')
        .insert({
          name:            memory.name,
          location:        memory.location,
          centre:          memory.centre || null,
          score:           memory.score  || null,
          exam_date:       memory.date,
          avatar_gradient: memory.avatarGradient,
          frequency:       memory.frequency,
          frequency_range: memory.frequencyRange,
          priority:        memory.priority,
          status:          'approved',
          submitter_email: null,
        })
        .select('id').single()

      if (e1) throw new Error(e1.message)

      // 2. Sections + questions
      for (let si = 0; si < memory.sections.length; si++) {
        const sec = memory.sections[si]

        const { data: secRow, error: e2 } = await supabase
          .from('sections')
          .insert({ memory_id: mem.id, key: sec.key, preview: sec.preview, ord: si })
          .select('id').single()

        if (e2) throw new Error(e2.message)

        for (let qi = 0; qi < sec.questions.length; qi++) {
          const q = sec.questions[qi]
          const { error: e3 } = await supabase
            .from('questions')
            .insert({
              section_id: secRow.id,
              type:       q.type,
              content:    q.content   || null,
              sentences:  q.sentences || null,
              tip:        q.tip       || null,
              ord:        qi,
            })
          if (e3) throw new Error(e3.message)
        }
      }

      console.log(`  ✅ ${memory.name} — ${memory.location}`)
      ok++
    } catch (err) {
      console.error(`  ❌ ${memory.name}: ${err.message}`)
      fail++
    }
  }

  console.log(`\n${'─'.repeat(48)}`)
  console.log(`  ✅ ${ok} seeded   ${fail ? `❌ ${fail} errors` : ''}`)
  console.log(`\n  Dashboard: ${url.replace('.supabase.co','')}.supabase.co\n`)
}

seed().catch(err => {
  console.error('💥 Fatal:', err.message)
  process.exit(1)
})

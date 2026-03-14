// src/app/api/memories/route.js
import { MEMORIES as SAMPLE_MEMORIES } from '../../../lib/memories'

let cache = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000

// ── Question type labels ───────────────────────────────
const TYPE_LABELS = {
  ra:     'Read Aloud',
  rs:     'Repeat Sentence',
  di:     'Describe Image',
  rl:     'Retell Lecture',
  asq:    'Answer Short Questions',
  rts:    'Respond to Situation',
  we:     'Write Essay',
  swt:    'Summarize Written Text',
  rwfib:  'R&W Fill in the Blanks',
  fib:    'Reading FIB (Dropdown)',
  mcq1:   'MCQ — Single Answer',
  mcqm:   'MCQ — Multiple Answers',
  rop:    'Reorder Paragraphs',
  wfd:    'Write from Dictation',
  sst:    'Summarize Spoken Text',
  hcs:    'Highlight Correct Summary',
  hiw:    'Highlight Incorrect Words',
  smw:    'Select Missing Word',
  lfib:   'Listening FIB',
}

const SECTION_LABELS = {
  sp: 'Speaking',
  wr: 'Writing',
  rd: 'Reading',
  li: 'Listening',
}

// ── Build a question object matching MemoryCard expectations ──
function buildQuestion(raw) {
  const typeKey = raw.type || ''
  const q = {
    type: TYPE_LABELS[typeKey] || typeKey.toUpperCase(),
  }

  // tip is universal
  if (raw.tip?.trim()) q.tip = raw.tip.trim()

  switch (typeKey) {
    case 'ra':
      if (raw.topic)      q.content = raw.topic
      if (raw.wordcount)  q.content = (q.content ? q.content + '. ' : '') + `~${raw.wordcount}`
      if (raw.difficulty) q.content = (q.content ? q.content + '. Difficult word: "' + raw.difficulty + '".' : 'Difficult word: "' + raw.difficulty + '".')
      break

    case 'rs':
      if (raw.sentence) q.content = raw.sentence
      break

    case 'di':
      {
        const parts = []
        if (raw.imagetype) parts.push(raw.imagetype)
        if (raw.topic)     parts.push(raw.topic)
        if (raw.details)   parts.push(raw.details)
        if (parts.length)  q.content = parts.join('. ')
      }
      break

    case 'rl':
      {
        const parts = []
        if (raw.topic)      parts.push(raw.topic)
        if (raw.accent)     parts.push(`${raw.accent} accent`)
        if (raw.hasdiagram) parts.push(raw.hasdiagram)
        if (raw.details)    parts.push(raw.details)
        if (parts.length)   q.content = parts.join('. ')
      }
      break

    case 'asq':
      if (raw.questions) q.content = raw.questions
      break

    case 'rts':
      if (raw.scenario) q.content = raw.scenario
      break

    case 'we':
      {
        const parts = []
        if (raw.prompt) parts.push(raw.prompt)
        if (raw.type)   parts.push(`Type: ${raw.type}`)
        if (parts.length) q.content = parts.join('\n')
      }
      break

    case 'swt':
      {
        const parts = []
        if (raw.topic)   parts.push(raw.topic)
        if (raw.details) parts.push(raw.details)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'rwfib':
      {
        const parts = []
        if (raw.topic)  parts.push(raw.topic)
        if (raw.blanks) parts.push(`Blank words: ${raw.blanks}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'fib':
      {
        const parts = []
        if (raw.topic)   parts.push(raw.topic)
        if (raw.details) parts.push(raw.details)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'mcq1':
      {
        const parts = []
        if (raw.topic)    parts.push(`Topic: ${raw.topic}`)
        if (raw.question) parts.push(`Q: ${raw.question}`)
        if (raw.answer)   parts.push(`A: ${raw.answer}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'mcqm':
      {
        const parts = []
        if (raw.topic)   parts.push(raw.topic)
        if (raw.answers) parts.push(`Answers: ${raw.answers}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'rop':
      {
        const parts = []
        if (raw.topic)  parts.push(raw.topic)
        if (raw.opener) parts.push(`Opener: "${raw.opener}"`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'wfd':
      // WFD sentences get the special numbered list treatment
      if (raw.sentences?.length) {
        q.sentences = raw.sentences.filter(s => s?.trim())
        // If no sentences but has other content, fall back to content
        if (!q.sentences.length) delete q.sentences
      }
      break

    case 'sst':
      {
        const parts = []
        if (raw.topic)   parts.push(raw.topic)
        if (raw.accent)  parts.push(`${raw.accent} accent`)
        if (raw.details) parts.push(raw.details)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'hcs':
      {
        const parts = []
        if (raw.topic)   parts.push(raw.topic)
        if (raw.correct) parts.push(raw.correct)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'hiw':
      {
        const parts = []
        if (raw.topic) parts.push(raw.topic)
        if (raw.swaps) parts.push(`Swaps: ${raw.swaps}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'smw':
      {
        const parts = []
        if (raw.topic)  parts.push(raw.topic)
        if (raw.answer) parts.push(`Answer: ${raw.answer}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    case 'lfib':
      {
        const parts = []
        if (raw.topic)  parts.push(raw.topic)
        if (raw.blanks) parts.push(`Blanks: ${raw.blanks}`)
        if (parts.length) q.content = parts.join('. ')
      }
      break

    default:
      // Unknown type — show whatever fields exist as content
      q.content = Object.entries(raw)
        .filter(([k]) => !['type', 'tip'].includes(k) && raw[k]?.trim?.())
        .map(([k, v]) => `${k}: ${v}`)
        .join('. ')
  }

  return q
}

// ── Build sections array from raw questions object ────
// Input:  { sp: [{type:'di', ...}, {type:'rts', ...}], wr: [...], li: [...] }
// Output: [{ key:'sp', preview:'Describe Image · Respond to Situation', questions:[...] }, ...]
function buildSections(rawQuestions) {
  const sections = []
  const ORDER = ['sp', 'wr', 'rd', 'li']

  for (const secKey of ORDER) {
    const rawList = rawQuestions[secKey]
    if (!rawList?.length) continue

    const questions = rawList
      .map(buildQuestion)
      .filter(q => q.content || q.sentences?.length || q.tip) // keep if any content including just a tip

    if (!questions.length) continue

    const preview = rawList
      .map(r => TYPE_LABELS[r.type] || r.type?.toUpperCase() || '')
      .filter(Boolean)
      .join(' · ')

    sections.push({ key: secKey, preview, questions })
  }

  return sections
}

// ── Transform a full sheet row into a memory object ───
function transformRow(row) {
  try {
    // Parse questions JSON
    let rawQuestions = {}
    const questionsRaw = row['Questions (JSON)'] || row.questions || ''
    if (questionsRaw) {
      rawQuestions = typeof questionsRaw === 'string'
        ? JSON.parse(questionsRaw)
        : questionsRaw
    }

    const sections = buildSections(rawQuestions)
    if (!sections.length) return null // skip if no usable content

    // Build a stable id from email + date
    const email = row['Email'] || row.email || ''
    const date  = row['Date']  || row.date  || ''
    const id = `sheet-${email.split('@')[0]}-${date.replace(/[^0-9]/g, '')}`

    // Pick an avatar gradient based on name initial
    const gradients = [
      'linear-gradient(135deg,#4F46E5,#818CF8)',
      'linear-gradient(135deg,#059669,#34D399)',
      'linear-gradient(135deg,#F59E0B,#FCD34D)',
      'linear-gradient(135deg,#8B5CF6,#C4B5FD)',
      'linear-gradient(135deg,#EF4444,#FCA5A5)',
      'linear-gradient(135deg,#0EA5E9,#7DD3FC)',
      'linear-gradient(135deg,#EC4899,#F9A8D4)',
      'linear-gradient(135deg,#10B981,#6EE7B7)',
    ]
    const nameStr = row['Name'] || row.name || ''
    const gradientIndex = nameStr.charCodeAt(0) % gradients.length
    const avatarGradient = gradients[isNaN(gradientIndex) ? 0 : gradientIndex]

    // Format date nicely
    const rawDate = row['Date'] || row.date || ''
    let formattedDate = rawDate
    if (rawDate && !rawDate.includes(' ')) {
      try {
        formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      } catch {}
    }

    return {
      id,
      name: nameStr || 'Anonymous',
      date: formattedDate,
      location: [row['City'] || row.city, row['Country'] || row.country].filter(Boolean).join(', '),
      centre: row['Centre'] || row.centre || null,
      score: (row['Score'] || row.score) ? parseInt(row['Score'] || row.score) : null,
      avatarGradient,
      frequency: parseInt(row['Frequency'] || row.frequency || '1') || 1,
      frequencyRange: formattedDate,
      priority: row['Priority'] || row.priority || 'medium',
      sections,
      fromSheets: true,
    }
  } catch (err) {
    console.error('transformRow failed:', err, row)
    return null
  }
}

// ── Fetch from Google Apps Script ─────────────────────
async function fetchApprovedFromSheets() {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')) return []

  try {
    const res = await fetch(`${scriptUrl}?action=getMemories`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data.memories)) return []
    return data.memories.map(transformRow).filter(Boolean)
  } catch {
    return []
  }
}

// ── Main GET handler ──────────────────────────────────
export async function GET(request) {
  const now = Date.now()
  const { searchParams } = new URL(request.url)
  const bust = searchParams.get('bust') // ?bust=1 to force refresh

  if (!bust && cache && now - cacheTime < CACHE_TTL) {
    return Response.json(cache)
  }

  // Reset cache on bust
  if (bust) { cache = null; cacheTime = 0 }

  const sheetMemories = await fetchApprovedFromSheets()
  const sheetIds = new Set(sheetMemories.map(m => m.id))
  const samples = SAMPLE_MEMORIES.filter(m => !sheetIds.has(m.id))

  const result = {
    memories: [...sheetMemories, ...samples],
    fromSheets: sheetMemories.length,
    fromSamples: samples.length,
    total: sheetMemories.length + samples.length,
    cachedAt: new Date().toISOString(),
  }

  cache = result
  cacheTime = now

  return Response.json(result, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
  })
}

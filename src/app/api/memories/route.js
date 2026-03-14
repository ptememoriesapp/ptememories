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

// Reverse lookup — handles "di", "DI", "Describe Image", "describe image"
const TYPE_LABELS_REVERSE = {}
for (const [abbr, label] of Object.entries(TYPE_LABELS)) {
  TYPE_LABELS_REVERSE[abbr] = label
  TYPE_LABELS_REVERSE[abbr.toUpperCase()] = label
  TYPE_LABELS_REVERSE[label] = label
  TYPE_LABELS_REVERSE[label.toLowerCase()] = label
}

const SECTION_LABELS = {
  sp: 'Speaking',
  wr: 'Writing',
  rd: 'Reading',
  li: 'Listening',
}

// ── Resolve any type string to its full label ─────────
function resolveTypeLabel(raw) {
  if (!raw) return raw
  const trimmed = raw.trim()
  return TYPE_LABELS_REVERSE[trimmed]
    || TYPE_LABELS_REVERSE[trimmed.toLowerCase()]
    || trimmed
}

// ── Normalize a question from Apps Script ─────────────
// Handles: type abbreviation → full label
//          raw field names (details, scenario, etc.) → content
function normalizeQuestion(q) {
  if (!q) return null

  const resolvedType = resolveTypeLabel(q.type)
  const fixed = { type: resolvedType }

  // Preserve tip
  if (q.tip?.trim()) fixed.tip = q.tip.trim()

  // If it already has `content`, keep it
  if (q.content?.trim()) {
    fixed.content = q.content.trim()
    return fixed
  }

  // If it already has `sentences` array (WFD), keep it
  if (Array.isArray(q.sentences) && q.sentences.length) {
    fixed.sentences = q.sentences.filter(s => s?.trim())
    if (fixed.sentences.length) return fixed
  }

  // ── Build content from raw field names based on type ──
  const typeKey = (q.type || '').toLowerCase()

  switch (typeKey) {
    case 'ra': {
      const parts = []
      if (q.topic)      parts.push(q.topic)
      if (q.wordcount)  parts.push(`~${q.wordcount} words`)
      if (q.difficulty) parts.push(`Difficult word: "${q.difficulty}"`)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'rs': {
      if (q.sentence) fixed.content = q.sentence
      break
    }

    case 'di': {
      const parts = []
      if (q.imagetype) parts.push(q.imagetype)
      if (q.topic)     parts.push(q.topic)
      if (q.details)   parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'rl': {
      const parts = []
      if (q.topic)      parts.push(q.topic)
      if (q.accent)     parts.push(`${q.accent} accent`)
      if (q.hasdiagram) parts.push(q.hasdiagram)
      if (q.details)    parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'asq': {
      if (q.questions) fixed.content = q.questions
      else if (q.question) fixed.content = q.question
      break
    }

    case 'rts': {
      if (q.scenario) fixed.content = q.scenario
      else if (q.details) fixed.content = q.details
      break
    }

    case 'we': {
      const parts = []
      if (q.prompt)   parts.push(q.prompt)
      if (q.essaytype || q.essay_type) parts.push(`Type: ${q.essaytype || q.essay_type}`)
      if (q.details)  parts.push(q.details)
      if (parts.length) fixed.content = parts.join('\n')
      break
    }

    case 'swt': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'rwfib': {
      const parts = []
      if (q.topic)  parts.push(q.topic)
      if (q.blanks) parts.push(`Blank words: ${q.blanks}`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'fib': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'mcq1': {
      const parts = []
      if (q.topic)    parts.push(`Topic: ${q.topic}`)
      if (q.question) parts.push(`Q: ${q.question}`)
      if (q.answer)   parts.push(`A: ${q.answer}`)
      if (q.details)  parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'mcqm': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.answers) parts.push(`Answers: ${q.answers}`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'rop': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.opener)  parts.push(`Opener: "${q.opener}"`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'wfd': {
      // Check for sentences in various formats
      if (q.sentence) {
        // Could be a single sentence string or semicolon-separated
        const sents = q.sentence.split(/[;\n]/).map(s => s.trim()).filter(Boolean)
        if (sents.length > 1) {
          fixed.sentences = sents
        } else {
          fixed.content = q.sentence
        }
      } else if (q.details) {
        const sents = q.details.split(/[;\n]/).map(s => s.trim()).filter(Boolean)
        if (sents.length > 1) {
          fixed.sentences = sents
        } else {
          fixed.content = q.details
        }
      }
      break
    }

    case 'sst': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.accent)  parts.push(`${q.accent} accent`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'hcs': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.correct) parts.push(q.correct)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'hiw': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.swaps)   parts.push(`Swaps: ${q.swaps}`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'smw': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.answer)  parts.push(`Answer: ${q.answer}`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    case 'lfib': {
      const parts = []
      if (q.topic)   parts.push(q.topic)
      if (q.blanks)  parts.push(`Blanks: ${q.blanks}`)
      if (q.details) parts.push(q.details)
      if (parts.length) fixed.content = parts.join('. ')
      break
    }

    default:
      break
  }

  // ── Fallback: if still no content, grab from any known field ──
  if (!fixed.content && !fixed.sentences) {
    const fallbackFields = [
      'details', 'scenario', 'sentence', 'prompt', 'topic',
      'questions', 'question', 'answer', 'correct', 'blanks',
      'swaps', 'opener', 'imagetype', 'accent',
    ]
    const parts = []
    for (const field of fallbackFields) {
      if (q[field] && typeof q[field] === 'string' && q[field].trim()) {
        parts.push(q[field].trim())
      }
    }
    if (parts.length) fixed.content = parts.join('. ')
  }

  return fixed
}

// ── Fix sections that came from Apps Script ───────────
function fixSections(sections) {
  if (!Array.isArray(sections)) return sections

  return sections.map(section => {
    const fixedQuestions = (section.questions || [])
      .map(normalizeQuestion)
      .filter(q => q && (q.content || q.sentences?.length || q.tip))

    // Rebuild preview from resolved full labels (deduplicated)
    const uniqueTypes = []
    const seen = new Set()
    for (const q of fixedQuestions) {
      if (q.type && !seen.has(q.type)) {
        seen.add(q.type)
        uniqueTypes.push(q.type)
      }
    }
    const fixedPreview = uniqueTypes.length > 0
      ? uniqueTypes.join(' · ')
      : section.preview

    return {
      ...section,
      preview: fixedPreview,
      questions: fixedQuestions,
    }
  })
}

// ── Build a question object (for raw sheet columns) ──
function buildQuestion(raw) {
  const typeKey = raw.type || ''
  const q = {
    type: TYPE_LABELS[typeKey] || resolveTypeLabel(typeKey),
  }

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
    case 'di': {
      const parts = []
      if (raw.imagetype) parts.push(raw.imagetype)
      if (raw.topic)     parts.push(raw.topic)
      if (raw.details)   parts.push(raw.details)
      if (parts.length)  q.content = parts.join('. ')
      break
    }
    case 'rl': {
      const parts = []
      if (raw.topic)      parts.push(raw.topic)
      if (raw.accent)     parts.push(`${raw.accent} accent`)
      if (raw.hasdiagram) parts.push(raw.hasdiagram)
      if (raw.details)    parts.push(raw.details)
      if (parts.length)   q.content = parts.join('. ')
      break
    }
    case 'asq':
      if (raw.questions) q.content = raw.questions
      break
    case 'rts':
      if (raw.scenario) q.content = raw.scenario
      break
    case 'we': {
      const parts = []
      if (raw.prompt) parts.push(raw.prompt)
      if (raw.type)   parts.push(`Type: ${raw.type}`)
      if (parts.length) q.content = parts.join('\n')
      break
    }
    case 'swt': {
      const parts = []
      if (raw.topic)   parts.push(raw.topic)
      if (raw.details) parts.push(raw.details)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'rwfib': {
      const parts = []
      if (raw.topic)  parts.push(raw.topic)
      if (raw.blanks) parts.push(`Blank words: ${raw.blanks}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'fib': {
      const parts = []
      if (raw.topic)   parts.push(raw.topic)
      if (raw.details) parts.push(raw.details)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'mcq1': {
      const parts = []
      if (raw.topic)    parts.push(`Topic: ${raw.topic}`)
      if (raw.question) parts.push(`Q: ${raw.question}`)
      if (raw.answer)   parts.push(`A: ${raw.answer}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'mcqm': {
      const parts = []
      if (raw.topic)   parts.push(raw.topic)
      if (raw.answers) parts.push(`Answers: ${raw.answers}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'rop': {
      const parts = []
      if (raw.topic)  parts.push(raw.topic)
      if (raw.opener) parts.push(`Opener: "${raw.opener}"`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'wfd':
      if (raw.sentences?.length) {
        q.sentences = raw.sentences.filter(s => s?.trim())
        if (!q.sentences.length) delete q.sentences
      }
      break
    case 'sst': {
      const parts = []
      if (raw.topic)   parts.push(raw.topic)
      if (raw.accent)  parts.push(`${raw.accent} accent`)
      if (raw.details) parts.push(raw.details)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'hcs': {
      const parts = []
      if (raw.topic)   parts.push(raw.topic)
      if (raw.correct) parts.push(raw.correct)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'hiw': {
      const parts = []
      if (raw.topic) parts.push(raw.topic)
      if (raw.swaps) parts.push(`Swaps: ${raw.swaps}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'smw': {
      const parts = []
      if (raw.topic)  parts.push(raw.topic)
      if (raw.answer) parts.push(`Answer: ${raw.answer}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    case 'lfib': {
      const parts = []
      if (raw.topic)  parts.push(raw.topic)
      if (raw.blanks) parts.push(`Blanks: ${raw.blanks}`)
      if (parts.length) q.content = parts.join('. ')
      break
    }
    default:
      q.content = Object.entries(raw)
        .filter(([k]) => !['type', 'tip'].includes(k) && raw[k]?.trim?.())
        .map(([k, v]) => `${k}: ${v}`)
        .join('. ')
  }

  return q
}

// ── Build sections array from raw questions object ────
function buildSections(rawQuestions) {
  const sections = []
  const ORDER = ['sp', 'wr', 'rd', 'li']

  for (const secKey of ORDER) {
    const rawList = rawQuestions[secKey]
    if (!rawList?.length) continue

    const questions = rawList
      .map(buildQuestion)
      .filter(q => q.content || q.sentences?.length || q.tip)

    if (!questions.length) continue

    const preview = rawList
      .map(r => TYPE_LABELS[r.type] || resolveTypeLabel(r.type) || '')
      .filter(Boolean)
      .join(' · ')

    sections.push({ key: secKey, preview, questions })
  }

  return sections
}

// ── Transform a full sheet row into a memory object ───
function transformRow(row) {
  try {
    let rawQuestions = {}
    const questionsRaw = row['Questions (JSON)'] || row.questions || ''
    if (questionsRaw) {
      rawQuestions = typeof questionsRaw === 'string'
        ? JSON.parse(questionsRaw)
        : questionsRaw
    }

    const sections = buildSections(rawQuestions)
    if (!sections.length) return null

    const email = row['Email'] || row.email || ''
    const date  = row['Date']  || row.date  || ''
    const id = `sheet-${email.split('@')[0]}-${date.replace(/[^0-9]/g, '')}`

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

// ── Normalize already-transformed row from Apps Script ─
function normalizeRow(row) {
  try {
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
    const name = row.name || row['Name'] || 'Anonymous'
    const gradientIndex = name.charCodeAt(0) % gradients.length

    const location = row.location
      || [row.city || row['City'], row.country || row['Country']].filter(Boolean).join(', ')

    let date = row.date || row['Date'] || ''
    if (date && date.includes('T')) {
      try {
        date = new Date(date).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      } catch {}
    }

    const id = row.id && !row.id.startsWith('sheet-1')
      ? row.id
      : `sheet-${name.toLowerCase().replace(/\s/g,'-')}-${date.replace(/[^a-z0-9]/gi,'')}`

    // ★ Fix sections: resolve type abbreviations + map field names to content
    const fixedSections = fixSections(row.sections)

    return {
      id,
      name,
      date,
      location,
      centre: row.centre || row['Centre'] || null,
      score: row.score ? parseInt(row.score) : null,
      avatarGradient: row.avatarGradient || gradients[isNaN(gradientIndex) ? 0 : gradientIndex],
      frequency: parseInt(row.frequency || '1') || 1,
      frequencyRange: date,
      priority: row.priority || 'medium',
      sections: fixedSections,
      fromSheets: true,
    }
  } catch (err) {
    console.error('normalizeRow failed:', err)
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

    return data.memories.map(row => {
      if (Array.isArray(row.sections) && row.sections.length > 0) {
        return normalizeRow(row)
      }
      return transformRow(row)
    }).filter(Boolean)
  } catch (err) {
    console.error('fetchApprovedFromSheets error:', err)
    return []
  }
}

// ── Main GET handler ──────────────────────────────────
export async function GET(request) {
  const now = Date.now()
  const { searchParams } = new URL(request.url)
  const bust = searchParams.get('bust')

  if (!bust && cache && now - cacheTime < CACHE_TTL) {
    return Response.json(cache)
  }

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
// src/app/api/submit/route.js
import { supabase, isSupabaseReady } from '../../../lib/supabase'

const GRADIENTS = [
  'linear-gradient(135deg,#4F46E5,#818CF8)',
  'linear-gradient(135deg,#059669,#34D399)',
  'linear-gradient(135deg,#F59E0B,#FCD34D)',
  'linear-gradient(135deg,#8B5CF6,#C4B5FD)',
  'linear-gradient(135deg,#EF4444,#FCA5A5)',
  'linear-gradient(135deg,#0EA5E9,#7DD3FC)',
  'linear-gradient(135deg,#EC4899,#F9A8D4)',
  'linear-gradient(135deg,#10B981,#6EE7B7)',
]

const TYPE_LABELS = {
  ra:'Read Aloud', rs:'Repeat Sentence', di:'Describe Image',
  rl:'Retell Lecture', sgd:'Summarize Group Discussion',
  asq:'Answer Short Questions', rts:'Respond to Situation',
  we:'Write Essay', swt:'Summarize Written Text', rwfib:'R&W Fill in the Blanks',
  fib:'Reading FIB (Dropdown)', mcq1:'MCQ — Single Answer', mcqm:'MCQ — Multiple Answers',
  rop:'Reorder Paragraphs', wfd:'Write from Dictation', sst:'Summarize Spoken Text',
  hcs:'Highlight Correct Summary', hiw:'Highlight Incorrect Words',
  smw:'Select Missing Word', lfib:'Listening FIB',
}

function buildContent(q) {
  const parts = []
  const skip = ['type', 'tip', 'sentences']
  for (const [k, v] of Object.entries(q)) {
    if (!skip.includes(k) && v?.toString().trim()) parts.push(v.toString().trim())
  }
  return parts.join('. ') || null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { date, city, country, centre, score, sections: selectedSections,
            questions: rawQuestions, name, email, anonymous } = body

    if (!email || !date || !city) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Dev mode fallback
    if (!isSupabaseReady || !supabase) {
      console.log('Dev mode — submission:', JSON.stringify(body, null, 2))
      return Response.json({ status: 'success' })
    }

    const location = [city, country].filter(Boolean).join(', ')
    const nameStr = anonymous ? 'Anonymous' : (name || 'Anonymous')
    const gradient = GRADIENTS[nameStr.charCodeAt(0) % GRADIENTS.length]

    // 1. Insert memory
    const { data: mem, error: memErr } = await supabase
      .from('memories')
      .insert({
        name:            nameStr,
        location,
        centre:          centre || null,
        score:           score  ? parseInt(score) : null,
        exam_date:       date,
        avatar_gradient: gradient,
        frequency:       1,
        frequency_range: date,
        priority:        'medium',
        status:          'pending',
        submitter_email: email,
      })
      .select('id')
      .single()

    if (memErr) throw new Error(memErr.message)

    // 2. Insert sections + questions
    const ORDER = ['sp','wr','rd','li']
    let sectionOrd = 0

    for (const secKey of ORDER) {
      if (!selectedSections?.includes(secKey)) continue
      const qList = rawQuestions?.[secKey] || []
      if (!qList.length) continue

      const preview = qList
        .map(q => TYPE_LABELS[q.type] || q.type?.toUpperCase() || '')
        .filter(Boolean).join(' · ')

      const { data: sec, error: secErr } = await supabase
        .from('sections')
        .insert({ memory_id: mem.id, key: secKey, preview, ord: sectionOrd++ })
        .select('id').single()

      if (secErr) throw new Error(secErr.message)

      for (let qi = 0; qi < qList.length; qi++) {
        const q = qList[qi]
        const sentences = q.sentences?.filter(s => s?.trim()) || null

        await supabase.from('questions').insert({
          section_id: sec.id,
          type:       TYPE_LABELS[q.type] || q.type,
          content:    buildContent(q),
          sentences:  sentences?.length ? sentences : null,
          tip:        q.tip?.trim() || null,
          ord:        qi,
        })
      }
    }

    return Response.json({ status: 'success' })

  } catch (err) {
    console.error('Submit error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

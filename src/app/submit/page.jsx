'use client'
// src/app/submit/page.jsx
import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import Footer from '../../components/Footer'
import { getSiteUrl } from '../../lib/siteUrl'

// ── Constants ─────────────────────────────────────────

const SECTIONS = [
  { key: 'sp', icon: '🎤', label: 'Speaking',  color: '#3B82F6', bg: '#EFF6FF', dark: '#1D4ED8', border: '#BFDBFE' },
  { key: 'wr', icon: '✍️', label: 'Writing',   color: '#F59E0B', bg: '#FFFBEB', dark: '#B45309', border: '#FDE68A' },
  { key: 'rd', icon: '📖', label: 'Reading',   color: '#10B981', bg: '#ECFDF5', dark: '#065F46', border: '#A7F3D0' },
  { key: 'li', icon: '🎧', label: 'Listening', color: '#8B5CF6', bg: '#F5F3FF', dark: '#5B21B6', border: '#DDD6FE' },
]

const QUESTION_TYPES = {
  sp: [
    { key: 'ra',  label: 'Read Aloud',            fields: ['topic', 'difficulty', 'wordcount'] },
    { key: 'rs',  label: 'Repeat Sentence',        fields: ['sentence'] },
    { key: 'di',  label: 'Describe Image',         fields: ['imagetype', 'topic', 'details'] },
    { key: 'rl',  label: 'Retell Lecture',         fields: ['topic', 'accent', 'hasdiagram', 'details'] },
    { key: 'asq', label: 'Answer Short Questions', fields: ['questions'] },
    { key: 'rts', label: 'Respond to Situation',   fields: ['scenario'] },
  ],
  wr: [
    { key: 'we',  label: 'Write Essay',            fields: ['prompt', 'type'] },
    { key: 'swt', label: 'Summarize Written Text', fields: ['topic', 'details'] },
  ],
  rd: [
    { key: 'rwfib', label: 'R&W Fill in the Blanks', fields: ['topic', 'blanks'] },
    { key: 'fib',   label: 'Reading FIB (Dropdown)', fields: ['topic', 'details'] },
    { key: 'mcq1',  label: 'MCQ — Single Answer',    fields: ['topic', 'question', 'answer'] },
    { key: 'mcqm',  label: 'MCQ — Multiple Answers', fields: ['topic', 'answers'] },
    { key: 'rop',   label: 'Reorder Paragraphs',     fields: ['topic', 'opener'] },
  ],
  li: [
    { key: 'wfd',  label: 'Write from Dictation',     fields: ['sentences'] },
    { key: 'sst',  label: 'Summarize Spoken Text',    fields: ['topic', 'accent', 'details'] },
    { key: 'hcs',  label: 'Highlight Correct Summary',fields: ['topic', 'correct'] },
    { key: 'hiw',  label: 'Highlight Incorrect Words',fields: ['topic', 'swaps'] },
    { key: 'smw',  label: 'Select Missing Word',      fields: ['topic', 'answer'] },
    { key: 'lfib', label: 'Listening FIB',            fields: ['topic', 'blanks'] },
  ],
}

// ── Step indicator ────────────────────────────────────
function StepBar({ step }) {
  const steps = ['Exam Details', 'Sections', 'Memories', 'Your Info']
  return (
    <div className={styles.stepBar}>
      {steps.map((label, i) => (
        <div key={i} className={styles.stepItem}>
          <div className={`${styles.stepCircle} ${i + 1 === step ? styles.stepActive : ''} ${i + 1 < step ? styles.stepDone : ''}`}>
            {i + 1 < step ? '✓' : i + 1}
          </div>
          <div className={`${styles.stepLabel} ${i + 1 === step ? styles.stepLabelActive : ''}`}>{label}</div>
          {i < steps.length - 1 && <div className={`${styles.stepLine} ${i + 1 < step ? styles.stepLineDone : ''}`} />}
        </div>
      ))}
    </div>
  )
}

// ── Step 1: Exam Details ──────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <h2 className={styles.stepTitle}>When did you take the exam?</h2>
        <p className={styles.stepSub}>Basic details about your test. Score and centre are optional — share what you're comfortable with.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Exam date <span className={styles.required}>*</span></label>
        <input
          type="date"
          className={styles.input}
          value={data.date}
          onChange={e => onChange('date', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>City <span className={styles.required}>*</span></label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Mumbai, Melbourne, London"
            value={data.city}
            onChange={e => onChange('city', e.target.value)}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Country <span className={styles.required}>*</span></label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. India, Australia, UK"
            value={data.country}
            onChange={e => onChange('country', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Test centre <span className={styles.optional}>(optional)</span></label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g. Pearson VUE, Connaught Place"
          value={data.centre}
          onChange={e => onChange('centre', e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Your PTE score <span className={styles.optional}>(optional — share only if you have results)</span></label>
        <input
          type="number"
          className={styles.input}
          placeholder="10–90"
          min="10" max="90"
          value={data.score}
          onChange={e => onChange('score', e.target.value)}
          style={{ maxWidth: '140px' }}
        />
      </div>
    </div>
  )
}

// ── Step 2: Sections ──────────────────────────────────
function Step2({ data, onChange }) {
  function toggle(key) {
    const current = data.sections || []
    const next = current.includes(key)
      ? current.filter(k => k !== key)
      : [...current, key]
    onChange('sections', next)
  }

  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <h2 className={styles.stepTitle}>Which sections appeared in your exam?</h2>
        <p className={styles.stepSub}>Select all that apply. You can add memories for as many or as few sections as you remember.</p>
      </div>

      <div className={styles.sectionGrid}>
        {SECTIONS.map(sec => {
          const on = (data.sections || []).includes(sec.key)
          return (
            <button
              key={sec.key}
              className={`${styles.sectionCard} ${on ? styles.sectionCardOn : ''}`}
              style={on ? { borderColor: sec.color, background: sec.bg } : {}}
              onClick={() => toggle(sec.key)}
              type="button"
            >
              <span className={styles.sectionCardIcon} style={on ? { background: sec.color } : {}}>{sec.icon}</span>
              <span className={styles.sectionCardLabel} style={on ? { color: sec.dark } : {}}>{sec.label}</span>
              <span className={`${styles.sectionCheck} ${on ? styles.sectionCheckOn : ''}`} style={on ? { background: sec.color } : {}}>
                {on ? '✓' : ''}
              </span>
            </button>
          )
        })}
      </div>

      {(data.sections || []).length === 0 && (
        <div className={styles.hint}>Select at least one section to continue.</div>
      )}

      <div className={styles.infoBox}>
        <span>💡</span>
        <span>You don't need to remember everything — even partial memories are valuable. Share what you can.</span>
      </div>
    </div>
  )
}

// ── Question input per type ───────────────────────────
function QuestionInput({ secKey, qt, qdata, onChange, onRemove, index, secColor, secDark, secBg, secBorder }) {
  function set(field, val) {
    onChange({ ...qdata, [field]: val })
  }

  function addSentence() {
    const sentences = [...(qdata.sentences || []), '']
    set('sentences', sentences)
  }

  function setSentence(i, val) {
    const sentences = [...(qdata.sentences || [])]
    sentences[i] = val
    set('sentences', sentences)
  }

  function removeSentence(i) {
    const sentences = (qdata.sentences || []).filter((_, idx) => idx !== i)
    set('sentences', sentences)
  }

  return (
    <div className={styles.qInput} style={{ borderLeftColor: secColor }}>
      <div className={styles.qInputHeader}>
        <span className={styles.qInputLabel} style={{ background: secBg, color: secDark, borderColor: secBorder }}>
          {qt.label}
        </span>
        <button className={styles.removeBtn} onClick={onRemove} type="button">✕ Remove</button>
      </div>

      {/* Read Aloud */}
      {qt.key === 'ra' && (
        <>
          <input className={styles.input} placeholder="Topic / subject of the passage" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <div className={styles.fieldRow}>
            <input className={styles.input} placeholder="~word count (e.g. 60 words)" value={qdata.wordcount || ''} onChange={e => set('wordcount', e.target.value)} />
            <input className={styles.input} placeholder="Difficult word(s) if any" value={qdata.difficulty || ''} onChange={e => set('difficulty', e.target.value)} />
          </div>
        </>
      )}

      {/* Repeat Sentence */}
      {qt.key === 'rs' && (
        <textarea className={styles.textarea} rows={2} placeholder="Type the sentence as best you remember it..." value={qdata.sentence || ''} onChange={e => set('sentence', e.target.value)} />
      )}

      {/* Describe Image */}
      {qt.key === 'di' && (
        <>
          <select className={styles.select} value={qdata.imagetype || ''} onChange={e => set('imagetype', e.target.value)}>
            <option value="">Image type...</option>
            <option>Bar chart</option>
            <option>Line graph</option>
            <option>Pie chart</option>
            <option>Table</option>
            <option>Process diagram</option>
            <option>Map</option>
            <option>Venn diagram</option>
            <option>Flowchart</option>
            <option>Organisational chart</option>
            <option>Other</option>
          </select>
          <input className={styles.input} placeholder="Topic (e.g. Renewable energy by country 2010–2022)" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Key details — main trend, highest/lowest value, anything notable..." value={qdata.details || ''} onChange={e => set('details', e.target.value)} />
        </>
      )}

      {/* Retell Lecture */}
      {qt.key === 'rl' && (
        <>
          <input className={styles.input} placeholder="Lecture topic / subject" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <div className={styles.fieldRow}>
            <select className={styles.select} value={qdata.accent || ''} onChange={e => set('accent', e.target.value)}>
              <option value="">Speaker accent...</option>
              <option>British</option>
              <option>American</option>
              <option>Australian</option>
              <option>Indian</option>
              <option>Other</option>
            </select>
            <select className={styles.select} value={qdata.hasdiagram || ''} onChange={e => set('hasdiagram', e.target.value)}>
              <option value="">Diagram shown?</option>
              <option>Yes — chart/graph</option>
              <option>Yes — image/map</option>
              <option>No diagram</option>
            </select>
          </div>
          <textarea className={styles.textarea} rows={2} placeholder="Key points from the lecture — main idea, 2–3 supporting details..." value={qdata.details || ''} onChange={e => set('details', e.target.value)} />
        </>
      )}

      {/* Answer Short Questions */}
      {qt.key === 'asq' && (
        <textarea className={styles.textarea} rows={3} placeholder="List the questions and answers, e.g.&#10;Q: What organ filters blood? A: Kidneys&#10;Q: What is the chemical symbol for gold? A: Au" value={qdata.questions || ''} onChange={e => set('questions', e.target.value)} />
      )}

      {/* Respond to Situation */}
      {qt.key === 'rts' && (
        <textarea className={styles.textarea} rows={3} placeholder="Describe the situation — e.g. You booked a hotel room but arrived to find it double-booked..." value={qdata.scenario || ''} onChange={e => set('scenario', e.target.value)} />
      )}

      {/* Write Essay */}
      {qt.key === 'we' && (
        <>
          <textarea className={styles.textarea} rows={3} placeholder="The essay question / prompt — as close to exact wording as you remember..." value={qdata.prompt || ''} onChange={e => set('prompt', e.target.value)} />
          <select className={styles.select} value={qdata.type || ''} onChange={e => set('type', e.target.value)}>
            <option value="">Essay type...</option>
            <option>Agree / Disagree</option>
            <option>Discuss Both Views</option>
            <option>Advantages / Disadvantages</option>
            <option>Problem / Solution</option>
            <option>Describe / Explain</option>
            <option>Not sure</option>
          </select>
        </>
      )}

      {/* Summarize Written Text */}
      {qt.key === 'swt' && (
        <>
          <input className={styles.input} placeholder="Passage topic (e.g. Remote work and urban real estate)" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Key point of the passage — main argument or finding..." value={qdata.details || ''} onChange={e => set('details', e.target.value)} />
        </>
      )}

      {/* R&W FIB */}
      {qt.key === 'rwfib' && (
        <>
          <input className={styles.input} placeholder="Passage topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Blank words you remember (e.g. offset, mandatory, compliance, threshold)" value={qdata.blanks || ''} onChange={e => set('blanks', e.target.value)} />
        </>
      )}

      {/* Reading FIB */}
      {qt.key === 'fib' && (
        <>
          <input className={styles.input} placeholder="Passage topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Any tricky dropdown options you remember..." value={qdata.details || ''} onChange={e => set('details', e.target.value)} />
        </>
      )}

      {/* MCQ Single */}
      {qt.key === 'mcq1' && (
        <>
          <input className={styles.input} placeholder="Passage topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <input className={styles.input} placeholder="The question asked (if you remember it)" value={qdata.question || ''} onChange={e => set('question', e.target.value)} />
          <input className={styles.input} placeholder="The correct answer" value={qdata.answer || ''} onChange={e => set('answer', e.target.value)} />
        </>
      )}

      {/* MCQ Multiple */}
      {qt.key === 'mcqm' && (
        <>
          <input className={styles.input} placeholder="Passage topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Correct answers (e.g. cognitive flexibility + delayed dementia onset)" value={qdata.answers || ''} onChange={e => set('answers', e.target.value)} />
        </>
      )}

      {/* Reorder Paragraphs */}
      {qt.key === 'rop' && (
        <>
          <input className={styles.input} placeholder="Passage topic / theme" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <input className={styles.input} placeholder="First sentence of the opening paragraph (if you remember it)" value={qdata.opener || ''} onChange={e => set('opener', e.target.value)} />
        </>
      )}

      {/* Write from Dictation */}
      {qt.key === 'wfd' && (
        <div className={styles.wfdWrap}>
          <div className={styles.wfdLabel}>Type each sentence as accurately as you remember:</div>
          {(qdata.sentences || ['']).map((s, i) => (
            <div key={i} className={styles.wfdRow}>
              <span className={styles.wfdNum} style={{ background: secBg, color: secDark }}>{i + 1}</span>
              <input
                className={styles.input}
                placeholder={`Sentence ${i + 1}...`}
                value={s}
                onChange={e => setSentence(i, e.target.value)}
              />
              {i > 0 && (
                <button className={styles.wfdRemove} type="button" onClick={() => removeSentence(i)}>✕</button>
              )}
            </div>
          ))}
          <button className={styles.addSentenceBtn} type="button" onClick={addSentence} style={{ color: secDark, borderColor: secBorder, background: secBg }}>
            + Add another sentence
          </button>
        </div>
      )}

      {/* Summarize Spoken Text */}
      {qt.key === 'sst' && (
        <>
          <input className={styles.input} placeholder="Topic of the audio" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <select className={styles.select} value={qdata.accent || ''} onChange={e => set('accent', e.target.value)}>
            <option value="">Speaker accent...</option>
            <option>British</option><option>American</option><option>Australian</option><option>Indian</option><option>Other</option>
          </select>
          <textarea className={styles.textarea} rows={2} placeholder="Key points discussed — main idea and supporting points..." value={qdata.details || ''} onChange={e => set('details', e.target.value)} />
        </>
      )}

      {/* Highlight Correct Summary */}
      {qt.key === 'hcs' && (
        <>
          <input className={styles.input} placeholder="Audio topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="What did the correct summary say? What was wrong with the incorrect ones?" value={qdata.correct || ''} onChange={e => set('correct', e.target.value)} />
        </>
      )}

      {/* Highlight Incorrect Words */}
      {qt.key === 'hiw' && (
        <>
          <input className={styles.input} placeholder="Audio topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Word swaps you noticed (e.g. 'imported' in transcript, audio said 'exported')" value={qdata.swaps || ''} onChange={e => set('swaps', e.target.value)} />
        </>
      )}

      {/* Select Missing Word */}
      {qt.key === 'smw' && (
        <>
          <input className={styles.input} placeholder="Audio topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <input className={styles.input} placeholder="The correct missing word" value={qdata.answer || ''} onChange={e => set('answer', e.target.value)} />
        </>
      )}

      {/* Listening FIB */}
      {qt.key === 'lfib' && (
        <>
          <input className={styles.input} placeholder="Audio topic" value={qdata.topic || ''} onChange={e => set('topic', e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Missing words you remember (e.g. encrypted, metadata, consent, aggregate)" value={qdata.blanks || ''} onChange={e => set('blanks', e.target.value)} />
        </>
      )}

      {/* Optional tip */}
      <div className={styles.tipField}>
        <label className={styles.label} style={{ fontSize: '.72rem' }}>
          💡 Any tip for future students? <span className={styles.optional}>(optional)</span>
        </label>
        <input className={styles.input} placeholder="e.g. The difficult word was 'calcification' — practise pronouncing it" value={qdata.tip || ''} onChange={e => set('tip', e.target.value)} />
      </div>
    </div>
  )
}

// ── Step 3: Memories ──────────────────────────────────
function Step3({ data, onChange }) {
  const selectedSections = SECTIONS.filter(s => (data.sections || []).includes(s.key))
  const [activeSec, setActiveSec] = useState(selectedSections[0]?.key || '')

  function getQuestions(secKey) {
    return data.questions?.[secKey] || []
  }

  function addQuestion(secKey, qtKey) {
    const qt = QUESTION_TYPES[secKey].find(q => q.key === qtKey)
    const initial = qt.key === 'wfd' ? { sentences: [''] } : {}
    const current = getQuestions(secKey)
    onChange('questions', {
      ...data.questions,
      [secKey]: [...current, { type: qtKey, ...initial }],
    })
  }

  function updateQuestion(secKey, index, val) {
    const current = [...getQuestions(secKey)]
    current[index] = { ...current[index], ...val }
    onChange('questions', { ...data.questions, [secKey]: current })
  }

  function removeQuestion(secKey, index) {
    const current = getQuestions(secKey).filter((_, i) => i !== index)
    onChange('questions', { ...data.questions, [secKey]: current })
  }

  const activeSectionMeta = SECTIONS.find(s => s.key === activeSec)

  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <h2 className={styles.stepTitle}>What do you remember?</h2>
        <p className={styles.stepSub}>Add as much or as little as you recall. Every detail helps — even partial memories are valuable.</p>
      </div>

      {/* Section tabs */}
      <div className={styles.secTabs}>
        {selectedSections.map(sec => (
          <button
            key={sec.key}
            className={`${styles.secTab} ${activeSec === sec.key ? styles.secTabOn : ''}`}
            style={activeSec === sec.key ? { borderColor: sec.color, background: sec.bg, color: sec.dark } : {}}
            onClick={() => setActiveSec(sec.key)}
            type="button"
          >
            {sec.icon} {sec.label}
            {getQuestions(sec.key).length > 0 && (
              <span className={styles.secTabCount} style={{ background: sec.color }}>{getQuestions(sec.key).length}</span>
            )}
          </button>
        ))}
      </div>

      {activeSectionMeta && (
        <div className={styles.secPanel}>
          {/* Existing questions */}
          {getQuestions(activeSec).map((q, i) => {
            const qt = QUESTION_TYPES[activeSec]?.find(t => t.key === q.type)
            if (!qt) return null
            return (
              <QuestionInput
                key={i}
                secKey={activeSec}
                qt={qt}
                qdata={q}
                index={i}
                onChange={val => updateQuestion(activeSec, i, val)}
                onRemove={() => removeQuestion(activeSec, i)}
                secColor={activeSectionMeta.color}
                secDark={activeSectionMeta.dark}
                secBg={activeSectionMeta.bg}
                secBorder={activeSectionMeta.border}
              />
            )
          })}

          {/* Add question */}
          <div className={styles.addQWrap}>
            <div className={styles.addQLabel}>+ Add a question type:</div>
            <div className={styles.addQGrid}>
              {QUESTION_TYPES[activeSec]?.map(qt => (
                <button
                  key={qt.key}
                  className={styles.addQBtn}
                  style={{ borderColor: activeSectionMeta.border }}
                  onClick={() => addQuestion(activeSec, qt.key)}
                  type="button"
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.infoBox}>
        <span>✅</span>
        <span>All fields are optional within each question. Share what you remember — it all helps.</span>
      </div>
    </div>
  )
}

// ── Step 4: Your details ──────────────────────────────
function Step4({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <h2 className={styles.stepTitle}>Almost done — a few details</h2>
        <p className={styles.stepSub}>Your email is only used to notify you when your memory is published. It won't be shown publicly.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Your name <span className={styles.optional}>(optional)</span></label>
        <div className={styles.nameRow}>
          <button
            className={`${styles.anonBtn} ${data.anonymous ? styles.anonBtnOn : ''}`}
            onClick={() => { onChange('anonymous', true); onChange('name', '') }}
            type="button"
          >
            👤 Post anonymously
          </button>
          <button
            className={`${styles.anonBtn} ${!data.anonymous ? styles.anonBtnOn : ''}`}
            onClick={() => onChange('anonymous', false)}
            type="button"
          >
            ✏️ Use my name
          </button>
        </div>
        {!data.anonymous && (
          <input
            className={styles.input}
            placeholder="e.g. Rahul M. (initials are fine)"
            value={data.name || ''}
            onChange={e => onChange('name', e.target.value)}
            style={{ marginTop: '.65rem' }}
          />
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Email address <span className={styles.required}>*</span></label>
        <input
          type="email"
          className={styles.input}
          placeholder="your@email.com"
          value={data.email || ''}
          onChange={e => onChange('email', e.target.value)}
        />
        <div className={styles.fieldNote}>We'll notify you when your memory is reviewed and published. No spam.</div>
      </div>

      <div className={styles.reviewBox}>
        <div className={styles.reviewTitle}>📋 Your submission summary</div>
        <div className={styles.reviewRows}>
          <div className={styles.reviewRow}><span>Date</span><span>{data.date || '—'}</span></div>
          <div className={styles.reviewRow}><span>Location</span><span>{[data.city, data.country].filter(Boolean).join(', ') || '—'}</span></div>
          {data.score && <div className={styles.reviewRow}><span>Score</span><span>🎯 {data.score}</span></div>}
          <div className={styles.reviewRow}>
            <span>Sections</span>
            <span>{(data.sections || []).map(k => SECTIONS.find(s => s.key === k)?.label).join(', ') || '—'}</span>
          </div>
          <div className={styles.reviewRow}>
            <span>Questions</span>
            <span>{Object.values(data.questions || {}).reduce((a, v) => a + v.length, 0)} added</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────
export default function SubmitPage() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [data, setData] = useState({
    date: '', city: '', country: '', centre: '', score: '',
    sections: [],
    questions: {},
    name: '', email: '', anonymous: true,
  })

  function update(field, value) {
    setData(d => ({ ...d, [field]: value }))
  }

  function canNext() {
    if (step === 1) return data.date && data.city && data.country
    if (step === 2) return (data.sections || []).length > 0
    if (step === 3) return true // memories are optional
    if (step === 4) return data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    return false
  }

  async function handleSubmit() {
    setStatus('submitting')
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
      const payload = {
        type: 'memory_submission',
        date: data.date,
        city: data.city,
        country: data.country,
        centre: data.centre,
        score: data.score,
        sections: data.sections.join(', '),
        questions: JSON.stringify(data.questions),
        name: data.anonymous ? 'Anonymous' : (data.name || 'Anonymous'),
        email: data.email,
        submittedAt: new Date().toISOString(),
        siteUrl: getSiteUrl(),
      }

      // Use proxy route to avoid CORS issues
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <>
        <div className={styles.successPage}>
          <div className={styles.successInner}>
            <div className={styles.successEmoji}>🎉</div>
            <h1 className={styles.successTitle}>Memory submitted!</h1>
            <p className={styles.successSub}>
              Thank you for contributing. Your memory will be reviewed within 24 hours and published to help students across 50+ countries prepare for their exam.
            </p>
            <p className={styles.successEmail}>We'll send a confirmation to <strong>{data.email}</strong> once it's live.</p>
            <div className={styles.successActions}>
              <Link href="/memories" className={styles.successBtn}>Browse memories →</Link>
              <button className={styles.successBtnGhost} onClick={() => { setStatus('idle'); setStep(1); setData({ date:'',city:'',country:'',centre:'',score:'',sections:[],questions:{},name:'',email:'',anonymous:true }) }}>
                Submit another memory
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.pageInner}>

          {/* Header */}
          <div className={styles.header}>
            <Link href="/memories" className={styles.backLink}>← Back to memories</Link>
            <div className={styles.headerText}>
              <h1 className={styles.pageTitle}>Share your exam memory</h1>
              <p className={styles.pageSub}>Your experience helps hundreds of students prepare. Takes 5–10 minutes.</p>
            </div>
          </div>

          {/* Step bar */}
          <StepBar step={step} />

          {/* Step content */}
          <div className={styles.card}>
            {step === 1 && <Step1 data={data} onChange={update} />}
            {step === 2 && <Step2 data={data} onChange={update} />}
            {step === 3 && <Step3 data={data} onChange={update} />}
            {step === 4 && <Step4 data={data} onChange={update} />}

            {/* Navigation */}
            <div className={styles.navRow}>
              {step > 1 && (
                <button className={styles.backBtn} onClick={() => setStep(s => s - 1)} type="button">
                  ← Back
                </button>
              )}
              <div style={{ flex: 1 }} />
              {step < 4 ? (
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  type="button"
                >
                  {step === 3 ? 'Review & submit →' : 'Continue →'}
                </button>
              ) : (
                <button
                  className={`${styles.nextBtn} ${status === 'submitting' ? styles.nextBtnLoading : ''}`}
                  onClick={handleSubmit}
                  disabled={!canNext() || status === 'submitting'}
                  type="button"
                >
                  {status === 'submitting' ? (
                    <><span className={styles.spinner} /> Submitting...</>
                  ) : 'Submit memory 🎉'}
                </button>
              )}
            </div>

            {status === 'error' && (
              <div className={styles.errorMsg}>Something went wrong. Please try again.</div>
            )}
          </div>

          <div className={styles.disclaimer}>
            🔒 Your email is never shown publicly. Memories are reviewed before publishing.
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

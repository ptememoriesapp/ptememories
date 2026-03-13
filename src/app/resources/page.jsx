'use client'
// src/app/resources/page.jsx
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import Footer from '../../components/Footer'

// ── Data ──────────────────────────────────────────────

const SECTIONS = [
  {
    key: 'speaking',
    icon: '🎤',
    label: 'Speaking',
    color: '#3B82F6',
    bg: '#EFF6FF',
    dark: '#1D4ED8',
    border: '#BFDBFE',
    time: '54–67 min',
    types: [
      {
        name: 'Read Aloud',
        abbr: 'RA',
        tasks: '6–7',
        time: '30–40s prep · 30–40s response',
        affects: ['Speaking', 'Reading'],
        difficulty: 'medium',
        overview: 'Read a passage of 60–90 words aloud. The AI scores fluency, pronunciation, and oral fluency — not your accent.',
        tips: [
          'Use the prep time to scan for difficult words — don\'t start reading immediately.',
          'Pause naturally at commas and full stops. The mic picks up hesitations, not silence.',
          'Steady rhythm beats speed. If you rush, the AI scores you lower on oral fluency.',
          'If you stumble, keep going — never restart mid-sentence.',
        ],
        template: null,
      },
      {
        name: 'Repeat Sentence',
        abbr: 'RS',
        tasks: '10–12',
        time: 'Immediate response',
        affects: ['Speaking', 'Listening'],
        difficulty: 'hard',
        overview: 'Hear a sentence once and repeat it exactly. Sentences are 9–16 words. No transcript is shown.',
        tips: [
          'Don\'t try to understand — just echo. Meaning processing wastes memory bandwidth.',
          'Chunk mentally: subject | verb phrase | qualifier. Recall in that order.',
          'If you miss words, say something that fits grammatically — partial marks count.',
          'Function words (the, a, in, of) follow naturally once you have content words.',
        ],
        template: null,
      },
      {
        name: 'Describe Image',
        abbr: 'DI',
        tasks: '6–7',
        time: '25s prep · 40s response',
        affects: ['Speaking'],
        difficulty: 'medium',
        overview: 'Describe a graph, chart, diagram, map, or image in 40 seconds. You\'re scored on content, fluency, and pronunciation.',
        tips: [
          'Use prep time to identify: what type of image? What\'s the main trend or comparison?',
          'Don\'t describe every data point — state the trend, name the outlier, conclude.',
          'For maps: describe pattern (dense/sparse), then one or two specific regions.',
          'For process diagrams: describe each step in sequence using "first", "then", "finally".',
        ],
        template: 'The [chart/map/diagram] shows [topic]. Overall, [main trend or pattern]. The highest/largest [X] while the lowest/smallest [Y]. In conclusion, [key insight].',
      },
      {
        name: 'Retell Lecture',
        abbr: 'RL',
        tasks: '3–4',
        time: '10s prep · 40s response',
        affects: ['Speaking', 'Listening'],
        difficulty: 'hard',
        overview: 'Hear (and sometimes see) a 60–90 second lecture. Retell the key points in your own words.',
        tips: [
          'Note 3–4 keywords while listening — don\'t write full sentences.',
          'If a diagram or chart is shown, mention it: "The chart illustrated that..."',
          'For very technical topics: state the theme + 2 details. You don\'t need to understand to retell.',
          'Budget 35–40 seconds — the timer is visible. Don\'t go silent early.',
        ],
        template: 'The lecture discussed [topic]. The speaker explained [point 1] and [point 2]. A diagram showed [visual if any]. In conclusion, [main takeaway].',
      },
      {
        name: 'Answer Short Questions',
        abbr: 'ASQ',
        tasks: '5–6',
        time: 'Immediate response',
        affects: ['Speaking', 'Listening'],
        difficulty: 'easy',
        overview: 'A question is read aloud. Answer in 1–3 words. Tests general knowledge — biology, geography, everyday facts.',
        tips: [
          'Answer in 1–2 words. Never explain — longer answers don\'t score higher.',
          'If you don\'t know, say the closest word that fits. Silence scores zero.',
          'Common topics: biology, physics, geography, everyday objects, units of measurement.',
          '"What is the term for..." questions usually want a single technical word.',
        ],
        template: null,
      },
      {
        name: 'Respond to Situation',
        abbr: 'RTS',
        tasks: '1–2',
        time: '20s prep · 40s response',
        affects: ['Speaking'],
        difficulty: 'easy',
        overview: 'A real-world situation is described. Respond naturally as you would in that scenario — professional or casual.',
        tips: [
          'Structure: Acknowledge → State your position → Offer a solution or next step.',
          'For professional scenarios: apologize once, explain briefly, commit to resolution.',
          'Match the register — if the prompt is formal, respond formally. Don\'t over-apologize.',
          'Aim for 30–35 words — enough to demonstrate fluency without rambling.',
        ],
        template: null,
      },
    ],
  },
  {
    key: 'writing',
    icon: '✍️',
    label: 'Writing',
    color: '#F59E0B',
    bg: '#FFFBEB',
    dark: '#B45309',
    border: '#FDE68A',
    time: '54–67 min',
    types: [
      {
        name: 'Summarize Written Text',
        abbr: 'SWT',
        tasks: '2–3',
        time: '10 min per task',
        affects: ['Writing', 'Reading'],
        difficulty: 'medium',
        overview: 'Read a passage of up to 300 words and summarize it in one sentence of 5–75 words.',
        tips: [
          'One sentence only — a full stop ends the task. Use semicolons and relative clauses to combine ideas.',
          'Connectors that help: "which", "due to", "resulting in", "thereby", "whereas".',
          'Include the main idea + one supporting point — don\'t just restate the title.',
          'Under 5 words or over 75 words = zero marks. Always check your word count.',
        ],
        template: '[Main subject] [main verb] [core idea], which [consequence or supporting point], thereby [implication or conclusion].',
      },
      {
        name: 'Write Essay',
        abbr: 'WE',
        tasks: '1–2',
        time: '20 min per task',
        affects: ['Writing'],
        difficulty: 'hard',
        overview: 'Write a 200–300 word essay responding to a prompt. Common types: agree/disagree, discuss-both-views, advantages/disadvantages.',
        tips: [
          'Identify the essay type first — it determines your paragraph structure.',
          '"To what extent" = give a clear position, then qualify. Don\'t sit on the fence.',
          '"Discuss both views" = equal paragraphs for each side. Your opinion goes in the conclusion.',
          'Under 200 words = significant penalty. Aim for 240–260 to be safe.',
          'Sophisticated vocabulary counts more than vocabulary volume — one precise word beats three simple ones.',
        ],
        template: null,
        templates: {
          'Agree / Disagree': 'It is often argued that [paraphrase prompt]. While some believe [opposing view], I firmly agree/disagree that [your stance]. [Body 1: your main argument + example]. [Body 2: counter + refutation]. In conclusion, [restate stance with nuance].',
          'Discuss Both Views': 'The question of [topic] is widely debated. Proponents of [view A] argue that [reason + example]. On the other hand, those who favour [view B] contend that [reason + example]. In my opinion, [clear position with reasoning].',
          'Advantages / Disadvantages': 'There are significant advantages and disadvantages to [topic]. On the positive side, [advantage + elaboration]. However, a major drawback is [disadvantage + elaboration]. On balance, [your reasoned conclusion].',
        },
      },
    ],
  },
  {
    key: 'reading',
    icon: '📖',
    label: 'Reading',
    color: '#10B981',
    bg: '#ECFDF5',
    dark: '#065F46',
    border: '#A7F3D0',
    time: '29–30 min',
    types: [
      {
        name: 'R&W Fill in the Blanks',
        abbr: 'RWFIB',
        tasks: '5–6',
        time: 'No time limit per task',
        affects: ['Reading', 'Writing'],
        difficulty: 'hard',
        overview: 'A passage with blanks. A word bank is provided — drag the correct word into each blank.',
        tips: [
          'Check word form first (noun / verb / adjective / adverb) — wrong form = wrong answer even if the meaning is right.',
          'Read the whole sentence before choosing — context determines meaning.',
          'Collocations matter: "conduct research", "draw a conclusion", "raise awareness" — not "make research".',
          'Eliminate options that are grammatically impossible first, then choose by meaning.',
        ],
        template: null,
      },
      {
        name: 'Reading Fill in the Blanks',
        abbr: 'FIB',
        tasks: '4–5',
        time: 'No time limit per task',
        affects: ['Reading'],
        difficulty: 'medium',
        overview: 'A passage with blanks — but this time it\'s a dropdown menu, not a word bank. Each dropdown has 4–5 options.',
        tips: [
          'All dropdown options are often grammatically valid — meaning and collocations decide.',
          'Common confusion: "effect" vs "affect", "emigrate" vs "immigrate", "adopt" vs "adapt".',
          '"Adopt" = take on a practice. "Adapt" = modify to fit. "Effect" is usually a noun, "affect" a verb.',
          'Academic texts reuse formal synonyms — the correct word often echoes earlier vocabulary in the passage.',
        ],
        template: null,
      },
      {
        name: 'MCQ — Single Answer',
        abbr: 'MCQ1',
        tasks: '2–3',
        time: 'No time limit per task',
        affects: ['Reading'],
        difficulty: 'medium',
        overview: 'Read a passage and select the single correct answer from 4 options.',
        tips: [
          '"What does the author imply?" = inference question. The answer won\'t be directly stated.',
          '"Primary argument" = thesis, not a supporting detail. Scan for the author\'s main claim.',
          'Wrong options are often either too extreme ("always", "never") or too narrow (only one detail).',
          'The correct answer paraphrases the text — identical wording is usually a trap.',
        ],
        template: null,
      },
      {
        name: 'MCQ — Multiple Answers',
        abbr: 'MCQM',
        tasks: '2–3',
        time: 'No time limit per task',
        affects: ['Reading'],
        difficulty: 'hard',
        overview: 'Select all correct answers (usually 2–3). Wrong answers don\'t deduct marks — but not selecting a correct one does.',
        tips: [
          'The question always tells you how many to select — "select TWO". Stick to exactly that number.',
          'Evaluate each option independently against the passage, not against other options.',
          'Options with "always", "completely", "all" are almost always wrong in academic passages.',
          'Partial credit is awarded — even selecting one correct option earns something.',
        ],
        template: null,
      },
      {
        name: 'Reorder Paragraphs',
        abbr: 'ROP',
        tasks: '2–3',
        time: 'No time limit per task',
        affects: ['Reading'],
        difficulty: 'hard',
        overview: 'Paragraphs are presented in random order. Drag them into the correct sequence to form a coherent passage.',
        tips: [
          'Find the opener first — it introduces the topic without referring to anything prior.',
          'Find the conclusion — it summarises or resolves. Then place middle paragraphs.',
          'Pronouns are your best clue: "This", "These", "Such" always refer to the previous paragraph.',
          'Years and dates in sentences are strong ordering signals in historical passages.',
          'When two paragraphs start with similar connectives, look at the final word of the preceding para.',
        ],
        template: null,
      },
    ],
  },
  {
    key: 'listening',
    icon: '🎧',
    label: 'Listening',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    dark: '#5B21B6',
    border: '#DDD6FE',
    time: '45–57 min',
    types: [
      {
        name: 'Write from Dictation',
        abbr: 'WFD',
        tasks: '3–4',
        time: 'Played once',
        affects: ['Listening', 'Writing'],
        difficulty: 'high-impact',
        overview: 'Hear a sentence once and type it exactly. WFD carries the highest per-task marks in the entire test and affects both Listening and Writing scores.',
        tips: [
          'Write fast — content words first, function words follow naturally.',
          'Don\'t stop to think — your working memory can only hold a sentence for ~15 seconds.',
          'Check spelling in the last 5 seconds. One wrong letter = that word is wrong.',
          'Even 70% accuracy earns partial marks — always attempt, never leave blank.',
          'Practise typing from memory. Speed is the bottleneck, not comprehension.',
        ],
        template: null,
      },
      {
        name: 'Summarize Spoken Text',
        abbr: 'SST',
        tasks: '2–3',
        time: '10 min per task',
        affects: ['Listening', 'Writing'],
        difficulty: 'hard',
        overview: 'Listen to a 60–90s audio and write a summary of 50–70 words.',
        tips: [
          'Take bullet point notes while listening — 4–5 keywords max, not full sentences.',
          'Structure: main idea + 2–3 supporting points. Connect them with "which", "while", "furthermore".',
          'Including a specific number or statistic from the audio signals depth of listening.',
          'Under 50 or over 70 words = penalty. Check count before submitting.',
        ],
        template: 'The speaker discussed [main topic]. [Key point 1], while [key point 2]. Furthermore, [key point 3]. In conclusion, [speaker\'s main argument or recommendation].',
      },
      {
        name: 'Highlight Correct Summary',
        abbr: 'HCS',
        tasks: '2–3',
        time: 'No time limit',
        affects: ['Listening', 'Reading'],
        difficulty: 'medium',
        overview: 'Listen to a recording, then select the paragraph that best summarises it.',
        tips: [
          'Wrong options are usually too extreme ("completely", "entirely", "always") or too narrow.',
          'The correct option is a balanced, nuanced paraphrase — not the most dramatic one.',
          'Don\'t select an option just because it contains words you heard — check the overall meaning.',
          'If two options seem right, the one with more measured language is almost always correct.',
        ],
        template: null,
      },
      {
        name: 'Select Missing Word',
        abbr: 'SMW',
        tasks: '2–3',
        time: 'No time limit',
        affects: ['Listening'],
        difficulty: 'easy',
        overview: 'The last word or phrase of a recording is replaced by a beep. Select the option that correctly completes it.',
        tips: [
          'The answer follows logically from the final topic shift in the audio — listen actively to the end.',
          'Don\'t guess early — the last 10 seconds set up the missing word.',
          'Eliminate options that are grammatically wrong or off-topic before choosing.',
        ],
        template: null,
      },
      {
        name: 'Highlight Incorrect Words',
        abbr: 'HIW',
        tasks: '2–3',
        time: 'Played once',
        affects: ['Listening', 'Reading'],
        difficulty: 'hard',
        overview: 'A transcript is shown while audio plays. Click every word that differs from what you hear.',
        tips: [
          'Follow word-by-word — don\'t read ahead or your place is lost.',
          'Click as soon as you hear a mismatch — don\'t wait for the sentence to end.',
          'Common swaps: synonyms (exported→imported), opposites (reduce→increase), similar sounds (copper→colour).',
          'Wrong clicks penalise you — only click when you\'re confident.',
        ],
        template: null,
      },
      {
        name: 'Listening Fill in the Blanks',
        abbr: 'LFIB',
        tasks: '2–3',
        time: 'Played once',
        affects: ['Listening', 'Writing'],
        difficulty: 'medium',
        overview: 'A transcript with blanks is shown while audio plays. Type the missing words as you hear them.',
        tips: [
          'Words are spelled as you hear them — trust your ear, not your assumptions.',
          'If you miss a word, skip it and focus on the next blank. Don\'t stall.',
          'Academic lectures often contain 4–5 blanks with subject-specific vocabulary.',
          'Check spelling after the audio finishes — you have time to review.',
        ],
        template: null,
      },
      {
        name: 'Highlight Correct Summary',
        abbr: 'HCS2',
        tasks: '1–2',
        time: 'No time limit',
        affects: ['Listening'],
        difficulty: 'medium',
        overview: 'Listen to a short informal recording and answer a multiple-choice question about it.',
        tips: [
          'Informal audio = conversational tone. Listen for attitude and opinion, not just facts.',
          'The question often asks about the speaker\'s purpose or main point — not a specific detail.',
        ],
        template: null,
      },
    ],
  },
]

const SCORING_TABLE = [
  { type: 'Read Aloud',               sp: true,  wr: false, rd: true,  li: false },
  { type: 'Repeat Sentence',          sp: true,  wr: false, rd: false, li: true  },
  { type: 'Describe Image',           sp: true,  wr: false, rd: false, li: false },
  { type: 'Retell Lecture',           sp: true,  wr: false, rd: false, li: true  },
  { type: 'Answer Short Questions',   sp: true,  wr: false, rd: false, li: true  },
  { type: 'Summarize Written Text',   sp: false, wr: true,  rd: true,  li: false },
  { type: 'Write Essay',              sp: false, wr: true,  rd: false, li: false },
  { type: 'R&W Fill in Blanks',       sp: false, wr: true,  rd: true,  li: false },
  { type: 'Reading FIB',              sp: false, wr: false, rd: true,  li: false },
  { type: 'MCQ (Single)',             sp: false, wr: false, rd: true,  li: false },
  { type: 'MCQ (Multiple)',           sp: false, wr: false, rd: true,  li: false },
  { type: 'Reorder Paragraphs',       sp: false, wr: false, rd: true,  li: false },
  { type: 'Write from Dictation',     sp: false, wr: true,  rd: false, li: true  },
  { type: 'Summarize Spoken Text',    sp: false, wr: true,  rd: false, li: true  },
  { type: 'Highlight Correct Summary',sp: false, wr: false, rd: false, li: true  },
  { type: 'Highlight Incorrect Words',sp: false, wr: false, rd: true,  li: true  },
  { type: 'Listening FIB',            sp: false, wr: true,  rd: false, li: true  },
  { type: 'Select Missing Word',      sp: false, wr: false, rd: false, li: true  },
]

const DIFF_META = {
  easy:        { label: 'Straightforward', color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
  medium:      { label: 'Moderate',        color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
  hard:        { label: 'Challenging',     color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  'high-impact':{ label: 'High impact',   color: '#5B21B6', bg: '#F5F3FF', border: '#DDD6FE' },
}

// ── Components ────────────────────────────────────────

function QuestionBlock({ qt, sectionColor, sectionBorder, sectionBg, sectionDark }) {
  const [open, setOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)
  const diff = DIFF_META[qt.difficulty] || DIFF_META.medium

  return (
    <div className={styles.qBlock}>
      <button className={styles.qHeader} onClick={() => setOpen(o => !o)}>
        <div className={styles.qLeft}>
          <span className={styles.qAbbr} style={{ background: sectionBg, color: sectionDark, borderColor: sectionBorder }}>
            {qt.abbr}
          </span>
          <div>
            <div className={styles.qName}>{qt.name}</div>
            <div className={styles.qMeta}>
              <span>⏱ {qt.time}</span>
              <span>·</span>
              <span>{qt.tasks} tasks</span>
            </div>
          </div>
        </div>
        <div className={styles.qRight}>
          <div className={styles.qAffects}>
            {qt.affects.map(a => (
              <span key={a} className={styles.affectPill}>{a}</span>
            ))}
          </div>
          <span className={styles.diffPill} style={{ background: diff.bg, color: diff.color, borderColor: diff.border }}>
            {diff.label}
          </span>
          <span className={`${styles.qArrow} ${open ? styles.qArrowOpen : ''}`}>›</span>
        </div>
      </button>

      {open && (
        <div className={styles.qBody}>
          <p className={styles.qOverview}>{qt.overview}</p>

          {/* Tips */}
          <div className={styles.tipsWrap}>
            <button className={styles.tipsToggle} onClick={() => setTipOpen(o => !o)}>
              <span>💡 {tipOpen ? 'Hide tips' : `Show ${qt.tips.length} tips`}</span>
              <span className={`${styles.tipArrow} ${tipOpen ? styles.tipArrowOpen : ''}`}>›</span>
            </button>
            {tipOpen && (
              <ul className={styles.tipsList}>
                {qt.tips.map((tip, i) => (
                  <li key={i} className={styles.tipItem}>
                    <span className={styles.tipDot} style={{ background: sectionColor }} />
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Single template */}
          {qt.template && (
            <div className={styles.tplBox}>
              <div className={styles.tplLabel}>Template</div>
              <div className={styles.tplText} style={{ borderLeftColor: sectionColor }}>
                {qt.template.split(/(\[.*?\])/).map((part, i) =>
                  part.startsWith('[') ? (
                    <em key={i} className={styles.tplSlot} style={{ color: sectionDark }}>{part}</em>
                  ) : part
                )}
              </div>
            </div>
          )}

          {/* Multiple essay templates */}
          {qt.templates && (
            <div className={styles.tplMulti}>
              <div className={styles.tplLabel}>Essay templates by type</div>
              {Object.entries(qt.templates).map(([type, text]) => (
                <div key={type} className={styles.tplMultiItem}>
                  <div className={styles.tplMultiType} style={{ color: sectionDark, background: sectionBg, borderColor: sectionBorder }}>
                    {type}
                  </div>
                  <div className={styles.tplText} style={{ borderLeftColor: sectionColor }}>
                    {text.split(/(\[.*?\])/).map((part, i) =>
                      part.startsWith('[') ? (
                        <em key={i} className={styles.tplSlot} style={{ color: sectionDark }}>{part}</em>
                      ) : part
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────
export default function ResourcesPage() {
  const [activeAnchor, setActiveAnchor] = useState('speaking')
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollTo(key) {
    sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const totalTypes = SECTIONS.reduce((a, s) => a + s.types.length, 0)

  return (
    <>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>— PTE Resources</div>
          <h1 className={styles.heroTitle}>
            Tips, strategies &<br /><em>templates for every task.</em>
          </h1>
          <p className={styles.heroSub}>
            A practical guide to all {totalTypes} PTE question types — what each task involves, how it's scored, and exactly what to do in the exam room.
          </p>
          <div className={styles.heroStats}>
            {[
              { n: totalTypes, l: 'question types covered' },
              { n: '4', l: 'test sections' },
              { n: '40+', l: 'exam tips' },
              { n: '12+', l: 'copy-ready templates' },
            ].map(s => (
              <div key={s.l} className={styles.heroStat}>
                <div className={styles.heroStatN}>{s.n}</div>
                <div className={styles.heroStatL}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky anchor nav ── */}
      <div className={styles.anchorBar}>
        <div className={styles.anchorInner}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              className={`${styles.anchorChip} ${activeAnchor === s.key ? styles.anchorChipOn : ''}`}
              style={activeAnchor === s.key ? { background: s.bg, color: s.dark, borderColor: s.border } : {}}
              onClick={() => scrollTo(s.key)}
            >
              {s.icon} {s.label}
            </button>
          ))}
          <button
            className={`${styles.anchorChip} ${activeAnchor === 'scoring' ? styles.anchorChipOn : ''}`}
            onClick={() => scrollTo('scoring')}
          >
            📊 Scoring
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className={styles.content}>

        {/* Sections */}
        {SECTIONS.map(sec => (
          <section
            key={sec.key}
            id={sec.key}
            ref={el => sectionRefs.current[sec.key] = el}
            className={styles.section}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIconWrap} style={{ background: sec.bg, border: `1px solid ${sec.border}` }}>
                <span className={styles.sectionIconEmoji}>{sec.icon}</span>
              </div>
              <div>
                <h2 className={styles.sectionTitle} style={{ color: sec.dark }}>{sec.label}</h2>
                <div className={styles.sectionMeta}>
                  <span>{sec.types.length} question types</span>
                  <span>·</span>
                  <span>⏱ {sec.time}</span>
                </div>
              </div>
              <div className={styles.sectionTypeCount} style={{ background: sec.bg, color: sec.dark, borderColor: sec.border }}>
                {sec.types.map(t => t.abbr).join(' · ')}
              </div>
            </div>

            <div className={styles.qList}>
              {sec.types.map(qt => (
                <QuestionBlock
                  key={qt.abbr}
                  qt={qt}
                  sectionColor={sec.color}
                  sectionBg={sec.bg}
                  sectionDark={sec.dark}
                  sectionBorder={sec.border}
                />
              ))}
            </div>
          </section>
        ))}

        {/* ── Scoring cheat sheet ── */}
        <section
          id="scoring"
          ref={el => sectionRefs.current['scoring'] = el}
          className={styles.section}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap} style={{ background: '#F3F2EF', border: '1px solid #E8E8F0' }}>
              <span className={styles.sectionIconEmoji}>📊</span>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Scoring cheat sheet</h2>
              <div className={styles.sectionMeta}>Which tasks affect which section scores</div>
            </div>
          </div>

          <div className={styles.scoringNote}>
            Many tasks affect <strong>multiple</strong> section scores. Write from Dictation, for example, counts toward both Listening and Writing — making it the highest-leverage task in the exam.
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.scoringTable}>
              <thead>
                <tr>
                  <th className={styles.thName}>Question type</th>
                  <th className={styles.th} style={{ color: '#1D4ED8' }}>🎤 Speaking</th>
                  <th className={styles.th} style={{ color: '#B45309' }}>✍️ Writing</th>
                  <th className={styles.th} style={{ color: '#065F46' }}>📖 Reading</th>
                  <th className={styles.th} style={{ color: '#5B21B6' }}>🎧 Listening</th>
                </tr>
              </thead>
              <tbody>
                {SCORING_TABLE.map((row, i) => (
                  <tr key={i} className={styles.tr}>
                    <td className={styles.tdName}>{row.type}</td>
                    <td className={styles.td}>{row.sp ? <span className={styles.dot} style={{ background: '#3B82F6' }} /> : <span className={styles.dash}>—</span>}</td>
                    <td className={styles.td}>{row.wr ? <span className={styles.dot} style={{ background: '#F59E0B' }} /> : <span className={styles.dash}>—</span>}</td>
                    <td className={styles.td}>{row.rd ? <span className={styles.dot} style={{ background: '#10B981' }} /> : <span className={styles.dash}>—</span>}</td>
                    <td className={styles.td}>{row.li ? <span className={styles.dot} style={{ background: '#8B5CF6' }} /> : <span className={styles.dash}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.ctaWrap}>
          <div className={styles.cta}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaTitle}>See what actually appeared in recent exams</div>
              <div className={styles.ctaSub}>Browse verified memories from students who took PTE in the last 30 days — organised by the question types on this page.</div>
            </div>
            <Link href="/memories" className={styles.ctaBtn}>Browse memories →</Link>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

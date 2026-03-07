// src/components/MemoryCard.jsx
'use client'
import { useState } from 'react'
import styles from './MemoryCard.module.css'

const SECTION_META = {
  sp: { icon: '🎤', label: 'Speaking', colorVar: '--sp', bgVar: '--sp-bg', darkVar: '--sp-dark', cls: 'sp' },
  wr: { icon: '✍️', label: 'Writing',  colorVar: '--wr', bgVar: '--wr-bg', darkVar: '--wr-dark', cls: 'wr' },
  rd: { icon: '📖', label: 'Reading',  colorVar: '--rd', bgVar: '--rd-bg', darkVar: '--rd-dark', cls: 'rd' },
  li: { icon: '🎧', label: 'Listening',colorVar: '--li', bgVar: '--li-bg', darkVar: '--li-dark', cls: 'li' },
}

// ── Question Card ──────────────────────────────────────
function QuestionCard({ q, sectionKey }) {
  const meta = SECTION_META[sectionKey]
  return (
    <div className={`${styles.qCard} ${styles[`qCard_${sectionKey}`]}`}>
      <div
        className={styles.qLabel}
        style={{ color: `var(${meta.darkVar})` }}
      >
        {q.type}
      </div>

      {/* WFD gets numbered list */}
      {q.sentences ? (
        <div className={styles.wfdList}>
          {q.sentences.map((s, i) => (
            <div key={i} className={styles.wfdRow}>
              <span
                className={styles.wfdNum}
                style={{ background: `var(${meta.bgVar})`, color: `var(${meta.darkVar})` }}
              >
                {i + 1}
              </span>
              <span className={styles.wfdText}>&ldquo;{s}&rdquo;</span>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.qBody}>{q.content}</p>
      )}

      {q.tip && (
        <div className={styles.qTip}>💡 {q.tip}</div>
      )}
    </div>
  )
}

// ── Timeline Row (one section) ─────────────────────────
function TimelineRow({ sectionKey, questions, preview, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const meta = SECTION_META[sectionKey]

  return (
    <div className={`${styles.tlRow} ${open ? styles.tlRowOpen : ''}`} data-sec={sectionKey}>

      {/* Node dot */}
      <button
        className={styles.tlNode}
        onClick={() => setOpen(o => !o)}
        aria-label={`Toggle ${meta.label}`}
        style={open ? {
          background: `var(${meta.bgVar})`,
          borderColor: `var(${meta.colorVar})`,
        } : {}}
      >
        <span
          className={styles.tlNodeInner}
          style={open ? { background: `var(${meta.colorVar})`, width: 10, height: 10 } : {}}
        />
      </button>

      {/* Trigger row */}
      <div
        className={styles.tlTrigger}
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      >
        <div
          className={styles.tlSecIcon}
          style={{ background: `var(${meta.bgVar})` }}
        >
          {meta.icon}
        </div>

        {open
          ? <span className={styles.tlSecName}>{meta.label}</span>
          : <span className={styles.tlPreview}>{preview}</span>
        }

        <span className={styles.tlQPill}>{questions.length} question{questions.length !== 1 ? 's' : ''}</span>

        <span
          className={styles.tlArrow}
          style={open ? { transform: 'rotate(180deg)', background: 'var(--indigo-bg)', color: 'var(--indigo)', borderColor: 'rgba(79,70,229,.2)' } : {}}
        >
          ▲
        </span>
      </div>

      {/* Expandable content */}
      <div className={`${styles.tlContent} ${open ? styles.tlContentOpen : ''}`}>
        <div className={styles.tlContentInner}>
          {questions.map((q, i) => (
            <QuestionCard key={i} q={q} sectionKey={sectionKey} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main MemoryCard ────────────────────────────────────
export default function MemoryCard({ memory }) {
  const { name, date, location, centre, score, verified = true, sections, frequency, frequencyRange, priority } = memory

  const initials = name === 'Anonymous'
    ? 'AN'
    : name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const priorityConfig = {
    high:   { label: '🔴 High',   cls: styles.pHigh },
    medium: { label: '🟡 Medium', cls: styles.pMed  },
    low:    { label: '🟢 Low',    cls: styles.pLow  },
  }
  const pri = priorityConfig[priority] || priorityConfig.medium

  return (
    <article className={styles.card}>

      {/* Header */}
      <div className={styles.cardHeader}>
        <div
          className={styles.avatar}
          style={{ background: memory.avatarGradient || 'linear-gradient(135deg,#4F46E5,#818CF8)' }}
        >
          {initials}
        </div>

        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.meta}>
            <span>📅 {date}</span>
            <span>📍 {location}</span>
            {centre && <span>🏢 {centre}</span>}
          </div>
        </div>

        <div className={styles.badges}>
          {verified && <span className={styles.badgeVerified}>✓ Verified</span>}
          {score && <span className={styles.badgeScore}>🎯 {score}</span>}
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineBody}>
        <div className={styles.timelineTrack}>
          {sections.map((sec, i) => (
            <TimelineRow
              key={sec.key}
              sectionKey={sec.key}
              questions={sec.questions}
              preview={sec.preview}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.freqInfo}>
          <span>🔄</span>
          <span className={styles.freqCount}>{frequency} {frequency === 1 ? 'person' : 'people'}</span>
          <span>reported similar</span>
          {frequencyRange && <span className={styles.freqRange}>· {frequencyRange}</span>}
          <span className={`${styles.priorityPill} ${pri.cls}`}>{pri.label}</span>
        </div>
        <button className={styles.shareBtn} onClick={() => navigator.clipboard?.writeText(window.location.href)}>
          ↗ Share
        </button>
      </div>

    </article>
  )
}

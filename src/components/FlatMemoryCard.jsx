// src/components/FlatMemoryCard.jsx
// Flat card style matching the mockup in Image 1 — used in the Sneak Peek section
import styles from './FlatMemoryCard.module.css'

const SEC_META = {
  sp: { label: 'Speaking', color: '#1D4ED8', bg: '#EFF6FF', icon: '🎤' },
  wr: { label: 'Writing',  color: '#92400E', bg: '#FFFBEB', icon: '✍️' },
  rd: { label: 'Reading',  color: '#065F46', bg: '#F0FDF4', icon: '📖' },
  li: { label: 'Listening',color: '#5B21B6', bg: '#F5F3FF', icon: '🎧' },
}

export default function FlatMemoryCard({ memory }) {
  const { name, date, location, score, sections, frequency, frequencyRange, priority } = memory

  // Just show first question from first section for preview
  const sec = sections[0]
  const q = sec?.questions[0]
  const meta = SEC_META[sec?.key] || SEC_META.wr

  const priorityConfig = {
    high:   { label: 'High',   cls: styles.pHigh },
    medium: { label: 'Medium', cls: styles.pMed  },
    low:    { label: 'Low',    cls: styles.pLow  },
  }
  const pri = priorityConfig[priority] || priorityConfig.medium

  return (
    <div className={styles.card}>
      {/* Top row: section badge + question type + verified */}
      <div className={styles.topRow}>
        <span className={styles.secBadge} style={{ background: meta.bg, color: meta.color }}>
          {meta.icon} {meta.label}
        </span>
        <span className={styles.qType}>{q?.type}</span>
        <span className={styles.verified}>✓ Verified</span>
      </div>

      {/* Meta: date, location, name */}
      <div className={styles.metaRow}>
        <span>📅 {date}</span>
        <span>📍 {location}</span>
        <span className={styles.nameTag}>{name}</span>
      </div>

      {/* Content */}
      <p className={styles.content}>
        {q?.content?.startsWith('"')
          ? <>Essay topic: <strong>{q.content.split('—')[0].trim()}</strong>{q.content.includes('—') ? ' — ' + q.content.split('—').slice(1).join('—') : ''}</>
          : q?.content
        }
      </p>

      {/* Tip */}
      {q?.tip && (
        <div className={styles.tip}>
          <span className={styles.tipIcon}>💡</span>
          <span><strong>Tip from contributor:</strong> {q.tip}</span>
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerIcon}>🔄</span>
          <span>Reported <strong className={styles.freqNum}>{frequency} times</strong></span>
          {frequencyRange && <span className={styles.range}>{frequencyRange}</span>}
          <span className={`${styles.priPill} ${pri.cls}`}>{pri.label}</span>
        </div>
        {score && (
          <span className={styles.scoreBadge}>🎯 Score: {score}</span>
        )}
      </div>
    </div>
  )
}

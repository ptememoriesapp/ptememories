'use client'
// src/app/admin/page.jsx
import { useState, useEffect } from 'react'
import styles from './page.module.css'

const SECTION_META = {
  sp: { icon: '🎤', label: 'Speaking',  color: '#3B82F6', bg: '#EFF6FF', dark: '#1D4ED8' },
  wr: { icon: '✍️', label: 'Writing',   color: '#F59E0B', bg: '#FFFBEB', dark: '#B45309' },
  rd: { icon: '📖', label: 'Reading',   color: '#10B981', bg: '#ECFDF5', dark: '#065F46' },
  li: { icon: '🎧', label: 'Listening', color: '#8B5CF6', bg: '#F5F3FF', dark: '#5B21B6' },
}

// ── Login screen ──────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  async function handleLogin() {
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': pw },
    })
    if (res.ok) {
      onLogin(pw)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginIcon}>🔐</div>
        <h1 className={styles.loginTitle}>Admin Panel</h1>
        <p className={styles.loginSub}>PTE Memories — Review submissions</p>
        <input
          type="password"
          className={`${styles.loginInput} ${error ? styles.loginInputError : ''}`}
          placeholder="Admin password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
        />
        {error && <div className={styles.loginError}>Wrong password</div>}
        <button className={styles.loginBtn} onClick={handleLogin}>
          Enter →
        </button>
      </div>
    </div>
  )
}

// ── Submission card ───────────────────────────────────
function SubmissionCard({ sub, password, onAction }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState(sub.priority || 'medium')

  async function action(act) {
    setLoading(true)
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ id: sub.id, action: act, priority }),
      })
      onAction(sub.id, act)
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    pending:  { bg: '#FEFCE8', color: '#CA8A04', border: '#FDE68A' },
    approved: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    rejected: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  }
  const sc = statusColors[sub.status] || statusColors.pending

  return (
    <div className={`${styles.card} ${styles[`card_${sub.status}`]}`}>
      {/* Card header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={styles.cardAv} style={{ background: sub.avatar_gradient }}>
            {sub.name === 'Anonymous' ? '?' : sub.name.split(' ').map(w => w[0]).join('').slice(0,2)}
          </div>
          <div>
            <div className={styles.cardName}>{sub.name}</div>
            <div className={styles.cardMeta}>
              <span>📅 {sub.exam_date}</span>
              <span>📍 {sub.location}</span>
              {sub.score && <span>🎯 {sub.score}</span>}
            </div>
            <div className={styles.cardEmail}>{sub.submitter_email}</div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <span className={styles.statusPill} style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
            {sub.status}
          </span>
          <div className={styles.cardSections}>
            {(sub.sections || []).map(s => {
              const meta = SECTION_META[s.key]
              return (
                <span key={s.key} className={styles.secPill}
                  style={{ background: meta?.bg, color: meta?.dark }}>
                  {meta?.icon} {s.questions?.length || 0}q
                </span>
              )
            })}
          </div>
          <button className={styles.expandBtn} onClick={() => setOpen(o => !o)}>
            {open ? '▲ Hide' : '▼ Review'}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {open && (
        <div className={styles.cardBody}>
          {(sub.sections || []).sort((a,b) => a.ord - b.ord).map(sec => {
            const meta = SECTION_META[sec.key]
            return (
              <div key={sec.id} className={styles.secBlock}>
                <div className={styles.secHead} style={{ background: meta?.bg, borderColor: meta?.color + '40' }}>
                  <span>{meta?.icon}</span>
                  <span className={styles.secName} style={{ color: meta?.dark }}>{meta?.label}</span>
                  <span className={styles.secPreview}>{sec.preview}</span>
                </div>
                {(sec.questions || []).sort((a,b) => a.ord - b.ord).map((q, i) => (
                  <div key={i} className={styles.qItem} style={{ borderLeftColor: meta?.color }}>
                    <div className={styles.qType} style={{ color: meta?.dark }}>{q.type}</div>
                    {q.sentences?.length > 0 && (
                      <div className={styles.wfdList}>
                        {q.sentences.map((s, j) => (
                          <div key={j} className={styles.wfdRow}>
                            <span className={styles.wfdN} style={{ background: meta?.bg, color: meta?.dark }}>{j+1}</span>
                            <span className={styles.wfdText}>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.content && <p className={styles.qContent}>{q.content}</p>}
                    {q.tip && <div className={styles.qTip}>💡 {q.tip}</div>}
                  </div>
                ))}
              </div>
            )
          })}

          {/* Actions */}
          {sub.status === 'pending' && (
            <div className={styles.actions}>
              <div className={styles.priorityWrap}>
                <label className={styles.priorityLabel}>Priority:</label>
                <select className={styles.prioritySelect} value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
              <button
                className={`${styles.actionBtn} ${styles.approveBtn}`}
                onClick={() => action('approve')}
                disabled={loading}
              >
                {loading ? '...' : '✅ Approve'}
              </button>
              <button
                className={`${styles.actionBtn} ${styles.rejectBtn}`}
                onClick={() => action('reject')}
                disabled={loading}
              >
                {loading ? '...' : '❌ Reject'}
              </button>
            </div>
          )}
          {sub.status !== 'pending' && (
            <div className={styles.alreadyActioned}>
              This submission has been {sub.status}.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main admin page ────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('pending')

  async function fetchSubmissions(pw) {
    setLoading(true)
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-password': pw },
      })
      const data = await res.json()
      setSubmissions(data.submissions || [])
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(pw) {
    setPassword(pw)
    fetchSubmissions(pw)
  }

  function handleAction(id, action) {
    setSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, status: action === 'approve' ? 'approved' : 'rejected' } : s)
    )
  }

  if (!password) return <LoginScreen onLogin={handleLogin} />

  const counts = {
    pending:  submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  }

  const filtered = submissions.filter(s => s.status === filter)

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.sub}>PTE Memories — Review & approve submissions</p>
        </div>
        <button className={styles.refreshBtn} onClick={() => fetchSubmissions(password)}>
          ↻ Refresh
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { key: 'pending',  label: 'Pending review', color: '#CA8A04', bg: '#FEFCE8' },
          { key: 'approved', label: 'Approved',        color: '#059669', bg: '#ECFDF5' },
          { key: 'rejected', label: 'Rejected',        color: '#DC2626', bg: '#FEF2F2' },
        ].map(s => (
          <button
            key={s.key}
            className={`${styles.statCard} ${filter === s.key ? styles.statCardOn : ''}`}
            style={filter === s.key ? { background: s.bg, borderColor: s.color + '60' } : {}}
            onClick={() => setFilter(s.key)}
          >
            <div className={styles.statNum} style={{ color: s.color }}>{counts[s.key]}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className={styles.loadingMsg}>Loading submissions...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyMsg}>
          No {filter} submissions.
          {filter === 'pending' && ' 🎉 All caught up!'}
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map(sub => (
            <SubmissionCard
              key={sub.id}
              sub={sub}
              password={password}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// src/app/memories/[id]/page.jsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MEMORIES } from '../../../lib/memories'
import Footer from '../../../components/Footer'
import ShareCardModal from '../../../components/ShareCardModal'
import { getSiteUrl } from '../../../lib/siteUrl'
import styles from './page.module.css'

// Shared client cache — same request reused across pages
let _promise = null, _cache = null, _cacheTime = 0
const TTL = 5 * 60 * 1000
async function loadMemories() {
  if (_cache && Date.now() - _cacheTime < TTL) return _cache
  if (!_promise) {
    _promise = fetch('/api/memories').then(r => r.json())
      .then(d => { _cache = d; _cacheTime = Date.now(); _promise = null; return d })
      .catch(() => { _promise = null; return null })
  }
  return _promise
}

const SECTION_META = {
  sp: { icon: '🎤', label: 'Speaking',  color: '#3B82F6', bg: '#EFF6FF', dark: '#1D4ED8', border: '#BFDBFE' },
  wr: { icon: '✍️', label: 'Writing',   color: '#F59E0B', bg: '#FFFBEB', dark: '#B45309', border: '#FDE68A' },
  rd: { icon: '📖', label: 'Reading',   color: '#10B981', bg: '#ECFDF5', dark: '#065F46', border: '#A7F3D0' },
  li: { icon: '🎧', label: 'Listening', color: '#8B5CF6', bg: '#F5F3FF', dark: '#5B21B6', border: '#DDD6FE' },
}

const PRIORITY_META = {
  high:   { label: '🔴 High frequency',   bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  medium: { label: '🟡 Medium frequency', bg: '#FEFCE8', color: '#CA8A04', border: '#FDE68A' },
  low:    { label: '🟢 Low frequency',    bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
}

// ── Copyable WFD sentence ──────────────────────────────
function WFDSentence({ sentence, index, sectionKey }) {
  const [copied, setCopied] = useState(false)
  const meta = SECTION_META[sectionKey]

  function copy() {
    navigator.clipboard.writeText(sentence)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={styles.wfdRow}>
      <span className={styles.wfdNum} style={{ background: meta.bg, color: meta.dark, borderColor: meta.border }}>
        {index + 1}
      </span>
      <span className={styles.wfdText}>&ldquo;{sentence}&rdquo;</span>
      <button className={styles.copyBtn} onClick={copy} title="Copy sentence">
        {copied
          ? <span className={styles.copiedTick}>✓</span>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        }
      </button>
    </div>
  )
}

// ── Question block ─────────────────────────────────────
function QuestionBlock({ q, sectionKey }) {
  const [tipOpen, setTipOpen] = useState(false)
  const meta = SECTION_META[sectionKey]

  return (
    <div className={styles.qBlock} style={{ borderLeftColor: meta.color }}>
      <div className={styles.qType} style={{ color: meta.dark, background: meta.bg }}>
        {q.type}
      </div>

      {q.sentences ? (
        <div className={styles.wfdList}>
          {q.sentences.map((s, i) => (
            <WFDSentence key={i} sentence={s} index={i} sectionKey={sectionKey} />
          ))}
        </div>
      ) : (
        <p className={styles.qContent}>{q.content}</p>
      )}

      {q.tip && (
        <div className={styles.tipWrap}>
          <button
            className={styles.tipToggle}
            onClick={() => setTipOpen(o => !o)}
          >
            <span>💡 Show tip</span>
            <span className={`${styles.tipArrow} ${tipOpen ? styles.tipArrowOpen : ''}`}>›</span>
          </button>
          {tipOpen && (
            <div className={styles.tipBody}>{q.tip}</div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Frequency timeline ─────────────────────────────────
function FrequencyPanel({ memory }) {
  const pri = PRIORITY_META[memory.priority] || PRIORITY_META.medium
  const pct = Math.min(100, Math.round((memory.frequency / 15) * 100))

  return (
    <div className={styles.freqPanel}>
      <div className={styles.freqHeader}>
        <div className={styles.freqTitle}>📊 Recurrence & Frequency</div>
        <span className={styles.freqBadge} style={{ background: pri.bg, color: pri.color, borderColor: pri.border }}>
          {pri.label}
        </span>
      </div>

      <div className={styles.freqStats}>
        <div className={styles.freqStat}>
          <div className={styles.freqNum}>{memory.frequency}</div>
          <div className={styles.freqLabel}>students reported</div>
        </div>
        <div className={styles.freqDivider} />
        <div className={styles.freqStat}>
          <div className={styles.freqNum}>{memory.frequencyRange}</div>
          <div className={styles.freqLabel}>date range seen</div>
        </div>
        <div className={styles.freqDivider} />
        <div className={styles.freqStat}>
          <div className={styles.freqNum}>{memory.sections.length}</div>
          <div className={styles.freqLabel}>section{memory.sections.length > 1 ? 's' : ''} covered</div>
        </div>
      </div>

      <div className={styles.freqBarWrap}>
        <div className={styles.freqBarLabel}>
          <span>Frequency signal</span>
          <span>{memory.frequency} / 15 reports</span>
        </div>
        <div className={styles.freqBarBg}>
          <div
            className={styles.freqBarFill}
            style={{
              width: `${pct}%`,
              background: memory.priority === 'high' ? '#EF4444' : memory.priority === 'medium' ? '#F59E0B' : '#10B981',
            }}
          />
        </div>
        <p className={styles.freqNote}>
          Based on {memory.frequency} independent reports across different test dates and locations.
          Higher frequency = more likely to appear in your exam.
        </p>
      </div>
    </div>
  )
}

// ── Share panel ────────────────────────────────────────
function SharePanel({ memory }) {
  const [copied, setCopied] = useState(false)
  const pageUrl = `${getSiteUrl()}/memories/${memory.id}`
  const shareText = `PTE exam memory from ${memory.location} (${memory.date}) 🎯 — ${memory.sections.map(s => SECTION_META[s.key]?.label).join(', ')}. Check it on PTE Memories (free, verified):`

  function copyLink() {
    navigator.clipboard.writeText(pageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.sharePanel}>
      <div className={styles.sharePanelTitle}>📣 Share this memory</div>
      <p className={styles.sharePanelSub}>
        Help fellow students by sharing this memory with your study group.
      </p>
      <div className={styles.sharePanelBtns}>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.shareTg}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.448l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.111z"/></svg>
          Share on Telegram
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.shareWa}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Share on WhatsApp
        </a>
        <button className={`${styles.shareBtn} ${styles.shareCopy} ${copied ? styles.shareCopied : ''}`} onClick={copyLink}>
          {copied ? '✓ Copied!' : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ── Similar memories ───────────────────────────────────
function SimilarMemories({ current, allMemories }) {
  const sectionKeys = current.sections.map(s => s.key)
  const similar = allMemories
    .filter(m => m.id !== current.id && m.sections.some(s => sectionKeys.includes(s.key)))
    .slice(0, 3)

  if (!similar.length) return null

  return (
    <div className={styles.similarWrap}>
      <div className={styles.similarTitle}>🔗 Similar memories</div>
      <div className={styles.similarGrid}>
        {similar.map(m => {
          const sharedSections = m.sections.filter(s => sectionKeys.includes(s.key))
          return (
            <Link key={m.id} href={`/memories/${m.id}`} className={styles.similarCard}>
              <div className={styles.simTop}>
                <span className={styles.simAv} style={{ background: m.avatarGradient }}>{m.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>
                <div>
                  <div className={styles.simName}>{m.name}</div>
                  <div className={styles.simMeta}>{m.date} · {m.location}</div>
                </div>
                {m.score && <span className={styles.simScore}>🎯 {m.score}</span>}
              </div>
              <div className={styles.simSections}>
                {sharedSections.map(s => {
                  const meta = SECTION_META[s.key]
                  return (
                    <span key={s.key} className={styles.simSection} style={{ background: meta.bg, color: meta.dark, borderColor: meta.border }}>
                      {meta.icon} {meta.label}
                    </span>
                  )
                })}
              </div>
              <div className={styles.simArrow}>View memory →</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────
export default function MemoryDetailPage() {
  const { id } = useParams()
  const [memory, setMemory] = useState(() => MEMORIES.find(m => m.id === id) || null)
  const [allMemories, setAllMemories] = useState(MEMORIES)
  const [shareCardOpen, setShareCardOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadMemories().then(data => {
      if (cancelled || !data?.memories?.length) return
      setAllMemories(data.memories)
      const found = data.memories.find(m => m.id === id)
      if (found) setMemory(found)
    })
    return () => { cancelled = true }
  }, [id])

  if (!memory) {
    return (
      <div className={styles.notFound}>
        <div className={styles.nfInner}>
          <div className={styles.nfEmoji}>🔍</div>
          <h1 className={styles.nfTitle}>Memory not found</h1>
          <p className={styles.nfSub}>This memory may have been removed or the link is incorrect.</p>
          <Link href="/memories" className={styles.nfBtn}>← Browse all memories</Link>
        </div>
      </div>
    )
  }

  const totalQuestions = memory.sections.reduce((acc, s) => acc + s.questions.length, 0)
  const pri = PRIORITY_META[memory.priority] || PRIORITY_META.medium

  return (
    <>
      {/* ── Back nav ── */}
      <div className={styles.backBar}>
        <Link href="/memories" className={styles.backLink}>
          ← Back to all memories
        </Link>
      </div>

      {/* ── Hero header ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadges}>
              <span className={styles.verifiedBadge}>✓ Verified</span>
              <span className={styles.priPill} style={{ background: pri.bg, color: pri.color, borderColor: pri.border }}>
                {pri.label}
              </span>
              <button className={styles.shareCardBtn} onClick={() => setShareCardOpen(true)}>
                🎨 Share Card
              </button>
            </div>

            <h1 className={styles.heroTitle}>
              Exam memory — {memory.location}
            </h1>

            <div className={styles.heroMeta}>
              <span>📅 {memory.date}</span>
              <span>📍 {memory.location}</span>
              {memory.centre && <span>🏢 {memory.centre}</span>}
            </div>

            {/* Quick stats strip */}
            <div className={styles.statsStrip}>
              {[
                { icon: '📝', val: totalQuestions, label: 'questions' },
                { icon: '📚', val: memory.sections.length, label: 'section' + (memory.sections.length > 1 ? 's' : '') },
                { icon: '👥', val: `${memory.frequency} reports`, label: 'confirmed' },
              ].map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statVal}>{s.val}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
              {memory.score && (
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>🎯</span>
                  <span className={styles.statVal}>{memory.score}</span>
                  <span className={styles.statLabel}>PTE score</span>
                </div>
              )}
            </div>
          </div>

          {/* Avatar + section pills */}
          <div className={styles.heroRight}>
            <div className={styles.avatarCircle} style={{ background: memory.avatarGradient }}>
              {memory.name === 'Anonymous' ? '?' : memory.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            <div className={styles.heroName}>{memory.name}</div>
            <div className={styles.heroSectionPills}>
              {memory.sections.map(s => {
                const meta = SECTION_META[s.key]
                return (
                  <span key={s.key} className={styles.heroPill}
                    style={{ background: meta.bg, color: meta.dark, borderColor: meta.border }}>
                    {meta.icon} {meta.label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* Left column — sections */}
          <div className={styles.mainCol}>
            {memory.sections.map(section => {
              const meta = SECTION_META[section.key]
              return (
                <div key={section.key} className={styles.sectionBlock}>
                  <div className={styles.sectionHeader} style={{ background: meta.bg, borderColor: meta.border }}>
                    <span className={styles.sectionIcon} style={{ background: meta.color }}>
                      {meta.icon}
                    </span>
                    <div>
                      <div className={styles.sectionName} style={{ color: meta.dark }}>{meta.label}</div>
                      <div className={styles.sectionPreview}>{section.preview}</div>
                    </div>
                    <span className={styles.sectionCount} style={{ background: meta.bg, color: meta.dark, borderColor: meta.border }}>
                      {section.questions.length} question{section.questions.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className={styles.questionList}>
                    {section.questions.map((q, i) => (
                      <QuestionBlock key={i} q={q} sectionKey={section.key} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right sidebar */}
          <div className={styles.sidebar}>
            <FrequencyPanel memory={memory} />
            <SharePanel memory={memory} />

            {/* Submit CTA */}
            <div className={styles.submitCta}>
              <div className={styles.submitTitle}>📤 Took PTE recently?</div>
              <p className={styles.submitSub}>
                Share your exam memories and help the next student prepare. Takes 5 minutes. 100% free.
              </p>
              <Link href="/" className={styles.submitBtn}>
                Submit your memory →
              </Link>
              <div className={styles.submitNote}>Reviewed & published within 24 hours</div>
            </div>
          </div>

        </div>

        {/* Similar memories — full width */}
        <div className={styles.similarSection}>
          <SimilarMemories current={memory} allMemories={allMemories} />
        </div>
      </div>

      {shareCardOpen && (
        <ShareCardModal memory={memory} onClose={() => setShareCardOpen(false)} />
      )}

      <Footer />
    </>
  )
}

'use client'
// src/components/ShareCardModal.jsx
import { useState, useRef, useEffect } from 'react'
import styles from './ShareCardModal.module.css'
import { getSiteUrl } from '../lib/siteUrl'

const SECTION_META = {
  sp: { icon: '🎤', label: 'Speaking',  color: '#4F46E5', bg: '#EEF2FF' },
  wr: { icon: '✍️', label: 'Writing',   color: '#B45309', bg: '#FFFBEB' },
  rd: { icon: '📖', label: 'Reading',   color: '#065F46', bg: '#ECFDF5' },
  li: { icon: '🎧', label: 'Listening', color: '#5B21B6', bg: '#F5F3FF' },
}

// ── Card A: Memory Snapshot ────────────────────────────
function CardSnapshot({ memory, question, sectionKey }) {
  const meta = SECTION_META[sectionKey]
  return (
    <div className={styles.cardA} data-card>
      <div className={styles.cardATop} style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}99)` }}>
        <div className={styles.cardAEyebrow}>PTE Exam Memory</div>
        <div className={styles.cardAType}>{question.type}</div>
        <div className={styles.cardABadge} style={{ background: 'rgba(255,255,255,.18)' }}>
          {meta.icon} {meta.label}
        </div>
      </div>
      <div className={styles.cardABody}>
        {question.sentences ? (
          <div className={styles.cardAWfd}>
            {question.sentences.map((s, i) => (
              <div key={i} className={styles.cardAWfdRow}>
                <span className={styles.cardAWfdNum} style={{ background: meta.bg, color: meta.color }}>{i + 1}</span>
                <span className={styles.cardAWfdText}>&ldquo;{s}&rdquo;</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.cardAContent} style={{ borderLeftColor: meta.color }}>
            {question.content}
          </div>
        )}
        <div className={styles.cardAMeta}>
          <span>📍 {memory.location}</span>
          <span>📅 {memory.date}</span>
        </div>
      </div>
      <div className={styles.cardAFooter}>
        <div className={styles.cardABrand}>{getSiteUrl().replace('https://', '').replace('http://', '')}</div>
        <div className={styles.cardAFreq} style={{ color: '#FCD34D', background: 'rgba(252,211,77,.12)', border: '1px solid rgba(252,211,77,.2)' }}>
          🔁 {memory.frequency} reports
        </div>
      </div>
    </div>
  )
}

// ── Card D: WFD Practice ───────────────────────────────
function CardWFD({ memory, section }) {
  const allSentences = section.questions
    .filter(q => q.sentences?.length > 0)
    .flatMap(q => q.sentences)
    .slice(0, 5)

  if (!allSentences.length) return null

  return (
    <div className={styles.cardD} data-card>
      <div className={styles.cardDHeader}>
        <div className={styles.cardDWfdBg}>WFD</div>
        <div className={styles.cardDEyebrow}>PTE Memories · Write from Dictation</div>
        <div className={styles.cardDTitle}>Practise these sentences 🎧</div>
      </div>
      <div className={styles.cardDBody}>
        {allSentences.map((s, i) => (
          <div key={i} className={styles.cardDRow}>
            <div className={styles.cardDNum}>{i + 1}</div>
            <div className={styles.cardDText}>&ldquo;{s}&rdquo;</div>
          </div>
        ))}
        <div className={styles.cardDTip}>
          💡 Reported by {memory.frequency} candidates in {memory.frequencyRange}. High chance of repeat.
        </div>
      </div>
      <div className={styles.cardDFooter}>
        <div className={styles.cardDTags}>
          <span>📍 {memory.location}</span>
          <span>📅 {memory.date}</span>
          <span>🔁 {memory.frequency} reports</span>
        </div>
        <div className={styles.cardDBrand}>{getSiteUrl().replace('https://', '').replace('http://', '')}</div>
      </div>
    </div>
  )
}

// ── Question picker ────────────────────────────────────
function QuestionPicker({ memory, selected, onSelect }) {
  return (
    <div className={styles.picker}>
      <div className={styles.pickerLabel}>Pick a question to share:</div>
      <div className={styles.pickerList}>
        {memory.sections.flatMap(sec =>
          sec.questions.map((q, qi) => ({ sectionKey: sec.key, question: q, id: `${sec.key}-${qi}` }))
        ).map(item => {
          const meta = SECTION_META[item.sectionKey]
          return (
            <button
              key={item.id}
              className={`${styles.pickerItem} ${selected === item.id ? styles.pickerItemOn : ''}`}
              onClick={() => onSelect(item.id, item.question, item.sectionKey)}
              style={selected === item.id ? { borderColor: meta.color, background: meta.bg } : {}}
            >
              <span className={styles.pickerIcon} style={{ background: meta.bg }}>{meta.icon}</span>
              <span className={styles.pickerText}>
                {item.question.type}
                {item.question.sentences && <span className={styles.pickerWfdBadge}>WFD</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Modal ─────────────────────────────────────────
export default function ShareCardModal({ memory, onClose }) {
  const [cardType, setCardType] = useState('A')
  const [selectedId, setSelectedId] = useState(null)
  const [selectedQ, setSelectedQ] = useState(null)
  const [selectedSec, setSelectedSec] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [pngDataUrl, setPngDataUrl] = useState(null)
  const cardRef = useRef(null)

  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/memories/${memory.id}`

  const wfdSection = memory.sections.find(s => s.questions.some(q => q.sentences?.length > 0))
  const hasWfd = !!wfdSection

  // Auto-select first question
  useEffect(() => {
    const firstSec = memory.sections[0]
    if (firstSec?.questions[0]) {
      setSelectedId(`${firstSec.key}-0`)
      setSelectedQ(firstSec.questions[0])
      setSelectedSec(firstSec.key)
    }
  }, [memory])

  // Close on Escape
  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Generate PNG from card
  async function generatePNG() {
    if (!cardRef.current) return null
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })
      return canvas.toDataURL('image/png')
    } catch (err) {
      console.error('PNG generation failed:', err)
      return null
    }
  }

  async function downloadPNG() {
    setDownloading(true)
    const dataUrl = await generatePNG()
    if (dataUrl) {
      const link = document.createElement('a')
      link.download = `pte-memory-${memory.id}-${cardType.toLowerCase()}.png`
      link.href = dataUrl
      link.click()
      setPngDataUrl(dataUrl)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    }
    setDownloading(false)
  }

  // Build share text based on card type
  function getShareText() {
    if (cardType === 'D' && wfdSection) {
      const sentences = wfdSection.questions
        .filter(q => q.sentences?.length)
        .flatMap(q => q.sentences)
        .slice(0, 3)
        .map((s, i) => `${i + 1}. ${s}`)
        .join('\n')
      return `🎧 PTE Write from Dictation — practice these sentences!\n\n${sentences}\n\n📍 ${memory.location} · 📅 ${memory.date} · 🔁 ${memory.frequency} reports\n\nMore verified PTE memories 👇\n${pageUrl}`
    }
    // Card A
    const qText = selectedQ?.sentences
      ? selectedQ.sentences.slice(0, 2).map((s, i) => `${i + 1}. ${s}`).join('\n')
      : selectedQ?.content || ''
    return `🎯 PTE Exam Memory — ${selectedQ?.type || ''}\n\n${qText}\n\n📍 ${memory.location} · 📅 ${memory.date} · 🔁 ${memory.frequency} reports\n\nFull verified memory 👇\n${pageUrl}`
  }

  const shareText = getShareText()
  // Telegram share: text only (image needs manual attach, so we provide rich text + link)
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* Sticky header with close always visible */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.modalTitle}>🎨 Share Card</div>
            <div className={styles.modalSub}>Generate a shareable image for Telegram or WhatsApp</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Card type tabs */}
        <div className={styles.typeTabs}>
          <button
            className={`${styles.typeTab} ${cardType === 'A' ? styles.typeTabOn : ''}`}
            onClick={() => setCardType('A')}
          >
            <span className={styles.typeTabIcon}>✨</span>
            <div>
              <div className={styles.typeTabName}>Memory Snapshot</div>
              <div className={styles.typeTabDesc}>Single question card</div>
            </div>
          </button>
          <button
            className={`${styles.typeTab} ${cardType === 'D' ? styles.typeTabOn : ''} ${!hasWfd ? styles.typeTabDisabled : ''}`}
            onClick={() => hasWfd && setCardType('D')}
          >
            <span className={styles.typeTabIcon}>🎧</span>
            <div>
              <div className={styles.typeTabName}>WFD Practice</div>
              <div className={styles.typeTabDesc}>{hasWfd ? 'Dictation sentences' : 'No WFD in this memory'}</div>
            </div>
          </button>
        </div>

        {/* Scrollable body */}
        <div className={styles.modalBody}>

          {/* Left: card preview */}
          <div className={styles.previewCol}>
            <div className={styles.previewLabel}>Preview</div>
            <div className={styles.previewStage}>
              <div ref={cardRef}>
                {cardType === 'A' && selectedQ && selectedSec && (
                  <CardSnapshot memory={memory} question={selectedQ} sectionKey={selectedSec} />
                )}
                {cardType === 'D' && wfdSection && (
                  <CardWFD memory={memory} section={wfdSection} />
                )}
              </div>
            </div>
          </div>

          {/* Right: controls */}
          <div className={styles.controlCol}>
            {cardType === 'A' && (
              <QuestionPicker
                memory={memory}
                selected={selectedId}
                onSelect={(id, q, sec) => { setSelectedId(id); setSelectedQ(q); setSelectedSec(sec) }}
              />
            )}
            {cardType === 'D' && (
              <div className={styles.wfdInfo}>
                <div className={styles.wfdInfoIcon}>🎧</div>
                <div className={styles.wfdInfoText}>
                  Shows all Write from Dictation sentences as a practice card. People pin these in study groups!
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className={styles.actionBtns}>
              <button
                className={`${styles.actionBtn} ${styles.actionDownload} ${downloading ? styles.actionLoading : ''} ${downloaded ? styles.actionDone : ''}`}
                onClick={downloadPNG}
                disabled={downloading}
              >
                {downloading ? (
                  <><span className={styles.spinner} /> Generating...</>
                ) : downloaded ? (
                  <>✓ Downloaded! Now share it</>
                ) : (
                  <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PNG</>
                )}
              </button>

              <a href={tgUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.actionTg}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.448l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.111z"/></svg>
                Share on Telegram
              </a>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.actionWa}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
            </div>

            <p className={styles.modalNote}>
              💡 Download the PNG → then attach it manually in Telegram/WhatsApp with the link for best reach.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

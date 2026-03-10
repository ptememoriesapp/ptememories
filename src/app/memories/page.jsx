// src/app/memories/page.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import MemoryCard from '../../components/MemoryCard'
import WaitlistForm from '../../components/WaitlistForm'
import { MEMORIES, getMemoriesBySection } from '../../lib/memories'
import styles from './page.module.css'
import Footer from '../../components/Footer'

const FILTERS = [
  { key: 'all', label: 'All sections' },
  { key: 'sp',  label: '🎤 Speaking' },
  { key: 'wr',  label: '✍️ Writing' },
  { key: 'rd',  label: '📖 Reading' },
  { key: 'li',  label: '🎧 Listening' },
]

export default function MemoriesPage() {
  const [active, setActive] = useState('all')
  const filtered = getMemoriesBySection(active)

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>— Sample Memories</div>
          <h1 className={styles.title}>Browse Exam Memories</h1>
          <p className={styles.sub}>
            Real memories from verified PTE students. The full platform launches soon with 1,200+ more.
            See what&apos;s repeating and where to focus.
          </p>
          <div className={styles.statsRow}>
            {[
              { n: '25', l: 'sample memories' },
              { n: '14', l: 'countries' },
              { n: 'Feb–Mar 2026', l: 'exam dates' },
              { n: '100%', l: 'admin verified' },
            ].map(s => (
              <div key={s.l} className={styles.stat}>
                <strong>{s.n}</strong> {s.l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          <span className={styles.filterLabel}>Filter:</span>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.chip} ${active === f.key ? styles.chipOn : ''} ${active === f.key && f.key !== 'all' ? styles[`chip_${f.key}`] : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>

          {/* Preview banner */}
          <div className={styles.banner}>
            <span className={styles.bannerIcon}>🔒</span>
            <span>
              Viewing <strong>25 sample memories</strong>. Full platform launches soon with{' '}
              <strong>1,200+ verified memories</strong> — searchable, filterable, always free.{' '}
              <Link href="/" className={styles.bannerLink}>Join the waitlist →</Link>
            </span>
          </div>

          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              Showing <strong>{filtered.length}</strong> memor{filtered.length === 1 ? 'y' : 'ies'}
            </span>
          </div>

          <div className={styles.grid}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                No sample memories for this section yet. <Link href="/" className={styles.bannerLink}>Join waitlist</Link> to be notified at launch.
              </div>
            ) : (
              filtered.map(m => <MemoryCard key={m.id} memory={m} />)
            )}
          </div>

          {/* Bottom CTA strip */}
          <div className={styles.joinStrip}>
            <div className={styles.stripEarly}>🔥 Join early access — help shape the platform.</div>
            <h3 className={styles.stripTitle}>1,200+ more memories <em>coming.</em></h3>
            <p className={styles.stripSub}>Get notified when the full platform launches.</p>
            <div className={styles.stripForm}>
              <WaitlistForm source="memories" theme="dark" placeholder="your@email.com" btnText="Join Waitlist →" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

// src/app/page.jsx
import Link from 'next/link'
import WaitlistForm from '../components/WaitlistForm'
import { MEMORIES } from '../lib/memories'
import styles from './page.module.css'
import Footer from '../components/Footer'

const TICKER_ITEMS = [
  'Write Essay: Arts vs Sciences Funding',
  'Retell Lecture: Habit Formation',
  'WFD: University postgraduate programs',
  'Describe Image: Renewable energy chart',
  'Read Aloud: Coral reef restoration',
  'SST: Remote work & urban real estate',
  'Reorder: Public libraries history',
  'FIB: Social media & self-esteem',
  'Write Essay: Organic farming subsidies',
  'WFD: Carbon emission regulations',
]

export default function HomePage() {
  const previewMemories = MEMORIES.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.eyebrow}>🎓 For PTE students, by PTE students</div>
            <h1 className={styles.heroTitle}>
              Real exam memories.<br />
              <em>Verified. Organised.</em><br />
              Free forever.
            </h1>
            <p className={styles.heroSub}>
              PTE students share what they remember after their exam. Every memory is admin-verified and organised by section, date, and question type. No Telegram chaos. No fake upvotes. Just real data.
            </p>
            <div className={styles.earlyAccess}>🔥 Join early access — help shape the platform.</div>
            <WaitlistForm source="hero" placeholder="Enter your email address" btnText="Join Waitlist →" />
            <p className={styles.formNote}>🔒 No spam. One launch email. Unsubscribe anytime.</p>

            <div className={styles.wlStrip}>
              <div className={styles.wlAvatars}>
                {[
                  { bg: '#4F46E5', l: 'A' },
                  { bg: '#059669', l: 'R' },
                  { bg: '#F59E0B', l: 'S' },
                  { bg: '#8B5CF6', l: 'P' },
                  { bg: '#3B82F6', l: 'M' },
                ].map((av, i) => (
                  <span key={i} className={styles.wlAv} style={{ background: av.bg }}>{av.l}</span>
                ))}
              </div>
              <span className={styles.wlText}>Joined by <strong>47+ students</strong> from 50+ countries</span>
            </div>
          </div>

          {/* Right: stats + mini card */}
          <div className={styles.heroRight}>
            <div className={styles.heroStats}>
              {[
                { num: '1.2k+', label: 'Verified memories' },
                { num: '58+',   label: 'Countries' },
                { num: '24h',   label: 'Review time' },
                { num: '100%',  label: 'Always free' },
              ].map(s => (
                <div key={s.label} className={styles.hsStat}>
                  <div className={styles.hsNum}>{s.num}</div>
                  <div className={styles.hsLabel}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.miniCard}>
              <div className={styles.mcHeader}>
                <div className={styles.mcAv} style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)' }}>RM</div>
                <div>
                  <div className={styles.mcName}>Rahul M.</div>
                  <div className={styles.mcMeta}>📅 1 Mar 2026 · 📍 Delhi, India</div>
                </div>
                <div className={styles.mcBadges}>
                  <span className={styles.mcVer}>✓ Verified</span>
                  <span className={styles.mcScore}>🎯 79</span>
                </div>
              </div>
              <div className={styles.mcSec}>
                <span className={styles.mcSecIcon} style={{ background: 'var(--sp-bg)' }}>🎤</span>
                <span className={styles.mcSecName}>Speaking</span>
                <span className={styles.mcQPill}>3 questions</span>
                <span className={styles.mcArr}>▼</span>
              </div>
              <div className={styles.mcBody}>
                {[
                  { label: 'Read Aloud', text: 'Coral reef restoration, ocean temp impacts. ~60 words. Difficult: "calcification".' },
                  { label: 'Retell Lecture', text: 'Habit formation, Pavlov\'s conditioning. Loop diagram: cue → routine → reward.' },
                ].map(q => (
                  <div key={q.label} className={styles.mcQCard}>
                    <div className={styles.mcQLabel}>{q.label}</div>
                    <div className={styles.mcQText}>{q.text}</div>
                  </div>
                ))}
              </div>
              <div className={styles.mcFooter}>
                <span className={styles.mcFreq}>🔄 6 people confirmed</span>
                <span className={styles.mcPri}>🔴 High</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.tickerWrap}>
        <div className={styles.tickerInner}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerDot}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM / SOLUTION */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sEyebrow}>— The Problem</div>
          <h2 className={styles.sTitle}>PTE prep is harder<br />than it needs to be.</h2>
          <p className={styles.sSub}>The memories exist. They&apos;re just scattered, unverified, and impossible to use.</p>
          <div className={styles.psGrid}>
            <div className={`${styles.psCard} ${styles.psBad}`}>
              <div className={styles.psLabel}>❌ Right Now</div>
              {[
                'Memories buried across 10+ Telegram groups — unsearchable, unverified',
                'Clickable upvotes anyone can manipulate — zero authenticity',
                'No date organization — 2022 data looks the same as this week\'s',
                'No quality control — spam, fakes, incomplete entries everywhere',
                'Hours wasted scrolling the night before your exam, underprepared',
              ].map(item => (
                <div key={item} className={styles.psItem}>
                  <span className={`${styles.psIcon} ${styles.psIconBad}`}>✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className={`${styles.psCard} ${styles.psGood}`}>
              <div className={styles.psLabel}>✅ With PTE Memories</div>
              {[
                'One organized, searchable platform — filter by section, date, question type instantly',
                'Frequency tracking — "9 people on 9 different dates confirmed this" is real data',
                'Date-first organization — always see what\'s appearing in exams this week',
                'Every memory admin-verified before publishing — zero noise, only quality',
                'Walk into your exam knowing exactly what\'s repeating and where to focus',
              ].map(item => (
                <div key={item} className={styles.psItem}>
                  <span className={`${styles.psIcon} ${styles.psIconGood}`}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sEyebrow}>— How It Works</div>
          <h2 className={styles.sTitle}>Three steps.<br />Zero friction.</h2>
          <p className={styles.sSub}>No accounts needed. No passwords. Just share and browse.</p>
          <div className={styles.hiwSteps}>
            {[
              { icon: '🎓', num: '1', title: 'Take your PTE exam', desc: 'At any Pearson VUE test centre worldwide. India, Australia, Canada, UK — wherever you are, your memory counts.' },
              { icon: '📝', num: '2', title: 'Share what you remember', desc: 'Fill a smart 4-step form. Add question types, tips, and optionally your score. No account needed. Takes 5 minutes.' },
              { icon: '✅', num: '3', title: 'We verify & publish', desc: 'Every submission reviewed within 24 hours. Only quality memories go live. You get an email when your memory is published.' },
            ].map(step => (
              <div key={step.num} className={styles.hiwStep}>
                <div className={styles.hiwBgNum}>{step.num}</div>
                <span className={styles.hiwIcon}>{step.icon}</span>
                <div className={styles.hiwTitle}>{step.title}</div>
                <div className={styles.hiwDesc}>{step.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/how-it-works" className={styles.textLink}>Learn more about the process →</Link>
          </div>
        </div>
      </section>

      {/* SNEAK PEEK */}
      <section className={styles.peekSection}>
        <div className={styles.peekInner}>
          <div className={styles.peekLeft}>
            <div className={styles.sEyebrow}>— Sneak Peek</div>
            <h2 className={styles.peekTitle}>See what&apos;s inside.</h2>
            <p className={styles.peekSub}>Every memory is structured, verified, and organized so you find what you need in seconds — not after scrolling 500 messages.</p>
            <div className={styles.peekCta}>
              <Link href="/memories" className={styles.viewAllBtn}>Browse all memories →</Link>
            </div>
          </div>

          {/* Browser Mockup wrapping real MemoryCards */}
          <div className={styles.mockupWrap}>
            <div className={styles.browserMockup}>
              {/* Chrome bar */}
              <div className={styles.chromeBar}>
                <div className={styles.chromeDots}>
                  <span className={styles.dotR} />
                  <span className={styles.dotY} />
                  <span className={styles.dotG} />
                </div>
                <div className={styles.chromeUrl}>/memories</div>
                <div className={styles.chromeSecure}>🔒 Secure</div>
              </div>

              {/* Filter chips inside mockup */}
              <div className={styles.mockupFilters}>
                <span className={`${styles.mfChip} ${styles.mfChipOn}`}>All</span>
                <span className={styles.mfChip}>✏️ Speaking</span>
                <span className={styles.mfChip}>✍️ Writing</span>
                <span className={styles.mfChip}>📖 Reading</span>
                <span className={styles.mfChip}>🎧 Listening</span>
                <span className={styles.mfSearch}>🔍 Search memories...</span>
              </div>

              {/* Compact preview cards inside mockup — 1 expanded, 1 collapsed */}
              <div className={styles.mockupCards}>

                {/* Card 1 — Rahul — Speaking section OPEN with question content */}
                <div className={styles.previewCard}>
                  <div className={styles.pcHeader}>
                    <div className={styles.pcAvatar} style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)' }}>RM</div>
                    <div className={styles.pcInfo}>
                      <div className={styles.pcName}>Rahul M.</div>
                      <div className={styles.pcMeta}>📅 1 Mar 2026 &nbsp;📍 Delhi, India</div>
                    </div>
                    <span className={styles.pcVerified}>✓ Verified</span>
                    <span className={styles.pcScore}>🎯 79</span>
                  </div>

                  {/* Speaking — OPEN */}
                  <div className={styles.pcSections}>
                    <div className={`${styles.pcSecRow} ${styles.pcSecOpen}`}>
                      <span className={styles.pcDot} style={{ borderColor: '#3B82F6', background: '#EFF6FF' }}><span style={{ background: '#3B82F6' }} /></span>
                      <span className={styles.pcSecIcon} style={{ background: '#EFF6FF' }}>✏️</span>
                      <span className={styles.pcSecName}>Speaking</span>
                      <span className={styles.pcQCount}>3 questions</span>
                      <span className={`${styles.pcArrow} ${styles.pcArrowOpen}`}>▼</span>
                    </div>

                    {/* Expanded question cards */}
                    <div className={styles.pcExpanded}>
                      <div className={styles.pcQCard} style={{ borderLeftColor: '#3B82F6' }}>
                        <div className={styles.pcQLabel} style={{ color: '#1D4ED8' }}>READ ALOUD</div>
                        <div className={styles.pcQText}>Coral reef restoration, ocean temp impacts. ~60 words. Difficult: &ldquo;calcification&rdquo;.</div>
                      </div>
                      <div className={styles.pcQCard} style={{ borderLeftColor: '#3B82F6' }}>
                        <div className={styles.pcQLabel} style={{ color: '#1D4ED8' }}>RETELL LECTURE</div>
                        <div className={styles.pcQText}>Habit formation, Pavlov&apos;s conditioning. Loop diagram: cue → routine → reward.</div>
                      </div>
                    </div>

                    {/* Writing — collapsed */}
                    <div className={styles.pcSecRow}>
                      <span className={styles.pcDot}><span /></span>
                      <span className={styles.pcSecIcon} style={{ background: '#FFFBEB' }}>✍️</span>
                      <span className={styles.pcSecName}>Writing</span>
                      <span className={styles.pcQCount}>2 questions</span>
                      <span className={styles.pcArrow}>▲</span>
                    </div>
                  </div>

                  <div className={styles.pcFooter}>
                    <span className={styles.pcFreq}>🔄 <strong>6 people confirmed</strong></span>
                    <span className={styles.pcPri}>🔴 High</span>
                  </div>
                </div>

                {/* Card 2 — Priya — collapsed preview */}
                <div className={styles.previewCard}>
                  <div className={styles.pcHeader}>
                    <div className={styles.pcAvatar} style={{ background: 'linear-gradient(135deg,#059669,#34D399)' }}>PS</div>
                    <div className={styles.pcInfo}>
                      <div className={styles.pcName}>Priya S.</div>
                      <div className={styles.pcMeta}>📅 27 Feb 2026 &nbsp;📍 Melbourne, Australia</div>
                    </div>
                    <span className={styles.pcVerified}>✓ Verified</span>
                    <span className={styles.pcScore}>🎯 86</span>
                  </div>
                  <div className={styles.pcSections}>
                    <div className={styles.pcSecRow}>
                      <span className={styles.pcDot}><span /></span>
                      <span className={styles.pcSecIcon} style={{ background: '#F5F3FF' }}>🎧</span>
                      <span className={styles.pcSecName}>Listening</span>
                      <span className={styles.pcQCount}>3 questions</span>
                      <span className={styles.pcArrow}>▲</span>
                    </div>
                    <div className={styles.pcSecRow}>
                      <span className={styles.pcDot}><span /></span>
                      <span className={styles.pcSecIcon} style={{ background: '#F0FDF4' }}>📖</span>
                      <span className={styles.pcSecName}>Reading</span>
                      <span className={styles.pcQCount}>3 questions</span>
                      <span className={styles.pcArrow}>▲</span>
                    </div>
                  </div>
                  <div className={styles.pcFooter}>
                    <span className={styles.pcFreq}>🔄 <strong>9 people reported similar</strong> · Jan–Mar 2026</span>
                    <span className={styles.pcPri}>🔴 High</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sEyebrow}>— What You Get</div>
          <h2 className={styles.sTitle}>Built for serious<br />PTE students.</h2>
          <div className={styles.featGrid}>
            {[
              { icon: '📅', title: 'Date-wise memories', desc: 'Always see what\'s appearing in exams this week. Never rely on outdated data again.' },
              { icon: '🔄', title: 'Frequency tracking', desc: 'How many independent people reported the same question on different dates. Real signal, not fake clicks.' },
              { icon: '✅', title: 'Admin verified', desc: 'Every memory reviewed by a human before publishing. Zero spam, zero fake entries, ever.' },
              { icon: '🔍', title: 'Powerful filters', desc: 'Filter by section, question type, date range, and score. Find exactly what you need in seconds.' },
              { icon: '👤', title: 'No account needed', desc: 'Share with just your email. Browse with nothing at all. No login walls, ever.' },
              { icon: '💯', title: '100% free forever', desc: 'No subscription. No paywall. Community-driven and free for every PTE student, always.' },
            ].map(f => (
              <div key={f.title} className={styles.featCard}>
                <div className={styles.featIcon}>{f.icon}</div>
                <div className={styles.featTitle}>{f.title}</div>
                <div className={styles.featDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Be first to know<br />when we <em>launch.</em></h2>
        <p className={styles.ctaSub}>Join students from India, Australia, Canada, UK and 50+ countries.</p>
        <div className={styles.ctaFormWrap}>
          <div className={styles.earlyAccessDark}>🔥 Join early access — help shape the platform.</div>
          <WaitlistForm source="cta" theme="dark" placeholder="your@email.com" btnText="Notify Me →" />
          <p className={styles.ctaNote}>No spam. One launch email. That&apos;s it.</p>
        </div>
      </section>

      <Footer />
    </>
  )
}

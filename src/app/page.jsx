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
              Real PTE exam memories.<br />
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
                { num: '58+', label: 'Countries' },
                { num: '24h', label: 'Review time' },
                { num: '100%', label: 'Always free' },
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

            {/* Section pills - visible always */}
            <div className={styles.peekPills}>
              <span className={styles.peekPill} style={{ background: '#EEF2FF', color: '#4F46E5' }}>🎤 Speaking</span>
              <span className={styles.peekPill} style={{ background: '#FFFBEB', color: '#B45309' }}>✍️ Writing</span>
              <span className={styles.peekPill} style={{ background: '#ECFDF5', color: '#065F46' }}>📖 Reading</span>
              <span className={styles.peekPill} style={{ background: '#F5F3FF', color: '#5B21B6' }}>🎧 Listening</span>
            </div>

            {/* Mobile-only mini cards */}
            <div className={styles.mobilePeekCards}>
              <div className={styles.mpc}>
                <div className={styles.mpcTop}>
                  <div className={styles.mpcAv} style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)' }}>RM</div>
                  <div className={styles.mpcInfo}>
                    <span className={styles.mpcName}>Rahul M.</span>
                    <span className={styles.mpcMeta}>📅 1 Mar 2026 · Delhi, India</span>
                  </div>
                  <span className={styles.mpcScore}>🎯 79</span>
                </div>
                <div className={styles.mpcSection} style={{ borderLeft: '3px solid #3B82F6' }}>
                  <span className={styles.mpcSecLabel}>🎤 Speaking · READ ALOUD</span>
                  <p className={styles.mpcSecText}>Coral reef restoration, ocean temp impacts. ~60 words. Difficult: "calcification".</p>
                </div>
                <div className={styles.mpcFooter}>
                  <span className={styles.mpcFreq}>6 people confirmed</span>
                  <span className={styles.mpcHigh}>🔴 High frequency</span>
                </div>
              </div>
              <div className={styles.mpc}>
                <div className={styles.mpcTop}>
                  <div className={styles.mpcAv} style={{ background: 'linear-gradient(135deg,#059669,#34D399)' }}>PS</div>
                  <div className={styles.mpcInfo}>
                    <span className={styles.mpcName}>Priya S.</span>
                    <span className={styles.mpcMeta}>📅 27 Feb 2026 · Melbourne</span>
                  </div>
                  <span className={styles.mpcScore}>🎯 86</span>
                </div>
                <div className={styles.mpcSection} style={{ borderLeft: '3px solid #8B5CF6' }}>
                  <span className={styles.mpcSecLabel}>🎧 Listening · WRITE FROM DICT.</span>
                  <p className={styles.mpcSecText}>The university offers postgraduate programs in engineering and applied sciences.</p>
                </div>
                <div className={styles.mpcFooter}>
                  <span className={styles.mpcFreq}>9 people confirmed</span>
                  <span className={styles.mpcHigh}>🔴 High frequency</span>
                </div>
              </div>
            </div>

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

      {/* MEMORY DISCOVERY — drives clicks to /memories */}
      <section className={styles.discoverSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sEyebrow}>— Browse by Section</div>
          <h2 className={styles.sTitle}>What&apos;s in the <em>memory bank?</em></h2>
          <p className={styles.discoverSub}>Filter by your weak section. See the most reported questions. Arrive prepared.</p>
          <div className={styles.sectionCards}>
            {[
              { icon: '🎤', label: 'Speaking', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE', types: ['Read Aloud', 'Retell Lecture', 'Describe Image', 'Short Answer'], count: '340+' },
              { icon: '✍️', label: 'Writing', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A', types: ['Write Essay', 'Summarize Text'], count: '210+' },
              { icon: '📖', label: 'Reading', color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', types: ['FIB', 'R&W FIB', 'Reorder Paragraphs', 'MCQ'], count: '290+' },
              { icon: '🎧', label: 'Listening', color: '#5B21B6', bg: '#F5F3FF', border: '#DDD6FE', types: ['Write from Dictation', 'Summarize Spoken', 'HCS', 'FIB'], count: '360+' },
            ].map(s => (
              <Link href="/memories" key={s.label} className={styles.sCard} style={{ '--sc': s.color, '--sbg': s.bg, '--sborder': s.border }}>
                <div className={styles.sCardTop}>
                  <span className={styles.sCardIcon} style={{ background: s.bg, border: `1px solid ${s.border}` }}>{s.icon}</span>
                  <div>
                    <div className={styles.sCardLabel} style={{ color: s.color }}>{s.label}</div>
                    <div className={styles.sCardCount}>{s.count} memories</div>
                  </div>
                  <span className={styles.sCardArrow} style={{ color: s.color }}>→</span>
                </div>
                <div className={styles.sCardTypes}>
                  {s.types.map(t => (
                    <span key={t} className={styles.sCardType} style={{ background: s.bg, color: s.color, borderColor: s.border }}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.discoverCta}>
            <Link href="/memories" className={styles.discoverBtn}>
              View All 1,200+ Memories →
            </Link>
            <span className={styles.discoverNote}>No account needed · Free forever</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sEyebrow}>— Early Reactions</div>
          <h2 className={styles.sTitle}>Students who <em>get it.</em></h2>
          <div className={styles.testimonialGrid}>
            {[
              {
                quote: "Finally! I've been spending hours scrolling Telegram groups before every attempt. This is exactly what the PTE community needed.",
                name: 'Ananya R.',
                detail: 'PTE scorer · 79 · India',
                flag: '🇮🇳',
                avatar: '#4F46E5',
                initials: 'AR',
                stars: 5,
              },
              {
                quote: "The way it's organised by section and question type is brilliant. I can just focus on my weak areas. Writing was killing me — now I know what essays to expect.",
                name: 'James T.',
                detail: 'PTE scorer · 82 · Australia',
                flag: '🇦🇺',
                avatar: '#059669',
                initials: 'JT',
                stars: 5,
              },
              {
                quote: "I shared it with my study group and everyone loved it. The verification part is what sold them — no more fake memories from people trying to mislead others.",
                name: 'Priya M.',
                detail: 'PTE scorer · 90 · Canada',
                flag: '🇨🇦',
                avatar: '#F59E0B',
                initials: 'PM',
                stars: 5,
              },
              {
                quote: "Been waiting for something like this since my first attempt. The frequency count is such a smart idea — you can tell which questions are actually repeating.",
                name: 'Rahul S.',
                detail: 'PTE scorer · 76 · UK',
                flag: '🇬🇧',
                avatar: '#8B5CF6',
                initials: 'RS',
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className={styles.tCard}>
                <div className={styles.tStars}>{'★'.repeat(t.stars)}</div>
                <p className={styles.tQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.tAuthor}>
                  <span className={styles.tAv} style={{ background: t.avatar }}>{t.initials}</span>
                  <div>
                    <div className={styles.tName}>{t.flag} {t.name}</div>
                    <div className={styles.tDetail}>{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Be first to know<br />when we <em>launch.</em></h2>
        <p className={styles.ctaSub}>Join students from India, Australia, Canada, UK and 50+ countries.</p>
        <div className={styles.ctaFormWrap}>
          <div className={styles.earlyAccessDark}>🔥 Join early access — help shape the platform.</div>
          <WaitlistForm source="cta" theme="dark" placeholder="your@email.com" btnText="Notify Me →" />
          <p className={styles.ctaNote}>No spam. One launch email. That&apos;s it.</p>
        </div>
      </section>

      {/* SHARE STRIP */}
      <section className={styles.shareStrip}>
        <div className={styles.shareInner}>
          <div className={styles.shareLeft}>
            <span className={styles.shareEmoji}>💬</span>
            <div>
              <div className={styles.shareTitle}>Know someone preparing for PTE?</div>
              <div className={styles.shareSub}>Share PTE Memories with your study group — it takes 5 seconds.</div>
            </div>
          </div>
          <div className={styles.shareBtns}>
            <a
              href="https://t.me/share/url?url=https%3A%2F%2Fptememories.com&text=Found%20this%20free%20site%20that%20has%20verified%20PTE%20exam%20memories%20organised%20by%20section%20and%20question%20type.%20Way%20better%20than%20scrolling%20Telegram%20groups%20%F0%9F%99%8C"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareTelegram}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.448l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.111z" /></svg>
              Share on Telegram
            </a>
            <a
              href="https://wa.me/?text=Found%20this%20free%20site%20with%20verified%20PTE%20exam%20memories%20organised%20by%20section%20%F0%9F%8E%AF%20Way%20better%20than%20Telegram%20chaos!%20https%3A%2F%2Fptememories.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareWhatsapp}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Share on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

    </>
  )
}

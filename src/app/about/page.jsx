// src/app/about/page.jsx
import Link from 'next/link'
import styles from './page.module.css'
import Footer from '../../components/Footer'

const VALUES = [
  { icon: '🔍', name: 'Authentic over Popular', desc: 'We track real reports from real exam dates. A question seen by 2 people last week matters more than one "upvoted" 100 times three years ago.' },
  { icon: '🧹', name: 'Quality over Quantity', desc: 'Every memory goes through human review before publishing. We\'d rather have 500 high-quality memories than 5,000 noisy ones.' },
  { icon: '⚡', name: 'Simple by Design', desc: 'No accounts, no unnecessary features, no complexity. If it doesn\'t directly help students prepare, it doesn\'t belong in the product.' },
  { icon: '🌍', name: 'Global but Local', desc: 'PTE is taken worldwide. Our platform reflects that — see what\'s appearing in Australia, India, Canada, and 50+ other countries.' },
  { icon: '🔒', name: 'Privacy Respected', desc: 'Anonymous submissions are fully anonymous. We never sell or share student data. Emails are used only for verification — nothing else.' },
  { icon: '💯', name: 'Free Forever', desc: 'No premium tier. No ads. No "pro plan". The full platform is free for every PTE student, always. This is a commitment, not just a promise.' },
]

const ROADMAP = [
  { status: 'done',    text: 'Design system & memory card UI',             date: 'Done' },
  { status: 'done',    text: 'Landing page & waitlist',                     date: 'Done' },
  { status: 'done',    text: 'Memories browse page + 6 sample cards',       date: 'Done' },
  { status: 'done',    text: 'Next.js migration — App Router + CSS Modules', date: 'Done' },
  { status: 'active',  text: 'Submission form — 4-step smart form',          date: 'In progress' },
  { status: 'active',  text: 'Admin review panel — verify & publish',        date: 'In progress' },
  { status: 'pending', text: 'Seed content — 15–20 real memories pre-launch',date: 'Q2 2026' },
  { status: 'pending', text: 'Email notifications — confirmation + live link',date: 'Q2 2026' },
  { status: 'pending', text: 'Public launch — shared in Telegram & forums',   date: 'Q2 2026' },
  { status: 'pending', text: 'Search & filters — full-text, date, country',   date: 'Q3 2026' },
  { status: 'pending', text: 'Most Reported — auto-ranked by 30-day frequency',date: 'Q3 2026' },
]

export default function AboutPage() {
  return (
    <>
      <div className={styles.aboutHero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>— About Us</div>
          <h1 className={styles.title}>Built because we were<br />frustrated <em>too.</em></h1>
          <p className={styles.intro}>
            PTE students have always shared their exam memories — in Telegram groups, WhatsApp chats, and forums.
            The problem was never a lack of information. It was that the information was scattered,
            unverified, and impossible to find when you actually needed it.
          </p>
          <div className={styles.statsGrid}>
            {[
              { n: '1.2k+', l: 'Verified memories' },
              { n: '58+',   l: 'Countries' },
              { n: '0',     l: 'Paid features, ever' },
              { n: '24h',   l: 'Avg. review time' },
            ].map(s => (
              <div key={s.l} className={styles.stat}>
                <div className={styles.statNum}>{s.n}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <div className={styles.sEyebrow}>— The Story</div>
          <h2 className={styles.sTitle}>Why we built this.</h2>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <p>It started with a Telegram group. Like most PTE students, the night before an exam involves frantically scrolling through hundreds of messages trying to find recent exam memories — half of them are from 2021, a quarter are completely vague, and the rest are buried under congratulation messages and memes.</p>
              <p>The information <strong>existed</strong>. Students were already sharing. But there was no structure, no verification, no way to know which memories were recent, and no way to filter by what you actually cared about.</p>
              <p>Other platforms had "memory banks" but used clickable upvotes — which anyone could click multiple times and which said nothing about how many real students saw a question in a real exam.</p>
              <p>We wanted something <strong>simple, honest, and organized.</strong> A place where every memory was from a real, verified exam. Where frequency meant "9 real students on 9 different dates saw this" — not "someone clicked thumbs up 9 times".</p>
              <p>So we built it. No venture capital, no monetization plan, no ads. Just a useful tool for a community that deserved a better resource.</p>
            </div>
            <div className={styles.storyAside}>
              {[
                { label: 'The core insight', text: '"The information already existed in the community. We just needed to give it structure, verification, and a place to live."' },
                { label: 'On frequency vs upvotes', text: '"An upvote can be gamed. But 9 people each providing a separate exam submission on different dates? That\'s real signal."' },
                { label: 'On being free forever', text: '"PTE is already expensive. Adding another paid service on top insults the students who are already stretched."' },
              ].map(c => (
                <div key={c.label} className={styles.callout}>
                  <div className={styles.calloutLabel}>{c.label}</div>
                  <div className={styles.calloutText}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <div className={styles.sEyebrow}>— What We Stand For</div>
          <h2 className={styles.sTitle}>Six principles we never compromise on.</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map(v => (
              <div key={v.name} className={styles.valCard}>
                <span className={styles.valIcon}>{v.icon}</span>
                <div className={styles.valName}>{v.name}</div>
                <div className={styles.valDesc}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className={styles.bipSection}>
        <div className={styles.bipInner}>
          <div className={styles.sEyebrow}>— Building in Public</div>
          <h2 className={styles.sTitle}>Here&apos;s exactly where we are.</h2>
          <p className={styles.bipSub}>No fluff, no "coming soon" mystery. Our honest progress and roadmap.</p>
          <div className={styles.roadmap}>
            {ROADMAP.map((item, i) => (
              <div key={i} className={styles.rmItem}>
                <span className={`${styles.rmDot} ${styles[`rmDot_${item.status}`]}`}>
                  {item.status === 'done' ? '✓' : item.status === 'active' ? '⟳' : '○'}
                </span>
                <span className={styles.rmText}>{item.text}</span>
                <span className={styles.rmDate}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Part of the<br /><em>PTE community?</em></h2>
        <p className={styles.ctaSub}>Join the waitlist. Share your exam memories. Help the students who come after you.</p>
        <div className={styles.ctaActions}>
          <Link href="/" className={styles.ctaBtnPrimary}>Join Waitlist →</Link>
          <Link href="/how-it-works" className={styles.ctaBtnGhost}>See How It Works</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

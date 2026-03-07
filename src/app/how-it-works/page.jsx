// src/app/how-it-works/page.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const STEPS = [
  {
    num: '01', icon: '🎓',
    title: 'You take your PTE exam',
    desc: 'At any Pearson VUE test centre worldwide. India, Australia, Canada, UK, Singapore — wherever you are, your memory counts for the community.',
    details: [
      { icon: '📍', text: 'Works for any Pearson VUE test centre in any country' },
      { icon: '🗓️', text: 'The more recent your exam, the more valuable your memory — date matters' },
      { icon: '🧠', text: 'Even partial memories help — share what you can remember, any section' },
    ],
  },
  {
    num: '02', icon: '📝',
    title: 'Share what you remember',
    desc: 'Fill our smart 4-step form. No account required — just your email for the verification notification. The form guides you through each section with smart prompts.',
    details: [
      { icon: '⚡', text: 'Takes 5–10 minutes. Smart prompts for each question type so you know what to include' },
      { icon: '🔒', text: 'Share anonymously or with your name — your choice. Score is optional.' },
      { icon: '📧', text: 'Just your email needed. No account, no password, no profile to set up' },
      { icon: '💡', text: 'Add tips for tricky questions — help future students exactly how you wish you\'d been helped' },
    ],
  },
  {
    num: '03', icon: '✅',
    title: 'We verify & publish within 24h',
    desc: 'Every submission is manually reviewed by our admin team before it goes live. A real human reviews every memory — no bots, no automation.',
    details: [
      { icon: '👤', text: 'Human review — every single memory checked before publishing' },
      { icon: '📬', text: 'You get an email when your memory goes live, with a shareable link' },
      { icon: '🔄', text: 'If your memory matches an existing one, frequency count increases — no duplicates' },
      { icon: '❌', text: 'Spam or low-quality submissions are rejected with a reason — you can resubmit' },
    ],
  },
]

const SECTIONS = [
  {
    key: 'sp', icon: '🎤', label: 'Speaking', color: 'var(--sp-dark)', bg: 'var(--sp-bg)',
    types: ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Retell Lecture', 'Answer Short Question', 'Respond to Situation'],
  },
  {
    key: 'wr', icon: '✍️', label: 'Writing', color: 'var(--wr-dark)', bg: 'var(--wr-bg)',
    types: ['Summarize Written Text', 'Write Essay'],
  },
  {
    key: 'rd', icon: '📖', label: 'Reading', color: 'var(--rd-dark)', bg: 'var(--rd-bg)',
    types: ['R&W Fill in Blanks', 'MCQ Single Answer', 'MCQ Multiple Answers', 'Reorder Paragraphs', 'Reading FIB'],
  },
  {
    key: 'li', icon: '🎧', label: 'Listening', color: 'var(--li-dark)', bg: 'var(--li-bg)',
    types: ['Write from Dictation', 'Summarize Spoken Text', 'Highlight Correct Summary', 'Select Missing Word', 'Highlight Incorrect Words', 'MCQ Listening'],
  },
]

const FAQS = [
  {
    q: 'Is this against Pearson VUE rules?',
    a: 'Sharing your exam experience is not prohibited. Students have always discussed exams in Telegram groups, Reddit threads, and forums. We simply organise these conversations into a structured, verified format. We are not affiliated with Pearson VUE in any way.',
  },
  {
    q: 'Do I need an account to browse?',
    a: 'No. Browsing is completely open — no login, no account, no registration. To share a memory, you only need to provide your email address so we can send you a confirmation when your memory is published. That\'s it.',
  },
  {
    q: 'How does frequency tracking work?',
    a: 'When multiple students submit memories with matching question content, we group them. The frequency count shows how many independent people, on different exam dates, reported seeing the same question. This is fundamentally different from an upvote — each report comes from a real, verified exam experience.',
  },
  {
    q: 'What makes a memory get rejected?',
    a: 'Submissions are rejected if they are clearly fake (e.g., copied from another site), too vague to be useful, contain harmful content, or are exact duplicates. If rejected, you\'ll receive an email explaining why and you\'re welcome to resubmit with more detail.',
  },
  {
    q: 'Will this always be free?',
    a: 'Yes. PTE Memories Hub is a community resource built to help students, not to monetize them. There will never be a paywall, premium tier, or paid access. This is a commitment, not just a launch promise.',
  },
  {
    q: 'Can I share anonymously?',
    a: 'Absolutely. During submission you can choose to have your memory published anonymously — your name won\'t appear on the card. We still need your email for verification, but it is never displayed publicly or shared with anyone.',
  },
]

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>— How It Works</div>
          <h1 className={styles.title}>Simple by design.<br />Powerful in practice.</h1>
          <p className={styles.sub}>
            Built around one idea: every student who takes a PTE exam has information that can help the next student.
            Here&apos;s how we turn that into something useful.
          </p>
        </div>
      </div>

      {/* STEPS */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsHeader}>
          <div className={styles.sLabel}>The Process</div>
          <h2 className={styles.sTitle}>From exam room to your screen<br />in three steps.</h2>
        </div>
        <div className={styles.stepTimeline}>
          {STEPS.map(step => (
            <div key={step.num} className={styles.stepRow}>
              <div className={styles.stepDotCol}>
                <div className={styles.stepDot}>{step.icon}</div>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.stepNum}>Step {step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                <div className={styles.stepDetails}>
                  {step.details.map((d, i) => (
                    <div key={i} className={styles.stepDetail}>
                      <span className={styles.sdIcon}>{d.icon}</span>
                      <span>{d.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION BREAKDOWN */}
      <section className={styles.sectionsArea}>
        <div className={styles.sectionsInner}>
          <div className={styles.secHead}>
            <div className={styles.sLabel}>— What You Can Share</div>
            <h2 className={styles.sTitle}>All four PTE sections covered.</h2>
          </div>
          <div className={styles.secGrid}>
            {SECTIONS.map(sec => (
              <div key={sec.key} className={styles.secCard}>
                <div className={styles.scHead}>
                  <span className={styles.scIcon} style={{ background: sec.bg }}>{sec.icon}</span>
                  <span className={styles.scName} style={{ color: sec.color }}>{sec.label}</span>
                </div>
                <div className={styles.scChips}>
                  {sec.types.map(t => (
                    <span key={t} className={styles.scChip} style={{ background: sec.bg, color: sec.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqArea}>
        <div className={styles.faqHeader}>
          <div className={styles.sLabel}>— FAQ</div>
          <h2 className={styles.sTitle}>Questions we always get.</h2>
        </div>
        <div className={styles.faqList}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
              <button
                className={styles.faqQ}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}>+</span>
              </button>
              <div className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ''}`}>
                <div className={styles.faqAInner}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to help the<br /><em>next student?</em></h2>
        <p className={styles.ctaSub}>Join the waitlist. Share your exam memories. Help the students who come after you.</p>
        <div className={styles.ctaActions}>
          <Link href="/" className={styles.ctaBtnPrimary}>Join Waitlist →</Link>
          <Link href="/memories" className={styles.ctaBtnGhost}>Browse Sample Memories</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>📝 PTE Memories Hub</div>
        <div className={styles.footerLinks}>
          <Link href="/memories" className={styles.footerLink}>Memories</Link>
          <Link href="/how-it-works" className={styles.footerLink}>How It Works</Link>
          <Link href="/about" className={styles.footerLink}>About</Link>
        </div>
        <div className={styles.footerRight}>Not affiliated with Pearson VUE · © 2026</div>
      </footer>
    </>
  )
}

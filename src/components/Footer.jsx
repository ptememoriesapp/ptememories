// src/components/Footer.jsx
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <div className={styles.logoIcon}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 4.5h10M2.5 7.5h7M2.5 10.5h8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="11.5" cy="10.5" r="2.2" fill="#FCD34D"/>
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>PTE Memories</span>
          <span className={styles.logoSub}>Exam Memories</span>
        </div>
      </div>
      <div className={styles.footerLinks}>
        <Link href="/memories" className={styles.footerLink}>Memories</Link>
        <Link href="/resources" className={styles.footerLink}>Resources</Link>
        <Link href="/how-it-works" className={styles.footerLink}>How It Works</Link>
        <Link href="/about" className={styles.footerLink}>About</Link>
      </div>
      <div className={styles.footerRight}>Not affiliated with Pearson VUE · © 2026</div>
    </footer>
  )
}

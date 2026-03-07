// src/components/Nav.jsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/memories', label: 'Memories' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 4.5h10M2.5 7.5h7M2.5 10.5h8.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="11.5" cy="10.5" r="2.2" fill="#FCD34D"/>
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>PTE Memories Hub</span>
          <span className={styles.logoSub}>Exam Memories</span>
        </div>
      </Link>

      <div className={styles.links}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.pill}>
        <span className={styles.dot} />
        Building now
      </div>
    </nav>
  )
}

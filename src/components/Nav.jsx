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
        <div className={styles.logoIcon}>📝</div>
        PTE Memories Hub
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

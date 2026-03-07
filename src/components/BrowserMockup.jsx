// src/components/BrowserMockup.jsx
import styles from './BrowserMockup.module.css'

export default function BrowserMockup({ url = '/memories', children }) {
  return (
    <div className={styles.mockup}>
      {/* Browser chrome top bar */}
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.urlBar}>
          <span className={styles.urlText}>{url}</span>
        </div>
        <div className={styles.secure}>🔒 Secure</div>
      </div>
      {/* Content area */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

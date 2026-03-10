// src/components/WaitlistForm.jsx
'use client'
import { useState } from 'react'
import styles from './WaitlistForm.module.css'

// Fetch country accurately from ipapi.co (free, no key needed, ~100k/day)
async function getCountry() {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    if (!res.ok) throw new Error()
    const data = await res.json()
    // Returns e.g. { country_name: "India", country_code: "IN", city: "Mumbai" }
    return data.country_name || data.country_code || ''
  } catch {
    // Fallback: try ip-api.com
    try {
      const res2 = await fetch('http://ip-api.com/json/?fields=country,countryCode', { cache: 'no-store' })
      const d2 = await res2.json()
      return d2.country || ''
    } catch {
      return ''
    }
  }
}

export default function WaitlistForm({
  source = 'unknown',
  theme = 'light',
  placeholder = 'Enter your email address',
  btnText = 'Join Waitlist →',
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error | duplicate
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      // Fetch country in parallel with form submission prep
      const country = await getCountry()

      // Call our own API proxy — no CORS issues, real response readable
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source, country }),
      })

      const data = await res.json()

      if (data.status === 'duplicate' || data.duplicate === true) {
        setStatus('duplicate')
      } else if (res.ok && !data.error) {
        setStatus('success')
      } else {
        throw new Error(data.error || 'Unknown error')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div>
        <div className={`${styles.success} ${theme === 'dark' ? styles.successDark : ''}`}>
          <span>✅</span>
          <span>You&apos;re on the list! We&apos;ll notify you at launch.</span>
        </div>
        <div className={`${styles.shareRow} ${theme === 'dark' ? styles.shareRowDark : ''}`}>
          <span className={styles.shareLabel}>📣 Help others find it:</span>
          <a
            href="https://t.me/share/url?url=https%3A%2F%2Fptememories.com&text=Found%20this%20free%20site%20with%20verified%20PTE%20exam%20memories%20%F0%9F%8E%AF%20Way%20better%20than%20scrolling%20Telegram%20groups!"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareBtn} ${styles.shareTg}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.448l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.111z"/></svg>
            Telegram
          </a>
          <a
            href="https://wa.me/?text=Found%20this%20free%20site%20with%20verified%20PTE%20exam%20memories%20%F0%9F%8E%AF%20Way%20better%20than%20Telegram%20chaos!%20https%3A%2F%2Fptememories.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareBtn} ${styles.shareWa}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div>
        <div className={`${styles.success} ${theme === 'dark' ? styles.successDark : ''}`}>
          <span>👋</span>
          <span>You&apos;re already on the list — we&apos;ll see you at launch!</span>
        </div>
        <div className={`${styles.shareRow} ${theme === 'dark' ? styles.shareRowDark : ''}`}>
          <span className={styles.shareLabel}>📣 Share it with your group:</span>
          <a
            href="https://t.me/share/url?url=https%3A%2F%2Fptememories.com&text=Found%20this%20free%20site%20with%20verified%20PTE%20exam%20memories%20%F0%9F%8E%AF%20Way%20better%20than%20scrolling%20Telegram%20groups!"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareBtn} ${styles.shareTg}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.448l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.111z"/></svg>
            Telegram
          </a>
          <a
            href="https://wa.me/?text=Found%20this%20free%20site%20with%20verified%20PTE%20exam%20memories%20%F0%9F%8E%AF%20Way%20better%20than%20Telegram%20chaos!%20https%3A%2F%2Fptememories.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareBtn} ${styles.shareWa}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <form
        className={`${styles.form} ${theme === 'dark' ? styles.formDark : ''} ${status === 'error' ? styles.formError : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className={`${styles.input} ${theme === 'dark' ? styles.inputDark : ''}`}
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
          placeholder={placeholder}
          disabled={status === 'loading'}
        />
        <button
          className={`${styles.btn} ${status === 'loading' ? styles.btnLoading : ''}`}
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? <span className={styles.spinner} /> : btnText}
        </button>
      </form>
      {status === 'error' && (
        <p className={`${styles.errorMsg} ${theme === 'dark' ? styles.errorMsgDark : ''}`}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}

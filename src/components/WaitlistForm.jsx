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
      <div className={`${styles.success} ${theme === 'dark' ? styles.successDark : ''}`}>
        <span>✅</span>
        <span>You&apos;re on the list! We&apos;ll notify you at launch.</span>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div className={`${styles.success} ${theme === 'dark' ? styles.successDark : ''}`}>
        <span>👋</span>
        <span>You&apos;re already on the list — we&apos;ll see you at launch!</span>
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

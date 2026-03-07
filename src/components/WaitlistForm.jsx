// src/components/WaitlistForm.jsx
'use client'
import { useState } from 'react'
import styles from './WaitlistForm.module.css'

export default function WaitlistForm({ source = 'unknown', theme = 'light', placeholder = 'Enter your email address', btnText = 'Join Waitlist →' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error | duplicate
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim()

    // Client-side validation
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')) {
        // Dev mode fallback — no real URL yet
        await new Promise(r => setTimeout(r, 800))
        setStatus('success')
        return
      }

      // Google Apps Script requires no-cors for direct POST
      // We use a small workaround: send as form data via fetch with no-cors
      // and treat any response (including opaque) as success
      const formData = new FormData()
      formData.append('email', trimmed)
      formData.append('source', source)
      formData.append('country', navigator?.language?.split('-')[1] || '')

      // Try JSON first (same-origin or CORS-enabled)
      try {
        const res = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, source, country: navigator?.language?.split('-')[1] || '' }),
          mode: 'cors',
        })
        const data = await res.json()
        if (data.duplicate) {
          setStatus('duplicate')
        } else {
          setStatus('success')
        }
      } catch {
        // Apps Script doesn't always support CORS — fall back to no-cors
        // With no-cors we can't read response, but submission still goes through
        await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify({ email: trimmed, source, country: navigator?.language?.split('-')[1] || '' }),
          mode: 'no-cors',
        })
        setStatus('success')
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
          {status === 'loading' ? (
            <span className={styles.spinner} />
          ) : btnText}
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

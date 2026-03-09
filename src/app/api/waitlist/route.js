// src/app/api/waitlist/route.js
// Server-side proxy — browser talks to this, we talk to Google Script
// No CORS issues, real response readable, duplicate detection works

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, source, country } = body

    // Basic validation server-side too
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
    if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')) {
      // Dev mode — simulate success
      return Response.json({ status: 'success' })
    }

    // Call Google Apps Script from the server — no CORS issues
    const gsRes = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), source: source || 'unknown', country: country || '' }),
      redirect: 'follow', // follow the 302 redirect automatically
    })

    // Google Script always returns 200 after redirect, response is JSON
    const text = await gsRes.text()

    // Parse response safely
    let data = {}
    try { data = JSON.parse(text) } catch { data = { status: 'success' } }

    return Response.json(data)
  } catch (err) {
    console.error('Waitlist proxy error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

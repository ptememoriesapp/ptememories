// src/app/api/submit/route.js
// Proxies memory submissions to Google Sheets
// Same CORS-bypass pattern as the waitlist API

export async function POST(request) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.email || !body.date || !body.city) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

    if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')) {
      // Dev mode — simulate success
      console.log('Dev mode — submission payload:', JSON.stringify(body, null, 2))
      return Response.json({ status: 'success' })
    }

    // Forward to Google Apps Script (server-side = no CORS issues)
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    })

    const text = await res.text()
    let data = {}
    try { data = JSON.parse(text) } catch { data = { status: 'success' } }

    return Response.json(data)
  } catch (err) {
    console.error('Submit proxy error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

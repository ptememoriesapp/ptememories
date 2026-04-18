// src/app/api/admin/route.js
// GET  → list pending submissions
// POST → approve or reject a memory

import { supabaseAdmin } from '../../../lib/supabase'

function isAuthorized(request) {
  const auth = request.headers.get('x-admin-password')
  return auth === process.env.ADMIN_PASSWORD
}

// GET /api/admin — list all pending memories with sections/questions
export async function GET(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabaseAdmin) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('memories')
    .select(`
      id, name, location, centre, score, exam_date,
      avatar_gradient, frequency, priority, status,
      submitter_email, created_at,
      sections (
        id, key, preview, ord,
        questions ( id, type, content, sentences, tip, ord )
      )
    `)
    .in('status', ['pending', 'approved', 'rejected'])
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ submissions: data })
}

// POST /api/admin — approve or reject
export async function POST(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabaseAdmin) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const { id, action, priority } = await request.json()

  if (!id || !['approve', 'reject'].includes(action)) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const update = {
    status: action === 'approve' ? 'approved' : 'rejected',
    ...(priority && { priority }),
  }

  const { error } = await supabaseAdmin
    .from('memories')
    .update(update)
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ status: 'success', action })
}

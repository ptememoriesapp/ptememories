// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const svc  = process.env.SUPABASE_SERVICE_KEY

if (!url || !anon) {
  console.warn('Supabase env vars not set — DB features disabled')
}

// Public client — uses anon key, respects RLS (read approved only)
export const supabase = url && anon
  ? createClient(url, anon)
  : null

// Admin client — uses service key, bypasses RLS (for /admin routes)
export const supabaseAdmin = url && svc
  ? createClient(url, svc)
  : null

export const isSupabaseReady = !!(url && anon)

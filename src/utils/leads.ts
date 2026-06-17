import { supabase } from './supabaseClient'

// Shape we send to Supabase. Keep keys snake_case to match a SQL-friendly schema
// and avoid having to map them in the table.
export interface LeadInsert {
  name: string
  email: string
  company: string | null
  message: string | null
  source?: string | null
  user_agent?: string | null
}

export interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  company: string | null
  message: string | null
  source: string | null
  user_agent: string | null
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'archived'
  notes: string | null
}

export type LeadStatus = Lead['status']

export interface LeadResult {
  ok: boolean
  error?: string
}

const TABLE = 'leads'

/**
 * Insert a single lead from the public contact form.
 *
 * Auth: anon key. RLS allows anonymous INSERTs but blocks SELECT/UPDATE/DELETE.
 */
export async function submitLead(input: Omit<LeadInsert, 'user_agent'>): Promise<LeadResult> {
  const payload: LeadInsert = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company?.trim() || null,
    message: input.message?.trim() || null,
    source: input.source ?? 'homepage',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  }

  const { error } = await supabase.from(TABLE).insert(payload)

  if (error) {
    console.error('[submitLead] Supabase insert failed:', error)
    return {
      ok: false,
      error:
        error.code === '23505'
          ? 'Looks like you already submitted this. We will be in touch.'
          : 'Could not send your message. Please try again in a moment.',
    }
  }

  return { ok: true }
}

// ─── Admin CRUD ─────────────────────────────────────────────────────────────
// All admin operations require the user to be authenticated AND match the
// admin email allowlist (enforced server-side by RLS in leads-setup.sql).

export interface FetchLeadsOptions {
  search?: string
  status?: LeadStatus | 'all'
}

export async function fetchLeads(opts: FetchLeadsOptions = {}): Promise<{ leads: Lead[]; error?: string }> {
  let query = supabase.from(TABLE).select('*').order('created_at', { ascending: false })

  if (opts.status && opts.status !== 'all') {
    query = query.eq('status', opts.status)
  }
  if (opts.search && opts.search.trim()) {
    const term = opts.search.trim().replace(/[%_]/g, '\\$&')
    // Search across name, email, company, message
    query = query.or(
      `name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%,message.ilike.%${term}%`,
    )
  }

  const { data, error } = await query
  if (error) {
    console.error('[fetchLeads] failed:', error)
    return { leads: [], error: error.message }
  }
  return { leads: (data ?? []) as Lead[] }
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, 'name' | 'email' | 'company' | 'message' | 'status' | 'notes'>>): Promise<LeadResult> {
  // Normalise email if present
  const normalised: typeof patch = { ...patch }
  if (typeof normalised.email === 'string') normalised.email = normalised.email.trim().toLowerCase()
  if (typeof normalised.name === 'string') normalised.name = normalised.name.trim()

  const { error } = await supabase.from(TABLE).update(normalised).eq('id', id)
  if (error) {
    console.error('[updateLead] failed:', error)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function deleteLead(id: string): Promise<LeadResult> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) {
    console.error('[deleteLead] failed:', error)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function createLead(input: Omit<LeadInsert, 'user_agent'> & { status?: LeadStatus; notes?: string | null }): Promise<LeadResult> {
  const payload: LeadInsert & { status?: LeadStatus; notes?: string | null } = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company?.trim() || null,
    message: input.message?.trim() || null,
    source: input.source ?? 'manual',
    user_agent: null,
    status: input.status ?? 'new',
    notes: input.notes ?? null,
  }
  const { error } = await supabase.from(TABLE).insert(payload)
  if (error) {
    console.error('[createLead] failed:', error)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

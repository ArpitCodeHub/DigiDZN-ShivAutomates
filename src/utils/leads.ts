import { supabase } from './supabaseClient'

// Shape we send to Supabase. Keep keys snake_case to match a SQL-friendly schema
// and avoid having to map them in the table.
export interface LeadInsert {
  name: string
  email: string
  company: string | null
  message: string | null
  source?: string | null      // where the lead came from (e.g. 'homepage', 'services')
  user_agent?: string | null
}

export interface LeadResult {
  ok: boolean
  error?: string
}

const TABLE = 'leads'

/**
 * Insert a single lead into the `leads` Supabase table.
 *
 * Authentication: the anon key is used. The table relies on a Row Level
 * Security policy that allows anonymous INSERTs but blocks SELECT/UPDATE/DELETE.
 * See `supabase/leads-setup.sql` for the schema + policy.
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
    // Don't leak Supabase internals to users — log for debugging only.
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

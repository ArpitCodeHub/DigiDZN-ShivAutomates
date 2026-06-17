import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
}

// Use safe placeholders if env is missing so createClient doesn't throw at
// module-load time (which would crash the entire app on first paint).
// Calls against the client will fail at request time with a clear error.
const safeUrl = supabaseUrl || 'https://placeholder.supabase.co'
const safeKey = supabaseAnonKey || 'placeholder-anon-key'

export const supabase = createClient(safeUrl, safeKey)

/**
 * Verify required environment variables are set
 */
export function verifyEnvironmentVariables(): {
  valid: boolean
  missing: string[]
} {
  const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']
  const missing: string[] = []

  for (const envVar of required) {
    const value = (import.meta as any).env[envVar]
    if (!value || value.trim() === '') {
      missing.push(envVar)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Log current Supabase configuration (non-sensitive)
 */
export function logSupabaseConfig(): void {
  const url = (import.meta as any).env.VITE_SUPABASE_URL
  const keyLength = (import.meta as any).env.VITE_SUPABASE_ANON_KEY?.length || 0

  console.group('📊 Supabase Configuration')
  console.log('URL:', url || 'NOT SET')
  console.log('API Key Length:', keyLength > 0 ? `${keyLength} characters` : 'NOT SET')
  console.log(
    'Environment:',
    (import.meta as any).env.MODE || 'development'
  )
  console.groupEnd()
}


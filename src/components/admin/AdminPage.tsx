import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../utils/supabaseClient'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

// Top-level admin page. Handles auth state and renders either the login form
// or the dashboard. Mounted by App.tsx when window.location.pathname starts
// with /admin.

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setChecking(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0807]">
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <span
            className="w-4 h-4 rounded-full border-2 border-[#a87242]/40 border-t-[#d4a576] animate-spin"
            aria-hidden
          />
          Loading admin…
        </div>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin onSignedIn={() => { /* auth listener picks it up */ }} />
  }

  return <AdminDashboard session={session} onSignOut={handleSignOut} />
}

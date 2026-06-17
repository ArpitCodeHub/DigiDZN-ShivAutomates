import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Session } from '@supabase/supabase-js'
import {
  fetchLeads,
  updateLead,
  deleteLead,
  createLead,
  type Lead,
  type LeadStatus,
} from '../../utils/leads'

interface AdminDashboardProps {
  session: Session
  onSignOut: () => void
}

const STATUS_OPTIONS: { value: LeadStatus | 'all'; label: string; color: string }[] = [
  { value: 'all',       label: 'All',         color: '#a87242' },
  { value: 'new',       label: 'New',         color: '#d4a576' },
  { value: 'contacted', label: 'Contacted',   color: '#c89368' },
  { value: 'qualified', label: 'Qualified',   color: '#86b87b' },
  { value: 'closed',    label: 'Closed',      color: '#7a8aa6' },
  { value: 'archived',  label: 'Archived',    color: '#666666' },
]

function statusColor(s: LeadStatus): string {
  return STATUS_OPTIONS.find(o => o.value === s)?.color ?? '#a87242'
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function isToday(iso: string): boolean {
  try {
    const d = new Date(iso)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  } catch { return false }
}

function isThisWeek(iso: string): boolean {
  try {
    const d = new Date(iso).getTime()
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return d >= sevenDaysAgo
  } catch { return false }
}

export default function AdminDashboard({ session, onSignOut }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')

  const [viewing, setViewing] = useState<Lead | null>(null)
  const [editing, setEditing] = useState<Lead | null>(null)
  const [deleting, setDeleting] = useState<Lead | null>(null)
  const [creating, setCreating] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { leads: data, error: err } = await fetchLeads({ status: statusFilter, search })
    if (err) setError(err)
    setLeads(data)
    setLoading(false)
  }, [search, statusFilter])

  // Initial load + refresh on filter change. Debounce search.
  useEffect(() => {
    const t = setTimeout(refresh, search ? 200 : 0)
    return () => clearTimeout(t)
  }, [refresh, search])

  // Stats — derived from full data set, but we only have filtered data here.
  // For accuracy, recompute against `leads` (which is filtered) — UI is honest:
  // when filters are active, stats reflect the filtered slice.
  const stats = useMemo(() => {
    return {
      total: leads.length,
      today: leads.filter(l => isToday(l.created_at)).length,
      thisWeek: leads.filter(l => isThisWeek(l.created_at)).length,
      new: leads.filter(l => l.status === 'new').length,
    }
  }, [leads])

  const adminEmail = session.user?.email ?? 'admin'

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#a87242]/20" style={{
        background: 'rgba(10,8,7,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <p className="text-xs font-black tracking-[0.3em] text-white/55 flex-shrink-0">DIGIDZN</p>
            <span className="text-white/20 hidden sm:inline">/</span>
            <h1 className="text-sm sm:text-base font-semibold tracking-wide truncate">Admin · Enquiries</h1>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden md:inline text-xs text-white/45 truncate max-w-[200px]">{adminEmail}</span>
            <button
              onClick={onSignOut}
              className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg border border-[#a87242]/30 text-white/70 hover:text-white hover:border-[#a87242]/50 hover:bg-white/5 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        {/* Page heading + create button */}
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-2">Enquiries</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight">
              Lead{' '}
              <span className="font-serif-italic font-normal text-[#d4a576]">inbox.</span>
            </h2>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
          >
            + New lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[#a87242]/20 mb-8" style={{ background: 'rgba(255,255,255,0.025)' }}>
          {[
            { label: 'In view',   value: String(stats.total),    color: '#a87242' },
            { label: 'New',       value: String(stats.new),      color: '#d4a576' },
            { label: 'Today',     value: String(stats.today),    color: '#c89368' },
            { label: 'Last 7 d',  value: String(stats.thisWeek), color: '#8b5e3c' },
          ].map((s, i) => (
            <div key={s.label} className={`p-5 sm:p-6 ${i < 3 ? 'border-r border-[#a87242]/15' : ''}`} style={{ background: 'rgba(10,8,7,0.5)' }}>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/45 mb-2">{s.label}</p>
              <p className="font-bold leading-none tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: s.color, letterSpacing: '-0.02em' }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search name, email, company, message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-[#a87242]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a87242]/50 focus:bg-white/8 transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const active = statusFilter === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    borderColor: active ? `${opt.color}80` : 'rgba(168,114,66,0.25)',
                    background: active ? `${opt.color}20` : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="rounded-2xl border border-[#a87242]/20 overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)' }}>
          {/* Table header (desktop) */}
          <div className="hidden md:grid grid-cols-[140px_1.5fr_1.6fr_1fr_1fr_120px_120px] gap-4 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 border-b border-[#a87242]/15">
            <span>Date</span>
            <span>Name</span>
            <span>Email</span>
            <span>Company</span>
            <span>Source</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {loading ? (
            <div className="px-5 py-16 text-center text-white/45 text-sm flex items-center justify-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 border-[#a87242]/40 border-t-[#d4a576] animate-spin" aria-hidden />
              Loading enquiries…
            </div>
          ) : leads.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="text-white/55 text-base mb-1">No enquiries{search || statusFilter !== 'all' ? ' match the current filters' : ' yet'}.</p>
              <p className="text-white/30 text-xs">{search || statusFilter !== 'all' ? 'Adjust the filters above to see more.' : 'New form submissions will appear here in real time.'}</p>
            </div>
          ) : (
            <ul>
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="border-b border-[#a87242]/12 last:border-b-0 hover:bg-white/[0.025] transition-colors"
                >
                  {/* Desktop row */}
                  <button
                    onClick={() => setViewing(lead)}
                    className="hidden md:grid grid-cols-[140px_1.5fr_1.6fr_1fr_1fr_120px_120px] gap-4 px-5 py-4 w-full text-left items-center"
                  >
                    <span className="text-xs text-white/55 truncate">{formatDate(lead.created_at)}</span>
                    <span className="text-sm font-medium text-white truncate">{lead.name}</span>
                    <span className="text-sm text-white/70 truncate">{lead.email}</span>
                    <span className="text-sm text-white/55 truncate">{lead.company || '—'}</span>
                    <span className="text-xs text-white/45 truncate uppercase tracking-wider">{lead.source || '—'}</span>
                    <span>
                      <span
                        className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-1 rounded-full border"
                        style={{
                          color: statusColor(lead.status),
                          borderColor: `${statusColor(lead.status)}50`,
                          background: `${statusColor(lead.status)}15`,
                        }}
                      >
                        {lead.status}
                      </span>
                    </span>
                    <span className="text-right">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setEditing(lead) }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setEditing(lead) } }}
                        className="text-xs px-2.5 py-1 rounded-md border border-[#a87242]/30 text-white/70 hover:text-white hover:border-[#a87242]/50 hover:bg-white/5 mr-2 transition-colors inline-block"
                      >
                        Edit
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setDeleting(lead) }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setDeleting(lead) } }}
                        className="text-xs px-2.5 py-1 rounded-md border border-red-500/25 text-red-400/80 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10 transition-colors inline-block"
                      >
                        Delete
                      </span>
                    </span>
                  </button>

                  {/* Mobile card */}
                  <div className="md:hidden px-4 py-4">
                    <button onClick={() => setViewing(lead)} className="w-full text-left">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-1 rounded-full border flex-shrink-0"
                          style={{
                            color: statusColor(lead.status),
                            borderColor: `${statusColor(lead.status)}50`,
                            background: `${statusColor(lead.status)}15`,
                          }}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-xs text-white/65 truncate mb-1">{lead.email}</p>
                      <p className="text-[11px] text-white/40 flex items-center gap-2">
                        <span>{formatDate(lead.created_at)}</span>
                        {lead.company && <span className="truncate">· {lead.company}</span>}
                      </p>
                    </button>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditing(lead)} className="flex-1 text-xs py-1.5 rounded-md border border-[#a87242]/30 text-white/70 hover:text-white hover:border-[#a87242]/50 transition-colors">Edit</button>
                      <button onClick={() => setDeleting(lead)} className="flex-1 text-xs py-1.5 rounded-md border border-red-500/25 text-red-400/80 hover:text-red-300 hover:border-red-500/50 transition-colors">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-[11px] text-white/30 mt-6">
          {leads.length} {leads.length === 1 ? 'enquiry' : 'enquiries'} shown · access governed by Supabase Row Level Security
        </p>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {viewing && (
          <ViewLeadModal
            lead={viewing}
            onClose={() => setViewing(null)}
            onEdit={() => { setEditing(viewing); setViewing(null) }}
          />
        )}
        {editing && (
          <EditLeadModal
            lead={editing}
            onClose={() => setEditing(null)}
            onSaved={() => { setEditing(null); refresh() }}
          />
        )}
        {deleting && (
          <DeleteLeadModal
            lead={deleting}
            onClose={() => setDeleting(null)}
            onDeleted={() => { setDeleting(null); refresh() }}
          />
        )}
        {creating && (
          <CreateLeadModal
            onClose={() => setCreating(false)}
            onCreated={() => { setCreating(false); refresh() }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function ModalShell({ onClose, children, title, subtitle }: { onClose: () => void; children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-full max-w-lg border border-[#a87242]/30 max-h-[88vh] overflow-y-auto"
        style={{ background: 'rgba(17,13,10,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        <div className="h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg,#a87242,#c89368)' }} />
        <div className="p-7 md:p-8">
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
              {subtitle && <p className="text-xs md:text-sm text-white/45 mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 flex-shrink-0"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-1.5">{label}</p>
      <div className="text-sm text-white/85">{value || <span className="text-white/30">—</span>}</div>
    </div>
  )
}

function ViewLeadModal({ lead, onClose, onEdit }: { lead: Lead; onClose: () => void; onEdit: () => void }) {
  return (
    <ModalShell title={lead.name} subtitle={formatDate(lead.created_at)} onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <Field label="Email" value={<a href={`mailto:${lead.email}`} className="text-[#d4a576] hover:underline break-all">{lead.email}</a>} />
        <Field label="Company" value={lead.company} />
        <Field label="Source" value={<span className="uppercase tracking-wider text-xs">{lead.source || '—'}</span>} />
        <Field
          label="Status"
          value={
            <span
              className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.14em] px-2 py-1 rounded-full border"
              style={{
                color: statusColor(lead.status),
                borderColor: `${statusColor(lead.status)}50`,
                background: `${statusColor(lead.status)}15`,
              }}
            >
              {lead.status}
            </span>
          }
        />
      </div>
      <div className="space-y-5">
        <Field label="Message" value={lead.message ? <p className="leading-relaxed whitespace-pre-wrap">{lead.message}</p> : null} />
        <Field label="Internal notes" value={lead.notes ? <p className="leading-relaxed whitespace-pre-wrap">{lead.notes}</p> : null} />
        <Field label="User agent" value={lead.user_agent ? <span className="text-[11px] text-white/50 break-all">{lead.user_agent}</span> : null} />
      </div>
      <div className="flex gap-3 pt-7 mt-7 border-t border-[#a87242]/15">
        <button
          onClick={onEdit}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
        >
          Edit
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/55 border border-[#a87242]/30 hover:bg-white/5 transition-colors"
        >
          Close
        </button>
      </div>
    </ModalShell>
  )
}

function EditLeadModal({ lead, onClose, onSaved }: { lead: Lead; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: lead.name,
    email: lead.email,
    company: lead.company ?? '',
    message: lead.message ?? '',
    status: lead.status as LeadStatus,
    notes: lead.notes ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrMsg('Name and email are required.')
      return
    }
    setSaving(true)
    setErrMsg(null)
    const res = await updateLead(lead.id, {
      name: form.name,
      email: form.email,
      company: form.company.trim() || null,
      message: form.message.trim() || null,
      status: form.status,
      notes: form.notes.trim() || null,
    })
    setSaving(false)
    if (!res.ok) {
      setErrMsg(res.error ?? 'Could not save changes.')
      return
    }
    onSaved()
  }

  return (
    <ModalShell title="Edit enquiry" subtitle={`#${lead.id.slice(0, 8)}`} onClose={onClose}>
      <div className="space-y-4">
        <Input label="Name"    value={form.name}    onChange={(v) => setForm({ ...form, name: v })} required />
        <Input label="Email"   value={form.email}   onChange={(v) => setForm({ ...form, email: v })} required type="email" />
        <Input label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />

        <div>
          <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-1.5">Status</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.filter(o => o.value !== 'all').map((opt) => {
              const active = form.status === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, status: opt.value as LeadStatus })}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    borderColor: active ? `${opt.color}80` : 'rgba(168,114,66,0.25)',
                    background: active ? `${opt.color}25` : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        <Textarea label="Message"        value={form.message} onChange={(v) => setForm({ ...form, message: v })} rows={3} />
        <Textarea label="Internal notes" value={form.notes}   onChange={(v) => setForm({ ...form, notes: v })}   rows={3} placeholder="Add a follow-up note for the team…" />

        {errMsg && <p className="text-sm text-red-400">{errMsg}</p>}
      </div>

      <div className="flex gap-3 pt-7 mt-7 border-t border-[#a87242]/15">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/55 border border-[#a87242]/30 hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  )
}

function CreateLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrMsg('Name and email are required.')
      return
    }
    setSaving(true)
    setErrMsg(null)
    const res = await createLead({
      name: form.name,
      email: form.email,
      company: form.company.trim() || null,
      message: form.message.trim() || null,
      notes: form.notes.trim() || null,
      source: 'manual',
    })
    setSaving(false)
    if (!res.ok) {
      setErrMsg(res.error ?? 'Could not create lead.')
      return
    }
    onCreated()
  }

  return (
    <ModalShell title="Add enquiry" subtitle="Manually log a lead from a call or referral" onClose={onClose}>
      <div className="space-y-4">
        <Input label="Name"    value={form.name}    onChange={(v) => setForm({ ...form, name: v })} required />
        <Input label="Email"   value={form.email}   onChange={(v) => setForm({ ...form, email: v })} required type="email" />
        <Input label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <Textarea label="Message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} rows={3} placeholder="What did they reach out about?" />
        <Textarea label="Internal notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} rows={2} placeholder="Anything the team should know…" />
        {errMsg && <p className="text-sm text-red-400">{errMsg}</p>}
      </div>
      <div className="flex gap-3 pt-7 mt-7 border-t border-[#a87242]/15">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
        >
          {saving ? 'Saving…' : 'Create lead'}
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/55 border border-[#a87242]/30 hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  )
}

function DeleteLeadModal({ lead, onClose, onDeleted }: { lead: Lead; onClose: () => void; onDeleted: () => void }) {
  const [working, setWorking] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const handleDelete = async () => {
    setWorking(true)
    setErrMsg(null)
    const res = await deleteLead(lead.id)
    setWorking(false)
    if (!res.ok) {
      setErrMsg(res.error ?? 'Could not delete lead.')
      return
    }
    onDeleted()
  }

  return (
    <ModalShell title="Delete this enquiry?" subtitle="This action cannot be undone." onClose={onClose}>
      <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4 mb-6">
        <p className="text-sm text-white/85 font-medium mb-1">{lead.name}</p>
        <p className="text-xs text-white/55 break-all">{lead.email}</p>
        <p className="text-[11px] text-white/35 mt-2">{formatDate(lead.created_at)}</p>
      </div>
      {errMsg && <p className="text-sm text-red-400 mb-4">{errMsg}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={working}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white border disabled:opacity-50"
          style={{
            background: 'rgba(239,68,68,0.18)',
            borderColor: 'rgba(239,68,68,0.45)',
          }}
        >
          {working ? 'Deleting…' : 'Yes, delete'}
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/55 border border-[#a87242]/30 hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  )
}

// Tiny field primitives reused across modals
function Input({ label, value, onChange, type = 'text', required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-1.5">
        {label}{required && <span className="text-[#c89368] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ''}
        className="w-full bg-white/5 border border-[#a87242]/25 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/55 focus:bg-white/8"
      />
    </div>
  )
}

function Textarea({ label, value, onChange, rows = 3, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-1.5">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ''}
        className="w-full bg-white/5 border border-[#a87242]/25 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/55 focus:bg-white/8 resize-none"
      />
    </div>
  )
}

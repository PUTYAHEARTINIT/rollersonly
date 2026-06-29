'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SetupProfilePage() {
  const router = useRouter()
  const [loft, setLoft] = useState({ name: '', location: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Verify user is authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/signin')
      }
      setCheckingAuth(false)
    })
  }, [supabase, router])

  async function handleLoftSetup() {
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/signin')
      return
    }

    // Create profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        username: user.user_metadata.username,
        full_name: user.user_metadata.full_name,
        tier: user.user_metadata.tier,
        loft_name: loft.name || null,
        loft_location: loft.location || null,
        loft_description: loft.description || null,
      })

    setLoading(false)

    if (profileError) {
      // If profile already exists, that's okay - just continue
      if (profileError.code !== '23505') {
        setError(profileError.message)
        return
      }
    }

    router.push('/dashboard')
  }

  if (checkingAuth) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--black)', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--muted)', fontFamily: 'var(--ff-display)', fontSize: 24, fontWeight: 300 }}>Loading…</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--black)', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 600, padding: '64px 48px' }}>
        <div style={{ fontSize: 32, fontFamily: 'var(--ff-display)', fontWeight: 300, color: 'var(--white)', marginBottom: 8, textAlign: 'center' }}>
          Set up your loft
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 40, textAlign: 'center' }}>
          Your public loft profile — fanciers worldwide will see this
        </div>

        <Field label="Loft name" value={loft.name} onChange={(v) => setLoft((p) => ({ ...p, name: v }))} placeholder="Anderson Elite Loft" />
        <div style={{ marginTop: 16 }}>
          <Field label="Location / City" value={loft.location} onChange={(v) => setLoft((p) => ({ ...p, location: v }))} placeholder="DeSoto, Texas, USA" />
        </div>
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
            Brief description
          </label>
          <textarea
            value={loft.description}
            onChange={(e) => setLoft((p) => ({ ...p, description: e.target.value }))}
            placeholder="Tell the community about your loft, your bloodlines, and what you specialize in…"
            style={{ width: '100%', background: 'var(--deep)', border: '0.5px solid var(--border)', color: 'var(--white)', padding: '12px 16px', fontSize: 14, borderRadius: 2, outline: 'none', minHeight: 120, resize: 'vertical', fontFamily: 'var(--ff-body)' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>

        {error && <div style={{ color: '#E74C3C', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-ghost" onClick={() => router.push('/dashboard')} style={{ fontSize: 12 }}>
            Skip for now →
          </button>
          <button className="btn-gold-lg" onClick={handleLoftSetup} disabled={loading}>
            {loading ? 'Setting up…' : 'Complete Setup →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: 'var(--deep)', border: '0.5px solid var(--border)', color: 'var(--white)', padding: '12px 16px', fontSize: 14, borderRadius: 2, outline: 'none', fontFamily: 'var(--ff-body)' }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
      />
    </div>
  )
}

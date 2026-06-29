'use client'

import Link from "next/link"
import { useAuth } from "@/lib/auth/AuthProvider"
import { useState, useRef, useEffect } from "react"

export default function Nav({ active }: { active?: string }) {
  const { user, loading, signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const links = [
    { label: "Live Auctions", href: "/auctions" },
    { label: "Browse Birds", href: "/browse" },
    { label: "Top Breeders", href: "/breeders" },
    { label: "Pedigrees", href: "/pedigree" },
    { label: "Leaderboards", href: "/leaderboards" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav>
      <Link href="/" className="nav-logo">
        Rollers<span>Only</span>
      </Link>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} style={active === l.href ? { color: "var(--white)" } : {}}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-cta">
        {loading ? (
          <div style={{ width: 100, height: 36 }} />
        ) : user ? (
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--surface)',
                border: '0.5px solid var(--border)',
                borderRadius: 2,
                padding: '8px 16px',
                cursor: 'pointer',
                color: 'var(--white)',
                fontSize: 13,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--gold)',
                color: 'var(--black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 600,
              }}>
                {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <span>{user.user_metadata?.username || 'My Loft'}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)' }}>▼</span>
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                background: 'var(--void)',
                border: '0.5px solid var(--border)',
                borderRadius: 2,
                minWidth: 200,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                zIndex: 1000,
              }}>
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontSize: 13,
                    borderBottom: '0.5px solid var(--border)',
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  href="/pedigree"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontSize: 13,
                    borderBottom: '0.5px solid var(--border)',
                  }}
                >
                  Pedigree Vault
                </Link>
                <button
                  onClick={signOut}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    color: 'var(--muted)',
                    background: 'transparent',
                    border: 'none',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" className="btn-ghost">Sign in</Link>
            <Link href="/signup" className="btn-gold">Join Now</Link>
          </>
        )}
      </div>
    </nav>
  )
}

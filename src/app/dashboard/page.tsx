"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      // Fetch user profile from database
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          setProfile(data);
          setProfileLoading(false);
        });
    }
  }, [user, supabase]);

  if (loading || profileLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--muted)", fontFamily: "var(--ff-display)", fontSize: 24, fontWeight: 300 }}>Loading your loft…</div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ fontFamily: "var(--ff-display)", fontSize: 32, fontWeight: 300, color: "var(--white)" }}>Sign in to access your dashboard</div>
        <Link href="/signin" className="btn-gold" style={{ padding: "14px 32px" }}>Sign In</Link>
      </div>
    );
  }

  // Use REAL profile data
  const displayName = profile.full_name?.split(' ')[0] || profile.username || 'User';
  const username = profile.username || 'user';
  const location = profile.location || 'Location not set';
  const tier = profile.tier || 'fancier';
  const bio = profile.bio || 'No bio yet';

  return (
    <>
      <Nav active="/dashboard" />
      <div style={{ paddingTop: 72, background: "var(--black)", minHeight: "100vh" }}>

        {/* HEADER */}
        <div style={{ background: "var(--void)", borderBottom: "0.5px solid var(--border)", padding: "40px 64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Your Loft</p>
              <h1 style={{ fontFamily: "var(--ff-display)", fontSize: 40, fontWeight: 300, color: "var(--white)", marginBottom: 6 }}>
                Welcome back, {displayName}
              </h1>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                @{username} · {location} · {tier.charAt(0).toUpperCase() + tier.slice(1)} Member
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/dashboard/settings" className="btn-ghost" style={{ fontSize: 11 }}>Edit Profile</Link>
              <Link href="/birds/new" className="btn-gold" style={{ fontSize: 11 }}>List a Bird</Link>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 64px" }}>

          {/* PROFILE INFO */}
          <div style={{ background: "var(--void)", border: "0.5px solid var(--border)", borderRadius: 4, padding: 32, marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 300, color: "var(--white)", marginBottom: 8 }}>
                  {profile.full_name || username}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>@{username}</div>
                <div style={{ fontSize: 14, color: "var(--white)", lineHeight: 1.6, maxWidth: 600 }}>
                  {bio}
                </div>
              </div>
              {profile.is_verified && (
                <div style={{ background: "var(--gold)", color: "var(--black)", padding: "6px 12px", borderRadius: 2, fontSize: 11, fontWeight: 600 }}>
                  ✓ VERIFIED
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 24, paddingTop: 24, borderTop: "0.5px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Location</div>
                <div style={{ fontSize: 14, color: "var(--white)" }}>{location}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Member Since</div>
                <div style={{ fontSize: 14, color: "var(--white)" }}>
                  {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Plan</div>
                <div style={{ fontSize: 14, color: "var(--gold)" }}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</div>
              </div>
            </div>
          </div>

          {/* EMPTY STATES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* MY LISTINGS */}
            <div style={{ background: "var(--void)", border: "0.5px solid var(--border)", borderRadius: 4, padding: 32 }}>
              <div style={{ fontSize: 18, fontFamily: "var(--ff-display)", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>
                My Listings
              </div>
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🐦</div>
                <div style={{ fontSize: 14, marginBottom: 16 }}>No birds listed yet</div>
                <Link href="/birds/new" className="btn-gold" style={{ fontSize: 13 }}>List Your First Bird</Link>
              </div>
            </div>

            {/* ACTIVE BIDS */}
            <div style={{ background: "var(--void)", border: "0.5px solid var(--border)", borderRadius: 4, padding: 32 }}>
              <div style={{ fontSize: 18, fontFamily: "var(--ff-display)", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>
                Active Bids
              </div>
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💰</div>
                <div style={{ fontSize: 14, marginBottom: 16 }}>No active bids</div>
                <Link href="/auctions" className="btn-ghost" style={{ fontSize: 13 }}>Browse Auctions</Link>
              </div>
            </div>

          </div>

          {/* RECENT SALES */}
          <div style={{ background: "var(--void)", border: "0.5px solid var(--border)", borderRadius: 4, padding: 32, marginTop: 24 }}>
            <div style={{ fontSize: 18, fontFamily: "var(--ff-display)", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>
              Sales History
            </div>
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
              <div style={{ fontSize: 14 }}>No sales yet</div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

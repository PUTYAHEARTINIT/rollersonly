"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import { createClient } from "@/lib/supabase/client";

const chatMessages = [
  { user: "MartinezLoft_CA", msg: "Beautiful bird! What's the bloodline?", time: "2m" },
  { user: "RollerFan_UK", msg: "Is this the same line as last month's champion?", time: "3m" },
  { user: "Khan_TX", msg: "Reserve met already 🔥", time: "4m" },
  { user: "Sterling_NL", msg: "Shipping to Netherlands possible?", time: "5m" },
  { user: "Anderson_TX", msg: "@Sterling_NL Yes, we ship internationally via Delta Cargo", time: "6m" },
  { user: "BlueBarFan", msg: "What's the kit score on this one?", time: "8m" },
  { user: "NBRC_Watcher", msg: "97/100 fly score — unreal genetics", time: "9m" },
  { user: "DesertLoft_AZ", msg: "Been waiting for an Anderson bird for months", time: "11m" },
];

const bidHistory = [
  { bidder: "J***t", amount: 1240, time: "just now", winning: true },
  { bidder: "M***z", amount: 1200, time: "2 min ago" },
  { bidder: "R***l", amount: 1150, time: "4 min ago" },
  { bidder: "S***g", amount: 1100, time: "6 min ago" },
  { bidder: "K***n", amount: 1050, time: "9 min ago" },
  { bidder: "D***t", amount: 1000, time: "12 min ago" },
  { bidder: "B***r", amount: 950, time: "15 min ago" },
  { bidder: "J***t", amount: 900, time: "18 min ago" },
];

export default function AuctionRoom({ id }: { id: string }) {
  const supabase = createClient();
  const [currentBid, setCurrentBid] = useState(1240);
  const [bidInput, setBidInput] = useState(1275);
  const [showConfirm, setShowConfirm] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [bids, setBids] = useState(bidHistory);

  useEffect(() => {
    const channel = supabase
      .channel(`auction-${id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${id}` },
        (payload: { new: { amount: number; bidder_id: string } }) => {
          setCurrentBid(payload.new.amount);
          setBids((prev) => [{ bidder: "New***bid", amount: payload.new.amount, time: "just now", winning: true }, ...prev]);
        }
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [id]);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* TOPBAR */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 60, background: "rgba(0,0,0,0.97)", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/" style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", color: "var(--white)", textDecoration: "none" }}>
            Rollers<span style={{ color: "var(--gold)" }}>Only</span>
          </Link>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            <Link href="/browse" style={{ color: "var(--muted)", textDecoration: "none" }}>Auctions</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>North America — Live</span>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--white)" }}>Lot #4 — Blue Bar Champion</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--white)", background: "rgba(255,50,50,0.15)", border: "0.5px solid rgba(255,80,80,0.4)", padding: "5px 12px", borderRadius: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff4444", display: "inline-block", animation: "pulse-red 1.5s ease-in-out infinite" }} />
            Live Auction
          </div>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>58 bidders watching</span>
          <Link href="/browse" className="btn-ghost" style={{ fontSize: 11 }}>← Back</Link>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface2)", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-display)", fontSize: 16, color: "var(--gold)" }}>J</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ display: "flex", flex: 1, paddingTop: 60, height: "calc(100vh - 60px)" }}>

        {/* LEFT — bird display */}
        <div style={{ flex: 1, borderRight: "0.5px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Stage */}
          <div style={{ height: "55vh", background: "#000", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-display)", fontSize: "15vw", fontWeight: 300, color: "transparent", WebkitTextStroke: "0.5px rgba(255,255,255,0.03)", userSelect: "none", pointerEvents: "none" }}>CHAMPION</div>
            <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 2 }}>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Lot 4 of 12 · <span style={{ color: "var(--gold)" }}>RO-2847</span></div>
              <div style={{ display: "flex", gap: 6 }}>
                {[["Verified Pedigree", "var(--gold)"], ["DNA Confirmed", "#5DADE2"], ["Health Certified", "#2ECC71"]].map(([label, color]) => (
                  <span key={label as string} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", border: `0.5px solid ${color}`, color: color as string, borderRadius: 1 }}>{label}</span>
                ))}
              </div>
            </div>
            <Image src="/bird-white-red.jpg" alt="Blue Bar Champion Cock" fill style={{ objectFit: "contain", objectPosition: "center bottom" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, rgba(212,175,55,0.06), transparent)" }} />
          </div>

          {/* Bird info */}
          <div style={{ padding: "20px 28px", borderBottom: "0.5px solid var(--border)", background: "var(--deep)" }}>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 400, color: "var(--white)", marginBottom: 8 }}>Blue Bar Champion Cock</div>
            <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
              {["RO-2847", "Anderson Elite Loft", "DeSoto, Texas, USA", "Male · 2024 Hatch", "Birmingham Roller", "NBRC World Cup Bloodline"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {[["♡", "Save"], ["↗", "Share"], ["⎘", "Pedigree"]].map(([icon, label]) => (
                <Link key={label} href={label === "Pedigree" ? "/pedigree" : "#"} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--muted)", padding: "6px 12px", border: "0.5px solid var(--border)", borderRadius: 2, textDecoration: "none", transition: "all 0.2s" }}>
                  {icon} {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Pedigree preview */}
          <div style={{ padding: "20px 28px", flex: 1, overflowY: "auto" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Bloodline Preview</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <PedigreeNode name="Blue Bar Champion" ring="RO-2847" note="97/100 · Champion" gold />
              <span style={{ color: "var(--gold)", fontSize: 18 }}>›</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <PedigreeNode name="Anderson's Thunder" ring="AU23-TX-18204" note="NBRC Champion 2025" gold />
                <PedigreeNode name="Silver Queen Hen" ring="AU20-TX-09871" note="World Cup Finalist" />
              </div>
              <span style={{ color: "var(--gold)", fontSize: 18 }}>›</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <PedigreeNode name="TX Heritage Blue" ring="AU19-TX-00112" note="Heritage line" />
                <PedigreeNode name="Anderson's Glory" ring="AU18-TX-00089" note="World Cup line" />
              </div>
            </div>
            <Link href="/pedigree" style={{ display: "inline-block", marginTop: 16, fontSize: 12, color: "var(--gold)", textDecoration: "none" }}>View full pedigree →</Link>
          </div>
        </div>

        {/* CENTER — bid engine */}
        <div style={{ width: 300, borderRight: "0.5px solid var(--border)", background: "var(--void)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ padding: 24, borderBottom: "0.5px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Current Bid</div>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 52, fontWeight: 300, color: "var(--gold)", lineHeight: 1, marginBottom: 4 }}>${currentBid.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>14 bids · Anderson Loft is leading</div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Ends in</div>
              <Countdown seconds={1847} />
            </div>

            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2ECC71", border: "0.5px solid rgba(46,204,113,0.4)", padding: "3px 10px", borderRadius: 1, marginBottom: 20 }}>Reserve met ✓</span>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Your bid</div>
              <input type="number" value={bidInput} onChange={(e) => setBidInput(Number(e.target.value))} style={{ width: "100%", background: "var(--deep)", border: "0.5px solid var(--border-gold)", color: "var(--white)", padding: "12px 16px", fontSize: 18, fontFamily: "var(--ff-display)", fontWeight: 300, borderRadius: 2, outline: "none" }} />
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>Minimum: ${(currentBid + 25).toLocaleString()} · Increment: $25</div>
            </div>

            <button onClick={() => setShowConfirm(true)} style={{ width: "100%", background: "var(--gold)", color: "var(--black)", border: "none", padding: 16, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, marginTop: 12, transition: "all 0.2s" }}>
              Place Bid
            </button>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, textAlign: "center" }}>5% platform commission · Escrow protected</div>
          </div>

          {/* Bid history */}
          <div style={{ padding: 24, flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Bid History</div>
            {bids.map((b, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)" }}>
                <div style={{ fontSize: 13, color: b.winning ? "var(--gold)" : "var(--white)" }}>
                  {b.bidder} — ${b.amount.toLocaleString()}
                  {b.winning && <span style={{ fontSize: 10, color: "var(--gold)", marginLeft: 6 }}>★ Winning</span>}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{b.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — chat */}
        <div style={{ width: 280, background: "var(--deep)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ECC71", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--white)" }}>Live Chat · <span style={{ color: "var(--muted)" }}>58 watching</span></span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {chatMessages.map((m, i) => (
              <div key={i}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>{m.user}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>{m.time}</span>
                <div style={{ fontSize: 13, color: "var(--white)", marginTop: 2 }}>{m.msg}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 12, borderTop: "0.5px solid var(--border)", display: "flex", gap: 8 }}>
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Say something…" style={{ flex: 1, background: "var(--surface)", border: "none", color: "var(--white)", padding: "10px 14px", fontSize: 13, borderRadius: 2, outline: "none" }} />
            <button onClick={() => setChatInput("")} style={{ background: "var(--gold)", color: "var(--black)", border: "none", padding: "10px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", borderRadius: 2 }}>Send</button>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "var(--deep)", border: "0.5px solid var(--border-gold)", padding: 40, borderRadius: 2, maxWidth: 420, width: "100%" }}>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 300, color: "var(--white)", marginBottom: 12 }}>Confirm Bid</div>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: 28 }}>
              You are placing a bid of <strong style={{ color: "var(--gold)" }}>${bidInput.toLocaleString()}</strong> on Blue Bar Champion Cock. Your payment will be held in escrow until you confirm arrival and condition.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowConfirm(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => { setCurrentBid(bidInput); setBidInput(bidInput + 25); setShowConfirm(false); }} style={{ flex: 1, background: "var(--gold)", color: "var(--black)", border: "none", padding: 14, fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 2 }}>
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PedigreeNode({ name, ring, note, gold }: { name: string; ring: string; note: string; gold?: boolean }) {
  return (
    <div style={{ background: gold ? "rgba(212,175,55,0.05)" : "var(--surface2)", border: `0.5px solid ${gold ? "var(--gold)" : "var(--border)"}`, padding: "10px 14px", borderRadius: 2, minWidth: 160 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--white)", marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 10, color: "var(--gold)", marginBottom: 2 }}>{ring}</div>
      <div style={{ fontSize: 10, color: "var(--muted)" }}>{note}</div>
    </div>
  );
}

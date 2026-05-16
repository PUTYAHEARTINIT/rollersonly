import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const loft = {
  name: "Anderson Elite Loft",
  breeder: "James Anderson",
  location: "DeSoto, TX",
  since: 2003,
  tier: "Elite Loft",
  rating: 4.9,
  reviews: 38,
  sales: 48,
  birds: 6,
  championships: 7,
  bio: "James Anderson has been flying Birmingham Rollers competitively since 2003. Based out of DeSoto, Texas, the Anderson Elite Loft is widely regarded as one of the top producing lofts in North America. Known for the \"Anderson Bloodline\" — a consistent producer of deep-rolling, high-frequency kit birds with exceptional recovery.",
  specialties: ["Deep Rollers", "Kit Flyers", "World Cup Line", "NBRC Champions"],
  achievements: [
    { year: 2024, title: "NBRC World Cup — 2nd Place", detail: "Kit of 15 · Score 97.2" },
    { year: 2023, title: "Southwest Regional Champion", detail: "Kit of 11 · Score 95.8" },
    { year: 2022, title: "NBRC World Cup — 1st Place", detail: "Kit of 13 · Score 98.1" },
    { year: 2021, title: "Texas State Champion", detail: "Kit of 12 · Score 96.4" },
  ],
};

const activeBirds = [
  { id: 1, name: "Blue Bar Champion Cock", bid: "$1,240", status: "live", img: "/bird-white-red.jpg" },
  { id: 7, name: "Silver Dun Champion Cock", bid: "$920", status: "live", img: "/bird-white-red.jpg" },
  { id: 3, name: "Lavender Breeding Pair", bid: "$1,100", status: "upcoming", img: "/bird-lavender.jpg" },
];

const reviews = [
  { user: "Martinez Loft", rating: 5, text: "Absolutely elite quality. Bird arrived healthy, matched exactly as described. James communicates perfectly throughout the process.", date: "March 2025" },
  { user: "Khan Loft TX", rating: 5, text: "Third purchase from Anderson. Consistent champion genetics every time. The Anderson bloodline is real.", date: "January 2025" },
  { user: "Royal Birmingham", rating: 5, text: "Shipped internationally to UK with zero issues. Pedigree documentation was flawless. Highly recommend.", date: "November 2024" },
];

export default function LoftPage() {
  return (
    <>
      <Nav active="/browse" />
      <div style={{ paddingTop: 72, background: "var(--black)", minHeight: "100vh" }}>

        {/* HEADER BANNER */}
        <div style={{ background: "var(--void)", borderBottom: "0.5px solid var(--border)", padding: "64px 64px 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--surface)", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-display)", fontSize: 32, fontWeight: 300, color: "var(--gold)", flexShrink: 0 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", border: "0.5px solid var(--border-gold)", padding: "3px 10px", borderRadius: 1 }}>◆ {loft.tier}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>Member since {loft.since}</span>
              </div>
              <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: "var(--white)", marginBottom: 6 }}>{loft.name}</h1>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>{loft.breeder} · {loft.location}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {loft.specialties.map((s) => <span key={s} className="tag" style={{ fontSize: 9 }}>{s}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <a href="mailto:strangemotelmusic@gmail.com" className="btn-ghost" style={{ fontSize: 11 }}>Contact Breeder</a>
              <Link href="/signup" className="btn-gold" style={{ fontSize: 11 }}>Follow Loft</Link>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", background: "var(--surface)", borderBottom: "0.5px solid var(--border)" }}>
          {[
            [loft.sales, "Total Sales"],
            [`${loft.rating}★`, "Avg Rating"],
            [loft.reviews, "Reviews"],
            [loft.championships, "Championships"],
            [loft.birds, "Active Listings"],
          ].map(([val, label]) => (
            <div key={String(label)} style={{ padding: "28px 40px", borderRight: "0.5px solid var(--border)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: 36, fontWeight: 300, color: "var(--white)", lineHeight: 1, marginBottom: 6 }}>{val}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 0, padding: "64px", alignItems: "start" }}>
          <div style={{ paddingRight: 64 }}>

            {/* ABOUT */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>About This Loft</div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, maxWidth: 640 }}>{loft.bio}</p>
            </div>

            {/* ACTIVE LISTINGS */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>Active Listings</div>
                <Link href="/browse" style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none" }}>View all →</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
                {activeBirds.map((b) => (
                  <div key={b.id} className="auction-card">
                    <div className="auction-img-wrap">
                      <div className="auction-badge" style={{ background: b.status === "live" ? "rgba(255,50,50,0.9)" : "rgba(212,175,55,0.9)", color: b.status === "live" ? "#fff" : "#000" }}>{b.status === "live" ? "● Live" : "Upcoming"}</div>
                      <Image src={b.img} alt={b.name} fill style={{ objectFit: "contain", objectPosition: "center bottom" }} />
                    </div>
                    <div className="auction-body">
                      <div className="auction-name" style={{ fontSize: 18 }}>{b.name}</div>
                      <div className="auction-bid" style={{ marginTop: 8 }}>{b.bid}</div>
                      <Link href={`/birds/${b.id}`} style={{ display: "block", marginTop: 14, padding: "10px", background: "transparent", border: "0.5px solid var(--border-gold)", color: "var(--gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", textDecoration: "none", borderRadius: 1 }}>
                        {b.status === "live" ? "Place Bid" : "View Bird"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>Competition Record</div>
              <div style={{ border: "0.5px solid var(--border)" }}>
                {loft.achievements.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 24, alignItems: "center", padding: "20px 24px", borderBottom: i < loft.achievements.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 300, color: "var(--gold)", minWidth: 64 }}>{a.year}</div>
                    <div>
                      <div style={{ fontSize: 14, color: "var(--white)", marginBottom: 3 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>Buyer Reviews</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
                {reviews.map((r, i) => (
                  <div key={i} style={{ background: "var(--surface)", padding: "24px 28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: 13, color: "var(--white)" }}>{r.user}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.date}</div>
                    </div>
                    <div style={{ color: "var(--gold)", fontSize: 12, marginBottom: 8 }}>{"★".repeat(r.rating)}</div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div>
            <div style={{ background: "var(--void)", border: "0.5px solid var(--border-gold)", padding: 24, borderRadius: 2, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Contact Breeder</div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>Interested in a private sale, breeding pair, or have questions about a specific bird?</p>
              <a href="mailto:strangemotelmusic@gmail.com" className="btn-gold" style={{ display: "block", textAlign: "center", padding: 12, marginBottom: 10 }}>Send Message</a>
              <Link href="/signup" style={{ display: "block", textAlign: "center", padding: 12, border: "0.5px solid var(--border)", color: "var(--muted)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 1 }}>Follow Loft</Link>
            </div>

            <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", padding: 24, borderRadius: 2 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Loft Details</div>
              {[
                ["Location", loft.location],
                ["Specialty", "Birmingham Roller"],
                ["Member Since", String(loft.since)],
                ["Subscription", loft.tier],
                ["Pedigree Records", "Verified"],
                ["Ships To", "Worldwide"],
              ].map(([label, val]) => (
                <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ color: "var(--white)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

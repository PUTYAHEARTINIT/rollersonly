import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const bird = {
  id: 1,
  name: "Blue Bar Champion Cock",
  ring: "AU24-TX-44821",
  loft: "Anderson Elite Loft",
  breeder: "James Anderson",
  location: "DeSoto, TX",
  breed: "Birmingham Roller",
  sex: "Cock (Male)",
  year: 2024,
  color: "Blue Bar",
  status: "live",
  currentBid: "$1,240",
  bids: 14,
  endsIn: "2h 18m",
  img: "/bird-white-red.jpg",
  certs: ["Verified Pedigree", "DNA Cert", "Health Cert"],
  score: "97/100",
  description: "Elite performing cock from the Anderson bloodline. NBRC 2024 World Cup finalist. Sired by TX Bluebell Champion, a proven producer of high-scoring kit birds. Outstanding kit flying genetics — tight, fast rolls with exceptional recovery.",
  stats: [
    { label: "Kit Score", val: "97 / 100" },
    { label: "Roll Depth", val: "18–22 ft" },
    { label: "Roll Frequency", val: "High" },
    { label: "Recovery", val: "Excellent" },
    { label: "Competitions", val: "4" },
    { label: "Offspring Registered", val: "12" },
  ],
};

const bidHistory = [
  { user: "khanloft_tx", amount: "$1,240", time: "4m ago" },
  { user: "martinez_ca", amount: "$1,180", time: "11m ago" },
  { user: "sterling_nl", amount: "$1,050", time: "22m ago" },
  { user: "royalbhm_uk", amount: "$940", time: "45m ago" },
  { user: "desertloft_az", amount: "$820", time: "1h ago" },
];

const relatedBirds = [
  { id: 2, name: "Red Self Breeding Hen", loft: "Martinez Champion Loft", bid: "$780", img: "/bird-red.jpg", status: "live" },
  { id: 7, name: "Silver Dun Champion Cock", loft: "Anderson Elite Loft", bid: "$920", img: "/bird-white-red.jpg", status: "live" },
  { id: 3, name: "Lavender Breeding Pair", loft: "Sterling Dutch Loft", bid: "$1,100", img: "/bird-lavender.jpg", status: "upcoming" },
];

export default function BirdPage() {
  return (
    <>
      <Nav active="/browse" />
      <div style={{ paddingTop: 72, background: "var(--black)", minHeight: "100vh" }}>

        {/* BREADCRUMB */}
        <div style={{ background: "var(--surface)", borderBottom: "0.5px solid var(--border)", padding: "12px 48px", fontSize: 12, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/browse" style={{ color: "var(--muted)", textDecoration: "none" }}>Browse Birds</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "var(--white)" }}>{bird.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 0, maxWidth: 1400, margin: "0 auto", padding: "48px 48px 80px" }}>

          {/* LEFT COLUMN */}
          <div style={{ paddingRight: 48 }}>

            {/* IMAGE */}
            <div style={{ position: "relative", height: 520, background: "var(--void)", border: "0.5px solid var(--border)", borderRadius: 2, overflow: "hidden", marginBottom: 32 }}>
              <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2, background: "rgba(255,50,50,0.9)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 2 }}>● Live Auction</div>
              <div style={{ display: "flex", gap: 8, position: "absolute", top: 16, right: 16, zIndex: 2 }}>
                {bird.certs.map((c) => <span key={c} className="tag" style={{ fontSize: 9 }}>{c}</span>)}
              </div>
              <Image src={bird.img} alt={bird.name} fill style={{ objectFit: "contain", objectPosition: "center" }} />
            </div>

            {/* BIRD INFO */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{bird.breed} · {bird.color} · {bird.sex}</p>
              <h1 style={{ fontFamily: "var(--ff-display)", fontSize: 42, fontWeight: 300, color: "var(--white)", marginBottom: 8, lineHeight: 1.1 }}>{bird.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  <Link href="/loft/anderson" style={{ color: "var(--gold)", textDecoration: "none" }}>{bird.loft}</Link>
                  {" "}· {bird.location}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted)", border: "0.5px solid var(--border)", padding: "3px 10px", borderRadius: 1 }}>Ring: {bird.ring}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, maxWidth: 620 }}>{bird.description}</p>
            </div>

            {/* PERFORMANCE STATS */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>Performance Profile</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)", border: "0.5px solid var(--border)" }}>
                {bird.stats.map(({ label, val }) => (
                  <div key={label} style={{ background: "var(--surface)", padding: "20px 24px" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 22, fontWeight: 300, color: "var(--white)" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PEDIGREE PREVIEW */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>Bloodline (3 Generations)</div>
                <Link href="/pedigree" style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none" }}>Full pedigree vault →</Link>
              </div>
              <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
                <PedNode name={bird.name} ring={bird.ring} note="Subject" gold />
                <span style={{ color: "var(--gold)", alignSelf: "center", flexShrink: 0 }}>›</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <PedNode name="TX Bluebell Champion" ring="AU21-TX-00442" note="Sire · NBRC 2021" gold />
                  <PedNode name="Silver Queen Hen" ring="AU20-TX-09871" note="Dam · World Cup 2020" />
                </div>
                <span style={{ color: "var(--gold)", alignSelf: "center", flexShrink: 0 }}>›</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <PedNode name="TX Heritage Blue" ring="AU19-TX-00112" note="Paternal Grandsire" />
                  <PedNode name="Anderson's Glory" ring="AU18-TX-00089" note="Paternal Granddam" />
                  <PedNode name="Desert Wind Cock" ring="AU19-AZ-00554" note="Maternal Grandsire" />
                  <PedNode name="World Cup Hen" ring="AU18-TX-00302" note="Maternal Granddam" />
                </div>
              </div>
            </div>

            {/* RELATED */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>More From This Loft</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
                {relatedBirds.map((b) => (
                  <Link key={b.id} href={`/birds/${b.id}`} style={{ background: "var(--surface)", display: "block", textDecoration: "none" }}>
                    <div style={{ position: "relative", height: 160, background: "#000" }}>
                      <Image src={b.img} alt={b.name} fill style={{ objectFit: "contain", objectPosition: "center bottom" }} />
                    </div>
                    <div style={{ padding: "14px 16px", borderTop: "0.5px solid var(--border)" }}>
                      <div style={{ fontSize: 13, color: "var(--white)", marginBottom: 2 }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{b.loft}</div>
                      <div style={{ fontSize: 13, color: "var(--gold)", marginTop: 8, fontFamily: "var(--ff-display)" }}>{b.bid}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — BID ENGINE */}
          <div style={{ position: "sticky", top: 88, height: "fit-content" }}>

            {/* BID CARD */}
            <div style={{ background: "var(--void)", border: "0.5px solid var(--border-gold)", borderRadius: 2, padding: 28, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Current bid</div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 44, fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{bird.currentBid}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{bird.bids} bids placed</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Ends in</div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 300, color: "var(--white)" }}>{bird.endsIn}</div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>Your bid (min $1,260)</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" placeholder="1,260" style={{ flex: 1, background: "var(--deep)", border: "0.5px solid var(--border)", color: "var(--white)", padding: "12px 16px", fontSize: 16, borderRadius: 2, outline: "none", fontFamily: "var(--ff-display)" }} />
                  <Link href="/signup" className="btn-gold" style={{ padding: "12px 20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Place Bid</Link>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["+$20", "+$50", "+$100"].map((inc) => (
                  <Link key={inc} href="/signup" style={{ flex: 1, textAlign: "center", padding: "8px", background: "var(--deep)", border: "0.5px solid var(--border)", color: "var(--muted)", fontSize: 12, borderRadius: 1, textDecoration: "none", cursor: "pointer" }}>{inc}</Link>
                ))}
              </div>

              <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6, padding: "12px 0", borderTop: "0.5px solid var(--border)" }}>
                🔒 Escrow-protected · Funds held until delivery confirmed · <Link href="/signup" style={{ color: "var(--gold)", textDecoration: "none" }}>Sign in to bid</Link>
              </div>
            </div>

            {/* SELLER INFO */}
            <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 2, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>Seller</div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--void)", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-display)", fontSize: 18, color: "var(--gold)" }}>A</div>
                <div>
                  <div style={{ fontSize: 14, color: "var(--white)", marginBottom: 2 }}>{bird.breeder}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{bird.loft} · {bird.location}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, borderTop: "0.5px solid var(--border)", paddingTop: 14 }}>
                <div><div style={{ fontFamily: "var(--ff-display)", fontSize: 20 }}>48</div><div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Sales</div></div>
                <div><div style={{ fontFamily: "var(--ff-display)", fontSize: 20 }}>4.9★</div><div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Rating</div></div>
                <div><div style={{ fontFamily: "var(--ff-display)", fontSize: 20 }}>Elite</div><div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Tier</div></div>
              </div>
              <Link href="/loft/anderson" style={{ display: "block", marginTop: 14, padding: "10px", textAlign: "center", border: "0.5px solid var(--border)", color: "var(--muted)", fontSize: 11, borderRadius: 1, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>View Loft Profile →</Link>
            </div>

            {/* BID HISTORY */}
            <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 2, padding: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>Bid History</div>
              {bidHistory.map((b, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < bidHistory.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--white)" }}>{i === 0 ? "⭐ " : ""}{b.user}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{b.time}</div>
                  </div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: i === 0 ? "var(--gold)" : "var(--muted)" }}>{b.amount}</div>
                </div>
              ))}
              <Link href={`/auctions/1`} style={{ display: "block", marginTop: 14, padding: "10px", textAlign: "center", background: "var(--deep)", border: "0.5px solid var(--border)", color: "var(--muted)", fontSize: 11, borderRadius: 1, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>Enter Live Auction Room →</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function PedNode({ name, ring, note, gold }: { name: string; ring: string; note: string; gold?: boolean }) {
  return (
    <div style={{ background: gold ? "rgba(212,175,55,0.05)" : "var(--surface)", border: `0.5px solid ${gold ? "var(--gold)" : "var(--border)"}`, padding: "10px 14px", borderRadius: 2, minWidth: 160, borderLeft: gold ? "2px solid var(--gold)" : undefined }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--white)", marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 9, color: "var(--gold)", marginBottom: 2 }}>{ring}</div>
      <div style={{ fontSize: 9, color: "var(--muted)" }}>{note}</div>
    </div>
  );
}

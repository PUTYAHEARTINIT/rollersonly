import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const featured = {
  issue: "Vol. 12 · Issue 3 · Spring 2025",
  title: "The Science of the Deep Roll: What Separates 90-Point Birds from 70-Point Birds",
  excerpt: "We sat down with three NBRC World Cup champions to break down the genetics, training regimens, and selection criteria that consistently produce elite kit birds. Inside: Anderson bloodline deep-dive, roll frequency vs. depth tradeoffs, and why the sport's top breeders disagree on what a 100-point bird looks like.",
  author: "Steven R. Harts, Editor-in-Chief",
  readTime: "18 min read",
  img: "/bird-white-red.jpg",
  tags: ["Genetics", "Training", "Competition"],
};

const articles = [
  {
    category: "Bloodlines",
    title: "The Anderson Bloodline: 20 Years of Consistent Champions",
    excerpt: "How one Texas loft built the most duplicated bloodline in North American roller flying — and what makes it reproducible.",
    author: "J. Wallace",
    readTime: "12 min",
    img: "/bird-lavender.jpg",
    premium: false,
  },
  {
    category: "Health & Care",
    title: "PMV-1 Prevention in the Competition Loft: A 2025 Protocol",
    excerpt: "Updated vaccination schedules, biosecurity measures, and what to do if you're competing internationally.",
    author: "Dr. M. Torres, DVM",
    readTime: "8 min",
    img: "/bird-red.jpg",
    premium: true,
  },
  {
    category: "Auction Strategy",
    title: "How to Read a Pedigree Before You Bid",
    excerpt: "Three generations of data in one screen. Here's what the top buyers look for — and the red flags most people miss.",
    author: "C. Martinez",
    readTime: "10 min",
    img: "/bird-black-centertail.jpg",
    premium: true,
  },
  {
    category: "Competition",
    title: "NBRC World Cup 2025: Everything You Need to Know",
    excerpt: "Dates, format, scoring changes, kit size rules, and why this year's Oklahoma competition is expected to be the most competitive in a decade.",
    author: "Editorial Staff",
    readTime: "6 min",
    img: "/bird-white-red2.jpg",
    premium: false,
  },
  {
    category: "Breeding",
    title: "Line Breeding vs. Outcrossing: When to Do Each",
    excerpt: "The oldest debate in roller flying, settled — or at least argued — with real data from five lofts over 10 years.",
    author: "H. Sterling",
    readTime: "14 min",
    img: "/bird-red2.jpg",
    premium: true,
  },
  {
    category: "Spotlight",
    title: "Rising Loft: Khan Loft Dallas — From Backyard Hobbyist to Regional Champion",
    excerpt: "Arif Khan started with 8 birds in 2018. Today he's one of the most talked-about up-and-coming lofts in Texas.",
    author: "Editorial Staff",
    readTime: "9 min",
    img: "/bird-lavender.jpg",
    premium: false,
  },
];

const pastIssues = [
  { vol: "Vol. 12 · Issue 2", season: "Winter 2025", title: "The Future of Pigeon Sport Technology" },
  { vol: "Vol. 12 · Issue 1", season: "Fall 2024", title: "World Cup 2024 Full Coverage" },
  { vol: "Vol. 11 · Issue 4", season: "Summer 2024", title: "International Bloodlines: Europe Edition" },
  { vol: "Vol. 11 · Issue 3", season: "Spring 2024", title: "The Top 50 Lofts in North America" },
];

export default function MagazinePage() {
  return (
    <>
      <Nav active="/magazine" />
      <div style={{ paddingTop: 72, background: "var(--black)", minHeight: "100vh" }}>

        {/* MASTHEAD */}
        <div style={{ background: "var(--void)", borderBottom: "0.5px solid var(--border)", padding: "48px 64px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>QSDC — The RollersOnly Magazine</p>
              <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.01em" }}>Quality, Sport,<br /><em style={{ color: "var(--gold)" }}>Dedication & Community</em></h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{featured.issue}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>Published quarterly · Breeder + Elite Loft</div>
              <Link href="/signup" className="btn-gold" style={{ fontSize: 11 }}>Subscribe to Access All Issues</Link>
            </div>
          </div>
        </div>

        <div style={{ padding: "56px 64px 80px" }}>

          {/* FEATURED ARTICLE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 48, marginBottom: 72, background: "var(--void)", border: "0.5px solid var(--border-gold)", padding: 40, borderRadius: 2 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", border: "0.5px solid var(--border-gold)", padding: "3px 10px", borderRadius: 1 }}>◆ Cover Story</span>
              <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.15, margin: "20px 0 16px" }}>{featured.title}</h2>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>{featured.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>By {featured.author}</span>
                <span style={{ width: 1, height: 12, background: "var(--border)" }} />
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{featured.readTime}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                {featured.tags.map((t) => <span key={t} className="tag" style={{ fontSize: 9 }}>{t}</span>)}
              </div>
              <Link href="/signup" className="btn-gold" style={{ padding: "12px 28px" }}>Read Full Article</Link>
            </div>
            <div style={{ position: "relative", height: 360, borderRadius: 2, overflow: "hidden", background: "#000" }}>
              <Image src={featured.img} alt={featured.title} fill style={{ objectFit: "contain", objectPosition: "center" }} />
            </div>
          </div>

          {/* ARTICLE GRID */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 300, color: "var(--white)", marginBottom: 32 }}>In This Issue</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
              {articles.map((a, i) => (
                <div key={i} style={{ background: "var(--surface)", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: 200, background: "#000", overflow: "hidden" }}>
                    <Image src={a.img} alt={a.title} fill style={{ objectFit: "contain", objectPosition: "center bottom" }} />
                    {a.premium && (
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(212,175,55,0.9)", color: "#000", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 1 }}>◆ Premium</div>
                    )}
                  </div>
                  <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{a.category}</div>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 18, fontWeight: 400, color: "var(--white)", marginBottom: 10, lineHeight: 1.25, flex: 1 }}>{a.title}</div>
                    <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{a.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{a.readTime} · {a.author}</span>
                      {a.premium
                        ? <Link href="/signup" style={{ fontSize: 11, color: "var(--gold)", textDecoration: "none" }}>Unlock →</Link>
                        : <Link href="/signup" style={{ fontSize: 11, color: "var(--gold)", textDecoration: "none" }}>Read →</Link>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48 }}>

            {/* PAST ISSUES */}
            <div>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: 24, fontWeight: 300, color: "var(--white)", marginBottom: 24 }}>Past Issues</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
                {pastIssues.map((issue, i) => (
                  <div key={i} style={{ background: "var(--surface)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{issue.vol} · {issue.season}</div>
                      <div style={{ fontSize: 14, color: "var(--white)" }}>{issue.title}</div>
                    </div>
                    <Link href="/signup" style={{ fontSize: 11, color: "var(--gold)", textDecoration: "none", whiteSpace: "nowrap", marginLeft: 20 }}>Read →</Link>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSCRIBE CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "var(--void)", border: "0.5px solid var(--border-gold)", padding: 28, borderRadius: 2 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>◆</div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 22, fontWeight: 300, color: "var(--white)", marginBottom: 8 }}>Full Archive Access</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>Breeder and Elite Loft subscribers get full access to every issue, every article, and our growing archive of competition data going back to 2018.</p>
                <Link href="/signup" className="btn-gold" style={{ display: "block", textAlign: "center", padding: 12, marginBottom: 10 }}>Upgrade to Breeder</Link>
                <Link href="/how-it-works" style={{ display: "block", textAlign: "center", padding: 10, border: "0.5px solid var(--border)", color: "var(--muted)", fontSize: 11, textDecoration: "none", borderRadius: 1, letterSpacing: "0.08em", textTransform: "uppercase" }}>Learn More</Link>
              </div>

              <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", padding: 24, borderRadius: 2 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>Write for QSDC</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>Are you a breeder, veterinarian, or competition judge with expertise to share? We publish contributor articles from the community quarterly.</p>
                <a href="mailto:strangemotelmusic@gmail.com" style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none" }}>Submit a pitch →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

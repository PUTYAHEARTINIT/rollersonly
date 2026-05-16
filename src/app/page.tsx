import Image from "next/image";
import Countdown from "@/components/Countdown";

const tickerItems = [
  "Blue Bar Champion Cock — Sold $1,850",
  "◆",
  "Anderson Loft — New Listing: World Cup Bloodline",
  "◆",
  "Live Auction Starting in 18 Minutes — 42 Registered Bidders",
  "◆",
  "Verified DNA Cert — Red Checker Hen — Opening Bid $400",
  "◆",
  "NBRC World Cup Season Results Now Live",
  "◆",
];

const auctionCards = [
  {
    badge: "● Live",
    badgeClass: "badge-live",
    img: "/bird-white-red.jpg",
    name: "Blue Bar Champion Cock",
    breeder: "Anderson Loft · DeSoto, Texas, USA",
    bidLabel: "Current bid",
    bid: "$1,240",
    timeLabel: "Ends in",
    seconds: 1122,
    tags: ["Verified Pedigree", "DNA Cert"],
  },
  {
    badge: "● Live",
    badgeClass: "badge-live",
    img: "/bird-red.jpg",
    name: "Red Self Breeding Hen",
    breeder: "Martinez Champion Loft · California, USA",
    bidLabel: "Current bid",
    bid: "$780",
    timeLabel: "Ends in",
    seconds: 2655,
    tags: ["World Cup Line", "Health Cert"],
  },
  {
    badge: "Starts in 18 min",
    badgeClass: "badge-upcoming",
    img: "/bird-lavender.jpg",
    name: "White Badge Breeding Pair",
    breeder: "Royal Birmingham Loft · Birmingham, UK",
    bidLabel: "Opening bid",
    bid: "$600",
    timeLabel: "Starts in",
    seconds: 1075,
    tags: ["Breeding Pair", "NBRC Champion"],
  },
];

const featuredBirds = [
  { img: "/bird-white-red.jpg", name: "Blue Bar Champion", meta: "Anderson Loft · Texas · Male · 2024", price: "Opening bid $400" },
  { img: "/bird-lavender.jpg", name: "Lavender Hen — World Cup", meta: "Sterling Loft · Netherlands · Female · 2023", price: "Opening bid $650" },
  { img: "/bird-red.jpg", name: "Red Self Breeding Cock", meta: "Martinez Loft · California · Male · 2024", price: "Opening bid $350" },
  { img: "/bird-white-red2.jpg", name: "White Badge Roller Hen", meta: "Royal Birmingham Loft · UK · Female · 2024", price: "Opening bid $500" },
  { img: "/bird-black-centertail.jpg", name: "Black Centertail Young Cock", meta: "Khan Loft · Texas · Male · 2025", price: "Opening bid $280" },
  { img: "/bird-red2.jpg", name: "Recessive Red Breeding Hen", meta: "Desert Loft · Arizona · Female · 2024", price: "Opening bid $420" },
];

const breeders = [
  { initial: "A", name: "Anderson Loft", location: "DeSoto, Texas, USA", sold: 142, championships: 18 },
  { initial: "M", name: "Martinez Champion Loft", location: "Los Angeles, California, USA", sold: 98, championships: 12 },
  { initial: "R", name: "Royal Birmingham Loft", location: "Birmingham, England, UK", sold: 211, championships: 31 },
  { initial: "S", name: "Sterling Dutch Loft", location: "Amsterdam, Netherlands", sold: 76, championships: 9 },
];

const features = [
  { num: "01", title: "Live Auction Rooms", desc: "Real-time bidding with photo of the bird. Countdown clock, live chat, and escrow auto-triggered on hammer. Breeder submits video same day." },
  { num: "02", title: "Verified Pedigree Vault", desc: "Every bird registered with a unique platform ID. Bloodlines locked and verified — tamper-proof lineage chains going back generations." },
  { num: "03", title: "AI Breeding Matchmaker", desc: "Enter your birds' pedigree data and our AI analyzes bloodlines, flags common ancestors, and recommends optimal breeding pairs from across the platform." },
  { num: "04", title: "Health & DNA Certification", desc: "Partner veterinary network. DNA parentage confirmation. Certified birds carry visible trust badges on every listing." },
  { num: "05", title: "Escrow-Protected Payments", desc: "Buyer funds held until arrival confirmed. First platform to offer true escrow protection for roller pigeon transactions globally." },
];

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">Rollers<span>Only</span></a>
        <ul className="nav-links">
          <li><a href="#">Live Auctions</a></li>
          <li><a href="#">Browse Birds</a></li>
          <li><a href="#">Top Breeders</a></li>
          <li><a href="#">Pedigrees</a></li>
          <li><a href="#">Leaderboards</a></li>
        </ul>
        <div className="nav-cta">
          <a href="#" className="btn-ghost">Sign in</a>
          <a href="#" className="btn-gold">Join Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-text">ROLLERS</div>
        <div className="hero-line" />
        <Image
          src="/bird-white-red.jpg"
          alt="Elite roller pigeon"
          width={900}
          height={900}
          className="hero-bird-main"
          priority
        />
        <Image
          src="/bird-red.jpg"
          alt="Roller pigeon"
          width={600}
          height={600}
          className="hero-bird-ghost"
          priority
        />
        <div className="hero-content">
          <p className="hero-eyebrow">The world&apos;s premier roller pigeon marketplace</p>
          <h1 className="hero-title">
            Where <em>Elite</em><br />Birds Find<br />Their Worth
          </h1>
          <p className="hero-sub">
            Live auctions. Verified pedigrees. Escrow-protected transactions.
            The platform the global roller pigeon community has always deserved.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-gold-lg">Enter the Loft</a>
            <a href="#" className="btn-ghost-lg">View Live Auctions</a>
          </div>
        </div>
        <div className="hero-badge">
          <div className="live-dot">3 Live Auctions Now</div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className={item === "◆" ? "ticker-item ticker-sep" : "ticker-item"}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* LIVE AUCTIONS */}
      <div className="auctions-section">
        <div className="auctions-header">
          <div>
            <p className="section-eyebrow">Active Right Now</p>
            <h2 className="section-title">Live Auctions</h2>
          </div>
          <a href="#" className="btn-ghost">View all auctions →</a>
        </div>
        <div className="auctions-grid">
          {auctionCards.map((card, i) => (
            <div key={i} className="auction-card">
              <div className="auction-img-wrap">
                <div className={`auction-badge ${card.badgeClass}`}>{card.badge}</div>
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="auction-img"
                  style={{ objectFit: "contain", objectPosition: "center bottom" }}
                />
              </div>
              <div className="auction-body">
                <div className="auction-name">{card.name}</div>
                <div className="auction-breeder">{card.breeder}</div>
                <div className="auction-meta">
                  <div>
                    <div className="auction-bid-label">{card.bidLabel}</div>
                    <div className="auction-bid">{card.bid}</div>
                  </div>
                  <div className="auction-timer">
                    <div className="timer-label">{card.timeLabel}</div>
                    <Countdown seconds={card.seconds} />
                  </div>
                </div>
                <div className="auction-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stat-item">
          <div className="stat-number">12<span>K+</span></div>
          <div className="stat-label">Verified birds registered</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">$2<span>M+</span></div>
          <div className="stat-label">In transactions protected</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">340<span>+</span></div>
          <div className="stat-label">Elite loft breeders</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">48<span>+</span></div>
          <div className="stat-label">Countries represented</div>
        </div>
      </div>

      {/* FEATURED BIRDS */}
      <div className="showcase-section">
        <div className="showcase-header">
          <p className="section-eyebrow">Current Listings</p>
          <h2 className="section-title">Featured Birds</h2>
        </div>
        <div className="bird-parade">
          {featuredBirds.map((bird, i) => (
            <div key={i} className="bird-card">
              <Image
                src={bird.img}
                alt={bird.name}
                width={280}
                height={400}
                className="bird-card-img"
              />
              <div className="bird-card-info">
                <div className="bird-card-name">{bird.name}</div>
                <div className="bird-card-meta">{bird.meta}</div>
                <div className="bird-card-price">{bird.price}</div>
                <button className="bid-btn">Place Bid</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP BREEDERS */}
      <div className="breeders-section">
        <div className="breeders-header">
          <div>
            <p className="section-eyebrow">Verified Elite Lofts</p>
            <h2 className="section-title">Top Breeders</h2>
          </div>
          <a href="#" className="btn-ghost">View all breeders →</a>
        </div>
        <div className="breeders-grid">
          {breeders.map((b, i) => (
            <div key={i} className="breeder-card">
              <div className="breeder-avatar">{b.initial}</div>
              <div className="breeder-name">{b.name}</div>
              <div className="breeder-location">{b.location}</div>
              <div className="breeder-stats">
                <div>
                  <div className="b-stat-val">{b.sold}</div>
                  <div className="b-stat-label">Birds sold</div>
                </div>
                <div>
                  <div className="b-stat-val">{b.championships}</div>
                  <div className="b-stat-label">Championships</div>
                </div>
              </div>
              <div className="elite-badge">Elite Loft</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-section">
        <div className="features-left">
          <p className="section-eyebrow">Platform Pillars</p>
          <h2 className="section-title" style={{ marginBottom: "40px" }}>
            Built for the<br />
            <em style={{ fontFamily: "var(--ff-display)", color: "var(--gold)" }}>Serious</em> Fancier
          </h2>
          <div className="feature-list">
            {features.map((f) => (
              <div key={f.num} className="feature-item">
                <span className="feature-num">{f.num}</span>
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="features-right">
          <div className="feature-ring" />
          <Image
            src="/bird-black-centertail.jpg"
            alt="Elite roller pigeon"
            width={500}
            height={600}
            className="feature-bird"
          />
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section">
        <div className="pricing-header">
          <p className="section-eyebrow">Membership</p>
          <h2 className="section-title">Choose Your Tier</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            From passionate hobbyist to world-class elite breeder — there&apos;s a place for you.
          </p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Fancier</div>
            <div className="pricing-price"><sup>$</sup>19<sub>/mo</sub></div>
            <div className="pricing-desc">Browse, bid, and buy with full buyer protection.</div>
            <div className="pricing-feature">Full marketplace access</div>
            <div className="pricing-feature">Bid in live auctions</div>
            <div className="pricing-feature">View verified pedigrees</div>
            <div className="pricing-feature">Escrow buyer protection</div>
            <div className="pricing-feature">Competition leaderboards</div>
            <div className="pricing-action">
              <a href="#" className="btn-ghost" style={{ display: "block", textAlign: "center", padding: "12px" }}>
                Get started
              </a>
            </div>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-tier">Breeder</div>
            <div className="pricing-price"><sup>$</sup>49<sub>/mo</sub></div>
            <div className="pricing-desc">List your birds, build your loft reputation globally.</div>
            <div className="pricing-feature">Everything in Fancier</div>
            <div className="pricing-feature">Unlimited bird listings</div>
            <div className="pricing-feature">Public loft profile page</div>
            <div className="pricing-feature">Pedigree registry access</div>
            <div className="pricing-feature">AI breeding matchmaker</div>
            <div className="pricing-feature">Fly video uploads</div>
            <div className="pricing-action">
              <a href="#" className="btn-gold" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: "2px" }}>
                Join as Breeder
              </a>
            </div>
          </div>
          <div className="pricing-card">
            <div className="pricing-tier">Elite Loft</div>
            <div className="pricing-price"><sup>$</sup>149<sub>/mo</sub></div>
            <div className="pricing-desc">For champion breeders who demand maximum reach and credibility.</div>
            <div className="pricing-feature">Everything in Breeder</div>
            <div className="pricing-feature">Featured placement in auctions</div>
            <div className="pricing-feature">Verified Elite badge</div>
            <div className="pricing-feature">Championship auction priority</div>
            <div className="pricing-feature">DNA cert display</div>
            <div className="pricing-feature">Full analytics dashboard</div>
            <div className="pricing-action">
              <a href="#" className="btn-ghost" style={{ display: "block", textAlign: "center", padding: "12px" }}>
                Apply for Elite
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <Image src="/bird-red2.jpg" alt="" width={400} height={500} className="cta-bird-left" aria-hidden />
        <Image src="/bird-lavender.jpg" alt="" width={400} height={500} className="cta-bird-right" aria-hidden />
        <h2 className="cta-title">
          Your Birds Deserve<br />a <em>World-Class</em> Stage
        </h2>
        <p className="cta-sub">
          Join thousands of roller pigeon fanciers who trust RollersOnly for every transaction.
        </p>
        <div className="cta-actions">
          <a href="#" className="btn-gold-lg">Create Your Loft Profile</a>
          <a href="#" className="btn-ghost-lg">Browse Live Auctions</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Rollers<span>Only</span></div>
            <p className="footer-tagline">
              The world&apos;s first dedicated marketplace for elite roller pigeon breeders, competitors, and collectors.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links">
              <li><a href="#">Live Auctions</a></li>
              <li><a href="#">Browse Birds</a></li>
              <li><a href="#">Pedigree Vault</a></li>
              <li><a href="#">Leaderboards</a></li>
              <li><a href="#">Fly Videos</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Community</div>
            <ul className="footer-links">
              <li><a href="#">Top Breeders</a></li>
              <li><a href="#">Elite Lofts</a></li>
              <li><a href="#">Championship Events</a></li>
              <li><a href="#">AI Matchmaking</a></li>
              <li><a href="#">About NBRC</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <ul className="footer-links">
              <li><a href="#">How it Works</a></li>
              <li><a href="#">Shipping Guide</a></li>
              <li><a href="#">Escrow Policy</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Become a Partner</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 RollersOnly LLC. All rights reserved.</span>
          <div className="footer-badges">
            <span className="footer-badge">Escrow Protected</span>
            <span className="footer-badge">Verified Pedigrees</span>
            <span className="footer-badge">DNA Certified</span>
          </div>
        </div>
      </footer>
    </>
  );
}

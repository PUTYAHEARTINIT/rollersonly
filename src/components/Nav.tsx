import Link from "next/link";

export default function Nav({ active }: { active?: string }) {
  const links = [
    { label: "Live Auctions", href: "/auctions" },
    { label: "Browse Birds", href: "/browse" },
    { label: "Top Breeders", href: "/breeders" },
    { label: "Pedigrees", href: "/pedigree" },
    { label: "Leaderboards", href: "/leaderboards" },
  ];

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
        <Link href="/signin" className="btn-ghost">Sign in</Link>
        <Link href="/signup" className="btn-gold">Join Now</Link>
      </div>
    </nav>
  );
}

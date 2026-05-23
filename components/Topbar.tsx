"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const path = usePathname();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/mairie" className="logo">
          <span className="mark" />
          <div>
            SponsoLocal
            <small>Sport · Commune · Commerces</small>
          </div>
        </Link>
        <nav className="tabs">
          <Link href="/mairie" className={path.startsWith("/mairie") ? "active" : ""}>
            Espace Mairie
          </Link>
          <Link href="/club" className={path.startsWith("/club") ? "active" : ""}>
            Espace Club
          </Link>
          <Link href="/sponsor" className={path.startsWith("/sponsor") ? "active" : ""}>
            Espace Sponsor
          </Link>
        </nav>
        <div className="right-meta">
          Démo MVP<br />Villeneuve-sur-Loire
        </div>
      </div>
    </header>
  );
}

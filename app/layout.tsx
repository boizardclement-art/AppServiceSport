import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar";

export const metadata: Metadata = {
  title: "SponsoLocal — Plateforme de financement du sport local",
  description: "Vision consolidée subventions + sponsoring privé pour les communes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="gov-strip">
          <span className="seal" />
          <span>Plateforme conventionnée · Service public local</span>
          <span className="strip-right">v1.0 · Mairie de Villeneuve-sur-Loire</span>
        </div>
        <Topbar />
        {children}
        <footer>
          <div className="inner">
            <span>SponsoLocal · Plateforme conventionnée</span>
            <span>Mentions légales · CGU · Confidentialité</span>
            <span>Démo MVP · v1</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { clubs, disciplines } from "@/lib/mock-data";

const disciplineIcons: Record<string, string> = {
  Football: "⚽", Cyclisme: "🚴", Tennis: "🎾", Judo: "🥋",
  Boxe: "🥊", Handisport: "♿", Aviron: "🚣", Natation: "🏊",
};

export default function SponsorPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterDisc, setFilterDisc] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const actifs = clubs.filter(c => c.statut === "actif");
  const displayed = filterDisc ? actifs.filter(c => c.discipline === filterDisc) : actifs;

  const dynamisme_chip: Record<string, string> = {
    ok: "ok", warn: "warn", bad: "bad", gray: "gray",
  };
  const dynamisme_label: Record<string, string> = {
    ok: "très actif", warn: "stable", bad: "à soutenir",
  };

  if (selected) {
    const club = clubs.find(c => c.id === selected)!;
    return (
      <main>
        <div className="page-head">
          <div>
            <div className="crumbs" style={{ cursor: "pointer" }} onClick={() => { setSelected(null); setStep(0); }}>
              ← Retour au catalogue
            </div>
            <h1>{club.nom}</h1>
            <div className="row gap-8 mt-12 wrap">
              <span className="chip">{club.discipline}</span>
              <span className={`chip ${club.dynamisme_chip}`}><span className="dot" /> {club.dynamisme}</span>
            </div>
          </div>
          <div className="actions">
            <button className="btn ghost" onClick={() => { setSelected(null); setStep(0); }}>← Catalogue</button>
          </div>
        </div>

        {step === 0 && (
          <>
            <p className="lede mb-24">{club.description}</p>
            <div className="grid-4 mb-32">
              {[
                { label: "Licenciés", val: club.licencies },
                { label: "Équipes", val: club.equipes },
                { label: "Encadrants", val: club.encadrants },
                { label: "Fondé en", val: club.fonde },
              ].map(s => (
                <div key={s.label} className="card">
                  <div className="eyebrow">{s.label}</div>
                  <div className="num" style={{ fontFamily: "var(--display)", fontSize: 32, marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>

            <div className="section-title">
              <h3>Choisir une offre de soutien</h3>
            </div>

            <div className="col gap-12">
              {club.packs.length > 0 ? club.packs.map(pack => (
                <div key={pack.titre} className={`pack${pack.feature ? " feature" : ""}`}>
                  <div className="row between center">
                    <div className="row gap-8 center">
                      <span className={`chip ${pack.chip}`}>{pack.niveau}</span>
                      <h4>{pack.titre}</h4>
                      <span className="chip legal">⚖ Parrainage · contrat commercial</span>
                    </div>
                    <div className="price num">{pack.prix.toLocaleString("fr-FR")} €<small style={{ fontSize: 13, color: "var(--muted)" }}> /{pack.periodicite}</small></div>
                  </div>
                  <ul>{pack.contreparties.map(c => <li key={c}>{c}</li>)}</ul>
                  <div className="row between mt-4">
                    <span className="meta">{pack.places === null ? "Places illimitées" : `${pack.places - pack.vendus} places restantes`}</span>
                    <button className="btn sm forest" onClick={() => setStep(1)}>Soutenir cette offre →</button>
                  </div>
                </div>
              )) : (
                <div className="card tint-bg2" style={{ textAlign: "center", padding: 32 }}>
                  <p className="meta">Ce club n&apos;a pas encore configuré ses offres.</p>
                </div>
              )}

              <div className="card pad-lg tint-cream">
                <div className="row between center">
                  <div>
                    <div className="eyebrow">Don libre · Mécénat</div>
                    <h4 className="mt-4">Soutenir sans contrepartie</h4>
                    {club.interet_general && (
                      <span className="chip legal mt-8" style={{ display: "inline-flex" }}>⚖ Reçu fiscal CERFA 11580 · réduction d&apos;impôt 60 %</span>
                    )}
                  </div>
                  <div className="col gap-8" style={{ alignItems: "flex-end" }}>
                    <div className="row gap-8">
                      {["10 €", "25 €", "50 €", "100 €"].map(p => (
                        <button key={p} className="btn ghost sm">{p}</button>
                      ))}
                    </div>
                    <button className="btn sm amber" onClick={() => setStep(1)}>Faire un don →</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="grid-3">
            <div className="card pad-lg">
              <div className="row between center mb-12">
                <span className="eyebrow">01</span>
                <span className="chip outline">{club.nom}</span>
              </div>
              <h4>Offre sélectionnée</h4>
              <div className={`pack feature mt-16`}>
                <div className="row between center">
                  <span className="chip amber">Or</span>
                  <div className="price num">1 500 €</div>
                </div>
                <h4>Pack Maillot</h4>
                <span className="chip legal" style={{ alignSelf: "flex-start" }}>⚖ Parrainage · contrat commercial</span>
                <ul>
                  <li>Logo sur le maillot équipe 1</li>
                  <li>Bannière + post mensuel</li>
                  <li>Invitation gala VIP</li>
                </ul>
                <div className="meta mt-4">2 / 3 places restantes</div>
              </div>
              <button className="btn forest mt-16" style={{ width: "100%", justifyContent: "center" }} onClick={() => setStep(2)}>
                Continuer →
              </button>
            </div>

            <div className="card pad-lg">
              <div className="row between center mb-12">
                <span className="eyebrow">02</span>
                <span className="chip outline">Souscription</span>
              </div>
              <h4>Coordonnées &amp; paiement</h4>
              <div className="col gap-8 mt-16">
                <div className="field"><span className="ph">Raison sociale…</span></div>
                <div className="row gap-8">
                  <div className="field flex1"><span className="ph">SIRET</span></div>
                  <div className="field flex1"><span className="ph">Téléphone</span></div>
                </div>
                <div className="field"><span>contact@garage-du-centre.fr</span></div>
              </div>
              <div className="eyebrow mt-16 amber">★ Nature juridique de votre soutien</div>
              <div className="col gap-8 mt-8">
                <div className="card pad-sm" style={{ borderColor: "var(--amber)", borderWidth: 1.5, background: "var(--cream)" }}>
                  <div className="row between center">
                    <div>
                      <b style={{ fontFamily: "var(--display)", fontSize: 17 }}>Parrainage</b>
                      <div className="meta">contrepartie définie · charge déductible</div>
                    </div>
                    <span className="chip amber">sélectionné</span>
                  </div>
                </div>
                <div className="card pad-sm" style={{ background: "var(--bg)" }}>
                  <div className="row between center">
                    <div>
                      <b style={{ fontFamily: "var(--display)", fontSize: 17 }}>Mécénat (don)</b>
                      <div className="meta">aucune contrepartie significative · réduction d&apos;impôt 60 %</div>
                    </div>
                    <span className="meta">→</span>
                  </div>
                </div>
              </div>
              <div className="eyebrow mt-16">Engagement</div>
              <div className="row gap-8 mt-8">
                <span className="chip forest">Annuel · 1 500 €</span>
                <span className="chip outline">Mensuel · 130 €</span>
              </div>
              <div className="card pad-sm mt-16" style={{ background: "var(--bg)" }}>
                <div className="row between center mb-8">
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Paiement par carte · Stripe</span>
                  <span className="meta">sécurisé</span>
                </div>
                <div className="row gap-8">
                  <div className="field flex1"><span className="ph">4242 4242 4242 4242</span></div>
                  <div className="field" style={{ width: 70 }}><span className="ph">12/27</span></div>
                </div>
              </div>
              <button className="btn mt-16" style={{ width: "100%", justifyContent: "center" }} onClick={() => setStep(2)}>
                Payer 1 500 € →
              </button>
            </div>

            <div className="card pad-lg tint-cream">
              <div className="row between center mb-12">
                <span className="eyebrow amber">03</span>
                <span className="chip amber">paiement confirmé</span>
              </div>
              <h4>Confirmation &amp; documents</h4>
              <p className="mt-8" style={{ fontSize: 14 }}>
                Le {club.nom} a été notifié. Le bon document est généré selon la nature de votre soutien.
              </p>
              <div className="col gap-8 mt-16">
                <div className="card pad-sm" style={{ background: "#fff", padding: "12px 14px", borderColor: "var(--amber)" }}>
                  <div className="row between center">
                    <div>
                      <span className="chip legal">⚖ Parrainage</span>
                      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Contrat_parrainage_Or_2026.pdf</div>
                      <div className="meta">1 page · parties, montant, contreparties, durée</div>
                    </div>
                    <button className="btn ghost sm">↓ PDF</button>
                  </div>
                </div>
                <div className="card pad-sm" style={{ background: "#fff", padding: "12px 14px" }}>
                  <div className="row between center">
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>Facture_2026-118.pdf</div>
                      <div className="meta">Émise par le {club.nom} · TVA si applicable</div>
                    </div>
                    <button className="btn ghost sm">↓ PDF</button>
                  </div>
                </div>
              </div>
              <div className="eyebrow mt-16 amber">Prochaines étapes</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13, color: "var(--ink-2)" }}>
                <li>Transmettre votre logo (lien envoyé par mail)</li>
                <li>Premier post réseaux dans 7 jours</li>
                <li>Invitation gala adressée à votre email</li>
              </ul>
              <button className="btn ghost sm mt-16" onClick={() => { setSelected(null); setStep(0); }}>
                ← Retour au catalogue
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <div className="hero-band">
        <div className="eyebrow on-dark">Initiative portée par la Mairie de Villeneuve-sur-Loire</div>
        <h1 className="mt-12">Soutenez un club sportif<br />de votre commune.</h1>
        <p className="lede mt-16">
          {actifs.length} associations locales, 1 200 licenciés, des packs structurés et des dons libres.
          Paiement sécurisé, le bon document juridique généré automatiquement
          (<em style={{ fontFamily: "var(--display)", fontSize: 21 }}>reçu fiscal</em> pour le mécénat,{" "}
          <em style={{ fontFamily: "var(--display)", fontSize: 21 }}>contrat de parrainage</em> pour le sponsoring), reçu fiscal envoyé par mail.
        </p>
        <div className="row gap-12 mt-32" style={{ position: "relative", zIndex: 2 }}>
          <button className="btn amber lg">Parcourir les clubs →</button>
          <button className="btn ghost lg" style={{ color: "#f3ede0", borderColor: "rgba(243,237,224,.3)" }}>
            Comprendre le dispositif
          </button>
        </div>
      </div>

      {/* Partenaires */}
      <div className="row between center mt-24" style={{ padding: "8px 0" }}>
        <div className="eyebrow">Conventionné par</div>
        <div className="partners">
          <span>Ville de Villeneuve</span>
          <span>Région</span>
          <span>CCI locale</span>
          <span>Comité départemental</span>
          <span>ANS</span>
        </div>
      </div>

      <div className="divider" />

      {/* Filtres + catalogue */}
      <div className="row between center mb-16">
        <div>
          <div className="eyebrow">{actifs.length} clubs ouverts au sponsoring</div>
          <h2>Catalogue des associations.</h2>
        </div>
        <div className="row gap-8 center">
          <div className="field search" style={{ minWidth: 280 }}>
            <span className="ph">🔍 Rechercher un club, une discipline…</span>
          </div>
        </div>
      </div>

      <div className="filters mb-24">
        <span
          className={`chip${filterDisc === null ? " forest" : " outline"}`}
          style={{ cursor: "pointer" }}
          onClick={() => setFilterDisc(null)}
        >
          Toutes disciplines
        </span>
        {disciplines.map(d => (
          <span
            key={d}
            className={`chip${filterDisc === d ? " forest" : " outline"}`}
            style={{ cursor: "pointer" }}
            onClick={() => setFilterDisc(d)}
          >
            {disciplineIcons[d]} {d}
          </span>
        ))}
      </div>

      <div className="grid-3">
        {displayed.map(club => (
          <div key={club.id} className="clubcard">
            <div className="photo" style={{ minHeight: 200 }}>
              {disciplineIcons[club.discipline] || "📸"}&nbsp;{club.discipline}
            </div>
            <div className="body">
              <div className="row gap-8 wrap">
                <span className="chip">{club.discipline}</span>
                <span className={`chip ${club.dynamisme_chip}`}>
                  <span className="dot" /> {dynamisme_label[club.dynamisme_chip] || club.dynamisme}
                </span>
              </div>
              <h3>{club.nom}</h3>
              <p style={{ fontSize: 14 }}>{club.description || "Club sportif local."}</p>
              <div className="club-row">
                <div>
                  <div className="stat">{club.licencies} licenciés</div>
                  <div className="stat">{club.packs.length} packs disponibles</div>
                </div>
                <button
                  className={`btn sm${club.dynamisme_chip === "bad" ? " amber" : ""}`}
                  onClick={() => { setSelected(club.id); setStep(0); }}
                >
                  Soutenir →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayed.length < actifs.length && (
        <div className="row between center mt-24">
          <span className="meta">{displayed.length} sur {actifs.length} clubs affichés</span>
          <button className="btn ghost">Voir les autres →</button>
        </div>
      )}

      {/* Aperçu du parcours */}
      <div className="divider" />
      <div className="section-title">
        <div>
          <div className="eyebrow">Parcours de souscription · aperçu</div>
          <h3>Décider, payer, recevoir le contrat — en 3 étapes.</h3>
        </div>
      </div>

      <div className="grid-3">
        <div className="card pad-lg">
          <div className="row between center mb-12"><span className="eyebrow">01</span><span className="chip outline">FC Villeneuve</span></div>
          <h4>Choisir une offre</h4>
          <div className="pack feature mt-16">
            <div className="row between center"><span className="chip amber">Or</span><div className="price num">1 500 €</div></div>
            <h4>Pack Maillot</h4>
            <span className="chip legal" style={{ alignSelf: "flex-start" }}>⚖ Parrainage · contrat commercial</span>
            <ul><li>Logo sur le maillot équipe 1</li><li>Bannière + post mensuel</li><li>Invitation gala VIP</li></ul>
            <div className="meta mt-4">2 / 3 places restantes</div>
          </div>
          <button className="btn forest mt-16" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setSelected("1"); setStep(1); }}>
            Continuer →
          </button>
        </div>

        <div className="card pad-lg">
          <div className="row between center mb-12"><span className="eyebrow">02</span><span className="chip outline">Souscription</span></div>
          <h4>Coordonnées &amp; paiement</h4>
          <div className="col gap-8 mt-16">
            <div className="field"><span className="ph">Raison sociale…</span></div>
            <div className="field"><span className="ph">SIRET · email · téléphone</span></div>
          </div>
          <div className="card pad-sm mt-16" style={{ background: "var(--bg)" }}>
            <div className="row between center mb-8">
              <span style={{ fontSize: 13, fontWeight: 500 }}>Paiement Stripe sécurisé</span>
              <span className="meta">🔒</span>
            </div>
            <div className="field"><span className="ph">4242 4242 4242 4242</span></div>
          </div>
          <button className="btn mt-16" style={{ width: "100%", justifyContent: "center" }}>Payer 1 500 € →</button>
        </div>

        <div className="card pad-lg tint-cream">
          <div className="row between center mb-12"><span className="eyebrow amber">03</span><span className="chip amber">paiement confirmé</span></div>
          <h4>Confirmation &amp; documents</h4>
          <div className="col gap-8 mt-16">
            <div className="card pad-sm" style={{ background: "#fff", borderColor: "var(--amber)" }}>
              <span className="chip legal">⚖ Parrainage</span>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Contrat_parrainage_Or_2026.pdf</div>
              <div className="meta">Généré automatiquement</div>
            </div>
            <div className="card pad-sm" style={{ background: "#fff" }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Facture_2026-118.pdf</div>
              <div className="meta">Émise par le club</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

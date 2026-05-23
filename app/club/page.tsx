import { clubs } from "@/lib/mock-data";

const club = clubs[0]; // FC Villeneuve pour la démo

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " €";
}

export default function ClubPage() {
  return (
    <main>
      {/* En-tête */}
      <div className="page-head">
        <div>
          <div className="crumbs">Espace président · {club.nom} · saison 2025-2026</div>
          <h1>Mon club, mes offres,<br />mes sponsors.</h1>
        </div>
        <div className="actions">
          <button className="btn ghost">Voir la vue publique ↗</button>
          <button className="btn">+ Créer un pack</button>
        </div>
      </div>

      {/* Profil */}
      <div className="grid-2" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card pad-lg">
          <div className="row gap-20 start">
            <div className="photo sq" style={{ width: 120, height: 120, flex: "0 0 auto", borderRadius: 12 }}>
              Logo<br />Club
            </div>
            <div className="flex1">
              <div className="row gap-8 center mb-8" style={{ flexWrap: "wrap" }}>
                <span className="chip">{club.discipline}</span>
                <span className="chip outline">Fondé en {club.fonde}</span>
                <span className="chip ok"><span className="dot" /> Club dynamique</span>
                {club.interet_general && (
                  <span className="chip legal">⚖ Intérêt général · confirmé</span>
                )}
              </div>
              <h2>{club.nom}</h2>
              <p className="lede mt-8">{club.description}</p>
            </div>
          </div>
          <div className="divider" style={{ margin: "24px 0" }} />
          <div className="grid-4 gap-12">
            <div>
              <div className="eyebrow">Licenciés</div>
              <div className="num" style={{ fontFamily: "var(--display)", fontSize: 28 }}>{club.licencies}</div>
            </div>
            <div>
              <div className="eyebrow">Équipes</div>
              <div className="num" style={{ fontFamily: "var(--display)", fontSize: 28 }}>{club.equipes}</div>
            </div>
            <div>
              <div className="eyebrow">Encadrants</div>
              <div className="num" style={{ fontFamily: "var(--display)", fontSize: 28 }}>{club.encadrants}</div>
            </div>
            <div>
              <div className="eyebrow">Saison fondée</div>
              <div className="num" style={{ fontFamily: "var(--display)", fontSize: 28 }}>&apos;{club.fonde.slice(-2)}</div>
            </div>
          </div>
        </div>

        <div className="card pad-lg tint-forest">
          <div className="eyebrow on-dark">Levée saison · vue club</div>
          <div className="row between end mt-8">
            <div>
              <h2 style={{ fontSize: 48, color: "#f3ede0" }}>{fmt(club.sponsoring)}</h2>
              <div className="meta" style={{ color: "rgba(243,237,224,.65)" }}>
                {club.sponsors.length} sponsors · 3 dons récurrents
              </div>
            </div>
            <span className="chip" style={{ background: "rgba(255,255,255,.1)", color: "#f3ede0", borderColor: "transparent" }}>
              ▲ {club.dynamisme}
            </span>
          </div>
          <div className="mt-24">
            <svg className="chart" viewBox="0 0 360 110" width="100%" height="110" preserveAspectRatio="none">
              <path d="M0 90 L 40 88 L 80 82 L 120 76 L 160 64 L 200 56 L 240 40 L 280 28 L 320 18 L 360 10"
                fill="none" stroke="#e9c785" strokeWidth="2" />
              <path d="M0 90 L 40 88 L 80 82 L 120 76 L 160 64 L 200 56 L 240 40 L 280 28 L 320 18 L 360 10 L 360 110 L 0 110 Z"
                fill="rgba(184,131,54,.18)" />
            </svg>
            <div className="row between mt-8" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(243,237,224,.55)", letterSpacing: 1 }}>
              <span>SEPT</span><span>NOV</span><span>JANV</span><span>MARS</span><span>JUIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="grid-4 mt-16">
        <div className="photo tall">Équipe seniors</div>
        <div className="photo tall">École de foot</div>
        <div className="photo tall">Section féminine</div>
        <div className="photo tall" style={{ borderStyle: "dashed", background: "var(--bg)" }}>+ Ajouter une photo</div>
      </div>

      {/* Offres */}
      <div className="section-title mt-32">
        <div>
          <div className="eyebrow">Catalogue d&apos;offres publiées</div>
          <h3>Comment soutenir le {club.nom}</h3>
        </div>
        <div className="row gap-8">
          <button className="btn ghost sm">+ Don libre</button>
          <button className="btn sm">+ Pack sponsoring</button>
        </div>
      </div>

      <div className="grid-2">
        {/* Mécénat */}
        <div className="card pad-lg">
          <div className="row between center mb-12">
            <div>
              <div className="eyebrow">Catégorie 1 · Mécénat</div>
              <h3 className="mt-4">Dons libres · sans contrepartie significative</h3>
              <span className="chip legal mt-8" style={{ display: "inline-flex" }}>⚖ Reçu fiscal CERFA 11580 généré automatiquement</span>
            </div>
            <span className="chip ok"><span className="dot" /> module actif</span>
          </div>
          <p style={{ fontSize: 14 }}>
            Mode &ldquo;parents et sympathisants&rdquo;. Réduction d&apos;impôt 66 % (particuliers) ou 60 % (entreprises).{" "}
            <em style={{ fontFamily: "var(--display)", fontSize: 15 }}>Suppose le statut d&apos;intérêt général du club.</em>
          </p>
          <div className="grid-4 mt-16">
            {[{ val: "10 €", label: "palier" }, { val: "25 €", label: "★ populaire", feature: true }, { val: "50 €", label: "palier" }, { val: "100 €", label: "palier" }].map(p => (
              <div key={p.val} className="card pad-sm" style={{ textAlign: "center", ...(p.feature ? { background: "var(--amber-soft)", borderColor: "#e6d09e" } : {}) }}>
                <div className="num" style={{ fontFamily: "var(--display)", fontSize: 28 }}>{p.val}</div>
                <div className="meta">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="row gap-8 mt-16 wrap">
            <span className="chip ok">Ponctuel</span>
            <span className="chip ok">Récurrent mensuel</span>
            <span className="chip outline">Montant libre</span>
          </div>
        </div>

        {/* Parrainage */}
        <div className="card pad-lg">
          <div className="eyebrow">Catégorie 2 · Parrainage</div>
          <h3 className="mt-4">Packs sponsoring · avec contrepartie</h3>
          <span className="chip legal mt-8" style={{ display: "inline-flex" }}>⚖ Contrat de parrainage généré · facturation commerciale</span>
          <p style={{ fontSize: 14 }} className="mt-12">
            Prestation commerciale : pour le commerçant, c&apos;est une charge déductible du résultat. 3 packs publiés, 9 places restantes au total.
          </p>
          <div className="col gap-12 mt-16">
            {club.packs.map(pack => (
              <div key={pack.titre} className={`pack${pack.feature ? " feature" : ""}`}>
                <div className="row between center">
                  <div className="row gap-8 center">
                    <span className={`chip ${pack.chip}`}>{pack.niveau}</span>
                    <h4>{pack.titre}</h4>
                  </div>
                  <div className="price num">{pack.prix.toLocaleString("fr-FR")} €<small style={{ fontSize: 13, color: "var(--muted)" }}> /{pack.periodicite}</small></div>
                </div>
                <ul>{pack.contreparties.map(c => <li key={c}>{c}</li>)}</ul>
                <div className="row between mt-4">
                  <span className="meta">{pack.places === null ? "Illimité" : `${pack.places} places · ${pack.vendus} vendues`}</span>
                  {pack.places !== null
                    ? <div className="progress" style={{ width: 140 }}><i style={{ width: `${(pack.vendus / pack.places) * 100}%` }} /></div>
                    : <span className="chip ok">{pack.vendus} souscrits</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assistant dossier de subvention */}
      <div className="divider" />
      <div className="section-title">
        <div>
          <div className="eyebrow amber">★ Assistant dossier</div>
          <h3>Assistant dossier de subvention</h3>
        </div>
        <div className="row gap-8 center">
          <span className="chip warn">Brouillon · 65 % complété</span>
          <button className="btn ghost sm">Mes brouillons</button>
          <button className="btn sm">Nouveau dossier</button>
        </div>
      </div>

      <div className="card pad-lg tint-bg2 mb-24">
        <div className="row between center start">
          <div>
            <h3 style={{ fontSize: 26 }}>Dossier de subvention municipale · saison 2026-2027</h3>
            <p className="mt-8" style={{ fontSize: 14, maxWidth: 640 }}>
              La plateforme pré-remplit ce qu&apos;elle sait déjà sur votre club. Vous complétez le reste, vous générez un PDF propre à joindre à votre demande officielle.
            </p>
          </div>
          <div style={{ minWidth: 240 }}>
            <div className="meta mb-4 right">Progression</div>
            <div className="progress amber"><i style={{ width: "65%" }} /></div>
            <div className="meta mt-4 right">3 étapes sur 4 validées</div>
          </div>
        </div>
      </div>

      <div className="grid-4 gap-12">
        {[
          { step: "01", label: "Identité du club", status: "ok", statusLabel: "✓ validée", items: ["Nom, statut juridique", "SIRET, numéro RNA", "Dirigeants & bureau", "Affiliations fédérales"], note: "Pré-rempli depuis le profil club." },
          { step: "02", label: "Licenciés & activités", status: "ok", statusLabel: "✓ validée", items: ["312 licenciés, ventilation par âge", "78 femmes / 234 hommes", "5 équipes, 14 encadrants", "Quartier prioritaire : oui"], note: "Pré-rempli depuis le profil." },
          { step: "03", label: "Bilan financier simplifié", status: "warn", statusLabel: "à compléter", items: [], note: null, current: true },
          { step: "04", label: "Projets de l'année", status: "gray", statusLabel: "à venir", items: ["Action(s) demandée(s)", "Objectifs & bénéficiaires", "Budget prévisionnel ligne à ligne", "Calendrier"], note: "Pas pré-rempli. Modèles par discipline disponibles." },
        ].map(s => (
          <div key={s.step} className={`card pad-lg${s.current ? " tint-cream" : ""}`} style={s.current ? { borderColor: "var(--amber)" } : {}}>
            <div className="row between center mb-12">
              <span className={`eyebrow${s.current ? " amber" : ""}`}>Étape {s.step}{s.current ? " · en cours" : ""}</span>
              <span className={`chip ${s.status}`}>{s.statusLabel}</span>
            </div>
            <h4>{s.label}</h4>
            {s.current ? (
              <div className="col gap-8 mt-12">
                {[{ k: "Cotisations", v: "42 000 €" }, { k: "Subv. municipale", v: "20 000 €" }, { k: "Sponsoring (SponsoLocal)", v: "12 050 €" }].map(r => (
                  <div key={r.k} className="row between">
                    <span style={{ fontSize: 13 }}>{r.k}</span>
                    <span className="num" style={{ fontFamily: "var(--display)", fontSize: 15 }}>{r.v}</span>
                  </div>
                ))}
                <div className="row between"><span style={{ fontSize: 13, color: "var(--muted)" }}>Autres recettes</span><span className="meta">à saisir</span></div>
                <button className="btn amber sm mt-12" style={{ width: "100%", justifyContent: "center" }}>Continuer →</button>
              </div>
            ) : (
              <>
                <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7 }}>
                  {s.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                {s.note && <div className="meta mt-12" style={{ fontStyle: "italic" }}>{s.note}</div>}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Tableau des sponsors */}
      <div className="divider" />
      <div className="section-title">
        <div>
          <div className="eyebrow">Mes sponsors actuels</div>
          <h3>Suivi des engagements</h3>
        </div>
        <span className="chip warn">2 renouvellements ≤ 30 jours</span>
      </div>

      <div className="card pad-sm" style={{ padding: "4px 8px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Sponsor</th>
              <th>Pack souscrit</th>
              <th style={{ textAlign: "right" }}>Montant</th>
              <th>Début</th>
              <th>Échéance</th>
              <th style={{ textAlign: "right" }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {club.sponsors.map((s, i) => (
              <tr key={i}>
                <td>
                  <div className="club-cell">
                    <div className="av">{s.sigle}</div>
                    <div>
                      <div className="name">{s.nom}</div>
                      <div className="who">{s.contact}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`chip ${s.pack_chip}`}>{s.pack}</span></td>
                <td className="right amt">{fmt(s.montant)}</td>
                <td>{s.debut}</td>
                <td>
                  {s.echeance}
                  {s.jours_restants && <span className="meta"> (J-{s.jours_restants})</span>}
                </td>
                <td className="right"><span className={`chip ${s.statut}`}>{s.statut_label}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

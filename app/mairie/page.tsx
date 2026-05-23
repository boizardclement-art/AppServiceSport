import { commune, kpis, clubs, subventions_recentes, subventions_detail } from "@/lib/mock-data";

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " €";
}

function ratioChip(r: number) {
  if (r >= 0.3) return "ok";
  if (r >= 0.1) return "warn";
  return "bad";
}

export default function MairiePage() {
  const actifs = clubs.filter(c => c.statut === "actif");

  return (
    <main>
      {/* En-tête */}
      <div className="page-head">
        <div>
          <div className="crumbs">Mairie de {commune.nom} · {commune.service}</div>
          <h1>Pilotage du financement<br />sportif de la commune.</h1>
          <p className="lede mt-12" style={{ maxWidth: 720 }}>
            Vision consolidée subventions{" "}
            <em style={{ fontFamily: "var(--display)" }}>+</em>{" "}
            sponsoring privé, par club et à l&apos;échelle de la commune.
          </p>
        </div>
        <div className="actions">
          <button className="btn ghost">Exporter PDF de commission</button>
          <button className="btn">+ Inviter un club</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-4" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        <div className="kpi">
          <div className="eyebrow">Clubs actifs</div>
          <div className="v num">{kpis.clubs_actifs}<small>/ {kpis.clubs_total}</small></div>
          <div className="delta">{kpis.invitations_en_attente} invitations en attente</div>
        </div>
        <div className="kpi">
          <div className="eyebrow">Subventions versées</div>
          <div className="v num">{fmt(kpis.subventions_versees)}</div>
          <div className="foot">Saison 2025-2026 · 4 sources</div>
        </div>
        <div className="kpi">
          <div className="eyebrow">Sponsoring levé</div>
          <div className="v num">{fmt(kpis.sponsoring_leve)}</div>
          <div className="delta">▲ {kpis.delta_sponsoring} ce mois</div>
        </div>
        <div className="kpi">
          <div className="eyebrow">Total financement</div>
          <div className="v num">{fmt(kpis.total_financement)}</div>
          <div className="foot">Subv. + sponsoring · saison</div>
        </div>
        <div className="kpi invert">
          <div className="eyebrow">Sponsoring / Subvention</div>
          <div className="v num">{kpis.ratio_ss.toFixed(2).replace(".", ",")}</div>
          <div className="foot">Objectif saison · {commune.objectif_ratio.toFixed(2).replace(".", ",")}</div>
        </div>
      </div>

      {/* Graphique + Ratio */}
      <div className="grid-2 mt-24" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="card pad-lg">
          <div className="row between center mb-16">
            <div>
              <div className="eyebrow">Saison 2025-2026 · vision consolidée</div>
              <h3>Subventions versées vs sponsoring privé levé</h3>
            </div>
            <div className="row gap-12">
              <span className="legend"><i style={{ background: "var(--forest)" }} /> Subventions</span>
              <span className="legend"><i className="amb" /> Sponsoring</span>
            </div>
          </div>
          <svg className="chart" viewBox="0 0 700 260" width="100%" height="260" preserveAspectRatio="none">
            <line className="gline" x1="40" y1="40" x2="700" y2="40" />
            <line className="gline" x1="40" y1="100" x2="700" y2="100" />
            <line className="gline" x1="40" y1="160" x2="700" y2="160" />
            <line className="gline" x1="40" y1="220" x2="700" y2="220" />
            <text x="0" y="44">35k</text><text x="0" y="104">25k</text><text x="0" y="164">15k</text><text x="0" y="224">5k</text>
            <path style={{ fill: "rgba(31,67,52,.12)", stroke: "#1f4334", strokeWidth: 2 }}
              d="M40 130 L 100 130 L 100 90 L 240 90 L 240 70 L 380 70 L 380 55 L 520 55 L 520 50 L 700 50 L 700 240 L 40 240 Z" />
            <path d="M40 220 L 100 210 L 170 195 L 240 175 L 310 158 L 380 142 L 450 120 L 520 95 L 590 80 L 660 65 L 700 60"
              fill="none" stroke="#b88336" strokeWidth="2.5" />
            <g fill="#b88336" stroke="#16201c" strokeWidth="1">
              <circle cx="170" cy="195" r="3" /><circle cx="310" cy="158" r="3" />
              <circle cx="450" cy="120" r="3" /><circle cx="590" cy="80" r="3" />
            </g>
            <text x="40" y="255">sept</text><text x="105" y="255">oct</text><text x="175" y="255">nov</text>
            <text x="245" y="255">déc</text><text x="315" y="255">janv</text><text x="385" y="255">févr</text>
            <text x="455" y="255">mars</text><text x="525" y="255">avr</text><text x="595" y="255">mai</text>
            <text x="660" y="255">juin</text>
          </svg>
        </div>

        <div className="card pad-lg tint-cream">
          <div className="eyebrow">Indicateur stratégique</div>
          <h3 className="mt-8">Ratio sponsoring privé / subvention municipale</h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16 }}>
            <b style={{ fontFamily: "var(--display)", fontSize: 76, lineHeight: .9, letterSpacing: "-0.03em" }}>
              {kpis.ratio_ss.toFixed(2).replace(".", ",")}
            </b>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "1.2px", textTransform: "uppercase" }}>
              € levés pour 1 € versé
            </span>
          </div>
          <div className="mt-16">
            <div className="row between mb-4">
              <span className="meta">Objectif saison</span>
              <span className="meta">{commune.objectif_ratio.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="progress amber"><i style={{ width: `${(kpis.ratio_ss / commune.objectif_ratio) * 100}%` }} /></div>
          </div>
          <p className="mt-16" style={{ fontSize: 13 }}>
            À mi-saison, l&apos;objectif fixé en commission municipale est atteignable si la dynamique des clubs en vert est maintenue.
          </p>
          <div className="divider" style={{ margin: "16px 0" }} />
          <div className="eyebrow">Détail subventions versées</div>
          <div className="col gap-6 mt-8">
            {subventions_detail.map(s => (
              <div key={s.source} className="row between">
                <span style={{ fontSize: 13 }}>{s.source}</span>
                <span className="num" style={{ fontFamily: "var(--display)", fontSize: 16 }}>{fmt(s.montant)}</span>
              </div>
            ))}
          </div>
          <button className="btn ghost sm mt-16" style={{ width: "100%", justifyContent: "center" }}>
            Saisir une subvention →
          </button>
        </div>
      </div>

      {/* Tableau des clubs */}
      <div className="section-title mt-32">
        <div>
          <div className="eyebrow">{kpis.clubs_total} clubs · vision consolidée par club</div>
          <h3>Liste des associations sportives de la commune</h3>
        </div>
        <div className="row gap-8 center">
          <div className="field search" style={{ minWidth: 280 }}>
            <span className="ph">Rechercher un club, une discipline…</span>
          </div>
          <button className="btn ghost sm">Filtres</button>
        </div>
      </div>

      <div className="card pad-sm" style={{ padding: "4px 8px" }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 48 }} />
              <th>Club</th>
              <th>Discipline</th>
              <th style={{ textAlign: "right" }}>Licenciés</th>
              <th style={{ textAlign: "right" }}>Subv. versées</th>
              <th style={{ textAlign: "right" }}>Sponsoring</th>
              <th style={{ textAlign: "right" }}>Ratio S/S</th>
              <th style={{ textAlign: "right" }}>Dynamisme</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clubs.map(club => (
              <tr key={club.id}>
                <td>
                  <span className={`chip ${club.statut === "invite" ? "gray" : club.dynamisme_chip}`}>
                    <span className="dot" />
                  </span>
                </td>
                <td>
                  <div className="club-cell">
                    <div className="av" style={club.statut === "invite" ? { background: "var(--bg)" } : {}}>
                      {club.sigle}
                    </div>
                    <div>
                      <div className="name">{club.nom}</div>
                      <div className="who">
                        {club.statut === "invite"
                          ? "invitation envoyée 12/10"
                          : `${club.president} · président`}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{club.discipline}</td>
                <td className="right num">{club.statut === "invite" ? "—" : club.licencies}</td>
                <td className="right amt">{club.statut === "invite" ? "—" : fmt(club.subventions)}</td>
                <td className="right amt">{club.statut === "invite" ? "—" : fmt(club.sponsoring)}</td>
                <td className="right">
                  {club.statut === "invite"
                    ? "—"
                    : <span className={`chip ${ratioChip(club.ratio)}`}>{club.ratio.toFixed(2).replace(".", ",")}</span>
                  }
                </td>
                <td className="right">
                  <span className={`chip ${club.dynamisme_chip}`}>{club.dynamisme}</span>
                </td>
                <td className="right">
                  <span className="meta" style={{ cursor: "pointer" }}>
                    {club.statut === "invite" ? "Relancer →" : "Détail →"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row between center mt-12">
        <span className="meta">{clubs.length} sur {kpis.clubs_total} affichés</span>
        <button className="btn ghost sm">Voir les suivants</button>
      </div>

      {/* Module saisie subvention */}
      <div className="divider" />
      <div className="section-title">
        <div>
          <div className="eyebrow amber">★ Module subventions</div>
          <h3>Enregistrer les subventions attribuées</h3>
        </div>
        <button className="btn ghost sm">Voir l&apos;historique →</button>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card pad-lg tint-bg2">
          <p style={{ fontSize: 14, maxWidth: 520 }}>
            Saisissez ici chaque subvention attribuée à un club — municipale au minimum, départementale, régionale ou ANS en option.
            C&apos;est ce qui permet la{" "}
            <em style={{ fontFamily: "var(--display)", fontSize: 16 }}>vision consolidée</em>{" "}
            par club et le calcul du ratio Sponsoring/Subvention.
          </p>
          <div className="col gap-10 mt-16">
            <div>
              <div className="eyebrow mb-4">Club bénéficiaire</div>
              <div className="field"><span>FC Villeneuve</span><span className="meta" style={{ marginLeft: "auto" }}>▾</span></div>
            </div>
            <div className="grid-2 gap-10">
              <div>
                <div className="eyebrow mb-4">Source</div>
                <div className="field"><span>Municipale</span><span className="meta" style={{ marginLeft: "auto" }}>▾</span></div>
              </div>
              <div>
                <div className="eyebrow mb-4">Exercice</div>
                <div className="field"><span>2025-2026</span></div>
              </div>
            </div>
            <div className="grid-2 gap-10">
              <div>
                <div className="eyebrow mb-4">Montant attribué</div>
                <div className="field"><span>20 000 €</span></div>
              </div>
              <div>
                <div className="eyebrow mb-4">Date de versement</div>
                <div className="field"><span>15 octobre 2025</span></div>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-4">Type / motif</div>
              <div className="row gap-8">
                <span className="chip forest">Fonctionnement</span>
                <span className="chip outline">Équipement</span>
                <span className="chip outline">Évènementiel</span>
                <span className="chip outline">Investissement</span>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-4">Note interne (facultatif)</div>
              <div className="field lg" style={{ alignItems: "flex-start", paddingTop: 12 }}>
                <span className="ph">Délibération du 24/09/2025…</span>
              </div>
            </div>
          </div>
          <div className="row between center mt-16">
            <span className="meta">Visible côté club uniquement après publication par la mairie.</span>
            <div className="row gap-8">
              <button className="btn ghost sm">Brouillon</button>
              <button className="btn sm">Enregistrer</button>
            </div>
          </div>
        </div>

        <div className="card pad-lg">
          <div className="eyebrow">Saisies récentes · saison</div>
          <h4 className="mt-8">12 subventions enregistrées</h4>
          <table className="table mt-12" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th>Club</th><th>Source</th>
                <th style={{ textAlign: "right" }}>Montant</th>
                <th style={{ textAlign: "right" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {subventions_recentes.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div className="club-cell">
                      <div className="av" style={{ width: 32, height: 32, fontSize: 12 }}>{s.sigle}</div>
                      <div className="name" style={{ fontSize: 16 }}>{s.nom}</div>
                    </div>
                  </td>
                  <td><span className="chip outline">{s.source}</span></td>
                  <td className="right amt" style={{ fontSize: 17 }}>{fmt(s.montant)}</td>
                  <td className="right meta">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row between center mt-16">
            <span className="meta">6 saisies récentes · 6 autres</span>
            <button className="btn ghost sm">Importer CSV…</button>
          </div>
        </div>
      </div>

      {/* Module campagnes */}
      <div className="divider" />
      <div className="section-title">
        <div>
          <div className="eyebrow">Module communication</div>
          <h3>Campagne auprès des commerçants locaux</h3>
        </div>
        <button className="btn ghost sm">Historique des campagnes</button>
      </div>

      <div className="grid-3">
        <div className="card pad-lg">
          <div className="eyebrow">Étape 1 · liste</div>
          <h4 className="mt-8">Importer les commerçants</h4>
          <p className="mt-8" style={{ fontSize: 13 }}>Copier-coller ou CSV exporté de la CCI. La plateforme déduplique automatiquement.</p>
          <div className="field lg mt-16" style={{ borderStyle: "dashed", justifyContent: "center" }}>
            ⤓ Glisser commercants.csv
          </div>
          <div className="meta mt-8">158 emails détectés · 4 doublons retirés</div>
        </div>
        <div className="card pad-lg tint-cream">
          <div className="eyebrow amber">Étape 2 · message</div>
          <h4 className="mt-8">Choisir un template</h4>
          <div className="col gap-8 mt-12">
            <div className="card pad-sm" style={{ background: "#fff" }}>
              <div className="row between center">
                <b style={{ fontFamily: "var(--display)", fontSize: 16 }}>Lancement officiel</b>
                <span className="meta">04 / 11</span>
              </div>
              <p style={{ fontSize: 13, marginTop: 4 }}>&ldquo;La ville de Villeneuve lance son dispositif…&rdquo;</p>
            </div>
            <div className="card pad-sm" style={{ background: "#fff", borderColor: "var(--amber)", borderWidth: 1.5 }}>
              <div className="row between center">
                <b style={{ fontFamily: "var(--display)", fontSize: 16 }}>Relance avant les fêtes</b>
                <span className="chip amber">sélectionné</span>
              </div>
              <p style={{ fontSize: 13, marginTop: 4 }}>&ldquo;Soutenir un club local pour Noël…&rdquo;</p>
            </div>
            <div className="card pad-sm" style={{ background: "#fff" }}>
              <b style={{ fontFamily: "var(--display)", fontSize: 16 }}>Message libre</b>
            </div>
          </div>
        </div>
        <div className="card pad-lg">
          <div className="eyebrow">Étape 3 · suivi</div>
          <h4 className="mt-8">Tracking des envois</h4>
          <div className="row between mt-12 center"><span style={{ fontSize: 13 }}>Envoyés</span><span className="num" style={{ fontFamily: "var(--display)", fontSize: 22 }}>158</span></div>
          <div className="progress mt-4"><i style={{ width: "100%" }} /></div>
          <div className="row between mt-12 center"><span style={{ fontSize: 13 }}>Ouvertures · 74 %</span><span className="num" style={{ fontFamily: "var(--display)", fontSize: 22 }}>117</span></div>
          <div className="progress mt-4"><i style={{ width: "74%" }} /></div>
          <div className="row between mt-12 center"><span style={{ fontSize: 13 }}>Clics catalogue · 28 %</span><span className="num" style={{ fontFamily: "var(--display)", fontSize: 22 }}>44</span></div>
          <div className="progress amber mt-4"><i style={{ width: "28%" }} /></div>
          <button className="btn forest mt-16" style={{ width: "100%", justifyContent: "center" }}>
            Programmer une relance →
          </button>
        </div>
      </div>
    </main>
  );
}

// Arbeitnehmerfreizügigkeit (Art. 45 AEUV)
// Quelle: Europarecht II, Kap. 7 VI, Kap. 11 I und III
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "anf",
  norm: "Art. 45 AEUV",
  titel: "Arbeitnehmerfreizügigkeit",
  gruppe: "Grundfreiheiten",
  gliederung: ["A.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit" },
    { ebene: 1, punkt: "Kein vorrangiges Sekundärrecht (VO 492/2011, RL 2004/38 – Bearbeitervermerk)" },
    { ebene: 1, punkt: "Abgrenzung zu Art. 21 AEUV (nur ohne wirtschaftliche Tätigkeit)" },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Sachlich: Arbeitnehmer (auch Arbeitssuchender); Tätigkeit im Wirtschaftsleben; Abgrenzung zu Art. 49 und Art. 56 AEUV",
      definition: {
        begriff: "Arbeitnehmer (Lawrie-Blum-Formel)",
        text: "Das wesentliche Merkmal des Arbeitsverhältnisses besteht darin, dass jemand während einer bestimmten Zeit für einen anderen nach dessen Weisung Leistungen erbringt, für die er als Gegenleistung eine Vergütung erhält. Ergänzend: tatsächliche und echte Tätigkeit, die nicht völlig untergeordnet und unwesentlich ist; die Höhe des Einkommens ist unerheblich.",
        quelle: "EuGH, Rs. 66/85 – Lawrie-Blum, Rn. 17; Rs. 53/81 – Levin"
      }
    },
    { ebene: 1, punkt: "Grenzüberschreitung (Zuzug, Grenzgänger, Rückkehrer, Wegzug)" },
    { ebene: 1, punkt: "Keine Bereichsausnahme (Art. 45 Abs. 4 AEUV)",
      definition: {
        begriff: "Beschäftigung in der öffentlichen Verwaltung",
        text: "Unter öffentlicher Verwaltung sind nur diejenigen Stellen zu verstehen, die eine unmittelbare oder mittelbare Teilnahme an der Ausübung hoheitlicher Befugnisse und an der Wahrnehmung von Aufgaben mit sich bringen, die auf die Wahrung der allgemeinen Belange des Staates gerichtet sind und deshalb ein Verhältnis besonderer Verbundenheit zum Staat voraussetzen. Maßgeblich ist die Funktion, nicht die Institution.",
        quelle: "EuGH, Rs. 149/79 – Kommission/Belgien; Rs. 66/85 – Lawrie-Blum"
      }
    },
    { ebene: 1, punkt: "Persönlich: Staatsangehöriger eines Mitgliedstaats (Ansässigkeit in der Union nicht nötig); Familienangehörige über RL 2004/38; auch Arbeitgeber und Arbeitsvermittler" },
    { ebene: 1, punkt: "Zeitlich (nur bei Anlass)" },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Adressat: Mitgliedstaat, Union, intermediäre Gewalt, Arbeitgeber (nur Diskriminierungsverbot)",
      definition: {
        begriff: "Drittwirkung (Angonese)",
        text: "Das Verbot der Diskriminierung aus Gründen der Staatsangehörigkeit gilt auch für Verträge zwischen Privatpersonen, da andernfalls die Beseitigung staatlicher Schranken durch Hindernisse privatrechtlicher Natur neutralisiert werden könnte.",
        quelle: "EuGH, C-281/98 – Angonese, Rn. 30 ff.; zu intermediären Gewalten Rs. 36/74 – Walrave, Rn. 17; C-415/93 – Bosman, Rn. 82"
      }
    },
    { ebene: 1, punkt: "Maßnahmen des Zielstaats" },
    { ebene: 2, punkt: "Offene oder versteckte Diskriminierung (Sotgiu; Art. 7 VO 492/2011)",
      definition: {
        begriff: "Versteckte Diskriminierung (Sotgiu/O’Flynn)",
        text: "Verboten sind auch alle versteckten Formen der Diskriminierung, die durch die Anwendung anderer Unterscheidungsmerkmale tatsächlich zu dem gleichen Ergebnis führen; erfasst sind Voraussetzungen, die im Wesentlichen oder ganz überwiegend Wanderarbeitnehmer betreffen oder von Inländern leichter zu erfüllen sind. Die bloße Eignung genügt.",
        quelle: "EuGH, Rs. 152/73 – Sotgiu, Rn. 11; C-237/94 – O’Flynn, Rn. 17 ff."
      }
    },
    { ebene: 2, punkt: "Beschränkung (Gebhard, Bosman; doppelbelastende Maßnahmen; Marktzugang zum Arbeitsmarkt)",
      definition: {
        begriff: "Beschränkung",
        text: "Art. 45 AEUV verbietet nicht nur jede Diskriminierung aus Gründen der Staatsangehörigkeit, sondern auch Regelungen, die – unabhängig von der Staatsangehörigkeit anwendbar – geeignet sind, die Ausübung der Freizügigkeit zu behindern oder weniger attraktiv zu machen.",
        quelle: "EuGH, C-415/93 – Bosman; C-55/94 – Gebhard"
      }
    },
    { ebene: 1, punkt: "Maßnahmen des Herkunftsstaats: nur Beschränkung (Bosman; Kritik an Kranemann; Nähebeziehung nach Graf)",
      definition: {
        begriff: "Bosman-Formel (Wegzug)",
        text: "Bestimmungen, die einen Staatsangehörigen eines Mitgliedstaats daran hindern oder davon abhalten, sein Herkunftsland zu verlassen, um von seinem Recht auf Freizügigkeit Gebrauch zu machen, beeinträchtigen die Freiheit auch ohne Anknüpfung an die Staatsangehörigkeit. Tatbestandlich begrenzt durch das Marktzugangskriterium (Graf).",
        quelle: "EuGH, C-415/93 – Bosman, Rn. 96; C-190/98 – Graf, Rn. 23 ff."
      }
    },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Art. 45 Abs. 3 AEUV, konkretisiert durch Art. 27 ff. RL 2004/38",
      definition: {
        begriff: "Öffentliche Ordnung",
        text: "Eine Berufung auf die öffentliche Ordnung setzt voraus, dass eine tatsächliche und hinreichend schwere Gefährdung vorliegt, die ein Grundinteresse der Gesellschaft berührt; das persönliche Verhalten des Betroffenen ist allein ausschlaggebend.",
        quelle: "EuGH, Rs. 30/77 – Bouchereau; Art. 27 Abs. 2 RL 2004/38"
      }
    },
    { ebene: 1, punkt: "Zwingende Gründe (Gebhard) für nichtdiskriminierende Maßnahmen; bei versteckter Diskriminierung str.",
      definition: {
        begriff: "Gebhard-Formel (Rechtfertigung)",
        text: "Beschränkende Maßnahmen müssen in nichtdiskriminierender Weise angewandt werden, aus zwingenden Gründen des Allgemeininteresses gerechtfertigt sein, geeignet sein, die Verwirklichung des verfolgten Ziels zu gewährleisten, und dürfen nicht über das hinausgehen, was zur Erreichung dieses Ziels erforderlich ist.",
        quelle: "EuGH, C-55/94 – Gebhard, Rn. 37"
      }
    },
    { ebene: 1, punkt: "Unionsgrundrechte (Las: Art. 22 GRCh; private Grundrechtsausübung; Konkordanz)", verweis: "grch" },
    { ebene: 1, punkt: "Sachliche Gründe bei Privaten (Angonese); soziale Funktion des Sports (Bosman)" },
    { ebene: 1, punkt: "Schranken-Schranken: Grundrechte (Familienleben), Verhältnismäßigkeit mit Kohärenz (Adoui)" },
    { ebene: 0, punkt: "Ergebnis (Unanwendbarkeit; bei Diskriminierung Anpassung nach oben; Art. 7 Abs. 4 VO 492/2011; § 134, § 823 Abs. 2 BGB bei Privaten)" }
  ]
});

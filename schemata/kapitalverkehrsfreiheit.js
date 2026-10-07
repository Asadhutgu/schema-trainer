// Kapital- und Zahlungsverkehrsfreiheit (Art. 63 AEUV)
// Quelle: Europarecht II, Kap. 10 VII und Kap. 11 VI
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "kvf",
  norm: "Art. 63 AEUV",
  titel: "Kapital- und Zahlungsverkehrsfreiheit",
  gebiet: "Europarecht",
  gruppe: "Grundfreiheiten",
  gliederung: ["A.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit (Sanz de Lera, Bordessa)" },
    { ebene: 1, punkt: "Kein vorrangiges Sekundärrecht (MiFID II, Screening-VO – Bearbeitervermerk)" },
    { ebene: 1, punkt: "Stillhalteklausel des Art. 64 Abs. 1 AEUV bei Drittstaaten" },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Kapitalverkehr (Art. 63 Abs. 1 AEUV)",
      definition: {
        begriff: "Kapitalverkehr",
        text: "Mangels Vertragsdefinition ist auf die Nomenklatur in Anhang I der RL 88/361/EWG zurückzugreifen, die Hinweischarakter behält; in der Literatur: einseitige Wertübertragung von Geld- oder Realkapital, die primär der Vermögensanlage dient (Direkt- und Portfolioinvestitionen, Immobilien, Wertpapiere, Kredite, Erbschaften).",
        quelle: "EuGH, C-222/97 – Trummer und Mayer"
      }
    },
    { ebene: 1, punkt: "Oder Zahlungsverkehr (Art. 63 Abs. 2 AEUV)",
      definition: {
        begriff: "Zahlungsverkehr",
        text: "Transfer von Zahlungsmitteln als Gegenleistung im Rahmen eines Grundgeschäfts (Warenlieferung, Dienstleistung); stets akzessorisch zu einem Grundgeschäft.",
        quelle: "Art. 63 Abs. 2 AEUV; EuGH, verb. Rs. 286/82 und 26/83 – Luisi und Carbone; Europarecht II, Kap. 11 VI"
      }
    },
    { ebene: 1, punkt: "Abgrenzung zu Art. 34 (Verkörperung), Art. 49 (Kontrollbeteiligung; Drittstaatenfolge) und Art. 56 AEUV (Schwerpunkt – Fidium Finanz)" },
    { ebene: 1, punkt: "Grenzüberschreitung (auch auslandsbedingter Kapitalverkehr – Mattner), auch im Verhältnis zu Drittstaaten" },
    { ebene: 1, punkt: "Persönlich: jede Person unabhängig von der Staatsangehörigkeit" },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Adressat: Mitgliedstaat (Ziel oder Herkunft), Union; Schutzpflicht und intermediäre Gewalten übertragbar" },
    { ebene: 1, punkt: "Einheitliches Beschränkungsverbot (geeignet, den freien Kapitalverkehr illusorisch zu machen)" },
    { ebene: 1, punkt: "Keck-Korrektiv: Marktzugang (bloße Rahmenbedingungen wie Grundbuch oder Notar genügen nicht)" },
    { ebene: 1, punkt: "Unterscheidende oder unterschiedslose Maßnahme" },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Unterscheidende Eingriffe: nur Art. 64, 65 AEUV (Art. 65 Abs. 1 lit. a Steuerrecht; lit. b Rechtsbruchverhinderung, Meldeverfahren, öffentliche Ordnung und Sicherheit; Abs. 2 Rechtfertigungsgründe der Niederlassungsfreiheit)" },
    { ebene: 1, punkt: "Unterschiedslose Eingriffe: zusätzlich zwingende Gründe (Trummer, Konle; etwa Anlegerschutz, Raumplanung, Medienvielfalt, Kohärenz des Steuersystems)" },
    { ebene: 1, punkt: "Schranken-Schranken: Verhältnismäßigkeit (Anmeldung statt Genehmigung – Bordessa, Analir), Art. 65 Abs. 3 AEUV, Unionsgrundrechte", verweis: "grch",
      definition: {
        begriff: "Art. 65 Abs. 3 AEUV",
        text: "Die in den Absätzen 1 und 2 genannten Maßnahmen und Verfahren dürfen weder ein Mittel zur willkürlichen Diskriminierung noch eine verschleierte Beschränkung des freien Kapital- und Zahlungsverkehrs im Sinne des Artikels 63 darstellen. Konkretisierung: Vergleichbarkeit der Situationen oder zwingende Gründe.",
        quelle: "Art. 65 Abs. 3 AEUV; EuGH, C-439/97 – Sandoz"
      }
    },
    { ebene: 0, punkt: "Ergebnis (Unanwendbarkeit; bei Steuerfällen Erstattung; Staatshaftung)", verweis: "sh" }
  ]
});

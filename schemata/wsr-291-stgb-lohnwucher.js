// Lohnwucher (§ 291 Abs. 1 Nr. 3 StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 4, Abschnitt 4 (Kursskript 3.4)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-291",
  norm: "§ 291 Abs. 1 Nr. 3 StGB",
  titel: "Lohnwucher",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Arbeitsstrafrecht (KE 4)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Opferlage" },
    { ebene: 3, punkt: "Zwangslage",
      definition: {
        begriff: "Zwangslage (§ 291)",
        text: "Dringende wirtschaftliche Bedrängnis, die die Lebensführung fühlbar einengt; Arbeitslosigkeit nur ohne existenzsichernde Sozialleistungen",
        quelle: "Kursskript KE 4, 3.4.2.1"
      }
    },
    { ebene: 3, punkt: "Unerfahrenheit",
      definition: {
        begriff: "Unerfahrenheit (§ 291)",
        text: "Mangel an Lebenserfahrung oder Geschäftskenntnis, der das Opfer gegenüber dem Durchschnitt benachteiligt — auch fehlende Sprachkenntnis",
        quelle: "Kursskript KE 4, 3.4.2.1"
      }
    },
    { ebene: 3, punkt: "Mangel an Urteilsvermögen oder erhebliche Willensschwäche" },
    { ebene: 2, punkt: "Tathandlung: Sichversprechenlassen oder Sichgewährenlassen von Vermögensvorteilen für eine Leistung (hier: die Vermittlung/Gewährung der Arbeitsleistung) – Additionsklausel S. 2" },
    { ebene: 2, punkt: "Auffälliges Missverhältnis von Leistung und Gegenleistung (Lohnwucher: Vergütung unter zwei Dritteln des üblichen Tariflohns)",
      definition: {
        begriff: "Auffälliges Missverhältnis (§ 291)",
        text: "Völlig unangemessene Relation von Leistung und Gegenleistung, die einem Kundigen ohne Weiteres ins Auge springt; Lohnwucher: unter zwei Dritteln des üblichen Tariflohns",
        quelle: "BAG NZA 2009, 837 (5 AZR 436/08); strafrechtlich BGHSt 43, 53 (1 StR 701/96)"
      }
    },
    { ebene: 2, punkt: "Ausbeuten der Opferlage (kausaler Zusammenhang)" },
    { ebene: 1, punkt: "Subjektiver Tatbestand: Vorsatz (Kenntnis der Schwächeumstände und von Leistung/Gegenleistung; keine Subsumtion nötig), Bewusstsein des Ausnutzens" },
    { ebene: 0, punkt: "Rechtswidrigkeit, Schuld" },
    { ebene: 0, punkt: "Besonders schwere Fälle Abs. 2 (Nr. 1 wirtschaftliche Not, Nr. 2 Gewerbsmäßigkeit, Nr. 3 Wechsel)" }
  ]
});

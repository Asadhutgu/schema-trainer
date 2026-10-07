// Kreditbetrug (§ 265b StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 2, Abschnitt 5 (Kursskript S. 29; Wittig § 19 Rn. 5)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-265b",
  norm: "§ 265b StGB",
  titel: "Kreditbetrug",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Betrug und Untreue im Wirtschaftsleben (KE 2)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Kreditgeber: Betrieb oder Unternehmen (§ 265b Abs. 3 Nr. 1)",
      definition: {
        begriff: "Betrieb/Unternehmen (§ 265b Abs. 3 Nr. 1)",
        text: "Betriebe und Unternehmen unabhängig von ihrem Gegenstand, die nach Art und Umfang einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb erfordern",
        quelle: "Kursskript KE 2, 1.4.2"
      }
    },
    { ebene: 2, punkt: "Kreditnehmer: Betrieb oder Unternehmen" },
    { ebene: 2, punkt: "Zusammenhang mit einem Antrag auf Gewährung, Belassung oder Veränderung der Bedingungen eines Kredits (§ 265b Abs. 3 Nr. 2)",
      definition: {
        begriff: "Kredit (§ 265b Abs. 3 Nr. 2)",
        text: "Gelddarlehen aller Art, Akzeptkredite, entgeltlicher Erwerb und Stundung von Geldforderungen, Diskontierung von Wechseln und Schecks, Übernahme von Bürgschaften, Garantien und sonstigen Gewährleistungen",
        quelle: "Kursskript KE 2, 1.4.2"
      }
    },
    { ebene: 2, punkt: "Tathandlung" },
    { ebene: 3, punkt: "Vorlage unrichtiger/unvollständiger Unterlagen (Nr. 1 lit. a) oder schriftliche unrichtige/unvollständige Angaben (Nr. 1 lit. b) über wirtschaftliche Verhältnisse, die für den Kreditnehmer vorteilhaft und für die Entscheidung erheblich sind" },
    { ebene: 3, punkt: "Unterlassen der Mitteilung von Verschlechterungen (Nr. 2)" },
    { ebene: 1, punkt: "Subjektiver Tatbestand: Vorsatz" },
    { ebene: 0, punkt: "Rechtswidrigkeit" },
    { ebene: 0, punkt: "Schuld" },
    { ebene: 0, punkt: "Ggf. tätige Reue (§ 265b Abs. 2)" }
  ]
});

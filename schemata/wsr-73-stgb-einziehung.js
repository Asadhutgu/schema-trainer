// Einziehung von Taterträgen (§§ 73 ff. StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 1, Abschnitt 14.2 (Wittig § 9 Rn. 10)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-73",
  norm: "§§ 73 ff. StGB",
  titel: "Einziehung von Taterträgen",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Allgemeiner Teil und Unternehmensverantwortlichkeit (KE 1)",
  gliederung: ["I.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Rechtswidrige Tat (§ 11 Abs. 1 Nr. 5 StGB) – Schuld nicht erforderlich; auch Versuch, Beteiligung, Fahrlässigkeit" },
    { ebene: 0, punkt: "Erlangtes „Etwas“ (§ 73 Abs. 1)",
      definition: {
        begriff: "Erlangtes Etwas (§ 73)",
        text: "Jede Erhöhung des wirtschaftlichen Wertes des Vermögens, die dem Beteiligten zugeflossen ist: Sachen, Rechte, Geld, Dienstleistungen, konkrete Marktchancen (nicht bloße Gewinnchancen), ersparte Aufwendungen",
        quelle: "Wittig § 9 Rn. 18–20; Kursskript KE 1, 4.2.1.1.1"
      }
    },
    { ebene: 1, punkt: "Erlangen",
      definition: {
        begriff: "Erlangen (§ 73)",
        text: "Tatsächlicher Erwerb der faktischen (Mit-)Verfügungsgewalt, unabhängig von der zivilrechtlichen Lage",
        quelle: "BGH NStZ 2019, 272"
      }
    },
    { ebene: 1, punkt: "Durch die Tat (Tatbeute)",
      definition: {
        begriff: "Durch die Tat erlangt",
        text: "Vermögenswerte, die dem Täter unmittelbar aus der Tatbestandsverwirklichung in irgendeiner Phase des Tatablaufs zufließen (Tatbeute)",
        quelle: "Wittig § 9 Rn. 23"
      }
    },
    { ebene: 1, punkt: "Für die Tat (Tatlohn)",
      definition: {
        begriff: "Für die Tat erlangt",
        text: "Vorteile, die als Gegenleistung für das rechtswidrige Verhalten gewährt werden, ohne auf der Tatbestandsverwirklichung zu beruhen (Tatlohn)",
        quelle: "BGHSt 50, 299"
      }
    },
    { ebene: 0, punkt: "Tauglicher Adressat" },
    { ebene: 1, punkt: "Täter/Teilnehmer (§ 73 Abs. 1)" },
    { ebene: 1, punkt: "Drittbegünstigter (§ 73b: Vertretungs-, Verschiebungs-, Erbfälle)" },
    { ebene: 0, punkt: "Kein Ausschluss nach § 73e (Abs. 1: Anspruch des Verletzten erloschen; Abs. 2: Entreicherung des gutgläubigen Dritten)",
      definition: {
        begriff: "Verletzter (Vermögensabschöpfung)",
        text: "Wem aus der Tat ein Anspruch auf Rückgewähr des Erlangten oder Ersatz seines Wertes erwachsen ist",
        quelle: "Wittig § 9 Rn. 30"
      }
    },
    { ebene: 0, punkt: "Umfang" },
    { ebene: 1, punkt: "Konkretisiertes Bruttoprinzip (§ 73d Abs. 1)",
      definition: {
        begriff: "Bruttoprinzip (eingeschränkt)",
        text: "Einziehung des gesamten Erlangten, aber Abzug von Aufwendungen, soweit sie nicht vorsätzlich für Begehung oder Vorbereitung der Tat eingesetzt wurden; Rückausnahme für Leistungen an den Verletzten",
        quelle: "§ 73d Abs. 1 StGB"
      }
    },
    { ebene: 1, punkt: "Nutzungen und Surrogate (§ 73 Abs. 2, 3)" },
    { ebene: 1, punkt: "Wertersatz (§ 73c); Schätzung (§ 73d Abs. 2)",
      definition: {
        begriff: "Wertersatzeinziehung (§ 73c)",
        text: "Einziehung eines dem Wert des Erlangten entsprechenden Geldbetrags, wenn die Einziehung des Gegenstands undurchführbar ist oder sein Wert hinter dem Erlangten zurückbleibt",
        quelle: "Kursskript KE 1, 4.2.1.1.3"
      }
    },
    { ebene: 0, punkt: "Rechtsfolge: grundsätzlich zwingende Anordnung („ordnet an“); Absehen nur nach § 421 StPO (Opportunität, u.a. Geringwertigkeit, unangemessener Aufwand)",
      definition: {
        begriff: "Einziehung von Taterträgen, Rechtsnatur",
        text: "Maßnahme eigener Art mit kondiktionsähnlichem Charakter, weder Strafe noch strafähnlich; Ausgleich rechtswidriger Vermögensverschiebung und Generalprävention",
        quelle: "BGHSt 57, 79; BVerfGE 156, 354"
      }
    }
  ]
});

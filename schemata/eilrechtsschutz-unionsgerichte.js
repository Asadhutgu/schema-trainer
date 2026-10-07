// Eilrechtsschutz vor den Unionsgerichten (Art. 278, 279 AEUV)
// Quelle: Europarecht I, Kap. 15
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "eil-union",
  norm: "Art. 278, 279 AEUV",
  titel: "Eilrechtsschutz vor den Unionsgerichten",
  gebiet: "Europarecht",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I."],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Statthaftigkeit (Aussetzung der Vollziehung, Art. 278 AEUV; sonstige einstweilige Anordnung, Art. 279 AEUV)" },
    { ebene: 1, punkt: "Anhängigkeit der Hauptsache (Akzessorietät)" },
    { ebene: 1, punkt: "Antragsbefugnis (Parallele zur Klagebefugnis in der Hauptsache)" },
    { ebene: 1, punkt: "Form (Art. 160 VerfO EuGH)",
      definition: {
        begriff: "Glaubhaftmachung",
        text: "Im Antrag sind Streitgegenstand, Dringlichkeit und fumus boni iuris glaubhaft zu machen.",
        quelle: "Art. 160 Abs. 3 VerfO EuGH"
      }
    },
    { ebene: 0, punkt: "Begründetheit (kumulativ)" },
    { ebene: 1, punkt: "Fumus boni iuris (Erfolgsaussichten der Hauptsache, etwa der Nichtigkeitsklage)", verweis: "nk",
      definition: {
        begriff: "Fumus boni iuris",
        text: "Das Vorbringen erscheint zumindest hinsichtlich eines Klagegrundes auf den ersten Blick erheblich und nicht ohne Grundlage bzw. kann nicht ohne eingehende, der Hauptsache vorbehaltene Prüfung zurückgewiesen werden.",
        quelle: "st. Rspr. (Europarecht I, Kap. 15 I 2)"
      }
    },
    { ebene: 1, punkt: "Dringlichkeit",
      definition: {
        begriff: "Dringlichkeit",
        text: "Die vorläufige Entscheidung ist notwendig, um einen schweren und nicht wiedergutzumachenden Schaden zu verhindern; ein reiner Geldschaden ist grundsätzlich ersatzfähig und damit nicht irreparabel.",
        quelle: "st. Rspr. (Europarecht I, Kap. 15 I 2)"
      }
    },
    { ebene: 1, punkt: "Interessenabwägung",
      definition: {
        begriff: "Interessenabwägung",
        text: "Abwägung sämtlicher betroffener Belange und der Risiken jeder möglichen Lösung.",
        quelle: "st. Rspr. (Europarecht I, Kap. 15 I 2)"
      }
    },
    { ebene: 1, punkt: "Vorläufiger Charakter (kein Vorgriff auf Rechts- oder Tatsachenfragen der Hauptsache; keine Neutralisierung der späteren Hauptsacheentscheidung)" },
    { ebene: 1, punkt: "Bei Zwangsgeld: Art. 279 AEUV zur Sicherung der Wirksamkeit (Białowieża, Turów, Disziplinarkammer)",
      definition: {
        begriff: "Zwangsgeld im Eilverfahren (Art. 279 AEUV)",
        text: "Art. 279 AEUV ermächtigt zu allen Anordnungen, die zur Sicherung der vollen Wirksamkeit der Endentscheidung erforderlich sind; dazu kann die Verhängung eines Zwangsgelds für den Fall gehören, dass die einstweilige Anordnung nicht befolgt wird.",
        quelle: "EuGH, C-441/17 R – Kommission/Polen (Białowieża), Rn. 97, 100; C-121/21 R – Tschechien/Polen (Turów); C-204/21 R – Kommission/Polen (Disziplinarkammer)"
      }
    }
  ]
});

// Mischtatbestände des Arbeitsschutzstrafrechts (§ 26 ArbSchG, § 23 ArbZG, § 33 MuSchG, § 58 Abs. 5 JArbSchG)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 4, Abschnitt 20 (Schemata-Sammlung); Kursskript 4.1, 4.2
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-mischtatbestand",
  norm: "§ 26 ArbSchG, § 23 ArbZG, § 33 MuSchG, § 58 Abs. 5 JArbSchG",
  titel: "Mischtatbestände des Arbeitsschutzstrafrechts",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Arbeitsstrafrecht (KE 4)",
  gliederung: ["1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Bezugs-OWi: Verstoß gegen die Katalognorm (Blankett: Verordnung, Gesetz)" },
    { ebene: 1, punkt: "Täter: Arbeitgeber/verantwortliche Person (§ 13 ArbSchG, § 9 OWiG, § 14 StGB)",
      definition: {
        begriff: "Arbeitgeber (arbeitsrechtlich)",
        text: "Wer aufgrund eines (auch faktischen) privatrechtlichen Arbeitsvertrags von einem anderen Arbeitsleistung in persönlicher Abhängigkeit fordern darf und zur Lohnzahlung verpflichtet ist",
        quelle: "Kursskript KE 4, 2.2.1.1"
      }
    },
    { ebene: 2, punkt: "Arbeitsvertrag (§ 611a BGB)",
      definition: {
        begriff: "Arbeitsvertrag (§ 611a BGB)",
        text: "Verpflichtung zu weisungsgebundener, fremdbestimmter Arbeit in persönlicher Abhängigkeit; Gesamtbetrachtung; Bezeichnung unerheblich",
        quelle: "Kursskript KE 4, 2.2.1.1"
      }
    },
    { ebene: 1, punkt: "Katalognorm des ArbZG: Arbeitszeit (§ 2 ArbZG)",
      definition: {
        begriff: "Arbeitszeit (§ 2 ArbZG)",
        text: "Zeit vom Beginn bis zum Ende der Arbeit ohne Ruhepausen; Zusammenrechnung bei mehreren Arbeitgebern; Arbeitsbereitschaft und Bereitschaftsdienst zählen, Rufbereitschaft nicht",
        quelle: "Kursskript KE 4, 4.2.2"
      }
    },
    { ebene: 2, punkt: "Bereitschaftsdienst",
      definition: {
        begriff: "Bereitschaftsdienst",
        text: "Aufenthalt an einer vom Arbeitgeber bestimmten Stelle zur sofortigen oder zeitnahen Arbeitsaufnahme — Arbeitszeit (Art. 2 Nr. 1 RL 2003/88/EG)",
        quelle: "Kursskript KE 4, 4.2.2.1.1"
      }
    },
    { ebene: 2, punkt: "Rufbereitschaft",
      definition: {
        begriff: "Rufbereitschaft",
        text: "Bereithalten an einem frei gewählten Ort zur Arbeitsaufnahme bei Bedarf — keine Arbeitszeit, außer bei sehr kurzer Reaktionsfrist",
        quelle: "Kursskript KE 4, 4.2.2.1.1"
      }
    },
    { ebene: 0, punkt: "Vorsatz bezüglich der Zuwiderhandlung (§ 15 StGB – Fahrlässigkeit nur, wo ausdrücklich: § 23 Abs. 2 ArbZG, § 58 Abs. 6 JArbSchG für die Gefährdung)" },
    { ebene: 0, punkt: "Qualifizierender Umstand" },
    { ebene: 1, punkt: "Konkrete Gefährdung von Leben/Gesundheit (Beschäftigter; bei MuSchG auch Kind; ArbZG/JArbSchG auch Arbeitskraft) mit Kausalität und Gefährdungsvorsatz",
      definition: {
        begriff: "Konkrete Gefahr (§ 26 Nr. 2 ArbSchG, § 23 ArbZG, § 33 MuSchG)",
        text: "Zustand, in dem nach den konkreten Umständen der Schadenseintritt wahrscheinlich ist und sein Ausbleiben vom Zufall abhängt",
        quelle: "Kursskript KE 4, 4.1.2.1"
      }
    },
    { ebene: 1, punkt: "Beharrliche Wiederholung (besonderes persönliches Merkmal § 28 Abs. 2 – je Beteiligtem gesondert; § 14 Abs. 4 OWiG)",
      definition: {
        begriff: "Beharrlichkeit",
        text: "Mehrfacher Verstoß aus Missachtung oder Gleichgültigkeit; hartnäckiges Verhalten, das eine rechtsfeindliche Einstellung zeigt, obwohl vorangegangene Zuwiderhandlungen zur Wiederholung hätten abhalten müssen; besonderes persönliches Merkmal (§ 28 Abs. 2)",
        quelle: "Kursskript KE 4, 4.1.2.1"
      }
    },
    { ebene: 0, punkt: "Konkurrenz: Straftat verdrängt OWi (§ 21 OWiG); § 130 OWiG bei Delegation; §§ 222, 229 StGB bei Schadenseintritt" }
  ]
});

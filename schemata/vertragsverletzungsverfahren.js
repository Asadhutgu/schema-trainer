// Vertragsverletzungsverfahren (Art. 258, 259 AEUV)
// Quelle: Europarecht I, Kap. 9 II und III
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "vvv",
  norm: "Art. 258, 259 AEUV",
  titel: "Vertragsverletzungsverfahren",
  gebiet: "Europarecht",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Zuständigkeit des EuGH",
      definition: {
        begriff: "Zuständigkeit im Vertragsverletzungsverfahren",
        text: "Funktionell zuständig ist ausschließlich der EuGH, nicht das EuG; dies folgt aus Art. 258, 259 AEUV i. V. m. einem Umkehrschluss aus Art. 256 AEUV.",
        quelle: "Art. 258, 259 AEUV; Art. 256 AEUV (Umkehrschluss)"
      }
    },
    { ebene: 1, punkt: "Parteifähigkeit (aktiv und passiv)",
      definition: {
        begriff: "Parteifähigkeit",
        text: "Aktiv parteifähig sind die Kommission (Art. 258 AEUV) bzw. ein Mitgliedstaat (Art. 259 AEUV), passiv allein ein Mitgliedstaat. Ihm wird das Verhalten aller seiner Staatsorgane zugerechnet, auch der Länder und Gemeinden; beklagt ist daher stets der Mitgliedstaat selbst.",
        quelle: "Art. 258, 259 AEUV; Art. 4 Abs. 3 EUV"
      }
    },
    { ebene: 1, punkt: "Ordnungsgemäßes Vorverfahren" },
    { ebene: 2, punkt: "Aufsichtsklage (Art. 258 Abs. 1 AEUV): Mahnschreiben und begründete Stellungnahme",
      definition: {
        begriff: "Eingrenzungsfunktion des Vorverfahrens",
        text: "Der mit der begründeten Stellungnahme festgelegte Gegenstand bestimmt den Streitgegenstand des Gerichtsverfahrens. Eine spätere Erweiterung ist unzulässig, eine Einschränkung in jedem Stadium möglich; deshalb das Vorverfahren vor dem Klagegegenstand prüfen.",
        quelle: "EuGH, Rs. 309/84 – Kommission/Italien"
      }
    },
    { ebene: 2, punkt: "Staatenklage (Art. 259 AEUV): vorherige Befassung der Kommission",
      definition: {
        begriff: "Staatenklage ohne Stellungnahme",
        text: "Gibt die Kommission binnen drei Monaten nach ihrer Befassung keine Stellungnahme ab, kann der Mitgliedstaat gleichwohl Klage erheben.",
        quelle: "Art. 259 Abs. 4 AEUV"
      }
    },
    { ebene: 1, punkt: "Tauglicher Klagegegenstand",
      definition: {
        begriff: "Klagegegenstand",
        text: "Die Behauptung, ein Mitgliedstaat habe gegen eine Verpflichtung aus den Verträgen verstoßen. Erfasst ist das gesamte Unionsrecht – Primärrecht, Sekundärrecht und bindende völkerrechtliche Verpflichtungen –, Tun wie Unterlassen; ausgeschlossen ist grundsätzlich die GASP.",
        quelle: "Art. 258 Abs. 1 AEUV; Art. 275 AEUV"
      }
    },
    { ebene: 1, punkt: "Klagebefugnis (Überzeugung von der Vertragsverletzung; keine Klagefrist, Entschließungsermessen der Kommission)" },
    { ebene: 1, punkt: "Form (Art. 21 Satzung, Art. 120 VerfO EuGH)" },
    { ebene: 1, punkt: "Rechtsschutzbedürfnis",
      definition: {
        begriff: "Maßgeblicher Zeitpunkt im Vertragsverletzungsverfahren",
        text: "Im Vertragsverletzungsverfahren ist für die Beurteilung des Verstoßes der Ablauf der in der begründeten Stellungnahme gesetzten Frist maßgeblich; spätere Veränderungen bleiben unberücksichtigt. Wird der Verstoß erst nach Fristablauf beseitigt, bleibt das Feststellungsinteresse erhalten. Andere Verfahren haben einen anderen maßgeblichen Zeitpunkt.",
        quelle: "Europarecht I, Kap. 9 II 6"
      }
    },
    { ebene: 0, punkt: "Begründetheit" },
    { ebene: 1, punkt: "Zurechenbarkeit des Verhaltens (legislatives, administratives, judikatives Unrecht; beherrschbares privates Handeln – Schutzpflicht aus Art. 4 Abs. 3 EUV, Buy Irish, Spanische Erdbeeren)",
      definition: {
        begriff: "Judikatives Unrecht",
        text: "Eine Unionsrechtsverletzung durch ein Gericht liegt vor, wenn einzelstaatliche Gerichte unmittelbar anwendbares Unionsrecht nicht beachten, ihre Vorlagepflicht nach Art. 267 Abs. 3 AEUV verletzen oder eine ergangene Vorabentscheidung des EuGH nicht beachten.",
        quelle: "EuGH, C-416/17 – Kommission/Frankreich"
      }
    },
    { ebene: 1, punkt: "Objektiver Verstoß gegen Unionsrecht bei Fristablauf (verschuldensunabhängig)",
      definition: {
        begriff: "Abgeschnittene Entschuldigungsgründe",
        text: "Der Mitgliedstaat kann sich nicht mit mangelndem Verschulden, mit verfassungsrechtlichen, institutionellen, administrativen oder politischen Hindernissen oder mit Vertragsverstößen anderer Mitgliedstaaten entlasten.",
        quelle: "EuGH, Rs. 8/70 – Kommission/Italien; Rs. 225/86 – Kommission/Italien; zum tu-quoque-Verbot verb. Rs. 90/63 und 91/63 – Kommission/Luxemburg und Belgien"
      }
    },
    { ebene: 2, punkt: "Bei Grundfreiheiten: Prüfung nach dem Schema der jeweiligen Grundfreiheit (Anwendbarkeit, Schutzbereich, Eingriff, Rechtfertigung)" },
    { ebene: 3, punkt: "Warenverkehrsfreiheit (Art. 34, 36 AEUV)", verweis: "wvf" },
    { ebene: 3, punkt: "Arbeitnehmerfreizügigkeit (Art. 45 AEUV)", verweis: "anf" },
    { ebene: 3, punkt: "Niederlassungsfreiheit (Art. 49 AEUV)", verweis: "nlf" },
    { ebene: 3, punkt: "Dienstleistungsfreiheit (Art. 56 AEUV)", verweis: "dlf" },
    { ebene: 3, punkt: "Kapital- und Zahlungsverkehrsfreiheit (Art. 63 AEUV)", verweis: "kvf" },
    { ebene: 3, punkt: "Hilfsweise: allgemeines Diskriminierungsverbot (Art. 18 AEUV)", verweis: "art18" },
    { ebene: 2, punkt: "Bei Richtlinien: Nichtumsetzung oder fehlerhafte Umsetzung (Art. 288 Abs. 3 AEUV)", verweis: "rl-umsetzung" },
    { ebene: 2, punkt: "Bei Durchführung von Unionsrecht: Vereinbarkeit mit den Unionsgrundrechten (Art. 51 Abs. 1 GRCh)", verweis: "grch" },
    { ebene: 1, punkt: "Keine Rechtfertigung (geschriebene Schranken wie Art. 36 AEUV; zwingende Erfordernisse nach Cassis; Rechtmäßigkeit des Sekundärrechts wird vermutet, keine Inzidentrüge – Verweis auf die Nichtigkeitsklage)" }
  ]
});

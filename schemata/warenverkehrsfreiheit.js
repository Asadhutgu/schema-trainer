// Warenverkehrsfreiheit (Art. 34, 36 AEUV)
// Quelle: Europarecht II, Kap. 6 VII und Kap. 11 II
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wvf",
  norm: "Art. 34, 36 AEUV",
  titel: "Warenverkehrsfreiheit",
  gebiet: "Europarecht",
  gruppe: "Grundfreiheiten",
  gliederung: ["A.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit" },
    { ebene: 1, punkt: "Keine abschließende Harmonisierung (Bearbeitervermerk)" },
    { ebene: 1, punkt: "Abgrenzung zu Art. 30, 110 AEUV (finanzielle Belastungen) und Art. 37 AEUV (Monopole)",
      definition: {
        begriff: "Abgabe zollgleicher Wirkung (Art. 30 AEUV)",
        text: "Jede – auch noch so geringe – den Waren wegen des Überschreitens der Grenze einseitig auferlegte finanzielle Belastung, unabhängig von Bezeichnung und Erhebungsart, sofern kein Zoll im eigentlichen Sinne vorliegt. Gegenüber Art. 34 AEUV die speziellere Norm; Art. 30 und Art. 110 AEUV schließen sich gegenseitig aus.",
        quelle: "st. Rspr.; EuGH, verb. Rs. 2/62 und 3/62 – Lebkuchen; Rs. 24/68 – Statistikgebühr, Rn. 7, 9"
      }
    },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Ware (Schwerpunkt gegenüber Art. 56, 63 AEUV)",
      definition: {
        begriff: "Ware",
        text: "Erzeugnisse, die einen Geldwert haben und deshalb Gegenstand von Handelsgeschäften sein können; gebräuchlich: körperlicher Gegenstand mit Geldwert. Funktional erweitert etwa auf Elektrizität.",
        quelle: "EuGH, Rs. 7/68 – Kommission/Italien (Kunstschätze); C-393/92 – Almelo"
      }
    },
    { ebene: 1, punkt: "Unionsware oder Ware im freien Verkehr (Art. 28 Abs. 2, Art. 29 AEUV)",
      definition: {
        begriff: "Waren im freien Verkehr",
        text: "Als im freien Verkehr eines Mitgliedstaats befindlich gelten Waren aus dritten Ländern, für die dort die Einfuhrförmlichkeiten erfüllt sowie die vorgeschriebenen Zölle und Abgaben gleicher Wirkung erhoben und nicht ganz oder teilweise rückvergütet worden sind.",
        quelle: "Art. 29 AEUV"
      }
    },
    { ebene: 1, punkt: "Grenzüberschreitender Bezug (großzügig; Parallel- und Reimport, Werbung)" },
    { ebene: 1, punkt: "Keine Sonderregelung (Art. 38 ff., Art. 346 AEUV, EAGV)" },
    { ebene: 1, punkt: "Persönlich: jeder Marktteilnehmer unabhängig von der Staatsangehörigkeit" },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Staatliche oder zurechenbare Maßnahme (Buy Irish, CMA) bzw. schutzpflichtwidriges Unterlassen",
      definition: {
        begriff: "Schutzpflicht (Bauernproteste)",
        text: "Art. 34 AEUV i. V. m. Art. 4 Abs. 3 EUV verpflichtet die Mitgliedstaaten, alle erforderlichen und geeigneten Maßnahmen zu ergreifen, um die Beachtung der Warenverkehrsfreiheit in ihrem Gebiet auch gegenüber Störungen durch Private sicherzustellen; ein pflichtwidriges Unterlassen ist ein Eingriff.",
        quelle: "EuGH, C-265/95 – Kommission/Frankreich (Bauernproteste); Streinz, Rn. 889 f."
      }
    },
    { ebene: 1, punkt: "Mengenmäßige Beschränkung",
      definition: {
        begriff: "Mengenmäßige Beschränkung",
        text: "Alle staatlichen Maßnahmen, die sich als gänzliche oder teilweise Untersagung der Einfuhr, Ausfuhr oder Durchfuhr darstellen.",
        quelle: "EuGH, Rs. 2/73 – Geddo"
      }
    },
    { ebene: 1, punkt: "Maßnahme gleicher Wirkung" },
    { ebene: 2, punkt: "Diskriminierung nach Staatsangehörigkeit oder Warenherkunft (Medisanus)" },
    { ebene: 2, punkt: "Dassonville-Formel",
      definition: {
        begriff: "Maßnahme gleicher Wirkung (Dassonville-Formel)",
        text: "Jede Handelsregelung der Mitgliedstaaten, die geeignet ist, den innergemeinschaftlichen Handel unmittelbar oder mittelbar, tatsächlich oder potentiell zu behindern. Der Grad der Beeinträchtigung ist unerheblich.",
        quelle: "EuGH, Rs. 8/74 – Dassonville, Rn. 5"
      }
    },
    { ebene: 2, punkt: "Produktregelung (Cassis) oder Verkaufsmodalität? Bei Verkaufsmodalität Keck (unterschiedslos, rechtlich und tatsächlich gleich) mit Rückausnahme Marktzugang",
      definition: {
        begriff: "Keck-Formel (Verkaufsmodalitäten)",
        text: "Nationale Bestimmungen, die bestimmte Verkaufsmodalitäten beschränken oder verbieten, sind keine Maßnahmen gleicher Wirkung, sofern sie für alle betroffenen Wirtschaftsteilnehmer gelten, die ihre Tätigkeit im Inland ausüben, und den Absatz der inländischen Erzeugnisse und der Erzeugnisse aus anderen Mitgliedstaaten rechtlich wie tatsächlich in der gleichen Weise berühren. Produktbezogene Regelungen (Bezeichnung, Form, Zusammensetzung, Verpackung, Etikettierung) bleiben erfasst.",
        quelle: "EuGH, verb. Rs. C-267/91 und C-268/91 – Keck, Rn. 16 f."
      }
    },
    { ebene: 2, punkt: "Sonstige Maßnahmen (Nutzungsmodalitäten): ANETT, dritte Stufe",
      definition: {
        begriff: "ANETT-Formel",
        text: "Eine Maßnahme gleicher Wirkung liegt vor, wenn mit ihr bezweckt oder bewirkt wird, Waren aus anderen Mitgliedstaaten weniger günstig zu behandeln, wenn sie Voraussetzungen aufstellt, denen Waren entsprechen müssen, oder wenn sie in sonstiger Weise den Zugang zum Markt behindert.",
        quelle: "EuGH, C-456/10 – ANETT, Rn. 35; C-110/05 – Kommission/Italien (Anhänger), Rn. 34 ff."
      }
    },
    { ebene: 2, punkt: "Hinreichende Nähebeziehung (CMC Motorradcenter)" },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Art. 36 S. 1 AEUV (abschließend; für alle Maßnahmen; nichtwirtschaftliche Gründe)",
      definition: {
        begriff: "Rechtfertigungsgründe des Art. 36 S. 1 AEUV",
        text: "Öffentliche Sittlichkeit, Ordnung und Sicherheit; Schutz der Gesundheit und des Lebens von Menschen, Tieren oder Pflanzen; Schutz des nationalen Kulturguts von künstlerischem, geschichtlichem oder archäologischem Wert; Schutz des gewerblichen und kommerziellen Eigentums.",
        quelle: "Art. 36 S. 1 AEUV"
      }
    },
    { ebene: 1, punkt: "Zwingende Erfordernisse (Cassis; nur nichtdiskriminierende Maßnahmen; keine Harmonisierung; offene Liste)",
      definition: {
        begriff: "Zwingende Erfordernisse (Cassis-Formel)",
        text: "In Ermangelung einer unionsrechtlichen Regelung ist es Sache der Mitgliedstaaten, Herstellung und Vermarktung zu regeln. Hemmnisse, die sich aus den Unterschieden der nationalen Regelungen ergeben, müssen hingenommen werden, soweit diese Bestimmungen notwendig sind, um zwingenden Erfordernissen gerecht zu werden, etwa einer wirksamen steuerlichen Kontrolle, dem Schutz der öffentlichen Gesundheit, der Lauterkeit des Handelsverkehrs und dem Verbraucherschutz.",
        quelle: "EuGH, Rs. 120/78 – Cassis de Dijon, Rn. 8"
      }
    },
    { ebene: 1, punkt: "Unionsgrundrechte (Schmidberger)" },
    { ebene: 1, punkt: "Schranken-Schranken" },
    { ebene: 2, punkt: "Art. 36 S. 2 AEUV",
      definition: {
        begriff: "Art. 36 S. 2 AEUV",
        text: "Die Verbote oder Beschränkungen dürfen weder ein Mittel zur willkürlichen Diskriminierung noch eine verschleierte Beschränkung des Handels zwischen den Mitgliedstaaten darstellen.",
        quelle: "Art. 36 S. 2 AEUV"
      }
    },
    { ebene: 2, punkt: "Verhältnismäßigkeit (Geeignetheit mit Kohärenz und Darlegungslast; Erforderlichkeit mit Labelling, Herkunftslandkontrollen, Sekundärrecht; hilfsweise Angemessenheit)",
      definition: {
        begriff: "Labelling-Doktrin",
        text: "Der Verbraucherschutz lässt sich durch eine angemessene Etikettierung, die dem Leitbild des mündigen, informierten Verbrauchers entspricht, gleich wirksam und weniger einschneidend erreichen; ein Verkehrsverbot ist daher nicht erforderlich.",
        quelle: "EuGH, Rs. 178/84 – Kommission/Deutschland (Reinheitsgebot), Rn. 35; Europarecht II, Kap. 6 VII"
      }
    },
    { ebene: 2, punkt: "Auslegung im Lichte der GRCh", verweis: "grch" },
    { ebene: 0, punkt: "Ergebnis (Unanwendbarkeit im grenzüberschreitenden Fall; ggf. Staatshaftung; im Vertragsverletzungsverfahren Feststellung)", verweis: "sh" }
  ]
});

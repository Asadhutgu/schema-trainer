// Nichtigkeitsklage (Art. 263 AEUV)
// Quelle: Europarecht I, Kap. 11
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "nk",
  norm: "Art. 263 AEUV",
  titel: "Nichtigkeitsklage",
  gebiet: "Europarecht",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Zuständigkeit (EuGH bei Klagen der Mitgliedstaaten und Organe; EuG bei Klagen natürlicher und juristischer Personen, Art. 256 AEUV)" },
    { ebene: 1, punkt: "Tauglicher Klagegegenstand (Art. 263 Abs. 1 AEUV)",
      definition: {
        begriff: "Anfechtbare Handlung",
        text: "Anfechtbar sind alle Maßnahmen der Organe – unabhängig von Rechtsnatur oder Form –, die dazu bestimmt sind, verbindliche Rechtswirkungen zu erzeugen. Grundsätzlich nur endgültige Maßnahmen, die den Standpunkt des Organs zum Abschluss des Verfahrens festlegen, nicht bloß vorbereitende Zwischenmaßnahmen.",
        quelle: "EuGH, Rs. 22/70 – AETR, Rn. 42; Rs. 60/81 – IBM, Rn. 9 f."
      }
    },
    { ebene: 1, punkt: "Parteifähigkeit und Klageberechtigung" },
    { ebene: 2, punkt: "Privilegierte Kläger (Abs. 2: Mitgliedstaaten, EP, Rat, Kommission – ohne Interessennachweis)" },
    { ebene: 2, punkt: "Teilprivilegierte Kläger (Abs. 3: Rechnungshof, EZB, AdR – zur Wahrung ihrer Rechte)" },
    { ebene: 2, punkt: "Nichtprivilegierte Kläger (Abs. 4)" },
    { ebene: 3, punkt: "An sie gerichtete Handlung" },
    { ebene: 3, punkt: "Handlung, die sie unmittelbar und individuell betrifft" },
    { ebene: 4, punkt: "Unmittelbare Betroffenheit",
      definition: {
        begriff: "Unmittelbare Betroffenheit",
        text: "Die Maßnahme muss sich auf die Rechtsstellung des Einzelnen unmittelbar auswirken und darf den mit ihrer Durchführung betrauten Adressaten keinerlei Ermessensspielraum lassen; die Durchführung erfolgt rein automatisch und ergibt sich allein aus der Unionsregelung.",
        quelle: "EuGH, C-386/96 P – Dreyfus"
      }
    },
    { ebene: 4, punkt: "Individuelle Betroffenheit",
      definition: {
        begriff: "Individuelle Betroffenheit (Plaumann-Formel)",
        text: "Wer nicht Adressat einer Entscheidung ist, ist nur dann individuell betroffen, wenn die Entscheidung ihn wegen bestimmter persönlicher Eigenschaften oder besonderer, ihn aus dem Kreis aller übrigen Personen heraushebender Umstände berührt und ihn daher in ähnlicher Weise individualisiert wie den Adressaten.",
        quelle: "EuGH, Rs. 25/62 – Plaumann; bestätigt in C-50/00 P – UPA, Rn. 36, und C-583/11 P – Inuit, Rn. 71"
      }
    },
    { ebene: 3, punkt: "Rechtsakt mit Verordnungscharakter, der sie unmittelbar betrifft und keine Durchführungsmaßnahmen nach sich zieht",
      definition: {
        begriff: "Rechtsakt mit Verordnungscharakter",
        text: "Alle Handlungen mit allgemeiner Geltung mit Ausnahme der Gesetzgebungsakte; Abgrenzungskriterium ist das Verfahren der Annahme (Art. 289 Abs. 3 AEUV). Ob Durchführungsmaßnahmen nach sich gezogen werden, bestimmt sich nach der Stellung des Klägers und ausschließlich nach dem Klagegegenstand.",
        quelle: "EuGH, C-583/11 P – Inuit, Rn. 60 f.; C-274/12 P – Telefónica, Rn. 30 f."
      }
    },
    { ebene: 1, punkt: "Klagefrist (Art. 263 Abs. 6 AEUV: zwei Monate ab Bekanntgabe, Mitteilung oder Kenntniserlangung, zuzüglich pauschaler Entfernungsfrist von zehn Tagen, Art. 51 VerfO EuGH; von Amts wegen zu prüfen)" },
    { ebene: 0, punkt: "Begründetheit (Art. 263 Abs. 2 AEUV; grundsätzlich nur die geltend gemachten Klagegründe)" },
    { ebene: 1, punkt: "Unzuständigkeit (Grundsatz der begrenzten Einzelermächtigung, Art. 5 EUV; Organkompetenz)", verweis: "vk" },
    { ebene: 1, punkt: "Verletzung wesentlicher Formvorschriften (etwa Anhörung des Parlaments, Begründungspflicht nach Art. 296 Abs. 2 AEUV)",
      definition: {
        begriff: "Wesentliche Formvorschrift (Anhörung des Parlaments)",
        text: "Die ordnungsgemäße Anhörung des Parlaments ist eine wesentliche Formvorschrift, deren Missachtung die Nichtigkeit zur Folge hat; ihr ist nur genügt, wenn das Parlament seiner Auffassung tatsächlich Ausdruck verleiht, nicht schon mit dem bloßen Ersuchen um Stellungnahme.",
        quelle: "EuGH, Rs. 138/79 – Roquette Frères (Isoglucose); Rs. 139/79 – Maizena"
      }
    },
    { ebene: 1, punkt: "Verletzung der Verträge oder einer bei ihrer Durchführung anzuwendenden Rechtsnorm" },
    { ebene: 2, punkt: "Unionsgrundrechte (Bindung der Union, Art. 51 Abs. 1 GRCh)", verweis: "grch" },
    { ebene: 2, punkt: "Grundfreiheiten (auch die Union ist gebunden)", verweis: "gf-allg" },
    { ebene: 2, punkt: "Allgemeine Rechtsgrundsätze, insbesondere Subsidiarität und Verhältnismäßigkeit (Art. 5 Abs. 3, 4 EUV)", verweis: "vk" },
    { ebene: 1, punkt: "Ermessensmissbrauch" },
    { ebene: 0, punkt: "Rechtsfolge: Gestaltungsurteil mit Wirkung ex tunc und erga omnes (Art. 264 Abs. 1 AEUV); Fortgeltung bestimmter Wirkungen (Art. 264 Abs. 2 AEUV); Folgenbeseitigung durch das Organ (Art. 266 AEUV)",
      definition: {
        begriff: "Rechtsfolge der Nichtigkeitsklage",
        text: "Ist die Klage begründet, erklärt der Gerichtshof die angefochtene Handlung für nichtig; er kann bezeichnen, welche ihrer Wirkungen als fortgeltend zu betrachten sind. Das Organ hat die sich aus dem Urteil ergebenden Maßnahmen zu ergreifen.",
        quelle: "Art. 264 Abs. 1 und 2, Art. 266 Abs. 1 AEUV"
      }
    }
  ]
});

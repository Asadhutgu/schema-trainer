// Rechtsmittelverfahren (Art. 256 AEUV, Art. 56 ff. Satzung)
// Quelle: Europarecht I, Kap. 16
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "rm",
  norm: "Art. 256 AEUV, Art. 56 ff. Satzung",
  titel: "Rechtsmittelverfahren",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I.", "1."],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Statthafter Rechtsmittelgegenstand (Art. 256 Abs. 1 UAbs. 2 AEUV, Art. 56 Abs. 1 Satzung: End- oder bestimmte Zwischenentscheidung des EuG; nicht bloße Kostenentscheidung, Art. 58 Abs. 2 Satzung)" },
    { ebene: 1, punkt: "Rechtsmittelbefugnis, Beschwer und fortbestehendes Rechtsschutzinteresse (Art. 56 Abs. 2, 3 Satzung)",
      definition: {
        begriff: "Fortbestehendes Rechtsschutzinteresse",
        text: "Das Rechtsschutzinteresse muss bei Einlegung des Rechtsmittels bestehen und bis zur Entscheidung fortbestehen.",
        quelle: "EuGH, C-362/05 P – Wunenburger; C-239/12 P – Abdulrahim"
      }
    },
    { ebene: 1, punkt: "Frist: zwei Monate ab Zustellung zuzüglich Entfernungsfrist (Art. 56 Abs. 1 Satzung)" },
    { ebene: 1, punkt: "Form und Begründung (Art. 168 f. VerfO EuGH)",
      definition: {
        begriff: "Begründungsanforderungen",
        text: "Das Rechtsmittel muss die beanstandeten Teile des Urteils und die rechtlichen Argumente, die den Aufhebungsantrag speziell stützen, genau bezeichnen; eine bloße Wiederholung des erstinstanzlichen Vorbringens genügt nicht. Im ersten Rechtszug geprüfte Rechtsfragen dürfen aber erneut aufgeworfen werden, wenn die Auslegung oder Anwendung des Unionsrechts durch das EuG beanstandet wird.",
        quelle: "EuGH, C-352/98 P – Bergaderm, Rn. 34 f.; C-41/00 P – Interporc, Rn. 15–17"
      }
    },
    { ebene: 1, punkt: "Ggf. Zulassung nach Art. 58a Satzung (bei doppelt geprüften Beschwerdekammer-Sachen)" },
    { ebene: 0, punkt: "Begründetheit" },
    { ebene: 1, punkt: "Rechtsfehler des EuG (Art. 58 Abs. 1 Satzung)" },
    { ebene: 2, punkt: "Unzuständigkeit" },
    { ebene: 2, punkt: "Verfahrensfehler, der die Interessen des Rechtsmittelführers beeinträchtigt (etwa überlange Verfahrensdauer, Begründungsmängel)" },
    { ebene: 2, punkt: "Verletzung des Unionsrechts" },
    { ebene: 1, punkt: "Beschränkung auf Rechtsfragen",
      definition: {
        begriff: "Verfälschung von Tatsachen und Beweisen",
        text: "Die Tatsachenwürdigung des EuG ist nur bei Verfälschung überprüfbar. Eine Verfälschung liegt vor, wenn ohne Erhebung neuer Beweise die Würdigung der vorliegenden Beweismittel offensichtlich unzutreffend ist; sie muss sich offensichtlich aus den Akten ergeben, ohne dass es einer neuen Tatsachen- und Beweiswürdigung bedarf. Die rechtliche Qualifizierung der Tatsachen ist dagegen Rechtsfrage.",
        quelle: "EuGH, C-551/03 P – General Motors, Rn. 54; C-229/05 P – PKK und KNK, Rn. 37"
      }
    },
    { ebene: 0, punkt: "Entscheidung des EuGH (Art. 61 Satzung)" },
    { ebene: 1, punkt: "Unbegründet: Zurückweisung, ggf. mit Auswechslung der Begründung (C-120/06 P und C-121/06 P – FIAMM; Lestelle)" },
    { ebene: 1, punkt: "Begründet: Aufhebung und Durchentscheidung oder Zurückverweisung an das EuG (Bindung an die rechtliche Beurteilung)" }
  ]
});

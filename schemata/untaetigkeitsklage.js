// Untätigkeitsklage (Art. 265 AEUV)
// Quelle: Europarecht I, Kap. 12
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "utk",
  norm: "Art. 265 AEUV",
  titel: "Untätigkeitsklage",
  gebiet: "Europarecht",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I."],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Zuständigkeit (EuG für Individualklagen, Art. 256 Abs. 1 AEUV; EuGH für privilegierte Kläger, Art. 51 Satzung)" },
    { ebene: 1, punkt: "Parteifähigkeit (Art. 265 Abs. 1, 3 AEUV: privilegierte Kläger – Mitgliedstaaten und Organe; nichtprivilegierte Kläger – natürliche und juristische Personen)" },
    { ebene: 1, punkt: "Tauglicher Klagegegenstand: Unterlassen eines rechtsverbindlichen Aktes (nicht: Unterlassen unverbindlicher Empfehlungen oder Stellungnahmen)",
      definition: {
        begriff: "Untätigkeit",
        text: "Gemeint ist die Untätigkeit durch Nichtbescheidung oder Nichtstellungnahme, nicht der Erlass eines anderen als des gewünschten Aktes. Art. 263 und Art. 265 AEUV regeln denselben Rechtsbehelf; maßgeblich ist die Rechtsnatur des begehrten Aktes.",
        quelle: "EuGH, Rs. 15/70 – Chevalley, Rn. 6; Rs. 8/71 – Komponistenverband; C-196/12 – Kommission/Rat"
      }
    },
    { ebene: 1, punkt: "Obligatorisches Vorverfahren (Art. 265 Abs. 2 AEUV)",
      definition: {
        begriff: "Vorverfahren der Untätigkeitsklage",
        text: "Aufforderung zum Tätigwerden; Stellungnahmefrist von zwei Monaten, bei Schweigen weitere Klagefrist von zwei Monaten (insgesamt vier Monate). Eine ablehnende Stellungnahme beendet die Untätigkeit: vor Klageerhebung macht sie die Klage unzulässig, nach Klageerhebung erledigt sie den Rechtsstreit.",
        quelle: "Art. 265 Abs. 2 AEUV; EuGH, Rs. 48/65 – Lütticke"
      }
    },
    { ebene: 1, punkt: "Klagebefugnis",
      definition: {
        begriff: "Klagebefugnis Privater",
        text: "Natürliche und juristische Personen können auch klagen, wenn das Organ es unterlassen hat, einen Akt zu erlassen, der sie – wäre er ergangen – unmittelbar und individuell betroffen hätte (Plaumann-Formel analog).",
        quelle: "EuGH, C-68/95 – T. Port, Rn. 59; EuG, T-95/96 – Gestevisión Telecinco, Rn. 57 ff."
      }
    },
    { ebene: 0, punkt: "Begründetheit" },
    { ebene: 1, punkt: "Konkrete unionsrechtliche Handlungspflicht im Zeitpunkt der Aufforderung (objektive Untätigkeit genügt – Parlament/Rat, Rs. 13/83)",
      definition: {
        begriff: "Ermessensgrenze",
        text: "Bei Ermessen des Organs besteht keine durchsetzbare Handlungspflicht; insbesondere ist die Kommission nicht verpflichtet, ein Vertragsverletzungsverfahren einzuleiten.",
        quelle: "EuGH, Rs. 247/87 – Star Fruit, Rn. 11"
      }
    },
    { ebene: 0, punkt: "Rechtsfolge" },
    { ebene: 1, punkt: "Feststellungsurteil (Art. 265 Abs. 1 AEUV) und Handlungspflicht des Organs (Art. 266 AEUV); kein Selbsteintritt des Gerichts; Schadensersatz nach Art. 268, 340 Abs. 2 AEUV bleibt unberührt" }
  ]
});

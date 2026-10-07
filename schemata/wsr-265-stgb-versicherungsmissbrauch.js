// Versicherungsmissbrauch (§ 265 StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 2, Abschnitt 10.1 (Wittig § 16 Rn. 18)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-265",
  norm: "§ 265 StGB",
  titel: "Versicherungsmissbrauch",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Betrug und Untreue im Wirtschaftsleben (KE 2)",
  gliederung: ["I.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Objektiver Tatbestand" },
    { ebene: 1, punkt: "Tatobjekt: gegen Untergang, Beschädigung, Beeinträchtigung der Brauchbarkeit, Verlust oder Diebstahl versicherte Sache" },
    { ebene: 1, punkt: "Tathandlung: beschädigen, zerstören, in der Brauchbarkeit beeinträchtigen, beiseiteschaffen, einem anderen überlassen",
      definition: {
        begriff: "Beiseiteschaffen (§ 265)",
        text: "Entziehung der Sache gegen den Willen des Versicherten oder Veränderung ihrer räumlichen Position, sodass ein Uneingeweihter den Eindruck des Abhandenkommens gewinnt",
        quelle: "Kursskript KE 2, 1.9.1"
      }
    },
    { ebene: 0, punkt: "Subjektiver Tatbestand: Vorsatz; Absicht, sich oder einem Dritten Leistungen aus der Versicherung zu verschaffen",
      definition: {
        begriff: "Repräsentant (VVG)",
        text: "Wer aufgrund tatsächlichen Vertretungsverhältnisses die Obhut über die versicherte Sache ausübt oder befugt ist, in nicht unbedeutendem Umfang selbstständig für den Versicherungsnehmer zu handeln; Zurechnung nach § 81 VVG",
        quelle: "Kursskript KE 2, 1.9.2"
      }
    },
    { ebene: 0, punkt: "Rechtswidrigkeit, Schuld" },
    { ebene: 0, punkt: "Subsidiarität gegenüber § 263" }
  ]
});

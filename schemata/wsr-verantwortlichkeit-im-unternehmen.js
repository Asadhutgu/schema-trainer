// Verantwortlichkeit im Unternehmen (Prüfungsreihenfolge im Gutachten) (§§ 13, 14, 25 StGB; §§ 30, 130 OWiG)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 1, Abschnitt 17 (Schemata-Sammlung); Wittig § 6 Rn. 50 ff.
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-verantwortlichkeit",
  norm: "§§ 13, 14, 25 StGB; §§ 30, 130 OWiG",
  titel: "Verantwortlichkeit im Unternehmen (Prüfungsreihenfolge im Gutachten)",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Allgemeiner Teil und Unternehmensverantwortlichkeit (KE 1)",
  gliederung: ["1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Unmittelbar Handelnder: eigene Täterschaft (bei Sonderdelikt: Tätereigenschaft? sonst § 14 StGB)",
      definition: {
        begriff: "Sonderdelikt",
        text: "Delikt, das nur von einem bestimmten Täterkreis (Intraneus) täterschaftlich begangen werden kann",
        quelle: "Wittig § 6 Rn. 1"
      }
    },
    { ebene: 0, punkt: "Leitungsperson bei aktiver Mitwirkung" },
    { ebene: 1, punkt: "Mittäterschaft, Anstiftung" },
    { ebene: 1, punkt: "Mittelbare Täterschaft kraft Organisationsherrschaft (Rspr.) / Anstiftung (Lit.)",
      definition: {
        begriff: "Organisationsherrschaft",
        text: "Mittelbare Täterschaft auch bei uneingeschränkt verantwortlich handelndem Tatmittler, wenn der Hintermann durch Organisationsstrukturen bestimmte Rahmenbedingungen ausnutzt, innerhalb derer sein Tatbeitrag regelhafte Abläufe auslöst, die nahezu automatisch zur erstrebten Tatbestandsverwirklichung führen",
        quelle: "BGHSt 40, 218 (236); 49, 147"
      }
    },
    { ebene: 1, punkt: "Bei Ordnungswidrigkeiten: Einheitstäterprinzip",
      definition: {
        begriff: "Einheitstäterprinzip (§ 14 OWiG)",
        text: "Jeder, der sich an einer Ordnungswidrigkeit beteiligt, handelt ordnungswidrig und ist Täter",
        quelle: "Wittig § 6 Rn. 66"
      }
    },
    { ebene: 0, punkt: "Leitungsperson bei Untätigkeit" },
    { ebene: 1, punkt: "Geschäftsherrenhaftung (§ 13): Garantenstellung",
      definition: {
        begriff: "Geschäftsherrenhaftung",
        text: "Strafrechtliche Verantwortlichkeit von Betriebsinhabern und Vorgesetzten wegen Unterlassens für nicht verhinderte betriebsbezogene Straftaten Untergebener",
        quelle: "BGHSt 57, 42"
      }
    },
    { ebene: 1, punkt: "Betriebsbezogenheit der Tat",
      definition: {
        begriff: "Betriebsbezogene Tat",
        text: "Tat mit innerem Zusammenhang zur betrieblichen Tätigkeit des Täters oder zur Art des Betriebs, konkret bestimmt; nicht Taten bei Gelegenheit",
        quelle: "BGHSt 57, 42"
      }
    },
    { ebene: 1, punkt: "Quasi-Kausalität",
      definition: {
        begriff: "Quasi-Kausalität",
        text: "Ein Unterlassen ist ursächlich, wenn die gebotene Handlung den Erfolg mit an Sicherheit grenzender Wahrscheinlichkeit verhindert hätte",
        quelle: "BGHSt 37, 106 (127)"
      }
    },
    { ebene: 1, punkt: "Vorsatz – willful blindness",
      definition: {
        begriff: "Willful blindness",
        text: "Bewusstes Sich-Verschließen der Führungsebene vor Anzeichen strafrechtlich relevanter Vorgänge; kann Eventualvorsatz begründen",
        quelle: "Wittig § 6 Rn. 160"
      }
    },
    { ebene: 1, punkt: "Ressortprinzip / Generalverantwortung",
      definition: {
        begriff: "Ressortprinzip",
        text: "Die Pflichtenstellung mehrerer Leitungspersonen knüpft an den kraft Aufgabenverteilung zugewiesenen, eigenverantwortlich betreuten Aufgabenbereich an; ergänzt durch Generalverantwortung mit Überwachungspflichten",
        quelle: "BGHSt 37, 106 (126); BGH NJW 2019, 1067"
      }
    },
    { ebene: 0, punkt: "Auffang: § 130 OWiG" },
    { ebene: 0, punkt: "Verband: § 30 OWiG; Einziehung § 73b StGB / § 74e StGB" }
  ]
});

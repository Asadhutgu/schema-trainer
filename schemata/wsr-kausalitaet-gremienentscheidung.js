// Kausalität bei Gremienentscheidungen (Kausalität)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 1, Abschnitt 17 (Schemata-Sammlung); BGHSt 37, 106 (Lederspray)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-gremium",
  norm: "Kausalität",
  titel: "Kausalität bei Gremienentscheidungen",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Allgemeiner Teil und Unternehmensverantwortlichkeit (KE 1)",
  gliederung: ["1."],
  punkte: [
    { ebene: 0, punkt: "Anknüpfung an das Abstimmungsverhalten (nicht an die Teilnahme)" },
    { ebene: 0, punkt: "Mehrheitsverhältnis feststellen: Einstimmigkeit / eine Stimme Mehrheit → kumulative Kausalität; größere Mehrheit → h.M. Kausalität (Begründungen: Mittäterschaft, alternative Kausalität, Mehrfachkausalität)" },
    { ebene: 0, punkt: "Stimmenthaltung: Verhinderungsmöglichkeit durch Nein-Stimme? Vorabsprache (Mannesmann)?" },
    { ebene: 0, punkt: "Beim Unterlassensbeschluss: Lederspray-Regel (jedes Mitglied muss den gebotenen Beschluss erwirken)",
      definition: {
        begriff: "Lederspray-Regel (Gremium)",
        text: "Jedes Gremienmitglied muss das ihm Mögliche und Zumutbare tun, um den gebotenen Beschluss zu erwirken; wird die gebotene Handlung beschlossen unterlassen, haftet jedes Mitglied als Mittäter; die Einlassung „ich wäre überstimmt worden“ entlastet nicht",
        quelle: "BGHSt 37, 106; Kursskript KE 1, 3.3.2; Wittig § 6 Rn. 46, 49"
      }
    },
    { ebene: 0, punkt: "Exkurs: Kausalität ohne Kausalgesetz bei der Produkthaftung (Lederspray, Holzschutzmittel)",
      definition: {
        begriff: "Ausschlussprinzip (Lederspray)",
        text: "Kausalität ist festgestellt, wenn offen bleibt, welche Substanz wie den Schaden auslöste, aber alle anderen in Betracht kommenden Ursachen ausgeschlossen sind",
        quelle: "BGHSt 37, 106"
      }
    }
  ]
});

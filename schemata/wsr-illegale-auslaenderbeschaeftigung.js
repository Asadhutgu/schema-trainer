// Illegale Ausländerbeschäftigung (Prüfreihenfolge) (§ 404 SGB III; § 98 AufenthG; §§ 10, 10a, 11 SchwarzArbG; §§ 15, 15a AÜG)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 4, Abschnitt 20 (Schemata-Sammlung); Kursskript 4.6, 4.7
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-auslaenderbeschaeftigung",
  norm: "§ 404 SGB III; § 98 AufenthG; §§ 10, 10a, 11 SchwarzArbG; §§ 15, 15a AÜG",
  titel: "Illegale Ausländerbeschäftigung (Prüfreihenfolge)",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Arbeitsstrafrecht (KE 4)",
  gliederung: ["1."],
  punkte: [
    { ebene: 0, punkt: "Ausländer (§ 2 Abs. 1 AufenthG) ohne Titel/Genehmigung/Berechtigung (§ 4a Abs. 5 AufenthG, § 284 Abs. 1 SGB III)? EU/EWR: Freizügigkeit" },
    { ebene: 0, punkt: "Beschäftigung (§ 7 SGB IV, Gesamtbild) oder Beauftragung mit Dienst-/Werkleistung?" },
    { ebene: 0, punkt: "Grund-OWi: § 404 Abs. 2 Nr. 3 SGB III (Beschäftigung) / § 98 Abs. 2a Nr. 1 AufenthG (Beauftragung, leichtfertig genügt)",
      definition: {
        begriff: "Leichtfertigkeit (§ 98 Abs. 2a AufenthG)",
        text: "Verletzung der erforderlichen Sorgfalt in besonders schwerem Maß — der Täter beachtet nicht, was sich jedem aufdrängen musste (fehlende Prüfung der Arbeitsberechtigung)",
        quelle: "Kursskript KE 4, 4.7.1"
      }
    },
    { ebene: 0, punkt: "Qualifikationen: § 10 SchwarzArbG (auffälliges Missverhältnis, > 20 % Lohnunterschied), § 10a (Opfer von §§ 232a, 232b), § 11 (mehr als fünf; beharrlich; unter 18); Abs. 2 grober Eigennutz" },
    { ebene: 0, punkt: "Leiharbeit: § 15 AÜG (Verleiher ohne Erlaubnis), § 15a AÜG (Entleiher bei erlaubtem Verleih, Missverhältnis ≥ 1/5), § 16 AÜG (OWi)" },
    { ebene: 0, punkt: "Nebenfolgen: § 266a StGB, § 370 AO, § 21 SchwarzArbG/WRegG, § 35 GewO, § 30 OWiG",
      definition: {
        begriff: "Unzuverlässigkeit (§ 35 GewO)",
        text: "Wer nach dem Gesamteindruck seines Verhaltens keine Gewähr für künftig ordnungsgemäße Gewerbeausübung bietet",
        quelle: "BVerwG (st. Rspr.); Kursskript KE 4, 5"
      }
    }
  ]
});

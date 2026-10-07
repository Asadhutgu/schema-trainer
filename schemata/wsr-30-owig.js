// Verbandsgeldbuße (§ 30 OWiG)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 1, Abschnitt 12.2 (Wittig § 12 Rn. 8)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-30",
  norm: "§ 30 OWiG",
  titel: "Verbandsgeldbuße",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Allgemeiner Teil und Unternehmensverantwortlichkeit (KE 1)",
  gliederung: ["I.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Sanktionsfähiger Verband (Adressat): juristische Person, nicht rechtsfähiger Verein, rechtsfähige Personengesellschaft (§ 30 Abs. 1 OWiG)",
      definition: {
        begriff: "Rechtsträgerprinzip",
        text: "Die Verbandsgeldbuße richtet sich gegen den Rechtsträger des Unternehmens (oder seinen Rechtsnachfolger), nicht gegen das Unternehmen als solches",
        quelle: "Wittig § 12 Rn. 1, 11a"
      }
    },
    { ebene: 0, punkt: "Täterkreis (Leitungsperson)" },
    { ebene: 1, punkt: "Organ oder Organmitglied (Nr. 1); Vorstand eines nicht rechtsfähigen Vereins (Nr. 2); vertretungsberechtigter Gesellschafter einer rechtsfähigen Personengesellschaft (Nr. 3)" },
    { ebene: 1, punkt: "Generalbevollmächtigte, leitende Prokuristen und Handlungsbevollmächtigte (Nr. 4)" },
    { ebene: 1, punkt: "Sonstige für die Leitung verantwortliche Personen einschließlich Kontrollpersonen (Nr. 5)",
      definition: {
        begriff: "Leitungsperson (§ 30 Abs. 1 Nr. 5 OWiG)",
        text: "Sonstige Person, die für die Leitung des Betriebs oder Unternehmens verantwortlich handelt, einschließlich Überwachung der Geschäftsführung und Ausübung von Kontrollbefugnissen in leitender Stellung",
        quelle: "Kursskript KE 1, 3.6.3"
      }
    },
    { ebene: 0, punkt: "Bezugstat" },
    { ebene: 1, punkt: "Tatbestandsmäßige, rechtswidrige und schuldhafte bzw. vorwerfbare Straftat oder Ordnungswidrigkeit" },
    { ebene: 1, punkt: "Handeln „als“ Organ etc. (Vertretungsbezug)" },
    { ebene: 1, punkt: "Verletzung betriebsbezogener Pflichten des Verbands (Alt. 1) oder Bereicherung bzw. angestrebte Bereicherung des Verbands (Alt. 2)",
      definition: {
        begriff: "Bereicherung (§ 30 Abs. 1 Alt. 2 OWiG)",
        text: "Jede rechtswidrige günstigere Gestaltung der Vermögenslage des Verbands, auch mittelbar; rechtmäßig erlangte Vorteile ausgenommen",
        quelle: "Kursskript KE 1, 3.6.3"
      }
    },
    { ebene: 0, punkt: "Rechtsfolge: Geldbuße nach Ermessen (§§ 30 Abs. 1, 47 OWiG); Höhe nach § 30 Abs. 2, 3 OWiG" }
  ]
});

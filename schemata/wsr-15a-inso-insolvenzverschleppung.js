// Insolvenzverschleppung (§ 15a Abs. 4 InsO)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 3, Abschnitt 4.1 (Kursskript 1.3)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-15a",
  norm: "§ 15a Abs. 4 InsO",
  titel: "Insolvenzverschleppung",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Insolvenz-, Korruptions- und Kapitalmarktstrafrecht (KE 3)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Tauglicher Täter" },
    { ebene: 3, punkt: "§ 15a Abs. 1 S. 1: Vertretungsorgan/Abwickler juristischer Personen" },
    { ebene: 3, punkt: "§ 15a Abs. 1 S. 3, ggf. i.V.m. Abs. 2: organschaftliche Vertreter der vertretungsberechtigten Gesellschafter" },
    { ebene: 3, punkt: "§ 15a Abs. 3: Gesellschafter/Aufsichtsrat bei Führungslosigkeit",
      definition: {
        begriff: "Führungslosigkeit",
        text: "Die juristische Person hat keinen organschaftlichen Vertreter (§ 35 Abs. 1 S. 2 GmbHG, § 10 Abs. 2 S. 2 InsO); nicht bei bloßer Unerreichbarkeit",
        quelle: "Kursskript KE 3, 1.2.1.2"
      }
    },
    { ebene: 3, punkt: "Faktischer Geschäftsführer (Rspr.)" },
    { ebene: 2, punkt: "Krise" },
    { ebene: 3, punkt: "Zahlungsunfähigkeit (§ 17 InsO)",
      definition: {
        begriff: "Zahlungsunfähigkeit",
        text: "Der Schuldner ist nicht in der Lage, die fälligen Zahlungspflichten zu erfüllen (§ 17 Abs. 2 S. 1 InsO); regelmäßig bei Liquiditätslücke ≥ 10 %, die binnen drei Wochen nicht beseitigt wird",
        quelle: "Kursskript KE 3, 1.2.2.2"
      }
    },
    { ebene: 3, punkt: "Abgrenzung zur Zahlungsstockung",
      definition: {
        begriff: "Zahlungsstockung",
        text: "Kurzfristig behebbarer Mangel an flüssigen Mitteln — binnen drei Wochen (Zeit, die eine kreditwürdige Person zur Kreditaufnahme braucht)",
        quelle: "BGH IX ZR 123/04"
      }
    },
    { ebene: 3, punkt: "Überschuldung (§ 19 InsO)",
      definition: {
        begriff: "Überschuldung",
        text: "Das Vermögen deckt die bestehenden Verbindlichkeiten nicht mehr, es sei denn, die Fortführung in den nächsten zwölf Monaten ist überwiegend wahrscheinlich (§ 19 Abs. 2 S. 1 InsO)",
        quelle: "Kursskript KE 3, 1.2.2.1"
      }
    },
    { ebene: 3, punkt: "Fortführungsprognose",
      definition: {
        begriff: "Fortführungsprognose",
        text: "Fortführungswille und -absicht des Unternehmensträgers sowie wirtschaftliche Überlebensfähigkeit, festgestellt durch betriebswirtschaftlichen Finanzplan über den Prognosezeitraum (Zahlungsfähigkeitsprognose); strafrechtlich genügt, dass die Fortführung nicht ganz unwahrscheinlich ist",
        quelle: "Kursskript KE 3, 1.2.2.1.2"
      }
    },
    { ebene: 2, punkt: "Tathandlung" },
    { ebene: 3, punkt: "Nichtstellen" },
    { ebene: 3, punkt: "Nicht richtiges Stellen (§ 13 InsO)" },
    { ebene: 3, punkt: "Nicht rechtzeitiges Stellen (Höchstfrist drei/sechs Wochen, § 15a Abs. 1 S. 2)" },
    { ebene: 1, punkt: "Subjektiver Tatbestand: Vorsatz (Kenntnis der Umstände, dolus eventualis genügt) – bei fahrlässiger Unkenntnis § 15a Abs. 5" },
    { ebene: 0, punkt: "Rechtswidrigkeit (kein § 34, keine Einwilligung, keine Unzumutbarkeit durch Weisung)" },
    { ebene: 0, punkt: "Schuld (Verbotsirrtum bei Irrtum über die Rechtspflicht regelmäßig vermeidbar)" }
  ]
});

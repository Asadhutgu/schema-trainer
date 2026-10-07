// Ausbeutung der Arbeitskraft (§ 233 Abs. 1 StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 4, Abschnitt 5 (Kursskript 3.5)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-233",
  norm: "§ 233 Abs. 1 StGB",
  titel: "Ausbeutung der Arbeitskraft",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Arbeitsstrafrecht (KE 4)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Tatopfer: Person in persönlicher oder wirtschaftlicher Zwangslage oder in auslandsbedingter Hilflosigkeit – oder Person unter 21 Jahren (ohne Zwangslage)" },
    { ebene: 3, punkt: "Zwangslage",
      definition: {
        begriff: "Zwangslage (§ 233)",
        text: "Ernste wirtschaftliche oder persönliche Bedrängnis, die den Entscheidungs- und Handlungsspielraum wesentlich einschränkt; weiter als Notlage",
        quelle: "Kursskript KE 4, 3.5.2.1"
      }
    },
    { ebene: 3, punkt: "Auslandsbedingte Hilflosigkeit",
      definition: {
        begriff: "Hilflosigkeit (§ 233)",
        text: "Auslandsbedingte Unfähigkeit, sich nach den persönlichen Fähigkeiten dem Ausbeutungsverlangen zu widersetzen; Gesamtbewertung unabhängig von der Staatsangehörigkeit",
        quelle: "BGH NStZ-RR 2007, 46 (2 StR 131/05)"
      }
    },
    { ebene: 2, punkt: "Tathandlung: Ausbeuten unter Ausnutzung der Lage" },
    { ebene: 3, punkt: "Nr. 1: durch ausbeuterische Beschäftigung (§ 232 Abs. 1 S. 2)",
      definition: {
        begriff: "Ausbeuterische Beschäftigung (§ 232 Abs. 1 S. 2)",
        text: "Beschäftigung aus rücksichtslosem Gewinnstreben zu Arbeitsbedingungen in auffälligem Missverhältnis zu denen vergleichbarer Arbeitnehmer; ohne Tarif Maßstab Mindestlohn (Regel: 50 % Unterschreitung)",
        quelle: "Kursskript KE 4, 3.5.2.2"
      }
    },
    { ebene: 3, punkt: "Rücksichtsloses Gewinnstreben",
      definition: {
        begriff: "Rücksichtslosigkeit (§ 233)",
        text: "Übersteigertes Gewinnstreben ohne Rücksicht auf die persönlichen oder wirtschaftlichen Belange des Opfers",
        quelle: "Kursskript KE 4, 3.5.2.2"
      }
    },
    { ebene: 3, punkt: "Nr. 2: bei der Ausübung der Bettelei" },
    { ebene: 3, punkt: "Nr. 3: bei der Begehung mit Strafe bedrohter Handlungen" },
    { ebene: 2, punkt: "Ausbeutung muss tatsächlich vorliegen (anders § 232: Ziel genügt); keine Willensbeeinflussung nötig" },
    { ebene: 1, punkt: "Subjektiver Tatbestand: Vorsatz (dolus eventualis)" },
    { ebene: 0, punkt: "Rechtswidrigkeit, Schuld" },
    { ebene: 0, punkt: "Qualifikationen Abs. 2 (Nr. 1 Opfer unter 18, Nr. 2 schwere Misshandlung/Todesgefahr bei Leichtfertigkeit, Nr. 3 wirtschaftliche Not durch Vorenthalten der Gegenleistung, Nr. 4 Bande); minder schwerer Fall Abs. 4" }
  ]
});

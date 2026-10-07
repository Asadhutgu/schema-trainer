// Betrug (§ 263 StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 2, Abschnitt 1.2 (Kursskript S. 3; Wittig § 14 Rn. 4)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-263",
  norm: "§ 263 StGB",
  titel: "Betrug",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Betrug und Untreue im Wirtschaftsleben (KE 2)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Täuschung über Tatsachen (ausdrücklich, konkludent, durch garantenpflichtwidriges Unterlassen § 13)",
      definition: {
        begriff: "Täuschung (§ 263)",
        text: "Jedes Verhalten, das im Wege der Einwirkung auf das intellektuelle Vorstellungsbild eines anderen eine Fehlvorstellung über Tatsachen erregen soll",
        quelle: "Kursskript KE 2, 1.1"
      }
    },
    { ebene: 3, punkt: "Tatsachen",
      definition: {
        begriff: "Tatsachen (§ 263)",
        text: "Konkrete Geschehnisse oder Zustände der Vergangenheit oder Gegenwart, die dem Beweis zugänglich sind, einschließlich innerer Tatsachen",
        quelle: "Kursskript KE 2, 1.1"
      }
    },
    { ebene: 3, punkt: "Konkludente Täuschung",
      definition: {
        begriff: "Konkludente Täuschung",
        text: "Auf Irreführung gerichtetes Gesamtverhalten, das nach der Verkehrsanschauung in der jeweiligen Geschäftssituation als stillschweigende Erklärung über eine Tatsache zu verstehen ist; keine Garantenstellung erforderlich",
        quelle: "Kursskript KE 2, 1.1"
      }
    },
    { ebene: 2, punkt: "Irrtum",
      definition: {
        begriff: "Irrtum (§ 263)",
        text: "Fehlvorstellung über Tatsachen; sachgedankliches Mitbewusstsein genügt; ausgeschlossen bei Gleichgültigkeit",
        quelle: "Wittig § 14 Rn. 48"
      }
    },
    { ebene: 3, punkt: "Sachgedankliches Mitbewusstsein",
      definition: {
        begriff: "Sachgedankliches Mitbewusstsein",
        text: "Unreflektierte Vorstellung am Rande des Bewusstseins, dass bestimmte Umstände selbstverständlich gegeben sind („alles in Ordnung“); genügt für den Irrtum",
        quelle: "BGH NStZ 2007, 213"
      }
    },
    { ebene: 2, punkt: "Vermögensverfügung (ungeschriebenes Merkmal)",
      definition: {
        begriff: "Vermögensverfügung",
        text: "Jedes Tun, Dulden oder Unterlassen, das sich unmittelbar vermögensmindernd auswirkt",
        quelle: "Kursskript KE 2, 1.1"
      }
    },
    { ebene: 2, punkt: "Vermögensschaden (Prinzip der Gesamtsaldierung)",
      definition: {
        begriff: "Gesamtsaldierung",
        text: "Vermögensschaden als Differenz des Gesamtvermögens vor und nach der Verfügung unter Berücksichtigung aller unmittelbar zufließenden Kompensationen",
        quelle: "Kursskript KE 2, Frage 1"
      }
    },
    { ebene: 3, punkt: "Vermögensbegriff",
      definition: {
        begriff: "Wirtschaftlicher Vermögensbegriff",
        text: "Alle einer Person zuzuordnenden wirtschaftlich wertvollen Positionen (Rspr.); juristisch-ökonomische Variante: soweit nicht von der Rechtsordnung missbilligt (h.L.)",
        quelle: "Kursskript KE 2, 1.1"
      }
    },
    { ebene: 3, punkt: "Exspektanzen",
      definition: {
        begriff: "Exspektanz",
        text: "Tatsächliche Anwartschaft, die zum Vermögen gehört, wenn sie so verdichtet ist, dass der Geschäftsverkehr ihr wegen wahrscheinlichen Vermögenszuwachses wirtschaftlichen Wert beimisst",
        quelle: "Kursskript KE 2, 1.4.1; BGH NStZ 1997, 542"
      }
    },
    { ebene: 3, punkt: "Schadensgleiche Vermögensgefährdung",
      definition: {
        begriff: "Schadensgleiche Vermögensgefährdung",
        text: "Konkrete Gefährdung, die schon gegenwärtig den Vermögenswert mindert und nach bilanziellen Maßstäben beziffert werden kann",
        quelle: "BVerfGE 126, 170; 130, 1"
      }
    },
    { ebene: 3, punkt: "Eingehungsbetrug",
      definition: {
        begriff: "Eingehungsbetrug",
        text: "Schaden bereits durch Vertragsschluss, wenn der erlangte Anspruch hinter der eingegangenen Verpflichtung zurückbleibt (Vergleich der Ansprüche im Zeitpunkt des Vertragsschlusses)",
        quelle: "Wittig § 14 Rn. 110 ff."
      }
    },
    { ebene: 3, punkt: "Erfüllungsbetrug",
      definition: {
        begriff: "Erfüllungsbetrug",
        text: "Schaden bei Vertragsdurchführung durch Vergleich der erbrachten Leistung mit der vertraglich geschuldeten",
        quelle: "Wittig § 14 Rn. 115"
      }
    },
    { ebene: 3, punkt: "Individueller Schadenseinschlag",
      definition: {
        begriff: "Individueller Schadenseinschlag",
        text: "Schaden trotz objektiver Gleichwertigkeit, wenn die Leistung für den Erwerber individuell unbrauchbar ist, er zu vermögensschädigenden Maßnahmen gezwungen wird oder seine wirtschaftliche Bewegungsfreiheit weitgehend beeinträchtigt ist (objektiver Maßstab)",
        quelle: "BGHSt 16, 321; Kursskript KE 2, Frage 2"
      }
    },
    { ebene: 3, punkt: "Zweckverfehlungslehre (einseitige Leistungen)",
      definition: {
        begriff: "Zweckverfehlungslehre",
        text: "Bei einseitigen Leistungen liegt ein Schaden vor, wenn der mit der Hingabe verfolgte, vermögensrelevante Zweck verfehlt wird",
        quelle: "BGH NStZ-RR 2018, 283"
      }
    },
    { ebene: 3, punkt: "Fallgruppe Kapitalanlage: Innenprovision",
      definition: {
        begriff: "Innenprovision",
        text: "Aus der Anlagesumme finanzierte Zahlung des Initiators an Vermittler, die den werthaltig angelegten Anteil mindert",
        quelle: "Kursskript KE 2, 1.3"
      }
    },
    { ebene: 3, punkt: "Fallgruppe Ausschreibung: Submissionsbetrug",
      definition: {
        begriff: "Submissionsbetrug",
        text: "Konkludente Täuschung der Kartellmitglieder über das Vorliegen echter Wettbewerbsgebote bei einer Ausschreibung; Schaden nach dem hypothetischen Wettbewerbspreis",
        quelle: "Kursskript KE 2, Frage 7; BGH NJW 1992, 921"
      }
    },
    { ebene: 3, punkt: "Fallgruppe Termingeschäfte: Optionsgeschäft",
      definition: {
        begriff: "Optionsgeschäft",
        text: "Recht des Optionsnehmers, innerhalb der Frist zum Basispreis eine bestimmte Menge Waren, Wertpapiere oder Devisen vom Stillhalter zu erwerben oder an ihn zu verkaufen, gegen einen verlorenen Optionspreis",
        quelle: "Kursskript KE 2, Frage 4"
      }
    },
    { ebene: 2, punkt: "Kausalzusammenhang zwischen a)–d)" },
    { ebene: 1, punkt: "Subjektiver Tatbestand" },
    { ebene: 2, punkt: "Vorsatz bezüglich a)–e)" },
    { ebene: 2, punkt: "Absicht rechtswidriger und stoffgleicher Bereicherung",
      definition: {
        begriff: "Bereicherungsabsicht",
        text: "Zielgerichteter Wille (dolus directus 1. Grades), sich oder einem Dritten einen Vermögensvorteil zu verschaffen, der rechtswidrig und stoffgleich ist",
        quelle: "Wittig § 14 Rn. 135 ff."
      }
    },
    { ebene: 3, punkt: "Stoffgleichheit",
      definition: {
        begriff: "Stoffgleichheit",
        text: "Der erstrebte Vorteil muss die Kehrseite des Schadens sein — aus derselben Verfügung zulasten desselben Vermögens",
        quelle: "Wittig § 14 Rn. 139"
      }
    },
    { ebene: 0, punkt: "Rechtswidrigkeit" },
    { ebene: 0, punkt: "Schuld" },
    { ebene: 0, punkt: "Strafantrag (§ 263 Abs. 4 i.V.m. §§ 247, 248a)" },
    { ebene: 0, punkt: "Strafzumessung" },
    { ebene: 1, punkt: "Regelbeispiele § 263 Abs. 3: Nr. 1 Gewerbsmäßigkeit/Bande, Nr. 2 Vermögensverlust großen Ausmaßes, Nr. 3 wirtschaftliche Not, Nr. 4 Amtsträger, Nr. 5 Versicherungsfall" },
    { ebene: 2, punkt: "Bande",
      definition: {
        begriff: "Bande",
        text: "Zusammenschluss von mindestens drei Personen mit dem Willen, künftig für eine gewisse Dauer mehrere selbstständige, noch ungewisse Straftaten des genannten Deliktstyps zu begehen",
        quelle: "BGHSt 46, 321"
      }
    },
    { ebene: 2, punkt: "Vermögensverlust großen Ausmaßes",
      definition: {
        begriff: "Vermögensverlust großen Ausmaßes",
        text: "Effektiver (nicht nur gefährdungsbedingter) Verlust von mindestens 50.000 €",
        quelle: "BGH NStZ 2004, 155; Kursskript KE 2, Frage 10"
      }
    },
    { ebene: 1, punkt: "Qualifikation § 263 Abs. 5 (gewerbsmäßig als Bandenmitglied)" }
  ]
});

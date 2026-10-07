// Gläubigerbegünstigung (§ 283c StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 3, Abschnitt 8.2 (Wittig § 23 Rn. 147)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-283c",
  norm: "§ 283c StGB",
  titel: "Gläubigerbegünstigung",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Insolvenz-, Korruptions- und Kapitalmarktstrafrecht (KE 3)",
  gliederung: ["I.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Täter: Schuldner (Täterkreis des § 283, § 14)" },
    { ebene: 1, punkt: "Krise: nur eingetretene Zahlungsunfähigkeit (nicht Überschuldung, nicht drohende Zahlungsunfähigkeit)" },
    { ebene: 1, punkt: "Gläubiger (§ 241 BGB, auch öffentlich-rechtliche Forderungen; nicht Aussonderungsberechtigte, nicht der Schuldner selbst, nicht Gesellschafter wegen Anteilen/eigenkapitalersetzender Darlehen § 39 Abs. 1 Nr. 5 InsO – wohl aber Geschäftsführer mit Gehaltsansprüchen)" },
    { ebene: 1, punkt: "Tathandlung: Gewähren einer Sicherheit oder Befriedigung" },
    { ebene: 2, punkt: "Sicherheit",
      definition: {
        begriff: "Sicherheit (§ 283c)",
        text: "Jede Position, durch die der Gläubiger schneller, leichter, besser oder sicherer befriedigt werden kann, auch bei zivilrechtlicher Unwirksamkeit; aus der Masse",
        quelle: "Kursskript KE 3, 4.2.1"
      }
    },
    { ebene: 2, punkt: "Befriedigung",
      definition: {
        begriff: "Befriedigung (§ 283c)",
        text: "Erfüllung (§ 362 BGB), Leistung an Erfüllungs statt (§ 364 BGB) oder Verschaffung einer Aufrechnungslage mit nachfolgender Aufrechnung",
        quelle: "Kursskript KE 3, 4.2.1"
      }
    },
    { ebene: 1, punkt: "Inkongruente Deckung",
      definition: {
        begriff: "Inkongruente Deckung",
        text: "Sicherheit oder Befriedigung, die der Gläubiger nicht, nicht in der Art oder nicht zu dieser Zeit zu beanspruchen hat (§ 283c; § 131 InsO)",
        quelle: "Kursskript KE 3, 4.2.2"
      }
    },
    { ebene: 1, punkt: "Erfolg: Bevorzugung vor den übrigen Gläubigern (Gefährdung genügt)",
      definition: {
        begriff: "Bevorzugung (§ 283c)",
        text: "Besserstellung eines Gläubigers zum Nachteil der übrigen; Gefährdung der Befriedigungsinteressen genügt (Rechtsstellung, eher, besser oder gewisser befriedigt zu werden)",
        quelle: "Kursskript KE 3, 4.2.3"
      }
    },
    { ebene: 0, punkt: "Subjektiver Tatbestand: sichere Kenntnis der Zahlungsunfähigkeit (dolus directus 2. Grades); Absicht oder Wissentlichkeit bezüglich der Bevorzugung" },
    { ebene: 0, punkt: "Rechtswidrigkeit, Schuld" },
    { ebene: 0, punkt: "Objektive Strafbarkeitsbedingung (§ 283c Abs. 3 i.V.m. § 283 Abs. 6)" }
  ]
});

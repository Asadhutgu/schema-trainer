// Niederlassungsfreiheit (Art. 49, 54 AEUV)
// Quelle: Europarecht II, Kap. 8 VI und Kap. 11 IV
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "nlf",
  norm: "Art. 49, 54 AEUV",
  titel: "Niederlassungsfreiheit",
  gebiet: "Europarecht",
  gruppe: "Grundfreiheiten",
  gliederung: ["A.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit (Reyners)" },
    { ebene: 1, punkt: "Kein vorrangiges Sekundärrecht (RL 2005/36, RL 2006/123, RL 2019/2121 – Bearbeitervermerk)" },
    { ebene: 1, punkt: "Abgrenzung zu Art. 45, 56 und 63 AEUV",
      definition: {
        begriff: "Selbständigkeit",
        text: "Entgeltliche, weisungsfreie Tätigkeit auf eigene Rechnung und eigenes Risiko; entscheidendes Abgrenzungsmerkmal gegenüber Art. 45 AEUV.",
        quelle: "EuGH, Rs. 3/87 – Agegate; C-107/94 – Asscher; C-229/14 – Balkaya; Europarecht II, Kap. 11 IV"
      }
    },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Sachlich: Niederlassung (primär oder sekundär)",
      definition: {
        begriff: "Niederlassung",
        text: "Tatsächliche Ausübung einer wirtschaftlichen Tätigkeit mittels einer festen Einrichtung in einem anderen Mitgliedstaat auf unbestimmte Zeit; Teilnahme am Wirtschaftsleben eines anderen Mitgliedstaats in stabiler und kontinuierlicher Weise.",
        quelle: "EuGH, C-221/89 – Factortame II, Rn. 20; C-55/94 – Gebhard, Rn. 25"
      }
    },
    { ebene: 1, punkt: "Grenzüberschreitung (Zuzug, Rückkehr, Wegzug; potentielles Interesse genügt)" },
    { ebene: 1, punkt: "Keine Bereichsausnahme (Art. 51 AEUV)",
      definition: {
        begriff: "Ausübung öffentlicher Gewalt (Art. 51 AEUV)",
        text: "Die Ausnahme ist auf Tätigkeiten beschränkt, die als solche eine unmittelbare und spezifische Teilnahme an der Ausübung öffentlicher Gewalt darstellen; sie erfasst nicht ganze Berufe, sondern nur einzelne Tätigkeiten, und ist eng auszulegen.",
        quelle: "EuGH, Rs. 2/74 – Reyners, Rn. 45"
      }
    },
    { ebene: 1, punkt: "Persönlich: natürliche Person mit Staatsangehörigkeit eines Mitgliedstaats (für sekundäre Niederlassung zusätzlich Ansässigkeit); Gesellschaft nach Art. 54 AEUV (Gründung nach Mitgliedstaatsrecht, Sitz in der Union)",
      definition: {
        begriff: "Gesellschaft (Art. 54 AEUV)",
        text: "Nach dem Recht eines Mitgliedstaats gegründete Gesellschaften mit satzungsmäßigem Sitz, Hauptverwaltung oder Hauptniederlassung in der Union stehen natürlichen Personen gleich (ausgenommen Gesellschaften ohne Erwerbszweck); auf die Staatsangehörigkeit der Gesellschafter kommt es nicht an.",
        quelle: "Art. 54 AEUV"
      }
    },
    { ebene: 2, punkt: "Wegzug einer Gesellschaft: Vorfrage der Existenz nach dem Gründungsrecht (Daily Mail, Cartesio) gegen bloße Rechtsfolgen des Wegzugs (National Grid Indus)",
      definition: {
        begriff: "Vorfrage der Existenz (Daily Mail, Cartesio)",
        text: "Gesellschaften haben jenseits der jeweiligen nationalen Rechtsordnung, die ihre Gründung und ihre Existenz regelt, keine Realität. Ob eine Gesellschaft ihren Sitz unter Wahrung ihrer Rechtspersönlichkeit in einen anderen Mitgliedstaat verlegen kann, ist eine Vorfrage, die allein das Recht des Gründungsstaats beantwortet.",
        quelle: "EuGH, Rs. 81/87 – Daily Mail; C-210/06 – Cartesio"
      }
    },
    { ebene: 2, punkt: "Zuzug einer Gesellschaft: Anerkennungspflicht des Aufnahmestaats (Centros, Überseering, Inspire Art)",
      definition: {
        begriff: "Anerkennung zugezogener Gesellschaften (Centros, Überseering)",
        text: "Der Umstand, dass eine Gesellschaft in einem Mitgliedstaat nur errichtet wurde, um sich in einem zweiten Mitgliedstaat niederzulassen, in dem die Geschäftstätigkeit im Wesentlichen ausgeübt werden soll, schließt die Berufung auf die Niederlassungsfreiheit nicht aus; der Aufnahmestaat hat die nach dem Gründungsrecht bestehende Rechts- und Parteifähigkeit zu achten.",
        quelle: "EuGH, C-212/97 – Centros; C-208/00 – Überseering"
      }
    },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Adressat: Mitgliedstaat, Union, intermediäre Gewalt (Wouters, Viking); keine Angonese-Drittwirkung" },
    { ebene: 1, punkt: "Offene Diskriminierung (Staatsangehörigkeit; Hauptsitz)" },
    { ebene: 1, punkt: "Versteckte Diskriminierung (Wohnsitz; nur bei Vergleichbarkeit – Schumacker)" },
    { ebene: 1, punkt: "Beschränkung (Gebhard; Marktzugang als Korrektiv – CaixaBank; Nähebeziehung – Semeraro)",
      definition: {
        begriff: "Beschränkung (Gebhard-Formel)",
        text: "Erfasst sind auch nationale Maßnahmen, die die Ausübung der durch den Vertrag garantierten grundlegenden Freiheiten behindern oder weniger attraktiv machen können.",
        quelle: "EuGH, C-55/94 – Gebhard, Rn. 37; C-19/92 – Kraus, Rn. 32"
      }
    },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Art. 52 Abs. 1 AEUV (öffentliche Ordnung, Sicherheit, Gesundheit; erst recht für unterschiedslose Maßnahmen; RL 2004/38 vorrangig; keine ganzen Wirtschaftsbereiche)" },
    { ebene: 1, punkt: "Zwingende Gründe des Allgemeininteresses (nicht rein wirtschaftlich; Vollintegration beachten – Corsten)",
      definition: {
        begriff: "Gebhard-Formel (Rechtfertigung)",
        text: "Beschränkende Maßnahmen müssen in nichtdiskriminierender Weise angewandt werden, aus zwingenden Gründen des Allgemeininteresses gerechtfertigt sein, geeignet sein, die Verwirklichung des verfolgten Ziels zu gewährleisten, und dürfen nicht über das hinausgehen, was zur Erreichung dieses Ziels erforderlich ist.",
        quelle: "EuGH, C-55/94 – Gebhard, Rn. 37"
      }
    },
    { ebene: 1, punkt: "Grundrechte und sachliche Gründe bei intermediären Gewalten (Viking: Arbeitnehmerschutz, Art. 28 GRCh)", verweis: "grch" },
    { ebene: 1, punkt: "Schranken-Schranken: Verhältnismäßigkeit (Gläubigerschutz – Inspire Art; Gleichwertigkeitsprüfung – Vlassopoulou, Morgenbesser), Grundrechte" },
    { ebene: 0, punkt: "Ergebnis (Unanwendbarkeit; unionsrechtskonforme Auslegung des nationalen Rechts, etwa §§ 305 ff. UmwG, § 112a DRiG)" }
  ]
});

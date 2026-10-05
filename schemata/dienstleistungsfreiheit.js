// Dienstleistungsfreiheit (Art. 56, 57 AEUV)
// Quelle: Europarecht II, Kap. 9 VI und Kap. 11 V
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "dlf",
  norm: "Art. 56, 57 AEUV",
  titel: "Dienstleistungsfreiheit",
  gruppe: "Grundfreiheiten",
  gliederung: ["A.", "1.", "a)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit (van Binsbergen)" },
    { ebene: 1, punkt: "Ausschluss des Verkehrsbereichs (Art. 58 Abs. 1 AEUV, Uber)" },
    { ebene: 1, punkt: "Kein vorrangiges Sekundärrecht (RL 2006/123, RL 2005/36, RL 2011/24, Entsende-RL – Bearbeitervermerk)" },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Dienstleistung: entgeltlich, nichtkörperlich, selbständig, vorübergehend (gegenüber Art. 63 AEUV Schwerpunkt – Fidium Finanz)",
      definition: {
        begriff: "Dienstleistung (Art. 57 AEUV)",
        text: "Selbständige Leistungen nichtkörperlicher Art, die in der Regel gegen Entgelt erbracht werden und nicht den Vorschriften über den freien Waren-, Kapital- und Personenverkehr unterliegen; das Entgelt ist die wirtschaftliche Gegenleistung und kann auch von einem Dritten stammen. Der vorübergehende Charakter ist nach Dauer, Häufigkeit, regelmäßiger Wiederkehr und Kontinuität der Leistung zu beurteilen.",
        quelle: "Art. 57 AEUV; EuGH, Rs. 263/86 – Humbel, Rn. 17; C-55/94 – Gebhard, Rn. 27"
      }
    },
    { ebene: 1, punkt: "Grenzüberschreitung: Modalität bestimmen (aktiv, passiv, Korrespondenz, auslandsbedingt)",
      definition: {
        begriff: "Aktive, passive und Korrespondenzdienstleistung",
        text: "Aktiv: Der Erbringer begibt sich zum Empfänger. Passiv: Freiheit der Leistungsempfänger, sich zur Inanspruchnahme einer Dienstleistung in einen anderen Mitgliedstaat zu begeben; auch Touristen sind Dienstleistungsempfänger. Korrespondenz: Nur die Leistung selbst überschreitet die Grenze.",
        quelle: "EuGH, verb. Rs. 286/82 und 26/83 – Luisi und Carbone, Rn. 16; Rs. 186/87 – Cowan"
      }
    },
    { ebene: 1, punkt: "Keine Bereichsausnahme (Art. 62 i. V. m. Art. 51 AEUV)" },
    { ebene: 1, punkt: "Persönlich: Mitgliedstaatsangehöriger mit Ansässigkeit in der Union; juristische Personen (Art. 62 i. V. m. Art. 54 AEUV); Drittstaatsangehörige nur als Vermittler oder Gegenpart" },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Adressat: Mitgliedstaat (Bestimmungs- oder Herkunftsstaat von Erbringer oder Empfänger), Union, intermediäre Gewalt; Perspektive festlegen" },
    { ebene: 1, punkt: "Bestimmungsstaat: offene oder versteckte Diskriminierung oder Beschränkung (Säger; Marktzugang als Korrektiv – Mobistar)",
      definition: {
        begriff: "Säger-Formel",
        text: "Art. 56 AEUV verlangt nicht nur die Beseitigung jeder Diskriminierung des Dienstleistenden aufgrund seiner Staatsangehörigkeit, sondern auch die Aufhebung aller Beschränkungen – selbst wenn sie unterschiedslos für inländische Dienstleistende wie für solche aus anderen Mitgliedstaaten gelten –, wenn sie geeignet sind, die Tätigkeit des in einem anderen Mitgliedstaat ansässigen Dienstleistenden, der dort rechtmäßig ähnliche Dienstleistungen erbringt, zu unterbinden oder zu behindern.",
        quelle: "EuGH, C-76/90 – Säger"
      }
    },
    { ebene: 1, punkt: "Herkunftsstaat: nur Beschränkung (Alpine Investments)" },
    { ebene: 1, punkt: "Keine bloß geringfügige Behinderung (Viacom)" },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Art. 62 i. V. m. Art. 52 Abs. 1 AEUV (Gesundheit – Kohll-Grenzen; RL 2004/38 vorrangig)",
      definition: {
        begriff: "Öffentliche Ordnung (Omega)",
        text: "Der Schutz der Menschenwürde ist ein berechtigtes Interesse, das eine Beschränkung der Dienstleistungsfreiheit aus Gründen der öffentlichen Ordnung rechtfertigen kann; es ist nicht unerlässlich, dass die Maßnahme einer allen Mitgliedstaaten gemeinsamen Auffassung entspricht.",
        quelle: "EuGH, C-36/02 – Omega"
      }
    },
    { ebene: 1, punkt: "Zwingende Gründe des Allgemeininteresses (nur unterschiedslose Maßnahmen; nicht harmonisiert; nicht wirtschaftlich – SETTG)" },
    { ebene: 1, punkt: "Grundrechte und sachliche Gründe bei intermediären Gewalten (Laval)" },
    { ebene: 1, punkt: "Schranken-Schranken: Unionsgrundrechte (Carpenter), Verhältnismäßigkeit (Kohärenz; Anrechnung des Herkunftsstaats – Webb; keine Niederlassungsanforderungen – Säger, Corsten; Transparenz bei Konzessionen – Ince)", verweis: "grch",
      definition: {
        begriff: "Webb-Anrechnung",
        text: "Der freie Dienstleistungsverkehr darf nur durch Regelungen beschränkt werden, die durch das Allgemeininteresse gerechtfertigt und für alle im Hoheitsgebiet tätigen Personen verbindlich sind, soweit diesem Interesse nicht bereits durch die Rechtsvorschriften Rechnung getragen wird, denen der Leistungserbringer im Staat seiner Niederlassung unterliegt.",
        quelle: "EuGH, Rs. 279/80 – Webb"
      }
    },
    { ebene: 0, punkt: "Ergebnis (Unanwendbarkeit; bei Diskriminierung Anpassung nach oben; Staatshaftung)", verweis: "sh" }
  ]
});

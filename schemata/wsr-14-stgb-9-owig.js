// Handeln für einen anderen (§ 14 StGB / § 9 OWiG)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 1, Abschnitt 10.2 (Kursskript S. 25; Wittig § 6 Rn. 79)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-14",
  norm: "§ 14 StGB / § 9 OWiG",
  titel: "Handeln für einen anderen",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Allgemeiner Teil und Unternehmensverantwortlichkeit (KE 1)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Eröffnung des Anwendungsbereichs" },
    { ebene: 1, punkt: "Die Strafbarkeit/Ahndbarkeit wird durch ein besonderes persönliches Merkmal begründet",
      definition: {
        begriff: "Besondere persönliche Merkmale (§ 14 StGB)",
        text: "Statusmerkmale, die die Sonderrolle eines wirtschaftlich Tätigen beschreiben (Unternehmer, Arbeitgeber, Hersteller, Schuldner); nicht subjektiv-täterschaftliche und nicht höchstpersönliche Merkmale",
        quelle: "Wittig § 6 Rn. 80 f."
      }
    },
    { ebene: 1, punkt: "Das besondere persönliche Merkmal liegt beim Vertretenen oder Auftraggeber vor" },
    { ebene: 0, punkt: "Vorliegen einer Variante" },
    { ebene: 1, punkt: "§ 14 Abs. 1 / § 9 Abs. 1: gesetzliche Vertreter" },
    { ebene: 2, punkt: "Gesetzlicher Vertreter i.S.d. Nr. 1–3 (Organ einer juristischen Person; vertretungsberechtigter Gesellschafter einer rechtsfähigen Personengesellschaft; gesetzlicher Vertreter)",
      definition: {
        begriff: "Strohmann-Geschäftsführer",
        text: "Formal wirksam bestellter Geschäftsführer ohne tatsächliche Befugnisse im Innenverhältnis; nach BGH strafrechtlich verantwortlich, weil § 14 Abs. 1 Nr. 1 an die Organstellung anknüpft",
        quelle: "BGH NStZ 2017, 149"
      }
    },
    { ebene: 2, punkt: "Handeln in dieser Eigenschaft (Vertretungsbezug)" },
    { ebene: 3, punkt: "Interessentheorie (aufgegeben)",
      definition: {
        begriff: "Interessentheorie",
        text: "(aufgegeben) Vertretungsbezug, wenn das Handeln zumindest auch im wirtschaftlichen Interesse des Vertretenen liegt",
        quelle: "BGHSt 28, 371"
      }
    },
    { ebene: 3, punkt: "Funktionstheorie (h.L.); neue Rspr.: Tätigwerden im Geschäftskreis des Vertretenen (BGHSt 57, 229)",
      definition: {
        begriff: "Funktionstheorie",
        text: "Vertretungsbezug bei objektiv-funktionalem Zusammenhang mit dem Aufgaben- und Pflichtenkreis: Einsatz der durch die Stellung eröffneten Handlungsmöglichkeiten",
        quelle: "Kursskript KE 1, 3.6.2.4"
      }
    },
    { ebene: 1, punkt: "§ 14 Abs. 2 / § 9 Abs. 2: gewillkürte Vertretung" },
    { ebene: 2, punkt: "Betrieb oder Unternehmen",
      definition: {
        begriff: "Betrieb (§ 14 Abs. 2)",
        text: "Nicht nur vorübergehend angelegte organisatorische Zusammenfassung von Personen und Sachmitteln unter einheitlicher Leitung zur Erzeugung oder Bereitstellung von Gütern oder Leistungen",
        quelle: "Kursskript KE 1, 3.6.2.2"
      }
    },
    { ebene: 2, punkt: "Beauftragter i.S.d. Nr. 1: Betriebsleiter (ganz oder zum Teil)",
      definition: {
        begriff: "Betriebsleiter (§ 14 Abs. 2 S. 1 Nr. 1)",
        text: "Wer nach innen und außen verantwortlich ist und selbstständig anstelle des Inhabers Leitungsaufgaben wahrnimmt",
        quelle: "BGH NJW-RR 1989, 1185"
      }
    },
    { ebene: 2, punkt: "Beauftragter i.S.d. Nr. 2: ausdrücklich Beauftragter für einzelne Aufgaben",
      definition: {
        begriff: "Beauftragter (§ 14 Abs. 2 S. 1 Nr. 2)",
        text: "Wer vom Inhaber ausdrücklich mit der eigenverantwortlichen Wahrnehmung einzelner betriebsbezogener Aufgaben betraut ist und diese eigenverantwortlich wahrnimmt",
        quelle: "Wittig § 6 Rn. 98; BGHSt 58, 10"
      }
    },
    { ebene: 2, punkt: "Handeln aufgrund des Auftrags" },
    { ebene: 1, punkt: "§ 14 Abs. 3 / § 9 Abs. 3: unwirksame Bestellung" },
    { ebene: 2, punkt: "Person, deren Bestellung unwirksam ist" },
    { ebene: 2, punkt: "Handeln in dieser Eigenschaft" },
    { ebene: 2, punkt: "Faktischer Geschäftsführer (Rspr.: ohne wirksame Bestellung, aber mit Einverständnis der Gesellschafter)",
      definition: {
        begriff: "Faktischer Geschäftsführer",
        text: "Wer ohne wirksame Bestellung, aber mit Einverständnis der Gesellschafter, die Geschäftsführung nach dem Gesamterscheinungsbild in maßgeblichem Umfang tatsächlich übernommen hat (Gesamtschau; Indizien: Übernahme der exklusiven Organpflichten Buchführung, Kapitalerhaltung, Insolvenzantrag)",
        quelle: "BGHSt 31, 118; BGH 5 StR 287/24"
      }
    },
    { ebene: 0, punkt: "Rechtsfolge: Das besondere persönliche Merkmal wird auf den Vertreter/Beauftragten angewendet; er ist tauglicher Täter" }
  ]
});

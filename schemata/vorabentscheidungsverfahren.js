// Vorabentscheidungsverfahren (Art. 267 AEUV)
// Quelle: Europarecht I, Kap. 14
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "vab",
  norm: "Art. 267 AEUV",
  titel: "Vorabentscheidungsverfahren",
  gebiet: "Europarecht",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I.", "1."],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit der Vorlage" },
    { ebene: 1, punkt: "Vorlageberechtigtes Gericht eines Mitgliedstaats",
      definition: {
        begriff: "Gericht eines Mitgliedstaats (Dorsch-Consult-Formel)",
        text: "Unionsautonomer Begriff mit den Kriterien gesetzliche Grundlage, ständiger Charakter, obligatorische Gerichtsbarkeit, streitiges Verfahren, Anwendung von Rechtsnormen und Unabhängigkeit. Private Schieds- und Investitionsschiedsgerichte sind nicht vorlageberechtigt.",
        quelle: "EuGH, C-54/96 – Dorsch Consult, Rn. 23; Rs. 61/65 – Vaassen-Göbbels; Rs. 102/81 – Nordsee, Rn. 10–14; C-284/16 – Achmea, Rn. 43–49"
      }
    },
    { ebene: 1, punkt: "Tauglicher Vorlagegegenstand (Art. 267 Abs. 1 lit. a und b AEUV)",
      definition: {
        begriff: "Vorlagegegenstand",
        text: "Auslegung des Primär- und Sekundärrechts sowie Gültigkeit der Handlungen der Unionsorgane; keine Auslegung nationalen Rechts.",
        quelle: "Art. 267 Abs. 1 AEUV"
      }
    },
    { ebene: 1, punkt: "Entscheidungserheblichkeit (Vermutung der Entscheidungserheblichkeit)",
      definition: {
        begriff: "Entscheidungserheblichkeit",
        text: "Vorlagen sind unzulässig, wenn die erbetene Auslegung für die Entscheidung des Ausgangsrechtsstreits nicht erforderlich ist; das Verfahren dient nicht der Abgabe von Gutachten zu allgemeinen oder hypothetischen Fragen, und konstruierte Rechtsstreitigkeiten sind ausgeschlossen. Es gilt aber eine Vermutung der Entscheidungserheblichkeit: Der EuGH weist eine Vorlage nur zurück, wenn die Auslegung offensichtlich in keinem Zusammenhang mit dem Ausgangsrechtsstreit steht, das Problem hypothetisch ist oder die nötigen tatsächlichen und rechtlichen Angaben fehlen (Art. 94 VerfO EuGH).",
        quelle: "EuGH, verb. Rs. C-558/18 und C-563/18 – Miasto Łowicz, Rn. 44 f.; Rs. 104/79 und 244/80 – Foglia/Novello"
      }
    },
    { ebene: 1, punkt: "Vorlagepflicht letztinstanzlicher Gerichte (Art. 267 Abs. 3 AEUV)",
      definition: {
        begriff: "CILFIT-Ausnahmen",
        text: "Keine Vorlagepflicht bei (1) fehlender Entscheidungserheblichkeit, (2) bereits erfolgter Auslegung durch gesicherte Rechtsprechung (acte éclairé) oder (3) offenkundiger Klarheit ohne Raum für vernünftigen Zweifel (acte clair). Bei Nichtvorlage muss erkennbar sein, welche Ausnahme einschlägig ist; diese Begründungspflicht ist inzwischen ausdrücklich mit Art. 47 Abs. 2 GRCh verknüpft.",
        quelle: "EuGH, Rs. 283/81 – CILFIT; C-561/19 – Consorzio Italian Management, Rn. 51; C-144/23 – KUBERA, Rn. 35–37"
      }
    },
    { ebene: 1, punkt: "Vorlagepflicht aller Gerichte bei Gültigkeitszweifeln",
      definition: {
        begriff: "Verwerfungsmonopol (Foto-Frost)",
        text: "Nationale Gerichte dürfen Unionsrechtsakte auf ihre Gültigkeit prüfen und für gültig halten, sie aber nicht selbst für ungültig erklären; die Ungültigfeststellung ist dem EuGH vorbehalten.",
        quelle: "EuGH, Rs. 314/85 – Foto-Frost, Rn. 15–20"
      }
    },
    { ebene: 0, punkt: "Beantwortung der Vorlagefrage (materielle Prüfung, je nach Frage)" },
    { ebene: 1, punkt: "Auslegungsfrage zu einer Grundfreiheit: Prüfung nach dem Schema der jeweiligen Grundfreiheit" },
    { ebene: 2, punkt: "Warenverkehrsfreiheit (Art. 34, 36 AEUV)", verweis: "wvf" },
    { ebene: 2, punkt: "Arbeitnehmerfreizügigkeit (Art. 45 AEUV)", verweis: "anf" },
    { ebene: 2, punkt: "Niederlassungsfreiheit (Art. 49 AEUV)", verweis: "nlf" },
    { ebene: 2, punkt: "Dienstleistungsfreiheit (Art. 56 AEUV)", verweis: "dlf" },
    { ebene: 2, punkt: "Kapital- und Zahlungsverkehrsfreiheit (Art. 63 AEUV)", verweis: "kvf" },
    { ebene: 2, punkt: "Hilfsweise: allgemeines Diskriminierungsverbot (Art. 18 AEUV)", verweis: "art18" },
    { ebene: 1, punkt: "Auslegungsfrage zu den Unionsgrundrechten", verweis: "grch" },
    { ebene: 1, punkt: "Auslegungsfrage zur Wirkung einer Richtlinie", verweis: "rl-umsetzung" },
    { ebene: 1, punkt: "Gültigkeitsfrage: Nichtigkeitsgründe des Art. 263 Abs. 2 AEUV", verweis: "nk" },
    { ebene: 0, punkt: "Wirkung der Entscheidung" },
    { ebene: 1, punkt: "Bindungswirkung für das vorlegende Gericht",
      definition: {
        begriff: "Bindungswirkung der Vorabentscheidung",
        text: "Die Vorabentscheidung bindet das vorlegende Gericht im Ausgangsverfahren sowie alle später mit der Sache befassten Instanzen; andere Gerichte dürfen dieselbe Frage erneut vorlegen.",
        quelle: "EuGH, verb. Rs. 28/62 bis 30/62 – Da Costa"
      }
    },
    { ebene: 1, punkt: "Ex-tunc-Wirkung, ausnahmsweise zeitliche Begrenzung",
      definition: {
        begriff: "Zeitliche Wirkung (Defrenne II)",
        text: "Auslegungsurteile wirken grundsätzlich ex tunc; ausnahmsweise kann der EuGH die Wirkung zeitlich begrenzen, wenn zwingende Erwägungen der Rechtssicherheit dies gebieten. Eine solche Begrenzung kann nur im Auslegungsurteil selbst erfolgen.",
        quelle: "EuGH, Rs. 43/75 – Defrenne II"
      }
    },
    { ebene: 1, punkt: "Erga-omnes-Wirkung der Ungültigerklärung",
      definition: {
        begriff: "Wirkung der Ungültigerklärung",
        text: "Eine Ungültigerklärung ist zwar unmittelbar nur an das vorlegende Gericht gerichtet, aber für jedes andere nationale Gericht ausreichender Grund, den Akt ebenfalls als ungültig zu behandeln; bei einer Gültigerklärung besteht keine solche Wirkung.",
        quelle: "EuGH, Rs. 66/80 – International Chemical Corporation, Rn. 18"
      }
    },
    { ebene: 0, punkt: "Folgen der Verletzung der Vorlagepflicht" },
    { ebene: 1, punkt: "Staatshaftung (C-224/01 – Köbler)", verweis: "sh" },
    { ebene: 1, punkt: "Vertragsverletzungsverfahren (C-416/17 – Kommission/Frankreich)", verweis: "vvv" },
    { ebene: 1, punkt: "Entzug des gesetzlichen Richters (Art. 101 Abs. 1 S. 2 GG)",
      definition: {
        begriff: "EuGH als gesetzlicher Richter",
        text: "Das BVerfG behandelt den EuGH als gesetzlichen Richter im Sinne von Art. 101 Abs. 1 S. 2 GG. Eine Verletzung der Vorlagepflicht ist nur bei Willkür verfassungswidrig, nicht schon bei schlichter Fehlerhaftigkeit. Drei Fallgruppen: grundsätzliche Verkennung der Vorlagepflicht, bewusstes Abweichen von der Rechtsprechung des EuGH ohne Vorlagebereitschaft, Unvollständigkeit der Rechtsprechung mit unvertretbarer Überschreitung des Beurteilungsrahmens.",
        quelle: "BVerfGE 73, 339 – Solange II; BVerfG, 2 BvR 2661/06 – Honeywell"
      }
    }
  ]
});

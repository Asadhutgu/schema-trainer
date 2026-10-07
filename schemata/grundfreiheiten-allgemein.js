// Grundfreiheiten – allgemeines Prüfungsschema (Art. 34, 45, 49, 56, 63 AEUV)
// Quelle: Europarecht II, Kap. 5 IV (angelehnt an Ehlers, Streinz Rn. 892)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "gf-allg",
  norm: "Art. 34, 45, 49, 56, 63 AEUV",
  titel: "Grundfreiheiten – allgemeines Prüfungsschema",
  gebiet: "Europarecht",
  gruppe: "Grundfreiheiten",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Anwendbarkeit" },
    { ebene: 1, punkt: "Unmittelbare Anwendbarkeit" },
    { ebene: 1, punkt: "Keine vorrangigen Bestimmungen des Sekundärrechts (Bearbeitervermerk beachten)" },
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Sachlicher Schutzbereich" },
    { ebene: 2, punkt: "Sachlich geschützte Tätigkeit, ggf. Abgrenzung der Grundfreiheiten (Schwerpunkt)" },
    { ebene: 3, punkt: "Warenverkehrsfreiheit (Art. 34, 36 AEUV)", verweis: "wvf" },
    { ebene: 3, punkt: "Arbeitnehmerfreizügigkeit (Art. 45 AEUV)", verweis: "anf" },
    { ebene: 3, punkt: "Niederlassungsfreiheit (Art. 49 AEUV)", verweis: "nlf" },
    { ebene: 3, punkt: "Dienstleistungsfreiheit (Art. 56 AEUV)", verweis: "dlf" },
    { ebene: 3, punkt: "Kapital- und Zahlungsverkehrsfreiheit (Art. 63 AEUV)", verweis: "kvf" },
    { ebene: 2, punkt: "Grenzüberschreitender Sachverhalt",
      definition: {
        begriff: "Grenzüberschreitender Bezug",
        text: "Die Grundfreiheiten setzen ein grenzüberschreitendes Element voraus; rein innerstaatliche Sachverhalte fallen nicht in den Anwendungsbereich (Folge: unionsrechtlich zulässige Inländerdiskriminierung). Eine rein hypothetische Aussicht auf Ausübung der Grundfreiheit genügt nicht.",
        quelle: "EuGH, C-299/95 – Kremzow; Europarecht II, Kap. 11 I"
      }
    },
    { ebene: 2, punkt: "Keine Bereichsausnahme",
      definition: {
        begriff: "Bereichsausnahmen (allgemein)",
        text: "Jede Grundfreiheit hat eigene Bereichsausnahmen, etwa Art. 45 Abs. 4 AEUV für die Arbeitnehmerfreizügigkeit, Art. 51 AEUV für die Niederlassungsfreiheit und über Art. 62 AEUV auch für die Dienstleistungsfreiheit. Gemeinsam ist ihnen: Sie nehmen einen unionsrechtlich zu bestimmenden Bereich von vornherein vom Schutzbereich aus und müssen nicht gerechtfertigt werden; sie sind strikt von den Schranken zu unterscheiden. Die einzelnen Ausnahmen stehen in den Schemata der jeweiligen Grundfreiheit.",
        quelle: "Streinz, Rn. 870; Europarecht II, Kap. 5 II 2"
      }
    },
    { ebene: 1, punkt: "Persönlicher Schutzbereich (Berechtigter)" },
    { ebene: 1, punkt: "Räumlicher Schutzbereich (nur bei Anlass)" },
    { ebene: 1, punkt: "Zeitlicher Schutzbereich (nur bei Anlass)" },
    { ebene: 0, punkt: "Eingriff" },
    { ebene: 1, punkt: "Handeln oder pflichtwidriges Unterlassen eines Verpflichteten (Mitgliedstaaten, Unionsorgane, intermediäre Gewalten, z. T. Private)",
      definition: {
        begriff: "Bindung Privater (Drittwirkung)",
        text: "Verpflichtet sind primär die Mitgliedstaaten und die Union, darüber hinaus intermediäre Gewalten, deren Regelwerke die abhängige Erwerbstätigkeit, die selbständige Arbeit und die Erbringung von Dienstleistungen kollektiv regeln sollen. Das Diskriminierungsverbot des Art. 45 AEUV gilt zudem für private Arbeitgeber.",
        quelle: "EuGH, Rs. 36/74 – Walrave, Rn. 17; C-415/93 – Bosman, Rn. 82; C-281/98 – Angonese, Rn. 30 ff."
      }
    },
    { ebene: 1, punkt: "Unterscheidung zwischen Bestimmungsstaat und Herkunftsstaat" },
    { ebene: 1, punkt: "Diskriminierung" },
    { ebene: 2, punkt: "Offene Diskriminierung",
      definition: {
        begriff: "Offene (unmittelbare) Diskriminierung",
        text: "Die Maßnahme knüpft ausdrücklich an die Staatsangehörigkeit (bei Waren: an Herkunft oder Ursprung) an und stellt Ausländer bzw. Einfuhrwaren schlechter. Rechtfertigung grundsätzlich nur über die geschriebenen Gründe.",
        quelle: "Europarecht II, Kap. 11 I; EuGH, C-296/15 – Medisanus"
      }
    },
    { ebene: 2, punkt: "Versteckte Diskriminierung",
      definition: {
        begriff: "Versteckte (mittelbare) Diskriminierung",
        text: "Verboten sind nicht nur offensichtliche Diskriminierungen aufgrund der Staatsangehörigkeit, sondern auch alle versteckten Formen der Diskriminierung, die durch die Anwendung anderer Unterscheidungsmerkmale tatsächlich zu dem gleichen Ergebnis führen; typisch sind Wohnsitz, Sprache, Ausbildungsort.",
        quelle: "EuGH, Rs. 152/73 – Sotgiu, Rn. 11; C-237/94 – O’Flynn, Rn. 17 ff."
      }
    },
    { ebene: 1, punkt: "Beschränkung des Marktzugangs oder der Marktaktivitäten durch nichtdiskriminierende Maßnahme" },
    { ebene: 2, punkt: "Dassonville-Formel (Warenverkehr; erfasst auch Diskriminierungen) bzw. Gebhard-Formel (Personenverkehr; erfasst nur Beschränkungen)",
      definition: {
        begriff: "Beschränkung (Kraus-/Gebhard-Formel)",
        text: "Erfasst sind auch unterschiedslos anwendbare Maßnahmen, die die Ausübung der durch den Vertrag garantierten Grundfreiheiten behindern oder weniger attraktiv machen können.",
        quelle: "EuGH, C-19/92 – Kraus, Rn. 32; C-55/94 – Gebhard, Rn. 37"
      }
    },
    { ebene: 2, punkt: "Keine Ausklammerung marktzugangsneutraler Regelungen (Keck-Formel, ANETT-Formel)" },
    { ebene: 2, punkt: "Hinreichende Nähebeziehung",
      definition: {
        begriff: "Marktzugangskriterium (Graf)",
        text: "Maßnahmen, deren Auswirkung auf die Freizügigkeit zu ungewiss und zu indirekt ist, beschränken nicht; maßgeblich ist, ob der Zugang zum Markt bzw. zum Beruf betroffen ist.",
        quelle: "EuGH, C-190/98 – Graf, Rn. 23 ff."
      }
    },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Geschriebene Rechtfertigungsgründe (für jeden hoheitlichen Eingriff)" },
    { ebene: 1, punkt: "Ungeschriebene Rechtfertigungsgründe" },
    { ebene: 2, punkt: "Zwingende Gründe des Allgemeinwohls (Cassis-, Gebhard-Formel; für hoheitliche nichtdiskriminierende Maßnahmen, str. bei versteckter Diskriminierung)",
      definition: {
        begriff: "Gebhard-Formel (Rechtfertigung)",
        text: "Beschränkende Maßnahmen müssen in nichtdiskriminierender Weise angewandt werden, aus zwingenden Gründen des Allgemeininteresses gerechtfertigt sein, geeignet sein, die Verwirklichung des verfolgten Ziels zu gewährleisten, und dürfen nicht über das hinausgehen, was zur Erreichung dieses Ziels erforderlich ist.",
        quelle: "EuGH, C-55/94 – Gebhard, Rn. 37"
      }
    },
    { ebene: 2, punkt: "Unionsgrundrechte (für hoheitliche und teilweise private Eingriffe)",
      definition: {
        begriff: "Unionsgrundrechte als Rechtfertigungsgrund",
        text: "Der Schutz der Unionsgrundrechte ist als Rechtfertigungsgrund anerkannt; sie stehen im gleichen normativen Rang wie die Grundfreiheiten.",
        quelle: "EuGH, C-112/00 – Schmidberger"
      }
    },
    { ebene: 2, punkt: "Sachliche Gründe bei Eingriffen Privater (unmittelbare Drittwirkung)",
      definition: {
        begriff: "Sachliche Gründe",
        text: "Bei rein privatnützigen Maßnahmen ist Sachlichkeit gegeben, wenn sich die Gründe aus der ökonomischen Zwecksetzung der geschützten Tätigkeit ableiten lassen und diese prinzipiell zu befördern vermögen.",
        quelle: "EuGH, C-415/93 – Bosman, Rn. 76"
      }
    },
    { ebene: 1, punkt: "Schranken-Schranken" },
    { ebene: 2, punkt: "Unionsgrundrechte", verweis: "grch",
      definition: {
        begriff: "Grundrechte als Schranken-Schranke",
        text: "Die geschriebenen wie die ungeschriebenen Rechtfertigungsgründe sind im Lichte der Unionsgrundrechte auszulegen.",
        quelle: "EuGH, C-260/89 – ERT; C-390/12 – Pfleger"
      }
    },
    { ebene: 2, punkt: "Verhältnismäßigkeit (Geeignetheit einschließlich Kohärenz, Erforderlichkeit, hilfsweise Angemessenheit)",
      definition: {
        begriff: "Kohärenzgebot",
        text: "Das verfolgte Schutzniveau muss in kohärenter und systematischer Weise erreicht werden: Der Mitgliedstaat muss dem angeführten Risiko in vergleichbaren Zusammenhängen mit entsprechender Konsequenz entgegentreten. Der EuGH prüft dies als Aspekt der Geeignetheit.",
        quelle: "EuGH, C-169/07 – Hartlauer; C-243/01 – Gambelli, Rn. 67; C-42/07 – Liga Portuguesa"
      }
    },
    { ebene: 0, punkt: "Rechtsfolge (Unanwendbarkeit bzw. Nichtigkeit; bei Diskriminierung „Anpassung nach oben“; ggf. Staatshaftung; bei Privaten § 823 Abs. 2, § 134 BGB)", verweis: "sh",
      definition: {
        begriff: "Anpassung nach oben",
        text: "Beim Verstoß gegen ein Diskriminierungsverbot ist die diskriminierende Bestimmung außer Anwendung zu lassen und auf die benachteiligte Gruppe die Regelung der begünstigten Gruppe anzuwenden. Beim Verstoß gegen ein Beschränkungsverbot bleibt es bei der Unanwendbarkeit der Norm im grenzüberschreitenden Fall.",
        quelle: "EuGH, verb. Rs. C-231/06 bis C-233/06 – Jonkman"
      }
    }
  ]
});

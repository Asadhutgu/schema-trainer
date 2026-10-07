// Bankrott (§ 283 StGB)
// Quelle: Lernskript Wirtschaftsstrafrecht KE 3, Abschnitt 6 (Wittig § 23 Rn. 18)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "wsr-283",
  norm: "§ 283 StGB",
  titel: "Bankrott",
  gebiet: "Wirtschaftsstrafrecht",
  gruppe: "Insolvenz-, Korruptions- und Kapitalmarktstrafrecht (KE 3)",
  gliederung: ["I.", "1.", "a)", "aa)"],
  punkte: [
    { ebene: 0, punkt: "Tatbestand" },
    { ebene: 1, punkt: "Objektiver Tatbestand" },
    { ebene: 2, punkt: "Täter: Schuldner (als Schuldner / für den Schuldner, § 14)",
      definition: {
        begriff: "Schuldner (§ 283)",
        text: "Wer, aus welchem Rechtsgrund auch immer, für die Erfüllung einer Verbindlichkeit haftet und die Zwangsvollstreckung zu dulden hat — auch Verbraucher",
        quelle: "BGH NJW 2001, 1875"
      }
    },
    { ebene: 2, punkt: "Krise (Abs. 1): Überschuldung, drohende oder eingetretene Zahlungsunfähigkeit – oder Herbeiführung der Krise (Abs. 2)",
      definition: {
        begriff: "Drohende Zahlungsunfähigkeit",
        text: "Der Schuldner wird voraussichtlich nicht in der Lage sein, die bestehenden Zahlungspflichten bei Fälligkeit zu erfüllen; Prognosezeitraum in aller Regel 24 Monate (§ 18 Abs. 2 InsO)",
        quelle: "Kursskript KE 3, 2.4"
      }
    },
    { ebene: 2, punkt: "Bankrotthandlung" },
    { ebene: 3, punkt: "Nr. 1: Beiseiteschaffen",
      definition: {
        begriff: "Beiseiteschaffen (§ 283)",
        text: "Ein Vermögensbestandteil wird durch dinglichen oder tatsächlichen Akt dem Gläubigerzugriff entzogen oder der Zugriff wesentlich erschwert",
        quelle: "Wittig § 23 Rn. 68"
      }
    },
    { ebene: 3, punkt: "Nr. 1: Verheimlichen, Zerstören, Beschädigen, Unbrauchbarmachen",
      definition: {
        begriff: "Verheimlichen (§ 283)",
        text: "Verhalten, durch das ein Vermögensbestandteil oder seine Massezugehörigkeit der Kenntnis der Gläubiger oder des Insolvenzverwalters entzogen wird",
        quelle: "Kursskript KE 3, 2.5.1.2"
      }
    },
    { ebene: 3, punkt: "Nr. 2: Verlustgeschäfte",
      definition: {
        begriff: "Verlustgeschäft",
        text: "Geschäft, das von vornherein auf Vermögensminderung angelegt ist und tatsächlich zu einer Einbuße führt (Negativsaldo schon in der Vorauskalkulation)",
        quelle: "Kursskript KE 3, 2.5.2.1"
      }
    },
    { ebene: 3, punkt: "Nr. 2: Spekulationsgeschäfte",
      definition: {
        begriff: "Spekulationsgeschäft",
        text: "Geschäft mit besonders großem Verlustrisiko in der Hoffnung auf einen größeren als den üblichen Gewinn",
        quelle: "Kursskript KE 3, 2.5.2.1"
      }
    },
    { ebene: 3, punkt: "Nr. 2: Differenzgeschäfte",
      definition: {
        begriff: "Differenzgeschäft",
        text: "Liefergeschäft über Waren oder Wertpapiere, bei dem es dem Täter allein auf die Zahlung der Differenz zwischen vereinbartem und Markt-/Börsenpreis ankommt und der Partner dies weiß oder wissen müsste; auch Börsentermingeschäfte",
        quelle: "Kursskript KE 3, 2.5.2.1"
      }
    },
    { ebene: 3, punkt: "Nr. 2: unwirtschaftliche Ausgaben, Spiel, Wette",
      definition: {
        begriff: "Unwirtschaftliche Ausgabe",
        text: "Jede vermögensmindernde Verfügung, die relativ zur Vermögenssituation und Leistungsfähigkeit das Maß des Notwendigen und Üblichen übersteigt",
        quelle: "Kursskript KE 3, 2.5.2.2"
      }
    },
    { ebene: 3, punkt: "Nr. 3: Verschleudern kreditierter Waren" },
    { ebene: 3, punkt: "Nr. 4: Vortäuschen/Anerkennen fremder Rechte" },
    { ebene: 3, punkt: "Nr. 5: Buchführungsdelikte (Buchführungspflicht des Kaufmanns, §§ 238 ff. HGB)",
      definition: {
        begriff: "Kaufmann (§ 1 HGB)",
        text: "Wer ein Handelsgewerbe betreibt, es sei denn, das Unternehmen erfordert nach Art und Umfang keinen in kaufmännischer Weise eingerichteten Geschäftsbetrieb (Indizien: Umsatz, Betriebsgröße, Kredite, Organisation)",
        quelle: "Kursskript KE 3, 2.5.6"
      }
    },
    { ebene: 3, punkt: "Nr. 6: Beiseiteschaffen/Verheimlichen/Zerstören/Beschädigen von Handelsbüchern und Unterlagen" },
    { ebene: 3, punkt: "Nr. 7: Bilanz/Inventar" },
    { ebene: 3, punkt: "Nr. 8: Generalklausel" },
    { ebene: 2, punkt: "Bei Nr. 1 Var. 3, Nr. 2, 3, 8: Verstoß gegen die Anforderungen einer ordnungsgemäßen Wirtschaft",
      definition: {
        begriff: "Ordnungsgemäßes Wirtschaften",
        text: "Maßstab zur Abgrenzung erlaubten von unerlaubtem Risiko: vertretbarer Zweck (mit Gläubigerbefriedigung vereinbar), vertretbares Risiko (Krisenintensität, Verkehrssitte), ausreichende Information und Planung",
        quelle: "Kursskript KE 3, 2.3"
      }
    },
    { ebene: 2, punkt: "Bei Nr. 5–7: Erschwerung der Übersicht über den Vermögensstand",
      definition: {
        begriff: "Erschwerung der Übersicht (§ 283 Nr. 5–7)",
        text: "Ein Sachverständiger kann den Büchern den Vermögensstand gar nicht oder nur mit erheblichem Zeitaufwand entnehmen",
        quelle: "Kursskript KE 3, 2.5.6"
      }
    },
    { ebene: 1, punkt: "Subjektiver Tatbestand: Vorsatz (auch bzgl. Krise); Abs. 4 (fahrlässige Unkenntnis der Krise / leichtfertige Herbeiführung); Abs. 5 (fahrlässige Begehung bei Nr. 2, 5, 7)",
      definition: {
        begriff: "Leichtfertigkeit (§ 283 Abs. 4 Nr. 2)",
        text: "Besonders grobe Missachtung elementarer Anforderungen ordnungsgemäßer Wirtschaft, geprägt durch besondere Nachlässigkeit gegenüber den Gläubigerinteressen",
        quelle: "Kursskript KE 3, 2.6.2.1"
      }
    },
    { ebene: 0, punkt: "Rechtswidrigkeit" },
    { ebene: 0, punkt: "Schuld" },
    { ebene: 0, punkt: "Objektive Strafbarkeitsbedingung (Abs. 6): Zahlungseinstellung, Eröffnung, Abweisung mangels Masse – mit Zusammenhang zur Krise",
      definition: {
        begriff: "Zahlungseinstellung (§ 283 Abs. 6)",
        text: "Der Täter begleicht den wesentlichen oder überwiegenden Teil seiner fälligen Verbindlichkeiten wegen tatsächlichen Mittelmangels nicht mehr",
        quelle: "Kursskript KE 3, 2.7"
      }
    },
    { ebene: 0, punkt: "Strafzumessung: § 283a (Regelbeispiele: Gewinnsucht; wissentliche Gefährdung vieler Personen)",
      definition: {
        begriff: "Gewinnsucht (§ 283a)",
        text: "Ungewöhnliches, sittlich unanständiges Erwerbsstreben mit besonderer Rücksichtslosigkeit gegenüber Gläubigerinteressen; bloße Gewinnabsicht reicht nicht",
        quelle: "Kursskript KE 3, 2.8"
      }
    }
  ]
});

// Amtshaftungsklage (Art. 268, 340 Abs. 2 AEUV)
// Quelle: Europarecht I, Kap. 13
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "ahk",
  norm: "Art. 268, 340 Abs. 2 AEUV",
  titel: "Amtshaftungsklage",
  gruppe: "Rechtsschutz und Verfahren",
  gliederung: ["A.", "I."],
  punkte: [
    { ebene: 0, punkt: "Zulässigkeit" },
    { ebene: 1, punkt: "Zuständigkeit: EuG (Art. 256 AEUV), Rechtsmittel zum EuGH" },
    { ebene: 1, punkt: "Parteifähigkeit (aktiv jede natürliche oder juristische Person, auch Mitgliedstaaten, mit eigenem Schaden; passiv die Union, vertreten durch das schädigende Organ)" },
    { ebene: 1, punkt: "Klagegegenstand: Ersatz eines durch Organe oder Bedienstete in Ausübung der Amtstätigkeit verursachten Schadens; Selbständigkeit gegenüber Nichtigkeits- und Untätigkeitsklage",
      definition: {
        begriff: "Selbständigkeit der Schadensersatzklage",
        text: "Die Schadensersatzklage ist ein selbständiger Rechtsbehelf mit eigener Funktion und eigenen Voraussetzungen; ihre Zulässigkeit hängt grundsätzlich nicht von der einer Nichtigkeitsklage ab. Grenze: Die Klage zielt in Wahrheit auf die Aufhebung eines bestandskräftigen Einzelakts.",
        quelle: "EuGH, Rs. 4/69 – Lütticke, Rn. 6; Rs. 175/84 – Krohn"
      }
    },
    { ebene: 1, punkt: "Kein Vorverfahren; ggf. Subsidiarität bei nationalem Vollzug",
      definition: {
        begriff: "Subsidiarität bei nationalem Vollzug",
        text: "Bei rechtswidrigem nationalem Vollzug ist zunächst der nationale Rechtsweg auszuschöpfen; bei Gefahr doppelter oder unzureichender Entschädigung wartet das Unionsgericht die nationale Entscheidung ab.",
        quelle: "EuGH, verb. Rs. 5/66 u. a. – Kampffmeyer"
      }
    },
    { ebene: 1, punkt: "Verjährung (nur auf Einrede)",
      definition: {
        begriff: "Verjährung",
        text: "Ansprüche aus außervertraglicher Haftung verjähren in fünf Jahren; die Frist beginnt erst, wenn alle Haftungsvoraussetzungen erfüllt sind und sich der Schaden konkretisiert hat.",
        quelle: "Art. 46 Satzung; EuGH, verb. Rs. 256/80 u. a. – Birra Wührer, Rn. 10"
      }
    },
    { ebene: 0, punkt: "Begründetheit (drei kumulative Voraussetzungen, Bergaderm)",
      definition: {
        begriff: "Schöppenstedt-Formel und Bergaderm-Kriterien",
        text: "Schöppenstedt: Haftung für normatives Unrecht nur bei einer hinreichend qualifizierten Verletzung einer höherrangigen, dem Schutz des Einzelnen dienenden Rechtsnorm. Bergaderm: Die verletzte Rechtsnorm bezweckt, dem Einzelnen Rechte zu verleihen; der Verstoß ist hinreichend qualifiziert; zwischen Verstoß und Schaden besteht ein unmittelbarer Kausalzusammenhang. Ein gesondertes Verschulden ist nicht erforderlich.",
        quelle: "EuGH, Rs. 5/71 – Schöppenstedt, Rn. 11; C-352/98 P – Bergaderm, Rn. 39–42"
      }
    },
    { ebene: 1, punkt: "Hinreichend qualifizierter Verstoß gegen eine Rechtsnorm, die dem Einzelnen Rechte verleiht",
      definition: {
        begriff: "Hinreichend qualifizierter Verstoß (Unionshaftung)",
        text: "Entscheidend ist, ob das Organ die Grenzen seines Ermessens offenkundig und erheblich überschritten hat. Bei erheblich verringertem oder auf Null reduziertem Spielraum kann die bloße Verletzung des Unionsrechts genügen.",
        quelle: "EuGH, C-352/98 P – Bergaderm, Rn. 43; verb. Rs. 83/76 u. a. – HNL, Rn. 6"
      }
    },
    { ebene: 1, punkt: "Tatsächlicher und sicherer Schaden (auch künftiger, hinreichend sicherer Schaden)",
      definition: {
        begriff: "Tatsächlicher und sicherer Schaden",
        text: "Der Schaden muss tatsächlich und sicher sein; entgangener Gewinn und immaterielle Schäden sind ersatzfähig. Ein künftiger Schaden genügt, wenn er unmittelbar bevorsteht und mit hinreichender Sicherheit vorhersehbar ist. Die Beweislast trägt der Kläger.",
        quelle: "EuGH, verb. Rs. 256/80 u. a. – Birra Wührer, Rn. 9; verb. Rs. 56/74 bis 60/74 – Kampffmeyer Mühlenvereinigung, Rn. 6; C-237/98 P – Dorsch Consult"
      }
    },
    { ebene: 1, punkt: "Unmittelbarer Kausalzusammenhang",
      definition: {
        begriff: "Unmittelbarer Kausalzusammenhang",
        text: "Erforderlich ist ein unmittelbarer ursächlicher Zusammenhang; die Ersatzpflicht erstreckt sich nicht auf jede noch so entfernte nachteilige Folge rechtswidrigen Verhaltens.",
        quelle: "EuGH, verb. Rs. 64/76 u. a. – Dumortier Frères"
      }
    },
    { ebene: 1, punkt: "Keine Haftung für rechtmäßiges Handeln (FIAMM); Haftung für Bedienstete nur bei unmittelbarer innerer Beziehung zu den Aufgaben (Sayag)" }
  ]
});

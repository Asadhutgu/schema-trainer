# Schemata teilen: Exportieren und Importieren

Eigene Schemata liegen nur im Browser, in dem sie angelegt wurden. Mit „Exportieren“ entsteht daraus eine Datei, die sich weitergeben, sichern oder in einem anderen Browser (Handy, PC) wieder einlesen lässt. Wer die Datei bekommt, holt sie über „Importieren“ in seinen Schema-Trainer. So können sich Lerngruppen und Zuschauer gegenseitig Schemata zur Verfügung stellen.

Der Lernstand (Karteikasten, Ergebnisse) ist in der Export-Datei nicht enthalten.

## Exportieren

Startseite → „Exportieren“. Dort auswählen, welche Schemata in die Datei sollen: eigene Schemata sind vorausgewählt, die mitgelieferten lassen sich zusätzlich ankreuzen. Das Feld „Herkunft“ ist freiwillig und erscheint beim Empfänger (zum Beispiel der eigene Name, die Quelle oder der Rechtsstand).

Drei Wege, die Datei weiterzugeben:

- „Datei herunterladen“: speichert eine Datei mit der Endung `.json`, zum Beispiel `verfassungsbeschwerde.json` oder `schema-trainer-export-2026-10-07.json`.
- „Als Text kopieren“: legt den Inhalt in die Zwischenablage, zum Einfügen in eine Nachricht oder E-Mail. Wenn der Browser das nicht erlaubt, erscheint der Text zum Markieren und Kopieren von Hand.
- „Teilen“ (nur auf Geräten, die das anbieten, meist am Handy): öffnet das Teilen-Menü des Geräts.

## Importieren

Startseite → „Importieren“. Drei Wege:

- „Datei auswählen“ oder die Datei auf das Feld ziehen. Mehrere Dateien auf einmal sind möglich.
- Den Inhalt als Text in das Feld einfügen und „Text prüfen“ drücken, zum Beispiel aus einer Nachricht.
- Auch eine Schema-Datei aus dem Ordner `schemata` (Endung `.js`, Aufbau wie in `docs/schema-format.md`) kann importiert werden.

Vor dem Import zeigt die App jedes gefundene Schema mit Titel, Zahl der Prüfungspunkte und Definitionen. Schemata mit Fehlern (fehlender Titel, Sprung in den Ebenen, Punkt ohne Text) werden mit Fehlermeldung und Tipp angezeigt und nicht importiert; Hinweise (zum Beispiel „keine Fundstelle“) stehen dem Import nicht im Weg.

Hat ein Schema dieselbe Kennung (`id`) wie ein vorhandenes, entscheidet man je Schema:

- Kennung eines eigenen Schemas: „Vorhandenes ersetzen“ (Vorgabe), „Zusätzlich als Kopie anlegen“ (die Kopie bekommt eine neue Kennung wie `verfassungsbeschwerde-2`) oder „Überspringen“.
- Kennung eines mitgelieferten Schemas: „Als eigenes Schema mit neuer Kennung anlegen“ (Vorgabe), „Mitgeliefertes Schema durch dieses ersetzen“ oder „Überspringen“. Beim Ersetzen bleibt der Lernstand erhalten, weil die Karten an der Kennung hängen; wird die eigene Fassung später gelöscht, erscheint wieder das Original.

## Aufbau der Export-Datei

Die Datei ist eine Textdatei im JSON-Format. Sie enthält dieselben Felder wie eine Schema-Datei (`docs/schema-format.md`), nur in JSON-Schreibweise, sowie je Schema den vorgeschlagenen Dateinamen `datei` und wahlweise eine `herkunft`.

```json
{
  "format": "schema-trainer-import",
  "version": 1,
  "app": "Schema-Trainer",
  "exportiert": "2026-10-07",
  "schemata": [
    {
      "datei": "verfassungsbeschwerde.js",
      "herkunft": "Lerngruppe Hagen, Stand Oktober 2026",
      "id": "verfassungsbeschwerde",
      "norm": "Art. 94 Abs. 1 Nr. 4a GG",
      "titel": "Verfassungsbeschwerde",
      "gebiet": "Öffentliches Recht",
      "gruppe": "Staatsrecht",
      "gliederung": ["A.", "I.", "1.", "a)"],
      "punkte": [
        { "ebene": 0, "punkt": "Zulässigkeit" },
        { "ebene": 1, "punkt": "Beschwerdefähigkeit",
          "definition": {
            "begriff": "Beschwerdefähigkeit",
            "text": "Beschwerdefähig ist, wer Träger von Grundrechten oder grundrechtsgleichen Rechten sein kann.",
            "quelle": "Art. 19 Abs. 3 GG"
          }
        },
        { "ebene": 0, "punkt": "Begründetheit" }
      ]
    }
  ]
}
```

Beim Import werden außer dieser Form auch eine einfache Liste `[ {…}, {…} ]` und ein einzelnes Schema `{ "id": …, "punkte": … }` angenommen.

Für Schemata aus der App sind `norm` und die `quelle` einer Definition freiwillig. Für die Dateien im Ordner `schemata/` des Repositories bleiben beide Pflicht (siehe unten).

## Für die Pflege des Repositories: Export-Dateien übernehmen

Dasselbe Format liest das Node-Werkzeug `tools/importieren.mjs`. Eine Export-Datei aus der App lässt sich damit in den Ordner `schemata/` übernehmen, zum Beispiel in einer Claude-Code-Cloud-Session:

```
node tools/importieren.mjs import/schemata-export.json
```

Das Werkzeug schreibt je Schema eine Datei `schemata/<datei>`, trägt sie in `schemata/liste.js` ein und lässt die Prüfung laufen. Fehlende Normen und Fundstellen meldet die Prüfung dann als Fehler, weil sie für die mitgelieferten Schemata Pflicht sind; sie müssen vor dem Veröffentlichen ergänzt werden. Juristische Inhalte aus fremden Export-Dateien vor der Übernahme gegen Skript und Rechtsprechung prüfen.

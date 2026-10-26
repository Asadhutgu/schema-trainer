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

## Für alle hochladen und von GitHub herunterladen

Die App hat keinen eigenen Server. Geteilt wird deshalb über das GitHub-Projekt des Schema-Trainers, Ordner `community/`:

- **Hochladen:** „Exportieren“ → eigene Schemata ankreuzen → „Für alle auf GitHub hochladen“. Nach einem Hinweis, dass das Schema öffentlich wird, öffnet die App in einem neuen Tab die GitHub-Seite „neue Datei“ im Ordner `community` mit Dateiname (zum Beispiel `verfassungsbeschwerde-2026-10-26.json`) und Inhalt. Bei sehr großen Schemata passt der Inhalt nicht in die Adresse; dann liegt er in der Zwischenablage und wird mit Strg+V eingefügt (die App zeigt ihn zusätzlich an). Nötig ist ein kostenloses GitHub-Konto. „Commit changes…“, „Propose changes“ und „Create pull request“ reichen die Datei als Vorschlag ein; GitHub legt dafür automatisch eine Kopie des Projekts im eigenen Konto an. Der Betreiber prüft den Vorschlag (die automatische Prüfung meldet Formfehler) und übernimmt ihn mit „Merge pull request“.
- **Herunterladen:** „Importieren“ → „Liste von GitHub laden“. Die App fragt die GitHub-Schnittstelle nach den Dateien im Ordner `community` und lädt sie. Sie erscheinen in der Vorschau zunächst nicht angekreuzt, mit dem Vermerk „von GitHub“; angekreuzte werden wie bei jedem Import übernommen. Ohne Internetverbindung oder bei zu vielen Abfragen von einem Anschluss (GitHub erlaubt etwa 60 pro Stunde) zeigt die App einen Hinweis.

Das Projekt, der Branch und der Ordner stehen in `js/eigene.js` (`GITHUB`).

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
      "gebiet": "Staatsrecht",
      "gruppe": "Grundrechte",
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

Das Feld `bereich` („Strafrecht“, „Öffentliches Recht“, „Zivilrecht“) ist nur für die mitgelieferten Schemata nötig; importierte Schemata stehen immer im Reiter „Eigene Schemata“.

Beim Import werden außer dieser Form auch eine einfache Liste `[ {…}, {…} ]` und ein einzelnes Schema `{ "id": …, "punkte": … }` angenommen.

Für Schemata aus der App sind `norm` und die `quelle` einer Definition freiwillig. Für die Dateien im Ordner `schemata/` des Repositories bleiben beide Pflicht (siehe unten).

## Für die Pflege des Repositories: Export-Dateien übernehmen

Dasselbe Format liest das Node-Werkzeug `tools/importieren.mjs`. Eine Export-Datei aus der App lässt sich damit in den Ordner `schemata/` übernehmen, zum Beispiel in einer Claude-Code-Cloud-Session:

```
node tools/importieren.mjs import/schemata-export.json
```

Das Werkzeug schreibt je Schema eine Datei `schemata/<datei>`, trägt sie in `schemata/liste.js` ein und lässt die Prüfung laufen. Fehlende Normen und Fundstellen meldet die Prüfung dann als Fehler, weil sie für die mitgelieferten Schemata Pflicht sind; sie müssen vor dem Veröffentlichen ergänzt werden. Juristische Inhalte aus fremden Export-Dateien vor der Übernahme gegen Skript und Rechtsprechung prüfen.

# Schemata aus der Gemeinschaft

In diesem Ordner liegen Schemata, die Nutzer des Schema-Trainers für alle geteilt haben. Jede Datei ist eine Export-Datei der App (JSON, `format: "schema-trainer-import"`, Aufbau in `docs/import-export.md`) und kann ein oder mehrere Schemata enthalten.

## Wie eine Datei hierher kommt

1. In der App: „Eigene Schemata“ → „Exportieren“ → eigene Schemata ankreuzen → „Für alle auf GitHub hochladen“. Die App öffnet die GitHub-Seite „neue Datei“ in diesem Ordner, mit Dateiname und Inhalt.
2. Der Nutzer braucht ein kostenloses GitHub-Konto. Er klickt „Commit changes…“, „Propose changes“ und „Create pull request“. GitHub legt dafür automatisch eine Kopie des Projekts in seinem Konto an; nichts wird direkt verändert.
3. Der Betreiber sieht den Vorschlag unter „Pull requests“. Die automatische Prüfung (`node tools/pruefen.mjs`, Reiter „Actions“) meldet Formfehler in der Datei. Inhaltlich prüft der Betreiber selbst, ob das Schema brauchbar ist und nichts Unpassendes enthält.
4. Mit „Merge pull request“ wird die Datei übernommen. Ein bis zwei Minuten später liegt sie auf GitHub Pages, und die App zeigt sie allen unter „Importieren“ → „Aus GitHub herunterladen“.

## Regeln für Dateien in diesem Ordner

- Nur Dateien mit der Endung `.json` im Exportformat der App; andere Dateien zeigt die App nicht an.
- Der Dateiname sollte die Kennung des Schemas und das Datum enthalten, zum Beispiel `verfassungsbeschwerde-2026-10-26.json`; die App vergibt ihn so.
- Norm und Fundstellen sind für geteilte Schemata freiwillig (Prüfmodus „eigene“), Titel, Gliederung und Prüfungspunkte müssen stimmen.
- Beim Herunterladen entscheidet jeder Nutzer selbst, ob er ein Schema übernimmt; Kennungskonflikte mit eigenen oder mitgelieferten Schemata löst die App beim Import.

Soll ein geteiltes Schema zum festen Bestand der App werden, kann der Betreiber es mit `node tools/importieren.mjs community/<datei>.json` in den Ordner `schemata/` übernehmen; dort gelten dann die strengen Regeln (Norm, Fundstellen, Bereich).

# Schema-Trainer – Projektkontext für Claude Code

## Worum es geht

Eine Lern-Web-App für juristische Prüfungsschemata (zunächst Europarecht). Sie wird über GitHub Pages veröffentlicht und dient zwei Zwecken: als persönliches Lernwerkzeug für die Examensvorbereitung (Erstes Staatsexamen NRW, Schwerpunkt Europarecht, Studium an der FernUniversität in Hagen) und als Zusatzangebot für die Zuschauer des YouTube-Kanals „Examensvorbereitung Öffentliches Recht“.

Der Nutzer ist Jurist, kein Programmierer. Erkläre Änderungen deshalb kurz und in einfachem Deutsch, und kommuniziere auf Deutsch. Code-Kommentare ebenfalls auf Deutsch. Auf dem Rechner des Nutzers ist weder Node.js noch Python installiert; alles, was er selbst ausführen soll, muss im Browser laufen.

## Lernmodi

Die App hat vier Modi je Schema. „Aufbau abfragen“ lässt die Gliederung Punkt für Punkt aufdecken; der Nutzer bewertet sich selbst (gewusst / nicht gewusst), am Ende werden die unsicheren Punkte aufgelistet. „Ordnen“ zeigt die Prüfungspunkte einer Ebene gemischt, sie müssen in der richtigen Reihenfolge angetippt werden. „Definitionen“ ist ein Karteikasten mit fünf Stufen (Leitner-System, Wiederholung nach 1, 3, 7, 16 bzw. 30 Tagen; „Nicht gewusst“ setzt die Karte auf Stufe 1 und sofort fällig); man formuliert die Definition zuerst selbst und vergleicht dann. „Ansehen“ zeigt das ganze Schema zum Nachschlagen. Auf der Startseite stehen die fälligen Karten über alle Schemata hinweg.

## Architektur – bitte beibehalten

Statische Seite ohne Build-Schritt, ohne Framework, ohne npm-Abhängigkeiten. Sie muss sowohl auf GitHub Pages als auch beim direkten Öffnen von `index.html` im Browser (Doppelklick, `file://`) funktionieren. Deshalb werden die Schemata als klassische `<script>`-Tags geladen, die `js/app.js` aus der Liste in `schemata/liste.js` erzeugt; kein `fetch`, keine ES-Module (beides scheitert bei `file://`).

- `index.html` – Seitengerüst der App; bindet nur `schemata/liste.js` und `js/app.js` ein
- `schemata/liste.js` – Liste der Schema-Dateien (`window.SCHEMA_DATEIEN`); Reihenfolge = Reihenfolge auf der Startseite. Jede neue Schema-Datei muss hier eingetragen werden
- `schemata/*.js` – je ein Schema pro Datei, Format in `docs/schema-format.md`
- `css/style.css` – gesamtes Design, Farben als CSS-Variablen auf `:root`, Dunkelmodus über `prefers-color-scheme` und `data-theme`
- `js/app.js` – Programmlogik der App, keine juristischen Inhalte
- `pruefen.html` + `js/pruefen.js` – Prüfseite: prüft die Schema-Dateien im Browser, ohne Installation. Lädt die Dateien je nach Umgebung per `fetch` (Webserver, GitHub Pages), als `<script>` (`file://`) oder aus einem Ordner, den der Nutzer auf die Seite zieht
- `tools/pruefung.js` – die Prüfregeln selbst (ein Ort für Browser und Node). Neue Regeln nur hier ergänzen, nie doppelt
- `tools/pruefen.mjs` – dünner Node-Wrapper um `tools/pruefung.js`, läuft als GitHub Action bei jedem Push
- `tools/importieren.mjs` – Node-Werkzeug für Sammelimporte aus einer JSON-Datei (`format: "schema-trainer-import"`, je Schema `datei`, optional `herkunft` und `gruppe`); schreibt die Schema-Dateien und trägt sie in `schemata/liste.js` ein

Die Startseite bündelt Schemata nach dem freiwilligen Feld `gruppe` (Zwischenüberschriften in Reihenfolge des ersten Auftretens in `liste.js`). Ein Prüfungspunkt kann mit `verweis: "<id>"` auf ein anderes Schema zeigen; die App zeigt dann einen Link (Ansehen) bzw. einen Knopf (Aufbau abfragen), der in das andere Schema springt, und führt über den Verlauf (`verlauf` in `js/app.js`) mit „Zurück zu …“ an die alte Stelle zurück. So verzweigen die Verfahrensschemata in der Begründetheit nach Grundfreiheiten, ohne Inhalte zu doppeln. Neue Felder in Schema-Dateien immer auch in `tools/pruefung.js` als bekannte Felder eintragen, sonst meldet die Prüfung sie als unbekannt.

Der Lernstand liegt im `localStorage` unter dem Schlüssel `schematrainer:v1` im Format `{cards: {"<schema-id>:<karten-id>": {box, due}}, scores: {"<schema-id>": {known, total, at}}}`. Änderungen an diesem Format müssen abwärtskompatibel sein (alte Daten weiter lesen können), sonst verlieren Nutzer ihren Fortschritt. Karten-IDs entstehen aus dem Begriff der Definition (`slug`) oder aus einem expliziten `definition.id`.

## Arbeitsregeln

Nach jeder Änderung an `schemata/` die Prüfung laufen lassen und Fehler beheben, bevor committet wird: in einer Umgebung mit Node.js `node tools/pruefen.mjs`, sonst `pruefen.html` im Browser öffnen. Beide verwenden dieselben Regeln aus `tools/pruefung.js`. Neue Schema-Dateien in `schemata/liste.js` eintragen.

Juristische Inhalte nicht erfinden. Wenn bei einer Definition, Fundstelle oder Randnummer Unsicherheit besteht, die Stelle in der Antwort an den Nutzer ausdrücklich auflisten, statt sie stillschweigend zu übernehmen. Lieber eine Randnummer weglassen als eine falsche angeben.

Hausstil für Zitate: Absätze und Sätze ausgeschrieben („Art. 45 Abs. 4 AEUV“, „Art. 36 S. 2 AEUV“), nie römisch; Grundrechtecharta immer „GRCh“; Verfassungsbeschwerde seit 28.12.2024 in Art. 94 Abs. 1 Nr. 4a GG. EuGH-Entscheidungen: alte Nummern „EuGH, Rs. 66/85 – Lawrie-Blum, Rn. 17“, neuere „EuGH, C-55/94 – Gebhard, Rn. 37“ (ohne „Rs.“), verbundene „EuGH, verb. Rs. C-267/91 und C-268/91 – Keck“; innerhalb einer Aufzählung desselben Gerichts wird „EuGH,“ nicht wiederholt. Randnummern nur, wenn sie belegt sind. Satzung des Gerichtshofs kurz „Satzung“, Verfahrensordnungen „VerfO EuGH“ und „VerfO EuG“. Eine Fundstelle darf auf das Skript verweisen („Europarecht II, Kap. 11 I“), wenn das Skript dort keine Entscheidung nennt.

Die 19 Europarecht-Schemata wurden am 05.10.2026 aus den Skripten „Europarecht I“ und „Europarecht II“ (Komplettbände, Rechtsstand September 2026) übernommen und Definition für Definition gegen die Skripte geprüft; die Kommentarzeile „// Quelle:“ jeder Datei nennt das Kapitel. Bei Änderungen an Inhalten bleibt das Skript der Maßstab.

Mobile zuerst: Die App wird viel am Handy genutzt. Schaltflächen mindestens 44 px hoch, sichtbarer Tastaturfokus, `prefers-reduced-motion` respektieren, kein waagerechtes Scrollen.

Meldungen an den Nutzer (Prüfseite, Hinweise in der App) in einfachem Deutsch mit einem konkreten Tipp zur Behebung; englische Browsermeldungen werden in `tools/pruefung.js` übersetzt.

## Design

Das Design folgt dem Stil des YouTube-Kanals und soll einheitlich bleiben, nicht neu erfunden werden: Navy `#1F3A5F`, Gold `#C19A4B`, Creme `#FAF6EE`, Sandrahmen `#E6DECD`; Überschriften in Cambria (Fallback Georgia), Fließtext in Arial; Kopfband in Navy mit goldenem Kreis-Badge „E“; Inhalte auf weißen Karten mit Sandrahmen. Alle Farben stehen als Variablen in `css/style.css`; neue Elemente verwenden diese Variablen, damit der Dunkelmodus automatisch funktioniert.

## Mögliche nächste Schritte

Diese Liste ist ein Ideenspeicher, keine Reihenfolge. Was als Nächstes umgesetzt wird, entscheidet der Nutzer.

1. Lernstand exportieren und importieren (als Datei oder Code), damit Fortschritt zwischen Handy und PC übertragen werden kann.
2. Weitere Schemata: Niederlassungsfreiheit (Art. 49 AEUV), Dienstleistungsfreiheit (Art. 56 AEUV), Kapitalverkehrsfreiheit (Art. 63 AEUV), Unionsbürgerschaft (Art. 21 AEUV), Prüfung der GRCh-Grundrechte, Vertragsverletzungsverfahren (Art. 258 AEUV), Vorabentscheidungsverfahren (Art. 267 AEUV), Untätigkeitsklage (Art. 265 AEUV).
3. Sobald ein zweites Rechtsgebiet dazukommt: Filter nach Rechtsgebiet auf der Startseite (Feld `gebiet` zusätzlich zu `gruppe`; dann auch in `tools/pruefung.js` als bekanntes Feld eintragen).
4. Lückentext-Modus für Definitionen (Schlüsselwörter einer Definition ausblenden).
5. Downloadbereich für die Dokumentenpakete des Kanals (ersetzt die bisherigen Dropbox-Links), mit Übersicht nach Video bzw. Thema.
6. Verknüpfung von Schemata mit den passenden YouTube-Videos und Dokumentenpaketen.

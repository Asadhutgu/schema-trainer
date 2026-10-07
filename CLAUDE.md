# Schema-Trainer – Projektkontext für Claude Code

## Worum es geht

Eine Lern-Web-App für juristische Prüfungsschemata (zunächst Europarecht). Sie wird über GitHub Pages veröffentlicht (Repository `Asadhutgu/schema-trainer`, Branch `main`, Ordner `/`; live unter https://asadhutgu.github.io/schema-trainer/) und dient zwei Zwecken: als persönliches Lernwerkzeug für die Examensvorbereitung (Erstes Staatsexamen NRW, Schwerpunkt Europarecht, Studium an der FernUniversität in Hagen) und als Zusatzangebot für die Zuschauer des YouTube-Kanals „Examensvorbereitung Öffentliches Recht“.

Seit Oktober 2026 ist die App außerdem eine Plattform für eigene Inhalte: Nutzer legen Schemata und Definitionen direkt im Browser an, bearbeiten mitgelieferte Schemata als eigene Fassung und tauschen Schemata als Export-Datei untereinander aus (Community-Gedanke). `eigene.html` ist die leere Standalone-Umgebung ohne die mitgelieferten Schemata.

Der Nutzer ist Jurist, kein Programmierer. Erkläre Änderungen deshalb kurz und in einfachem Deutsch, und kommuniziere auf Deutsch. Code-Kommentare ebenfalls auf Deutsch. Auf dem Rechner des Nutzers ist weder Node.js noch Python installiert; alles, was er selbst ausführen soll, muss im Browser laufen.

## Lernmodi

Die App hat vier Modi je Schema. „Aufbau abfragen“ lässt die Gliederung Punkt für Punkt aufdecken; der Nutzer bewertet sich selbst (gewusst / nicht gewusst), am Ende werden die unsicheren Punkte aufgelistet. „Ordnen“ zeigt die Prüfungspunkte einer Ebene gemischt, sie müssen in der richtigen Reihenfolge angetippt werden. „Definitionen“ ist ein Karteikasten mit fünf Stufen (Leitner-System, Wiederholung nach 1, 3, 7, 16 bzw. 30 Tagen; „Nicht gewusst“ setzt die Karte auf Stufe 1 und sofort fällig); man formuliert die Definition zuerst selbst und vergleicht dann. „Ansehen“ zeigt das ganze Schema zum Nachschlagen. Auf der Startseite stehen die fälligen Karten über alle Schemata hinweg.

Eigene Schemata: Auf der Startseite stehen „Neues Schema“, „Importieren“ und „Exportieren“. Der Editor hat zwei Schritte, erst der Aufbau (Titel, Norm, Gruppe, Gliederungszeichen, Prüfungspunkte mit Ebenen; Pfeiltasten verschieben Punkte samt Unterpunkten, Enter legt den nächsten Punkt an, „Mehrere Punkte einfügen“ nimmt eingerückten Text), dann die Definitionen je Punkt (Begriff, Text, Fundstelle freiwillig, Verweis auf ein anderes Schema). Vor dem Speichern laufen die Regeln aus `tools/pruefung.js` im Modus `eigene`. Eigene Schemata werden in allen Lernmodi wie mitgelieferte behandelt und erscheinen auf der Startseite mit dem Kennzeichen „Eigenes Schema“ und einem Knopf „Bearbeiten“. In der Ansicht eines mitgelieferten Schemas führt „Als eigene Fassung bearbeiten“ in den Editor; die eigene Fassung behält die `id`, ersetzt das Original in der Übersicht und hält so den Lernstand; Löschen der Fassung bringt das Original zurück. Export und Import nutzen das JSON-Format aus `docs/import-export.md` (dasselbe wie `tools/importieren.mjs`); der Import nimmt auch `.js`-Schema-Dateien an und löst Kennungskonflikte je Schema (ersetzen, Kopie mit neuer id, überspringen).

## Architektur – bitte beibehalten

Statische Seite ohne Build-Schritt, ohne Framework, ohne npm-Abhängigkeiten. Sie muss sowohl auf GitHub Pages als auch beim direkten Öffnen von `index.html` im Browser (Doppelklick, `file://`) funktionieren. Deshalb werden die Schemata als klassische `<script>`-Tags geladen, die `js/app.js` aus der Liste in `schemata/liste.js` erzeugt; kein `fetch`, keine ES-Module (beides scheitert bei `file://`).

- `index.html` – Seitengerüst der App; bindet `schemata/liste.js`, `tools/pruefung.js`, `js/eigene.js` und `js/app.js` ein (in dieser Reihenfolge)
- `eigene.html` – Standalone-Variante, leere Umgebung: wie `index.html`, aber ohne `schemata/liste.js` und mit `window.NUR_EIGENE = true`; zeigt nur eigene Schemata aus dem Browser-Speicher
- `schemata/liste.js` – Liste der Schema-Dateien (`window.SCHEMA_DATEIEN`); Reihenfolge = Reihenfolge auf der Startseite. Jede neue Schema-Datei muss hier eingetragen werden
- `schemata/*.js` – je ein Schema pro Datei, Format in `docs/schema-format.md`
- `css/style.css` – gesamtes Design, Farben als CSS-Variablen auf `:root`, Dunkelmodus über `prefers-color-scheme` und `data-theme`
- `js/app.js` – Programmlogik der Lernmodi und der Startseite, keine juristischen Inhalte. `bereiteSchemataVor()` mischt mitgelieferte (`window.SCHEMATA`) und eigene Schemata (`Eigene.rohListe()`); ein eigenes Schema mit der `id` eines mitgelieferten ersetzt dieses (`eigen`, `ersetzt`, `roh` am internen Schema). Unbekannte `data-act`-Aktionen gehen an `Eigene.aktion()`
- `js/eigene.js` – eigene Schemata: Speicher (`localStorage`-Schlüssel `schematrainer:eigene:v1` im Format `{version:1, schemata:[{schema, erstellt, geaendert, herkunft}]}`, `schema` im Dateiformat), Entwurf (`schematrainer:entwurf:v1`, automatisch gesichert), Editor mit zwei Schritten, Import und Export. Wird vor `js/app.js` geladen und benutzt dessen Helfer erst zur Laufzeit; alle Aktionen tragen die Präfixe `e-` (Editor), `i-` (Import), `x-` (Export)
- `pruefen.html` + `js/pruefen.js` – Prüfseite: prüft die Schema-Dateien im Browser, ohne Installation. Lädt die Dateien je nach Umgebung per `fetch` (Webserver, GitHub Pages), als `<script>` (`file://`) oder aus einem Ordner, den der Nutzer auf die Seite zieht
- `tools/pruefung.js` – die Prüfregeln selbst (ein Ort für Browser, Node und den Editor in der App). Neue Regeln nur hier ergänzen, nie doppelt. `quelle.modus = "eigene"` macht `norm` und `quelle` zu freiwilligen Feldern (nur Hinweis), `quelle.weitereIds` nennt ids, auf die Verweise zeigen dürfen
- `tools/browsertest.mjs` – Browser-Test für Editor, Import, Export und `eigene.html` mit Playwright (Chromium); läuft gegen einen eingebauten Webserver und per `file://`. Nach Änderungen an `js/` oder `css/` ausführen: `node tools/browsertest.mjs` (Playwright muss installiert sein, in Claude-Code-Cloud-Sessions ist es das)
- `tools/pruefen.mjs` – dünner Node-Wrapper um `tools/pruefung.js`, läuft als GitHub Action bei jedem Push
- `tools/importieren.mjs` – Node-Werkzeug für Sammelimporte aus einer JSON-Datei (`format: "schema-trainer-import"`, je Schema `datei`, optional `herkunft` und `gruppe`); schreibt die Schema-Dateien und trägt sie in `schemata/liste.js` ein

Die Startseite bündelt Schemata nach dem freiwilligen Feld `gruppe` (Zwischenüberschriften in Reihenfolge des ersten Auftretens in `liste.js`). Ein Prüfungspunkt kann mit `verweis: "<id>"` auf ein anderes Schema zeigen; die App zeigt dann einen Link (Ansehen) bzw. einen Knopf (Aufbau abfragen), der in das andere Schema springt, und führt über den Verlauf (`verlauf` in `js/app.js`) mit „Zurück zu …“ an die alte Stelle zurück. So verzweigen die Verfahrensschemata in der Begründetheit nach Grundfreiheiten, ohne Inhalte zu doppeln. Neue Felder in Schema-Dateien immer auch in `tools/pruefung.js` als bekannte Felder eintragen, sonst meldet die Prüfung sie als unbekannt.

Der Lernstand liegt im `localStorage` unter dem Schlüssel `schematrainer:v1` im Format `{cards: {"<schema-id>:<karten-id>": {box, due}}, scores: {"<schema-id>": {known, total, at}}}`. Änderungen an diesem Format und am Format der eigenen Schemata (`schematrainer:eigene:v1`) müssen abwärtskompatibel sein (alte Daten weiter lesen können), sonst verlieren Nutzer Fortschritt oder Schemata. Karten-IDs entstehen aus dem Begriff der Definition (`slug`) oder aus einem expliziten `definition.id`; der Editor setzt `definition.id` automatisch, wenn ein Begriff umformuliert wird oder zweimal im Schema vorkommt, damit der Lernstand der Karte erhalten bleibt.

## Arbeitsregeln

Nach jeder Änderung an `schemata/` die Prüfung laufen lassen und Fehler beheben, bevor committet wird: in einer Umgebung mit Node.js `node tools/pruefen.mjs`, sonst `pruefen.html` im Browser öffnen. Beide verwenden dieselben Regeln aus `tools/pruefung.js`. Neue Schema-Dateien in `schemata/liste.js` eintragen. Nach Änderungen an `js/`, `css/` oder den HTML-Seiten zusätzlich `node tools/browsertest.mjs` laufen lassen; beide Seiten müssen weiter per `file://` funktionieren.

Veröffentlichen: Auf dem Rechner des Nutzers sind Git (`C:\Program Files\Git\cmd\git.exe`) und die GitHub-Befehlszeile `gh` (winget-Installation unter `%LOCALAPPDATA%\Microsoft\WinGet\Packages\GitHub.cli_…\bin\gh.exe`) installiert und bei GitHub als „Asadhutgu“ angemeldet; in Shell-Aufrufen beide ggf. über den vollen Pfad ansprechen, weil der PATH der Sitzung sie nicht enthält. Commit und `git push` auf `main` genügen, GitHub Pages baut automatisch. Wenn der Push wegen `.github/workflows/pruefen.yml` abgelehnt wird, fehlt dem gh-Token die Freigabe „workflow“ (`gh auth refresh -h github.com -s workflow`, Gerätecode durch den Nutzer bestätigen lassen).

Juristische Inhalte nicht erfinden. Wenn bei einer Definition, Fundstelle oder Randnummer Unsicherheit besteht, die Stelle in der Antwort an den Nutzer ausdrücklich auflisten, statt sie stillschweigend zu übernehmen. Lieber eine Randnummer weglassen als eine falsche angeben.

Hausstil für Zitate: Absätze und Sätze ausgeschrieben („Art. 45 Abs. 4 AEUV“, „Art. 36 S. 2 AEUV“), nie römisch; Grundrechtecharta immer „GRCh“; Verfassungsbeschwerde seit 28.12.2024 in Art. 94 Abs. 1 Nr. 4a GG. EuGH-Entscheidungen: alte Nummern „EuGH, Rs. 66/85 – Lawrie-Blum, Rn. 17“, neuere „EuGH, C-55/94 – Gebhard, Rn. 37“ (ohne „Rs.“), verbundene „EuGH, verb. Rs. C-267/91 und C-268/91 – Keck“; innerhalb einer Aufzählung desselben Gerichts wird „EuGH,“ nicht wiederholt. Randnummern nur, wenn sie belegt sind. Satzung des Gerichtshofs kurz „Satzung“, Verfahrensordnungen „VerfO EuGH“ und „VerfO EuG“. Eine Fundstelle darf auf das Skript verweisen („Europarecht II, Kap. 11 I“), wenn das Skript dort keine Entscheidung nennt.

Die 19 Europarecht-Schemata wurden am 05.10.2026 aus den Skripten „Europarecht I“ und „Europarecht II“ (Komplettbände, Rechtsstand September 2026) übernommen und Definition für Definition gegen die Skripte geprüft; die Kommentarzeile „// Quelle:“ jeder Datei nennt das Kapitel. Bei Änderungen an Inhalten bleibt das Skript der Maßstab.

Mobile zuerst: Die App wird viel am Handy genutzt. Schaltflächen mindestens 44 px hoch, sichtbarer Tastaturfokus, `prefers-reduced-motion` respektieren, kein waagerechtes Scrollen.

Meldungen an den Nutzer (Prüfseite, Hinweise in der App) in einfachem Deutsch mit einem konkreten Tipp zur Behebung; englische Browsermeldungen werden in `tools/pruefung.js` übersetzt.

## Design

Das Design folgt dem Stil des YouTube-Kanals und soll einheitlich bleiben, nicht neu erfunden werden: Navy `#1F3A5F`, Gold `#C19A4B`, Creme `#FAF6EE`, Sandrahmen `#E6DECD`; Überschriften in Cambria (Fallback Georgia), Fließtext in Arial; Kopfband in Navy mit goldenem Kreis-Badge „E“; Inhalte auf weißen Karten mit Sandrahmen. Alle Farben stehen als Variablen in `css/style.css`; neue Elemente verwenden diese Variablen, damit der Dunkelmodus automatisch funktioniert.

## Mögliche nächste Schritte

Diese Liste ist ein Ideenspeicher, keine Reihenfolge. Was als Nächstes umgesetzt wird, entscheidet der Nutzer.

1. Lernstand exportieren und importieren (als Datei oder Code), damit Fortschritt zwischen Handy und PC übertragen werden kann; naheliegend als Erweiterung der bestehenden Export-Datei.
2. Weitere Schemata: Niederlassungsfreiheit (Art. 49 AEUV), Dienstleistungsfreiheit (Art. 56 AEUV), Kapitalverkehrsfreiheit (Art. 63 AEUV), Unionsbürgerschaft (Art. 21 AEUV), Prüfung der GRCh-Grundrechte, Vertragsverletzungsverfahren (Art. 258 AEUV), Vorabentscheidungsverfahren (Art. 267 AEUV), Untätigkeitsklage (Art. 265 AEUV).
3. Sobald ein zweites Rechtsgebiet dazukommt: Filter nach Rechtsgebiet auf der Startseite (Feld `gebiet` zusätzlich zu `gruppe`; dann auch in `tools/pruefung.js` als bekanntes Feld eintragen).
4. Lückentext-Modus für Definitionen (Schlüsselwörter einer Definition ausblenden).
5. Downloadbereich für die Dokumentenpakete des Kanals (ersetzt die bisherigen Dropbox-Links), mit Übersicht nach Video bzw. Thema.
6. Verknüpfung von Schemata mit den passenden YouTube-Videos und Dokumentenpaketen.
7. Eigene Schemata: Reihenfolge auf der Startseite ändern, mitgelieferte Schemata einzeln ausblenden, Export-Datei per Link teilen, eine Sammelstelle für Schemata aus der Community (zum Beispiel ein Ordner `community/` im Repository mit Prüfung durch den Betreiber).

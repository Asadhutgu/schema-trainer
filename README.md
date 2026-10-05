# Schema-Trainer

Lern-App für juristische Prüfungsschemata im Stil des Kanals „Examensvorbereitung Öffentliches Recht“. Prüfungspunkte Schritt für Schritt aufbauen, Gliederungen ordnen und Definitionen im Karteikasten wiederholen.

Die App läuft unter **https://asadhutgu.github.io/schema-trainer/**, die Prüfseite unter https://asadhutgu.github.io/schema-trainer/pruefen.html. Quellcode: https://github.com/Asadhutgu/schema-trainer.

## Ausprobieren ohne Installation

Den Ordner entpacken und `index.html` doppelklicken. Die App läuft dann direkt im Browser.

## Schema-Dateien prüfen (ohne Installation)

`pruefen.html` doppelklicken. Die Seite prüft alle Schema-Dateien im Ordner `schemata` und zeigt jeden Fehler mit Datei, Stelle und einem Tipp zur Behebung an. Nach einer Änderung an einer Datei einfach die Seite neu laden.

Wenn du den Ordner `schemata` auf das Feld „Ordner prüfen“ ziehst, wird zusätzlich geprüft, ob jede Datei in der Liste eingetragen ist, und Fehler werden mit Zeilennummer angezeigt. Das funktioniert auch, wenn die Prüfseite auf GitHub Pages geöffnet ist und die Dateien noch auf dem eigenen Rechner liegen.

## Veröffentlichung auf GitHub

Die App liegt im öffentlichen Repository `Asadhutgu/schema-trainer` und wird über GitHub Pages (Branch `main`, Ordner `/`) ausgeliefert. Nach jedem Hochladen dauert es ein bis zwei Minuten, bis die Änderung online ist.

Änderungen hochladen, zwei Wege:

- Mit Claude Code im Projektordner: „Lade die Änderungen auf GitHub hoch“ genügt; Claude prüft vorher mit der Prüfseite und erledigt Commit und Push.
- Von Hand auf github.com: Datei öffnen, Stift-Symbol, ändern, „Commit changes“. Für neue Dateien „Add file“, „Upload files“.

Werkzeuge auf diesem Rechner: Git und die GitHub-Befehlszeile `gh` sind installiert, die Anmeldung bei GitHub ist hinterlegt. Die automatische Prüfung im Reiter „Actions“ läuft, sobald die Datei `.github/workflows/pruefen.yml` im Repository liegt (dafür braucht die GitHub-Anmeldung die zusätzliche Freigabe „workflow“).

## Weiterarbeiten mit Claude Code

Im Claude-Code-Bereich (Web, Desktop-App oder Claude-App) eine Cloud-Session mit dem Repository `schema-trainer` starten. Claude Code liest die Datei `CLAUDE.md` automatisch und kennt damit Aufbau, Hausstil und Design.

Ein guter erster Auftrag:

> Lies CLAUDE.md und docs/schema-format.md und führe `node tools/pruefen.mjs` aus. Lege dann ein neues Schema für die Niederlassungsfreiheit (Art. 49 AEUV) im selben Aufbau wie die Arbeitnehmerfreizügigkeit an, mit Definitionen und Fundstellen, und trage es in schemata/liste.js ein. Liste mir am Ende alle Fundstellen auf, bei denen du dir nicht sicher bist.

Weitere Ideen stehen am Ende von `CLAUDE.md`.

## Inhalte selbst bearbeiten

Wie eine Schema-Datei aufgebaut ist und wie man ein neues Schema anlegt, steht in `docs/schema-format.md`. Eine neue Datei muss zusätzlich in `schemata/liste.js` eingetragen werden. Kleine Korrekturen (ein Wort in einer Definition, eine Randnummer) lassen sich auch direkt auf github.com erledigen: Datei öffnen, Stift-Symbol anklicken, ändern, „Commit changes“. Die automatische Prüfung zeigt danach unter „Actions“ an, ob alles in Ordnung ist; genauer und verständlicher zeigt es `pruefen.html`.

## Hinweis zum Lernstand

Der Fortschritt wird im jeweiligen Browser gespeichert. Handy und PC haben deshalb getrennte Lernstände, und beim Löschen der Browserdaten geht er verloren.

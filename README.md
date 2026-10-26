# Schema-Trainer

Lern-App für juristische Prüfungsschemata im Stil des Kanals „Examensvorbereitung Öffentliches Recht“. Prüfungspunkte Schritt für Schritt aufbauen, Gliederungen ordnen, ein leeres Schema aus dem Vorrat zusammensetzen, Definitionen im Karteikasten wiederholen und als Lückentext üben. Die Startseite hat zwei Reiter: „Fertige Schemata“ mit den mitgelieferten Inhalten, unterteilt nach Strafrecht, Öffentlichem Recht und Zivilrecht, und „Eigene Schemata“ für alles, was man selbst anlegt oder importiert. Mitgeliefert sind 57 Schemata: 38 zum Wirtschaftsstrafrecht (Strafrecht; FernUniversität in Hagen, Modul 55117) und 19 zum Europarecht (Öffentliches Recht). Eigene Schemata lassen sich direkt in der App anlegen und mit anderen teilen.

Die App läuft unter **https://asadhutgu.github.io/schema-trainer/**, die leere Umgebung nur mit eigenen Schemata unter https://asadhutgu.github.io/schema-trainer/eigene.html, die Prüfseite unter https://asadhutgu.github.io/schema-trainer/pruefen.html. Quellcode: https://github.com/Asadhutgu/schema-trainer.

## Standalone: ohne Installation, auch offline

Die App ist eine reine Browser-Anwendung ohne Server, Konto oder Installation. Es gibt zwei Wege:

- Online: die Adresse oben im Browser öffnen, am Handy gern „Zum Startbildschirm hinzufügen“.
- Offline: das Projekt als ZIP herunterladen (https://github.com/Asadhutgu/schema-trainer/archive/refs/heads/main.zip, oder auf GitHub „Code“ und „Download ZIP“), entpacken und `index.html` doppelklicken. Alles läuft dann vom eigenen Rechner aus, auch ohne Internet.

Lernstand und eigene Schemata werden im jeweiligen Browser gespeichert. Am besten immer dieselbe Adresse beziehungsweise dieselbe entpackte Kopie im selben Browser verwenden; zum Übertragen auf ein anderes Gerät dient „Exportieren“ (siehe unten).

## Eigene Schemata direkt in der App anlegen

Im Reiter „Eigene Schemata“ steht „Neues Schema“. Der Editor führt in zwei Schritten durch das Anlegen:

1. **Aufbau**: Titel, wahlweise Norm, Rechtsgebiet und Gruppe, Gliederungszeichen (zum Beispiel A. – I. – 1. – a)) und die Prüfungspunkte. Jede Zeile ist ein Punkt; mit den Pfeilen wird ein Punkt zum Unterpunkt oder wieder zum Hauptpunkt und wandert in der Reihenfolge nach oben oder unten, Unterpunkte wandern mit. Enter legt den nächsten Punkt an. Wer eine Gliederung schon als Text hat, fügt sie über „Mehrere Punkte einfügen“ auf einmal ein (eine Zeile je Punkt, Unterpunkte eingerückt).
2. **Definitionen**: Zu jedem Prüfungspunkt kann eine Definition hinterlegt werden (Begriff, Text, wahlweise Fundstelle), die automatisch zur Karteikarte wird. Ein Punkt kann außerdem auf ein anderes Schema verweisen.

Vor dem Speichern prüft die App das Schema mit denselben Regeln wie die Prüfseite und erklärt jeden Fehler mit einem Tipp. Gespeicherte Schemata erscheinen im Reiter „Eigene Schemata“ und lassen sich wie die mitgelieferten abfragen, ordnen und im Karteikasten wiederholen. „Bearbeiten“ öffnet den Editor erneut; dort lässt sich ein Schema auch löschen. Ein angefangener Entwurf bleibt erhalten, auch wenn man die Seite zwischendurch verlässt.

Mitgelieferte Schemata lassen sich anpassen: In der Ansicht eines Schemas führt „Als eigene Fassung bearbeiten“ in den Editor. Die eigene Fassung steht danach unter „Eigene Schemata“ und zugleich an der Stelle des Originals unter „Fertige Schemata“ (gekennzeichnet als „Eigene Fassung“); der Lernstand bleibt erhalten, und wird die Fassung gelöscht, erscheint wieder das Original.

## Leere Umgebung nur mit eigenen Schemata (eigene.html)

Wer den Trainer für ein anderes Rechtsgebiet nutzen will, öffnet `eigene.html` (online: https://asadhutgu.github.io/schema-trainer/eigene.html). Dort werden die mitgelieferten Europarecht-Schemata nicht geladen; die Seite beginnt leer und zeigt nur, was man selbst angelegt oder importiert hat. Die eigenen Schemata sind dieselben wie auf der Startseite, beide Seiten greifen auf denselben Speicher im Browser zu.

## Schemata teilen: Exportieren und Importieren

Im Reiter „Eigene Schemata“: „Exportieren“ schreibt ausgewählte Schemata in eine Datei (Endung `.json`), die sich per Nachricht oder E-Mail weitergeben lässt; alternativ als Text kopieren oder am Handy direkt teilen. „Importieren“ liest solche Dateien ein, auch eingefügt als Text, und zeigt vor dem Übernehmen, was in der Datei steckt und ob Kennungen mit vorhandenen Schemata zusammenstoßen. Einzelheiten und das Dateiformat: `docs/import-export.md`.

Die Export-Datei eignet sich auch als Sicherung der eigenen Schemata und zum Übertragen zwischen Handy und PC.

## Schemata mit allen teilen (GitHub)

Wer ein eigenes Schema allen zur Verfügung stellen will, wählt unter „Exportieren“ den Knopf „Für alle auf GitHub hochladen“. Die App erklärt, dass das Schema damit öffentlich wird, und öffnet dann die GitHub-Seite für eine neue Datei im Ordner `community`, mit Dateiname und Inhalt bereits eingetragen. Nötig ist ein kostenloses GitHub-Konto. Auf GitHub genügen drei Klicks („Commit changes…“, „Propose changes“, „Create pull request“); die Datei geht damit als Vorschlag an den Betreiber, der sie prüft und freischaltet. Niemand kann die Seite direkt verändern.

Freigegebene Schemata holt sich jeder über „Importieren“ und „Liste von GitHub laden“: Die App zeigt die Dateien aus dem Ordner `community`, man kreuzt an, was man übernehmen will, und importiert wie gewohnt. Mehr dazu in `community/README.md` und `docs/import-export.md`.

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

## Mitgelieferte Inhalte bearbeiten

Für eigene Schemata genügt der Editor in der App. Die mitgelieferten Schemata liegen dagegen als Dateien im Ordner `schemata`; wie eine solche Datei aufgebaut ist, steht in `docs/schema-format.md`. Eine neue Datei muss zusätzlich in `schemata/liste.js` eingetragen werden. Export-Dateien aus der App lassen sich mit `node tools/importieren.mjs` in den Ordner übernehmen (`docs/import-export.md`). Kleine Korrekturen (ein Wort in einer Definition, eine Randnummer) lassen sich auch direkt auf github.com erledigen: Datei öffnen, Stift-Symbol anklicken, ändern, „Commit changes“. Die automatische Prüfung zeigt danach unter „Actions“ an, ob alles in Ordnung ist; genauer und verständlicher zeigt es `pruefen.html`.

## Hinweis zum Lernstand und zu eigenen Schemata

Fortschritt und eigene Schemata werden im jeweiligen Browser gespeichert. Handy und PC haben deshalb getrennte Stände, und beim Löschen der Browserdaten gehen sie verloren. Eigene Schemata deshalb gelegentlich über „Exportieren“ sichern; der Lernstand selbst lässt sich derzeit noch nicht exportieren.

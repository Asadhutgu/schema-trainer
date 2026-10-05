# Aufbau einer Schema-Datei

Jedes Prüfungsschema steht in einer eigenen Datei im Ordner `schemata/`, zum Beispiel `schemata/warenverkehrsfreiheit.js`. Damit das Schema in der App erscheint, muss der Dateiname zusätzlich in `schemata/liste.js` eingetragen sein. Die Reihenfolge dort ist die Reihenfolge auf der Startseite.

## Neues Schema anlegen, Schritt für Schritt

1. Eine bestehende Datei aus `schemata/` kopieren und umbenennen, zum Beispiel in `niederlassungsfreiheit.js`. Nur Kleinbuchstaben, Ziffern und Bindestriche, keine Umlaute und Leerzeichen.
2. Den Inhalt nach der Vorlage unten anpassen.
3. In `schemata/liste.js` eine neue Zeile mit dem Dateinamen ergänzen: `"niederlassungsfreiheit.js",` (mit Anführungszeichen und Komma).
4. `pruefen.html` im Browser öffnen. Die Seite zeigt jeden Fehler mit Stelle und Tipp.

## Vorlage

```js
// Titel (Norm)
// Aufbau dieser Datei: siehe docs/schema-format.md
SCHEMATA.push({
  id: "kurzname",                 // nur Kleinbuchstaben, Ziffern, Bindestriche; nie mehr ändern
  norm: "Art. 49 AEUV",           // erscheint in Gold über dem Titel
  titel: "Niederlassungsfreiheit",
  gruppe: "Grundfreiheiten",       // freiwillig: Zwischenüberschrift auf der Startseite
  gliederung: ["I.", "1.", "a)"], // Gliederungszeichen je Ebene
  punkte: [
    { ebene: 0, punkt: "Schutzbereich" },
    { ebene: 1, punkt: "Sachlich: Niederlassung",
      definition: {
        begriff: "Niederlassung",
        text: "Die tatsächliche Ausübung einer wirtschaftlichen Tätigkeit mittels einer festen Einrichtung in einem anderen Mitgliedstaat auf unbestimmte Zeit.",
        quelle: "EuGH, C-221/89 – Factortame II, Rn. 20"
      }
    },
    { ebene: 0, punkt: "Rechtfertigung" },
    { ebene: 1, punkt: "Unionsgrundrechte als Schranken-Schranke", verweis: "grch" }, // Sprung in ein anderes Schema
    { ebene: 0, punkt: "Ergebnis" }
  ]
});
```

## Felder

`id` ist der interne Kurzname des Schemas. Er steckt im gespeicherten Lernstand und darf deshalb nach der Veröffentlichung nicht mehr geändert werden.

`gruppe` ist freiwillig. Schemata mit derselben `gruppe` stehen auf der Startseite unter einer gemeinsamen Zwischenüberschrift (zum Beispiel „Grundfreiheiten“ oder „Rechtsschutz vor den Unionsgerichten“). Die Reihenfolge der Gruppen folgt dem ersten Auftreten in `schemata/liste.js`; Schemata ohne `gruppe` stehen am Ende unter „Weitere Schemata“.

`gliederung` legt fest, welches Gliederungszeichen auf welcher Ebene steht. Erlaubt sind `"A."`, `"I."`, `"1."`, `"a)"` und `"aa)"`. Ein Grundfreiheiten-Schema nutzt typischerweise `["I.", "1.", "a)"]`, ein Klageschema mit Zulässigkeit und Begründetheit `["A.", "I.", "1.", "a)"]`. Die Nummern selbst zählt die App automatisch.

`punkte` ist die Gliederung von oben nach unten. `ebene: 0` ist die oberste Ebene. Ein Punkt darf immer nur eine Ebene tiefer gehen als der vorige (von 0 auf 1, nicht von 0 auf 2), zurück darf er beliebig weit springen.

`definition` ist freiwillig. Jede Definition wird automatisch zu einer Karteikarte im Modus „Definitionen“. `begriff` ist die Vorderseite der Karte, `text` die Rückseite, `quelle` die Fundstelle. Der Lernstand einer Karte hängt am `begriff`: Wird ein Begriff umbenannt, beginnt die Karte von vorn. Soll das vermieden werden oder kommt derselbe Begriff in einem Schema zweimal vor, kann die Definition ein eigenes Feld `id` bekommen, das dann stabil bleibt.

`verweis` ist freiwillig und enthält die `id` eines anderen Schemas, zum Beispiel `verweis: "wvf"`. Der Punkt bekommt dann in der Ansicht einen Link „Schema … ansehen“ und im Modus „Aufbau abfragen“ einen Knopf „Schema … abfragen“. Wer ihn drückt, prüft das andere Schema durch und kommt mit „Zurück zu …“ genau an die Stelle zurück, an der er war. So lässt sich etwa im Vertragsverletzungsverfahren in der Begründetheit nach der betroffenen Grundfreiheit verzweigen, ohne die Grundfreiheiten doppelt zu pflegen. Ein Punkt darf Definition und Verweis zugleich haben. Die Prüfseite meldet Verweise auf unbekannte ids.

Andere Feldnamen kennt die App nicht. Ein Tippfehler wie `definiton` führt dazu, dass die Definition stillschweigend fehlt; die Prüfseite meldet solche Fehler.

## Typische Stolperstellen

- Nach jedem Eintrag ein Komma, außer vor einer schließenden Klammer (dort ist es erlaubt, aber nicht nötig).
- Texte in geraden Anführungszeichen `"..."` schreiben, nicht in typografischen „...“. Innerhalb eines Textes sind typografische Anführungszeichen dagegen in Ordnung.
- Ein Zeilenumbruch mitten in einem Text ist nicht erlaubt; der Text muss in einer Zeile stehen.
- `ebene` ist eine Zahl ohne Anführungszeichen: `ebene: 1`, nicht `ebene: "1"`.

## Hausstil

Absätze und Sätze werden ausgeschrieben zitiert: „Art. 36 S. 1 AEUV“, „Art. 45 Abs. 4 AEUV“, nie „Art. 45 IV AEUV“. Die Grundrechtecharta heißt immer „GRCh“. Jede Definition braucht eine Fundstelle; EuGH-Entscheidungen mit Aktenzeichen, Kurzname und, wenn belegt, Randnummer: alte Nummern „EuGH, Rs. 66/85 – Lawrie-Blum, Rn. 17“, neuere „EuGH, C-55/94 – Gebhard, Rn. 37“ (ohne „Rs.“), verbundene Rechtssachen „EuGH, verb. Rs. C-267/91 und C-268/91 – Keck“. Mehrere Entscheidungen desselben Gerichts werden mit Semikolon aneinandergereiht, „EuGH,“ steht nur einmal am Anfang.

## Prüfen

Nach jeder Änderung `pruefen.html` im Browser öffnen (Doppelklick genügt, nichts muss installiert werden). Die Seite meldet fehlende Felder, Sprünge in den Ebenen, nicht eingetragene Dateien, Tippfehler in Feldnamen und Abweichungen vom Hausstil, jeweils mit einem Tipp zur Behebung. Wer den Ordner `schemata` auf das Feld „Ordner prüfen“ zieht, bekommt Fehler mit Zeilennummer und erfährt auch, ob eine Datei im Ordner noch nicht in `liste.js` eingetragen ist.

Auf GitHub läuft dieselbe Prüfung bei jeder Änderung automatisch. Wer Node.js installiert hat, kann sie auch im Projektordner aufrufen:

```
node tools/pruefen.mjs
```

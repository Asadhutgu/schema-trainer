// Importiert Schemata aus einer JSON-Datei in den Schema-Trainer (braucht Node.js, z. B. in einer Claude-Code-Cloud-Session).
// Aufruf im Projektordner:  node tools/importieren.mjs import/schemata-import.json
//
// Erwartetes Format der JSON-Datei: { "format": "schema-trainer-import", "schemata": [ { "datei": "name.js", "id", "norm",
// "titel", "gliederung", "punkte", optional "herkunft" }, ... ] } – Felder wie in docs/schema-format.md.
// Für jedes Schema wird schemata/<datei> geschrieben (vorhandene Dateien mit gleichem Namen werden ersetzt)
// und in schemata/liste.js eingetragen (neue Dateien ans Ende, Reihenfolge der vorhandenen bleibt). Danach läuft die Prüfung.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const quelle = process.argv[2];
if (!quelle) { console.log('Bitte die Import-Datei angeben, z. B.: node tools/importieren.mjs import/schemata-import.json'); process.exit(1); }

const daten = JSON.parse(fs.readFileSync(path.resolve(quelle), 'utf8'));
if (daten.format !== 'schema-trainer-import' || !Array.isArray(daten.schemata)) {
  console.log('Die Datei hat nicht das erwartete Format (format: "schema-trainer-import").'); process.exit(1);
}

const q = s => JSON.stringify(s == null ? '' : String(s));
function dateiInhalt(s) {
  const zeilen = [
    `// ${s.titel} (${s.norm})`,
    s.herkunft ? `// Quelle: ${s.herkunft}` : null,
    '// Aufbau dieser Datei: siehe docs/schema-format.md',
    'SCHEMATA.push({',
    `  id: ${q(s.id)},`,
    `  norm: ${q(s.norm)},`,
    `  titel: ${q(s.titel)},`,
    s.gruppe ? `  gruppe: ${q(s.gruppe)},` : null,
    `  gliederung: [${(s.gliederung || []).map(q).join(', ')}],`,
    '  punkte: [',
  ].filter(z => z !== null);
  const punkte = (s.punkte || []).map(p => {
    let z = `    { ebene: ${p.ebene}, punkt: ${q(p.punkt)}`;
    if (p.verweis) z += `, verweis: ${q(p.verweis)}`;
    if (p.definition) {
      const d = p.definition;
      z += `,\n      definition: {\n${d.id ? `        id: ${q(d.id)},\n` : ''}        begriff: ${q(d.begriff)},\n        text: ${q(d.text)},\n        quelle: ${q(d.quelle)}\n      }\n    }`;
    } else z += ' }';
    return z;
  });
  return zeilen.join('\n') + '\n' + punkte.join(',\n') + '\n  ]\n});\n';
}

// 1. Dateien schreiben
const neu = [];
for (const s of daten.schemata) {
  if (!s.datei || !/^[a-z0-9-]+\.js$/.test(s.datei)) { console.log(`Ungültiger Dateiname bei "${s.titel}": ${s.datei}`); process.exit(1); }
  const ziel = path.join(root, 'schemata', s.datei);
  const ersetzt = fs.existsSync(ziel);
  fs.writeFileSync(ziel, dateiInhalt(s));
  neu.push(s.datei);
  console.log(`${ersetzt ? 'ersetzt ' : 'angelegt'}  schemata/${s.datei}`);
}

// 2. schemata/liste.js aktualisieren
const listePfad = path.join(root, 'schemata', 'liste.js');
let bisher = [];
if (fs.existsSync(listePfad)) {
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  try { vm.runInContext(fs.readFileSync(listePfad, 'utf8'), ctx, { filename: 'schemata/liste.js' }); } catch (e) { console.log('schemata/liste.js konnte nicht gelesen werden: ' + e.message); process.exit(1); }
  if (Array.isArray(ctx.SCHEMA_DATEIEN)) bisher = ctx.SCHEMA_DATEIEN.filter(n => typeof n === 'string');
}
const reihenfolge = [...bisher, ...neu.filter(n => !bisher.includes(n))];
const listeText = [
  '// Liste der Schema-Dateien.',
  '// Jede Datei im Ordner schemata/ muss hier eingetragen sein, sonst erscheint sie nicht in der App.',
  '// Reihenfolge hier = Reihenfolge auf der Startseite. Jede Zeile endet mit einem Komma.',
  '// Nach einer Änderung: pruefen.html im Browser öffnen.',
  'window.SCHEMA_DATEIEN = [',
  ...reihenfolge.map(n => `  ${q(n)},`),
  '];',
  ''
].join('\n');
fs.writeFileSync(listePfad, listeText);
console.log(`\nschemata/liste.js: ${reihenfolge.length} Schema-Dateien eingetragen.\n`);

// 3. Prüfen
try {
  execFileSync(process.execPath, [path.join(root, 'tools', 'pruefen.mjs')], { stdio: 'inherit' });
} catch { process.exit(1); }

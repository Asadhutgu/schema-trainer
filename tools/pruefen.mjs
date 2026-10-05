// Prüft alle Schema-Dateien mit Node.js. Aufruf im Projektordner:  node tools/pruefen.mjs
// Die Regeln stehen in tools/pruefung.js, dieselben wie auf der Seite pruefen.html.
// Läuft automatisch auf GitHub (.github/workflows/pruefen.yml). Keine Abhängigkeiten nötig.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ordner = path.join(root, 'schemata');

// Regeln laden
const regeln = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'tools', 'pruefung.js'), 'utf8'), regeln, { filename: 'tools/pruefung.js' });
const P = regeln.SchemaPruefung;

// Eine Datei in einer leeren Umgebung ausführen und das Ergebnis einsammeln.
// global: "SCHEMATA" (Schema-Datei) oder "SCHEMA_DATEIEN" (liste.js)
function ausfuehren(name, global) {
  const datei = 'schemata/' + name;
  const text = fs.readFileSync(path.join(ordner, name), 'utf8');
  const ctx = { SCHEMATA: [] };
  ctx.window = ctx;
  vm.createContext(ctx);
  try {
    vm.runInContext(text, ctx, { filename: datei });
  } catch (e) {
    const muster = new RegExp(datei.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + ':(\\d+)');
    const m = String(e.stack || '').match(muster);
    return { fehler: { text: e.message, zeile: m ? Number(m[1]) : 0 } };
  }
  return { wert: ctx[global] };
}

const vorhanden = fs.existsSync(ordner) ? fs.readdirSync(ordner).filter(f => f.endsWith('.js')) : [];
const quelle = { liste: undefined, listeFehler: null, vorhanden, dateien: [] };

if (!vorhanden.includes(P.LISTE)) quelle.listeFehler = { text: 'Datei nicht gefunden' };
else {
  const r = ausfuehren(P.LISTE, 'SCHEMA_DATEIEN');
  if (r.fehler) quelle.listeFehler = r.fehler; else quelle.liste = r.wert;
}
if (Array.isArray(quelle.liste)) {
  for (const name of quelle.liste) {
    if (typeof name !== 'string' || !P.DATEINAME.test(name) || name === P.LISTE) continue; // meldet die Regelprüfung
    if (!vorhanden.includes(name)) { quelle.dateien.push({ name, status: 'fehlt' }); continue; }
    const r = ausfuehren(name, 'SCHEMATA');
    quelle.dateien.push(r.fehler ? { name, status: 'fehler', fehler: r.fehler } : { name, status: 'ok', schemata: r.wert });
  }
}

const { befunde, statistik } = P.pruefen(quelle);
for (const b of befunde) {
  console.log((b.art === 'fehler' ? 'FEHLER   ' : 'Hinweis  ') + b.datei + (b.ort ? ', ' + b.ort : '') + ': ' + b.text);
  if (b.tipp) console.log('         Tipp: ' + b.tipp);
}
const fehler = befunde.filter(b => b.art === 'fehler').length;
console.log(`\n${statistik.schemata} Schemata, ${statistik.punkte} Prüfungspunkte, ${statistik.definitionen} Definitionen geprüft.`);
if (fehler) { console.log(`${fehler} Fehler gefunden.`); process.exit(1); }
console.log(befunde.length ? 'Keine Fehler, aber Hinweise beachten.' : 'Alles in Ordnung.');

// Browser-Test für eigene Schemata: Editor, Import, Export, eigene.html (Standalone) und die Lernmodi damit.
// Aufruf im Projektordner:  node tools/browsertest.mjs
// Braucht Playwright mit Chromium (npm-Paket "playwright"; in Claude-Code-Cloud-Sessions vorhanden).
// Läuft zweimal: gegen einen eingebauten Webserver (wie GitHub Pages) und per file:// (Doppelklick auf index.html).
// Keine Abhängigkeit außer Playwright; keine juristischen Inhalte. Beendet sich mit Fehlercode, wenn ein Prüfpunkt fehlschlägt.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Playwright finden: im Projekt, über NODE_PATH oder in den globalen npm-Paketen
let chromium = null;
const require = createRequire(import.meta.url);
for (const pfad of ['playwright', () => path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright')]) {
  try { ({ chromium } = require(typeof pfad === 'function' ? pfad() : pfad)); break; } catch { /* nächster Versuch */ }
}
if (!chromium) { console.log('Playwright ist nicht installiert (npm-Paket "playwright"). Der Browser-Test wird übersprungen.'); process.exit(0); }

/* ---------- Kleiner Webserver für den Projektordner ---------- */
const TYPEN = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.md': 'text/markdown; charset=utf-8' };
function starteServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
      const datei = path.join(root, rel);
      if (!datei.startsWith(root) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TYPEN[path.extname(datei)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(datei).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}/` }));
  });
}

/* ---------- Das Szenario ---------- */
async function szenario(browser, basis, name) {
  const fehler = [];
  const check = (bed, text) => { if (!bed) { fehler.push(text); console.log('  FEHLT: ' + text); } };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const konsole = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') konsole.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', e => konsole.push('pageerror: ' + e.message));
  const txt = async sel => (await page.locator(sel).first().textContent()) || '';
  const karten = () => page.locator('article.schema').count();
  const eigeneImSpeicher = () => page.evaluate(() => JSON.parse(localStorage.getItem('schematrainer:eigene:v1') || '{"schemata":[]}').schemata);

  console.log(`\n${name}`);
  // Sauberer Start
  await page.goto(basis + 'index.html');
  await page.waitForSelector('article.schema');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('article.schema');

  // 1. Startseite (Zahl der mitgelieferten Schemata aus schemata/liste.js)
  const anzahl = await page.evaluate(() => window.SCHEMA_DATEIEN.length);
  check(await karten() === anzahl, anzahl + ' mitgelieferte Schemata');
  for (const act of ['e-start', 'i-start', 'x-start']) check(await page.locator(`[data-act="${act}"]`).count() === 1, 'Knopf ' + act + ' vorhanden');

  // 2. Editor Schritt 1: Aufbau
  await page.click('[data-act="e-start"]');
  await page.waitForSelector('#e-titel');
  await page.fill('#e-titel', 'Verfassungsbeschwerde');
  await page.fill('#e-norm', 'Art. 94 Abs. 1 Nr. 4a GG');
  await page.fill('#e-gebiet', 'Öffentliches Recht');
  await page.fill('#e-gruppe', 'Staatsrecht');
  await page.fill('.ptext[data-i="0"]', 'Zulässigkeit');
  await page.press('.ptext[data-i="0"]', 'Enter');
  await page.waitForSelector('.ptext[data-i="1"]');
  check(await page.evaluate(() => document.activeElement && document.activeElement.dataset.i === '1'), 'Enter legt neuen Punkt an und fokussiert ihn');
  await page.fill('.ptext[data-i="1"]', 'Zuständigkeit des BVerfG');
  await page.click('[data-act="e-ein"][data-i="1"]');
  await page.waitForSelector('.epunkt[data-i="1"][data-l="1"]');
  check((await txt('.epunkt[data-i="1"] .num')).trim() === 'I.', 'Unterpunkt bekommt Nummer I.');
  await page.press('.ptext[data-i="1"]', 'Enter');
  await page.fill('.ptext[data-i="2"]', 'Beschwerdefähigkeit');
  await page.press('.ptext[data-i="2"]', 'Enter');
  await page.fill('.ptext[data-i="3"]', 'Begründetheit');
  await page.click('[data-act="e-aus"][data-i="3"]');
  await page.waitForSelector('.epunkt[data-i="3"][data-l="0"]');
  check((await txt('.epunkt[data-i="3"] .num')).trim() === 'B.', 'Hauptpunkt B.');
  await page.click('[data-act="e-hoch"][data-i="3"]');
  await page.waitForFunction(() => document.querySelector('.ptext[data-i="0"]').value === 'Begründetheit');
  check(await page.inputValue('.ptext[data-i="1"]') === 'Zulässigkeit', 'Block nach oben verschoben');
  await page.click('[data-act="e-runter"][data-i="0"]');
  await page.waitForFunction(() => document.querySelector('.ptext[data-i="0"]').value === 'Zulässigkeit');
  check(await page.inputValue('.ptext[data-i="3"]') === 'Begründetheit' && await page.inputValue('.ptext[data-i="2"]') === 'Beschwerdefähigkeit', 'Block samt Unterpunkten zurück verschoben');
  await page.click('[data-act="e-mehrere"]');
  await page.fill('#e-mehrtext', 'C. Ergebnis\n  I. Tenor\n    1. Feststellung');
  await page.click('[data-act="e-mehrere-ok"]');
  await page.waitForSelector('.ptext[data-i="6"]');
  check(await page.inputValue('.ptext[data-i="4"]') === 'Ergebnis', 'Mehrere Punkte: Nummern am Zeilenanfang entfernt');
  check(await page.getAttribute('.epunkt[data-i="6"]', 'data-l') === '2', 'Mehrere Punkte: Einrückung wird zur Ebene');
  await page.click('[data-act="e-neu"]');
  await page.click('[data-act="e-weiter"]');
  await page.waitForSelector('.befundbox.bad');
  check((await txt('.befundbox.bad')).includes('punkt'), 'Leerer Punkt wird vor Schritt 2 bemängelt');
  await page.click('[data-act="e-weg"][data-i="7"]');
  await page.click('[data-act="e-weiter"]');
  await page.waitForSelector('.edefs');

  // 3. Editor Schritt 2: Definitionen und Verweis
  check((await txt('.schritte .aktiv')).includes('Definitionen'), 'Schritt 2 aktiv');
  await page.click('[data-act="e-def"][data-i="2"]');
  await page.waitForSelector('#d-begriff');
  await page.fill('#d-begriff', 'Beschwerdefähigkeit');
  await page.fill('#d-text', 'Beschwerdefähig ist, wer Träger von Grundrechten oder grundrechtsgleichen Rechten sein kann.');
  await page.click('[data-act="e-def-zu"]');
  await page.waitForSelector('.tag');
  await page.click('[data-act="e-def"][data-i="3"]');
  await page.selectOption('#d-verweis', 'grch');
  await page.click('[data-act="e-def-zu"]');
  check((await txt('.edefs')).includes('Verweis: Prüfung der Unionsgrundrechte'), 'Verweis auf ein anderes Schema gesetzt');
  // Derselbe Begriff ein zweites Mal: bekommt automatisch eine eigene Karten-Kennung
  await page.click('[data-act="e-def"][data-i="4"]');
  await page.fill('#d-begriff', 'Beschwerdefähigkeit');
  await page.fill('#d-text', 'Zweite Fassung.');
  await page.click('[data-act="e-def-zu"]');
  await page.click('[data-act="e-speichern"]');
  await page.waitForSelector('.hinweisbox.ok');
  check((await txt('h2.title')).trim() === 'Verfassungsbeschwerde', 'Nach Speichern: Ansicht des neuen Schemas');
  check((await txt('.outline')).includes('Schema „Prüfung der Unionsgrundrechte'), 'Verweis-Link in der Ansicht');
  let gespeichert = await eigeneImSpeicher();
  check(gespeichert.length === 1 && gespeichert[0].schema.id === 'verfassungsbeschwerde', 'Im Speicher mit id verfassungsbeschwerde');
  check(gespeichert[0].schema.gebiet === 'Öffentliches Recht' && gespeichert[0].schema.gruppe === 'Staatsrecht', 'Rechtsgebiet und Gruppe gespeichert');
  check(gespeichert[0].schema.punkte[2].definition.quelle === undefined, 'Definition ohne Fundstelle gespeichert');
  check(gespeichert[0].schema.punkte[4].definition.id === 'beschwerdefahigkeit-2', 'Doppelter Begriff bekam eigene Kennung');
  check(await page.evaluate(() => localStorage.getItem('schematrainer:entwurf:v1')) === null, 'Entwurf nach Speichern gelöscht');

  // 4. Startseite und Lernmodi mit dem eigenen Schema
  await page.click('[data-act="home"]');
  await page.waitForSelector('article.schema');
  check(await karten() === anzahl + 1, (anzahl + 1) + ' Schemata auf der Startseite');
  check(await page.locator('.gruppe', { hasText: 'Staatsrecht' }).count() === 1, 'Gruppe „Staatsrecht“ erscheint');
  // Filter nach Rechtsgebiet (nur, wenn es mindestens zwei gibt)
  const gebieteListe = await page.evaluate(() => gebiete());
  if (gebieteListe.length >= 2) {
    check(await page.locator('.filter .chipf').count() === gebieteListe.length + 1, 'Ein Filterknopf je Rechtsgebiet plus „Alle Gebiete“');
    check(await page.locator('h2.gebiet').count() === gebieteListe.length, 'Je Rechtsgebiet eine Abschnittsüberschrift');
    const g = gebieteListe[gebieteListe.length - 1];
    await page.click(`.filter .chipf[data-g="${g}"]`);
    await page.waitForSelector(`.chipf.aktiv[data-g="${g}"]`);
    const erwartet = await page.evaluate(g2 => SCHEMAS.filter(s => !s.gebiet || s.gebiet === g2).length, g);
    check(await karten() === erwartet, 'Filter zeigt nur das gewählte Rechtsgebiet');
    check(await page.locator('h2.gebiet').count() === 0, 'Ohne zweites Gebiet keine Abschnittsüberschrift');
    await page.reload();
    await page.waitForSelector('article.schema');
    check(await page.getAttribute('.chipf.aktiv', 'data-g') === g, 'Gewähltes Rechtsgebiet bleibt nach Neuladen');
    await page.click('.filter .chipf[data-g=""]');
    await page.waitForSelector('.chipf.aktiv[data-g=""]');
    check(await karten() === anzahl + 1, 'Alle Gebiete wieder sichtbar');
  } else check(await page.locator('.filter').count() === 0, 'Kein Filter bei nur einem Rechtsgebiet');
  check(await page.locator('article.schema.eigen .tag', { hasText: 'Eigenes Schema' }).count() === 1, 'Kennzeichen „Eigenes Schema“');
  await page.click('article.schema.eigen [data-act="build"]');
  await page.click('[data-act="reveal"]');
  await page.waitForSelector('[data-act="rateStep"]');
  check((await txt('.step.current .txt')).includes('Zulässigkeit'), 'Aufbau abfragen zeigt ersten Punkt');
  await page.click('[data-act="home"]');
  await page.click('article.schema.eigen [data-act="cards"]');
  await page.waitForSelector('.prompt');
  check((await txt('.prompt')).trim() === 'Beschwerdefähigkeit', 'Karteikasten zeigt eigene Definition');
  await page.click('[data-act="flip"]');
  await page.click('[data-act="rateCard"][data-v="2"]');
  const store = await page.evaluate(() => JSON.parse(localStorage.getItem('schematrainer:v1')));
  check(store.cards['verfassungsbeschwerde:beschwerdefahigkeit'] && store.cards['verfassungsbeschwerde:beschwerdefahigkeit'].box === 1, 'Lernstand der eigenen Karte gespeichert');
  await page.click('[data-act="home"]');
  await page.click('article.schema.eigen [data-act="order"]');
  await page.waitForSelector('.chip');
  check(await page.locator('.chip').count() === 3, 'Ordnen zeigt drei Hauptpunkte');

  // 5. Bearbeiten: Begriff umformulieren, Karten-Kennung bleibt
  await page.click('[data-act="home"]');
  await page.click('article.schema.eigen [data-act="e-bearbeiten"]');
  await page.waitForSelector('#e-titel');
  check((await txt('h2.title')).trim() === 'Schema bearbeiten', 'Editor für eigenes Schema');
  await page.click('[data-act="e-weiter"]');
  await page.click('[data-act="e-def"][data-i="2"]');
  await page.fill('#d-begriff', 'Beschwerdefähigkeit (Grundrechtsträger)');
  await page.fill('#d-quelle', 'Art. 19 Abs. 3 GG');
  await page.click('[data-act="e-speichern"]');
  await page.waitForSelector('.hinweisbox.ok');
  gespeichert = await eigeneImSpeicher();
  check(gespeichert[0].schema.punkte[2].definition.id === 'beschwerdefahigkeit', 'Karten-Kennung bleibt nach Umformulierung');
  check(gespeichert[0].schema.punkte[2].definition.quelle === 'Art. 19 Abs. 3 GG', 'Fundstelle gespeichert');

  // 6. Export
  await page.click('[data-act="home"]');
  await page.click('[data-act="x-start"]');
  await page.waitForSelector('[data-export]');
  check(await page.locator('[data-export]:checked').count() === 1, 'Eigenes Schema vorausgewählt');
  await page.fill('#x-herkunft', 'Test-Export');
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('[data-act="x-datei"]')]);
  const exportText = fs.readFileSync(await download.path(), 'utf8');
  const exportDaten = JSON.parse(exportText);
  check(download.suggestedFilename() === 'verfassungsbeschwerde.json', 'Dateiname der Export-Datei');
  check(exportDaten.format === 'schema-trainer-import' && exportDaten.schemata.length === 1 && exportDaten.schemata[0].herkunft === 'Test-Export' && exportDaten.schemata[0].datei === 'verfassungsbeschwerde.js', 'Exportformat passt zu tools/importieren.mjs');
  await page.click('[data-act="x-kopieren"]');
  await page.waitForFunction(() => /kopiert|von Hand/.test(document.querySelector('#x-ausgabe').textContent));
  check(true, 'Kopieren liefert Rückmeldung');

  // 7. Import als Text mit Konflikt zu eigenem Schema
  await page.click('[data-act="home"]');
  await page.click('[data-act="i-start"]');
  await page.fill('#importtext', exportText);
  await page.click('[data-act="i-text"]');
  await page.waitForSelector('select[data-wahl]');
  check((await txt('.datei-wahl')).includes('schon ein eigenes Schema'), 'Konflikt mit eigenem Schema erkannt');
  await page.selectOption('select[data-wahl="0"]', 'kopie');
  await page.click('[data-act="i-ausfuehren"]');
  await page.waitForSelector('.hinweisbox.ok');
  check(await karten() === anzahl + 2, (anzahl + 2) + ' Schemata nach Import als Kopie');
  check((await eigeneImSpeicher()).some(e => e.schema.id === 'verfassungsbeschwerde-2'), 'Kopie bekam id verfassungsbeschwerde-2');

  // 8. Import einer Schema-Datei (.js), Konflikt zu mitgeliefertem Schema, Original ersetzen
  await page.click('[data-act="i-start"]');
  await page.waitForSelector('#importdatei', { state: 'attached' });
  await page.setInputFiles('#importdatei', path.join(root, 'schemata', 'warenverkehrsfreiheit.js'));
  await page.waitForSelector('select[data-wahl]');
  check((await txt('.datei-wahl')).includes('mitgelieferten Schema'), 'Konflikt mit mitgeliefertem Schema erkannt');
  await page.selectOption('select[data-wahl="0"]', 'ersetzen');
  await page.click('[data-act="i-ausfuehren"]');
  await page.waitForSelector('.hinweisbox.ok');
  check(await karten() === anzahl + 2, 'Ersetzen: weiterhin ' + (anzahl + 2) + ' Schemata');
  check(await page.locator('article.schema', { hasText: 'Deine Fassung ersetzt' }).count() === 1, 'Hinweis „Deine Fassung ersetzt das mitgelieferte Schema“');

  // 9. Fehlerhafte Importe
  await page.click('[data-act="i-start"]');
  await page.fill('#importtext', '{ "format": "schema-trainer-import", "schemata": [ { "id": "Kaputt", "titel": "", "gliederung": ["I."], "punkte": [ { "ebene": 2, "punkt": "x" } ] } ] }');
  await page.click('[data-act="i-text"]');
  await page.waitForSelector('.datei.bad');
  check(await page.locator('[data-act="i-ausfuehren"]').isDisabled(), 'Import-Knopf bei Fehlern gesperrt');
  await page.fill('#importtext', 'Hallo Welt');
  await page.click('[data-act="i-text"]');
  await page.waitForSelector('.befundbox.bad');
  check((await txt('.befundbox.bad')).includes('Format wurde nicht erkannt'), 'Unbekanntes Format gemeldet');

  // 10. Entwurf wiederherstellen und verwerfen
  await page.click('[data-act="home"]');
  await page.click('[data-act="e-start"]');
  await page.waitForSelector('#e-titel');
  await page.fill('#e-titel', 'Entwurf-Test');
  await page.fill('.ptext[data-i="0"]', 'Erster Punkt');
  await page.waitForFunction(() => localStorage.getItem('schematrainer:entwurf:v1') !== null);
  await page.click('[data-act="home"]');
  await page.waitForSelector('article.schema');
  await page.click('[data-act="e-start"]');
  await page.waitForSelector('#e-titel');
  check(await page.inputValue('#e-titel') === 'Entwurf-Test', 'Entwurf wiederhergestellt');
  await page.click('[data-act="e-entwurf-weg"]');
  await page.waitForSelector('#e-titel');
  check(await page.inputValue('#e-titel') === '', 'Entwurf verworfen');

  // 11. Standalone-Seite eigene.html
  await page.goto(basis + 'eigene.html');
  await page.waitForSelector('article.schema');
  check(await karten() === 3, 'Nur eigene Schemata (3) auf eigene.html');
  check((await txt('.werkzeuge-hinweis')).includes('nur deine eigenen'), 'Hinweistext der leeren Umgebung');
  await page.click('article.schema:has-text("Warenverkehrsfreiheit") [data-act="view"]');
  await page.waitForSelector('.outline');
  check((await txt('.outline')).includes('Auslegung im Lichte der GRCh'), 'Ansicht ohne Zielschema des Verweises funktioniert');

  // 12. Löschen mit Bestätigung
  await page.click('[data-act="home"]');
  await page.click('article.schema:has-text("Warenverkehrsfreiheit") [data-act="e-bearbeiten"]');
  await page.waitForSelector('#e-titel');
  await page.click('[data-act="e-weiter"]');
  await page.waitForSelector('[data-act="e-loeschen"]');
  await page.click('[data-act="e-loeschen"]');
  check((await txt('[data-act="e-loeschen"]')).includes('Wirklich'), 'Löschen will Bestätigung');
  await page.click('[data-act="e-loeschen"]');
  await page.waitForSelector('.hinweisbox.ok');
  check(await karten() === 2, 'Nach Löschen 2 eigene Schemata');

  // 13. Leere Umgebung
  await page.evaluate(() => localStorage.removeItem('schematrainer:eigene:v1'));
  await page.reload();
  await page.waitForSelector('.leer');
  check((await txt('.leer h2')).includes('Deine eigene Umgebung'), 'Leerer Einstieg auf eigene.html');
  check(await page.locator('.due').count() === 0, 'Keine Fälligkeitsanzeige ohne Schemata');
  await page.click('.leer [data-act="e-start"]');
  await page.waitForSelector('#e-titel');

  // 14. index.html ohne eigene Schemata
  await page.goto(basis + 'index.html');
  await page.waitForSelector('article.schema');
  check(await karten() === anzahl, 'Wieder ' + anzahl + ' Schemata');
  check(konsole.length === 0, 'Keine Fehler in der Browser-Konsole' + (konsole.length ? ': ' + konsole.join(' | ') : ''));

  await page.evaluate(() => localStorage.clear());
  await ctx.close();
  return fehler;
}

/* ---------- Ablauf ---------- */
const { server, url } = await starteServer();
const browser = await chromium.launch();
let fehler = [];
try {
  fehler = fehler.concat(await szenario(browser, url, 'Über Webserver (' + url + ')'));
  fehler = fehler.concat(await szenario(browser, pathToFileURL(root + path.sep).href, 'Per file:// (Doppelklick)'));
} catch (e) {
  fehler.push('Abbruch: ' + (e && e.message ? e.message.split('\n')[0] : e));
  console.log('  ABBRUCH: ' + (e && e.message ? e.message : e));
} finally {
  await browser.close();
  server.close();
}
console.log(fehler.length ? `\n${fehler.length} Prüfpunkte fehlgeschlagen.` : '\nBrowser-Test bestanden: alle Prüfpunkte in Ordnung.');
process.exit(fehler.length ? 1 : 0);

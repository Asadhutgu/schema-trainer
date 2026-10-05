/*
  Schema-Trainer – Prüfregeln für die Schema-Dateien

  Diese Datei wird an zwei Stellen benutzt:
  - pruefen.html im Browser (ohne Installation, auch per Doppelklick)
  - tools/pruefen.mjs mit Node.js (läuft automatisch auf GitHub)

  Die Regeln stehen nur hier, damit beide Wege dasselbe prüfen.
  Die Meldungen sind für Nutzer ohne Programmierkenntnisse geschrieben.
  Keine juristischen Inhalte.

  Eingabe von pruefen(quelle):
    quelle.liste        Inhalt von schemata/liste.js (Liste der Dateinamen),
                        undefined = keine Liste bekannt (dann nur Inhalte prüfen)
    quelle.listeFehler  {text, zeile}, wenn liste.js nicht gelesen werden konnte
    quelle.vorhanden    Dateinamen, die tatsächlich im Ordner liegen (oder null)
    quelle.vollstaendig false, wenn nur einzelne Dateien übergeben wurden (fehlende dann nicht bemängeln)
    quelle.dateien      [{name, status: "ok" | "fehlt" | "fehler", fehler, schemata}]
  Ausgabe: {befunde: [{art: "fehler" | "hinweis", datei, ort, text, tipp}], statistik}
*/
(function (root) {
  'use strict';

  const GLIEDERUNG = ['A.', 'I.', '1.', 'a)', 'aa)'];
  const FELDER = {
    schema: ['id', 'norm', 'titel', 'gliederung', 'punkte', 'gruppe'],
    punkt: ['ebene', 'punkt', 'definition', 'verweis'],
    definition: ['begriff', 'text', 'quelle', 'id']
  };
  const PFLICHT_SCHEMA = ['id', 'norm', 'titel', 'gliederung', 'punkte'];
  const PFLICHT_DEFINITION = ['begriff', 'text', 'quelle'];
  const LISTE = 'liste.js';
  const DATEINAME = /^[A-Za-z0-9._-]+\.js$/;

  // Stabile Karten-ID aus dem Begriff (gleiche Regel wie in js/app.js)
  function slug(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function toRoman(n) {
    const m = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let r = '';
    for (const [v, s] of m) { while (n >= v) { r += s; n -= v; } }
    return r;
  }
  const NUM = {
    'A.': i => String.fromCharCode(65 + i) + '.',
    'I.': i => toRoman(i + 1) + '.',
    '1.': i => (i + 1) + '.',
    'a)': i => String.fromCharCode(97 + i) + ')',
    'aa)': i => { const c = String.fromCharCode(97 + i); return c + c + ')'; }
  };

  // Wie viele Buchstaben müssen geändert werden, um a in b zu verwandeln? (für Tippfehler in Feldnamen)
  function abstand(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let vorher = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const jetzt = [i];
      for (let j = 1; j <= n; j++) {
        jetzt[j] = Math.min(vorher[j] + 1, jetzt[j - 1] + 1, vorher[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      vorher = jetzt;
    }
    return vorher[n];
  }
  function kurz(s, n) {
    s = String(s == null ? '' : s).trim();
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }
  function istObjekt(x) { return x !== null && typeof x === 'object' && !Array.isArray(x); }
  function istText(x) { return typeof x === 'string' && x.trim() !== ''; }
  // Fehlermeldungen des Browsers (englisch, technisch) in verständliche Hinweise übersetzen.
  // Reihenfolge wichtig: genaue Muster zuerst, allgemeine zuletzt.
  const ERKLAERUNGEN = [
    [/unexpected identifier '([^']+)'|expected property name, got '([^']+)'|unexpected identifier|unexpected token: identifier/i,
      m => 'Unerwartetes Wort' + (m[1] || m[2] ? ' „' + (m[1] || m[2]) + '“' : '') + '. Davor fehlt wahrscheinlich ein Komma oder ein Anführungszeichen.'],
    [/unexpected string|unexpected token: string literal|unexpected number|unexpected token: numeric literal/i,
      () => 'Unerwarteter Wert an dieser Stelle. Davor fehlt wahrscheinlich ein Komma.'],
    [/unexpected end of input|unexpected eof|end of data|end of script/i,
      () => 'Die Datei endet zu früh. Wahrscheinlich fehlt am Ende eine schließende Klammer: ) oder ] oder }.'],
    [/invalid or unexpected token|illegal character|invalid character|unterminated string/i,
      () => 'Ungültiges Zeichen. Oft sind es typografische Anführungszeichen („ “) statt gerader ("), oder ein Text in Anführungszeichen wurde nicht geschlossen.'],
    [/missing \) after argument list/i, () => 'Es fehlt eine schließende runde Klammer ).'],
    [/missing \} after property list/i, () => 'Es fehlt eine schließende geschweifte Klammer } oder ein Komma vor dieser Stelle.'],
    [/missing \] after element list/i, () => 'Es fehlt eine schließende eckige Klammer ] oder ein Komma vor dieser Stelle.'],
    [/missing : after property id/i, () => 'Nach einem Feldnamen fehlt der Doppelpunkt.'],
    [/unexpected token '?([^'\s]+)'?/i, m => 'Unerwartetes Zeichen „' + m[1] + '“. Prüfe die Klammern und Kommas an dieser Stelle.'],
    [/(\S+) is not defined|can't find variable:? (\S+)/i, m => '„' + (m[1] || m[2]) + '“ ist unbekannt. Fehlen Anführungszeichen um einen Text?']
  ];
  function erklaere(text) {
    const roh = String(text || '').replace(/^\w*Error:\s*/, '');
    for (const [muster, erklaerung] of ERKLAERUNGEN) {
      const m = roh.match(muster);
      if (m) return erklaerung(m) + ' (Meldung des Browsers: ' + roh + ')';
    }
    return roh;
  }
  function fehlerText(f) {
    if (!f || !f.text) return '.';
    return ': ' + erklaere(f.text) + '.';
  }

  function pruefen(quelle) {
    const befunde = [];
    const melde = (art, datei, ort, text, tipp) => befunde.push({ art, datei, ort: ort || '', text, tipp: tipp || '' });
    const fehler = (datei, ort, text, tipp) => melde('fehler', datei, ort, text, tipp);
    const hinweis = (datei, ort, text, tipp) => melde('hinweis', datei, ort, text, tipp);
    const LISTE_PFAD = 'schemata/' + LISTE;
    const dateien = Array.isArray(quelle.dateien) ? quelle.dateien : [];

    /* 1. Die Liste der Dateien (schemata/liste.js) */
    let liste = null;
    if (quelle.listeFehler) {
      fehler(LISTE_PFAD, quelle.listeFehler.zeile ? 'Zeile ' + quelle.listeFehler.zeile : '',
        'Die Liste der Schema-Dateien konnte nicht gelesen werden' + fehlerText(quelle.listeFehler),
        'Die Datei muss so aussehen: window.SCHEMA_DATEIEN = [ "datei1.js", "datei2.js", ]; – jeder Dateiname in Anführungszeichen, jede Zeile mit Komma.'
        + (quelle.listeFehler.unklar ? ' Für die genaue Zeile den Ordner schemata unten auf das Feld ziehen.' : ''));
    } else if (quelle.liste === undefined) {
      // keine Liste bekannt: nur Inhalte prüfen
    } else if (!Array.isArray(quelle.liste)) {
      fehler(LISTE_PFAD, '', 'Die Datei legt keine Liste an.',
        'Erwartet wird: window.SCHEMA_DATEIEN = [ "datei1.js", "datei2.js", ];');
    } else {
      liste = [];
      quelle.liste.forEach((name, i) => {
        const ort = 'Eintrag ' + (i + 1);
        if (!istText(name)) { fehler(LISTE_PFAD, ort, 'Der Eintrag ist kein Dateiname in Anführungszeichen.', 'Beispiel: "niederlassungsfreiheit.js",'); return; }
        if (!DATEINAME.test(name)) { fehler(LISTE_PFAD, ort, '„' + name + '“ ist kein gültiger Dateiname.', 'Nur den Dateinamen mit der Endung .js angeben, ohne Ordner. Erlaubt sind Buchstaben, Ziffern, Punkt, Bindestrich und Unterstrich.'); return; }
        if (name === LISTE) { fehler(LISTE_PFAD, ort, 'Die Liste darf sich nicht selbst enthalten.', 'Den Eintrag "liste.js" entfernen.'); return; }
        if (liste.includes(name)) { fehler(LISTE_PFAD, ort, '„' + name + '“ ist doppelt eingetragen.', 'Den doppelten Eintrag entfernen.'); return; }
        liste.push(name);
      });
      if (!liste.length && !befunde.some(b => b.datei === LISTE_PFAD)) fehler(LISTE_PFAD, '', 'Die Liste ist leer.', 'Mindestens eine Schema-Datei eintragen.');
    }

    /* 2. Dateien, die im Ordner liegen, aber nicht eingetragen sind */
    if (liste && Array.isArray(quelle.vorhanden)) {
      for (const name of quelle.vorhanden) {
        if (name === LISTE || liste.includes(name)) continue;
        fehler('schemata/' + name, '', 'Die Datei liegt im Ordner, ist aber nicht in schemata/liste.js eingetragen. Sie erscheint deshalb nicht in der App.',
          'In schemata/liste.js die Zeile "' + name + '", ergänzen.');
      }
    }

    /* 3. Jede Datei: vorhanden, lesbar, genau ein Schema */
    const geladen = [];
    const nachName = new Map(dateien.map(d => [d.name, d]));
    const reihenfolge = liste ? liste.slice() : [];
    for (const d of dateien) if (!reihenfolge.includes(d.name)) reihenfolge.push(d.name);
    for (const name of reihenfolge) {
      const d = nachName.get(name), pfad = 'schemata/' + name;
      // quelle.vollstaendig === false: nur einzelne Dateien wurden übergeben, fehlende nicht bemängeln
      if (!d && quelle.vollstaendig === false) continue;
      if (!d || d.status === 'fehlt') {
        fehler(pfad, '', 'Die Datei ist in schemata/liste.js eingetragen, aber nicht vorhanden.',
          'Dateinamen in der Liste und im Ordner vergleichen, auch Groß- und Kleinschreibung und die Endung .js.');
        continue;
      }
      if (d.status === 'fehler') {
        const f = d.fehler || {};
        fehler(pfad, f.zeile ? 'Zeile ' + f.zeile : '', 'Die Datei konnte nicht gelesen werden' + fehlerText(f),
          'Meist fehlt eine Klammer, ein Komma oder ein Anführungszeichen. Am besten die Stelle mit der Vorlage in docs/schema-format.md vergleichen.'
          + (f.unklar ? ' Für die genaue Zeile den Ordner schemata unten auf das Feld ziehen.' : ''));
        continue;
      }
      const schemata = Array.isArray(d.schemata) ? d.schemata : [];
      if (schemata.length !== 1) {
        fehler(pfad, '', schemata.length === 0 ? 'Die Datei enthält kein Schema.' : 'Die Datei enthält ' + schemata.length + ' Schemata.',
          'Jede Datei muss genau einmal SCHEMATA.push({ ... }); aufrufen.');
      }
      schemata.forEach(s => geladen.push({ s, datei: pfad }));
    }

    /* 4. Inhalt jedes Schemas */
    const ids = new Map();
    const statistik = { dateien: dateien.length, schemata: geladen.length, punkte: 0, definitionen: 0 };
    // Alle ids vorab sammeln, damit Verweise (Feld "verweis") geprüft werden können
    const alleIds = new Set();
    for (const { s } of geladen) if (istObjekt(s) && istText(s.id)) alleIds.add(s.id);

    function pruefeFelder(vorhanden, erlaubt, datei, ort) {
      for (const f of vorhanden) {
        if (erlaubt.includes(f) || f.startsWith('__')) continue;
        const nah = erlaubt.find(e => abstand(f.toLowerCase(), e) <= 2);
        if (nah) fehler(datei, ort, 'Das Feld „' + f + '“ ist falsch geschrieben; gemeint ist wohl „' + nah + '“.', 'Den Feldnamen korrigieren, sonst ignoriert die App diese Angabe.');
        else hinweis(datei, ort, 'Das Feld „' + f + '“ ist unbekannt und wird von der App nicht verwendet.', 'Bekannte Felder an dieser Stelle: ' + erlaubt.join(', ') + '.');
      }
    }

    for (const { s, datei } of geladen) {
      if (!istObjekt(s)) { fehler(datei, '', 'SCHEMATA.push muss einen Eintrag in geschweiften Klammern { ... } erhalten.'); continue; }
      pruefeFelder(Object.keys(s), FELDER.schema, datei, 'Schema');
      for (const feld of PFLICHT_SCHEMA) if (s[feld] === undefined) fehler(datei, 'Schema', 'Das Feld „' + feld + '“ fehlt.', 'Pflichtfelder: id, norm, titel, gliederung, punkte.');
      for (const feld of ['id', 'norm', 'titel', 'gruppe']) if (s[feld] !== undefined && !istText(s[feld])) fehler(datei, 'Schema', 'Das Feld „' + feld + '“ muss ein Text in Anführungszeichen sein und darf nicht leer sein.');

      if (istText(s.id)) {
        if (!/^[a-z0-9-]+$/.test(s.id)) fehler(datei, 'Schema', 'Die id „' + s.id + '“ darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten.', 'Umlaute, Leerzeichen und Großbuchstaben vermeiden, zum Beispiel "niederlassungsfreiheit".');
        if (ids.has(s.id)) fehler(datei, 'Schema', 'Die id „' + s.id + '“ wird schon in ' + ids.get(s.id) + ' verwendet.', 'Jedes Schema braucht eine eigene id. Nach der Veröffentlichung darf sie nicht mehr geändert werden, weil der Lernstand daran hängt.');
        else ids.set(s.id, datei);
      }

      let gliederung = null;
      if (s.gliederung !== undefined) {
        if (!Array.isArray(s.gliederung) || !s.gliederung.length) fehler(datei, 'Schema', 'Das Feld „gliederung“ muss eine Liste wie ["I.", "1.", "a)"] sein.');
        else {
          gliederung = s.gliederung;
          s.gliederung.forEach((g, i) => {
            if (!GLIEDERUNG.includes(g)) fehler(datei, 'Schema', 'Das Gliederungszeichen „' + g + '“ (Ebene ' + i + ') ist unbekannt.', 'Erlaubt sind: ' + GLIEDERUNG.join('  '));
          });
        }
      }

      if (s.punkte === undefined) continue;
      if (!Array.isArray(s.punkte)) { fehler(datei, 'Schema', 'Das Feld „punkte“ muss eine Liste [ ... ] sein.'); continue; }
      if (!s.punkte.length) { fehler(datei, 'Schema', 'Das Schema hat keine Prüfungspunkte.'); continue; }

      const karten = new Map();
      const zaehler = [];
      let nummerierbar = !!gliederung, vorige = -1;
      s.punkte.forEach((p, i) => {
        statistik.punkte++;
        const basis = 'Punkt ' + (i + 1);
        if (!istObjekt(p)) { fehler(datei, basis, 'Der Punkt ist kein Eintrag in geschweiften Klammern { ebene: 0, punkt: "..." }.'); nummerierbar = false; return; }
        const beschriftung = istText(p.punkt) ? ' „' + kurz(p.punkt, 60) + '“' : '';
        let ort = basis + beschriftung;
        pruefeFelder(Object.keys(p), FELDER.punkt, datei, ort);

        const ebene = p.ebene;
        let ebeneOk = Number.isInteger(ebene) && ebene >= 0;
        if (!ebeneOk) fehler(datei, ort, 'Das Feld „ebene“ muss eine ganze Zahl ab 0 sein, ohne Anführungszeichen.', 'Beispiel: ebene: 1');
        else if (i === 0 && ebene !== 0) { fehler(datei, ort, 'Der erste Punkt muss auf Ebene 0 stehen.'); ebeneOk = false; }
        else if (ebene > vorige + 1) { fehler(datei, ort, 'Die Ebene springt von ' + vorige + ' auf ' + ebene + '. Es darf immer nur eine Ebene tiefer gehen als beim vorigen Punkt.', 'Entweder fehlt davor ein Punkt der Ebene ' + (vorige + 1) + ', oder die Zahl bei „ebene“ ist falsch.'); ebeneOk = false; }
        else if (gliederung && ebene >= gliederung.length) { fehler(datei, ort, 'Für Ebene ' + ebene + ' gibt es kein Gliederungszeichen; „gliederung“ hat nur ' + gliederung.length + ' Einträge.', 'In „gliederung“ ein weiteres Zeichen ergänzen, zum Beispiel "a)" oder "aa)".'); ebeneOk = false; }

        if (ebeneOk) {
          vorige = ebene;
          if (nummerierbar && NUM[gliederung[ebene]]) {
            zaehler[ebene] = (zaehler[ebene] === undefined ? -1 : zaehler[ebene]) + 1;
            zaehler.length = ebene + 1;
            ort = basis + beschriftung + ' (' + zaehler.map((c, l) => NUM[gliederung[l]](c)).join(' ') + ')';
          } else nummerierbar = false;
        } else nummerierbar = false;

        if (!istText(p.punkt)) fehler(datei, ort, 'Das Feld „punkt“ fehlt oder ist leer.', 'Beispiel: punkt: "Schutzbereich"');

        if (p.definition !== undefined) {
          if (!istObjekt(p.definition)) fehler(datei, ort, 'Das Feld „definition“ muss ein Eintrag in geschweiften Klammern { begriff: "...", text: "...", quelle: "..." } sein.');
          else {
            statistik.definitionen++;
            const d = p.definition;
            pruefeFelder(Object.keys(d), FELDER.definition, datei, ort);
            for (const feld of PFLICHT_DEFINITION) if (!istText(d[feld])) fehler(datei, ort, 'Die Definition hat kein Feld „' + feld + '“ oder es ist leer.', 'Jede Definition braucht begriff, text und quelle.');
            if (d.id !== undefined && !istText(d.id)) fehler(datei, ort, 'Das Feld „id“ der Definition muss ein nicht leerer Text sein.');
            const key = istText(d.id) ? d.id.trim() : (istText(d.begriff) ? slug(d.begriff) : '');
            if (key) {
              if (karten.has(key)) fehler(datei, ort, 'Der Begriff „' + d.begriff + '“ kommt im Schema schon bei ' + karten.get(key) + ' vor.', 'Eine der beiden Definitionen braucht ein eigenes Feld id, zum Beispiel id: "beschraenkung-2".');
              else karten.set(key, basis);
            }
          }
        }

        // Verweis auf ein anderes Schema
        if (p.verweis !== undefined) {
          if (!istText(p.verweis)) fehler(datei, ort, 'Das Feld „verweis“ muss die id eines anderen Schemas in Anführungszeichen sein.', 'Beispiel: verweis: "wvf"');
          else if (p.verweis === s.id) fehler(datei, ort, 'Der Verweis zeigt auf das Schema selbst.', 'Die id eines anderen Schemas angeben oder den Verweis entfernen.');
          else if (!alleIds.has(p.verweis)) {
            const text = 'Der Verweis „' + p.verweis + '“ passt zu keiner id eines geladenen Schemas.';
            if (quelle.vollstaendig === false) hinweis(datei, ort, text, 'Es wurden nur einzelne Dateien geprüft; beim Prüfen des ganzen Ordners wird der Verweis endgültig geprüft.');
            else fehler(datei, ort, text, 'Bekannte ids: ' + Array.from(alleIds).join(', ') + '.');
          }
        }

        // Hausstil
        const texte = [p.punkt, p.definition && p.definition.text, p.definition && p.definition.quelle].filter(t => typeof t === 'string').join(' ');
        const roem = texte.match(/(?:Art\.|§)\s*\d+[a-z]?\s+(I{1,3}|IV|V|VI{0,3}|IX|X)\b/);
        if (roem) hinweis(datei, ort, 'Römische Absatzangabe „' + roem[0] + '“.', 'Hausstil: Absätze ausschreiben, zum Beispiel „Art. 45 Abs. 4 AEUV“.');
        if (/\bGRC\b/.test(texte)) hinweis(datei, ort, '„GRC“ gefunden.', 'Hausstil: Die Grundrechtecharta heißt „GRCh“.');
        const rsC = texte.match(/(?<!verb\.\s)Rs\.\s*C-\d+\/\d+/);
        if (rsC) hinweis(datei, ort, 'Zitat „' + rsC[0] + '“.', 'Hausstil: Neuere Rechtssachen ohne „Rs.“ zitieren, zum Beispiel „EuGH, C-55/94 – Gebhard“; „verb. Rs.“ nur bei verbundenen Rechtssachen.');
      });
    }

    return { befunde, statistik };
  }

  root.SchemaPruefung = { pruefen, GLIEDERUNG, LISTE, DATEINAME, slug };
})(typeof window !== 'undefined' ? window : globalThis);

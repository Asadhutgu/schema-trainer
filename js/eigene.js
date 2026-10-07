/*
  Schema-Trainer – Eigene Schemata

  Schemata direkt in der App anlegen, bearbeiten, importieren und exportieren.
  Die eigenen Schemata liegen im localStorage dieses Browsers (Schlüssel schematrainer:eigene:v1),
  ein nicht gespeicherter Entwurf unter schematrainer:entwurf:v1.
  Die Lernlogik (Aufbau abfragen, Ordnen, Definitionen, Ansehen) steht in js/app.js und behandelt
  eigene Schemata genauso wie die mitgelieferten aus dem Ordner schemata/.

  Diese Datei wird vor js/app.js geladen. Helfer aus js/app.js (esc, SCHEMAS, state, app, renderHome,
  bereiteSchemataVor, NUM, slug, byId, topbar …) werden erst zur Laufzeit benutzt, also erst dann,
  wenn beide Dateien geladen sind. Die Prüfregeln kommen aus tools/pruefung.js (window.SchemaPruefung).
  Keine juristischen Inhalte.
*/
const Eigene=(()=>{
'use strict';
const KEY_EIGENE='schematrainer:eigene:v1', KEY_ENTWURF='schematrainer:entwurf:v1';
const FORMAT='schema-trainer-import';
// Auswahl für das Feld "gliederung" im Editor (erstes = Vorgabe für neue Schemata)
const GLIEDERUNGEN=[
  {zeichen:['A.','I.','1.','a)'], name:'A. – I. – 1. – a)  (Klageschema: Zulässigkeit, Begründetheit)'},
  {zeichen:['I.','1.','a)'], name:'I. – 1. – a)  (Grundfreiheit, Grundrecht)'},
  {zeichen:['A.','I.','1.','a)','aa)'], name:'A. – I. – 1. – a) – aa)  (fünf Ebenen)'},
  {zeichen:['I.','1.','a)','aa)'], name:'I. – 1. – a) – aa)'},
  {zeichen:['1.','a)','aa)'], name:'1. – a) – aa)'}
];

/* ---------- Speicher ---------- */
// eintraege: [{schema, erstellt, geaendert, herkunft}] – schema im Dateiformat (docs/schema-format.md)
let eintraege=[];
let speicherFehler='';
function lade(){
  eintraege=[];
  try{
    const raw=localStorage.getItem(KEY_EIGENE); if(!raw) return;
    const p=JSON.parse(raw);
    const liste=Array.isArray(p&&p.schemata)?p.schemata:[];
    eintraege=liste.filter(e=>e&&typeof e==='object'&&e.schema&&typeof e.schema==='object'&&typeof e.schema.id==='string'&&e.schema.id)
      .map(e=>({schema:e.schema, erstellt:e.erstellt||'', geaendert:e.geaendert||'', herkunft:typeof e.herkunft==='string'?e.herkunft:''}));
  }catch(err){ eintraege=[]; }
}
function speichere(){
  try{ localStorage.setItem(KEY_EIGENE, JSON.stringify({version:1, schemata:eintraege})); speicherFehler=''; return true; }
  catch(err){ speicherFehler='Speichern nicht möglich. Der Speicher des Browsers ist voll oder gesperrt (zum Beispiel im privaten Modus).'; return false; }
}
const rohListe=()=>eintraege.map(e=>e.schema);
const eintrag=id=>eintraege.find(e=>e.schema.id===id);
const istEigen=id=>!!eintrag(id);
const heute=()=>new Date().toISOString().slice(0,10);
// Alle bekannten ids: geladene Schemata (mitgelieferte und eigene) plus gespeicherte eigene
function bekannteIds(){ const ids=new Set(eintraege.map(e=>e.schema.id)); (typeof SCHEMAS!=='undefined'?SCHEMAS:[]).forEach(s=>ids.add(s.id)); return ids; }
function freieId(wunsch, ids){
  const basis=(slug(wunsch)||'schema').slice(0,60);
  if(!ids.has(basis)) return basis;
  for(let n=2;;n++){ const id=basis+'-'+n; if(!ids.has(id)) return id; }
}
function alleGruppen(){ const g=new Set(); (typeof SCHEMAS!=='undefined'?SCHEMAS:[]).forEach(s=>{if(s.group)g.add(s.group);}); return Array.from(g); }
function alleGebiete(){ const g=new Set(); (typeof SCHEMAS!=='undefined'?SCHEMAS:[]).forEach(s=>{if(s.gebiet)g.add(s.gebiet);}); return Array.from(g); }

/* ---------- Entwurf (automatisch gesichert, damit nichts verloren geht) ---------- */
function entwurfLesen(){ try{ const raw=localStorage.getItem(KEY_ENTWURF); return raw?JSON.parse(raw):null; }catch(err){ return null; } }
function entwurfSichern(){
  const e=state&&state.kind==='edit'?state.e:null; if(!e) return;
  try{ localStorage.setItem(KEY_ENTWURF, JSON.stringify({id:e.id, schritt:e.schritt, titel:e.titel, norm:e.norm, gruppe:e.gruppe, gebiet:e.gebiet, gliederung:e.gliederung, punkte:e.punkte, zeit:Date.now()})); }catch(err){}
}
function entwurfLoeschen(){ try{ localStorage.removeItem(KEY_ENTWURF); }catch(err){} }

/* ---------- Prüfen mit den Regeln aus tools/pruefung.js ---------- */
// Ergebnis: {fehler:[...], hinweise:[...]} – jeweils {ort, text, tipp}
function pruefeSchemata(schemata, zusatzIds){
  const P=window.SchemaPruefung;
  const leer={fehler:[], hinweise:[], je:new Map()};
  if(!P){
    // Notbehelf, falls tools/pruefung.js fehlt: nur das Nötigste
    schemata.forEach((s,i)=>{
      const f=[];
      if(!s||typeof s!=='object') f.push({ort:'',text:'Kein Schema.',tipp:''});
      else{
        if(!s.titel||!String(s.titel).trim()) f.push({ort:'Schema',text:'Der Titel fehlt.',tipp:''});
        if(!Array.isArray(s.punkte)||!s.punkte.length) f.push({ort:'Schema',text:'Das Schema hat keine Prüfungspunkte.',tipp:''});
      }
      leer.je.set(i,{fehler:f,hinweise:[]}); leer.fehler.push(...f);
    });
    return leer;
  }
  const ids=Array.from(bekannteIds()); if(Array.isArray(zusatzIds)) ids.push(...zusatzIds);
  const dateien=schemata.map((s,i)=>({name:'schema-'+i+'.js', status:'ok', schemata:[s]}));
  const erg=P.pruefen({liste:undefined, listeFehler:null, vorhanden:null, vollstaendig:false, modus:'eigene', weitereIds:ids, dateien});
  const out={fehler:[], hinweise:[], je:new Map()};
  schemata.forEach((s,i)=>out.je.set(i,{fehler:[],hinweise:[]}));
  erg.befunde.forEach(b=>{
    const m=b.datei.match(/schema-(\d+)\.js$/); const i=m?+m[1]:0;
    const ziel=out.je.get(i)||out.je.get(0);
    const eintragB={ort:b.ort, text:b.text, tipp:b.tipp};
    if(b.art==='fehler'){ out.fehler.push(eintragB); if(ziel) ziel.fehler.push(eintragB); }
    else { out.hinweise.push(eintragB); if(ziel) ziel.hinweise.push(eintragB); }
  });
  return out;
}
function befundeHtml(fehler, hinweise, offenHinweise){
  if(!fehler.length&&!hinweise.length) return '';
  const li=(b,art)=>`<li class="befund ${art}"><span class="art">${art==='fehler'?'Fehler':'Hinweis'}</span><div>${b.ort?`<div class="ort">${esc(b.ort)}</div>`:''}<p>${esc(b.text)}</p>${b.tipp?`<p class="tipp">Tipp: ${esc(b.tipp)}</p>`:''}</div></li>`;
  let html='';
  if(fehler.length) html+=`<div class="befundbox bad"><p class="befundtitel">${fehler.length===1?'Ein Fehler':fehler.length+' Fehler'} – bitte zuerst beheben</p><ul class="befunde">${fehler.map(b=>li(b,'fehler')).join('')}</ul></div>`;
  if(hinweise.length) html+=`<details class="befundbox warn"${offenHinweise?' open':''}><summary>${hinweise.length===1?'Ein Hinweis':hinweise.length+' Hinweise'} (kein Hindernis)</summary><ul class="befunde">${hinweise.map(b=>li(b,'hinweis')).join('')}</ul></details>`;
  return html;
}

/* ---------- Gliederung im Editor berechnen ---------- */
// Ebenen bereinigen: erster Punkt auf 0, nie mehr als eine Ebene tiefer als der vorige, nie tiefer als die Gliederung reicht
function normalisiere(punkte, gliederung){
  let vorige=-1;
  punkte.forEach((p,i)=>{
    let l=Number.isInteger(p.ebene)&&p.ebene>=0?p.ebene:0;
    if(i===0) l=0;
    l=Math.min(l, vorige+1, gliederung.length-1);
    p.ebene=l; vorige=l;
  });
}
function nummern(punkte, gliederung){
  const zaehler=[], out=[];
  punkte.forEach(p=>{
    const l=p.ebene;
    zaehler[l]=(zaehler[l]===undefined?-1:zaehler[l])+1; zaehler.length=l+1;
    const f=NUM[gliederung[l]]||NUM['1.'];
    out.push({num:f(zaehler[l]), pfad:zaehler.map((c,k)=>(NUM[gliederung[k]]||NUM['1.'])(c)).join(' ')});
  });
  return out;
}
// Block eines Punktes: er selbst und alle folgenden tieferen Punkte (seine Unterpunkte)
function blockEnde(punkte,i){ let j=i+1; while(j<punkte.length&&punkte[j].ebene>punkte[i].ebene) j++; return j; }
function neuerPunkt(ebene,text){ return {ebene:ebene||0, punkt:text||'', definition:null, verweis:''}; }

/* ---------- Editor: Zustand ---------- */
// state.e = {id, neu, kopieVon, schritt, titel, norm, gruppe, gliederung, punkte, offen, befunde, rueckgaengig, entwurfHinweis}
function editorStart(vorlage, optionen){
  const o=optionen||{};
  const e={
    id:o.id||null, neu:!o.id, kopieVon:o.kopieVon||'', schritt:1,
    // Rechtsgebiet: bei neuen Schemata mit dem auf der Startseite gewählten Gebiet vorbelegt
    titel:'', norm:'', gruppe:'', gebiet:(!o.id&&typeof filterGebiet==='string')?filterGebiet:'', gliederung:GLIEDERUNGEN[0].zeichen.slice(),
    punkte:[], offen:-1, befunde:null, rueckgaengig:null, entwurfHinweis:'', loeschenArmiert:false
  };
  if(vorlage){
    e.titel=String(vorlage.titel||''); e.norm=String(vorlage.norm||''); e.gruppe=String(vorlage.gruppe||''); e.gebiet=String(vorlage.gebiet||'');
    if(Array.isArray(vorlage.gliederung)&&vorlage.gliederung.length) e.gliederung=vorlage.gliederung.slice();
    e.punkte=(Array.isArray(vorlage.punkte)?vorlage.punkte:[]).filter(p=>p&&typeof p==='object').map(p=>{
      const d=p.definition&&typeof p.definition==='object'?p.definition:null;
      return {ebene:Number.isInteger(p.ebene)?p.ebene:0, punkt:String(p.punkt||''), verweis:typeof p.verweis==='string'?p.verweis:'',
        // _key: Karten-Kennung beim Laden, damit der Lernstand erhalten bleibt, wenn der Begriff später umformuliert wird
        definition:d?{begriff:String(d.begriff||''), text:String(d.text||''), quelle:String(d.quelle||''), id:typeof d.id==='string'?d.id:'', _key:typeof d.id==='string'&&d.id?d.id:slug(d.begriff||'')}:null};
    });
  }
  // Nicht gespeicherten Entwurf für dasselbe Schema wiederherstellen
  const ent=entwurfLesen();
  if(ent&&(ent.id||null)===(e.id||null)&&!o.ohneEntwurf&&Array.isArray(ent.punkte)){
    e.titel=String(ent.titel||''); e.norm=String(ent.norm||''); e.gruppe=String(ent.gruppe||''); e.gebiet=String(ent.gebiet||'');
    if(Array.isArray(ent.gliederung)&&ent.gliederung.length) e.gliederung=ent.gliederung;
    e.punkte=ent.punkte.filter(p=>p&&typeof p==='object').map(p=>({ebene:Number.isInteger(p.ebene)?p.ebene:0, punkt:String(p.punkt||''), verweis:typeof p.verweis==='string'?p.verweis:'', definition:p.definition&&typeof p.definition==='object'?p.definition:null}));
    e.schritt=ent.schritt===2?2:1;
    const wann=ent.zeit?new Date(ent.zeit):null;
    e.entwurfHinweis='Ein nicht gespeicherter Entwurf'+(wann?' vom '+wann.toLocaleDateString('de-DE')+', '+wann.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr':'')+' wurde wiederhergestellt.';
  }
  if(!e.punkte.length) e.punkte=[neuerPunkt(0,'')];
  normalisiere(e.punkte,e.gliederung);
  verlauf=[]; state={kind:'edit', e};
  renderEditor(); window.scrollTo(0,0);
}
function editorFuer(id){
  const ei=eintrag(id);
  if(ei){ editorStart(ei.schema,{id}); return; }
  // Mitgeliefertes Schema als eigene Fassung übernehmen (gleiche id: ersetzt das Original in der Übersicht, Lernstand bleibt)
  const s=byId(id); if(!s) return;
  editorStart(s.roh,{id:s.id, kopieVon:s.title});
}
function editorTitel(e){ return e.neu?'Neues Schema':(e.kopieVon&&!istEigen(e.id)?'Eigene Fassung von „'+e.kopieVon+'“':'Schema bearbeiten'); }
function schritteHtml(e){
  return `<ol class="schritte" aria-label="Schritte"><li class="${e.schritt===1?'aktiv':''}"><button class="schrittbtn" data-act="e-schritt" data-n="1"><span class="sn">1</span> Aufbau</button></li><li class="${e.schritt===2?'aktiv':''}"><button class="schrittbtn" data-act="e-schritt" data-n="2"><span class="sn">2</span> Definitionen</button></li></ol>`;
}
function kopfHtml(e){
  return topbar()+`<h2 class="title">${esc(editorTitel(e))}</h2>`
    +(e.kopieVon&&!istEigen(e.id)?`<p class="sub">Deine Fassung ersetzt das mitgelieferte Schema in der Übersicht, dein Lernstand bleibt erhalten. Löschst du deine Fassung später, erscheint wieder das Original.</p>`:'')
    +(e.entwurfHinweis?`<div class="hinweisbox"><p>${esc(e.entwurfHinweis)} <button class="linkbtn" data-act="e-entwurf-weg">Entwurf verwerfen</button></p></div>`:'')
    +schritteHtml(e);
}

/* ---------- Editor: Schritt 1 – Aufbau ---------- */
function renderEditor(){
  const e=state.e;
  if(e.schritt===2){ renderDefinitionen(); return; }
  const nr=nummern(e.punkte,e.gliederung), n=e.punkte.length;
  const gruppen=alleGruppen(), gebieteListe=alleGebiete();
  const gl=GLIEDERUNGEN.findIndex(g=>g.zeichen.join()===e.gliederung.join());
  app.innerHTML=kopfHtml(e)+`
  <div class="feld"><label for="e-titel">Titel</label><input type="text" id="e-titel" data-feld="titel" value="${esc(e.titel)}" placeholder="z. B. Verfassungsbeschwerde" autocomplete="off"></div>
  <div class="feld"><label for="e-norm">Norm (freiwillig)</label><input type="text" id="e-norm" data-feld="norm" value="${esc(e.norm)}" placeholder="z. B. Art. 94 Abs. 1 Nr. 4a GG" autocomplete="off"></div>
  <div class="feld"><label for="e-gebiet">Rechtsgebiet (freiwillig)</label><input type="text" id="e-gebiet" data-feld="gebiet" list="e-gebiete" value="${esc(e.gebiet)}" placeholder="z. B. Staatsrecht oder Strafrecht" autocomplete="off"><datalist id="e-gebiete">${gebieteListe.map(g=>`<option value="${esc(g)}">`).join('')}</datalist></div>
  <div class="feld"><label for="e-gruppe">Gruppe innerhalb des Rechtsgebiets (freiwillig)</label><input type="text" id="e-gruppe" data-feld="gruppe" list="e-gruppen" value="${esc(e.gruppe)}" placeholder="z. B. Staatsrecht" autocomplete="off"><datalist id="e-gruppen">${gruppen.map(g=>`<option value="${esc(g)}">`).join('')}</datalist></div>
  <div class="feld"><label for="e-gliederung">Gliederungszeichen</label><select id="e-gliederung" data-feld="gliederung">${GLIEDERUNGEN.map((g,i)=>`<option value="${i}"${i===gl?' selected':''}>${esc(g.name)}</option>`).join('')}${gl<0?`<option value="-1" selected>${esc(e.gliederung.join(' – '))}</option>`:''}</select></div>
  <h3>Prüfungspunkte</h3>
  <p class="sub">Eine Zeile je Prüfungspunkt. Mit den Pfeilen änderst du Ebene und Reihenfolge; Unterpunkte wandern mit. Enter legt den nächsten Punkt an.</p>
  <ol class="epunkte">${e.punkte.map((p,i)=>{
    const vor=i>0?e.punkte[i-1].ebene:-1;
    const einOk=i>0&&p.ebene<=vor&&p.ebene<e.gliederung.length-1;
    const ausOk=p.ebene>0;
    const blockende=blockEnde(e.punkte,i);
    let hochOk=false; for(let k=i-1;k>=0;k--){ if(e.punkte[k].ebene<p.ebene) break; if(e.punkte[k].ebene===p.ebene){hochOk=true;break;} }
    const runterOk=blockende<n&&e.punkte[blockende].ebene===p.ebene;
    return `<li class="epunkt" data-i="${i}" data-l="${p.ebene}" style="--lvl:${p.ebene}">
      <span class="num">${esc(nr[i].num)}</span>
      <input type="text" class="ptext" data-i="${i}" value="${esc(p.punkt)}" placeholder="${i===0?'z. B. Zulässigkeit':'Prüfungspunkt'}" aria-label="Prüfungspunkt ${esc(nr[i].pfad)}" autocomplete="off">
      <div class="pwerkzeuge" role="group" aria-label="Punkt ${esc(nr[i].pfad)} verschieben">
        <button class="ibtn" data-act="e-aus" data-i="${i}" title="Eine Ebene höher" aria-label="Eine Ebene höher"${ausOk?'':' disabled'}>←</button>
        <button class="ibtn" data-act="e-ein" data-i="${i}" title="Zum Unterpunkt machen" aria-label="Zum Unterpunkt machen"${einOk?'':' disabled'}>→</button>
        <button class="ibtn" data-act="e-hoch" data-i="${i}" title="Nach oben" aria-label="Nach oben"${hochOk?'':' disabled'}>↑</button>
        <button class="ibtn" data-act="e-runter" data-i="${i}" title="Nach unten" aria-label="Nach unten"${runterOk?'':' disabled'}>↓</button>
        <button class="ibtn weg" data-act="e-weg" data-i="${i}" title="Punkt löschen" aria-label="Punkt löschen"${n>1?'':' disabled'}>✕</button>
      </div>
    </li>`;}).join('')}</ol>
  <div class="actions">
    <button class="btn" data-act="e-neu">+ Punkt anhängen</button>
    <button class="btn" data-act="e-mehrere" aria-expanded="${e.mehrereOffen?'true':'false'}">Mehrere Punkte einfügen</button>
    ${e.rueckgaengig?'<button class="btn" data-act="e-rueckgaengig">Rückgängig</button>':''}
  </div>
  ${e.mehrereOffen?`<div class="mehrere"><label class="lbl" for="e-mehrtext">Eine Zeile je Punkt. Unterpunkte mit zwei Leerzeichen oder einem Tabulator einrücken; Nummern am Zeilenanfang (A., I., 1., a)) werden entfernt.</label><textarea id="e-mehrtext" rows="6" placeholder="Zulässigkeit&#10;  Zuständigkeit&#10;  Beschwerdefähigkeit&#10;Begründetheit"></textarea><div class="actions"><button class="btn primary" data-act="e-mehrere-ok">Anhängen</button><button class="btn" data-act="e-mehrere">Schließen</button></div></div>`:''}
  ${e.befunde?befundeHtml(e.befunde.fehler,e.befunde.hinweise,false):''}
  <div class="controls flach"><button class="btn" data-act="home">Abbrechen</button><button class="btn primary" data-act="e-weiter">Weiter zu den Definitionen</button></div>
  ${speicherFehler?`<div class="hinweisbox" role="alert">${esc(speicherFehler)}</div>`:''}`;
  if(e.fokus!=null){ const inp=app.querySelector(`.ptext[data-i="${e.fokus}"]`); if(inp){ inp.focus(); if(e.fokusEnde) inp.setSelectionRange(inp.value.length,inp.value.length); } e.fokus=null; e.fokusEnde=false; }
}
// Schritt-1-Eingaben aus dem Formular in den Zustand übernehmen (ohne neu zu zeichnen)
function lesePunkttexte(){
  const e=state.e;
  app.querySelectorAll('.ptext').forEach(inp=>{ const i=+inp.dataset.i; if(e.punkte[i]) e.punkte[i].punkt=inp.value; });
}
function merke(){ const e=state.e; e.rueckgaengig=JSON.parse(JSON.stringify(e.punkte)); }
function strukturAendern(fn){
  const e=state.e; lesePunkttexte(); merke(); fn(e); normalisiere(e.punkte,e.gliederung); e.befunde=null; entwurfSichern(); renderEditor();
}
// Mehrzeiligen Text in Punkte verwandeln (Einrückung = Ebene)
function punkteAusText(text){
  const out=[];
  String(text||'').split(/\r?\n/).forEach(zeile=>{
    if(!zeile.trim()) return;
    const m=zeile.match(/^([ \t]*)(.*)$/);
    const einr=m[1].replace(/\t/g,'  ').length;
    let t=m[2].trim().replace(/^(?:[A-Z]\.|[IVX]{1,4}\.|\d{1,2}\.|[a-z]{1,2}\)|\(\d{1,2}\)|[-–•*>])\s+/,'').trim();
    out.push(neuerPunkt(Math.floor(einr/2), t));
  });
  return out;
}
function schritt1Pruefen(){
  const e=state.e; lesePunkttexte();
  const s=baueSchema(e);
  const erg=pruefeSchemata([s]);
  // Nur Befunde zum Aufbau (Schema, Ebenen, Punkt-Texte); Definitionen kommen in Schritt 2
  return erg;
}

/* ---------- Editor: Schritt 2 – Definitionen ---------- */
function renderDefinitionen(){
  const e=state.e, nr=nummern(e.punkte,e.gliederung);
  const ziele=(typeof SCHEMAS!=='undefined'?SCHEMAS:[]).filter(s=>s.id!==e.id);
  app.innerHTML=kopfHtml(e)+`
  <p class="sub">Tippe einen Prüfungspunkt an, um eine Definition zu hinterlegen. Jede Definition wird zu einer Karteikarte. Nicht jeder Punkt braucht eine.</p>
  <ol class="outline edefs">${e.punkte.map((p,i)=>{
    const d=p.definition, hatDef=d&&(d.begriff.trim()||d.text.trim()), offen=e.offen===i;
    const ziel=p.verweis?ziele.find(z=>z.id===p.verweis):null;
    const tags=(hatDef?'<span class="tag">Definition</span>':'')+(p.verweis?`<span class="tag">Verweis: ${esc(ziel?ziel.title:p.verweis)}</span>`:'');
    const knopf=offen?'':` <button class="linkbtn" data-act="e-def" data-i="${i}">${hatDef||p.verweis?'Bearbeiten':'Definition hinzufügen'}</button>`;
    const panel=offen?`<div class="defeditor">
        <div class="feld"><label for="d-begriff">Begriff (Vorderseite der Karte)</label><input type="text" id="d-begriff" data-dfeld="begriff" value="${esc(d?d.begriff:'')}" placeholder="${esc(p.punkt||'Begriff')}" autocomplete="off"></div>
        <div class="feld"><label for="d-text">Definition (Rückseite)</label><textarea id="d-text" data-dfeld="text" rows="4" placeholder="Definition in einem Satz">${esc(d?d.text:'')}</textarea></div>
        <div class="feld"><label for="d-quelle">Fundstelle (freiwillig)</label><input type="text" id="d-quelle" data-dfeld="quelle" value="${esc(d?d.quelle:'')}" placeholder="z. B. BVerfGE 7, 198 (205) oder § 90 Abs. 1 BVerfGG" autocomplete="off"></div>
        ${ziele.length?`<div class="feld"><label for="d-verweis">Verweis auf ein anderes Schema (freiwillig)</label><select id="d-verweis" data-dfeld="verweis"><option value="">– kein Verweis –</option>${ziele.map(z=>`<option value="${esc(z.id)}"${z.id===p.verweis?' selected':''}>${esc(z.title)}${z.norm?' ('+esc(z.norm)+')':''}</option>`).join('')}${p.verweis&&!ziel?`<option value="${esc(p.verweis)}" selected>Unbekanntes Schema „${esc(p.verweis)}“</option>`:''}</select></div>`:''}
        <div class="actions"><button class="btn primary" data-act="e-def-zu">Fertig</button>${hatDef?`<button class="btn" data-act="e-def-weg" data-i="${i}">Definition entfernen</button>`:''}</div>
      </div>`:'';
    return `<li class="step${offen?' current':''}" data-l="${p.ebene}" style="--lvl:${p.ebene}"><span class="num">${esc(nr[i].num)}</span><div class="txt">${esc(p.punkt)}${tags}${knopf}${panel}</div></li>`;
  }).join('')}</ol>
  ${e.befunde?befundeHtml(e.befunde.fehler,e.befunde.hinweise,false):''}
  <div class="controls flach"><button class="btn" data-act="e-schritt" data-n="1">Zurück zum Aufbau</button><button class="btn primary" data-act="e-speichern">Speichern</button></div>
  ${!e.neu&&istEigen(e.id)?`<p class="gefahr"><button class="linkbtn" data-act="e-loeschen">${e.loeschenArmiert?'Wirklich löschen? Erneut tippen':'Dieses Schema löschen'}</button></p>`:''}
  ${speicherFehler?`<div class="hinweisbox" role="alert">${esc(speicherFehler)}</div>`:''}`;
  if(e.offen>=0){ const inp=app.querySelector('#d-begriff'); if(inp&&e.fokusDef){ inp.focus(); } e.fokusDef=false; const li=app.querySelector('.edefs .current'); if(li&&e.scrollDef){ li.scrollIntoView({block:'center',behavior:reduceMotion()?'auto':'smooth'}); e.scrollDef=false; } }
}
function leseDefinition(){
  const e=state.e; if(e.offen<0) return; const p=e.punkte[e.offen]; if(!p) return;
  const w=sel=>{ const el=app.querySelector(sel); return el?el.value:''; };
  const d=p.definition||{begriff:'',text:'',quelle:'',id:'',_key:''};
  d.begriff=w('[data-dfeld="begriff"]'); d.text=w('[data-dfeld="text"]'); d.quelle=w('[data-dfeld="quelle"]');
  p.definition=(d.begriff.trim()||d.text.trim())?d:null;
  const v=app.querySelector('[data-dfeld="verweis"]'); if(v) p.verweis=v.value;
}

/* ---------- Schema aus dem Editor-Zustand bauen (Dateiformat) ---------- */
function baueSchema(e){
  const s={id:e.id||(slug(e.titel)||'neu')};
  if(e.norm.trim()) s.norm=e.norm.trim();
  s.titel=e.titel.trim();
  if(e.gebiet.trim()) s.gebiet=e.gebiet.trim();
  if(e.gruppe.trim()) s.gruppe=e.gruppe.trim();
  s.gliederung=e.gliederung.slice();
  const karten=new Set(); // vergebene Karten-Kennungen, damit derselbe Begriff zweimal im Schema möglich ist
  s.punkte=e.punkte.map(p=>{
    const o={ebene:p.ebene, punkt:p.punkt.trim()};
    const d=p.definition;
    if(d&&(d.begriff.trim()||d.text.trim())){
      const def={begriff:d.begriff.trim(), text:d.text.trim()};
      if(d.quelle&&d.quelle.trim()) def.quelle=d.quelle.trim();
      // Karten-Kennung festhalten, wenn der Begriff umformuliert wurde (sonst ginge der Lernstand der Karte verloren)
      if(d.id) def.id=d.id; else if(d._key&&d._key!==slug(def.begriff)) def.id=d._key;
      let key=def.id||slug(def.begriff);
      if(key&&karten.has(key)){ let n=2; while(karten.has(key+'-'+n)) n++; def.id=key+'-'+n; key=def.id; }
      if(key) karten.add(key);
      o.definition=def;
    }
    if(p.verweis) o.verweis=p.verweis;
    return o;
  });
  return s;
}
function speichereEditor(){
  const e=state.e; leseDefinition(); e.offen=-1;
  const s=baueSchema(e);
  const erg=pruefeSchemata([s]);
  if(erg.fehler.length){ e.befunde=erg; renderEditor(); const box=app.querySelector('.befundbox'); if(box) box.scrollIntoView({block:'start',behavior:reduceMotion()?'auto':'smooth'}); return; }
  if(e.neu) s.id=freieId(e.titel, bekannteIds());
  const jetzt=heute(), alt=eintrag(s.id);
  if(alt){ alt.schema=s; alt.geaendert=jetzt; }
  else eintraege.push({schema:s, erstellt:jetzt, geaendert:jetzt, herkunft:''});
  if(!speichere()){ renderEditor(); return; }
  entwurfLoeschen();
  bereiteSchemataVor();
  const neu=byId(s.id);
  state=null; renderView(neu); window.scrollTo(0,0);
  meldung(alt?'Schema gespeichert.':'Schema angelegt. Es steht jetzt in der Übersicht und kann abgefragt werden.');
}
function loescheSchema(id){
  const i=eintraege.findIndex(x=>x.schema.id===id); if(i<0) return;
  eintraege.splice(i,1); speichere(); entwurfLoeschen();
  bereiteSchemataVor(); state=null; renderHome(); window.scrollTo(0,0);
  meldung('Schema gelöscht.'+(byId(id)?' Das mitgelieferte Original wird wieder angezeigt.':''));
}
// Erfolgsmeldung oben in der Ansicht einblenden
function meldung(text){ app.insertAdjacentHTML('afterbegin',`<div class="hinweisbox ok" role="status"><p>${esc(text)}</p></div>`); }

/* ---------- Import ---------- */
// Text einer Datei lesen: JSON (Exportformat, Liste oder einzelnes Schema) oder Schema-Datei (.js mit SCHEMATA.push)
function leseImportText(text, name){
  const t=String(text||'').replace(/^﻿/,'').trim();
  if(!t) return {fehler:'Die Datei ist leer.'};
  let daten=null;
  if(/^[\[{]/.test(t)){
    try{ daten=JSON.parse(t); }
    catch(err){ return {fehler:'Der Text ist kein gültiges JSON: '+(window.SchemaPruefung?window.SchemaPruefung.erklaere(err.message):err.message)}; }
    if(Array.isArray(daten)) return {schemata:daten, herkunft:''};
    if(daten&&typeof daten==='object'){
      if(Array.isArray(daten.schemata)) return {schemata:daten.schemata, herkunft:typeof daten.herkunft==='string'?daten.herkunft:''};
      if(daten.punkte) return {schemata:[daten], herkunft:''};
    }
    return {fehler:'Die Datei enthält keine Schemata. Erwartet wird eine Datei aus „Exportieren“ (format: "schema-trainer-import").'};
  }
  if(/SCHEMATA\s*\.\s*push/.test(t)){
    const SCHEMATA=[];
    try{ new Function('SCHEMATA','window',t)(SCHEMATA,{SCHEMATA}); }
    catch(err){ return {fehler:'Die Schema-Datei konnte nicht gelesen werden: '+(window.SchemaPruefung?window.SchemaPruefung.erklaere(err.message):err.message)}; }
    if(!SCHEMATA.length) return {fehler:'Die Schema-Datei enthält kein Schema.'};
    return {schemata:SCHEMATA, herkunft:''};
  }
  return {fehler:'Das Format wurde nicht erkannt. Erwartet wird eine Datei aus „Exportieren“ (.json) oder eine Schema-Datei aus dem Ordner schemata (.js).'};
}
function importStart(){
  verlauf=[]; state={kind:'import', dateien:[], vorschau:null, fehler:[], text:''};
  renderImport(); window.scrollTo(0,0);
}
async function importDateien(files){
  const st=state; if(!st||st.kind!=='import') return;
  for(const f of files){
    try{ const text=await f.text(); st.dateien.push({name:f.name, text}); }
    catch(err){ st.dateien.push({name:f.name, text:null}); }
  }
  importVorschau();
}
// Vorschau aufbauen: jedes Schema prüfen und Konflikte mit vorhandenen ids erkennen
function importVorschau(){
  const st=state; st.fehler=[];
  const roh=[];
  st.dateien.forEach(d=>{
    if(d.text===null){ st.fehler.push('„'+d.name+'“ konnte nicht gelesen werden.'); return; }
    const r=leseImportText(d.text, d.name);
    if(r.fehler){ st.fehler.push('„'+d.name+'“: '+r.fehler); return; }
    r.schemata.forEach(s=>roh.push({s, datei:d.name, herkunftDatei:r.herkunft}));
  });
  if(st.text.trim()){
    const r=leseImportText(st.text,'eingefügter Text');
    if(r.fehler) st.fehler.push('Text: '+r.fehler); else r.schemata.forEach(s=>roh.push({s, datei:'eingefügter Text', herkunftDatei:r.herkunft}));
  }
  // Felder des Import-/Exportformats, die nicht ins Schema gehören, vorher herausnehmen
  const bereinigt=roh.map(x=>{
    if(!x.s||typeof x.s!=='object') return {schema:x.s, herkunft:x.herkunftDatei, datei:x.datei};
    const {datei, herkunft, ...schema}=x.s;
    return {schema, herkunft:typeof herkunft==='string'&&herkunft?herkunft:x.herkunftDatei, datei:x.datei};
  });
  const erg=pruefeSchemata(bereinigt.map(b=>b.schema));
  const eigeneIds=new Set(eintraege.map(x=>x.schema.id));
  const geladene=new Set((typeof SCHEMAS!=='undefined'?SCHEMAS:[]).map(s=>s.id));
  st.vorschau=bereinigt.map((b,i)=>{
    const je=erg.je.get(i)||{fehler:[],hinweise:[]};
    const s=b.schema, id=s&&typeof s.id==='string'?s.id:'';
    let konflikt='';
    if(id&&eigeneIds.has(id)) konflikt='eigen'; else if(id&&geladene.has(id)) konflikt='mitgeliefert';
    return {schema:s, herkunft:b.herkunft, datei:b.datei, fehler:je.fehler, hinweise:je.hinweise, konflikt,
      wahl:je.fehler.length?'aus':(konflikt==='eigen'?'ersetzen':konflikt==='mitgeliefert'?'kopie':'neu')};
  });
  renderImport();
}
function renderImport(){
  const st=state, v=st.vorschau;
  const zaehl=(s,f)=>{ const p=Array.isArray(s&&s.punkte)?s.punkte:[]; return p.length+' '+(p.length===1?'Prüfungspunkt':'Prüfungspunkte')+', '+(d=>d+' '+(d===1?'Definition':'Definitionen'))(p.filter(x=>x&&typeof x==='object'&&x.definition).length); };
  const importierbar=v?v.filter(x=>x.wahl!=='aus').length:0;
  app.innerHTML=topbar()+`<h2 class="title">Schemata importieren</h2>
  <p class="sub">Wähle eine Datei, die mit „Exportieren“ erstellt wurde (Endung .json), oder eine Schema-Datei aus dem Ordner <code>schemata</code> (Endung .js). Du kannst den Inhalt auch als Text einfügen, zum Beispiel aus einer Nachricht.</p>
  <div class="dropzone" id="importzone">
    <label class="btn primary">Datei auswählen<input id="importdatei" type="file" accept=".json,.js,application/json,text/javascript,text/plain" multiple hidden></label>
    <span class="dropsub">oder hierher ziehen</span>
  </div>
  <div class="feld"><label for="importtext">Oder Text hier einfügen</label><textarea id="importtext" rows="4" placeholder='{ "format": "schema-trainer-import", "schemata": [ … ] }'>${esc(st.text)}</textarea></div>
  <div class="actions"><button class="btn" data-act="i-text">Text prüfen</button></div>
  ${st.fehler.length?`<div class="befundbox bad"><ul class="befunde">${st.fehler.map(f=>`<li class="befund fehler"><span class="art">Fehler</span><div><p>${esc(f)}</p></div></li>`).join('')}</ul></div>`:''}
  ${v?(v.length?`<h3>Gefunden: ${v.length} ${v.length===1?'Schema':'Schemata'}</h3><ul class="dateien">${v.map((x,i)=>{
      const s=x.schema||{}, lage=x.fehler.length?'bad':x.hinweise.length?'warn':'ok';
      const titel=typeof s.titel==='string'&&s.titel?s.titel:'(ohne Titel)';
      let wahl='';
      if(x.fehler.length) wahl='<span class="info">Kann nicht importiert werden, siehe Fehler.</span>';
      else if(x.konflikt==='eigen') wahl=`<label class="wahl">Du hast schon ein eigenes Schema mit der Kennung „${esc(s.id)}“: <select data-wahl="${i}"><option value="ersetzen"${x.wahl==='ersetzen'?' selected':''}>Vorhandenes ersetzen</option><option value="kopie"${x.wahl==='kopie'?' selected':''}>Zusätzlich als Kopie anlegen</option><option value="aus"${x.wahl==='aus'?' selected':''}>Überspringen</option></select></label>`;
      else if(x.konflikt==='mitgeliefert') wahl=`<label class="wahl">Die Kennung „${esc(s.id)}“ gehört einem mitgelieferten Schema: <select data-wahl="${i}"><option value="kopie"${x.wahl==='kopie'?' selected':''}>Als eigenes Schema mit neuer Kennung anlegen</option><option value="ersetzen"${x.wahl==='ersetzen'?' selected':''}>Mitgeliefertes Schema durch dieses ersetzen</option><option value="aus"${x.wahl==='aus'?' selected':''}>Überspringen</option></select></label>`;
      else wahl=`<label class="wahl"><input type="checkbox" data-wahl="${i}"${x.wahl!=='aus'?' checked':''}> Importieren</label>`;
      return `<li class="datei ${lage}"><div class="datei-kopf"><span class="sym" aria-hidden="true">${lage==='bad'?'✗':lage==='warn'?'!':'✓'}</span><span class="name">${esc(titel)}${typeof s.norm==='string'&&s.norm?' <span class="info">('+esc(s.norm)+')</span>':''}</span><span class="info">${zaehl(s)}${x.herkunft?' · Herkunft: '+esc(x.herkunft):''}${x.datei&&st.dateien.length+ (st.text.trim()?1:0)>1?' · aus '+esc(x.datei):''}</span></div>
        <div class="datei-wahl">${wahl}</div>
        ${x.fehler.length||x.hinweise.length?`<ul class="befunde">${x.fehler.map(b=>`<li class="befund fehler"><span class="art">Fehler</span><div>${b.ort?`<div class="ort">${esc(b.ort)}</div>`:''}<p>${esc(b.text)}</p>${b.tipp?`<p class="tipp">Tipp: ${esc(b.tipp)}</p>`:''}</div></li>`).join('')}${x.hinweise.map(b=>`<li class="befund hinweis"><span class="art">Hinweis</span><div>${b.ort?`<div class="ort">${esc(b.ort)}</div>`:''}<p>${esc(b.text)}</p></div></li>`).join('')}</ul>`:''}
      </li>`;}).join('')}</ul>
    <div class="controls flach"><button class="btn" data-act="i-leeren">Auswahl verwerfen</button><button class="btn primary" data-act="i-ausfuehren"${importierbar?'':' disabled'}>${importierbar===1?'1 Schema importieren':importierbar+' Schemata importieren'}</button></div>`
    :'<p class="sub">In den Dateien wurde kein Schema gefunden.</p>'):''}
  ${speicherFehler?`<div class="hinweisbox" role="alert">${esc(speicherFehler)}</div>`:''}`;
}
function importAusfuehren(){
  const st=state, v=st.vorschau; if(!v) return;
  const jetzt=heute(); let n=0; const ids=bekannteIds(); const namen=[];
  v.forEach(x=>{
    if(x.wahl==='aus'||x.fehler.length) return;
    const s=JSON.parse(JSON.stringify(x.schema));
    if(x.wahl==='kopie') s.id=freieId(s.id, ids);
    ids.add(s.id);
    const alt=eintrag(s.id);
    if(alt){ alt.schema=s; alt.geaendert=jetzt; if(x.herkunft) alt.herkunft=x.herkunft; }
    else eintraege.push({schema:s, erstellt:jetzt, geaendert:jetzt, herkunft:x.herkunft||''});
    n++; namen.push(s.titel);
  });
  if(!speichere()){ renderImport(); return; }
  bereiteSchemataVor(); state=null; renderHome(); window.scrollTo(0,0);
  meldung(n===1?'Ein Schema importiert: '+namen[0]+'.':n+' Schemata importiert: '+namen.join(', ')+'.');
}

/* ---------- Export ---------- */
function exportStart(){ verlauf=[]; state={kind:'export', herkunft:'', text:''}; renderExport(); window.scrollTo(0,0); }
function renderExport(){
  const st=state;
  const alle=typeof SCHEMAS!=='undefined'?SCHEMAS:[];
  const eigene=alle.filter(s=>s.eigen), mitgelieferte=alle.filter(s=>!s.eigen);
  const zeile=(s,an)=>`<li><label class="wahl"><input type="checkbox" data-export="${esc(s.id)}"${an?' checked':''}> <span>${esc(s.title)}${s.norm?' <span class="info">('+esc(s.norm)+')</span>':''}</span></label></li>`;
  app.innerHTML=topbar()+`<h2 class="title">Schemata exportieren</h2>
  <p class="sub">Die Export-Datei kannst du weitergeben, zum Beispiel per Nachricht oder E-Mail. Wer sie bekommt, holt sie über „Importieren“ in seinen Schema-Trainer. Dein Lernstand ist nicht enthalten.</p>
  ${eigene.length?`<h3>Eigene Schemata</h3><ul class="auswahl">${eigene.map(s=>zeile(s,true)).join('')}</ul>`:'<p class="sub">Du hast noch keine eigenen Schemata. Du kannst aber mitgelieferte Schemata exportieren.</p>'}
  ${mitgelieferte.length?`<details class="auswahlbox"${eigene.length?'':' open'}><summary>Mitgelieferte Schemata (${mitgelieferte.length})</summary><ul class="auswahl">${mitgelieferte.map(s=>zeile(s,!eigene.length)).join('')}</ul></details>`:''}
  <div class="feld"><label for="x-herkunft">Herkunft (freiwillig, erscheint beim Empfänger)</label><input type="text" id="x-herkunft" value="${esc(st.herkunft)}" placeholder="z. B. dein Name, die Quelle oder der Rechtsstand" autocomplete="off"></div>
  <div class="controls flach">
    <button class="btn" data-act="x-kopieren">Als Text kopieren</button>
    ${navigator.share?'<button class="btn" data-act="x-teilen">Teilen</button>':''}
    <button class="btn primary" data-act="x-datei">Datei herunterladen</button>
  </div>
  <div id="x-ausgabe" aria-live="polite">${st.text?`<p class="sub">${esc(st.hinweis||'')}</p><textarea id="x-text" rows="10" readonly>${esc(st.text)}</textarea>`:''}</div>`;
}
function exportDaten(){
  const ids=Array.from(app.querySelectorAll('[data-export]:checked')).map(el=>el.dataset.export);
  const herkunft=(app.querySelector('#x-herkunft')||{value:''}).value.trim();
  const alle=typeof SCHEMAS!=='undefined'?SCHEMAS:[];
  const schemata=ids.map(id=>alle.find(s=>s.id===id)).filter(Boolean).map(s=>{
    const r=JSON.parse(JSON.stringify(s.roh||{}));
    const ei=eintrag(s.id);
    const out={datei:s.id+'.js'};
    const h=herkunft||(ei&&ei.herkunft)||'';
    if(h) out.herkunft=h;
    ['id','norm','titel','gebiet','gruppe','gliederung','punkte'].forEach(k=>{ if(r[k]!==undefined) out[k]=r[k]; });
    return out;
  });
  if(!schemata.length) return null;
  const daten={format:FORMAT, version:1, app:'Schema-Trainer', exportiert:heute(), schemata};
  const name=schemata.length===1?schemata[0].id+'.json':'schema-trainer-export-'+heute()+'.json';
  return {text:JSON.stringify(daten,null,2), name, anzahl:schemata.length};
}
function exportMeldung(text){ const z=app.querySelector('#x-ausgabe'); if(z) z.innerHTML=`<p class="sub">${esc(text)}</p>`; }
async function exportAktion(art){
  const d=exportDaten();
  if(!d){ exportMeldung('Bitte mindestens ein Schema auswählen.'); return; }
  if(art==='datei'){
    const blob=new Blob([d.text],{type:'application/json'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download=d.name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    exportMeldung('Datei „'+d.name+'“ wird heruntergeladen ('+d.anzahl+' '+(d.anzahl===1?'Schema':'Schemata')+').');
  } else if(art==='teilen'){
    try{
      const datei=new File([d.text],d.name,{type:'application/json'});
      if(navigator.canShare&&navigator.canShare({files:[datei]})) await navigator.share({files:[datei], title:'Schema-Trainer: '+d.anzahl+' '+(d.anzahl===1?'Schema':'Schemata')});
      else await navigator.share({title:'Schema-Trainer', text:d.text});
    }catch(err){ if(err&&err.name!=='AbortError') exportMeldung('Teilen hat nicht geklappt. Lade stattdessen die Datei herunter.'); }
  } else {
    let ok=false;
    try{ if(navigator.clipboard&&navigator.clipboard.writeText){ await navigator.clipboard.writeText(d.text); ok=true; } }catch(err){}
    if(ok){ exportMeldung('Text kopiert ('+d.anzahl+' '+(d.anzahl===1?'Schema':'Schemata')+'). Du kannst ihn jetzt einfügen, zum Beispiel in eine Nachricht.'); }
    else{
      state.text=d.text; state.hinweis='Automatisches Kopieren war nicht möglich. Markiere den Text und kopiere ihn von Hand.'; renderExport();
      const t=app.querySelector('#x-text'); if(t){ t.focus(); t.select(); }
    }
  }
}

/* ---------- Oberfläche für die Startseite ---------- */
// Werkzeugleiste unter der Fälligkeitsanzeige
function werkzeuge(){
  const nurEigene=!!window.NUR_EIGENE;
  return `<section class="werkzeuge" aria-label="Eigene Schemata">
    <button class="btn" data-act="e-start">Neues Schema</button>
    <button class="btn" data-act="i-start">Importieren</button>
    <button class="btn" data-act="x-start">Exportieren</button>
  </section>
  <p class="werkzeuge-hinweis">${nurEigene
    ?'Hier siehst du nur deine eigenen Schemata. <a href="index.html">Zu den mitgelieferten Europarecht-Schemata</a>.'
    :'Eigene Schemata erscheinen in der Übersicht neben den mitgelieferten. <a href="eigene.html">Leere Umgebung nur mit eigenen Schemata</a>.'}</p>`;
}
// Startseite ohne ein einziges Schema (eigene.html, solange noch nichts angelegt ist)
function leerHinweis(){
  return `<section class="leer">
    <h2>Deine eigene Umgebung</h2>
    <p>Hier ist noch kein Schema. Lege dein erstes Prüfungsschema an: zuerst den Aufbau, dann die Definitionen. Oder importiere Schemata, die jemand mit dir geteilt hat. Alles wird nur in diesem Browser gespeichert.</p>
    <div class="actions"><button class="btn primary" data-act="e-start">Erstes Schema anlegen</button><button class="btn" data-act="i-start">Importieren</button></div>
    <p class="werkzeuge-hinweis">${window.NUR_EIGENE?'Die mitgelieferten Europarecht-Schemata findest du unter <a href="index.html">index.html</a>.':''}</p>
  </section>`;
}
// Zusatz für die Schema-Karte auf der Startseite
function karteZusatz(s){
  if(!s.eigen) return {tag:'', hinweis:'', knopf:''};
  return {tag:'<span class="tag">Eigenes Schema</span>', hinweis:s.ersetzt?' Deine Fassung ersetzt das mitgelieferte Schema.':'', knopf:`<button class="btn" data-act="e-bearbeiten" data-id="${esc(s.id)}">Bearbeiten</button>`};
}
// Link in der Ansicht eines Schemas
function ansichtLink(s){
  return s.eigen?`<button class="linkbtn" data-act="e-bearbeiten" data-id="${esc(s.id)}">Bearbeiten</button>`
    :`<button class="linkbtn" data-act="e-bearbeiten" data-id="${esc(s.id)}">Als eigene Fassung bearbeiten</button>`;
}

/* ---------- Ereignisse ---------- */
// Wird aus dem Klick-Handler in js/app.js aufgerufen; true = hier erledigt
function aktion(act, b){
  const e=state&&state.kind==='edit'?state.e:null;
  const i=b.dataset.i!==undefined?+b.dataset.i:-1;
  switch(act){
    case 'e-start': editorStart(null,{}); return true;
    case 'e-bearbeiten': editorFuer(b.dataset.id); return true;
    case 'e-entwurf-weg': { if(!e) return true; const id=e.id, kopieVon=e.kopieVon; entwurfLoeschen(); const ei=id?eintrag(id):null; const s=!ei&&id?byId(id):null; editorStart(ei?ei.schema:(s?s.roh:null),{id:id||null,kopieVon,ohneEntwurf:true}); return true; }
    case 'e-schritt': {
      if(!e) return true; const n=+b.dataset.n;
      if(n===2&&e.schritt===1){ const erg=schritt1Pruefen(); if(erg.fehler.length){ e.befunde=erg; renderEditor(); return true; } }
      if(e.schritt===1) lesePunkttexte(); else leseDefinition();
      e.offen=-1; e.befunde=null; e.schritt=n; entwurfSichern(); renderEditor(); window.scrollTo(0,0); return true;
    }
    case 'e-weiter': { if(!e) return true; const erg=schritt1Pruefen(); if(erg.fehler.length){ e.befunde=erg; renderEditor(); const box=app.querySelector('.befundbox'); if(box) box.scrollIntoView({block:'start',behavior:reduceMotion()?'auto':'smooth'}); return true; } e.befunde=null; e.schritt=2; entwurfSichern(); renderEditor(); window.scrollTo(0,0); return true; }
    case 'e-neu': strukturAendern(ed=>{ const letzte=ed.punkte[ed.punkte.length-1]; ed.punkte.push(neuerPunkt(letzte?letzte.ebene:0,'')); ed.fokus=ed.punkte.length-1; }); return true;
    case 'e-weg': strukturAendern(ed=>{ if(ed.punkte.length>1){ ed.punkte.splice(i,1); ed.fokus=Math.max(0,i-1); ed.fokusEnde=true; } }); return true;
    case 'e-ein': strukturAendern(ed=>{ const ende=blockEnde(ed.punkte,i); const tiefste=Math.max(...ed.punkte.slice(i,ende).map(p=>p.ebene)); if(tiefste+1<ed.gliederung.length) for(let k=i;k<ende;k++) ed.punkte[k].ebene++; ed.fokus=i; }); return true;
    case 'e-aus': strukturAendern(ed=>{ const ende=blockEnde(ed.punkte,i); if(ed.punkte[i].ebene>0) for(let k=i;k<ende;k++) ed.punkte[k].ebene--; ed.fokus=i; }); return true;
    case 'e-hoch': strukturAendern(ed=>{
      const p=ed.punkte, l=p[i].ebene, ende=blockEnde(p,i);
      let k=i-1; while(k>=0&&p[k].ebene>l) k--;
      if(k<0||p[k].ebene!==l) return;
      const block=p.splice(i,ende-i); p.splice(k,0,...block); ed.fokus=k;
    }); return true;
    case 'e-runter': strukturAendern(ed=>{
      const p=ed.punkte, l=p[i].ebene, ende=blockEnde(p,i);
      if(ende>=p.length||p[ende].ebene!==l) return;
      const ende2=blockEnde(p,ende);
      const block=p.splice(i,ende-i); const neu=i+(ende2-ende); p.splice(neu,0,...block); ed.fokus=neu;
    }); return true;
    case 'e-rueckgaengig': { if(!e||!e.rueckgaengig) return true; lesePunkttexte(); e.punkte=e.rueckgaengig; e.rueckgaengig=null; normalisiere(e.punkte,e.gliederung); entwurfSichern(); renderEditor(); return true; }
    case 'e-mehrere': { if(!e) return true; lesePunkttexte(); e.mehrereOffen=!e.mehrereOffen; renderEditor(); if(e.mehrereOffen){ const t=app.querySelector('#e-mehrtext'); if(t) t.focus(); } return true; }
    case 'e-mehrere-ok': { if(!e) return true; const t=app.querySelector('#e-mehrtext'); const neue=punkteAusText(t?t.value:''); if(!neue.length){ return true; } strukturAendern(ed=>{ if(ed.punkte.length===1&&!ed.punkte[0].punkt.trim()) ed.punkte=[]; ed.punkte.push(...neue); ed.mehrereOffen=false; }); return true; }
    case 'e-def': { if(!e) return true; leseDefinition(); e.offen=i; e.fokusDef=true; e.scrollDef=true; e.befunde=null; renderEditor(); return true; }
    case 'e-def-zu': { if(!e) return true; leseDefinition(); e.offen=-1; entwurfSichern(); renderEditor(); return true; }
    case 'e-def-weg': { if(!e) return true; e.punkte[i].definition=null; e.offen=-1; entwurfSichern(); renderEditor(); return true; }
    case 'e-speichern': speichereEditor(); return true;
    case 'e-loeschen': { if(!e) return true; if(e.loeschenArmiert) loescheSchema(e.id); else { leseDefinition(); e.loeschenArmiert=true; renderEditor(); } return true; }
    case 'i-start': importStart(); return true;
    case 'i-text': { const t=app.querySelector('#importtext'); state.text=t?t.value:''; importVorschau(); return true; }
    case 'i-leeren': importStart(); return true;
    case 'i-ausfuehren': importAusfuehren(); return true;
    case 'x-start': exportStart(); return true;
    case 'x-datei': exportAktion('datei'); return true;
    case 'x-teilen': exportAktion('teilen'); return true;
    case 'x-kopieren': exportAktion('kopieren'); return true;
  }
  return false;
}
// Eingaben im Editor laufend übernehmen (ohne neu zu zeichnen, damit der Cursor bleibt)
document.addEventListener('input',ev=>{
  if(!state) return;
  const t=ev.target;
  if(state.kind==='edit'){
    const e=state.e;
    if(t.dataset.feld==='titel') e.titel=t.value;
    else if(t.dataset.feld==='norm') e.norm=t.value;
    else if(t.dataset.feld==='gruppe') e.gruppe=t.value;
    else if(t.dataset.feld==='gebiet') e.gebiet=t.value;
    else if(t.classList.contains('ptext')){ const i=+t.dataset.i; if(e.punkte[i]) e.punkte[i].punkt=t.value; }
    else if(t.dataset.dfeld){ leseDefinition(); }
    else return;
    if(e.loeschenArmiert){ e.loeschenArmiert=false; }
    clearTimeout(entwurfTimer); entwurfTimer=setTimeout(entwurfSichern,400);
  } else if(state.kind==='import'&&t.id==='importtext'){ state.text=t.value; }
  else if(state.kind==='export'&&t.id==='x-herkunft'){ state.herkunft=t.value; }
});
let entwurfTimer=0;
document.addEventListener('change',ev=>{
  if(!state) return;
  const t=ev.target;
  if(state.kind==='edit'&&t.dataset.feld==='gliederung'){
    const e=state.e, g=GLIEDERUNGEN[+t.value]; if(!g) return;
    lesePunkttexte(); e.gliederung=g.zeichen.slice(); normalisiere(e.punkte,e.gliederung); entwurfSichern(); renderEditor();
  } else if(state.kind==='edit'&&t.dataset.dfeld==='verweis'){ leseDefinition(); }
  else if(state.kind==='import'&&t.dataset.wahl!==undefined){
    const x=state.vorschau&&state.vorschau[+t.dataset.wahl]; if(!x) return;
    x.wahl=t.type==='checkbox'?(t.checked?'neu':'aus'):t.value; renderImport();
  } else if(state.kind==='import'&&t.id==='importdatei'){
    const files=Array.from(t.files||[]); t.value=''; importDateien(files);
  }
});
// Tastatur im Editor: Enter legt den nächsten Punkt an, Rücktaste in einem leeren Punkt löscht ihn
document.addEventListener('keydown',ev=>{
  if(!state||state.kind!=='edit'||state.e.schritt!==1) return;
  const t=ev.target; if(!t.classList||!t.classList.contains('ptext')) return;
  const i=+t.dataset.i;
  if(ev.key==='Enter'){ ev.preventDefault(); strukturAendern(ed=>{ const ende=blockEnde(ed.punkte,i); ed.punkte.splice(ende,0,neuerPunkt(ed.punkte[i].ebene,'')); ed.fokus=ende; }); }
  else if(ev.key==='Backspace'&&t.value===''&&state.e.punkte.length>1){ ev.preventDefault(); strukturAendern(ed=>{ ed.punkte.splice(i,1); ed.fokus=Math.max(0,i-1); ed.fokusEnde=true; }); }
});
// Dateien auf die Importfläche ziehen
document.addEventListener('dragover',ev=>{ if(state&&state.kind==='import'){ ev.preventDefault(); const z=ev.target.closest&&ev.target.closest('#importzone'); if(z) z.classList.add('over'); } });
document.addEventListener('dragleave',ev=>{ const z=ev.target.closest&&ev.target.closest('#importzone'); if(z) z.classList.remove('over'); });
document.addEventListener('drop',ev=>{
  if(!state||state.kind!=='import') return;
  ev.preventDefault();
  const z=app.querySelector('#importzone'); if(z) z.classList.remove('over');
  const files=Array.from(ev.dataTransfer&&ev.dataTransfer.files||[]).filter(f=>/\.(json|js|txt)$/i.test(f.name)||!/\./.test(f.name));
  if(files.length) importDateien(files);
});

lade();
return {lade, rohListe, istEigen, eintrag, werkzeuge, leerHinweis, karteZusatz, ansichtLink, aktion, leseImportText, pruefeSchemata, punkteAusText, KEY_EIGENE, KEY_ENTWURF};
})();

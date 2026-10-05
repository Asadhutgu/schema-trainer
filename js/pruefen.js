/*
  Schema-Trainer – Prüfseite (pruefen.html)

  Lädt die Schema-Dateien im Browser, wendet die Regeln aus tools/pruefung.js an
  und zeigt die Befunde verständlich an. Keine Installation nötig, keine juristischen Inhalte.

  Drei Wege, an die Dateien zu kommen:
  1. Die Seite liegt auf einem Webserver (GitHub Pages, lokaler Server): Die Dateien werden
     als Text geholt und ausgeführt. Fehler kommen mit Zeilennummer.
  2. Die Seite wurde per Doppelklick geöffnet (file://): Text holen ist dann nicht erlaubt,
     die Dateien werden wie in der App als <script> geladen. Fehler kommen je nach Browser
     ohne Zeilennummer.
  3. Der Nutzer zieht den Ordner schemata (oder einzelne Dateien) auf das Feld unten:
     Die Dateien werden direkt gelesen, mit Zeilennummer, und es lässt sich prüfen,
     ob jede Datei im Ordner eingetragen ist.
*/
(function(){
'use strict';
const P=window.SchemaPruefung;
const $=s=>document.querySelector(s);
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const status=$('#status'), ausgabe=$('#befunde');
if(!P){
  status.className='status bad';
  status.innerHTML='<p class="score">Prüfung nicht möglich</p><p>Die Datei tools/pruefung.js fehlt oder konnte nicht geladen werden.</p>';
  return;
}
const LISTE=P.LISTE;
// Zum Ausprobieren des Doppelklick-Wegs auf einem Server: pruefen.html?script
const perScript=location.protocol==='file:'||/[?&]script\b/.test(location.search);
const reduceMotion=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let letzteListe=null;

/* ---------- Eine Datei ausführen und dabei Fehler einfangen ----------
   global: "SCHEMATA" (Schema-Datei) oder "SCHEMA_DATEIEN" (liste.js).
   Ergebnis: {ok, wert, fehler}; ok=false heißt: Datei nicht gefunden. */
function fuehreAus(src, global){
  return new Promise(resolve=>{
    const alt=window[global];
    window[global]=global==='SCHEMATA'?[]:undefined;
    let gefangen=null;
    const onError=e=>{ if(!gefangen) gefangen={text:e.message||'', zeile:e.lineno||0}; };
    window.addEventListener('error',onError);
    const s=document.createElement('script');
    const fertig=ok=>{
      window.removeEventListener('error',onError); s.remove();
      const wert=window[global]; window[global]=alt;
      resolve({ok, wert, fehler:normalisiere(gefangen)});
    };
    s.onload=()=>fertig(true);
    s.onerror=()=>fertig(false);
    s.src=src;
    document.head.appendChild(s);
  });
}
// Manche Browser verstecken Einzelheiten hinter "Script error." – dann wenigstens sagen, dass etwas nicht stimmt
function normalisiere(f){
  if(!f) return null;
  if(!f.text||/^Script error\.?$/.test(f.text)) return {text:'', zeile:0, unklar:true};
  return {text:f.text.replace(/^Uncaught\s+/,''), zeile:f.zeile};
}
async function fuehreTextAus(text, global){
  const url=URL.createObjectURL(new Blob([text],{type:'text/javascript'}));
  try{ return await fuehreAus(url, global); }
  finally{ URL.revokeObjectURL(url); }
}
const istDateiname=n=>typeof n==='string'&&P.DATEINAME.test(n)&&n!==LISTE;
function eintrag(name, d){
  if(!d.ok) return {name, status:'fehlt'};
  if(d.fehler) return {name, status:'fehler', fehler:d.fehler};
  return {name, status:'ok', schemata:Array.isArray(d.wert)?d.wert:[]};
}

/* ---------- Weg 1 und 2: Dateien neben dieser Seite ---------- */
async function holeText(pfad){
  try{ const r=await fetch(pfad+'?t='+Date.now(),{cache:'no-store'}); return r.ok?await r.text():null; }
  catch(e){ return null; }
}
async function ladeNebenSeite(name, global){
  if(perScript) return fuehreAus('schemata/'+name, global);
  const text=await holeText('schemata/'+name);
  return text===null?{ok:false}:fuehreTextAus(text, global);
}
async function quelleNebenSeite(){
  const q={art:'seite', liste:undefined, listeFehler:null, vorhanden:null, dateien:[], hinweis:''};
  const r=await ladeNebenSeite(LISTE,'SCHEMA_DATEIEN');
  if(!r.ok) q.listeFehler={text:'Datei nicht gefunden'};
  else if(r.fehler) q.listeFehler=r.fehler;
  else q.liste=r.wert;
  if(Array.isArray(q.liste)){
    letzteListe=q.liste;
    for(const name of q.liste){
      if(!istDateiname(name)) continue; // meldet die Regelprüfung
      q.dateien.push(eintrag(name, await ladeNebenSeite(name,'SCHEMATA')));
    }
  }
  return q;
}

/* ---------- Weg 3: Ordner oder Dateien vom Nutzer ---------- */
// Nur Dateien aus einem Ordner "schemata" oder direkt abgelegte Dateien zählen
function istSchemaDatei(f){ return /\.js$/i.test(f.name)&&(/(^|\/)schemata\//.test(f.pfad)||!f.pfad.includes('/')); }
async function quelleAusDateien(files){
  const relevant=files.filter(istSchemaDatei);
  const q={art:'ordner', anzahl:relevant.length, liste:undefined, listeFehler:null, vorhanden:relevant.map(f=>f.name), dateien:[], hinweis:''};
  if(!relevant.length){ q.vorhanden=null; q.hinweis='Darin war keine Schema-Datei (Endung .js) zu finden.'; return q; }
  const texte=new Map();
  for(const f of relevant){ try{ texte.set(f.name, await f.file.text()); }catch(e){ texte.set(f.name, null); } }
  if(texte.has(LISTE)){
    const r=texte.get(LISTE)===null?{fehler:{text:'Datei konnte nicht gelesen werden'}}:await fuehreTextAus(texte.get(LISTE),'SCHEMA_DATEIEN');
    if(r.fehler) q.listeFehler=r.fehler; else q.liste=r.wert;
  } else if(letzteListe){
    q.liste=letzteListe;
    q.hinweis='Die Datei liste.js war nicht dabei; verwendet wurde die Liste, die diese Seite beim Öffnen geladen hat.';
  } else {
    q.vorhanden=null;
    q.hinweis='Ohne liste.js lässt sich nicht prüfen, ob die Dateien eingetragen sind; geprüft wurde nur der Inhalt.';
  }
  // Ganzer Ordner (liste.js dabei): alle eingetragenen Dateien erwarten. Sonst: nur die abgelegten Dateien prüfen.
  q.vollstaendig=texte.has(LISTE);
  const namen=[];
  if(q.vollstaendig&&Array.isArray(q.liste)) for(const n of q.liste) if(istDateiname(n)&&!namen.includes(n)) namen.push(n);
  for(const n of texte.keys()) if(n!==LISTE&&!namen.includes(n)) namen.push(n);
  for(const name of namen){
    if(!texte.has(name)){ q.dateien.push({name, status:'fehlt'}); continue; }
    const t=texte.get(name);
    if(t===null){ q.dateien.push({name, status:'fehler', fehler:{text:'Datei konnte nicht gelesen werden'}}); continue; }
    q.dateien.push(eintrag(name, await fuehreTextAus(t,'SCHEMATA')));
  }
  return q;
}
// Abgelegte Einträge (Dateien und Ordner) einsammeln
function sammle(entries){
  const out=[], AUSLASSEN=['.git','node_modules'];
  const lies=(entry,pfad)=>new Promise(res=>{
    if(entry.isFile){ entry.file(f=>{ out.push({name:entry.name, pfad:pfad+entry.name, file:f}); res(); }, ()=>res()); }
    else if(entry.isDirectory&&!AUSLASSEN.includes(entry.name)){
      const reader=entry.createReader(), alle=[];
      const weiter=()=>reader.readEntries(async es=>{
        if(es.length){ alle.push(...es); weiter(); }
        else { for(const e of alle) await lies(e, pfad+entry.name+'/'); res(); }
      }, ()=>res());
      weiter();
    } else res();
  });
  return entries.reduce((p,e)=>p.then(()=>lies(e,'')), Promise.resolve()).then(()=>out);
}

/* ---------- Anzeige ---------- */
function zeigeLaeuft(){ status.className='status'; status.innerHTML='<p class="score">Prüfung läuft …</p>'; }
function anzahl(n, eins, mehr){ return n+' '+(n===1?eins:mehr); }
function zeige(q, erg){
  const {befunde, statistik}=erg;
  const nF=befunde.filter(b=>b.art==='fehler').length, nH=befunde.length-nF;
  const klasse=nF?'bad':nH?'warn':'ok';
  const titel=nF?anzahl(nF,'Fehler gefunden','Fehler gefunden'):nH?'Keine Fehler, aber '+anzahl(nH,'Hinweis','Hinweise'):'Alles in Ordnung';
  const zahlen=anzahl(statistik.schemata,'Schema','Schemata')+', '+anzahl(statistik.punkte,'Prüfungspunkt','Prüfungspunkte')+', '+anzahl(statistik.definitionen,'Definition','Definitionen')+' geprüft.';
  const woher=q.art==='ordner'?'Quelle: '+anzahl(q.anzahl,'Datei','Dateien')+' aus dem ausgewählten Ordner.':'Quelle: die Dateien im Ordner schemata neben dieser Seite.';
  const weiter=q.art==='ordner'?'Nach einer Änderung den Ordner erneut hierher ziehen.':'Nach einer Änderung an einer Datei diese Seite neu laden.';
  status.className='status '+klasse;
  status.innerHTML=`<p class="score">${esc(titel)}</p><p>${esc(zahlen)} ${esc(woher)}${q.hinweis?' '+esc(q.hinweis):''}</p><p class="muted">${esc(weiter)}</p>`;

  // Befunde je Datei gruppieren; Reihenfolge: liste.js, dann die Dateien in Listenreihenfolge
  const gruppen=new Map(), reihenfolge=[];
  const add=d=>{ if(!gruppen.has(d)){ gruppen.set(d,[]); reihenfolge.push(d); } };
  if(q.liste!==undefined||q.listeFehler) add('schemata/'+LISTE);
  q.dateien.forEach(d=>add('schemata/'+d.name));
  befunde.forEach(b=>{ add(b.datei); gruppen.get(b.datei).push(b); });

  ausgabe.innerHTML='<ul class="dateien">'+reihenfolge.map(datei=>{
    const bs=gruppen.get(datei), f=bs.filter(b=>b.art==='fehler').length, h=bs.length-f;
    const d=q.dateien.find(x=>'schemata/'+x.name===datei);
    let info='';
    if(f) info=anzahl(f,'Fehler','Fehler')+(h?', '+anzahl(h,'Hinweis','Hinweise'):'');
    else if(h) info=anzahl(h,'Hinweis','Hinweise');
    else if(datei==='schemata/'+LISTE){ if(Array.isArray(q.liste)) info=anzahl(q.liste.length,'Datei eingetragen','Dateien eingetragen'); }
    else if(d&&d.status==='ok'&&d.schemata.length===1&&d.schemata[0]&&typeof d.schemata[0]==='object'){
      const s=d.schemata[0], punkte=Array.isArray(s.punkte)?s.punkte:[];
      const defs=punkte.filter(p=>p&&typeof p==='object'&&p.definition).length;
      info=(typeof s.titel==='string'?s.titel+': ':'')+anzahl(punkte.length,'Prüfungspunkt','Prüfungspunkte')+', '+anzahl(defs,'Definition','Definitionen');
    }
    const sym=f?'✗':h?'!':'✓', lage=f?'bad':h?'warn':'ok';
    const liste=bs.length?'<ul class="befunde">'+bs.map(b=>
      `<li class="befund ${b.art}"><span class="art">${b.art==='fehler'?'Fehler':'Hinweis'}</span><div>${b.ort?`<div class="ort">${esc(b.ort)}</div>`:''}<p>${esc(b.text)}</p>${b.tipp?`<p class="tipp">Tipp: ${esc(b.tipp)}</p>`:''}</div></li>`
    ).join('')+'</ul>':'';
    return `<li class="datei ${lage}"><div class="datei-kopf"><span class="sym" aria-hidden="true">${sym}</span><span class="name">${esc(datei)}</span><span class="info">${esc(info)}</span></div>${liste}</li>`;
  }).join('')+'</ul>';
}

/* ---------- Ereignisse ---------- */
async function pruefeDateien(files){
  zeigeLaeuft();
  const q=await quelleAusDateien(files);
  zeige(q, P.pruefen(q));
  window.scrollTo({top:0, behavior:reduceMotion()?'auto':'smooth'});
}
const zone=$('#dropzone'), input=$('#ordner');
['dragenter','dragover'].forEach(ev=>zone.addEventListener(ev,e=>{ e.preventDefault(); zone.classList.add('over'); }));
['dragleave','drop'].forEach(ev=>zone.addEventListener(ev,e=>{ e.preventDefault(); zone.classList.remove('over'); }));
// Außerhalb des Feldes abgelegte Dateien sollen nicht im Browser geöffnet werden
document.addEventListener('dragover',e=>e.preventDefault());
document.addEventListener('drop',e=>e.preventDefault());
zone.addEventListener('drop',async e=>{
  const items=Array.from(e.dataTransfer.items||[]);
  const entries=items.map(it=>it.webkitGetAsEntry?it.webkitGetAsEntry():null).filter(Boolean);
  const files=entries.length?await sammle(entries):Array.from(e.dataTransfer.files||[]).map(f=>({name:f.name, pfad:f.name, file:f}));
  await pruefeDateien(files);
});
input.addEventListener('change',async()=>{
  const files=Array.from(input.files||[]).map(f=>({name:f.name, pfad:f.webkitRelativePath||f.name, file:f}));
  input.value='';
  await pruefeDateien(files);
});
$('[data-act="neu"]').addEventListener('click',()=>location.reload());

async function start(){
  zeigeLaeuft();
  const q=await quelleNebenSeite();
  zeige(q, P.pruefen(q));
}
// Für die Browserkonsole (F12), etwa zum Ausprobieren: SchemaPruefseite.pruefeDateien([...])
window.SchemaPruefseite={start, pruefeDateien, quelleNebenSeite, quelleAusDateien};
start();
})();

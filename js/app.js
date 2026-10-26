/*
  Schema-Trainer – Programmlogik
  Die Inhalte stehen in schemata/*.js (Format: docs/schema-format.md).
  Eigene Schemata, die Nutzer in der App anlegen oder importieren, verwaltet js/eigene.js
  (muss vor dieser Datei geladen sein); hier werden sie wie die mitgelieferten behandelt.
  Diese Datei enthält keine juristischen Inhalte.
*/
/* ---------- Gliederung berechnen ---------- */
function toRoman(n){const m=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let r='';for(const [v,s] of m){while(n>=v){r+=s;n-=v;}}return r;}
// Gliederungszeichen, wie sie in den Schema-Dateien unter "gliederung" stehen
const NUM={
  'A.':i=>String.fromCharCode(65+i)+'.',
  'I.':i=>toRoman(i+1)+'.',
  '1.':i=>(i+1)+'.',
  'a)':i=>String.fromCharCode(97+i)+')',
  'aa)':i=>{const c=String.fromCharCode(97+i);return c+c+')';}
};
// Stabile Karten-ID aus dem Begriff, damit der Lernstand erhalten bleibt,
// wenn Prüfungspunkte eingefügt oder umsortiert werden
function slug(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}

// Schema-Dateien (deutsche Feldnamen, gesammelt in window.SCHEMATA) in das interne Format überführen.
// Wird aufgerufen, sobald alle Dateien aus schemata/liste.js geladen sind (siehe "Start" am Ende),
// und erneut, wenn eigene Schemata gespeichert, importiert oder gelöscht werden (js/eigene.js).
// Eigene Schemata kommen hinter die mitgelieferten; hat ein eigenes dieselbe id wie ein mitgeliefertes
// (eigene Fassung), ersetzt es das mitgelieferte, und der Lernstand bleibt erhalten.
// Formfehler in den Dateien meldet die Seite pruefen.html; hier wird nur abgefangen, was die App zum Absturz brächte.
let SCHEMAS=[];
function bereiteSchemataVor(){
  const brauchbar=r=>r&&typeof r==='object'&&r.id&&Array.isArray(r.punkte)&&Array.isArray(r.gliederung);
  const eigene=(typeof Eigene!=='undefined'?Eigene.rohListe():[]).filter(brauchbar);
  const eigeneIds=new Set(eigene.map(r=>r.id));
  const mitgelieferte=(window.SCHEMATA||[]).filter(brauchbar);
  const ersetzt=new Set(mitgelieferte.filter(r=>eigeneIds.has(r.id)).map(r=>r.id));
  const roh=mitgelieferte.filter(r=>!eigeneIds.has(r.id)).map(r=>[r,false]).concat(eigene.map(r=>[r,true]));
  SCHEMAS=roh
    .map(([r,eigen])=>({
      id:r.id, norm:r.norm||'', title:r.titel||'', group:typeof r.gruppe==='string'?r.gruppe.trim():'', gebiet:typeof r.gebiet==='string'?r.gebiet.trim():'', bereich:typeof r.bereich==='string'?r.bereich.trim():'', numbering:r.gliederung,
      roh:r, eigen, ersetzt:eigen&&ersetzt.has(r.id),
      steps:r.punkte.filter(p=>p&&typeof p==='object').map(p=>({
        l:Number.isInteger(p.ebene)&&p.ebene>=0?p.ebene:0, t:String(p.punkt||''), ref:typeof p.verweis==='string'?p.verweis.trim():'',
        d:p.definition&&typeof p.definition==='object'?{term:String(p.definition.begriff||''),text:String(p.definition.text||''),src:String(p.definition.quelle||''),key:p.definition.id}:null
      }))
    }));
  SCHEMAS.forEach(s=>{
    const counters=[], stack=[];
    s.steps.forEach((st,i)=>{
      if(st.l>stack.length) st.l=stack.length; // Ebenensprung abfangen
      counters[st.l]=(counters[st.l]===undefined?-1:counters[st.l])+1;
      counters.length=st.l+1;
      st.num=(NUM[s.numbering[st.l]]||NUM['1.'])(counters[st.l]);
      stack[st.l]=i; stack.length=st.l+1;
      st.parent=st.l>0?stack[st.l-1]:null;
      st.path=stack.map(j=>s.steps[j].num).join(' ');
      if(st.d) st.cid=s.id+':'+(st.d.key||slug(st.d.term));
    });
  });
  // Verweise (Feld "verweis") nur behalten, wenn das Zielschema existiert; Fehler meldet pruefen.html
  const ids=new Set(SCHEMAS.map(s=>s.id));
  SCHEMAS.forEach(s=>s.steps.forEach(st=>{if(st.ref&&(!ids.has(st.ref)||st.ref===s.id)) st.ref='';}));
}

/* ---------- Speicher ---------- */
const KEY='schematrainer:v1', DAY=86400000, INTERVALS=[0,1,3,7,16,30];
let store={cards:{},scores:{},lueckentext:{}};
try{const raw=localStorage.getItem(KEY); if(raw){const p=JSON.parse(raw); store={cards:p.cards||{},scores:p.scores||{},lueckentext:p.lueckentext||{}};}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
function card(cid){return store.cards[cid]||{box:0,due:0};}
// Ansicht der Startseite: Reiter "fertig" (mitgelieferte Schemata, unterteilt nach Bereich: Strafrecht,
// Öffentliches Recht, Zivilrecht) oder "eigene" (selbst angelegte und importierte Schemata). Wird im Browser gemerkt.
const KEY_ANSICHT='schematrainer:ansicht:v1';
const BEREICHE=['Strafrecht','Öffentliches Recht','Zivilrecht'];
let ansicht={tab:'fertig', bereich:BEREICHE[0]};
try{const a=JSON.parse(localStorage.getItem(KEY_ANSICHT)||'{}'); if(a.tab==='eigene') ansicht.tab='eigene'; if(typeof a.bereich==='string'&&a.bereich) ansicht.bereich=a.bereich;}catch(e){}
function merkeAnsicht(){try{localStorage.setItem(KEY_ANSICHT,JSON.stringify(ansicht));}catch(e){}}
function waehleTab(t){ansicht.tab=t==='eigene'?'eigene':'fertig'; merkeAnsicht();}
// Fertige Schemata: die mitgelieferten; eine eigene Fassung mit derselben id steht an der Stelle des Originals.
// Eigene Schemata: alles, was in der App angelegt oder importiert wurde (auch eigene Fassungen).
function fertige(){return SCHEMAS.filter(s=>!s.eigen||s.ersetzt);}
function eigene(){return SCHEMAS.filter(s=>s.eigen);}
// Bereiche der fertigen Schemata: die drei festen Reiter zuerst, dann weitere Werte aus den Dateien; '' = ohne Bereich
function bereiche(){
  const out=BEREICHE.slice();
  fertige().forEach(s=>{const b=s.bereich||''; if(!out.includes(b)) out.push(b);});
  return out;
}
function aktiverTab(){return window.NUR_EIGENE?'eigene':ansicht.tab;}
function aktiverBereich(){const b=bereiche(); return b.includes(ansicht.bereich)?ansicht.bereich:b[0];}
// Schemata der gerade gewählten Ansicht; Fälligkeitszahl und "Wiederholen" beziehen sich darauf
function sichtbar(){
  if(aktiverTab()==='eigene') return eigene();
  const b=aktiverBereich();
  return fertige().filter(s=>(s.bereich||'')===b);
}

/* ---------- Helfer ---------- */
const app=document.getElementById('app');
let state=null, ladeHinweis='';
// Verlauf für Verweise: Beim Sprung in ein anderes Schema wird der bisherige Zustand hier abgelegt,
// "Zurück zu …" holt ihn wieder hervor (auch mitten in einer Abfrage).
let verlauf=[];
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduceMotion=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function allCards(only){const out=[];SCHEMAS.forEach(s=>{if(only&&s!==only)return;s.steps.forEach(st=>{if(st.d)out.push({s,st,cid:st.cid});});});return out;}
function findCard(cid){return allCards().find(c=>c.cid===cid);}
function shuffle(a){let b,t=0;do{b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}t++;}while(b.length>1&&b.every((x,k)=>x===a[k])&&t<10);return b;}
function progress(i,n){return `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${i}"><span style="width:${n?(i/n*100):0}%"></span></div>`;}
function topbar(s){
  const z=verlauf.length?verlauf[verlauf.length-1]:null;
  return `<div class="top"><button class="linkbtn" data-act="home">Zur Übersicht</button>${z&&z.s?` <span class="sep">·</span> <button class="linkbtn" data-act="zurueck">Zurück zu „${esc(z.s.title)}“</button>`:''}</div>${s?`<div class="norm">${esc(s.norm)}</div><h2 class="title">${esc(s.title)}</h2>`:''}`;
}
// Knopf für einen Verweis auf ein anderes Schema (Feld "verweis" im Prüfungspunkt)
function verweisBtn(st,modus){
  const z=st.ref?byId(st.ref):null; if(!z) return '';
  return ` <button class="linkbtn verweis" data-act="verweis" data-id="${esc(z.id)}">${modus==='build'?`Schema „${esc(z.title)}“ abfragen`:`Schema „${esc(z.title)}“ ansehen`}</button>`;
}
function defHtml(d,noTerm){return `${noTerm?'':`<div class="term">${esc(d.term)}</div>`}<p>${esc(d.text)}</p><div class="src">${esc(d.src)}</div>`;}
function row(st,o={}){
  const mark=o.mark;
  return `<li class="step${mark?' '+mark:''}" data-l="${st.l}" style="--lvl:${o.flat?0:st.l}"><span class="num">${esc(o.flat?st.path:st.num)}</span><div class="txt">${esc(st.t)}${o.extra||''}</div>${mark?`<span class="mark" aria-label="${mark==='ok'?'gewusst':'nicht gewusst'}">${mark==='ok'?'✓':'✗'}</span>`:''}</li>`;
}
function faelligeKarten(){const now=Date.now(), set=new Set(sichtbar());return allCards().filter(c=>set.has(c.s)&&card(c.cid).due<=now);}
function dueCount(){return faelligeKarten().length;}

/* ---------- Übersicht ---------- */
// Schemata nach dem Feld "gruppe" bündeln; Reihenfolge der Gruppen = erstes Auftreten in schemata/liste.js.
// Schemata ohne Gruppe stehen am Ende unter "Weitere Schemata" (bzw. ohne Überschrift, wenn es gar keine Gruppen gibt).
function gruppiert(liste){
  const out=[], nachName=new Map();
  liste.forEach(s=>{
    const n=s.group||'';
    if(!nachName.has(n)){const g={name:n,schemas:[]};nachName.set(n,g);out.push(g);}
    nachName.get(n).schemas.push(s);
  });
  const ohne=nachName.get('');
  if(ohne&&out.length>1){out.splice(out.indexOf(ohne),1);ohne.name='Weitere Schemata';out.push(ohne);}
  return out;
}
// Abschnitte einer Liste: je Rechtsgebiet (Feld "gebiet") ein Abschnitt mit seinen Gruppen; ohne Rechtsgebiet zuletzt.
// immerUeberschrift: Zwischenüberschrift auch bei nur einem Rechtsgebiet (Reiter der fertigen Schemata)
function abschnitte(liste, immerUeberschrift){
  const out=[], nachGebiet=new Map();
  liste.forEach(s=>{
    const g=s.gebiet||'';
    if(!nachGebiet.has(g)){const a={gebiet:g,schemas:[]};nachGebiet.set(g,a);out.push(a);}
    nachGebiet.get(g).schemas.push(s);
  });
  const ohne=nachGebiet.get('');
  if(ohne&&out.length>1){out.splice(out.indexOf(ohne),1);ohne.gebiet='Weitere Schemata';out.push(ohne);}
  const mitUeberschrift=out.length>1||(immerUeberschrift&&out.length===1&&!!out[0].gebiet);
  return out.map(a=>({gebiet:mitUeberschrift?a.gebiet:'',gruppen:gruppiert(a.schemas)}));
}
function abschnitteHtml(liste, immerUeberschrift){
  return abschnitte(liste, immerUeberschrift).map(a=>`${a.gebiet?`<h2 class="gebiet">${esc(a.gebiet)}</h2>`:''}${a.gruppen.map(g=>`${g.name?`<${a.gebiet?'h3':'h2'} class="gruppe">${esc(g.name)}</${a.gebiet?'h3':'h2'}>`:''}${g.schemas.map(karte).join('')}`).join('')}`).join('');
}
// Reiterleiste: oben "Fertige Schemata" / "Eigene Schemata", darunter die Bereiche der fertigen Schemata
function reiter(liste, aktiv, act, klasse, label){
  return `<nav class="tabs ${klasse}" role="tablist" aria-label="${label}">${liste.map(([wert,text])=>`<button class="tab${wert===aktiv?' aktiv':''}" role="tab" aria-selected="${wert===aktiv}" data-act="${act}" data-w="${esc(wert)}">${esc(text)}</button>`).join('')}</nav>`;
}
function dueHtml(){
  const due=dueCount();
  return `<section class="due">
    <div><strong>${due}</strong>${due===1?'Definition':'Definitionen'} fällig oder neu</div>
    <button class="btn primary" data-act="review"${due?'':' disabled'}>Wiederholen</button>
  </section>`;
}
function karte(s){
  const sc=store.scores[s.id], lz=store.lueckentext[s.id], defs=s.steps.filter(x=>x.d).length;
  const z=Eigene.karteZusatz(s); // Kennzeichnung und Bearbeiten-Knopf für eigene Schemata
  return `<article class="schema${s.eigen?' eigen':''}">
      <div class="norm">${esc(s.norm)}${z.tag}</div>
      <h3>${esc(s.title)}</h3>
      <div class="meta">${s.steps.length} Prüfungspunkte, ${defs} ${defs===1?'Definition':'Definitionen'}${sc?`. Zuletzt im Aufbau ${sc.known} von ${sc.total} gewusst`:''}${lz?`. Zuletzt im Lückentext ${lz.richtig} von ${lz.total} Lücken`:''}.${z.hinweis}</div>
      <div class="actions">
        <button class="btn primary" data-act="build" data-id="${s.id}">Aufbau abfragen</button>
        <button class="btn" data-act="order" data-id="${s.id}">Ordnen</button>
        <button class="btn" data-act="cards" data-id="${s.id}"${defs?'':' disabled'}>Definitionen</button>
        <button class="btn" data-act="cloze" data-id="${s.id}"${defs?'':' disabled'}>Lückentext</button>
        <button class="btn" data-act="view" data-id="${s.id}">Ansehen</button>
        ${z.knopf}
      </div>
    </article>`;
}
function renderHome(){
  state=null; verlauf=[];
  const hinweis=ladeHinweis?`<div class="hinweisbox" role="alert"><strong>Schema-Dateien unvollständig.</strong> ${esc(ladeHinweis)} <a href="pruefen.html">Einzelheiten zeigt die Prüfseite.</a></div>`:'';
  const tab=aktiverTab();
  let inhalt='';
  if(tab==='eigene'){
    // Eigene Schemata: Werkzeuge (Neu, Importieren, Exportieren) und die Liste; ohne eigene Schemata der Einstieg
    const liste=eigene();
    inhalt=liste.length?dueHtml()+Eigene.werkzeuge()+abschnitteHtml(liste,false):Eigene.leerHinweis();
  }else{
    // Fertige Schemata: Reiter je Bereich, darin Abschnitte je Rechtsgebiet und Gruppen
    const b=aktiverBereich(), liste=sichtbar();
    inhalt=reiter(bereiche().map(x=>[x,x||'Weitere Schemata']),b,'bereich','bereiche','Bereich')
      +(liste.length?dueHtml()+abschnitteHtml(liste,true)
        :`<section class="leer"><h2>${esc(b||'Weitere Schemata')}</h2><p>Hier sind noch keine fertigen Schemata enthalten. Du kannst eigene anlegen oder importierte verwenden; sie stehen unter „Eigene Schemata“.</p><div class="actions"><button class="btn primary" data-act="tab" data-w="eigene">Zu den eigenen Schemata</button></div></section>`);
  }
  app.innerHTML=hinweis
    +`<p class="intro">Prüfungsschemata Schritt für Schritt aufbauen, Prüfungspunkte ordnen und Definitionen aktiv abrufen. Dein Lernstand wird in diesem Browser gespeichert.</p>`
    +(window.NUR_EIGENE?'':reiter([['fertig','Fertige Schemata'],['eigene','Eigene Schemata']],tab,'tab','haupt','Schemata'))
    +inhalt;
}

/* ---------- Ansehen ---------- */
function renderView(s){
  state={kind:'view',s};
  app.innerHTML=topbar(s)+`<p class="ansicht-werkzeuge">${Eigene.ansichtLink(s)}</p><ol class="outline" style="margin-top:.6rem">${s.steps.map((st,i)=>row(st,{extra:verweisBtn(st,'view')+(st.d?` <button class="linkbtn" data-act="toggleDef" aria-expanded="false">Definition</button><div class="def" hidden>${defHtml(st.d)}</div>`:'')})).join('')}</ol>`;
}

/* ---------- Aufbau abfragen ---------- */
function startBuild(s){state={kind:'build',s,i:0,revealed:false,showDef:false,results:[]};renderBuild();}
function renderBuild(){
  const {s,i,revealed,showDef,results}=state, n=s.steps.length;
  if(i>=n){
    const known=results.filter(Boolean).length;
    store.scores[s.id]={known,total:n,at:Date.now()}; save();
    const missed=s.steps.filter((st,j)=>!results[j]);
    app.innerHTML=topbar(s)+`<div class="result"><p class="score">${known} von ${n}</p><p>Prüfungspunkten gewusst.</p></div>
      ${missed.length?`<h3>Noch nicht sicher</h3><ol class="outline">${missed.map(st=>row(st,{flat:true})).join('')}</ol>`:'<p>Alle Prüfungspunkte sitzen.</p>'}
      <div class="actions"><button class="btn primary" data-act="build" data-id="${s.id}">Noch einmal</button><button class="btn" data-act="cards" data-id="${s.id}">Definitionen üben</button><button class="btn" data-act="home">Zur Übersicht</button></div>`;
    return;
  }
  const cur=s.steps[i];
  const curTxt=revealed?esc(cur.t):'<span class="placeholder">Welcher Prüfungspunkt folgt?</span>';
  const curDef=revealed&&cur.d?(showDef?`<div class="def">${defHtml(cur.d)}</div>`:` <button class="linkbtn" data-act="showDef">Definition zeigen</button>`):'';
  const curRef=revealed?verweisBtn(cur,'build'):'';
  app.innerHTML=topbar(s)+progress(i,n)+`<ol class="outline">${s.steps.slice(0,i).map((st,j)=>row(st,{mark:results[j]?'ok':'bad'})).join('')}<li class="step current${revealed&&!showDef?' fresh':''}" data-l="${cur.l}" style="--lvl:${cur.l}"><span class="num">${esc(cur.num)}</span><div class="txt">${curTxt}${curRef}${curDef}</div></li></ol>
  <div class="controls">${revealed
    ?`<button class="btn bad" data-act="rateStep" data-v="0">Nicht gewusst</button><button class="btn good" data-act="rateStep" data-v="1">Gewusst</button>`
    :`<button class="btn primary" data-act="reveal">Aufdecken</button>`}</div>
  <p class="hint">${revealed?'Taste 1 für nicht gewusst, 2 für gewusst':'Leertaste deckt auf'}</p>`;
  const c=app.querySelector('.current'); if(c) c.scrollIntoView({block:'center',behavior:reduceMotion()?'auto':'smooth'});
}

/* ---------- Ordnen ---------- */
function startOrder(s){
  const groups=[{parent:null,kids:s.steps.map((st,i)=>i).filter(i=>s.steps[i].l===0)}];
  s.steps.forEach((st,i)=>{const kids=s.steps.map((x,j)=>j).filter(j=>s.steps[j].parent===i);if(kids.length>1)groups.push({parent:i,kids});});
  state={kind:'order',s,groups,r:0,placed:[],errors:0,pool:shuffle(groups[0].kids)};
  renderOrder();
}
function renderOrder(){
  const {s,groups,r,placed,pool,errors}=state;
  if(r>=groups.length){
    app.innerHTML=topbar(s)+`<div class="result"><p class="score">${errors===0?'Fehlerfrei':errors+(errors===1?' Fehlgriff':' Fehlgriffe')}</p><p>${groups.length} Gliederungsebenen geordnet.</p></div>
    <div class="actions"><button class="btn primary" data-act="order" data-id="${s.id}">Noch einmal</button><button class="btn" data-act="build" data-id="${s.id}">Aufbau abfragen</button><button class="btn" data-act="home">Zur Übersicht</button></div>`;
    return;
  }
  const g=groups[r], done=placed.length===g.kids.length;
  const p=g.parent===null?null:s.steps[g.parent];
  const heading=p?`Ordne die Unterpunkte von ${p.path} ${p.t}`:'Ordne die Hauptprüfungspunkte';
  app.innerHTML=topbar(s)+progress(r,groups.length)+`<p class="task">${esc(heading)}</p><ol class="outline">${placed.map(i=>row(s.steps[i],{extra:'',flat:false}).replace(/--lvl:\d/,'--lvl:0')).join('')}</ol>
  ${done?`<div class="controls"><button class="btn primary" data-act="nextRound">${r+1<groups.length?'Nächste Ebene':'Auswerten'}</button></div>`
  :`<p class="sub">Tippe den Punkt an, der als Nächstes kommt.</p><div class="chips">${pool.filter(i=>!placed.includes(i)).map(i=>`<button class="chip" data-act="chip" data-i="${i}">${esc(s.steps[i].t)}</button>`).join('')}</div>`}`;
}

/* ---------- Definitionen (Karteikasten) ---------- */
function startCards(list){
  if(!list.length){renderHome();return;}
  state={kind:'cards',queue:list.map(c=>c.cid),pos:0,revealed:false,mine:'',requeued:new Set(),stats:[0,0,0]};
  renderCards();
}
function renderCards(){
  const st=state;
  if(st.pos>=st.queue.length){
    const [no,part,yes]=st.stats;
    app.innerHTML=topbar()+`<div class="result"><p class="score">${yes} von ${yes+part+no}</p><p>Definitionen gewusst, ${part} teilweise, ${no} nicht gewusst. Karten, die du gewusst hast, kommen erst nach einigen Tagen wieder.</p></div>
    <div class="actions"><button class="btn primary" data-act="home">Zur Übersicht</button></div>`;
    return;
  }
  const {s,st:step,cid}=findCard(st.queue[st.pos]); const c=card(cid);
  app.innerHTML=topbar()+progress(st.pos,st.queue.length)+`<article class="card">
    <div class="ctx">${esc(s.norm)}, ${esc(step.path)}</div>
    <h2 class="prompt">${esc(step.d.term)}</h2>
    <p class="level">${c.box===0?'Neue Karte':'Stufe '+c.box+' von 5'}</p>
    ${st.revealed
      ?(st.mine?`<div class="mine"><span class="lbl">Deine Formulierung</span><p>${esc(st.mine)}</p></div>`:'')+`<div class="def">${defHtml(step.d,true)}</div>`
      :`<label class="lbl" for="mine">Deine Formulierung (optional)</label><textarea id="mine" rows="4" placeholder="Definition aus dem Gedächtnis formulieren"></textarea>`}
  </article>
  <div class="controls">${st.revealed
    ?`<button class="btn bad" data-act="rateCard" data-v="0">Nicht gewusst</button><button class="btn" data-act="rateCard" data-v="1">Teilweise</button><button class="btn good" data-act="rateCard" data-v="2">Gewusst</button>`
    :`<button class="btn primary" data-act="flip">Aufdecken</button>`}</div>
  <p class="hint">${st.revealed?'Tasten 1, 2, 3 bewerten':'Leertaste oder Strg+Enter im Textfeld deckt auf'}</p>`;
}
function rateCard(v){
  const st=state, cid=st.queue[st.pos], c=Object.assign({},card(cid)), now=Date.now();
  if(v===0){c.box=1;c.due=now;if(!st.requeued.has(cid)){st.queue.push(cid);st.requeued.add(cid);}}
  else if(v===1){c.box=Math.max(1,c.box);c.due=now+INTERVALS[c.box]*DAY;}
  else{c.box=Math.min(5,c.box+1);c.due=now+INTERVALS[c.box]*DAY;}
  store.cards[cid]=c; save();
  st.stats[v]++; st.pos++; st.revealed=false; st.mine='';
  renderCards();
}

/* ---------- Lückentext ---------- */
// Schlüsselwörter einer Definition werden zu Lücken; die fehlenden Wörter stehen gemischt darunter
// und werden der Reihe nach angetippt (falsches Wort = Fehlgriff, wie beim Ordnen).
// Der Karteikasten (Stufen) bleibt unberührt; gespeichert wird nur das Ergebnis je Schema.
// Funktionswörter mit mindestens fünf Buchstaben, die nie zur Lücke werden (kürzere fallen ohnehin heraus)
const LZ_STOPP=new Set(('einer eines einem einen dieser dieses diesem diesen diese durch gegen nicht keine keiner keinem keinen sowie sondern zwischen wobei welche welcher welches welchem welchen sofern soweit dessen deren denen ihrer ihres ihrem ihren seiner seines seinem seinen unter werden worden haben hatte können müssen sollen dürfen seine bereits jedoch damit daher somit insbesondere gegenüber innerhalb außerhalb wegen trotz während hierbei dabei dagegen dafür hierzu allein bloße bloßer bloßen bloßes immer stets sowohl weder entweder andere anderen anderer anderes selbst ebenso insoweit zumindest gerade weniger wieder einschließlich aufgrund mittels anhand zudem ferner ebenfalls lediglich jeweils jeweilige jeweiligen hinaus darüber mehrere mehreren etwaige etwaigen solche solcher solches solchen diejenigen derjenige derjenigen denjenigen').split(' '));
function lzKern(tok){return tok.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,'');}
// Lücken für eine Definition wählen. tokens enthält auch die Leerzeichen, damit der Text wieder zusammengesetzt werden kann.
// Kandidaten: Wörter ab fünf Buchstaben außer Funktionswörtern; Großgeschriebenes (Substantive) wird bevorzugt.
function lzLuecken(text){
  const tokens=String(text).split(/(\s+)/), kand=[];
  tokens.forEach((t,i)=>{
    if(/^\s*$/.test(t)) return;
    const k=lzKern(t);
    if(k.length<5||!/\p{L}/u.test(k)||/^\p{N}/u.test(k)||LZ_STOPP.has(k.toLowerCase())) return;
    kand.push({i, wort:k, gewicht:/^\p{Lu}/u.test(k)?2:1});
  });
  if(!kand.length) return {tokens, luecken:[]};
  const n=Math.min(kand.length, Math.max(2, Math.round(kand.length*0.3)), 6);
  const rest=kand.slice(), wahl=[];
  while(wahl.length<n&&rest.length){
    const summe=rest.reduce((a,k)=>a+k.gewicht,0); let r=Math.random()*summe, j=0;
    while(j<rest.length-1&&(r-=rest[j].gewicht)>0) j++;
    wahl.push(rest.splice(j,1)[0]);
  }
  wahl.sort((a,b)=>a.i-b.i);
  return {tokens, luecken:wahl.map(k=>({i:k.i, wort:k.wort}))};
}
// Am PC (Maus) wird getippt, die Wortauswahl ist ausgeblendet; am Handy ist sie von Anfang an sichtbar
const feinerZeiger=()=>!!(window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches);
function lzNorm(w){return String(w).toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,'');}
// Tippfehler-Toleranz: bei Wörtern ab acht Buchstaben darf ein Buchstabe abweichen
function lzAbstand(a,b){
  if(Math.abs(a.length-b.length)>1) return 2;
  let v=Array.from({length:b.length+1},(_,j)=>j);
  for(let i=1;i<=a.length;i++){const n=[i];for(let j=1;j<=b.length;j++)n[j]=Math.min(v[j]+1,n[j-1]+1,v[j-1]+(a[i-1]===b[j-1]?0:1));v=n;}
  return v[b.length];
}
function lzPasst(eingabe,wort){const e=lzNorm(eingabe), w=lzNorm(wort); return e===w||(w.length>=8&&lzAbstand(e,w)<=1);}
function startCloze(s){
  const queue=allCards(s).map(c=>Object.assign({c},lzLuecken(c.st.d.text))).filter(x=>x.luecken.length);
  if(!queue.length){renderHome();return;}
  const tippen=feinerZeiger();
  state={kind:'cloze',s,queue,pos:0,gefuellt:0,pool:[],fehler:0,richtig:0,total:0,aufgedeckt:false,aufgedecktAb:0,tippen,woerter:!tippen};
  lzNeueKarte(); renderCloze();
}
// Getipptes Wort prüfen (Enter im Eingabefeld)
function lzPruefeEingabe(){
  const st=state, k=st.queue[st.pos], inp=app.querySelector('.luecke-eingabe'); if(!inp||st.gefuellt>=k.luecken.length) return;
  if(!inp.value.trim()) return;
  if(lzPasst(inp.value,k.luecken[st.gefuellt].wort)){
    const w=lzNorm(k.luecken[st.gefuellt].wort), j=st.pool.find(x=>lzNorm(k.luecken[x].wort)===w);
    st.pool=st.pool.filter(x=>x!==j); st.richtig++; st.gefuellt++; st.tippen=true; renderCloze();
  } else { st.fehler++; inp.classList.remove('wrong'); void inp.offsetWidth; inp.classList.add('wrong'); inp.select(); }
}
function lzNeueKarte(){
  const st=state, k=st.queue[st.pos];
  st.gefuellt=0; st.aufgedeckt=false; st.aufgedecktAb=0; st.pool=shuffle(k.luecken.map((l,j)=>j)); st.total+=k.luecken.length;
}
function renderCloze(){
  const st=state, s=st.s, n=st.queue.length;
  if(st.pos>=n){
    store.lueckentext[s.id]={richtig:st.richtig,total:st.total,at:Date.now()}; save();
    app.innerHTML=topbar(s)+`<div class="result"><p class="score">${st.richtig} von ${st.total}</p><p>Lücken richtig gefüllt${st.fehler?`, ${st.fehler} ${st.fehler===1?'Fehlgriff':'Fehlgriffe'}`:''}.</p></div>
      <div class="actions"><button class="btn primary" data-act="cloze" data-id="${s.id}">Noch einmal</button><button class="btn" data-act="cards" data-id="${s.id}">Definitionen üben</button><button class="btn" data-act="home">Zur Übersicht</button></div>`;
    return;
  }
  const k=st.queue[st.pos], ks=k.c.s, step=k.c.st, fertig=st.gefuellt>=k.luecken.length;
  const text=k.tokens.map((t,i)=>{
    const j=k.luecken.findIndex(l=>l.i===i);
    if(j<0) return esc(t);
    const l=k.luecken[j], a=t.indexOf(l.wort), vor=t.slice(0,a), nach=t.slice(a+l.wort.length);
    const lage=j<st.gefuellt?((st.aufgedeckt&&j>=st.aufgedecktAb)?' aufgedeckt':' gefuellt'):(j===st.gefuellt?' aktiv':'');
    const inhalt=j<st.gefuellt?esc(l.wort):(j===st.gefuellt
      ?`<input class="luecke-eingabe" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${j+1}" enterkeyhint="done">`
      :`<span class="nr">${j+1}</span>`);
    return esc(vor)+`<span class="luecke${lage}" style="--n:${l.wort.length}">${inhalt}</span>`+esc(nach);
  }).join('');
  app.innerHTML=topbar(s)+progress(st.pos,n)+`<article class="card">
    <div class="ctx">${esc(ks.norm)}, ${esc(step.path)}</div>
    <h2 class="prompt">${esc(step.d.term)}</h2>
    <p class="lueckentext">${text}</p>
    ${fertig?`<div class="src">${esc(step.d.src)}</div>`:''}
  </article>
  ${fertig?`<div class="controls"><button class="btn primary" data-act="lz-weiter">${st.pos+1<n?'Nächste Definition':'Auswerten'}</button></div><p class="hint">Leertaste geht weiter</p>`
  :`<p class="sub">${st.woerter?'Tippe das Wort an, das in die markierte Lücke gehört, oder schreibe es hinein (Enter prüft).':'Schreibe das fehlende Wort in die markierte Lücke und drücke Enter.'}</p>
  ${st.woerter?`<div class="chips woerter">${st.pool.map(j=>`<button class="chip wort" data-act="lz-chip" data-j="${j}">${esc(k.luecken[j].wort)}</button>`).join('')}</div>`:''}
  <p class="loesung"><button class="linkbtn" data-act="lz-woerter">${st.woerter?'Wörter verbergen':'Wörter anzeigen'}</button> <span class="sep">·</span> <button class="linkbtn" data-act="lz-loesung">Lösung zeigen</button></p>`}`;
  if(!fertig&&st.tippen){const inp=app.querySelector('.luecke-eingabe'); if(inp) inp.focus({preventScroll:true});}
}

/* ---------- Ereignisse ---------- */
const byId=id=>SCHEMAS.find(x=>x.id===id);
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]'); if(!b) return;
  const act=b.dataset.act, s=byId(b.dataset.id);
  switch(act){
    case 'home': verlauf=[]; renderHome(); window.scrollTo(0,0); break;
    case 'view': renderView(s); window.scrollTo(0,0); break;
    case 'verweis': {
      // In das verwiesene Schema springen, im selben Modus; den bisherigen Zustand für "Zurück" merken
      if(!s||!state) break;
      verlauf.push(state);
      if(state.kind==='build') startBuild(s); else renderView(s);
      window.scrollTo(0,0); break;
    }
    case 'zurueck': {
      const alt=verlauf.pop(); if(!alt) break;
      state=alt;
      if(alt.kind==='build') renderBuild(); else renderView(alt.s);
      window.scrollTo(0,0); break;
    }
    case 'toggleDef': {const box=b.nextElementSibling; box.hidden=!box.hidden; b.setAttribute('aria-expanded',String(!box.hidden)); break;}
    case 'build': startBuild(s); window.scrollTo(0,0); break;
    case 'reveal': state.revealed=true; renderBuild(); break;
    case 'showDef': state.showDef=true; renderBuild(); break;
    case 'rateStep': state.results[state.i]=b.dataset.v==='1'; state.i++; state.revealed=false; state.showDef=false; renderBuild(); if(state.i>=state.s.steps.length) window.scrollTo(0,0); break;
    case 'order': startOrder(s); window.scrollTo(0,0); break;
    case 'chip': {
      const i=+b.dataset.i, g=state.groups[state.r];
      if(i===g.kids[state.placed.length]){state.placed.push(i);renderOrder();}
      else{state.errors++;b.classList.remove('wrong');void b.offsetWidth;b.classList.add('wrong');}
      break;
    }
    case 'nextRound': state.r++; state.placed=[]; if(state.r<state.groups.length) state.pool=shuffle(state.groups[state.r].kids); renderOrder(); window.scrollTo(0,0); break;
    case 'cards': {
      const list=allCards(s).sort((a,b2)=>card(a.cid).due-card(b2.cid).due);
      startCards(list); window.scrollTo(0,0); break;
    }
    case 'review': {
      const list=faelligeKarten().sort((a,b2)=>card(a.cid).box-card(b2.cid).box).slice(0,20);
      startCards(list); window.scrollTo(0,0); break;
    }
    case 'cloze': startCloze(s); window.scrollTo(0,0); break;
    case 'lz-chip': {
      const st=state, k=st.queue[st.pos], j=+b.dataset.j;
      if(st.gefuellt>=k.luecken.length) break;
      if(k.luecken[j].wort.toLowerCase()===k.luecken[st.gefuellt].wort.toLowerCase()){ st.richtig++; st.gefuellt++; st.pool=st.pool.filter(x=>x!==j); renderCloze(); }
      else { st.fehler++; b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong'); }
      break;
    }
    case 'lz-loesung': { const st=state, k=st.queue[st.pos]; st.aufgedecktAb=st.gefuellt; st.aufgedeckt=true; st.gefuellt=k.luecken.length; st.pool=[]; renderCloze(); break; }
    case 'lz-woerter': state.woerter=!state.woerter; renderCloze(); break;
    case 'lz-weiter': state.pos++; if(state.pos<state.queue.length) lzNeueKarte(); renderCloze(); window.scrollTo(0,0); break;
    case 'tab': waehleTab(b.dataset.w); renderHome(); window.scrollTo(0,0); break;
    case 'bereich': ansicht.bereich=b.dataset.w||''; ansicht.tab='fertig'; merkeAnsicht(); renderHome(); break;
    case 'flip': {const t=document.getElementById('mine'); state.mine=t?t.value.trim():''; state.revealed=true; renderCards(); break;}
    case 'rateCard': rateCard(+b.dataset.v); break;
    case 'reset':
      if(b.dataset.armed){store={cards:{},scores:{},lueckentext:{}};save();delete b.dataset.armed;b.textContent='Lernstand zurücksetzen';renderHome();}
      else{b.dataset.armed='1';b.textContent='Zum Bestätigen erneut tippen';}
      break;
    default: Eigene.aktion(act,b); // Editor, Import, Export (js/eigene.js)
  }
});
document.addEventListener('keydown',e=>{
  if(!state||e.altKey) return;
  if(state.kind==='edit'||state.kind==='import'||state.kind==='export') return; // Tastatur dort: js/eigene.js
  const t=e.target, inText=t.tagName==='TEXTAREA'||t.tagName==='INPUT'||t.tagName==='SELECT', onBtn=t.tagName==='BUTTON';
  const press=sel=>{const b=app.querySelector(sel); if(b){e.preventDefault(); b.click();}};
  if(state.kind==='cards'&&!state.revealed&&inText&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)){press('[data-act="flip"]');return;}
  if(state.kind==='cloze'&&t.classList&&t.classList.contains('luecke-eingabe')&&e.key==='Enter'){e.preventDefault(); lzPruefeEingabe(); return;}
  if(inText||e.ctrlKey||e.metaKey) return;
  if(e.key===' '&&!onBtn){
    if(state.kind==='build'&&!state.revealed) press('[data-act="reveal"]');
    else if(state.kind==='cards'&&!state.revealed) press('[data-act="flip"]');
    else if(state.kind==='cloze') press('[data-act="lz-weiter"]');
    return;
  }
  if(state.kind==='build'&&state.revealed&&(e.key==='1'||e.key==='2')) press(`[data-act="rateStep"][data-v="${+e.key-1}"]`);
  else if(state.kind==='cards'&&state.revealed&&['1','2','3'].includes(e.key)) press(`[data-act="rateCard"][data-v="${+e.key-1}"]`);
});

/* ---------- Start: Schema-Dateien aus schemata/liste.js laden ---------- */
// Jede Datei wird als <script> eingebunden (kein fetch, damit die App auch per Doppelklick auf index.html läuft).
// async=false sorgt dafür, dass die Dateien in Listenreihenfolge ausgeführt werden.
function ladeSchemata(dateien){
  return Promise.all(dateien.map(name=>new Promise(res=>{
    const s=document.createElement('script');
    s.src='schemata/'+name; s.async=false;
    s.onload=()=>res(null); s.onerror=()=>res(name);
    document.head.appendChild(s);
  })));
}
// eigene.html setzt window.NUR_EIGENE und bindet schemata/liste.js nicht ein: leere Umgebung nur mit eigenen Schemata
const dateien=window.NUR_EIGENE?[]:(Array.isArray(window.SCHEMA_DATEIEN)?window.SCHEMA_DATEIEN.filter(n=>typeof n==='string'):null);
if(!dateien){
  ladeHinweis='Die Liste der Schema-Dateien (schemata/liste.js) konnte nicht geladen werden.';
  bereiteSchemataVor(); renderHome();
}else{
  ladeSchemata(dateien).then(ergebnis=>{
    const fehlend=ergebnis.filter(Boolean);
    bereiteSchemataVor();
    const probleme=[];
    if(fehlend.length) probleme.push('Nicht gefunden: '+fehlend.map(n=>'schemata/'+n).join(', ')+'.');
    if(SCHEMAS.length<dateien.length-fehlend.length) probleme.push('Mindestens eine Schema-Datei enthält einen Fehler und wurde übersprungen.');
    ladeHinweis=probleme.join(' ');
    renderHome();
  });
}

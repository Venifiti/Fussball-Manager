(function(){
  'use strict';

  function esc(v){ try { return typeof html === 'function' ? html(v) : String(v ?? '').replace(/[&<>\"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]); }); } catch(e){ return String(v ?? ''); } }
  function slots(){ try { return typeof benchSlots === 'function' ? benchSlots().slice(0,7) : Array.from({length:7},(_,i)=>({id:'B-'+i,index:i})); } catch(e){ return Array.from({length:7},(_,i)=>({id:'B-'+i,index:i})); } }
  function player(id){ return (state.players || []).find(function(p){ return Number(p.id) === Number(id); }) || null; }
  function ensureBench(){
    if (!state.bench || typeof state.bench !== 'object') state.bench = {};
    slots().forEach(function(s){ if (!(s.id in state.bench)) state.bench[s.id] = null; });
    Object.keys(state.bench).forEach(function(k){ if (!/^B-\d+$/.test(k)) return; var i = Number(k.split('-')[1]); if (i < 0 || i > 6) delete state.bench[k]; });
    return state.bench;
  }
  function roleFor(p){
    try { if (typeof hfmV87RosterRoleForPlayer === 'function') return hfmV87RosterRoleForPlayer(p); } catch(e){}
    return { type:'reserve', slotId:String(p.id), group:'Kader', pos:p.pos || '', order:3, index:99 };
  }
  function secText(p){ return Array.isArray(p.secondary) && p.secondary.length ? p.secondary.join(' / ') : '-'; }
  function fitText(p, role){ try { return role.type === 'lineup' && typeof effectiveStrength === 'function' ? effectiveStrength(p, role.pos) : Number(p.strength || 0); } catch(e){ return Number(p.strength || 0); } }
  function dragAttrs(type, slotId){
    return 'draggable="true" data-hfm-squad-type="'+esc(type)+'" data-hfm-squad-slot="'+esc(slotId)+'" ondragstart="squadDragStart(event,\''+String(type).replace(/'/g,"\\'")+'\',\''+String(slotId).replace(/'/g,"\\'")+'\')" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\''+String(type).replace(/'/g,"\\'")+'\',\''+String(slotId).replace(/'/g,"\\'")+'\')"';
  }
  function openClick(p){ return 'return hfmV202OpenRosterPlayer(event,'+Number(p.id)+')'; }
  window.hfmV202OpenRosterPlayer = function(ev, id){
    if (ev && ev.defaultPrevented) return false;
    if (window.__hfmV202SuppressClickUntil && Date.now() < window.__hfmV202SuppressClickUntil) return false;
    try { if (typeof hfmV90OpenOwnPlayerProfile === 'function') return hfmV90OpenOwnPlayerProfile(ev, id); } catch(e){}
    try { if (typeof openOwnPlayerProfile === 'function') openOwnPlayerProfile(id); } catch(e){}
    return false;
  };

  function removeFromLineup(slotId){ if (state.lineup && slotId in state.lineup) state.lineup[slotId] = null; }
  function removeFromBench(slotId){ ensureBench(); if (slotId in state.bench) state.bench[slotId] = null; }
  function sourceId(type, slotId){
    if (type === 'lineup') return Number(state.lineup && state.lineup[slotId] || 0);
    if (type === 'bench') return Number(ensureBench()[slotId] || 0);
    if (type === 'reserve') return Number(slotId || 0);
    return 0;
  }
  function setTarget(type, slotId, id){
    if (type === 'lineup') { if (!state.lineup) state.lineup = {}; state.lineup[slotId] = id || null; return; }
    if (type === 'bench') { ensureBench()[slotId] = id || null; return; }
  }
  function clearSource(type, slotId){
    if (type === 'lineup') removeFromLineup(slotId);
    if (type === 'bench') removeFromBench(slotId);
  }
  function normalizeDupes(){ try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e){} ensureBench(); }

  function moveSquad(source, targetType, targetSlotId){
    ensureBench();
    if (!source || !source.type || !source.slotId || !targetType || !targetSlotId) return false;
    if (source.type === targetType && String(source.slotId) === String(targetSlotId)) return false;
    if (typeof isLiveMatchSquadEdit === 'function' && isLiveMatchSquadEdit() && (source.type === 'reserve' || targetType === 'reserve')) {
      alert('Während eines Spiels sind nur Wechsel zwischen Feld und Bank möglich.');
      return false;
    }
    var sid = sourceId(source.type, source.slotId);
    if (!sid) return false;
    var tid = sourceId(targetType, targetSlotId);

    if (targetType === 'reserve') {
      clearSource(source.type, source.slotId);
    } else if (source.type === 'reserve') {
      setTarget(targetType, targetSlotId, sid);
    } else {
      clearSource(source.type, source.slotId);
      setTarget(targetType, targetSlotId, sid);
      if (tid) setTarget(source.type, source.slotId, tid);
    }
    normalizeDupes();
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e){}
    if (typeof hfmV203RefreshLineupArea === 'function') hfmV203RefreshLineupArea();
    else if (typeof render === 'function') render();
    return true;
  }
  window.hfmV202MoveSquadPlayer = moveSquad;

  var baseDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
    try {
      if (event) { event.preventDefault(); event.stopPropagation(); }
      var source = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : state.dragSquadSource;
      state.dragSquadSource = null;
      if (moveSquad(source, targetType, targetSlotId)) return false;
    } catch(e) { console.warn('v202 drop', e); }
    return baseDrop ? baseDrop.apply(this, arguments) : false;
  };

  function rosterRow(p, number){
    var role = roleFor(p);
    var rowClass = role.type === 'lineup' ? 'starterRow' : role.type === 'bench' ? 'benchRow' : 'squadRow';
    var shortStatus = role.type === 'lineup' ? 'SF' : role.type === 'bench' ? 'B' : 'T';
    return '<tr class="rosterTableRow '+rowClass+'" '+dragAttrs(role.type, role.slotId)+' onclick="'+openClick(p)+'"><td>'+number+'</td><td class="statusShort"><b>'+shortStatus+'</b></td><td><b>'+esc(role.pos || p.pos || '-')+'</b></td><td>'+esc(secText(p))+'</td><td><strong>'+esc(p.name)+'</strong></td><td>'+Number(p.age || 0)+'</td><td><b>'+fitText(p, role)+'</b></td><td class="talentCell"><span class="stars">'+(typeof stars === 'function' ? stars(p.talent || 1) : '')+'</span></td><td>'+Number(p.satisfaction || 60)+'</td><td>'+(typeof hfmV87PlayerFitness === 'function' ? hfmV87PlayerFitness(p) : '-')+'</td><td>'+(typeof hfmV87PlayerForm === 'function' ? hfmV87PlayerForm(p) : '-')+'</td><td>'+Number(p.contractYears || 0)+' J.</td><td>'+(typeof euro === 'function' ? euro(p.marketValue || 0) : Number(p.marketValue || 0))+'</td></tr>';
  }

  function bankSlotRow(slot){
    ensureBench();
    var p = player(state.bench[slot.id]);
    var cls = p ? 'benchRow' : 'emptyBenchRow';
    return '<tr class="rosterTableRow '+cls+' hfmV202BankSlotRow" '+dragAttrs('bench', slot.id)+'><td>'+(12 + slot.index)+'</td><td class="statusShort"><b>B</b></td><td><b>'+(p ? esc(p.pos || '-') : '-')+'</b></td><td>'+(p ? esc(secText(p)) : '-')+'</td><td><strong>'+(p ? esc(p.name) : 'Bankplatz '+(slot.index+1)+' frei')+'</strong></td><td>'+(p ? Number(p.age || 0) : '-')+'</td><td><b>'+(p ? Number(p.strength || 0) : '-')+'</b></td><td class="talentCell">'+(p && typeof stars === 'function' ? '<span class="stars">'+stars(p.talent || 1)+'</span>' : '-')+'</td><td>'+(p ? Number(p.satisfaction || 60) : '-')+'</td><td>'+(p && typeof hfmV87PlayerFitness === 'function' ? hfmV87PlayerFitness(p) : '-')+'</td><td>'+(p && typeof hfmV87PlayerForm === 'function' ? hfmV87PlayerForm(p) : '-')+'</td><td>'+(p ? Number(p.contractYears || 0)+' J.' : '-')+'</td><td>'+(p && typeof euro === 'function' ? euro(p.marketValue || 0) : '-')+'</td></tr>';
  }

  window.hfmV202LineupRosterTable = function(){
    ensureBench();
    var all = (state.players || []).filter(function(p){ return p.loan !== 'verliehen'; });
    var starters = all.filter(function(p){ return roleFor(p).type === 'lineup'; }).sort(function(a,b){ return roleFor(a).index - roleFor(b).index; });
    var benchIds = new Set(slots().map(function(s){ return Number(state.bench[s.id] || 0); }).filter(Boolean));
    var reserves = all.filter(function(p){ return roleFor(p).type === 'reserve' && !benchIds.has(Number(p.id)); }).sort(function(a,b){ return Number(b.strength || 0) - Number(a.strength || 0); });
    var rows = starters.map(function(p,i){ return rosterRow(p, i+1); }).join('') + slots().map(bankSlotRow).join('') + reserves.map(function(p,i){ return rosterRow(p, 19+i); }).join('');
    return '<section class="rosterTablePanel hfmV202RosterPanel"><h3>Kaderliste</h3><div class="miniHint">Es gibt immer 7 Bankplätze. Ziehe Tribünen-Spieler auf einen freien oder belegten Bankplatz.</div><div class="tableWrap rosterTableWrap"><table class="rosterTable rosterTableV90 hfmV202RosterTable"><thead><tr>'+(typeof hfmV90RosterHeaderHtml === 'function' ? hfmV90RosterHeaderHtml() : '<th>#</th><th>St.</th><th>Pos.</th><th>Nebenpos.</th><th>Name</th><th>Alter</th><th>Stärke</th><th>Talent</th><th>Moral</th><th>Fit.</th><th>Form</th><th>Vertrag</th><th>Marktwert</th>')+'</tr></thead><tbody>'+rows+'</tbody></table></div><div class="miniLegend"><span><b>SF</b> Startformation</span><span><b>B</b> Bank: 7 Plätze</span><span><b>T</b> Tribüne</span></div></section>';
  };

  function patchLineup(){
    if (typeof lineup !== 'function') return;
    var old = lineup;
    window.lineup = lineup = function(){
      var output = old.apply(this, arguments);
      try {
        if (typeof hfmV202LineupRosterTable === 'function' && /rosterTablePanel/.test(output)) {
          output = output.replace(/<section class="rosterTablePanel[\s\S]*?<\/section>(?=\s*(?:<div class="lineupModalBackdrop|$|<\/section>))/m, hfmV202LineupRosterTable());
        }
      } catch(e) {}
      return output;
    };
  }
  patchLineup();

  var pointerDrag = null;
  document.addEventListener('pointerdown', function(ev){
    var row = ev.target && ev.target.closest ? ev.target.closest('[data-hfm-squad-type][data-hfm-squad-slot]') : null;
    if (!row) return;
    if (!row.closest || !row.closest('.hfmV202RosterPanel')) return;
    pointerDrag = { type: row.dataset.hfmSquadType, slotId: row.dataset.hfmSquadSlot, pointerId: ev.pointerId, startX: ev.clientX, startY: ev.clientY, moved:false, el: row };
    try { row.setPointerCapture && row.setPointerCapture(ev.pointerId); } catch(e){}
  }, true);
  document.addEventListener('pointermove', function(ev){
    if (!pointerDrag || ev.pointerId !== pointerDrag.pointerId) return;
    var d = Math.abs(ev.clientX-pointerDrag.startX)+Math.abs(ev.clientY-pointerDrag.startY);
    if (d > 8) { pointerDrag.moved = true; pointerDrag.el.classList.add('hfmV202Dragging'); ev.preventDefault(); }
  }, true);
  document.addEventListener('pointerup', function(ev){
    if (!pointerDrag || ev.pointerId !== pointerDrag.pointerId) return;
    var src = pointerDrag; pointerDrag = null;
    try { src.el.classList.remove('hfmV202Dragging'); src.el.releasePointerCapture && src.el.releasePointerCapture(ev.pointerId); } catch(e){}
    if (!src.moved) return;
    var target = document.elementFromPoint(ev.clientX, ev.clientY);
    var row = target && target.closest ? target.closest('[data-hfm-squad-type][data-hfm-squad-slot]') : null;
    if (row && row.closest('.hfmV202RosterPanel')) {
      ev.preventDefault(); ev.stopPropagation(); window.__hfmV202SuppressClickUntil = Date.now()+600;
      moveSquad({type:src.type, slotId:src.slotId}, row.dataset.hfmSquadType, row.dataset.hfmSquadSlot);
    }
  }, true);


  document.addEventListener('contextmenu', function(ev){
    var row = ev.target && ev.target.closest ? ev.target.closest('.hfmV202RosterPanel [data-hfm-squad-type][data-hfm-squad-slot]') : null;
    if (row) { ev.preventDefault(); ev.stopPropagation(); }
  }, true);

  var oldAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){ if (oldAfter) oldAfter.apply(this, arguments); ensureBench(); };
  var oldRender = typeof render === 'function' ? render : null;
  if (oldRender) window.render = render = function(){ ensureBench(); var r = oldRender.apply(this, arguments); return r; };

  var style = document.createElement('style');
  style.textContent = '.hfmV202RosterPanel .emptyBenchRow{background:rgba(43,73,112,.72)!important;border-left:4px solid rgba(97,239,197,.45)}.hfmV202RosterPanel [data-hfm-squad-type][data-hfm-squad-slot]{cursor:grab;touch-action:none!important;-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}.hfmV202RosterPanel .hfmV202BankSlotRow{cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none}.hfmV202Dragging{outline:2px solid rgba(97,239,197,.8)!important;filter:brightness(1.12)}.hfmV202RosterPanel .benchRow{background:rgba(28,67,122,.92)!important}.hfmV202RosterPanel .squadRow{background:rgba(20,36,58,.92)!important}.hfmV202RosterPanel .starterRow{background:rgba(18,91,72,.94)!important}';
  try { document.head.appendChild(style); } catch(e){}
  try { ensureBench(); if (typeof render === 'function') render(); } catch(e){}
})();

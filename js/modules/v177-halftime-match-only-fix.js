/* v177: Halbzeit-Formation match-only, Positionslogik und Wechsel-DnD */
(function(){
  'use strict';

  function html(value){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]; });
  }
  function clone(obj){ try { return JSON.parse(JSON.stringify(obj || {})); } catch(e){ return {}; } }
  function clampLocal(n,min,max){ n = Number(n); if (!Number.isFinite(n)) n = min; return Math.max(min, Math.min(max, n)); }
  function playerById(id){ return (state.players || []).find(function(p){ return Number(p.id) === Number(id); }); }
  function posText(player){ try { return typeof positionText === 'function' ? positionText(player) : (player && player.pos || ''); } catch(e){ return player && player.pos || ''; } }
  function shortName(full){
    var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'frei';
    if (parts.length === 1) return parts[0];
    return parts[0].charAt(0).toUpperCase() + '. ' + parts.slice(1).join(' ');
  }
  function lastName(full){ var p = String(full || '').trim().split(/\s+/).filter(Boolean); return p.length ? p[p.length-1] : 'frei'; }
  function isHalfEdit(){ return !!(state && state.activeMatch && ['halftime','tacticalStop','interrupted'].indexOf(state.activeMatch.phase) >= 0); }
  function isMatchRunningWithHalf(){ return !!(state && state.activeMatch && state.activeMatch.__hfmV177UseHalfFormation && state.activeMatch.phase !== 'finished'); }
  function inferPos(x,y){
    try { if (typeof hfmV78InferPositionFromCoordinates === 'function') return hfmV78InferPositionFromCoordinates(x,y); } catch(e) {}
    x = Number(x); y = Number(y);
    if (y >= 84) return 'TW';
    if (y >= 67) return x < 31 ? 'LV' : x > 69 ? 'RV' : 'IV';
    if (y >= 55) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'DM';
    if (y >= 39) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'ZM';
    if (y >= 28) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'OM';
    return x < 31 ? 'LA' : x > 69 ? 'RA' : 'ST';
  }

  var baseActivePositions = typeof activePositions === 'function' ? activePositions : null;
  function baseSlotsForFormation(formation){
    var oldFormation = state.formation;
    try {
      state.formation = formation || oldFormation || '4-4-2';
      if (baseActivePositions) return baseActivePositions().map(function(s){ return { id:s.id, basePos:s.basePos || s.pos, pos:s.pos, index:s.index, x:Number(s.x)||50, y:Number(s.y)||50 }; });
    } catch(e) {}
    finally { state.formation = oldFormation; }
    var positions = (typeof FORMATIONS !== 'undefined' && FORMATIONS[formation]) || (typeof FORMATIONS !== 'undefined' && FORMATIONS['4-4-2']) || [];
    var coords = (typeof FORMATION_LAYOUTS !== 'undefined' && FORMATION_LAYOUTS[formation]) || [];
    return positions.map(function(pos, index){ var c = coords[index] || {x:50,y:50}; return { id:pos+'-'+index, basePos:pos, pos:pos, index:index, x:c.x, y:c.y }; });
  }
  function ensureSnapshot(){
    var m = state.activeMatch;
    if (!m || m.__hfmV177Original) return;
    m.__hfmV177Original = { lineup: clone(state.lineup), bench: clone(state.bench), formation: state.formation, tactics: clone(state.tactics) };
  }
  function ensureHalfSlots(){
    var m = state.activeMatch || {};
    ensureSnapshot();
    if (!m.__hfmV177Formation) m.__hfmV177Formation = state.formation || '4-4-2';
    if (!Array.isArray(m.__hfmV177HalfSlots) || !m.__hfmV177HalfSlots.length) m.__hfmV177HalfSlots = baseSlotsForFormation(m.__hfmV177Formation);
    m.__hfmV177UseHalfFormation = true;
    return m.__hfmV177HalfSlots;
  }
  function restoreStandardAfterMatch(){
    var m = state.activeMatch;
    if (!m || !m.__hfmV177Original || m.__hfmV177Restored) return;
    state.lineup = clone(m.__hfmV177Original.lineup);
    state.bench = clone(m.__hfmV177Original.bench);
    state.formation = m.__hfmV177Original.formation || state.formation;
    state.tactics = clone(m.__hfmV177Original.tactics);
    m.__hfmV177Restored = true;
  }

  if (baseActivePositions) {
    window.activePositions = activePositions = function(){
      if (isHalfEdit() || isMatchRunningWithHalf()) return ensureHalfSlots();
      return baseActivePositions.apply(this, arguments);
    };
  }

  function setSlotId(type, slotId, id){
    if (type === 'lineup') { if (!state.lineup) state.lineup = {}; state.lineup[slotId] = id ? Number(id) : null; }
    else { if (!state.bench) state.bench = {}; state.bench[slotId] = id ? Number(id) : null; }
  }
  function getSlotId(type, slotId){ return Number(((type === 'lineup' ? state.lineup : state.bench) || {})[slotId] || 0); }
  function benchSlotsSafe(){ try { if (typeof benchSlots === 'function') return benchSlots(); } catch(e){} return Array.from({length:7}, function(_,i){ return { id:'B-'+i, index:i }; }); }
  function saveQuiet(){ try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e){} }
  function softRender(){ var x=window.scrollX||0, y=window.scrollY||0; try{ document.body.classList.add('hfmV177NoFlicker'); }catch(e){} try{ if (typeof render === 'function') render(); }catch(e){} requestAnimationFrame(function(){ try{ window.scrollTo(x,y); document.body.classList.remove('hfmV177NoFlicker'); }catch(e){} }); }

  function moveHalfSlot(slotId, x, y){
    var slots = ensureHalfSlots();
    var slot = slots.find(function(s){ return String(s.id) === String(slotId); });
    if (!slot) return;
    var nx = clampLocal(Math.round(Number(x)*10)/10, 6, 94);
    var ny = clampLocal(Math.round(Number(y)*10)/10, 7, 93);
    slot.x = nx; slot.y = ny; slot.pos = inferPos(nx, ny);
  }

  function currentMinute(){ var m=state.activeMatch||{}; return Number(m.currentMinute || (m.tacticalStop && m.tacticalStop.minute) || 45); }
  window.halftimeFormationPitch = halftimeFormationPitch = function(){
    var slots = ensureHalfSlots();
    var markers = slots.map(function(slot){
      var id = state.lineup && state.lineup[slot.id];
      var player = playerById(id);
      var fit = typeof positionFit === 'function' ? positionFit(player, slot.pos) : { className:'' };
      var eff = player && typeof effectiveStrength === 'function' ? effectiveStrength(player, slot.pos) : 0;
      var note = player && typeof hfmV171PlayerNote === 'function' ? hfmV171PlayerNote(player, currentMinute()) : '-';
      var status = player && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(player.id, 'small') : '';
      return '<button type="button" class="fieldPlayer halftimeFieldPlayer hfmV177FieldPlayer '+(fit.className || '')+'" data-slot-id="'+html(slot.id)+'" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\'lineup\',\''+html(slot.id)+'\')" style="left:'+Number(slot.x)+'%; top:'+Number(slot.y)+'%;" aria-label="'+html(slot.pos)+': '+(player ? html(player.name) : 'frei')+'">'+
        '<span class="fieldPos">'+html(slot.pos)+'</span><strong>'+html(player ? lastName(player.name) : 'frei')+'</strong><small>'+(player ? eff : '+')+'</small>'+(player ? '<span class="halftimeNoteBadge">Note '+html(note)+'</span>' : '')+(status ? '<span class="fieldStatusBadges">'+status+'</span>' : '')+'</button>';
    }).join('');
    return '<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>'+html((state.activeMatch && state.activeMatch.__hfmV177Formation) || state.formation || '')+'</b></span><span>Effektive Startelf Ø <b>'+(typeof lineupStrength === 'function' ? lineupStrength() : '-')+'</b></span><span>Positionsprobleme: <b>'+(typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : '-')+'</b></span><span>Wechsel: <b>'+(typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0)+'/5</b></span></div><div class="visualPitch halftimePitch hfmV177Pitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>'+markers+'</div>';
  };

  function roleFor(player){
    var slots = isHalfEdit() || isMatchRunningWithHalf() ? ensureHalfSlots() : (baseActivePositions ? baseActivePositions() : []);
    var lineupEntry = Object.entries(state.lineup || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (lineupEntry) { var slot = slots.find(function(s){ return String(s.id) === String(lineupEntry[0]); }); return { type:'lineup', slotId:lineupEntry[0], pos:slot ? slot.pos : player.pos, order:1, index:slot ? Number(slot.index) : 0 }; }
    var benchEntry = Object.entries(state.bench || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (benchEntry) { var idx = benchSlotsSafe().findIndex(function(s){ return String(s.id) === String(benchEntry[0]); }); return { type:'bench', slotId:benchEntry[0], pos:player.pos || '', order:2, index:idx>=0?idx:9 }; }
    return { type:'reserve', slotId:String(player.id), pos:player.pos || '', order:3, index:99 };
  }
  function dragAttrs(type, slotId){
    if (type !== 'lineup' && type !== 'bench') return '';
    return 'draggable="true" ondragstart="squadDragStart(event,\''+type+'\',\''+String(slotId).replace(/'/g,'')+'\')" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\''+type+'\',\''+String(slotId).replace(/'/g,'')+'\')"';
  }
  window.hfmV176HalftimeRosterList = window.hfmV175HalftimeRosterList = window.hfmV174HalftimeRosterList = window.hfmV171HalftimeRosterList = function(){
    ensureHalfSlots();
    var players = (state.players || []).filter(function(p){ return p && p.loan !== 'verliehen'; }).slice();
    players.sort(function(a,b){ var ra=roleFor(a), rb=roleFor(b); return (ra.order-rb.order) || (ra.index-rb.index) || (Number(b.strength||0)-Number(a.strength||0)) || String(a.name||'').localeCompare(String(b.name||'')); });
    var cards = players.map(function(player){
      var role=roleFor(player), isLineup=role.type==='lineup';
      var fit = isLineup && typeof effectiveStrength === 'function' ? effectiveStrength(player, role.pos || player.pos) : Number(player.strength || 0);
      var cls = isLineup ? 'starter' : role.type === 'bench' ? 'bench' : 'reserve';
      var top = isLineup ? shortName(player.name) : (role.type === 'bench' ? ('Bank '+(role.index+1)) : 'Kader');
      return '<article class="hfmV177HalfCard '+cls+'" '+dragAttrs(role.type, role.slotId)+' onclick="return hfmV90OpenOwnPlayerProfile ? hfmV90OpenOwnPlayerProfile(event, '+Number(player.id)+') : openOwnPlayerProfile('+Number(player.id)+')">'+
        '<div class="hfmV177HalfCardTop"><b>'+html(top)+'</b><span>'+fit+' Stärke</span></div><strong class="hfmV177HalfName">'+html(shortName(player.name))+'</strong><small class="hfmV177HalfPos">'+html(isLineup ? role.pos : posText(player))+'</small></article>';
    }).join('');
    return '<section class="halftimeRosterPanel hfmV177HalfRoster"><div class="hfmV176HalfRosterHead"><h3>Halbzeit-Kaderliste</h3><span class="requiredBadge">'+(typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0)+'/5 Wechsel genutzt</span></div><div class="miniHint">Grün = Spieler steht am Feld. Ziehe Bankspieler auf Feldpositionen zum Wechseln; Noten siehst du oben in der Formation.</div><div class="hfmV177HalfGrid">'+cards+'</div></section>';
  };

  window.hfmV177SetMatchFormation = function(f){
    if (!isHalfEdit()) { if (typeof setFormation === 'function') setFormation(f); return; }
    ensureSnapshot();
    var m = state.activeMatch;
    var oldStarters = Object.values(state.lineup || {}).filter(Boolean).map(Number);
    m.__hfmV177Formation = f;
    m.__hfmV177HalfSlots = baseSlotsForFormation(f);
    var newLineup = {};
    m.__hfmV177HalfSlots.forEach(function(slot, i){ newLineup[slot.id] = oldStarters[i] || null; });
    state.lineup = newLineup;
    m.__hfmV177UseHalfFormation = true;
    softRender();
  };
  window.formationButtonsForMatch = formationButtonsForMatch = function(){
    var current = (state.activeMatch && state.activeMatch.__hfmV177Formation) || state.formation;
    return Object.keys(FORMATIONS || {}).map(function(f){ return '<button class="chip '+(current===f?'selected':'')+'" onclick="hfmV177SetMatchFormation(\''+f+'\')">'+html(f)+'</button>'; }).join('');
  };

  var oldDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
    if (!isHalfEdit()) return oldDrop ? oldDrop.apply(this, arguments) : false;
    ensureSnapshot(); ensureHalfSlots();
    try { if (event) { event.preventDefault(); event.stopPropagation(); } } catch(e) {}
    var src = null;
    try { src = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : (state.dragSquadSource || null); } catch(e){ src = state.dragSquadSource || null; }
    if (!src || !src.type || src.slotId == null || (src.type !== 'lineup' && src.type !== 'bench') || (targetType !== 'lineup' && targetType !== 'bench')) return false;
    if (src.type === targetType && String(src.slotId) === String(targetSlotId)) return false;
    var sourceId = getSlotId(src.type, src.slotId), targetId = getSlotId(targetType, targetSlotId);
    if (!sourceId) return false;
    var m = state.activeMatch; if (!Array.isArray(m.subs)) m.subs = []; if (typeof m.subCount !== 'number') m.subCount = m.subs.length || 0;
    var countsSub = (src.type !== targetType) && (src.type === 'bench' || targetType === 'bench');
    if (countsSub && m.subCount >= 5) { alert('Du hast bereits 5 Auswechslungen vorgenommen.'); return false; }
    if (src.type === 'lineup' && targetType === 'lineup') { setSlotId('lineup', src.slotId, targetId || null); setSlotId('lineup', targetSlotId, sourceId); }
    else if (src.type === 'bench' && targetType === 'lineup') { setSlotId('lineup', targetSlotId, sourceId); setSlotId('bench', src.slotId, targetId || null); m.subCount += 1; var incoming=playerById(sourceId), outgoing=playerById(targetId); if(incoming) m.subs.push(m.subCount+'. Wechsel: '+incoming.name+' kommt'+(outgoing?' für '+outgoing.name:'')+'.'); }
    else if (src.type === 'lineup' && targetType === 'bench') { if(!targetId){ alert('Ziehe einen Bankspieler direkt auf die Feldposition, die du ersetzen willst.'); return false; } setSlotId('lineup', src.slotId, targetId); setSlotId('bench', targetSlotId, sourceId); m.subCount += 1; var inP=playerById(targetId), outP=playerById(sourceId); if(inP) m.subs.push(m.subCount+'. Wechsel: '+inP.name+' kommt'+(outP?' für '+outP.name:'')+'.'); }
    else if (src.type === 'bench' && targetType === 'bench') { setSlotId('bench', src.slotId, targetId || null); setSlotId('bench', targetSlotId, sourceId); }
    state.dragSquadSource = null; m.__hfmV177UseHalfFormation = true; saveQuiet(); softRender(); return false;
  };

  function enableHalfPitchDrag(){
    document.querySelectorAll('.hfmV177Pitch').forEach(function(pitch){
      if (pitch.dataset.v177Ready === '1') return; pitch.dataset.v177Ready = '1';
      var dragged=null, pointerId=null, start=null, moved=false;
      function point(ev){ return {x:ev.clientX, y:ev.clientY}; }
      function prep(){ pitch.querySelectorAll('.hfmV177FieldPlayer[data-slot-id]').forEach(function(el){ el.style.touchAction='none'; }); }
      function update(ev, commit){
        if(!dragged) return; var p=point(ev), rect=pitch.getBoundingClientRect(); if(!rect.width||!rect.height) return;
        if(!moved && Math.abs(p.x-start.x)+Math.abs(p.y-start.y)<3) return;
        moved=true; ev.preventDefault(); ev.stopPropagation();
        var x=clampLocal(((p.x-rect.left)/rect.width)*100,6,94), y=clampLocal(((p.y-rect.top)/rect.height)*100,7,93);
        moveHalfSlot(dragged.dataset.slotId, x, y);
        var slots=ensureHalfSlots(), slot=slots.find(function(s){return String(s.id)===String(dragged.dataset.slotId);});
        dragged.style.left=(Math.round(x*10)/10)+'%'; dragged.style.top=(Math.round(y*10)/10)+'%';
        var pos=dragged.querySelector('.fieldPos'); if(pos && slot) pos.textContent=slot.pos;
        if(commit){ saveQuiet(); softRender(); }
      }
      prep();
      pitch.addEventListener('pointerdown', function(ev){ var el=ev.target.closest('.hfmV177FieldPlayer[data-slot-id]'); if(!el || (ev.button!==undefined && ev.button!==0)) return; ensureSnapshot(); ensureHalfSlots(); dragged=el; pointerId=ev.pointerId; start=point(ev); moved=false; el.classList.add('draggingFormationSlot'); try{el.setPointerCapture(pointerId);}catch(e){} ev.preventDefault(); ev.stopPropagation(); }, true);
      pitch.addEventListener('pointermove', function(ev){ if(dragged && ev.pointerId===pointerId) update(ev,false); }, true);
      function finish(ev){ if(!dragged || ev.pointerId!==pointerId) return; update(ev,true); var had=moved; try{dragged.releasePointerCapture(pointerId);}catch(e){} dragged.classList.remove('draggingFormationSlot'); dragged=null; pointerId=null; start=null; moved=false; if(had){ window.__hfmV177SuppressClickUntil=Date.now()+500; ev.preventDefault(); ev.stopPropagation(); } }
      pitch.addEventListener('pointerup', finish, true); pitch.addEventListener('pointercancel', finish, true);
      pitch.addEventListener('click', function(ev){ if(window.__hfmV177SuppressClickUntil && Date.now()<window.__hfmV177SuppressClickUntil){ ev.preventDefault(); ev.stopPropagation(); } }, true);
    });
  }

  var baseFinish = typeof finishActiveMatch === 'function' ? finishActiveMatch : null;
  if (baseFinish) window.finishActiveMatch = finishActiveMatch = function(){ var out = baseFinish.apply(this, arguments); restoreStandardAfterMatch(); return out; };
  var baseEnd = typeof endMatchdayFromResult === 'function' ? endMatchdayFromResult : null;
  if (baseEnd) window.endMatchdayFromResult = endMatchdayFromResult = function(){ restoreStandardAfterMatch(); return baseEnd.apply(this, arguments); };

  var baseRender = typeof render === 'function' ? render : null;
  window.render = render = function(){ var out = baseRender ? baseRender.apply(this, arguments) : undefined; try{ enableHalfPitchDrag(); }catch(e){ console.warn('v177 halftime drag', e); } return out; };
  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){ if(baseAfter) baseAfter.apply(this, arguments); try{ enableHalfPitchDrag(); }catch(e){} };

  var style=document.createElement('style');
  style.textContent='\n.hfmV177NoFlicker .panel,.hfmV177NoFlicker .matchPanel,.hfmV177NoFlicker .halftimeWindow{animation:none!important;transition:none!important}\n.hfmV177Pitch .hfmV177FieldPlayer{touch-action:none!important;cursor:grab;user-select:none;z-index:4}\n.hfmV177Pitch .hfmV177FieldPlayer.draggingFormationSlot{z-index:50;cursor:grabbing;filter:brightness(1.14);box-shadow:0 12px 34px rgba(0,0,0,.42)}\n.hfmV177HalfRoster{margin-top:14px;overflow:visible!important;max-height:none!important}\n.hfmV177HalfGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;overflow:visible!important;max-height:none!important}\n.hfmV177HalfCard{border:1px solid rgba(255,255,255,.13);border-radius:12px;padding:9px 10px;background:rgba(16,31,52,.92);min-width:0;cursor:grab;touch-action:none;user-select:none}\n.hfmV177HalfCard.starter{background:rgba(18,91,72,.94);border-color:rgba(97,239,197,.35)}\n.hfmV177HalfCard.bench{border-style:dashed}\n.hfmV177HalfCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:var(--muted)}\n.hfmV177HalfCardTop b{color:var(--text);white-space:normal;overflow-wrap:anywhere}.hfmV177HalfName{display:block;margin-top:4px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;font-size:13px}.hfmV177HalfPos{display:block;margin-top:2px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;color:var(--muted);font-size:11px}\n.hfmV176Events,.hfmV176Event,.hfmV176EventText{position:relative!important;transform:none!important}.hfmV176EventText{display:block!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.35!important}.matchLog,.matchLog li,.matchLogItem,.eventIconItem{position:relative!important;overflow:visible!important;white-space:normal!important}.matchLog li span,.matchLogItem span,.eventIconItem span{position:static!important;transform:none!important;white-space:normal!important;overflow-wrap:anywhere!important}\n@media(max-width:520px){.hfmV177HalfGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.hfmV177HalfCard{padding:7px}}\n';
  try{ document.head.appendChild(style); }catch(e){}
  try{ if(typeof render==='function') render(); }catch(e){}
})();

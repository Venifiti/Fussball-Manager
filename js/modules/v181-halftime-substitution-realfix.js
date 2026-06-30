/* v181: Halbzeit-Wechsel wirklich per Pointer-DnD, ohne native Drag-Konflikte */
(function(){
  'use strict';

  function esc(value){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]; });
  }
  function num(v){ v = Number(v); return Number.isFinite(v) ? v : 0; }
  function clamp(v,min,max){ v = num(v); return Math.max(min, Math.min(max, v)); }
  function clone(obj){ try { return JSON.parse(JSON.stringify(obj || {})); } catch(e){ return {}; } }
  function playerById(id){ return (state.players || []).find(function(p){ return Number(p.id) === Number(id); }); }
  function posText(player){ try { return typeof positionText === 'function' ? positionText(player) : (player && player.pos || ''); } catch(e){ return player && player.pos || ''; } }
  function lastName(full){ var p = String(full || '').trim().split(/\s+/).filter(Boolean); return p.length ? p[p.length-1] : 'frei'; }
  function shortName(full){ var p = String(full || '').trim().split(/\s+/).filter(Boolean); if(!p.length) return 'frei'; if(p.length === 1) return p[0]; return p[0].charAt(0).toUpperCase()+'. '+p.slice(1).join(' '); }
  function inHalf(){ return !!(state && state.activeMatch && ['halftime','tacticalStop','interrupted'].indexOf(state.activeMatch.phase) >= 0); }
  function currentMinute(){ var m = state.activeMatch || {}; return num(m.currentMinute || (m.tacticalStop && m.tacticalStop.minute) || 45); }
  function saveQuiet(){ try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); else if (typeof saveState === 'function') saveState(); } catch(e){} }
  function safeSlots(){ try { if (typeof activePositions === 'function') return activePositions(); } catch(e){} return []; }
  function benchSlotsSafe(){ try { if (typeof benchSlots === 'function') return benchSlots(); } catch(e){} return Array.from({length:7}, function(_,i){ return { id:'B-'+i, index:i }; }); }
  function getSlot(type, slotId){ return num(((type === 'lineup' ? state.lineup : state.bench) || {})[slotId] || 0); }
  function setSlot(type, slotId, playerId){
    if (type === 'lineup') { if (!state.lineup) state.lineup = {}; state.lineup[slotId] = playerId ? Number(playerId) : null; }
    else { if (!state.bench) state.bench = {}; state.bench[slotId] = playerId ? Number(playerId) : null; }
  }
  function ensureSubState(){ var m = state.activeMatch || {}; if (!Array.isArray(m.subs)) m.subs = []; if (typeof m.subCount !== 'number') m.subCount = m.subs.length || 0; return m; }
  function usedSubs(){ var m = state.activeMatch || {}; return Math.max(num(m.subCount), Array.isArray(m.subs) ? m.subs.length : 0); }
  function inferPosition(x,y){
    x = num(x); y = num(y);
    if (y >= 84) return 'TW';
    if (y >= 67) return x < 31 ? 'LV' : x > 69 ? 'RV' : 'IV';
    if (y >= 55) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'DM';
    if (y >= 39) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'ZM';
    if (y >= 28) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'OM';
    return x < 31 ? 'LA' : x > 69 ? 'RA' : 'ST';
  }
  function ensureOriginalSnapshot(){
    var m = state.activeMatch;
    if (!m || m.__hfmV177Original) return;
    m.__hfmV177Original = { lineup: clone(state.lineup), bench: clone(state.bench), formation: state.formation, tactics: clone(state.tactics) };
  }
  function roleFor(player){
    var slots = safeSlots();
    var lineupEntry = Object.entries(state.lineup || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (lineupEntry) {
      var slot = slots.find(function(s){ return String(s.id) === String(lineupEntry[0]); });
      return { type:'lineup', slotId:lineupEntry[0], pos:slot ? (slot.pos || slot.basePos || player.pos) : player.pos, order:1, index:slot ? num(slot.index) : 0 };
    }
    var benchEntry = Object.entries(state.bench || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (benchEntry) return { type:'bench', slotId:benchEntry[0], pos:posText(player), order:2, index:num(String(benchEntry[0]).replace(/\D/g,'')) };
    return { type:'reserve', slotId:'reserve-'+player.id, playerId:Number(player.id), pos:posText(player), order:3, index:999 };
  }
  function moveHalfSlotNoRender(slotId, x, y){
    var slots = safeSlots();
    var slot = slots.find(function(s){ return String(s.id) === String(slotId); });
    if (!slot) return null;
    var nx = clamp(Math.round(num(x)*10)/10, 6, 94);
    var ny = clamp(Math.round(num(y)*10)/10, 7, 93);
    slot.x = nx; slot.y = ny; slot.pos = inferPosition(nx, ny); slot.basePos = slot.pos;
    ensureOriginalSnapshot();
    if (state.activeMatch) state.activeMatch.__hfmV177UseHalfFormation = true;
    saveQuiet();
    return slot;
  }
  function attrs(type, slotId, playerId){
    return 'draggable="false" data-hfm181-type="'+esc(type)+'" data-hfm181-slot="'+esc(slotId || '')+'" data-hfm181-player="'+esc(playerId || '')+'"';
  }
  function renderSoft(){
    var x = window.scrollX || 0, y = window.scrollY || 0;
    try { document.body.classList.add('hfmV181NoFlicker'); } catch(e){}
    try { if (typeof render === 'function') render(); } catch(e){}
    requestAnimationFrame(function(){
      try { window.scrollTo(x,y); } catch(e){}
      requestAnimationFrame(function(){ try { document.body.classList.remove('hfmV181NoFlicker'); } catch(e){} });
    });
  }

  window.halftimeFormationPitch = function(){
    var slots = safeSlots();
    var markers = slots.map(function(slot){
      var id = state.lineup && state.lineup[slot.id];
      var p = playerById(id);
      var fit = p && typeof positionFit === 'function' ? positionFit(p, slot.pos || slot.basePos) : { className:'' };
      var eff = p && typeof effectiveStrength === 'function' ? effectiveStrength(p, slot.pos || slot.basePos) : 0;
      var note = p && typeof hfmV171PlayerNote === 'function' ? hfmV171PlayerNote(p, currentMinute()) : '-';
      var status = p && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(p.id, 'small') : '';
      return '<button type="button" class="fieldPlayer halftimeFieldPlayer hfmV181FieldPlayer '+(fit.className || '')+'" '+attrs('lineup', slot.id, id || '')+' data-slot-id="'+esc(slot.id)+'" style="left:'+num(slot.x)+'%; top:'+num(slot.y)+'%;" aria-label="'+esc(slot.pos || slot.basePos)+': '+(p ? esc(p.name) : 'frei')+'">'+
        '<span class="fieldPos">'+esc(slot.pos || slot.basePos)+'</span><strong>'+esc(p ? lastName(p.name) : 'frei')+'</strong><small>'+(p ? eff : '+')+'</small>'+(p ? '<span class="halftimeNoteBadge">Note '+esc(note)+'</span>' : '')+(status ? '<span class="fieldStatusBadges">'+status+'</span>' : '')+'</button>';
    }).join('');
    return '<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>'+esc((state.activeMatch && state.activeMatch.__hfmV177Formation) || state.formation || '')+'</b></span><span>Effektive Startelf Ø <b>'+(typeof lineupStrength === 'function' ? lineupStrength() : '-')+'</b></span><span>Positionsprobleme: <b>'+(typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : '-')+'</b></span><span>Wechsel: <b>'+usedSubs()+'/5</b></span></div><div class="visualPitch halftimePitch hfmV181Pitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>'+markers+'</div>';
  };

  window.hfmV176HalftimeRosterList = window.hfmV175HalftimeRosterList = window.hfmV174HalftimeRosterList = window.hfmV171HalftimeRosterList = function(){
    var players = (state.players || []).filter(function(p){ return p && p.loan !== 'verliehen'; }).slice();
    players.sort(function(a,b){ var ra=roleFor(a), rb=roleFor(b); return (ra.order-rb.order) || (ra.index-rb.index) || (num(b.strength)-num(a.strength)) || String(a.name||'').localeCompare(String(b.name||'')); });
    var cards = players.map(function(p){
      var r = roleFor(p), isLineup = r.type === 'lineup';
      var fit = isLineup && typeof effectiveStrength === 'function' ? effectiveStrength(p, r.pos || p.pos) : num(p.strength);
      var cls = isLineup ? 'starter' : r.type === 'bench' ? 'bench' : 'reserve';
      var topLabel = isLineup ? shortName(p.name) : (r.type === 'bench' ? 'Bank '+(r.index+1) : 'Kader');
      return '<article class="hfmV181HalfCard '+cls+'" '+attrs(r.type, r.slotId, p.id)+' onclick="return hfmV90OpenOwnPlayerProfile ? hfmV90OpenOwnPlayerProfile(event, '+Number(p.id)+') : openOwnPlayerProfile('+Number(p.id)+')">'+
        '<div class="hfmV181HalfCardTop"><b>'+esc(topLabel)+'</b><span>'+fit+' St.</span></div><strong class="hfmV181HalfName">'+esc(shortName(p.name))+'</strong><small class="hfmV181HalfPos">'+esc(isLineup ? r.pos : posText(p))+'</small></article>';
    }).join('');
    return '<section class="halftimeRosterPanel hfmV181HalfRoster"><div class="hfmV176HalfRosterHead"><h3>Halbzeit-Kaderliste</h3><span class="requiredBadge">'+usedSubs()+'/5 Wechsel genutzt</span></div><div class="miniHint">Ziehe einen Bankspieler auf einen Feldspieler oder eine Feldposition, um ihn einzuwechseln.</div><div class="hfmV181HalfGrid">'+cards+'</div></section>';
  };

  function getSourcePlayerId(source){
    if (!source) return 0;
    if (source.type === 'lineup' || source.type === 'bench') return getSlot(source.type, source.slotId);
    if (source.type === 'reserve') return num(source.playerId || String(source.slotId || '').replace(/\D/g,''));
    return 0;
  }
  function firstEmptyBenchSlot(){
    var slots = benchSlotsSafe();
    for (var i=0;i<slots.length;i++){ if (!getSlot('bench', slots[i].id)) return slots[i].id; }
    return slots.length ? slots[slots.length-1].id : 'B-0';
  }
  function removeReserveFromNothing(){ return true; }
  function applyDrop(source, target){
    if (!inHalf() || !source || !target) return false;
    ensureOriginalSnapshot();
    var srcType = source.type, srcSlot = source.slotId, targetType = target.type, targetSlot = target.slotId;
    if (targetType !== 'lineup' && targetType !== 'bench') return false;
    if (srcType !== 'lineup' && srcType !== 'bench' && srcType !== 'reserve') return false;
    if (srcType === targetType && String(srcSlot) === String(targetSlot)) return false;
    var sourceId = getSourcePlayerId(source);
    var targetId = getSlot(targetType, targetSlot);
    if (!sourceId) return false;
    var m = ensureSubState();
    var countsSub = targetType === 'lineup' && srcType !== 'lineup';
    if (countsSub && usedSubs() >= 5) { alert('Du hast bereits 5 Auswechslungen vorgenommen.'); return false; }

    if (srcType === 'lineup' && targetType === 'lineup') {
      setSlot('lineup', srcSlot, targetId || null); setSlot('lineup', targetSlot, sourceId);
    } else if ((srcType === 'bench' || srcType === 'reserve') && targetType === 'lineup') {
      setSlot('lineup', targetSlot, sourceId);
      if (srcType === 'bench') setSlot('bench', srcSlot, targetId || null);
      else if (targetId) setSlot('bench', firstEmptyBenchSlot(), targetId);
      else removeReserveFromNothing();
      m.subCount = usedSubs() + 1;
      var incoming = playerById(sourceId), outgoing = playerById(targetId);
      if (incoming) m.subs.push(m.subCount+'. Wechsel: '+incoming.name+' kommt'+(outgoing ? ' für '+outgoing.name : '')+'.');
    } else if (srcType === 'lineup' && targetType === 'bench') {
      if (!targetId) { alert('Ziehe einen Bankspieler direkt auf den Feldspieler, den du ersetzen willst.'); return false; }
      setSlot('lineup', srcSlot, targetId); setSlot('bench', targetSlot, sourceId);
      m.subCount = usedSubs() + 1;
      var inP = playerById(targetId), outP = playerById(sourceId);
      if (inP) m.subs.push(m.subCount+'. Wechsel: '+inP.name+' kommt'+(outP ? ' für '+outP.name : '')+'.');
    } else if (srcType === 'bench' && targetType === 'bench') {
      setSlot('bench', srcSlot, targetId || null); setSlot('bench', targetSlot, sourceId);
    } else {
      return false;
    }
    try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e){}
    if (state.activeMatch) state.activeMatch.__hfmV177UseHalfFormation = true;
    state.dragSquadSource = null;
    saveQuiet();
    renderSoft();
    return true;
  }

  var oldDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
    if (!inHalf()) return oldDrop ? oldDrop.apply(this, arguments) : false;
    try { if (event) { event.preventDefault(); event.stopPropagation(); } } catch(e){}
    var src = null;
    try { src = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : (state.dragSquadSource || null); } catch(e){ src = state.dragSquadSource || null; }
    return applyDrop(src, { type: targetType, slotId: targetSlotId });
  };

  function sourceFromCard(card){
    if (!card) return null;
    return { type: card.getAttribute('data-hfm181-type'), slotId: card.getAttribute('data-hfm181-slot'), playerId: card.getAttribute('data-hfm181-player') };
  }
  function targetFromPoint(x,y, ghost){
    if (ghost) ghost.style.display = 'none';
    var el = document.elementFromPoint(x,y);
    if (ghost) ghost.style.display = '';
    if (!el) return null;
    var field = el.closest('.hfmV181FieldPlayer[data-slot-id], .hfmV179FieldPlayer[data-slot-id], .hfmV177FieldPlayer[data-slot-id]');
    if (field) return { type:'lineup', slotId: field.getAttribute('data-slot-id') };
    var card = el.closest('.hfmV181HalfCard[data-hfm181-type][data-hfm181-slot]');
    if (card) return { type: card.getAttribute('data-hfm181-type'), slotId: card.getAttribute('data-hfm181-slot') };
    var pitch = el.closest('.hfmV181Pitch, .hfmV179Pitch, .hfmV177Pitch');
    if (pitch) {
      var rect = pitch.getBoundingClientRect();
      var px = ((x - rect.left) / rect.width) * 100;
      var py = ((y - rect.top) / rect.height) * 100;
      var best = null, bestD = Infinity;
      safeSlots().forEach(function(s){ var dx = num(s.x)-px, dy = num(s.y)-py; var d = dx*dx + dy*dy; if (d < bestD) { best = s; bestD = d; } });
      if (best) return { type:'lineup', slotId: best.id };
    }
    return null;
  }
  function enablePitchPositionDrag(){
    document.querySelectorAll('.hfmV181Pitch').forEach(function(pitch){
      if (pitch.dataset.v181PitchReady === '1') return; pitch.dataset.v181PitchReady = '1';
      var dragged = null, pid = null, start = null, moved = false;
      function point(ev){ return {x:ev.clientX, y:ev.clientY}; }
      pitch.addEventListener('pointerdown', function(ev){
        var el = ev.target.closest('.hfmV181FieldPlayer[data-slot-id]');
        if (!el || (ev.button !== undefined && ev.button !== 0)) return;
        dragged = el; pid = ev.pointerId; start = point(ev); moved = false;
        try { el.setPointerCapture(pid); } catch(e){}
        el.classList.add('draggingFormationSlot');
        ev.preventDefault(); ev.stopPropagation();
      }, true);
      pitch.addEventListener('pointermove', function(ev){
        if (!dragged || ev.pointerId !== pid) return;
        var p = point(ev), rect = pitch.getBoundingClientRect();
        if (!moved && Math.abs(p.x-start.x)+Math.abs(p.y-start.y) < 4) return;
        moved = true; ev.preventDefault(); ev.stopPropagation();
        var x = clamp(((p.x-rect.left)/rect.width)*100,6,94), y = clamp(((p.y-rect.top)/rect.height)*100,7,93);
        var slot = moveHalfSlotNoRender(dragged.dataset.slotId, x, y);
        dragged.style.left = (Math.round(x*10)/10)+'%'; dragged.style.top = (Math.round(y*10)/10)+'%';
        var pos = dragged.querySelector('.fieldPos'); if (pos && slot) pos.textContent = slot.pos || slot.basePos;
      }, true);
      function finish(ev){
        if (!dragged || ev.pointerId !== pid) return;
        try { dragged.releasePointerCapture(pid); } catch(e){}
        dragged.classList.remove('draggingFormationSlot');
        if (moved) { ev.preventDefault(); ev.stopPropagation(); window.__hfmV181SuppressClickUntil = Date.now()+500; }
        dragged = null; pid = null; start = null; moved = false;
      }
      pitch.addEventListener('pointerup', finish, true);
      pitch.addEventListener('pointercancel', finish, true);
    });
  }
  function enableRosterDrag(){
    document.querySelectorAll('.hfmV181HalfCard[data-hfm181-type][data-hfm181-slot]').forEach(function(card){
      if (card.dataset.v181CardReady === '1') return; card.dataset.v181CardReady = '1';
      card.setAttribute('draggable','false');
      card.addEventListener('dragstart', function(ev){ ev.preventDefault(); return false; }, true);
      card.addEventListener('pointerdown', function(down){
        if ((down.button !== undefined && down.button !== 0) || down.target.closest('button,a,select,input')) return;
        var source = sourceFromCard(card);
        if (!source || (source.type !== 'lineup' && source.type !== 'bench' && source.type !== 'reserve')) return;
        var startX = down.clientX, startY = down.clientY, moved = false, ghost = null, active = true;
        function makeGhost(){
          if (ghost) return;
          ghost = card.cloneNode(true);
          ghost.classList.add('hfmV181DragGhost');
          ghost.style.position = 'fixed'; ghost.style.left = '0'; ghost.style.top = '0'; ghost.style.width = Math.min(card.offsetWidth, 240)+'px'; ghost.style.pointerEvents = 'none'; ghost.style.zIndex = '99999';
          document.body.appendChild(ghost); card.classList.add('hfmV181DraggingSource');
        }
        function move(ev){
          if (!active) return;
          var dx = ev.clientX - startX, dy = ev.clientY - startY;
          if (!moved && Math.abs(dx)+Math.abs(dy) < 7) return;
          moved = true; makeGhost();
          if (ghost) ghost.style.transform = 'translate('+(ev.clientX+12)+'px,'+(ev.clientY+12)+'px)';
          ev.preventDefault(); ev.stopPropagation();
        }
        function up(ev){
          if (!active) return;
          active = false;
          document.removeEventListener('pointermove', move, true);
          document.removeEventListener('pointerup', up, true);
          document.removeEventListener('pointercancel', cancel, true);
          var target = moved ? targetFromPoint(ev.clientX, ev.clientY, ghost) : null;
          if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
          card.classList.remove('hfmV181DraggingSource');
          if (moved && target) { applyDrop(source, target); ev.preventDefault(); ev.stopPropagation(); window.__hfmV181SuppressClickUntil = Date.now()+500; }
        }
        function cancel(){
          active = false;
          document.removeEventListener('pointermove', move, true);
          document.removeEventListener('pointerup', up, true);
          document.removeEventListener('pointercancel', cancel, true);
          if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
          card.classList.remove('hfmV181DraggingSource');
        }
        document.addEventListener('pointermove', move, true);
        document.addEventListener('pointerup', up, true);
        document.addEventListener('pointercancel', cancel, true);
      }, true);
      card.addEventListener('click', function(ev){ if (window.__hfmV181SuppressClickUntil && Date.now() < window.__hfmV181SuppressClickUntil) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    });
  }
  function afterRender(){ if (!inHalf()) return; try { enablePitchPositionDrag(); enableRosterDrag(); } catch(e){ console.warn('v181 halftime dnd', e); } }
  var baseRender = typeof render === 'function' ? render : null;
  window.render = render = function(){ var out = baseRender ? baseRender.apply(this, arguments) : undefined; afterRender(); return out; };
  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){ if (baseAfter) baseAfter.apply(this, arguments); afterRender(); };

  var style = document.createElement('style');
  style.textContent = '\n.hfmV181NoFlicker *{animation:none!important;transition:none!important}\n.hfmV181Pitch .hfmV181FieldPlayer{touch-action:none!important;cursor:grab;user-select:none;z-index:5;-webkit-user-drag:none}\n.hfmV181Pitch .hfmV181FieldPlayer.draggingFormationSlot{z-index:70;cursor:grabbing;filter:brightness(1.16);box-shadow:0 12px 34px rgba(0,0,0,.45)}\n.hfmV181HalfRoster{margin-top:14px;overflow:visible!important;max-height:none!important}\n.hfmV181HalfGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;overflow:visible!important;max-height:none!important}\n.hfmV181HalfCard{border:1px solid rgba(255,255,255,.13);border-radius:12px;padding:9px 10px;background:rgba(16,31,52,.92);min-width:0;cursor:grab;touch-action:none;user-select:none;-webkit-user-drag:none}\n.hfmV181HalfCard.starter{background:rgba(18,91,72,.94);border-color:rgba(97,239,197,.35)}\n.hfmV181HalfCard.bench{border-style:dashed}.hfmV181HalfCard.reserve{opacity:.9}\n.hfmV181HalfCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:var(--muted)}\n.hfmV181HalfCardTop b{color:var(--text);white-space:normal;overflow-wrap:anywhere}.hfmV181HalfName{display:block;margin-top:4px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;font-size:13px}.hfmV181HalfPos{display:block;margin-top:2px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;color:var(--muted);font-size:11px}\n.hfmV181DragGhost{opacity:.94;transform-origin:left top;box-shadow:0 18px 40px rgba(0,0,0,.45)}\n.hfmV181DraggingSource{opacity:.55}\n@media(max-width:520px){.hfmV181HalfGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.hfmV181HalfCard{padding:7px 8px}.hfmV181HalfCardTop{font-size:10px}.hfmV181HalfName{font-size:12px}}\n';
  try { document.head.appendChild(style); } catch(e){}
  try { afterRender(); } catch(e){}
})();

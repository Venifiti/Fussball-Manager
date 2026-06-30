/* v179: Halbzeit-DnD stabil, ohne Flicker bei Positionsverschiebung + Wechsel per Drag & Drop */
(function(){
  'use strict';

  function esc(value){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]; });
  }
  function num(v){ v = Number(v); return Number.isFinite(v) ? v : 0; }
  function clamp(v,min,max){ v = num(v); return Math.max(min, Math.min(max, v)); }
  function playerById(id){ return (state.players || []).find(function(p){ return Number(p.id) === Number(id); }); }
  function posText(player){ try { return typeof positionText === 'function' ? positionText(player) : (player && player.pos || ''); } catch(e){ return player && player.pos || ''; } }
  function lastName(full){ var p = String(full || '').trim().split(/\s+/).filter(Boolean); return p.length ? p[p.length-1] : 'frei'; }
  function shortName(full){ var p = String(full || '').trim().split(/\s+/).filter(Boolean); if(!p.length) return 'frei'; if(p.length === 1) return p[0]; return p[0].charAt(0).toUpperCase()+'. '+p.slice(1).join(' '); }
  function inHalf(){ return !!(state && state.activeMatch && ['halftime','tacticalStop','interrupted'].indexOf(state.activeMatch.phase) >= 0); }
  function currentMinute(){ var m = state.activeMatch || {}; return num(m.currentMinute || (m.tacticalStop && m.tacticalStop.minute) || 45); }
  function saveQuiet(){ try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); else if (typeof saveState === 'function') saveState(); } catch(e){} }
  function safeSlots(){
    try { if (typeof activePositions === 'function') return activePositions(); } catch(e) {}
    return [];
  }
  function benchSlotsSafe(){ try { if (typeof benchSlots === 'function') return benchSlots(); } catch(e){} return Array.from({length:7}, function(_,i){ return { id:'B-'+i, index:i }; }); }
  function getSlot(type, slotId){ return num(((type === 'lineup' ? state.lineup : state.bench) || {})[slotId] || 0); }
  function setSlot(type, slotId, playerId){
    if (type === 'lineup') { if (!state.lineup) state.lineup = {}; state.lineup[slotId] = playerId ? Number(playerId) : null; }
    else { if (!state.bench) state.bench = {}; state.bench[slotId] = playerId ? Number(playerId) : null; }
  }
  function ensureSubState(){
    var m = state.activeMatch || {};
    if (!Array.isArray(m.subs)) m.subs = [];
    if (typeof m.subCount !== 'number') m.subCount = m.subs.length || 0;
    return m;
  }
  function usedSubs(){ var m = state.activeMatch || {}; return Math.max(num(m.subCount), Array.isArray(m.subs) ? m.subs.length : 0); }
  function roleFor(player){
    var slots = safeSlots();
    var lineupEntry = Object.entries(state.lineup || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (lineupEntry) {
      var slot = slots.find(function(s){ return String(s.id) === String(lineupEntry[0]); });
      return { type:'lineup', slotId:lineupEntry[0], pos:slot ? (slot.pos || slot.basePos || player.pos) : player.pos, order:1, index:slot ? num(slot.index) : 0 };
    }
    var benchEntry = Object.entries(state.bench || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (benchEntry) return { type:'bench', slotId:benchEntry[0], pos:posText(player), order:2, index:num(String(benchEntry[0]).replace(/\D/g,'')) };
    return { type:'reserve', slotId:'reserve-'+player.id, pos:posText(player), order:3, index:999 };
  }
  function inferPosition(x,y){
    x = num(x); y = num(y);
    if (y >= 84) return 'TW';
    if (y >= 67) return x < 31 ? 'LV' : x > 69 ? 'RV' : 'IV';
    if (y >= 55) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'DM';
    if (y >= 39) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'ZM';
    if (y >= 28) return x < 31 ? 'LM' : x > 69 ? 'RM' : 'OM';
    return x < 31 ? 'LA' : x > 69 ? 'RA' : 'ST';
  }
  function moveHalfSlotNoRender(slotId, x, y){
    var slots = safeSlots();
    var slot = slots.find(function(s){ return String(s.id) === String(slotId); });
    if (!slot) return null;
    var nx = clamp(Math.round(num(x)*10)/10, 6, 94);
    var ny = clamp(Math.round(num(y)*10)/10, 7, 93);
    slot.x = nx; slot.y = ny; slot.pos = inferPosition(nx, ny); slot.basePos = slot.pos;
    if (state.activeMatch) state.activeMatch.__hfmV177UseHalfFormation = true;
    saveQuiet();
    return slot;
  }
  function dragAttr(type, slotId){
    var clean = String(slotId || '').replace(/'/g,'');
    return 'draggable="true" data-hfm-type="'+esc(type)+'" data-hfm-slot="'+esc(clean)+'" ondragstart="squadDragStart(event,\''+type+'\',\''+clean+'\')" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\''+type+'\',\''+clean+'\')"';
  }

  /* Pitch ohne alte v177-Pitch-Klasse, damit kein alter Commit-Render mehr flackert. */
  window.halftimeFormationPitch = function(){
    var slots = safeSlots();
    var markers = slots.map(function(slot){
      var id = state.lineup && state.lineup[slot.id];
      var p = playerById(id);
      var fit = p && typeof positionFit === 'function' ? positionFit(p, slot.pos || slot.basePos) : { className:'' };
      var eff = p && typeof effectiveStrength === 'function' ? effectiveStrength(p, slot.pos || slot.basePos) : 0;
      var note = p && typeof hfmV171PlayerNote === 'function' ? hfmV171PlayerNote(p, currentMinute()) : '-';
      var status = p && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(p.id, 'small') : '';
      return '<button type="button" class="fieldPlayer halftimeFieldPlayer hfmV179FieldPlayer '+(fit.className || '')+'" '+dragAttr('lineup', slot.id)+' data-slot-id="'+esc(slot.id)+'" style="left:'+num(slot.x)+'%; top:'+num(slot.y)+'%;" aria-label="'+esc(slot.pos || slot.basePos)+': '+(p ? esc(p.name) : 'frei')+'">'+
        '<span class="fieldPos">'+esc(slot.pos || slot.basePos)+'</span><strong>'+esc(p ? lastName(p.name) : 'frei')+'</strong><small>'+(p ? eff : '+')+'</small>'+(p ? '<span class="halftimeNoteBadge">Note '+esc(note)+'</span>' : '')+(status ? '<span class="fieldStatusBadges">'+status+'</span>' : '')+'</button>';
    }).join('');
    return '<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>'+esc((state.activeMatch && state.activeMatch.__hfmV177Formation) || state.formation || '')+'</b></span><span>Effektive Startelf Ø <b>'+(typeof lineupStrength === 'function' ? lineupStrength() : '-')+'</b></span><span>Positionsprobleme: <b>'+(typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : '-')+'</b></span><span>Wechsel: <b>'+usedSubs()+'/5</b></span></div><div class="visualPitch halftimePitch hfmV179Pitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>'+markers+'</div>';
  };

  window.hfmV176HalftimeRosterList = window.hfmV175HalftimeRosterList = window.hfmV174HalftimeRosterList = window.hfmV171HalftimeRosterList = function(){
    var players = (state.players || []).filter(function(p){ return p && p.loan !== 'verliehen'; }).slice();
    players.sort(function(a,b){ var ra=roleFor(a), rb=roleFor(b); return (ra.order-rb.order) || (ra.index-rb.index) || (num(b.strength)-num(a.strength)) || String(a.name||'').localeCompare(String(b.name||'')); });
    var cards = players.map(function(p){
      var r = roleFor(p), isLineup = r.type === 'lineup';
      var fit = isLineup && typeof effectiveStrength === 'function' ? effectiveStrength(p, r.pos || p.pos) : num(p.strength);
      var cls = isLineup ? 'starter' : r.type === 'bench' ? 'bench' : 'reserve';
      var label = isLineup ? shortName(p.name) : (r.type === 'bench' ? 'Bank '+(r.index+1) : 'Kader');
      var playerName = shortName(p.name);
      return '<article class="hfmV179HalfCard '+cls+'" '+dragAttr(r.type, r.slotId)+' onclick="return hfmV90OpenOwnPlayerProfile ? hfmV90OpenOwnPlayerProfile(event, '+Number(p.id)+') : openOwnPlayerProfile('+Number(p.id)+')">'+
        '<div class="hfmV179HalfCardTop"><b>'+esc(label)+'</b><span>'+fit+' Stärke</span></div><strong class="hfmV179HalfName">'+esc(playerName)+'</strong><small class="hfmV179HalfPos">'+esc(isLineup ? r.pos : posText(p))+'</small></article>';
    }).join('');
    return '<section class="halftimeRosterPanel hfmV179HalfRoster"><div class="hfmV176HalfRosterHead"><h3>Halbzeit-Kaderliste</h3><span class="requiredBadge">'+usedSubs()+'/5 Wechsel genutzt</span></div><div class="miniHint">Grün = Spieler steht am Feld. Ziehe Bankspieler direkt auf eine Feldposition zum Einwechseln.</div><div class="hfmV179HalfGrid">'+cards+'</div></section>';
  };

  function applyHalfDrop(source, targetType, targetSlotId){
    if (!inHalf() || !source || !source.type || source.slotId == null) return false;
    if (source.type !== 'lineup' && source.type !== 'bench') return false;
    if (targetType !== 'lineup' && targetType !== 'bench') return false;
    if (source.type === targetType && String(source.slotId) === String(targetSlotId)) return false;
    var sourceId = getSlot(source.type, source.slotId);
    var targetId = getSlot(targetType, targetSlotId);
    if (!sourceId) return false;
    var m = ensureSubState();
    var countsSub = (source.type !== targetType) && (source.type === 'bench' || targetType === 'bench');
    if (countsSub && usedSubs() >= 5) { alert('Du hast bereits 5 Auswechslungen vorgenommen.'); return false; }

    if (source.type === 'lineup' && targetType === 'lineup') {
      setSlot('lineup', source.slotId, targetId || null);
      setSlot('lineup', targetSlotId, sourceId);
    } else if (source.type === 'bench' && targetType === 'lineup') {
      setSlot('lineup', targetSlotId, sourceId);
      setSlot('bench', source.slotId, targetId || null);
      m.subCount = usedSubs() + 1;
      var incoming = playerById(sourceId), outgoing = playerById(targetId);
      if (incoming) m.subs.push(m.subCount+'. Wechsel: '+incoming.name+' kommt'+(outgoing ? ' für '+outgoing.name : '')+'.');
    } else if (source.type === 'lineup' && targetType === 'bench') {
      if (!targetId) { alert('Ziehe einen Bankspieler direkt auf die Feldposition, die du ersetzen willst.'); return false; }
      setSlot('lineup', source.slotId, targetId);
      setSlot('bench', targetSlotId, sourceId);
      m.subCount = usedSubs() + 1;
      var inP = playerById(targetId), outP = playerById(sourceId);
      if (inP) m.subs.push(m.subCount+'. Wechsel: '+inP.name+' kommt'+(outP ? ' für '+outP.name : '')+'.');
    } else if (source.type === 'bench' && targetType === 'bench') {
      setSlot('bench', source.slotId, targetId || null);
      setSlot('bench', targetSlotId, sourceId);
    }
    try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e) {}
    if (state.activeMatch) state.activeMatch.__hfmV177UseHalfFormation = true;
    state.dragSquadSource = null;
    saveQuiet();
    try { document.body.classList.add('hfmV179NoFlicker'); render(); requestAnimationFrame(function(){ document.body.classList.remove('hfmV179NoFlicker'); }); } catch(e) {}
    return true;
  }

  var previousDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = function(event, targetType, targetSlotId){
    var src = null;
    try { if (event) { event.preventDefault(); event.stopPropagation(); } } catch(e) {}
    try { src = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : (state.dragSquadSource || null); } catch(e){ src = state.dragSquadSource || null; }
    if (inHalf()) return applyHalfDrop(src, targetType, targetSlotId);
    return previousDrop ? previousDrop.apply(this, arguments) : false;
  };
  try { window.dropSquadPlayer.__hfmV179 = true; } catch(e) {}

  function sourceFromElement(el){
    if (!el) return null;
    var source = el.closest('[data-hfm-type][data-hfm-slot]');
    if (!source) return null;
    return { type: source.getAttribute('data-hfm-type'), slotId: source.getAttribute('data-hfm-slot') };
  }
  function targetFromPoint(x,y, ghost){
    if (ghost) ghost.style.display = 'none';
    var el = document.elementFromPoint(x,y);
    if (ghost) ghost.style.display = '';
    if (!el) return null;
    var field = el.closest('.hfmV179FieldPlayer[data-slot-id]');
    if (field) return { type:'lineup', slotId: field.getAttribute('data-slot-id') };
    var card = el.closest('.hfmV179HalfCard[data-hfm-type][data-hfm-slot]');
    if (card) return { type: card.getAttribute('data-hfm-type'), slotId: card.getAttribute('data-hfm-slot') };
    return null;
  }
  function enableNoFlickerPitchDrag(){
    document.querySelectorAll('.hfmV179Pitch').forEach(function(pitch){
      if (pitch.dataset.v179PitchReady === '1') return;
      pitch.dataset.v179PitchReady = '1';
      var dragged = null, pointerId = null, start = null, moved = false;
      function pt(ev){ return {x: ev.clientX, y: ev.clientY}; }
      pitch.addEventListener('pointerdown', function(ev){
        var el = ev.target.closest('.hfmV179FieldPlayer[data-slot-id]');
        if (!el || (ev.button !== undefined && ev.button !== 0)) return;
        dragged = el; pointerId = ev.pointerId; start = pt(ev); moved = false;
        el.classList.add('draggingFormationSlot');
        try { el.setPointerCapture(pointerId); } catch(e) {}
        ev.preventDefault(); ev.stopPropagation();
      }, true);
      pitch.addEventListener('pointermove', function(ev){
        if (!dragged || ev.pointerId !== pointerId) return;
        var p = pt(ev), rect = pitch.getBoundingClientRect();
        if (!moved && Math.abs(p.x - start.x) + Math.abs(p.y - start.y) < 3) return;
        moved = true; ev.preventDefault(); ev.stopPropagation();
        var x = clamp(((p.x - rect.left) / rect.width) * 100, 6, 94);
        var y = clamp(((p.y - rect.top) / rect.height) * 100, 7, 93);
        var slot = moveHalfSlotNoRender(dragged.dataset.slotId, x, y);
        dragged.style.left = (Math.round(x*10)/10)+'%';
        dragged.style.top = (Math.round(y*10)/10)+'%';
        var pos = dragged.querySelector('.fieldPos'); if (pos && slot) pos.textContent = slot.pos || slot.basePos;
      }, true);
      function finish(ev){
        if (!dragged || ev.pointerId !== pointerId) return;
        try { dragged.releasePointerCapture(pointerId); } catch(e) {}
        dragged.classList.remove('draggingFormationSlot');
        if (moved) { window.__hfmV179SuppressClickUntil = Date.now()+450; ev.preventDefault(); ev.stopPropagation(); }
        dragged = null; pointerId = null; start = null; moved = false;
      }
      pitch.addEventListener('pointerup', finish, true);
      pitch.addEventListener('pointercancel', finish, true);
      pitch.addEventListener('click', function(ev){ if (window.__hfmV179SuppressClickUntil && Date.now() < window.__hfmV179SuppressClickUntil) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    });
  }
  function enablePointerSubDrag(){
    document.querySelectorAll('.hfmV179HalfCard[data-hfm-type][data-hfm-slot]').forEach(function(card){
      if (card.dataset.v179CardReady === '1') return;
      card.dataset.v179CardReady = '1';
      var source = null, pointerId = null, start = null, ghost = null, moved = false;
      function pt(ev){ return {x: ev.clientX, y: ev.clientY}; }
      card.addEventListener('pointerdown', function(ev){
        if ((ev.button !== undefined && ev.button !== 0) || ev.target.closest('button,a,select,input')) return;
        source = sourceFromElement(card); if (!source || (source.type !== 'lineup' && source.type !== 'bench')) return;
        pointerId = ev.pointerId; start = pt(ev); moved = false;
        try { card.setPointerCapture(pointerId); } catch(e) {}
      }, true);
      card.addEventListener('pointermove', function(ev){
        if (!source || ev.pointerId !== pointerId) return;
        var p = pt(ev);
        if (!moved && Math.abs(p.x-start.x)+Math.abs(p.y-start.y) < 8) return;
        moved = true; ev.preventDefault(); ev.stopPropagation();
        if (!ghost) {
          ghost = card.cloneNode(true);
          ghost.classList.add('hfmV179DragGhost');
          ghost.style.position='fixed'; ghost.style.left='0'; ghost.style.top='0'; ghost.style.width=Math.min(card.offsetWidth, 230)+'px'; ghost.style.pointerEvents='none'; ghost.style.zIndex='9999';
          document.body.appendChild(ghost);
          card.classList.add('hfmV179DraggingSource');
        }
        ghost.style.transform = 'translate('+(p.x+12)+'px,'+(p.y+12)+'px)';
      }, true);
      function finish(ev){
        if (!source || ev.pointerId !== pointerId) return;
        var p = pt(ev), target = moved ? targetFromPoint(p.x, p.y, ghost) : null;
        try { card.releasePointerCapture(pointerId); } catch(e) {}
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        card.classList.remove('hfmV179DraggingSource');
        if (moved && target) { applyHalfDrop(source, target.type, target.slotId); ev.preventDefault(); ev.stopPropagation(); window.__hfmV179SuppressClickUntil = Date.now()+450; }
        source = null; pointerId = null; start = null; ghost = null; moved = false;
      }
      card.addEventListener('pointerup', finish, true);
      card.addEventListener('pointercancel', finish, true);
      card.addEventListener('click', function(ev){ if (window.__hfmV179SuppressClickUntil && Date.now() < window.__hfmV179SuppressClickUntil) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    });
  }
  function afterRender(){ try { enableNoFlickerPitchDrag(); enablePointerSubDrag(); } catch(e){ console.warn('v179 halftime dnd', e); } }
  var baseRender = typeof render === 'function' ? render : null;
  window.render = function(){ var out = baseRender ? baseRender.apply(this, arguments) : undefined; afterRender(); return out; };
  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = function(){ if (baseAfter) baseAfter.apply(this, arguments); afterRender(); };

  var style = document.createElement('style');
  style.textContent = '\n.hfmV179NoFlicker *{animation:none!important;transition:none!important}\n.hfmV179Pitch .hfmV179FieldPlayer{touch-action:none!important;cursor:grab;user-select:none;z-index:5}\n.hfmV179Pitch .hfmV179FieldPlayer.draggingFormationSlot{z-index:60;cursor:grabbing;filter:brightness(1.16);box-shadow:0 12px 34px rgba(0,0,0,.45)}\n.hfmV179HalfRoster{margin-top:14px;overflow:visible!important;max-height:none!important}\n.hfmV179HalfGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;overflow:visible!important;max-height:none!important}\n.hfmV179HalfCard{border:1px solid rgba(255,255,255,.13);border-radius:12px;padding:9px 10px;background:rgba(16,31,52,.92);min-width:0;cursor:grab;touch-action:none;user-select:none}\n.hfmV179HalfCard.starter{background:rgba(18,91,72,.94);border-color:rgba(97,239,197,.35)}\n.hfmV179HalfCard.bench{border-style:dashed}\n.hfmV179HalfCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:var(--muted)}\n.hfmV179HalfCardTop b{color:var(--text);white-space:normal;overflow-wrap:anywhere}.hfmV179HalfName{display:block;margin-top:4px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;font-size:13px}.hfmV179HalfPos{display:block;margin-top:2px;line-height:1.2;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;color:var(--muted);font-size:11px}\n.hfmV179DragGhost{opacity:.92;transform-origin:left top;box-shadow:0 18px 40px rgba(0,0,0,.45)}\n.hfmV179DraggingSource{opacity:.55}\n@media(max-width:520px){.hfmV179HalfGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.hfmV179HalfCard{padding:7px 8px}.hfmV179HalfCardTop{font-size:10px}.hfmV179HalfName{font-size:12px}}\n';
  try { document.head.appendChild(style); } catch(e) {}
  try { afterRender(); } catch(e) {}
})();

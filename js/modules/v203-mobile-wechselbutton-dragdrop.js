/* v203: Handy-Wechselbutton fuer Team-Aufstellung.
   Ziel: Ein-/Auswechseln ueber einen kleinen Button, den man gedrueckt haelt
   und dann auf den Zielspieler zieht. Die Tabellenzeile selbst bleibt scrollbar/klickbar. */
(function(){
  'use strict';

  function h(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }
  function n(v){ return Number(v || 0); }
  function idStr(v){ return String(v == null ? '' : v); }
  function sameId(a,b){ return idStr(a) === idStr(b); }
  function players(){ return Array.isArray(state && state.players) ? state.players : []; }
  function findPlayer(id){ return players().find(function(p){ return sameId(p.id, id); }) || null; }
  function safeBenchSlots(){
    try { if (typeof benchSlots === 'function') return benchSlots(); } catch(e) {}
    return Array.from({ length: 7 }, function(_, i){ return { id:'B-' + i, index:i }; });
  }
  function safeActivePositions(){
    try { if (typeof activePositions === 'function') return activePositions(); } catch(e) {}
    return [];
  }
  function roleForPlayer(player){
    try { if (typeof hfmV87RosterRoleForPlayer === 'function') return hfmV87RosterRoleForPlayer(player); } catch(e) {}
    var line = safeActivePositions().find(function(slot){ return sameId((state.lineup || {})[slot.id], player.id); });
    if (line) return { type:'lineup', slotId:line.id, pos:line.pos, order:1, index:line.index || 0 };
    var bank = safeBenchSlots().find(function(slot){ return sameId((state.bench || {})[slot.id], player.id); });
    if (bank) return { type:'bench', slotId:bank.id, pos:player.pos, order:2, index:bank.index || 0 };
    return { type:'reserve', slotId:idStr(player.id), pos:player.pos, order:3, index:99 };
  }
  function rolePlayerId(role){
    if (!role) return null;
    if (role.type === 'lineup') return (state.lineup || {})[role.slotId] || null;
    if (role.type === 'bench') return (state.bench || {})[role.slotId] || null;
    if (role.type === 'reserve') return role.slotId || null;
    return null;
  }
  function setSlot(type, slotId, playerId){
    if (type === 'lineup') {
      if (!state.lineup) state.lineup = {};
      state.lineup[slotId] = playerId || null;
      return;
    }
    if (type === 'bench') {
      if (!state.bench) state.bench = {};
      state.bench[slotId] = playerId || null;
    }
  }
  function cleanDuplicates(){
    try { if (typeof cleanupSquadDuplicates === 'function') { cleanupSquadDuplicates(); return; } } catch(e) {}
    var seen = new Set();
    Object.keys(state.lineup || {}).forEach(function(k){
      var id = idStr(state.lineup[k]);
      if (!id || id === '0') return;
      if (seen.has(id)) state.lineup[k] = null; else seen.add(id);
    });
    Object.keys(state.bench || {}).forEach(function(k){
      var id = idStr(state.bench[k]);
      if (!id || id === '0') return;
      if (seen.has(id)) state.bench[k] = null; else seen.add(id);
    });
  }
  function saveSoft(){
    try { if (typeof hfmV77SilentSave === 'function') { hfmV77SilentSave(); return; } } catch(e) {}
    try { if (typeof save === 'function') save(); } catch(e) {}
  }
  function renderSoft(){ cleanupGhosts(true); try { render(); } catch(e) {} }

  function normalizeBenchSeven(){
    if (!state.bench) state.bench = {};
    safeBenchSlots().forEach(function(slot){ if (!(slot.id in state.bench)) state.bench[slot.id] = null; });
  }

  function applyMoveByRoles(sourceRole, targetRole){
    if (!sourceRole || !targetRole) return false;
    if (sourceRole.type === targetRole.type && idStr(sourceRole.slotId) === idStr(targetRole.slotId)) return false;
    var sourceId = rolePlayerId(sourceRole);
    var targetId = rolePlayerId(targetRole);
    if (!sourceId) return false;

    // Im laufenden Spiel nicht die normale Kaderlogik umgehen.
    try {
      if (typeof isLiveMatchSquadEdit === 'function' && isLiveMatchSquadEdit()) {
        if (sourceRole.type === 'bench' && targetRole.type === 'lineup' && typeof liveSubstitute === 'function') {
          liveSubstitute(targetRole.slotId, sourceId);
          return true;
        }
        if (sourceRole.type === 'lineup' && targetRole.type === 'bench' && targetId && typeof liveSubstitute === 'function') {
          liveSubstitute(sourceRole.slotId, targetId);
          return true;
        }
        alert('Während des Spiels sind direkte Wechsel nur zwischen Feld und Bank möglich.');
        renderSoft();
        return false;
      }
    } catch(e) {}

    // Reserve -> Bank/Feld: Zielspieler wird automatisch Reservist.
    if (sourceRole.type === 'reserve' && targetRole.type !== 'reserve') {
      setSlot(targetRole.type, targetRole.slotId, sourceId);
      cleanDuplicates(); saveSoft(); renderSoft(); return true;
    }

    // Bank/Feld -> Reserve-Spieler: Reservist übernimmt den Platz.
    if (targetRole.type === 'reserve' && sourceRole.type !== 'reserve') {
      setSlot(sourceRole.type, sourceRole.slotId, targetId || null);
      cleanDuplicates(); saveSoft(); renderSoft(); return true;
    }

    // Bank/Feld <-> Bank/Feld oder auf freien Bankplatz.
    if (sourceRole.type !== 'reserve' && targetRole.type !== 'reserve') {
      setSlot(sourceRole.type, sourceRole.slotId, targetId || null);
      setSlot(targetRole.type, targetRole.slotId, sourceId);
      cleanDuplicates(); saveSoft(); renderSoft(); return true;
    }
    return false;
  }

  function targetRoleFromElement(el){
    if (!el || !el.closest) return null;
    var emptySlot = el.closest('[data-hfm-v203-empty-bank-slot]');
    if (emptySlot) return { type:'bench', slotId:emptySlot.getAttribute('data-hfm-v203-empty-bank-slot') };
    var slotEl = el.closest('[data-hfm-v203-slot-type][data-hfm-v203-slot-id]');
    if (slotEl) return { type:slotEl.getAttribute('data-hfm-v203-slot-type'), slotId:slotEl.getAttribute('data-hfm-v203-slot-id') };
    var playerEl = el.closest('[data-hfm-v203-player-id]');
    if (playerEl) {
      var p = findPlayer(playerEl.getAttribute('data-hfm-v203-player-id'));
      return p ? roleForPlayer(p) : null;
    }
    return null;
  }

  var dragState = null;
  function removeOneGhost(g){
    try { if (g && g.parentNode) g.parentNode.removeChild(g); } catch(e) {}
  }
  function cleanupGhosts(force){
    try {
      if (!force && dragState && dragState.active) return;
      document.querySelectorAll('.hfmV203SubGhost').forEach(function(g){ removeOneGhost(g); });
      document.querySelectorAll('.hfmV203Held').forEach(function(b){ b.classList.remove('hfmV203Held'); });
      document.body.classList.remove('hfmV203DraggingActive');
    } catch(e) {}
  }
  function removeGhost(){
    if (dragState && dragState.ghost) removeOneGhost(dragState.ghost);
    cleanupGhosts(false);
  }
  function finishDrag(ev, cancelled){
    if (!dragState) return false;
    clearTimeout(dragState.holdTimer);
    var d = dragState;
    dragState = null;
    try { if (d.button && d.pointerId != null) d.button.releasePointerCapture(d.pointerId); } catch(e) {}
    try { document.removeEventListener('pointermove', moveDrag, true); document.removeEventListener('pointerup', endDrag, true); document.removeEventListener('pointercancel', cancelDrag, true); } catch(e) {}
    removeOneGhost(d.ghost);
    cleanupGhosts(true);
    try { document.body.classList.remove('hfmV203DraggingActive'); } catch(e) {}
    try { if (d.button) d.button.classList.remove('hfmV203Held'); } catch(e) {}
    if (cancelled || !d.active) return false;
    var x = ev && typeof ev.clientX === 'number' ? ev.clientX : d.lastX;
    var y = ev && typeof ev.clientY === 'number' ? ev.clientY : d.lastY;
    var targetEl = document.elementFromPoint(x, y);
    var targetRole = targetRoleFromElement(targetEl);
    if (!targetRole) {
      try { if (typeof showToast === 'function') showToast('Kein Zielspieler erkannt.'); } catch(e) {}
      return false;
    }
    return applyMoveByRoles(d.sourceRole, targetRole);
  }
  function moveDrag(ev){
    if (!dragState || (dragState.pointerId != null && ev.pointerId !== dragState.pointerId)) return;
    dragState.lastX = ev.clientX; dragState.lastY = ev.clientY;
    var dx = Math.abs(ev.clientX - dragState.startX), dy = Math.abs(ev.clientY - dragState.startY);
    if (!dragState.active && dx + dy > 6) {
      // Noch vor Ablauf des Holds nicht die Seite scrollen blockieren.
      return;
    }
    if (!dragState.active) return;
    ev.preventDefault(); ev.stopPropagation();
    if (dragState.ghost) {
      dragState.ghost.style.left = (ev.clientX + 10) + 'px';
      dragState.ghost.style.top = (ev.clientY + 10) + 'px';
    }
  }
  function endDrag(ev){
    if (!dragState || (dragState.pointerId != null && ev.pointerId !== dragState.pointerId)) return;
    ev.preventDefault(); ev.stopPropagation();
    finishDrag(ev, false);
  }
  function cancelDrag(ev){ finishDrag(ev, true); }

  window.hfmV203StartSubDrag = function(event, playerId){
    if (!event) return false;
    var p = findPlayer(playerId);
    if (!p) { alert('Spieler nicht gefunden.'); return false; }
    var role = roleForPlayer(p);
    var btn = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    dragState = {
      playerId:idStr(playerId), player:p, sourceRole:role, button:btn,
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY,
      lastX:event.clientX, lastY:event.clientY, active:false, ghost:null,
      holdTimer:null
    };
    try { btn.setPointerCapture(event.pointerId); } catch(e) {}
    try { document.addEventListener('pointermove', moveDrag, true); document.addEventListener('pointerup', endDrag, true); document.addEventListener('pointercancel', cancelDrag, true); } catch(e) {}
    dragState.holdTimer = setTimeout(function(){
      if (!dragState || dragState.playerId !== idStr(playerId)) return;
      dragState.active = true;
      try { document.body.classList.add('hfmV203DraggingActive'); } catch(e) {}
      try { btn.classList.add('hfmV203Held'); } catch(e) {}
      var g = document.createElement('div');
      g.className = 'hfmV203SubGhost';
      g.textContent = '↔ ' + (p.name || 'Spieler');
      g.style.left = (dragState.lastX + 10) + 'px';
      g.style.top = (dragState.lastY + 10) + 'px';
      document.body.appendChild(g);
      dragState.ghost = g;
    }, 180);
    return false;
  };

  window.hfmV203CancelClick = function(event){
    if (event) { event.preventDefault(); event.stopPropagation(); }
    return false;
  };


  // Sicherheitsnetz: Falls beim Loslassen direkt ein Modal/Simulation gerendert wird,
  // duerfen keine schwebenden Spieler-Badges im DOM haengen bleiben.
  try {
    window.addEventListener('blur', function(){ cleanupGhosts(true); }, true);
    window.addEventListener('pagehide', function(){ cleanupGhosts(true); }, true);
    document.addEventListener('visibilitychange', function(){ if (document.hidden) cleanupGhosts(true); }, true);
    document.addEventListener('pointerdown', function(){ cleanupGhosts(false); }, true);
    document.addEventListener('touchstart', function(){ cleanupGhosts(false); }, true);
  } catch(e) {}

  function subButton(player){
    return '<button type="button" class="hfmV203SubBtn" aria-label="Wechselbutton fuer '+h(player.name)+'" oncontextmenu="return false" onclick="return hfmV203CancelClick(event)" onpointerdown="return hfmV203StartSubDrag(event, \''+h(player.id)+'\')">↔<span>Wechsel</span></button>';
  }

  var columns = {
    number: { label:'#', cell:function(p, number){ return String(number); } },
    status: { label:'St.', cell:function(p, number, role){ return '<b>'+(role.type === 'lineup' ? 'SF' : role.type === 'bench' ? 'B' : 'T')+'</b>'; } },
    pos: { label:'Pos.', cell:function(p, number, role){ return '<b>'+h(role.pos || p.pos || '-')+'</b>'; } },
    secondary: { label:'Nebenpos.', cell:function(p){ return h(Array.isArray(p.secondary) ? p.secondary.join(' / ') : '-'); } },
    name: { label:'Name', cell:function(p){ return '<strong>'+h(p.name)+'</strong>'; } },
    age: { label:'Alter', cell:function(p){ return String(n(p.age)); } },
    strength: { label:'Stärke', cell:function(p, number, role, fit){ return '<b>'+h(fit)+'</b>'; } },
    talent: { label:'Talent', cell:function(p){ try { return '<span class="stars">'+stars(p.talent || 1)+'</span>'; } catch(e){ return h(p.talent || 1); } } },
    moral: { label:'Moral', cell:function(p){ return String(n(p.satisfaction || 60)); } },
    fitness: { label:'Fit.', cell:function(p){ try { return String(hfmV87PlayerFitness(p)); } catch(e){ return String(n(p.fitness || 100)); } } },
    form: { label:'Form', cell:function(p){ try { return h(hfmV87PlayerForm(p)); } catch(e){ return h(p.form || '-'); } } },
    contract: { label:'Vertrag', cell:function(p){ return String(n(p.contractYears)) + ' J.'; } },
    marketValue: { label:'Marktwert', cell:function(p){ try { return euro(p.marketValue || 0); } catch(e){ return h(p.marketValue || 0); } } }
  };
  var defaultOrder = ['number','status','pos','secondary','name','age','strength','talent','moral','fitness','form','contract','marketValue'];
  function order(){
    var o = Array.isArray(state.lineupRosterColumnOrder) ? state.lineupRosterColumnOrder.filter(function(id){ return !!columns[id]; }) : defaultOrder.slice();
    defaultOrder.forEach(function(id){ if (o.indexOf(id) < 0) o.push(id); });
    return o;
  }
  function headerHtml(){
    var rest = '';
    try { if (typeof hfmV90RosterHeaderHtml === 'function') rest = hfmV90RosterHeaderHtml(); } catch(e) {}
    if (!rest) rest = order().map(function(id){ return '<th><span>'+columns[id].label+'</span></th>'; }).join('');
    return '<th class="hfmV203SubHeader"><span>Wechsel</span></th>' + rest;
  }
  function rosterRow(player, number){
    var role = roleForPlayer(player);
    var fit = role.type === 'lineup' ? (function(){ try { return effectiveStrength(player, role.pos); } catch(e){ return player.strength; } })() : player.strength;
    var cls = role.type === 'lineup' ? 'starterRow' : role.type === 'bench' ? 'benchRow' : 'squadRow';
    var cells = order().map(function(id){
      var c = columns[id];
      var extra = id === 'status' ? ' statusShort' : id === 'talent' ? ' talentCell' : '';
      return '<td class="'+extra+'" data-roster-cell="'+h(id)+'">'+c.cell(player, number, role, fit)+'</td>';
    }).join('');
    return '<tr class="rosterTableRow '+cls+' hfmV203PlayerTarget" data-hfm-v203-player-id="'+h(player.id)+'" onclick="return hfmV90OpenOwnPlayerProfile ? hfmV90OpenOwnPlayerProfile(event, '+Number(player.id)+') : openOwnPlayerProfile('+Number(player.id)+')"><td class="hfmV203SubCell">'+subButton(player)+'</td>'+cells+'</tr>';
  }
  function emptyBenchRows(){
    normalizeBenchSeven();
    var next = players().length + 1;
    var colCount = order().length;
    return safeBenchSlots().map(function(slot){
      if ((state.bench || {})[slot.id]) return '';
      return '<tr class="rosterTableRow benchRow hfmV203EmptyBankTarget" data-hfm-v203-empty-bank-slot="'+h(slot.id)+'"><td class="hfmV203SubCell"><span class="hfmV203EmptyDot">+</span></td><td colspan="'+colCount+'"><b>Bank '+(slot.index+1)+'</b> · Freier Bankplatz</td></tr>';
    }).join('');
  }
  function rosterTable(){
    normalizeBenchSeven();
    var ps = players().filter(function(p){ return p.loan !== 'verliehen'; });
    var sorted = ps.slice().sort(function(a,b){
      var ra = roleForPlayer(a), rb = roleForPlayer(b);
      return (ra.order || 9) - (rb.order || 9) || (ra.index || 99) - (rb.index || 99) || n(b.strength) - n(a.strength);
    });
    var rows = sorted.map(function(p,i){ return rosterRow(p, i+1); }).join('') + emptyBenchRows();
    return '<section class="rosterTablePanel hfmV203RosterPanel"><h3>Kaderliste</h3><div class="miniHint"><b>Handy-Wechsel:</b> Den Button <b>↔ Wechsel</b> gedrückt halten und auf den Zielspieler ziehen. Die Zeile selbst bleibt scrollbar.</div><div class="tableWrap rosterTableWrap"><table class="rosterTable rosterTableV90 hfmV203RosterTable"><thead><tr>'+headerHtml()+'</tr></thead><tbody>'+rows+'</tbody></table></div><div class="miniLegend"><span><b>SF</b> Startformation</span><span><b>B</b> Bank</span><span><b>T</b> Tribüne</span></div></section>';
  }

  window.hfmV203LineupRosterTable = rosterTable;
  window.hfmV203RosterRow = rosterRow;
  try {
    hfmV90RosterRow = rosterRow;
    hfmV90LineupRosterTable = rosterTable;
    hfmV89RosterRow = rosterRow;
    hfmV89LineupRosterTable = rosterTable;
    hfmV88RosterRow = rosterRow;
    hfmV88LineupRosterTable = rosterTable;
  } catch(e) {}

  var baseLineup = typeof lineup === 'function' ? lineup : null;
  lineup = function(){
    // Aufstellung selbst weiter wie bisher, aber die Feldspieler sind jetzt auch Drop-Ziele.
    try {
      var formationButtons = Object.keys(FORMATIONS).map(function(f){ return '<button class="chip '+(state.formation === f ? 'selected' : '')+'" onclick="setFormation(\''+h(f)+'\')">'+h(f)+'</button>'; }).join('');
      var markers = safeActivePositions().map(function(slot){
        var selectedId = (state.lineup || {})[slot.id];
        var selectedPlayer = findPlayer(selectedId);
        var fit = selectedPlayer && typeof positionFit === 'function' ? positionFit(selectedPlayer, slot.pos) : { className:'' };
        var eff = selectedPlayer && typeof effectiveStrength === 'function' ? effectiveStrength(selectedPlayer, slot.pos) : 0;
        var name = selectedPlayer ? String(selectedPlayer.name || '').split(' ').slice(-1)[0] : 'frei';
        var click = selectedPlayer ? 'onclick="openOwnPlayerProfile('+Number(selectedPlayer.id)+')"' : '';
        var drag = typeof hfmV87DragAttrs === 'function' ? hfmV87DragAttrs('lineup', slot.id) : '';
        return '<button class="fieldPlayer draggablePlayer '+h(fit.className || '')+' hfmV203FieldTarget" data-slot-id="'+h(slot.id)+'" data-hfm-v203-slot-type="lineup" data-hfm-v203-slot-id="'+h(slot.id)+'" '+drag+' style="left:'+n(slot.x)+'%; top:'+n(slot.y)+'%;" '+click+' aria-label="'+h(slot.pos)+': '+(selectedPlayer ? h(selectedPlayer.name) : 'frei')+'"><span class="fieldPos">'+h(slot.pos)+'</span><strong>'+h(name)+'</strong><small>'+(selectedPlayer ? h(eff) : '+')+'</small></button>';
      }).join('');
      return '<section class="panel"><p class="eyebrow">Team · Aufstellung</p><div class="chips">'+formationButtons+'</div><div class="lineupSummary"><span>Formation: <b>'+h(state.formation)+'</b></span><span>Effektive Startelf Ø <b>'+(typeof lineupStrength === 'function' ? lineupStrength() : '-')+'</b></span><span>Positionsprobleme: <b>'+(typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : '-')+'</b></span></div><div class="visualPitch freeFormationPitch" role="group" aria-label="Visuelle Aufstellung"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>'+markers+'</div>'+rosterTable()+(typeof playerProfileModal === 'function' ? playerProfileModal() : '')+'</section>';
    } catch(err) {
      return baseLineup ? baseLineup() : '<section class="panel"><h2>Aufstellung</h2><div class="infoBox">Aufstellung konnte nicht geladen werden.</div></section>';
    }
  };

  var style = document.createElement('style');
  style.textContent = '\n.hfmV203RosterPanel .miniHint{line-height:1.35}\n.hfmV203SubHeader,.hfmV203SubCell{position:sticky;left:0;z-index:2;background:rgba(15,29,49,.96)}\n.hfmV203SubCell{min-width:92px;white-space:nowrap}\n.hfmV203SubBtn{display:inline-flex;align-items:center;gap:5px;border:1px solid rgba(97,239,197,.55);background:rgba(97,239,197,.14);color:#eafffb;border-radius:999px;padding:6px 8px;font-weight:800;font-size:11px;line-height:1;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:grab}\n.hfmV203SubBtn span{font-size:10px}.hfmV203SubBtn.hfmV203Held{background:rgba(97,239,197,.35);box-shadow:0 0 0 3px rgba(97,239,197,.18);cursor:grabbing}.hfmV203SubGhost{position:fixed;z-index:999999;pointer-events:none;background:rgba(15,29,49,.96);border:1px solid rgba(97,239,197,.7);color:#fff;border-radius:999px;padding:8px 11px;font-weight:900;font-size:12px;box-shadow:0 12px 30px rgba(0,0,0,.45)}\n.hfmV203DraggingActive .hfmV203PlayerTarget,.hfmV203DraggingActive .hfmV203FieldTarget,.hfmV203DraggingActive .hfmV203EmptyBankTarget{outline:2px dashed rgba(97,239,197,.42);outline-offset:-3px}.hfmV203EmptyDot{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:999px;border:1px dashed rgba(97,239,197,.6);color:#61efc5;font-weight:900}\n@media(max-width:640px){.hfmV203SubCell{min-width:82px}.hfmV203SubBtn{padding:8px 9px;font-size:12px}.hfmV203SubBtn span{font-size:9px}.hfmV203RosterTable th,.hfmV203RosterTable td{font-size:12px}}\n';
  document.head.appendChild(style);

  try { if (state && state.tab === 'team' && state.teamSection === 'lineup') render(); } catch(e) {}
})();

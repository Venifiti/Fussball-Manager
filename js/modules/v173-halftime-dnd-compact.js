/* v173: Halbzeit-Formation wie normale Aufstellung per Drag & Drop + kompakte Kaderliste ohne Wechselblock */
(function(){
  'use strict';

  function html(value){
    try { if (typeof hfmV171Html === 'function') return hfmV171Html(value); } catch(e) {}
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function getPlayer(id){ return (state.players || []).find(p => Number(p.id) === Number(id)); }
  function noteFor(player, minute){
    try { if (typeof hfmV171PlayerNote === 'function') return hfmV171PlayerNote(player, minute || 45); } catch(e) {}
    return player && Number.isFinite(Number(player.rating)) ? Number(player.rating).toFixed(1) : '-';
  }
  function drag(type, slotId){
    try { if (typeof hfmV87DragAttrs === 'function') return hfmV87DragAttrs(type, slotId); } catch(e) {}
    try { if (typeof dragAttrs === 'function') return dragAttrs(type, slotId); } catch(e) {}
    return `draggable="true" ondragstart="squadDragStart(event,'${type}','${slotId}')" ondragover="squadDragOver(event)" ondrop="dropSquadPlayer(event,'${type}','${slotId}')"`;
  }
  function dropTarget(type, slotId){
    return `ondragover="squadDragOver(event)" ondrop="dropSquadPlayer(event,'${type}','${slotId}')"`;
  }
  function playerFit(player, pos){
    try { return player && pos ? effectiveStrength(player, pos) : Number(player && player.strength || 0); } catch(e) { return Number(player && player.strength || 0); }
  }
  function posText(player){
    try { return positionText(player); } catch(e) { return player && player.pos || ''; }
  }
  function statusBadges(id){
    try { if (typeof getMatchStatusBadges === 'function') return getMatchStatusBadges(id, 'small'); } catch(e) {}
    return '';
  }
  function isHalftimeEdit(){
    const phase = state && state.activeMatch && state.activeMatch.phase;
    return phase === 'halftime' || phase === 'tacticalStop' || state.tab === 'matchHalftime';
  }

  const baseDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
    if (!isHalftimeEdit()) return baseDrop ? baseDrop(event, targetType, targetSlotId) : undefined;
    if (event && event.preventDefault) event.preventDefault();
    let source = null;
    try { source = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : null; } catch(e) {}
    source = source || state.dragSquadSource || null;
    state.dragSquadSource = null;
    if (!source || !source.type || source.slotId == null) return false;
    if (String(source.type) === String(targetType) && String(source.slotId) === String(targetSlotId)) return false;

    const sourceId = typeof playerIdInSquadSlot === 'function' ? Number(playerIdInSquadSlot(source.type, source.slotId) || 0) : 0;
    const targetId = typeof playerIdInSquadSlot === 'function' ? Number(playerIdInSquadSlot(targetType, targetSlotId) || 0) : 0;
    if (!sourceId) return false;

    // Startelf intern verschieben: reine Positionsumstellung, kein Wechselverbrauch.
    if (source.type === 'lineup' && targetType === 'lineup') {
      state.lineup[source.slotId] = targetId || null;
      state.lineup[targetSlotId] = sourceId;
      try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e) {}
      render();
      return false;
    }

    // Bank intern sortieren: kein Wechselverbrauch.
    if (source.type === 'bench' && targetType === 'bench') {
      if (!state.bench) state.bench = {};
      state.bench[source.slotId] = targetId || null;
      state.bench[targetSlotId] = sourceId;
      render();
      return false;
    }

    // Einwechslung: Bankspieler auf Feldposition ziehen.
    if (source.type === 'bench' && targetType === 'lineup') {
      if (typeof liveSubstitute === 'function') liveSubstitute(targetSlotId, sourceId);
      return false;
    }

    // Alternative Richtung: Startelfspieler auf einen besetzten Bankplatz ziehen.
    if (source.type === 'lineup' && targetType === 'bench') {
      if (!targetId) {
        alert('Ziehe zum Auswechseln einen Bankspieler direkt auf die Feldposition. Ein Startelfspieler kann nicht einfach ohne Ersatz vom Feld genommen werden.');
        render();
        return false;
      }
      if (typeof liveSubstitute === 'function') liveSubstitute(source.slotId, targetId);
      return false;
    }

    alert('Während der Halbzeit sind nur Verschiebungen innerhalb der Startelf, innerhalb der Bank oder Wechsel zwischen Bank und Feld möglich.');
    render();
    return false;
  };

  window.hfmV173OpenHalfPlayer = function(event, id){
    try {
      if (event && event.target && event.target.closest && event.target.closest('[data-no-profile="1"]')) return false;
      if (typeof hfmV90OpenOwnPlayerProfile === 'function') return hfmV90OpenOwnPlayerProfile(event, Number(id));
      if (typeof hfmV89OpenOwnPlayerProfile === 'function') return hfmV89OpenOwnPlayerProfile(event, Number(id));
      if (typeof openOwnPlayerProfile === 'function') return openOwnPlayerProfile(Number(id));
    } catch(e) {}
    return false;
  };

  function lineupItem(slot){
    const player = getPlayer(state.lineup && state.lineup[slot.id]);
    const note = noteFor(player, 45);
    const fit = player ? playerFit(player, slot.pos) : 0;
    const attrs = player ? drag('lineup', slot.id) : dropTarget('lineup', slot.id);
    return `<button type="button" class="hfmV173RosterItem starter" ${attrs} onclick="return ${player ? `hfmV173OpenHalfPlayer(event, ${Number(player.id)})` : 'false'}">
      <span class="hfmV173RosterStatus"><b>Startelf</b><small>${html(slot.pos)}</small></span>
      <span class="hfmV173RosterName"><b>${player ? html(player.name) : 'frei'}</b><small>${player ? html(posText(player)) : 'Position frei'}</small></span>
      <span class="hfmV173RosterStat"><b>${player ? fit : '-'}</b><small>Stärke</small></span>
      <span class="hfmV173RosterNote"><b>${note}</b><small>Note</small></span>
    </button>`;
  }

  function benchItem(slot){
    const player = getPlayer(state.bench && state.bench[slot.id]);
    const note = noteFor(player, 45);
    const attrs = player ? drag('bench', slot.id) : dropTarget('bench', slot.id);
    return `<button type="button" class="hfmV173RosterItem bench ${player ? '' : 'empty'}" ${attrs} onclick="return ${player ? `hfmV173OpenHalfPlayer(event, ${Number(player.id)})` : 'false'}">
      <span class="hfmV173RosterStatus"><b>Bank ${Number(slot.index || 0) + 1}</b><small>${player ? 'Ersatz' : 'frei'}</small></span>
      <span class="hfmV173RosterName"><b>${player ? html(player.name) : 'frei'}</b><small>${player ? html(posText(player)) : 'freier Bankplatz'}</small></span>
      <span class="hfmV173RosterStat"><b>${player ? Number(player.strength || 0) : '-'}</b><small>Stärke</small></span>
      <span class="hfmV173RosterNote"><b>${player ? note : '-'}</b><small>Note</small></span>
    </button>`;
  }

  window.hfmV171HalftimeRosterList = function(){
    const starters = (typeof activePositions === 'function' ? activePositions() : []).map(lineupItem).join('');
    const bench = (typeof benchSlots === 'function' ? benchSlots() : []).map(benchItem).join('');
    return `<section class="halftimeRosterPanel hfmV173RosterPanel">
      <div class="hfmV173RosterHead"><h3>Halbzeit-Kaderliste</h3><span>${typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0}/5 Wechsel genutzt</span></div>
      <div class="miniHint">Ziehe Bankspieler auf eine Feldposition zum Wechseln. Ziehe Startelfspieler untereinander, um Positionen zu tauschen. Die Noten sind die aktuellen Halbzeitwerte.</div>
      <div class="hfmV173RosterGrid">${starters}${bench}</div>
    </section>`;
  };

  window.halftimeFormationPitch = halftimeFormationPitch = function(){
    const markers = (typeof activePositions === 'function' ? activePositions() : []).map(slot => {
      const selectedId = state.lineup && state.lineup[slot.id];
      const selectedPlayer = getPlayer(selectedId);
      const fit = typeof positionFit === 'function' ? positionFit(selectedPlayer, slot.pos) : { className: '' };
      const eff = selectedPlayer ? playerFit(selectedPlayer, slot.pos) : 0;
      const name = selectedPlayer ? String(selectedPlayer.name || '').split(' ').slice(-1)[0] : 'frei';
      const note = noteFor(selectedPlayer, 45);
      const attrs = selectedPlayer ? drag('lineup', slot.id) : dropTarget('lineup', slot.id);
      const click = selectedPlayer ? `onclick="return hfmV173OpenHalfPlayer(event, ${Number(selectedPlayer.id)})"` : '';
      const badges = selectedPlayer ? statusBadges(selectedPlayer.id) : '';
      return `<button type="button" class="fieldPlayer halftimeFieldPlayer draggablePlayer ${fit.className || ''}" data-slot-id="${html(slot.id)}" ${attrs} style="left:${slot.x}%; top:${slot.y}%;" ${click} aria-label="${html(slot.pos)}: ${selectedPlayer ? html(selectedPlayer.name) : 'frei'}">
        <span class="fieldPos">${html(slot.pos)}</span><strong>${html(name)}</strong><small>${selectedPlayer ? eff : '+'}</small>${selectedPlayer ? `<span class="halftimeNoteBadge">Note ${html(note)}</span>` : ''}${badges ? `<span class="fieldStatusBadges">${badges}</span>` : ''}
      </button>`;
    }).join('');
    const used = typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0;
    return `<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>${html(state.formation)}</b></span><span>Effektive Startelf Ø <b>${typeof lineupStrength === 'function' ? lineupStrength() : '-'}</b></span><span>Positionsprobleme: <b>${typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : 0}</b></span><span>Wechsel: <b>${used}/5</b></span></div>
      <div class="visualPitch halftimePitch freeFormationPitch hfmV173HalfPitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div>`;
  };

  window.halftimeChangeScreen = halftimeChangeScreen = function(){
    const current = ['report','formation','tactic'].includes(state.halftimeEditSection) ? state.halftimeEditSection : 'report';
    const match = state.activeMatch;
    const minute = match && match.phase === 'tacticalStop' ? Number(match.currentMinute || (match.tacticalStop && match.tacticalStop.minute) || 0) : 45;
    const menuTitle = match && match.phase === 'tacticalStop' ? `Taktikstopp · ${minute}. Minute` : 'Halbzeit-Menue';
    const reportTitle = match && match.phase === 'tacticalStop' ? `Spielbericht bis zur ${minute}. Minute` : 'Spielbericht zur Halbzeit';
    if (current === 'report') {
      return `<h3>${menuTitle}</h3>${typeof halftimeEditTabs === 'function' ? halftimeEditTabs() : ''}<div class="halftimeEditBox"><h3>${reportTitle}</h3>${match && typeof matchStatRows === 'function' ? matchStatRows(matchStatsForHalf(minute)) : ''}${typeof matchStatusOverview === 'function' ? matchStatusOverview() : ''}${typeof hfmV71LiveRatingTable === 'function' ? hfmV71LiveRatingTable(minute, match && match.phase === 'tacticalStop' ? 'Aktuelle Spielernoten' : 'Benotung 1. Halbzeit') : ''}<h3>Wichtige Ereignisse</h3>${typeof importantEventList === 'function' ? importantEventList(match && match.log || []) : ''}</div>`;
    }
    if (current === 'tactic') {
      return `<h3>${menuTitle}</h3>${typeof halftimeEditTabs === 'function' ? halftimeEditTabs() : ''}<div class="halftimeEditBox"><h3>Taktik ändern</h3>${typeof tacticsView === 'function' ? tacticsView() : ''}</div>`;
    }
    return `<h3>${menuTitle}</h3>${typeof halftimeEditTabs === 'function' ? halftimeEditTabs() : ''}<div class="halftimeEditBox hfmV173FormationBox"><h3>Formation ändern</h3><div class="chips">${typeof formationButtonsForMatch === 'function' ? formationButtonsForMatch() : ''}</div>${halftimeFormationPitch()}${hfmV171HalftimeRosterList()}</div>`;
  };

  try { render(); } catch(e) {}
})();

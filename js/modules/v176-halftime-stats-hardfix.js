/* v176: finaler Halbzeit-/Ereignis-/Spielerstatistik-Hardfix nach v173-Modul */
(function(){
  'use strict';

  function html(value){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function num(value){ var n = Number(value); return Number.isFinite(n) ? n : 0; }
  function ownClub(){ try { return typeof ownClubName === 'function' ? ownClubName() : (state.clubName || 'Eigener Verein'); } catch(e){ return 'Eigener Verein'; } }
  function playerById(id){ return (state.players || []).find(function(p){ return Number(p.id) === Number(id); }); }
  function currentMinute(){
    var m = state.activeMatch || {};
    if (m.phase === 'tacticalStop') return Number(m.currentMinute || (m.tacticalStop && m.tacticalStop.minute) || 45);
    return 45;
  }
  function inHalfMode(){
    return !!(state && state.activeMatch && ['halftime','tacticalStop','interrupted'].indexOf(state.activeMatch.phase) >= 0);
  }
  function shortDisplayName(full){
    var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'frei';
    if (parts.length === 1) return parts[0];
    return parts[0].charAt(0).toUpperCase() + '. ' + parts.slice(1).join(' ');
  }
  function lastName(full){
    var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : 'frei';
  }
  function posText(player){
    try { return typeof positionText === 'function' ? positionText(player) : (player && player.pos || ''); } catch(e){ return player && player.pos || ''; }
  }
  function benchSlotsSafe(){
    try { if (typeof benchSlots === 'function') return benchSlots(); } catch(e) {}
    return ['b1','b2','b3','b4','b5','b6','b7'].map(function(id, index){ return { id:id, index:index }; });
  }
  function lineupSlotsSafe(){
    try { if (typeof activePositions === 'function') return activePositions(); } catch(e) {}
    return [];
  }
  function getSlotId(type, slotId){ return Number(((type === 'lineup' ? state.lineup : state.bench) || {})[slotId] || 0); }
  function setSlotId(type, slotId, id){
    if (type === 'lineup') { if (!state.lineup) state.lineup = {}; state.lineup[slotId] = id ? Number(id) : null; }
    else { if (!state.bench) state.bench = {}; state.bench[slotId] = id ? Number(id) : null; }
  }
  function saveQuiet(){ try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e) {} }
  function softRender(){
    var x = window.scrollX || 0, y = window.scrollY || 0;
    try { document.body.classList.add('hfmV176NoFlicker'); } catch(e) {}
    try { if (typeof render === 'function') render(); } catch(e) {}
    try { requestAnimationFrame(function(){ window.scrollTo(x,y); document.body.classList.remove('hfmV176NoFlicker'); }); } catch(e){ try { document.body.classList.remove('hfmV176NoFlicker'); } catch(_){} }
  }

  /* Ereignisse sauber und ohne Ueberlappung rendern */
  function eventMeta(line){
    var t = String(line || '').toLowerCase();
    if (t.indexOf('rote karte') >= 0 || t.indexOf('rot für') >= 0 || t.indexOf('rot fuer') >= 0) return { icon:'🟥', cls:'red', label:'Rote Karte' };
    if (t.indexOf('gelbe karte') >= 0 || t.indexOf('gelb für') >= 0 || t.indexOf('gelb fuer') >= 0) return { icon:'🟨', cls:'yellow', label:'Gelbe Karte' };
    if (t.indexOf('verletz') >= 0 || t.indexOf('angeschlagen') >= 0) return { icon:'🩹', cls:'injury', label:'Verletzung' };
    if (t.indexOf('tor') >= 0 || t.indexOf('treffer') >= 0 || /\b\d+\s*:\s*\d+\b/.test(t)) return { icon:'⚽', cls:'goal', label:'Tor' };
    return { icon:'•', cls:'normal', label:'Ereignis' };
  }
  window.importantEventList = importantEventList = function(lines){
    var arr = Array.isArray(lines) ? lines.slice() : [];
    if (!arr.length) arr = ['Keine besonderen Ereignisse.'];
    return '<div class="hfmV176Events" role="list">' + arr.map(function(line){
      var meta = eventMeta(line);
      return '<div class="hfmV176Event '+meta.cls+'" role="listitem"><span class="hfmV176EventIcon" aria-label="'+html(meta.label)+'">'+meta.icon+'</span><span class="hfmV176EventText">'+html(line)+'</span></div>';
    }).join('') + '</div>';
  };

  function roleFor(player){
    var lineupEntry = Object.entries(state.lineup || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (lineupEntry) {
      var slot = lineupSlotsSafe().find(function(s){ return String(s.id) === String(lineupEntry[0]); });
      return { type:'lineup', slotId:lineupEntry[0], pos:slot ? slot.pos : (player.pos || ''), order:1, index:slot ? num(slot.index) : 0 };
    }
    var benchEntry = Object.entries(state.bench || {}).find(function(e){ return Number(e[1]) === Number(player.id); });
    if (benchEntry) {
      var idx = benchSlotsSafe().findIndex(function(s){ return String(s.id) === String(benchEntry[0]); });
      return { type:'bench', slotId:benchEntry[0], pos:player.pos || '', order:2, index:idx >= 0 ? idx : 9 };
    }
    return { type:'reserve', slotId:String(player.id), pos:player.pos || '', order:3, index:99 };
  }
  function dragAttrs(type, slotId){
    if (type !== 'lineup' && type !== 'bench') return '';
    return 'draggable="true" ondragstart="squadDragStart(event,\''+type+'\',\''+String(slotId).replace(/'/g,'')+'\')" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\''+type+'\',\''+String(slotId).replace(/'/g,'')+'\')"';
  }
  window.hfmV176HalftimeRosterList = window.hfmV175HalftimeRosterList = window.hfmV174HalftimeRosterList = window.hfmV171HalftimeRosterList = function(){
    var players = (state.players || []).filter(function(p){ return p && p.loan !== 'verliehen'; }).slice();
    players.sort(function(a,b){
      var ra = roleFor(a), rb = roleFor(b);
      return (ra.order-rb.order) || (ra.index-rb.index) || (num(b.strength)-num(a.strength)) || String(a.name || '').localeCompare(String(b.name || ''));
    });
    var cards = players.map(function(player){
      var role = roleFor(player);
      var isLineup = role.type === 'lineup';
      var fit = isLineup && typeof effectiveStrength === 'function' ? effectiveStrength(player, role.pos || player.pos) : num(player.strength);
      var cls = isLineup ? 'starter' : role.type === 'bench' ? 'bench' : 'reserve';
      var leftTop = isLineup ? shortDisplayName(player.name) : (role.type === 'bench' ? ('Bank ' + (role.index + 1)) : 'Kader');
      return '<article class="hfmV176HalfCard '+cls+'" '+dragAttrs(role.type, role.slotId)+' onclick="return hfmV90OpenOwnPlayerProfile ? hfmV90OpenOwnPlayerProfile(event, '+Number(player.id)+') : openOwnPlayerProfile('+Number(player.id)+')">'+
        '<div class="hfmV176HalfCardTop"><b>'+html(leftTop)+'</b><span>'+fit+' Stärke</span></div>'+ 
        '<strong class="hfmV176HalfName">'+html(shortDisplayName(player.name))+'</strong>'+ 
        '<small class="hfmV176HalfPos">'+html(posText(player))+'</small>'+ 
      '</article>';
    }).join('');
    return '<section class="halftimeRosterPanel hfmV176HalfRoster"><div class="hfmV176HalfRosterHead"><h3>Halbzeit-Kaderliste</h3><span class="requiredBadge">'+(typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0)+'/5 Wechsel genutzt</span></div><div class="miniHint">Grün = Spieler steht am Feld. Namen und Positionen sind vollständig lesbar; Noten siehst du oben in der Formation.</div><div class="hfmV176HalfGrid">'+cards+'</div></section>';
  };

  window.halftimeFormationPitch = halftimeFormationPitch = function(){
    var markers = lineupSlotsSafe().map(function(slot){
      var id = state.lineup && state.lineup[slot.id];
      var player = playerById(id);
      var fit = typeof positionFit === 'function' ? positionFit(player, slot.pos) : { className:'' };
      var eff = player && typeof effectiveStrength === 'function' ? effectiveStrength(player, slot.pos) : 0;
      var note = player && typeof hfmV171PlayerNote === 'function' ? hfmV171PlayerNote(player, currentMinute()) : '-';
      var status = player && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(player.id, 'small') : '';
      return '<button type="button" class="fieldPlayer halftimeFieldPlayer hfmV176FieldPlayer '+(fit.className || '')+'" data-slot-id="'+html(slot.id)+'" ondragover="squadDragOver(event)" ondrop="return dropSquadPlayer(event,\'lineup\',\''+html(slot.id)+'\')" style="left:'+num(slot.x)+'%; top:'+num(slot.y)+'%;" aria-label="'+html(slot.pos)+': '+(player ? html(player.name) : 'frei')+'">'+
        '<span class="fieldPos">'+html(slot.pos)+'</span><strong>'+html(player ? lastName(player.name) : 'frei')+'</strong><small>'+(player ? eff : '+')+'</small>'+(player ? '<span class="halftimeNoteBadge">Note '+html(note)+'</span>' : '')+(status ? '<span class="fieldStatusBadges">'+status+'</span>' : '')+'</button>';
    }).join('');
    return '<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>'+html(state.formation || '')+'</b></span><span>Effektive Startelf Ø <b>'+(typeof lineupStrength === 'function' ? lineupStrength() : '-')+'</b></span><span>Positionsprobleme: <b>'+(typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() : '-')+'</b></span><span>Wechsel: <b>'+(typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0)+'/5</b></span></div><div class="visualPitch halftimePitch freeFormationPitch hfmV176Pitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>'+markers+'</div>';
  };

  window.halftimeChangeScreen = halftimeChangeScreen = function(){
    var current = ['report','formation','tactic'].indexOf(state.halftimeEditSection) >= 0 ? state.halftimeEditSection : 'report';
    var match = state.activeMatch;
    var minute = currentMinute();
    var menuTitle = match && match.phase === 'tacticalStop' ? ('Taktikstopp · '+minute+'. Minute') : 'Halbzeit-Menue';
    var reportTitle = match && match.phase === 'tacticalStop' ? ('Spielbericht bis zur '+minute+'. Minute') : 'Spielbericht zur Halbzeit';
    if (current === 'report') return '<h3>'+menuTitle+'</h3>'+halftimeEditTabs()+'<div class="halftimeEditBox hfmV176ReportBox"><h3>'+reportTitle+'</h3>'+(match && typeof matchStatsForHalf === 'function' ? matchStatRows(matchStatsForHalf(minute)) : '')+(typeof matchStatusOverview === 'function' ? matchStatusOverview() : '')+(typeof hfmV71LiveRatingTable === 'function' ? hfmV71LiveRatingTable(minute, match && match.phase === 'tacticalStop' ? 'Aktuelle Spielernoten' : 'Benotung 1. Halbzeit') : '')+'<h3>Wichtige Ereignisse</h3>'+importantEventList(match && match.log || [])+'</div>';
    if (current === 'tactic') return '<h3>'+menuTitle+'</h3>'+halftimeEditTabs()+'<div class="halftimeEditBox"><h3>Taktik ändern</h3>'+(typeof tacticsView === 'function' ? tacticsView() : '')+'</div>';
    return '<h3>'+menuTitle+'</h3>'+halftimeEditTabs()+'<div class="halftimeEditBox hfmV176FormationBox"><h3>Formation ändern</h3><div class="chips">'+(typeof formationButtonsForMatch === 'function' ? formationButtonsForMatch() : '')+'</div>'+halftimeFormationPitch()+hfmV176HalftimeRosterList()+'</div>';
  };

  var oldDrop = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
    try { if (event) { event.preventDefault(); event.stopPropagation(); } } catch(e) {}
    var src = null;
    try { src = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : (state.dragSquadSource || null); } catch(e){ src = state.dragSquadSource || null; }
    if (!inHalfMode() || !src || !src.type || src.slotId == null) return oldDrop ? oldDrop(event, targetType, targetSlotId) : false;
    if (src.type === targetType && String(src.slotId) === String(targetSlotId)) return false;
    var sourceId = getSlotId(src.type, src.slotId), targetId = getSlotId(targetType, targetSlotId);
    if (!sourceId) return false;
    var m = state.activeMatch || {};
    if (!Array.isArray(m.subs)) m.subs = [];
    if (typeof m.subCount !== 'number') m.subCount = m.subs.length || 0;
    var countsSub = (src.type !== targetType) && (src.type === 'bench' || targetType === 'bench');
    if (countsSub && m.subCount >= 5) { alert('Du hast bereits 5 Auswechslungen vorgenommen.'); return false; }
    if (src.type === 'lineup' && targetType === 'lineup') {
      setSlotId('lineup', src.slotId, targetId || null); setSlotId('lineup', targetSlotId, sourceId);
    } else if (src.type === 'bench' && targetType === 'lineup') {
      setSlotId('lineup', targetSlotId, sourceId); setSlotId('bench', src.slotId, targetId || null); m.subCount += 1;
      var incoming = playerById(sourceId), outgoing = playerById(targetId); if (incoming) m.subs.push(m.subCount+'. Wechsel: '+incoming.name+' kommt'+(outgoing ? ' für '+outgoing.name : '')+'.');
    } else if (src.type === 'lineup' && targetType === 'bench') {
      if (!targetId) { alert('Ziehe einen Bankspieler direkt auf die Feldposition, die du ersetzen willst.'); return false; }
      setSlotId('lineup', src.slotId, targetId); setSlotId('bench', targetSlotId, sourceId); m.subCount += 1;
      var inP = playerById(targetId), outP = playerById(sourceId); if (inP) m.subs.push(m.subCount+'. Wechsel: '+inP.name+' kommt'+(outP ? ' für '+outP.name : '')+'.');
    } else if (src.type === 'bench' && targetType === 'bench') {
      setSlotId('bench', src.slotId, targetId || null); setSlotId('bench', targetSlotId, sourceId);
    }
    try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e) {}
    state.dragSquadSource = null; saveQuiet(); softRender(); return false;
  };

  function pointerPoint(ev){ return { x: ev.clientX, y: ev.clientY }; }
  function enableHalfPitchFreeDrag(){
    document.querySelectorAll('.hfmV176Pitch').forEach(function(pitch){
      if (pitch.dataset.v176Ready === '1') return;
      pitch.dataset.v176Ready = '1';
      var dragged = null, pointerId = null, start = null, moved = false;
      function prep(){ pitch.querySelectorAll('.hfmV176FieldPlayer[data-slot-id]').forEach(function(el){ el.setAttribute('draggable','false'); el.style.touchAction = 'none'; }); }
      function update(ev, commit){
        if (!dragged) return false;
        var p = pointerPoint(ev), rect = pitch.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        var dx = Math.abs(p.x - start.x), dy = Math.abs(p.y - start.y);
        if (!moved && dx + dy < 3) return false;
        moved = true; ev.preventDefault(); ev.stopPropagation();
        var x = Math.max(6, Math.min(94, ((p.x - rect.left) / rect.width) * 100));
        var y = Math.max(7, Math.min(93, ((p.y - rect.top) / rect.height) * 100));
        try { if (typeof hfmV77MoveFormationSlot === 'function') hfmV77MoveFormationSlot(dragged.dataset.slotId, x, y); } catch(e) {}
        dragged.style.left = (Math.round(x * 10) / 10) + '%';
        dragged.style.top = (Math.round(y * 10) / 10) + '%';
        if (commit) saveQuiet();
        return true;
      }
      prep();
      pitch.addEventListener('pointerdown', function(ev){
        var el = ev.target.closest('.hfmV176FieldPlayer[data-slot-id]');
        if (!el || (ev.button !== undefined && ev.button !== 0)) return;
        prep(); dragged = el; pointerId = ev.pointerId; start = pointerPoint(ev); moved = false;
        dragged.classList.add('draggingFormationSlot');
        try { dragged.setPointerCapture(pointerId); } catch(e) {}
        ev.preventDefault(); ev.stopPropagation();
      }, true);
      pitch.addEventListener('pointermove', function(ev){ if (dragged && ev.pointerId === pointerId) update(ev, false); }, true);
      function finish(ev){
        if (!dragged || ev.pointerId !== pointerId) return;
        update(ev, true);
        var hadMove = moved;
        try { dragged.releasePointerCapture(pointerId); } catch(e) {}
        dragged.classList.remove('draggingFormationSlot'); dragged = null; pointerId = null; start = null; moved = false;
        if (hadMove) { window.__hfmV176SuppressClickUntil = Date.now() + 500; ev.preventDefault(); ev.stopPropagation(); }
      }
      pitch.addEventListener('pointerup', finish, true);
      pitch.addEventListener('pointercancel', finish, true);
      pitch.addEventListener('dragstart', function(ev){ if (ev.target.closest('.hfmV176FieldPlayer')) ev.preventDefault(); }, true);
      pitch.addEventListener('click', function(ev){ if (window.__hfmV176SuppressClickUntil && Date.now() < window.__hfmV176SuppressClickUntil) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    });
  }

  /* Spielerstatistiken: schoene Kartenlisten, alle Ligaspieler, Noten sichtbar */
  function externalStats(){ if (!Array.isArray(state.externalPlayerStats)) state.externalPlayerStats = []; return state.externalPlayerStats; }
  function allStatPlayers(){
    var own = (state.players || []).map(function(p){
      var games = num(p.seasonRatingGames);
      return { own:true, id:p.id, name:p.name, club:ownClub(), goals:num(p.seasonGoals), assists:num(p.seasonAssists), points:num(p.seasonPoints) || (num(p.seasonGoals)+num(p.seasonAssists)), ratingGames:games, avg:games ? Math.round((num(p.seasonRatingSum)/games)*10)/10 : 0, leagueIndex: (typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 0) };
    });
    var ext = externalStats().map(function(s){
      var games = num(s.ratingGames);
      return { own:false, id:s.playerId || s.id, name:s.name || 'Spieler', club:s.club || 'Verein', goals:num(s.goals), assists:num(s.assists), points:num(s.points) || (num(s.goals)+num(s.assists)), ratingGames:games, avg:games ? Math.round((num(s.ratingSum)/games)*10)/10 : num(s.avg), leagueIndex:num(s.leagueIndex) };
    });
    var map = new Map();
    own.concat(ext).forEach(function(p){
      var key = p.club + '|' + p.name;
      var old = map.get(key);
      var score = p.goals + p.assists + p.ratingGames + (p.own ? 10000 : 0);
      var oldScore = old ? old.goals + old.assists + old.ratingGames + (old.own ? 10000 : 0) : -1;
      if (!old || score >= oldScore) map.set(key, p);
    });
    return Array.from(map.values());
  }
  function statClick(p){
    if (p.own) return 'openOwnPlayerProfile('+Number(p.id)+')';
    return 'openClubRoster(\''+String(p.club || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\', '+Number(p.leagueIndex || 0)+')';
  }
  function statRows(mode){
    var list = allStatPlayers();
    if (mode === 'assists') list = list.filter(function(p){ return p.assists > 0; }).sort(function(a,b){ return b.assists-a.assists || b.goals-a.goals || String(a.name).localeCompare(String(b.name)); });
    else if (mode === 'ratings') list = list.filter(function(p){ return p.avg > 0 && p.ratingGames > 0; }).sort(function(a,b){ return a.avg-b.avg || b.ratingGames-a.ratingGames || String(a.name).localeCompare(String(b.name)); });
    else list = list.filter(function(p){ return p.goals > 0; }).sort(function(a,b){ return b.goals-a.goals || b.assists-a.assists || String(a.name).localeCompare(String(b.name)); });
    if (!list.length) return '<div class="infoBox">Noch keine Einträge für diese Saison.</div>';
    return '<div class="hfmV176StatList">' + list.slice(0,80).map(function(p, i){
      var main, sub;
      if (mode === 'ratings') { main = '<b>Ø Note '+String(p.avg.toFixed ? p.avg.toFixed(1) : p.avg).replace('.', ',')+'</b>'; sub = p.ratingGames+' Spiele bewertet'; }
      else if (mode === 'assists') { main = '<b>'+p.assists+' Vorlagen</b>'; sub = p.goals+' Tore · '+p.points+' Scorerpunkte'; }
      else { main = '<b>'+p.goals+' Tore</b>'; sub = p.assists+' Vorlagen · '+p.points+' Scorerpunkte'; }
      return '<button type="button" class="hfmV176StatRow" onclick="'+statClick(p)+'"><span class="rank">'+(i+1)+'</span><span class="who"><strong>'+html(p.name)+'</strong><small>'+html(p.club)+'</small></span><span class="main">'+main+'<small>'+html(sub)+'</small></span></button>';
    }).join('') + '</div>';
  }
  window.setPlayerStatsMode = setPlayerStatsMode = function(mode){ state.playerStatsMode = ['goals','assists','ratings'].indexOf(mode) >= 0 ? mode : 'goals'; if (typeof render === 'function') render(); };
  window.playerStatsView = playerStatsView = function(){
    var mode = ['goals','assists','ratings'].indexOf(state.playerStatsMode) >= 0 ? state.playerStatsMode : 'goals';
    var title = mode === 'ratings' ? 'Notenbeste Spieler' : mode === 'assists' ? 'Vorlagengeberliste' : 'Torschützenliste';
    var hint = mode === 'ratings' ? 'Fortlaufende Saisonliste nach bestem Notendurchschnitt. Hier zählen die Noten, nicht die Tore.' : 'Fortlaufende Saisonliste aller Ligaspieler. Spieler mit 0 werden in der jeweiligen Liste ausgeblendet.';
    return '<section class="panel"><p class="eyebrow">Saison · Spielerstatistiken</p><h2>Spielerstatistiken</h2><div class="chips"><button class="chip '+(mode==='goals'?'selected':'')+'" onclick="setPlayerStatsMode(\'goals\')">Torschützenliste</button><button class="chip '+(mode==='assists'?'selected':'')+'" onclick="setPlayerStatsMode(\'assists\')">Vorlagengeberliste</button><button class="chip '+(mode==='ratings'?'selected':'')+'" onclick="setPlayerStatsMode(\'ratings\')">Notenbeste Spieler</button></div><div class="infoBox">'+html(hint)+'</div><h3>'+html(title)+'</h3>'+statRows(mode)+'</section>';
  };

  var baseRender = typeof render === 'function' ? render : null;
  window.render = render = function(){ var out = baseRender ? baseRender.apply(this, arguments) : undefined; try { enableHalfPitchFreeDrag(); } catch(e){ console.warn('v176 drag init', e); } return out; };
  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){ if (baseAfter) baseAfter.apply(this, arguments); try { enableHalfPitchFreeDrag(); } catch(e){} };

  var style = document.createElement('style');
  style.textContent = '\n.hfmV176NoFlicker .panel,.hfmV176NoFlicker .matchPanel,.hfmV176NoFlicker .halftimeWindow{animation:none!important;transition:none!important}\n.hfmV176Events{display:grid;gap:8px;background:rgba(255,255,255,.06);border-radius:16px;padding:12px;max-height:220px;overflow:auto;contain:layout paint;position:relative;z-index:1}\n.hfmV176Event{display:flex;align-items:flex-start;gap:10px;min-width:0;position:relative;z-index:1}\n.hfmV176EventIcon{width:24px;height:24px;min-width:24px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);line-height:1}\n.hfmV176EventText{display:block;min-width:0;max-width:100%;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal;line-height:1.35;position:static!important;transform:none!important}\n.matchLogItem .eventText,.eventIconItem .eventText{white-space:normal!important;overflow-wrap:anywhere!important;position:static!important;transform:none!important}\n.hfmV176FormationBox .subGrid,.hfmV176FormationBox>h3:nth-last-child(2){display:none!important}\n.hfmV176Pitch .hfmV176FieldPlayer{touch-action:none!important;cursor:grab;user-select:none;z-index:3}\n.hfmV176Pitch .hfmV176FieldPlayer.draggingFormationSlot{z-index:30;cursor:grabbing;filter:brightness(1.12);box-shadow:0 10px 30px rgba(0,0,0,.35)}\n.hfmV176HalfRoster{margin-top:14px;overflow:visible!important;max-height:none!important}\n.hfmV176HalfRosterHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}\n.hfmV176HalfRosterHead h3{margin:0}\n.hfmV176HalfGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;overflow:visible!important;max-height:none!important}\n.hfmV176HalfCard{border:1px solid rgba(255,255,255,.13);border-radius:12px;padding:8px 10px;background:rgba(16,31,52,.92);min-width:0;cursor:grab;touch-action:none;user-select:none}\n.hfmV176HalfCard.starter{background:rgba(18,91,72,.94);border-color:rgba(97,239,197,.35)}\n.hfmV176HalfCard.bench{border-style:dashed}\n.hfmV176HalfCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:var(--muted)}\n.hfmV176HalfCardTop b{color:var(--text);white-space:normal;overflow-wrap:anywhere}\n.hfmV176HalfName{display:block;margin-top:4px;line-height:1.15;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;font-size:13px}\n.hfmV176HalfPos{display:block;margin-top:2px;line-height:1.15;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;color:var(--muted);font-size:11px}\n.hfmV176StatList{display:grid;gap:8px}\n.hfmV176StatRow{width:100%;display:grid;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:10px;text-align:left;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(16,31,52,.92);color:var(--text);padding:10px 12px}\n.hfmV176StatRow .rank{font-weight:900;color:var(--accent);font-size:18px}\n.hfmV176StatRow .who strong,.hfmV176StatRow .who small,.hfmV176StatRow .main small{display:block;min-width:0;white-space:normal;overflow-wrap:anywhere}\n.hfmV176StatRow .who small,.hfmV176StatRow .main small{color:var(--muted);font-size:12px}\n.hfmV176StatRow .main{text-align:right}.hfmV176StatRow .main b{font-size:16px;color:var(--accent)}\n@media(max-width:520px){.hfmV176HalfGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.hfmV176HalfCard{padding:7px}.hfmV176StatRow{grid-template-columns:30px minmax(0,1fr);}.hfmV176StatRow .main{grid-column:2;text-align:left}}\n';
  try { document.head.appendChild(style); } catch(e) {}
  try { if (typeof render === 'function') render(); } catch(e) {}
})();

/* v143: Saison-Events (Jugendtag) und eigener Manager-Reiter. Keine bestehenden Funktionen/Reiter entfernen. */
(function(){
  'use strict';

  function html(value){
    if (typeof hfmV68Html === 'function') return hfmV68Html(value);
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function money(value){ return typeof euro === 'function' ? euro(Number(value || 0)) : `${Math.round(Number(value || 0)).toLocaleString('de-AT')} EUR`; }
  function nowDate(){ return typeof currentGameDate === 'function' ? currentGameDate() : new Date(); }
  function seasonEnd(){ return typeof seasonEndDate === 'function' ? seasonEndDate() : new Date((state.seasonStartYear || new Date().getFullYear()) + 1, 5, 30); }
  function seasonKey(){ return typeof seasonLabel === 'function' ? seasonLabel() : String(state.seasonStartYear || nowDate().getFullYear()); }
  function toIsoLocal(date){
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function fromIsoLocal(iso){
    const [y,m,d] = String(iso || '').split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }
  function sameIso(a, b){ return toIsoLocal(a) === toIsoLocal(b); }
  function dateCmpIso(a, b){ return String(a || '').localeCompare(String(b || '')); }
  function fmtIso(iso){ const d = fromIsoLocal(iso); return d && typeof formatGermanDate === 'function' ? formatGermanDate(d) : String(iso || '-'); }
  function addNews(data){
    if (typeof hfmV68AddNews === 'function') return hfmV68AddNews(data);
    state.newsItems = state.newsItems || [];
    const item = Object.assign({ id: `news-${Date.now()}-${Math.random()}`, read:false, timestamp: fmtIso(toIsoLocal(nowDate())) }, data);
    state.newsItems.unshift(item);
    return item;
  }
  function titleFor(item){ return item.title_template || item.title || ''; }

  function ensureEventState(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.clubEvents || typeof state.clubEvents !== 'object') state.clubEvents = {};
    if (!Array.isArray(state.clubEvents.youthDays)) state.clubEvents.youthDays = [];
    if (!Array.isArray(state.clubEvents.history)) state.clubEvents.history = [];
    state.clubEvents.youthDays.forEach(ev => {
      if (!Array.isArray(ev.candidates)) ev.candidates = [];
      if (!ev.season) ev.season = seasonKey();
      if (!ev.status) ev.status = ev.candidates.length ? 'done' : 'scheduled';
    });
  }

  const firstNames = ['Julian','Marco','Adrian','Niklas','Samuel','Timo','Denis','Fabio','Elias','Kilian','Leon','Matteo','Noah','Luca','Emil','Moritz','David','Simon','Ben','Milan'];
  const lastNames = ['Hofer','Schmid','Kraus','Fischer','Pichler','Auer','Huber','Kovac','Moser','Lechner','Baumgartner','Sailer','Wagner','Berger','Novak','Steiner','Gruber','Wolf','Haas','Leitner'];
  const positions = [
    { pos:'TW', secondary:[] }, { pos:'IV', secondary:['DM','RV'] }, { pos:'LV', secondary:['LM','RV'] }, { pos:'RV', secondary:['RM','LV'] },
    { pos:'DM', secondary:['ZM','IV'] }, { pos:'ZM', secondary:['DM','OM'] }, { pos:'OM', secondary:['ZM','RA'] },
    { pos:'LA', secondary:['RA','ST'] }, { pos:'RA', secondary:['LA','ST'] }, { pos:'ST', secondary:['LA','RA'] }
  ];
  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function nextYouthId(){
    const ids = [];
    try { (state.academyPlayers || []).forEach(p => ids.push(Number(p.id || 0))); } catch(err) {}
    try { (state.players || []).forEach(p => ids.push(Number(p.id || 0))); } catch(err) {}
    try { (state.clubEvents?.youthDays || []).forEach(ev => (ev.candidates || []).forEach(p => ids.push(Number(p.id || 0)))); } catch(err) {}
    return Math.max(1000, ...ids.filter(Number.isFinite)) + 1;
  }
  function createYouthDayCandidate(){
    const role = pick(positions);
    const suitable = Math.random() < 0.05;
    const talent = suitable ? 5 : Math.max(1, Math.min(4, 1 + Math.floor(Math.random() * 4)));
    const age = 14 + Math.floor(Math.random() * 5);
    const strength = suitable ? 50 + Math.floor(Math.random() * 13) : 28 + talent * 3 + Math.floor(Math.random() * 12);
    const base = {
      id: nextYouthId(),
      name: `${pick(firstNames)} ${pick(lastNames)}`,
      age,
      pos: role.pos,
      secondary: role.secondary,
      strength: Math.max(24, Math.min(65, strength)),
      talent,
      progress: Math.floor(Math.random() * 65),
      youth: true,
      source: 'Jugendtag',
      youthDaySuitable: suitable,
      status: 'open'
    };
    return typeof ensurePlayerSkillProfile === 'function' ? ensurePlayerSkillProfile(base) : base;
  }
  function generateYouthDayResult(ev){
    if (!ev || ev.status === 'done') return ev;
    const count = 7 + Math.floor(Math.random() * 4);
    ev.candidates = Array.from({ length: count }, () => createYouthDayCandidate());
    ev.status = 'done';
    ev.generatedAt = toIsoLocal(nowDate());
    const best = ev.candidates.slice().sort((a,b) => (Number(b.talent || 0) - Number(a.talent || 0)) || (Number(b.strength || 0) - Number(a.strength || 0)))[0];
    addNews({
      category: 'YOUTH', priority: 2, scope: 'inbox', sender_id: 'academy', resolved: true,
      uniqueKey: `youth-day-result-${ev.id}`,
      title_template: 'Jugendtag abgeschlossen',
      body_template: `Der Jugendtag am ${fmtIso(ev.date)} ist abgeschlossen. ${ev.candidates.length} Jugendspieler haben vorgespielt. Bester Eindruck: ${best ? `${best.name}, ${best.pos}, Stärke ${best.strength}, Talent ${best.talent}` : 'kein auffälliger Spieler'}.`,
      data: {}
    });
    state.clubEvents.history.unshift({ type:'Jugendtag', date: ev.date, text: `${ev.candidates.length} Vorspieler gesichtet` });
    state.clubEvents.history = state.clubEvents.history.slice(0, 30);
    return ev;
  }
  function processDueYouthDays(dayIso){
    ensureEventState();
    let did = false;
    const todayIso = dayIso || toIsoLocal(nowDate());
    state.clubEvents.youthDays.forEach(ev => {
      if (ev.season === seasonKey() && ev.status === 'scheduled' && dateCmpIso(ev.date, todayIso) <= 0) {
        generateYouthDayResult(ev);
        did = true;
      }
    });
    return did;
  }
  function seasonYouthDays(){ ensureEventState(); return state.clubEvents.youthDays.filter(ev => ev.season === seasonKey()); }
  function usedYouthDays(){ return seasonYouthDays().length; }

  window.hfmV143ScheduleYouthDay = function(){
    ensureEventState();
    const input = document.getElementById('hfmV143YouthDayDate');
    const date = String(input && input.value || '').trim();
    const d = fromIsoLocal(date);
    if (!d) { alert('Bitte ein gültiges Datum auswählen.'); return false; }
    const min = toIsoLocal(nowDate());
    const max = toIsoLocal(seasonEnd());
    if (dateCmpIso(date, min) < 0) { alert('Der Jugendtag kann nicht in der Vergangenheit liegen.'); return false; }
    if (dateCmpIso(date, max) > 0) { alert('Der Jugendtag muss innerhalb der aktuellen Saison liegen.'); return false; }
    if (usedYouthDays() >= 2) { alert('Du kannst den Jugendtag nur 2x pro Jahr veranstalten.'); return false; }
    if (seasonYouthDays().some(ev => ev.date === date)) { alert('An diesem Datum ist bereits ein Jugendtag geplant.'); return false; }
    const ev = { id:`yd-${Date.now()}-${Math.floor(Math.random()*9999)}`, season: seasonKey(), date, status:'scheduled', candidates:[] };
    state.clubEvents.youthDays.push(ev);
    addNews({
      category: 'YOUTH', priority: 3, scope: 'inbox', sender_id: 'academy', resolved: true,
      uniqueKey: `youth-day-planned-${ev.id}`,
      title_template: 'Jugendtag geplant',
      body_template: `Der Jugendtag wurde für den ${fmtIso(date)} angesetzt. An diesem Tag kommen Jugendspieler zum Vorspielen.`,
      data: {}
    });
    processDueYouthDays(toIsoLocal(nowDate()));
    render();
    return false;
  };

  window.hfmV143RunYouthDayNow = function(id){
    ensureEventState();
    const ev = state.clubEvents.youthDays.find(x => String(x.id) === String(id));
    if (ev) generateYouthDayResult(ev);
    render();
    return false;
  };

  window.hfmV143OfferYouthDayContract = function(eventId, playerId){
    ensureEventState();
    const ev = state.clubEvents.youthDays.find(x => String(x.id) === String(eventId));
    const p = ev && (ev.candidates || []).find(x => String(x.id) === String(playerId));
    if (!ev || !p || p.status !== 'open') return false;
    if (!Array.isArray(state.academyPlayers)) state.academyPlayers = [];
    const newId = nextYouthId();
    const player = Object.assign({}, p, { id:newId, youth:true, status:undefined, club:ownClubName(), source:'Jugendtag', progress:Number(p.progress || 0) });
    if (typeof ensurePlayerSkillProfile === 'function') state.academyPlayers.push(ensurePlayerSkillProfile(player));
    else state.academyPlayers.push(player);
    p.status = 'signed';
    addNews({
      category: 'YOUTH', priority: 2, scope: 'inbox', sender_id: 'academy', resolved: true,
      uniqueKey: `youth-day-signed-${eventId}-${playerId}`,
      title_template: 'Jugendspieler übernommen',
      body_template: `${p.name} wurde nach dem Jugendtag in deinen Jugendkader übernommen. Position: ${p.pos}, Alter: ${p.age}, Stärke ${p.strength}, Talent ${p.talent}.`,
      data: {}
    });
    render();
    return false;
  };

  window.hfmV143DeclineYouthDayPlayer = function(eventId, playerId){
    ensureEventState();
    const ev = state.clubEvents.youthDays.find(x => String(x.id) === String(eventId));
    const p = ev && (ev.candidates || []).find(x => String(x.id) === String(playerId));
    if (!p || p.status !== 'open') return false;
    p.status = 'declined';
    render();
    return false;
  };

  function youthDayPlayerRow(ev, p){
    const status = p.status === 'signed' ? '<span class="requiredBadge">Übernommen</span>' : p.status === 'declined' ? '<span class="mutedText">Abgesagt</span>' : '';
    const talentText = typeof stars === 'function' ? stars(p.talent) : `${p.talent}/5`;
    return `<div class="player youthDayCandidate ${p.youthDaySuitable ? 'positiveCandidate' : ''}">
      <div class="playerTop"><strong>${html(p.name)}</strong><span>${html(p.pos)} · ${Number(p.age || 0)} Jahre ${status}</span></div>
      <div class="meta"><span>Stärke ${Number(p.strength || 0)}</span><span class="stars">${talentText}</span><span>Talent ${Number(p.talent || 0)}/5</span>${p.youthDaySuitable ? '<span>auffällig</span>' : ''}</div>
      <div class="playerActions">
        <button type="button" class="primary" ${p.status && p.status !== 'open' ? 'disabled' : ''} onclick="return hfmV143OfferYouthDayContract('${html(ev.id)}','${html(p.id)}')">Vertrag anbieten</button>
        <button type="button" class="ghost" ${p.status && p.status !== 'open' ? 'disabled' : ''} onclick="return hfmV143DeclineYouthDayPlayer('${html(ev.id)}','${html(p.id)}')">Absagen</button>
      </div>
    </div>`;
  }
  function youthDayEventBox(ev){
    const due = dateCmpIso(ev.date, toIsoLocal(nowDate())) <= 0;
    if (ev.status === 'scheduled') {
      return `<div class="league"><strong>Jugendtag · ${fmtIso(ev.date)}</strong><span>${due ? 'fällig: Jugendspieler können jetzt vorspielen.' : 'geplant'}</span>${due ? `<button type="button" class="primary" onclick="return hfmV143RunYouthDayNow('${html(ev.id)}')">Jugendtag auswerten</button>` : ''}</div>`;
    }
    const rows = (ev.candidates || []).map(p => youthDayPlayerRow(ev, p)).join('');
    return `<section class="panel"><p class="eyebrow">Jugendtag · ${fmtIso(ev.date)}</p><h2>Interessante Jugendspieler</h2><div class="infoBox">Die Chance, einen wirklich geeigneten Jugendspieler zu finden, liegt bei ca. 5%. Du siehst Alter, Position, Stärke und Talent. Mit „Vertrag anbieten“ kommt der Spieler in deinen Jugendkader.</div><div class="playerList">${rows || '<div class="infoBox">Keine Vorspieler gefunden.</div>'}</div></section>`;
  }
  function eventsView(){
    ensureEventState();
    processDueYouthDays(toIsoLocal(nowDate()));
    const used = usedYouthDays();
    const min = toIsoLocal(nowDate());
    const max = toIsoLocal(seasonEnd());
    const events = seasonYouthDays().slice().sort((a,b) => dateCmpIso(a.date, b.date));
    const eventRows = events.map(youthDayEventBox).join('') || '<div class="infoBox">Noch kein Jugendtag in dieser Saison geplant.</div>';
    const historyRows = (state.clubEvents.history || []).slice(0, 5).map(h => `<div class="league"><strong>${html(h.type)} · ${fmtIso(h.date)}</strong><span>${html(h.text)}</span></div>`).join('') || '<div class="infoBox">Noch keine Event-Historie.</div>';
    return `<section class="panel"><p class="eyebrow">Saison · Events veranstalten</p><h2>Events veranstalten</h2><div class="grid compact">${card('🌱','Jugendtag',`${used}/2`,'pro Jahr möglich')}${card('🎯','Trefferchance','5%','geeigneter Jugendspieler')}${card('📅','Saisonende',fmtIso(max),'Planung bis dahin')}${card('👶','Jugendkader',String((state.academyPlayers || []).length),'aktuelle Jugendspieler')}</div><h3>Jugendtag planen</h3><div class="infoBox">Beim Jugendtag kommen Jugendspieler zum Vorspielen. Nach dem Termin bekommst du eine Liste mit Alter, Position, Stärke und Talent.</div><div class="searchGrid"><label class="fieldLabel">Datum auswählen<input id="hfmV143YouthDayDate" class="textInput" type="date" min="${min}" max="${max}" value="${min}"></label></div><button type="button" class="primary full" ${used >= 2 ? 'disabled' : ''} onclick="return hfmV143ScheduleYouthDay()">Jugendtag veranstalten/planen</button>${used >= 2 ? '<div class="infoBox">Du hast die 2 Jugendtage für diese Saison bereits genutzt.</div>' : ''}</section><section class="panel"><p class="eyebrow">Saison · Jugendtage</p><h2>Geplante und abgeschlossene Jugendtage</h2>${eventRows}</section><section class="panel"><p class="eyebrow">Manager-Historie</p><h2>Event-Historie</h2><div class="leagueList">${historyRows}</div></section>`;
  }
  window.hfmV143EventsView = eventsView;

  const baseCalendarView = typeof calendarView === 'function' ? calendarView : null;
  if (baseCalendarView) {
    window.calendarView = calendarView = function(){
      ensureEventState();
      processDueYouthDays(toIsoLocal(nowDate()));
      let htmlOut = baseCalendarView();
      const events = seasonYouthDays().filter(ev => ev.status === 'scheduled').sort((a,b)=>dateCmpIso(a.date,b.date));
      const rows = events.map(ev => `<div class="league"><strong>${fmtIso(ev.date)}</strong><span>Jugendtag · ${dateCmpIso(ev.date, toIsoLocal(nowDate())) <= 0 ? 'fällig' : 'geplant'}</span></div>`).join('');
      const box = `<h3>Events veranstalten</h3><div class="infoBox">Über diesen Punkt planst du Vereins-Events wie den Jugendtag.</div><button type="button" class="primary full" onclick="return goTo('season','events')">Events veranstalten</button>${rows ? `<h3>Geplante Events</h3><div class="leagueList">${rows}</div>` : ''}`;
      return htmlOut.includes('</section>') ? htmlOut.replace('</section>', `${box}</section>`) : `${htmlOut}${box}`;
    };
  }

  function traitSummary(){
    try {
      if (typeof hfmV125TraitSummaryHtml === 'function') return hfmV125TraitSummaryHtml();
    } catch(err) {}
    const traits = (state.manager?.traits || []).join(', ');
    return traits ? `<div class="infoBox">${html(traits)}</div>` : '<div class="infoBox">Noch keine Manager-Eigenschaften gewählt.</div>';
  }
  function managerHistoryRows(){
    const rows = [];
    rows.push(`<div class="league"><strong>${fmtIso(toIsoLocal(typeof seasonStartDate === 'function' ? seasonStartDate() : nowDate()))}</strong><span>Amtsantritt bei ${html(ownClubName())}</span></div>`);
    if (state.lastMatchReport) rows.push(`<div class="league"><strong>Letztes Spiel</strong><span>${html(state.lastMatchReport.text || '')} gegen ${html(state.lastMatchReport.opponent || '')} (${html(state.lastMatchReport.score || '')})</span></div>`);
    (state.clubEvents?.history || []).slice(0, 5).forEach(h => rows.push(`<div class="league"><strong>${html(h.type)} · ${fmtIso(h.date)}</strong><span>${html(h.text)}</span></div>`));
    return rows.join('');
  }
  function managerView(){
    ensureEventState();
    const mgr = state.manager || {};
    const pos = typeof getOwnTablePosition === 'function' ? getOwnTablePosition() : '-';
    const matches = state.matchday || state.week || 0;
    const trophies = state.managerTrophies || state.trophies || [];
    const trophyRows = Array.isArray(trophies) && trophies.length ? trophies.map(t => `<div class="league"><strong>${html(t.title || t.name || t)}</strong><span>${html(t.season || '')}</span></div>`).join('') : '<div class="infoBox">Noch keine Titel gewonnen.</div>';
    return `<section class="panel"><p class="eyebrow">Manager</p><h2>${html(mgr.name || 'Managerprofil')}</h2><div class="grid compact">${card('👤','Alter',`${Number(mgr.age || 0)} Jahre`,html(mgr.country || ''))}${card('🏟️','Verein',ownClubName(),'aktueller Arbeitgeber')}${card('🏆','Tabellenplatz',String(pos),'aktuelle Saison')}${card('📆','Saison',seasonKey(),`${matches} Wochen/Spieltage im Spiel`)}</div></section><section class="panel"><p class="eyebrow">Manager · Profil</p><h2>Manager-Eigenschaften</h2>${traitSummary()}<div class="infoBox">Diese Auswahl wirkt dauerhaft im Hintergrund auf Training, Verhandlungen, Scouting, Finanzen, Medien und Simulation.</div></section><section class="panel"><p class="eyebrow">Manager · Erfolge</p><h2>Erfolge und Titel</h2><div class="leagueList">${trophyRows}</div></section><section class="panel"><p class="eyebrow">Manager · Historie</p><h2>Historie</h2><div class="leagueList">${managerHistoryRows()}</div></section>`;
  }
  window.managerView = managerView;

  function stripManagerBoxes(htmlOut){
    return String(htmlOut || '')
      .replace(/<div class="infoBox"><b>Manager-Eigenschaften:<\/b>[\s\S]*?<\/div>/g, '')
      .replace(/<section class="panel"><p class="eyebrow">Managerprofil<\/p><h2>Manager-Eigenschaften<\/h2>[\s\S]*?<\/section>/g, '');
  }
  if (typeof dashboard === 'function') {
    const baseDashboard = dashboard;
    window.dashboard = dashboard = function(){ return stripManagerBoxes(baseDashboard()); };
  }
  if (typeof optionsView === 'function') {
    const baseOptionsView = optionsView;
    window.optionsView = optionsView = function(){ return stripManagerBoxes(baseOptionsView()); };
  }

  const baseGenerateDailyEvents = typeof hfmV70GenerateDailyEvents === 'function' ? hfmV70GenerateDailyEvents : null;
  if (baseGenerateDailyEvents) {
    window.hfmV70GenerateDailyEvents = hfmV70GenerateDailyEvents = function(day, index){
      if (!Array.isArray(day.events)) day.events = [];
      const result = baseGenerateDailyEvents(day, index);
      try {
        const dayIso = day && day.iso ? toIsoLocal(new Date(day.iso)) : toIsoLocal(nowDate());
        if (processDueYouthDays(dayIso)) day.events.push('Jugendtag abgeschlossen: Ergebnisse im Newscenter und unter Saison > Events veranstalten.');
      } catch(err) { console.warn('v143 youth day processing', err); }
      return result;
    };
  }

  function validTabs(){ return ['dashboard','news','manager','team','market','scouting','club','environment','season','options','staff','match','matchHalftime','matchEnd']; }
  function tabContent(){
    try {
      if (state.tab === 'dashboard') return dashboard();
      if (state.tab === 'news') return (typeof newscenter === 'function') ? newscenter() : '<section class="panel"><p class="eyebrow">Newscenter</p><h2>Newscenter</h2><div class="infoBox">Newscenter konnte nicht geladen werden.</div></section>';
      if (state.tab === 'manager') return managerView();
      if (state.tab === 'team') return team();
      if (state.tab === 'market') return market();
      if (state.tab === 'scouting') return scouting();
      if (state.tab === 'club') return club();
      if (state.tab === 'environment') return environment();
      if (state.tab === 'season') return season();
      if (state.tab === 'options') return optionsView();
      if (state.tab === 'staff') return (typeof staffView === 'function') ? staffView() : '<section class="panel"><h2>Mitarbeiter</h2><p>Mitarbeiteransicht konnte nicht geladen werden.</p></section>';
      if (state.tab === 'match') return matchScreen();
      if (state.tab === 'matchHalftime') return halftimeScreen();
      if (state.tab === 'matchEnd') return matchEndScreen();
    } catch(err) {
      console.error('v143 tab content failed', state.tab, err);
      return `<section class="panel"><p class="eyebrow">Fehler</p><h2>Ansicht konnte nicht geladen werden</h2><div class="infoBox">${html(err && err.message || err)}</div></section>`;
    }
    return dashboard();
  }
  function navHtml(){
    return `${navButton('dashboard', '⌂', 'Home')}
      ${navButton('news', '📰', 'Newscenter')}
      ${navButton('manager', '👤', 'Manager')}
      ${navButton('team', '⚽', 'Team')}
      ${navButton('market', '↔', 'Transfers')}
      ${navButton('scouting', '🔭', 'Scouting')}
      ${navButton('club', '▣', 'Verein')}
      ${navButton('environment', '🏟️', 'Stadion')}
      ${navButton('season', '🏆', 'Saison')}
      ${navButton('options', '⚙️', 'Optionen')}
      ${navButton('staff', '👔', 'Mitarbeiter')}`;
  }
  function extraModals(){
    const names = ['seasonEndModal','seasonStartModal','sponsorModal','trainingLevelUpModal','matchDayModal','postMatchWindowModal','youthDiscoveryModal','playerProfileModal','hfmV70WeekSimulationModal','hfmV70CriticalNewsModal','hfmV70PausedBanner','hfmV101YouthNegotiationModal','hfmV105ComfortDetailsModal','hfmV108TransferReportModal','hfmV109TransferNegotiationModal','hfmV110StaffProfileModal','hfmV110StaffNegotiationModal','hfmV116OwnPlayerSaleDialogHtml','hfmV117AgentResultsModal','hfmV120StaffCourseDialogHtml','hfmV120StaffLevelUpModal','hfmV124SponsorEventModalHtml','hfmV126PsychosocialSelectionModal'];
    let out = '';
    const seen = new Set();
    names.forEach(name => {
      if (seen.has(name)) return;
      seen.add(name);
      try { const fn = window[name] || globalThis[name]; if (typeof fn === 'function') out += fn() || ''; } catch(err) {}
    });
    return out;
  }
  function newsLine(){
    try {
      if (typeof hfmV68NewsUnreadCount !== 'function') return '';
      const unread = hfmV68NewsUnreadCount();
      const open = typeof hfmV68OpenActionCount === 'function' ? hfmV68OpenActionCount() : 0;
      return unread ? `<br>News: <b>${unread} ungelesen${open ? ` · ${open} offen` : ''}</b>` : '';
    } catch(err) { return ''; }
  }
  function afterRender(){
    try { if (typeof hfmV70InjectWeekSimulationUi === 'function') hfmV70InjectWeekSimulationUi(); } catch(err) {}
    try { if (typeof hfmV76ApplyMatchFocusMode === 'function') hfmV76ApplyMatchFocusMode(); } catch(err) {}
    try { if (typeof hfmV135DeduplicateVip === 'function') hfmV135DeduplicateVip(); } catch(err) {}
    try { if (typeof hfmV68RefreshNewsDom === 'function') hfmV68RefreshNewsDom(); } catch(err) {}
    const app = document.getElementById('app');
    const nav = app && app.querySelector('.bottomNav');
    if (nav) {
      nav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      const active = Array.from(nav.querySelectorAll('button')).find(btn => (btn.getAttribute('onclick') || '').includes(`'${state.tab}'`));
      if (active) active.classList.add('active');
    }
  }
  function renderV143(){
    ensureEventState();
    try { processDueYouthDays(toIsoLocal(nowDate())); } catch(err) {}
    try { if (typeof initV36Features === 'function') initV36Features(); } catch(err) {}
    try { if (typeof ensureTrainingLevelUpQueue === 'function') ensureTrainingLevelUpQueue(); } catch(err) {}
    try { if (typeof hfmV110EnsureStaffState === 'function') hfmV110EnsureStaffState(); } catch(err) {}
    try { if (typeof hfmV120EnsureStaffDevelopmentState === 'function') hfmV120EnsureStaffDevelopmentState(); } catch(err) {}
    try { if (typeof hfmV130EnsureInfrastructure === 'function') hfmV130EnsureInfrastructure(); } catch(err) {}
    if (!validTabs().includes(state.tab)) state.tab = 'dashboard';
    if (state.activeMatch?.phase === 'halftime') state.tab = 'matchHalftime';
    if (state.activeMatch?.phase === 'finished') state.tab = 'matchEnd';
    const app = document.getElementById('app');
    if (!app) return;
    if (!state.gameStarted) { app.innerHTML = startScreen(); return; }
    const matchTheme = (typeof isMatchTabForTheme === 'function') ? isMatchTabForTheme() : ['match','matchHalftime','matchEnd'].includes(state.tab);
    const isLiveSimulation = state.activeMatch?.phase === 'live';
    const noTransition = isLiveSimulation || state.tab === 'news';
    const content = tabContent();
    app.innerHTML = `<div class="appShell ${matchTheme ? 'matchdayShell' : ''} ${isLiveSimulation ? 'liveSimulationShell' : ''}">
      <header class="hero ${matchTheme ? 'matchHero' : ''}">
        <div><p class="eyebrow">Saison ${seasonKey()} · ${formatGermanDate(nowDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${html(state.manager.name)} · ${Number(state.manager.age || 0)} Jahre · ${html(state.manager.country)}<br>Verein: ${html(ownClubName())}<br>Kontostand: <b>${money(state.money)}</b>${newsLine()}</p></div>
        <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
      </header>
      <main class="${noTransition ? 'noPageTransition' : 'pageTransition'} ${matchTheme ? 'matchMain' : ''} ${isLiveSimulation ? 'liveSimulationMain' : ''}">${content}</main>
      <nav class="bottomNav">${navHtml()}</nav>
      ${extraModals()}
    </div>`;
    afterRender();
  }
  window.render = render = renderV143;
  window.setTab = setTab = function(tab){
    if (!validTabs().includes(tab)) tab = 'dashboard';
    state.tab = tab;
    if (tab === 'staff') state.staffSection = state.staffSection || 'overview';
    if (tab === 'season') state.seasonSection = state.seasonSection || 'calendar';
    if (tab === 'environment') state.environmentSection = state.environmentSection || 'overview';
    renderV143();
    return false;
  };
  window.goTo = goTo = function(tab, section){
    if (!validTabs().includes(tab)) tab = 'dashboard';
    state.tab = tab;
    if (tab === 'team' && section) state.teamSection = section;
    if (tab === 'club' && section) state.clubSection = section;
    if (tab === 'season' && section) state.seasonSection = section;
    if (tab === 'environment' && section) state.environmentSection = section;
    if (tab === 'staff' && section) state.staffSection = section;
    renderV143();
    return false;
  };

  const baseSeason = typeof season === 'function' ? season : null;
  if (baseSeason) {
    window.season = season = function(){
      const current = state.seasonSection || 'calendar';
      const content = current === 'events' ? eventsView() : (current === 'calendar' || current === 'table' || current === 'schedule' || current === 'world' || current === 'leagueTable' || current === 'clubRoster' || current === 'international') ? (current === 'calendar' ? calendarView() : current === 'table' ? tableView() : current === 'schedule' ? scheduleView() : current === 'world' ? worldView() : current === 'leagueTable' ? leagueTableView() : current === 'clubRoster' ? clubRosterView() : internationalView()) : calendarView();
      return `<section class="teamSubnav"><div class="chips">${seasonSubButton('calendar', 'Kalender')}${seasonSubButton('events', 'Events veranstalten')}${seasonSubButton('table', 'Tabelle')}${seasonSubButton('schedule', 'Spielplan')}${seasonSubButton('world', 'Ligen')}${seasonSubButton('international', 'Europa')}</div></section>${content}`;
    };
  }

  try { ensureEventState(); } catch(err) {}
  try { renderV143(); } catch(err) { console.error('v143 initial render failed', err); }
})();

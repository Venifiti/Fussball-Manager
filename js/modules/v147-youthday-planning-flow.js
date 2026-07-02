/* v147: Jugendtag-Flow: erst Termin im Kalender waehlen, dann am Termin einmalig veranstalten und Spieler entscheiden. Keine bestehenden Funktionen entfernen. */
(function(){
  'use strict';

  function esc(value){
    if (typeof hfmV68Html === 'function') return hfmV68Html(value);
    return String(value ?? '').replace(/[&<>'"]/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]); });
  }
  function nowDate(){ return typeof currentGameDate === 'function' ? currentGameDate() : new Date(); }
  function seasonEnd(){ return typeof seasonEndDate === 'function' ? seasonEndDate() : new Date((state.seasonStartYear || new Date().getFullYear()) + 1, 5, 30); }
  function seasonKey(){ return typeof seasonLabel === 'function' ? seasonLabel() : String(state.seasonStartYear || nowDate().getFullYear()); }
  function toIso(date){
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function fromIso(iso){
    var parts = String(iso || '').split('-').map(Number);
    if (!parts[0] || !parts[1] || !parts[2]) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function cmp(a,b){ return String(a || '').localeCompare(String(b || '')); }
  function fmt(iso){ var d = fromIso(iso); return d && typeof formatGermanDate === 'function' ? formatGermanDate(d) : String(iso || '-'); }
  function money(value){ return typeof euro === 'function' ? euro(Number(value || 0)) : Math.round(Number(value || 0)).toLocaleString('de-AT') + ' EUR'; }
  function own(){ return typeof ownClubName === 'function' ? ownClubName() : 'deinem Verein'; }
  function addNews(data){
    try {
      if (typeof hfmV68AddNews === 'function') return hfmV68AddNews(data);
      state.newsItems = state.newsItems || [];
      state.newsItems.unshift(Object.assign({ id:'news-' + Date.now() + '-' + Math.random(), read:false }, data));
    } catch(err) {}
  }
  function card(icon, title, value, sub){
    if (typeof window.card === 'function') return window.card(icon, title, value, sub);
    return '<div class="statCard"><span>' + esc(icon) + '</span><b>' + esc(title) + '</b><strong>' + esc(value) + '</strong><small>' + esc(sub) + '</small></div>';
  }

  var firstNames = ['Julian','Marco','Adrian','Niklas','Samuel','Timo','Denis','Fabio','Elias','Kilian','Leon','Matteo','Noah','Luca','Emil','Moritz','David','Simon','Ben','Milan'];
  var lastNames = ['Hofer','Schmid','Kraus','Fischer','Pichler','Auer','Huber','Kovac','Moser','Lechner','Baumgartner','Sailer','Wagner','Berger','Novak','Steiner','Gruber','Wolf','Haas','Leitner'];
  var positions = [
    { pos:'TW', secondary:[] }, { pos:'IV', secondary:['DM','RV'] }, { pos:'LV', secondary:['LM','RV'] }, { pos:'RV', secondary:['RM','LV'] },
    { pos:'DM', secondary:['ZM','IV'] }, { pos:'ZM', secondary:['DM','OM'] }, { pos:'OM', secondary:['ZM','RA'] },
    { pos:'LA', secondary:['RA','ST'] }, { pos:'RA', secondary:['LA','ST'] }, { pos:'ST', secondary:['LA','RA'] }
  ];
  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function nextYouthId(){
    var ids = [];
    try { (state.academyPlayers || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); } catch(err) {}
    try { (state.players || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); } catch(err) {}
    try { (state.clubEvents && state.clubEvents.youthDays || []).forEach(function(ev){ (ev.candidates || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); }); } catch(err) {}
    return Math.max.apply(Math, [1000].concat(ids.filter(Number.isFinite))) + 1;
  }
  function createCandidate(){
    var role = pick(positions);
    var suitable = Math.random() < 0.05;
    var talent = suitable ? 5 : Math.max(1, Math.min(4, 1 + Math.floor(Math.random() * 4)));
    var age = 14 + Math.floor(Math.random() * 5);
    var strength = suitable ? 50 + Math.floor(Math.random() * 13) : 28 + talent * 3 + Math.floor(Math.random() * 12);
    var base = {
      id: nextYouthId(), name: pick(firstNames) + ' ' + pick(lastNames), age: age, pos: role.pos, secondary: role.secondary,
      strength: Math.max(24, Math.min(65, strength)), talent: talent, progress: Math.floor(Math.random() * 65), youth: true,
      source: 'Jugendtag', youthDaySuitable: suitable, status: 'open'
    };
    return typeof ensurePlayerSkillProfile === 'function' ? ensurePlayerSkillProfile(base) : base;
  }
  function generateCandidates(){
    var count = 7 + Math.floor(Math.random() * 4);
    var out = [];
    for (var i = 0; i < count; i += 1) out.push(createCandidate());
    return out;
  }

  function ensureState(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.clubEvents || typeof state.clubEvents !== 'object') state.clubEvents = {};
    if (!Array.isArray(state.clubEvents.youthDays)) state.clubEvents.youthDays = [];
    if (!Array.isArray(state.clubEvents.history)) state.clubEvents.history = [];
    state.clubEvents.youthDays.forEach(function(ev){
      if (!ev || typeof ev !== 'object') return;
      if (!ev.season) ev.season = seasonKey();
      if (!Array.isArray(ev.candidates)) ev.candidates = [];
      if (ev.status === 'scheduled') ev.status = 'planned';
      if (ev.status === 'done' && ev.candidates.length && !ev.v147StartedManually && !ev.selectionClosed) {
        if (!Array.isArray(ev.v147PreparedCandidates) || !ev.v147PreparedCandidates.length) ev.v147PreparedCandidates = ev.candidates.slice();
        ev.candidates = [];
        ev.status = 'planned';
        ev.v147AutoGeneratedMovedBackToPlanning = true;
      }
      if (!ev.status) ev.status = ev.candidates.length ? 'active' : 'planned';
      if ((ev.status === 'active' || ev.status === 'completed') && ev.candidates.length) {
        var open = ev.candidates.some(function(p){ return !p.status || p.status === 'open'; });
        if (!open) { ev.status = 'completed'; ev.selectionClosed = true; }
      }
    });
    if (state.clubEvents.activeYouthDayId) {
      var active = state.clubEvents.youthDays.find(function(ev){ return String(ev.id) === String(state.clubEvents.activeYouthDayId); });
      if (!active || active.selectionClosed || active.status === 'completed') state.clubEvents.activeYouthDayId = null;
    }
  }
  window.hfmV147EnsureYouthDayFlowState = ensureState;

  function seasonEvents(){ ensureState(); return state.clubEvents.youthDays.filter(function(ev){ return ev.season === seasonKey(); }); }
  function usedYouthDays(){ return seasonEvents().length; }
  function canPlanDate(date){
    var min = toIso(nowDate());
    var max = toIso(seasonEnd());
    if (cmp(date, min) < 0 || cmp(date, max) > 0) return false;
    if (usedYouthDays() >= 2) return false;
    return !seasonEvents().some(function(ev){ return ev.date === date; });
  }

  window.hfmV147OpenYouthDayPlanner = function(){
    ensureState();
    state.clubEvents.youthPlanningOpen = true;
    if (!state.clubEvents.youthPlannerMonth) state.clubEvents.youthPlannerMonth = toIso(nowDate()).slice(0,7);
    render();
    return false;
  };
  window.hfmV147CloseYouthDayPlanner = function(){
    ensureState();
    state.clubEvents.youthPlanningOpen = false;
    render();
    return false;
  };
  window.hfmV147MoveYouthPlannerMonth = function(delta){
    ensureState();
    var current = state.clubEvents.youthPlannerMonth || toIso(nowDate()).slice(0,7);
    var parts = current.split('-').map(Number);
    var d = new Date(parts[0] || nowDate().getFullYear(), (parts[1] || (nowDate().getMonth() + 1)) - 1 + Number(delta || 0), 1);
    state.clubEvents.youthPlannerMonth = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    render();
    return false;
  };
  window.hfmV147SelectYouthDayDate = function(date){
    ensureState();
    if (!canPlanDate(date)) { alert('Dieses Datum kann nicht für den Jugendtag verwendet werden.'); return false; }
    var ev = { id:'yd-v147-' + Date.now() + '-' + Math.floor(Math.random()*9999), season:seasonKey(), date:date, status:'planned', candidates:[], v147Flow:true };
    state.clubEvents.youthDays.push(ev);
    state.clubEvents.youthPlanningOpen = false;
    addNews({
      category:'YOUTH', priority:3, scope:'inbox', sender_id:'academy', resolved:true,
      uniqueKey:'v147-youth-day-planned-' + ev.id,
      title_template:'Jugendtag geplant',
      body_template:'Der Jugendtag wurde für den ' + fmt(date) + ' angesetzt. Erst wenn du ihn an diesem Tag veranstaltest, erscheinen die interessanten Jugendspieler.',
      data:{}
    });
    render();
    return false;
  };

  window.hfmV143ScheduleYouthDay = function(){
    return window.hfmV147OpenYouthDayPlanner();
  };
  window.hfmV143RunYouthDayNow = function(id){
    ensureState();
    var ev = state.clubEvents.youthDays.find(function(x){ return String(x.id) === String(id); });
    if (!ev) return false;
    if (cmp(ev.date, toIso(nowDate())) > 0) { alert('Dieser Jugendtag ist erst am ' + fmt(ev.date) + '.'); return false; }
    if (ev.selectionClosed || ev.status === 'completed') { alert('Dieser Jugendtag ist bereits abgeschlossen.'); return false; }
    if (!ev.candidates.length) ev.candidates = Array.isArray(ev.v147PreparedCandidates) && ev.v147PreparedCandidates.length ? ev.v147PreparedCandidates.slice() : generateCandidates();
    ev.status = 'active';
    ev.v147StartedManually = true;
    ev.startedAt = toIso(nowDate());
    state.clubEvents.activeYouthDayId = ev.id;
    addNews({
      category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
      uniqueKey:'v147-youth-day-started-' + ev.id,
      title_template:'Jugendtag gestartet',
      body_template:'Der Jugendtag am ' + fmt(ev.date) + ' läuft. Du hast jetzt einmalig die Chance, Spieler zu übernehmen oder abzusagen.',
      data:{}
    });
    render();
    return false;
  };

  function finishIfComplete(ev){
    if (!ev || !Array.isArray(ev.candidates) || !ev.candidates.length) return;
    var open = ev.candidates.some(function(p){ return !p.status || p.status === 'open'; });
    if (open) return;
    ev.status = 'completed';
    ev.selectionClosed = true;
    ev.completedAt = toIso(nowDate());
    state.clubEvents.activeYouthDayId = null;
    var signed = ev.candidates.filter(function(p){ return p.status === 'signed'; }).length;
    state.clubEvents.history.unshift({ type:'Jugendtag', date:ev.date, text:signed + ' Spieler übernommen, ' + (ev.candidates.length - signed) + ' abgesagt' });
    state.clubEvents.history = state.clubEvents.history.slice(0, 30);
    addNews({
      category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
      uniqueKey:'v147-youth-day-completed-' + ev.id,
      title_template:'Jugendtag abgeschlossen',
      body_template:'Der Jugendtag am ' + fmt(ev.date) + ' ist abgeschlossen. Du hast ' + signed + ' Spieler in den Jugendkader übernommen.',
      data:{}
    });
  }

  window.hfmV143OfferYouthDayContract = function(eventId, playerId){
    ensureState();
    var ev = state.clubEvents.youthDays.find(function(x){ return String(x.id) === String(eventId); });
    var p = ev && (ev.candidates || []).find(function(x){ return String(x.id) === String(playerId); });
    if (!ev || ev.selectionClosed || ev.status !== 'active' || !p || (p.status && p.status !== 'open')) return false;
    if (!Array.isArray(state.academyPlayers)) state.academyPlayers = [];
    var player = Object.assign({}, p, { id:nextYouthId(), youth:true, status:undefined, club:own(), source:'Jugendtag', progress:Number(p.progress || 0) });
    if (typeof ensurePlayerSkillProfile === 'function') state.academyPlayers.push(ensurePlayerSkillProfile(player));
    else state.academyPlayers.push(player);
    p.status = 'signed';
    addNews({
      category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
      uniqueKey:'v147-youth-day-signed-' + eventId + '-' + playerId,
      title_template:'Jugendspieler übernommen',
      body_template:p.name + ' wurde nach dem Jugendtag in deinen Jugendkader übernommen. Position: ' + p.pos + ', Alter: ' + p.age + ', Stärke ' + p.strength + ', Talent ' + p.talent + '.',
      data:{}
    });
    finishIfComplete(ev);
    render();
    return false;
  };
  window.hfmV143DeclineYouthDayPlayer = function(eventId, playerId){
    ensureState();
    var ev = state.clubEvents.youthDays.find(function(x){ return String(x.id) === String(eventId); });
    var p = ev && (ev.candidates || []).find(function(x){ return String(x.id) === String(playerId); });
    if (!ev || ev.selectionClosed || ev.status !== 'active' || !p || (p.status && p.status !== 'open')) return false;
    p.status = 'declined';
    finishIfComplete(ev);
    render();
    return false;
  };

  function plannerCalendar(){
    ensureState();
    var current = state.clubEvents.youthPlannerMonth || toIso(nowDate()).slice(0,7);
    var parts = current.split('-').map(Number);
    var year = parts[0] || nowDate().getFullYear();
    var month = (parts[1] || (nowDate().getMonth() + 1)) - 1;
    var first = new Date(year, month, 1);
    var startOffset = (first.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthTitle = first.toLocaleDateString('de-AT', { month:'long', year:'numeric' });
    var cells = [];
    ['Mo','Di','Mi','Do','Fr','Sa','So'].forEach(function(d){ cells.push('<div class="miniCalendarHead">' + d + '</div>'); });
    for (var i = 0; i < startOffset; i += 1) cells.push('<div class="miniCalendarCell disabled"></div>');
    for (var day = 1; day <= daysInMonth; day += 1) {
      var iso = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      var ok = canPlanDate(iso);
      var existing = seasonEvents().some(function(ev){ return ev.date === iso; });
      cells.push('<button type="button" class="miniCalendarCell ' + (ok ? 'available' : 'disabled') + (iso === toIso(nowDate()) ? ' today' : '') + '" ' + (ok ? 'onclick="return hfmV147SelectYouthDayDate(\'' + esc(iso) + '\')"' : 'disabled') + '><b>' + day + '</b><span>' + (existing ? 'belegt' : (iso === toIso(nowDate()) ? 'heute' : '')) + '</span></button>');
    }
    return '<section class="panel"><p class="eyebrow">Jugendtag · Kalender</p><h2>Termin auswählen</h2><div class="infoBox">Wähle den Tag aus, an dem der Jugendtag stattfinden soll. Die Spielerliste erscheint noch nicht beim Planen, sondern erst beim tatsächlichen Veranstalten am gewählten Tag.</div><div class="sectionHeader"><button type="button" class="ghost" onclick="return hfmV147MoveYouthPlannerMonth(-1)">←</button><div><h3>' + esc(monthTitle) + '</h3><span>' + esc(seasonKey()) + '</span></div><button type="button" class="ghost" onclick="return hfmV147MoveYouthPlannerMonth(1)">→</button></div><div class="miniCalendarGrid">' + cells.join('') + '</div><button type="button" class="ghost full" onclick="return hfmV147CloseYouthDayPlanner()">Zurück</button></section>';
  }

  function playerRow(ev, p){
    var status = p.status === 'signed' ? '<span class="requiredBadge">Übernommen</span>' : p.status === 'declined' ? '<span class="mutedText">Abgesagt</span>' : '';
    var talentText = typeof stars === 'function' ? stars(p.talent) : esc(p.talent + '/5');
    var disabled = p.status && p.status !== 'open';
    return '<div class="player youthDayCandidate ' + (p.youthDaySuitable ? 'positiveCandidate' : '') + '"><div class="playerTop"><strong>' + esc(p.name) + '</strong><span>' + esc(p.pos) + ' · ' + Number(p.age || 0) + ' Jahre ' + status + '</span></div><div class="meta"><span>Stärke ' + Number(p.strength || 0) + '</span><span class="stars">' + talentText + '</span><span>Talent ' + Number(p.talent || 0) + '/5</span>' + (p.youthDaySuitable ? '<span>auffällig</span>' : '') + '</div><div class="playerActions"><button type="button" class="primary" ' + (disabled ? 'disabled' : '') + ' onclick="return hfmV143OfferYouthDayContract(\'' + esc(ev.id) + '\',\'' + esc(p.id) + '\')">Vertrag anbieten</button><button type="button" class="ghost" ' + (disabled ? 'disabled' : '') + ' onclick="return hfmV143DeclineYouthDayPlayer(\'' + esc(ev.id) + '\',\'' + esc(p.id) + '\')">Absagen</button></div></div>';
  }
  function activeYouthDayView(ev){
    var open = (ev.candidates || []).filter(function(p){ return !p.status || p.status === 'open'; }).length;
    var rows = (ev.candidates || []).map(function(p){ return playerRow(ev, p); }).join('');
    return '<section class="panel"><p class="eyebrow">Jugendtag · ' + esc(fmt(ev.date)) + '</p><h2>Interessante Jugendspieler</h2><div class="infoBox">Das ist die einmalige Auswahl dieses Jugendtags. Entscheide jetzt bei jedem Spieler: Vertrag anbieten oder absagen. Nach deiner Entscheidung kommt dieser Spieler nicht erneut in die Auswahl.</div><div class="grid compact">' + card('👶','Offene Entscheidungen',String(open),'noch zu prüfen') + card('🌱','Vorgespielt',String((ev.candidates || []).length),'Jugendspieler') + card('🎯','Trefferchance','ca. 5%','wirklich geeignet') + '</div><div class="playerList">' + rows + '</div></section>';
  }
  function youthDayBox(ev){
    var due = cmp(ev.date, toIso(nowDate())) <= 0;
    if (ev.status === 'active' && !ev.selectionClosed) return '<div class="league"><strong>Jugendtag · ' + esc(fmt(ev.date)) + '</strong><span>läuft gerade · Auswahl offen</span><button type="button" class="primary" onclick="state.clubEvents.activeYouthDayId=\'' + esc(ev.id) + '\'; render(); return false;">Auswahl öffnen</button></div>';
    if (ev.status === 'completed' || ev.selectionClosed) {
      var signed = (ev.candidates || []).filter(function(p){ return p.status === 'signed'; }).length;
      return '<div class="league"><strong>Jugendtag · ' + esc(fmt(ev.date)) + '</strong><span>abgeschlossen · ' + signed + ' übernommen</span></div>';
    }
    return '<div class="league"><strong>Jugendtag · ' + esc(fmt(ev.date)) + '</strong><span>' + (due ? 'Termin erreicht · noch nicht veranstaltet' : 'geplant') + '</span>' + (due ? '<button type="button" class="primary" onclick="return hfmV143RunYouthDayNow(\'' + esc(ev.id) + '\')">Jugendtag jetzt veranstalten</button>' : '') + '</div>';
  }
  function eventsView(){
    ensureState();
    var active = state.clubEvents.activeYouthDayId && state.clubEvents.youthDays.find(function(ev){ return String(ev.id) === String(state.clubEvents.activeYouthDayId); });
    if (active && active.status === 'active' && !active.selectionClosed) return activeYouthDayView(active);
    if (state.clubEvents.youthPlanningOpen) return plannerCalendar();
    var used = usedYouthDays();
    var max = toIso(seasonEnd());
    var events = seasonEvents().slice().sort(function(a,b){ return cmp(a.date, b.date); });
    var rows = events.map(youthDayBox).join('') || '<div class="infoBox">Noch kein Jugendtag in dieser Saison geplant.</div>';
    var historyRows = (state.clubEvents.history || []).slice(0, 5).map(function(h){ return '<div class="league"><strong>' + esc(h.type) + ' · ' + esc(fmt(h.date)) + '</strong><span>' + esc(h.text) + '</span></div>'; }).join('') || '<div class="infoBox">Noch keine Event-Historie.</div>';
    return '<section class="panel"><p class="eyebrow">Saison · Events veranstalten</p><h2>Events veranstalten</h2><div class="grid compact">' + card('🌱','Jugendtag',used + '/2','pro Jahr möglich') + card('👶','Jugendkader',String((state.academyPlayers || []).length),'aktuelle Jugendspieler') + '</div><h3>Jugendtag veranstalten</h3><div class="infoBox">Hier planst du zuerst den Termin. Erst am ausgewählten Tag kannst du den Jugendtag wirklich veranstalten. Dann öffnet sich einmalig die Spielerauswahl.</div><button type="button" class="primary full" ' + (used >= 2 ? 'disabled' : '') + ' onclick="return hfmV147OpenYouthDayPlanner()">Jugendtag veranstalten</button>' + (used >= 2 ? '<div class="infoBox">Du hast die 2 Jugendtage für diese Saison bereits genutzt.</div>' : '') + '</section><section class="panel"><p class="eyebrow">Saison · Jugendtage</p><h2>Geplante und abgeschlossene Jugendtage</h2><div class="leagueList">' + rows + '</div></section><section class="panel"><p class="eyebrow">Manager-Historie</p><h2>Event-Historie</h2><div class="leagueList">' + historyRows + '</div></section>';
  }
  window.hfmV143EventsView = eventsView;
  window.hfmV147YouthDayEventsView = eventsView;

  function seasonSub(id, label){ return typeof seasonSubButton === 'function' ? seasonSubButton(id, label) : '<button class="chip" onclick="return goTo(\'season\',\'' + id + '\')">' + esc(label) + '</button>'; }
  if (typeof season === 'function') {
    window.season = season = function(){
      ensureState();
      var current = state.seasonSection || 'calendar';
      var content;
      if (current === 'events') content = eventsView();
      else if (current === 'calendar') content = calendarView();
      else if (current === 'table') content = tableView();
      else if (current === 'schedule') content = scheduleView();
      else if (current === 'world') content = worldView();
      else if (current === 'leagueTable') content = leagueTableView();
      else if (current === 'clubRoster') content = clubRosterView();
      else if (current === 'international') content = internationalView();
      else content = calendarView();
      return '<section class="teamSubnav"><div class="chips">' + seasonSub('calendar', 'Kalender') + seasonSub('events', 'Events veranstalten') + seasonSub('table', 'Tabelle') + seasonSub('schedule', 'Spielplan') + seasonSub('world', 'Ligen') + seasonSub('international', 'Europa') + '</div></section>' + content;
    };
  }

  if (typeof render === 'function' && !render.__hfmV147Wrapped) {
    var baseRender = render;
    var wrappedRender = function(){ ensureState(); return baseRender.apply(this, arguments); };
    wrappedRender.__hfmV147Wrapped = true;
    try { window.render = render = wrappedRender; } catch(err) { window.render = wrappedRender; }
  }

  try { ensureState(); } catch(err) { console.warn('v147 youthday init failed', err); }
  try { if (typeof render === 'function' && typeof document !== 'undefined' && document.getElementById('app')) render(); } catch(err) { console.warn('v147 rerender failed', err); }
})();

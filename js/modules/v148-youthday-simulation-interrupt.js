/* v149: Jugendtag-Maske kann beendet werden, ohne jeden Spieler einzeln anzuklicken. Keine bestehenden Funktionen entfernen. */
(function(){
  'use strict';

  function esc(value){
    if (typeof hfmV68Html === 'function') return hfmV68Html(value);
    return String(value ?? '').replace(/[&<>'"]/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]); });
  }
  function toIso(date){
    var d = date instanceof Date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function fromIso(iso){
    var parts = String(iso || '').split('-').map(Number);
    if (!parts[0] || !parts[1] || !parts[2]) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function cmp(a,b){ return String(a || '').localeCompare(String(b || '')); }
  function todayIso(){ return typeof currentGameDate === 'function' ? toIso(currentGameDate()) : toIso(new Date()); }
  function seasonKey(){ return typeof seasonLabel === 'function' ? seasonLabel() : String((state && state.seasonStartYear) || new Date().getFullYear()); }
  function fmt(iso){
    var d = fromIso(iso);
    return d && typeof formatGermanDate === 'function' ? formatGermanDate(d) : String(iso || '-');
  }
  function addNews(data){
    try {
      if (typeof hfmV68AddNews === 'function') return hfmV68AddNews(data);
      state.newsItems = state.newsItems || [];
      state.newsItems.unshift(Object.assign({ id:'news-' + Date.now() + '-' + Math.random(), read:false }, data));
    } catch(err) {}
    return null;
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
      if (!ev.status) ev.status = ev.candidates.length ? 'active' : 'planned';
    });
  }
  function positionTextSafe(p){
    try { if (typeof positionText === 'function') return positionText(p); } catch(err) {}
    return p && p.pos ? p.pos : '-';
  }
  function talentStars(talent){
    try { if (typeof stars === 'function') return stars(talent); } catch(err) {}
    return '★'.repeat(Math.max(1, Number(talent || 1)));
  }
  var firstNames = ['Julian','Marco','Adrian','Niklas','Samuel','Timo','Denis','Fabio','Elias','Kilian','Leon','Matteo','Noah','Luca','Emil','Moritz','David','Simon','Ben','Milan'];
  var lastNames = ['Hofer','Schmid','Kraus','Fischer','Pichler','Auer','Huber','Kovac','Moser','Lechner','Baumgartner','Sailer','Wagner','Berger','Novak','Steiner','Gruber','Wolf','Haas','Leitner'];
  var roles = [
    { pos:'TW', secondary:[] }, { pos:'IV', secondary:['DM','RV'] }, { pos:'LV', secondary:['LM','RV'] }, { pos:'RV', secondary:['RM','LV'] },
    { pos:'DM', secondary:['ZM','IV'] }, { pos:'ZM', secondary:['DM','OM'] }, { pos:'OM', secondary:['ZM','RA'] },
    { pos:'LA', secondary:['RA','ST'] }, { pos:'RA', secondary:['LA','ST'] }, { pos:'ST', secondary:['LA','RA'] }
  ];
  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function nextId(){
    var ids = [];
    try { (state.players || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); } catch(err) {}
    try { (state.academyPlayers || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); } catch(err) {}
    try { (state.clubEvents.youthDays || []).forEach(function(ev){ (ev.candidates || []).forEach(function(p){ ids.push(Number(p.id || 0)); }); }); } catch(err) {}
    return Math.max.apply(Math, [1000].concat(ids.filter(Number.isFinite))) + 1;
  }
  function createCandidate(seedText){
    var seed = typeof stableHash === 'function' ? Math.abs(stableHash(seedText + '-' + Math.random())) : Math.floor(Math.random() * 999999);
    var role = roles[seed % roles.length] || pick(roles);
    var suitable = Math.random() < 0.05;
    var talent = suitable ? (Math.random() < 0.45 ? 5 : 4) : Math.max(1, Math.min(4, 1 + Math.floor(Math.random() * 4)));
    var age = 14 + Math.floor(Math.random() * 5);
    var strength = suitable ? 50 + Math.floor(Math.random() * 13) : 28 + talent * 3 + Math.floor(Math.random() * 12);
    var base = {
      id: nextId() + '_' + seed,
      name: pick(firstNames) + ' ' + pick(lastNames),
      age: age,
      pos: role.pos,
      secondary: role.secondary,
      strength: Math.max(24, Math.min(65, strength)),
      talent: talent,
      progress: Math.floor(Math.random() * 65),
      youth: true,
      source: 'Jugendtag',
      youthDaySuitable: suitable,
      status: 'open'
    };
    try { return typeof ensurePlayerSkillProfile === 'function' ? ensurePlayerSkillProfile(base) : base; } catch(err) { return base; }
  }
  function generateCandidates(ev, dayIso){
    var count = 7 + Math.floor(Math.random() * 4);
    var list = [];
    for (var i = 0; i < count; i += 1) list.push(createCandidate(String(ev && ev.id || 'yd') + '-' + String(dayIso || todayIso()) + '-' + i));
    return list;
  }
  function findDueYouthDay(dayIso){
    ensureState();
    return (state.clubEvents.youthDays || []).find(function(ev){
      return ev && ev.season === seasonKey() && (ev.status === 'planned' || ev.status === 'scheduled') && !ev.selectionClosed && cmp(ev.date, dayIso) <= 0;
    }) || null;
  }
  function startYouthDayInterrupt(ev, dayIso){
    ensureState();
    if (!ev || ev.selectionClosed || ev.status === 'completed') return false;
    if (!Array.isArray(ev.candidates) || !ev.candidates.length) ev.candidates = generateCandidates(ev, dayIso);
    ev.status = 'active';
    ev.startedAt = dayIso || todayIso();
    ev.v148SimulationInterrupt = true;
    ev.v147StartedManually = true;
    state.clubEvents.activeYouthDayId = ev.id;
    state.clubEvents.youthDaySimulationInterruptId = ev.id;
    if (state.weekSimulation && state.weekSimulation.active) {
      state.weekSimulation.paused = true;
      state.weekSimulation.hidden = false;
      state.weekSimulation.interruptNewsId = null;
      state.weekSimulation.youthDayInterruptId = ev.id;
      state.weekSimulation.message = 'Kalendersimulation angehalten: Jugendtag am ' + fmt(ev.date) + '.';
    }
    if (!ev.v148NewsCreated) {
      ev.v148NewsCreated = true;
      addNews({
        category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
        uniqueKey:'v148-youth-day-simulation-stop-' + ev.id,
        title_template:'Jugendtag erreicht',
        body_template:'Die Kalendersimulation wurde am Jugendtag (' + fmt(ev.date) + ') angehalten. Entscheide jetzt einmalig, welche Jugendspieler du übernimmst und welche du nach Hause schickst.',
        data:{}
      });
    }
    return true;
  }
  function activeYouthDay(){
    ensureState();
    var id = state.clubEvents && state.clubEvents.activeYouthDayId;
    return id ? (state.clubEvents.youthDays || []).find(function(ev){ return String(ev.id) === String(id); }) : null;
  }
  function maybeResumeAfterYouthDay(ev){
    if (!ev || ev.status !== 'completed' || !ev.v148SimulationInterrupt) return;
    if (!state.weekSimulation || !state.weekSimulation.active || state.weekSimulation.youthDayInterruptId !== ev.id) return;
    state.weekSimulation.paused = false;
    state.weekSimulation.hidden = false;
    state.weekSimulation.youthDayInterruptId = null;
    state.weekSimulation.message = 'Jugendtag abgeschlossen. Die Kalendersimulation läuft weiter.';
    state.clubEvents.youthDaySimulationInterruptId = null;
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(err) {}
    try { if (typeof render === 'function') render(); } catch(err) {}
    try { if (typeof hfmV70ScheduleWeekTick === 'function') hfmV70ScheduleWeekTick(500); } catch(err) {}
  }
  function finishIfComplete(ev){
    if (!ev || !Array.isArray(ev.candidates) || !ev.candidates.length) return false;
    var open = ev.candidates.some(function(p){ return !p.status || p.status === 'open'; });
    if (open) return false;
    ev.status = 'completed';
    ev.selectionClosed = true;
    ev.completedAt = todayIso();
    if (state.clubEvents.activeYouthDayId === ev.id) state.clubEvents.activeYouthDayId = null;
    var signed = ev.candidates.filter(function(p){ return p.status === 'signed'; }).length;
    if (!ev.v148HistoryCreated) {
      ev.v148HistoryCreated = true;
      state.clubEvents.history.unshift({ type:'Jugendtag', date:ev.date, text:signed + ' Spieler übernommen, ' + (ev.candidates.length - signed) + ' nach Hause geschickt' });
      state.clubEvents.history = state.clubEvents.history.slice(0, 30);
      addNews({
        category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
        uniqueKey:'v148-youth-day-completed-' + ev.id,
        title_template:'Jugendtag abgeschlossen',
        body_template:'Der Jugendtag am ' + fmt(ev.date) + ' ist abgeschlossen. Du hast ' + signed + ' Spieler in den Jugendkader übernommen.',
        data:{}
      });
    }
    maybeResumeAfterYouthDay(ev);
    return true;
  }

  var baseGenerateDailyEvents = null;
  try { baseGenerateDailyEvents = typeof hfmV70GenerateDailyEvents === 'function' ? hfmV70GenerateDailyEvents : null; } catch(err) { baseGenerateDailyEvents = null; }
  if (baseGenerateDailyEvents && !baseGenerateDailyEvents.__hfmV148Wrapped) {
    var wrappedGenerateDailyEvents = function(day, index){
      ensureState();
      var dayIso = day && day.iso ? day.iso : todayIso();
      var ev = findDueYouthDay(dayIso);
      if (ev && startYouthDayInterrupt(ev, dayIso)) {
        if (day && Array.isArray(day.events)) day.events.push('Jugendtag erreicht - Auswahl der Jugendspieler offen.');
        return null;
      }
      return baseGenerateDailyEvents.apply(this, arguments);
    };
    wrappedGenerateDailyEvents.__hfmV148Wrapped = true;
    try { window.hfmV70GenerateDailyEvents = hfmV70GenerateDailyEvents = wrappedGenerateDailyEvents; } catch(err) { window.hfmV70GenerateDailyEvents = wrappedGenerateDailyEvents; }
  }

  var baseResume = null;
  try { baseResume = typeof hfmV70ResumeWeekSimulation === 'function' ? hfmV70ResumeWeekSimulation : null; } catch(err) { baseResume = null; }
  if (baseResume && !baseResume.__hfmV148Wrapped) {
    var wrappedResume = function(){
      var ev = activeYouthDay();
      if (ev && ev.status === 'active' && !ev.selectionClosed && state.weekSimulation && state.weekSimulation.youthDayInterruptId === ev.id) {
        alert('Der Jugendtag muss zuerst abgeschlossen oder beendet werden. Du musst nicht jeden Spieler einzeln anklicken.');
        try { render(); } catch(err) {}
        return false;
      }
      return baseResume.apply(this, arguments);
    };
    wrappedResume.__hfmV148Wrapped = true;
    try { window.hfmV70ResumeWeekSimulation = hfmV70ResumeWeekSimulation = wrappedResume; } catch(err) { window.hfmV70ResumeWeekSimulation = wrappedResume; }
  }

  var baseRun = window.hfmV143RunYouthDayNow;
  window.hfmV143RunYouthDayNow = function(id){
    ensureState();
    var ev = (state.clubEvents.youthDays || []).find(function(x){ return String(x.id) === String(id); });
    if (!ev) return false;
    if (cmp(ev.date, todayIso()) > 0) { alert('Dieser Jugendtag ist erst am ' + fmt(ev.date) + '.'); return false; }
    startYouthDayInterrupt(ev, todayIso());
    try { render(); } catch(err) {}
    return false;
  };

  window.hfmV148CompleteYouthDayIfNeeded = function(eventId){
    ensureState();
    var ev = (state.clubEvents.youthDays || []).find(function(x){ return String(x.id) === String(eventId); });
    if (ev) finishIfComplete(ev);
  };

  var baseOffer = window.hfmV143OfferYouthDayContract;
  window.hfmV143OfferYouthDayContract = function(eventId, playerId){
    ensureState();
    var ev = (state.clubEvents.youthDays || []).find(function(x){ return String(x.id) === String(eventId); });
    if (!ev || ev.selectionClosed || ev.status !== 'active') return false;
    var p = (ev.candidates || []).find(function(x){ return String(x.id) === String(playerId); });
    if (!p || (p.status && p.status !== 'open')) return false;
    if (!Array.isArray(state.academyPlayers)) state.academyPlayers = [];
    var player = Object.assign({}, p, { id:nextId(), youth:true, status:undefined, club:(typeof ownClubName === 'function' ? ownClubName() : ''), source:'Jugendtag', progress:Number(p.progress || 0) });
    try { state.academyPlayers.push(typeof ensurePlayerSkillProfile === 'function' ? ensurePlayerSkillProfile(player) : player); } catch(err) { state.academyPlayers.push(player); }
    p.status = 'signed';
    addNews({
      category:'YOUTH', priority:2, scope:'inbox', sender_id:'academy', resolved:true,
      uniqueKey:'v148-youth-day-signed-' + eventId + '-' + playerId,
      title_template:'Jugendspieler übernommen',
      body_template:String(p.name || 'Der Spieler') + ' wurde nach dem Jugendtag in deinen Jugendkader übernommen. Position: ' + String(p.pos || '-') + ', Alter: ' + Number(p.age || 0) + ', Stärke ' + Number(p.strength || 0) + ', Talent ' + Number(p.talent || 0) + '.',
      data:{}
    });
    finishIfComplete(ev);
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(err) {}
    try { render(); } catch(err) {}
    return false;
  };

  window.hfmV143DeclineYouthDayPlayer = function(eventId, playerId){
    ensureState();
    var ev = (state.clubEvents.youthDays || []).find(function(x){ return String(x.id) === String(eventId); });
    var p = ev && (ev.candidates || []).find(function(x){ return String(x.id) === String(playerId); });
    if (!ev || ev.selectionClosed || ev.status !== 'active' || !p || (p.status && p.status !== 'open')) return false;
    p.status = 'declined';
    finishIfComplete(ev);
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(err) {}
    try { render(); } catch(err) {}
    return false;
  };

  window.hfmV149FinishYouthDayNow = function(eventId){
    ensureState();
    var ev = (state.clubEvents.youthDays || []).find(function(x){ return String(x.id) === String(eventId); });
    if (!ev || ev.selectionClosed || ev.status !== 'active') return false;
    var open = (ev.candidates || []).filter(function(p){ return !p.status || p.status === 'open'; }).length;
    var signed = (ev.candidates || []).filter(function(p){ return p.status === 'signed'; }).length;
    var ok = true;
    if (open > 0 && typeof confirm === 'function') {
      ok = confirm('Jugendtag jetzt beenden?\n\nBereits übernommene Spieler bleiben in deiner Jugend. Alle noch offenen Spieler werden nicht übernommen und nach Hause geschickt.\n\nÜbernommen bisher: ' + signed + '\nNoch offen: ' + open);
    }
    if (!ok) return false;
    (ev.candidates || []).forEach(function(p){
      if (!p.status || p.status === 'open') p.status = 'declined';
    });
    finishIfComplete(ev);
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(err) {}
    try { render(); } catch(err) {}
    return false;
  };

  function youthDayInterruptModal(){
    var ev = activeYouthDay();
    if (!ev || ev.status !== 'active' || ev.selectionClosed) return '';
    var open = (ev.candidates || []).filter(function(p){ return !p.status || p.status === 'open'; }).length;
    var rows = (ev.candidates || []).map(function(p){
      var decided = p.status && p.status !== 'open';
      var status = p.status === 'signed' ? '<span class="requiredBadge">Übernommen</span>' : p.status === 'declined' ? '<span class="mutedText">Nach Hause geschickt</span>' : '';
      return '<div class="player youthDayCandidate ' + (p.youthDaySuitable ? 'positiveCandidate' : '') + '"><div class="playerTop"><strong>' + esc(p.name) + '</strong><span>' + esc(positionTextSafe(p)) + ' · ' + Number(p.age || 0) + ' Jahre ' + status + '</span></div><div class="meta"><span>Stärke ' + Number(p.strength || 0) + '</span><span class="stars">' + talentStars(p.talent) + '</span><span>Talent ' + Number(p.talent || 0) + '/5</span>' + (p.youthDaySuitable ? '<span>auffällig</span>' : '') + '</div><div class="playerActions"><button type="button" class="primary" ' + (decided ? 'disabled' : '') + ' onclick="return hfmV143OfferYouthDayContract(\'' + esc(ev.id) + '\',\'' + esc(p.id) + '\')">In Jugend übernehmen</button><button type="button" class="ghost" ' + (decided ? 'disabled' : '') + ' onclick="return hfmV143DeclineYouthDayPlayer(\'' + esc(ev.id) + '\',\'' + esc(p.id) + '\')">Nach Hause schicken</button></div></div>';
    }).join('');
    return '<div class="modalBackdrop hfmV148YouthDayBackdrop" role="dialog" aria-modal="true"><div class="modalBox hfmV148YouthDayBox"><div class="modalHeader"><div><p class="eyebrow">Kalendersimulation gestoppt · Jugendtag</p><h2>Interessante Jugendspieler</h2></div><div class="modalHeaderActions"><span class="requiredBadge">' + open + ' offen</span><button type="button" class="ghost closeButton" onclick="return hfmV149FinishYouthDayNow(\'' + esc(ev.id) + '\')">Jugendtag beenden</button></div></div><div class="infoBox">Der Kalender ist beim Jugendtag am ' + esc(fmt(ev.date)) + ' angehalten. Du kannst einzelne Spieler in die Jugend übernehmen oder den Jugendtag direkt beenden. Beim Beenden werden alle noch offenen Spieler automatisch nach Hause geschickt und die Simulation läuft weiter.</div><div class="playerList">' + rows + '</div><div class="modalActions"><button type="button" class="primary full" onclick="return hfmV149FinishYouthDayNow(\'' + esc(ev.id) + '\')">Jugendtag beenden und Simulation fortsetzen</button></div></div></div>';
  }

  var baseRender = null;
  try { baseRender = typeof render === 'function' ? render : null; } catch(err) { baseRender = null; }
  if (baseRender && !baseRender.__hfmV148Wrapped) {
    var wrappedRender = function(){
      ensureState();
      var out = baseRender.apply(this, arguments);
      try {
        var app = document.getElementById('app');
        var modal = youthDayInterruptModal();
        if (app && modal) app.insertAdjacentHTML('beforeend', modal);
      } catch(err) {}
      return out;
    };
    wrappedRender.__hfmV148Wrapped = true;
    try { window.render = render = wrappedRender; } catch(err) { window.render = wrappedRender; }
  }

  try { ensureState(); } catch(err) { console.warn('v148 youthday interrupt init failed', err); }
})();

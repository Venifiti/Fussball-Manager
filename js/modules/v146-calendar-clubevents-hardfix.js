/* v146: Harte Kalender-State-Absicherung fuer bestehende Spielstaende.
   Entfernt nichts, initialisiert nur fehlende Daten vor Kalender/Events/Render. */
(function(){
  'use strict';

  function ensureClubEventsState(){
    try {
      if (typeof state === 'undefined' || !state) return;
      if (!state.clubEvents || typeof state.clubEvents !== 'object') state.clubEvents = {};
      if (!Array.isArray(state.clubEvents.youthDays)) state.clubEvents.youthDays = [];
      if (!Array.isArray(state.clubEvents.history)) state.clubEvents.history = [];
      state.clubEvents.youthDays.forEach(function(ev){
        if (!ev || typeof ev !== 'object') return;
        if (!Array.isArray(ev.candidates)) ev.candidates = [];
        if (!ev.status) ev.status = ev.candidates.length ? 'done' : 'scheduled';
      });
    } catch(err) {
      console.warn('v146 ensureClubEventsState failed', err);
    }
  }
  window.hfmV146EnsureClubEventsState = ensureClubEventsState;

  function ensureNewsInboxState(){
    try {
      if (typeof state === 'undefined' || !state) return;
      if (!Array.isArray(state.newsItems)) state.newsItems = [];
      if (!state.newsFilter) state.newsFilter = 'inbox';
    } catch(err) {}
  }

  function wrap(name){
    var base = window[name] || globalThis[name];
    if (typeof base !== 'function' || base.__hfmV146Wrapped) return;
    var wrapped = function(){
      ensureClubEventsState();
      ensureNewsInboxState();
      return base.apply(this, arguments);
    };
    wrapped.__hfmV146Wrapped = true;
    try { window[name] = wrapped; } catch(err) {}
    try { globalThis[name] = wrapped; } catch(err) {}
    try { eval(name + ' = wrapped'); } catch(err) {}
  }

  ['calendarView','calendarFixtures','season','render','setTab','goTo','dashboard','hfmV143EventsView','hfmV143ScheduleYouthDay','hfmV143RunYouthDayNow'].forEach(wrap);

  if (typeof loadGame === 'function' && !loadGame.__hfmV146Wrapped) {
    var baseLoadGame = loadGame;
    var wrappedLoadGame = function(){
      var result = baseLoadGame.apply(this, arguments);
      ensureClubEventsState();
      ensureNewsInboxState();
      return result;
    };
    wrappedLoadGame.__hfmV146Wrapped = true;
    try { window.loadGame = loadGame = wrappedLoadGame; } catch(err) { try { window.loadGame = wrappedLoadGame; } catch(e) {} }
  }

  ensureClubEventsState();
  ensureNewsInboxState();
  try { if (typeof render === 'function' && typeof document !== 'undefined' && document.getElementById('app')) render(); } catch(err) { console.warn('v146 rerender failed', err); }
})();

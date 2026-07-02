/* v145: Newscenter-Inbox als zentrale Ablage + robuster Kalender-State. Keine bestehenden Funktionen entfernen. */
(function(){
  'use strict';

  function v145EnsureClubEventsState(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.clubEvents || typeof state.clubEvents !== 'object') state.clubEvents = {};
    if (!Array.isArray(state.clubEvents.youthDays)) state.clubEvents.youthDays = [];
    if (!Array.isArray(state.clubEvents.history)) state.clubEvents.history = [];
  }
  window.hfmV145EnsureClubEventsState = v145EnsureClubEventsState;

  function v145EnsureNewsState(){
    if (typeof hfmV68EnsureNewsState === 'function') hfmV68EnsureNewsState();
    if (!Array.isArray(state.newsItems)) state.newsItems = [];
    if (!state.newsFilter) state.newsFilter = 'inbox';
  }

  if (typeof hfmV68UnreadNews === 'function') {
    window.hfmV68UnreadNews = hfmV68UnreadNews = function(scope){
      v145EnsureNewsState();
      if (!scope || scope === 'inbox') return state.newsItems.filter(n => !n.read);
      return state.newsItems.filter(n => !n.read && n.scope === scope);
    };
  }

  if (typeof hfmV68NewsItemsForFilter === 'function') {
    window.hfmV68NewsItemsForFilter = hfmV68NewsItemsForFilter = function(){
      v145EnsureNewsState();
      const filter = state.newsFilter || 'inbox';
      const items = state.newsItems || [];
      if (filter === 'unread') return items.filter(n => !n.read);
      if (filter === 'action') return items.filter(n => n.requires_action && !n.resolved);
      if (filter === 'world') return items.filter(n => n.scope === 'world' || n.category === 'WORLD');
      if (filter === 'all') return items;
      return items;
    };
  }

  if (typeof hfmV68OpenNewsItem === 'function') {
    window.hfmV68OpenNewsItem = hfmV68OpenNewsItem = function(id){
      v145EnsureNewsState();
      const item = state.newsItems.find(n => String(n.id) === String(id));
      if (item) item.read = true;
      state.newsSelectedId = id;
      render();
      return false;
    };
  }

  if (typeof hfmV68MarkAllNewsRead === 'function') {
    window.hfmV68MarkAllNewsRead = hfmV68MarkAllNewsRead = function(){
      v145EnsureNewsState();
      state.newsItems.forEach(n => { n.read = true; });
      render();
      return false;
    };
  }

  if (typeof newscenter === 'function') {
    const v145NewscenterBase = newscenter;
    window.newscenter = newscenter = function(){
      v145EnsureNewsState();
      let out = v145NewscenterBase();
      out = out.replace('Posteingang & Welt-News', 'Posteingang & Sortierung');
      out = out.replace('direkt dein Verein', 'alle neuen Meldungen');
      out = out.replace('wichtige KI-Welt', 'Sortierung Welt');
      out = out.replace('blockieren ggf. den Kalender', 'offene Entscheidungen');
      return out;
    };
  }

  if (typeof calendarView === 'function') {
    const v145CalendarViewBase = calendarView;
    window.calendarView = calendarView = function(){
      v145EnsureClubEventsState();
      return v145CalendarViewBase();
    };
  }

  if (typeof season === 'function') {
    const v145SeasonBase = season;
    window.season = season = function(){
      v145EnsureClubEventsState();
      return v145SeasonBase();
    };
  }

  if (typeof render === 'function') {
    const v145RenderBase = render;
    window.render = render = function(){
      v145EnsureClubEventsState();
      v145EnsureNewsState();
      return v145RenderBase();
    };
  }

  if (typeof setTab === 'function') {
    const v145SetTabBase = setTab;
    window.setTab = setTab = function(tab){
      v145EnsureClubEventsState();
      v145EnsureNewsState();
      return v145SetTabBase(tab);
    };
  }

  if (typeof goTo === 'function') {
    const v145GoToBase = goTo;
    window.goTo = goTo = function(tab, section){
      v145EnsureClubEventsState();
      v145EnsureNewsState();
      return v145GoToBase(tab, section);
    };
  }

  try { v145EnsureClubEventsState(); v145EnsureNewsState(); } catch(err) { console.warn('v145 init failed', err); }
})();

/* v139: Restore Newscenter main tab and visible calendar simulation overlay after the modular navigation refactor. */
(function(){
  'use strict';
  function v139Call(name){
    try {
      const fn = window[name] || globalThis[name];
      if (typeof fn === 'function') return fn() || '';
    } catch(err) { console.warn('v139 modal call failed', name, err); }
    return '';
  }
  function v139ValidTabs(){
    return ['dashboard','news','team','market','scouting','club','environment','season','options','staff','match','matchHalftime','matchEnd'];
  }
  function v139TabContent(){
    try {
      if (state.tab === 'dashboard') return dashboard();
      if (state.tab === 'news') return (typeof newscenter === 'function') ? newscenter() : '<section class="panel"><p class="eyebrow">Newscenter</p><h2>Newscenter</h2><div class="infoBox">Newscenter konnte nicht geladen werden.</div></section>';
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
      console.error('v139 tab content failed', state.tab, err);
      return `<section class="panel"><p class="eyebrow">Fehler</p><h2>Ansicht konnte nicht geladen werden</h2><div class="infoBox">${String(err && err.message || err)}</div></section>`;
    }
    return dashboard();
  }
  function v139NavHtml(){
    return `${navButton('dashboard', '⌂', 'Home')}
      ${navButton('news', '📰', 'Newscenter')}
      ${navButton('team', '⚽', 'Team')}
      ${navButton('market', '↔', 'Transfers')}
      ${navButton('scouting', '🔭', 'Scouting')}
      ${navButton('club', '▣', 'Verein')}
      ${navButton('environment', '🏟️', 'Stadion')}
      ${navButton('season', '🏆', 'Saison')}
      ${navButton('options', '⚙️', 'Optionen')}
      ${navButton('staff', '👔', 'Mitarbeiter')}`;
  }
  function v139ExtraModals(){
    const modalNames = [
      'seasonEndModal','seasonStartModal','sponsorModal','trainingLevelUpModal','matchDayModal','postMatchWindowModal','youthDiscoveryModal','playerProfileModal',
      'hfmV70WeekSimulationModal','hfmV70CriticalNewsModal','hfmV70PausedBanner',
      'hfmV101YouthNegotiationModal','hfmV105ComfortDetailsModal','hfmV108TransferReportModal','hfmV109TransferNegotiationModal',
      'hfmV110StaffProfileModal','hfmV110StaffNegotiationModal','hfmV116OwnPlayerSaleDialogHtml','hfmV117AgentResultsModal',
      'hfmV120StaffCourseDialogHtml','hfmV120StaffLevelUpModal','hfmV123EventModalHtml','hfmV124SponsorEventModalHtml','hfmV126PsychosocialSelectionModal'
    ];
    const seen = new Set();
    let html = '';
    modalNames.forEach(name => {
      if (seen.has(name)) return;
      seen.add(name);
      html += v139Call(name);
    });
    return html;
  }
  function v139NewsLine(){
    try {
      if (typeof hfmV68NewsUnreadCount !== 'function') return '';
      const unread = hfmV68NewsUnreadCount();
      const openActions = typeof hfmV68OpenActionCount === 'function' ? hfmV68OpenActionCount() : 0;
      return unread ? `<br>News: <b>${unread} ungelesen${openActions ? ` · ${openActions} offen` : ''}</b>` : '';
    } catch(err) { return ''; }
  }
  function v139SyncNavDom(){
    const app = document.getElementById('app');
    const nav = app && app.querySelector('.bottomNav');
    if (!nav) return;
    nav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    const active = nav.querySelector(`[data-nav-id="${state.tab}"]`) || Array.from(nav.querySelectorAll('button')).find(btn => (btn.getAttribute('onclick') || '').includes(`'${state.tab}'`));
    if (active) active.classList.add('active');
    try { if (typeof hfmV68RefreshNewsDom === 'function') hfmV68RefreshNewsDom(); } catch(err) {}
  }
  function v139AfterRender(){
    try { if (typeof hfmV70InjectWeekSimulationUi === 'function') hfmV70InjectWeekSimulationUi(); } catch(err) { console.warn('v139 week simulation injection', err); }
    try { if (typeof hfmV76ApplyMatchFocusMode === 'function') hfmV76ApplyMatchFocusMode(); } catch(err) {}
    try { if (typeof hfmV135DeduplicateVip === 'function') hfmV135DeduplicateVip(); } catch(err) {}
    v139SyncNavDom();
  }
  function v139Render(){
    try { if (typeof initV36Features === 'function') initV36Features(); } catch(err) {}
    try { if (typeof ensureTrainingLevelUpQueue === 'function') ensureTrainingLevelUpQueue(); } catch(err) {}
    try { if (typeof hfmV110EnsureStaffState === 'function') hfmV110EnsureStaffState(); } catch(err) {}
    try { if (typeof hfmV120EnsureStaffDevelopmentState === 'function') hfmV120EnsureStaffDevelopmentState(); } catch(err) {}
    try { if (typeof hfmV130EnsureInfrastructure === 'function') hfmV130EnsureInfrastructure(); } catch(err) {}
    if (!v139ValidTabs().includes(state.tab)) state.tab = 'dashboard';
    if (state.activeMatch?.phase === 'halftime') state.tab = 'matchHalftime';
    if (state.activeMatch?.phase === 'finished') state.tab = 'matchEnd';
    const app = document.getElementById('app');
    if (!app) return;
    if (!state.gameStarted) { app.innerHTML = startScreen(); return; }
    const matchTheme = (typeof isMatchTabForTheme === 'function') ? isMatchTabForTheme() : ['match','matchHalftime','matchEnd'].includes(state.tab);
    const isLiveSimulation = state.activeMatch?.phase === 'live';
    const content = v139TabContent();
    const noTransition = isLiveSimulation || state.tab === 'news';
    app.innerHTML = `<div class="appShell ${matchTheme ? 'matchdayShell' : ''} ${isLiveSimulation ? 'liveSimulationShell' : ''}">
      <header class="hero ${matchTheme ? 'matchHero' : ''}">
        <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b>${v139NewsLine()}</p></div>
        <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
      </header>
      <main class="${noTransition ? 'noPageTransition' : 'pageTransition'} ${matchTheme ? 'matchMain' : ''} ${isLiveSimulation ? 'liveSimulationMain' : ''}">${content}</main>
      <nav class="bottomNav">${v139NavHtml()}</nav>
      ${v139ExtraModals()}
    </div>`;
    v139AfterRender();
  }
  window.render = render = v139Render;
  window.setTab = setTab = function(tab){
    if (!v139ValidTabs().includes(tab)) tab = 'dashboard';
    state.tab = tab;
    if (tab === 'staff') state.staffSection = state.staffSection || 'overview';
    if (tab === 'season') state.seasonSection = state.seasonSection || 'calendar';
    if (tab === 'environment') state.environmentSection = state.environmentSection || 'overview';
    v139Render();
    return false;
  };
  window.goTo = goTo = function(tab, section){
    if (!v139ValidTabs().includes(tab)) tab = 'dashboard';
    state.tab = tab;
    if (tab === 'team' && section) state.teamSection = section;
    if (tab === 'club' && section) state.clubSection = section;
    if (tab === 'season' && section) state.seasonSection = section;
    if (tab === 'environment' && section) state.environmentSection = section;
    if (tab === 'staff' && section) state.staffSection = section;
    v139Render();
    return false;
  };
  try { v139Render(); } catch(err) { console.error('v139 initial render failed', err); }
})();

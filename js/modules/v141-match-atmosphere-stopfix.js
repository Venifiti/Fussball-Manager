/* v141: Fangesang beim Verlassen der Spieltagssimulation hart stoppen
   - Stoppt die Stadion-Atmosphaere sofort bei "Spieltag beenden".
   - Startet danach wieder die normale Zufallsmusik.
   - Sicherheitsnetz: Wenn die App nicht mehr in match/matchHalftime/matchEnd ist, darf keine Stadion-Atmosphaere weiterlaufen. */
(function(){
  'use strict';

  let hfmV141Stopping = false;
  let hfmV141LastStopAt = 0;

  function hfmV141IsMatchTab() {
    try { return ['match','matchHalftime','matchEnd'].includes(String(state && state.tab || '')); }
    catch (err) { return false; }
  }

  function hfmV141HasActiveMatchday() {
    try {
      return !!(state && state.activeMatch && ['firstReady','live','halftime','tacticalStop','finished'].includes(String(state.activeMatch.phase || '')));
    } catch (err) { return false; }
  }

  function hfmV141ResumeNormalMusic() {
    try {
      if (state && state.options && state.options.musicEnabled === false) return;
      if (typeof hfmV73NextMusicTrack === 'function') hfmV73NextMusicTrack();
      else if (typeof hfmV73PlayMusic === 'function') hfmV73PlayMusic('v141-after-match');
    } catch (err) {}
  }

  function hfmV141StopAtmosphere(resumeNormalMusic) {
    const now = Date.now();
    if (hfmV141Stopping && now - hfmV141LastStopAt < 400) return;
    hfmV141Stopping = true;
    hfmV141LastStopAt = now;
    try {
      if (typeof hfmV138StopMatchAtmosphere === 'function') {
        // Erst hart stoppen, ohne sofort die normale Musik zu starten.
        hfmV138StopMatchAtmosphere(false);
      }
    } catch (err) {}
    window.setTimeout(function(){
      hfmV141Stopping = false;
      if (resumeNormalMusic !== false) hfmV141ResumeNormalMusic();
    }, 120);
  }

  // Wichtigster Pfad: Button "Spieltag beenden" stoppt den Fangesang schon vor der eigentlichen Spieltagslogik.
  document.addEventListener('click', function(ev){
    const btn = ev.target && ev.target.closest ? ev.target.closest('button') : null;
    if (!btn) return;
    const text = (btn.textContent || '').trim().toLowerCase();
    const onclick = (btn.getAttribute && btn.getAttribute('onclick') || '').toLowerCase();
    if (text.includes('spieltag beenden') || onclick.includes('endmatchdayfromresult')) {
      hfmV141StopAtmosphere(false);
      window.setTimeout(function(){
        try {
          if (!hfmV141HasActiveMatchday() || !hfmV141IsMatchTab()) hfmV141ResumeNormalMusic();
        } catch (err) {}
      }, 250);
    }
  }, true);

  // Funktion selbst absichern, falls sie nicht über den Button, sondern über Code aufgerufen wird.
  if (typeof endMatchdayFromResult === 'function') {
    const hfmV141BaseEndMatchdayFromResult = endMatchdayFromResult;
    window.endMatchdayFromResult = endMatchdayFromResult = function(){
      hfmV141StopAtmosphere(false);
      const result = hfmV141BaseEndMatchdayFromResult.apply(this, arguments);
      window.setTimeout(function(){ hfmV141StopAtmosphere(true); }, 80);
      return result;
    };
  }

  // Wenn man per Navigation aus dem Matchbereich herausgeht, ebenfalls stoppen.
  if (typeof setTab === 'function') {
    const hfmV141BaseSetTab = setTab;
    window.setTab = setTab = function(tab){
      const result = hfmV141BaseSetTab.apply(this, arguments);
      try {
        if (!['match','matchHalftime','matchEnd'].includes(String(tab))) hfmV141StopAtmosphere(true);
      } catch (err) {}
      return result;
    };
  }

  if (typeof goTo === 'function') {
    const hfmV141BaseGoTo = goTo;
    window.goTo = goTo = function(tab, section){
      const result = hfmV141BaseGoTo.apply(this, arguments);
      try {
        if (!['match','matchHalftime','matchEnd'].includes(String(tab))) hfmV141StopAtmosphere(true);
      } catch (err) {}
      return result;
    };
  }

  // Render-Sicherheitsnetz: Keine Stadion-Atmosphaere ausserhalb eines aktiven Spieltags.
  if (typeof render === 'function') {
    const hfmV141BaseRender = render;
    window.render = render = function(){
      const result = hfmV141BaseRender.apply(this, arguments);
      try {
        if (!hfmV141HasActiveMatchday() && !hfmV141IsMatchTab()) hfmV141StopAtmosphere(false);
      } catch (err) {}
      return result;
    };
  }

  window.hfmV141StopMatchAtmosphereHard = function(){ hfmV141StopAtmosphere(true); };
})();

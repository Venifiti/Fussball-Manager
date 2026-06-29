/* v138: Stadion-Atmosphaere waehrend der Spielsimulation
   - Normale Zufallsmusik pausiert beim Klick auf "Spiel starten" im Matchscreen.
   - Stadiongesaenge laufen bis "Spieltag beenden".
   - Danach startet wieder die normale zufaellige Musikrotation. */
(function(){
  'use strict';

  const STADIUM_ATMOSPHERE_SRC = 'assets/music/stadium-atmosphere.mp3';
  let hfmV138MatchAtmosphereAudio = null;
  let hfmV138MatchAtmosphereActive = false;
  let hfmV138NormalMusicWasEnabled = true;
  let hfmV138AtmosphereBlocked = false;

  function hfmV138AudioSupported() {
    return typeof Audio !== 'undefined' && typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  function hfmV138MusicEnabled() {
    try {
      if (typeof hfmV73EnsureMusicSettings === 'function') hfmV73EnsureMusicSettings();
      return !(state && state.options && state.options.musicEnabled === false);
    } catch (err) {
      return true;
    }
  }

  function hfmV138Volume() {
    try {
      const base = Number(state?.options?.musicVolume ?? 0.38);
      return Math.max(0, Math.min(1, base));
    } catch (err) {
      return 0.38;
    }
  }

  function hfmV138CreateAtmosphereAudio() {
    if (!hfmV138AudioSupported()) return null;
    if (hfmV138MatchAtmosphereAudio) return hfmV138MatchAtmosphereAudio;
    hfmV138MatchAtmosphereAudio = new Audio();
    hfmV138MatchAtmosphereAudio.src = STADIUM_ATMOSPHERE_SRC;
    hfmV138MatchAtmosphereAudio.preload = 'auto';
    hfmV138MatchAtmosphereAudio.loop = true;
    hfmV138MatchAtmosphereAudio.volume = hfmV138Volume();
    hfmV138MatchAtmosphereAudio.addEventListener('error', function(){
      hfmV138AtmosphereBlocked = true;
      console.warn('Stadion-Atmosphaere konnte nicht geladen werden.');
    });
    return hfmV138MatchAtmosphereAudio;
  }

  function hfmV138PauseNormalMusic() {
    try {
      if (typeof hfmV73StopMusic === 'function') hfmV73StopMusic(false);
    } catch (err) {}
  }

  window.hfmV138StartMatchAtmosphere = function() {
    hfmV138NormalMusicWasEnabled = hfmV138MusicEnabled();
    hfmV138MatchAtmosphereActive = true;
    hfmV138PauseNormalMusic();
    if (!hfmV138NormalMusicWasEnabled) return;
    const audio = hfmV138CreateAtmosphereAudio();
    if (!audio) return;
    try {
      audio.volume = hfmV138Volume();
      if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        const promise = audio.play();
        if (promise && typeof promise.then === 'function') {
          promise.then(function(){ hfmV138AtmosphereBlocked = false; }).catch(function(err){
            hfmV138AtmosphereBlocked = true;
            console.warn('Stadion-Atmosphaere wartet auf User-Geste:', err && err.message ? err.message : err);
          });
        }
      }
    } catch (err) {
      hfmV138AtmosphereBlocked = true;
      console.warn('Stadion-Atmosphaere konnte nicht gestartet werden:', err);
    }
  };

  window.hfmV138StopMatchAtmosphere = function(resumeNormalMusic) {
    hfmV138MatchAtmosphereActive = false;
    const audio = hfmV138MatchAtmosphereAudio;
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (err) {}
    }
    if (resumeNormalMusic !== false && hfmV138NormalMusicWasEnabled && hfmV138MusicEnabled()) {
      try {
        if (typeof hfmV73NextMusicTrack === 'function') hfmV73NextMusicTrack();
        else if (typeof hfmV73PlayMusic === 'function') hfmV73PlayMusic('afterMatchAtmosphere');
      } catch (err) {}
    }
  };

  // Normale Hintergrundmusik waehrend eines laufenden Matchtags unterdruecken.
  if (typeof hfmV73PlayMusic === 'function') {
    const hfmV138BasePlayMusic = hfmV73PlayMusic;
    hfmV73PlayMusic = function(source) {
      if (hfmV138MatchAtmosphereActive) {
        hfmV138PauseNormalMusic();
        return;
      }
      return hfmV138BasePlayMusic(source);
    };
  }

  if (typeof hfmV73SetMusicVolume === 'function') {
    const hfmV138BaseSetVolume = hfmV73SetMusicVolume;
    hfmV73SetMusicVolume = function(value) {
      const result = hfmV138BaseSetVolume(value);
      if (hfmV138MatchAtmosphereAudio) hfmV138MatchAtmosphereAudio.volume = hfmV138Volume();
      return result;
    };
  }

  if (typeof simulateFirstHalf === 'function') {
    const hfmV138BaseSimulateFirstHalf = simulateFirstHalf;
    simulateFirstHalf = function() {
      hfmV138StartMatchAtmosphere();
      return hfmV138BaseSimulateFirstHalf.apply(this, arguments);
    };
  }

  if (typeof simulateSecondHalf === 'function') {
    const hfmV138BaseSimulateSecondHalf = simulateSecondHalf;
    simulateSecondHalf = function() {
      if (!hfmV138MatchAtmosphereActive && state && state.activeMatch) hfmV138StartMatchAtmosphere();
      return hfmV138BaseSimulateSecondHalf.apply(this, arguments);
    };
  }

  if (typeof endMatchdayFromResult === 'function') {
    const hfmV138BaseEndMatchdayFromResult = endMatchdayFromResult;
    endMatchdayFromResult = function() {
      hfmV138StopMatchAtmosphere(true);
      return hfmV138BaseEndMatchdayFromResult.apply(this, arguments);
    };
  }

  // Sicherheitsnetz: Wenn ein alter Spielstand ohne aktiven Matchscreen geladen wird, keine Stadionmusik weiterlaufen lassen.
  if (typeof setTab === 'function') {
    const hfmV138BaseSetTab = setTab;
    setTab = function(tab) {
      const result = hfmV138BaseSetTab.apply(this, arguments);
      try {
        if (!state.activeMatch && tab !== 'match' && tab !== 'matchHalftime' && tab !== 'matchEnd') {
          hfmV138StopMatchAtmosphere(true);
        }
      } catch (err) {}
      return result;
    };
  }

  // Kleine Status-Ergaenzung in den Optionen.
  if (typeof hfmV73MusicOptionsPanel === 'function') {
    const hfmV138BaseMusicOptionsPanel = hfmV73MusicOptionsPanel;
    hfmV73MusicOptionsPanel = function() {
      const html = hfmV138BaseMusicOptionsPanel();
      const status = hfmV138MatchAtmosphereActive ? 'läuft während des aktuellen Spieltags' : 'startet automatisch bei Spielstart';
      return html + '<div class="infoBox"><b>Stadion-Atmosphäre:</b> ' + status + '. Nach „Spieltag beenden“ startet wieder die normale Zufallsmusik.</div>';
    };
  }

  window.hfmV138MatchAtmosphereStatus = function(){
    return { active: hfmV138MatchAtmosphereActive, blocked: hfmV138AtmosphereBlocked, src: STADIUM_ATMOSPHERE_SRC };
  };
})();

(function(){
  function ensureIntroState() {
    if (!state.clubWelcomeIntro || typeof state.clubWelcomeIntro !== 'object') {
      state.clubWelcomeIntro = { active: false, shown: false, clubName: '' };
    }
    return state.clubWelcomeIntro;
  }

  function currentClub() {
    try {
      if (typeof ownClubName === 'function') return String(ownClubName() || '').trim() || 'deinem Verein';
    } catch (e) {}
    return String(state.clubName || (state.startSetup && state.startSetup.clubName) || 'deinem Verein').trim() || 'deinem Verein';
  }

  function welcomeHtml() {
    const intro = ensureIntroState();
    if (!state.gameStarted || !intro.active) return '';
    const club = String(intro.clubName || currentClub()).trim() || 'deinem Verein';
    return `
      <div class="modalBackdrop" data-hfm-v199-welcome="1" role="dialog" aria-modal="true" aria-labelledby="hfmV199WelcomeTitle">
        <div class="modalBox smallModal hfmV199WelcomeBox">
          <div class="modalHeader hfmV199WelcomeHeader">
            <div>
              <p class="eyebrow">Neue Managerlaufbahn</p>
              <h2 id="hfmV199WelcomeTitle">Herzlich Willkommen bei ${club}</h2>
            </div>
            <span class="requiredBadge">Neu</span>
          </div>
          <p class="modalIntro hfmV199WelcomeIntro">Deine neue Aufgabe beginnt jetzt. Du übernimmst ab sofort die Verantwortung für ${club}.</p>
          <div class="infoBox hfmV199WelcomeInfo"><b>Verein:</b> ${club}<br><span>Bereit für Transfers, Training, Spieltage und Titeljagd.</span></div>
          <div class="modalActions"><button class="primary full" onclick="hfmV199CloseWelcome()">Jetzt starten</button></div>
        </div>
      </div>`;
  }

  window.hfmV199CloseWelcome = function() {
    const intro = ensureIntroState();
    intro.active = false;
    intro.shown = true;
    intro.clubName = intro.clubName || currentClub();
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch (e) {}
    if (typeof render === 'function') render();
    return false;
  };

  const previousSponsorModal = typeof sponsorModal === 'function' ? sponsorModal : null;
  if (previousSponsorModal) {
    window.sponsorModal = sponsorModal = function() {
      const intro = ensureIntroState();
      if (state.gameStarted && intro.active) return '';
      return previousSponsorModal.apply(this, arguments);
    };
  }

  const previousStartGame = typeof startGame === 'function' ? startGame : null;
  if (previousStartGame) {
    window.startGame = startGame = function() {
      const wasStarted = !!state.gameStarted;
      const result = previousStartGame.apply(this, arguments);
      if (!wasStarted && state.gameStarted) {
        const intro = ensureIntroState();
        intro.active = true;
        intro.shown = false;
        intro.clubName = currentClub();
        state.tab = 'dashboard';
        try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch (e) {}
        if (typeof render === 'function') render();
      }
      return result;
    };
  }

  const previousRender = typeof render === 'function' ? render : null;
  if (previousRender) {
    window.render = render = function() {
      const result = previousRender.apply(this, arguments);
      const intro = ensureIntroState();
      if (state.gameStarted && intro.active) {
        const app = document.getElementById('app');
        if (app) app.insertAdjacentHTML('beforeend', welcomeHtml());
      }
      return result;
    };
  }

  const style = document.createElement('style');
  style.textContent = `
    .hfmV199WelcomeBox{max-width:520px}
    .hfmV199WelcomeHeader{align-items:flex-start}
    .hfmV199WelcomeIntro{text-align:left}
    .hfmV199WelcomeInfo{margin-top:6px}
  `;
  try { document.head.appendChild(style); } catch (e) {}
})();

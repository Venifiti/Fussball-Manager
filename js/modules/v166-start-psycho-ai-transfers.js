/* v166: Start-Assistent, kompaktes Psychosozialtraining und lebendigere KI-Transfers. */
(function(){
  'use strict';

  function esc(v){
    if (typeof hfmV68Html === 'function') return hfmV68Html(v);
    return String(v == null ? '' : v).replace(/[&<>'"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]); });
  }
  function money(v){ try { if (typeof euro === 'function') return euro(Number(v || 0)); } catch(e) {} return (Number(v || 0)).toLocaleString('de-DE') + ' EUR'; }
  function ensureStart(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.startSetup || typeof state.startSetup !== 'object') state.startSetup = {};
    if (!Array.isArray(state.startSetup.managerTraits)) state.startSetup.managerTraits = (state.manager && Array.isArray(state.manager.traits)) ? state.manager.traits.slice() : [];
    if (state.startSetup.leagueIndex === undefined || state.startSetup.leagueIndex === null) state.startSetup.leagueIndex = Number(state.startLeagueIndex || 10);
    if (!state.startSetup.clubName && typeof makeLeagueClubs === 'function') state.startSetup.clubName = makeLeagueClubs(Number(state.startSetup.leagueIndex))[0] || '';
    if (!state.startSetup.managerAge) state.startSetup.managerAge = 35;
    if (!state.startSetup.managerCountry) state.startSetup.managerCountry = 'Österreich';
  }
  function optionState(){
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (!state.options.simulationSpeed) state.options.simulationSpeed = 'slow';
    if (!state.options.calendarSimulationSpeed) state.options.calendarSimulationSpeed = state.options.simulationSpeed || 'normal';
    if (!state.options.matchStopMode) state.options.matchStopMode = 'halftime';
    if (state.weekSimulationSettings.stopForSoftInterrupts === undefined) state.weekSimulationSettings.stopForSoftInterrupts = true;
  }
  function readStartDom(){
    ensureStart();
    const name = document.getElementById('managerName');
    const age = document.getElementById('managerAge');
    const country = document.getElementById('managerCountry');
    const league = document.getElementById('startLeague');
    const club = document.getElementById('startClub');
    if (name) state.startSetup.managerName = String(name.value || '').trim();
    if (age) state.startSetup.managerAge = Number(age.value || 35);
    if (country) state.startSetup.managerCountry = String(country.value || 'Österreich').trim() || 'Österreich';
    if (league) state.startSetup.leagueIndex = Number(league.value || state.startSetup.leagueIndex || 10);
    if (club) state.startSetup.clubName = String(club.value || '').trim();
    if (typeof hfmV125SelectedTraitIdsFromDom === 'function') {
      const selected = hfmV125SelectedTraitIdsFromDom();
      if (selected.length) state.startSetup.managerTraits = selected;
    }
  }
  window.hfmV166StartChanged = function(){ readStartDom(); if (typeof render === 'function') render(); return false; };
  window.hfmV166ChooseStartClub = function(){
    readStartDom();
    if (state && state.startSetup) state.startSetup.clubChosen = !!String(state.startSetup.clubName || '').trim();
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV166SetStartOption = function(key, value){
    optionState();
    if (key === 'softInterrupts') state.weekSimulationSettings.stopForSoftInterrupts = String(value) === 'true';
    else state.options[key] = value;
    return false;
  };
  window.hfmV166LimitTraitSelection = function(changed){
    if (typeof hfmV125LimitTraitSelection === 'function') hfmV125LimitTraitSelection(changed);
    readStartDom();
    if (typeof render === 'function') render();
    return false;
  };
  function opt(key, value, label){
    optionState();
    const current = key === 'softInterrupts' ? String(state.weekSimulationSettings.stopForSoftInterrupts !== false) : String(state.options[key] || '');
    return '<option value="' + esc(value) + '" ' + (current === String(value) ? 'selected' : '') + '>' + esc(label) + '</option>';
  }
  function startOptionsHtml(){
    optionState();
    return '<div class="startOptionsBoxV166">' +
      '<div class="sectionHeader"><div><p class="eyebrow">Schritt 4</p><h2>Optionen</h2></div><span class="requiredBadge">optional</span></div>' +
      '<div class="infoBox compactInfoV166">Diese Einstellungen kannst du übernehmen oder ändern. Danach startest du normal ins Spiel.</div>' +
      '<div class="startOptionsGridV166">' +
        '<label><span>Spielsimulation</span><select onchange="hfmV166SetStartOption(\'simulationSpeed\', this.value)">' + opt('simulationSpeed','slow','Langsam') + opt('simulationSpeed','normal','Normal') + opt('simulationSpeed','fast','Schnell') + opt('simulationSpeed','instant','Sofort') + '</select></label>' +
        '<label><span>Kalendersimulation</span><select onchange="hfmV166SetStartOption(\'calendarSimulationSpeed\', this.value)">' + opt('calendarSimulationSpeed','slow','Langsam') + opt('calendarSimulationSpeed','normal','Normal') + opt('calendarSimulationSpeed','fast','Schnell') + opt('calendarSimulationSpeed','instant','Sofort') + '</select></label>' +
        '<label><span>Spielstopps</span><select onchange="hfmV166SetStartOption(\'matchStopMode\', this.value)">' + opt('matchStopMode','halftime','Nur Halbzeit') + opt('matchStopMode','extra','35., 45. und 75. Minute') + '</select></label>' +
        '<label><span>News-Unterbrechungen</span><select onchange="hfmV166SetStartOption(\'softInterrupts\', this.value)">' + opt('softInterrupts','true','Ein') + opt('softInterrupts','false','Nur kritisch') + '</select></label>' +
      '</div>' +
      '<button class="primary full" onclick="startGame()">Spiel starten</button>' +
    '</div>';
  }
  function traitCards(selected){
    const list = window.HFM_V125_MANAGER_TRAITS || (typeof HFM_V125_MANAGER_TRAITS !== 'undefined' ? HFM_V125_MANAGER_TRAITS : []);
    if (!list.length && typeof hfmV125ManagerTraitCards === 'function') return hfmV125ManagerTraitCards(selected).replace(/hfmV125LimitTraitSelection\(this\)/g, 'hfmV166LimitTraitSelection(this)');
    return list.map(function(t){
      const checked = selected.indexOf(t.id) >= 0 ? 'checked' : '';
      return '<label class="managerTraitCard ' + (checked ? 'selected' : '') + '"><input type="checkbox" class="hfmV125TraitInput" value="' + esc(t.id) + '" ' + checked + ' onchange="hfmV166LimitTraitSelection(this)"><strong>' + esc(t.icon || '') + ' ' + esc(t.name) + '</strong><span>' + esc(t.effect || '') + '</span></label>';
    }).join('');
  }
  const prevSetLeague = typeof setStartLeague === 'function' ? setStartLeague : null;
  if (prevSetLeague) {
    window.setStartLeague = setStartLeague = function(index){
      readStartDom();
      const result = prevSetLeague(index);
      ensureStart();
      state.startSetup.leagueIndex = Number(index || 10);
      if (typeof makeLeagueClubs === 'function') state.startSetup.clubName = makeLeagueClubs(Number(index || 10))[0] || state.startSetup.clubName || '';
      state.startSetup.clubChosen = false;
      if (typeof render === 'function') render();
      return result;
    };
  }
  const prevStartScreen = typeof startScreen === 'function' ? startScreen : null;
  if (prevStartScreen) {
    window.startScreen = startScreen = function(){
      ensureStart(); optionState();
      if (state.gameStarted) return prevStartScreen();
      const name = String(state.startSetup.managerName || '').trim();
      const selected = Array.isArray(state.startSetup.managerTraits) ? state.startSetup.managerTraits : [];
      const nameDone = name.length >= 2;
      const clubChosen = !!state.startSetup.clubChosen && !!String(state.startSetup.clubName || '').trim();
      const traitsReady = selected.length === 2;
      const step1Class = nameDone ? 'done' : 'active';
      const step2Class = clubChosen ? 'done' : 'active';
      const step3Class = traitsReady ? 'done' : 'active';
      return '<div class="appShell startShell startWizardV166 startWizardStrictV167">' +
        '<header class="hero startHero"><div><p class="eyebrow">Neues Spiel</p><h1>Managerprofil erstellen</h1><p>Du gehst Schritt für Schritt vor: erst Name, dann Verein, dann zwei Fähigkeiten, dann Optionen.</p></div></header>' +
        '<main class="startGrid">' +
          '<section class="panel startPanel ' + step1Class + '"><p class="eyebrow">Schritt 1</p><h2>Managername</h2><label class="fieldLabel">Name</label><input id="managerName" class="textInput" value="' + esc(name) + '" placeholder="z. B. Lukas Weinguny" oninput="hfmV166StartChanged()"><div class="twoCols compactTwoV166"><div><label class="fieldLabel">Alter</label><input id="managerAge" class="textInput" type="number" min="18" max="90" value="' + Number(state.startSetup.managerAge || 35) + '" onchange="hfmV166StartChanged()"></div><div><label class="fieldLabel">Herkunftsland</label><input id="managerCountry" class="textInput" value="' + esc(state.startSetup.managerCountry || 'Österreich') + '" onchange="hfmV166StartChanged()"></div></div>' + (nameDone ? '<div class="successBoxV166">Name übernommen. Jetzt Verein auswählen.</div>' : '<div class="infoBox compactInfoV166">Gib zuerst deinen Namen ein. Erst danach erscheint die Vereinsauswahl.</div>') + '</section>' +
          (nameDone ? '<section class="panel startPanel ' + step2Class + '"><p class="eyebrow">Schritt 2</p><h2>Verein auswählen</h2><label class="fieldLabel">Liga</label><select id="startLeague" onchange="setStartLeague(this.value)">' + (typeof startLeagueOptions === 'function' ? startLeagueOptions() : '') + '</select><label class="fieldLabel">Verein</label><select id="startClub" onchange="hfmV166ChooseStartClub()">' + (typeof startClubOptions === 'function' ? startClubOptions() : '') + '</select>' + (clubChosen ? '<div class="successBoxV166">Verein ausgewählt. Jetzt 2 Managerfähigkeiten wählen.</div>' : '<div class="infoBox compactInfoV166">Wähle hier bewusst deinen Verein aus. Danach öffnet sich der nächste Schritt.</div><button type="button" class="secondary full" onclick="hfmV166ChooseStartClub()">Diesen Verein übernehmen</button>') + '</section>' : '') +
          (nameDone && clubChosen ? '<section class="panel startPanel widePanel ' + step3Class + '"><p class="eyebrow">Schritt 3</p><h2>Managerfähigkeiten</h2><div class="infoBox compactInfoV166">Wähle genau <b>2</b> Fähigkeiten. Erst danach wird das Optionsmenü sichtbar.</div><div class="managerTraitGrid managerTraitGridV166">' + traitCards(selected) + '</div></section>' : '') +
          (nameDone && clubChosen && traitsReady ? '<section class="panel startPanel widePanel active">' + startOptionsHtml() + '</section>' : '') +
        '</main></div>';
    };
  }

  const prevStartGame = typeof startGame === 'function' ? startGame : null;
  if (prevStartGame) {
    window.startGame = startGame = function(){
      readStartDom();
      const selected = state.startSetup.managerTraits || [];
      if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte gib zuerst deinen Managernamen ein.'); return false; }
      if (!String(state.startSetup.clubName || '').trim() || !state.startSetup.clubChosen) { alert('Bitte wähle zuerst deinen Verein aus und übernimm ihn.'); return false; }
      if (selected.length !== 2) { alert('Bitte wähle genau 2 Managerfähigkeiten aus.'); return false; }
      const result = prevStartGame.apply(this, arguments);
      if (state.gameStarted) {
        state.manager = Object.assign({}, state.manager || {}, { traits: selected });
        if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
      }
      return result;
    };
  }

  if (typeof hfmV126PsychosocialSelectionModal === 'function') {
    hfmV126PsychosocialSelectionModal = function(){
      const ps = typeof hfmV126EnsurePsychosocialState === 'function' ? hfmV126EnsurePsychosocialState() : (state.psychosocialTraining || {});
      if (!ps.selectionOpen) return '';
      const players = (state.players || []).slice().sort(function(a,b){ return String(a.name).localeCompare(String(b.name)); }).slice(0, 18);
      const rows = players.map(function(p){
        const active = (ps.active || []).some(function(j){ return String(j.playerId) === String(p.id); });
        const trait = typeof hfmV98TraitBadge === 'function' ? hfmV98TraitBadge(p) : esc(p.characterTrait || 'Ausgeglichen');
        const cost = typeof hfmV126PsychosocialCost === 'function' ? hfmV126PsychosocialCost(p) : 0;
        return '<button type="button" class="psyPlayerCardV166" onclick="openPlayerProfile(\'' + esc(String(p.id)).replace(/&#39;/g, "\\'") + '\')"><b>' + esc(p.name) + '</b><span>' + esc(p.pos || '') + ' · ' + Number(p.age || 0) + ' J. · St. ' + Number(p.strength || 0) + '</span><em>' + trait + '</em><strong>' + money(cost) + '</strong><small onclick="event.stopPropagation(); hfmV126StartPsychosocialTraining(\'' + esc(String(p.id)).replace(/&#39;/g, "\\'") + '\')" class="' + (active ? 'disabled' : '') + '">' + (active ? 'läuft' : 'Auswählen') + '</small></button>';
      }).join('');
      return '<div class="lineupModalBackdrop lineupModalTop psychoBackdropV166" role="dialog" aria-modal="true"><div class="lineupModal psychoModalV166"><div class="modalHeader"><div><p class="eyebrow">Psychosozialtraining</p><h2>Spieler auswählen</h2></div><button class="ghost closeButton" onclick="hfmV126ClosePsychosocialSelection()">Schließen</button></div><div class="psyInfoBarV166">4 Monate · 50% Chance · Spieler antippen für Profil</div><div class="psyGridV166">' + (rows || '<div class="infoBox">Keine Spieler vorhanden.</div>') + '</div></div></div>';
    };
    window.hfmV126PsychosocialSelectionModal = hfmV126PsychosocialSelectionModal;
  }

  const prevEnsureAi = typeof hfmV65EnsureAiTransferSystem === 'function' ? hfmV65EnsureAiTransferSystem : null;
  if (prevEnsureAi) {
    window.hfmV65EnsureAiTransferSystem = hfmV65EnsureAiTransferSystem = function(){
      const result = prevEnsureAi.apply(this, arguments);
      if (!state.aiTransferSettings || typeof state.aiTransferSettings !== 'object') state.aiTransferSettings = {};
      state.aiTransferSettings.maxDealsPerAutoWeek = Math.max(9, Number(state.aiTransferSettings.maxDealsPerAutoWeek || 0));
      state.aiTransferSettings.minSquadSize = Math.max(22, Number(state.aiTransferSettings.minSquadSize || 22));
      state.aiTransferSettings.maxSquadSize = Math.max(28, Number(state.aiTransferSettings.maxSquadSize || 28));
      if (!state.aiTransferWorld || typeof state.aiTransferWorld !== 'object') state.aiTransferWorld = { processedDays: [], dailyReports: [] };
      return result;
    };
  }
  function currentIso(){ try { return currentGameDate().toISOString().slice(0,10); } catch(e) { return String(state.week || 0); } }
  function inTransferWindow(){ try { return typeof hfmV65IsTransferWindow === 'function' ? hfmV65IsTransferWindow(currentGameDate()) : true; } catch(e) { return true; } }
  const prevRunAi = typeof hfmV65RunWeeklyAiTransfers === 'function' ? hfmV65RunWeeklyAiTransfers : null;
  if (prevRunAi) {
    window.hfmV65RunWeeklyAiTransfers = hfmV65RunWeeklyAiTransfers = function(force, maxDeals){
      if (typeof hfmV65EnsureAiTransferSystem === 'function') hfmV65EnsureAiTransferSystem();
      const baseTarget = Number(maxDeals || (force ? 10 : 9));
      let deals = prevRunAi.call(this, !!force, baseTarget) || [];
      if (!force && inTransferWindow() && deals.length < 3) {
        const extra = prevRunAi.call(this, true, Math.max(4, 7 - deals.length)) || [];
        deals = deals.concat(extra);
      }
      if (state.aiTransferWorld) {
        const iso = currentIso();
        if (deals.length) {
          state.aiTransferWorld.dailyReports.unshift({ iso: iso, deals: deals.length, text: deals.length + ' weltweite Transfer(s) am ' + (typeof formatGermanDate === 'function' ? formatGermanDate(currentGameDate()) : iso) });
          state.aiTransferWorld.dailyReports = state.aiTransferWorld.dailyReports.slice(0, 40);
        }
      }
      return deals;
    };
  }
  function recentWorldTransfersHtml(){
    const log = (state.aiTransferLog || []).slice(0, 12);
    if (!log.length) return '<div class="infoBox">Noch keine großen Transfers im Log. Während Sommer- und Winterfenster berechnen täglich mehrere KI-Vereine Bedarf, Budget und Verhandlungen.</div>';
    return '<div class="leagueList">' + log.map(function(e){
      const fee = Number(e.fee || 0) > 0 ? money(e.fee) : (Number(e.handgeld || 0) > 0 ? 'Handgeld ' + money(e.handgeld) : 'ablösefrei');
      return '<div class="league"><strong>' + esc(e.player) + ' zu ' + esc(e.buyer) + '</strong><span>' + esc(e.seller) + ' → ' + esc(e.buyer) + ' · ' + esc(e.pos || '-') + ', ' + Number(e.age || 0) + ' J. · ' + fee + '</span><span>KI-Bedarf: ' + esc(e.needPos || '-') + ' · Rolle: ' + esc(e.role || '-') + '</span></div>';
    }).join('') + '</div>';
  }
  const prevAiView = typeof aiTransfersView === 'function' ? aiTransfersView : null;
  if (prevAiView) {
    window.aiTransfersView = aiTransfersView = function(){
      if (typeof hfmV65EnsureAiTransferSystem === 'function') hfmV65EnsureAiTransferSystem();
      const last = state.aiTransferLastRun;
      const status = last ? 'Letzter Lauf: ' + esc(last.date) + ' · ' + esc(last.window) + ' · ' + Number(last.deals || 0) + ' Transfer(s)' : 'Status: aktiv in Sommer- und Winterfenster';
      return '<section class="panel widePanel"><p class="eyebrow">Markt · Weltweite Transfers</p><h2>Autonome KI-Transfers</h2><div class="infoBox">KI-Vereine prüfen Positionsbedarf, Kadergröße, Budget, Vereinsprofil und Gehaltsstruktur. Pro Simulationstag werden nur einige Vereine aktiv, damit die Transferphase verteilt und lebendig wirkt.</div><div class="grid compact">' + card('🧠','Kader-Check','Bedarf je Position','Quantität + Qualität') + card('💶','Budget','strikt begrenzt','keine Fantasie-Käufe') + card('🔎','Shortlist','3-5 Kandidaten','Alter, Stärke, Preis') + card('🤝','Verhandlung','Ablöse + Gehalt','Akzeptanzwahrscheinlichkeit') + '</div><div class="infoBox">' + status + '</div><div class="playerActions"><button class="primary full" onclick="hfmV65ManualAiTransferRound()">KI-Transfer-Testrunde ausführen</button></div><h3>Größere Transfers der letzten Zeit</h3>' + recentWorldTransfersHtml() + '</section>';
    };
  }

  function injectStyle(){
    if (document.getElementById('hfm-v166-style')) return;
    const style = document.createElement('style');
    style.id = 'hfm-v166-style';
    style.textContent = [
      '.startWizardV166 .startPanel{opacity:.62;transition:opacity .15s,transform .15s;border-color:rgba(140,180,230,.18)}',
      '.startWizardV166 .startPanel.active{opacity:1;transform:translateY(-1px);border-color:rgba(100,239,196,.45)}',
      '.startWizardV166 .startPanel.done{opacity:.95;border-color:rgba(72,210,140,.28)}',
      '.successBoxV166{margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(48,190,115,.15);border:1px solid rgba(48,190,115,.28);font-weight:800}',
      '.compactInfoV166{padding:10px 12px;margin-top:10px}',
      '.compactTwoV166{gap:10px}',
      '.managerTraitGridV166{grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}',
      '.startOptionsBoxV166 .sectionHeader{margin-bottom:8px}',
      '.startOptionsGridV166{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:10px 0 14px}',
      '.startOptionsGridV166 label{display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:14px;background:rgba(16,37,64,.75);border:1px solid rgba(140,180,230,.18);font-weight:800}',
      '.startOptionsGridV166 select{background:#0b1b31;color:#f2f7ff;border:1px solid rgba(140,180,230,.35);border-radius:12px;padding:9px 10px}',
      '.psyBackdropV166{align-items:flex-start;overflow:hidden}',
      '.psyModalV166{width:min(96vw,980px);max-height:92vh;overflow:hidden;padding:12px}',
      '.psyModalV166 .modalHeader{margin-bottom:8px}',
      '.psyInfoBarV166{padding:8px 10px;border-radius:12px;background:rgba(100,239,196,.10);border:1px solid rgba(100,239,196,.22);font-size:12px;margin-bottom:8px}',
      '.psyGridV166{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;max-height:calc(92vh - 116px);overflow:hidden}',
      '.psyPlayerCardV166{appearance:none;text-align:left;color:inherit;background:rgba(8,20,36,.86);border:1px solid rgba(140,180,230,.20);border-radius:14px;padding:9px;display:grid;grid-template-columns:1fr auto;gap:3px 8px;min-width:0}',
      '.psyPlayerCardV166 b,.psyPlayerCardV166 span,.psyPlayerCardV166 em{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.psyPlayerCardV166 b{font-size:13px}.psyPlayerCardV166 span,.psyPlayerCardV166 em{font-size:11px;color:var(--muted,#b9c6d8);font-style:normal}.psyPlayerCardV166 strong{font-size:11px;grid-column:1}.psyPlayerCardV166 small{grid-row:1/4;grid-column:2;align-self:center;padding:8px 9px;border-radius:10px;background:var(--accent,#64efc4);color:#062018;font-weight:900}.psyPlayerCardV166 small.disabled{background:#46576b;color:#dbe5ef}',
      '@media(max-width:720px){.psyModalV166{max-height:96vh;width:98vw}.psyGridV166{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.psyPlayerCardV166{padding:7px}.psyPlayerCardV166 small{padding:7px 6px}.startOptionsGridV166{grid-template-columns:1fr 1fr}.managerTraitGridV166{grid-template-columns:1fr 1fr}}'
    ].join('\n');
    document.head.appendChild(style);
  }
  const prevRender = typeof render === 'function' ? render : null;
  if (prevRender) {
    window.render = render = function(){
      const result = prevRender.apply(this, arguments);
      try { injectStyle(); } catch(e) {}
      return result;
    };
  }
  try { ensureStart(); optionState(); if (typeof hfmV65EnsureAiTransferSystem === 'function') hfmV65EnsureAiTransferSystem(); injectStyle(); } catch(e) { console.warn('v166 init', e); }
})();

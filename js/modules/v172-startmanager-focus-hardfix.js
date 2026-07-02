/* v172: Manager-Erstellung ohne Re-Render beim Tippen, damit das Namensfeld den Fokus behaelt. */
(function(){
  'use strict';
  function esc(v){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(v); } catch(e) {}
    try { if (typeof hfmV125Html === 'function') return hfmV125Html(v); } catch(e) {}
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); });
  }
  function ensureStart(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.startSetup || typeof state.startSetup !== 'object') state.startSetup = {};
    if (!state.startSetup.managerAge) state.startSetup.managerAge = 35;
    if (!state.startSetup.managerCountry) state.startSetup.managerCountry = 'Oesterreich';
    if (state.startSetup.leagueIndex === undefined || state.startSetup.leagueIndex === null) state.startSetup.leagueIndex = Number(state.startLeagueIndex || 10);
    if (!state.startSetup.clubName && typeof makeLeagueClubs === 'function') state.startSetup.clubName = makeLeagueClubs(Number(state.startSetup.leagueIndex))[0] || 'FC Beispielstadt';
    if (!Array.isArray(state.startSetup.managerTraits)) state.startSetup.managerTraits = [];
    if (!state.startWizardStep || Number(state.startWizardStep) < 1) state.startWizardStep = 1;
  }
  function readBasicInputs(){
    ensureStart();
    var name = document.getElementById('managerName');
    var age = document.getElementById('managerAge');
    var country = document.getElementById('managerCountry');
    var league = document.getElementById('startLeague');
    var club = document.getElementById('startClub');
    if (name) state.startSetup.managerName = String(name.value || '').trim();
    if (age) state.startSetup.managerAge = Number(age.value || 35);
    if (country) state.startSetup.managerCountry = String(country.value || '').trim() || 'Oesterreich';
    if (league) state.startSetup.leagueIndex = Number(league.value || state.startSetup.leagueIndex || 10);
    if (club) state.startSetup.clubName = String(club.value || '').trim() || state.startSetup.clubName;
  }
  function selectedTraitsFromDom(){
    return Array.from(document.querySelectorAll('.hfmV125TraitInput:checked')).map(function(i){ return String(i.value); });
  }
  function setStep(step){
    ensureStart();
    state.startWizardStep = Math.max(Number(state.startWizardStep || 1), Number(step || 1));
    for (var i = 1; i <= 4; i++) {
      var el = document.querySelector('[data-start-step="' + i + '"]');
      if (el) el.classList.toggle('hfmV172HiddenStep', i > Number(state.startWizardStep || 1));
    }
  }
  window.hfmV172NameInput = function(){
    readBasicInputs();
    var ok = String(state.startSetup.managerName || '').trim().length >= 2;
    var btn = document.getElementById('hfmV172NameNext');
    if (btn) btn.disabled = !ok;
    if (ok) setStep(2);
    return false;
  };
  window.hfmV172ConfirmName = function(){
    readBasicInputs();
    if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte zuerst einen Managernamen eingeben.'); return false; }
    setStep(2);
    return false;
  };
  window.hfmV172SetStartLeague = function(value){
    readBasicInputs();
    state.startSetup.leagueIndex = Number(value || 10);
    state.startLeagueIndex = Number(value || 10);
    if (typeof makeLeagueClubs === 'function') state.startSetup.clubName = makeLeagueClubs(Number(value || 10))[0] || state.startSetup.clubName || '';
    state.startSetup.clubChosen = false;
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV172ClubChanged = function(){
    readBasicInputs();
    state.startSetup.clubChosen = false;
    var btn = document.getElementById('hfmV172ClubNext');
    if (btn) btn.disabled = !String(state.startSetup.clubName || '').trim();
    return false;
  };
  window.hfmV172ConfirmClub = function(){
    readBasicInputs();
    if (!String(state.startSetup.clubName || '').trim()) { alert('Bitte zuerst einen Verein auswaehlen.'); return false; }
    state.startSetup.clubChosen = true;
    setStep(3);
    return false;
  };
  window.hfmV172TraitChanged = function(changed){
    try { if (typeof hfmV125LimitTraitSelection === 'function') hfmV125LimitTraitSelection(changed); } catch(e) {}
    state.startSetup.managerTraits = selectedTraitsFromDom();
    var count = state.startSetup.managerTraits.length;
    var label = document.getElementById('hfmV172TraitCounter');
    if (label) label.textContent = count + '/2 gewaehlt';
    if (count === 2) setStep(4);
    return false;
  };
  window.hfmV172SetOption = function(key, value){
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (key === 'softInterrupts') state.weekSimulationSettings.stopForSoftInterrupts = String(value) === 'true';
    else state.options[key] = value;
    return false;
  };
  function opt(key, value, label){
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (!state.options.simulationSpeed) state.options.simulationSpeed = 'slow';
    if (!state.options.calendarSimulationSpeed) state.options.calendarSimulationSpeed = state.options.simulationSpeed || 'normal';
    if (!state.options.matchStopMode) state.options.matchStopMode = 'halftime';
    if (state.weekSimulationSettings.stopForSoftInterrupts === undefined) state.weekSimulationSettings.stopForSoftInterrupts = true;
    var current = key === 'softInterrupts' ? String(state.weekSimulationSettings.stopForSoftInterrupts !== false) : String(state.options[key] || '');
    return '<option value="' + esc(value) + '" ' + (current === String(value) ? 'selected' : '') + '>' + esc(label) + '</option>';
  }
  function optionsHtml(){
    return '<div class="startOptionsBoxV166"><div class="sectionHeader"><div><p class="eyebrow">Schritt 4</p><h2>Optionen</h2></div><span class="requiredBadge">optional</span></div>' +
      '<div class="infoBox compactInfoV166">Diese Einstellungen kannst du uebernehmen oder aendern. Danach startest du normal ins Spiel.</div>' +
      '<div class="startOptionsGridV166">' +
      '<label><span>Spielsimulation</span><select onchange="hfmV172SetOption(\'simulationSpeed\', this.value)">' + opt('simulationSpeed','slow','Langsam') + opt('simulationSpeed','normal','Normal') + opt('simulationSpeed','fast','Schnell') + opt('simulationSpeed','instant','Sofort') + '</select></label>' +
      '<label><span>Kalendersimulation</span><select onchange="hfmV172SetOption(\'calendarSimulationSpeed\', this.value)">' + opt('calendarSimulationSpeed','slow','Langsam') + opt('calendarSimulationSpeed','normal','Normal') + opt('calendarSimulationSpeed','fast','Schnell') + opt('calendarSimulationSpeed','instant','Sofort') + '</select></label>' +
      '<label><span>Spielstopps</span><select onchange="hfmV172SetOption(\'matchStopMode\', this.value)">' + opt('matchStopMode','halftime','Nur Halbzeit') + opt('matchStopMode','extra','35., 45. und 75. Minute') + '</select></label>' +
      '<label><span>News-Unterbrechungen</span><select onchange="hfmV172SetOption(\'softInterrupts\', this.value)">' + opt('softInterrupts','true','Ein') + opt('softInterrupts','false','Nur kritisch') + '</select></label>' +
      '</div><button class="primary full" onclick="return hfmV172ConfirmOptions()">Optionen uebernehmen und Spiel starten</button></div>';
  }
  function traitCards(){
    var selected = new Set(state.startSetup.managerTraits || []);
    var list = window.HFM_V125_MANAGER_TRAITS || (typeof HFM_V125_MANAGER_TRAITS !== 'undefined' ? HFM_V125_MANAGER_TRAITS : []);
    if (!list.length && typeof hfmV125ManagerTraitCards === 'function') return hfmV125ManagerTraitCards(Array.from(selected)).replace(/hfmV125LimitTraitSelection\(this\)/g, 'hfmV172TraitChanged(this)');
    return list.map(function(t){
      var checked = selected.has(t.id) ? 'checked' : '';
      return '<label class="managerTraitCard ' + (checked ? 'selected' : '') + '"><input type="checkbox" class="hfmV125TraitInput" value="' + esc(t.id) + '" ' + checked + ' onchange="return hfmV172TraitChanged(this)"><strong>' + esc(t.icon || '') + ' ' + esc(t.name) + '</strong><span>' + esc(t.effect || '') + '</span></label>';
    }).join('');
  }
  function startScreenV172(){
    ensureStart();
    var currentStep = Number(state.startWizardStep || 1);
    var hide = function(n){ return n > currentStep ? ' hfmV172HiddenStep' : ''; };
    var leagueIndex = Number(state.startSetup.leagueIndex || 10);
    var league = (typeof LEAGUES !== 'undefined' && LEAGUES[leagueIndex]) ? LEAGUES[leagueIndex] : { country:'Oesterreich', league:'Bundesliga' };
    var name = String(state.startSetup.managerName || '');
    var nameOk = name.trim().length >= 2;
    var clubOk = !!String(state.startSetup.clubName || '').trim();
    return '<div class="appShell startShell startWizardV166 startWizardStrictV167 hfmV172StartWizard">' +
      '<header class="hero startHero"><div><p class="eyebrow">Neues Spiel</p><h1>Managerprofil erstellen</h1><p>Du gehst Schritt fuer Schritt vor: erst Name, dann Verein, dann zwei Faehigkeiten, dann Optionen.</p></div></header>' +
      '<main class="startGrid hfmV172StartGrid">' +
      '<section class="panel startPanel active" data-start-step="1"><p class="eyebrow">Schritt 1</p><h2>Managername</h2><label class="fieldLabel">Name</label><input id="managerName" class="textInput" value="' + esc(name) + '" placeholder="z. B. Lukas Weinguny" autocomplete="off" oninput="return hfmV172NameInput()"><div class="twoCols compactTwoV166"><div><label class="fieldLabel">Alter</label><input id="managerAge" class="textInput" type="number" min="18" max="90" value="' + Number(state.startSetup.managerAge || 35) + '" oninput="return hfmV172NameInput()"></div><div><label class="fieldLabel">Herkunftsland</label><input id="managerCountry" class="textInput" value="' + esc(state.startSetup.managerCountry || 'Oesterreich') + '" oninput="return hfmV172NameInput()"></div></div><button id="hfmV172NameNext" type="button" class="primary full" onclick="return hfmV172ConfirmName()" ' + (nameOk ? '' : 'disabled') + '>Weiter zur Vereinsauswahl</button></section>' +
      '<section class="panel startPanel' + hide(2) + '" data-start-step="2"><p class="eyebrow">Schritt 2</p><h2>Verein auswaehlen</h2><label class="fieldLabel">Liga</label><select id="startLeague" onchange="return hfmV172SetStartLeague(this.value)">' + (typeof startLeagueOptions === 'function' ? startLeagueOptions() : '') + '</select><label class="fieldLabel">Verein</label><select id="startClub" onchange="return hfmV172ClubChanged()">' + (typeof startClubOptions === 'function' ? startClubOptions() : '') + '</select><div class="infoBox compactInfoV166"><b>Ausgewaehlt:</b> ' + esc(league.country) + ' · ' + esc(league.league) + '<br>Der naechste Schritt oeffnet sich erst, wenn du den Verein bestaetigst.</div><button id="hfmV172ClubNext" type="button" class="secondary full" onclick="return hfmV172ConfirmClub()" ' + (clubOk ? '' : 'disabled') + '>Diesen Verein uebernehmen</button></section>' +
      '<section class="panel startPanel widePanel' + hide(3) + '" data-start-step="3"><p class="eyebrow">Schritt 3</p><h2>Managerfaehigkeiten</h2><div class="infoBox compactInfoV166">Waehle genau <b>2</b> Faehigkeiten. Danach wird das Optionsmenue sichtbar. <b id="hfmV172TraitCounter">' + (state.startSetup.managerTraits || []).length + '/2 gewaehlt</b></div><div class="managerTraitGrid managerTraitGridV166">' + traitCards() + '</div></section>' +
      '<section class="panel startPanel widePanel' + hide(4) + '" data-start-step="4">' + optionsHtml() + '</section>' +
      '</main></div>';
  }
  window.hfmV172ConfirmOptions = function(){
    readBasicInputs();
    state.startSetup.managerTraits = selectedTraitsFromDom().length ? selectedTraitsFromDom() : (state.startSetup.managerTraits || []);
    if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte zuerst einen Managernamen eingeben.'); setStep(1); return false; }
    if (!String(state.startSetup.clubName || '').trim() || !state.startSetup.clubChosen) { alert('Bitte waehle zuerst deinen Verein aus und uebernimm ihn.'); setStep(2); return false; }
    if ((state.startSetup.managerTraits || []).length !== 2) { alert('Bitte genau 2 Managerfaehigkeiten auswaehlen.'); setStep(3); return false; }
    if (typeof startGame === 'function') return startGame();
    return false;
  };
  var previousStartGame = typeof startGame === 'function' ? startGame : null;
  if (previousStartGame) {
    window.startGame = startGame = function(){
      readBasicInputs();
      var domTraits = selectedTraitsFromDom();
      if (domTraits.length) state.startSetup.managerTraits = domTraits;
      if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte gib zuerst deinen Managernamen ein.'); setStep(1); return false; }
      if (!String(state.startSetup.clubName || '').trim() || !state.startSetup.clubChosen) { alert('Bitte waehle zuerst deinen Verein aus und uebernimm ihn.'); setStep(2); return false; }
      if ((state.startSetup.managerTraits || []).length !== 2) { alert('Bitte waehle genau 2 Managerfaehigkeiten aus.'); setStep(3); return false; }
      return previousStartGame.apply(this, arguments);
    };
  }
  window.startScreen = startScreen = function(){
    ensureStart();
    if (state.gameStarted && typeof renderApp === 'function') return '';
    if (state.startPageMode && state.startPageMode !== 'setup') {
      try { if (typeof hfmV66StartHomeScreen === 'function') return hfmV66StartHomeScreen(); } catch(e) {}
    }
    return startScreenV172();
  };
  window.hfmV66OpenSetup = hfmV66OpenSetup = function(){
    ensureStart();
    state.startPageMode = 'setup';
    state.startWizardStep = 1;
    state.startSetup.managerName = '';
    state.startSetup.clubChosen = false;
    state.startSetup.managerTraits = [];
    if (typeof render === 'function') render();
    return false;
  };
  var style = document.createElement('style');
  style.textContent = '.hfmV172HiddenStep{display:none!important}.hfmV172StartWizard .startPanel{animation:hfmV172StepIn .16s ease-out}.hfmV172StartWizard input:focus,.hfmV172StartWizard select:focus{outline:2px solid rgba(95,235,190,.9);outline-offset:2px}@keyframes hfmV172StepIn{from{opacity:.25;transform:translateY(5px)}to{opacity:1;transform:none}}';
  try { document.head.appendChild(style); } catch(e) {}
})();

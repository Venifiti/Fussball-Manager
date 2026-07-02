/* v184: Startmanager-Optik wirklich wirksam + Menue-Reiter-Sortierung wieder stabil. */
(function(){
  'use strict';

  function esc(v){
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
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (state.options.calendarSimulationSpeed === 'instant') state.options.calendarSimulationSpeed = 'normal';
  }

  function readInputs(){
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

  function selectedTraits(){
    return Array.from(document.querySelectorAll('.hfmV125TraitInput:checked')).map(function(i){ return String(i.value); });
  }

  function setStartStep(step){
    ensureStart();
    state.startWizardStep = Math.max(Number(state.startWizardStep || 1), Number(step || 1));
    for (var i = 1; i <= 4; i++) {
      var el = document.querySelector('[data-start-step="' + i + '"]');
      if (el) el.classList.toggle('hfmV184HiddenStep', i > Number(state.startWizardStep || 1));
    }
  }

  window.hfmV184NameInput = function(){
    readInputs();
    var ok = String(state.startSetup.managerName || '').trim().length >= 2;
    var btn = document.getElementById('hfmV184NameNext');
    if (btn) btn.disabled = !ok;
    if (ok) setStartStep(2);
    return false;
  };

  window.hfmV184ConfirmName = function(){
    readInputs();
    if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte zuerst einen Managernamen eingeben.'); return false; }
    setStartStep(2);
    return false;
  };

  window.hfmV184SetStartLeague = function(value){
    readInputs();
    state.startSetup.leagueIndex = Number(value || 10);
    state.startLeagueIndex = Number(value || 10);
    if (typeof makeLeagueClubs === 'function') state.startSetup.clubName = makeLeagueClubs(Number(value || 10))[0] || state.startSetup.clubName || '';
    state.startSetup.clubChosen = false;
    render();
    return false;
  };

  window.hfmV184ClubChanged = function(){
    readInputs();
    state.startSetup.clubChosen = false;
    var btn = document.getElementById('hfmV184ClubNext');
    if (btn) btn.disabled = !String(state.startSetup.clubName || '').trim();
    return false;
  };

  window.hfmV184ConfirmClub = function(){
    readInputs();
    if (!String(state.startSetup.clubName || '').trim()) { alert('Bitte zuerst einen Verein auswaehlen.'); return false; }
    state.startSetup.clubChosen = true;
    setStartStep(3);
    return false;
  };

  window.hfmV184TraitChanged = function(changed){
    try { if (typeof hfmV125LimitTraitSelection === 'function') hfmV125LimitTraitSelection(changed); } catch(e) {}
    state.startSetup.managerTraits = selectedTraits();
    var count = state.startSetup.managerTraits.length;
    var label = document.getElementById('hfmV184TraitCounter');
    if (label) label.textContent = count + '/2 gewaehlt';
    if (count === 2) setStartStep(4);
    return false;
  };

  window.hfmV184SetOption = function(key, value){
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (key === 'calendarSimulationSpeed' && value === 'instant') value = 'normal';
    if (key === 'softInterrupts') state.weekSimulationSettings.stopForSoftInterrupts = String(value) === 'true';
    else state.options[key] = value;
    return false;
  };

  function opt(key, value, label){
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (!state.options.simulationSpeed) state.options.simulationSpeed = 'slow';
    if (!state.options.calendarSimulationSpeed || state.options.calendarSimulationSpeed === 'instant') state.options.calendarSimulationSpeed = 'normal';
    if (!state.options.matchStopMode) state.options.matchStopMode = 'halftime';
    if (state.weekSimulationSettings.stopForSoftInterrupts === undefined) state.weekSimulationSettings.stopForSoftInterrupts = true;
    var current = key === 'softInterrupts' ? String(state.weekSimulationSettings.stopForSoftInterrupts !== false) : String(state.options[key] || '');
    return '<option value="' + esc(value) + '" ' + (current === String(value) ? 'selected' : '') + '>' + esc(label) + '</option>';
  }

  function optionsHtml(){
    return '<div class="startOptionsBoxV166"><div class="sectionHeader"><div><p class="eyebrow">Schritt 4</p><h2>Optionen</h2></div><span class="requiredBadge">optional</span></div>' +
      '<div class="infoBox compactInfoV166">Diese Einstellungen kannst du uebernehmen oder aendern. Danach startest du normal ins Spiel.</div>' +
      '<div class="startOptionsGridV166">' +
      '<label><span>Spielsimulation</span><select onchange="hfmV184SetOption(\'simulationSpeed\', this.value)">' + opt('simulationSpeed','slow','Langsam') + opt('simulationSpeed','normal','Normal') + opt('simulationSpeed','fast','Schnell') + opt('simulationSpeed','instant','Sofort') + '</select></label>' +
      '<label><span>Kalendersimulation</span><select onchange="hfmV184SetOption(\'calendarSimulationSpeed\', this.value)">' + opt('calendarSimulationSpeed','slow','Langsam') + opt('calendarSimulationSpeed','normal','Normal') + opt('calendarSimulationSpeed','fast','Schnell') + '</select></label>' +
      '<label><span>Spielstopps</span><select onchange="hfmV184SetOption(\'matchStopMode\', this.value)">' + opt('matchStopMode','halftime','Nur Halbzeit') + opt('matchStopMode','extra','35., 45. und 75. Minute') + '</select></label>' +
      '<label><span>News-Unterbrechungen</span><select onchange="hfmV184SetOption(\'softInterrupts\', this.value)">' + opt('softInterrupts','true','Ein') + opt('softInterrupts','false','Nur kritisch') + '</select></label>' +
      '</div><button class="primary full" onclick="return hfmV184ConfirmOptions()">Optionen uebernehmen und Spiel starten</button></div>';
  }

  function traitCards(){
    var selected = new Set(state.startSetup.managerTraits || []);
    var list = window.HFM_V125_MANAGER_TRAITS || (typeof HFM_V125_MANAGER_TRAITS !== 'undefined' ? HFM_V125_MANAGER_TRAITS : []);
    if (!list.length && typeof hfmV125ManagerTraitCards === 'function') return hfmV125ManagerTraitCards(Array.from(selected)).replace(/hfmV125LimitTraitSelection\(this\)/g, 'hfmV184TraitChanged(this)');
    return list.map(function(t){
      var checked = selected.has(t.id) ? 'checked' : '';
      return '<label class="managerTraitCard ' + (checked ? 'selected' : '') + '"><input type="checkbox" class="hfmV125TraitInput" value="' + esc(t.id) + '" ' + checked + ' onchange="return hfmV184TraitChanged(this)"><strong>' + esc(t.icon || '') + ' ' + esc(t.name) + '</strong><span>' + esc(t.effect || '') + '</span></label>';
    }).join('');
  }

  function startScreenV184(){
    ensureStart();
    var currentStep = Number(state.startWizardStep || 1);
    var hide = function(n){ return n > currentStep ? ' hfmV184HiddenStep' : ''; };
    var name = String(state.startSetup.managerName || '');
    var nameOk = name.trim().length >= 2;
    var clubOk = !!String(state.startSetup.clubName || '').trim();
    return '<div class="appShell startShell startWizardV166 startWizardStrictV167 hfmV172StartWizard hfmV184StartWizard">' +
      '<header class="hero startHero"><div><p class="eyebrow">Neues Spiel</p><h1>Managerprofil erstellen</h1></div></header>' +
      '<main class="startGrid hfmV172StartGrid">' +
      '<section class="panel startPanel active" data-start-step="1"><p class="eyebrow">Schritt 1</p><h2>Managername</h2><label class="fieldLabel">Name</label><input id="managerName" class="textInput" value="' + esc(name) + '" placeholder="z. B. Lukas Weinguny" autocomplete="off" oninput="return hfmV184NameInput()"><div class="twoCols compactTwoV166"><div><label class="fieldLabel">Alter</label><input id="managerAge" class="textInput" type="number" min="18" max="90" value="' + Number(state.startSetup.managerAge || 35) + '" oninput="return hfmV184NameInput()"></div><div><label class="fieldLabel">Herkunftsland</label><input id="managerCountry" class="textInput" value="' + esc(state.startSetup.managerCountry || 'Oesterreich') + '" oninput="return hfmV184NameInput()"></div></div><button id="hfmV184NameNext" type="button" class="primary full" onclick="return hfmV184ConfirmName()" ' + (nameOk ? '' : 'disabled') + '>Weiter zur Vereinsauswahl</button></section>' +
      '<section class="panel startPanel' + hide(2) + '" data-start-step="2"><p class="eyebrow">Schritt 2</p><h2>Verein auswaehlen</h2><label class="fieldLabel">Liga</label><select id="startLeague" onchange="return hfmV184SetStartLeague(this.value)">' + (typeof startLeagueOptions === 'function' ? startLeagueOptions() : '') + '</select><label class="fieldLabel">Verein</label><select id="startClub" onchange="return hfmV184ClubChanged()">' + (typeof startClubOptions === 'function' ? startClubOptions() : '') + '</select><button id="hfmV184ClubNext" type="button" class="secondary full" onclick="return hfmV184ConfirmClub()" ' + (clubOk ? '' : 'disabled') + '>Diesen Verein uebernehmen</button></section>' +
      '<section class="panel startPanel widePanel' + hide(3) + '" data-start-step="3"><p class="eyebrow">Schritt 3</p><h2>Managerfaehigkeiten</h2><div class="infoBox compactInfoV166">Waehle genau <b>2</b> Faehigkeiten. Danach wird das Optionsmenue sichtbar. <b id="hfmV184TraitCounter">' + (state.startSetup.managerTraits || []).length + '/2 gewaehlt</b></div><div class="managerTraitGrid managerTraitGridV166">' + traitCards() + '</div></section>' +
      '<section class="panel startPanel widePanel' + hide(4) + '" data-start-step="4">' + optionsHtml() + '</section>' +
      '</main></div>';
  }

  window.hfmV184ConfirmOptions = function(){
    readInputs();
    state.startSetup.managerTraits = selectedTraits().length ? selectedTraits() : (state.startSetup.managerTraits || []);
    if (!String(state.startSetup.managerName || '').trim()) { alert('Bitte zuerst einen Managernamen eingeben.'); setStartStep(1); return false; }
    if (!String(state.startSetup.clubName || '').trim() || !state.startSetup.clubChosen) { alert('Bitte waehle zuerst deinen Verein aus und uebernimm ihn.'); setStartStep(2); return false; }
    if ((state.startSetup.managerTraits || []).length !== 2) { alert('Bitte genau 2 Managerfaehigkeiten auswaehlen.'); setStartStep(3); return false; }
    if (typeof startGame === 'function') return startGame();
    return false;
  };

  window.startScreen = startScreen = function(){
    ensureStart();
    if (state.gameStarted && typeof renderApp === 'function') return '';
    if (state.startPageMode && state.startPageMode !== 'setup') {
      try { if (typeof hfmV66StartHomeScreen === 'function') return hfmV66StartHomeScreen(); } catch(e) {}
    }
    return startScreenV184();
  };

  var oldStartGame = typeof startGame === 'function' ? startGame : null;
  if (oldStartGame) {
    window.startGame = startGame = function(){
      if (state && state.options && state.options.calendarSimulationSpeed === 'instant') state.options.calendarSimulationSpeed = 'normal';
      return oldStartGame.apply(this, arguments);
    };
  }

  /* Stabile freie Sortierung der unteren Reiter, geladen als letzter Patch. */
  var NAV_IDS = ['dashboard','news','manager','team','market','scouting','club','environment','season','options','staff'];
  var STORE_KEY = 'hfmNavOrderV152';
  var drag = null;
  var suppressClickUntil = 0;
  function validId(id){ return NAV_IDS.indexOf(String(id || '')) >= 0; }
  function getBtnId(btn){
    if (!btn) return '';
    if (btn.dataset && btn.dataset.navId) return String(btn.dataset.navId || '');
    var on = btn.getAttribute('onclick') || '';
    var m = on.match(/setTab\('([^']+)'\)|goTo\('([^']+)'/);
    return m ? (m[1] || m[2] || '') : '';
  }
  function currentOrder(nav){
    return Array.from(nav.querySelectorAll('button')).map(getBtnId).filter(validId).filter(function(id, i, a){ return a.indexOf(id) === i; });
  }
  function saveOrder(nav){
    if (!nav || typeof state === 'undefined' || !state) return;
    var order = currentOrder(nav);
    NAV_IDS.forEach(function(id){ if (order.indexOf(id) < 0) order.push(id); });
    state.navOrderV152 = order;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(order)); } catch(e) {}
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e) {}
  }
  function readOrder(){
    var order = [];
    try { if (state && Array.isArray(state.navOrderV152)) order = state.navOrderV152.slice(); } catch(e) {}
    if (!order.length) { try { order = JSON.parse(localStorage.getItem(STORE_KEY) || '[]') || []; } catch(e) { order = []; } }
    order = order.filter(validId).filter(function(id, i, a){ return a.indexOf(id) === i; });
    NAV_IDS.forEach(function(id){ if (order.indexOf(id) < 0) order.push(id); });
    return order;
  }
  function prepareNav(){
    var nav = document.querySelector('.bottomNav');
    if (!nav) return null;
    var byId = new Map();
    Array.from(nav.querySelectorAll('button')).forEach(function(btn){
      var id = getBtnId(btn);
      if (validId(id)) {
        btn.dataset.navId = id;
        byId.set(id, btn);
      }
      btn.removeAttribute('draggable');
      btn.style.touchAction = 'none';
      btn.style.userSelect = 'none';
    });
    readOrder().forEach(function(id){ var btn = byId.get(id); if (btn) nav.appendChild(btn); });
    nav.classList.add('hfmV184SortableNav');
    return nav;
  }
  function navButtonFromTarget(target){
    var btn = target && target.closest ? target.closest('.bottomNav button') : null;
    if (!btn) return null;
    return validId(getBtnId(btn)) ? btn : null;
  }
  document.addEventListener('pointerdown', function(ev){
    var btn = navButtonFromTarget(ev.target);
    if (!btn) return;
    if (ev.button !== undefined && ev.button !== 0) return;
    drag = { btn:btn, nav:btn.closest('.bottomNav'), id:getBtnId(btn), pointerId:ev.pointerId, x:ev.clientX, y:ev.clientY, moved:false };
  }, true);
  document.addEventListener('pointermove', function(ev){
    if (!drag || drag.pointerId !== ev.pointerId) return;
    var dist = Math.hypot(ev.clientX - drag.x, ev.clientY - drag.y);
    if (!drag.moved && dist < 8) return;
    if (!drag.moved) {
      drag.moved = true;
      drag.btn.classList.add('hfmV184NavDragging');
      drag.nav.classList.add('hfmV184NavSorting');
      document.documentElement.classList.add('hfmV184NavDragActive');
    }
    var oldPe = drag.btn.style.pointerEvents;
    drag.btn.style.pointerEvents = 'none';
    var el = document.elementFromPoint(ev.clientX, ev.clientY);
    drag.btn.style.pointerEvents = oldPe;
    var target = el && el.closest ? el.closest('.bottomNav button') : null;
    if (target && target !== drag.btn && drag.nav.contains(target) && validId(getBtnId(target))) {
      var r = target.getBoundingClientRect();
      var before = (ev.clientY < r.top + r.height / 2) || (Math.abs(ev.clientY - (r.top + r.height / 2)) < 4 && ev.clientX < r.left + r.width / 2);
      drag.nav.insertBefore(drag.btn, before ? target : target.nextSibling);
    }
    ev.preventDefault();
    ev.stopPropagation();
  }, true);
  function finishDrag(ev){
    if (!drag || drag.pointerId !== ev.pointerId) return;
    var moved = drag.moved;
    var nav = drag.nav;
    drag.btn.classList.remove('hfmV184NavDragging');
    nav.classList.remove('hfmV184NavSorting');
    document.documentElement.classList.remove('hfmV184NavDragActive');
    drag = null;
    if (moved) {
      saveOrder(nav);
      suppressClickUntil = Date.now() + 700;
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
  document.addEventListener('pointerup', finishDrag, true);
  document.addEventListener('pointercancel', finishDrag, true);
  document.addEventListener('click', function(ev){
    if (Date.now() > suppressClickUntil) return;
    if (ev.target && ev.target.closest && ev.target.closest('.bottomNav')) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, true);

  function injectStyles(){
    if (document.getElementById('hfmV184Styles')) return;
    var style = document.createElement('style');
    style.id = 'hfmV184Styles';
    style.textContent = [
      '.hfmV184HiddenStep{display:none!important}',
      '.hfmV184StartWizard .startHero p:not(.eyebrow){display:none!important}',
      '.hfmV184StartWizard .managerTraitCard{position:relative;overflow:hidden;box-sizing:border-box;max-width:100%;padding-top:12px}',
      '.hfmV184StartWizard .managerTraitCard input[type="checkbox"]{width:18px!important;min-width:18px!important;max-width:18px!important;height:18px!important;flex:0 0 18px!important;margin:0!important;position:static!important;display:inline-block!important;align-self:flex-start!important}',
      '.hfmV184StartWizard .managerTraitCard strong,.hfmV184StartWizard .managerTraitCard span{max-width:100%;overflow-wrap:anywhere;word-break:normal}',
      '.bottomNav.hfmV184SortableNav{touch-action:none}',
      '.bottomNav.hfmV184SortableNav button{touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;transition:transform .12s ease,opacity .12s ease,box-shadow .12s ease}',
      '.bottomNav.hfmV184SortableNav.hfmV184NavSorting{outline:1px dashed rgba(94,234,212,.55);outline-offset:4px}',
      '.bottomNav.hfmV184SortableNav .hfmV184NavDragging{opacity:.45;transform:scale(.94);box-shadow:0 0 0 2px rgba(94,234,212,.55)}',
      '.hfmV184NavDragActive,.hfmV184NavDragActive body{overscroll-behavior:contain;touch-action:none}'
    ].join('\n');
    document.head.appendChild(style);
  }

  var oldRender = typeof render === 'function' ? render : null;
  if (oldRender) {
    window.render = render = function(){
      var out = oldRender.apply(this, arguments);
      try { injectStyles(); prepareNav(); } catch(e) { console.warn('v184 final polish failed', e); }
      return out;
    };
  }
  try { injectStyles(); prepareNav(); } catch(e) {}
})();

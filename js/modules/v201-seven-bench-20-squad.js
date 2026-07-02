// v201: start squad size and bench slot migration
(function(){
  'use strict';

  var TARGET_BENCH_SLOTS = 7;
  var TARGET_START_SQUAD = 20;

  function nextPlayerId(){
    var ids = (state.players || []).map(function(p){ return Number(p && p.id) || 0; });
    return Math.max(0, ids.length ? Math.max.apply(null, ids) : 0) + 1;
  }

  function playerTemplate(offset){
    var templates = [
      { name:'Florian Berger', age:23, pos:'RV', secondary:['RM','LV'], strength:54, talent:3, progress:22, rating:3.0, minutes:0 },
      { name:'Dominik Huber', age:25, pos:'ZM', secondary:['DM','OM'], strength:55, talent:3, progress:18, rating:3.0, minutes:0 },
      { name:'Sebastian Graf', age:20, pos:'RA', secondary:['LA','RM'], strength:52, talent:4, progress:48, rating:3.0, minutes:0 },
      { name:'Patrick Aigner', age:27, pos:'ST', secondary:['OM'], strength:53, talent:2, progress:10, rating:3.0, minutes:0 },
      { name:'Michael Fuchs', age:22, pos:'LV', secondary:['LM','RV'], strength:51, talent:3, progress:34, rating:3.0, minutes:0 },
      { name:'Daniel Pichler', age:29, pos:'DM', secondary:['IV','ZM'], strength:54, talent:2, progress:8, rating:3.0, minutes:0 },
      { name:'Fabian Hofer', age:19, pos:'TW', secondary:[], strength:50, talent:4, progress:41, rating:3.0, minutes:0 }
    ];
    return templates[offset % templates.length];
  }

  function completePlayer(raw, id, index){
    var p = Object.assign({
      id: id,
      youth: false,
      loan: null,
      noPlayWeeks: 0,
      satisfaction: 58
    }, raw || {});
    if (!p.salary) p.salary = Math.round(((p.strength || 50) * 650 + (p.talent || 2) * 1800) / 1000) * 1000;
    if (!p.marketValue) p.marketValue = Math.round((((p.strength || 50) * (p.strength || 50)) * 780 + (p.talent || 2) * 70000 + Math.max(0, 25 - (p.age || 25)) * 35000) / 10000) * 10000;
    if (!p.contractYears) p.contractYears = Math.max(1, Math.min(4, 4 - (index % 4)));
    try {
      if (typeof ensurePlayerSkillProfile === 'function') p = ensurePlayerSkillProfile(p);
    } catch(e) {}
    return p;
  }

  function ensureInitialTwentyPlayers(){
    if (!state || !Array.isArray(state.players)) return false;
    state.migrations = state.migrations || {};
    if (state.migrations.v201InitialTwentyPlayers) return false;
    if (state.players.length >= TARGET_START_SQUAD) {
      state.migrations.v201InitialTwentyPlayers = true;
      return false;
    }
    var missing = TARGET_START_SQUAD - state.players.length;
    var id = nextPlayerId();
    for (var i = 0; i < missing; i++) {
      state.players.push(completePlayer(playerTemplate(i), id + i, state.players.length + i));
    }
    state.migrations.v201InitialTwentyPlayers = true;
    return missing > 0;
  }

  function sevenSlots(){
    return Array.from({ length: TARGET_BENCH_SLOTS }, function(_, index){ return { id: 'B-' + index, index: index }; });
  }

  var baseBenchSlots = typeof benchSlots === 'function' ? benchSlots : null;
  window.benchSlots = benchSlots = function(){
    return sevenSlots();
  };

  function normalizeSevenBenchSlots(){
    if (!state) return false;
    var before = JSON.stringify(state.bench || {});
    var current = state.bench && typeof state.bench === 'object' ? state.bench : {};
    var next = {};
    var seen = {};
    sevenSlots().forEach(function(slot){
      var value = current[slot.id];
      var normalized = value === undefined || value === '' ? null : value;
      if (normalized !== null) {
        var key = String(normalized);
        if (seen[key]) normalized = null;
        else seen[key] = true;
      }
      next[slot.id] = normalized;
    });
    state.bench = next;
    return before !== JSON.stringify(next);
  }

  var baseInitBench = typeof initBench === 'function' ? initBench : null;
  if (baseInitBench) {
    window.initBench = initBench = function(){
      var result = baseInitBench.apply(this, arguments);
      normalizeSevenBenchSlots();
      return result;
    };
  }

  var baseInitLineup = typeof initLineup === 'function' ? initLineup : null;
  if (baseInitLineup) {
    window.initLineup = initLineup = function(){
      ensureInitialTwentyPlayers();
      var result = baseInitLineup.apply(this, arguments);
      normalizeSevenBenchSlots();
      return result;
    };
  }

  var baseLoadGame = typeof loadGame === 'function' ? loadGame : null;
  if (baseLoadGame) {
    window.loadGame = loadGame = function(){
      var result = baseLoadGame.apply(this, arguments);
      try {
        var changedPlayers = ensureInitialTwentyPlayers();
        var changedBench = normalizeSevenBenchSlots();
        if ((changedPlayers || changedBench) && typeof render === 'function') render();
      } catch(e) { console.warn('v201 load migration failed', e); }
      return result;
    };
  }

  var baseSaveGame = typeof saveGame === 'function' ? saveGame : null;
  if (baseSaveGame) {
    window.saveGame = saveGame = function(){
      try { ensureInitialTwentyPlayers(); normalizeSevenBenchSlots(); } catch(e) {}
      return baseSaveGame.apply(this, arguments);
    };
  }

  var baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      try { ensureInitialTwentyPlayers(); normalizeSevenBenchSlots(); } catch(e) {}
      return baseRender.apply(this, arguments);
    };
  }

  try {
    var changedA = ensureInitialTwentyPlayers();
    var changedB = normalizeSevenBenchSlots();
    if ((changedA || changedB) && typeof render === 'function') render();
  } catch(e) {
    console.warn('v201 squad setup failed', e);
  }
})();

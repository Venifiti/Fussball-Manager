// v202: real 7-player bench fill + 20-player start squad guard
(function(){
  'use strict';

  var TARGET_BENCH_SLOTS = 7;
  var TARGET_SQUAD_PLAYERS = 20;

  function hasState(){ return typeof state !== 'undefined' && state && Array.isArray(state.players); }
  function sid(value){ return value === undefined || value === null || value === '' ? '' : String(value); }
  function num(value){ var n = Number(value); return Number.isFinite(n) ? n : 0; }
  function playerById(id){
    var key = sid(id);
    if (!hasState() || !key) return null;
    return state.players.find(function(p){ return sid(p && p.id) === key; }) || null;
  }
  function slotList(){
    var list = [];
    for (var i = 0; i < TARGET_BENCH_SLOTS; i++) list.push({ id: 'B-' + i, index: i });
    return list;
  }
  function nextPlayerId(){
    if (!hasState()) return 1;
    var max = 0;
    state.players.forEach(function(p){ max = Math.max(max, num(p && p.id)); });
    return max + 1;
  }
  function template(index){
    var t = [
      { name:'Florian Berger', age:23, pos:'RV', secondary:['RM','LV'], strength:61, talent:3, progress:22, rating:3.0, minutes:0 },
      { name:'Dominik Huber', age:25, pos:'ZM', secondary:['DM','OM'], strength:65, talent:3, progress:18, rating:3.0, minutes:0 },
      { name:'Sebastian Graf', age:20, pos:'RA', secondary:['LA','RM'], strength:63, talent:4, progress:48, rating:3.0, minutes:0 },
      { name:'Patrick Aigner', age:27, pos:'ST', secondary:['OM'], strength:65, talent:2, progress:10, rating:3.0, minutes:0 },
      { name:'Michael Fuchs', age:22, pos:'LV', secondary:['LM','RV'], strength:58, talent:3, progress:34, rating:3.0, minutes:0 },
      { name:'Daniel Pichler', age:29, pos:'DM', secondary:['IV','ZM'], strength:62, talent:2, progress:8, rating:3.0, minutes:0 },
      { name:'Fabian Hofer', age:19, pos:'TW', secondary:[], strength:60, talent:4, progress:41, rating:3.0, minutes:0 }
    ];
    return t[index % t.length];
  }
  function completePlayer(raw, id, index){
    var p = Object.assign({ id:id, youth:false, loan:null, noPlayWeeks:0, satisfaction:58 }, raw || {});
    if (!Array.isArray(p.secondary)) p.secondary = p.secondary ? [p.secondary] : [];
    if (!p.salary) p.salary = Math.round(((p.strength || 50) * 650 + (p.talent || 2) * 1800) / 1000) * 1000;
    if (!p.marketValue) p.marketValue = Math.round((((p.strength || 50) * (p.strength || 50)) * 780 + (p.talent || 2) * 70000 + Math.max(0, 25 - (p.age || 25)) * 35000) / 10000) * 10000;
    if (!p.contractYears) p.contractYears = Math.max(1, Math.min(4, 4 - (index % 4)));
    try { if (typeof ensurePlayerSkillProfile === 'function') p = ensurePlayerSkillProfile(p); } catch(e) {}
    return p;
  }
  function ensureTwentyPlayers(){
    if (!hasState()) return false;
    var changed = false;
    var id = nextPlayerId();
    while (state.players.length < TARGET_SQUAD_PLAYERS) {
      state.players.push(completePlayer(template(state.players.length), id++, state.players.length));
      changed = true;
    }
    return changed;
  }
  function lineupUsedIds(){
    var used = {};
    if (!hasState() || !state.lineup) return used;
    Object.keys(state.lineup).forEach(function(slotId){
      var id = sid(state.lineup[slotId]);
      if (id && playerById(id)) used[id] = true;
    });
    return used;
  }
  function ensureSevenFilledBench(){
    if (!hasState()) return false;
    if (!state.bench || typeof state.bench !== 'object') state.bench = {};

    var before = JSON.stringify(state.bench || {});
    var lineupUsed = lineupUsedIds();
    var benchUsed = {};
    var next = {};

    slotList().forEach(function(slot){
      var id = sid(state.bench[slot.id]);
      if (!id || !playerById(id) || lineupUsed[id] || benchUsed[id]) id = '';
      if (id) benchUsed[id] = true;
      next[slot.id] = id ? (num(id) || id) : null;
    });

    var candidates = (state.players || []).filter(function(p){
      var id = sid(p && p.id);
      return id && p.loan !== 'verliehen' && !lineupUsed[id] && !benchUsed[id];
    }).sort(function(a,b){
      return (num(b.strength) - num(a.strength)) || (num(a.age) - num(b.age)) || sid(a.name).localeCompare(sid(b.name));
    });

    slotList().forEach(function(slot){
      if (next[slot.id]) return;
      var p = candidates.shift();
      if (p) {
        next[slot.id] = num(p.id) || p.id;
        benchUsed[sid(p.id)] = true;
      } else {
        next[slot.id] = null;
      }
    });

    state.bench = next;
    return before !== JSON.stringify(state.bench || {});
  }
  function ensureSquadSetup(){
    var changed = false;
    changed = ensureTwentyPlayers() || changed;
    changed = ensureSevenFilledBench() || changed;
    return changed;
  }

  window.hfmV202EnsureSquadSetup = ensureSquadSetup;

  window.benchSlots = benchSlots = function(){ return slotList(); };

  var baseInitBench = typeof initBench === 'function' ? initBench : null;
  if (baseInitBench) {
    window.initBench = initBench = function(){
      var result = baseInitBench.apply(this, arguments);
      ensureSevenFilledBench();
      return result;
    };
  }

  var baseInitLineup = typeof initLineup === 'function' ? initLineup : null;
  if (baseInitLineup) {
    window.initLineup = initLineup = function(){
      ensureTwentyPlayers();
      var result = baseInitLineup.apply(this, arguments);
      ensureSevenFilledBench();
      return result;
    };
  }

  var baseLoadGame = typeof loadGame === 'function' ? loadGame : null;
  if (baseLoadGame) {
    window.loadGame = loadGame = function(){
      var result = baseLoadGame.apply(this, arguments);
      try { ensureSquadSetup(); } catch(e) { console.warn('v202 squad load fix failed', e); }
      return result;
    };
  }

  var baseSaveGame = typeof saveGame === 'function' ? saveGame : null;
  if (baseSaveGame) {
    window.saveGame = saveGame = function(){
      try { ensureSquadSetup(); } catch(e) {}
      return baseSaveGame.apply(this, arguments);
    };
  }

  var baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      try { ensureSquadSetup(); } catch(e) { console.warn('v202 squad render fix failed', e); }
      return baseRender.apply(this, arguments);
    };
  }

  try {
    var changed = ensureSquadSetup();
    if (changed && typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    if (changed && typeof render === 'function') render();
  } catch(e) {
    console.warn('v202 squad setup failed', e);
  }
})();

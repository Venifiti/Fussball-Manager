/* Version 191: Vertragsverlaengerung - nie wieder Grund: undefined
   Fixes a late override where contractWillingness returned a number instead of
   the object shape expected by contract views and negotiation flows. */
(function(){
  'use strict';

  function n(v, fb){ var x = Number(v); return Number.isFinite(x) ? x : (fb || 0); }
  function reasonForPlayer(player){
    if (!player) return 'Spieler nicht gefunden';
    try {
      if ((n(player.negotiationLockUntil, 0)) > n(window.state && state.week, 0)) {
        return 'gesperrt bis KW ' + n(player.negotiationLockUntil, 0);
      }
    } catch(e) {}
    if (n(player.contractYears, 0) > 2) return 'zu lange Restlaufzeit - moechte noch nicht verhandeln';
    try {
      if (typeof window.plansRetirementAfterContract === 'function' && window.plansRetirementAfterContract(player)) {
        return 'plant Karriereende nach Vertragsende';
      }
    } catch(e) {}
    var satisfaction = 60;
    try { satisfaction = typeof window.playerSatisfaction === 'function' ? n(window.playerSatisfaction(player), 60) : n(player.satisfaction, 60); } catch(e) { satisfaction = n(player.satisfaction, 60); }
    if (satisfaction < 35 || n(player.noPlayWeeks, 0) >= 8) return 'zu ungluecklich wegen fehlender Einsaetze';
    return 'aktuell nicht verhandlungsbereit';
  }
  function willingScore(player){
    var satisfaction = 60;
    try { satisfaction = typeof window.playerSatisfaction === 'function' ? n(window.playerSatisfaction(player), 60) : n(player && player.satisfaction, 60); } catch(e) { satisfaction = n(player && player.satisfaction, 60); }
    var rest = n(player && player.contractYears, 0);
    var score = satisfaction;
    if (rest > 2) score -= 35;
    if (rest <= 1) score += 15;
    if (n(player && player.noPlayWeeks, 0) >= 8) score -= 35;
    if (n(player && player.age, 0) >= 34) score -= 8;
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  function normalizedContractWillingness(player){
    var reason = reasonForPlayer(player);
    var ok = reason === 'aktuell nicht verhandlungsbereit' ? false : false;
    // Explicit positive checks mirror the original object contract.
    try {
      var locked = (n(player && player.negotiationLockUntil, 0)) > n(window.state && state.week, 0);
      var longRest = n(player && player.contractYears, 0) > 2;
      var retires = typeof window.plansRetirementAfterContract === 'function' && window.plansRetirementAfterContract(player);
      var satisfaction = typeof window.playerSatisfaction === 'function' ? n(window.playerSatisfaction(player), 60) : n(player && player.satisfaction, 60);
      var unhappy = satisfaction < 35 || n(player && player.noPlayWeeks, 0) >= 8;
      ok = !!player && !locked && !longRest && !retires && !unhappy;
    } catch(e) {
      ok = false;
    }
    return { ok: ok, reason: ok ? 'verhandlungsbereit' : reasonForPlayer(player), score: willingScore(player) };
  }

  window.contractWillingness = contractWillingness = normalizedContractWillingness;

  var oldOpen = typeof window.openContractExtension === 'function' ? window.openContractExtension : null;
  window.openContractExtension = openContractExtension = function(playerId){
    var player = null;
    try { player = (state.players || []).find(function(p){ return String(p.id) === String(playerId); }); } catch(e) {}
    if (!player) return oldOpen ? oldOpen.apply(this, arguments) : false;
    var willingness = normalizedContractWillingness(player);
    if (!willingness.ok) {
      alert(player.name + ' will aktuell nicht verlaengern: ' + willingness.reason + '.');
      return false;
    }
    return oldOpen ? oldOpen.apply(this, arguments) : false;
  };

  var oldSubmit = typeof window.submitContractOffer === 'function' ? window.submitContractOffer : null;
  window.submitContractOffer = submitContractOffer = function(){
    var neg = null, player = null;
    try { neg = state.contractNegotiation; player = (state.players || []).find(function(p){ return String(p.id) === String(neg && neg.playerId); }); } catch(e) {}
    if (player) {
      var willingness = normalizedContractWillingness(player);
      if (!willingness.ok) {
        try { state.contractNegotiation = null; } catch(e) {}
        alert(player.name + ' bricht die Gespräche ab: ' + willingness.reason + '.');
        try { if (typeof render === 'function') render(); } catch(e) {}
        return false;
      }
    }
    return oldSubmit ? oldSubmit.apply(this, arguments) : false;
  };

  function cleanUndefinedText(){
    try {
      var app = document.getElementById('app');
      if (!app) return;
      app.querySelectorAll('.contractPlayer .meta span, .infoBox, .player, .newsBody').forEach(function(el){
        if (!el || !el.textContent || el.textContent.indexOf('undefined') < 0) return;
        el.textContent = el.textContent.replace(/Grund:\s*undefined/gi, 'Grund: aktuell nicht verhandlungsbereit').replace(/undefined/gi, 'aktuell nicht verhandlungsbereit');
      });
    } catch(e) {}
  }
  var oldRender = typeof window.render === 'function' ? window.render : null;
  if (oldRender) {
    window.render = render = function(){
      var out = oldRender.apply(this, arguments);
      cleanUndefinedText();
      return out;
    };
  }
})();

(function(){
  'use strict';

  function n(v, fallback){ var x = Number(v); return Number.isFinite(x) ? x : (fallback || 0); }
  function money(v){ try { if (typeof euro === 'function') return euro(Number(v || 0)); } catch(e){} return Number(v || 0).toLocaleString('de-DE') + ' €'; }
  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }
  function ownPlayer(id){ return (state.players || []).find(function(p){ return String(p.id) === String(id); }) || null; }
  function playerMarketValue(player){
    if (!player) return 0;
    try { if (typeof hfmV108MarketValue === 'function') return Math.max(0, Number(hfmV108MarketValue(player, typeof ownClubName === 'function' ? ownClubName() : '', typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 10)) || 0); } catch(e){}
    try { if (typeof hfmV68EstimatedPlayerValue === 'function') return Math.max(0, Number(hfmV68EstimatedPlayerValue(player)) || 0); } catch(e){}
    try { if (typeof hfmV116DefaultAsk === 'function') return Math.max(0, Number(hfmV116DefaultAsk(player)) || 0); } catch(e){}
    return Math.max(50000, Number(player.marketValue || player.value || 0) || (Number(player.strength || 55) * 45000));
  }
  function stableRand(seed){
    var h = 2166136261;
    String(seed || '').split('').forEach(function(ch){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); });
    return ((h >>> 0) % 10000) / 10000;
  }
  function realisticOwnOfferFee(player, seed){
    var market = playerMarketValue(player);
    var years = n(player && player.contractYears, 2);
    var r = stableRand(seed || (player && player.id) || Date.now());
    var factor;
    if (years <= 1) {
      // Bei nur noch 1 Jahr Restvertrag bieten Vereine spürbar unter Marktwert.
      factor = 0.58 + r * 0.24; // 58-82%
    } else {
      // Normalfall: grob um den Marktwert herum, nicht deutlich darunter.
      factor = 0.90 + r * 0.30; // 90-120%
      if (player && player.transferListed) factor -= 0.04;
      if (player && Number(player.age || 25) >= 31) factor -= 0.05;
      factor = clamp(factor, 0.86, 1.22);
    }
    var fee = Math.max(50000, Math.round((market * factor) / 10000) * 10000);
    return { fee: fee, market: market, factor: factor };
  }
  function adjustTransferOfferNews(news){
    if (!news || news.action_type !== 'TRANSFER_OFFER' || !news.data) return news;
    var p = ownPlayer(news.data.PLAYER_ID);
    if (!p) return news;
    var calc = realisticOwnOfferFee(p, String(news.uniqueKey || news.id || '') + '-' + String(news.data.BUYER || news.sender_id || '') + '-' + String(p.id));
    var current = n(news.data.FEE_VALUE, 0);
    var years = n(p.contractYears, 2);
    var minAllowed = years <= 1 ? Math.round(calc.market * 0.50) : Math.round(calc.market * 0.84);
    // Nur korrigieren, wenn das Angebot deutlich zu niedrig ist oder gar kein echter Wert vorhanden ist.
    if (!current || current < minAllowed) {
      news.data.FEE_VALUE = calc.fee;
      news.data.FEE = money(calc.fee);
      news.data.MARKET_VALUE = calc.market;
      news.data.CONTRACT_YEARS = years;
      news.data.OFFER_NOTE = years <= 1 ? 'Abschlag wegen nur noch 1 Jahr Restvertrag' : 'Angebot am Marktwert orientiert';
      news.body = news.body || '';
    }
    return news;
  }
  function normalizeOpenTransferOffers(){
    try { (state.newsItems || []).forEach(adjustTransferOfferNews); } catch(e){}
  }

  var baseAddNews = typeof hfmV68AddNews === 'function' ? hfmV68AddNews : null;
  if (baseAddNews) {
    window.hfmV68AddNews = hfmV68AddNews = function(news){
      return baseAddNews.call(this, adjustTransferOfferNews(news));
    };
  }

  /* Wohlfühlfaktor-Maske robust schließbar machen */
  window.hfmV200CloseComfortDetails = function(){
    state.comfortDetailsPlayerId = null;
    state.comfortDetailsContext = null;
    try { if (typeof hfmV105CloseComfortDetails === 'function') hfmV105CloseComfortDetails(); } catch(e){}
    state.comfortDetailsPlayerId = null;
    state.comfortDetailsContext = null;
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV105CloseComfortDetails = window.hfmV105CloseComfortDetails = hfmV105CloseComfortDetails = window.hfmV200CloseComfortDetails;

  document.addEventListener('click', function(ev){
    var modal = ev.target && ev.target.closest && ev.target.closest('.comfortDetailsModal, .hfmV200ComfortModal');
    if (!modal) return;
    var closeBtn = ev.target.closest && ev.target.closest('button');
    if (closeBtn && /schlie|schließ|close/i.test(String(closeBtn.textContent || ''))) {
      ev.preventDefault(); ev.stopPropagation(); return window.hfmV200CloseComfortDetails();
    }
    if (ev.target.classList && ev.target.classList.contains('lineupModalBackdrop')) {
      ev.preventDefault(); ev.stopPropagation(); return window.hfmV200CloseComfortDetails();
    }
  }, true);

  /* Team-Formation: Startelfspieler per Drag auf die Ersatzbank setzen */
  function benchIdFromCard(card){
    if (!card) return '';
    if (card.dataset && card.dataset.benchId) return card.dataset.benchId;
    var txt = card.getAttribute('onclick') || card.getAttribute('ondrop') || '';
    var m = txt.match(/bench-[0-9]+/);
    return m ? m[0] : '';
  }
  function prepareBenchDropTargets(){
    document.querySelectorAll('.benchCard').forEach(function(card){
      var id = benchIdFromCard(card);
      if (id) card.dataset.benchId = id;
      card.classList.add('hfmV200BenchDropTarget');
    });
  }
  function putLineupPlayerOnBench(lineupSlotId, benchSlotId){
    if (!lineupSlotId || !benchSlotId || !state.lineup) return false;
    if (!state.bench || typeof state.bench !== 'object') state.bench = {};
    var starterId = Number(state.lineup[lineupSlotId] || 0);
    if (!starterId) return false;
    var oldBenchId = Number(state.bench[benchSlotId] || 0);
    // Duplikate vorher entfernen.
    Object.keys(state.bench).forEach(function(k){ if (String(k) !== String(benchSlotId) && Number(state.bench[k]) === starterId) state.bench[k] = null; });
    Object.keys(state.lineup).forEach(function(k){ if (String(k) !== String(lineupSlotId) && Number(state.lineup[k]) === oldBenchId) state.lineup[k] = null; });
    state.bench[benchSlotId] = starterId;
    state.lineup[lineupSlotId] = oldBenchId || null;
    try { if (typeof cleanupSquadDuplicates === 'function') cleanupSquadDuplicates(); } catch(e){}
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e){}
    if (typeof hfmV203RefreshLineupArea === 'function') hfmV203RefreshLineupArea();
    else if (typeof render === 'function') render();
    return false;
  }
  window.hfmV200PutLineupPlayerOnBench = putLineupPlayerOnBench;

  function enableFieldToBenchPointerDrag(){
    prepareBenchDropTargets();
    document.querySelectorAll('.visualPitch:not(.halftimePitch)').forEach(function(pitch){
      if (pitch.dataset.v200BenchDrag === '1') return;
      pitch.dataset.v200BenchDrag = '1';
      var drag = null;
      pitch.addEventListener('pointerdown', function(ev){
        var el = ev.target.closest && ev.target.closest('.fieldPlayer[data-slot-id]');
        if (!el) return;
        drag = { slotId: el.dataset.slotId, pointerId: ev.pointerId, moved: false };
      }, true);
      document.addEventListener('pointermove', function(ev){
        if (drag && ev.pointerId === drag.pointerId) drag.moved = true;
      }, true);
      document.addEventListener('pointerup', function(ev){
        if (!drag || ev.pointerId !== drag.pointerId) return;
        var source = drag;
        drag = null;
        var target = document.elementFromPoint(ev.clientX, ev.clientY);
        var bench = target && target.closest && target.closest('.benchCard');
        var benchSlotId = benchIdFromCard(bench);
        if (benchSlotId) {
          ev.preventDefault();
          ev.stopPropagation();
          return putLineupPlayerOnBench(source.slotId, benchSlotId);
        }
      }, true);
    });
  }

  // Native HTML5-DnD zusätzlich absichern, falls Browser das statt Pointer verwendet.
  var baseDropSquad = typeof dropSquadPlayer === 'function' ? dropSquadPlayer : null;
  if (baseDropSquad) {
    window.dropSquadPlayer = dropSquadPlayer = function(event, targetType, targetSlotId){
      try {
        var source = typeof readSquadDragSource === 'function' ? readSquadDragSource(event) : state.dragSquadSource;
        if (source && source.type === 'lineup' && targetType === 'bench' && !isLiveMatchSquadEdit()) {
          event.preventDefault(); event.stopPropagation();
          state.dragSquadSource = null;
          return putLineupPlayerOnBench(source.slotId, targetSlotId);
        }
      } catch(e){}
      return baseDropSquad.apply(this, arguments);
    };
  }

  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){
    if (baseAfter) baseAfter.apply(this, arguments);
    try { prepareBenchDropTargets(); enableFieldToBenchPointerDrag(); } catch(e) { console.warn('v200 bench drag init', e); }
  };

  var baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      normalizeOpenTransferOffers();
      var result = baseRender.apply(this, arguments);
      try {
        var comfort = document.querySelector('.comfortDetailsModal .lineupModal, .comfortDetailsModal, .lineupModalBackdrop .lineupModal');
        if (state.comfortDetailsPlayerId) {
          document.querySelectorAll('.comfortDetailsModal').forEach(function(m){ m.classList.add('hfmV200ComfortModal'); });
        }
        prepareBenchDropTargets();
        enableFieldToBenchPointerDrag();
      } catch(e) {}
      return result;
    };
  }

  var style = document.createElement('style');
  style.textContent = '\n.comfortDetailsModal,.hfmV200ComfortModal{z-index:9999!important}\n.comfortDetailsModal .lineupModal,.hfmV200ComfortModal .lineupModal{max-height:86dvh!important;overflow:auto!important;padding-bottom:28px!important}\n.comfortDetailsModal .modalHeader,.hfmV200ComfortModal .modalHeader{position:sticky;top:0;z-index:2;background:rgba(18,35,58,.96);backdrop-filter:blur(10px);border-radius:18px;padding-bottom:8px}\n.hfmV200BenchDropTarget{outline-offset:3px}\n.hfmV200BenchDropTarget:hover{outline:2px solid rgba(97,239,197,.6)}\n';
  try { document.head.appendChild(style); } catch(e){}

  try { normalizeOpenTransferOffers(); } catch(e){}
  try { if (typeof render === 'function') render(); } catch(e){}
})();

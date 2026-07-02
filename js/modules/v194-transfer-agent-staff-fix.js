(function(){
  if (typeof window === 'undefined' || typeof state === 'undefined') return;

  function esc(value){ return typeof hfmV68Html === 'function' ? hfmV68Html(value) : String(value == null ? '' : value).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function js(value){ return String(value == null ? '' : value).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
  function money(value){ try { return typeof euro === 'function' ? euro(value) : String(Math.round(Number(value || 0))) + ' €'; } catch(e){ return String(value || 0) + ' €'; } }
  function idx(value){ return Number(value == null ? (typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 0) : value); }

  /* Mitarbeitermarkt-Hardfix: fehlende alte Normalisierungsfunktion nachreichen. */
  window.hfmV110NormalizeStaff = hfmV110NormalizeStaff = function(){
    try {
      if (!Array.isArray(state.staff)) state.staff = [];
      if (!Array.isArray(state.staffMarket)) state.staffMarket = [];
      if (!state.clubStaffCache || typeof state.clubStaffCache !== 'object') state.clubStaffCache = {};
      if (typeof hfmV110EnsureStaffState === 'function') hfmV110EnsureStaffState();
      var normalizeOne = function(s, own){
        if (!s || typeof s !== 'object') return s;
        if (!s.role) s.role = 'assistant';
        if (!s.name) s.name = 'Mitarbeiter';
        if (!s.attributes || typeof s.attributes !== 'object') s.attributes = {};
        if (typeof hfmV110StaffStrength === 'function') s.strength = hfmV110StaffStrength(s);
        else s.strength = Math.max(1, Math.min(99, Math.round(Number(s.strength || 50))));
        if (typeof hfmV110StaffSalary === 'function') s.salary = Number(s.salary || hfmV110StaffSalary(s.strength, s.role, typeof ownCombinedImage === 'function' ? ownCombinedImage() : 55));
        s.contractYears = Number(s.contractYears || (own ? 2 : 0));
        s.freeAgent = !own;
        if (own) {
          if (typeof ownClubName === 'function') s.club = ownClubName();
          if (typeof OWN_LEAGUE_INDEX !== 'undefined') s.leagueIndex = OWN_LEAGUE_INDEX;
        } else {
          s.club = null;
          s.leagueIndex = null;
          if (typeof hfmV110StaffMarketValue === 'function') s.marketValue = hfmV110StaffMarketValue(s);
        }
        return s;
      };
      state.staff = (state.staff || []).filter(Boolean).map(function(s){ return normalizeOne(s, true); });
      state.staffMarket = (state.staffMarket || []).filter(Boolean).map(function(s){ return normalizeOne(s, false); });
      if (!state.staffSection) state.staffSection = 'overview';
      return true;
    } catch (err) {
      console.warn('v194 staff normalize fallback failed', err);
      if (!Array.isArray(state.staff)) state.staff = [];
      if (!Array.isArray(state.staffMarket)) state.staffMarket = [];
      if (!state.staffSection) state.staffSection = 'overview';
      return false;
    }
  };

  /* Transferliste: Verhandlungen auch ohne Scouting erlauben, ohne den Spieler dadurch automatisch zu scouten. */
  var baseKnown = typeof hfmV104IsKnown === 'function' ? hfmV104IsKnown : null;
  if (baseKnown && !window.__hfmV194KnownWrapped) {
    window.__hfmV194KnownWrapped = true;
    window.hfmV104IsKnown = hfmV104IsKnown = function(player){
      if (window.__hfmV194AllowUnscoutedTransfer) return true;
      return baseKnown(player);
    };
  }

  var baseOpenTransferNegotiation = typeof hfmV108OpenTransferNegotiation === 'function' ? hfmV108OpenTransferNegotiation : null;
  window.hfmV194OpenTransferFromList = hfmV194OpenTransferFromList = function(playerId, clubName, leagueIndex){
    if (!baseOpenTransferNegotiation && typeof hfmV108OpenTransferNegotiation === 'function') baseOpenTransferNegotiation = hfmV108OpenTransferNegotiation;
    if (!baseOpenTransferNegotiation) { alert('Transferverhandlung konnte nicht geöffnet werden.'); return false; }
    window.__hfmV194AllowUnscoutedTransfer = true;
    try {
      var ok = baseOpenTransferNegotiation(String(playerId), String(clubName || ''), idx(leagueIndex), { transferList:true, allowUnscouted:true });
      if (state && state.transferNegotiation) {
        state.transferNegotiation.allowUnscouted = true;
        state.transferNegotiation.transferList = true;
        if (!state.transferNegotiation.scoutingRiskNoteAdded) {
          state.transferNegotiation.lastMessage = String(state.transferNegotiation.lastMessage || '') + ' Hinweis: Du kaufst/verhandelst ohne vollständigen Scoutbericht. Die Einschätzung kann ungenau sein.';
          state.transferNegotiation.scoutingRiskNoteAdded = true;
        }
      }
      if (typeof render === 'function') render();
      return ok;
    } finally {
      window.__hfmV194AllowUnscoutedTransfer = false;
    }
  };

  if (typeof transferListTableRow === 'function') {
    window.transferListTableRow = transferListTableRow = function(p){
      var price = typeof transferListPrice === 'function' ? transferListPrice(p) : Number(p.marketValue || 0);
      var availability = typeof availabilityLabel === 'function' ? availabilityLabel(p) : { cls:'', text:'verfügbar' };
      var known = typeof isPlayerKnown === 'function' ? isPlayerKnown(p) : false;
      var marketValue = known || p.freeAgent ? money(p.marketValue) : 'Schätzung ' + money(p.marketValue);
      var scoutStatus = !known && typeof scoutingJobStatusText === 'function' ? scoutingJobStatusText('player', { playerId: p.id }) : '';
      var club = js(p.club || '');
      var action = '<button type="button" class="primary smallButton" onclick="event.stopPropagation(); return hfmV194OpenTransferFromList(\'' + js(p.id) + '\', \'' + club + '\', ' + idx(p.leagueIndex) + ')">' + (p.freeAgent ? 'Verpflichten' : 'Kaufen') + '</button>';
      return '<tr class="clickableRow" onclick="openPlayerProfile(\'' + js(p.id) + '\', \'' + club + '\', ' + idx(p.leagueIndex) + ')">' +
        '<td><strong>' + esc(p.name) + '</strong>' + (scoutStatus ? '<br><small>' + esc(scoutStatus) + '</small>' : '') + '</td>' +
        '<td>' + Number(p.age || 0) + '</td>' +
        '<td>' + (typeof positionText === 'function' ? positionText(p) : esc(p.pos || '')) + '</td>' +
        '<td><strong>' + Number(p.strength || 0) + '</strong></td>' +
        '<td><strong>' + marketValue + '</strong></td>' +
        '<td><strong>' + (p.freeAgent ? '0 €' : money(price)) + '</strong></td>' +
        '<td>' + esc(p.club || '') + '</td>' +
        '<td>' + esc(p.nationality || 'International') + '</td>' +
        '<td><span class="statusPill ' + esc(availability.cls || '') + '">' + esc(availability.text || 'verfügbar') + '</span></td>' +
        '<td>' + action + '</td>' +
      '</tr>';
    };
  }

  if (typeof transferListView === 'function') {
    window.transferListView = transferListView = function(){
      var rows = (typeof sortedTransferListedPlayers === 'function' ? sortedTransferListedPlayers() : []).map(transferListTableRow).join('');
      var sort = state.transferListSort || 'price_asc';
      return '<section class="panel widePanel"><p class="eyebrow">Transfers · Transferliste</p><h2>Transferliste</h2>' +
        '<div class="infoBox">Hier stehen Spieler, die Vereine aktiv abgeben möchten oder die ablösefrei verfügbar sind. Du kannst Spieler auch ohne vollständigen Scoutbericht kaufen/verhandeln. Das Risiko liegt dann bei dir: Die Einschätzung kann besser oder schlechter als erwartet sein.</div>' +
        '<div class="sectionHeader transferSortHeader"><h3>Sortierung</h3><select onchange="setTransferListSort(this.value)">' +
          '<option value="strength_desc" ' + (sort==='strength_desc'?'selected':'') + '>Stärke absteigend</option>' +
          '<option value="strength_asc" ' + (sort==='strength_asc'?'selected':'') + '>Stärke aufsteigend</option>' +
          '<option value="age_asc" ' + (sort==='age_asc'?'selected':'') + '>Alter aufsteigend</option>' +
          '<option value="age_desc" ' + (sort==='age_desc'?'selected':'') + '>Alter absteigend</option>' +
          '<option value="marketValue_asc" ' + (sort==='marketValue_asc'?'selected':'') + '>Marktwert aufsteigend</option>' +
          '<option value="marketValue_desc" ' + (sort==='marketValue_desc'?'selected':'') + '>Marktwert absteigend</option>' +
          '<option value="price_asc" ' + (sort==='price_asc'?'selected':'') + '>Preis aufsteigend</option>' +
          '<option value="price_desc" ' + (sort==='price_desc'?'selected':'') + '>Preis absteigend</option>' +
        '</select></div>' +
        '<div class="tableWrap transferListTable"><table><thead><tr><th>Name</th><th>Alter</th><th>Position</th><th>Stärke</th><th>Marktwert</th><th>Preis</th><th>Verein</th><th>Nationalität</th><th>Verfügbar</th><th>Aktion</th></tr></thead><tbody>' +
        (rows || '<tr><td colspan="10">Aktuell keine Spieler auf der Transferliste.</td></tr>') + '</tbody></table></div></section>';
    };
  }

  /* Spielerberater-Funde: einzelne uninteressante Spieler verwerfen. */
  window.hfmV194DiscardAgentFoundPlayer = hfmV194DiscardAgentFoundPlayer = function(resultId, playerId){
    var removed = false;
    (state.playerAgentSearchResults || []).forEach(function(result){
      if (String(result.id) === String(resultId)) {
        result.players = (result.players || []).filter(function(p){
          var keep = String(p.id) !== String(playerId);
          if (!keep) removed = true;
          return keep;
        });
      }
    });
    state.playerAgentSearchResults = (state.playerAgentSearchResults || []).filter(function(result){ return (result.players || []).length > 0; });
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    if (typeof render === 'function') render();
    return false;
  };

  if (typeof hfmV119AgentSearchResultRow === 'function') {
    window.hfmV119AgentSearchResultRow = hfmV119AgentSearchResultRow = function(p, result){
      var feeBase = Number(p.marketValue || (typeof hfmV108MarketValue === 'function' ? hfmV108MarketValue(p, p.club, p.leagueIndex) : 0));
      var commissionAmount = Math.round(feeBase * Number(result.commission || 0) / 100);
      var club = js(p.club || '');
      var league = idx(p.leagueIndex);
      var talent = typeof talentStars === 'function' ? talentStars(p.talent) : esc(p.talent || '?');
      return '<div class="player"><div class="playerTop"><strong class="clickableName" onclick="openPlayerProfile(\'' + js(p.id) + '\', \'' + club + '\', ' + league + ')">' + esc(p.name) + '</strong><span>' + (typeof positionText === 'function' ? positionText(p) : esc(p.pos || '')) + ' · ' + Number(p.age || 0) + ' Jahre</span></div>' +
        '<div class="meta"><span>' + esc(p.club || '') + '</span><span>Stärke ' + Number(p.strength || 0) + '</span><span>Talent ' + talent + '</span><span>Marktwert ca. ' + money(feeBase) + '</span><span>Provision bei Kauf: ' + Number(result.commission || 0) + '% ca. ' + money(commissionAmount) + '</span></div>' +
        '<div class="playerActions"><button type="button" class="ghost" onclick="openPlayerProfile(\'' + js(p.id) + '\', \'' + club + '\', ' + league + ')">Spieler öffnen</button>' +
        (typeof watchlistHas === 'function' && watchlistHas(p.id) ? '<button type="button" class="ghost" disabled>Auf Beobachtungsliste</button>' : '<button type="button" class="ghost" onclick="addToWatchlist(\'' + js(p.id) + '\', \'' + club + '\', ' + league + ')">Auf Beobachtungsliste setzen</button>') +
        '<button type="button" class="primary" onclick="return hfmV119BuyAgentRecommendedPlayer(\'' + js(result.id) + '\', \'' + js(p.id) + '\', \'' + club + '\', ' + league + ')">Spieler kaufen</button>' +
        '<button type="button" class="ghost dangerButton" onclick="return hfmV194DiscardAgentFoundPlayer(\'' + js(result.id) + '\', \'' + js(p.id) + '\')">Spieler verwerfen</button>' +
        '</div></div>';
    };
  }

  /* Wenn die Mitarbeiteransicht durch den alten Fehler offen war, nach Laden des Fixes wieder sauber rendern. */
  try { hfmV110NormalizeStaff(); } catch(e) {}
  try { if (typeof render === 'function') render(); } catch(e) { console.warn('v194 render after fixes', e); }
})();

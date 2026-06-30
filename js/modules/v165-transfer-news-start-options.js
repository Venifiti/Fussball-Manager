/* v165: Transferangebote aus dem Newscenter heraus voll beantwortbar + Startseiten-Optionen einklappbar. */
(function(){
  'use strict';

  function esc(v){
    if (typeof hfmV68Html === 'function') return hfmV68Html(v);
    return String(v == null ? '' : v).replace(/[&<>'"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]); });
  }
  function money(v){
    try { if (typeof euro === 'function') return euro(Number(v || 0)); } catch(err) {}
    return (Number(v || 0)).toLocaleString('de-DE') + ' EUR';
  }
  function ensureOptionState(){
    if (typeof state === 'undefined' || !state) return;
    if (!state.options || typeof state.options !== 'object') state.options = {};
    if (!state.options.simulationSpeed) state.options.simulationSpeed = 'slow';
    if (!state.options.calendarSimulationSpeed) state.options.calendarSimulationSpeed = state.options.simulationSpeed || 'normal';
    if (!state.options.matchStopMode) state.options.matchStopMode = 'halftime';
    if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== 'object') state.weekSimulationSettings = {};
    if (state.weekSimulationSettings.stopForSoftInterrupts === undefined) state.weekSimulationSettings.stopForSoftInterrupts = true;
  }
  function ownPlayer(id){
    return (state.players || []).find(function(p){ return String(p.id) === String(id); }) || null;
  }
  function findNews(id){
    return (state.newsItems || []).find(function(n){ return String(n.id) === String(id); }) || null;
  }

  const previousNewsActionButtons = typeof hfmV68NewsActionButtons === 'function' ? hfmV68NewsActionButtons : null;
  window.hfmV165OpenTransferOfferFromNews = function(id){
    if (typeof hfmV68EnsureNewsState === 'function') hfmV68EnsureNewsState();
    const news = findNews(id);
    if (!news || news.resolved || news.action_type !== 'TRANSFER_OFFER') return false;
    news.read = true;
    state.newsSelectedId = news.id;
    state.transferOfferModalNewsId = news.id;
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV165CloseTransferOfferModal = function(){
    state.transferOfferModalNewsId = null;
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV165ResolveTransferOffer = function(id, action){
    const news = findNews(id);
    if (!news || news.resolved) { state.transferOfferModalNewsId = null; if (typeof render === 'function') render(); return false; }
    if (typeof hfmV68ResolveNewsAction === 'function') hfmV68ResolveNewsAction(id, action);
    const after = findNews(id);
    if (!after || after.resolved || action !== 'negotiate') state.transferOfferModalNewsId = null;
    else state.transferOfferModalNewsId = id;
    if (typeof render === 'function') render();
    return false;
  };

  function transferOfferActionButton(news){
    if (!news || !news.requires_action || news.resolved || news.action_type !== 'TRANSFER_OFFER') return '';
    return '<div class="modalActions newsActions"><button class="primary full" onclick="return hfmV165OpenTransferOfferFromNews(\'' + esc(String(news.id)).replace(/&#39;/g, "\\'") + '\')">Transferangebot ansehen</button></div>';
  }
  if (previousNewsActionButtons) {
    window.hfmV68NewsActionButtons = hfmV68NewsActionButtons = function(news){
      if (news && news.action_type === 'TRANSFER_OFFER' && news.requires_action && !news.resolved) return transferOfferActionButton(news);
      return previousNewsActionButtons(news);
    };
  }

  function transferOfferModal(){
    const id = state && state.transferOfferModalNewsId;
    if (!id) return '';
    const news = findNews(id);
    if (!news || news.resolved || news.action_type !== 'TRANSFER_OFFER') { state.transferOfferModalNewsId = null; return ''; }
    const data = news.data || {};
    const p = ownPlayer(data.PLAYER_ID);
    const fee = Number(data.FEE_VALUE || 0);
    const max = Number(data.MAX_FEE_VALUE || Math.round(fee * 1.22));
    const market = p ? (typeof hfmV108MarketValue === 'function' ? hfmV108MarketValue(p, typeof ownClubName === 'function' ? ownClubName() : '', typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 10) : Number(p.marketValue || p.value || 0)) : 0;
    const mode = data.MODE === 'loan' ? 'Leihe' : 'Verkauf';
    const negotiated = data.NEGOTIATED ? '<span class="requiredBadge">nachverhandelt</span>' : '';
    const playerMeta = p ? [
      'Position: ' + esc(typeof positionText === 'function' ? positionText(p) : (p.position || '-')),
      'Alter: ' + esc(p.age || '-') + ' Jahre',
      'Staerke: ' + esc(p.strength || p.rating || '-'),
      market ? 'Marktwert: ' + money(market) : ''
    ].filter(Boolean).join(' · ') : 'Der Spieler ist nicht mehr im aktuellen Kader vorhanden.';
    const negotiateDisabled = data.NEGOTIATED || !p ? 'disabled' : '';
    const acceptDisabled = !p ? 'disabled' : '';
    return '<div class="lineupModalBackdrop transferOfferModalV165" role="dialog" aria-modal="true">' +
      '<div class="lineupModal">' +
        '<div class="modalHeader"><div><p class="eyebrow">Transferangebot ansehen</p><h2>' + esc(data.PLAYER_NAME || 'Transferangebot') + '</h2></div><button class="ghost closeButton" onclick="return hfmV165CloseTransferOfferModal()">Zurueck</button></div>' +
        '<div class="grid compact transferOfferGridV165">' +
          '<article class="card"><div class="icon">🏟️</div><p>Interessent</p><h2>' + esc(data.BUYER || news.sender_id || '-') + '</h2><span>' + mode + '</span></article>' +
          '<article class="card"><div class="icon">💶</div><p>Aktuelles Angebot</p><h2>' + esc(data.FEE || money(fee)) + '</h2><span>max. Verhandlungsrahmen ca. ' + money(max) + '</span></article>' +
        '</div>' +
        '<div class="infoBox"><b>' + esc(data.PLAYER_NAME || 'Spieler') + '</b><br>' + playerMeta + '</div>' +
        '<div class="infoBox newsBody">' + (typeof hfmV68NewsBody === 'function' ? hfmV68NewsBody(news) : esc(news.body || '')) + ' ' + negotiated + '</div>' +
        '<div class="modalActions newsActions">' +
          '<button class="primary full" ' + acceptDisabled + ' onclick="return hfmV165ResolveTransferOffer(\'' + esc(String(id)).replace(/&#39;/g, "\\'") + '\',\'accept\')">Annehmen</button>' +
          '<button class="ghost full" ' + negotiateDisabled + ' onclick="return hfmV165ResolveTransferOffer(\'' + esc(String(id)).replace(/&#39;/g, "\\'") + '\',\'negotiate\')">Verhandeln</button>' +
          '<button class="ghost full" onclick="return hfmV165ResolveTransferOffer(\'' + esc(String(id)).replace(/&#39;/g, "\\'") + '\',\'reject\')">Abbrechen / ablehnen</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  window.hfmV165SetStartOption = function(key, value){
    ensureOptionState();
    if (key === 'softInterrupts') state.weekSimulationSettings.stopForSoftInterrupts = String(value) === 'true';
    else state.options[key] = value;
    return false;
  };

  function selectOption(key, value, label){
    ensureOptionState();
    let current = key === 'softInterrupts' ? String(state.weekSimulationSettings.stopForSoftInterrupts !== false) : String(state.options[key] || '');
    return '<option value="' + esc(value) + '" ' + (current === String(value) ? 'selected' : '') + '>' + esc(label) + '</option>';
  }
  function startOptionsPanel(){
    ensureOptionState();
    return '<details class="startOptionsDetailsV165">' +
      '<summary><span><b>⚙️ Optionen</b><small>Spieloptionen vor dem Start anzeigen</small></span><em>aufklappen</em></summary>' +
      '<div class="startOptionsGridV165">' +
        '<label><span>Spielsimulation</span><select onchange="hfmV165SetStartOption(\'simulationSpeed\', this.value)">' +
          selectOption('simulationSpeed','slow','Langsam') + selectOption('simulationSpeed','normal','Normal') + selectOption('simulationSpeed','fast','Schnell') + selectOption('simulationSpeed','instant','Sofort') +
        '</select><small>Geschwindigkeit innerhalb eines Spiels.</small></label>' +
        '<label><span>Kalendersimulation</span><select onchange="hfmV165SetStartOption(\'calendarSimulationSpeed\', this.value)">' +
          selectOption('calendarSimulationSpeed','slow','Langsam') + selectOption('calendarSimulationSpeed','normal','Normal') + selectOption('calendarSimulationSpeed','fast','Schnell') + selectOption('calendarSimulationSpeed','instant','Sofort') +
        '</select><small>Tempo beim Weiterklicken im Kalender.</small></label>' +
        '<label><span>Automatische Spielstopps</span><select onchange="hfmV165SetStartOption(\'matchStopMode\', this.value)">' +
          selectOption('matchStopMode','halftime','Nur Halbzeit') + selectOption('matchStopMode','extra','35., 45. und 75. Minute') +
        '</select><small>Wann du im Spiel taktisch eingreifen kannst.</small></label>' +
        '<label><span>News-Unterbrechungen</span><select onchange="hfmV165SetStartOption(\'softInterrupts\', this.value)">' +
          selectOption('softInterrupts','true','Soft-Interrupts ein') + selectOption('softInterrupts','false','Nur kritische Nachrichten') +
        '</select><small>Kritische Entscheidungen stoppen immer.</small></label>' +
      '</div>' +
    '</details>';
  }

  const previousStartScreen = typeof startScreen === 'function' ? startScreen : null;
  if (previousStartScreen) {
    window.startScreen = startScreen = function(){
      const html = previousStartScreen();
      if (typeof state !== 'undefined' && state && state.gameStarted) return html;
      const panel = startOptionsPanel();
      if (html.indexOf('startOptionsDetailsV165') >= 0) return html;
      if (html.indexOf('<button class="primary full" onclick="startGame()">Spiel starten</button>') >= 0) {
        return html.replace('<button class="primary full" onclick="startGame()">Spiel starten</button>', panel + '<button class="primary full" onclick="startGame()">Spiel starten</button>');
      }
      if (html.indexOf('</main>') >= 0) return html.replace('</main>', '<section class="panel startPanel widePanel">' + panel + '</section></main>');
      return html + panel;
    };
  }

  function injectStyle(){
    if (document.getElementById('hfm-v165-style')) return;
    const style = document.createElement('style');
    style.id = 'hfm-v165-style';
    style.textContent = [
      '.startOptionsDetailsV165{margin:16px 0;border:1px solid rgba(140,180,230,.25);border-radius:18px;background:rgba(9,24,43,.55);overflow:hidden}',
      '.startOptionsDetailsV165 summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px}',
      '.startOptionsDetailsV165 summary::-webkit-details-marker{display:none}',
      '.startOptionsDetailsV165 summary span{display:flex;flex-direction:column;gap:4px}',
      '.startOptionsDetailsV165 summary small,.startOptionsDetailsV165 summary em{color:var(--muted,#b9c6d8);font-style:normal}',
      '.startOptionsDetailsV165[open] summary em{color:var(--accent,#64efc4)}',
      '.startOptionsGridV165{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;padding:0 16px 16px}',
      '.startOptionsGridV165 label{display:flex;flex-direction:column;gap:7px;padding:12px;border:1px solid rgba(140,180,230,.18);border-radius:14px;background:rgba(16,37,64,.75)}',
      '.startOptionsGridV165 label span{font-weight:800}',
      '.startOptionsGridV165 label small{color:var(--muted,#b9c6d8);line-height:1.25}',
      '.startOptionsGridV165 select{width:100%;background:#0b1b31;color:#f2f7ff;border:1px solid rgba(140,180,230,.35);border-radius:12px;padding:10px 12px}',
      '.transferOfferModalV165 .lineupModal{max-width:560px}',
      '.transferOfferGridV165{margin-bottom:12px}',
      '.activeNewsItem{outline:2px solid rgba(100,239,196,.45)}'
    ].join('\n');
    document.head.appendChild(style);
  }

  const previousRender = typeof render === 'function' ? render : null;
  if (previousRender) {
    window.render = render = function(){
      const result = previousRender();
      try { injectStyle(); } catch(err) {}
      try {
        const app = document.getElementById('app');
        const html = transferOfferModal();
        if (app && html && !app.querySelector('.transferOfferModalV165')) app.insertAdjacentHTML('beforeend', html);
      } catch(err) { console.warn('v165 transfer modal render failed', err); }
      return result;
    };
  }

  try { ensureOptionState(); injectStyle(); } catch(err) { console.warn('v165 init failed', err); }
})();

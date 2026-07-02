/* v152: Menueleiste frei sortierbar, KI-Transfers aus Transferbereich entfernt, Filterfelder dunkles Design. */
(function(){
  'use strict';

  const STORE_KEY = 'hfmNavOrderV152';
  const DEFAULT_NAV = [
    { id:'dashboard', icon:'⌂', label:'Home' },
    { id:'news', icon:'📰', label:'Newscenter' },
    { id:'manager', icon:'👤', label:'Manager' },
    { id:'team', icon:'⚽', label:'Team' },
    { id:'market', icon:'↔', label:'Transfers' },
    { id:'scouting', icon:'🔭', label:'Scouting' },
    { id:'club', icon:'▣', label:'Verein' },
    { id:'environment', icon:'🏟️', label:'Stadion' },
    { id:'season', icon:'🏆', label:'Saison' },
    { id:'options', icon:'⚙️', label:'Optionen' },
    { id:'staff', icon:'👔', label:'Mitarbeiter' }
  ];
  const DEFAULT_IDS = DEFAULT_NAV.map(n => n.id);

  function readStoredOrder(){
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch(err) { return []; }
  }

  function saveStoredOrder(order){
    try { localStorage.setItem(STORE_KEY, JSON.stringify(order)); } catch(err) {}
  }

  function ensureNavOrder(){
    if (typeof state === 'undefined' || !state) return DEFAULT_IDS.slice();
    const saved = Array.isArray(state.navOrderV152) ? state.navOrderV152 : readStoredOrder();
    const clean = [];
    saved.forEach(id => { if (DEFAULT_IDS.includes(id) && !clean.includes(id)) clean.push(id); });
    DEFAULT_IDS.forEach(id => { if (!clean.includes(id)) clean.push(id); });
    state.navOrderV152 = clean;
    saveStoredOrder(clean);
    return clean;
  }

  function navDef(id){ return DEFAULT_NAV.find(n => n.id === id) || DEFAULT_NAV[0]; }

  function buttonId(btn){
    if (!btn) return '';
    if (btn.dataset && btn.dataset.navId) return btn.dataset.navId;
    const attr = btn.getAttribute('onclick') || '';
    const m = attr.match(/setTab\('([^']+)'\)|goTo\('([^']+)'/);
    return m ? (m[1] || m[2]) : '';
  }

  function moveNavId(dragId, targetId){
    if (!dragId || dragId === targetId) return false;
    const order = ensureNavOrder().filter(id => id !== dragId);
    const idx = targetId ? order.indexOf(targetId) : -1;
    if (idx >= 0) order.splice(idx, 0, dragId);
    else order.push(dragId);
    state.navOrderV152 = order;
    saveStoredOrder(order);
    if (typeof hfmV77SilentSave === 'function') {
      try { hfmV77SilentSave(); } catch(err) {}
    }
    return true;
  }

  let nativeDragId = '';
  let pointerDrag = null;
  let suppressNextClick = false;

  document.addEventListener('click', function(ev){
    if (!suppressNextClick) return;
    const inNav = ev.target && ev.target.closest && ev.target.closest('.bottomNav');
    if (!inNav) return;
    ev.preventDefault();
    ev.stopPropagation();
    suppressNextClick = false;
  }, true);

  function wireButton(btn){
    const id = buttonId(btn);
    if (!id || !DEFAULT_IDS.includes(id)) return;
    const def = navDef(id);
    btn.dataset.navId = id;
    btn.setAttribute('draggable', 'true');
    btn.setAttribute('title', 'Gedrückt halten und verschieben');
    const span = btn.querySelector('span');
    const bold = btn.querySelector('b');
    if (span && span.textContent !== def.label) span.textContent = def.label;
    if (bold && bold.textContent !== def.icon) bold.textContent = def.icon;
    btn.classList.toggle('active', state && state.tab === id);

    btn.ondragstart = function(ev){
      nativeDragId = id;
      btn.classList.add('navDragging');
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/plain', id);
      }
    };
    btn.ondragend = function(){
      nativeDragId = '';
      btn.classList.remove('navDragging');
      const nav = btn.closest('.bottomNav');
      if (nav) nav.classList.remove('navDragActive');
    };
    btn.ondragover = function(ev){ ev.preventDefault(); if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move'; };
    btn.ondrop = function(ev){
      ev.preventDefault();
      const dragId = nativeDragId || (ev.dataTransfer && ev.dataTransfer.getData('text/plain')) || '';
      const targetId = buttonId(btn);
      if (moveNavId(dragId, targetId)) {
        suppressNextClick = true;
        render();
      }
    };

    btn.onpointerdown = function(ev){
      if (ev.button !== undefined && ev.button !== 0) return;
      pointerDrag = { id, x: ev.clientX, y: ev.clientY, dragging:false, pointerId: ev.pointerId };
    };
    btn.onpointermove = function(ev){
      if (!pointerDrag || pointerDrag.id !== id || pointerDrag.pointerId !== ev.pointerId) return;
      const dist = Math.hypot(ev.clientX - pointerDrag.x, ev.clientY - pointerDrag.y);
      if (dist > 12) {
        pointerDrag.dragging = true;
        const nav = btn.closest('.bottomNav');
        if (nav) nav.classList.add('navDragActive');
        btn.classList.add('navDragging');
        ev.preventDefault();
      }
    };
    btn.onpointerup = function(ev){
      if (!pointerDrag || pointerDrag.id !== id || pointerDrag.pointerId !== ev.pointerId) return;
      const wasDragging = pointerDrag.dragging;
      const dragId = pointerDrag.id;
      pointerDrag = null;
      btn.classList.remove('navDragging');
      const nav = btn.closest('.bottomNav');
      if (nav) nav.classList.remove('navDragActive');
      if (!wasDragging) return;
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const targetBtn = el && el.closest ? el.closest('.bottomNav button') : null;
      const targetId = buttonId(targetBtn);
      if (moveNavId(dragId, targetId)) render();
      suppressNextClick = true;
      ev.preventDefault();
    };
    btn.onpointercancel = function(){
      pointerDrag = null;
      btn.classList.remove('navDragging');
      const nav = btn.closest('.bottomNav');
      if (nav) nav.classList.remove('navDragActive');
    };
  }

  function applyNavSorting(){
    if (typeof state === 'undefined' || !state || !state.gameStarted) return;
    const nav = document.querySelector('.bottomNav');
    if (!nav) return;
    const buttons = Array.from(nav.querySelectorAll('button'));
    const byId = new Map();
    buttons.forEach(btn => { const id = buttonId(btn); if (id) byId.set(id, btn); });
    ensureNavOrder().forEach(id => {
      const btn = byId.get(id);
      if (btn) nav.appendChild(btn);
    });
    Array.from(nav.querySelectorAll('button')).forEach(wireButton);
    nav.ondragover = function(ev){ ev.preventDefault(); };
    nav.ondrop = function(ev){
      if (ev.target && ev.target.closest && ev.target.closest('button')) return;
      ev.preventDefault();
      const dragId = nativeDragId || (ev.dataTransfer && ev.dataTransfer.getData('text/plain')) || '';
      if (moveNavId(dragId, '')) { suppressNextClick = true; render(); }
    };
  }

  function stripAiTransfersHtml(html){
    return String(html || '')
      .replace(/<article class="card"[^>]*setMarketSection\('aiTransfers'\)[\s\S]*?<\/article>/g, '')
      .replace(/<button class="chip[^>]*setMarketSection\('aiTransfers'\)[\s\S]*?<\/button>/g, '')
      .replace(/<button[^>]*setMarketSection\('aiTransfers'\)[\s\S]*?KI-Transfers[\s\S]*?<\/button>/g, '')
      .replace(/<h2>Transfers, Suche, Leihen und KI-Markt<\/h2>/g, '<h2>Transfers, Suche, Leihen und Beratermarkt</h2>')
      .replace(/\s*und KI-Markt/g, '')
      .replace(/\s*\+ KI-Transfers/g, '');
  }

  const baseSetMarketSection = typeof setMarketSection === 'function' ? setMarketSection : null;
  window.setMarketSection = setMarketSection = function(section){
    if (section === 'aiTransfers') section = 'overview';
    if (baseSetMarketSection) return baseSetMarketSection(section);
    state.marketSection = section || 'overview';
    render();
    return false;
  };

  const baseMarketOverview = typeof marketOverview === 'function' ? marketOverview : null;
  if (baseMarketOverview) {
    window.marketOverview = marketOverview = function(){
      return stripAiTransfersHtml(baseMarketOverview());
    };
  }

  const baseMarket = typeof market === 'function' ? market : null;
  if (baseMarket) {
    window.market = market = function(){
      if (state.marketSection === 'aiTransfers') state.marketSection = 'overview';
      return stripAiTransfersHtml(baseMarket());
    };
  }

  const baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      const out = baseRender();
      try { applyNavSorting(); } catch(err) { console.warn('v152 nav sorting failed', err); }
      return out;
    };
  }

  window.hfmV152ResetNavOrder = function(){
    if (typeof state !== 'undefined' && state) state.navOrderV152 = DEFAULT_IDS.slice();
    saveStoredOrder(DEFAULT_IDS.slice());
    render();
    return false;
  };

  try { applyNavSorting(); } catch(err) { console.warn('v152 init failed', err); }
})();

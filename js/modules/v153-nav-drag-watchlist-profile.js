/* v153: Stabiles Sortieren der unteren Menueleiste + Beobachtungsliste per Klick oeffnet Spielerprofil. */
(function(){
  'use strict';

  const STORE_KEY = 'hfmNavOrderV152';
  const NAV_IDS = ['dashboard','news','manager','team','market','scouting','club','environment','season','options','staff'];
  let drag = null;
  let suppressClickUntil = 0;

  function now(){ return Date.now ? Date.now() : new Date().getTime(); }
  function navButtonId(btn){ return btn && btn.dataset ? String(btn.dataset.navId || '') : ''; }
  function validId(id){ return NAV_IDS.indexOf(String(id || '')) >= 0; }
  function saveOrderFromDom(nav){
    if (!nav || typeof state === 'undefined' || !state) return;
    const order = Array.from(nav.querySelectorAll('button'))
      .map(navButtonId)
      .filter(validId)
      .filter(function(id, index, arr){ return arr.indexOf(id) === index; });
    NAV_IDS.forEach(function(id){ if (order.indexOf(id) < 0) order.push(id); });
    state.navOrderV152 = order;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(order)); } catch(e) {}
    if (typeof hfmV77SilentSave === 'function') {
      try { hfmV77SilentSave(); } catch(e) {}
    }
  }
  function restoreOrder(nav){
    if (!nav || typeof state === 'undefined' || !state) return;
    let order = Array.isArray(state.navOrderV152) ? state.navOrderV152.slice() : [];
    if (!order.length) {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) order = parsed;
      } catch(e) {}
    }
    order = order.filter(validId).filter(function(id, index, arr){ return arr.indexOf(id) === index; });
    NAV_IDS.forEach(function(id){ if (order.indexOf(id) < 0) order.push(id); });
    const byId = new Map();
    Array.from(nav.querySelectorAll('button')).forEach(function(btn){
      const id = navButtonId(btn) || (btn.getAttribute('onclick') || '').match(/'(.*?)'/)?.[1] || '';
      if (validId(id)) {
        btn.dataset.navId = id;
        byId.set(id, btn);
      }
      btn.removeAttribute('draggable');
      btn.style.touchAction = 'none';
      btn.style.userSelect = 'none';
    });
    order.forEach(function(id){ const btn = byId.get(id); if (btn) nav.appendChild(btn); });
    state.navOrderV152 = order;
  }
  function ensureNavReady(){
    const nav = document.querySelector('.bottomNav');
    if (!nav) return null;
    restoreOrder(nav);
    nav.classList.add('hfmV153SortableNav');
    return nav;
  }
  function buttonFromEventTarget(target){
    if (!target || !target.closest) return null;
    const btn = target.closest('.bottomNav button');
    if (!btn) return null;
    const id = navButtonId(btn);
    return validId(id) ? btn : null;
  }
  function startDrag(ev){
    const btn = buttonFromEventTarget(ev.target);
    if (!btn) return;
    if (ev.button !== undefined && ev.button !== 0) return;
    const nav = btn.closest('.bottomNav');
    if (!nav) return;
    drag = {
      nav: nav,
      btn: btn,
      id: navButtonId(btn),
      pointerId: ev.pointerId,
      startX: ev.clientX,
      startY: ev.clientY,
      moved: false
    };
    try { btn.setPointerCapture(ev.pointerId); } catch(e) {}
    ev.stopImmediatePropagation();
  }
  function targetButtonAt(x, y){
    if (!drag || !drag.nav) return null;
    const previousPointerEvents = drag.btn.style.pointerEvents;
    drag.btn.style.pointerEvents = 'none';
    const el = document.elementFromPoint(x, y);
    drag.btn.style.pointerEvents = previousPointerEvents;
    const target = el && el.closest ? el.closest('.bottomNav button') : null;
    if (!target || target === drag.btn || !drag.nav.contains(target)) return null;
    return validId(navButtonId(target)) ? target : null;
  }
  function placeDraggedButton(target, x, y){
    if (!drag || !drag.nav || !drag.btn) return;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const before = y < rect.top + rect.height / 2 || (Math.abs(y - (rect.top + rect.height / 2)) < rect.height / 2 && x < rect.left + rect.width / 2);
    if (before) {
      if (target.previousSibling !== drag.btn) drag.nav.insertBefore(drag.btn, target);
    } else {
      if (target.nextSibling !== drag.btn) drag.nav.insertBefore(drag.btn, target.nextSibling);
    }
  }
  function moveDrag(ev){
    if (!drag || drag.pointerId !== ev.pointerId) return;
    const dx = ev.clientX - drag.startX;
    const dy = ev.clientY - drag.startY;
    const dist = Math.hypot(dx, dy);
    if (!drag.moved && dist < 10) {
      ev.stopImmediatePropagation();
      return;
    }
    if (!drag.moved) {
      drag.moved = true;
      drag.nav.classList.add('hfmV153NavSorting');
      drag.btn.classList.add('hfmV153NavDragging');
      document.documentElement.classList.add('hfmV153NavDragActive');
    }
    const target = targetButtonAt(ev.clientX, ev.clientY);
    placeDraggedButton(target, ev.clientX, ev.clientY);
    ev.preventDefault();
    ev.stopImmediatePropagation();
  }
  function endDrag(ev){
    if (!drag || drag.pointerId !== ev.pointerId) return;
    const wasMoved = !!drag.moved;
    const nav = drag.nav;
    const btn = drag.btn;
    try { btn.releasePointerCapture(ev.pointerId); } catch(e) {}
    btn.classList.remove('hfmV153NavDragging');
    nav.classList.remove('hfmV153NavSorting');
    document.documentElement.classList.remove('hfmV153NavDragActive');
    drag = null;
    if (wasMoved) {
      saveOrderFromDom(nav);
      suppressClickUntil = now() + 650;
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }
  function cancelDrag(ev){
    if (!drag || drag.pointerId !== ev.pointerId) return;
    drag.btn.classList.remove('hfmV153NavDragging');
    drag.nav.classList.remove('hfmV153NavSorting');
    document.documentElement.classList.remove('hfmV153NavDragActive');
    drag = null;
    suppressClickUntil = now() + 250;
    ev.stopImmediatePropagation();
  }

  document.addEventListener('pointerdown', startDrag, true);
  document.addEventListener('pointermove', moveDrag, true);
  document.addEventListener('pointerup', endDrag, true);
  document.addEventListener('pointercancel', cancelDrag, true);
  document.addEventListener('dragstart', function(ev){
    if (ev.target && ev.target.closest && ev.target.closest('.bottomNav')) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('click', function(ev){
    if (now() > suppressClickUntil) return;
    if (ev.target && ev.target.closest && ev.target.closest('.bottomNav')) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }, true);

  function injectStyles(){
    if (document.getElementById('hfmV153Styles')) return;
    const style = document.createElement('style');
    style.id = 'hfmV153Styles';
    style.textContent = `
      .bottomNav.hfmV153SortableNav button{touch-action:none; user-select:none; -webkit-user-select:none; cursor:grab; transition:transform .12s ease, opacity .12s ease, box-shadow .12s ease;}
      .bottomNav.hfmV153SortableNav button:active{cursor:grabbing;}
      .bottomNav.hfmV153SortableNav.hfmV153NavSorting{outline:1px dashed rgba(94,234,212,.45); outline-offset:4px;}
      .bottomNav.hfmV153SortableNav .hfmV153NavDragging{opacity:.38; transform:scale(.94); box-shadow:0 0 0 2px rgba(94,234,212,.45);}
      .hfmV153NavDragActive, .hfmV153NavDragActive body{overscroll-behavior:contain;}
      .hfmV153WatchlistCard{cursor:pointer; transition:border-color .15s ease, transform .15s ease;}
      .hfmV153WatchlistCard:hover{border-color:rgba(94,234,212,.65); transform:translateY(-1px);}
      .hfmV153WatchlistCard .playerTop strong{text-decoration:underline; text-decoration-color:rgba(94,234,212,.45); text-underline-offset:3px;}
    `;
    document.head.appendChild(style);
  }

  function escAttr(value){
    return String(value == null ? '' : value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  const baseWatchlistView = typeof watchlistView === 'function' ? watchlistView : null;
  if (baseWatchlistView && typeof marketPlayerRow === 'function') {
    window.watchlistView = watchlistView = function(){
      const list = (state.watchlist || []).map(function(p){
        const html = marketPlayerRow(p);
        return html.replace('<div class="player"', '<div class="player hfmV153WatchlistCard" data-player-id="' + escAttr(p.id) + '" data-club="' + escAttr(p.club || '') + '" data-league-index="' + escAttr(Number(p.leagueIndex ?? (typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 0))) + '" title="Spielerprofil öffnen"');
      }).join('');
      return `<section class="panel hfmV153Watchlist"><p class="eyebrow">Markt · Beobachtungsliste</p><h2>Beobachtungsliste</h2><div class="infoBox">Spieler, die du aus fremden Kadern, der Suche oder der Transferliste markierst, landen hier. Tippe einen Spieler an, um direkt das Spielerprofil zu öffnen.</div><div class="playerList">${list || '<div class="infoBox">Noch keine Spieler auf der Beobachtungsliste.</div>'}</div></section>`;
    };
  }

  document.addEventListener('click', function(ev){
    const card = ev.target && ev.target.closest ? ev.target.closest('.hfmV153WatchlistCard') : null;
    if (!card) return;
    if (ev.target.closest('button, a, input, select, textarea, label')) return;
    const id = card.dataset.playerId;
    const club = card.dataset.club || '';
    const leagueIndex = Number(card.dataset.leagueIndex || 0);
    if (id && typeof openPlayerProfile === 'function') {
      openPlayerProfile(id, club, leagueIndex);
      ev.preventDefault();
    }
  }, false);

  const baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      const out = baseRender();
      try { injectStyles(); ensureNavReady(); } catch(e) { console.warn('v153 nav/watchlist polish failed', e); }
      return out;
    };
  }
  try { injectStyles(); ensureNavReady(); } catch(e) {}
})();

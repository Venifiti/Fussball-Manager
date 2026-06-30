/* v186: Echter Fix fuer frei sortierbare untere Menue-Reiter ohne Kollision mit alten Drag-Handlern. */
(function(){
  'use strict';

  var STORE_V152 = 'hfmNavOrderV152';
  var STORE_V186 = 'hfmBottomNavOrderV186';
  var drag = null;
  var suppressClickUntil = 0;

  function btnId(btn){
    if (!btn) return '';
    if (btn.dataset && btn.dataset.navId) return String(btn.dataset.navId || '');
    var on = btn.getAttribute('onclick') || '';
    var m = on.match(/setTab\('([^']+)'\)|goTo\('([^']+)'/);
    return m ? String(m[1] || m[2] || '') : '';
  }
  function unique(ids){
    var out = [];
    ids.forEach(function(id){ id = String(id || ''); if (id && out.indexOf(id) < 0) out.push(id); });
    return out;
  }
  function visibleIds(nav){
    return unique(Array.from(nav.querySelectorAll('button')).map(btnId));
  }
  function readSavedOrder(nav){
    var visible = visibleIds(nav);
    var order = [];
    try { if (window.state && Array.isArray(state.navOrderV152)) order = state.navOrderV152.slice(); } catch(e) {}
    if (!order.length) { try { order = JSON.parse(localStorage.getItem(STORE_V186) || '[]') || []; } catch(e) { order = []; } }
    if (!order.length) { try { order = JSON.parse(localStorage.getItem(STORE_V152) || '[]') || []; } catch(e) { order = []; } }
    order = unique(order).filter(function(id){ return visible.indexOf(id) >= 0; });
    visible.forEach(function(id){ if (order.indexOf(id) < 0) order.push(id); });
    return order;
  }
  function writeOrder(nav){
    if (!nav) return;
    var order = visibleIds(nav);
    try { if (window.state) { state.navOrderV152 = order.slice(); state.navOrder = order.slice(); } } catch(e) {}
    try { localStorage.setItem(STORE_V186, JSON.stringify(order)); } catch(e) {}
    try { localStorage.setItem(STORE_V152, JSON.stringify(order)); } catch(e) {}
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e) {}
  }
  function applySavedOrder(nav){
    if (!nav) return;
    var buttons = Array.from(nav.querySelectorAll('button'));
    var byId = new Map();
    buttons.forEach(function(btn){ var id = btnId(btn); if (id) { btn.dataset.navId = id; byId.set(id, btn); } });
    readSavedOrder(nav).forEach(function(id){ var btn = byId.get(id); if (btn) nav.appendChild(btn); });
    Array.from(nav.querySelectorAll('button')).forEach(function(btn){
      var id = btnId(btn);
      if (id) btn.dataset.navId = id;
      btn.removeAttribute('draggable');
      btn.style.touchAction = 'none';
      btn.style.userSelect = 'none';
      btn.style.webkitUserSelect = 'none';
    });
  }
  function replaceNavToRemoveOldHandlers(nav){
    if (!nav || nav.dataset.hfmV186Clean === '1') return nav;
    var clone = nav.cloneNode(true);
    clone.dataset.hfmV186Clean = '1';
    clone.classList.add('hfmV186SortableNav');
    nav.parentNode.replaceChild(clone, nav);
    return clone;
  }
  function insertionTarget(nav, x, y){
    var buttons = Array.from(nav.querySelectorAll('button')).filter(function(btn){ return !drag || btn !== drag.btn; });
    var best = null;
    for (var i = 0; i < buttons.length; i++) {
      var r = buttons[i].getBoundingClientRect();
      var centerY = r.top + r.height / 2;
      var centerX = r.left + r.width / 2;
      if (y < centerY || (Math.abs(y - centerY) < r.height / 2 && x < centerX)) { best = buttons[i]; break; }
    }
    return best;
  }
  function syncActive(nav){
    try {
      if (!window.state) return;
      Array.from(nav.querySelectorAll('button')).forEach(function(btn){ btn.classList.toggle('active', btnId(btn) === state.tab); });
    } catch(e) {}
  }
  function prepareNav(){
    var nav = document.querySelector('.bottomNav');
    if (!nav) return;
    nav = replaceNavToRemoveOldHandlers(nav);
    applySavedOrder(nav);
    syncActive(nav);
    if (nav.dataset.hfmV186Ready === '1') return;
    nav.dataset.hfmV186Ready = '1';

    nav.addEventListener('pointerdown', function(ev){
      var btn = ev.target && ev.target.closest ? ev.target.closest('button') : null;
      if (!btn || !nav.contains(btn)) return;
      var id = btnId(btn);
      if (!id) return;
      if (ev.button !== undefined && ev.button !== 0) return;
      drag = { nav: nav, btn: btn, id: id, pointerId: ev.pointerId, startX: ev.clientX, startY: ev.clientY, moved: false };
      try { nav.setPointerCapture(ev.pointerId); } catch(e) {}
    }, true);

    nav.addEventListener('pointermove', function(ev){
      if (!drag || drag.nav !== nav || drag.pointerId !== ev.pointerId) return;
      var dx = ev.clientX - drag.startX;
      var dy = ev.clientY - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) < 7) return;
      if (!drag.moved) {
        drag.moved = true;
        nav.classList.add('hfmV186NavSorting');
        drag.btn.classList.add('hfmV186Dragging');
        document.documentElement.classList.add('hfmV186DragActive');
      }
      var target = insertionTarget(nav, ev.clientX, ev.clientY);
      if (target && target !== drag.btn) nav.insertBefore(drag.btn, target);
      else if (!target) nav.appendChild(drag.btn);
      ev.preventDefault();
      ev.stopPropagation();
    }, true);

    function finish(ev){
      if (!drag || drag.nav !== nav || drag.pointerId !== ev.pointerId) return;
      var moved = drag.moved;
      drag.btn.classList.remove('hfmV186Dragging');
      nav.classList.remove('hfmV186NavSorting');
      document.documentElement.classList.remove('hfmV186DragActive');
      try { nav.releasePointerCapture(ev.pointerId); } catch(e) {}
      if (moved) {
        writeOrder(nav);
        suppressClickUntil = Date.now() + 900;
        ev.preventDefault();
        ev.stopPropagation();
      }
      drag = null;
    }
    nav.addEventListener('pointerup', finish, true);
    nav.addEventListener('pointercancel', finish, true);
    nav.addEventListener('click', function(ev){
      if (Date.now() <= suppressClickUntil) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, true);
  }
  function injectStyles(){
    if (document.getElementById('hfmV186NavStyles')) return;
    var style = document.createElement('style');
    style.id = 'hfmV186NavStyles';
    style.textContent = [
      '.bottomNav.hfmV186SortableNav{touch-action:none!important;overflow:visible!important}',
      '.bottomNav.hfmV186SortableNav button{touch-action:none!important;-webkit-user-select:none!important;user-select:none!important;cursor:grab!important}',
      '.bottomNav.hfmV186NavSorting{outline:2px dashed rgba(94,234,212,.7);outline-offset:4px}',
      '.bottomNav .hfmV186Dragging{opacity:.42!important;transform:scale(.93)!important;box-shadow:0 0 0 2px rgba(94,234,212,.8)!important}',
      'html.hfmV186DragActive,html.hfmV186DragActive body{touch-action:none!important;overscroll-behavior:contain!important}',
      'html.hfmV186DragActive .bottomNav button{transition:none!important}'
    ].join('\n');
    document.head.appendChild(style);
  }

  var previousRender = typeof render === 'function' ? render : null;
  if (previousRender) {
    window.render = render = function(){
      var result = previousRender.apply(this, arguments);
      try { injectStyles(); prepareNav(); } catch(e) { console.warn('v186 bottom nav drag realfix', e); }
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', function(){ try { injectStyles(); prepareNav(); } catch(e) {} });
  try { injectStyles(); prepareNav(); } catch(e) {}
})();

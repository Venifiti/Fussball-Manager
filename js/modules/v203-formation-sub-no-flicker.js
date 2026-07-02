(function(){
  'use strict';

  function visibleTeamFormation(){
    try { return !!(state && state.tab === 'team' && (!state.teamSection || state.teamSection === 'lineup')); } catch(e){ return false; }
  }

  function withNoFlicker(fn){
    var root = document.documentElement;
    try { root.classList.add('hfmV203NoFlicker'); } catch(e) {}
    try { return fn(); }
    finally { setTimeout(function(){ try { root.classList.remove('hfmV203NoFlicker'); } catch(e) {} }, 80); }
  }

  function makeFreshLineupDom(){
    if (typeof lineup !== 'function') return null;
    var wrap = document.createElement('div');
    try { wrap.innerHTML = lineup(); } catch(e) { console.warn('v203 fresh lineup failed', e); return null; }
    return wrap;
  }

  function replacePart(currentRoot, freshRoot, selector){
    var oldEl = currentRoot.querySelector(selector);
    var newEl = freshRoot.querySelector(selector);
    if (oldEl && newEl) oldEl.replaceWith(newEl);
  }

  function refreshFromLineupHtml(){
    var currentPanel = document.querySelector('main section.panel, main .panel');
    if (!currentPanel) return false;
    var fresh = makeFreshLineupDom();
    if (!fresh) return false;
    replacePart(currentPanel, fresh, '.lineupSummary');
    replacePart(currentPanel, fresh, '.visualPitch.freeFormationPitch, .visualPitch');
    replacePart(currentPanel, fresh, '.benchGrid');
    replacePart(currentPanel, fresh, '.detailPitch');
    replacePart(currentPanel, fresh, '.hfmV202RosterPanel, .rosterTablePanel');
    try { if (typeof hfmV77ApplyAfterRender === 'function') hfmV77ApplyAfterRender(); } catch(e) {}
    return true;
  }

  window.hfmV203RefreshLineupArea = function(){
    return withNoFlicker(function(){
      try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e) {}
      if (visibleTeamFormation() && refreshFromLineupHtml()) return true;
      if (typeof render === 'function') render();
      return false;
    });
  };

  var style = document.createElement('style');
  style.textContent = `
    .hfmV203NoFlicker *,
    .hfmV203NoFlicker .panel,
    .hfmV203NoFlicker main,
    .hfmV203NoFlicker .pageTransition,
    .hfmV203NoFlicker .visualPitch,
    .hfmV203NoFlicker .benchGrid,
    .hfmV203NoFlicker .rosterTablePanel{
      animation:none!important;
      transition:none!important;
      scroll-behavior:auto!important;
    }
    .visualPitch .fieldPlayer,
    .benchGrid .benchCard,
    .hfmV202RosterPanel [data-hfm-squad-type][data-hfm-squad-slot]{
      will-change:transform,left,top;
      transform:translateZ(0);
      backface-visibility:hidden;
    }
  `;
  try { document.head.appendChild(style); } catch(e) {}
})();

(function(){
  'use strict';

  function isFormationTouchTarget(el){
    return !!(el && el.closest && el.closest('.visualPitch .fieldPlayer, .freeFormationPitch .fieldPlayer, .halftimePitch .fieldPlayer, .benchCard, .hfmV200BenchDropTarget'));
  }

  function prepareFormationTouchTargets(){
    var selector = '.visualPitch .fieldPlayer, .freeFormationPitch .fieldPlayer, .halftimePitch .fieldPlayer, .benchCard, .hfmV200BenchDropTarget';
    document.querySelectorAll(selector).forEach(function(el){
      el.classList.add('hfmV201NoLongPressMenu');
      el.setAttribute('unselectable', 'on');
      el.setAttribute('data-hfm-touch-drag-ready', '1');
      // Pointer-Drag-Logik übernimmt das Verschieben. Native Text-/HTML-Drag-Auswahl stoert am Handy.
      if (el.classList.contains('fieldPlayer')) el.setAttribute('draggable', 'false');
    });
  }

  // iOS/Android: langes Antippen darf kein Kopieren-/Textauswahl-Menue oeffnen.
  ['contextmenu', 'selectstart', 'copy', 'cut'].forEach(function(type){
    document.addEventListener(type, function(ev){
      if (!isFormationTouchTarget(ev.target)) return;
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }, true);
  });

  // Auf Touchgeraeten sofort Textauswahl verhindern, ohne die Pointer-Drag-Logik zu blockieren.
  document.addEventListener('touchstart', function(ev){
    if (!isFormationTouchTarget(ev.target)) return;
    if (ev.cancelable) ev.preventDefault();
  }, { capture:true, passive:false });

  document.addEventListener('touchmove', function(ev){
    if (!isFormationTouchTarget(ev.target)) return;
    if (ev.cancelable) ev.preventDefault();
  }, { capture:true, passive:false });

  document.addEventListener('pointerdown', function(ev){
    var target = ev.target && ev.target.closest ? ev.target.closest('.visualPitch .fieldPlayer, .freeFormationPitch .fieldPlayer, .halftimePitch .fieldPlayer, .benchCard, .hfmV200BenchDropTarget') : null;
    if (!target) return;
    target.classList.add('hfmV201TouchActive');
  }, true);

  document.addEventListener('pointerup', function(){
    document.querySelectorAll('.hfmV201TouchActive').forEach(function(el){ el.classList.remove('hfmV201TouchActive'); });
  }, true);
  document.addEventListener('pointercancel', function(){
    document.querySelectorAll('.hfmV201TouchActive').forEach(function(el){ el.classList.remove('hfmV201TouchActive'); });
  }, true);

  var baseAfter = typeof hfmV77ApplyAfterRender === 'function' ? hfmV77ApplyAfterRender : null;
  window.hfmV77ApplyAfterRender = hfmV77ApplyAfterRender = function(){
    if (baseAfter) baseAfter.apply(this, arguments);
    try { prepareFormationTouchTargets(); } catch(e){ console.warn('v201 formation touch prepare', e); }
  };

  var baseRender = typeof render === 'function' ? render : null;
  if (baseRender) {
    window.render = render = function(){
      var out = baseRender.apply(this, arguments);
      try { prepareFormationTouchTargets(); } catch(e){}
      return out;
    };
  }

  var style = document.createElement('style');
  style.textContent = `
    .visualPitch .fieldPlayer,
    .visualPitch .fieldPlayer *,
    .freeFormationPitch .fieldPlayer,
    .freeFormationPitch .fieldPlayer *,
    .halftimePitch .fieldPlayer,
    .halftimePitch .fieldPlayer *,
    .benchCard,
    .benchCard *,
    .hfmV200BenchDropTarget,
    .hfmV200BenchDropTarget *{
      -webkit-user-select:none!important;
      user-select:none!important;
      -webkit-touch-callout:none!important;
      -webkit-tap-highlight-color:transparent!important;
    }
    .visualPitch .fieldPlayer,
    .freeFormationPitch .fieldPlayer,
    .halftimePitch .fieldPlayer,
    .benchCard,
    .hfmV200BenchDropTarget{
      touch-action:none!important;
      cursor:grab;
    }
    .hfmV201TouchActive{filter:brightness(1.08);}
    body.hfmV201NoTextSelect,
    body.hfmV201NoTextSelect *{
      -webkit-user-select:none!important;
      user-select:none!important;
      -webkit-touch-callout:none!important;
    }
  `;
  try { document.head.appendChild(style); } catch(e){}

  try { prepareFormationTouchTargets(); } catch(e){}
})();

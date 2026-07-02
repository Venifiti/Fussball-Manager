(function(){
  'use strict';

  /*
   * v188
   * Entfernt den grossen unteren Balken bei angehaltener Kalender-/Wochensimulation.
   * Der Status bleibt erhalten und kann weiterhin ueber den Header-Button
   * "News beantworten" bzw. "Simulation fortsetzen" bedient werden.
   */

  window.hfmV188HidePausedSimulationBanner = true;

  if (typeof window.hfmV70PausedBanner === 'function') {
    window.hfmV70PausedBanner = function(){
      return '';
    };
  }

  const style = document.createElement('style');
  style.textContent = '.simulationResumeBanner{display:none!important;}';
  document.head.appendChild(style);
})();

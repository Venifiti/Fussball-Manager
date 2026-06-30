/* v178: Start-Manager-Farbwechsel beim Tippen stabilisieren.
   Der v166 Wizard dimmt Panels per opacity. Beim Aufklappen des naechsten Schritts wirkte
   die Manager-Erstellung dadurch kurz ausgegraut. Diese spaete CSS-Regel sorgt dafuer,
   dass sichtbare Start-Schritte ihre normale helle Panel-Optik behalten. */
(function(){
  'use strict';
  function inject(){
    if (document.getElementById('hfm-v178-start-color-stability')) return;
    var style = document.createElement('style');
    style.id = 'hfm-v178-start-color-stability';
    style.textContent = [
      '.hfmV172StartWizard.startWizardV166 .startPanel,',
      '.hfmV172StartWizard.startWizardV166 .startPanel.active,',
      '.hfmV172StartWizard.startWizardV166 .startPanel.done{',
      '  opacity:1!important;',
      '  transform:none!important;',
      '  background:rgba(20,34,56,.86)!important;',
      '  border-color:rgba(255,255,255,.10)!important;',
      '}',
      '.hfmV172StartWizard.startWizardV166 .startPanel[data-start-step="1"]{',
      '  border-color:rgba(100,239,196,.45)!important;',
      '}',
      '.hfmV172StartWizard .textInput,',
      '.hfmV172StartWizard input,',
      '.hfmV172StartWizard select{',
      '  background:#0b1b31!important;',
      '  color:#f2f7ff!important;',
      '  border-color:rgba(140,180,230,.35)!important;',
      '}',
      '.hfmV172StartWizard .textInput:focus,',
      '.hfmV172StartWizard input:focus,',
      '.hfmV172StartWizard select:focus{',
      '  background:#0b1b31!important;',
      '  color:#fff!important;',
      '  border-color:rgba(100,239,196,.75)!important;',
      '  box-shadow:0 0 0 3px rgba(100,239,196,.12)!important;',
      '}',
      '.hfmV172StartWizard button:disabled{',
      '  opacity:.55;',
      '}',
      '.hfmV172HiddenStep{display:none!important;}'
    ].join('\n');
    document.head.appendChild(style);
  }
  inject();
  document.addEventListener('DOMContentLoaded', inject);
})();

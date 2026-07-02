/* v140: Mitarbeiter-Staerkeaenderungen unterbrechen die Simulation nicht mehr.
   Statt Popups/Modals werden normale Newscenter-Nachrichten erzeugt. */
(function(){
  'use strict';

  function safeEuro(v){
    try { return typeof euro === 'function' ? euro(v) : `${Number(v||0).toLocaleString('de-DE')} €`; }
    catch(e){ return `${Number(v||0).toLocaleString('de-DE')} €`; }
  }
  function addStaffProgressNews(item){
    if (!item || typeof hfmV68AddNews !== 'function') return;
    const name = item.name || 'Ein Mitarbeiter';
    const role = item.role || 'Mitarbeiter';
    const strength = Number(item.strength || 0);
    const id = item.id || `staff-progress-${String(name).replace(/\s+/g,'-')}-${strength}-${state?.week || 0}`;
    hfmV68AddNews({
      category: 'VEREIN',
      priority: 1,
      scope: 'inbox',
      uniqueKey: `news-only-${id}`,
      title_template: 'Mitarbeiter verbessert sich',
      body_template: `${name} (${role}) hat sich im Training verbessert und erreicht nun Stärke ${strength}.`,
      data: { STAFF_NAME: name, STAFF_ROLE: role, STAFF_STRENGTH: strength }
    });
  }

  function clearQueuedStaffPopups(){
    try {
      if (Array.isArray(state.staffLevelUps) && state.staffLevelUps.length) {
        state.staffLevelUps.forEach(addStaffProgressNews);
        state.staffLevelUps = [];
      }
    } catch(e) {}
  }

  // Nie wieder ein Unterbrechungsfenster fuer Mitarbeiter-Levelups rendern.
  window.hfmV120StaffLevelUpModal = function(){
    clearQueuedStaffPopups();
    return '';
  };
  try { hfmV120StaffLevelUpModal = window.hfmV120StaffLevelUpModal; } catch(e) {}

  // Dismiss bleibt kompatibel, falls alte Buttons/States noch existieren.
  window.hfmV120DismissStaffLevelUp = function(){
    clearQueuedStaffPopups();
    try { if (typeof render === 'function') render(); } catch(e) {}
    return false;
  };
  try { hfmV120DismissStaffLevelUp = window.hfmV120DismissStaffLevelUp; } catch(e) {}

  // Originale Mitarbeiterentwicklung ersetzen: gleiche Entwicklungslogik, aber Levelups gehen ins Newscenter statt in ein Modal.
  if (typeof hfmV120ProcessStaffDevelopment === 'function') {
    const newsOnlyStaffDevelopment = function(){
      try {
        if (typeof hfmV120EnsureStaffDevelopmentState === 'function') hfmV120EnsureStaffDevelopmentState();
        if (!Array.isArray(state.staff)) return;
        state.staff.forEach(staff => {
          const maxStrength = typeof hfmV120MaxStaffStrength === 'function' ? hfmV120MaxStaffStrength(staff) : 100;
          const strengthNow = typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(staff) : Number(staff.strength || 50);
          if (strengthNow >= maxStrength) { staff.progress = 0; staff.strength = strengthNow; return; }
          const currentProgress = typeof hfmV120StaffProgressValue === 'function' ? hfmV120StaffProgressValue(staff) : Number(staff.progress || 0);
          const weeklyGain = typeof hfmV120StaffWeeklyGain === 'function' ? hfmV120StaffWeeklyGain(staff) : 5;
          staff.progress = currentProgress + weeklyGain;
          let leveled = false;
          while (staff.progress >= 100 && (typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(staff) : Number(staff.strength || 50)) < maxStrength) {
            staff.progress -= 100;
            if (typeof hfmV120ImproveStaffByOne === 'function' && hfmV120ImproveStaffByOne(staff)) leveled = true;
            else break;
          }
          staff.progress = typeof hfmV120StaffProgressValue === 'function' ? hfmV120StaffProgressValue(staff) : Math.max(0, Math.min(99, Number(staff.progress || 0)));
          if (leveled) {
            addStaffProgressNews({
              id: `staff-level-${state.week || 0}-${staff.id}-${typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(staff) : staff.strength}`,
              name: staff.name,
              role: typeof hfmV110StaffRoleLabel === 'function' ? hfmV110StaffRoleLabel(staff.role) : staff.role,
              strength: typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(staff) : staff.strength
            });
          }
        });
        if (Array.isArray(state.staffCourses) && state.staffCourses.length) {
          const completed = [];
          state.staffCourses.forEach(c => { c.remainingWeeks = Number(c.remainingWeeks || 0) - 1; if (c.remainingWeeks <= 0) completed.push(c); });
          state.staffCourses = state.staffCourses.filter(c => Number(c.remainingWeeks || 0) > 0);
          completed.forEach(c => {
            (state.staff || []).forEach(s => {
              const p = typeof hfmV120StaffProgressValue === 'function' ? hfmV120StaffProgressValue(s) : Number(s.progress || 0);
              s.progress = Math.min(99, p + 18);
            });
            if (typeof hfmV68AddNews === 'function') hfmV68AddNews({
              category: 'VEREIN',
              priority: 2,
              scope: 'inbox',
              uniqueKey: `staff-course-done-${c.id}`,
              title_template: 'Mitarbeiter-Lehrgang abgeschlossen',
              body_template: 'Dein Mitarbeiterstab hat den Lehrgang beendet. Die Entwicklungsfortschritte wurden sichtbar verbessert.',
              data: { COST: safeEuro(c.cost || 0) }
            });
          });
        }
        clearQueuedStaffPopups();
        if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
      } catch(err) {
        console.warn('v140 staff progress news-only failed, fallback to old logic blocked modal', err);
        clearQueuedStaffPopups();
      }
    };
    window.hfmV120ProcessStaffDevelopment = newsOnlyStaffDevelopment;
    try { hfmV120ProcessStaffDevelopment = newsOnlyStaffDevelopment; } catch(e) {}
  }

  // Nach jedem Render alte Queues entfernen, falls irgendeine alte Funktion noch hineinschreibt.
  if (typeof render === 'function' && !window.__hfmV140RenderWrapped) {
    window.__hfmV140RenderWrapped = true;
    const baseRender = render;
    render = function(){
      clearQueuedStaffPopups();
      return baseRender.apply(this, arguments);
    };
    window.render = render;
  }

  try { clearQueuedStaffPopups(); } catch(e) {}
})();

/* v155: Saison > Kalender: Anstehende Termine auf 5 begrenzen und Event-Eintragsmaske aus Kalenderansicht entfernen. */
(function(){
  function esc(v){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(v); } catch(e) {}
    return String(v ?? '').replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); });
  }
  function safeDate(d){
    if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (typeof d === 'string') {
      var p = d.split('-').map(Number);
      return new Date(p[0] || 2026, (p[1] || 1) - 1, p[2] || 1);
    }
    var x = new Date(d);
    if (isNaN(x.getTime())) return new Date();
    return new Date(x.getFullYear(), x.getMonth(), x.getDate());
  }
  function fmt(d){
    try { if (typeof formatGermanDate === 'function') return formatGermanDate(safeDate(d)); } catch(e) {}
    return safeDate(d).toLocaleDateString('de-DE', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
  }
  function same(a,b){
    try { if (typeof sameDay === 'function') return sameDay(safeDate(a), safeDate(b)); } catch(e) {}
    a = safeDate(a); b = safeDate(b);
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function today(){
    try { if (typeof currentGameDate === 'function') return safeDate(currentGameDate()); } catch(e) {}
    return safeDate(new Date());
  }
  function cursorDate(){
    try { if (typeof monthCursorDate === 'function') return safeDate(monthCursorDate()); } catch(e) {}
    return today();
  }
  function title(d){
    try { if (typeof monthTitle === 'function') return monthTitle(safeDate(d)); } catch(e) {}
    return safeDate(d).toLocaleDateString('de-DE', { month:'long', year:'numeric' });
  }
  function plannedClubYouthDays(){
    try {
      var days = (state && state.clubEvents && Array.isArray(state.clubEvents.youthDays)) ? state.clubEvents.youthDays : [];
      return days.filter(function(ev){ return ev && ev.date && ev.status !== 'completed' && ev.selectionClosed !== true; })
        .map(function(ev){ return { date: safeDate(ev.date), title: 'Jugendtag', kind: ev.status === 'active' ? 'Event · offen' : 'Event · geplant' }; });
    } catch(e) { return []; }
  }
  function allTerms(){
    var list = [];
    try {
      if (typeof calendarFixtures === 'function') {
        list = calendarFixtures().filter(Boolean).map(function(item){
          return {
            date: safeDate(item.date),
            title: item.title || item.name || 'Termin',
            kind: item.kind || item.type || 'Termin'
          };
        });
      }
    } catch(e) { list = []; }
    list = list.concat(plannedClubYouthDays());
    var min = today();
    var seen = Object.create(null);
    return list.filter(function(item){ return item && item.date && item.date >= min; })
      .sort(function(a,b){ return a.date - b.date; })
      .filter(function(item){
        var key = item.date.toISOString().slice(0,10) + '|' + String(item.title) + '|' + String(item.kind);
        if (seen[key]) return false;
        seen[key] = true;
        return true;
      });
  }
  function termsInMonth(year, month){
    var list = [];
    try {
      if (typeof calendarFixtures === 'function') list = calendarFixtures().filter(Boolean).map(function(item){
        return { date: safeDate(item.date), title: item.title || item.name || 'Termin', kind: item.kind || item.type || 'Termin' };
      });
    } catch(e) { list = []; }
    list = list.concat(plannedClubYouthDays());
    return list.filter(function(item){ return item.date.getFullYear() === year && item.date.getMonth() === month; });
  }
  window.hfmV155MoreCalendarTerms = function(){
    if (!state) return false;
    state.seasonCalendarTermsVisibleCount = Math.max(5, Number(state.seasonCalendarTermsVisibleCount || 5)) + 5;
    try { if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); } catch(e) {}
    try { if (typeof render === 'function') render(); } catch(e) {}
    return false;
  };
  var setSeasonSectionBase = typeof setSeasonSection === 'function' ? setSeasonSection : null;
  if (setSeasonSectionBase) {
    window.setSeasonSection = setSeasonSection = function(section){
      if (section === 'calendar' && state) state.seasonCalendarTermsVisibleCount = 5;
      return setSeasonSectionBase(section);
    };
  }
  if (typeof calendarView === 'function') {
    window.calendarView = calendarView = function(){
      var t = today();
      var cursor = cursorDate();
      var year = cursor.getFullYear();
      var month = cursor.getMonth();
      var first = new Date(year, month, 1);
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var mondayOffset = (first.getDay() + 6) % 7;
      var monthTerms = termsInMonth(year, month);
      var blanks = Array.from({ length:mondayOffset }, function(){ return '<div class="calendarCell empty" aria-hidden="true"></div>'; }).join('');
      var days = Array.from({ length:daysInMonth }, function(_, index){
        var day = index + 1;
        var date = new Date(year, month, day);
        var term = monthTerms.find(function(item){ return same(item.date, date); });
        var isToday = same(date, t);
        return '<div class="calendarCell ' + (isToday ? 'today ' : '') + (term ? 'matchDay' : '') + '"><strong>' + day + '</strong>' +
          (isToday ? '<span class="todayBadge">Heute</span>' : '') +
          (term ? '<span class="matchBadge">' + esc(term.kind) + '</span><small>' + esc(term.title) + '</small>' : '') +
          '</div>';
      }).join('');
      var all = allTerms();
      var visibleCount = Math.max(5, Number((state && state.seasonCalendarTermsVisibleCount) || 5));
      if (state) state.seasonCalendarTermsVisibleCount = visibleCount;
      var shown = all.slice(0, visibleCount);
      var rows = shown.map(function(item){ return '<div class="league"><strong>' + esc(fmt(item.date)) + '</strong><span>' + esc(item.title) + ' · ' + esc(item.kind) + '</span></div>'; }).join('');
      if (!rows) rows = '<div class="infoBox">Aktuell sind keine anstehenden Termine vorhanden.</div>';
      var more = all.length > shown.length ? '<button type="button" class="ghost full" onclick="return hfmV155MoreCalendarTerms()">Mehr anzeigen</button>' : '';
      var count = all.length > 0 ? '<div class="infoBox subtleInfo">Angezeigt: ' + shown.length + ' von ' + all.length + ' anstehenden Terminen.</div>' : '';
      return '<section class="panel"><p class="eyebrow">Saison · Kalender</p><div class="calendarHeader"><button class="ghost" onclick="changeCalendarMonth(-1)">← Voriger Monat</button><h2>' + esc(title(cursor)) + '</h2><button class="ghost" onclick="changeCalendarMonth(1)">Nächster Monat →</button></div><div class="infoBox">Hier siehst du die Monatsansicht. Spieltage und Termine sind farblich markiert, das aktuelle Datum ebenfalls. Du kannst zwischen den Monaten wechseln.</div><div class="calendarWeekdays"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div><div class="calendarGrid">' + blanks + days + '</div><h3>Anstehende Termine</h3><div class="leagueList">' + rows + '</div>' + more + count + '</section>';
    };
  }
})();

/* v205: Wechselbutton-Sichtbarkeit-Realfix.
   Falls der Team-Reiter aus einer aelteren Kaderlisten-Renderfunktion kommt,
   wird der Wechselbutton nach dem Rendern direkt in die sichtbare Tabelle eingesetzt. */
(function(){
  'use strict';

  function idStr(v){ return String(v == null ? '' : v); }
  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }
  function players(){ return Array.isArray(window.state && state.players) ? state.players : []; }
  function sameId(a,b){ return idStr(a) === idStr(b) || Number(a) === Number(b); }
  function findPlayer(id){ return players().find(function(p){ return sameId(p.id, id); }) || null; }

  function playerIdFromRow(row){
    if (!row) return '';
    var existing = row.getAttribute('data-hfm-v203-player-id');
    if (existing) return existing;
    var attrs = ['ondragstart','onclick','ondrop'];
    for (var i=0;i<attrs.length;i++){
      var txt = row.getAttribute(attrs[i]) || '';
      var m = txt.match(/(?:openOwnPlayerProfile|hfmV90OpenOwnPlayerProfile)\s*\([^,)]*,?\s*['"]?(\d+)['"]?/i) ||
              txt.match(/squadDragStart\s*\([^,]+,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/i);
      if (m) {
        if (m[2] && m[1] === 'reserve') return m[2];
        return m[1];
      }
    }
    return '';
  }

  function subButtonHtml(playerId){
    var p = findPlayer(playerId);
    var name = p ? p.name : 'Spieler';
    return '<button type="button" class="hfmV203SubBtn hfmV205SubBtn" aria-label="Wechselbutton fuer '+esc(name)+'" oncontextmenu="return false" onclick="return hfmV203CancelClick(event)" onpointerdown="return hfmV203StartSubDrag(event, \''+esc(playerId)+'\')">↔<span>Wechsel</span></button>';
  }

  function ensureButtonsInVisibleRoster(){
    try {
      if (!window.state || state.tab !== 'team' || (state.teamSection || 'lineup') !== 'lineup') return;
      var tables = document.querySelectorAll('.rosterTablePanel .rosterTable');
      tables.forEach(function(table){
        if (table.classList.contains('hfmV205Enhanced')) return;
        table.classList.add('hfmV205Enhanced');

        var headRow = table.querySelector('thead tr');
        if (headRow && !headRow.querySelector('.hfmV203SubHeader')) {
          var th = document.createElement('th');
          th.className = 'hfmV203SubHeader hfmV205SubHeader';
          th.innerHTML = '<span>Wechsel</span>';
          headRow.insertBefore(th, headRow.firstChild);
        }

        table.querySelectorAll('tbody tr').forEach(function(row){
          if (row.querySelector('.hfmV203SubCell')) return;
          var playerId = playerIdFromRow(row);
          var td = document.createElement('td');
          td.className = 'hfmV203SubCell hfmV205SubCell';
          if (playerId) {
            row.setAttribute('data-hfm-v203-player-id', playerId);
            row.classList.add('hfmV203PlayerTarget');
            td.innerHTML = subButtonHtml(playerId);
          } else {
            td.innerHTML = '<span class="hfmV203EmptyDot">+</span>';
          }
          row.insertBefore(td, row.firstChild);
        });
      });
    } catch(e) {}
  }

  function installRenderHook(){
    if (window.hfmV205RenderHookInstalled) return;
    window.hfmV205RenderHookInstalled = true;
    var baseRender = typeof window.render === 'function' ? window.render : (typeof render === 'function' ? render : null);
    if (!baseRender) return;
    window.render = render = function(){
      var out = baseRender.apply(this, arguments);
      try { setTimeout(ensureButtonsInVisibleRoster, 0); } catch(e) {}
      return out;
    };
  }

  // Auch die v203-Tabelle selbst nochmals erzwingen, falls eine aeltere Referenz benutzt wird.
  try {
    if (typeof window.hfmV203LineupRosterTable === 'function') {
      window.hfmV90LineupRosterTable = hfmV90LineupRosterTable = window.hfmV203LineupRosterTable;
      window.hfmV89LineupRosterTable = hfmV89LineupRosterTable = window.hfmV203LineupRosterTable;
      window.hfmV88LineupRosterTable = hfmV88LineupRosterTable = window.hfmV203LineupRosterTable;
    }
  } catch(e) {}

  var style = document.createElement('style');
  style.textContent = '\n.hfmV205Enhanced .hfmV203SubHeader,.hfmV205Enhanced .hfmV203SubCell{position:sticky;left:0;z-index:5;background:rgba(15,29,49,.98)}\n.hfmV205Enhanced .hfmV203SubCell{min-width:92px;max-width:100px;white-space:nowrap}\n.hfmV205SubBtn{display:inline-flex!important;visibility:visible!important;opacity:1!important}\n';
  document.head.appendChild(style);

  installRenderHook();
  try { setTimeout(ensureButtonsInVisibleRoster, 0); setTimeout(ensureButtonsInVisibleRoster, 250); } catch(e) {}
})();

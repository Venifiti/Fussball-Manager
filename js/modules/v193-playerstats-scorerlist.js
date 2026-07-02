(function(){
  if (typeof window === 'undefined' || typeof state === 'undefined') return;

  function num(v){ var n = Number(v); return Number.isFinite(n) ? n : 0; }
  function ownClub(){ try { return typeof ownClubName === 'function' ? ownClubName() : (state.clubName || 'Eigener Verein'); } catch(e){ return 'Eigener Verein'; } }
  function escapeJsText(value){ return String(value || '').replace(/\\/g,'\\\\').replace(/'/g, "\\'"); }

  function externalStats(){
    if (!Array.isArray(state.externalPlayerStats)) state.externalPlayerStats = [];
    return state.externalPlayerStats;
  }

  function allStatPlayers(){
    var own = (state.players || []).map(function(p){
      var games = num(p.seasonRatingGames);
      return {
        own: true,
        id: p.id,
        name: p.name || 'Spieler',
        club: ownClub(),
        goals: num(p.seasonGoals),
        assists: num(p.seasonAssists),
        points: num(p.seasonPoints) || (num(p.seasonGoals) + num(p.seasonAssists)),
        ratingGames: games,
        avg: games ? Math.round((num(p.seasonRatingSum) / games) * 10) / 10 : 0,
        leagueIndex: (typeof OWN_LEAGUE_INDEX !== 'undefined' ? OWN_LEAGUE_INDEX : 0)
      };
    });

    var ext = externalStats().map(function(s){
      var games = num(s.ratingGames);
      return {
        own: false,
        id: s.playerId || s.id,
        name: s.name || 'Spieler',
        club: s.club || 'Verein',
        goals: num(s.goals),
        assists: num(s.assists),
        points: num(s.points) || (num(s.goals) + num(s.assists)),
        ratingGames: games,
        avg: games ? Math.round((num(s.ratingSum) / games) * 10) / 10 : num(s.avg),
        leagueIndex: num(s.leagueIndex)
      };
    });

    var dedup = new Map();
    own.concat(ext).forEach(function(p){
      var key = String(p.club) + '|' + String(p.name);
      var current = dedup.get(key);
      var score = p.goals + p.assists + p.ratingGames + (p.own ? 10000 : 0);
      var currentScore = current ? current.goals + current.assists + current.ratingGames + (current.own ? 10000 : 0) : -1;
      if (!current || score >= currentScore) dedup.set(key, p);
    });
    return Array.from(dedup.values());
  }

  function statClick(player){
    if (player.own) return 'openOwnPlayerProfile(' + Number(player.id) + ')';
    return "openClubRoster('" + escapeJsText(player.club || '') + "', " + Number(player.leagueIndex || 0) + ')';
  }

  function formatAvg(avg){
    var value = Number(avg || 0);
    return value.toFixed(1).replace('.', ',');
  }

  function statRows(mode){
    var list = allStatPlayers();

    if (mode === 'assists') {
      list = list.filter(function(p){ return p.assists > 0; })
        .sort(function(a,b){ return b.assists - a.assists || b.goals - a.goals || b.points - a.points || String(a.name).localeCompare(String(b.name)); });
    } else if (mode === 'points') {
      list = list.filter(function(p){ return p.points > 0; })
        .sort(function(a,b){ return b.points - a.points || b.goals - a.goals || b.assists - a.assists || String(a.name).localeCompare(String(b.name)); });
    } else if (mode === 'ratings') {
      list = list.filter(function(p){ return p.avg > 0 && p.ratingGames > 0; })
        .sort(function(a,b){ return a.avg - b.avg || b.ratingGames - a.ratingGames || String(a.name).localeCompare(String(b.name)); });
    } else {
      list = list.filter(function(p){ return p.goals > 0; })
        .sort(function(a,b){ return b.goals - a.goals || b.assists - a.assists || b.points - a.points || String(a.name).localeCompare(String(b.name)); });
    }

    if (!list.length) return '<div class="infoBox">Noch keine Einträge für diese Saison.</div>';

    return '<div class="hfmV176StatList">' + list.slice(0, 100).map(function(p, i){
      var main = '';
      var sub = '';
      if (mode === 'ratings') {
        main = '<b>Ø Note ' + formatAvg(p.avg) + '</b>';
        sub = p.ratingGames + ' Spiele bewertet';
      } else if (mode === 'assists') {
        main = '<b>' + p.assists + ' Vorlagen</b>';
        sub = p.goals + ' Tore · ' + p.points + ' Scorerpunkte';
      } else if (mode === 'points') {
        main = '<b>' + p.points + ' Scorerpunkte</b>';
        sub = p.goals + ' Tore · ' + p.assists + ' Vorlagen';
      } else {
        main = '<b>' + p.goals + ' Tore</b>';
        sub = p.assists + ' Vorlagen · ' + p.points + ' Scorerpunkte';
      }

      return '<button type="button" class="hfmV176StatRow" onclick="' + statClick(p) + '">' +
        '<span class="rank">' + (i + 1) + '</span>' +
        '<span class="who"><strong>' + html(p.name) + '</strong><small>' + html(p.club) + '</small></span>' +
        '<span class="main">' + main + '<small>' + html(sub) + '</small></span>' +
      '</button>';
    }).join('') + '</div>';
  }

  window.setPlayerStatsMode = window.setPlayerStatsMode || function(){};
  window.setPlayerStatsMode = setPlayerStatsMode = function(mode){
    state.playerStatsMode = ['goals','assists','points','ratings'].indexOf(mode) >= 0 ? mode : 'goals';
    if (typeof render === 'function') render();
  };

  window.playerStatsView = playerStatsView = function(){
    var mode = ['goals','assists','points','ratings'].indexOf(state.playerStatsMode) >= 0 ? state.playerStatsMode : 'goals';
    var title = 'Torschützenliste';
    var hint = 'Fortlaufende Saisonliste aller Ligaspieler. Spieler mit 0 werden in der jeweiligen Liste ausgeblendet.';

    if (mode === 'assists') title = 'Vorlagengeberliste';
    else if (mode === 'points') title = 'Scorerliste';
    else if (mode === 'ratings') {
      title = 'Notenbeste Spieler';
      hint = 'Fortlaufende Saisonliste nach bestem Notendurchschnitt. Hier zählen die Noten, nicht die Tore.';
    }

    return '<section class="panel">' +
      '<p class="eyebrow">Saison · Spielerstatistiken</p>' +
      '<h2>Spielerstatistiken</h2>' +
      '<div class="chips">' +
        '<button class="chip ' + (mode === 'goals' ? 'selected' : '') + '" onclick="setPlayerStatsMode(\'goals\')">Torschützenliste</button>' +
        '<button class="chip ' + (mode === 'assists' ? 'selected' : '') + '" onclick="setPlayerStatsMode(\'assists\')">Vorlagengeberliste</button>' +
        '<button class="chip ' + (mode === 'points' ? 'selected' : '') + '" onclick="setPlayerStatsMode(\'points\')">Scorerliste</button>' +
        '<button class="chip ' + (mode === 'ratings' ? 'selected' : '') + '" onclick="setPlayerStatsMode(\'ratings\')">Notenbeste Spieler</button>' +
      '</div>' +
      '<div class="infoBox">' + html(hint) + '</div>' +
      '<h3>' + html(title) + '</h3>' +
      statRows(mode) +
    '</section>';
  };

  try { if (typeof render === 'function') render(); } catch(e) { console.warn('v193 player stats scorer list', e); }
})();

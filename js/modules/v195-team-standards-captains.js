(function(){
  if (typeof window === 'undefined' || typeof state === 'undefined') return;

  function esc(v){ return (typeof html === 'function') ? html(v) : String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function num(v, fb){ var n = Number(v); return Number.isFinite(n) ? n : (fb || 0); }
  function clamp(v, a, b){ return Math.max(a, Math.min(b, num(v, a))); }
  function money(v){ try { return typeof euro === 'function' ? euro(v) : String(Math.round(v)) + ' €'; } catch(e){ return String(Math.round(v)) + ' €'; } }
  function posText(p){ try { return typeof positionText === 'function' ? positionText(p) : [p.pos].concat(p.secondary || []).filter(Boolean).join(' / '); } catch(e){ return [p.pos].concat(p.secondary || []).filter(Boolean).join(' / '); } }
  function playerById(id){ return (state.players || []).find(function(p){ return String(p.id) === String(id); }) || null; }
  function playerName(id){ var p = playerById(id); return p ? p.name : 'nicht besetzt'; }
  function lastNameLabel(name){
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'Spieler';
    if (parts.length === 1) return parts[0];
    return parts[0].charAt(0) + '. ' + parts.slice(1).join(' ');
  }
  function stableHash(str){
    var h = 2166136261;
    str = String(str || '');
    for (var i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); }
    return Math.abs(h >>> 0);
  }
  function roleBonus(p, type){
    var positions = [p.pos].concat(p.secondary || []).map(function(x){ return String(x || '').toUpperCase(); });
    if (type === 'penalty') {
      if (positions.some(function(x){ return ['ST','OM','LA','RA'].indexOf(x) >= 0; })) return 8;
      if (positions.some(function(x){ return ['ZM','LM','RM'].indexOf(x) >= 0; })) return 4;
    }
    if (type === 'freeKick') {
      if (positions.some(function(x){ return ['OM','ZM','LM','RM','LA','RA'].indexOf(x) >= 0; })) return 8;
      if (positions.some(function(x){ return ['DM','ST'].indexOf(x) >= 0; })) return 4;
    }
    if (type === 'corner') {
      if (positions.some(function(x){ return ['LM','RM','LA','RA','OM'].indexOf(x) >= 0; })) return 9;
      if (positions.some(function(x){ return ['ZM','LV','RV'].indexOf(x) >= 0; })) return 5;
    }
    return 0;
  }
  function defaultSpecial(p, type){
    var base = clamp(num(p.strength, 55) + roleBonus(p, type) - (String(p.pos).toUpperCase() === 'TW' ? 18 : 0), 25, 92);
    var roll = stableHash((p.id || '') + '|' + (p.name || '') + '|' + type) % 19;
    return clamp(Math.round(base - 9 + roll), 20, 99);
  }
  function ensureSpecialPlayer(p){
    if (!p) return p;
    if (!p.standardSkills || typeof p.standardSkills !== 'object') p.standardSkills = {};
    if (!p.standardProgress || typeof p.standardProgress !== 'object') p.standardProgress = {};
    ['penalty','freeKick','corner'].forEach(function(k){
      if (!Number.isFinite(Number(p.standardSkills[k]))) p.standardSkills[k] = defaultSpecial(p, k);
      if (!Number.isFinite(Number(p.standardProgress[k]))) p.standardProgress[k] = stableHash((p.id || '') + '-prog-' + k) % 100;
    });
    return p;
  }
  function ensureStandards(){
    state.players = (state.players || []).map(ensureSpecialPlayer);
    if (!state.setPieces || typeof state.setPieces !== 'object') state.setPieces = {};
    var categories = ['penalty','freeKickClose','freeKickFar','cornerLeft','cornerRight'];
    categories.forEach(function(cat){ if (!Array.isArray(state.setPieces[cat])) state.setPieces[cat] = []; });
    function fill(cat, type){
      var arr = state.setPieces[cat].map(String).filter(function(id){ return !!playerById(id); });
      var taken = new Set(arr);
      (state.players || []).slice().sort(function(a,b){ return num(b.standardSkills && b.standardSkills[type]) - num(a.standardSkills && a.standardSkills[type]); }).forEach(function(p){
        if (arr.length < 3 && !taken.has(String(p.id))) { arr.push(String(p.id)); taken.add(String(p.id)); }
      });
      state.setPieces[cat] = arr.slice(0,3);
    }
    fill('penalty','penalty');
    fill('freeKickClose','freeKick');
    fill('freeKickFar','freeKick');
    fill('cornerLeft','corner');
    fill('cornerRight','corner');
    if (!state.captains || typeof state.captains !== 'object') state.captains = {};
    var sorted = (state.players || []).slice().sort(function(a,b){ return num(b.strength) - num(a.strength) || num(b.age) - num(a.age); });
    if (!playerById(state.captains.captain)) state.captains.captain = sorted[0] ? String(sorted[0].id) : '';
    if (!playerById(state.captains.vice1) || String(state.captains.vice1) === String(state.captains.captain)) state.captains.vice1 = sorted[1] ? String(sorted[1].id) : '';
    if (!playerById(state.captains.vice2) || [state.captains.captain,state.captains.vice1].map(String).indexOf(String(state.captains.vice2)) >= 0) state.captains.vice2 = sorted[2] ? String(sorted[2].id) : '';
  }
  function spec(p, type){ ensureSpecialPlayer(p); return num(p.standardSkills && p.standardSkills[type], defaultSpecial(p, type)); }
  function skillLabel(type){ return type === 'penalty' ? 'Elfmeter' : type === 'freeKick' ? 'Freistöße' : 'Ecken'; }
  function categoryLabel(cat){
    return { penalty:'Elfmeter', freeKickClose:'Freistöße nahe', freeKickFar:'Freistöße entfernt', cornerLeft:'Ecken links', cornerRight:'Ecken rechts' }[cat] || cat;
  }
  function categoryType(cat){ return cat === 'penalty' ? 'penalty' : (cat === 'cornerLeft' || cat === 'cornerRight') ? 'corner' : 'freeKick'; }
  function playerOptions(selected, type, usedIds){
    var selectedId = String(selected || '');
    var used = new Set((usedIds || []).map(String));
    return '<option value="">nicht besetzt</option>' + (state.players || []).slice().sort(function(a,b){ return spec(b,type) - spec(a,type) || num(b.strength)-num(a.strength) || String(a.name).localeCompare(String(b.name)); }).map(function(p){
      var id = String(p.id);
      var disabled = used.has(id) && id !== selectedId ? ' disabled' : '';
      return '<option value="'+esc(id)+'" '+(id===selectedId?'selected':'')+disabled+'>'+esc(p.name)+' · '+esc(posText(p))+' · '+skillLabel(type)+' '+spec(p,type)+'</option>';
    }).join('');
  }
  function setPieceCard(cat){
    var type = categoryType(cat);
    var arr = (state.setPieces && state.setPieces[cat]) || [];
    var selectors = [0,1,2].map(function(i){
      var used = arr.filter(function(_,idx){ return idx !== i; });
      var current = arr[i] || '';
      var p = playerById(current);
      return '<label class="hfmV195SelectLine"><span>'+ (i+1) +'. Schütze</span><select onchange="hfmV195SetPiece(\''+cat+'\','+i+',this.value)">'+playerOptions(current,type,used)+'</select>'+(p ? '<small>'+esc(lastNameLabel(p.name))+' · '+skillLabel(type)+' '+spec(p,type)+'</small>' : '<small>kein Spieler gewählt</small>')+'</label>';
    }).join('');
    return '<article class="hfmV195Box"><h3>'+esc(categoryLabel(cat))+'</h3>'+selectors+'</article>';
  }
  function standardTrainingPanel(){
    var focus = state.standardTrainingFocus || 'none';
    var buttons = [
      ['none','kein Spezialtraining'], ['penalty','Elfmeter'], ['freeKick','Freistöße'], ['corner','Ecken']
    ].map(function(x){ return '<button class="chip '+(focus===x[0]?'selected':'')+'" onclick="return hfmV195SetStandardTraining(\''+x[0]+'\')">'+esc(x[1])+'</button>'; }).join('');
    var top = ['penalty','freeKick','corner'].map(function(type){
      var best = (state.players || []).slice().sort(function(a,b){ return spec(b,type)-spec(a,type); })[0];
      return '<article class="card"><p>'+esc(skillLabel(type))+'</p><h2>'+(best ? spec(best,type) : '-')+'</h2><span>'+(best ? esc(best.name) : 'kein Spieler')+'</span></article>';
    }).join('');
    return '<section class="panel"><p class="eyebrow">Team · Spezialtraining</p><h2>Standards trainieren</h2><div class="infoBox">Diese Werte zählen nicht zur Gesamtstärke. Mit Spezialtraining entwickeln sich Elfmeter, Freistöße oder Ecken schneller. Ohne Fokus können Werte über die Saison leicht steigen oder fallen.</div><div class="chips">'+buttons+'</div><div class="grid compact">'+top+'</div></section>';
  }
  function standardsView(){
    ensureStandards();
    return '<section class="panel hfmV195Standards"><p class="eyebrow">Team · Standardsituationen</p><h2>Standardsituationen</h2><div class="infoBox">Lege pro Standardsituation bis zu 3 Schützen fest. Die Spezialwerte <b>Elfmeter</b>, <b>Freistöße</b> und <b>Ecken</b> haben keinen Einfluss auf die Gesamtstärke, erhöhen aber bei passenden Standards die Chance auf Tore oder Vorlagen.</div><div class="hfmV195Grid">'+['penalty','freeKickClose','freeKickFar','cornerLeft','cornerRight'].map(setPieceCard).join('')+'</div></section>'+standardTrainingPanel();
  }
  function captainOptions(selected, usedIds){
    var selectedId = String(selected || '');
    var used = new Set((usedIds || []).map(String));
    return '<option value="">nicht besetzt</option>' + (state.players || []).slice().sort(function(a,b){ return num(b.strength)-num(a.strength) || num(b.age)-num(a.age) || String(a.name).localeCompare(String(b.name)); }).map(function(p){
      var id = String(p.id);
      var disabled = used.has(id) && id !== selectedId ? ' disabled' : '';
      return '<option value="'+esc(id)+'" '+(id===selectedId?'selected':'')+disabled+'>'+esc(p.name)+' · '+esc(posText(p))+' · Stärke '+num(p.strength)+'</option>';
    }).join('');
  }
  function captainCard(role, label, hint){
    var c = state.captains || {};
    var selected = c[role] || '';
    var used = ['captain','vice1','vice2'].filter(function(r){ return r !== role; }).map(function(r){ return c[r]; }).filter(Boolean);
    var p = playerById(selected);
    return '<article class="hfmV195Box"><h3>'+esc(label)+'</h3><label class="hfmV195SelectLine"><span>'+esc(hint)+'</span><select onchange="hfmV195SetCaptain(\''+role+'\',this.value)">'+captainOptions(selected, used)+'</select>'+(p ? '<small>'+esc(p.name)+' · '+esc(posText(p))+'</small>' : '<small>nicht gewählt</small>')+'</label></article>';
  }
  function captainsView(){
    ensureStandards();
    return '<section class="panel hfmV195Captains"><p class="eyebrow">Team · Kapitänswahl</p><h2>Kapitänswahl</h2><div class="infoBox">Lege deinen Kapitän und zwei Vertreter fest. Diese Auswahl wird gespeichert und kann später für Moral-, Druck- und Führungsereignisse genutzt werden.</div><div class="hfmV195Grid">'+captainCard('captain','Kapitän','führt die Mannschaft')+captainCard('vice1','1. Kapitänsvertreter','übernimmt bei Ausfall')+captainCard('vice2','2. Kapitänsvertreter','weitere Absicherung')+'</div></section>';
  }

  window.hfmV195SetPiece = function(cat, idx, value){
    ensureStandards();
    if (!state.setPieces[cat]) state.setPieces[cat] = [];
    var arr = state.setPieces[cat].slice(0,3).map(String);
    arr[idx] = value ? String(value) : '';
    var seen = new Set();
    arr = arr.map(function(id){ if (!id) return ''; if (seen.has(id)) return ''; seen.add(id); return id; });
    state.setPieces[cat] = arr;
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV195SetCaptain = function(role, value){
    ensureStandards();
    state.captains[role] = value ? String(value) : '';
    ['captain','vice1','vice2'].forEach(function(r){ if (r !== role && String(state.captains[r]) === String(value)) state.captains[r] = ''; });
    ensureStandards();
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV195SetStandardTraining = function(focus){
    state.standardTrainingFocus = ['none','penalty','freeKick','corner'].indexOf(focus) >= 0 ? focus : 'none';
    if (typeof render === 'function') render();
    return false;
  };

  function teamButton(id, label){
    return '<button type="button" class="chip '+(state.teamSection===id?'selected':'')+'" onclick="return setTeamSection(\''+id+'\')">'+esc(label)+'</button>';
  }
  var previousTeam = typeof team === 'function' ? team : null;
  window.team = team = function(){
    ensureStandards();
    var section = state.teamSection || 'lineup';
    var content = '';
    if (section === 'standards') content = standardsView();
    else if (section === 'captains') content = captainsView();
    else if (section === 'lineup' && typeof lineup === 'function') content = lineup();
    else if (section === 'tactics' && typeof tacticsView === 'function') content = tacticsView();
    else if (section === 'training' && typeof training === 'function') content = training();
    else if (section === 'contracts' && typeof contractView === 'function') content = contractView();
    else if (section === 'youth' && typeof youth === 'function') content = youth();
    else if (typeof generalTeam === 'function') content = generalTeam();
    else if (previousTeam) return previousTeam();
    return '<section class="teamSubnav"><div class="chips">'+
      teamButton('lineup','Aufstellung')+
      teamButton('standards','Standardsituationen')+
      teamButton('captains','Kapitänswahl')+
      teamButton('tactics','Taktik')+
      teamButton('training','Training')+
      teamButton('contracts','Vertragsansicht')+
      teamButton('youth','Jugend')+
      teamButton('general','Allgemeines')+
      '</div></section>'+content;
  };

  function primaryTaker(cat){
    ensureStandards();
    var arr = (state.setPieces && state.setPieces[cat]) || [];
    for (var i=0;i<arr.length;i++){ var p = playerById(arr[i]); if (p) return p; }
    var type = categoryType(cat);
    return (state.players || []).slice().sort(function(a,b){ return spec(b,type)-spec(a,type); })[0] || null;
  }
  function setPieceQuality(cat){ var p = primaryTaker(cat); return p ? spec(p, categoryType(cat)) : 50; }
  function applySetPiecesToPlan(plan){
    if (!plan || !Array.isArray(plan.events)) return plan;
    ensureStandards();
    var events = plan.events;
    var penaltyTaker = primaryTaker('penalty');
    events.forEach(function(e){
      if (e && e.team === 'own' && (e.type === 'goal' || e.type === 'missed_penalty') && /Elfmeter|verschießt/i.test(String(e.text || '')) && penaltyTaker) {
        e.scorerId = e.type === 'goal' ? penaltyTaker.id : e.scorerId;
        e.playerId = penaltyTaker.id;
        e.scorerName = e.type === 'goal' ? penaltyTaker.name : e.scorerName;
        e.playerName = penaltyTaker.name;
        if (e.type === 'goal') e.text = e.minute+'. Min: Tor für '+(typeof ownClubName === 'function' ? ownClubName() : 'uns')+'! '+penaltyTaker.name+' verwandelt einen Elfmeter.';
        else e.text = e.minute+'. Min: '+penaltyTaker.name+' verschießt einen Elfmeter.';
      }
    });
    var qPen = setPieceQuality('penalty');
    var qFk = Math.max(setPieceQuality('freeKickClose'), setPieceQuality('freeKickFar'));
    var qCorner = Math.max(setPieceQuality('cornerLeft'), setPieceQuality('cornerRight'));
    var extraChance = Math.max(0, qFk - 68) / 260 + Math.max(0, qCorner - 68) / 320 + Math.max(0, qPen - 72) / 500;
    if (Math.random() < Math.min(0.22, extraChance)) {
      var useCorner = qCorner + Math.random()*15 > qFk;
      var taker = useCorner ? primaryTaker(Math.random() < 0.5 ? 'cornerLeft' : 'cornerRight') : primaryTaker('freeKickClose');
      var type = useCorner ? 'corner' : 'freeKick';
      var scorers = (typeof lineupEntries === 'function' ? lineupEntries().map(function(e){ return e.player; }).filter(Boolean) : (state.players || []).slice(0,11));
      var scorer = scorers.slice().sort(function(a,b){ return num(b.strength)-num(a.strength); })[Math.floor(Math.random()*Math.min(5, scorers.length))] || taker;
      if (taker && scorer) {
        var minute = 50 + Math.floor(Math.random() * 38);
        events.push({
          type:'goal', minute: minute, team:'own', scorerId: scorer.id, scorerName: scorer.name,
          assistId: taker.id !== scorer.id ? taker.id : undefined,
          assistName: taker.id !== scorer.id ? taker.name : undefined,
          text: minute+'. Min: Tor für '+(typeof ownClubName === 'function' ? ownClubName() : 'uns')+'! '+scorer.name+(useCorner ? ' trifft nach Ecke von '+taker.name+'.' : ' trifft nach Freistoß von '+taker.name+'.'),
          setPieceType: type
        });
        plan.ownGoals = num(plan.ownGoals) + 1;
        plan.ownShots = num(plan.ownShots) + 1;
      }
    }
    events.sort(function(a,b){ return num(a.minute)-num(b.minute) || String(a.type).localeCompare(String(b.type)); });
    return plan;
  }
  var basePredicted = typeof predictedMatchScore === 'function' ? predictedMatchScore : null;
  if (basePredicted) {
    window.predictedMatchScore = predictedMatchScore = function(opponent){
      var score = basePredicted.apply(this, arguments);
      if (score && score.generatedPlan && !score.generatedPlan.hfmV195SetPiecesApplied) {
        applySetPiecesToPlan(score.generatedPlan);
        score.ownGoals = score.generatedPlan.ownGoals;
        score.oppGoals = score.generatedPlan.oppGoals;
        score.generatedPlan.hfmV195SetPiecesApplied = true;
      }
      return score;
    };
  }

  function applyStandardTraining(){
    ensureStandards();
    var focus = state.standardTrainingFocus || 'none';
    state.players = (state.players || []).map(function(p){
      ensureSpecialPlayer(p);
      ['penalty','freeKick','corner'].forEach(function(k){
        var change = 0;
        if (focus === k) change += 4 + (num(p.talent,3) >= 4 ? 1 : 0);
        else change += (stableHash((p.id || '') + '-' + k + '-' + (state.week || 0)) % 5) - 2;
        var progress = clamp(num(p.standardProgress[k]) + change, 0, 140);
        var skill = num(p.standardSkills[k]);
        if (progress >= 100 && skill < 99) { skill += 1; progress -= 100; }
        if (progress <= 0 && skill > 20 && focus !== k && Math.random() < 0.03) { skill -= 1; progress = 25; }
        p.standardSkills[k] = clamp(Math.round(skill), 20, 99);
        p.standardProgress[k] = clamp(Math.round(progress), 0, 99);
      });
      return p;
    });
  }
  var baseNextWeek = typeof nextWeek === 'function' ? nextWeek : null;
  if (baseNextWeek) {
    window.nextWeek = nextWeek = function(){
      var out = baseNextWeek.apply(this, arguments);
      try { applyStandardTraining(); } catch(e){ console.warn('v195 standard training', e); }
      return out;
    };
  }

  try {
    var style = document.createElement('style');
    style.textContent = '.hfmV195Grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.hfmV195Box{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:rgba(16,31,52,.9);padding:14px;min-width:0}.hfmV195Box h3{margin-top:0}.hfmV195SelectLine{display:grid;gap:6px;margin:10px 0}.hfmV195SelectLine span{font-weight:800;color:var(--text)}.hfmV195SelectLine small{color:var(--muted);line-height:1.25}.hfmV195SelectLine select{width:100%;min-width:0}.hfmV195Standards .card h2{font-size:28px}@media(max-width:560px){.hfmV195Grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);
  } catch(e) {}
  try { ensureStandards(); if (typeof render === 'function') render(); } catch(e){ console.warn('v195 init', e); }
})();

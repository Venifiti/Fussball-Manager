(function(){
  if (typeof window === 'undefined') return;

  function stateOk(){ return typeof window.state !== 'undefined' && window.state; }
  function esc(value){
    if (typeof hfmV68Html === 'function') return hfmV68Html(value);
    if (typeof html === 'function') return html(value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function js(value){ return String(value == null ? '' : value).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
  function num(value, fallback){ var n = Number(value); return Number.isFinite(n) ? n : (fallback || 0); }
  function money(value){ try { return typeof euro === 'function' ? euro(value) : Math.round(num(value)) + ' €'; } catch(e){ return Math.round(num(value)) + ' €'; } }
  function safeRender(){ try { if (typeof render === 'function') render(); } catch(e){ console.warn('v197 render failed', e); } }
  function roleKeys(){
    try { if (typeof hfmV110RequiredStaffRoles === 'function') return hfmV110RequiredStaffRoles(); } catch(e) {}
    try { return Object.keys(HFM_V110_STAFF_ROLES || {}); } catch(e) {}
    return ['assistant','goalkeeper','fitness','youth','doctor','physio','scout','director','marketing','press','stadium'];
  }
  function roleDef(role){ try { return (HFM_V110_STAFF_ROLES && HFM_V110_STAFF_ROLES[role]) || {}; } catch(e){ return {}; } }
  function roleLabel(role){ try { return typeof hfmV110StaffRoleLabel === 'function' ? hfmV110StaffRoleLabel(role) : (roleDef(role).label || role || 'Mitarbeiter'); } catch(e){ return role || 'Mitarbeiter'; } }
  function traitLabel(trait){ try { return typeof hfmV110StaffTraitLabel === 'function' ? hfmV110StaffTraitLabel(trait) : trait || 'Ausgeglichen'; } catch(e){ return trait || 'Ausgeglichen'; } }
  function attrLabel(attr){ try { return typeof hfmV110StaffAttrLabel === 'function' ? hfmV110StaffAttrLabel(attr) : attr; } catch(e){ return attr || 'Fähigkeit'; } }
  function strength(staff){ try { return typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(staff) : num(staff && staff.strength, 50); } catch(e){ return num(staff && staff.strength, 50); } }
  function salary(staff){ try { return typeof hfmV110StaffSalary === 'function' ? hfmV110StaffSalary(strength(staff), staff.role, typeof ownCombinedImage === 'function' ? ownCombinedImage() : 55) : num(staff.salary, 1800); } catch(e){ return num(staff && staff.salary, 1800); } }
  function potentialStars(v){ try { return typeof hfmV110PotentialStars === 'function' ? hfmV110PotentialStars(v) : '★'.repeat(Math.max(1, Math.min(5, num(v, 3)))); } catch(e){ return '★'.repeat(Math.max(1, Math.min(5, num(v, 3)))); } }

  function normalizeStaffOne(staff, own){
    if (!staff || typeof staff !== 'object') return null;
    var roles = roleKeys();
    if (!staff.role || roles.indexOf(staff.role) < 0) staff.role = roles[0] || 'assistant';
    if (!staff.name) staff.name = 'Mitarbeiter';
    if (!staff.attributes || typeof staff.attributes !== 'object') staff.attributes = {};
    var slots = roleDef(staff.role).slots || [];
    slots.forEach(function(attr, idx){
      if (!Number.isFinite(Number(staff.attributes[attr]))) staff.attributes[attr] = Math.max(25, Math.min(90, num(staff.strength, 50) + ((idx % 2) ? 2 : -2)));
    });
    staff.strength = strength(staff);
    staff.age = num(staff.age, own ? 42 : 38);
    staff.potential = Math.max(1, Math.min(5, num(staff.potential, 3)));
    if (!staff.trait) staff.trait = 'BALANCED';
    staff.salary = num(staff.salary, salary(staff));
    staff.contractYears = num(staff.contractYears, own ? 2 : 0);
    staff.freeAgent = !own;
    if (!staff.id) staff.id = 'staff-' + staff.role + '-' + Math.abs((staff.name + staff.age + Math.random()).split('').reduce(function(a,c){ return ((a<<5)-a)+c.charCodeAt(0) | 0; },0));
    return staff;
  }

  function makeStaff(role, i){
    var first = ['Thomas','Markus','Andreas','Stefan','Martin','Lukas','Georg','Daniel','Florian','Michael','Karin','Sabine','Julia','Anna'];
    var last = ['Müller','Huber','Schmidt','Weber','Wagner','Bauer','Gruber','Leitner','Hofer','Fischer','Steiner','Koller'];
    var seed = role + '-' + i + '-' + num(state && state.week, 1);
    function hash(s){ var h = 0; for (var x=0; x<s.length; x++) h = ((h<<5)-h)+s.charCodeAt(x) | 0; return Math.abs(h); }
    function rnd(min,max,key){ var h = hash(seed + '-' + key); return min + (h % (max-min+1)); }
    var s = { id:'staff-free-' + role + '-' + i + '-' + hash(seed), role:role, name:first[rnd(0,first.length-1,'f')] + ' ' + last[rnd(0,last.length-1,'l')], age:rnd(26,59,'age'), potential:rnd(1,5,'pot'), trait:['BALANCED','LOYAL','AMBITIOUS','TACTICIAN','NETWORKER','YOUTH_DEVELOPER'][rnd(0,5,'tr')] || 'BALANCED', attributes:{}, contractYears:0, freeAgent:true };
    (roleDef(role).slots || []).forEach(function(attr){ s.attributes[attr] = rnd(42,88,attr); });
    return normalizeStaffOne(s, false);
  }

  function ensureStaffState(){
    if (!stateOk()) return false;
    if (!Array.isArray(state.staff)) state.staff = [];
    if (!Array.isArray(state.staffMarket)) state.staffMarket = [];
    if (!state.clubStaffCache || typeof state.clubStaffCache !== 'object') state.clubStaffCache = {};
    if (!state.staffSection) state.staffSection = 'overview';
    try { if (typeof hfmV110EnsureStaffState === 'function') hfmV110EnsureStaffState(); } catch(e) {}
    try { if (typeof hfmV110EnsureStaffMarket === 'function') hfmV110EnsureStaffMarket(); } catch(e) {}
    if (!Array.isArray(state.staffMarket) || state.staffMarket.length < 18) {
      var roles = roleKeys();
      state.staffMarket = [];
      roles.forEach(function(role){ for (var i=0; i<3; i++) state.staffMarket.push(makeStaff(role, i)); });
    }
    state.staff = (state.staff || []).filter(Boolean).map(function(s){ return normalizeStaffOne(s, true); }).filter(Boolean);
    state.staffMarket = (state.staffMarket || []).filter(Boolean).map(function(s){ return normalizeStaffOne(s, false); }).filter(Boolean);
    return true;
  }

  window.hfmV110NormalizeStaff = hfmV110NormalizeStaff = function(){
    try { return ensureStaffState(); } catch(e){
      console.warn('v197 staff normalize fallback', e);
      try {
        if (stateOk()) { state.staff = Array.isArray(state.staff) ? state.staff : []; state.staffMarket = Array.isArray(state.staffMarket) ? state.staffMarket : []; state.staffSection = state.staffSection || 'overview'; }
      } catch(x) {}
      return false;
    }
  };

  function defaultStaffSearch(){ return { name:'', role:'all', trait:'all', minAge:'', maxAge:'', minStrength:'', maxStrength:'', minSalary:'', maxSalary:'', attr:'all', minAttr:'' }; }
  function ensureStaffSearch(){
    if (!state.staffMarketDraft || typeof state.staffMarketDraft !== 'object') state.staffMarketDraft = defaultStaffSearch();
    state.staffMarketDraft = Object.assign(defaultStaffSearch(), state.staffMarketDraft || {});
    if (typeof state.staffMarketHasSearched !== 'boolean') state.staffMarketHasSearched = false;
    if (!state.staffMarketApplied || typeof state.staffMarketApplied !== 'object') state.staffMarketApplied = null;
  }
  function allAttrs(){
    var set = {};
    roleKeys().forEach(function(role){ (roleDef(role).slots || []).forEach(function(attr){ set[attr] = true; }); });
    return Object.keys(set).sort(function(a,b){ return attrLabel(a).localeCompare(attrLabel(b)); });
  }
  function allTraits(){
    var set = {};
    (state.staffMarket || []).concat(state.staff || []).forEach(function(s){ if (s && s.trait) set[s.trait] = true; });
    try { Object.keys(HFM_V110_STAFF_TRAITS || {}).forEach(function(t){ set[t] = true; }); } catch(e) {}
    return Object.keys(set).sort(function(a,b){ return traitLabel(a).localeCompare(traitLabel(b)); });
  }
  window.hfmV197SetStaffSearch = hfmV197SetStaffSearch = function(field, value){
    hfmV110NormalizeStaff(); ensureStaffSearch();
    state.staffMarketDraft[field] = value == null ? '' : String(value);
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    return false;
  };
  window.hfmV197RunStaffSearch = hfmV197RunStaffSearch = function(){
    hfmV110NormalizeStaff(); ensureStaffSearch(); state.staffMarketApplied = Object.assign(defaultStaffSearch(), state.staffMarketDraft); state.staffMarketHasSearched = true;
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); safeRender(); return false;
  };
  window.hfmV197ResetStaffSearch = hfmV197ResetStaffSearch = function(){
    hfmV110NormalizeStaff(); state.staffMarketDraft = defaultStaffSearch(); state.staffMarketApplied = null; state.staffMarketHasSearched = false;
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); safeRender(); return false;
  };
  function filterStaff(list, filter){
    var f = Object.assign(defaultStaffSearch(), filter || {}); var name = String(f.name || '').trim().toLowerCase();
    return (list || []).filter(function(s){
      var st = strength(s), age = num(s.age), sal = num(s.salary);
      if (name && String(s.name || '').toLowerCase().indexOf(name) < 0) return false;
      if (f.role !== 'all' && s.role !== f.role) return false;
      if (f.trait !== 'all' && s.trait !== f.trait) return false;
      if (f.minAge !== '' && age < num(f.minAge)) return false;
      if (f.maxAge !== '' && age > num(f.maxAge)) return false;
      if (f.minStrength !== '' && st < num(f.minStrength)) return false;
      if (f.maxStrength !== '' && st > num(f.maxStrength)) return false;
      if (f.minSalary !== '' && sal < num(f.minSalary)) return false;
      if (f.maxSalary !== '' && sal > num(f.maxSalary)) return false;
      if (f.attr !== 'all' && f.minAttr !== '' && num(s.attributes && s.attributes[f.attr]) < num(f.minAttr)) return false;
      return true;
    }).sort(function(a,b){ return strength(b)-strength(a) || num(a.salary)-num(b.salary) || String(a.name).localeCompare(String(b.name)); });
  }
  function staffCard(s){
    var id = js(s.id); var attrs = (roleDef(s.role).slots || []).map(function(a){ return '<span>'+esc(attrLabel(a))+' '+num(s.attributes && s.attributes[a])+'</span>'; }).join('');
    return '<div class="player hfmV197StaffCard"><div class="playerTop"><strong><button type="button" class="linkButton" onclick="return hfmV110OpenStaffProfile(\''+id+'\')">'+esc(s.name)+'</button></strong><span>'+esc(roleLabel(s.role))+' · '+num(s.age)+' Jahre</span></div><div class="meta"><span>Stärke '+strength(s)+'</span><span>Potenzial '+potentialStars(s.potential)+'</span><span>'+esc(traitLabel(s.trait))+'</span><span>Gehalt '+money(s.salary)+'</span></div><div class="playerBottom">'+attrs+'</div><div class="playerActions"><button type="button" class="primary" onclick="return hfmV110StartStaffNegotiation(\''+id+'\')">Mitarbeiter verpflichten</button></div></div>';
  }
  window.hfmV110StaffMarketView = hfmV110StaffMarketView = function(){
    hfmV110NormalizeStaff(); ensureStaffSearch(); var d = Object.assign(defaultStaffSearch(), state.staffMarketDraft || {});
    var roleOptions = ['all'].concat(roleKeys()).map(function(r){ return '<option value="'+esc(r)+'" '+(d.role===r?'selected':'')+'>'+(r==='all'?'Alle Rollen':esc(roleLabel(r)))+'</option>'; }).join('');
    var traitOptions = ['all'].concat(allTraits()).map(function(t){ return '<option value="'+esc(t)+'" '+(d.trait===t?'selected':'')+'>'+(t==='all'?'Alle Charaktere':esc(traitLabel(t)))+'</option>'; }).join('');
    var attrOptions = ['all'].concat(allAttrs()).map(function(a){ return '<option value="'+esc(a)+'" '+(d.attr===a?'selected':'')+'>'+(a==='all'?'Keine einzelne Fähigkeit':esc(attrLabel(a)))+'</option>'; }).join('');
    var results = '<div class="infoBox">Stelle die Suchfilter ein und klicke auf <strong>Jetzt suchen</strong>. Die Mitarbeitersuche funktioniert wie die Spielersuche, nur mit Rollen und Mitarbeiterfähigkeiten.</div>';
    if (state.staffMarketHasSearched && state.staffMarketApplied) { var list = filterStaff(state.staffMarket, state.staffMarketApplied); results = list.map(staffCard).join('') || '<div class="infoBox">Keine passenden Mitarbeiter gefunden.</div>'; }
    return '<div class="infoBox">Arbeitslose Mitarbeiter können gezielt gesucht und verpflichtet werden. Die Suche nutzt Name, Rolle, Charakter, Alter, Stärke, Gehalt und rollenrelevante Fähigkeiten.</div><div class="formGrid hfmV197StaffSearch">'+
      '<label><span>Name</span><input value="'+esc(d.name)+'" placeholder="Name suchen" oninput="hfmV197SetStaffSearch(\'name\', this.value)"></label>'+ 
      '<label><span>Rolle</span><select onchange="hfmV197SetStaffSearch(\'role\', this.value)">'+roleOptions+'</select></label>'+ 
      '<label><span>Charakter</span><select onchange="hfmV197SetStaffSearch(\'trait\', this.value)">'+traitOptions+'</select></label>'+ 
      '<label><span>Alter von</span><input type="number" value="'+esc(d.minAge)+'" oninput="hfmV197SetStaffSearch(\'minAge\', this.value)"></label>'+ 
      '<label><span>Alter bis</span><input type="number" value="'+esc(d.maxAge)+'" oninput="hfmV197SetStaffSearch(\'maxAge\', this.value)"></label>'+ 
      '<label><span>Stärke von</span><input type="number" value="'+esc(d.minStrength)+'" oninput="hfmV197SetStaffSearch(\'minStrength\', this.value)"></label>'+ 
      '<label><span>Stärke bis</span><input type="number" value="'+esc(d.maxStrength)+'" oninput="hfmV197SetStaffSearch(\'maxStrength\', this.value)"></label>'+ 
      '<label><span>Gehalt von</span><input type="number" step="100" value="'+esc(d.minSalary)+'" oninput="hfmV197SetStaffSearch(\'minSalary\', this.value)"></label>'+ 
      '<label><span>Gehalt bis</span><input type="number" step="100" value="'+esc(d.maxSalary)+'" oninput="hfmV197SetStaffSearch(\'maxSalary\', this.value)"></label>'+ 
      '<label><span>Spezialfähigkeit</span><select onchange="hfmV197SetStaffSearch(\'attr\', this.value)">'+attrOptions+'</select></label>'+ 
      '<label><span>Mindestwert Fähigkeit</span><input type="number" value="'+esc(d.minAttr)+'" oninput="hfmV197SetStaffSearch(\'minAttr\', this.value)"></label>'+ 
      '</div><div class="playerActions"><button type="button" class="primary" onclick="return hfmV197RunStaffSearch()">Jetzt suchen</button><button type="button" class="ghost" onclick="return hfmV197ResetStaffSearch()">Filter zurücksetzen</button></div><div class="playerList">'+results+'</div>';
  };
  window.hfmV197SetStaffSection = hfmV197SetStaffSection = function(section){ state.staffSection = section || 'overview'; if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); safeRender(); return false; };
  function staffButton(id,label){ return '<button type="button" class="chip '+((state.staffSection||'overview')===id?'selected':'')+'" onclick="return hfmV197SetStaffSection(\''+id+'\')">'+esc(label)+'</button>'; }
  window.staffView = staffView = function(){
    hfmV110NormalizeStaff(); var section = state.staffSection || 'overview'; var content = '';
    try {
      if (section === 'market') content = hfmV110StaffMarketView();
      else if (section === 'contracts') content = typeof hfmV110StaffContractsView === 'function' ? hfmV110StaffContractsView() : '<div class="infoBox">Verträge konnten nicht geladen werden.</div>';
      else if (section === 'progress') content = typeof hfmV120StaffProgressView === 'function' ? hfmV120StaffProgressView() : '<div class="infoBox">Fortschritt konnte nicht geladen werden.</div>';
      else if (section === 'interns') content = typeof hfmV121StaffInternsView === 'function' ? hfmV121StaffInternsView() : '<div class="infoBox">Praktikanten konnten nicht geladen werden.</div>';
      else if (section === 'effects') content = typeof hfmV110StaffEffectsView === 'function' ? hfmV110StaffEffectsView() : '<div class="infoBox">Auswirkungen konnten nicht geladen werden.</div>';
      else content = typeof hfmV110StaffOverview === 'function' ? hfmV110StaffOverview() : '<div class="infoBox">Mitarbeiterstab konnte nicht geladen werden.</div>';
    } catch(e) { console.warn('v197 staff view fallback', e); content = '<div class="infoBox">Die Mitarbeiteransicht wurde nach einem Fehler sicher neu geladen. Der Mitarbeitermarkt bleibt erreichbar.</div>'; state.staffSection = 'overview'; }
    var sub = staffButton('overview','Stab') + staffButton('market','Mitarbeitermarkt') + staffButton('contracts','Verträge') + (typeof hfmV120StaffProgressView === 'function' ? staffButton('progress','Fortschritt') : '') + (typeof hfmV121StaffInternsView === 'function' ? staffButton('interns','Praktikanten') : '') + staffButton('effects','Auswirkungen');
    return '<section class="teamSubnav"><div class="chips">'+sub+'</div></section><section class="panel"><p class="eyebrow">Mitarbeiter</p><h2>Trainerstab, Medizin, Scouting & Verwaltung</h2>'+content+'</section>' + (typeof hfmV110StaffProfileModal === 'function' ? hfmV110StaffProfileModal() : '') + (typeof hfmV110StaffNegotiationModal === 'function' ? hfmV110StaffNegotiationModal() : '') + (typeof hfmV120StaffCourseDialogHtml === 'function' ? hfmV120StaffCourseDialogHtml() : '') + (typeof hfmV120StaffLevelUpModal === 'function' ? hfmV120StaffLevelUpModal() : '');
  };
  window.staff = staffView;

  /* Transferliste aktiv nachziehen: Verhandlungen ohne Scoutbericht erlauben. */
  function findTransferCandidates(){
    try { if (typeof hfmV108EnsureTransferState === 'function') hfmV108EnsureTransferState(); } catch(e) {}
    var list = [];
    try { if (typeof hfmV108TransferListCandidates === 'function') list = hfmV108TransferListCandidates(); } catch(e) {}
    if (!Array.isArray(list) || !list.length) {
      try { if (typeof allExternalPlayers === 'function') list = allExternalPlayers().filter(function(p){ return p && (p.transferListed || p.listed || p.onTransferList); }); } catch(e) {}
    }
    return Array.isArray(list) ? list : [];
  }
  if (typeof transferListView === 'function') {
    window.transferListView = transferListView = function(){
      var list = findTransferCandidates();
      var rows = list.map(function(p){
        var club = js(p.club || p.clubName || ''); var league = num(p.leagueIndex, 0); var pid = js(p.id);
        var price = num(p.askingPrice || p.price || p.transferPrice || p.marketValue, 0);
        return '<tr><td><button type="button" class="linkButton" onclick="openPlayerProfile(\''+pid+'\', \''+club+'\', '+league+')">'+esc(p.name)+'</button></td><td>'+num(p.age)+'</td><td>'+esc(typeof positionText === 'function' ? positionText(p) : (p.pos || p.position || ''))+'</td><td>'+num(p.strength)+'</td><td>'+money(p.marketValue || 0)+'</td><td>'+money(price)+'</td><td>'+esc(p.club || '')+'</td><td>'+esc(p.nationality || p.country || '')+'</td><td>Scoutbericht optional</td><td><button type="button" class="primary" onclick="return hfmV108OpenTransferNegotiation(\''+pid+'\', \''+club+'\', '+league+', { allowUngscouted:true, allowUnscouted:true, fromTransferList:true })">Kaufen</button></td></tr>';
      }).join('');
      return '<section class="panel widePanel"><p class="eyebrow">Transfers · Transferliste</p><h2>Transferliste</h2><div class="infoBox">Du kannst Spieler direkt kaufen/verhandeln, auch ohne Scoutbericht. Das Risiko einer Fehleinschätzung liegt dann bei dir.</div><div class="tableWrap"><table><thead><tr><th>Name</th><th>Alter</th><th>Position</th><th>Stärke</th><th>Marktwert</th><th>Preis</th><th>Verein</th><th>Nationalität</th><th>Info</th><th>Aktion</th></tr></thead><tbody>'+(rows || '<tr><td colspan="10">Aktuell keine Spieler auf der Transferliste.</td></tr>')+'</tbody></table></div></section>';
    };
  }

  window.hfmV197DiscardAgentPlayer = hfmV197DiscardAgentPlayer = function(resultId, playerId){
    state.playerAgentSearchResults = (state.playerAgentSearchResults || []).map(function(r){ if (String(r.id) !== String(resultId)) return r; return Object.assign({}, r, { players:(r.players || []).filter(function(p){ return String(p.id) !== String(playerId); }) }); }).filter(function(r){ return (r.players || []).length > 0; });
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave(); safeRender(); return false;
  };
  if (typeof hfmV119AgentSearchResultRow === 'function') {
    window.hfmV119AgentSearchResultRow = hfmV119AgentSearchResultRow = function(p, result){
      var club = js(p.club || ''); var league = num(p.leagueIndex, 0); var pid = js(p.id); var rid = js(result && result.id); var fee = num(p.marketValue || 0);
      return '<div class="player"><div class="playerTop"><strong class="clickableName" onclick="openPlayerProfile(\''+pid+'\', \''+club+'\', '+league+')">'+esc(p.name)+'</strong><span>'+esc(typeof positionText === 'function' ? positionText(p) : (p.pos || ''))+' · '+num(p.age)+' Jahre</span></div><div class="meta"><span>'+esc(p.club || '')+'</span><span>Stärke '+num(p.strength)+'</span><span>Marktwert ca. '+money(fee)+'</span><span>Provision '+num(result && result.commission)+'%</span></div><div class="playerActions"><button type="button" class="ghost" onclick="openPlayerProfile(\''+pid+'\', \''+club+'\', '+league+')">Spieler öffnen</button><button type="button" class="primary" onclick="return hfmV119BuyAgentRecommendedPlayer(\''+rid+'\', \''+pid+'\', \''+club+'\', '+league+')">Spieler kaufen</button><button type="button" class="ghost dangerButton" onclick="return hfmV197DiscardAgentPlayer(\''+rid+'\', \''+pid+'\')">Spieler verwerfen</button></div></div>';
    };
  }

  var css = document.createElement('style');
  css.textContent = '.hfmV197StaffSearch label span{display:block;margin-bottom:4px;color:var(--muted);font-size:12px}.hfmV197StaffCard .playerBottom{display:flex;flex-wrap:wrap;gap:6px}.hfmV197StaffCard .playerBottom span{background:rgba(255,255,255,.07);border-radius:999px;padding:4px 8px;font-size:12px}.dangerButton{border-color:rgba(255,120,120,.35)!important;color:#ffb3b3!important}';
  try { document.head.appendChild(css); } catch(e) {}

  try { hfmV110NormalizeStaff(); } catch(e) {}
  try { if (stateOk() && state.tab === 'staff') safeRender(); } catch(e) {}
})();

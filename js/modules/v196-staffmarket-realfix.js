(function(){
  if (typeof window === 'undefined' || typeof state === 'undefined') return;

  function esc(value){
    if (typeof hfmV68Html === 'function') return hfmV68Html(value);
    if (typeof html === 'function') return html(value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function js(value){ return String(value == null ? '' : value).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
  function money(value){ try { return typeof euro === 'function' ? euro(value) : String(Math.round(Number(value || 0))) + ' €'; } catch(e){ return String(value || 0) + ' €'; } }
  function num(value, fallback){ var n = Number(value); return Number.isFinite(n) ? n : (fallback || 0); }
  function staffRoles(){ try { return typeof hfmV110RequiredStaffRoles === 'function' ? hfmV110RequiredStaffRoles() : Object.keys(HFM_V110_STAFF_ROLES || {}); } catch(e){ return ['assistant','goalkeeper','fitness','youth','doctor','physio','scout','director','marketing','press','stadium']; } }
  function roleDef(role){ try { return (HFM_V110_STAFF_ROLES && HFM_V110_STAFF_ROLES[role]) || HFM_V110_STAFF_ROLES.assistant || {}; } catch(e){ return {}; } }
  function roleLabel(role){ try { return typeof hfmV110StaffRoleLabel === 'function' ? hfmV110StaffRoleLabel(role) : (roleDef(role).label || role || 'Mitarbeiter'); } catch(e){ return role || 'Mitarbeiter'; } }
  function attrLabel(attr){ try { return typeof hfmV110StaffAttrLabel === 'function' ? hfmV110StaffAttrLabel(attr) : ((HFM_V110_STAFF_ATTR_LABELS || {})[attr] || attr); } catch(e){ return attr || 'Fähigkeit'; } }
  function traitLabel(trait){ try { return typeof hfmV110StaffTraitLabel === 'function' ? hfmV110StaffTraitLabel(trait) : trait || 'Ausgeglichen'; } catch(e){ return trait || 'Ausgeglichen'; } }
  function strength(s){ try { return typeof hfmV110StaffStrength === 'function' ? hfmV110StaffStrength(s) : num(s && s.strength, 50); } catch(e){ return num(s && s.strength, 50); } }
  function marketValue(s){ try { return typeof hfmV110StaffMarketValue === 'function' ? hfmV110StaffMarketValue(s) : (strength(s) * 1800); } catch(e){ return strength(s) * 1800; } }
  function salaryFor(s){ try { return typeof hfmV110StaffSalary === 'function' ? hfmV110StaffSalary(strength(s), s.role, typeof ownCombinedImage === 'function' ? ownCombinedImage() : 55) : num(s.salary, 1500); } catch(e){ return num(s.salary, 1500); } }
  function allAttrs(){
    var set = {};
    staffRoles().forEach(function(role){ (roleDef(role).slots || []).forEach(function(a){ set[a] = true; }); });
    return Object.keys(set).sort(function(a,b){ return attrLabel(a).localeCompare(attrLabel(b)); });
  }
  function allTraits(){
    var set = {};
    (state.staffMarket || []).concat(state.staff || []).forEach(function(s){ if (s && s.trait) set[s.trait] = true; });
    try { Object.keys(HFM_V110_STAFF_TRAITS || {}).forEach(function(t){ set[t] = true; }); } catch(e) {}
    return Object.keys(set).sort(function(a,b){ return traitLabel(a).localeCompare(traitLabel(b)); });
  }

  function normalizeOne(s, own){
    if (!s || typeof s !== 'object') return null;
    if (!s.role || staffRoles().indexOf(s.role) < 0) s.role = 'assistant';
    if (!s.name) s.name = 'Mitarbeiter';
    if (!s.attributes || typeof s.attributes !== 'object') s.attributes = {};
    (roleDef(s.role).slots || []).forEach(function(attr){
      if (!Number.isFinite(Number(s.attributes[attr]))) s.attributes[attr] = Math.max(20, Math.min(85, strength(s) || 50));
    });
    s.strength = strength(s);
    s.age = num(s.age, own ? 42 : 38);
    s.potential = Math.max(1, Math.min(5, num(s.potential, 3)));
    if (!s.trait) s.trait = 'BALANCED';
    s.salary = num(s.salary, salaryFor(s));
    s.contractYears = num(s.contractYears, own ? 2 : 0);
    s.freeAgent = !own;
    if (own) {
      try { if (typeof ownClubName === 'function') s.club = ownClubName(); } catch(e) {}
      try { if (typeof OWN_LEAGUE_INDEX !== 'undefined') s.leagueIndex = OWN_LEAGUE_INDEX; } catch(e) {}
    } else {
      s.club = null;
      s.leagueIndex = null;
      s.marketValue = marketValue(s);
    }
    return s;
  }

  window.hfmV110NormalizeStaff = hfmV110NormalizeStaff = function(){
    try {
      if (!Array.isArray(state.staff)) state.staff = [];
      if (!Array.isArray(state.staffMarket)) state.staffMarket = [];
      if (!state.clubStaffCache || typeof state.clubStaffCache !== 'object') state.clubStaffCache = {};
      if (!state.staffSection) state.staffSection = 'overview';
      if (typeof hfmV110EnsureStaffState === 'function') {
        try { hfmV110EnsureStaffState(); } catch(e){ console.warn('v196 ensure staff state fallback', e); }
      }
      if (typeof hfmV110EnsureStaffMarket === 'function') {
        try { hfmV110EnsureStaffMarket(); } catch(e){ console.warn('v196 ensure staff market fallback', e); }
      }
      state.staff = (state.staff || []).filter(Boolean).map(function(s){ return normalizeOne(s, true); }).filter(Boolean);
      state.staffMarket = (state.staffMarket || []).filter(Boolean).map(function(s){ return normalizeOne(s, false); }).filter(Boolean);
      return true;
    } catch(err) {
      console.warn('v196 hfmV110NormalizeStaff failed', err);
      if (!Array.isArray(state.staff)) state.staff = [];
      if (!Array.isArray(state.staffMarket)) state.staffMarket = [];
      if (!state.staffSection) state.staffSection = 'overview';
      return false;
    }
  };

  function defaultSearch(){
    return { name:'', role:'all', trait:'all', minAge:'', maxAge:'', minStrength:'', maxStrength:'', minSalary:'', maxSalary:'', attr:'all', minAttr:'' };
  }
  function ensureSearch(){
    if (!state.staffMarketDraft || typeof state.staffMarketDraft !== 'object') state.staffMarketDraft = defaultSearch();
    state.staffMarketDraft = Object.assign(defaultSearch(), state.staffMarketDraft || {});
    if (!state.staffMarketApplied || typeof state.staffMarketApplied !== 'object') state.staffMarketApplied = null;
    if (typeof state.staffMarketHasSearched !== 'boolean') state.staffMarketHasSearched = false;
  }

  window.hfmV196SetStaffSearch = hfmV196SetStaffSearch = function(field, value){
    ensureSearch();
    state.staffMarketDraft[field] = value == null ? '' : String(value);
    if (field === 'role') state.staffMarketRole = state.staffMarketDraft.role || 'all';
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    return false;
  };
  window.hfmV196RunStaffSearch = hfmV196RunStaffSearch = function(){
    hfmV110NormalizeStaff();
    ensureSearch();
    state.staffMarketApplied = Object.assign(defaultSearch(), state.staffMarketDraft || {});
    state.staffMarketHasSearched = true;
    state.staffMarketRole = state.staffMarketApplied.role || 'all';
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    if (typeof render === 'function') render();
    return false;
  };
  window.hfmV196ResetStaffSearch = hfmV196ResetStaffSearch = function(){
    state.staffMarketDraft = defaultSearch();
    state.staffMarketApplied = null;
    state.staffMarketHasSearched = false;
    state.staffMarketRole = 'all';
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    if (typeof render === 'function') render();
    return false;
  };

  function staffCard(s){
    var safeId = js(s.id);
    var attrs = (roleDef(s.role).slots || []).map(function(attr){ return '<span>' + esc(attrLabel(attr)) + ' ' + num(s.attributes && s.attributes[attr], 0) + '</span>'; }).join('');
    var action = '<button type="button" class="primary" onclick="return hfmV110StartStaffNegotiation(\'' + safeId + '\')">Mitarbeiter verpflichten</button>';
    return '<div class="player hfmV196StaffCard">' +
      '<div class="playerTop"><strong><button type="button" class="linkButton" onclick="return hfmV110OpenStaffProfile(\'' + safeId + '\')">' + esc(s.name) + '</button></strong><span>' + roleLabel(s.role) + ' · ' + num(s.age,0) + ' Jahre</span></div>' +
      '<div class="meta"><span>Stärke ' + strength(s) + '</span><span>Potenzial ' + (typeof hfmV110PotentialStars === 'function' ? hfmV110PotentialStars(s.potential) : num(s.potential,3)) + '</span><span>' + esc(traitLabel(s.trait)) + '</span><span>Gehalt ' + money(s.salary || 0) + '</span></div>' +
      '<div class="playerBottom">' + attrs + '</div>' +
      '<div class="playerActions">' + action + '</div>' +
    '</div>';
  }

  function filterStaff(list, filter){
    var f = Object.assign(defaultSearch(), filter || {});
    var name = String(f.name || '').trim().toLowerCase();
    return (list || []).filter(function(s){
      var st = strength(s), age = num(s.age), salary = num(s.salary);
      if (name && String(s.name || '').toLowerCase().indexOf(name) < 0) return false;
      if (f.role && f.role !== 'all' && s.role !== f.role) return false;
      if (f.trait && f.trait !== 'all' && s.trait !== f.trait) return false;
      if (f.minAge !== '' && age < num(f.minAge)) return false;
      if (f.maxAge !== '' && age > num(f.maxAge)) return false;
      if (f.minStrength !== '' && st < num(f.minStrength)) return false;
      if (f.maxStrength !== '' && st > num(f.maxStrength)) return false;
      if (f.minSalary !== '' && salary < num(f.minSalary)) return false;
      if (f.maxSalary !== '' && salary > num(f.maxSalary)) return false;
      if (f.attr && f.attr !== 'all' && f.minAttr !== '') {
        var value = num(s.attributes && s.attributes[f.attr]);
        if (value < num(f.minAttr)) return false;
      }
      return true;
    }).sort(function(a,b){ return strength(b) - strength(a) || num(a.salary) - num(b.salary) || String(a.name).localeCompare(String(b.name)); });
  }

  window.hfmV110StaffMarketView = hfmV110StaffMarketView = function(){
    hfmV110NormalizeStaff();
    ensureSearch();
    var d = Object.assign(defaultSearch(), state.staffMarketDraft || {});
    var roleOptions = ['all'].concat(staffRoles()).map(function(role){ return '<option value="' + esc(role) + '" ' + (d.role === role ? 'selected' : '') + '>' + (role === 'all' ? 'Alle Rollen' : esc(roleLabel(role))) + '</option>'; }).join('');
    var attrOptions = ['all'].concat(allAttrs()).map(function(attr){ return '<option value="' + esc(attr) + '" ' + (d.attr === attr ? 'selected' : '') + '>' + (attr === 'all' ? 'Keine einzelne Fähigkeit' : esc(attrLabel(attr))) + '</option>'; }).join('');
    var traitOptions = ['all'].concat(allTraits()).map(function(trait){ return '<option value="' + esc(trait) + '" ' + (d.trait === trait ? 'selected' : '') + '>' + (trait === 'all' ? 'Alle Charaktere' : esc(traitLabel(trait))) + '</option>'; }).join('');
    var results = '<div class="infoBox">Stelle die Suchfilter ein und klicke auf <strong>Jetzt suchen</strong>. Die Suche funktioniert wie bei der Spielersuche, aber mit Mitarbeiterrollen und Mitarbeiterfähigkeiten.</div>';
    if (state.staffMarketHasSearched && state.staffMarketApplied) {
      var list = filterStaff(state.staffMarket || [], state.staffMarketApplied);
      results = list.map(staffCard).join('') || '<div class="infoBox">Keine passenden Mitarbeiter gefunden. Passe die Filter an oder setze die Suche zurück.</div>';
    }
    return '<div class="infoBox">Arbeitslose Mitarbeiter können wie Spieler verpflichtet werden. Entscheidend sind Rolle, Stärke, Alter, Gehalt und die rollenrelevanten Fähigkeiten.</div>' +
      '<div class="formGrid hfmV196StaffSearch">' +
        '<label><span>Name</span><input type="text" value="' + esc(d.name) + '" placeholder="Name suchen" oninput="hfmV196SetStaffSearch(\'name\', this.value)"></label>' +
        '<label><span>Rolle</span><select onchange="hfmV196SetStaffSearch(\'role\', this.value)">' + roleOptions + '</select></label>' +
        '<label><span>Charakter</span><select onchange="hfmV196SetStaffSearch(\'trait\', this.value)">' + traitOptions + '</select></label>' +
        '<label><span>Alter von</span><input type="number" value="' + esc(d.minAge) + '" placeholder="z.B. 25" oninput="hfmV196SetStaffSearch(\'minAge\', this.value)"></label>' +
        '<label><span>Alter bis</span><input type="number" value="' + esc(d.maxAge) + '" placeholder="z.B. 55" oninput="hfmV196SetStaffSearch(\'maxAge\', this.value)"></label>' +
        '<label><span>Stärke von</span><input type="number" value="' + esc(d.minStrength) + '" placeholder="z.B. 60" oninput="hfmV196SetStaffSearch(\'minStrength\', this.value)"></label>' +
        '<label><span>Stärke bis</span><input type="number" value="' + esc(d.maxStrength) + '" placeholder="z.B. 90" oninput="hfmV196SetStaffSearch(\'maxStrength\', this.value)"></label>' +
        '<label><span>Gehalt von</span><input type="number" value="' + esc(d.minSalary) + '" placeholder="€ / Monat" step="100" oninput="hfmV196SetStaffSearch(\'minSalary\', this.value)"></label>' +
        '<label><span>Gehalt bis</span><input type="number" value="' + esc(d.maxSalary) + '" placeholder="€ / Monat" step="100" oninput="hfmV196SetStaffSearch(\'maxSalary\', this.value)"></label>' +
        '<label><span>Spezialfähigkeit</span><select onchange="hfmV196SetStaffSearch(\'attr\', this.value)">' + attrOptions + '</select></label>' +
        '<label><span>Mindestwert Fähigkeit</span><input type="number" value="' + esc(d.minAttr) + '" placeholder="z.B. 70" oninput="hfmV196SetStaffSearch(\'minAttr\', this.value)"></label>' +
      '</div>' +
      '<div class="playerActions"><button type="button" class="primary" onclick="return hfmV196RunStaffSearch()">Jetzt suchen</button><button type="button" class="ghost" onclick="return hfmV196ResetStaffSearch()">Filter zurücksetzen</button></div>' +
      '<div class="playerList">' + results + '</div>';
  };

  window.staffView = staffView = function(){
    hfmV110NormalizeStaff();
    var section = state.staffSection || 'overview';
    var content = '';
    try {
      if (section === 'market') content = hfmV110StaffMarketView();
      else if (section === 'contracts') content = typeof hfmV110StaffContractsView === 'function' ? hfmV110StaffContractsView() : '<div class="infoBox">Verträge konnten nicht geladen werden.</div>';
      else if (section === 'progress') content = typeof hfmV120StaffProgressView === 'function' ? hfmV120StaffProgressView() : '<div class="infoBox">Fortschritt konnte nicht geladen werden.</div>';
      else if (section === 'interns') content = typeof hfmV121StaffInternsView === 'function' ? hfmV121StaffInternsView() : '<div class="infoBox">Praktikanten konnten nicht geladen werden.</div>';
      else if (section === 'effects') content = typeof hfmV110StaffEffectsView === 'function' ? hfmV110StaffEffectsView() : '<div class="infoBox">Auswirkungen konnten nicht geladen werden.</div>';
      else content = typeof hfmV110StaffOverview === 'function' ? hfmV110StaffOverview() : '<div class="infoBox">Mitarbeiterstab konnte nicht geladen werden.</div>';
    } catch(err) {
      console.warn('v196 staff section fallback', err);
      content = '<div class="infoBox">Diese Mitarbeiteransicht wurde nach einem Fehler sicher neu geladen. Bitte wähle den gewünschten Unterpunkt erneut.</div>';
      state.staffSection = 'overview';
    }
    var sub = typeof hfmV110StaffSubButton === 'function'
      ? hfmV110StaffSubButton('overview','Stab') + hfmV110StaffSubButton('market','Mitarbeitermarkt') + hfmV110StaffSubButton('contracts','Verträge') + (typeof hfmV120StaffProgressView === 'function' ? hfmV110StaffSubButton('progress','Fortschritt') : '') + (typeof hfmV121StaffInternsView === 'function' ? hfmV110StaffSubButton('interns','Praktikanten') : '') + hfmV110StaffSubButton('effects','Auswirkungen')
      : '';
    return '<section class="teamSubnav"><div class="chips">' + sub + '</div></section><section class="panel"><p class="eyebrow">Mitarbeiter</p><h2>Trainerstab, Medizin, Scouting & Verwaltung</h2>' + content + '</section>' + (typeof hfmV110StaffProfileModal === 'function' ? hfmV110StaffProfileModal() : '') + (typeof hfmV110StaffNegotiationModal === 'function' ? hfmV110StaffNegotiationModal() : '') + (typeof hfmV120StaffCourseDialogHtml === 'function' ? hfmV120StaffCourseDialogHtml() : '') + (typeof hfmV120StaffLevelUpModal === 'function' ? hfmV120StaffLevelUpModal() : '');
  };
  window.staff = staff = staffView;

  window.hfmV114FindStaffForVacancy = hfmV114FindStaffForVacancy = function(role){
    state.staffSection = 'market';
    state.staffMarketDraft = Object.assign(defaultSearch(), { role: role || 'all' });
    state.staffMarketApplied = null;
    state.staffMarketHasSearched = false;
    state.staffMarketRole = role || 'all';
    state.staffProfileId = null;
    state.staffNegotiation = null;
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    if (typeof render === 'function') render();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
    return false;
  };

  var css = document.createElement('style');
  css.textContent = '.hfmV196StaffSearch label span{display:block;margin-bottom:4px;color:var(--muted);font-size:12px}.hfmV196StaffCard .playerBottom{display:flex;flex-wrap:wrap;gap:6px}.hfmV196StaffCard .playerBottom span{background:rgba(255,255,255,.07);border-radius:999px;padding:4px 8px;font-size:12px}';
  try { document.head.appendChild(css); } catch(e) {}

  try { hfmV110NormalizeStaff(); } catch(e) {}
  try { if (state.tab === 'staff' && typeof render === 'function') render(); } catch(e) {}
})();

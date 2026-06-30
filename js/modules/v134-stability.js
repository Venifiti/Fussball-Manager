/* v135 Struktur- und Stabilitaetsmodul
   Ziel: keine neuen Gameplay-Systeme, sondern die zuletzt fehlerhaften Views wirklich sichtbar, erreichbar und klickbar machen.
   Dieses Modul laeuft nach app-core.js und ist absichtlich als eigener Layer getrennt. */
(function(){
  'use strict';

  function n(v, fallback){
    const x = Number(v);
    return Number.isFinite(x) ? x : (fallback || 0);
  }
  function esc(v){
    try {
      if (typeof window.hfmV68Html === 'function') return window.hfmV68Html(v);
    } catch(e) {}
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function money(v){
    try { if (typeof window.euro === 'function') return window.euro(n(v,0)); } catch(e) {}
    return Math.round(n(v,0)).toLocaleString('de-AT') + ' EUR';
  }
  function currentMain(){ return document.querySelector('#app main'); }

  function ensureInfrastructure(){
    if (typeof state === 'undefined' || !state) return;
    state.facilities = state.facilities && typeof state.facilities === 'object' ? state.facilities : {};
    function facility(key, data){
      const old = state.facilities[key] && typeof state.facilities[key] === 'object' ? state.facilities[key] : {};
      state.facilities[key] = Object.assign({}, data, old);
      state.facilities[key].level = Math.max(0, n(state.facilities[key].level, data.level || 1));
      state.facilities[key].maxLevel = n(state.facilities[key].maxLevel, data.maxLevel || 15);
      if (typeof state.facilities[key].construction === 'undefined') state.facilities[key].construction = null;
    }
    facility('stadium', { name:'Stadion', icon:'🏟️', level:1, maxLevel:15, capacity:12000 });
    facility('training', { name:'Trainingszentrum', icon:'💪', level:1, maxLevel:15 });
    facility('academy', { name:'Akademie', icon:'🌱', level:1, maxLevel:15 });
    facility('youthCenter', { name:'Jugendzentrum', icon:'👶', level:1, maxLevel:15 });
    facility('medical', { name:'Medizin', icon:'🩺', level:1, maxLevel:15 });
    facility('scoutSystem', { name:'Scoutingsystem', icon:'🔭', level:1, maxLevel:15 });
    facility('office', { name:'Bürogebäude', icon:'🏢', level:1, maxLevel:15 });

    if (!state.vipArea || typeof state.vipArea !== 'object') state.vipArea = {};
    state.vipArea.level = Math.max(0, Math.min(5, n(state.vipArea.level, 0)));
    state.vipArea.maxLevel = 5;
    if (!Array.isArray(state.vipArea.contracts)) state.vipArea.contracts = [];
    if (!Array.isArray(state.vipArea.offers)) state.vipArea.offers = [];
    if (!Array.isArray(state.vipArea.history)) state.vipArea.history = [];
    if (typeof state.vipArea.construction === 'undefined') state.vipArea.construction = null;
    if (typeof state.vipArea.tender === 'undefined') state.vipArea.tender = null;
  }
  window.hfmV134EnsureInfrastructure = ensureInfrastructure;

  function officeBonus(level){ return Math.max(0, Math.round((n(level,1)-1) * 3)); }
  function officeCost(){ const f = state.facilities.office || { level:1 }; return Math.round((140000 + Math.pow(n(f.level,1), 1.45) * 65000) / 1000) * 1000; }
  function officeWeeks(){ const f = state.facilities.office || { level:1 }; return Math.max(6, 8 + n(f.level,1)); }
  function vipSlots(){ const lvl = n((state.vipArea||{}).level,0); return [0,1,2,4,7,10][Math.min(5, Math.max(0,lvl))] || 0; }
  function vipFree(){ return Math.max(0, vipSlots() - ((state.vipArea.contracts || []).length)); }
  function vipCost(){ const lvl = n((state.vipArea||{}).level,0); return Math.round((650000 + Math.pow(lvl+1, 1.7) * 420000) / 1000) * 1000; }
  function vipWeeks(){ return 12 + n((state.vipArea||{}).level,0) * 5; }
  function durationLabel(w){ if (w >= 100) return '2 Saisonen'; if (w >= 50) return 'ganze Saison'; return 'halbe Saison'; }

  window.hfmV134StartOfficeUpgrade = function(){
    ensureInfrastructure();
    const f = state.facilities.office;
    if (f.construction) { alert('Das Bürogebäude wird bereits ausgebaut.'); return false; }
    if (n(f.level,1) >= n(f.maxLevel,15)) { alert('Das Bürogebäude ist bereits maximal ausgebaut.'); return false; }
    const cost = officeCost();
    if (n(state.money,0) < cost) { alert('Nicht genug Geld für das Bürogebäude. Kosten: ' + money(cost)); return false; }
    if (!confirm('Bürogebäude ausbauen?\n\nKosten: ' + money(cost) + '\nDauer: ' + officeWeeks() + ' Wochen')) return false;
    state.money = n(state.money,0) - cost;
    f.construction = { targetLevel:n(f.level,1)+1, remainingWeeks:officeWeeks(), totalWeeks:officeWeeks(), cost:cost };
    if (typeof window.saveGame === 'function') { try { window.saveGame(); } catch(e) {} }
    render();
    return false;
  };

  window.hfmV134StartVipUpgrade = function(){
    ensureInfrastructure();
    const v = state.vipArea;
    if (v.construction) { alert('Der VIP-Bereich wird bereits ausgebaut.'); return false; }
    if (n(v.level,0) >= 5) { alert('Der VIP-Bereich ist bereits maximal ausgebaut.'); return false; }
    const cost = vipCost();
    if (n(state.money,0) < cost) { alert('Nicht genug Geld für den VIP-Bereich. Kosten: ' + money(cost)); return false; }
    if (!confirm((n(v.level,0) <= 0 ? 'VIP-Bereich bauen?' : 'VIP-Bereich weiter ausbauen?') + '\n\nKosten: ' + money(cost) + '\nDauer: ' + vipWeeks() + ' Wochen')) return false;
    state.money = n(state.money,0) - cost;
    v.construction = { targetLevel:n(v.level,0)+1, remainingWeeks:vipWeeks(), totalWeeks:vipWeeks(), cost:cost };
    render();
    return false;
  };

  window.hfmV134StartVipTender = function(){
    ensureInfrastructure();
    const v = state.vipArea;
    if (n(v.level,0) <= 0) { alert('Du musst den VIP-Bereich zuerst bauen.'); return false; }
    if (v.tender) { alert('Es läuft bereits eine VIP-Ausschreibung.'); return false; }
    if (vipFree() <= 0) { alert('Alle VIP-Plätze sind bereits vermietet.'); return false; }
    v.tender = { remainingWeeks:2 + Math.floor(Math.random()*2), totalWeeks:3 };
    render();
    return false;
  };

  window.hfmV134AcceptVipOffer = function(id){
    ensureInfrastructure();
    const v = state.vipArea;
    const offer = (v.offers || []).find(function(o){ return String(o.id) === String(id); });
    if (!offer) return false;
    if (vipFree() <= 0) { alert('Keine freien VIP-Plätze mehr.'); return false; }
    v.contracts.push({ company:offer.company, durationWeeks:n(offer.durationWeeks,52), remainingWeeks:n(offer.durationWeeks,52), amount:n(offer.amount,0), weeklyValue:Math.round(n(offer.amount,0)/Math.max(1,n(offer.durationWeeks,52))) });
    state.money = n(state.money,0) + n(offer.amount,0);
    v.offers = (v.offers || []).filter(function(o){ return String(o.id) !== String(id); });
    render();
    return false;
  };
  window.hfmV134DeclineVipOffer = function(id){
    ensureInfrastructure();
    state.vipArea.offers = (state.vipArea.offers || []).filter(function(o){ return String(o.id) !== String(id); });
    render();
    return false;
  };

  function officePanel(){
    ensureInfrastructure();
    const f = state.facilities.office;
    const busy = !!f.construction;
    const level = n(f.level,1);
    const progress = busy ? Math.round(((n(f.construction.totalWeeks,1)-n(f.construction.remainingWeeks,0))/Math.max(1,n(f.construction.totalWeeks,1)))*100) : 0;
    return '<section class="panel hfmV134OfficePanel">' +
      '<p class="eyebrow">Stadion · Bürogebäude</p><h2>🏢 Bürogebäude</h2>' +
      '<div class="grid compact"><article class="card"><p>Stufe</p><h2>'+level+'/15</h2><span>eigener Infrastrukturpunkt</span></article><article class="card"><p>Effekt</p><h2>+'+officeBonus(level)+'%</h2><span>Mitarbeiterentwicklung</span></article><article class="card"><p>Nächster Ausbau</p><h2>'+(level>=15?'Maximum':money(officeCost()))+'</h2><span>'+(level>=15?'fertig':officeWeeks()+' Wochen')+'</span></article></div>' +
      '<div class="infoBox">Das Bürogebäude steht als eigener Menüpunkt rechts neben dem Scoutingsystem. Es beschleunigt Mitarbeiterentwicklung, Lehrgänge und Praktikantenplätze.</div>' +
      (busy ? '<div class="buildBox"><b>Ausbau läuft</b><p>Level '+esc(f.construction.targetLevel)+' wird gebaut. Rest: '+esc(f.construction.remainingWeeks)+' Wochen.</p><div class="bar"><div style="width:'+progress+'%"></div></div></div>' : '') +
      '<button type="button" class="primary full" '+(level>=15 || busy ? 'disabled' : '')+' onclick="return hfmV134StartOfficeUpgrade()">Bürogebäude ausbauen</button>' +
      '</section>';
  }
  function vipPanel(){
    ensureInfrastructure();
    const v = state.vipArea;
    const lvl = n(v.level,0);
    const contracts = (v.contracts || []).map(function(c){
      return '<div class="player"><div class="playerTop"><strong>'+esc(c.company)+'</strong><span>'+durationLabel(n(c.durationWeeks,52))+'</span></div><div class="meta"><span>'+money(c.amount)+'</span><span>'+money(c.weeklyValue)+'/Woche</span><span>Rest '+esc(c.remainingWeeks)+' Wochen</span></div></div>';
    }).join('') || '<div class="infoBox">Noch kein VIP-Platz vermietet.</div>';
    const offers = (v.offers || []).map(function(o){
      return '<div class="player"><div class="playerTop"><strong>'+esc(o.company)+'</strong><span>'+durationLabel(n(o.durationWeeks,52))+'</span></div><div class="meta"><span>Gebot '+money(o.amount)+'</span><span>'+money(Math.round(n(o.amount,0)/Math.max(1,n(o.durationWeeks,52))))+'/Woche</span></div><div class="playerActions"><button type="button" class="primary" onclick="return hfmV134AcceptVipOffer(\''+esc(o.id)+'\')">Annehmen</button><button type="button" class="ghost" onclick="return hfmV134DeclineVipOffer(\''+esc(o.id)+'\')">Ablehnen</button></div></div>';
    }).join('');
    return '<section class="panel hfmV134VipPanel">' +
      '<p class="eyebrow">Stadion · VIP-Bereich</p><h2>💼 VIP-Bereich</h2>' +
      '<div class="grid compact"><article class="card"><p>VIP-Stufe</p><h2>'+lvl+'/5</h2><span>separat vom Stadionausbau</span></article><article class="card"><p>Firmenplätze</p><h2>'+((v.contracts||[]).length)+'/'+vipSlots()+'</h2><span>maximal 10</span></article><article class="card"><p>Nächster Ausbau</p><h2>'+(lvl>=5?'Maximum':money(vipCost()))+'</h2><span>'+(lvl>=5?'fertig':vipWeeks()+' Wochen')+'</span></article></div>' +
      '<div class="infoBox">Der VIP-Bereich gehört in den Menüpunkt Stadion, ist aber ein eigener Ausbau. Erst bauen/ausbauen, danach freie VIP-Plätze an Firmen vermieten.</div>' +
      (v.construction ? '<div class="buildBox"><b>VIP-Ausbau läuft</b><p>Level '+esc(v.construction.targetLevel)+' wird gebaut. Rest: '+esc(v.construction.remainingWeeks)+' Wochen.</p></div>' : '') +
      (v.tender ? '<div class="buildBox"><b>VIP-Ausschreibung läuft</b><p>Angebote treffen in '+esc(v.tender.remainingWeeks)+' Wochen ein.</p></div>' : '') +
      '<div class="playerActions"><button type="button" class="primary" '+(lvl>=5 || v.construction ? 'disabled' : '')+' onclick="return hfmV134StartVipUpgrade()">'+(lvl<=0?'VIP-Bereich bauen':'VIP-Bereich weiter ausbauen')+'</button><button type="button" class="ghost" '+(lvl<=0 || v.tender || vipFree()<=0 ? 'disabled' : '')+' onclick="return hfmV134StartVipTender()">VIP-Bereich ausschreiben</button></div>' +
      '<h3>Aktive VIP-Mieter</h3><div class="playerList">'+contracts+'</div>' + (offers ? '<h3>Firmenangebote</h3><div class="playerList">'+offers+'</div>' : '') +
      '</section>';
  }
  window.hfmV134OfficePanel = officePanel;
  window.hfmV134VipPanel = vipPanel;



  function removeLegacyVipHtml(html){
    // Der VIP-Bereich darf nur einmal sichtbar sein: als hfmV134VipPanel.
    // Aeltere Audit-/Fallback-Versionen aus app-core.js koennen in facilityDetail('stadium')
    // noch eigene VIP-Bloecke liefern. Diese werden hier aus dem HTML-Fragment entfernt.
    if (!html) return '';
    const wrap = document.createElement('div');
    wrap.innerHTML = String(html);
    wrap.querySelectorAll('.vipBox, .v128VipBox, .v130VipBox, .v131VipTop, .v132VipBox, .hfmV133VipPanel, .hfmV134VipPanel').forEach(function(el){ el.remove(); });
    return wrap.innerHTML;
  }

  function dedupeVipDom(){
    const main = currentMain();
    if (!main) return;
    const panels = Array.from(main.querySelectorAll('.hfmV134VipPanel, .vipBox, .v128VipBox, .v130VipBox, .v131VipTop, .v132VipBox, .hfmV133VipPanel'));
    if (!panels.length) return;
    let canonical = panels.find(function(el){ return el.classList && el.classList.contains('hfmV134VipPanel'); }) || panels[0];
    panels.forEach(function(el){
      if (el !== canonical) el.remove();
    });
    // Falls durch alte Fallbacks mehrere kanonische Panels entstanden sind, nur das erste behalten.
    const canonicalPanels = Array.from(main.querySelectorAll('.hfmV134VipPanel'));
    canonicalPanels.slice(1).forEach(function(el){ el.remove(); });
  }

  function envChip(id, label){
    const selected = (state.environmentSection || 'overview') === id ? ' selected' : '';
    return '<button type="button" class="chip'+selected+'" onclick="return goTo(\'environment\',\''+id+'\')">'+esc(label)+'</button>';
  }
  function facilityCard(type, icon, label, sub){
    const f = (state.facilities || {})[type] || {};
    const val = type === 'stadium' ? (n(f.capacity,0).toLocaleString('de-AT') + ' Plätze') : ('Level ' + n(f.level,1) + '/' + n(f.maxLevel,15));
    return '<article class="card" style="cursor:pointer" onclick="return goTo(\'environment\',\''+type+'\')"><p>'+icon+' '+esc(label)+'</p><h2>'+esc(val)+'</h2><span>'+esc(sub || '')+'</span></article>';
  }
  function environmentStable(){
    ensureInfrastructure();
    const labels = [ ['overview','Übersicht'], ['stadium','Stadion'], ['training','Trainingszentrum'], ['academy','Akademie'], ['youthCenter','Jugendzentrum'], ['medical','Medizin'], ['scoutSystem','Scoutingsystem'], ['office','Bürogebäude'] ];
    if (!labels.some(function(x){ return x[0] === state.environmentSection; })) state.environmentSection = 'overview';
    let content = '';
    if (state.environmentSection === 'office') content = officePanel();
    else if (state.environmentSection === 'stadium') {
      let base = '';
      try { if (typeof window.facilityDetail === 'function') base = window.facilityDetail('stadium') || ''; } catch(e) { base = ''; }
      base = removeLegacyVipHtml(base);
      content = vipPanel() + base;
    } else if (state.environmentSection === 'overview') {
      content = '<section class="panel"><p class="eyebrow">Stadion/Umfeld</p><h2>Stadion & Infrastruktur</h2><div class="infoBox">Bürogebäude ist ein eigener Menüpunkt rechts neben Scoutingsystem. VIP-Plätze findest du im Menüpunkt Stadion als eigenen Bereich.</div><div class="grid compact">' +
        facilityCard('stadium','🏟️','Stadion / VIP','normaler Stadionausbau + VIP-Bereich') +
        facilityCard('training','💪','Trainingszentrum','Training der Profis') +
        facilityCard('academy','🌱','Akademie','Talententwicklung') +
        facilityCard('youthCenter','👶','Jugendzentrum','Jugendkader') +
        facilityCard('medical','🩺','Medizin','Verletzungen & Regeneration') +
        facilityCard('scoutSystem','🔭','Scoutingsystem','Scouting-Slots & Tempo') +
        facilityCard('office','🏢','Bürogebäude','Mitarbeiterentwicklung') +
        '</div></section>';
    } else {
      try { content = typeof window.facilityDetail === 'function' ? window.facilityDetail(state.environmentSection) : ''; } catch(e) { content = ''; }
      if (!content) content = '<section class="panel"><h2>'+esc(labels.find(function(x){return x[0]===state.environmentSection;})?.[1] || 'Infrastruktur')+'</h2><p>Dieser Bereich konnte nicht geladen werden.</p></section>';
    }
    return '<section class="teamSubnav"><div class="chips hfmV134EnvChips" style="display:flex;flex-wrap:wrap;gap:8px;overflow:visible">' + labels.map(function(x){ return envChip(x[0],x[1]); }).join('') + '</div></section>' + content;
  }
  window.environment = environment = environmentStable;

  // Leihbutton aus Training entfernen, aber in Profil/Vertragsansicht sicher anbieten.
  const baseTraining = typeof window.training === 'function' ? window.training : null;
  window.training = training = function(){
    let html = baseTraining ? baseTraining() : '';
    html = html.replace(/<button[^>]*(toggleLoan|hfmV133ListPlayerForLoan|hfmV134ListPlayerForLoan)[\s\S]*?<\/button>/g, '');
    return html;
  };

  function ownPlayer(id){ return (state.players || []).find(function(p){ return String(p.id) === String(id); }); }
  window.hfmV134ListPlayerForLoan = function(id){
    const p = ownPlayer(id);
    if (!p) return false;
    if (n(p.contractYears,0) <= 1) { alert('Leihe nicht möglich: Der Spieler hat nur noch 1 Jahr Vertrag oder weniger.'); return false; }
    const fee = Math.max(10000, Math.round(n(p.marketValue, n(p.strength,50)*50000) * 0.08 / 10000) * 10000);
    if (!confirm(p.name + ' zur Leihe anbieten?\n\nEr bleibt im Verein, bis ein anderer Verein ein Angebot macht.\nGewünschte Leihgebühr: ' + money(fee))) return false;
    p.transferListed = true; p.onTransferList = true; p.listed = true; p.transferMode = 'loan'; p.askingPrice = fee; p.transferListedWeek = n(state.week,0);
    render();
    return false;
  };
  window.hfmV116OwnPlayerTransferButtons = hfmV116OwnPlayerTransferButtons = function(player){
    if (!player) return '';
    if (player.transferListed || player.onTransferList || player.listed) {
      const remove = typeof window.hfmV116RemoveOwnPlayerFromTransferList === 'function' ? 'hfmV116RemoveOwnPlayerFromTransferList' : 'hfmV134RemoveTransferList';
      return '<button type="button" class="ghost full" onclick="return '+remove+'('+Number(player.id)+')">Spieler von Transferliste nehmen</button><button type="button" class="ghost dangerButton full" onclick="return releasePlayerContract('+Number(player.id)+')">Vertrag auflösen</button>';
    }
    return '<button type="button" class="primary full" onclick="return hfmV116OpenOwnPlayerSaleDialog('+Number(player.id)+')">Spieler verkaufen</button><button type="button" class="ghost full" '+(n(player.contractYears,0)<=1?'disabled':'')+' onclick="return hfmV134ListPlayerForLoan('+Number(player.id)+')">Spieler verleihen</button><button type="button" class="ghost dangerButton full" onclick="return releasePlayerContract('+Number(player.id)+')">Vertrag auflösen</button>';
  };
  window.hfmV134RemoveTransferList = function(id){
    const p = ownPlayer(id); if (!p) return false;
    p.transferListed = false; p.onTransferList = false; p.listed = false; p.transferMode = ''; p.askingPrice = 0;
    render(); return false;
  };

  window.contractView = contractView = function(){
    const dir = state.contractSort || 'asc';
    const players = (state.players || []).slice().sort(function(a,b){ const d = n(a.contractYears)-n(b.contractYears); return dir === 'desc' ? -d : d; });
    const rows = players.map(function(player){
      const listed = !!(player.transferListed || player.onTransferList || player.listed);
      const sell = listed ? '<button type="button" class="ghost" onclick="return hfmV134RemoveTransferList('+Number(player.id)+')">Von Transferliste nehmen</button>' : '<button type="button" class="ghost" onclick="return hfmV116OpenOwnPlayerSaleDialog('+Number(player.id)+')">Spieler verkaufen</button>';
      const loan = listed ? '' : '<button type="button" class="ghost" '+(n(player.contractYears,0)<=1?'disabled':'')+' onclick="return hfmV134ListPlayerForLoan('+Number(player.id)+')">Spieler verleihen</button>';
      const status = typeof window.contractWillingness === 'function' ? window.contractWillingness(player) : { ok:true, reason:'' };
      const bar = typeof window.contractBar === 'function' ? window.contractBar(player.contractYears) : '';
      return '<div class="player contractPlayer"><div class="playerTop clickablePlayer" onclick="openOwnPlayerProfile('+Number(player.id)+')"><strong>'+esc(player.name)+'</strong><span>'+esc(typeof window.positionText === 'function' ? window.positionText(player) : player.pos)+' · '+n(player.age,0)+' Jahre</span></div>'+bar+'<div class="meta"><span>Vertrag: '+n(player.contractYears,0)+' Jahre</span><span>Gehalt '+money(player.salary || 0)+'</span><span>'+(listed ? (player.transferMode === 'loan' ? 'zur Leihe gelistet' : 'auf Transferliste') : 'nicht gelistet')+'</span><span>'+esc(status.reason || '')+'</span></div><div class="playerActions"><button type="button" class="primary" '+(status.ok ? '' : 'disabled')+' onclick="openContractExtension('+Number(player.id)+')">Vertrag verlängern</button>'+sell+loan+'<button type="button" class="ghost dangerButton" onclick="return releasePlayerContract('+Number(player.id)+')">Vertrag auflösen</button></div></div>';
    }).join('') || '<div class="infoBox">Keine Spieler im Kader.</div>';
    return '<section class="panel"><p class="eyebrow">Team · Vertragsansicht</p><h2>Verträge & Laufzeiten</h2><div class="sectionHeader"><h3>Sortierung</h3><select onchange="setContractSort(this.value)"><option value="asc" '+(dir==='asc'?'selected':'')+'>Vertragslänge aufsteigend</option><option value="desc" '+(dir==='desc'?'selected':'')+'>Vertragslänge absteigend</option></select></div><div class="playerList">'+rows+'</div>'+(typeof window.contractNegotiationModal === 'function' ? window.contractNegotiationModal() : '')+(typeof window.playerProfileModal === 'function' ? window.playerProfileModal() : '')+(typeof window.hfmV116OwnPlayerSaleDialogHtml === 'function' ? window.hfmV116OwnPlayerSaleDialogHtml() : '')+'</section>';
  };

  window.hfmV134OpenGeneralRosterPlayer = function(id, youth){
    if (youth && typeof window.hfmV127OpenYouthProfile === 'function') return window.hfmV127OpenYouthProfile(id);
    if (typeof window.openOwnPlayerProfile === 'function') return window.openOwnPlayerProfile(id);
    return false;
  };
  window.hfmV89GeneralRosterDetails = hfmV89GeneralRosterDetails = function(){
    if (!state.generalRosterOpen) return '';
    const pros = state.players || [];
    const youths = state.generalRosterShowYouth === false ? [] : (state.academyPlayers || []);
    const starFn = typeof window.stars === 'function' ? window.stars : function(v){ return '⭐'.repeat(Math.max(1,n(v,1))); };
    const rows = [];
    pros.forEach(function(p,i){ rows.push('<tr class="generalRosterRow" onclick="return hfmV134OpenGeneralRosterPlayer('+Number(p.id)+',false)"><td>'+(i+1)+'</td><td>Profi</td><td><b>'+esc(p.pos)+'</b></td><td>'+esc(p.name)+'</td><td>'+n(p.age,0)+'</td><td><b>'+n(p.strength,0)+'</b></td><td><span class="stars">'+starFn(p.talent||1)+'</span></td><td>'+n(p.contractYears,0)+' J.</td><td>'+money(p.marketValue||0)+'</td></tr>'); });
    youths.forEach(function(p,i){ rows.push('<tr class="generalRosterRow youthRosterRow" onclick="return hfmV134OpenGeneralRosterPlayer('+Number(p.id)+',true)"><td>'+(pros.length+i+1)+'</td><td>Jugend</td><td><b>'+esc(p.pos)+'</b></td><td>'+esc(p.name)+'</td><td>'+n(p.age,0)+'</td><td><b>'+n(p.strength,0)+'</b></td><td><span class="stars">'+starFn(p.talent||1)+'</span></td><td>Jugend</td><td>-</td></tr>'); });
    return '<section class="rosterTablePanel generalRosterPanel"><div class="sectionHeader"><div><h3>Alle Spieler</h3><span>'+pros.length+' Profis · '+youths.length+' Jugendspieler</span></div><button class="chip selected" onclick="return hfmV89ToggleYouthInGeneralRoster()">Jugendspieler anzeigen</button></div><div class="tableWrap rosterTableWrap"><table class="rosterTable rosterTableV89"><thead><tr><th>#</th><th>Status</th><th>Pos.</th><th>Name</th><th>Alter</th><th>Stärke</th><th>Talent</th><th>Vertrag</th><th>Marktwert</th></tr></thead><tbody>'+rows.join('')+'</tbody></table></div><div class="infoBox">Alle Spieler sind anklickbar und öffnen das gewohnte Spielerprofil.</div></section>';
  };

  function postRenderSafety(){
    try {
      if (typeof state === 'undefined' || !state) return;
      if (state.tab === 'environment') {
        ensureInfrastructure();
        const main = currentMain();
        const chips = document.querySelector('.hfmV134EnvChips') || document.querySelector('.teamSubnav .chips');
        if (chips && !chips.textContent.includes('Bürogebäude')) chips.insertAdjacentHTML('beforeend', envChip('office','Bürogebäude'));
        if (state.environmentSection === 'stadium' && main && !main.querySelector('.hfmV134VipPanel')) main.insertAdjacentHTML('afterbegin', vipPanel());
        if (state.environmentSection === 'stadium') dedupeVipDom();
        if (state.environmentSection === 'office' && main && !main.querySelector('.hfmV134OfficePanel')) main.innerHTML = '<section class="teamSubnav"><div class="chips hfmV134EnvChips" style="display:flex;flex-wrap:wrap;gap:8px;overflow:visible">'+['overview','stadium','training','academy','youthCenter','medical','scoutSystem','office'].map(function(id){ const label = {overview:'Übersicht',stadium:'Stadion',training:'Trainingszentrum',academy:'Akademie',youthCenter:'Jugendzentrum',medical:'Medizin',scoutSystem:'Scoutingsystem',office:'Bürogebäude'}[id]; return envChip(id,label); }).join('')+'</div></section>'+officePanel();
      }
    } catch(e) { console.warn('v134 post render safety', e); }
  }

  const baseRender = typeof window.render === 'function' ? window.render : null;
  window.render = render = function(){
    ensureInfrastructure();
    const out = baseRender ? baseRender() : undefined;
    postRenderSafety();
    return out;
  };

  const baseGoTo = typeof window.goTo === 'function' ? window.goTo : null;
  window.goTo = goTo = function(tab, section){
    if (tab === 'environment') { state.tab = 'environment'; state.environmentSection = section || 'overview'; render(); return false; }
    if (baseGoTo) return baseGoTo(tab, section);
    state.tab = tab; render(); return false;
  };
  window.setEnvironmentSection = setEnvironmentSection = function(section){ state.tab = 'environment'; state.environmentSection = section || 'overview'; render(); return false; };

  const baseNextWeek = typeof window.nextWeek === 'function' ? window.nextWeek : null;
  window.nextWeek = nextWeek = function(){
    const result = baseNextWeek ? baseNextWeek() : undefined;
    try {
      ensureInfrastructure();
      const f = state.facilities.office;
      if (f.construction) { f.construction.remainingWeeks = n(f.construction.remainingWeeks,0) - 1; if (f.construction.remainingWeeks <= 0) { f.level = Math.min(15, n(f.construction.targetLevel,n(f.level,1)+1)); f.construction = null; } }
      const v = state.vipArea;
      if (v.construction) { v.construction.remainingWeeks = n(v.construction.remainingWeeks,0) - 1; if (v.construction.remainingWeeks <= 0) { v.level = Math.min(5, n(v.construction.targetLevel,n(v.level,0)+1)); v.construction = null; } }
      if (v.tender) { v.tender.remainingWeeks = n(v.tender.remainingWeeks,0) - 1; if (v.tender.remainingWeeks <= 0) { const names = ['AlpenBank Business Club','NovaTech Solutions','Salzburg Event GmbH','Bergblick Immobilien','Voltix Energy','Nordstern Mobile','Kaiser Logistik','Aurum Consulting','GreenPeak AG','Stadtwerke Premium']; v.offers = []; const count = Math.min(10, Math.max(2, vipFree()+2)); for (let i=0;i<count;i++){ const dur = [26,52,104][Math.floor(Math.random()*3)]; const amount = Math.round((80000 + n(v.level,1)*45000)*(dur/26)*(0.85+Math.random()*0.55)); v.offers.push({ id:'vip134_'+Date.now()+'_'+i, company:names[(i+Math.floor(Math.random()*names.length))%names.length], durationWeeks:dur, amount:amount }); } v.tender = null; } }
      (v.contracts||[]).forEach(function(c){ c.remainingWeeks = n(c.remainingWeeks,0) - 1; });
      v.contracts = (v.contracts||[]).filter(function(c){ return n(c.remainingWeeks,0) > 0; });
    } catch(e) { console.warn('v134 weekly infra', e); }
    return result;
  };

  document.addEventListener('click', function(ev){
    const btn = ev.target && ev.target.closest ? ev.target.closest('[data-action="staff-course-open"]') : null;
    if (!btn) return;
    ev.preventDefault(); ev.stopPropagation();
    if (typeof window.hfmV120OpenStaffCourseDialog === 'function') return window.hfmV120OpenStaffCourseDialog();
    state.staffCourseDialog = true; render(); return false;
  }, true);

  try { ensureInfrastructure(); } catch(e) { console.warn('v134 init', e); }
})();

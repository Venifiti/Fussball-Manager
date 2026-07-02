/* v182: Spielende-/Halbzeit-Ereignisse sauber umbrechen; keine Kollision mit Spielfeld-.goal-Klasse */
(function(){
  function esc(value){
    try { if (typeof hfmV68Html === 'function') return hfmV68Html(value); } catch(e) {}
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function meta(line){
    var text = String(line || '').toLowerCase();
    if (text.indexOf('rote karte') >= 0 || text.indexOf('rot fuer') >= 0 || text.indexOf('rot für') >= 0) return { icon:'🟥', key:'red', label:'Rote Karte' };
    if (text.indexOf('gelbe karte') >= 0 || text.indexOf('gelb fuer') >= 0 || text.indexOf('gelb für') >= 0) return { icon:'🟨', key:'yellow', label:'Gelbe Karte' };
    if (text.indexOf('verletz') >= 0 || text.indexOf('angeschlagen') >= 0 || text.indexOf('pflaster') >= 0) return { icon:'🩹', key:'injury', label:'Verletzung' };
    if (text.indexOf('tor') >= 0 || text.indexOf('treffer') >= 0 || /\b[0-9]+\s*:\s*[0-9]+\b/.test(text)) return { icon:'⚽', key:'eventgoal', label:'Tor' };
    return { icon:'•', key:'normal', label:'Ereignis' };
  }

  window.importantEventList = importantEventList = function(lines){
    var items = Array.isArray(lines) && lines.length ? lines : ['Keine besonderen Ereignisse.'];
    return '<div class="hfmV182EventList" role="list">' + items.map(function(line){
      var m = meta(line);
      return '<div class="hfmV182EventItem hfmV182-'+m.key+'" role="listitem">' +
        '<span class="hfmV182EventIcon" title="'+esc(m.label)+'">'+m.icon+'</span>' +
        '<span class="hfmV182EventText">'+esc(line)+'</span>' +
      '</div>';
    }).join('') + '</div>';
  };

  function injectStyle(){
    if (document.getElementById('hfm-v182-event-style')) return;
    var style = document.createElement('style');
    style.id = 'hfm-v182-event-style';
    style.textContent = [
      '.hfmV182EventList{display:grid;gap:8px;background:rgba(255,255,255,.06);border-radius:16px;padding:12px;max-height:260px;overflow:auto;min-width:0;contain:layout paint;}',
      '.hfmV182EventItem{position:static!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:auto!important;height:auto!important;border:0!important;transform:none!important;display:grid!important;grid-template-columns:28px minmax(0,1fr);align-items:start;gap:10px;min-width:0;max-width:100%;padding:3px 0;}',
      '.hfmV182EventIcon{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;min-width:24px;border-radius:9px;background:rgba(255,255,255,.10);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);line-height:1;font-size:16px;}',
      '.hfmV182EventText{display:block;min-width:0;max-width:100%;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:anywhere;word-break:normal;line-height:1.42;}',
      '.hfmV182EventItem.hfmV182-eventgoal .hfmV182EventIcon{background:rgba(100,240,194,.16);}',
      '.hfmV182EventItem.hfmV182-yellow .hfmV182EventIcon{background:rgba(255,221,76,.20);}',
      '.hfmV182EventItem.hfmV182-red .hfmV182EventIcon{background:rgba(255,85,106,.20);}',
      '.hfmV182EventItem.hfmV182-injury .hfmV182EventIcon{background:rgba(255,255,255,.14);}',
      '.matchPanel .hfmV182EventList{margin:8px 0 18px;}',
      'ol.matchLog .goal,.matchLog .goal,.eventIconLog .goal,.hfmV175EventList .goal{position:static!important;left:auto!important;top:auto!important;width:auto!important;height:auto!important;border:0!important;}',
      '.hfmV175EventItem.goal,.eventIconItem.goal{position:static!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:auto!important;height:auto!important;border:0!important;transform:none!important;}',
      '.hfmV175EventText,.eventIconLog .eventText{white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;min-width:0!important;max-width:100%!important;}'
    ].join('');
    document.head.appendChild(style);
  }
  try { injectStyle(); } catch(e) {}
  var oldRender = typeof render === 'function' ? render : null;
  window.render = render = function(){ var out = oldRender ? oldRender.apply(this, arguments) : undefined; try { injectStyle(); } catch(e) {} return out; };
})();

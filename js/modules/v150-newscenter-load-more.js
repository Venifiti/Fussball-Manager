/* v150: Newscenter zeigt pro Filter zuerst 5 Nachrichten und laedt per Button jeweils 5 weitere. Keine bestehenden Funktionen entfernen. */
(function(){
  'use strict';

  const PAGE_SIZE = 5;

  function ensureNewsState(){
    if (typeof hfmV68EnsureNewsState === 'function') hfmV68EnsureNewsState();
    if (typeof state === 'undefined' || !state) return;
    if (!Array.isArray(state.newsItems)) state.newsItems = [];
    if (!state.newsFilter) state.newsFilter = 'inbox';
    if (!state.newsVisibleCounts || typeof state.newsVisibleCounts !== 'object') state.newsVisibleCounts = {};
  }

  function currentFilter(){
    ensureNewsState();
    return state.newsFilter || 'inbox';
  }

  function visibleCountFor(filter){
    ensureNewsState();
    const key = filter || currentFilter();
    const raw = Number(state.newsVisibleCounts && state.newsVisibleCounts[key]);
    if (!Number.isFinite(raw) || raw < PAGE_SIZE) {
      state.newsVisibleCounts[key] = PAGE_SIZE;
      return PAGE_SIZE;
    }
    return raw;
  }

  window.hfmV150LoadMoreNews = function(){
    ensureNewsState();
    const filter = currentFilter();
    state.newsVisibleCounts[filter] = visibleCountFor(filter) + PAGE_SIZE;
    if (typeof hfmV77SilentSave === 'function') hfmV77SilentSave();
    render();
    return false;
  };

  if (typeof setNewsFilter === 'function') {
    window.setNewsFilter = setNewsFilter = function(filter){
      ensureNewsState();
      state.newsFilter = filter || 'inbox';
      state.newsSelectedId = null;
      state.newsVisibleCounts[state.newsFilter] = PAGE_SIZE;
      render();
      return false;
    };
  }

  if (typeof newscenter === 'function') {
    window.newscenter = newscenter = function(){
      ensureNewsState();

      const unread = typeof hfmV68NewsUnreadCount === 'function' ? hfmV68NewsUnreadCount() : (state.newsItems || []).filter(n => !n.read).length;
      const unreadInbox = typeof hfmV68NewsUnreadCount === 'function' ? hfmV68NewsUnreadCount('inbox') : (state.newsItems || []).filter(n => !n.read && n.scope !== 'world').length;
      const unreadWorld = typeof hfmV68NewsUnreadCount === 'function' ? hfmV68NewsUnreadCount('world') : (state.newsItems || []).filter(n => !n.read && n.scope === 'world').length;
      const actions = typeof hfmV68ActionNews === 'function' ? hfmV68ActionNews().length : (state.newsItems || []).filter(n => n.requires_action && !n.resolved).length;
      const filter = currentFilter();
      const chip = (id, label, count = 0) => `<button class="chip ${filter === id ? 'selected' : ''}" onclick="setNewsFilter('${id}')">${label}${count ? ` <span class="chipBadge">${count}</span>` : ''}</button>`;

      const allItems = typeof hfmV68NewsItemsForFilter === 'function' ? hfmV68NewsItemsForFilter() : (state.newsItems || []);
      const visibleCount = visibleCountFor(filter);
      const visibleItems = allItems.slice(0, visibleCount);
      const hasMore = allItems.length > visibleItems.length;

      const selected = (state.newsItems || []).find(n => String(n.id) === String(state.newsSelectedId)) || visibleItems[0] || allItems[0] || null;
      const rows = visibleItems.map(n => {
        const cls = `${!n.read ? 'unread' : ''} ${n.requires_action && !n.resolved ? 'needsAction' : ''}`;
        const activeCls = selected && String(selected.id) === String(n.id) ? ' activeNewsItem' : '';
        return `<button class="newsItem ${cls}${activeCls}" data-news-id="${n.id}" onclick="hfmV68OpenNewsItem('${n.id}')"><span class="newsMeta"><b>${hfmV68CategoryLabel(n.category)}</b><em>${hfmV68PriorityLabel(n.priority)}</em></span><strong>${hfmV68NewsTitle(n)}</strong><small>${n.timestamp}${n.requires_action && !n.resolved ? ' · Entscheidung offen' : n.read ? ' · gelesen' : ' · ungelesen'}</small></button>`;
      }).join('');

      const moreButton = hasMore
        ? `<div class="newsToolbar newsLoadMore"><button class="ghost full" onclick="hfmV150LoadMoreNews()">Mehr laden</button><small>${visibleItems.length} von ${allItems.length} Nachrichten angezeigt</small></div>`
        : (allItems.length > PAGE_SIZE ? `<div class="hint">Alle ${allItems.length} Nachrichten in diesem Bereich angezeigt.</div>` : '');

      const detail = selected ? `<article class="newsDetail ${!selected.read ? 'unread' : ''}"><div class="newsDetailHeader"><div><p class="eyebrow">${hfmV68CategoryLabel(selected.category)} · ${hfmV68PriorityLabel(selected.priority)}</p><h2>${hfmV68NewsTitle(selected)}</h2></div>${!selected.read ? '<span class="unreadPill">Ungelesen</span>' : ''}${selected.requires_action && !selected.resolved ? '<span class="requiredBadge">Aktion</span>' : ''}</div><p class="hint">${selected.timestamp} · Absender: ${hfmV68Html(selected.sender_id)}</p><div class="infoBox newsBody">${hfmV68NewsBody(selected)}</div>${hfmV68NewsActionButtons(selected)}<div class="modalActions"><button class="ghost full" onclick="hfmV68GoFromNews('team','lineup')">Zur Aufstellung</button><button class="ghost full" onclick="hfmV68GoFromNews('market')">Zu Transfers</button></div></article>` : `<article class="newsDetail"><h2>Keine Nachrichten</h2><div class="infoBox">Aktuell gibt es in diesem Filter keine Meldungen.</div></article>`;

      return `<section class="panel newsCenterPanel"><p class="eyebrow">Newscenter</p><h2>Posteingang & Sortierung</h2><div class="grid compact newsSummaryGrid">${card('📰', 'Ungelesen', `${unread}`, 'neue Meldungen')}${card('📥', 'Inbox', `${unreadInbox}`, 'alle neuen Meldungen')}${card('🌍', 'Welt-News', `${unreadWorld}`, 'Sortierung Welt')}${card('⚠️', 'Entscheidungen', `${actions}`, 'offene Entscheidungen')}</div><div class="chips newsTabs">${chip('inbox','Inbox', unreadInbox)}${chip('world','Welt-News', unreadWorld)}${chip('unread','Ungelesen', unread)}${chip('action','Aktionen', actions)}${chip('all','Alle')}</div><div class="newsToolbar"><button class="ghost" onclick="hfmV68MarkAllNewsRead()">Alle als gelesen markieren</button></div><div class="newsLayout"><div class="newsList">${rows || '<div class="infoBox">Keine Nachrichten in diesem Bereich.</div>'}${moreButton}</div>${detail}</div></section>`;
    };
  }

  try { ensureNewsState(); } catch(err) { console.warn('v150 news pagination init failed', err); }
})();

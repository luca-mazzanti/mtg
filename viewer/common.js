// Shared helpers for the collection viewer pages.
/* eslint-disable no-unused-vars */
const MTG = (() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const priceNum = p => { const v = parseFloat(String(p).replace(/[^0-9.]/g, '')); return isNaN(v) ? 0 : v; };
  const eur = v => '€' + v.toFixed(2);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // Normalised lookup key: front face only, lowercase, unified apostrophes/accents kept.
  const key = name => String(name).split(' // ')[0].replace(/[’`]/g, "'").trim().toLowerCase();
  const BASICS = new Set(['plains', 'island', 'swamp', 'mountain', 'forest', 'wastes',
    'snow-covered plains', 'snow-covered island', 'snow-covered swamp', 'snow-covered mountain', 'snow-covered forest']);

  // ---------- images from Scryfall IDs ----------
  // version: 'small' | 'normal' | 'large' | 'art_crop' | 'png'. Front face for double-faced cards.
  const imageUrl = (id, version = 'normal') => !id ? '' :
    `https://cards.scryfall.io/${version}/front/${id[0]}/${id[1]}/${id}.${version === 'png' ? 'png' : 'jpg'}`;

  // ---------- browser cache for Scryfall lookups ----------
  const CACHE_KEY = 'mtg-scryfall-info', CACHE_TTL = 864e5; // 1 day (prices change)
  function readCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
  }
  function writeCache(obj) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(obj)); } catch { /* quota: ignore */ }
  }
  function clearCache() {
    for (const k of [CACHE_KEY, 'mtg-sets']) localStorage.removeItem(k);
    infoCache.clear();
  }

  // ---------- mana symbols ----------
  // "{2}{R}{W/U}" -> Scryfall SVG icons. Split costs "A // B" keep the separator.
  function manaHtml(cost) {
    if (!cost) return '';
    return esc(cost).replace(/\{([^}]+)\}/g, (_, s) => {
      const file = s.replace(/\//g, '').toUpperCase();
      return `<img class="ms" src="https://svgs.scryfall.io/card-symbols/${encodeURIComponent(file)}.svg" alt="{${s}}" title="{${s}}">`;
    }).replace(/ \/\/ /g, '<span class="ms-sep">//</span>');
  }
  // Mana value from a cost string (front face for split/DFC). X counts as 0, hybrid {2/W} as 2.
  function manaValue(cost) {
    let v = 0;
    for (const [, s] of String(cost || '').split(' // ')[0].matchAll(/\{([^}]+)\}/g)) {
      if (/^\d+$/.test(s)) v += +s;
      else if (/^[XYZ]$/.test(s)) continue;
      else if (/^\d+\//.test(s)) v += parseInt(s, 10);
      else if (s === 'HW' || s === 'HR' || s === '½') v += 0.5;
      else v += 1;
    }
    return v;
  }

  // ---------- sets (release order) ----------
  // code -> { name, released }, cached in localStorage for a day.
  let setsPromise;
  function loadSets() {
    return setsPromise ||= (async () => {
      try {
        const cached = JSON.parse(localStorage.getItem('mtg-sets') || 'null');
        if (cached && Date.now() - cached.at < 864e5) return new Map(cached.sets);
      } catch { /* ignore */ }
      try {
        const data = await (await fetch('https://api.scryfall.com/sets', { headers: { Accept: 'application/json' } })).json();
        const sets = (data.data || []).map(s => [s.code, { name: s.name, released: s.released_at || '9999-99-99' }]);
        try { localStorage.setItem('mtg-sets', JSON.stringify({ at: Date.now(), sets })); } catch { /* quota */ }
        return new Map(sets);
      } catch (e) { console.warn('Could not load Scryfall sets', e); return new Map(); }
    })();
  }

  // ---------- card type groups ----------
  const TYPE_GROUPS = ['Creatures', 'Planeswalkers', 'Battles', 'Instants', 'Sorceries', 'Artifacts', 'Enchantments', 'Lands', 'Other'];
  function typeGroup(typeLine) {
    const t = String(typeLine || '').split(' // ')[0];
    if (/\bCreature\b/.test(t)) return 'Creatures';
    if (/\bPlaneswalker\b/.test(t)) return 'Planeswalkers';
    if (/\bBattle\b/.test(t)) return 'Battles';
    if (/\bLand\b/.test(t)) return 'Lands';
    if (/\bInstant\b/.test(t)) return 'Instants';
    if (/\bSorcery\b/.test(t)) return 'Sorceries';
    if (/\bArtifact\b/.test(t)) return 'Artifacts';
    if (/\bEnchantment\b/.test(t)) return 'Enchantments';
    return 'Other';
  }

  // ---------- collection ----------
  function parseCollection(md) {
    const rows = [];
    for (const line of md.split('\n')) {
      if (!line.startsWith('| ') || line.startsWith('| Qty') || line.startsWith('| Cards')) continue;
      const c = line.trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim());
      if (c.length !== 14 && c.length !== 15) continue;
      const [qty, printed, name, color, type, mana, setName, set, num, lang, foil, price, date, notes, sid = ''] = c;
      rows.push({ qty: +qty, printed, name, color, type, mana, cmc: manaValue(mana), setName, set, num, lang, foil, price,
        priceVal: priceNum(price), date, notes, sid: /^[0-9a-f-]{36}$/i.test(sid) ? sid.toLowerCase() : '' });
    }
    return rows;
  }
  async function loadCollection() {
    const res = await fetch('/mtg-collection.md', { cache: 'no-store' });
    if (!res.ok) throw new Error(`mtg-collection.md: HTTP ${res.status}`);
    return parseCollection(await res.text());
  }
  // English name -> { qty, rows } (sums every printing, language and foil).
  function ownedIndex(rows) {
    const idx = new Map();
    for (const r of rows) {
      const k = key(r.name);
      const e = idx.get(k) || { qty: 0, rows: [] };
      e.qty += r.qty; e.rows.push(r); idx.set(k, e);
    }
    return idx;
  }

  // ---------- decklist ----------
  // Accepts "4 Card", "4x Card", "Card" (=1), MTGA "4 Card (SET) 123", "SB: 2 Card".
  // A blank line (after some cards) or a "Sideboard" line switches to the sideboard.
  function parseDecklist(text) {
    const main = new Map(), side = new Map(), errors = [];
    let section = 'main';
    for (const raw of String(text).split(/\r?\n/)) {
      let line = raw.trim();
      if (!line || line.startsWith('//') || line.startsWith('#')) {
        if (!line && main.size && section === 'main') section = 'side';
        continue;
      }
      if (/^(sideboard|side board|sb)\s*:?\s*$/i.test(line)) { section = 'side'; continue; }
      if (/^(deck|main ?deck|main|commander|companion)\s*:?\s*$/i.test(line)) { section = 'main'; continue; }
      let target = section === 'main' ? main : side;
      const sb = line.match(/^sb:\s*(.*)$/i);
      if (sb) { line = sb[1]; target = side; }
      const m = line.match(/^(\d+)\s*x?\s+(.+?)$/i) || [null, '1', line];
      let name = m[2].replace(/\s+\([A-Za-z0-9]{2,6}\)(\s+[\w★-]+)?\s*$/, '').replace(/\s+\*[A-Z]+\*$/, '').trim();
      const qty = parseInt(m[1], 10);
      if (!name || !(qty > 0)) { errors.push(raw); continue; }
      const k = key(name);
      const e = target.get(k) || { qty: 0, name };
      e.qty += qty; target.set(k, e);
    }
    return { main: [...main.values()], side: [...side.values()], errors };
  }
  const countCards = list => list.reduce((s, c) => s + c.qty, 0);

  // Owned copies are shared between main and sideboard: main deck is served first.
  function checkDeck(parsed, idx) {
    const left = new Map();
    const take = (name, need) => {
      const k = key(name);
      if (!left.has(k)) left.set(k, idx.get(k)?.qty || 0);
      const have = Math.min(need, left.get(k));
      left.set(k, left.get(k) - have);
      return have;
    };
    const lines = section => parsed[section].map(c => {
      const k = key(c.name);
      const basic = BASICS.has(k);
      const owned = idx.get(k);
      const have = basic ? c.qty : take(c.name, c.qty);
      return { ...c, section, basic, have, missing: c.qty - have, ownedTotal: owned?.qty || 0, ownedRows: owned?.rows || [] };
    });
    const main = lines('main'), side = lines('side');
    const sum = (ls, f) => ls.reduce((s, l) => s + f(l), 0);
    return {
      main, side,
      totals: {
        main: sum(main, l => l.qty), side: sum(side, l => l.qty),
        mainHave: sum(main, l => l.have), sideHave: sum(side, l => l.have),
        missing: sum([...main, ...side], l => l.missing),
        basics: sum([...main, ...side], l => (l.basic ? l.qty : 0)),
      },
    };
  }

  // ---------- Scryfall ----------
  // Card name -> info. Hydrated from localStorage (entries younger than CACHE_TTL), saved after each lookup.
  const infoCache = new Map();
  (() => {
    const now = Date.now();
    for (const [k, e] of Object.entries(readCache())) if (now - e.at < CACHE_TTL) infoCache.set(k, e.v);
  })();
  function persistInfo() {
    const now = Date.now(), old = readCache(), out = {};
    for (const [k, v] of infoCache) if (v !== undefined) out[k] = { at: old[k] && now - old[k].at < CACHE_TTL ? old[k].at : now, v };
    writeCache(out);
  }
  // Batch-resolve card names: canonical name, default-printing EUR price, images, link.
  async function scryfallInfo(names) {
    const todo = [...new Set(names.map(key))].filter(k => !infoCache.has(k));
    if (!todo.length) return infoCache;
    for (let i = 0; i < todo.length; i += 75) {
      const batch = todo.slice(i, i + 75);
      try {
        const res = await fetch('https://api.scryfall.com/cards/collection', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ identifiers: batch.map(name => ({ name })) }),
        });
        const data = await res.json();
        for (const c of data.data || []) {
          const face = c.card_faces?.[0];
          const uris = c.image_uris || face?.image_uris || {};
          const mana = c.mana_cost ?? (c.card_faces || []).map(f => f.mana_cost).filter(Boolean).join(' // ');
          const v = { name: c.name, eur: priceNum(c.prices?.eur || c.prices?.eur_foil || 0), uri: c.scryfall_uri,
            image: uris.normal, art: uris.art_crop, type: c.type_line, mana, cmc: c.cmc ?? manaValue(mana) };
          infoCache.set(key(c.name), v);
          if (face) infoCache.set(key(face.name), v);
        }
        for (const nf of data.not_found || []) infoCache.set(key(nf.name), null);
      } catch (e) { console.warn('Scryfall lookup failed', e); }
      for (const k of batch) if (!infoCache.has(k)) infoCache.set(k, undefined);
      await sleep(110);
    }
    persistInfo();
    return infoCache;
  }
  async function resolveCardName(name) {
    const res = await fetch('https://api.scryfall.com/cards/named?fuzzy=' + encodeURIComponent(name), { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const c = await res.json();
    return c.object === 'card' ? c.name : null;
  }
  const artUrl = name => 'https://api.scryfall.com/cards/named?format=image&version=art_crop&exact=' + encodeURIComponent(name);
  const cardImgUrl = name => 'https://api.scryfall.com/cards/named?format=image&version=normal&exact=' + encodeURIComponent(name);

  // ---------- rendering ----------
  function printingsText(rows) {
    return rows.map(r => `${r.qty}× ${r.set.toUpperCase()}${r.lang !== 'EN' ? ' ' + r.lang : ''}${r.foil === 'Yes' ? ' foil' : ''}${/not tournament legal/i.test(r.notes) ? ' ⚠ gold border, not legal' : ''}`).join(', ');
  }
  function missingList(result) {
    const fmt = ls => ls.filter(l => l.missing > 0).map(l => `${l.missing} ${l.name}`);
    const m = fmt(result.main), s = fmt(result.side);
    return [...m, ...(s.length ? ['', ...s] : [])].join('\n');
  }
  // Renders the have/missing report into `el`.
  // opts.group: 'none' (main deck / sideboard) | 'type' (main deck by card type, then sideboard)
  // opts.order: null (list order) | 'asc' | 'desc' — by mana value, then name.
  async function renderCheck(el, result, opts = {}) {
    const { group = 'none', order = null } = opts;
    const all = [...result.main, ...result.side];
    if (!all.every(l => infoCache.has(key(l.name)))) el.innerHTML = '<p class="hint">Looking up cards on Scryfall…</p>';
    const info = await scryfallInfo(all.map(l => l.name));
    const t = result.totals;
    const unknown = [];
    let totalCost = 0;
    for (const l of all) {
      const i = info.get(key(l.name));
      const own = l.ownedRows[0];
      l.mana = i?.mana ?? own?.mana ?? '';
      l.cmc = i?.cmc ?? own?.cmc ?? manaValue(l.mana);
      l.typeLine = i?.type ?? own?.type ?? (l.basic ? 'Basic Land' : '');
      l.cost = l.missing && i ? l.missing * i.eur : 0;
      totalCost += l.cost;
      if (i === null && !l.ownedTotal && !l.basic) unknown.push(l.name);
    }
    const cmp = (a, b) => (a.cmc - b.cmc) || a.name.localeCompare(b.name);
    const sorted = ls => !order ? ls : [...ls].sort(order === 'desc' ? (a, b) => -cmp(a, b) : cmp);

    let groups;
    if (group === 'type') {
      groups = TYPE_GROUPS.map(g => ({ title: g, lines: result.main.filter(l => typeGroup(l.typeLine) === g) })).filter(g => g.lines.length);
      if (result.side.length) groups.push({ title: 'Sideboard', lines: result.side, side: true });
    } else {
      groups = [{ title: 'Main deck', lines: result.main }, { title: 'Sideboard', lines: result.side, side: true }].filter(g => g.lines.length);
    }

    const row = l => {
      const cls = l.basic ? 'basic' : l.missing === 0 ? 'ok' : l.have > 0 ? 'partial' : 'missing';
      const icon = { ok: '✔', partial: '◐', missing: '✘', basic: '⛰' }[cls];
      return `<tr class="${cls}">
        <td class="status">${icon}</td><td class="num">${l.qty}</td>
        <td><a href="https://scryfall.com/search?q=${encodeURIComponent('!"' + l.name + '"')}" target="_blank" rel="noopener" data-card="${esc(l.name)}">${esc(l.name)}</a></td>
        <td class="mana">${manaHtml(l.mana)}</td>
        <td class="num">${l.basic ? '—' : l.have}</td><td class="num miss">${l.missing || ''}</td>
        <td class="num cost">${l.missing ? (l.cost ? l.cost.toFixed(2) : '?') : ''}</td>
        <td class="prints">${l.basic ? 'basic land (not tracked)' : esc(printingsText(l.ownedRows))}${l.ownedTotal > l.have && !l.basic ? ` <i>(${l.ownedTotal} owned in total)</i>` : ''}</td></tr>`;
    };
    const head = '<thead><tr><th></th><th class="num">Need</th><th>Card</th><th>Mana</th><th class="num">Have</th><th class="num">Missing</th><th class="num">€ missing</th><th>Owned printings</th></tr></thead>';
    const section = g => {
      const need = g.lines.reduce((s, l) => s + l.qty, 0), have = g.lines.reduce((s, l) => s + l.have, 0);
      return `<h3 class="${g.side ? 'side' : ''}">${esc(g.title)} <span>${need} card${need === 1 ? '' : 's'}${have < need ? ` · ${need - have} missing` : ''}</span></h3>
        <table class="check-table">${head}<tbody>${sorted(g.lines).map(row).join('')}</tbody></table>`;
    };

    el.innerHTML = `<div class="check">
      <div class="check-summary">
        <div class="pill ${t.mainHave === t.main ? 'ok' : 'bad'}">Main deck <b>${t.mainHave}/${t.main}</b></div>
        ${t.side ? `<div class="pill ${t.sideHave === t.side ? 'ok' : 'bad'}">Sideboard <b>${t.sideHave}/${t.side}</b></div>` : ''}
        <div class="pill ${t.missing ? 'bad' : 'ok'}">Missing <b>${t.missing}</b> cards</div>
        <div class="pill">Cost to complete <b>${eur(totalCost)}</b></div>
        ${t.missing ? '<button class="copy-missing">Copy missing list</button>' : ''}
      </div>
      ${unknown.length ? `<div class="err">Not found on Scryfall (typo?): ${esc(unknown.join(', '))}</div>` : ''}
      ${groups.map(section).join('')}
    </div>`;
    el.querySelector('.copy-missing')?.addEventListener('click', async e => {
      await navigator.clipboard.writeText(missingList(result));
      e.target.textContent = 'Copied ✔';
    });
    if (!el.dataset.hoverBound) { bindCardHover(el); el.dataset.hoverBound = '1'; }
  }

  // Floating card image when hovering a [data-card] link.
  let hoverImg;
  function bindCardHover(root) {
    if (!hoverImg) {
      hoverImg = document.createElement('img');
      hoverImg.className = 'hover-img';
      document.body.appendChild(hoverImg);
    }
    root.addEventListener('mousemove', e => {
      const a = e.target.closest('[data-card]');
      if (!a) { hoverImg.style.display = 'none'; return; }
      const src = cardImgUrl(a.dataset.card);
      if (hoverImg.dataset.src !== src) { hoverImg.dataset.src = src; hoverImg.src = src; }
      hoverImg.style.display = 'block';
      hoverImg.style.left = (e.clientX + 260 > innerWidth ? e.clientX - 260 : e.clientX + 16) + 'px';
      hoverImg.style.top = Math.min(e.clientY + 16, innerHeight - 350) + 'px';
    });
    root.addEventListener('mouseleave', () => { hoverImg.style.display = 'none'; });
  }

  // ---------- modal ----------
  function openModal(title, bodyHtml) {
    const bd = document.createElement('div');
    bd.className = 'modal-backdrop';
    bd.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><h2><span>${esc(title)}</span><button class="close" title="Close">×</button></h2><div class="modal-body">${bodyHtml}</div></div>`;
    const close = () => { bd.remove(); document.removeEventListener('keydown', onKey); if (hoverImg) hoverImg.style.display = 'none'; };
    const onKey = e => { if (e.key === 'Escape') close(); };
    bd.addEventListener('mousedown', e => { if (e.target === bd) close(); });
    bd.querySelector('.close').onclick = close;
    document.addEventListener('keydown', onKey);
    document.body.appendChild(bd);
    return { el: bd.querySelector('.modal-body'), close };
  }

  // "Check decklist" popup (used on the collection page).
  function openChecker(prefill = '') {
    const m = openModal('Check a decklist against my collection', `
      <div class="form">
        <label class="field">Decklist <textarea id="chk-list" rows="14" placeholder="4 Lightning Bolt\n4 Fireblast\n20 Mountain\n\n2 Pyroblast">${esc(prefill)}</textarea></label>
        <div class="hint">One card per line (<code>4 Card name</code>). A blank line or a "Sideboard" line starts the sideboard. Basic lands are not tracked.</div>
        <div class="row"><button class="primary" id="chk-go">Check</button><span class="err" id="chk-err"></span></div>
      </div>
      <div id="chk-out"></div>`);
    const run = async () => {
      const parsed = parseDecklist(m.el.querySelector('#chk-list').value);
      const err = m.el.querySelector('#chk-err');
      err.textContent = parsed.errors.length ? `Could not read: ${parsed.errors.join(' | ')}` : '';
      if (!parsed.main.length && !parsed.side.length) { err.textContent = 'Paste a decklist first.'; return; }
      const out = m.el.querySelector('#chk-out');
      out.innerHTML = '<p class="hint">Checking…</p>';
      const idx = ownedIndex(await loadCollection());
      await renderCheck(out, checkDeck(parsed, idx));
    };
    m.el.querySelector('#chk-go').onclick = run;
    m.el.querySelector('#chk-list').addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) run(); });
    m.el.querySelector('#chk-list').focus();
    return m;
  }

  // ---------- decks API ----------
  async function api(method, url, body) {
    const res = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    const data = res.status === 204 ? null : await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data;
  }
  const decks = {
    list: () => api('GET', '/api/decks'),
    get: id => api('GET', '/api/decks/' + encodeURIComponent(id)),
    create: d => api('POST', '/api/decks', d),
    update: (id, d) => api('PUT', '/api/decks/' + encodeURIComponent(id), d),
    remove: id => api('DELETE', '/api/decks/' + encodeURIComponent(id)),
  };

  // Deck form (create + edit). Resolves the thumbnail through Scryfall fuzzy search.
  function deckFormHtml(d = {}) {
    return `<div class="form deck-form">
      <label class="field">Deck name <input name="name" value="${esc(d.name || '')}" placeholder="Mono-Red Burn"></label>
      <label class="field">Thumbnail card <input name="thumbnail" value="${esc(d.thumbnail || '')}" placeholder="Fireblast"></label>
      <label class="field">Decklist <textarea name="list" rows="16" placeholder="4 Lightning Bolt\n4 Fireblast\n20 Mountain\n\n2 Pyroblast">${esc(d.list || '')}</textarea></label>
      <div class="hint">One card per line (<code>4 Card name</code>). A blank line or a "Sideboard" line starts the sideboard.</div>
      <div class="err form-err"></div>
    </div>`;
  }
  async function readDeckForm(root) {
    const v = n => root.querySelector(`[name=${n}]`).value.trim();
    const name = v('name'), thumbnailIn = v('thumbnail'), list = root.querySelector('[name=list]').value.replace(/\s+$/, '');
    if (!name) throw new Error('Give the deck a name.');
    if (!thumbnailIn) throw new Error('Choose a card name for the thumbnail.');
    const parsed = parseDecklist(list);
    if (!parsed.main.length) throw new Error('The decklist has no cards.');
    if (parsed.errors.length) throw new Error(`Could not read these lines: ${parsed.errors.join(' | ')}`);
    const thumbnail = await resolveCardName(thumbnailIn);
    if (!thumbnail) throw new Error(`Scryfall doesn't know a card called "${thumbnailIn}".`);
    return { name, thumbnail, list };
  }

  function nav(active) {
    const l = (href, label, k) => `<a href="${href}" class="${active === k ? 'active' : ''}">${label}</a>`;
    return `<nav class="top">${l('/', 'Collection', 'collection')}${l('/decks.html', 'Decks', 'decks')}</nav>`;
  }

  return { esc, eur, key, imageUrl, clearCache, manaHtml, manaValue, loadSets, typeGroup, TYPE_GROUPS, priceNum, parseCollection, loadCollection, ownedIndex, parseDecklist, countCards, checkDeck,
    scryfallInfo, resolveCardName, artUrl, renderCheck, openModal, openChecker, decks, deckFormHtml, readDeckForm, nav, bindCardHover };
})();

#!/usr/bin/env node
// Local viewer for mtg-collection.md + decks. No dependencies: `npm start` (or `node viewer/server.js`).
// Serves the pages, the live collection file and a small JSON API for the decklists stored as text files in decks/.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { exec } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const DECKS_DIR = path.join(ROOT, 'decks');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1'; // local only

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const STATIC = {
  '/': 'index.html', '/index.html': 'index.html', '/decks.html': 'decks.html', '/deck.html': 'deck.html',
  '/common.js': 'common.js', '/style.css': 'style.css',
};

// ---------- decks storage ----------
// One plain-text decklist per deck in decks/<name>.txt (the usual "4 Card Name" format; a blank line or a
// "Sideboard" line starts the sideboard; "(SET) 123" suffixes are fine). The file name is the deck name.
// The thumbnail card is not part of the text format: it lives in decks/thumbnails.json, and decks without an
// entry use their first non-basic card.
const BASIC_LANDS = new Set(['plains', 'island', 'swamp', 'mountain', 'forest', 'wastes',
  'snow-covered plains', 'snow-covered island', 'snow-covered swamp', 'snow-covered mountain', 'snow-covered forest']);
const THUMBS_FILE = path.join(DECKS_DIR, 'thumbnails.json');
const textOf = raw => raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').replace(/\s+$/, '');
function firstSpell(list) {
  for (const line of list.split('\n')) {
    if (/^(sideboard|side board|sb)\s*:?\s*$/i.test(line.trim())) break;
    const m = line.trim().match(/^\d+\s*x?\s+(.+?)(\s+\([A-Za-z0-9]{2,6}\)(\s+[\w★-]+)?)?$/i);
    if (m && !BASIC_LANDS.has(m[1].toLowerCase())) return m[1].split(' // ')[0];
  }
  return '';
}
async function readThumbs() {
  try { return JSON.parse(await fs.readFile(THUMBS_FILE, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return {}; throw e; }
}
async function readDecks() {
  let names;
  try { names = await fs.readdir(DECKS_DIR); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
  const thumbs = await readThumbs();
  const decks = [];
  for (const file of names.filter(n => /\.txt$/i.test(n)).sort((x, y) => x.localeCompare(y))) {
    const full = path.join(DECKS_DIR, file);
    const [raw, st] = await Promise.all([fs.readFile(full, 'utf8'), fs.stat(full)]);
    const name = file.replace(/\.txt$/i, '');
    const list = textOf(raw);
    decks.push({ id: name, name, thumbnail: thumbs[name] || firstSpell(list), list,
      createdAt: (st.birthtimeMs ? st.birthtime : st.mtime).toISOString(), updatedAt: st.mtime.toISOString() });
  }
  return decks;
}
let writing = Promise.resolve();
const serialised = fn => { const run = writing.then(fn); writing = run.catch(() => {}); return run; };
async function writeFileAtomic(file, text) { // write temp file, then rename
  const tmp = file + '.tmp';
  await fs.writeFile(tmp, text);
  await fs.rename(tmp, file);
}
const fileOf = name => path.join(DECKS_DIR, name + '.txt');
const fail = (status, message) => Object.assign(new Error(message), { status });
const exists = file => fs.access(file).then(() => true, () => false);
// Deck name -> safe file name stem.
const fileStem = name => name.replace(/[\\/:*?"<>|\x00-\x1f]+/g, ' ').replace(/\s+/g, ' ').replace(/^[. ]+|[. ]+$/g, '').slice(0, 120);

async function saveThumb(name, thumbnail, oldName) {
  const thumbs = await readThumbs();
  if (oldName && oldName !== name) delete thumbs[oldName];
  thumbs[name] = thumbnail;
  await writeFileAtomic(THUMBS_FILE, JSON.stringify(thumbs, null, 2) + '\n');
}
function validate(body) {
  const d = {
    name: String(body?.name ?? '').trim(),
    thumbnail: String(body?.thumbnail ?? '').trim(),
    list: String(body?.list ?? '').replace(/\r\n/g, '\n').replace(/\s+$/, ''),
  };
  if (!d.name) throw fail(400, 'Deck name is required');
  if (!fileStem(d.name)) throw fail(400, 'Deck name has no usable characters');
  if (!d.thumbnail) throw fail(400, 'Thumbnail card is required');
  if (!d.list) throw fail(400, 'Decklist is required');
  if (d.name.length > 200 || d.thumbnail.length > 200 || d.list.length > 20000) throw fail(400, 'Too long');
  return d;
}
async function createDeck(d) {
  const name = fileStem(d.name), file = fileOf(name);
  if (await exists(file)) throw fail(409, `A deck called "${name}" already exists`);
  await writeFileAtomic(file, d.list + '\n');
  await saveThumb(name, d.thumbnail);
  return (await readDecks()).find(x => x.id === name);
}
// Deck ids are file names: only ever used after matching a name read from the folder, never joined from input.
async function knownId(id) {
  const found = (await readDecks()).find(x => x.id === id);
  if (!found) throw fail(404, 'Deck not found');
  return found.id;
}
async function updateDeck(oldId, d) {
  oldId = await knownId(oldId);
  const name = fileStem(d.name), file = fileOf(name);
  if (name !== oldId && await exists(file)) throw fail(409, `A deck called "${name}" already exists`);
  const crlf = /\r\n/.test(await fs.readFile(fileOf(oldId), 'utf8')); // keep the file's line endings
  await writeFileAtomic(file, (crlf ? d.list.replace(/\n/g, '\r\n') : d.list) + (crlf ? '\r\n' : '\n'));
  if (name !== oldId) await fs.unlink(fileOf(oldId));
  await saveThumb(name, d.thumbnail, oldId);
  return (await readDecks()).find(x => x.id === name);
}
async function deleteDeck(id) {
  id = await knownId(id);
  await fs.unlink(fileOf(id));
  const thumbs = await readThumbs();
  if (id in thumbs) { delete thumbs[id]; await writeFileAtomic(THUMBS_FILE, JSON.stringify(thumbs, null, 2) + '\n'); }
}

async function readBody(req) {
  let data = '';
  for await (const chunk of req) { data += chunk; if (data.length > 100_000) throw Object.assign(new Error('Body too large'), { status: 413 }); }
  try { return JSON.parse(data || '{}'); } catch { throw Object.assign(new Error('Invalid JSON'), { status: 400 }); }
}

async function handleApi(req, res, url) {
  const json = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(data === undefined ? '' : JSON.stringify(data)); };
  const m = url.pathname.match(/^\/api\/decks(?:\/([^/]+))?\/?$/);
  if (!m) return json(404, { error: 'Not found' });
  const id = m[1] && decodeURIComponent(m[1]);
  const decks = await readDecks();
  const i = id ? decks.findIndex(d => d.id === id) : -1;
  if (id && i < 0) return json(404, { error: 'Deck not found' });
  if (!id && req.method === 'GET') return json(200, decks);
  if (!id && req.method === 'POST') { const d = validate(await readBody(req)); return json(201, await serialised(() => createDeck(d))); }
  if (id && req.method === 'GET') return json(200, decks[i]);
  if (id && req.method === 'PUT') { const d = validate(await readBody(req)); return json(200, await serialised(() => updateDeck(id, d))); }
  if (id && req.method === 'DELETE') { await serialised(() => deleteDeck(id)); return json(204); }
  return json(405, { error: 'Method not allowed' });
}

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (req.method !== 'GET') { res.writeHead(405); return res.end(); }
    let file, type;
    if (url.pathname === '/mtg-collection.md') { file = path.join(ROOT, 'mtg-collection.md'); type = 'text/markdown; charset=utf-8'; }
    else if (STATIC[url.pathname]) { file = path.join(__dirname, STATIC[url.pathname]); type = TYPES[path.extname(file)]; }
    else if (url.pathname === '/decks') { res.writeHead(302, { Location: '/decks.html' }); return res.end(); }
    else { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  } catch (e) {
    const status = e.status || 500;
    if (status === 500) console.error(e);
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.listen(PORT, HOST, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`MTG collection viewer running at ${url}  (Ctrl+C to stop)`);
  if (process.argv.includes('--open')) {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} ${url}`);
  }
});

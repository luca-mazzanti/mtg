#!/usr/bin/env node
// Local viewer for mtg-collection.md + decks. No dependencies: `npm start` (or `node viewer/server.js`).
// Serves the pages, the live collection file and a small JSON API for decks stored in decks.json.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { exec } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const DECKS_FILE = path.join(ROOT, 'decks.json');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1'; // local only

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const STATIC = {
  '/': 'index.html', '/index.html': 'index.html', '/decks.html': 'decks.html', '/deck.html': 'deck.html',
  '/common.js': 'common.js', '/style.css': 'style.css',
};

// ---------- decks storage ----------
async function readDecks() {
  try { return JSON.parse(await fs.readFile(DECKS_FILE, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
}
let writing = Promise.resolve();
function writeDecks(decks) { // serialised + atomic (write temp file, then rename)
  writing = writing.then(async () => {
    const tmp = DECKS_FILE + '.tmp';
    await fs.writeFile(tmp, JSON.stringify(decks, null, 2) + '\n');
    await fs.rename(tmp, DECKS_FILE);
  });
  return writing;
}
function validate(body) {
  const d = {
    name: String(body?.name ?? '').trim(),
    thumbnail: String(body?.thumbnail ?? '').trim(),
    list: String(body?.list ?? '').replace(/\r\n/g, '\n').replace(/\s+$/, ''),
  };
  if (!d.name) throw Object.assign(new Error('Deck name is required'), { status: 400 });
  if (!d.thumbnail) throw Object.assign(new Error('Thumbnail card is required'), { status: 400 });
  if (!d.list) throw Object.assign(new Error('Decklist is required'), { status: 400 });
  if (d.name.length > 200 || d.thumbnail.length > 200 || d.list.length > 20000) throw Object.assign(new Error('Too long'), { status: 400 });
  return d;
}
const slug = s => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'deck';

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
  const now = new Date().toISOString();

  if (!id && req.method === 'GET') return json(200, decks);
  if (!id && req.method === 'POST') {
    const d = validate(await readBody(req));
    const deck = { id: `${slug(d.name)}-${crypto.randomBytes(3).toString('hex')}`, ...d, createdAt: now, updatedAt: now };
    decks.push(deck); await writeDecks(decks);
    return json(201, deck);
  }
  if (id && req.method === 'GET') return json(200, decks[i]);
  if (id && req.method === 'PUT') {
    const d = validate(await readBody(req));
    decks[i] = { ...decks[i], ...d, updatedAt: now }; await writeDecks(decks);
    return json(200, decks[i]);
  }
  if (id && req.method === 'DELETE') {
    decks.splice(i, 1); await writeDecks(decks);
    return json(204);
  }
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

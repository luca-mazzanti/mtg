// usage: node generate-report.js <data.txt> <window-days> [collection.md] [reports-dir]
// Cross-checks DeckScout archetype data (see SKILL.md for the data format) against the collection
// and writes reports/report-<date>-<window>d.md.
const fs = require('fs');
const [dataFile, win, collFile = 'mtg-collection.md', outDir = 'reports'] = process.argv.slice(2);
if (!dataFile || !win) {
  console.error('usage: node generate-report.js <data.txt> <window-days> [collection.md] [reports-dir]');
  process.exit(1);
}
const norm = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// owned copies by English name (double-faced names are split on //)
const own = {};
for (const l of fs.readFileSync(collFile, 'utf8').split('\n')) {
  const c = l.split('|').map(x => x.trim());
  if (c.length < 10 || !/^\d+$/.test(c[1])) continue;
  for (const n of new Set(c[3].split('//').map(norm))) own[n] = (own[n] || 0) + +c[1];
}

// parse archetype data
const archs = [];
const meta = {};
for (const line of fs.readFileSync(dataFile, 'utf8').split('\n')) {
  if (line.startsWith('@')) {
    const i = line.indexOf(' ');
    meta[line.slice(1, i)] = line.slice(i + 1).trim();
  } else if (line.startsWith('#')) {
    const [name, share, decks] = line.slice(1).split('|').map(x => x.trim());
    archs.push({ name, share, decks, M: {}, S: {} });
  } else if (line[0] === 'M' || line[0] === 'S') {
    const a = archs[archs.length - 1];
    for (const p of line.slice(2).split(',')) {
      const i = p.lastIndexOf(':');
      // ';' stands in for a comma inside a card name
      a[line[0]][p.slice(0, i).replace(/;/g, ',').trim()] = +p.slice(i + 1);
    }
  }
}

const need = v => Math.max(1, Math.round(v));
const shop = {}; // card -> {need, own, archs}
for (const a of archs) {
  const cards = {};
  for (const z of ['M', 'S'])
    for (const [n, v] of Object.entries(a[z])) {
      const c = cards[n] || (cards[n] = { n, m: 0, s: 0, need: 0 });
      c[z === 'M' ? 'm' : 's'] = v;
      c.need += need(v);
    }
  let tot = 0, have = 0;
  const short = [];
  for (const c of Object.values(cards)) {
    const o = own[norm(c.n)] || 0;
    c.own = o;
    tot += c.need;
    have += Math.min(o, c.need);
    if (o < c.need) {
      c.short = c.need - o;
      short.push(c);
      const s = shop[c.n] || (shop[c.n] = { n: c.n, need: 0, own: o, archs: [] });
      s.need = Math.max(s.need, c.need);
      s.archs.push(a);
    }
  }
  short.sort((x, y) => y.short - x.short || y.need - x.need);
  a.cov = Math.round(100 * have / tot);
  a.short = short;
  a.shortCopies = short.reduce((t, c) => t + c.short, 0);
}

const zone = c => (c.m && c.s ? 'Main + Side' : c.m ? 'Main' : 'Side');
const fmt = v => (v ? v.toFixed(1) : '');
const today = new Date().toISOString().slice(0, 10);
const covered = archs.reduce((t, a) => t + parseFloat(a.share), 0).toFixed(1);
const md = [];
md.push(`# Pauper Metagame Report: ${today} (${win}-day window)`, '');
md.push('Cross-check of the Pauper metagame on [DeckScout](https://deckscout.fyi/metagame/pauper) against my collection (`mtg-collection.md`).', '');
md.push('## Scope and method', '');
md.push(`- **Source:** the DeckScout Pauper metagame page, ${win}-day window, ${meta.total || '?'} Challenge decks. The ${archs.length} archetypes below are covered (${covered}% of the field${meta.unclassified ? `; another ${meta.unclassified} is unclassified` : ''}).${meta.others ? ` Not analysed (too small): ${meta.others}.` : ''}`);
md.push('- **Cards considered:** for each archetype, the most-played mainboard cards and sideboard cards from the site\'s top tables (up to 15 each). Rarer cards are not in those tables, so they are not covered.');
md.push('- **Copies needed:** the site\'s average copies per deck, rounded to the nearest whole number (minimum 1). A card in both main and side has the two added together.');
md.push('- **Ownership:** copies in the collection matched by English name, ignoring printing, language and foil. Basic lands are not tracked.');
md.push('- **Coverage:** the share of those needed copies I already own.', '');

md.push('## Summary', '');
md.push('| # | Archetype | Meta share | Decks | Coverage | Cards short | Copies short |');
md.push('|--:|---|--:|--:|--:|--:|--:|');
archs.forEach((a, i) => md.push(`| ${i + 1} | [${a.name}](#${a.name.toLowerCase().replace(/ /g, '-')}) | ${a.share} | ${a.decks} | ${a.cov}% | ${a.short.length} | ${a.shortCopies} |`));
md.push('');

const full = archs.filter(a => a.shortCopies === 0).map(a => a.name);
const close = archs.filter(a => a.shortCopies > 0 && a.shortCopies <= 8).sort((x, y) => x.shortCopies - y.shortCopies);
const far = archs.filter(a => a.cov < 40).map(a => `${a.name} (${a.cov}%)`);
md.push('### Takeaways', '');
md.push(`- **Fully covered** (every needed copy owned): ${full.length ? full.join(', ') : 'none'}.`);
md.push(`- **Within reach** (8 copies or fewer short): ${close.map(a => `${a.name} (${a.shortCopies})`).join(', ') || 'none'}.`);
md.push(`- **Far from complete** (under 40% coverage): ${far.join(', ') || 'none'}.`, '');

const list = Object.values(shop).map(s => ({ ...s, short: s.need - s.own, weight: s.archs.reduce((t, a) => t + parseFloat(a.share), 0) }));
list.sort((x, y) => y.archs.length - x.archs.length || y.weight - x.weight || y.short - x.short);
md.push('## Most useful cards to buy', '');
md.push('Cards I am short of, sorted by how many of these archetypes use them (needed = the highest count any single archetype wants).', '');
md.push('| Card | Own | Needed | Short | Archetypes using it |');
md.push('|---|--:|--:|--:|---|');
for (const s of list.filter(s => s.archs.length >= 3))
  md.push(`| ${s.n} | ${s.own} | ${s.need} | ${s.short} | ${s.archs.length}: ${s.archs.map(a => a.name).join(', ')} |`);
md.push('', `${list.filter(s => s.archs.length < 3).length} more cards are short but used by only one or two archetypes; they are listed in the sections below.`, '');

md.push('## Archetypes', '');
for (const a of archs) {
  md.push(`### ${a.name}`, '');
  md.push(`**${a.share}** of the metagame (${a.decks} decks). Coverage **${a.cov}%**.`, '');
  if (!a.short.length) { md.push('Every card in the top tables is covered by my collection.', ''); continue; }
  md.push('| Card | Zone | Avg copies (main / side) | Own | Short |');
  md.push('|---|---|--:|--:|--:|');
  for (const c of a.short)
    md.push(`| ${c.n} | ${zone(c)} | ${[fmt(c.m), fmt(c.s)].filter(Boolean).join(' / ')} | ${c.own} | ${c.short} |`);
  md.push('');
}

md.push('## Caveats', '');
md.push('- The site\'s averages are over decks that play the card, so the true per-deck average is slightly lower for cards with a play rate below 100%.');
md.push('- Only the top-card tables were used; individual decklists were not averaged.');
md.push('- Ownership ignores printing, language and foil. A card owned only in Italian or foil counts as owned.');
md.push('- Copies are counted per archetype. Several decks can share the same copies if built one at a time; the "Most useful cards to buy" table uses the highest need of any single archetype.');

fs.mkdirSync(outDir, { recursive: true });
const out = `${outDir}/report-${today}-${win}d.md`;
fs.writeFileSync(out, md.join('\n') + '\n');
console.log(out);
console.log(archs.map(a => `${a.name}: coverage ${a.cov}%, short ${a.short.length} cards / ${a.shortCopies} copies`).join('\n'));

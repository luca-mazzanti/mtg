# MTG Collection

My Magic: The Gathering collection, kept as a Markdown table, plus a small local web viewer for
browsing it and checking decklists against it.

Card data, prices and images come from [Scryfall](https://scryfall.com/docs/api).

## What's in the repo

| Path | What it is |
|---|---|
| `mtg-collection.md` | The collection: one row per printing (set + number + language + foil), with quantity, color, color identity, type, mana cost, EUR price, notes and Scryfall ID. |
| `processed-screenshots.md` | Log of binder photos already added, so they are never counted twice. |
| `screenshots/` | Photos of binder pages (and deck lists) that the cards were read from. |
| `decks/` | The decks: one plain-text decklist per file (`4 Card Name`, blank line before the sideboard), named after the deck. `thumbnails.json` holds the chosen thumbnail card per deck. |
| `viewer/` | The local web viewer (a small Node.js server and static pages). |
| `.pi/prompts/` | Prompt templates for [pi](https://pi.dev): `add-cards`, `refresh-prices` and `missing-cards`. |

## Run the viewer locally

The viewer needs only [Node.js](https://nodejs.org/) 18 or newer. There is nothing to install: no `npm install`, no dependencies.

The server listens on `127.0.0.1` only, so it is reachable from your computer and not from the network.

### macOS

1. Install Node.js if you don't have it: `brew install node`, or download the installer from https://nodejs.org/.
2. Open Terminal and start the viewer:
   ```bash
   cd path/to/mtg
   npm start
   ```
   This starts the server and opens http://localhost:3000 in your browser.
3. Press `Ctrl+C` in the terminal to stop it.

### Windows

1. Install Node.js if you don't have it: `winget install OpenJS.NodeJS.LTS`, or download the installer from https://nodejs.org/.
2. Open PowerShell (or Command Prompt) and start the viewer:
   ```powershell
   cd path\to\mtg
   npm start
   ```
   This starts the server and opens http://localhost:3000 in your browser.
3. Press `Ctrl+C` in the window to stop it.

### Options

| What | macOS / Linux | Windows PowerShell | Windows Command Prompt |
|---|---|---|---|
| Start without opening the browser | `npm run serve` | `npm run serve` | `npm run serve` |
| Use another port (e.g. 4000) | `PORT=4000 npm run serve` | `$env:PORT=4000; npm run serve` | `set PORT=4000 && npm run serve` |
| Run without npm | `node viewer/server.js` | `node viewer\server.js` | `node viewer\server.js` |

The server reads `mtg-collection.md` and the `decks/` folder on every request, so after adding cards or editing
files just refresh the browser. No restart is needed.

### What the viewer does

- **Collection** (`/`): gallery or table of every card, with filters (search, color, type, set, language,
  foil), sorting (set release order then card number, value, price, name, color, mana value, quantity),
  Ascending/Descending order, and a zoom for the gallery. The header shows card count and total value
  for the current filters.
- **Check decklist**: paste a decklist to see which cards you own (and which printings), what is missing,
  and roughly what the missing cards cost.
- **Compare** (`/compare.html`): pick two decks (A and B) and see the cards only in A, in both (with both quantities,
  differences ringed) and only in B, as a card gallery or a list, for the main deck or the sideboard. A red outline
  means your collection has fewer copies than the bigger of the two lists needs. The URL keeps the choice
  (`?a=<deck>&b=<deck>`).
- **Decks** (`/decks.html`): your saved decks with completion bars. Create a deck with a name, a
  thumbnail card and a decklist; open one to see the full ownership report, grouped by card type and
  sorted by mana value. Edit mode lets you change or delete it.
  Every `.txt` file in `decks/` is a deck, named after the file; a deck without a saved thumbnail uses its first
  non-basic card. Editing or deleting a deck in the viewer changes the file.

Decklist format: one card per line as `4 Card name` (`4x Card name` and MTG Arena lines like
`4 Lightning Bolt (M11) 149` also work). A blank line, a `Sideboard` line or an `SB:` prefix starts the
sideboard. Basic lands are not tracked and always count as owned.
Card names ignore case and accents (`Lorien Revealed` = `Lórien Revealed`), both in the decklist
matcher and in the collection search.

Images load directly from Scryfall using the Scryfall ID column, so the collection page makes no Scryfall
API calls. Deck lookups (mana cost, type, price) are cached in the browser for a day. Use **Clear Scryfall
cache** in the page footer to force a refresh.

## Updating the collection with pi

[pi](https://pi.dev) is a coding agent for the terminal. The prompt templates in `.pi/prompts/` become
`/` commands when you run pi from this folder (pi asks you to trust the project the first time).

Install pi (needs Node.js 22.19+):

```bash
# macOS / Linux
curl -fsSL https://pi.dev/install.sh | sh
```
```powershell
# Windows (PowerShell)
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

Then start it in the repo folder with `pi`.

### `/add-cards`: add cards from photos

Reads the cards in one or more photos, identifies the exact printing on Scryfall, and adds them to
`mtg-collection.md`.

```text
/add-cards screenshots/1000094430.jpg screenshots/1000094431.jpg
/add-cards look at all the images in the screenshots folder
```

In short, it:

1. **Skips photos already processed**, matching `processed-screenshots.md` by file name or file hash, and
   duplicate photos of the same binder page. Partly visible cards from neighbouring pages are ignored.
2. **Reads every card** (rotating sideways photos and zooming into details when needed): name, language,
   set symbol, collector line, copyright line, artist, border, frame and foil.
3. **Finds the exact printing on Scryfall**, using tips for old sets (Revised vs Fourth Edition, foreign
   black border, gold-bordered World Championship cards, retro frames, and so on).
4. **Prices each card in EUR**. `*` means the English price of the same printing, used because Scryfall
   has none for that language; `~` means an estimate. Notes call out when the foil is worth much more.
5. **Updates the table.** It adds a row per printing (or increases Qty if the printing is already there)
   and fills Color, Identity, Type and Mana cost. It also fills the Scryfall ID, using the localized printing when
   Scryfall has a real scan of it. Then it recomputes the summary.
6. **Logs the photos** in `processed-screenshots.md`.
7. **Reports** what was added, the new totals, the photos it skipped, and a "confirm in hand" list for
   uncertain foils or printings.

### `/refresh-prices`: update prices

Re-fetches the EUR price of every row (or only some rows) from Scryfall and updates the EUR and Price date
columns. It uses the same `*` / `~` rules as `/add-cards`, updates foil-price figures mentioned in Notes,
and recomputes the summary.

```text
/refresh-prices                 # all rows
/refresh-prices lightning       # only rows whose printed or English name contains "lightning"
```

It reports the rows whose price changed (old → new), anything it could not refresh, and the old vs new
estimated total. It never changes the Scryfall ID (it only fills it in if a row has none).

### `/missing-cards`: what am I missing for a deck?

Downloads a decklist from an MTGGoldfish archetype or deck page, compares it with `mtg-collection.md` (same
rules as the viewer: any printing/language/foil counts, basic lands are always owned, main deck is served before
the sideboard) and lists the missing cards with the cheapest EUR price on Scryfall and a copy-pasteable buy list.
It only reads files; nothing is changed. If MTGGoldfish shows a captcha, it asks you to paste the list instead.

```text
/missing-cards https://www.mtggoldfish.com/archetype/pauper-grixis-affinity#paper
```

After editing a prompt in `.pi/prompts/`, run `/reload` in an open pi session to pick up the change.

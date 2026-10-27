---
description: Check an MTGGoldfish deck link against my collection and list the missing cards
argument-hint: "<mtggoldfish-url> [more-urls...]"
---
Tell me which cards I'm missing, and how many copies of each, to build the deck(s) at: $@

Collection file: `mtg-collection.md` in the project root (the folder containing `.pi/`).
Only read files and fetch web pages. Do not edit `mtg-collection.md` or anything in `decks/`.

## 1. Get the decklist
- Works with MTGGoldfish archetype pages (`/archetype/...`) and deck pages (`/deck/<id>`). Drop any `#paper` / `#online`
  fragment; the server ignores it.
- Download the page with `curl` (not the readable fetch tool, which only returns the footer):
  ```bash
  curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36" \
    -o /tmp/goldfish.html -w "%{http_code}\n" "<url without #fragment>"
  ```
- Extract the list with `python3`: it is the HTML-escaped `value` of the element with `id="deck_input_deck"`
  (`re.search(r'id="deck_input_deck" value="([^"]*)"', html)` then `html.unescape`). Lines are `N Card Name`; the line
  `sideboard` starts the sideboard. Also take the deck name from `<title>`.
- If the request fails, returns a captcha/challenge page (e.g. "captcha", "Just a moment", Cloudflare), or has no
  `deck_input_deck`: wait ~5 seconds and retry once. If it still fails, say it was blocked by a captcha, and ask me
  to paste the decklist (MTGGoldfish "Copy to clipboard" / "Download" text). Don't guess the list.

## 2. Compare with the collection
Do it in one `python3` script, using the same rules as the viewer (`viewer/common.js`, `checkDeck`):
- Read the Cards table. Columns, in order:
  `| Qty | Printed Name | English Name | Color | Identity | Type | Mana | Set | Code | # | Lang | Foil | EUR | Price date | Notes | Scryfall ID |`
- Owned copies of a card = sum of Qty over **all** rows with that English Name (any printing, language or foil).
- Match names case-insensitively and accent-insensitively (`Lórien` = `Lorien`, `Æ` = `ae`), front face only (text before ` // `), with `’` normalised to `'`.
- Basic lands (Plains, Island, Swamp, Mountain, Forest, Wastes, and Snow-Covered versions) are not tracked: count them as owned.
- Owned copies are shared between main deck and sideboard: serve the main deck first, then the sideboard with what's left.
  So a card in both (e.g. 2 main + 1 side, 2 owned) is missing 1, in the sideboard.
- Note gold-border cards (`wc97`, `wc98`, ... or "not tournament legal" in Notes): they count as owned, but mention
  them in the report since they are not legal in sanctioned events.

## 3. Price the missing cards
- For every missing card, get the cheapest current EUR price from Scryfall, in one batch: `POST https://api.scryfall.com/cards/collection`
  with `{"identifiers":[{"name":"..."}]}` (up to 75 per request) to confirm the names, then for each missing card
  `GET https://api.scryfall.com/cards/search?q=!"<name>"&unique=prints&order=eur&dir=asc` and take the lowest
  non-null `prices.eur` (ignore foil prices unless no non-foil price exists).
- Always send `-H "User-Agent: pi-mtg/1.0" -H "Accept: application/json"`, wait ~100 ms between requests, and do it
  all in one script, not one tool call per card.
- If a name is not found on Scryfall, list it under "unknown" and don't price it.

## 4. Report back
For each deck:
- Header: deck name, URL, main deck owned `X/60`, sideboard owned `Y/15`, total missing cards, estimated cost to complete (EUR).
- Table of **missing** cards only, main deck first then sideboard, sorted by missing count (highest first):
  `| Missing | Card | Need | Have | Section | Cheapest EUR each | Subtotal |`
- A copy-pasteable buy list in decklist format (`N Card Name`, main then a `Sideboard` line then sideboard),
  only if something is missing.
- One short line listing the cards I already fully own (name × qty), plus any gold-border / not-legal copies used
  and any unknown names.
If several URLs were given, end with a combined buy list that assumes the decks share cards (for each card, the highest
number missing in any one deck) and its total cost.

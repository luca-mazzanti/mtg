---
name: refresh-prices
description: Refresh EUR prices in my MTG collection from Scryfall
argument-hint: "[card name filter]"
---
Refresh the prices in my Magic: The Gathering collection file.

Collection file: `mtg-collection.md` in the project root (the repo root).
Filter: $ARGUMENTS (empty = all rows). If a filter is given, only refresh rows whose Printed Name or English Name contains it (case-insensitive).

## Steps
1. Read the Cards table. Columns, in order:
   `| Qty | Printed Name | English Name | Color | Identity | Type | Mana | Set | Code | # | Lang | Foil | EUR | Price date | Bought EUR | Notes | Scryfall ID |`
2. For each row, fetch the printing from the Scryfall API (https://scryfall.com/docs/api) with `curl`,
   sending `-H "User-Agent: pi-mtg/1.0" -H "Accept: application/json"`, waiting ~100 ms between requests:
   - Try the card's language first: `GET https://api.scryfall.com/cards/<code>/<#>/<lang>` (lang in lowercase, e.g. `it`, `de`).
   - Use `prices.eur` for non-foil rows and `prices.eur_foil` for foil rows.
   - If that price is null, use the English printing `GET https://api.scryfall.com/cards/<code>/<#>`.
   - If there is no English version (e.g. `4bb`), find the same set/number in other languages
     (`/cards/search?q=set:<code> cn:<#> lang:any&unique=prints`), use the lowest available EUR price.
   - If no price is found at all, keep the old price and list the row in your report.
   - Fetch all prices with one script (bash or node), not one tool call per card.
3. Update only the EUR and Price date columns (never change the Scryfall ID; if a row has none, fill it using the rule in the add-cards skill) (Price date = `date +%Y-%m-%d`). Keep everything else unchanged,
   Prices are plain numbers (e.g. `1.25`), with no `*` or `~` markers; leave Notes and Bought EUR as they are.
4. Recompute the Summary (total cards = Σ Qty, estimated EUR = Σ Qty × EUR) with `node`, not by hand.

## Report back
A short table of rows whose price changed (name, code #, lang, foil, old EUR → new EUR), anything that could not be refreshed,
and the old vs new estimated total.

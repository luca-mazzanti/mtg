---
description: Refresh EUR prices in my MTG collection from Scryfall
argument-hint: "[card name filter]"
---
Refresh the prices in my Magic: The Gathering collection file.

Collection file: `mtg-collection.md` in the project root (the folder containing `.pi/`).
Filter: ${@:-all rows}. If a filter is given, only refresh rows whose Printed Name or English Name contains it (case-insensitive).

## Steps
1. Read the Cards table. Columns, in order:
   `| Qty | Printed Name | English Name | Color | Identity | Type | Mana | Set | Code | # | Lang | Foil | EUR | Price date | Bought EUR | Notes | Scryfall ID |`
2. If a row's Code is not a Scryfall set (CardTrader-only codes such as `cdmr`, `cneo`, `fdns`, `drk2`) or its number is CardTrader's, fetch it by Scryfall ID instead: `GET https://api.scryfall.com/cards/<Scryfall ID>`.
   For every other row, fetch the printing from the Scryfall API (https://scryfall.com/docs/api) with `curl`,
   sending `-H "User-Agent: pi-mtg/1.0" -H "Accept: application/json"`, waiting ~100 ms between requests:
   - Try the card's language first: `GET https://api.scryfall.com/cards/<code>/<#>/<lang>` (lang in lowercase, e.g. `it`, `de`).
   - Use `prices.eur` for non-foil rows and `prices.eur_foil` for foil rows.
   - If that price is null, use the English printing `GET https://api.scryfall.com/cards/<code>/<#>` and mark the price with `*`.
   - If there is no English version (e.g. `4bb`), find the same set/number in other languages
     (`/cards/search?q=set:<code> cn:<#> lang:any&unique=prints`), use the lowest available EUR price, prefix it with `~`,
     and keep or update the explanation in Notes.
   - If no price is found at all, keep the old price and add `(not refreshed)` to Notes.
   - Fetch all prices with one script (bash or python3), not one tool call per card.
3. Update only the EUR and Price date columns (never change the Scryfall ID; if a row has none, fill it using the rule in `add-cards.md`) (Price date = `date +%Y-%m-%d`). Keep everything else unchanged,
   except updating price figures mentioned in Notes (e.g. `Foil EN ≈ €29`) if they changed.
4. Recompute the Summary (total cards = Σ Qty, estimated EUR = Σ Qty × EUR) with `python3`, not by hand.

## Report back
A short table of rows whose price changed (name, code #, lang, foil, old EUR → new EUR), anything that could not be refreshed,
and the old vs new estimated total.

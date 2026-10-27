---
description: Identify MTG cards from photos via Scryfall and add them to mtg-collection.md
argument-hint: "<image-path> [more-image-paths...]"
---
Identify the Magic: The Gathering cards in these photos and add them to my collection file.

Photos: $@

Collection file: `mtg-collection.md` in the project root (the folder containing `.pi/`).

## 0. Skip already-processed photos
- The log `processed-screenshots.md` (project root) lists every photo already added, with file name and
  the first 16 chars of its SHA-256 (`shasum -a 256 <file> | cut -c1-16`).
- When given a folder (e.g. `screenshots/`) or a list of photos, skip any photo whose file name or hash is
  already in the log. Process only the rest, and say which ones were skipped.
- If the user explicitly asks to reprocess a logged photo, do so but warn that its cards are already counted.
- After updating the collection file, append one row per newly processed photo:
  `| <file> | <hash16> | <today> | <notes> |` (e.g. "Same page as X; not counted again"). Duplicate photos are
  logged too, so they are skipped next time.

## 1. Read the cards from the photos
- Open each image with the `read` tool and read every card directly (no external OCR).
- If a photo is sideways, rotate it first: `sips -r 90|270 <in> --out /tmp/rot.jpg`.
- Photos often show binder pages. Only count the main page; ignore cards partly visible at the edges (adjacent pages).
- Compare pages across photos: if two photos show the same page, count it once and mention the skipped photo in the report.
- Build one consolidated list (Code + # + Lang + Foil → qty) across all photos before touching the collection file.
- For each card, note: printed name, language, type line, rules/flavor text, artist, copyright line,
  set symbol, collector line (e.g. `C 0151 · INR · EN`), border colour (black/white/gold), frame style, and whether it looks foil.
- If a detail is too small to read, crop the area with `sips -c <h> <w> --cropOffset <y> <x> <in> --out /tmp/crop.jpg`
  and read the crop. Do this before guessing. Run the crop and confirm the file exists before reading it
  (don't run crop and read in parallel).

### Spotting foils
- Modern cards (2015+) show `★` instead of `•` in the collector line on foils; that line often looks rainbow/blue.
- Sleeve glare can fake a foil shine; check the collector line first.
- If Scryfall `finishes` is only `["foil"]` (e.g. Premium Deck Series, many promos), the card is foil.
- If still unsure, record it as non-foil and put it in the "confirm in hand" list in your report (Notes stays empty).

## 2. Find the exact printing on Scryfall
Use the Scryfall REST API (https://scryfall.com/docs/api) with `curl`, always sending
`-H "User-Agent: pi-mtg/1.0" -H "Accept: application/json"`, and wait ~100 ms between requests.
- Search: `GET https://api.scryfall.com/cards/search?q=<query>&unique=prints` (use `curl -G --data-urlencode`).
  Useful filters: `!"Exact Name"`, `set:xxx`, `lang:it`, `artist:Name`, `year:2025`, `border:gold`, `frame:1997`, `ft:"flavor words"`.
  Add `include_extras=true` for gold-border or special sets.
- Exact printing: `GET https://api.scryfall.com/cards/<set>/<collector_number>[/<lang>]`.
- Once printings are identified, fetch them all in one bash loop rather than one call per card.
- Check the returned name matches the photo (catches misread collector numbers).
- For non-English cards, find the English name first, then list every printing and match the artist, flavor text, frame and border.
- Tips for telling printings apart:
  - Revised (3ed) has no `© 1995 Wizards` line under the artist; Fourth Edition (4ed) does.
  - Black-bordered non-English card with `© 1995` = Fourth Edition Foreign Black Border (`4bb`).
  - Black-bordered non-English card from 1993/94 = Foreign Black Border (`fbb`).
  - Gold border + signature + "SB" = World Championship decks (`wc97`, `wc98`, ...), which are not tournament legal.
  - Old-style frame with a modern set symbol = retro-frame reprint (check `frame:1997`).
  - The collector line on modern cards gives set code + number directly.
  - 1993–2010 cards end the copyright line with `NN/TTT` (number / set size), which helps pin the set.
  - Gold border: if Scryfall has only one gold printing of the card, use it without decoding the signature.
- If two printings are still possible, say so and pick the most likely one, explaining why.

## 3. Prices
- Use the EUR price (`prices.eur`, or `prices.eur_foil` for foils), taken from `/cards/<set>/<num>/<lang>`
  (`/en` for English and for the English fallback) so prices are consistent.
- Scryfall rarely prices non-English cards. If the card's language has no price, use the English price of the same printing.
- If the printing has no English version (e.g. `4bb`), use another language's price as a guide.

## 4. Update the collection file
- Keep the existing structure exactly. Table columns, in order:
  `| Qty | Printed Name | English Name | Color | Identity | Type | Mana | Set | Code | # | Lang | Foil | EUR | Price date | Bought EUR | Notes | Scryfall ID |`
- Color = Scryfall's `colors` field, which is the judge: do not infer color from the mana cost, frame or art.
  Write it as WUBRG letters in that order (e.g. `R`, `UR`); `C` if empty. So devoid cards (e.g. Fanged Flames)
  are `C` even though they cost red mana, and artifacts with coloured mana costs follow whatever Scryfall says.
  For double-faced cards use the front face (`card_faces[0].colors` when the top-level `colors` is missing).
- Identity = Scryfall's `color_identity` field (top level, which also covers double-faced cards). Same WUBRG-letter format as Color,
  `C` if empty. It can be wider than Color: it includes color symbols in rules/reminder text and the land-type mana of lands.
- Type = English `type_line` before the `—` (no subtypes), front face only for double-faced/split cards.
- Mana = Scryfall `mana_cost` exactly as returned, in brace notation (e.g. `{1}{R}`, `{X}{R}{R}`). Empty for lands.
  If the top-level `mana_cost` is missing, join the faces' non-empty costs with ` // `
  (so a transforming card with a cost-less back face is just the front cost, e.g. `{U}`).
- Scryfall ID = the `id` of the exact printing (used by the viewer for images, so it must always be filled):
  - English rows: the `id` from `/cards/<set>/<#>`.
  - Non-English rows: the `id` from `/cards/<set>/<#>/<lang>` if that printing exists and its `image_status` is
    `highres_scan` or `lowres` (a real scan); otherwise the English printing's `id` (Scryfall only has a placeholder image).
  - Take it from the responses you already fetch for prices; no extra requests.
- One row per unique combination of Code + # + Lang + Foil.
  If that combination already exists, increase Qty and refresh EUR + Price date instead of adding a new row.
- Price date = today's date (`date +%Y-%m-%d`).
- Do not add page/slot, condition, artist or USD columns.
- Leave Notes empty: write the cell as `| |` (single space). Prices in EUR are plain numbers (e.g. `1.25`), with no `*` or `~` markers.
- Recompute the Summary (total cards, estimated EUR = Σ Qty × EUR) with `python3`, not by hand.

## 5. Report back
Briefly list what was added or updated (qty, name, set, EUR), the new totals, any photos skipped
(already in the log or duplicates),
and a separate short "confirm in hand" list (uncertain foils or printings).

---
name: analyse-meta
description: Analyse the Pauper metagame on deckscout.fyi for a time window (7d, 14d, 30d or 90d) and write a report of which top archetype cards are missing from mtg-collection.md
argument-hint: "[7|14|30|90]"
---
Analyse the Pauper metagame on DeckScout and cross-check it against my collection.

Window argument: $ARGUMENTS

## 0. Pick the window
- Allowed windows: 7, 14, 30 or 90 days (accept `7d`, `14d`, etc. too).
- If the argument is empty, ask with AskUserQuestion which window to use (options 7d, 14d, 30d, 90d; 30d first, marked Recommended and the default).
- If the user gives something else, ask again.

## 1. Get the archetype list
- Metagame page for the window: `https://deckscout.fyi/metagame/pauper/?window=<N>` for 7, 14 and 90;
  `https://deckscout.fyi/metagame/pauper/` for 30 (no parameter).
- With WebFetch, read the ranked table: rank, archetype, share, decks, URL. Also note the total decks and the unclassified share.
- `?all=True` (combined with the window as `?window=<N>&all=True`) shows the archetypes beyond the first 20.
- Analyse every archetype with at least ~5 decks in the window. List the rest, by name, in `@others`.

## 2. Read each archetype's top cards
- Fetch each archetype page, passing the same window (`<archetype-url>?window=<N>`, none for 30), in parallel batches.
- Ask WebFetch for **only** the Top Cards tables (mainboard and sideboard, every row with play rate and avg copies), no decklists. The pages are huge and get truncated; the tables are at the top.
- Check that the page's deck count roughly matches the metagame table. If it does not, the window was not applied: say so and retry before using the data.
- Parallel results can come back in a different order than the calls, and some calls fail transiently. Match each result to its archetype by its card list (and retry failures), do not rely on order.

## 3. Write the data file
Write it to the scratchpad directory, one block per archetype, in ranked order:

```text
@total 877
@unclassified 12.5%
@others Caw Gates, Jeskai Control, Slivers
# Mono Red Madness | 15.6% | 137
M Sneaky Snacker:4,Fiery Temper:3.9,Lightning Bolt:3.7
S Pyroblast:3.5,Relic of Progenitus:2.7
```

`M` is the mainboard line, `S` the sideboard line, as `Card name:avg copies`. Use `;` instead of a comma inside a card name
(`Leonardo; Big Brother`). The `@` lines are optional. `example-data.txt` in this skill's folder is a full 30-day example.

## 4. Generate the report
Run from the repo root:

```bash
node .claude/skills/analyse-meta/generate-report.js <data-file> <N>
```

It reads `mtg-collection.md` and writes `reports/report-<today>-<N>d.md` with: scope and method, a summary table
(coverage, cards short, copies short), takeaways, a "most useful cards to buy" table, one section per archetype, and caveats.
Copies needed are the site's averages rounded to whole copies; ownership is matched by English name (double-faced cards by either face).
Do not compute the numbers by hand.

## 5. Report back
Give the report path, the window used, the fully covered / within-reach / far-from-complete archetypes, the top few cards to buy, and any archetype whose page could not be read or whose deck count did not match.

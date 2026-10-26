# MTG Collection

Card data and prices from [Scryfall](https://scryfall.com/docs/api).

**Columns**
- **Color**: card colors from Scryfall as WUBRG letters (e.g. `R`, `UR`); `C` = colorless (incl. devoid)
- **Identity**: color identity from Scryfall (`color_identity`) as WUBRG letters (e.g. `R`, `UR`); `C` = none. Includes colors in rules text and reminder text, so it can be wider than Color (e.g. Ancient Grudge is `R` but `RG`; lands that tap for mana have an identity but no color). The viewer filters on this column
- **Type**: English card type without subtypes (e.g. `Instant`, `Artifact Creature`, `Legendary Creature`)
- **Mana**: mana cost from Scryfall in its brace notation (e.g. `{1}{R}`, `{X}{R}`); empty for lands; both faces as `A // B` for split cards
- **Lang**: EN, IT, DE, ...
- **Foil**: Yes / No
- **EUR**: Scryfall price per copy; `*` = price of the English version of the same printing (Scryfall has no price for that language)
- **Price date**: when the price was taken
- **Scryfall ID**: the exact Scryfall printing, used for images and links. For non-English rows it is the localized printing when Scryfall has a scan of it, otherwise the English printing

## Cards

| Qty | Printed Name | English Name | Color | Identity | Type | Mana | Set | Code | # | Lang | Foil | EUR | Price date | Notes | Scryfall ID |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 | Chain Lightning | Chain Lightning | R | R | Sorcery | {R} | Dominaria Remastered | dmr | 316 | EN | No | 0.39 | 2026-10-25 | Retro frame | e4dfc299-0cf5-40ab-9f50-11408ff82282 |
| 2 | Antico Rancore | Ancient Grudge | R | RG | Instant | {1}{R} | Innistrad | isd | 127 | IT | No | 0.25* | 2026-10-25 | | e5e7b966-7c5b-44e6-a6df-4bd7af4edaa9 |
| 1 | Bauchschuss | Gut Shot | R | R | Instant | {R/P} | New Phyrexia | nph | 86 | DE | No | 5.24* | 2026-10-25 | Foil EN ≈ €29 | ad582629-4985-411b-999d-2eb3d14bbba8 |
| 3 | Colpo di Budella | Gut Shot | R | R | Instant | {R/P} | New Phyrexia | nph | 86 | IT | No | 5.24* | 2026-10-25 | Foil EN ≈ €29 | a54a2a30-b96a-49c7-9151-1f4b0d4a4413 |
| 1 | Faithless Looting | Faithless Looting | R | R | Sorcery | {R} | Innistrad Remastered | inr | 151 | EN | No | 0.79 | 2026-10-25 | | 52e47757-0aa9-48b0-8b43-e2483d7eed67 |
| 1 | Faithless Looting | Faithless Looting | R | R | Sorcery | {R} | Innistrad Remastered | inr | 151 | EN | Yes | 1.25 | 2026-10-25 | Foil (judging by the shine in the photo; confirm) | 52e47757-0aa9-48b0-8b43-e2483d7eed67 |
| 2 | Saccheggio degli Infedeli | Faithless Looting | R | R | Sorcery | {R} | Dark Ascension | dka | 87 | IT | No | 0.39* | 2026-10-25 | | a1b0da17-d595-441d-811c-a2d28d2bb232 |
| 4 | Red Elemental Blast | Red Elemental Blast | R | R | Instant | {R} | Revised Edition | 3ed | 171 | EN | No | 6.51 | 2026-10-25 | White border; no © 1995 line = Revised | 2d83a2a3-5495-4457-8eb7-9f9a75da6cc3 |
| 4 | Pyroblast | Pyroblast | R | R | Instant | {R} | World Championship Decks 1998 | wc98 | bs213sb | EN | No | 3.49 | 2026-10-25 | Gold border (Brian Selden SB), not tournament legal | 4ed2611b-8e9f-42e2-8271-25e602a2bfa9 |
| 1 | Fulmine | Lightning Bolt | R | R | Instant | {R} | Fourth Edition Foreign Black Border | 4bb | 208 | IT | No | ~18.52 | 2026-10-25 | No IT price on Scryfall; ES 4bb copy used as a guide | 310de1ef-f1b6-4b61-9d6c-6b70382a7f95 |
| 3 | Fulmine | Lightning Bolt | R | R | Instant | {R} | Magic 2011 | m11 | 149 | IT | No | 1.42* | 2026-10-25 | | e768c957-3a1f-42f5-853a-96942f645df5 |
| 4 | Dardo di Lava | Lava Dart | R | R | Instant | {R} | Modern Horizons | mh1 | 134 | IT | No | 0.93* | 2026-10-25 | Foil EN ≈ €15 | b16dd041-451d-4914-8c46-aa315a90d802 |
| 3 | Gettato nel Fuoco | Cast into the Fire | R | R | Instant | {1}{R} | The Lord of the Rings: Tales of Middle-earth | ltr | 118 | IT | No | 0.88 | 2026-10-25 | | 2ef878cb-27b6-47d8-ad11-bd20529b0e7e |
| 2 | Makeshift Munitions | Makeshift Munitions | R | R | Enchantment | {1}{R} | Commander Masters | cmm | 242 | EN | No | 0.30 | 2026-10-25 | | 60715b6d-b223-431a-85d8-27d7c05469b2 |
| 3 | Grab the Prize | Grab the Prize | R | R | Sorcery | {1}{R} | Duskmourn: House of Horror | dsk | 138 | EN | No | 0.72 | 2026-10-25 | | 50895202-f1a1-4840-a11a-55b78b8b5929 |
| 1 | Grab the Prize | Grab the Prize | R | R | Sorcery | {1}{R} | Duskmourn: House of Horror | dsk | 138 | EN | Yes | 0.98 | 2026-10-25 | Foil judging by the shine in the photo; confirm | 50895202-f1a1-4840-a11a-55b78b8b5929 |
| 4 | Temperamento Focoso | Fiery Temper | R | R | Instant | {1}{R}{R} | Torment | tor | 97 | IT | No | 0.45* | 2026-10-25 | Foil EN ≈ €18.5 | 918e46b7-cbca-4acf-8e83-94b5fcadcc49 |
| 4 | Highway Robbery | Highway Robbery | R | R | Sorcery | {1}{R} | Outlaws of Thunder Junction | otj | 129 | EN | No | 0.93 | 2026-10-25 | | 31a88429-9204-4a23-a7a8-babbd6bab79f |
| 2 | Fireblast | Fireblast | R | R | Instant | {4}{R}{R} | Premium Deck Series: Fire and Lightning | pd2 | 26 | EN | Yes | 2.11 | 2026-10-25 | Set is foil-only | 14d6bfda-c066-4cc0-b317-3d8c7c168546 |
| 2 | Fireblast | Fireblast | R | R | Instant | {4}{R}{R} | World Championship Decks 1998 | wc98 | br79 | EN | No | 1.48 | 2026-10-25 | Gold border (Ben Rubin), not tournament legal | 53f1646b-200d-41e7-b7cb-09fa7579926b |
| 4 | Cleansing Wildfire | Cleansing Wildfire | R | R | Sorcery | {1}{R} | Zendikar Rising | znr | 137 | EN | No | 0.79 | 2026-10-25 | | 492d77e5-acc6-41b8-8930-f39d69234919 |
| 4 | Wrenn's Resolve | Wrenn's Resolve | R | R | Sorcery | {1}{R} | March of the Machine | mom | 173 | EN | No | 1.94 | 2026-10-25 | | 9a47999c-12d5-4e1a-a9c1-40a1757007f1 |
| 4 | Rally at the Hornburg | Rally at the Hornburg | R | R | Sorcery | {1}{R} | The Lord of the Rings: Tales of Middle-earth | ltr | 142 | EN | No | 0.29 | 2026-10-25 | | ee7292f7-1c7e-449c-9c52-7584d6a14c2c |
| 3 | End the Festivities | End the Festivities | R | R | Sorcery | {R} | Innistrad: Crimson Vow | vow | 155 | EN | No | 1.49 | 2026-10-25 | | bec748e6-7245-4a71-aeee-cefed8346948 |
| 2 | Bitter Reunion | Bitter Reunion | R | R | Enchantment | {1}{R} | The Brothers' War | bro | 127 | EN | No | 0.64 | 2026-10-25 | | 345a1c80-41d6-43b1-83ab-1aa56dd06b1b |
| 3 | Searing Blaze | Searing Blaze | R | R | Instant | {R}{R} | Worldwake | wwk | 90 | EN | No | 1.40 | 2026-10-25 | © 1993-2010 = WWK, not DDI; Foil EN ≈ €10 | 301f13dd-39b8-4a93-9c05-3dc4fa1f1c75 |
| 3 | Insidia Tettonica | Tectonic Hazard | R | R | Sorcery | {R} | The Lost Caverns of Ixalan | lci | 169 | IT | No | 0.30* | 2026-10-25 | | 5204c781-f568-4c7f-b3f7-ce4dd678689b |
| 1 | Kaervek's Torch | Kaervek's Torch | R | R | Sorcery | {X}{R} | Mirage | mir | 185 | EN | No | 0.67 | 2026-10-25 | | 0a1624ab-e50e-48a3-acf7-457069914616 |
| 3 | Fiery Cannonade | Fiery Cannonade | R | R | Instant | {2}{R} | Ixalan | xln | 143 | EN | No | 0.32 | 2026-10-25 | | 664d21c9-4b6c-4797-845f-7bca79c2b76b |
| 2 | Breath Weapon | Breath Weapon | R | R | Instant | {2}{R} | Commander Legends: Battle for Baldur's Gate | clb | 165 | EN | No | 6.43 | 2026-10-25 | | 0174e40a-0ef5-4439-91e6-3fc39f482520 |
| 3 | Sbriciolare | Smash to Smithereens | R | R | Instant | {1}{R} | Magic Origins | ori | 163 | IT | No | 0.31* | 2026-10-25 | | 655c489f-bffb-45a4-8e7c-2d1a35220197 |
| 4 | Canzone Ribollente | Seething Song | R | R | Instant | {2}{R} | Mirrodin | mrd | 104 | IT | No | 3.80* | 2026-10-25 | Foil EN ≈ €24 | 9213d580-7953-455f-abbe-99d3db2705cf |
| 2 | Krark-Clan Shaman | Krark-Clan Shaman | R | R | Creature | {R} | Mirrodin | mrd | 98 | EN | No | 6.78 | 2026-10-25 | Foil EN ≈ €29 | 975f9ea8-af2c-456f-acd0-ffa9ea0d98c1 |
| 4 | Sciamano di Krark-Clan | Krark-Clan Shaman | R | R | Creature | {R} | Mirrodin | mrd | 98 | IT | No | 6.89* | 2026-10-25 | Foil EN ≈ €29 | 975f9ea8-af2c-456f-acd0-ffa9ea0d98c1 |
| 1 | Chain Lightning | Chain Lightning | R | R | Sorcery | {R} | Premium Deck Series: Fire and Lightning | pd2 | 16 | EN | Yes | 0.94 | 2026-10-25 | Set is foil-only | 9ca05db2-ad92-4f4a-992d-b7f08f4f9c26 |
| 4 | Kessig Flamebreather | Kessig Flamebreather | R | R | Creature | {1}{R} | Innistrad: Crimson Vow | vow | 164 | EN | No | 4.12 | 2026-10-25 | | 303ad78a-b02a-44dc-afe6-7f95781a5062 |
| 3 | Voldaren Epicure | Voldaren Epicure | R | R | Creature | {R} | Innistrad Remastered | inr | 182 | EN | No | 0.34 | 2026-10-25 | | e8fe855c-fe94-4de7-a033-9892a9d6ee0e |
| 1 | Voldaren Epicure | Voldaren Epicure | R | R | Creature | {R} | Innistrad Remastered | inr | 182 | EN | Yes | 0.26 | 2026-10-25 | Foil judging by the shine in the photo; confirm | e8fe855c-fe94-4de7-a033-9892a9d6ee0e |
| 4 | Cecchino | Guttersnipe | R | R | Creature | {2}{R} | Ravnica Remastered | rvr | 110 | IT | No | 0.38* | 2026-10-25 | | 48eeb13e-26f8-4fc7-8850-d38790317ea4 |
| 4 | Goblin in Agguato | Goblin Bushwhacker | R | R | Creature | {R} | Zendikar | zen | 125 | IT | No | 1.91* | 2026-10-25 | Foil EN ≈ €7.8 | 4085a5bf-a71b-4c73-9b39-0dcc328fe11b |
| 4 | Goblin Razziatore di Tombe | Goblin Tomb Raider | R | R | Creature | {R} | The Lost Caverns of Ixalan | lci | 151 | IT | No | 0.35* | 2026-10-25 | | 018160fe-f602-43f5-8495-241a08eaa69c |
| 4 | Galvanic Blast | Galvanic Blast | R | R | Instant | {R} | Scars of Mirrodin | som | 91 | EN | No | 2.36 | 2026-10-25 | Foil EN ≈ €12 | f5881bbc-8600-464d-9dcd-5a7780918d1d |
| 4 | Melded Moxite | Melded Moxite | R | R | Artifact | {1}{R} | Edge of Eternities | eoe | 143 | EN | No | 0.19 | 2026-10-25 | | 474c067f-eb24-4ae8-b4c0-f6f8e24cdb2a |
| 1 | Glimpse the Impossible | Glimpse the Impossible | R | R | Sorcery | {2}{R} | Modern Horizons 3 | mh3 | 124 | EN | No | 0.20 | 2026-10-25 | | 133ad0dd-5b61-4c38-9264-0b0e75b95d95 |
| 4 | Vandalblast | Vandalblast | R | R | Sorcery | {R} | Final Fantasy Commander | fic | 298 | EN | No | 2.86 | 2026-10-25 | | 9b5a8df2-2bc0-408c-a9d2-e70c0f56642d |
| 3 | Fiamme Azzannanti | Fanged Flames | C | R | Sorcery | {1}{R} | Modern Horizons 3 | mh3 | 118 | IT | No | 0.06* | 2026-10-25 | | fcfac301-55db-49a7-9a0d-918c907703da |
| 1 | Siege Smash | Siege Smash | R | R | Instant | {1}{R} | Modern Horizons 3 | mh3 | 136 | EN | No | 0.14 | 2026-10-25 | | f33e3b25-76f5-4263-a309-9ea97f2d8248 |
| 4 | Experimental Synthesizer | Experimental Synthesizer | R | R | Artifact | {R} | Kamigawa: Neon Dynasty | neo | 138 | EN | No | 0.75 | 2026-10-25 | | c47931c9-685d-4b83-8299-bc347224b4e8 |
| 3 | Clockwork Percussionist | Clockwork Percussionist | R | R | Artifact Creature | {R} | Duskmourn: House of Horror | dsk | 130 | EN | No | 0.17 | 2026-10-25 | 3 copies also look shiny; possible foil, confirm | 10986e5a-9fc6-41e2-8352-289328245171 |
| 1 | Clockwork Percussionist | Clockwork Percussionist | R | R | Artifact Creature | {R} | Duskmourn: House of Horror | dsk | 130 | EN | Yes | 0.27 | 2026-10-25 | | 10986e5a-9fc6-41e2-8352-289328245171 |
| 2 | Gorilla Shaman | Gorilla Shaman | R | R | Creature | {R} | Alliances | all | 72b | EN | No | 0.72 | 2026-10-25 | Kaysa flavor = 72b variant | 5a16231c-1f73-4dec-9d88-e3d62e93a70f |
| 1 | Sciamano dei Gorilla | Gorilla Shaman | R | R | Creature | {R} | Alliances | all | 72b | IT | No | 0.72* | 2026-10-25 | Kaysa flavor = 72b variant | 5a16231c-1f73-4dec-9d88-e3d62e93a70f |
| 4 | Transazione dell'Ineluttabile | Reckoner's Bargain | B | B | Instant | {1}{B} | Kamigawa: Neon Dynasty | neo | 120 | IT | No | 1.66* | 2026-10-25 | | 6338942d-d650-4571-8ec6-4d658792c53e |
| 1 | Duress | Duress | B | B | Sorcery | {B} | Duel Decks: Divine vs. Demonic | ddc | 46 | EN | No | 0.38 | 2026-10-25 | Liliana flavor, © 2009, skull set symbol; could be M10/M11/M13 if symbol misread | c9f72fea-b4f9-4963-997e-e9ef2aca498a |
| 1 | Duress | Duress | B | B | Sorcery | {B} | Urza's Saga | usg | 132 | EN | No | 3.29 | 2026-10-25 | | ca367f49-0f4a-4b7f-8104-851893fbcd8a |
| 1 | Costrizione | Duress | B | B | Sorcery | {B} | Magic 2013 | m13 | 90 | IT | No | 0.16* | 2026-10-25 | | f7201d43-ae2e-4faa-a508-8555079c3bc7 |
| 1 | Costrizione | Duress | B | B | Sorcery | {B} | Magic 2011 | m11 | 96 | IT | No | 0.15* | 2026-10-25 | | 7e1445d6-ae16-492c-a378-d3aa5746c610 |
| 2 | Ashes to Ashes | Ashes to Ashes | B | B | Sorcery | {1}{B}{B} | Fourth Edition | 4ed | 119 | EN | No | 0.48 | 2026-10-25 | White border, © 1995 | 28f40650-9dd5-473d-a660-448672d475a5 |
| 2 | Arms of Hadar | Arms of Hadar | B | B | Sorcery | {3}{B} | Commander Legends: Battle for Baldur's Gate | clb | 113 | EN | No | 2.52 | 2026-10-25 | | db1fd431-8f6d-4ca5-bc0c-53881c500da1 |
| 2 | Analisi delle Tossine | Toxin Analysis | B | B | Instant | {B} | Murders at Karlov Manor | mkm | 107 | IT | No | 0.35* | 2026-10-25 | | 0eda1aff-c1f4-4171-a800-605396cc8168 |
| 3 | Cut Down | Cut Down | B | B | Instant | {B} | Dominaria United | dmu | 89 | EN | No | 5.02 | 2026-10-25 | | 753db072-5d6a-4f37-8f7d-255572ecd3bd |
| 3 | Black Mage's Rod | Black Mage's Rod | B | B | Artifact | {1}{B} | Final Fantasy | fin | 90 | EN | No | 0.21 | 2026-10-25 | | 35e8f140-055f-4fc7-a765-fb030d828214 |
| 2 | Faerie Macabre | Faerie Macabre | B | B | Creature | {1}{B}{B} | Shadowmoor | shm | 66 | EN | No | 7.57 | 2026-10-25 | Foil EN ≈ €36 | ead8befa-27dd-4ec4-b317-1c231407e0ac |
| 2 | Shrivel | Shrivel | B | B | Sorcery | {1}{B} | Modern Masters 2015 | mm2 | 95 | EN | No | 0.09 | 2026-10-25 | | db5460a0-1aae-45bf-a2aa-5b95fd29d06f |
| 4 | Troll of Khazad-dûm | Troll of Khazad-dûm | B | B | Creature | {5}{B} | The Lord of the Rings: Tales of Middle-earth | ltr | 111 | EN | No | 1.03 | 2026-10-25 | | a6539e26-b63b-4725-9407-caaf451de084 |
| 4 | Thorn of the Black Rose | Thorn of the Black Rose | B | B | Creature | {3}{B} | Commander Legends | cmr | 154 | EN | No | 0.28 | 2026-10-25 | | 2b7538ad-cc41-4229-8a39-c1db21f2899a |
| 4 | Gixian Infiltrator | Gixian Infiltrator | B | B | Creature | {1}{B} | The Brothers' War | bro | 98 | EN | No | 0.45 | 2026-10-25 | | c94a3317-7d1f-4f29-8353-180f1ab48d18 |
| 4 | Mukotai Ambusher | Mukotai Ambusher | B | B | Artifact Creature | {3}{B} | Kamigawa: Neon Dynasty | neo | 342 | EN | No | 0.10 | 2026-10-25 | Showcase ninja frame | 357594c7-a9a6-468d-b262-e5f7d5e35f54 |
| 4 | Rana Pescatrice di Gurmag | Gurmag Angler | B | B | Creature | {6}{B} | Fate Reforged | frf | 72 | IT | No | 0.21* | 2026-10-25 | | c60a8cf1-a8c7-4f45-bbd3-188fab2652f9 |
| 2 | Zanne Inaspettate | Unexpected Fangs | B | B | Instant | {1}{B} | Ikoria: Lair of Behemoths | iko | 102 | IT | No | 0.59* | 2026-10-25 | | aa6494ad-a35e-4b09-8623-7740f3c20b0b |
| 2 | Unexpected Fangs | Unexpected Fangs | B | B | Instant | {1}{B} | Ikoria: Lair of Behemoths | iko | 102 | EN | No | 0.59 | 2026-10-25 | | aa6494ad-a35e-4b09-8623-7740f3c20b0b |
| 4 | Extract a Confession | Extract a Confession | B | B | Sorcery | {1}{B} | Murders at Karlov Manor | mkm | 84 | EN | No | 0.30 | 2026-10-25 | | 256c8b6e-4031-458b-8eb9-bbfe58405a0c |
| 3 | Blood Fountain | Blood Fountain | B | B | Artifact | {B} | Innistrad: Crimson Vow | vow | 95 | EN | No | 0.95 | 2026-10-25 | | dd03651e-ada0-41dc-8722-0eba476943e3 |
| 4 | Snuff Out | Snuff Out | B | B | Instant | {3}{B} | Final Fantasy Commander | fic | 285 | EN | No | 7.78 | 2026-10-25 | | a3b1fc65-3620-4052-a1f8-1779d95029c7 |
| 2 | Dark Ritual | Dark Ritual | B | B | Instant | {B} | Ice Age | ice | 120 | EN | No | 2.29 | 2026-10-25 | | 4ebcd681-1871-4914-bcd7-6bd95829f6e0 |
| 2 | Dark Ritual | Dark Ritual | B | B | Instant | {B} | Planechase | hop | 24 | EN | No | 4.16 | 2026-10-25 | © 1993-2009, 24/169 | c8c774f2-110e-476c-a4ff-cc86d31c6ae7 |
| 3 | Fanatical Offering | Fanatical Offering | B | B | Instant | {1}{B} | The Lost Caverns of Ixalan | lci | 105 | EN | No | 2.70 | 2026-10-25 | | d896dd52-b134-4b55-ab91-ccb05ecc50f4 |
| 1 | Offerta Fanatica | Fanatical Offering | B | B | Instant | {1}{B} | The Lost Caverns of Ixalan | lci | 105 | IT | No | 2.70* | 2026-10-25 | | d896dd52-b134-4b55-ab91-ccb05ecc50f4 |
| 4 | Intuizione dello Sbudellatore | Eviscerator's Insight | B | B | Instant | {1}{B} | Modern Horizons 3 | mh3 | 93 | IT | No | 0.26* | 2026-10-25 | | b00573bd-5bbb-4531-a0bb-a40f62b92b88 |
| 1 | Cast Down | Cast Down | B | B | Instant | {1}{B} | Double Masters | 2xm | 79 | EN | No | 2.22 | 2026-10-25 | | 480fecdd-5978-47e6-9c25-7a04cdf616db |
| 1 | Cast Down | Cast Down | B | B | Instant | {1}{B} | Dominaria | dom | 81 | EN | No | 1.89 | 2026-10-25 | | 116ce944-6871-4f51-a889-d9c4a5d7cff2 |
| 3 | Suffocating Fumes | Suffocating Fumes | B | B | Instant | {2}{B} | Ikoria: Lair of Behemoths | iko | 100 | EN | No | 0.51 | 2026-10-25 | Also look shiny; possible foil, confirm | 66b562e4-35df-4aee-848d-ceb4204bbe58 |
| 1 | Suffocating Fumes | Suffocating Fumes | B | B | Instant | {2}{B} | Ikoria: Lair of Behemoths | iko | 100 | EN | Yes | 2.73 | 2026-10-25 | | 66b562e4-35df-4aee-848d-ceb4204bbe58 |
| 3 | Gingillo Cupo | Grim Bauble | B | B | Artifact | {B} | Aetherdrift | dft | 88 | IT | No | 0.26* | 2026-10-25 | | 9bfdf60a-6f67-4872-8961-d63776b192c3 |
| 1 | Pestilence | Pestilence | B | B | Enchantment | {2}{B}{B} | Urza's Saga | usg | 147 | EN | No | 0.51 | 2026-10-25 | | 2f1f5630-647f-4789-8506-e7fafcbdd671 |
| 1 | Hymn to Tourach | Hymn to Tourach | B | B | Sorcery | {B}{B} | Fallen Empires | fem | 38d | EN | No | 0.96 | 2026-10-25 | Scott Kirschner art | 5bc50e08-dd6f-4ea7-87f8-cce72bafb928 |
| 2 | Vampiro di Sengir | Sengir Vampire | B | B | Creature | {3}{B}{B} | Torment | tor | 80 | IT | No | 0.43* | 2026-10-25 | Foil EN ≈ €15 | 2308c0c4-7a78-4da8-8dd8-5b35b49a1896 |
| 4 | Prismatic Strands | Prismatic Strands | W | W | Instant | {2}{W} | Judgment | jud | 18 | EN | No | 10.80 | 2026-10-25 | Foil EN ≈ €57 | 3454ef42-2e0b-4ce4-945f-e4ec3e83c39d |
| 4 | Thraben Charm | Thraben Charm | W | W | Instant | {1}{W} | Modern Horizons 3 | mh3 | 45 | EN | No | 0.46 | 2026-10-25 | | dd28a646-f38f-4cdf-948c-969cd979e5e6 |
| 3 | Viaggio verso il Nulla | Journey to Nowhere | W | W | Enchantment | {1}{W} | Zendikar | zen | 14 | IT | No | 0.75* | 2026-10-25 | Foil EN ≈ €7 | 09cfe585-8a55-4b27-89e0-dfb6946fe1f3 |
| 1 | Viaggio verso il Nulla | Journey to Nowhere | W | W | Enchantment | {1}{W} | Commander 2011 | cmd | 17 | IT | No | 1.40* | 2026-10-25 | © 1993-2011 | 4686b51c-e02b-48c1-bafe-e8d08a5407b9 |
| 4 | Sacred Cat | Sacred Cat | W | W | Creature | {W} | Amonkhet | akh | 27 | EN | No | 0.70 | 2026-10-25 | Foil EN ≈ €16 | 08891c78-13c1-4d84-aa9c-78346b3b7d18 |
| 3 | Guardia del Patto delle Gilde | Guardian of the Guildpact | W | W | Creature | {3}{W} | Dissension | dis | 10 | IT | No | 1.16* | 2026-10-25 | Foil EN ≈ €13 | c8dd004b-01e4-4fe1-a164-9f2ea8d7d88e |
| 4 | Medico Fuorilegge | Outlaw Medic | W | W | Creature | {1}{W} | Outlaws of Thunder Junction | otj | 23 | IT | No | 0.13* | 2026-10-25 | | 2feaa51e-47fb-4849-b420-ee7278f3489a |
| 2 | Revocare Esistenza | Revoke Existence | W | W | Sorcery | {1}{W} | Theros Beyond Death | thb | 34 | IT | No | 0.10* | 2026-10-25 | | 9dbb9f86-f487-44b1-815f-30d87868b531 |
| 1 | Revoke Existence | Revoke Existence | W | W | Sorcery | {1}{W} | Theros Beyond Death | thb | 34 | EN | No | 0.10 | 2026-10-25 | | 9dbb9f86-f487-44b1-815f-30d87868b531 |
| 1 | Auramancer | Auramancer | W | W | Creature | {2}{W} | Odyssey | ody | 5 | EN | No | 0.34 | 2026-10-25 | Foil EN ≈ €6 | 090dd4cf-5087-4ed8-a944-f3794e5862d5 |
| 4 | Pescatrice Volante Kor | Kor Skyfisher | W | W | Creature | {1}{W} | Zendikar | zen | 23 | IT | No | 1.18* | 2026-10-25 | Foil EN ≈ €7 | bb2e9465-f5ba-4c7b-9f03-d40dc8394acd |
| 1 | Kor Skyfisher | Kor Skyfisher | W | W | Creature | {1}{W} | URL/Convention Promos | purl | 23 | EN | Yes | 6.04 | 2026-10-25 | "MAGIC" watermark promo (MTG 2010); Scryfall lists it as foil-only | cffc6114-aa99-4c56-80fc-92fb32639d13 |
| 1 | Polvere alla Polvere | Dust to Dust | W | W | Sorcery | {1}{W}{W} | The Dark | drk | 5 | IT | No | 18.20* | 2026-10-25 | | ade075fd-73ee-4d12-a2da-48e5938043af |
| 4 | Return to Dust | Return to Dust | W | W | Instant | {2}{W}{W} | The Lost Caverns of Ixalan Commander | lcc | 136 | EN | No | 0.18 | 2026-10-25 | | 664e3826-799b-4edb-8811-2d2b6355edaf |
| 2 | Coalition Honor Guard | Coalition Honor Guard | W | W | Creature | {3}{W} | Apocalypse | apc | 3 | EN | No | 0.32 | 2026-10-25 | Foil EN ≈ €5 | c5b7be3e-b4af-46d4-bcc6-b44c651f2012 |
| 4 | Angelo di Serra | Serra Angel | W | W | Creature | {3}{W}{W} | Magic 2011 | m11 | 27 | IT | No | 0.05* | 2026-10-25 | | 3c53890f-8cf2-42ad-8b5f-66badc99630c |
| 4 | Nota Mentale | Mental Note | U | U | Instant | {U} | Judgment | jud | 46 | IT | No | 9.48* | 2026-10-25 | Foil EN ≈ €65 | 1f343724-6ecd-494f-8bfc-93676af4e173 |
| 1 | Contromagia | Counterspell | U | U | Instant | {U}{U} | Tempest | tmp | 57 | IT | No | 1.68* | 2026-10-25 | Stephen Daniele art, Interruzione | dacdd380-71cf-4832-bd02-3697501325f3 |
| 1 | Contromagia | Counterspell | U | U | Instant | {U}{U} | Mercadian Masques | mmq | 69 | IT | No | 2.04* | 2026-10-25 | Gao Yan art; green sleeve ignored; Foil EN ≈ €88 | 7bd03c80-7812-4704-9e07-9cf73b49c01f |
| 1 | Contromagia | Counterspell | U | U | Instant | {U}{U} | Fifth Edition | 5ed | 77 | IT | No | 1.37* | 2026-10-25 | white border, Hannibal King, Interruzione, (c)1997 | b975289d-d8b8-46b4-8c60-d6ed4b594519 |
| 1 | Contromagia | Counterspell | U | U | Instant | {U}{U} | Classic Sixth Edition | 6ed | 61 | IT | No | 1.12* | 2026-10-25 | white border, Hannibal King, Istantaneo, VI symbol | ee0d3f5f-7790-4772-bead-5d7114a23e94 |
| 4 | Lórien Rivelata | Lórien Revealed | U | U | Sorcery | {3}{U}{U} | The Lord of the Rings: Tales of Middle-earth | ltr | 60 | IT | No | 4.64 | 2026-10-25 | | 0ce44270-a684-4489-9077-521456e6dfaa |
| 4 | Hydroblast | Hydroblast | U | U | Instant | {U} | Ice Age | ice | 72 | EN | No | 7.61 | 2026-10-25 | old frame, Interrupt, Kaja Foglio; copyright line not legible (me1 has 1997 frame, ruled out) | f62716f0-fde2-49ef-b8a4-c1b03f451194 |
| 2 | Tempesta Cerebrale | Brainstorm | U | U | Instant | {U} | Mercadian Masques | mmq | 61 | IT | No | 3.58* | 2026-10-25 | Foil EN ≈ €668 | 9ff71d13-c4b7-4125-ab10-db4abbb7a074 |
| 1 | Tempesta Cerebrale | Brainstorm | U | U | Instant | {U} | Commander 2011 | cmd | 40 | IT | No | 2.09* | 2026-10-25 | modern frame, 40/318 | beb755c1-9221-480e-bef9-73f1f13a3345 |
| 1 | Tempesta Cerebrale | Brainstorm | U | U | Instant | {U} | Fifth Edition | 5ed | 76 | IT | No | 1.71* | 2026-10-25 | white border, Christopher Rush | 1d6603e3-0680-4ba3-951b-cd9919eefd4f |
| 2 | Terminate | Terminate | BR | BR | Instant | {B}{R} | Modern Horizons 3 Commander | m3c | 274 | EN | No | 0.41 | 2026-10-25 | | a65eeee0-dc46-4ab9-a61f-c844c9705c0a |
| 1 | Terminare | Terminate | BR | BR | Instant | {B}{R} | Alara Reborn | arb | 46 | IT | No | 0.51* | 2026-10-25 | symbol looks ARB (cmd 231 is the other Wayne Reynolds IT printing) | dc8acab8-4469-4baa-af2f-a3f49b841a55 |
| 1 | Armadillo Cloak | Armadillo Cloak | WG | WG | Enchantment | {1}{G}{W} | Invasion | inv | 229 | EN | No | 1.35 | 2026-10-25 | Foil EN ≈ €43 | 9d816f98-6cb6-432c-b0a4-a0eed21658ac |
| 1 | Folgore Devastante | Blightning | BR | BR | Sorcery | {1}{B}{R} | Shards of Alara | ala | 156 | IT | Yes | 0.88* | 2026-10-25 | foil sheen clearly visible on frame and art (pre-star era); confirm | 3c05e8a2-b7d0-4f24-b2ae-8e4db30e5842 |
| 1 | Folgore Devastante | Blightning | BR | BR | Sorcery | {1}{B}{R} | Shards of Alara | ala | 156 | IT | No | 0.22* | 2026-10-25 | | 3c05e8a2-b7d0-4f24-b2ae-8e4db30e5842 |
| 2 | Burning-Tree Emissary | Burning-Tree Emissary | RG | RG | Creature | {R/G}{R/G} | Double Masters 2022 | 2x2 | 189 | EN | Yes | 0.32 | 2026-10-25 | one has readable star + coloured line; other has coloured line and foil sheen; confirm | ba327a5e-bd57-4e24-b4b4-062202df30e1 |
| 2 | Burning-Tree Emissary | Burning-Tree Emissary | RG | RG | Creature | {R/G}{R/G} | Double Masters 2022 | 2x2 | 189 | EN | No | 0.12 | 2026-10-25 | possible foil; confirm (one shows rainbow on art but collector line reads dot) | ba327a5e-bd57-4e24-b4b4-062202df30e1 |
| 4 | Abbandonare i Legami | Abandon Attachments | UR | UR | Instant | {1}{U/R} | Avatar: The Last Airbender | tla | 205 | IT | No | 0.35* | 2026-10-25 | | 74ca45a4-97ab-4255-9129-884e8b42b984 |
| 2 | Agony Warp | Agony Warp | UB | UB | Instant | {U}{B} | Double Masters 2022 | 2x2 | 168 | EN | Yes | 0.12 | 2026-10-25 | coloured collector line + foil sparkle; confirm | 5890a23e-1da0-432b-8dc8-85b92dee9ba1 |
| 2 | Agony Warp | Agony Warp | UB | UB | Instant | {U}{B} | Double Masters 2022 | 2x2 | 168 | EN | No | 0.08 | 2026-10-25 | possible foil; confirm (frames show some sparkle) | 5890a23e-1da0-432b-8dc8-85b92dee9ba1 |
| 4 | Inseguire il Passato | Pursue the Past | WR | WR | Sorcery | {R}{W} | Secrets of Strixhaven | sos | 216 | IT | No | 0.14* | 2026-10-25 | | 4584d5f7-b1f1-4c8e-80c5-ad35e44a968e |
| 4 | Sgranocchiatrice Subdola | Sneaky Snacker | UB | UB | Creature | {U}{B} | Modern Horizons 3 | mh3 | 205 | IT | No | 0.52* | 2026-10-25 | | 0e3aedae-e4bb-48e3-9f8b-bea0430df306 |
| 4 | Writhing Chrysalis | Writhing Chrysalis | C | RG | Creature | {2}{R}{G} | Modern Horizons 3 | mh3 | 208 | EN | No | 0.42 | 2026-10-25 | | f54dbeb1-51f8-40e2-912a-ec25457de5a2 |
| 4 | Rooftop Percher | Rooftop Percher | C | C | Creature | {5} | Lorwyn Eclipsed | ecl | 2 | EN | No | 0.11 | 2026-10-25 | | 2d89595c-1542-41fe-8d23-997522922698 |
| 3 | Scour from Existence | Scour from Existence | C | C | Instant | {7} | Battle for Zendikar | bfz | 13 | EN | No | 0.14 | 2026-10-25 | | 6e47edb2-e43d-479f-a911-e72b67a06c3b |
| 4 | Soul-Guide Lantern | Soul-Guide Lantern | C | C | Artifact | {1} | Edge of Eternities Commander | eoc | 143 | EN | No | 0.36 | 2026-10-25 | | f4907e7b-d6d5-4e9b-968f-bce34ae4a577 |
| 4 | Giant's Boulder | Giant's Boulder | C | C | Artifact | {1} | The Hobbit | hob | 173 | EN | No | 0.44 | 2026-10-25 | | ce254758-c928-4b43-a952-13fac1845668 |
| 4 | Ichor Wellspring | Ichor Wellspring | C | C | Artifact | {2} | The Brothers' War Retro Artifacts | brr | 21 | EN | No | 0.81 | 2026-10-25 | retro frame, copyright line ends "21"; two copies show glare, possible foil; confirm | 12402dc0-8eae-46e7-a09e-d06ea1670179 |
| 4 | Maelstrom Colossus | Maelstrom Colossus | C | C | Artifact Creature | {8} | Commander Legends | cmr | 322 | EN | No | 1.62 | 2026-10-25 | | 322491d2-d082-4d38-8d81-8588c011e725 |
| 4 | Barili di Gelatina Esplosiva | Barrels of Blasting Jelly | C | C | Artifact | {1} | Avatar: The Last Airbender | tla | 254 | IT | No | 0.17* | 2026-10-25 | collector line blurry; only Italian printing on Scryfall | 4fd83083-3779-41f0-90a0-a00e3270e4e6 |
| 3 | Ulamog's Crusher | Ulamog's Crusher | C | C | Creature | {8} | Modern Horizons 3 Commander | m3c | 161 | EN | No | 0.33 | 2026-10-25 | | ac896541-b271-4bbb-a45c-753869361df6 |
| 1 | Frantumatore di Ulamog | Ulamog's Crusher | C | C | Creature | {8} | Rise of the Eldrazi | roe | 13 | IT | No | 0.35* | 2026-10-25 | blurry; 2003 frame, only Italian printing on Scryfall; holo dot is the green sleeve | 76bacedb-9fa8-4a21-b0eb-e7ead64360b4 |
| 4 | Bonder's Ornament | Bonder's Ornament | C | C | Artifact | {3} | Commander 2020 | c20 | 67 | EN | No | 1.89 | 2026-10-25 | | 5afe425c-50a7-4d29-ac14-0edb094fc770 |
| 3 | Lembas | Lembas | C | C | Artifact | {2} | The Lord of the Rings: Tales of Middle-earth | ltr | 243 | EN | No | 1.88 | 2026-10-25 | | 3b46aacf-b31a-4380-9e4b-82795fbaba3b |
| 1 | Campfire | Campfire | C | C | Artifact | {1} | Commander Masters | cmm | 374 | EN | No | 4.09 | 2026-10-25 | | 34b64d10-c012-4370-b475-755c4025a348 |
| 2 | Hunter's Blowgun | Hunter's Blowgun | C | C | Artifact | {1} | The Lost Caverns of Ixalan | lci | 255 | EN | No | 0.18 | 2026-10-25 | | 3348abe7-6aa3-47f7-8203-a15f75007e33 |
| 2 | Cripta di Tormod | Tormod's Crypt | C | C | Artifact | {0} | Magic 2013 | m13 | 219 | IT | No | 0.72* | 2026-10-25 | | efdfb60b-948b-40fb-b18e-08f0300624b3 |
| 2 | Chromatic Star | Chromatic Star | C | C | Artifact | {1} | The Brothers' War Retro Artifacts | brr | 11 | EN | No | 0.28 | 2026-10-25 | retro frame, copyright line ends "11" | 669f7205-af98-4e9b-a5d1-2901507c511d |
| 1 | Sfera Cromatica | Chromatic Sphere | C | C | Artifact | {1} | Mirrodin | mrd | 151 | IT | Yes | 4.52* | 2026-10-25 | clear rainbow foil shine; 151/306 | f31a6dfd-93d2-49c8-a357-9a707b9c42bd |
| 1 | Reliquia del Progenitus | Relic of Progenitus | C | C | Artifact | {1} | Shards of Alara | ala | 218 | IT | No | 7.81* | 2026-10-25 | holo dot is the green sleeve | 90c41192-64ef-43aa-9af0-75f0d3f56688 |
| 3 | Nihil Spellbomb | Nihil Spellbomb | C | B | Artifact | {1} | Scars of Mirrodin | som | 187 | EN | No | 4.29 | 2026-10-25 | Foil EN ≈ €27 | 603d217b-6375-46fc-992a-8dbd779da1e5 |
| 3 | Bombarcana Nichilista | Nihil Spellbomb | C | B | Artifact | {1} | Scars of Mirrodin | som | 187 | IT | No | 4.29* | 2026-10-25 | Foil EN ≈ €27 | 603d217b-6375-46fc-992a-8dbd779da1e5 |
| 4 | Sinistre strix | Baleful Strix | UB | UB | Artifact Creature | {U}{B} | Final Fantasy Commander | fic | 318 | FR | No | 7.92* | 2026-10-25 | | 8396a154-00ec-469f-a083-cd3e0904775c |
| 4 | Mappa della Spedizione | Expedition Map | C | C | Artifact | {1} | Zendikar | zen | 201 | IT | No | 1.27* | 2026-10-25 | holo dot on one is the green sleeve; Foil EN ≈ €13 | c55bee97-593f-441f-b96c-a998d5212a55 |
| 4 | Faerie Seer | Faerie Seer | U | U | Creature | {U} | Modern Horizons | mh1 | 51 | EN | No | 0.73 | 2026-10-25 | | d1fcfeb4-1818-4e08-be4c-27b8a9dc12e6 |
| 3 | Augur of Bolas | Augur of Bolas | U | U | Creature | {1}{U} | Modern Masters 2017 | mm3 | 30 | EN | No | 0.24 | 2026-10-25 | | 8f7eca7a-5f42-4e58-a6c0-8d07517bda8a |
| 1 | Augure di Bolas | Augur of Bolas | U | U | Creature | {1}{U} | Magic 2013 | m13 | 43 | IT | No | 0.34* | 2026-10-25 | | 2e6ec8a6-ad88-45c9-ab4b-dd7de2418bb7 |
| 4 | Serpe Meccanivora | Gearseeker Serpent | U | U | Creature | {5}{U}{U} | Kaladesh | kld | 48 | IT | No | 0.19* | 2026-10-25 | | d32d8327-6ec2-4d43-b254-b04407612715 |
| 3 | Ninja della Notte Fonda | Ninja of the Deep Hours | U | U | Creature | {3}{U} | Betrayers of Kamigawa | bok | 44 | IT | No | 1.52* | 2026-10-25 | 44/165; Foil EN ≈ €14 | 367a67c7-54db-4336-b55a-3fa27625172a |
| 1 | Ninja of the Deep Hours | Ninja of the Deep Hours | U | U | Creature | {3}{U} | Betrayers of Kamigawa | bok | 44 | EN | No | 1.52 | 2026-10-25 | Foil EN ≈ €14 | 367a67c7-54db-4336-b55a-3fa27625172a |
| 4 | Moon-Circuit Hacker | Moon-Circuit Hacker | U | U | Enchantment Creature | {1}{U} | Kamigawa: Neon Dynasty | neo | 334 | EN | No | 0.32 | 2026-10-25 | showcase (SS39 art) | 75c43923-7280-4ccb-810b-e8c38dd8a26f |
| 1 | Mulldrifter | Mulldrifter | U | U | Creature | {4}{U} | Lorwyn | lrw | 76 | EN | No | 0.40 | 2026-10-25 | 76/301; holo dot is the green sleeve | a97cfefa-ade7-49f6-b2aa-1118b9db4935 |
| 1 | Pulce Fastidiosa | Pestermite | U | U | Creature | {2}{U} | Lorwyn | lrw | 78 | IT | Yes | 3.06* | 2026-10-25 | foil judged from strong sheen across whole card (no star on 2007 cards); confirm | f252ae53-443c-4a27-b8f0-639a9a2b8598 |
| 1 | Pulce Fastidiosa | Pestermite | U | U | Creature | {2}{U} | Lorwyn | lrw | 78 | IT | No | 0.31* | 2026-10-25 | | f252ae53-443c-4a27-b8f0-639a9a2b8598 |
| 4 | Folletta Balbettamagie | Spellstutter Sprite | U | U | Creature | {1}{U} | Lorwyn | lrw | 89 | IT | No | 4.67* | 2026-10-25 | copyright 1993-2007 89/301; Foil EN ≈ €22 | 4e5ba4a9-a282-4d4b-b25a-179e05e458f4 |
| 2 | Murmuring Mystic | Murmuring Mystic | U | U | Creature | {3}{U} | Commander 2020 | c20 | 118 | EN | No | 0.62 | 2026-10-25 | | ab25853c-29d3-4244-88db-813300a262a5 |
| 2 | Terrore di Tolaria | Tolarian Terror | U | U | Creature | {6}{U} | Foundations | fdn | 167 | IT | No | 0.26* | 2026-10-25 | | 2569d4f3-55ed-4f99-9592-34c7df0aab72 |
| 2 | Terrore di Tolaria | Tolarian Terror | U | U | Creature | {6}{U} | Foundations | fdn | 167 | IT | Yes | 0.31* | 2026-10-25 | rainbow art + coloured copyright line | 2569d4f3-55ed-4f99-9592-34c7df0aab72 |
| 3 | Cryptic Serpent | Cryptic Serpent | U | U | Creature | {5}{U}{U} | Commander Masters | cmm | 83 | EN | No | 1.47 | 2026-10-25 | | 7f1af32a-dba2-4c2f-b0ee-9c83849fda53 |
| 1 | Cryptic Serpent | Cryptic Serpent | U | U | Creature | {5}{U}{U} | Commander Masters | cmm | 83 | EN | Yes | 3.30 | 2026-10-25 | gold/rainbow copyright line | 7f1af32a-dba2-4c2f-b0ee-9c83849fda53 |
| 2 | Scopritore di Segreti | Delver of Secrets // Insectile Aberration | U | U | Creature | {U} | Innistrad: Midnight Hunt | mid | 47 | IT | No | 0.41* | 2026-10-25 | modern frame, MID symbol; one (row 3 col 1) possible foil; confirm | abff6c81-65a4-48fa-ba8f-580f87b0344a |
| 1 | Scopritore di Segreti | Delver of Secrets // Insectile Aberration | U | U | Creature | {U} | Innistrad: Midnight Hunt | mid | 47 | IT | Yes | 1.17* | 2026-10-25 | clear holo art | abff6c81-65a4-48fa-ba8f-580f87b0344a |
| 1 | Scopritore di Segreti | Delver of Secrets // Insectile Aberration | U | U | Creature | {U} | Innistrad | isd | 51 | IT | No | 0.59* | 2026-10-25 | old 2011 frame, ISD symbol | 11bf83bb-c95b-4b4f-9a56-ce7a1816307a |
| 4 | Behold the Multiverse | Behold the Multiverse | U | U | Instant | {3}{U} | Kaldheim | khm | 46 | EN | No | 0.19 | 2026-10-25 | | 27855a38-a682-4f97-ad22-ac625e86faec |
| 4 | Abile Schivata | Artful Dodge | U | U | Sorcery | {U} | Dark Ascension | dka | 27 | IT | No | 1.27* | 2026-10-25 | copyright 1993-2012 27/158; Foil EN ≈ €8 | de6ce6aa-e19f-4299-9807-e68920e63c73 |
| 4 | Unfathomable Truths | Unfathomable Truths | C | U | Instant | {4}{U} | Modern Horizons 3 | mh3 | 77 | EN | No | 0.16 | 2026-10-25 | | f95b8eb1-4dbb-4bb9-aa31-b7a12e3b4618 |
| 2 | Steel Sabotage | Steel Sabotage | U | U | Instant | {U} | Mirrodin Besieged | mbs | 33 | EN | No | 0.46 | 2026-10-25 | one (row 1 col 1) possible foil; confirm | bb40de7c-1905-4615-844b-4abc231fb01e |
| 2 | Sabotaggio d'Acciaio | Steel Sabotage | U | U | Instant | {U} | Mirrodin Besieged | mbs | 33 | IT | No | 0.46* | 2026-10-25 | | bb40de7c-1905-4615-844b-4abc231fb01e |
| 4 | Dispel | Dispel | U | U | Instant | {U} | Worldwake | wwk | 26 | EN | No | 0.71 | 2026-10-25 | Vance Kovacs art; Foil EN ≈ €18 | f178d0cc-5dd1-41ab-a2e8-218ece6f2a86 |
| 3 | Nullificare | Annul | U | U | Instant | {U} | Mirrodin | mrd | 29 | IT | No | 0.25* | 2026-10-25 | Brian Snoddy art, Janus synod flavor; Foil EN ≈ €7 | 8ba18ec8-e82f-41be-9ed8-b1a4ae9b7426 |
| 1 | Nullificare | Annul | U | U | Instant | {U} | Urza's Saga | usg | 59 | IT | No | 3.10* | 2026-10-25 | old frame, type "Interruzione", Greg Simanson | 3f8c73ff-be92-41ca-93a7-76f9823adb38 |
| 4 | An Offer You Can't Refuse | An Offer You Can't Refuse | U | U | Instant | {U} | Foundations | fdn | 160 | EN | No | 3.37 | 2026-10-25 | | a829747f-cf9b-4d81-ba66-9f0630ed4565 |
| 2 | Preordain | Preordain | U | U | Sorcery | {U} | Magic 2011 | m11 | 70 | EN | No | 1.17 | 2026-10-25 | Foil EN ≈ €19 | e3868c3d-4fcd-444b-866f-0f8e50ce7b67 |
| 1 | Predestinare | Preordain | U | U | Sorcery | {U} | Magic 2011 | m11 | 70 | IT | No | 1.17* | 2026-10-25 | Foil EN ≈ €19 | e3868c3d-4fcd-444b-866f-0f8e50ce7b67 |
| 4 | Avviluppare | Envelop | U | U | Instant | {U} | Judgment | jud | 39 | IT | No | 4.00* | 2026-10-25 | Don Hazeltine, Laquatus flavor; Foil EN ≈ €26 | e7ed250e-12d0-4ebc-9410-5711e71c6d1f |
| 4 | Force Spike | Force Spike | U | U | Instant | {U} | Fifth Edition | 5ed | 88 | EN | No | 2.10 | 2026-10-25 | white border, John Matson | ba23d540-8c2d-4a42-b4c0-86f0988bd1ce |
| 2 | Perforamagie | Spell Pierce | U | U | Instant | {U} | Zendikar | zen | 67 | IT | No | 0.30* | 2026-10-25 | Vance Kovacs, Noyan Dar flavor; Foil EN ≈ €32 | cb3d3901-e4a6-45ab-a7b5-c65d91e1875e |
| 4 | Deep Analysis | Deep Analysis | U | U | Sorcery | {3}{U} | Double Masters 2022 | 2x2 | 44 | EN | No | 0.18 | 2026-10-25 | 044/331 2X2 | 90296536-a56d-482e-8548-132a99894bde |
| 4 | Sleep of the Dead | Sleep of the Dead | U | U | Sorcery | {U} | Theros Beyond Death | thb | 66 | EN | No | 0.36 | 2026-10-25 | | 4007572b-a6c8-4a56-b1a7-ff099189c9c0 |
| 4 | Thoughtcast | Thoughtcast | U | U | Sorcery | {4}{U} | World Championship Decks 2004 | wc04 | ap54 | EN | No | 0.96 | 2026-10-25 | World Championship 2004 gold border, Aeo Paquette signature (not tournament legal) | b0c5d2c7-4219-4916-8afa-3369c8700553 |
| 3 | Boomerang | Boomerang | U | U | Instant | {U}{U} | Mirage | mir | 56 | IT | No | 0.46* | 2026-10-25 | | f5c98413-740d-47fd-bed6-2d3d05a72b31 |
| 1 | Boomerang | Boomerang | U | U | Instant | {U}{U} | Classic Sixth Edition | 6ed | 58 | IT | No | 0.37* | 2026-10-25 | white border, Sixth Edition symbol | ef3c7465-6534-4fa9-a772-8859b7210fdf |
| 4 | Thought Scour | Thought Scour | U | U | Instant | {U} | Double Masters 2022 | 2x2 | 65 | EN | No | 1.03 | 2026-10-25 | | 4afee6b3-55a4-44e5-b08c-85e0c813cd09 |
| 1 | Ponderare | Ponder | U | U | Sorcery | {U} | Magic 2010 | m10 | 68 | IT | No | 2.22* | 2026-10-25 | Foil EN ≈ €26 | 3c02b8ee-84cb-44cb-ba14-9e725a9d03ee |
| 2 | Ponderare | Ponder | U | U | Sorcery | {U} | Magic 2012 | m12 | 73 | IT | No | 2.10* | 2026-10-25 | 4th card symbol blurry, read as M12; Foil EN ≈ €19 | 81c908ee-e70a-4406-a32d-ab5ab17e67b1 |
| 1 | Ponder | Ponder | U | U | Sorcery | {U} | Commander 2018 | c18 | 96 | EN | No | 2.87 | 2026-10-25 | | 91382955-bcfc-4fb6-8cce-dc107e5b4c32 |
| 4 | Considerare Inferiore | Deem Inferior | U | U | Sorcery | {3}{U} | Modern Horizons 3 | mh3 | 57 | IT | No | 0.19* | 2026-10-25 | | cc0835c7-58ca-4f16-984a-c590ce6a229a |
| 4 | Torre di Urza | Urza's Tower | C | C | Land | | Rinascimento | rin | 183 | IT | No | 1.54 | 2026-10-25 | Rinascimento, sunset/shore art (Mark Poole) | a0240c3c-7219-4d5d-ac85-c369e4b180eb |
| 4 | Centrale Energetica di Urza | Urza's Power Plant | C | C | Land | | Rinascimento | rin | 179 | IT | No | 1.46 | 2026-10-25 | Rinascimento, red columns art (Mark Tedin) | 00fe59e8-d1ab-4f74-a7f4-a8feca3705ee |
| 4 | Miniera di Urza | Urza's Mine | C | C | Land | | Rinascimento | rin | 175 | IT | No | 1.63 | 2026-10-25 | Rinascimento, sphere-with-claws art (Anson Maddocks) | f0b8934e-9ff0-4c3e-987e-9c4fb1445b77 |
| 1 | Giardino di Khalni | Khalni Garden | C | G | Land | | Worldwake | wwk | 138 | IT | No | 1.81* | 2026-10-25 | only card on page; WWK symbol; Foil EN ≈ €21 | 1cc6a5e6-0b73-4488-8954-4b168ce7106d |
| 4 | Vault of Whispers | Vault of Whispers | C | B | Artifact Land | | World Championship Decks 2004 | wc04 | ap286 | EN | No | 2.07 | 2026-10-25 | World Championship 2004 gold border, Paquette signature (not tournament legal) | ac4328fb-8060-4e1d-bf2a-a174bbd7b6aa |
| 3 | Great Furnace | Great Furnace | C | R | Artifact Land | | Edge of Eternities Commander | eoc | 161 | EN | No | 2.51 | 2026-10-25 | | 74c5bb44-d72c-4c1a-a38f-86b4a8f49ae1 |
| 1 | Great Furnace | Great Furnace | C | R | Artifact Land | | World Championship Decks 2004 | wc04 | ap282 | EN | No | 2.69 | 2026-10-25 | World Championship 2004 gold border, Paquette signature (not tournament legal) | 5313fdc4-cce8-469a-8bcd-715924652c46 |
| 6 | Seat of the Synod | Seat of the Synod | C | U | Artifact Land | | Foundations Jumpstart | j25 | 773 | EN | No | 0.98 | 2026-10-25 | | f0cff35c-de07-4465-b3da-efe4a78eb6d0 |
| 1 | Nebbia | Fog | G | G | Instant | {G} | Mirage | mir | 216 | IT | No | 0.35* | 2026-10-25 | black border, Harold McNeill | 6d822598-2f0f-45fa-9643-0368e2c0e18b |
| 2 | Nebbia | Fog | G | G | Instant | {G} | Magic 2012 | m12 | 173 | IT | No | 0.17* | 2026-10-25 | Jaime Jones art; symbol blurry, read as M12 (could be m13 172 / m14 171) | 84387fb5-7929-4d08-9d94-ba2d94460ef3 |
| 1 | Muro di Radici | Wall of Roots | G | G | Creature | {1}{G} | Mirage | mir | 253 | IT | No | 0.98* | 2026-10-25 | | aeb151d2-c313-44d2-972e-33487f070c23 |
| 2 | Troublemaker Ouphe | Troublemaker Ouphe | G | G | Creature | {1}{G} | Wilds of Eldraine | woe | 194 | EN | No | 0.43 | 2026-10-25 | | 7f7b2fc0-d3f6-4c4d-a163-986a372e5b12 |
| 1 | Troublemaker Ouphe | Troublemaker Ouphe | G | G | Creature | {1}{G} | Wilds of Eldraine | woe | 194 | EN | Yes | 2.03 | 2026-10-25 | clearly rainbow foil | 7f7b2fc0-d3f6-4c4d-a163-986a372e5b12 |
| 2 | Crescita Mutagena | Mutagenic Growth | G | G | Instant | {G/P} | New Phyrexia | nph | 116 | IT | No | 2.63* | 2026-10-25 | Foil EN ≈ €13 | af2d23da-70a1-49ba-91bf-c110cc4bbedc |
| 4 | Boulderbranch Golem | Boulderbranch Golem | C | G | Artifact Creature | {7} | The Brothers' War | bro | 197 | EN | No | 0.44 | 2026-10-25 | | 6e6e5338-9b95-4ac7-a57c-5efaa6423531 |
| 2 | Priest of Titania | Priest of Titania | G | G | Creature | {1}{G} | Urza's Saga | usg | 270 | EN | No | 2.39 | 2026-10-25 | | 965c33c3-0c68-4516-b8b0-5a0552ed44b6 |
| 3 | Weather the Storm | Weather the Storm | G | G | Instant | {1}{G} | Modern Horizons | mh1 | 191 | EN | No | 1.62 | 2026-10-25 | Foil EN ≈ €6 | f6a9fa51-78c3-42e6-8c2e-39658f59ed87 |
| 4 | Gigantosaurus | Gigantosaurus | G | G | Creature | {G}{G}{G}{G}{G} | Foundations | fdn | 718 | EN | Yes | 1.72 | 2026-10-25 | Starter Collection printing, foil-only on Scryfall; Set is foil-only | bc1c518a-dcb4-407c-85be-ed5935a24198 |
| 1 | Annoyed Altisaur | Annoyed Altisaur | G | G | Creature | {5}{G}{G} | Modern Horizons 3 | mh3 | 284 | EN | No | 0.14 | 2026-10-25 | | 4aa9354d-3496-47f4-81c9-aead15efb8bb |
| 4 | Battito di Murasa | Pulse of Murasa | G | G | Instant | {2}{G} | Oath of the Gatewatch | ogw | 141 | IT | No | 0.19* | 2026-10-25 | | c0c8057f-b45b-4f67-90cd-c808b5e9cbfa |
| 4 | Nyxborn Hydra | Nyxborn Hydra | G | G | Enchantment Creature | {X}{G} | Modern Horizons 3 | mh3 | 164 | EN | No | 0.39 | 2026-10-25 | | 902a969e-9f22-4e92-93eb-9d4536ca82e5 |
| 1 | タミヨウの保管 | Tamiyo's Safekeeping | G | G | Instant | {G} | Kamigawa: Neon Dynasty | neo | 211 | JA | No | 4.37* | 2026-10-25 | | 51bbd594-0284-4ee7-becc-378ba41b3fb1 |
| 1 | Tamiyos Bewahrung | Tamiyo's Safekeeping | G | G | Instant | {G} | Kamigawa: Neon Dynasty | neo | 211 | DE | No | 4.37* | 2026-10-25 | | f5e6220d-4c90-4391-b7d7-178f8643b751 |
| 4 | Antichi Fermenti | Ancient Stirrings | G | G | Sorcery | {G} | Rise of the Eldrazi | roe | 174 | IT | No | 0.38* | 2026-10-25 | ROE symbol + artist Vincent Proce; collector line not legible; Foil EN ≈ €7 | 97ac2766-a597-4949-882d-c5e61e6dd268 |
| 4 | Malevolent Rumble | Malevolent Rumble | G | G | Sorcery | {1}{G} | Modern Horizons 3 | mh3 | 161 | EN | No | 0.91 | 2026-10-25 | | a178cfe8-f9fa-4255-88d0-54a0bed079f5 |
| 2 | Crop Rotation | Crop Rotation | G | G | Instant | {G} | Urza's Legacy | ulg | 98 | EN | No | 4.00 | 2026-10-25 | Foil EN ≈ €283 | 6563f790-862c-465a-b963-7a61f2385516 |
| 4 | Bramble Wurm | Bramble Wurm | G | G | Creature | {6}{G} | Innistrad Remastered | inr | 187 | EN | No | 0.37 | 2026-10-25 | | 7ed00113-a0d7-4825-b066-f911a1ffb900 |
| 4 | Sewer-veillance Cam | Sewer-veillance Cam | U | U | Artifact | {U} | Teenage Mutant Ninja Turtles | tmt | 53 | EN | No | 0.32 | 2026-10-25 | | ab47a37b-b66d-4f70-9bf0-4d5ed6b518f3 |
| 2 | Visioni del Siero | Serum Visions | U | U | Sorcery | {U} | Fifth Dawn | 5dn | 36 | IT | No | 0.53* | 2026-10-25 | | 4bc61952-88ba-447a-835a-f1e9643fcd0d |
| 1 | Fremito Spettrale | Ghostly Flicker | U | U | Instant | {2}{U} | Avacyn Restored | avr | 57 | IT | No | 2.39* | 2026-10-25 | Foil EN ≈ €14 | f0a44373-0c50-4e14-a7c6-0de66796b81e |
| 2 | Vapori Insidiosi | Vapor Snag | U | U | Instant | {U} | New Phyrexia | nph | 48 | IT | No | 0.21* | 2026-10-25 | one copy (top-left of bottom row after rotation) looks shiny: possible foil; confirm | 70305148-23bd-41dd-9de5-13cf5ae591ae |
| 2 | Узреть Мультивселенную | Behold the Multiverse | U | U | Instant | {3}{U} | Kaldheim | khm | 46 | RU | No | 0.19* | 2026-10-25 | | b043a13e-5f28-4b59-8757-e987b913a2e5 |
| 4 | Kenku Artificer | Kenku Artificer | U | U | Creature | {2}{U} | Commander Legends: Battle for Baldur's Gate | clb | 80 | EN | No | 0.47 | 2026-10-25 | | 20f30aca-5055-45f1-9121-e7a5675f07e4 |
| 4 | Archeomante | Archaeomancer | U | U | Creature | {2}{U}{U} | Magic 2013 | m13 | 41 | IT | No | 0.46* | 2026-10-25 | Foil EN ≈ €5 | 73c6d1be-55ad-4ee4-b044-88438e9b78cc |
| 4 | Accumulated Knowledge | Accumulated Knowledge | U | U | Instant | {1}{U} | Masters 25 | a25 | 40 | EN | No | 0.29 | 2026-10-25 | | ad88e5ee-0eee-47af-a7b4-9bac044e1c8c |
| 4 | Drossforge Bridge | Drossforge Bridge | C | BR | Artifact Land | | Modern Horizons 2 | mh2 | 246 | EN | No | 1.27 | 2026-10-25 | | 5b46b8d8-723a-4752-b97d-29ef83bd294c |
| 4 | Ponte di Scogliargento | Silverbluff Bridge | C | UR | Artifact Land | | Modern Horizons 2 | mh2 | 255 | IT | No | 0.33* | 2026-10-25 | | d80dc025-c2c4-48c2-8354-7d9ddb430eb9 |
| 2 | Citadel Gate | Citadel Gate | C | W | Land | | Commander Legends: Battle for Baldur's Gate | clb | 349 | EN | No | 2.25 | 2026-10-25 | | c0e6f002-9a10-49a1-8604-2b8ff57732dd |
| 2 | Citadel Gate | Citadel Gate | C | W | Land | | Commander Legends: Battle for Baldur's Gate | clb | 349 | EN | Yes | 2.44 | 2026-10-25 | 2nd and 3rd in top row: rainbow/coloured collector and copyright text and holo sheen; confirm | c0e6f002-9a10-49a1-8604-2b8ff57732dd |
| 2 | Conduit Pylons | Conduit Pylons | C | C | Land | | Outlaws of Thunder Junction | otj | 254 | EN | No | 0.24 | 2026-10-25 | | 5ffa48cc-b991-4d47-b7ec-cf678915c758 |
| 2 | Cratere Fumante | Smoldering Crater | C | R | Land | | Urza's Saga | usg | 328 | IT | No | 0.27* | 2026-10-25 | | e9940ce4-09d7-4e89-b456-e3126a83cfe1 |
| 2 | Crocevia di Kabira | Kabira Crossroads | C | W | Land | | Zendikar | zen | 216 | IT | No | 0.39* | 2026-10-25 | | a776decb-cdb5-4f41-8a3a-c0cece18eb35 |
| 2 | Slippery Karst | Slippery Karst | C | G | Land | | Urza's Saga | usg | 327 | EN | No | 0.20 | 2026-10-25 | right copy blurry; same frame/artist, assumed USG | 6d01a6a7-c006-4fce-a546-8138baef421b |
| 4 | Basilisk Gate | Basilisk Gate | C | C | Land | | Commander Legends: Battle for Baldur's Gate | clb | 346 | EN | No | 0.61 | 2026-10-25 | photo blurry; collector lines unreadable but no foil colouring seen | 4a306025-d429-4006-b7ed-bdb287e83f57 |
| 4 | Cliffgate | Cliffgate | C | R | Land | | Commander Legends: Battle for Baldur's Gate | clb | 350 | EN | No | 0.59 | 2026-10-25 | photo blurry; no foil colouring seen | 557470dc-c594-4b26-81b9-356bedb0c215 |
| 4 | Manor Gate | Manor Gate | C | G | Land | | Commander Legends: Battle for Baldur's Gate | clb | 356 | EN | No | 2.04 | 2026-10-25 | photo blurry; no foil colouring seen | 793d4978-9e00-453d-8dc2-6d51ad6c26b7 |
| 2 | Paesaggio Accogliente | Sheltering Landscape | C | WRG | Land | | Modern Horizons 3 | mh3 | 227 | IT | No | 0.11* | 2026-10-25 | | 0fe070f4-8877-4280-b8fd-869f3ac34ab6 |
| 2 | Sheltering Landscape | Sheltering Landscape | C | WRG | Land | | Modern Horizons 3 | mh3 | 227 | EN | No | 0.11 | 2026-10-25 | | 0fe070f4-8877-4280-b8fd-869f3ac34ab6 |
| 1 | Foreboding Landscape | Foreboding Landscape | C | UBG | Land | | Modern Horizons 3 | mh3 | 221 | EN | No | 0.14 | 2026-10-25 | | 57fb0fa7-0c5c-4a75-9461-c51403c30282 |
| 1 | Contaminated Landscape | Contaminated Landscape | C | WUB | Land | | Modern Horizons 3 | mh3 | 218 | EN | No | 0.13 | 2026-10-25 | | e2312c49-1627-47ad-8113-78a999a97d8d |
| 1 | Deceptive Landscape | Deceptive Landscape | C | WBG | Land | | Modern Horizons 3 | mh3 | 219 | EN | No | 0.10 | 2026-10-25 | | 2ae6828e-ff19-45db-8b59-61616353491f |
| 1 | Bojuka Bog | Bojuka Bog | C | B | Land | | Tarkir: Dragonstorm Commander | tdc | 341 | EN | No | 1.81 | 2026-10-25 | | 38834333-f9ea-43a8-b00a-17935d59eaea |
| 1 | Bojuka Bog | Bojuka Bog | C | B | Land | | Secrets of Strixhaven Commander | soc | 363 | EN | No | 2.03 | 2026-10-25 | collector line read as 0353/0363 (blurry); soc 363 is the Scryfall Bojuka Bog | 55b5b094-9d2d-4d96-b90c-78fecdae725a |
| 1 | Bountiful Landscape | Bountiful Landscape | C | URG | Land | | Modern Horizons 3 | mh3 | 217 | EN | No | 0.14 | 2026-10-25 | | b277752b-430a-4f09-8a98-b72f813dd52e |
| 4 | Razortide Bridge | Razortide Bridge | C | WU | Artifact Land | | Modern Horizons 2 | mh2 | 252 | EN | No | 0.29 | 2026-10-25 | | e7ea7395-430e-4036-92c9-17a850ec2371 |
| 2 | Seething Landscape | Seething Landscape | C | UBR | Land | | Modern Horizons 3 | mh3 | 225 | EN | No | 0.19 | 2026-10-25 | | 661fc907-7003-45c6-820c-9616e9a71c30 |
| 2 | Paesaggio Ribollente | Seething Landscape | C | UBR | Land | | Modern Horizons 3 | mh3 | 225 | IT | No | 0.19* | 2026-10-25 | | 661fc907-7003-45c6-820c-9616e9a71c30 |
| 4 | Twisted Landscape | Twisted Landscape | C | BRG | Land | | Modern Horizons 3 | mh3 | 232 | EN | No | 0.17 | 2026-10-25 | | d0e3e7b3-7ba9-47a2-b46c-a40bffb445e2 |
| 1 | Ponte di Nebbiavolta | Mistvault Bridge | C | UB | Artifact Land | | The Brothers' War Commander | brc | 189 | IT | No | 0.91* | 2026-10-25 | retro frame, (c)2022 ... 189 | 7ad684fb-cfb0-48b2-802f-bda96afafdc3 |
| 4 | Slagwoods Bridge | Slagwoods Bridge | C | RG | Artifact Land | | Modern Horizons 2 | mh2 | 256 | EN | No | 0.20 | 2026-10-25 | | e51b48e9-a75a-4acd-9462-5e1ac2b0d803 |
| 4 | Goldmire Bridge | Goldmire Bridge | C | WB | Artifact Land | | Modern Horizons 2 | mh2 | 247 | EN | No | 0.23 | 2026-10-25 | | dbe2a1fa-196f-497f-a15f-0b3b04da9cbb |
| 4 | Contaminated Aquifer | Contaminated Aquifer | C | UB | Land | | Dominaria United | dmu | 245 | EN | No | 0.91 | 2026-10-25 | | 6bb570f4-de68-4d8c-a9f3-8a3294163aa8 |
| 2 | Dimir Aqueduct | Dimir Aqueduct | C | UB | Land | | Duskmourn: House of Horror Commander | dsc | 270 | EN | No | 0.23 | 2026-10-25 | | 84bf9d60-64b8-4209-acfe-e07eefc6bf1f |
| 1 | Haunted Fengraf | Haunted Fengraf | C | C | Land | | Commander 2018 | c18 | 254 | EN | No | 0.27 | 2026-10-25 | collector line blurry (254/30x C18); only Adam Paquette #254 print | 97a1d55a-39a8-4bf4-91b7-5565146c9c40 |
| 4 | Ice Tunnel | Ice Tunnel | C | UB | Snow Land | | Kaldheim | khm | 262 | EN | No | 0.84 | 2026-10-25 | | 8cff3ef0-4dfb-472e-aa1e-77613dd0f6d8 |
| 4 | Refurbished Familiar | Refurbished Familiar | B | B | Artifact Creature | {3}{B} | Modern Horizons 3 | mh3 | 105 | EN | No | 0.36 | 2026-10-25 | | b338e078-629c-4cac-bd1d-e1f0a132728d |
| 4 | Utrom Monitor | Utrom Monitor | U | U | Artifact Creature | {4}{U} | Teenage Mutant Ninja Turtles Eternal | tmc | 113 | EN | No | 8.04 | 2026-10-25 | | 8ce6647c-343a-45e8-9b6e-0292ae01ec81 |
| 2 | Tithing Blade // Consuming Sepulcher | Tithing Blade // Consuming Sepulcher | B | B | Artifact | {1}{B} | The Lost Caverns of Ixalan | lci | 128 | EN | No | 0.96 | 2026-10-25 | | dbaa9a2d-e9fd-4746-a26c-f99ae731f024 |
| 3 | Mistvault Bridge | Mistvault Bridge | C | UB | Artifact Land | | The Brothers' War Commander | brc | 189 | EN | No | 0.91 | 2026-10-25 | | 7ad684fb-cfb0-48b2-802f-bda96afafdc3 |
| 4 | Falco Luccicante | Glint Hawk | W | W | Creature | {W} | Scars of Mirrodin | som | 10 | IT | No | 2.80* | 2026-10-25 | Foil EN ≈ €19 | 284c4710-4183-4743-9c8b-515cc98cbbb8 |
| 4 | Ancient Den | Ancient Den | C | W | Artifact Land | | Mirrodin | mrd | 278 | EN | No | 1.76 | 2026-10-25 | Foil EN ≈ €13 | cc857fbd-8e0f-4bff-8f14-561c9925c484 |
| 4 | Cryogen Relic | Cryogen Relic | U | U | Artifact | {1}{U} | Edge of Eternities | eoe | 52 | EN | No | 0.51 | 2026-10-25 | | 7bfb33b6-e2bf-498f-8c58-ae21a840cf75 |
| 4 | Dispatch | Dispatch | W | W | Instant | {W} | Edge of Eternities Commander | eoc | 64 | EN | No | 3.75 | 2026-10-25 | | 27554761-8d6e-4de4-8ce3-f31b2c03708c |
| 4 | Oppressore Myr | Myr Enforcer | C | C | Artifact Creature | {7} | Mirrodin | mrd | 211 | IT | No | 1.06* | 2026-10-25 | Foil EN ≈ €20 | eeeef899-a8b5-4416-a208-3bd5a0c7177b |
| 4 | Scagliapensiero | Thoughtcast | U | U | Sorcery | {4}{U} | Mirrodin | mrd | 54 | IT | No | 1.53* | 2026-10-25 | Foil EN ≈ €14 | efb965a7-877a-4302-b507-25b0a9e32d9b |
| 4 | Caveau des chuchotements | Vault of Whispers | C | B | Artifact Land | | Mirrodin | mrd | 286 | FR | No | 2.34* | 2026-10-25 | Foil EN ≈ €25 | 73866487-33f4-4f64-b100-2c4ddadcd74e |
| 4 | Blue Elemental Blast | Blue Elemental Blast | U | U | Instant | {U} | Fourth Edition | 4ed | 63 | EN | No | 2.76 | 2026-10-25 | | 988f7b31-24b2-45c2-89e4-ff6bd9e0c8c7 |

## Summary

| Cards | Est. EUR |
|---|---|
| 704 | ~1093 |

# Narrative layer v0.3

> **Status: released in v0.3.0 (2026-11-27).** Every v0.1 document stays valid. The decisions behind this version are listed in the pull request that introduced it.

The narrative layer describes **how a book is told**: where its scenes begin and end and how much story time they cover, who perceives each passage, which few revelations matter and who knows them, which events the book comes back to, and which events it tells more than once. It is optional and sits beside the manifest. A book without a narrative layer is complete, and every v0.1 document stays valid.

Schemas: [`v0.3/json-schema/narrative/`](../../v0.3/json-schema/narrative/). Example: [`narrative-layer-valid.json`](../../v0.3/examples/narrative/narrative-layer-valid.json) (Cervantes, *Don Quijote*, part I, chapters 1–20, public domain). Why each piece exists: [rationale](rationale.md).

The key words MUST, MUST NOT, SHOULD and MAY are to be read as in RFC 2119.

## 1. The document

A narrative layer is a JSON document, separate from the manifest, bound to **one manifest version**:

| Field | Required | Meaning |
|---|---|---|
| `narrative_layer` | yes | Format version, `"0.3"`. |
| `book_id`, `manifest_id` | yes | DIDs of the book and the manifest. |
| `manifest_version` | yes | The manifest version every address resolves against. |
| `language` | yes | ISO 639-1 language of every text field. |
| `generated_at`, `generator` | no | When and by which program (name and version only, no personal data). |
| `entities`, `scenes`, `focalization`, `truths`, `knowledge`, `events`, `coreference`, `findings` | no | The pieces. Any subset may be present. |

Manifests are immutable and closed (`additionalProperties: false`), so the layer points at the manifest, not the other way round. A new manifest version needs a new layer; a layer may be produced, corrected or withdrawn without touching the manifest.

## 2. Addresses

Every position in the layer is a **paragraph address**: `<chapter-slug>#p-NNN` ([`paragraph-address.json`](../../v0.3/json-schema/validators/paragraph-address.json)).

- `<chapter-slug>` is the Chapter's `slug`; `p-NNN` is the paragraph's node id in that chapter version's content (three or more digits).
- An address is resolved against `manifest_version`. It MUST exist there; an address that does not exist invalidates the item that holds it.
- **Reading order** is the manifest's chapter order, then the paragraph number. Within one chapter two addresses can always be compared; across chapters a validator needs the manifest's chapter order.
- Events (section 2 of [reading events](reading-events.md)) carry the same position as a chapter DID plus a node id. The Chapter entity links the two: its `chapter_id` and `version` give the DID, its `slug` gives the address prefix, and the node id is the part after `#`.

## 3. Support: every assertion cites the text

Every item except entities and findings carries a **support** ([`common.json#/$defs/support`](../../v0.3/json-schema/narrative/common.json)):

- `basis`: `asserted` when one cited paragraph states the fact (a time marker, a named place, a line of dialogue); `inferred` when it follows from reading but no single sentence states it.
- `evidence`: one or more distinct addresses whose text supports the item.
- `quote`: the literal words, copied from one of the evidence paragraphs, that justify the item. **Required when `basis` is `inferred`.**
- `confidence` (0–1, informative) and `status` (`verified`, `doubtful`, `review`; absent means not verified) MAY be given.

Nested assertions carry their own support: a scene's `time` and `duration` are cited separately from the scene's boundaries.

A producer MAY stay silent: an absent piece or field means "not stated", never "none". A producer MUST NOT guess: an item it cannot support is left out.

## 4. Visibility

Every item except findings has `visibility`:

- `public`: may be published with the book and used by reader-facing features, always through the spoiler-safe cut (section 6).
- `author`: private to the author. Never published, never sent to readers.
- **Absent means `author`.** Visibility fails closed: an item is public only when its producer says so.

**Findings are always `author`** (the schema allows no other value). They describe what an author may not know about their own book and are never published.

A public item MUST NOT reference a non-public item: a public scene may only cast public entities, a public knowledge link may only point at a public truth, and so on. This is what makes the projection below safe.

**The public projection** is mechanical: drop every item whose `visibility` is not `public`, drop `findings`, keep the header. A layer that passes validation projects without dangling references. The projection of the example is [`narrative-layer-public.json`](../../v0.3/examples/narrative/narrative-layer-public.json). Only the public projection may leave the author's workspace.

Producers SHOULD mark public only items whose `status` is `verified`.

## 5. The pieces

### 5.1 Entities ([`entity.json`](../../v0.3/json-schema/narrative/entity.json))

Characters, places, organisations and objects the other pieces refer to: `id` (`e:<slug>`), `kind`, `name`, `revealed_at` (first paragraph after which a reader may know the entity under `name`), optional `aliases` each with its own `revealed_at`. Only what the other pieces need; everything else an analysis knows about an entity stays in the producer's own output.

### 5.2 Scenes ([`scene.json`](../../v0.3/json-schema/narrative/scene.json))

A **contiguous range of paragraphs, in reading order, with one place, one story time and one cast**: `start` and `end` (inclusive), optional `place` (an entity of kind `place`), `time` (`label` and/or `date` with its own support), `cast` (characters present), `story_order` and `duration`.

- Scenes MUST NOT overlap. They need not cover every paragraph: a narrator's digression may belong to no scene.
- A scene MAY cross a chapter boundary.
- An interrupted scene is two scenes; the second names the first in `continues`. In the example, the fight with the Biscayan stops at the end of chapter 8 (`s-005`), the narrator tells how he found the manuscript in Toledo (`s-006`), and the fight resumes in chapter 9 (`s-007`, `continues: "s-005"`).
- `story_order` is the scene's position in story (fabula) order, 1 = earliest. Comparing it with reading order shows the anachronies: the Toledo scene is read sixth but happens last.
- The scene's own support cites the paragraphs that mark its boundaries.

### 5.3 Story duration ([`duration.json`](../../v0.3/json-schema/narrative/duration.json))

How much story time a scene covers, **approximate by design**, in exactly one of three shapes:

| Shape | Example |
|---|---|
| `unit` + `value` | `{ "unit": "day", "value": 15 }`: «estuvo quince días en casa» (summary) |
| `unit` + `min` + `max` | `{ "unit": "minute", "min": 5, "max": 30 }`: the windmills |
| `unknown: true` | the text gives no way to tell |

`value: 0` is a **pause**: text, but the story does not advance (description, commentary). Units are `second` to `year`; the producer picks the one that reads naturally and does not convert. `basis` is `asserted` when a time marker states the span («Toda aquella noche», «quince días») and `inferred` otherwise, with `quote`.

Genette's tempos (scene, summary, ellipsis, pause) are **derived**, not stored: a consumer compares a scene's duration with its length in words, and an ellipsis is the story time between the end of one scene and the start of the next in story order.

### 5.4 Focalization ([`focalization.json`](../../v0.3/json-schema/narrative/focalization.json))

**Who perceives**, over one paragraph (`start` only) or a range (`start` to `end`), distinct from who narrates:

- `internal`: the text renders what `focalizer` perceives or thinks. `focalizer` is required.
- `zero`: an unrestricted narrator, no character's perception. No `focalizer`.
- `external`: only what an outside observer could see. No `focalizer`.

Spans MUST NOT overlap. A span may match a scene, part of one, or a single paragraph. Who narrates is not part of the layer: it remains a fact of the producer's paragraph-level output. In the example the same scene at the inn has two internal focalizers in turn: don Quijote, who sees a castle (`fz-001`), and the innkeeper, who sees a poor horse (`fz-002`).

### 5.5 Key truths ([`truth.json`](../../v0.3/json-schema/narrative/truth.json))

**The few revelations that matter**: facts the reader does not know at first and learns at a precise point. A book has a handful, not hundreds; a truth is not every fact.

- `text`: one self-contained sentence in the book's language: full names, an explicit verb, one fact.
- `revealed_at`: the first paragraph after which a reader may know the truth. It MUST NOT come before the earliest `evidence`.
- `evidence`: the paragraphs of the reveal.
- `clues` (optional): earlier paragraphs that hint at the truth. All MUST come before `revealed_at`.

### 5.6 Knowledge links ([`knowledge.json`](../../v0.3/json-schema/narrative/knowledge.json))

**Who knows each truth, and from where**: one character (`knower`), one truth (`truth`), and two positions kept apart:

- `since`: from which paragraph the character holds it (the character's knowing), or `before_text` when the character held it before the narrative begins;
- `revealed_at`: from which paragraph a reader may be shown that the character holds it. It MUST NOT come before the earliest evidence.

Both differ from the truth's own `revealed_at`, which is when the **reader** may know the truth. `stance` is `knows`, `believes` or `suspects`; `holds` is `true` when the character holds the truth as stated and `false` when the character holds its contrary. **A belief may be false**: `knows` requires `holds: true`, the other stances do not.

With truths and knowledge links a consumer can tell, at any paragraph, who is in the dark: the reader knows the truth (its `revealed_at` is passed), a character is present (in the scene's cast), and that character holds no true link to it yet. In the example, the reader learns at `capitulo-07#p-010` that the priest and the barber walled up the library; the housekeeper and the niece know (`k-001`, `k-002`); don Quijote believes, wrongly, that an enchanter took it (`k-003`, `holds: false`), and still believes it in chapter 8.

### 5.7 Event salience ([`story-event.json`](../../v0.3/json-schema/narrative/story-event.json))

A story event told at `at`, with `salience`:

- `kernel`: an event **the book picks up later**: a later paragraph depends on it, refers back to it or follows from it. Those paragraphs are listed in `picked_up_at` (required, non-empty, all after `at`).
- `catalysis`: an event the book does not pick up. No `picked_up_at`.

This is an operational reading of Barthes' distinction, chosen because it can be checked against the text. The labels describe; they never judge. A catalysis is not "filler that could go".

### 5.8 Event coreference ([`coreference.json`](../../v0.3/json-schema/narrative/coreference.json))

**Two or more paragraphs that tell the same story event**: `tellings` (at least two, each with `at` and an optional `teller`), and optionally the `event` they tell. In the example the raised swords of don Quijote and the Biscayan are told three times: as it happens (`capitulo-08#p-050`), in the narrator's recapitulation (`capitulo-09#p-001`), and as a picture in the found manuscript (`capitulo-09#p-010`).

### 5.9 Findings ([`finding.json`](../../v0.3/json-schema/narrative/finding.json))

What the author may not know about their own book: `continuity`, `absence`, `voice_balance`, `reading_vs_story_order` or `open_question`, with `text`, `evidence` and optional `refs` to other items. **Always `visibility: "author"`.** A finding describes and never judges.

## 6. Spoiler-safe use

Public items are shown to a reader only once that reader has passed the item's **gate**. A spoiler-safe consumer MUST apply these gates to the public projection, for the reader's current paragraph:

| Item | Shown from | Also |
|---|---|---|
| Entity | `revealed_at` | each alias from its own `revealed_at` |
| Scene | `start` | only entities already shown appear as place or cast; `end` and `duration` only once the scene is over; never `story_order` (it would announce scenes still to come) |
| Focalization span | `start` | only if its focalizer is already shown; `end` only once passed |
| Truth | `revealed_at` | only subjects already shown |
| Knowledge link | the latest of its `revealed_at`, its `since` and its truth's `revealed_at` | only if its knower is already shown |
| Story event | `at` | pickups only once passed; the label `kernel` only from the first pickup (before it, saying "kernel" announces that the book comes back) |
| Coreference | its second telling | tellings only once passed |

In every item shown, `quote` is dropped and `evidence` keeps only the paragraphs the reader has passed. **No address after the reader's position may appear anywhere in what is shown**: not in evidence, quotes, pickups, ends or durations.

A paragraph that is the `revealed_at` of a public truth is a **spoiler** for anyone who has not reached it: a reader that lets people share paragraphs SHOULD warn before sharing such a paragraph ([`spoiler_warning`](reading-events.md#5-spoiler_warning)).

The reference implementation of the projection and the cut is [`v0.3/narrative/semantics.ts`](../../v0.3/narrative/semantics.ts) (`publicProjection`, `spoilerSafeCut`).

## 7. Validation

A layer is valid when it passes the JSON Schema **and** these semantic rules, which a schema cannot express ([`validateNarrativeLayer`](../../v0.3/narrative/semantics.ts)):

1. Ids are unique across the layer.
2. Every reference resolves: places, cast, focalizers, knowers, subjects, truths, events, tellers, `continues`, finding `refs`.
3. Kinds match: a `place` is an entity of kind `place`; cast and focalizers are characters; knowers and tellers are characters or organisations.
4. Every address exists in the manifest version.
5. Ranges do not end before they start; scenes do not overlap; focalization spans do not overlap.
6. `revealed_at` (truths, knowledge links) does not come before the earliest evidence.
7. Clues come before the truth's `revealed_at`; pickups come after the event's `at`; a scene `continues` one that ends before it starts.
8. No public item references a non-public item.

Rules that compare addresses in different chapters need the manifest's chapter order. Without it, a validator MUST skip those comparisons rather than guess.

## 8. Conformance

- A **producer** MUST emit layers that pass section 7, MUST NOT mark an item public unless it accepts that the item may be published, and SHOULD mark public only verified items.
- A **publisher** MUST publish only the public projection.
- A **reader-facing consumer** MUST show public items only through the gates of section 6, and MUST ignore the layer of a manifest version other than the one being read.
- A **v0.1 consumer** needs no change: the layer is a separate document.

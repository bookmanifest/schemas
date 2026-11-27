# Book Manifest 0.3

> **Status: released (package 0.3.2, 2026-11-27).** This is the only version of the format.

Book Manifest is an open format for books that are published in versions and read on screen: who wrote a book, what each published version contains, what happens while people read it, and, optionally, how the book is told. This document specifies all of it:

- the **manifest** and the entities around it: book, chapters, authors, publishers, series, readers, library entries (section 4);
- the **events** a reader app sends while people read (section 5);
- the optional **narrative layer**, a separate document that describes how one manifest version is told (section 6).

Every part has a JSON Schema (draft 2020-12) in [`v0.3/json-schema/`](../../v0.3/json-schema/), which is normative for structure, and a Zod mirror in [`v0.3/zod/`](../../v0.3/zod/). Examples are in [`v0.3/examples/`](../../v0.3/examples/). Why the narrative layer and the reading events look as they do: [rationale](rationale.md). What a program that reads a book must emit: [producer guide](producer-guide.md).

The key words MUST, MUST NOT, SHOULD and MAY are to be read as in RFC 2119.

## 1. Historia

Version 0.1 existed only as a draft: the manifest, the entities and the five session events, never published as a stable version. 0.2 was never a version of the format (the number was used by a private program's output contract). **0.3 is the first public version.** It contains everything 0.1 had, folded in unchanged except for the manifest's new `book_manifest` field, plus the narrative layer and five reading events. Schemas under `https://bookmanifest.org/schemas/v0.1/` are withdrawn; documents written against them are not 0.3 documents until they carry `book_manifest: "0.3"`.

## 2. Versions

Two documents name the format version they follow, in a required field whose only allowed value is the version:

| Document | Field | Value |
|---|---|---|
| Manifest | `book_manifest` | `"0.3"` |
| Narrative layer | `narrative_layer` | `"0.3"` |

This is not the book's own version: a manifest's `version` (for example `1.1.0`) numbers the book's published versions, and a chapter's `version` numbers that chapter's versions.

Every schema's `$id` is `https://bookmanifest.org/schemas/v0.3/<path>`, and schemas refer to each other by relative path, so the whole version resolves within itself.

A future format version gets its own schema path (`…/schemas/v<version>/`), and the `book_manifest` and `narrative_layer` constants change to the new version. A consumer MUST reject a document whose format field names a version it does not implement, rather than read it as the version it knows; the schemas do this by construction.

## 3. Identifiers and validators

[`v0.3/json-schema/validators/`](../../v0.3/json-schema/validators/):

| Validator | Form |
|---|---|
| [DID](../../v0.3/json-schema/validators/did.json) | `did:web:bookmanifest.org:<type>:<id>[:<version>]`, where `<type>` is `author`, `publisher`, `series`, `book`, `manifest`, `chapter`, `reader`, `library-entry` or `progress` |
| [Semantic version](../../v0.3/json-schema/validators/semver.json) | `major.minor.patch`, no pre-release or build metadata |
| [Date-time](../../v0.3/json-schema/validators/iso8601.json) | ISO 8601 / RFC 3339 date-time |
| [URL](../../v0.3/json-schema/validators/url.json) | an `http` or `https` URI |
| [Paragraph address](../../v0.3/json-schema/validators/paragraph-address.json) | `<chapter-slug>#p-NNN` (section 6.2) |
| [Entity id](../../v0.3/json-schema/validators/entity-id.json) | `e:<slug>`, a book-local id in a narrative layer |

Language codes are ISO 639-1 (two lowercase letters); currency codes are ISO 4217 (three uppercase letters).

## 4. The manifest and its entities

Schemas: [`v0.3/json-schema/entities/`](../../v0.3/json-schema/entities/). Every entity is a closed object (`additionalProperties: false`): a field not in its schema makes it invalid.

### 4.1. Manifest ([`manifest.json`](../../v0.3/json-schema/entities/manifest.json))

An **immutable** snapshot of one published version of a book, created each time an author publishes changes.

| Field | Required | Meaning |
|---|---|---|
| `book_manifest` | yes | Format version, `"0.3"` (section 2). |
| `id` | yes | DID of this manifest. |
| `book_id` | yes | DID of the book. |
| `version` | yes | The book's version (semantic version). |
| `changelog` | no | What changed in this version (up to 5000 characters). |
| `published_at` | yes | Publication date-time. |
| `toc` | yes | 1 to 1000 entries, each with `chapter_id` (DID), `chapter_version`, `order` (from 1), `title` and an optional `section` label. |
| `stats` | yes | `total_chapters`, `word_count`, `estimated_reading_time_minutes`. |

A manifest pins one version of each chapter. Because it is immutable and closed, documents about a manifest version (the narrative layer) point at it; it never points at them.

### 4.2. Chapter ([`chapter.json`](../../v0.3/json-schema/entities/chapter.json))

One **immutable** version of a chapter: `id` (DID of this version, including the version), `chapter_id` (DID shared by all versions), `book_id`, `version`, `title`, `slug`, `created_at`, `metadata` (`word_count`, `estimated_reading_time_minutes`, optional `pov_character` and `tags`) and `content`, a [ProseMirror JSON document](../../v0.3/json-schema/entities/prosemirror.json). The paragraph node ids in `content` (`p-NNN`) are the positions that events and the narrative layer refer to.

### 4.3. Book ([`book.json`](../../v0.3/json-schema/entities/book.json))

The stable record of a work: `id`, `title`, `slug`, `author_ids` (co-authorship allowed), optional `publisher_id`, `series_id` and `series_order`, `language`, `latest_manifest_id` (the current published version), `metadata`, optional `pricing`, `created_at`, `updated_at`.

### 4.4. Author, publisher, series

- [Author](../../v0.3/json-schema/entities/author.json): `id`, `handle` (may be a custom domain), `name`, optional `bio`, `avatar` and `links`, `created_at`, `updated_at`.
- [Publisher](../../v0.3/json-schema/entities/publisher.json) (optional, for publishers and imprints): `id`, `handle`, `name`, optional `logo` and `website`, `created_at`, `updated_at`.
- [Series](../../v0.3/json-schema/entities/series.json): `id`, `title`, optional `description`, `author_ids`, optional `cover_image` and `genres`, `status` (`ongoing`, `completed`, `hiatus`), `created_at`, `updated_at`.

### 4.5. Reader and library entry

- [Reader](../../v0.3/json-schema/entities/reader.json): the person who reads, and who owns their reading data: `id`, optional `handle`, `display_name` and `avatar`, `created_at`, `updated_at`, optional `preferences`.
- [Library entry](../../v0.3/json-schema/entities/library-entry.json): a book in a reader's library: `id`, `reader_id`, `book_id`, `manifest_id` (the version the reader is on), `status` (`want-to-read`, `reading`, `finished`, `abandoned`, `paused`), `added_at`, optional `started_at`, `finished_at`, and the current position (`current_chapter_id`, `current_chapter_version`, `current_position` from 0 to 1, `current_node_id`).

## 5. Events

Schemas: [`v0.3/json-schema/events/`](../../v0.3/json-schema/events/). A reader app sends events in a [batch](../../v0.3/json-schema/events/batch.json) of 1 to 100. Example: [`batch-valid.json`](../../v0.3/examples/events/batch-valid.json). There are ten event types: five **session events** (section 5.3) and five **reading events** (section 5.4).

### 5.1. Privacy rules

These rules apply to every event:

- The reader id is random and pseudonymous (`did:web:bookmanifest.org:reader:<uuid>`), kept on the device, never derived from it, created only while statistics are on, and deleted on opt-out. Opting out stops all events at once and empties the queue.
- Events carry positions and enumerated values, never text: no selected text, no annotation. The `interaction` schema still defines optional `text_selection` and `annotation` fields; a reader app SHOULD NOT send them.
- What an author sees is aggregated: no figure about fewer than a minimum number of readers, and nothing about one reader.

The five reading events add these rules, enforced by their schemas:

1. **Closed payloads.** Every payload has `additionalProperties: false`. A field that was not designed in cannot be sent.
2. **No free-form strings.** Every payload field is an enum, a pattern-checked id (paragraph node id, chapter DID, entity id) or a semantic version. A test checks this for every reading event.
3. **Coarse time.** Gaps are sent as buckets (`dormancy`, `days_since_entry`), never as exact seconds.
4. **No joins across events.** Each event is meaningful alone and is counted as it comes: per paragraph, per entity, per outcome. When a question needs two moments of one reader (arrival through a shared link, then starting the book), the **device** joins them and sends the result. The server never has to link two events of the same reader.
5. **No identity where the question is about a door, not a reader.** `shared_entry` uses an anonymous envelope with **no `reader_id` and no `session_id`**, and each of its stages is sent at most once per entry per device, so counting events stands in for counting readers.

For every event with the identified envelope, ingestion SHOULD use `reader_id` and `session_id` only to count distinct readers against the threshold and to deduplicate, never to build a sequence per reader, and never to show them.

### 5.2. Envelope and positions

Every event except `shared_entry` uses the [envelope](../../v0.3/json-schema/events/envelope.json). `shared_entry` uses the [anonymous envelope](../../v0.3/json-schema/events/envelope-anonymous.json): the same fields without `reader_id` and `session_id`. The context's `chapter_id` and `chapter_version` say which chapter version a `*_node_id` belongs to; when an event points into another chapter, it carries that chapter's DID and version explicitly. Node ids are paragraph ids of the form `p-NNN`, the same ids that the narrative layer's addresses use after `#`.

### 5.3. The session events

Five events describe a reading session. Each uses the identified envelope and has a closed payload.

| Event | Sent when | Payload |
|---|---|---|
| [`heartbeat`](../../v0.3/json-schema/events/heartbeat.json) | periodically while reading | `duration_seconds` and `active_seconds` (0–600, since the last heartbeat), `start_node_id`, `end_node_id` and `focus_node_id` (first, last and central visible paragraph), `progress_percentage` in the chapter (0–1) |
| [`chapter_transition`](../../v0.3/json-schema/events/chapter-transition.json) | the reader moves between chapters | `from_chapter_id`, `from_chapter_version`, `to_chapter_id` and `to_chapter_version` (null when closing the book), `trigger` (`scroll_end`, `next_button`, `prev_button`, `toc_jump`, `link_internal`, `book_close`), `time_in_chapter_seconds`, `chapter_completion_percentage` |
| [`book_lifecycle`](../../v0.3/json-schema/events/book-lifecycle.json) | the book is started or completed | `action` (`started`, `completed`), `trigger`, `total_active_reading_time_seconds`, `completion_percentage`, `chapters_started`, `chapters_completed` |
| [`interaction`](../../v0.3/json-schema/events/interaction.json) | the reader acts on content | `action` (`highlight`, `comment`, `copy`, `share`, `bookmark`, `search_definition`, `link_click`), `target_node_id`, `target_node_type`, `selection_length`, optional `text_selection` and `annotation` |
| [`app_lifecycle`](../../v0.3/json-schema/events/app-lifecycle.json) | the app opens, goes to the background or foreground, or closes | `action` (`open`, `background`, `foreground`, `close`), optional `source` (`direct`, `notification`, `deeplink`, `widget`) and `time_since_last_session_seconds` |

### 5.4. The reading events

Five events a reader app MAY send. They tell an author **where** readers go back, enter, look for help and hesitate to share, so that it can be set against **what** the book is doing at that point (the [narrative layer](#6-narrative-layer)). They do not tell anyone who did it.

#### 5.4.1. `reread`

**When:** the reader goes back to an earlier paragraph and stays there. A reader SHOULD count a move as a re-read when the paragraph in focus moves back by at least 3 paragraphs, or into an earlier chapter, and the reader then stays on the destination for at least 5 seconds of activity. One event per destination.

| Field | |
|---|---|
| `from_node_id` | where the reader was, in the context chapter |
| `to_chapter_id`, `to_chapter_version`, `to_node_id` | the paragraph returned to (any chapter) |
| `method` | `scroll`, `toc_jump`, `link_internal`, `search`, `companion` |

**Aggregates to:** for each paragraph, how many readers came back to it and from where. Read against truths and their `clues`, it shows whether readers go back to the clues after a reveal.

#### 5.4.2. `shared_entry`

**When:** a visitor opens a shared paragraph link, decides what to do, and possibly later starts the book from its beginning.

| `stage` | Sent when |
|---|---|
| `arrived` | the shared paragraph is opened |
| `continued_from_entry` | the visitor chooses to keep reading from that paragraph |
| `began_from_start` | after that entry, the device reaches the first paragraph of the book (at most once per entry) |

Every stage carries the entry paragraph (`entry_chapter_id`, `entry_chapter_version`, `entry_node_id`). `began_from_start` also carries `days_since_entry`: `0`, `1-7`, `8-30` or `31-90`.

The device remembers the entry paragraph locally, for at most 90 days, and forgets it on opt-out. That memory is the only join; the server simply counts each stage per entry paragraph, and the share of entries that lead to starting the book is a ratio of two counts. The event travels in the anonymous envelope: no reader id, no session id. Each stage is sent at most once per entry per device. No referrer, share token, sharer, channel or URL is sent.

Because the server cannot count distinct readers for this event, the aggregation threshold applies to event counts; with one event per stage per entry per device, that is the number of devices.

**Aggregates to:** for each paragraph used as a door, how many arrive, continue, and start the book. Read against public truths, it shows whether entering through a reveal changes whether people start the book.

#### 5.4.3. `companion_open`

**When:** the reader opens a reading-companion surface.

| Field | |
|---|---|
| `surface` | `who_is_who`, `entity_card`, `map` |
| `entity_id` | the narrative-layer entity shown (required for `entity_card`) |
| `at_node_id` | the paragraph in focus; the companion is cut here |
| `trigger` | `name_tap` or `menu` (optional) |

Never what the reader typed or searched.

**Aggregates to:** where readers look for help and about whom. Read against entity `revealed_at` and scene casts, it shows where the cast becomes hard to follow.

#### 5.4.4. `recap_view`

**When:** the «what happened» recap (a few lines of the story up to where the reader stopped) is offered, viewed or dismissed.

| Field | |
|---|---|
| `action` | `offered`, `viewed`, `dismissed` |
| `trigger` | `return_prompt` (offered on coming back after a pause) or `manual` |
| `at_node_id` | the paragraph the recap runs up to |
| `dormancy` | time since the previous reading on this device: `<1d`, `1-3d`, `4-7d`, `8-30d`, `31d+` |

**Aggregates to:** after which pauses and at which points readers want a recap.

#### 5.4.5. `spoiler_warning`

**When:** before sharing, or copying the link of, a paragraph that is the `revealed_at` of a public key truth, the reader is warned.

| Field | |
|---|---|
| `action` | `shown`, `accepted` (shared anyway), `cancelled` |
| `surface` | `share` or `copy_link` |
| `target_node_id` | the paragraph being shared |

Which truths the paragraph reveals is known from the narrative layer and is not sent.

**Aggregates to:** how often each reveal is about to be shared, and how often readers hold back.

### 5.5. What no reading event carries

Text of the book or of the reader, names, search terms, URLs, referrers, share targets or channels, exact durations, location, or any identifier other than the envelope's pseudonymous reader id and session id; and `shared_entry` carries not even those.

## 6. Narrative layer

The narrative layer describes **how a book is told**: where its scenes begin and end and how much story time they cover, who perceives each passage, which few revelations matter and who knows them, which events the book comes back to, and which events it tells more than once. It is optional and sits beside the manifest: a book without a narrative layer is complete.

Schemas: [`v0.3/json-schema/narrative/`](../../v0.3/json-schema/narrative/). Example: [`narrative-layer-valid.json`](../../v0.3/examples/narrative/narrative-layer-valid.json) (Cervantes, *Don Quijote*, part I, chapters 1–20, public domain).

### 6.1. The document

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

### 6.2. Addresses

Every position in the layer is a **paragraph address**: `<chapter-slug>#p-NNN` ([`paragraph-address.json`](../../v0.3/json-schema/validators/paragraph-address.json)).

- `<chapter-slug>` is the Chapter's `slug`; `p-NNN` is the paragraph's node id in that chapter version's content (three or more digits).
- An address is resolved against `manifest_version`. It MUST exist there; an address that does not exist invalidates the item that holds it.
- **Reading order** is the manifest's chapter order, then the paragraph number. Within one chapter two addresses can always be compared; across chapters a validator needs the manifest's chapter order.
- Events (section 5.2) carry the same position as a chapter DID plus a node id. The Chapter entity links the two: its `chapter_id` and `version` give the DID, its `slug` gives the address prefix, and the node id is the part after `#`.

### 6.3. Support: every assertion cites the text

Every item except entities and findings carries a **support** ([`common.json#/$defs/support`](../../v0.3/json-schema/narrative/common.json)):

- `basis`: `asserted` when one cited paragraph states the fact (a time marker, a named place, a line of dialogue); `inferred` when it follows from reading but no single sentence states it.
- `evidence`: one or more distinct addresses whose text supports the item.
- `quote`: the literal words, copied from one of the evidence paragraphs, that justify the item. **Required when `basis` is `inferred`.**
- `confidence` (0–1, informative) and `status` (`verified`, `doubtful`, `review`; absent means not verified) MAY be given.

Nested assertions carry their own support: a scene's `time` and `duration` are cited separately from the scene's boundaries.

A producer MAY stay silent: an absent piece or field means "not stated", never "none". A producer MUST NOT guess: an item it cannot support is left out.

### 6.4. Visibility

Every item except findings has `visibility`:

- `public`: may be published with the book and used by reader-facing features, always through the spoiler-safe cut (section 6.6).
- `author`: private to the author. Never published, never sent to readers.
- **Absent means `author`.** Visibility fails closed: an item is public only when its producer says so.

**Findings are always `author`** (the schema allows no other value). They describe what an author may not know about their own book and are never published.

A public item MUST NOT reference a non-public item: a public scene may only cast public entities, a public knowledge link may only point at a public truth, and so on. This is what makes the projection below safe.

**The public projection** is mechanical: drop every item whose `visibility` is not `public`, drop `findings`, keep the header. A layer that passes validation projects without dangling references. The projection of the example is [`narrative-layer-public.json`](../../v0.3/examples/narrative/narrative-layer-public.json). Only the public projection may leave the author's workspace.

Producers SHOULD mark public only items whose `status` is `verified`.

### 6.5. The pieces

#### 6.5.1. Entities ([`entity.json`](../../v0.3/json-schema/narrative/entity.json))

Characters, places, organisations and objects the other pieces refer to: `id` (`e:<slug>`), `kind`, `name`, `revealed_at` (first paragraph after which a reader may know the entity under `name`), optional `aliases` each with its own `revealed_at`. Only what the other pieces need; everything else an analysis knows about an entity stays in the producer's own output.

#### 6.5.2. Scenes ([`scene.json`](../../v0.3/json-schema/narrative/scene.json))

A **contiguous range of paragraphs, in reading order, with one place, one story time and one cast**: `start` and `end` (inclusive), optional `place` (an entity of kind `place`), `time` (`label` and/or `date` with its own support), `cast` (characters present), `story_order` and `duration`.

- Scenes MUST NOT overlap. They need not cover every paragraph: a narrator's digression may belong to no scene.
- A scene MAY cross a chapter boundary.
- An interrupted scene is two scenes; the second names the first in `continues`. In the example, the fight with the Biscayan stops at the end of chapter 8 (`s-005`), the narrator tells how he found the manuscript in Toledo (`s-006`), and the fight resumes in chapter 9 (`s-007`, `continues: "s-005"`).
- `story_order` is the scene's position in story (fabula) order, 1 = earliest. Comparing it with reading order shows the anachronies: the Toledo scene is read sixth but happens last.
- The scene's own support cites the paragraphs that mark its boundaries.

#### 6.5.3. Story duration ([`duration.json`](../../v0.3/json-schema/narrative/duration.json))

How much story time a scene covers, **approximate by design**, in exactly one of three shapes:

| Shape | Example |
|---|---|
| `unit` + `value` | `{ "unit": "day", "value": 15 }`: «estuvo quince días en casa» (summary) |
| `unit` + `min` + `max` | `{ "unit": "minute", "min": 5, "max": 30 }`: the windmills |
| `unknown: true` | the text gives no way to tell |

`value: 0` is a **pause**: text, but the story does not advance (description, commentary). Units are `second` to `year`; the producer picks the one that reads naturally and does not convert. `basis` is `asserted` when a time marker states the span («Toda aquella noche», «quince días») and `inferred` otherwise, with `quote`.

Genette's tempos (scene, summary, ellipsis, pause) are **derived**, not stored: a consumer compares a scene's duration with its length in words, and an ellipsis is the story time between the end of one scene and the start of the next in story order.

#### 6.5.4. Focalization ([`focalization.json`](../../v0.3/json-schema/narrative/focalization.json))

**Who perceives**, over one paragraph (`start` only) or a range (`start` to `end`), distinct from who narrates:

- `internal`: the text renders what `focalizer` perceives or thinks. `focalizer` is required.
- `zero`: an unrestricted narrator, no character's perception. No `focalizer`.
- `external`: only what an outside observer could see. No `focalizer`.

Spans MUST NOT overlap. A span may match a scene, part of one, or a single paragraph. Who narrates is not part of the layer: it remains a fact of the producer's paragraph-level output. In the example the same scene at the inn has two internal focalizers in turn: don Quijote, who sees a castle (`fz-001`), and the innkeeper, who sees a poor horse (`fz-002`).

#### 6.5.5. Key truths ([`truth.json`](../../v0.3/json-schema/narrative/truth.json))

**The few revelations that matter**: facts the reader does not know at first and learns at a precise point. A book has a handful, not hundreds; a truth is not every fact.

- `text`: one self-contained sentence in the book's language: full names, an explicit verb, one fact.
- `revealed_at`: the first paragraph after which a reader may know the truth. It MUST NOT come before the earliest `evidence`.
- `evidence`: the paragraphs of the reveal.
- `clues` (optional): earlier paragraphs that hint at the truth. All MUST come before `revealed_at`.

#### 6.5.6. Knowledge links ([`knowledge.json`](../../v0.3/json-schema/narrative/knowledge.json))

**Who knows each truth, and from where**: one character (`knower`), one truth (`truth`), and two positions kept apart:

- `since`: from which paragraph the character holds it (the character's knowing), or `before_text` when the character held it before the narrative begins;
- `revealed_at`: from which paragraph a reader may be shown that the character holds it. It MUST NOT come before the earliest evidence.

Both differ from the truth's own `revealed_at`, which is when the **reader** may know the truth. `stance` is `knows`, `believes` or `suspects`; `holds` is `true` when the character holds the truth as stated and `false` when the character holds its contrary. **A belief may be false**: `knows` requires `holds: true`, the other stances do not.

With truths and knowledge links a consumer can tell, at any paragraph, who is in the dark: the reader knows the truth (its `revealed_at` is passed), a character is present (in the scene's cast), and that character holds no true link to it yet. In the example, the reader learns at `capitulo-07#p-010` that the priest and the barber walled up the library; the housekeeper and the niece know (`k-001`, `k-002`); don Quijote believes, wrongly, that an enchanter took it (`k-003`, `holds: false`), and still believes it in chapter 8.

#### 6.5.7. Event salience ([`story-event.json`](../../v0.3/json-schema/narrative/story-event.json))

A story event told at `at`, with `salience`:

- `kernel`: an event **the book picks up later**: a later paragraph depends on it, refers back to it or follows from it. Those paragraphs are listed in `picked_up_at` (required, non-empty, all after `at`).
- `catalysis`: an event the book does not pick up. No `picked_up_at`.

This is an operational reading of Barthes' distinction, chosen because it can be checked against the text. The labels describe; they never judge. A catalysis is not "filler that could go".

#### 6.5.8. Event coreference ([`coreference.json`](../../v0.3/json-schema/narrative/coreference.json))

**Two or more paragraphs that tell the same story event**: `tellings` (at least two, each with `at` and an optional `teller`), and optionally the `event` they tell. In the example the raised swords of don Quijote and the Biscayan are told three times: as it happens (`capitulo-08#p-050`), in the narrator's recapitulation (`capitulo-09#p-001`), and as a picture in the found manuscript (`capitulo-09#p-010`).

#### 6.5.9. Findings ([`finding.json`](../../v0.3/json-schema/narrative/finding.json))

What the author may not know about their own book: `continuity`, `absence`, `voice_balance`, `reading_vs_story_order` or `open_question`, with `text`, `evidence` and optional `refs` to other items. **Always `visibility: "author"`.** A finding describes and never judges.

### 6.6. Spoiler-safe use

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

A paragraph that is the `revealed_at` of a public truth is a **spoiler** for anyone who has not reached it: a reader that lets people share paragraphs SHOULD warn before sharing such a paragraph ([`spoiler_warning`](#545-spoiler_warning)).

The reference implementation of the projection and the cut is [`v0.3/narrative/semantics.ts`](../../v0.3/narrative/semantics.ts) (`publicProjection`, `spoilerSafeCut`).

### 6.7. Validation

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

### 6.8. Conformance

- A **producer** MUST emit layers that pass section 6.7, MUST NOT mark an item public unless it accepts that the item may be published, and SHOULD mark public only verified items.
- A **publisher** MUST publish only the public projection.
- A **reader-facing consumer** MUST show public items only through the gates of section 6.6, and MUST ignore the layer of a manifest version other than the one being read.
- A consumer that does not use the layer needs no change: the layer is a separate document.

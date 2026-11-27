# Producing a narrative layer and the reading events

> **Status: released in 0.3 (2026-11-27).** Companion to the [specification](spec.md); not normative.

What a program that reads a book (a *producer*) must emit to write a [narrative layer](spec.md#6-narrative-layer), and what a reader app must send to support the [reading events](spec.md#54-the-reading-events). It assumes the producer already reads paragraph by paragraph, cites paragraph addresses and knows, for each fact, the first paragraph after which a reader may know it.

## 1. Habits the layer expects

- **Cite every assertion** with paragraph addresses (`<chapter-slug>#p-NNN`) resolved against one manifest version.
- **Know when each thing becomes knowable**: `revealed_at` is the first paragraph after which a reader may know it, never before the earliest evidence.
- **Say whether it is stated or read between the lines**: `asserted` when one paragraph states it; `inferred` otherwise, with the literal `quote` that justifies it.
- **Stay silent rather than guess.** Leave a piece or a field out when the text does not support it.
- **Write one fact per sentence** in the book's language, with full names and an explicit verb, for `text` fields.
- Field names are snake_case, as everywhere in the format.

## 2. What to emit, piece by piece

| Piece | What the producer must emit | Notes |
|---|---|---|
| **Entities** | `id` (`e:<slug>`), `kind`, `name`, `revealed_at` (first appearance under that name), aliases with their own `revealed_at`. | Only the entities other pieces refer to. |
| **Scenes** | A segmentation into contiguous, non-overlapping paragraph ranges with one place, time and cast; boundaries cited; `story_order` where it can be told; `continues` for a scene resumed after an interruption. | Boundaries are where place, time or cast change. A digression may belong to no scene. A *mention* of a date is not the scene's time. |
| **Story duration** | Per scene: a unit and a magnitude, or a range, or `unknown: true`; `0` for a pause. `asserted` when a time marker states it, otherwise `inferred` with a quote. | One way to get it: summarise the scene, reason about how much time passes, give the span. Do not convert units. |
| **Focalization** | Spans with `mode` (`internal`, `zero`, `external`) and, for internal, the `focalizer`. | Who perceives, not who narrates. Expect mostly `inferred`. |
| **Setting** | Spans over which the frame of the narration holds: `enclosure`, `place`, `vehicle`, `surroundings`, `time_of_day`, `season`, `date_or_reference`, `plane` (with `plane_level` when embedded), `voice`, `mode`, `weather`, `light`, `company`, `animals`. Optionally a scene's `setting`, the frame of the whole scene. | Ask the questions per paragraph and carry each answer forward until the text changes it; a span ends where any value changes. Never guess: an absent slot means the text does not say. `no_place` is not «not stated»: it says there is no where (a letter, a summary of years, a reflection). |
| **Key truths** | A handful per book: the revelations that matter, each with `revealed_at`, the reveal's evidence and, if seen, earlier `clues`. | A selection, not every fact about identities. |
| **Knowledge links** | For a character and a key truth: `stance`, `holds` (false for a false belief), `since` (when the character holds it, or `before_text`) and `revealed_at` (when a reader may be shown it). When the text says the character stops holding it, `until` with `at`, `revealed_at` and its own support. | Keep the character's knowing apart from the reader's. These links are almost always inferred: verify them before marking them public. |
| **Event salience** | Per story event: `kernel` with `picked_up_at` (the later paragraphs that pick it up), or `catalysis`. | «Picked up later» is something the producer can cite. |
| **Event coreference** | Groups of paragraphs that tell the same event, each with an optional `teller`. | The repetitive case only. |
| **Findings** | Continuity slips, absences, voice balance, reading against story order, open questions. | Always `visibility: "author"`. Describe; never judge. |
| **Verification** | `status` per item and, on a verified item, `verified_by: ["producer"]` when the producer checked it against its cited paragraphs. | An author-facing tool (the author confirming an item left `doubtful`) sets `status: verified` and adds `author`. `verified_by` is allowed only with `status: verified`. |
| **Visibility** | `visibility` on every item. Absent means `author`. | Mark `public` only verified items you accept may be published, whoever verified them. |

A producer that cannot produce a piece leaves it out; the layer stays valid.

## 3. Checks before emitting

1. The JSON Schema of the layer (`v0.3/json-schema/narrative/narrative-layer.json`).
2. The semantic rules (`validateNarrativeLayer` in `v0.3/narrative/semantics.ts`) with the manifest's chapter order and paragraph counts.
3. Every `quote` is literal text of one of its evidence paragraphs.
4. Only then, the public projection (`publicProjection`) for publishing.

## 4. What a reader app sends

It keeps sending the session events and MAY add:

| Event | When |
|---|---|
| `reread` | the focus moves back at least 3 paragraphs (or to an earlier chapter) and stays at least 5 active seconds |
| `shared_entry` | anonymous envelope (no reader id, no session id), each stage at most once per entry per device: `arrived` on opening a shared paragraph; `continued_from_entry` on choosing to read on from it; `began_from_start` when the device later reaches the book's first paragraph (it remembers the entry locally for up to 90 days and forgets it on opt-out) |
| `companion_open` | opening who-is-who, an entity card or the map |
| `recap_view` | offering, viewing or dismissing the recap |
| `spoiler_warning` | showing the warning before sharing or copying the link of a paragraph that reveals a public key truth, and the reader's answer |
| `access_gate` | showing a gate (buy, subscribe or wait) in place of a chapter the reader cannot read yet. It replaces the chapter's `chapter_transition` and `heartbeat`: a gated chapter is never entered |

Any reader-facing companion shows the layer only through the spoiler-safe cut (`spoilerSafeCut`), for the reader's current paragraph.

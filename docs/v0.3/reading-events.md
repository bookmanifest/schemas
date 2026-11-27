# Reading events v0.3

> **Status: released in v0.3.0 (2026-11-27).** Every v0.1 document stays valid.

Five new events a reader app MAY send, beside the five of v0.1. They tell an author **where** readers go back, enter, look for help and hesitate to share, so that it can be set against **what** the book is doing at that point (the [narrative layer](narrative-layer.md)). They do not tell anyone who did it.

Schemas: [`v0.3/json-schema/events/`](../../v0.3/json-schema/events/). Example batch: [`batch-valid.json`](../../v0.3/examples/events/batch-valid.json).

## 1. Privacy rules

The v0.1 rules stay as they are, and every new event follows them:

- The reader id is random and pseudonymous (`did:web:bookmanifest.org:reader:<uuid>`), kept on the device, never derived from it, created only while statistics are on, and deleted on opt-out. Opting out stops all events at once and empties the queue.
- Events carry positions and enumerated values, never text: no selected text, no annotation.
- What an author sees is aggregated: no figure about fewer than a minimum number of readers, and nothing about one reader.

The new events add four rules, enforced by their schemas:

1. **Closed payloads.** Every payload has `additionalProperties: false`. A field that was not designed in cannot be sent.
2. **No free-form strings.** Every payload field is an enum, a pattern-checked id (paragraph node id, chapter DID, entity id) or a semantic version. A test checks this for every new event.
3. **Coarse time.** Gaps are sent as buckets (`dormancy`, `days_since_entry`), never as exact seconds.
4. **No joins across events.** Each event is meaningful alone and is counted as it comes: per paragraph, per entity, per outcome. When a question needs two moments of one reader (arrival through a shared link, then starting the book), the **device** joins them and sends the result. The server never has to link two events of the same reader.
5. **No identity where the question is about a door, not a reader.** `shared_entry` uses an anonymous envelope with **no `reader_id` and no `session_id`**, and each of its stages is sent at most once per entry per device, so counting events stands in for counting readers.

For the other four events, ingestion SHOULD treat the envelope's `reader_id` and `session_id` as it does for v0.1: to count distinct readers against the threshold and to deduplicate, never to build a sequence per reader, and never to show them.

## 2. Envelope and positions

Four of the new events use the v0.1 envelope unchanged; only `type` admits four more values ([`envelope.json`](../../v0.3/json-schema/events/envelope.json)). `shared_entry` uses the [anonymous envelope](../../v0.3/json-schema/events/envelope-anonymous.json): the same fields without `reader_id` and `session_id`. The context's `chapter_id` and `chapter_version` say which chapter version a `*_node_id` belongs to; when an event points into another chapter, it carries that chapter's DID and version explicitly. Node ids are paragraph ids of the form `p-NNN`, the same ids that the narrative layer's addresses use after `#`.

A v0.1 consumer rejects a batch containing a v0.3 event instead of misreading it. Readers SHOULD send v0.3 events only to an ingestion endpoint that declares v0.3 support.

## 3. The events

### 1. `reread`

**When:** the reader goes back to an earlier paragraph and stays there. A reader SHOULD count a move as a re-read when the paragraph in focus moves back by at least 3 paragraphs, or into an earlier chapter, and the reader then stays on the destination for at least 5 seconds of activity. One event per destination.

| Field | |
|---|---|
| `from_node_id` | where the reader was, in the context chapter |
| `to_chapter_id`, `to_chapter_version`, `to_node_id` | the paragraph returned to (any chapter) |
| `method` | `scroll`, `toc_jump`, `link_internal`, `search`, `companion` |

**Aggregates to:** for each paragraph, how many readers came back to it and from where. Read against truths and their `clues`, it shows whether readers go back to the clues after a reveal.

### 2. `shared_entry`

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

### 3. `companion_open`

**When:** the reader opens a reading-companion surface.

| Field | |
|---|---|
| `surface` | `who_is_who`, `entity_card`, `map` |
| `entity_id` | the narrative-layer entity shown (required for `entity_card`) |
| `at_node_id` | the paragraph in focus; the companion is cut here |
| `trigger` | `name_tap` or `menu` (optional) |

Never what the reader typed or searched.

**Aggregates to:** where readers look for help and about whom. Read against entity `revealed_at` and scene casts, it shows where the cast becomes hard to follow.

### 4. `recap_view`

**When:** the «what happened» recap (a few lines of the story up to where the reader stopped) is offered, viewed or dismissed.

| Field | |
|---|---|
| `action` | `offered`, `viewed`, `dismissed` |
| `trigger` | `return_prompt` (offered on coming back after a pause) or `manual` |
| `at_node_id` | the paragraph the recap runs up to |
| `dormancy` | time since the previous reading on this device: `<1d`, `1-3d`, `4-7d`, `8-30d`, `31d+` |

**Aggregates to:** after which pauses and at which points readers want a recap.

### 5. `spoiler_warning`

**When:** before sharing, or copying the link of, a paragraph that is the `revealed_at` of a public key truth, the reader is warned.

| Field | |
|---|---|
| `action` | `shown`, `accepted` (shared anyway), `cancelled` |
| `surface` | `share` or `copy_link` |
| `target_node_id` | the paragraph being shared |

Which truths the paragraph reveals is known from the narrative layer and is not sent.

**Aggregates to:** how often each reveal is about to be shared, and how often readers hold back.

## 4. What none of these events carries

Text of the book or of the reader, names, search terms, URLs, referrers, share targets or channels, exact durations, location, or any identifier other than the v0.1 envelope's pseudonymous reader id and session id; and `shared_entry` carries not even those.

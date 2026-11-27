# Changelog

All notable changes to the Book Manifest Schemas package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-11-27

Packaging only: no schema, type, Zod validator or example changes.

### Fixed

- The compiled package now works with plain Node ESM. Relative imports in `dist/` carry their `.js` extension (the build uses `module`/`moduleResolution` `NodeNext`), so `import '@bookmanifest/schemas'` and `import '@bookmanifest/schemas/v0.3'` no longer fail with `ERR_MODULE_NOT_FOUND` outside a bundler, and TypeScript consumers on `NodeNext`/`Node16` resolve the types.
- v0.3 reuses the v0.1 Zod validators instead of shipping a second copy of them under `dist/v0.1/zod/`.
- `./json-schema` pointed at `v0.1/json-schema/index.json`, which never existed; it is replaced by the `./json-schema/*` pattern below.

### Changed

- One build (`tsc`, `tsconfig.json`) compiles v0.1 to `dist/v0.1/` and v0.3 to `dist/v0.3/`. The import specifiers are unchanged; `main`, `types` and the `exports` targets of `.`, `./entities`, `./events` and `./validators` now point into `dist/v0.1/`. `tsconfig.v0.3.build.json` is gone.

### Added

- Package exports `./v0.1` (same module as `.`), `./json-schema/*` and `./v0.1/json-schema/*` (the v0.1 JSON Schemas, for example `@bookmanifest/schemas/v0.1/json-schema/entities/author.json` imported `with { type: 'json' }`).
- `npm run test:node` (part of `npm test`): packs the package, installs it in a throwaway project and, with plain `node`, imports every entry point by its bare specifier, imports every published JSON Schema with import attributes and validates an example against each version; then type-checks every entry point with TypeScript on `NodeNext`.
- CI runs on Node 20, 22 and 24 and fails if the committed `dist/` differs from a fresh build.

## [0.3.0] - 2026-11-27

v0.3 sits beside v0.1: every v0.1 schema, type, Zod validator, example and `dist/` file is unchanged, and v0.1 documents and events stay valid. There is no v0.2 of the format.

### Added

- **Narrative layer v0.3**: an optional document bound to one manifest version, beside the manifest, which stays unchanged. JSON Schemas in `v0.3/json-schema/narrative/` for each piece:
  - scenes (contiguous paragraph ranges with one place, time and cast; may cross chapters; `continues` for interrupted scenes; `story_order`);
  - story duration per scene (unit and magnitude, a range, a pause, or unknown), with basis and evidence;
  - focalization spans (internal with a focalizer, zero, external), distinct from the narrator;
  - key truths with `revealed_at`, reveal evidence and optional earlier clues;
  - knowledge links: who holds each truth, from which paragraph (`since`, or `before_text`) and from when a reader may be shown it (`revealed_at`), with false beliefs;
  - event salience (kernel with the later paragraphs that pick it up, or catalysis);
  - event coreference (one event told in several paragraphs);
  - findings, always author-private;
  - `visibility` on every item, `public` or `author`, absent meaning `author`.
- Paragraph address validator (`<chapter-slug>#p-NNN`) and entity id validator.
- Semantic validator, public projection and spoiler-safe cut (`v0.3/narrative/semantics.ts`); the cut never shows an address after the reader's position.
- **Five reading events**: `reread`, `companion_open`, `recap_view` and `spoiler_warning` on the v0.1 envelope, and `shared_entry` on a new anonymous envelope (no reader id, no session id), all with closed payloads and no free-form strings. A v0.3 batch schema accepts the v0.1 events unchanged plus these.
- Zod mirrors of every new schema (`v0.3/zod/`).
- Examples from *Don Quijote*, part I, chapters 1–20 (public domain), with an address index and excerpts so tests check that every address exists and every quote is literal; invalid examples for each rule.
- Spec text, event spec, rationale and producer guide in `docs/v0.3/`.
- Package export `@bookmanifest/schemas/v0.3` (compiled to `dist/v0.3/`) and the v0.3 JSON Schemas under `@bookmanifest/schemas/v0.3/json-schema/*`.
- `npm run typecheck:v0.3`; `npm run validate` now also checks the v0.3 examples (valid ones must pass, invalid ones must fail) and exits non-zero on a crash.

## [0.1.0] - 2025-12-30

### Added

- Initial release of Book Manifest schemas v0.1
- JSON Schema definitions for all entities:
  - Author: Creator of books with handle, bio, avatar, and external links
  - Publisher: Publishing entities with metadata
  - Series: Book series with ordering and metadata
  - Book: Books with comprehensive metadata, pricing, and author references
  - Manifest: Immutable table of contents for book versions
  - Chapter: Versioned chapter content with ProseMirror JSON format
  - Reader: Users with reading preferences
  - LibraryEntry: User library entries with reading progress tracking
- JSON Schema definitions for all events:
  - Heartbeat: Reading session tracking events
  - ChapterTransition: Navigation between chapters
  - BookLifecycle: Book start/complete milestones
  - Interaction: User interactions (highlights, annotations, etc.)
  - AppLifecycle: App state changes (open, background, etc.)
  - EventBatch: Batching support for 1-100 events
- Custom validators for Book Manifest-specific formats:
  - DIDs (Decentralized Identifiers): `did:web:bookmanifest.org:{type}:{id}[:{version}]`
  - SemVer: Semantic versioning (`major.minor.patch`)
  - ISO 8601: Date-time format
  - URL: HTTP/HTTPS URLs
  - Language codes: ISO 639-1
  - Currency codes: ISO 4217
- Auto-generated TypeScript types from JSON Schema
- Zod schemas for runtime validation
- Example data for all schemas (9 entity examples, 1 event batch example)
- Comprehensive test suite (39 tests: 31 entity tests + 8 event tests)
- Build and validation scripts:
  - `generate-from-json-schema.js`: Auto-generates TypeScript types
  - `validate-examples.js`: Validates examples against schemas
- Package exports for all schema categories (entities, events, validators)
- Comprehensive README with usage examples

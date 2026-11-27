# Book Manifest Schemas

Formal schemas for Book Manifest **0.3**, the only version of the format: the manifest and its entities, the reading events and the optional narrative layer.

The specification is one document: [`docs/v0.3/spec.md`](docs/v0.3/spec.md). Companions: the [rationale](docs/v0.3/rationale.md) and the [producer guide](docs/v0.3/producer-guide.md).

This package provides JSON Schema definitions (the source of truth), TypeScript types generated from them, and Zod validators that mirror them.

## Installation

```bash
npm install @bookmanifest/schemas
```

The package is plain ESM that Node imports directly (no bundler needed), and TypeScript resolves its types with `moduleResolution` set to `NodeNext`, `Node16` or `Bundler`.

## Entry points

| Specifier | What |
|---|---|
| `@bookmanifest/schemas` | Zod validators, the narrative-layer semantics and their types |
| `@bookmanifest/schemas/v0.3` | The same module, named by its format version |
| `@bookmanifest/schemas/json-schema/*` | The JSON Schemas, e.g. `json-schema/entities/manifest.json` |
| `@bookmanifest/schemas/v0.3/json-schema/*` | The same files, named by their format version |

## Usage

### Runtime validation with Zod

```typescript
import { ManifestSchema, BookSchema, EventBatchSchema, NarrativeLayerSchema } from '@bookmanifest/schemas'

const manifest = ManifestSchema.parse(rawManifest) // manifest.book_manifest === '0.3'

const result = BookSchema.safeParse(rawBook)
if (!result.success) console.error(result.error)

// A batch of 1 to 100 events of any of the ten types.
EventBatchSchema.parse({ events })
```

The namespaces `Entities`, `Events`, `Validators` and `Narrative` group the same exports.

### Narrative layer

```typescript
import { NarrativeLayerSchema, validateNarrativeLayer, publicProjection, spoilerSafeCut } from '@bookmanifest/schemas'

const layer = NarrativeLayerSchema.parse(raw)
const issues = validateNarrativeLayer(layer, readingOrder) // the semantic rules a schema cannot express
const published = publicProjection(layer)                  // only what may leave the author's workspace
const view = spoilerSafeCut(published, 'capitulo-08#p-005', readingOrder)
```

### JSON Schema (language agnostic)

```javascript
// Node needs the JSON import attribute.
import manifestSchema from '@bookmanifest/schemas/json-schema/entities/manifest.json' with { type: 'json' }

// Or read the files from disk.
import { readFileSync } from 'fs'
const schema = JSON.parse(readFileSync('./node_modules/@bookmanifest/schemas/v0.3/json-schema/entities/manifest.json', 'utf-8'))
```

Every schema's `$id` is `https://bookmanifest.org/schemas/v0.3/<path>` and refers to the others by relative path, so a draft 2020-12 validator (for example `ajv/dist/2020`) resolves the whole set once every file is added.

## Structure

- `v0.3/json-schema/` - JSON Schema definitions (source of truth)
  - `entities/` - Manifest, chapter, book, author, publisher, series, reader, library entry
  - `events/` - The envelopes, the ten events and the batch
  - `narrative/` - The narrative layer and its pieces
  - `validators/` - DIDs, semantic versions, date-times, URLs, paragraph addresses, entity ids
- `v0.3/typescript/` - TypeScript types generated from the JSON Schemas
- `v0.3/zod/` - Zod validators
- `v0.3/narrative/` - Semantic validation, public projection and spoiler-safe cut of a narrative layer
- `v0.3/examples/` - Valid and invalid examples
- `v0.3/tests/` - Test suite

## Development

```bash
npm install
npm run build       # Generate TypeScript types and compile to dist/
npm test            # Vitest suite, then the plain-Node ESM smoke test of the packed package
npm run typecheck   # Type-check sources and tests
npm run validate    # Validate every example against the JSON Schemas (invalid ones must fail)
```

## Contributing

1. JSON Schema is the source of truth: edit the JSON Schema files first.
2. Run `npm run generate` to update the TypeScript types.
3. Update the Zod validators in `v0.3/zod/` to match.
4. Add examples and tests for any new schema or rule.
5. Run `npm run build`, `npm test`, `npm run typecheck` and `npm run validate`. CI also checks that the committed `dist/` matches a fresh build.

## License

MIT

# Book Manifest Schemas v0.1

Formal schemas for Book Manifest.

This package provides JSON Schema definitions, TypeScript types, and Zod validators for all Book Manifest entities and events. The JSON Schema serves as the source of truth, with TypeScript types and Zod validators auto-generated from it.

## Draft v0.3: narrative layer and reading events

A **draft** for review, not released or exported by the package: an optional narrative layer (scenes, story duration, focalization, key truths and who knows them, event salience and coreference, with public and author-private visibility) and five new aggregate-only reading events. See [`docs/v0.3/`](docs/v0.3/): the [narrative layer](docs/v0.3/narrative-layer.md), the [reading events](docs/v0.3/reading-events.md), the [rationale](docs/v0.3/rationale.md) and the [producer guide](docs/v0.3/producer-guide.md). Schemas, Zod mirrors, examples and tests live in `v0.3/`.

## Installation

```bash
npm install @bookmanifest/schemas
```

## Structure

- `v0.1/json-schema/` - JSON Schema definitions (source of truth)
  - `entities/` - Core entities (Author, Book, Chapter, etc.)
  - `events/` - Event schemas (heartbeat, interaction, etc.)
  - `validators/` - Custom validators (DIDs, SemVer, etc.)
- `v0.1/typescript/` - Auto-generated TypeScript types
- `v0.1/zod/` - Zod validators for runtime validation
- `v0.1/examples/` - Valid example data for all schemas
- `v0.1/tests/` - Comprehensive test suite

## Usage

### Import Everything

```typescript
import { BookSchema, AuthorSchema, BookManifestEventSchema } from '@bookmanifest/schemas'
```

### Import by Category

```typescript
// Entities only
import { BookSchema, AuthorSchema, ChapterSchema } from '@bookmanifest/schemas/entities'

// Events only
import { BookManifestEventSchema, EventBatchSchema } from '@bookmanifest/schemas/events'

// Validators only
import { didSchema, semverSchema, iso8601Schema } from '@bookmanifest/schemas/validators'
```

### Runtime Validation with Zod

```typescript
import { BookSchema, AuthorSchema } from '@bookmanifest/schemas/entities'

// Validate and parse data
try {
  const book = BookSchema.parse(rawData)
  console.log('Valid book:', book)
} catch (error) {
  console.error('Validation failed:', error.errors)
}

// Safe parse (returns result object instead of throwing)
const result = AuthorSchema.safeParse(rawData)
if (result.success) {
  console.log('Valid author:', result.data)
} else {
  console.error('Validation failed:', result.error)
}
```

### TypeScript Types

```typescript
import type { Book, Author, Manifest, Chapter } from '@bookmanifest/schemas'

function processBook(book: Book) {
  console.log(`Processing: ${book.title} by ${book.author_ids.join(', ')}`)
}
```

### Event Validation

```typescript
import { BookManifestEventSchema, EventBatchSchema } from '@bookmanifest/schemas/events'

// Validate a single event
const event = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  timestamp: '2025-12-30T12:00:00Z',
  session_id: '550e8400-e29b-41d4-a716-446655440001',
  type: 'heartbeat',
  context: { /* ... */ },
  payload: { /* ... */ }
}

const validEvent = BookManifestEventSchema.parse(event)

// Validate a batch of events
const batch = { events: [event] }
const validBatch = EventBatchSchema.parse(batch)
```

### JSON Schema (Language Agnostic)

```javascript
// Import JSON Schema files directly for use with any validator
import authorSchema from '@bookmanifest/schemas/json-schema'
// Or import specific schemas
import { readFileSync } from 'fs'
const schema = JSON.parse(readFileSync('./node_modules/@bookmanifest/schemas/v0.1/json-schema/entities/author.json'))
```

## Available Schemas

### Entities

- `AuthorSchema` - Author entity
- `PublisherSchema` - Publisher entity
- `SeriesSchema` - Book series entity
- `BookSchema` - Book entity with metadata and pricing
- `ManifestSchema` - Manifest entity (table of contents)
- `ChapterSchema` - Chapter entity with ProseMirror content
- `ReaderSchema` - Reader entity with preferences
- `LibraryEntrySchema` - Library entry entity with reading progress

### Events

- `BookManifestEventSchema` - Discriminated union of all event types
- `EventBatchSchema` - Batch of events (1-100 events)
- `HeartbeatEventSchema` - Reading session heartbeat
- `ChapterTransitionEventSchema` - Chapter navigation events
- `BookLifecycleEventSchema` - Book start/complete events
- `InteractionEventSchema` - User content interactions
- `AppLifecycleEventSchema` - App state changes

### Validators

- `didSchema` - Book Manifest Decentralized Identifiers (using did:web)
- `semverSchema` - Semantic versioning
- `iso8601Schema` - ISO 8601 datetime strings
- `urlSchema` - HTTP/HTTPS URLs
- `languageCodeSchema` - ISO 639-1 language codes
- `currencyCodeSchema` - ISO 4217 currency codes

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build       # Generate TypeScript types and compile
npm run generate    # Generate TypeScript types only
npm run compile     # Compile TypeScript only
```

### Testing

```bash
npm test            # Run test suite
npm run test:watch  # Run tests in watch mode
npm run validate    # Validate all example files
```

### Scripts

- `generate-from-json-schema.js` - Auto-generates TypeScript types from JSON Schema
- `validate-examples.js` - Validates example files against schemas

## Contributing

1. JSON Schema is the source of truth - always edit JSON Schema files first
2. After editing JSON Schema, run `npm run generate` to update TypeScript types
3. Update Zod validators in `v0.1/zod/` to match JSON Schema changes
4. Add tests for any new schemas or validators
5. Run `npm test` and `npm run validate` to ensure all tests pass

## License

MIT

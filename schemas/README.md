# BDS Schemas v0.1

Formal schemas for the Book Distribution Standard (BDS).

This package provides JSON Schema definitions, TypeScript types, and Zod validators for all BDS entities and events. The JSON Schema serves as the source of truth, with TypeScript types and Zod validators auto-generated from it.

## Installation

```bash
npm install @bds/schemas
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
import { BookSchema, AuthorSchema, BDSEventSchema } from '@bds/schemas'
```

### Import by Category

```typescript
// Entities only
import { BookSchema, AuthorSchema, ChapterSchema } from '@bds/schemas/entities'

// Events only
import { BDSEventSchema, EventBatchSchema } from '@bds/schemas/events'

// Validators only
import { didSchema, semverSchema, iso8601Schema } from '@bds/schemas/validators'
```

### Runtime Validation with Zod

```typescript
import { BookSchema, AuthorSchema } from '@bds/schemas/entities'

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
import type { Book, Author, Manifest, Chapter } from '@bds/schemas'

function processBook(book: Book) {
  console.log(`Processing: ${book.title} by ${book.author_ids.join(', ')}`)
}
```

### Event Validation

```typescript
import { BDSEventSchema, EventBatchSchema } from '@bds/schemas/events'

// Validate a single event
const event = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  timestamp: '2025-12-30T12:00:00Z',
  session_id: '550e8400-e29b-41d4-a716-446655440001',
  type: 'heartbeat',
  context: { /* ... */ },
  payload: { /* ... */ }
}

const validEvent = BDSEventSchema.parse(event)

// Validate a batch of events
const batch = { events: [event] }
const validBatch = EventBatchSchema.parse(batch)
```

### JSON Schema (Language Agnostic)

```javascript
// Import JSON Schema files directly for use with any validator
import authorSchema from '@bds/schemas/json-schema'
// Or import specific schemas
import { readFileSync } from 'fs'
const schema = JSON.parse(readFileSync('./node_modules/@bds/schemas/v0.1/json-schema/entities/author.json'))
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

- `BDSEventSchema` - Discriminated union of all event types
- `EventBatchSchema` - Batch of events (1-100 events)
- `HeartbeatEventSchema` - Reading session heartbeat
- `ChapterTransitionEventSchema` - Chapter navigation events
- `BookLifecycleEventSchema` - Book start/complete events
- `InteractionEventSchema` - User content interactions
- `AppLifecycleEventSchema` - App state changes

### Validators

- `didSchema` - BDS Decentralized Identifiers
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

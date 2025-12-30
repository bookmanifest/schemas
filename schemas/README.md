# BDS Schemas v0.1

Formal schemas for the Book Distribution Standard (BDS).

## Structure

- `v0.1/json-schema/` - JSON Schema definitions (source of truth)
- `v0.1/typescript/` - Auto-generated TypeScript types
- `v0.1/zod/` - Auto-generated Zod validators
- `v0.1/examples/` - Valid example data
- `v0.1/tests/` - Compliance test suite

## Usage

### JSON Schema (any language)

```javascript
import schema from '@bds/schemas/json-schema'
```

### TypeScript

```typescript
import { Book, Author, Manifest } from '@bds/schemas'
```

### Zod (runtime validation)

```typescript
import { BookSchema } from '@bds/schemas/zod'

const result = BookSchema.parse(data)
```

## Development

```bash
npm install
npm run build       # Generate types and compile
npm test            # Run test suite
npm run validate    # Validate examples
```

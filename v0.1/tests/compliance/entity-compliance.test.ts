import { describe, it, expect } from 'vitest'
import { AuthorSchema, PublisherSchema, SeriesSchema, BookSchema, ManifestSchema, ChapterSchema, ReaderSchema, LibraryEntrySchema } from '../../zod/entities'
import { glob } from 'glob'
import { readFile } from 'fs/promises'
import path from 'path'

const SCHEMAS = {
  author: AuthorSchema,
  publisher: PublisherSchema,
  series: SeriesSchema,
  book: BookSchema,
  manifest: ManifestSchema,
  chapter: ChapterSchema,
  reader: ReaderSchema,
  'library-entry': LibraryEntrySchema
}

describe('Book Manifest Entity Compliance', () => {
  it('should validate all valid entity examples', async () => {
    const validFiles = await glob('./v0.1/examples/entities/*-valid.json')

    for (const file of validFiles) {
      const entityType = path.basename(file).replace('-valid.json', '')
      const schema = SCHEMAS[entityType as keyof typeof SCHEMAS]
      const data = JSON.parse(await readFile(file, 'utf-8'))

      expect(() => schema.parse(data), `${entityType} should be valid`).not.toThrow()
    }
  })

  it('should reject all invalid entity examples', async () => {
    const invalidFiles = await glob('./v0.1/examples/entities/*-invalid.json')

    for (const file of invalidFiles) {
      const entityType = path.basename(file).replace('-invalid.json', '')
      const schema = SCHEMAS[entityType as keyof typeof SCHEMAS]
      const data = JSON.parse(await readFile(file, 'utf-8'))

      expect(() => schema.parse(data), `${entityType} should be invalid`).toThrow()
    }
  })
})

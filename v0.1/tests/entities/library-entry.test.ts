import { describe, it, expect } from 'vitest'
import { LibraryEntrySchema } from '../../zod/entities'
import validLibraryEntry from '../../examples/entities/library-entry-valid.json'

describe('LibraryEntry Schema', () => {
  it('should validate a valid library entry', () => {
    expect(() => LibraryEntrySchema.parse(validLibraryEntry)).not.toThrow()
  })

  it('should require id, reader_id, book_id, manifest_id, status, added_at', () => {
    const minimal = {
      id: 'did:bds:library-entry:test123',
      reader_id: 'did:bds:reader:test',
      book_id: 'did:bds:book:test',
      manifest_id: 'did:bds:manifest:test',
      status: 'want-to-read',
      added_at: '2025-01-01T00:00:00Z'
    }

    expect(() => LibraryEntrySchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional started_at, finished_at, current_chapter_id, etc.', () => {
    const withOptionals = {
      id: 'did:bds:library-entry:abc123',
      reader_id: 'did:bds:reader:jorge',
      book_id: 'did:bds:book:la-unica-verdad',
      manifest_id: 'did:bds:manifest:abc1234',
      status: 'reading',
      added_at: '2025-03-10T10:00:00Z',
      started_at: '2025-03-12T20:00:00Z',
      finished_at: null,
      current_chapter_id: 'did:bds:chapter:ch4',
      current_chapter_version: '1.1.0',
      current_position: 0.45,
      current_node_id: 'p-042'
    }

    expect(() => LibraryEntrySchema.parse(withOptionals)).not.toThrow()
  })

  it('should validate status enum', () => {
    const entry = {
      id: 'did:bds:library-entry:test',
      reader_id: 'did:bds:reader:test',
      book_id: 'did:bds:book:test',
      manifest_id: 'did:bds:manifest:test',
      status: 'reading',
      added_at: '2025-01-01T00:00:00Z'
    }

    const statuses = ['want-to-read', 'reading', 'finished', 'abandoned', 'paused']
    statuses.forEach(status => {
      expect(() => LibraryEntrySchema.parse({ ...entry, status })).not.toThrow()
    })

    expect(() => LibraryEntrySchema.parse({ ...entry, status: 'invalid' })).toThrow()
  })

  it('should validate current_position is between 0 and 1', () => {
    const entry = {
      id: 'did:bds:library-entry:test',
      reader_id: 'did:bds:reader:test',
      book_id: 'did:bds:book:test',
      manifest_id: 'did:bds:manifest:test',
      status: 'reading',
      added_at: '2025-01-01T00:00:00Z',
      current_position: 1.5
    }

    expect(() => LibraryEntrySchema.parse(entry)).toThrow()
  })
})

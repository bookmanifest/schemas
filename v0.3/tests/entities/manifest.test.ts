import { describe, it, expect } from 'vitest'
import { ManifestSchema } from '../../zod/entities'
import validManifest from '../../examples/entities/manifest-valid.json'

describe('Manifest Schema', () => {
  it('should validate a valid manifest', () => {
    expect(() => ManifestSchema.parse(validManifest)).not.toThrow()
  })

  it('should require book_manifest, id, book_id, version, published_at, toc, stats', () => {
    const minimal = {
      book_manifest: '0.3',
      id: 'did:web:bookmanifest.org:manifest:test123',
      book_id: 'did:web:bookmanifest.org:book:test',
      version: '1.0.0',
      published_at: '2025-01-01T00:00:00Z',
      toc: [
        {
          chapter_id: 'did:web:bookmanifest.org:chapter:ch1',
          chapter_version: '1.0.0',
          order: 1,
          title: 'Chapter 1'
        }
      ],
      stats: {
        total_chapters: 1,
        word_count: 5000,
        estimated_reading_time_minutes: 20
      }
    }

    expect(() => ManifestSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional changelog and section in toc', () => {
    const withOptionals = {
      book_manifest: '0.3',
      id: 'did:web:bookmanifest.org:manifest:abc1234',
      book_id: 'did:web:bookmanifest.org:book:la-unica-verdad',
      version: '1.1.0',
      changelog: 'Rewrote chapter 4 to improve pacing',
      published_at: '2025-06-20T14:30:00Z',
      toc: [
        {
          chapter_id: 'did:web:bookmanifest.org:chapter:ch1',
          chapter_version: '1.0.0',
          order: 1,
          title: 'El Comienzo',
          section: 'Parte 1: El Inicio'
        }
      ],
      stats: {
        total_chapters: 12,
        word_count: 85000,
        estimated_reading_time_minutes: 340
      }
    }

    expect(() => ManifestSchema.parse(withOptionals)).not.toThrow()
  })

  it('should validate toc order is positive integer', () => {
    const manifest = {
      book_manifest: '0.3',
      id: 'did:web:bookmanifest.org:manifest:test',
      book_id: 'did:web:bookmanifest.org:book:test',
      version: '1.0.0',
      published_at: '2025-01-01T00:00:00Z',
      toc: [
        {
          chapter_id: 'did:web:bookmanifest.org:chapter:ch1',
          chapter_version: '1.0.0',
          order: 0,
          title: 'Chapter 1'
        }
      ],
      stats: {
        total_chapters: 1,
        word_count: 5000,
        estimated_reading_time_minutes: 20
      }
    }

    expect(() => ManifestSchema.parse(manifest)).toThrow()
  })

  it('should require the format version book_manifest, and only 0.3', () => {
    const { book_manifest, ...withoutFormat } = validManifest
    expect(book_manifest).toBe('0.3')
    expect(ManifestSchema.safeParse(withoutFormat).success).toBe(false)
    expect(ManifestSchema.safeParse({ ...validManifest, book_manifest: '0.1' }).success).toBe(false)
  })
})

import { describe, it, expect } from 'vitest'
import { ChapterSchema } from '../../zod/entities'
import validChapter from '../../examples/entities/chapter-valid.json'

describe('Chapter Schema', () => {
  it('should validate a valid chapter', () => {
    expect(() => ChapterSchema.parse(validChapter)).not.toThrow()
  })

  it('should require id, chapter_id, book_id, version, title, slug, created_at, metadata, content', () => {
    const minimal = {
      id: 'did:web:bookmanifest.org:chapter:ch1:1.0.0',
      chapter_id: 'did:web:bookmanifest.org:chapter:ch1',
      book_id: 'did:web:bookmanifest.org:book:test',
      version: '1.0.0',
      title: 'Chapter 1',
      slug: 'chapter-1',
      created_at: '2025-01-01T00:00:00Z',
      metadata: {
        word_count: 1000,
        estimated_reading_time_minutes: 4
      },
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { id: 'p-001' },
            content: [
              { type: 'text', text: 'Hello world.' }
            ]
          }
        ]
      }
    }

    expect(() => ChapterSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional pov_character and tags in metadata', () => {
    const withOptionals = {
      id: 'did:web:bookmanifest.org:chapter:ch4:1.1.0',
      chapter_id: 'did:web:bookmanifest.org:chapter:ch4',
      book_id: 'did:web:bookmanifest.org:book:la-unica-verdad',
      version: '1.1.0',
      title: 'El Despertar',
      slug: 'el-despertar',
      created_at: '2025-06-20T14:30:00Z',
      metadata: {
        word_count: 3400,
        estimated_reading_time_minutes: 13,
        pov_character: 'Elena',
        tags: ['turning-point', 'revelation']
      },
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { id: 'p-001' },
            content: [
              { type: 'text', text: 'La luz entraba por la ventana cuando ' },
              { type: 'text', marks: [{ type: 'emphasis' }], text: 'todo cambió' },
              { type: 'text', text: '.' }
            ]
          }
        ]
      }
    }

    expect(() => ChapterSchema.parse(withOptionals)).not.toThrow()
  })

  it('should validate ProseMirror content structure', () => {
    const chapter = {
      id: 'did:web:bookmanifest.org:chapter:ch1:1.0.0',
      chapter_id: 'did:web:bookmanifest.org:chapter:ch1',
      book_id: 'did:web:bookmanifest.org:book:test',
      version: '1.0.0',
      title: 'Chapter 1',
      slug: 'chapter-1',
      created_at: '2025-01-01T00:00:00Z',
      metadata: {
        word_count: 1000,
        estimated_reading_time_minutes: 4
      },
      content: {
        type: 'doc',
        content: []
      }
    }

    // Should require content array
    expect(() => ChapterSchema.parse(chapter)).not.toThrow()

    // Should require type field
    const noType = { ...chapter, content: { content: [] } }
    expect(() => ChapterSchema.parse(noType)).toThrow()
  })
})

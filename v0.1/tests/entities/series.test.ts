import { describe, it, expect } from 'vitest'
import { SeriesSchema } from '../../zod/entities'
import validSeries from '../../examples/entities/series-valid.json'

describe('Series Schema', () => {
  it('should validate a valid series', () => {
    expect(() => SeriesSchema.parse(validSeries)).not.toThrow()
  })

  it('should require id, title, author_ids, status, created_at, updated_at', () => {
    const minimal = {
      id: 'did:web:bookmanifest.org:series:la-unica-saga',
      title: 'La Única Saga',
      author_ids: ['did:web:bookmanifest.org:author:ray-garcia'],
      status: 'ongoing',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => SeriesSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional description, cover_image, genres', () => {
    const withOptionals = {
      id: 'did:web:bookmanifest.org:series:la-unica-saga',
      title: 'La Única Saga',
      description: 'A science fiction trilogy exploring the nature of reality.',
      author_ids: ['did:web:bookmanifest.org:author:ray-garcia'],
      cover_image: 'https://cdn.bookmanifest.org/covers/series/la-unica-saga.jpg',
      genres: ['science-fiction', 'thriller'],
      status: 'ongoing',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => SeriesSchema.parse(withOptionals)).not.toThrow()
  })

  it('should validate status enum', () => {
    const series = {
      id: 'did:web:bookmanifest.org:series:test',
      title: 'Test Series',
      author_ids: ['did:web:bookmanifest.org:author:test'],
      status: 'completed',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => SeriesSchema.parse(series)).not.toThrow()
    expect(() => SeriesSchema.parse({ ...series, status: 'hiatus' })).not.toThrow()
    expect(() => SeriesSchema.parse({ ...series, status: 'invalid' })).toThrow()
  })
})

import { describe, it, expect } from 'vitest'
import { BookSchema } from '../../zod/entities'
import validBook from '../../examples/entities/book-valid.json'

describe('Book Schema', () => {
  it('should validate a valid book', () => {
    expect(() => BookSchema.parse(validBook)).not.toThrow()
  })

  it('should require id, title, slug, author_ids, language, latest_manifest_id, metadata, created_at, updated_at', () => {
    const minimal = {
      id: 'did:bds:book:test',
      title: 'Test Book',
      slug: 'test-book',
      author_ids: ['did:bds:author:test'],
      language: 'en',
      latest_manifest_id: 'did:bds:manifest:test123',
      metadata: {
        description: 'A test book',
        genres: ['fiction']
      },
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => BookSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional publisher_id, series_id, series_order, pricing', () => {
    const withOptionals = {
      id: 'did:bds:book:la-unica-verdad',
      title: 'La Única Verdad',
      slug: 'la-unica-verdad',
      author_ids: ['did:bds:author:ray-garcia'],
      publisher_id: 'did:bds:publisher:planeta',
      series_id: 'did:bds:series:la-unica-saga',
      series_order: 1,
      language: 'es',
      latest_manifest_id: 'did:bds:manifest:abc1234',
      metadata: {
        cover_image: 'https://cdn.bds.pub/covers/la-unica-verdad.jpg',
        description: 'When reality breaks, truth becomes the only weapon.',
        genres: ['science-fiction', 'thriller'],
        tags: ['time-travel', 'dystopia'],
        content_warnings: ['violence'],
        isbn: '978-84-1234-567-8'
      },
      pricing: {
        model: 'paid',
        price: 9.99,
        currency: 'EUR'
      },
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-06-20T14:30:00Z'
    }

    expect(() => BookSchema.parse(withOptionals)).not.toThrow()
  })

  it('should validate pricing models', () => {
    const book = {
      id: 'did:bds:book:test',
      title: 'Test',
      slug: 'test',
      author_ids: ['did:bds:author:test'],
      language: 'en',
      latest_manifest_id: 'did:bds:manifest:test',
      metadata: {},
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => BookSchema.parse({ ...book, pricing: { model: 'free' } })).not.toThrow()
    expect(() => BookSchema.parse({ ...book, pricing: { model: 'paid', price: 9.99, currency: 'USD' } })).not.toThrow()
    expect(() => BookSchema.parse({ ...book, pricing: { model: 'pay-what-you-want' } })).not.toThrow()
    expect(() => BookSchema.parse({ ...book, pricing: { model: 'subscription' } })).not.toThrow()
  })
})

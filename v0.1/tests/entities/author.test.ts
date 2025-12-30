import { describe, it, expect } from 'vitest'
import { AuthorSchema } from '../../zod/entities'
import validAuthor from '../../examples/entities/author-valid.json'
import invalidAuthor from '../../examples/entities/author-invalid.json'

describe('Author Schema', () => {
  it('should validate a valid author', () => {
    expect(() => AuthorSchema.parse(validAuthor)).not.toThrow()
  })

  it('should reject invalid author', () => {
    expect(() => AuthorSchema.parse(invalidAuthor)).toThrow()
  })

  it('should require id, handle, name, created_at, updated_at', () => {
    const minimal = {
      id: 'did:web:bookmanifest.org:author:test',
      handle: 'test.bookmanifest.org',
      name: 'Test Author',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => AuthorSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional bio, avatar, links', () => {
    const withOptionals = {
      id: 'did:web:bookmanifest.org:author:test',
      handle: 'test.bookmanifest.org',
      name: 'Test Author',
      bio: 'A test bio',
      avatar: 'https://example.com/avatar.jpg',
      links: [
        { type: 'website', url: 'https://example.com' }
      ],
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => AuthorSchema.parse(withOptionals)).not.toThrow()
  })
})

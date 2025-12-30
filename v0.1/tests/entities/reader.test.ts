import { describe, it, expect } from 'vitest'
import { ReaderSchema } from '../../zod/entities'
import validReader from '../../examples/entities/reader-valid.json'

describe('Reader Schema', () => {
  it('should validate a valid reader', () => {
    expect(() => ReaderSchema.parse(validReader)).not.toThrow()
  })

  it('should require id, created_at, updated_at', () => {
    const minimal = {
      id: 'did:web:bookmanifest.org:reader:test',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => ReaderSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional handle, display_name, avatar, preferences', () => {
    const withOptionals = {
      id: 'did:web:bookmanifest.org:reader:jorge',
      handle: 'jorge.bookmanifest.org',
      display_name: 'Jorge',
      avatar: 'https://cdn.bookmanifest.org/avatars/jorge.jpg',
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z',
      preferences: {
        theme: 'dark',
        font_size: 'medium',
        font_family: 'serif',
        line_height: 'relaxed'
      }
    }

    expect(() => ReaderSchema.parse(withOptionals)).not.toThrow()
  })
})

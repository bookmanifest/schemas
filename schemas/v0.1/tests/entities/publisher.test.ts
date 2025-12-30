import { describe, it, expect } from 'vitest'
import { PublisherSchema } from '../../zod/entities'
import validPublisher from '../../examples/entities/publisher-valid.json'

describe('Publisher Schema', () => {
  it('should validate a valid publisher', () => {
    expect(() => PublisherSchema.parse(validPublisher)).not.toThrow()
  })

  it('should require id, handle, name, created_at, updated_at', () => {
    const minimal = {
      id: 'did:bds:publisher:planeta',
      handle: 'planeta.bds.pub',
      name: 'Editorial Planeta',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => PublisherSchema.parse(minimal)).not.toThrow()
  })

  it('should allow optional logo and website', () => {
    const withOptionals = {
      id: 'did:bds:publisher:planeta',
      handle: 'planeta.bds.pub',
      name: 'Editorial Planeta',
      logo: 'https://cdn.bds.pub/logos/planeta.png',
      website: 'https://planeta.es',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }

    expect(() => PublisherSchema.parse(withOptionals)).not.toThrow()
  })
})

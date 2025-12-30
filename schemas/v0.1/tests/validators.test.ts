import { describe, it, expect } from 'vitest'
import { didSchema, semverSchema } from '../zod/validators'

describe('DID Validator', () => {
  it('should validate valid BDS DIDs', () => {
    const valid = [
      'did:bds:author:ray-garcia',
      'did:bds:book:la-unica-verdad',
      'did:bds:manifest:abc1234',
      'did:bds:chapter:ch4:1.1.0',
    ]

    valid.forEach(did => {
      expect(() => didSchema.parse(did)).not.toThrow()
    })
  })

  it('should reject invalid DIDs', () => {
    const invalid = [
      'not-a-did',
      'did:web:example.com',
      'did:bds:',
      'did:bds:invalid type:foo',
    ]

    invalid.forEach(did => {
      expect(() => didSchema.parse(did)).toThrow()
    })
  })
})

describe('SemVer Validator', () => {
  it('should validate valid semver strings', () => {
    const valid = ['1.0.0', '1.1.0', '2.0.0', '1.0.1']

    valid.forEach(version => {
      expect(() => semverSchema.parse(version)).not.toThrow()
    })
  })

  it('should reject invalid semver strings', () => {
    const invalid = ['1.0', 'v1.0.0', '1.0.0-beta', 'latest']

    invalid.forEach(version => {
      expect(() => semverSchema.parse(version)).toThrow()
    })
  })
})

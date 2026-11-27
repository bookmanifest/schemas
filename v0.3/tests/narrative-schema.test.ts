import { describe, it, expect } from 'vitest'
import { globSync } from 'glob'
import { loadAjv, V03, readJson } from './ajv'
import { NarrativeLayerSchema } from '../zod/narrative'

const ajv = loadAjv()
const validate = ajv.getSchema(`${V03}/narrative/narrative-layer.json`)!

describe('narrative layer schema (draft v0.3)', () => {
  it('every v0.3 schema compiles under draft 2020-12', () => {
    for (const file of globSync('./v0.3/json-schema/**/*.json')) {
      const schema = readJson(file)
      expect(ajv.getSchema(schema.$id), file).toBeTypeOf('function')
    }
  })

  for (const file of ['./v0.3/examples/narrative/narrative-layer-valid.json', './v0.3/examples/narrative/narrative-layer-public.json']) {
    it(`accepts ${file} in JSON Schema and Zod`, () => {
      const data = readJson(file)
      const ok = validate(data)
      expect(ok, JSON.stringify(validate.errors, null, 2)).toBe(true)
      const parsed = NarrativeLayerSchema.safeParse(data)
      expect(parsed.success, JSON.stringify(parsed.error?.issues, null, 2)).toBe(true)
    })
  }

  const invalid = globSync('./v0.3/examples/narrative/*-invalid.json').sort()
  it('has invalid examples', () => expect(invalid.length).toBeGreaterThanOrEqual(8))
  for (const file of invalid) {
    it(`rejects ${file} in JSON Schema and Zod`, () => {
      const data = readJson(file)
      expect(validate(data)).toBe(false)
      expect(NarrativeLayerSchema.safeParse(data).success).toBe(false)
    })
  }

  it('visibility fails closed: an item without visibility is author-private', () => {
    const schema = readJson('./v0.3/json-schema/narrative/common.json')
    expect(schema.$defs.visibility.default).toBe('author')
  })

  it('a finding can never be public', () => {
    const schema = readJson('./v0.3/json-schema/narrative/finding.json')
    expect(schema.properties.visibility).toEqual({ const: 'author' })
  })

  it('allows a pause (zero duration) and an explicit unknown duration', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
    const scene = layer.scenes[1]
    scene.duration = { unit: 'minute', value: 0, basis: 'asserted', evidence: [scene.start] }
    expect(validate(layer)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(layer).success).toBe(true)
    scene.duration = { unknown: true, basis: 'asserted', evidence: [scene.start] }
    expect(validate(layer)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(layer).success).toBe(true)
  })

  it('allows knowledge held before the text begins', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
    layer.knowledge[0].since = 'before_text'
    expect(validate(layer)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(layer).success).toBe(true)
  })

  it('a layer with no pieces at all is valid (every piece is optional)', () => {
    const { narrative_layer, book_id, manifest_id, manifest_version, language } = readJson(
      './v0.3/examples/narrative/narrative-layer-valid.json'
    )
    const bare = { narrative_layer, book_id, manifest_id, manifest_version, language }
    expect(validate(bare)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(bare).success).toBe(true)
  })
})

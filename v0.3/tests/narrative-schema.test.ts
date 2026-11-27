import { describe, it, expect } from 'vitest'
import { globSync } from 'glob'
import { loadAjv, V03, readJson } from './ajv'
import { NarrativeLayerSchema } from '../zod/narrative'

const ajv = loadAjv()
const validate = ajv.getSchema(`${V03}/narrative/narrative-layer.json`)!

describe('narrative layer schema (v0.3)', () => {
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

  // `*-semantic-invalid.json` pass the schema and fail the semantic rules (narrative-semantics.test.ts).
  const invalid = globSync('./v0.3/examples/narrative/*-invalid.json')
    .filter((f) => !f.endsWith('-semantic-invalid.json'))
    .sort()
  it('has invalid examples', () => expect(invalid.length).toBeGreaterThanOrEqual(12))
  for (const file of globSync('./v0.3/examples/narrative/*-semantic-invalid.json').sort()) {
    it(`accepts ${file} in JSON Schema and Zod (it fails only the semantic rules)`, () => {
      const data = readJson(file)
      expect(validate(data), JSON.stringify(validate.errors, null, 2)).toBe(true)
      expect(NarrativeLayerSchema.safeParse(data).success).toBe(true)
    })
  }
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

describe('setting spans (v0.3)', () => {
  const base = { id: 'st-001', start: 'capitulo-08#p-001', basis: 'asserted', evidence: ['capitulo-08#p-001'], visibility: 'public' }
  const withSpan = (span: Record<string, unknown>) => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
    layer.setting = [{ ...base, ...span }]
    return layer
  }
  const withSceneSetting = (setting: Record<string, unknown>) => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
    layer.scenes[2].setting = { basis: 'asserted', evidence: ['capitulo-08#p-001'], ...setting }
    return layer
  }
  const keywords = () => (validate.errors ?? []).map((e) => e.keyword)

  const accepted: Array<[string, Record<string, unknown>]> = [
    ['one slot only', { mode: 'dialogue' }],
    ['no_place, which is a value and not an absence', { enclosure: 'no_place', mode: 'summary' }],
    ['an embedded plane with its level', { plane: 'embedded', plane_level: 2, voice: 'character_telling' }],
    ['a vehicle with enclosure vehicle', { enclosure: 'vehicle', vehicle: 'el coche de la señora vizcaína', surroundings: 'nature' }],
    ['surroundings with exterior', { enclosure: 'exterior', surroundings: 'city' }],
    ['every slot at once', {
      end: 'capitulo-08#p-003', enclosure: 'exterior', place: 'e:campo-de-los-molinos', surroundings: 'nature', time_of_day: 'morning',
      season: 'summer', date_or_reference: 'aquel día', plane: 'main', voice: 'outside_narrator', mode: 'scene',
      weather: ['wind', 'heat'], light: 'moon', company: 'two', animals: true
    }],
    ['animals: false counts as a slot', { animals: false }]
  ]
  for (const [name, span] of accepted) {
    it(`accepts a span with ${name}`, () => {
      const layer = withSpan(span)
      expect(validate(layer), JSON.stringify(validate.errors, null, 2)).toBe(true)
      expect(NarrativeLayerSchema.safeParse(layer).success).toBe(true)
    })
  }

  const rejected: Array<[string, Record<string, unknown>, string]> = [
    ['no slot at all', {}, 'anyOf'],
    ['only plane_level, which does not count as a slot', { plane_level: 1 }, 'not'],
    ['an embedded plane without its level', { plane: 'embedded' }, 'required'],
    ['a plane_level on the main plane', { plane: 'main', plane_level: 1 }, 'not'],
    ['a plane_level of 0', { plane: 'embedded', plane_level: 0 }, 'minimum'],
    ['a vehicle on an exterior span', { enclosure: 'exterior', vehicle: 'un coche' }, 'const'],
    ['a vehicle without enclosure', { vehicle: 'un coche' }, 'required'],
    ['surroundings on an interior span', { enclosure: 'interior', surroundings: 'city' }, 'enum'],
    ['surroundings without enclosure', { surroundings: 'water' }, 'required'],
    ['surroundings on no_place', { enclosure: 'no_place', surroundings: 'nature' }, 'enum'],
    ['an empty weather list', { weather: [] }, 'minItems'],
    ['the same weather twice', { weather: ['rain', 'rain'] }, 'uniqueItems'],
    ['an unknown weather', { weather: ['fog'] }, 'enum'],
    ['an empty date_or_reference', { date_or_reference: '' }, 'minLength'],
    ['an unknown voice', { voice: 'narrator' }, 'enum'],
    ['an unknown field', { mode: 'scene', emotion: 'fear' }, 'unevaluatedProperties'],
    ['a bad id', { id: 'set-001', mode: 'scene' }, 'pattern'],
    ['an inferred span without a quote', { mode: 'scene', basis: 'inferred' }, 'required']
  ]
  for (const [name, span, keyword] of rejected) {
    it(`rejects a span with ${name} (${keyword}) in JSON Schema and Zod`, () => {
      const layer = withSpan(span)
      expect(validate(layer)).toBe(false)
      expect(keywords()).toContain(keyword)
      expect(NarrativeLayerSchema.safeParse(layer).success).toBe(false)
    })
  }

  it('a scene setting has the same rules, and no id, start, end or visibility', () => {
    const ok = withSceneSetting({ enclosure: 'exterior', surroundings: 'nature', company: 'two' })
    expect(validate(ok), JSON.stringify(validate.errors, null, 2)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(ok).success).toBe(true)
    for (const bad of [
      {},
      { enclosure: 'interior', surroundings: 'nature' },
      { plane: 'embedded' },
      { mode: 'scene', id: 'st-009' },
      { mode: 'scene', start: 'capitulo-08#p-001' },
      { mode: 'scene', visibility: 'public' },
      { mode: 'scene', basis: 'inferred' }
    ]) {
      const layer = withSceneSetting(bad)
      expect(validate(layer), JSON.stringify(bad)).toBe(false)
      expect(NarrativeLayerSchema.safeParse(layer).success, JSON.stringify(bad)).toBe(false)
    }
  })

  it('each setting invalid example fails for its own rule', () => {
    const expected: Record<string, string> = {
      'narrative-layer-setting-embedded-without-level-invalid.json': 'required',
      'narrative-layer-setting-interior-with-surroundings-invalid.json': 'enum',
      'narrative-layer-setting-no-slot-invalid.json': 'anyOf'
    }
    for (const [file, keyword] of Object.entries(expected)) {
      expect(validate(readJson(`./v0.3/examples/narrative/${file}`)), file).toBe(false)
      expect(keywords(), file).toContain(keyword)
    }
  })

  it('a finding may refer to a setting span', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
    layer.findings[0].refs = ['st-001']
    expect(validate(layer), JSON.stringify(validate.errors, null, 2)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(layer).success).toBe(true)
  })
})

describe('verified_by on the support (v0.3)', () => {
  const layer = () => readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
  const keywords = () => (validate.errors ?? []).map((e) => e.keyword)
  // Every kind of support: top-level items and the nested supports of a scene.
  const supports: Array<[string, (l: any) => any]> = [
    ['a scene', (l) => l.scenes[0]],
    ["a scene's time", (l) => l.scenes[0].time],
    ["a scene's duration", (l) => l.scenes[1].duration],
    ["a scene's setting", (l) => l.scenes[2].setting],
    ['a focalization span', (l) => l.focalization[0]],
    ['a setting span', (l) => l.setting[0]],
    ['a truth', (l) => l.truths[0]],
    ['a knowledge link', (l) => l.knowledge[0]],
    ['a story event', (l) => l.events[0]],
    ['a coreference', (l) => l.coreference[0]]
  ]

  for (const [name, at] of supports) {
    it(`${name} accepts verified_by with status verified`, () => {
      for (const who of [['producer'], ['author'], ['producer', 'author']]) {
        const l = layer()
        Object.assign(at(l), { status: 'verified', verified_by: who })
        expect(validate(l), JSON.stringify(validate.errors, null, 2)).toBe(true)
        expect(NarrativeLayerSchema.safeParse(l).success).toBe(true)
      }
    })

    it(`${name} rejects verified_by without status verified, in JSON Schema and Zod`, () => {
      for (const status of ['doubtful', 'review', undefined]) {
        const l = layer()
        const item = at(l)
        item.verified_by = ['author']
        if (status === undefined) delete item.status
        else item.status = status
        expect(validate(l), String(status)).toBe(false)
        expect(keywords(), String(status)).toContain('not')
        expect(NarrativeLayerSchema.safeParse(l).success, String(status)).toBe(false)
      }
    })
  }

  const malformed: Array<[string, unknown, string]> = [
    ['an empty list', [], 'minItems'],
    ['the same source twice', ['producer', 'producer'], 'uniqueItems'],
    ['an unknown source', ['reader'], 'enum'],
    ['a string instead of a list', 'producer', 'type']
  ]
  for (const [name, value, keyword] of malformed) {
    it(`rejects verified_by with ${name} (${keyword}) in JSON Schema and Zod`, () => {
      const l = layer()
      l.scenes[0].verified_by = value
      expect(validate(l)).toBe(false)
      expect(keywords()).toContain(keyword)
      expect(NarrativeLayerSchema.safeParse(l).success).toBe(false)
    })
  }

  it('the invalid example fails only because its status is doubtful', () => {
    const l = readJson('./v0.3/examples/narrative/narrative-layer-verified-by-doubtful-invalid.json')
    expect(validate(l)).toBe(false)
    expect(keywords()).toContain('not')
    l.scenes[0].status = 'verified'
    expect(validate(l), JSON.stringify(validate.errors, null, 2)).toBe(true)
    expect(NarrativeLayerSchema.safeParse(l).success).toBe(true)
  })
})

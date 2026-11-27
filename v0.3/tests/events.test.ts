import { describe, it, expect } from 'vitest'
import { globSync } from 'glob'
import { loadAjv, V03, readJson } from './ajv'
import { EventBatchV03Schema } from '../zod/events'
import { EventBatchSchema } from '../../v0.1/zod/events'

const ajv = loadAjv()
const validateBatch = ajv.getSchema(`${V03}/events/batch.json`)!
const NEW_EVENTS = ['reread', 'shared-entry', 'companion-open', 'recap-view', 'spoiler-warning']

describe('reading events (v0.3)', () => {
  it('the example batch is valid in JSON Schema and Zod, and has every new type', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    expect(validateBatch(batch), JSON.stringify(validateBatch.errors, null, 2)).toBe(true)
    const parsed = EventBatchV03Schema.safeParse(batch)
    expect(parsed.success, JSON.stringify(parsed.error?.issues, null, 2)).toBe(true)
    const types = new Set(batch.events.map((e: { type: string }) => e.type))
    for (const t of ['reread', 'shared_entry', 'companion_open', 'recap_view', 'spoiler_warning']) expect(types).toContain(t)
  })

  it('v0.1 batches stay valid under v0.3', () => {
    const batch = readJson('./v0.1/examples/events/batch-valid.json')
    expect(validateBatch(batch), JSON.stringify(validateBatch.errors, null, 2)).toBe(true)
    expect(EventBatchV03Schema.safeParse(batch).success).toBe(true)
  })

  it('a v0.1 consumer rejects the new types instead of misreading them', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    expect(EventBatchSchema.safeParse(batch).success).toBe(false)
  })

  const invalid = globSync('./v0.3/examples/events/*-invalid.json').sort()
  for (const file of invalid) {
    it(`rejects ${file} in JSON Schema and Zod`, () => {
      const batch = readJson(file)
      expect(validateBatch(batch)).toBe(false)
      expect(EventBatchV03Schema.safeParse(batch).success).toBe(false)
    })
  }

  it('shared_entry cannot be linked to a reader: no reader_id, no session_id', () => {
    const schema = readJson('./v0.3/json-schema/events/shared-entry.json')
    expect(schema.allOf[0].$ref).toBe('./envelope-anonymous.json')
    const envelope = readJson('./v0.3/json-schema/events/envelope-anonymous.json')
    expect(envelope.additionalProperties).toBe(false)
    expect(envelope.properties.session_id).toBeUndefined()
    expect(envelope.properties.context.additionalProperties).toBe(false)
    expect(envelope.properties.context.properties.reader_id).toBeUndefined()
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    for (const event of batch.events.filter((e: { type: string }) => e.type === 'shared_entry')) {
      expect(event.session_id).toBeUndefined()
      expect(event.context.reader_id).toBeUndefined()
    }
  })

  // Privacy by construction: a new payload is closed and has no free-form string, so it cannot carry text,
  // names, URLs, referrers or anything else that was not designed in.
  for (const name of NEW_EVENTS) {
    it(`${name}: payload is closed and has no free-form string or exact duration`, () => {
      const schema = readJson(`./v0.3/json-schema/events/${name}.json`)
      const payload = schema.allOf[1].properties.payload
      expect(payload.additionalProperties).toBe(false)
      for (const [field, def] of Object.entries<Record<string, unknown>>(payload.properties)) {
        const constrained = 'enum' in def || 'const' in def || 'pattern' in def || '$ref' in def
        expect(constrained, `${name}.${field} must be an enum, a pattern, a const or a validator`).toBe(true)
        expect(field).not.toMatch(/seconds|text|name|url|referrer|query|annotation/)
      }
    })
  }
})

import { describe, it, expect } from 'vitest'
import { globSync } from 'glob'
import { loadAjv, V03, readJson } from './ajv'
import { EventBatchSchema } from '../zod/events'

const ajv = loadAjv()
const validateBatch = ajv.getSchema(`${V03}/events/batch.json`)!
const NEW_EVENTS = ['reread', 'shared-entry', 'companion-open', 'recap-view', 'spoiler-warning', 'access-gate']

describe('reading events', () => {
  it('the example batch is valid in JSON Schema and Zod, and has every new type', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    expect(validateBatch(batch), JSON.stringify(validateBatch.errors, null, 2)).toBe(true)
    const parsed = EventBatchSchema.safeParse(batch)
    expect(parsed.success, JSON.stringify(parsed.error?.issues, null, 2)).toBe(true)
    const types = new Set(batch.events.map((e: { type: string }) => e.type))
    for (const t of ['reread', 'shared_entry', 'companion_open', 'recap_view', 'spoiler_warning', 'access_gate']) expect(types).toContain(t)
  })

  it('the example batch also has every session event type', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    const types = new Set(batch.events.map((e: { type: string }) => e.type))
    for (const t of ['heartbeat', 'chapter_transition', 'book_lifecycle', 'interaction', 'app_lifecycle']) expect(types).toContain(t)
  })

  it('a heartbeat may say the paragraphs it showed and their words, and nothing more', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    const paged = batch.events.find((e: { type: string; payload: { visible?: unknown } }) => e.type === 'heartbeat' && e.payload.visible !== undefined)
    expect(paged.payload.visible).toEqual([{ node_id: 'p-014', words: 38 }, { node_id: 'p-015', words: 121 }, { node_id: 'p-016', words: 64 }])
    const withVisible = (visible: unknown) => ({ events: [{ ...paged, payload: { ...paged.payload, visible } }] })
    for (const visible of [[], [{ node_id: 'p-014' }], [{ node_id: 'p-014', words: -1 }], [{ node_id: 'p-014', words: 1.5 }], [{ node_id: 'chapter', words: 3 }], [{ node_id: 'p-014', words: 3, text: 'x' }]]) {
      expect(validateBatch(withVisible(visible)), JSON.stringify(visible)).toBe(false)
      expect(EventBatchSchema.safeParse(withVisible(visible)).success, JSON.stringify(visible)).toBe(false)
    }
    const { visible: _visible, ...withoutVisible } = paged.payload
    expect(validateBatch({ events: [{ ...paged, payload: withoutVisible }] })).toBe(true)
  })

  it('an interaction may say the part of the paragraph it acted on, as positions and nothing more', () => {
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    const shared = batch.events.find((e: { type: string; payload: { fragment?: unknown } }) => e.type === 'interaction' && e.payload.fragment !== undefined)
    expect(shared.payload.fragment).toEqual({ start: 42, end: 78 })
    const withFragment = (fragment: unknown) => ({ events: [{ ...shared, payload: { ...shared.payload, fragment } }] })
    for (const fragment of [{}, { start: 42 }, { end: 78 }, { start: -1, end: 4 }, { start: 1.5, end: 4 }, { start: 0, end: 1000001 }, { start: 42, end: 78, exact: 'x' }, { start: 42, end: 78, prefix: 'x' }, 'x', 42, null]) {
      expect(validateBatch(withFragment(fragment)), JSON.stringify(fragment)).toBe(false)
      expect(EventBatchSchema.safeParse(withFragment(fragment)).success, JSON.stringify(fragment)).toBe(false)
    }
    const { fragment: _fragment, ...whole } = shared.payload
    expect(validateBatch({ events: [{ ...shared, payload: whole }] })).toBe(true)
  })

  const invalid = globSync('./v0.3/examples/events/*-invalid.json').sort()
  for (const file of invalid) {
    it(`rejects ${file} in JSON Schema and Zod`, () => {
      const batch = readJson(file)
      expect(validateBatch(batch)).toBe(false)
      expect(EventBatchSchema.safeParse(batch).success).toBe(false)
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

  it('access_gate uses the identified envelope and takes unlocks_at only with the wait gate', () => {
    const schema = readJson('./v0.3/json-schema/events/access-gate.json')
    expect(schema.allOf[0].$ref).toBe('./envelope.json')
    const batch = readJson('./v0.3/examples/events/batch-valid.json')
    const gates = batch.events.filter((e: { type: string }) => e.type === 'access_gate')
    expect(gates.map((e: { payload: { gate: string } }) => e.payload.gate)).toEqual(['purchase', 'wait'])
    for (const event of gates) expect(event.session_id).toBeDefined()
    const withUnlock = (gate: string) => ({ events: [{ ...gates[1], payload: { gate, signed_in: true, unlocks_at: '2026-12-01T09:12:00Z' } }] })
    for (const gate of ['purchase', 'subscription']) {
      expect(validateBatch(withUnlock(gate))).toBe(false)
      expect(EventBatchSchema.safeParse(withUnlock(gate)).success).toBe(false)
    }
    expect(validateBatch(withUnlock('wait'))).toBe(true)
    expect(EventBatchSchema.safeParse(withUnlock('wait')).success).toBe(true)
    const subscription = { events: [{ ...gates[0], payload: { gate: 'subscription', signed_in: true } }] }
    expect(validateBatch(subscription)).toBe(true)
    expect(EventBatchSchema.safeParse(subscription).success).toBe(true)
  })

  // Privacy by construction: a new payload is closed and has no free-form string, so it cannot carry text,
  // names, URLs, referrers or anything else that was not designed in.
  for (const name of NEW_EVENTS) {
    it(`${name}: payload is closed and has no free-form string or exact duration`, () => {
      const schema = readJson(`./v0.3/json-schema/events/${name}.json`)
      const payload = schema.allOf[1].properties.payload
      expect(payload.additionalProperties).toBe(false)
      for (const [field, def] of Object.entries<Record<string, unknown>>(payload.properties)) {
        const constrained = 'enum' in def || 'const' in def || 'pattern' in def || '$ref' in def || def.type === 'boolean'
        expect(constrained, `${name}.${field} must be an enum, a pattern, a const, a boolean or a validator`).toBe(true)
        expect(field).not.toMatch(/seconds|text|name|url|referrer|query|annotation/)
      }
    })
  }
})

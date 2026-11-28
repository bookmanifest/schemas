import { describe, it, expect } from 'vitest'
import { readJson } from './ajv'
import {
  validateNarrativeLayer,
  publicProjection,
  spoilerSafeCut,
  compareAddresses,
  type ReadingOrder
} from '../narrative/semantics'
import type { NarrativeLayer } from '../zod/narrative'

const fixture = readJson('./v0.3/examples/fixtures/quijote-i-1-20.addresses.json')
const order: ReadingOrder = {
  chapters: fixture.chapters.map((c: { slug: string }) => c.slug),
  paragraphs: Object.fromEntries(fixture.chapters.map((c: { slug: string; paragraphs: number }) => [c.slug, c.paragraphs]))
}
const fresh = (): NarrativeLayer => readJson('./v0.3/examples/narrative/narrative-layer-valid.json')
const codes = (layer: NarrativeLayer) => validateNarrativeLayer(layer, order).map((i) => i.code)
// An `until` for don Quijote's belief in the giants (k-005), for tests only: the example carries none.
type Until = NonNullable<NarrativeLayer['knowledge']>[number]['until']
const until = (over: Partial<NonNullable<Until>> = {}): Until => ({
  at: 'capitulo-08#p-011',
  revealed_at: 'capitulo-08#p-013',
  basis: 'inferred',
  evidence: ['capitulo-08#p-013', 'capitulo-08#p-021'],
  quote: 'ha vuelto estos gigantes en molinos',
  status: 'verified',
  ...over
})

// Anachronies for tests only: the example carries none (no fixture paragraph clearly jumps in story time).
type Anachrony = NonNullable<NarrativeLayer['anachronies']>[number]
const anachrony = (over: Partial<Anachrony> = {}): Anachrony => ({
  id: 'an-001',
  start: 'capitulo-07#p-012',
  end: 'capitulo-07#p-013',
  kind: 'analepsis',
  reach: 'una noche, después del día que vuestra merced de aquí se partió',
  basis: 'inferred',
  evidence: ['capitulo-07#p-012', 'capitulo-07#p-013'],
  quote: 'vino sobre una nube una noche',
  status: 'verified',
  visibility: 'public',
  ...over
})
const withAnachronies = (...spans: Anachrony[]): NarrativeLayer => ({ ...fresh(), anachronies: spans })

describe('address order', () => {
  it('orders within a chapter by paragraph number and across chapters by manifest order', () => {
    expect(compareAddresses('capitulo-08#p-002', 'capitulo-08#p-010')).toBeLessThan(0)
    expect(compareAddresses('capitulo-09#p-001', 'capitulo-08#p-050', order)).toBeGreaterThan(0)
    expect(compareAddresses('capitulo-09#p-001', 'capitulo-08#p-050')).toBeNull()
  })
})

describe('semantic validation (v0.3)', () => {
  it('the Quijote example has no issues', () => {
    expect(validateNarrativeLayer(fresh(), order)).toEqual([])
  })

  it('without a reading order, cross-chapter checks are skipped, not guessed', () => {
    expect(validateNarrativeLayer(fresh())).toEqual([])
  })

  const cases: Array<[string, (l: NarrativeLayer) => void, string]> = [
    ['duplicate ids', (l) => (l.truths![1].id = 't-001'), 'duplicate_id'],
    ['unknown entity in a cast', (l) => l.scenes![0].cast!.push('e:rocinante'), 'unknown_reference'],
    ['a character used as a place', (l) => (l.scenes![0].place = 'e:ama'), 'wrong_entity_kind'],
    ['an address past the end of the chapter', (l) => (l.scenes![0].end = 'capitulo-07#p-099'), 'unknown_address'],
    ['an address in a chapter the manifest lacks', (l) => (l.truths![0].evidence = ['capitulo-99#p-001']), 'unknown_address'],
    ['a scene that ends before it starts', (l) => (l.scenes![2].end = 'capitulo-07#p-030'), 'range_reversed'],
    ['overlapping scenes', (l) => (l.scenes![1].start = 'capitulo-07#p-019'), 'overlap'],
    ['overlapping focalization spans', (l) => (l.focalization![0].end = 'capitulo-02#p-021'), 'overlap'],
    ['a truth revealed before its evidence', (l) => (l.truths![1].revealed_at = 'capitulo-07#p-031'), 'revealed_before_evidence'],
    ['a knowledge link revealed before its evidence', (l) => (l.knowledge![3].revealed_at = 'capitulo-08#p-004'), 'revealed_before_evidence'],
    ['a clue after the reveal', (l) => l.truths![2].clues!.push('capitulo-09#p-010'), 'clue_after_reveal'],
    ['a pickup before the kernel', (l) => l.events![0].picked_up_at!.push('capitulo-07#p-001'), 'pickup_not_later'],
    ['a scene continuing a later scene', (l) => (l.scenes![4].continues = 's-007'), 'continues_not_earlier'],
    ['a public knowledge link on a private truth', (l) => (l.truths![0].visibility = 'author'), 'public_references_private'],
    ['a public scene casting a private entity', (l) => delete l.entities![1].visibility, 'public_references_private'],
    ['a duration range whose min exceeds its max', (l) => Object.assign(l.scenes![2].duration!, { min: 40 }), 'range_reversed'],
    ['the same paragraph listed twice as a telling', (l) => l.coreference![0].tellings.push({ at: 'capitulo-09#p-001' }), 'duplicate_telling'],
    ['overlapping setting spans', (l) => (l.setting![2].end = 'capitulo-07#p-012'), 'overlap'],
    ['a setting span that ends before it starts', (l) => (l.setting![3].end = 'capitulo-07#p-011'), 'range_reversed'],
    ['a setting span in a place that is a character', (l) => (l.setting![0].place = 'e:ventero'), 'wrong_entity_kind'],
    ['a setting span in an unknown place', (l) => (l.setting![0].place = 'e:toboso'), 'unknown_reference'],
    ['a scene setting in a place that is a character', (l) => (l.scenes![2].setting!.place = 'e:sancho-panza'), 'wrong_entity_kind'],
    ['a setting span past the end of the chapter', (l) => (l.setting![7].end = 'capitulo-09#p-018'), 'unknown_address'],
    ['two setting spans with the same id', (l) => (l.setting![0].id = 'st-002'), 'duplicate_id'],
    ['a public setting span in a private place', (l) => delete l.entities![11].visibility, 'public_references_private'],
    ['a knowledge link that stops before it starts', (l) => (l.knowledge![4].until = until({ at: 'capitulo-08#p-001' })), 'range_reversed'],
    ['a knowledge link that stops where it starts', (l) => (l.knowledge![4].until = until({ at: 'capitulo-08#p-002' })), 'range_reversed'],
    ['a stop revealed before its evidence', (l) => (l.knowledge![4].until = until({ revealed_at: 'capitulo-08#p-012' })), 'revealed_before_evidence'],
    ['a stop past the end of the chapter', (l) => (l.knowledge![4].until = until({ at: 'capitulo-08#p-099' })), 'unknown_address'],
    [
      'a public scene whose setting is in a private place',
      (l) => {
        l.entities!.push({ id: 'e:molino', kind: 'place', name: 'el primero molino', revealed_at: 'capitulo-08#p-011' })
        l.scenes![2].setting!.place = 'e:molino'
      },
      'public_references_private'
    ]
  ]
  for (const [name, mutate, code] of cases) {
    it(`reports ${code}: ${name}`, () => {
      const layer = fresh()
      mutate(layer)
      expect(codes(layer)).toContain(code)
    })
  }
})

describe('setting spans: semantic rules', () => {
  it('the overlapping-spans example passes the schema and fails only for overlap', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-setting-overlap-semantic-invalid.json')
    const issues = validateNarrativeLayer(layer, order)
    expect(issues.map((i) => i.code)).toEqual(['overlap'])
    expect(issues[0].path).toBe('setting[1]')
  })

  it('spans that touch without sharing a paragraph do not overlap, and spans need not cover every paragraph', () => {
    const layer = fresh()
    layer.setting![1].end = 'capitulo-07#p-010'
    layer.setting![2].end = 'capitulo-07#p-011'
    expect(codes(layer)).toEqual([])
  })

  it('a span across a chapter boundary overlaps the next chapter\'s span only with the reading order', () => {
    const layer = fresh()
    layer.setting![5].end = 'capitulo-09#p-001'
    expect(codes(layer)).toContain('overlap')
    expect(validateNarrativeLayer(layer).map((i) => i.code)).not.toContain('overlap')
  })
})

describe('anachronies: semantic rules', () => {
  it('a layer with anachronies that neither overlap nor reverse has no issues', () => {
    const { end: _end, reach: _reach, ...single } = anachrony({ id: 'an-002', start: 'capitulo-08#p-026', kind: 'prolepsis' })
    expect(codes(withAnachronies(anachrony(), single))).toEqual([])
  })

  it('the overlapping-spans example passes the schema and fails only for overlap', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-anachrony-overlap-semantic-invalid.json')
    const issues = validateNarrativeLayer(layer, order)
    expect(issues.map((i) => [i.code, i.path])).toEqual([['overlap', 'anachronies[1]']])
  })

  const cases: Array<[string, NarrativeLayer, string, string]> = [
    ['overlapping spans', withAnachronies(anachrony(), anachrony({ id: 'an-002', start: 'capitulo-07#p-013', end: 'capitulo-07#p-014' })), 'overlap', 'anachronies[1]'],
    ['a span that ends before it starts', withAnachronies(anachrony({ start: 'capitulo-07#p-013', end: 'capitulo-07#p-012' })), 'range_reversed', 'anachronies[0]'],
    ['a span past the end of the chapter', withAnachronies(anachrony({ end: 'capitulo-07#p-099' })), 'unknown_address', 'anachronies[0].end'],
    ['two spans with the same id', withAnachronies(anachrony(), anachrony({ start: 'capitulo-08#p-026', end: 'capitulo-08#p-026' })), 'duplicate_id', 'anachronies[1].id']
  ]
  for (const [name, layer, code, path] of cases) {
    it(`reports ${code}: ${name}`, () => {
      expect(validateNarrativeLayer(layer, order).map((i) => [i.code, i.path])).toContainEqual([code, path])
    })
  }

  it('a span across chapters is compared only with the reading order', () => {
    const layer = withAnachronies(anachrony({ start: 'capitulo-09#p-001', end: 'capitulo-08#p-050' }))
    expect(codes(layer)).toContain('range_reversed')
    expect(validateNarrativeLayer(layer).map((i) => i.code)).not.toContain('range_reversed')
  })

  it('a finding may name an anachrony, and an unknown one does not resolve', () => {
    const layer = withAnachronies(anachrony())
    layer.findings![0].refs = ['an-001']
    expect(codes(layer)).toEqual([])
    layer.findings![0].refs = ['an-002']
    expect(validateNarrativeLayer(layer, order).map((i) => [i.code, i.path])).toEqual([['unknown_reference', 'findings[0].refs[0]']])
  })
})

describe('until on a knowledge link: semantic rules', () => {
  it('a link that stops after it starts has no issues, and since before_text has nothing to compare', () => {
    const layer = fresh()
    layer.knowledge![4].until = until()
    expect(codes(layer)).toEqual([])
    layer.knowledge![4].since = 'before_text'
    layer.knowledge![4].until = until({ at: 'capitulo-01#p-001', revealed_at: 'capitulo-08#p-013' })
    expect(codes(layer)).toEqual([])
  })

  it('reports each rule at the until path', () => {
    const layer = fresh()
    layer.knowledge![4].until = until({ at: 'capitulo-08#p-001', revealed_at: 'capitulo-08#p-012' })
    expect(validateNarrativeLayer(layer, order).map((i) => [i.code, i.path])).toEqual([
      ['revealed_before_evidence', 'knowledge[4].until.revealed_at'],
      ['range_reversed', 'knowledge[4].until.at']
    ])
  })

  it('compares until.at with since across chapters only with the reading order', () => {
    const layer = fresh()
    layer.knowledge![4].until = until({ at: 'capitulo-07#p-019' })
    expect(codes(layer)).toContain('range_reversed')
    expect(validateNarrativeLayer(layer).map((i) => i.code)).not.toContain('range_reversed')
  })

  it('the until-before-since example passes the schema and fails only for range_reversed', () => {
    const layer = readJson('./v0.3/examples/narrative/narrative-layer-knowledge-until-before-since-semantic-invalid.json')
    const issues = validateNarrativeLayer(layer, order)
    expect(issues.map((i) => [i.code, i.path])).toEqual([['range_reversed', 'knowledge[0].until.at']])
  })
})

describe('public projection', () => {
  it('keeps public items only and never findings', () => {
    const projected = publicProjection(fresh())
    expect(projected).toEqual(readJson('./v0.3/examples/narrative/narrative-layer-public.json'))
    expect(projected.findings).toBeUndefined()
    expect(projected.focalization!.map((f) => f.id)).not.toContain('fz-003')
    expect(projected.setting!.map((st) => st.id)).toEqual(['st-001', 'st-002', 'st-003', 'st-004', 'st-005', 'st-006', 'st-008'])
  })

  it('keeps who verified each item', () => {
    const projected = publicProjection(fresh())
    expect(projected.scenes!.find((s) => s.id === 's-001')!.verified_by).toEqual(['producer'])
    expect(projected.knowledge!.find((k) => k.id === 'k-003')!.verified_by).toEqual(['author'])
    const view = spoilerSafeCut(fresh(), 'capitulo-08#p-013', order)
    expect(view.scenes!.find((s) => s.id === 's-001')!.verified_by).toEqual(['producer'])
    expect(view.knowledge!.find((k) => k.id === 'k-003')!.verified_by).toEqual(['author'])
  })

  it('keeps a knowledge link\'s until as it is', () => {
    const layer = fresh()
    layer.knowledge![4].until = until()
    expect(publicProjection(layer).knowledge!.find((k) => k.id === 'k-005')!.until).toEqual(until())
  })

  it('drops the setting piece when no span is public', () => {
    const layer = fresh()
    layer.setting!.forEach((st) => (st.visibility = 'author'))
    expect('setting' in publicProjection(layer)).toBe(false)
  })

  it('keeps public anachronies and drops the piece when none is public', () => {
    const layer = withAnachronies(anachrony(), anachrony({ id: 'an-002', start: 'capitulo-08#p-026', end: 'capitulo-08#p-026', visibility: 'author' }))
    expect(publicProjection(layer).anachronies).toEqual([anachrony()])
    delete layer.anachronies![0].visibility
    expect('anachronies' in publicProjection(layer)).toBe(false)
  })

  it('leaves no dangling reference', () => {
    expect(validateNarrativeLayer(publicProjection(fresh()), order)).toEqual([])
  })
})

describe('spoiler-safe cut', () => {
  it('in chapter 7 before the niece speaks: the walled room is known, the enchanter story is not', () => {
    const view = spoilerSafeCut(fresh(), 'capitulo-07#p-012', order)
    expect(view.truths!.map((t) => t.id)).toEqual(['t-001'])
    expect(view.knowledge!.map((k) => k.id)).toEqual(['k-001', 'k-002'])
    expect(view.entities!.map((e) => e.id)).not.toContain('e:freston')
    expect(view.entities!.map((e) => e.id)).not.toContain('e:sancho-panza')
    expect(view.events?.map((e) => e.id) ?? []).not.toContain('ev-001')
  })

  it('does not call an event a kernel before the book picks it up', () => {
    const before = spoilerSafeCut(fresh(), 'capitulo-08#p-005', order)
    const ev1 = before.events!.find((e) => e.id === 'ev-001')!
    expect(ev1.salience).toBeUndefined()
    expect(ev1.picked_up_at).toBeUndefined()
    const after = spoilerSafeCut(fresh(), 'capitulo-08#p-013', order)
    expect(after.events!.find((e) => e.id === 'ev-001')!.salience).toBe('kernel')
  })

  it('shows a repeated telling only once it has been told twice, and hides aliases not yet revealed', () => {
    expect(spoilerSafeCut(fresh(), 'capitulo-08#p-051', order).coreference).toBeUndefined()
    const view = spoilerSafeCut(fresh(), 'capitulo-09#p-001', order)
    expect(view.coreference![0].tellings.map((t) => t.at)).toEqual(['capitulo-08#p-050', 'capitulo-09#p-001'])
    expect(spoilerSafeCut(fresh(), 'capitulo-04#p-001', order).entities!.find((e) => e.id === 'e:don-quijote')!.aliases).toBeUndefined()
  })

  // The cut must not leak later text through any field: evidence, quotes, pickups, scene ends or durations.
  const positions = [
    'capitulo-02#p-010', 'capitulo-07#p-012', 'capitulo-07#p-014', 'capitulo-08#p-001', 'capitulo-08#p-005',
    'capitulo-08#p-013', 'capitulo-08#p-030', 'capitulo-09#p-001', 'capitulo-09#p-011', 'capitulo-20#p-001'
  ]
  for (const position of positions) {
    it(`at ${position}, no address after the reader's position appears anywhere, and no quote`, () => {
      const json = JSON.stringify(spoilerSafeCut(fresh(), position, order))
      for (const address of json.match(/[a-z0-9-]+#p-[0-9]{3,}/g) ?? []) {
        expect(compareAddresses(address, position, order), `${address} leaks at ${position}`).toBeLessThanOrEqual(0)
      }
      expect(json).not.toContain('"quote"')
      expect(json).not.toContain('"story_order"')
    })
  }

  it('shows a scene\'s end and duration only once the scene is over', () => {
    const during = spoilerSafeCut(fresh(), 'capitulo-08#p-005', order).scenes!.find((s) => s.id === 's-003')!
    expect(during.end).toBeUndefined()
    expect(during.duration).toBeUndefined()
    const after = spoilerSafeCut(fresh(), 'capitulo-08#p-014', order).scenes!.find((s) => s.id === 's-003')!
    expect(after.end).toBe('capitulo-08#p-014')
    expect(after.duration).toMatchObject({ unit: 'minute', min: 5, max: 30 })
  })

  it('shows a setting span from its start and its end only once passed', () => {
    expect(spoilerSafeCut(fresh(), 'capitulo-07#p-011', order).setting!.map((st) => st.id)).toEqual(['st-001', 'st-002', 'st-003'])
    const during = spoilerSafeCut(fresh(), 'capitulo-07#p-012', order).setting!.find((st) => st.id === 'st-004')!
    expect(during).toMatchObject({ start: 'capitulo-07#p-012', mode: 'dialogue', company: 'group', evidence: ['capitulo-07#p-012'] })
    expect(during.end).toBeUndefined()
    expect('quote' in during).toBe(false)
    const after = spoilerSafeCut(fresh(), 'capitulo-07#p-014', order).setting!.find((st) => st.id === 'st-004')!
    expect(after.end).toBe('capitulo-07#p-014')
    expect(after.evidence).toEqual(['capitulo-07#p-012', 'capitulo-07#p-013', 'capitulo-07#p-014'])
  })

  it('shows a setting span\'s place only once the place is shown', () => {
    const layer = fresh()
    layer.entities!.find((e) => e.id === 'e:venta')!.revealed_at = 'capitulo-02#p-011'
    const before = spoilerSafeCut(layer, 'capitulo-02#p-010', order).setting!.find((st) => st.id === 'st-001')!
    expect(before.place).toBeUndefined()
    expect(before.enclosure).toBe('exterior')
    const after = spoilerSafeCut(layer, 'capitulo-02#p-011', order).setting!.find((st) => st.id === 'st-001')!
    expect(after.place).toBe('e:venta')
  })

  it('shows a scene\'s setting with the scene, without its quote, with evidence cut and the place only once shown', () => {
    const during = spoilerSafeCut(fresh(), 'capitulo-08#p-005', order).scenes!.find((s) => s.id === 's-003')!
    expect(during.setting).toEqual({
      enclosure: 'exterior', place: 'e:campo-de-los-molinos', surroundings: 'nature', plane: 'main', voice: 'outside_narrator',
      company: 'two', basis: 'inferred', evidence: ['capitulo-08#p-001'], status: 'verified'
    })
    const layer = fresh()
    layer.entities!.find((e) => e.id === 'e:campo-de-los-molinos')!.revealed_at = 'capitulo-08#p-002'
    const unmet = spoilerSafeCut(layer, 'capitulo-08#p-001', order).scenes!.find((s) => s.id === 's-003')!
    expect(unmet.setting!.place).toBeUndefined()
    expect(unmet.setting!.enclosure).toBe('exterior')
  })

  it('shows a knowledge link\'s until only once both its at and its revealed_at are passed', () => {
    const k5 = (layer: NarrativeLayer, position: string) =>
      spoilerSafeCut(layer, position, order).knowledge!.find((k) => k.id === 'k-005')!
    const layer = fresh()
    layer.knowledge![4].until = until()
    // Before both, and with only `at` passed: the link is shown as before, with no trace of its until.
    for (const position of ['capitulo-08#p-010', 'capitulo-08#p-012']) {
      const shown = k5(layer, position)
      expect(shown.since, position).toBe('capitulo-08#p-002')
      expect('until' in shown, position).toBe(false)
      expect(JSON.stringify(shown), position).not.toContain('capitulo-08#p-011')
    }
    // After both: the until, without its quote and with evidence cut to what the reader has passed.
    expect(k5(layer, 'capitulo-08#p-013').until).toEqual({
      at: 'capitulo-08#p-011', revealed_at: 'capitulo-08#p-013', basis: 'inferred', evidence: ['capitulo-08#p-013'], status: 'verified'
    })
    expect(k5(layer, 'capitulo-08#p-021').until!.evidence).toEqual(['capitulo-08#p-013', 'capitulo-08#p-021'])
    // With only `revealed_at` passed (the stop is announced before it happens), still hidden.
    const early = fresh()
    early.knowledge![4].until = until({ at: 'capitulo-08#p-021', revealed_at: 'capitulo-08#p-013', evidence: ['capitulo-08#p-013'] })
    expect('until' in k5(early, 'capitulo-08#p-014')).toBe(false)
    expect(k5(early, 'capitulo-08#p-021').until!.at).toBe('capitulo-08#p-021')
  })

  it('shows an anachrony from its start, with its reach, and its end only once passed', () => {
    const layer = withAnachronies(anachrony())
    expect(spoilerSafeCut(layer, 'capitulo-07#p-011', order).anachronies).toBeUndefined()
    expect(spoilerSafeCut(layer, 'capitulo-07#p-012', order).anachronies).toEqual([{
      id: 'an-001', start: 'capitulo-07#p-012', kind: 'analepsis', reach: 'una noche, después del día que vuestra merced de aquí se partió',
      basis: 'inferred', evidence: ['capitulo-07#p-012'], status: 'verified', visibility: 'public'
    }])
    const after = spoilerSafeCut(layer, 'capitulo-07#p-013', order).anachronies![0]
    expect(after.end).toBe('capitulo-07#p-013')
    expect(after.evidence).toEqual(['capitulo-07#p-012', 'capitulo-07#p-013'])
    expect('quote' in after).toBe(false)
  })

  it('shows a prolepsis like an analepsis: no gate beyond its start', () => {
    const layer = withAnachronies(anachrony({ kind: 'prolepsis' }))
    expect(spoilerSafeCut(layer, 'capitulo-07#p-012', order).anachronies!.map((an) => an.kind)).toEqual(['prolepsis'])
  })

  for (const position of ['capitulo-07#p-011', 'capitulo-07#p-012', 'capitulo-07#p-013', 'capitulo-20#p-001']) {
    it(`with anachronies, at ${position} no address after the reader's position appears anywhere, and no quote`, () => {
      const layer = withAnachronies(anachrony())
      const json = JSON.stringify(spoilerSafeCut(layer, position, order))
      for (const address of json.match(/[a-z0-9-]+#p-[0-9]{3,}/g) ?? []) {
        expect(compareAddresses(address, position, order), `${address} leaks at ${position}`).toBeLessThanOrEqual(0)
      }
      expect(json).not.toContain('"quote"')
    })
  }

  it('never shows a private anachrony', () => {
    const layer = withAnachronies(anachrony({ visibility: 'author' }))
    expect('anachronies' in spoilerSafeCut(layer, 'capitulo-20#p-001', order)).toBe(false)
  })

  it('never contains author-private items', () => {
    const view = spoilerSafeCut(fresh(), 'capitulo-20#p-001', order)
    expect(JSON.stringify(view)).not.toContain('fz-003')
    expect(JSON.stringify(view)).not.toContain('st-007')
    expect('findings' in view).toBe(false)
  })
})

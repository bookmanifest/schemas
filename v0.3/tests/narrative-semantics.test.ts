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
    ['the same paragraph listed twice as a telling', (l) => l.coreference![0].tellings.push({ at: 'capitulo-09#p-001' }), 'duplicate_telling']
  ]
  for (const [name, mutate, code] of cases) {
    it(`reports ${code}: ${name}`, () => {
      const layer = fresh()
      mutate(layer)
      expect(codes(layer)).toContain(code)
    })
  }
})

describe('public projection', () => {
  it('keeps public items only and never findings', () => {
    const projected = publicProjection(fresh())
    expect(projected).toEqual(readJson('./v0.3/examples/narrative/narrative-layer-public.json'))
    expect(projected.findings).toBeUndefined()
    expect(projected.focalization!.map((f) => f.id)).not.toContain('fz-003')
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

  it('never contains author-private items', () => {
    const view = spoilerSafeCut(fresh(), 'capitulo-20#p-001', order)
    expect(JSON.stringify(view)).not.toContain('fz-003')
    expect('findings' in view).toBe(false)
  })
})

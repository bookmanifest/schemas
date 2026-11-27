// The examples cite a public-domain text. Every address must exist, and every quote must be literally in one of
// the paragraphs its item cites (checked against committed excerpts of the source).
import { describe, it, expect } from 'vitest'
import { globSync } from 'glob'
import { readJson } from './ajv'

const index = readJson('./v0.3/examples/fixtures/quijote-i-1-20.addresses.json')
const count = new Map<string, number>(index.chapters.map((c: { slug: string; paragraphs: number }) => [c.slug, c.paragraphs]))
const excerpts: Record<string, string> = readJson('./v0.3/examples/fixtures/quijote-i-1-20.excerpts.json').paragraphs

function* strings(value: unknown): Generator<string> {
  if (typeof value === 'string') yield value
  else if (Array.isArray(value)) for (const v of value) yield* strings(v)
  else if (value && typeof value === 'object') for (const v of Object.values(value)) yield* strings(v)
}
function* quoted(value: unknown): Generator<{ quote: string; evidence: string[] }> {
  if (Array.isArray(value)) for (const v of value) yield* quoted(v)
  else if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    if (typeof o.quote === 'string') yield { quote: o.quote, evidence: o.evidence as string[] }
    for (const v of Object.values(o)) yield* quoted(v)
  }
}

describe('Quijote examples cite real paragraphs', () => {
  for (const file of globSync('./v0.3/examples/narrative/narrative-layer-{valid,public}.json')) {
    it(`every address in ${file} exists`, () => {
      for (const s of strings(readJson(file))) {
        const m = /^([a-z0-9-]+)#p-([0-9]{3,})$/.exec(s)
        if (!m) continue
        expect(count.has(m[1]), s).toBe(true)
        expect(Number(m[2]), s).toBeLessThanOrEqual(count.get(m[1])!)
      }
    })
    it(`every quote in ${file} is literal text of a cited paragraph`, () => {
      for (const { quote, evidence } of quoted(readJson(file))) {
        expect(evidence.some((a) => excerpts[a]?.includes(quote)), quote).toBe(true)
      }
    })
  }
})

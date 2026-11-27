// v0.3 is published beside v0.1: the package exports it, and v0.1's exports are unchanged.
import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { globSync } from 'glob'
import { readJson } from './ajv'

const pkg = readJson('./package.json')

describe('package', () => {
  it('is version 0.3.0', () => expect(pkg.version).toBe('0.3.0'))

  it('keeps every v0.1 export as it was', () => {
    expect(pkg.main).toBe('./dist/index.js')
    expect(pkg.exports['.']).toEqual({ types: './dist/index.d.ts', default: './dist/index.js' })
    expect(pkg.exports['./json-schema']).toBe('./v0.1/json-schema/index.json')
    for (const name of ['entities', 'events', 'validators']) {
      expect(pkg.exports[`./${name}`]).toEqual({ types: `./dist/zod/${name}.d.ts`, default: `./dist/zod/${name}.js` })
    }
  })

  it('exports v0.3 code and schemas that exist', () => {
    const v03 = pkg.exports['./v0.3']
    expect(existsSync(v03.types)).toBe(true)
    expect(existsSync(v03.default)).toBe(true)
    expect(pkg.exports['./v0.3/json-schema/*']).toBe('./v0.3/json-schema/*')
    expect(globSync('./v0.3/json-schema/**/*.json').length).toBeGreaterThan(15)
    expect(pkg.files).toContain('v0.3/json-schema/')
  })
})

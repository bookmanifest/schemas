// v0.3 is published beside v0.1: the package exports it, and every v0.1 entry point is still exported.
// Since 0.3.1 the compiled code lives in dist/v0.1/ and dist/v0.3/; the import specifiers are unchanged.
// scripts/smoke-node-esm.mjs imports each entry point from the packed package with plain Node.
import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { globSync } from 'glob'
import { readJson } from './ajv'

const pkg = readJson('./package.json')

const code = (file: string) => ({ types: `./dist/${file}.d.ts`, default: `./dist/${file}.js` })

describe('package', () => {
  it('is version 0.3.1', () => expect(pkg.version).toBe('0.3.1'))

  it('keeps every v0.1 entry point', () => {
    expect(pkg.main).toBe('./dist/v0.1/index.js')
    expect(pkg.types).toBe('./dist/v0.1/index.d.ts')
    expect(pkg.exports['.']).toEqual(code('v0.1/index'))
    expect(pkg.exports['./v0.1']).toEqual(code('v0.1/index'))
    for (const name of ['entities', 'events', 'validators']) {
      expect(pkg.exports[`./${name}`]).toEqual(code(`v0.1/zod/${name}`))
    }
    expect(pkg.exports['./json-schema/*']).toBe('./v0.1/json-schema/*')
    expect(pkg.exports['./v0.1/json-schema/*']).toBe('./v0.1/json-schema/*')
  })

  it('exports v0.3 code and schemas', () => {
    expect(pkg.exports['./v0.3']).toEqual(code('v0.3/index'))
    expect(pkg.exports['./v0.3/json-schema/*']).toBe('./v0.3/json-schema/*')
    expect(globSync('./v0.3/json-schema/**/*.json').length).toBeGreaterThan(15)
    expect(pkg.files).toContain('v0.3/json-schema/')
  })

  it('points every code export at a file that exists', () => {
    for (const target of Object.values(pkg.exports)) {
      if (typeof target === 'string') continue
      const { types, default: js } = target as { types: string; default: string }
      expect(existsSync(types), types).toBe(true)
      expect(existsSync(js), js).toBe(true)
    }
  })

  it('compiles v0.1 once, to dist/v0.1, and v0.3 to dist/v0.3', () => {
    expect(globSync('dist/*', { posix: true }).sort()).toEqual(['dist/v0.1', 'dist/v0.3'])
  })
})

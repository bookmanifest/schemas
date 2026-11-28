// The package publishes one format version, 0.3: `.` and `./v0.3` are the same module, `./json-schema/*` and
// `./v0.3/json-schema/*` the same directory. scripts/smoke-node-esm.mjs imports each entry point from the packed
// package with plain Node.
import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { globSync } from 'glob'
import { readJson } from './ajv'

const pkg = readJson('./package.json')

const code = { types: './dist/v0.3/index.d.ts', default: './dist/v0.3/index.js' }

describe('package', () => {
  it('is version 0.3.7', () => expect(pkg.version).toBe('0.3.7'))

  it('exports 0.3 and nothing else', () => {
    expect(pkg.main).toBe(code.default)
    expect(pkg.types).toBe(code.types)
    expect(pkg.exports).toEqual({
      '.': code,
      './json-schema/*': './v0.3/json-schema/*',
      './v0.3': code,
      './v0.3/json-schema/*': './v0.3/json-schema/*',
    })
    expect(globSync('./v0.3/json-schema/**/*.json').length).toBeGreaterThan(30)
    expect(pkg.files).toContain('v0.3/json-schema/')
    expect(pkg.files.filter((f: string) => f.includes('v0.1'))).toEqual([])
  })

  it('points every code export at a file that exists', () => {
    for (const target of Object.values(pkg.exports)) {
      if (typeof target === 'string') continue
      const { types, default: js } = target as { types: string; default: string }
      expect(existsSync(types), types).toBe(true)
      expect(existsSync(js), js).toBe(true)
    }
  })

  it('compiles to dist/v0.3 only, and has no v0.1 tree', () => {
    expect(globSync('dist/*', { posix: true }).sort()).toEqual(['dist/v0.3'])
    expect(existsSync('v0.1')).toBe(false)
  })
})

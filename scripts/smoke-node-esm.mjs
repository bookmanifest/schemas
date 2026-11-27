// Plain-Node ESM smoke test of the published package: no bundler, no tsx, no TypeScript.
// It packs the package with `npm pack`, unpacks it into a throwaway consumer's node_modules, and imports every public
// entry point by its bare specifier, so `exports`, `files` and the compiled import paths are all checked as a consumer
// sees them. Run it after `npm run build`.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const work = mkdtempSync(path.join(tmpdir(), 'bookmanifest-schemas-smoke-'))

// Runs inside the consumer. Examples are read from this checkout (they are not published); everything else comes from
// the unpacked package by bare specifier.
const examples = JSON.stringify(path.join(root, 'v0.1', 'examples')).slice(1, -1)
const examplesV03 = JSON.stringify(path.join(root, 'v0.3', 'examples')).slice(1, -1)

const CHECKS = `
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const read = (file) => JSON.parse(readFileSync(file, 'utf-8'))
const book = read('${examples}/entities/book-valid.json')
const author = read('${examples}/entities/author-valid.json')
const batch01 = read('${examples}/events/batch-valid.json')
const batch03 = read('${examplesV03}/events/batch-valid.json')
const layer = read('${examplesV03}/narrative/narrative-layer-valid.json')

// Code entry points.
const root = await import('@bookmanifest/schemas')
const v01 = await import('@bookmanifest/schemas/v0.1')
const entities = await import('@bookmanifest/schemas/entities')
const events = await import('@bookmanifest/schemas/events')
const validators = await import('@bookmanifest/schemas/validators')
const v03 = await import('@bookmanifest/schemas/v0.3')

root.BookSchema.parse(book)
root.Events.EventBatchSchema.parse(batch01)
v01.AuthorSchema.parse(author)
assert.equal(v01.BookSchema, root.BookSchema, '"." and "./v0.1" are the same module')
entities.BookSchema.parse(book)
events.EventBatchSchema.parse(batch01)
assert.equal(validators.semverSchema.parse('1.2.3'), '1.2.3')
assert.equal(validators.didSchema.safeParse('not a did').success, false)

v03.NarrativeLayerSchema.parse(layer)
v03.EventBatchV03Schema.parse(batch03)
assert.deepEqual(v03.validateNarrativeLayer(layer), [])
// v0.3 reuses the v0.1 validators rather than a second copy of them.
assert.equal(v03.didSchema, validators.didSchema, 'v0.3 shares the v0.1 Zod instances')

// JSON Schema entry points: every published schema file, imported by its subpath the Node way (import attributes).
const pkgDir = new URL('./node_modules/@bookmanifest/schemas/', import.meta.url)
const load = async (specifier) => (await import(specifier, { with: { type: 'json' } })).default
const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false, allowUnionTypes: true })
addFormats(ajv)
for (const version of ['v0.1', 'v0.3']) {
  const files = readdirSync(new URL(version + '/json-schema/', pkgDir), { recursive: true }).filter((f) => f.endsWith('.json'))
  assert.ok(files.length > 10, version + ' publishes its JSON Schemas')
  for (const file of files.sort()) ajv.addSchema(await load('@bookmanifest/schemas/' + version + '/json-schema/' + file))
}
// The v0.1 schemas are also published under the unversioned "./json-schema/*".
assert.deepEqual(
  await load('@bookmanifest/schemas/json-schema/entities/author.json'),
  await load('@bookmanifest/schemas/v0.1/json-schema/entities/author.json'),
)

const check = (id, data) => {
  const validate = ajv.getSchema('https://bookmanifest.org/schemas/' + id)
  assert.ok(validate, id + ' is loaded')
  assert.ok(validate(data), id + ': ' + JSON.stringify(validate.errors))
}
check('v0.1/entities/author.json', author)
check('v0.3/narrative/narrative-layer.json', layer)
check('v0.3/events/batch.json', batch03)
`

const TYPES = `
import type { z } from 'zod'
import { BookSchema, Entities, Events, Validators } from '@bookmanifest/schemas'
import * as v01 from '@bookmanifest/schemas/v0.1'
import { AuthorSchema } from '@bookmanifest/schemas/entities'
import { EventBatchSchema } from '@bookmanifest/schemas/events'
import { didSchema } from '@bookmanifest/schemas/validators'
import { NarrativeLayerSchema, validateNarrativeLayer, type NarrativeLayer } from '@bookmanifest/schemas/v0.3'

export const title: string = BookSchema.parse({}).title
export const handle: z.infer<typeof AuthorSchema>['handle'] = 'x'
export const same: typeof v01.BookSchema = Entities.BookSchema
export const batch: typeof EventBatchSchema = Events.EventBatchSchema
export const did: string = Validators.didSchema.parse(didSchema.parse('x'))
export const issues: unknown[] = validateNarrativeLayer(NarrativeLayerSchema.parse({}) satisfies NarrativeLayer)
`

try {
  const [{ filename }] = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', work], { cwd: root, encoding: 'utf-8' }),
  )
  const consumer = path.join(work, 'consumer')
  const pkgDir = path.join(consumer, 'node_modules', '@bookmanifest', 'schemas')
  mkdirSync(pkgDir, { recursive: true })
  execFileSync('tar', ['-xzf', path.join(work, filename), '-C', pkgDir, '--strip-components=1'])
  // zod is the package's only runtime dependency; ajv checks the JSON Schemas. Both come from this checkout, so the
  // test runs offline.
  for (const dep of ['zod', 'ajv', 'ajv-formats']) {
    symlinkSync(path.join(root, 'node_modules', dep), path.join(consumer, 'node_modules', dep), 'dir')
  }
  writeFileSync(path.join(consumer, 'package.json'), JSON.stringify({ name: 'consumer', private: true, type: 'module' }))

  const checks = path.join(consumer, 'checks.mjs')
  writeFileSync(checks, CHECKS)
  execFileSync(process.execPath, [checks], { cwd: consumer, stdio: 'inherit' })
  console.log('✅ plain Node ESM: every public entry point imports and validates')

  // The `types` condition of every code entry point, resolved the way Node does (NodeNext).
  writeFileSync(path.join(consumer, 'types.mts'), TYPES)
  writeFileSync(path.join(consumer, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { module: 'NodeNext', moduleResolution: 'NodeNext', target: 'ES2022', strict: true, noEmit: true, skipLibCheck: false, types: [] },
    files: ['types.mts'],
  }))
  execFileSync(process.execPath, [path.join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', consumer], { stdio: 'inherit' })
  console.log('✅ NodeNext TypeScript: every public entry point has its types')
} catch (err) {
  console.error('❌ plain Node ESM smoke test failed')
  process.exitCode = 1
  if (err.status === undefined) console.error(err)
} finally {
  rmSync(work, { recursive: true, force: true })
}

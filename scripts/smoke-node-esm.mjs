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
const examples = JSON.stringify(path.join(root, 'v0.3', 'examples')).slice(1, -1)

const CHECKS = `
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const read = (file) => JSON.parse(readFileSync(file, 'utf-8'))
const book = read('${examples}/entities/book-valid.json')
const author = read('${examples}/entities/author-valid.json')
const manifest = read('${examples}/entities/manifest-valid.json')
const batch = read('${examples}/events/batch-valid.json')
const layer = read('${examples}/narrative/narrative-layer-valid.json')

// Code entry points: "." and its explicit alias "./v0.3" are the same module.
const root = await import('@bookmanifest/schemas')
const v03 = await import('@bookmanifest/schemas/v0.3')
assert.equal(v03.BookSchema, root.BookSchema, '"." and "./v0.3" are the same module')

root.BookSchema.parse(book)
root.AuthorSchema.parse(author)
root.ManifestSchema.parse(manifest)
root.Entities.ManifestSchema.parse(manifest)
root.EventBatchSchema.parse(batch)
root.Events.EventBatchSchema.parse(batch)
root.NarrativeLayerSchema.parse(layer)
assert.deepEqual(root.validateNarrativeLayer(layer), [])
assert.equal(root.semverSchema.parse('1.2.3'), '1.2.3')
assert.equal(root.Validators.didSchema.safeParse('not a did').success, false)

// Only 0.3 is published: the old v0.1 entry points are gone.
for (const gone of ['v0.1', 'entities', 'events', 'validators', 'v0.1/json-schema/entities/author.json']) {
  await assert.rejects(import('@bookmanifest/schemas/' + gone), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' }, gone + ' is not exported')
}

// JSON Schema entry points: every published schema file, imported by its subpath the Node way (import attributes).
const pkgDir = new URL('./node_modules/@bookmanifest/schemas/', import.meta.url)
const load = async (specifier) => (await import(specifier, { with: { type: 'json' } })).default
const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false, allowUnionTypes: true })
addFormats(ajv)
const files = readdirSync(new URL('v0.3/json-schema/', pkgDir), { recursive: true }).filter((f) => f.endsWith('.json'))
assert.ok(files.length > 30, 'the package publishes its JSON Schemas')
for (const file of files.sort()) ajv.addSchema(await load('@bookmanifest/schemas/v0.3/json-schema/' + file))
// "./json-schema/*" is the same directory as "./v0.3/json-schema/*".
for (const file of files) {
  assert.deepEqual(await load('@bookmanifest/schemas/json-schema/' + file), await load('@bookmanifest/schemas/v0.3/json-schema/' + file))
}

const check = (id, data) => {
  const validate = ajv.getSchema('https://bookmanifest.org/schemas/v0.3/' + id)
  assert.ok(validate, id + ' is loaded')
  assert.ok(validate(data), id + ': ' + JSON.stringify(validate.errors))
}
check('entities/author.json', author)
check('entities/manifest.json', manifest)
check('events/batch.json', batch)
check('narrative/narrative-layer.json', layer)
`

const TYPES = `
import type { z } from 'zod'
import { BookSchema, AuthorSchema, Entities, Events, Validators, EventBatchSchema, didSchema } from '@bookmanifest/schemas'
import * as v03 from '@bookmanifest/schemas/v0.3'
import { NarrativeLayerSchema, validateNarrativeLayer, type NarrativeLayer, type BookManifestEvent } from '@bookmanifest/schemas/v0.3'

export const title: string = BookSchema.parse({}).title
export const handle: z.infer<typeof AuthorSchema>['handle'] = 'x'
export const same: typeof v03.BookSchema = Entities.BookSchema
export const batch: typeof EventBatchSchema = Events.EventBatchSchema
export const event: BookManifestEvent['type'] = 'reread'
export const did: string = Validators.didSchema.parse(didSchema.parse('x'))
export const issues: unknown[] = validateNarrativeLayer(NarrativeLayerSchema.parse({}) satisfies NarrativeLayer)
`

try {
  const [{ filename, files: packed }] = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', work], { cwd: root, encoding: 'utf-8' }),
  )
  const stale = packed.map((f) => f.path).filter((p) => p.includes('v0.1'))
  if (stale.length > 0) throw new Error('the tarball still has v0.1 files: ' + stale.join(', '))
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

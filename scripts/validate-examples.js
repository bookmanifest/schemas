// Validates every example in v0.3/examples against the JSON Schemas with a strict draft 2020-12 validator.
// `*-valid.json` (and any example without `-invalid`) must pass; `*-invalid.json` must fail.
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readFile } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

const BASE = 'https://bookmanifest.org/schemas/v0.3'

async function validateExamples() {
  console.log('🔍 Validating example files against the 0.3 JSON Schemas...')

  // strictTypes is off because the session event schemas use `properties` inside `allOf` without `type`.
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false, allowUnionTypes: true })
  addFormats(ajv)
  for (const file of (await glob('./v0.3/json-schema/**/*.json')).sort()) {
    ajv.addSchema(JSON.parse(await readFile(file, 'utf-8')))
  }

  const groups = [
    // Entities: the schema is named by the file, e.g. manifest-valid.json -> entities/manifest.json.
    ['./v0.3/examples/entities/*.json', (file) => `${BASE}/entities/${path.basename(file).replace(/-(in)?valid\.json$/, '')}.json`],
    ['./v0.3/examples/events/*.json', () => `${BASE}/events/batch.json`],
    ['./v0.3/examples/narrative/*.json', () => `${BASE}/narrative/narrative-layer.json`]
  ]

  let passed = 0
  let failed = 0
  for (const [pattern, schemaFor] of groups) {
    for (const exampleFile of (await glob(pattern)).sort()) {
      const schemaId = schemaFor(exampleFile)
      const validate = ajv.getSchema(schemaId)
      if (!validate) throw new Error(`Schema not found: ${schemaId}`)
      const expectValid = !exampleFile.endsWith('-invalid.json')
      const valid = validate(JSON.parse(await readFile(exampleFile, 'utf-8')))
      if (valid === expectValid) {
        console.log(`  ✅ ${path.relative('v0.3/examples', exampleFile)}${expectValid ? '' : ' (rejected, as expected)'}`)
        passed++
      } else {
        console.log(`  ❌ ${path.relative('v0.3/examples', exampleFile)} ${expectValid ? 'should be valid' : 'should be rejected'}`)
        if (validate.errors) console.log(validate.errors)
        failed++
      }
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`)

  if (failed > 0) {
    process.exit(1)
  }
}

validateExamples().catch((err) => {
  console.error(err)
  process.exit(1)
})

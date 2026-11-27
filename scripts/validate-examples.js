import Ajv from 'ajv'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readFile } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

const ajv = new Ajv({ allErrors: true, strict: false, validateSchema: false })
addFormats(ajv)

async function validateExamples() {
  console.log('🔍 Validating example files against schemas...')

  // Load all validator schemas first so they can be referenced
  const validatorSchemas = await glob('./v0.1/json-schema/validators/*.json')
  for (const validatorFile of validatorSchemas) {
    const schema = JSON.parse(await readFile(validatorFile, 'utf-8'))
    ajv.addSchema(schema)
  }

  // Load all entity schemas so they can reference each other (e.g., prosemirror.json)
  const entitySchemas = await glob('./v0.1/json-schema/entities/*.json')
  for (const entityFile of entitySchemas) {
    const schema = JSON.parse(await readFile(entityFile, 'utf-8'))
    ajv.addSchema(schema)
  }

  let passed = 0
  let failed = 0

  // Validate entity examples
  const entityExamples = await glob('./v0.1/examples/entities/*-valid.json')

  for (const exampleFile of entityExamples) {
    const entityName = path.basename(exampleFile).replace('-valid.json', '')
    const schemaId = `https://bookmanifest.org/schemas/v0.1/entities/${entityName}.json`

    try {
      const example = JSON.parse(await readFile(exampleFile, 'utf-8'))

      const validate = ajv.getSchema(schemaId)
      if (!validate) {
        throw new Error(`Schema not found: ${schemaId}`)
      }

      const valid = validate(example)

      if (valid) {
        console.log(`  ✅ ${path.basename(exampleFile)}`)
        passed++
      } else {
        console.log(`  ❌ ${path.basename(exampleFile)}`)
        console.log(validate.errors)
        failed++
      }
    } catch (err) {
      console.log(`  ⚠️  ${path.basename(exampleFile)} - ${err.message}`)
      failed++
    }
  }

  // Validate event examples
  const eventExamples = await glob('./v0.1/examples/events/*-valid.json')

  for (const exampleFile of eventExamples) {
    // Event batches contain multiple events
    console.log(`  ✅ ${path.basename(exampleFile)} (batch validation via Zod tests)`)
    passed++
  }

  // v0.3: narrative layer and reading events, validated with a JSON Schema draft 2020-12 validator.
  // Valid examples must pass; *-invalid examples must fail.
  console.log('\n🔍 v0.3: narrative layer and reading events...')
  const ajv2020 = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false, allowUnionTypes: true })
  addFormats(ajv2020)
  for (const file of (await glob('./v0.{1,3}/json-schema/**/*.json')).sort()) {
    ajv2020.addSchema(JSON.parse(await readFile(file, 'utf-8')))
  }
  const v03 = [
    ['./v0.3/examples/narrative/*.json', 'https://bookmanifest.org/schemas/v0.3/narrative/narrative-layer.json'],
    ['./v0.3/examples/events/*.json', 'https://bookmanifest.org/schemas/v0.3/events/batch.json']
  ]
  for (const [pattern, schemaId] of v03) {
    const validate = ajv2020.getSchema(schemaId)
    if (!validate) throw new Error(`Schema not found: ${schemaId}`)
    for (const exampleFile of (await glob(pattern)).sort()) {
      const expectValid = !exampleFile.endsWith('-invalid.json')
      const valid = validate(JSON.parse(await readFile(exampleFile, 'utf-8')))
      if (valid === expectValid) {
        console.log(`  ✅ ${path.basename(exampleFile)}${expectValid ? '' : ' (rejected, as expected)'}`)
        passed++
      } else {
        console.log(`  ❌ ${path.basename(exampleFile)} ${expectValid ? 'should be valid' : 'should be rejected'}`)
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

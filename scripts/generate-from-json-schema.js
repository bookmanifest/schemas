import { compileFromFile } from 'json-schema-to-typescript'
import { writeFile, mkdir } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

const SCHEMA_DIR = './v0.1/json-schema'
const OUTPUT_DIR = './v0.1/typescript'

async function generateTypes() {
  console.log('🔧 Generating TypeScript types from JSON Schema...')

  await mkdir(OUTPUT_DIR, { recursive: true })

  const schemaFiles = await glob(`${SCHEMA_DIR}/**/*.json`)

  for (const schemaFile of schemaFiles) {
    const relativePath = path.relative(SCHEMA_DIR, schemaFile)
    const outputPath = path.join(OUTPUT_DIR, relativePath.replace('.json', '.d.ts'))

    console.log(`  ${relativePath} -> ${path.basename(outputPath)}`)

    const ts = await compileFromFile(schemaFile, {
      bannerComment: '/* Auto-generated from JSON Schema - DO NOT EDIT */',
      style: {
        singleQuote: true
      }
    })

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, ts)
  }

  console.log('✅ TypeScript types generated successfully')
}

generateTypes().catch(console.error)

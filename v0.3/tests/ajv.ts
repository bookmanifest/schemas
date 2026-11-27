// Ajv (draft 2020-12) loaded with every schema, so cross-file $refs resolve.
// strictTypes is off because the session event schemas use `properties` inside `allOf` without `type`.
import Ajv2020 from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import { globSync } from 'glob'
import { readFileSync } from 'fs'

export function loadAjv() {
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false, allowUnionTypes: true })
  addFormats(ajv)
  for (const file of globSync('./v0.3/json-schema/**/*.json').sort()) {
    ajv.addSchema(JSON.parse(readFileSync(file, 'utf-8')))
  }
  return ajv
}

export const V03 = 'https://bookmanifest.org/schemas/v0.3'

export function readJson(file: string) {
  return JSON.parse(readFileSync(file, 'utf-8'))
}

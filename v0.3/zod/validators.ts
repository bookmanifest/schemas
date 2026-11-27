// v0.3. Validators the narrative layer and the v0.3 events add to those of v0.1.
import { z } from 'zod'

export { didSchema, semverSchema, iso8601Schema, languageCodeSchema } from '../../v0.1/zod/validators.js'

// `<chapter-slug>#p-NNN`, resolved against the manifest version of the document that holds it.
export const PARAGRAPH_ADDRESS_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*#p-[0-9]{3,}$/

export const paragraphAddressSchema = z.string().regex(PARAGRAPH_ADDRESS_PATTERN, {
  message: 'Invalid paragraph address. Expected: <chapter-slug>#p-NNN (e.g. capitulo-08#p-005)'
})

// A paragraph node id inside a chapter version (the part after `#` in an address).
export const nodeIdSchema = z.string().regex(/^p-[0-9]{3,}$/, {
  message: 'Invalid paragraph node id. Expected: p-NNN'
})

export const ENTITY_ID_PATTERN = /^e:[a-z0-9]+(?:-[a-z0-9]+)*$/

export const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN, {
  message: 'Invalid entity id. Expected: e:<slug>'
})

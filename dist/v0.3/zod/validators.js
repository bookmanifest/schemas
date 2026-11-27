// Book Manifest 0.3: validators shared by the manifest, the events and the narrative layer.
import { z } from 'zod';
// DID pattern: did:web:bookmanifest.org:{entity_type}:{unique_id}[:{version}]
const DID_PATTERN = /^did:web:bookmanifest\.org:(author|publisher|series|book|manifest|chapter|reader|library-entry|progress):[a-zA-Z0-9-_]+(:[a-zA-Z0-9.-]+)?$/;
export const didSchema = z.string().regex(DID_PATTERN, {
    message: 'Invalid Book Manifest DID format. Expected: did:web:bookmanifest.org:{type}:{id}[:{version}]'
});
// SemVer pattern: major.minor.patch (no pre-release or metadata)
const SEMVER_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
export const semverSchema = z.string().regex(SEMVER_PATTERN, {
    message: 'Invalid semantic version. Expected: major.minor.patch (e.g., 1.0.0)'
});
// ISO 8601 date-time
export const iso8601Schema = z.string().datetime({
    message: 'Invalid ISO 8601 datetime format'
});
// ISO 639-1 language code (2 letters)
export const languageCodeSchema = z.string().length(2).regex(/^[a-z]{2}$/, {
    message: 'Invalid ISO 639-1 language code (expected 2 lowercase letters)'
});
// ISO 4217 currency code (3 letters)
export const currencyCodeSchema = z.string().length(3).regex(/^[A-Z]{3}$/, {
    message: 'Invalid ISO 4217 currency code (expected 3 uppercase letters)'
});
// URL validation
export const urlSchema = z.string().url();
// `<chapter-slug>#p-NNN`, resolved against the manifest version of the document that holds it.
export const PARAGRAPH_ADDRESS_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*#p-[0-9]{3,}$/;
export const paragraphAddressSchema = z.string().regex(PARAGRAPH_ADDRESS_PATTERN, {
    message: 'Invalid paragraph address. Expected: <chapter-slug>#p-NNN (e.g. capitulo-08#p-005)'
});
// A paragraph node id inside a chapter version (the part after `#` in an address).
export const nodeIdSchema = z.string().regex(/^p-[0-9]{3,}$/, {
    message: 'Invalid paragraph node id. Expected: p-NNN'
});
export const ENTITY_ID_PATTERN = /^e:[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const entityIdSchema = z.string().regex(ENTITY_ID_PATTERN, {
    message: 'Invalid entity id. Expected: e:<slug>'
});

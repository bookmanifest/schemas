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

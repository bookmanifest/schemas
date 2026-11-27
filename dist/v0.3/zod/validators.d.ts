import { z } from 'zod';
export { didSchema, semverSchema, iso8601Schema, languageCodeSchema } from '../../v0.1/zod/validators.js';
export declare const PARAGRAPH_ADDRESS_PATTERN: RegExp;
export declare const paragraphAddressSchema: z.ZodString;
export declare const nodeIdSchema: z.ZodString;
export declare const ENTITY_ID_PATTERN: RegExp;
export declare const entityIdSchema: z.ZodString;

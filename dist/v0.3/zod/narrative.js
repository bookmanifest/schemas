// v0.3. Zod mirror of v0.3/json-schema/narrative/*.json. The JSON Schema is the source of truth;
// tests check that both accept and reject the same examples.
import { z } from 'zod';
import { didSchema, semverSchema, iso8601Schema, paragraphAddressSchema, entityIdSchema } from './validators.js';
const localId = (prefix) => z.string().regex(new RegExp(`^${prefix}-[0-9]{3,}$`));
export const VisibilitySchema = z.enum(['public', 'author']);
const addressList = z
    .array(paragraphAddressSchema)
    .min(1)
    .refine((items) => new Set(items).size === items.length, { message: 'Addresses must be unique' });
// Fields every grounded item carries (common.json#/$defs/support).
const supportShape = {
    basis: z.enum(['asserted', 'inferred']),
    evidence: addressList,
    quote: z.string().min(1).max(1000).optional(),
    confidence: z.number().min(0).max(1).optional(),
    status: z.enum(['verified', 'doubtful', 'review']).optional(),
    verified_by: z
        .array(z.enum(['producer', 'author']))
        .min(1)
        .max(2)
        .refine((items) => new Set(items).size === items.length, { message: 'verified_by must be unique' })
        .optional()
};
// The support's own rules: an inferred item quotes; only a verified item says who verified it.
function checkSupport(item, ctx) {
    if (item.basis === 'inferred' && item.quote === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['quote'], message: 'An inferred item must carry a quote' });
    }
    if (item.verified_by !== undefined && item.status !== 'verified') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['verified_by'], message: 'Only a verified item has verified_by' });
    }
}
export const EntitySchema = z
    .object({
    id: entityIdSchema,
    kind: z.enum(['character', 'place', 'org', 'object']),
    name: z.string().min(1).max(200),
    revealed_at: paragraphAddressSchema,
    aliases: z
        .array(z.object({ name: z.string().min(1).max(200), revealed_at: paragraphAddressSchema }).strict())
        .max(50)
        .optional(),
    visibility: VisibilitySchema.optional()
})
    .strict();
export const DurationSchema = z
    .object({
    ...supportShape,
    unit: z.enum(['second', 'minute', 'hour', 'day', 'week', 'month', 'year']).optional(),
    value: z.number().min(0).optional(),
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
    unknown: z.literal(true).optional()
})
    .strict()
    .superRefine((d, ctx) => {
    checkSupport(d, ctx);
    const point = d.unit !== undefined && d.value !== undefined && d.min === undefined && d.max === undefined && !d.unknown;
    const range = d.unit !== undefined && d.min !== undefined && d.max !== undefined && d.value === undefined && !d.unknown;
    const unknown = d.unknown === true && d.unit === undefined && d.value === undefined && d.min === undefined && d.max === undefined;
    if ([point, range, unknown].filter(Boolean).length !== 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'A duration is exactly one of: {unit, value}, {unit, min, max}, or {unknown: true}'
        });
    }
});
const SceneTimeSchema = z
    .object({
    ...supportShape,
    label: z.string().min(1).max(200).optional(),
    date: z.string().regex(/^-?[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$/).optional()
})
    .strict()
    .superRefine((t, ctx) => {
    checkSupport(t, ctx);
    if (t.label === undefined && t.date === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A scene time needs a label or a date' });
    }
});
// The slots of a setting (setting.json#/$defs/frame), shared by setting spans and a scene's `setting`.
const settingSlots = {
    enclosure: z.enum(['interior', 'exterior', 'vehicle', 'no_place']).optional(),
    place: entityIdSchema.optional(),
    vehicle: z.string().min(1).max(200).optional(),
    surroundings: z.enum(['city', 'nature', 'water']).optional(),
    time_of_day: z.enum(['dawn', 'morning', 'midday', 'afternoon', 'dusk', 'night']).optional(),
    season: z.enum(['spring', 'summer', 'autumn', 'winter']).optional(),
    date_or_reference: z.string().min(1).max(200).optional(),
    plane: z.enum(['main', 'memory', 'embedded']).optional(),
    plane_level: z.number().int().min(1).optional(),
    voice: z.enum(['outside_narrator', 'first_person_life', 'character_telling', 'written_text', 'theatre']).optional(),
    mode: z.enum(['scene', 'dialogue', 'thought', 'summary', 'description', 'document', 'address']).optional(),
    weather: z
        .array(z.enum(['rain', 'storm', 'snow', 'wind', 'heat', 'cold']))
        .min(1)
        .max(6)
        .refine((items) => new Set(items).size === items.length, { message: 'Weather must be unique' })
        .optional(),
    light: z.enum(['darkness', 'artificial', 'moon']).optional(),
    company: z.enum(['alone', 'two', 'group', 'crowd']).optional(),
    animals: z.boolean().optional()
};
// The slots that count towards «at least one slot» (plane_level only qualifies plane).
const SETTING_SLOTS = Object.keys(settingSlots).filter((k) => k !== 'plane_level');
function checkFrame(f, ctx) {
    checkSupport(f, ctx);
    if (!SETTING_SLOTS.some((k) => f[k] !== undefined)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A setting needs at least one slot' });
    }
    if (f.plane === 'embedded' && f.plane_level === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['plane_level'], message: 'An embedded plane needs a plane_level' });
    }
    if (f.plane !== 'embedded' && f.plane_level !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['plane_level'], message: 'Only an embedded plane has a plane_level' });
    }
    if (f.vehicle !== undefined && f.enclosure !== 'vehicle') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['vehicle'], message: 'A vehicle needs enclosure: vehicle' });
    }
    if (f.surroundings !== undefined && f.enclosure !== 'exterior' && f.enclosure !== 'vehicle') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['surroundings'], message: 'Surroundings need enclosure: exterior or vehicle' });
    }
}
export const SettingSummarySchema = z
    .object({ ...supportShape, ...settingSlots })
    .strict()
    .superRefine(checkFrame);
export const SettingSchema = z
    .object({
    ...supportShape,
    id: localId('st'),
    start: paragraphAddressSchema,
    end: paragraphAddressSchema.optional(),
    ...settingSlots,
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine(checkFrame);
export const SceneSchema = z
    .object({
    ...supportShape,
    id: localId('s'),
    start: paragraphAddressSchema,
    end: paragraphAddressSchema,
    place: entityIdSchema.optional(),
    time: SceneTimeSchema.optional(),
    story_order: z.number().int().min(1).optional(),
    cast: z
        .array(entityIdSchema)
        .max(200)
        .refine((items) => new Set(items).size === items.length, { message: 'Cast must be unique' })
        .optional(),
    duration: DurationSchema.optional(),
    setting: SettingSummarySchema.optional(),
    continues: localId('s').optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine(checkSupport);
export const FocalizationSchema = z
    .object({
    ...supportShape,
    id: localId('fz'),
    start: paragraphAddressSchema,
    end: paragraphAddressSchema.optional(),
    mode: z.enum(['internal', 'zero', 'external']),
    focalizer: entityIdSchema.optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine((f, ctx) => {
    checkSupport(f, ctx);
    if (f.mode === 'internal' && f.focalizer === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['focalizer'], message: 'Internal focalization needs a focalizer' });
    }
    if (f.mode !== 'internal' && f.focalizer !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['focalizer'], message: 'Only internal focalization has a focalizer' });
    }
});
export const AnachronySchema = z
    .object({
    ...supportShape,
    id: localId('an'),
    start: paragraphAddressSchema,
    end: paragraphAddressSchema.optional(),
    kind: z.enum(['analepsis', 'prolepsis']),
    reach: z.string().min(1).max(200).optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine(checkSupport);
export const TruthSchema = z
    .object({
    ...supportShape,
    id: localId('t'),
    text: z.string().min(1).max(500),
    subjects: z
        .array(entityIdSchema)
        .max(20)
        .refine((items) => new Set(items).size === items.length, { message: 'Subjects must be unique' })
        .optional(),
    revealed_at: paragraphAddressSchema,
    clues: addressList.optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine(checkSupport);
// When a character stops holding a truth (knowledge.json#/properties/until): a nested assertion with its own support.
const KnowledgeUntilSchema = z
    .object({
    ...supportShape,
    at: paragraphAddressSchema,
    revealed_at: paragraphAddressSchema
})
    .strict()
    .superRefine(checkSupport);
export const KnowledgeSchema = z
    .object({
    ...supportShape,
    id: localId('k'),
    truth: localId('t'),
    knower: entityIdSchema,
    stance: z.enum(['knows', 'believes', 'suspects']),
    holds: z.boolean(),
    since: z.union([paragraphAddressSchema, z.literal('before_text')]),
    revealed_at: paragraphAddressSchema,
    until: KnowledgeUntilSchema.optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine((k, ctx) => {
    checkSupport(k, ctx);
    if (k.stance === 'knows' && !k.holds) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['holds'], message: 'A character who knows a truth holds it' });
    }
});
export const StoryEventSchema = z
    .object({
    ...supportShape,
    id: localId('ev'),
    text: z.string().min(1).max(500),
    at: paragraphAddressSchema,
    salience: z.enum(['kernel', 'catalysis']),
    picked_up_at: addressList.optional(),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine((e, ctx) => {
    checkSupport(e, ctx);
    if (e.salience === 'kernel' && e.picked_up_at === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['picked_up_at'], message: 'A kernel lists where the book picks it up' });
    }
    if (e.salience === 'catalysis' && e.picked_up_at !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['picked_up_at'], message: 'A catalysis is not picked up' });
    }
});
export const CoreferenceSchema = z
    .object({
    ...supportShape,
    id: localId('co'),
    event: localId('ev').optional(),
    tellings: z
        .array(z.object({ at: paragraphAddressSchema, teller: entityIdSchema.optional() }).strict())
        .min(2)
        .max(50),
    visibility: VisibilitySchema.optional()
})
    .strict()
    .superRefine(checkSupport);
export const FindingSchema = z
    .object({
    id: localId('fd'),
    kind: z.enum(['continuity', 'absence', 'voice_balance', 'reading_vs_story_order', 'open_question']),
    text: z.string().min(1).max(2000),
    refs: z
        .array(z.string().regex(/^(e:[a-z0-9]+(?:-[a-z0-9]+)*|(s|fz|st|an|t|k|ev|co)-[0-9]{3,})$/))
        .refine((items) => new Set(items).size === items.length, { message: 'Refs must be unique' })
        .optional(),
    evidence: addressList,
    visibility: z.literal('author')
})
    .strict();
export const NarrativeLayerSchema = z
    .object({
    narrative_layer: z.literal('0.3'),
    book_id: didSchema,
    manifest_id: didSchema,
    manifest_version: semverSchema,
    language: z.string().regex(/^[a-z]{2}$/),
    generated_at: iso8601Schema.optional(),
    generator: z.object({ name: z.string().min(1).max(100), version: z.string().min(1).max(50) }).strict().optional(),
    entities: z.array(EntitySchema).max(5000).optional(),
    scenes: z.array(SceneSchema).max(20000).optional(),
    focalization: z.array(FocalizationSchema).max(50000).optional(),
    setting: z.array(SettingSchema).max(50000).optional(),
    anachronies: z.array(AnachronySchema).max(20000).optional(),
    truths: z.array(TruthSchema).max(200).optional(),
    knowledge: z.array(KnowledgeSchema).max(5000).optional(),
    events: z.array(StoryEventSchema).max(20000).optional(),
    coreference: z.array(CoreferenceSchema).max(5000).optional(),
    findings: z.array(FindingSchema).max(5000).optional()
})
    .strict();

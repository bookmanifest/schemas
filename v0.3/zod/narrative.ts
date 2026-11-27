// v0.3. Zod mirror of v0.3/json-schema/narrative/*.json. The JSON Schema is the source of truth;
// tests check that both accept and reject the same examples.
import { z } from 'zod'
import {
  didSchema,
  semverSchema,
  iso8601Schema,
  paragraphAddressSchema,
  entityIdSchema
} from './validators'

const localId = (prefix: string) => z.string().regex(new RegExp(`^${prefix}-[0-9]{3,}$`))

export const VisibilitySchema = z.enum(['public', 'author'])

const addressList = z
  .array(paragraphAddressSchema)
  .min(1)
  .refine((items) => new Set(items).size === items.length, { message: 'Addresses must be unique' })

// Fields every grounded item carries (common.json#/$defs/support).
const supportShape = {
  basis: z.enum(['asserted', 'inferred']),
  evidence: addressList,
  quote: z.string().min(1).max(1000).optional(),
  confidence: z.number().min(0).max(1).optional(),
  status: z.enum(['verified', 'doubtful', 'review']).optional()
}

type Supported = { basis: 'asserted' | 'inferred'; quote?: string }

function requireQuoteWhenInferred(item: Supported, ctx: z.RefinementCtx) {
  if (item.basis === 'inferred' && item.quote === undefined) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['quote'], message: 'An inferred item must carry a quote' })
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
  .strict()

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
    requireQuoteWhenInferred(d, ctx)
    const point = d.unit !== undefined && d.value !== undefined && d.min === undefined && d.max === undefined && !d.unknown
    const range = d.unit !== undefined && d.min !== undefined && d.max !== undefined && d.value === undefined && !d.unknown
    const unknown = d.unknown === true && d.unit === undefined && d.value === undefined && d.min === undefined && d.max === undefined
    if ([point, range, unknown].filter(Boolean).length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A duration is exactly one of: {unit, value}, {unit, min, max}, or {unknown: true}'
      })
    }
  })

const SceneTimeSchema = z
  .object({
    ...supportShape,
    label: z.string().min(1).max(200).optional(),
    date: z.string().regex(/^-?[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$/).optional()
  })
  .strict()
  .superRefine((t, ctx) => {
    requireQuoteWhenInferred(t, ctx)
    if (t.label === undefined && t.date === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A scene time needs a label or a date' })
    }
  })

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
    continues: localId('s').optional(),
    visibility: VisibilitySchema.optional()
  })
  .strict()
  .superRefine(requireQuoteWhenInferred)

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
    requireQuoteWhenInferred(f, ctx)
    if (f.mode === 'internal' && f.focalizer === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['focalizer'], message: 'Internal focalization needs a focalizer' })
    }
    if (f.mode !== 'internal' && f.focalizer !== undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['focalizer'], message: 'Only internal focalization has a focalizer' })
    }
  })

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
  .superRefine(requireQuoteWhenInferred)

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
    visibility: VisibilitySchema.optional()
  })
  .strict()
  .superRefine((k, ctx) => {
    requireQuoteWhenInferred(k, ctx)
    if (k.stance === 'knows' && !k.holds) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['holds'], message: 'A character who knows a truth holds it' })
    }
  })

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
    requireQuoteWhenInferred(e, ctx)
    if (e.salience === 'kernel' && e.picked_up_at === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['picked_up_at'], message: 'A kernel lists where the book picks it up' })
    }
    if (e.salience === 'catalysis' && e.picked_up_at !== undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['picked_up_at'], message: 'A catalysis is not picked up' })
    }
  })

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
  .superRefine(requireQuoteWhenInferred)

export const FindingSchema = z
  .object({
    id: localId('fd'),
    kind: z.enum(['continuity', 'absence', 'voice_balance', 'reading_vs_story_order', 'open_question']),
    text: z.string().min(1).max(2000),
    refs: z
      .array(z.string().regex(/^(e:[a-z0-9]+(?:-[a-z0-9]+)*|(s|fz|t|k|ev|co)-[0-9]{3,})$/))
      .refine((items) => new Set(items).size === items.length, { message: 'Refs must be unique' })
      .optional(),
    evidence: addressList,
    visibility: z.literal('author')
  })
  .strict()

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
    truths: z.array(TruthSchema).max(200).optional(),
    knowledge: z.array(KnowledgeSchema).max(5000).optional(),
    events: z.array(StoryEventSchema).max(20000).optional(),
    coreference: z.array(CoreferenceSchema).max(5000).optional(),
    findings: z.array(FindingSchema).max(5000).optional()
  })
  .strict()

export type NarrativeLayer = z.infer<typeof NarrativeLayerSchema>
export type Entity = z.infer<typeof EntitySchema>
export type Scene = z.infer<typeof SceneSchema>
export type Duration = z.infer<typeof DurationSchema>
export type Focalization = z.infer<typeof FocalizationSchema>
export type Truth = z.infer<typeof TruthSchema>
export type Knowledge = z.infer<typeof KnowledgeSchema>
export type StoryEvent = z.infer<typeof StoryEventSchema>
export type Coreference = z.infer<typeof CoreferenceSchema>
export type Finding = z.infer<typeof FindingSchema>
export type Visibility = z.infer<typeof VisibilitySchema>

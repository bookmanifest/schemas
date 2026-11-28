// Book Manifest 0.3 events: the five session events (heartbeat, chapter_transition, book_lifecycle, interaction,
// app_lifecycle) and the six reading events (reread, shared_entry, companion_open, recap_view, spoiler_warning, access_gate).
// Reading-event payloads are closed (.strict()): positions, ids and enums only; no text, no free strings, no exact
// durations, nothing that identifies a person. See docs/v0.3/spec.md.
import { z } from 'zod'
import { didSchema, semverSchema, iso8601Schema, nodeIdSchema, entityIdSchema } from './validators.js'

// Event context (shared across all events)
const EventContextSchema = z.object({
  reader_id: didSchema,
  book_id: didSchema,
  manifest_id: didSchema,
  manifest_version: semverSchema,
  chapter_id: didSchema,
  chapter_version: semverSchema,
  device_type: z.enum(['mobile', 'tablet', 'desktop']),
  app_id: z.string().min(1),
  app_version: semverSchema
}).strict()

// Base event structure (envelope)
const BaseEventSchema = z.object({
  id: z.string().uuid(),
  timestamp: iso8601Schema,
  session_id: z.string().uuid(),
  context: EventContextSchema
})

// 1. Heartbeat Event
export const HeartbeatEventSchema = BaseEventSchema.extend({
  type: z.literal('heartbeat'),
  payload: z.object({
    duration_seconds: z.number().int().min(0).max(600),
    active_seconds: z.number().int().min(0).max(600),
    start_node_id: z.string().min(1),
    end_node_id: z.string().min(1),
    focus_node_id: z.string().min(1),
    progress_percentage: z.number().min(0).max(1),
    // Optional: the paragraphs shown, in reading order, with the words of each on the screen or page (a paginated reader
    // knows them exactly). A consumer shares the heartbeat's time by these words.
    visible: z.array(z.object({
      node_id: nodeIdSchema,
      words: z.number().int().min(0).max(100000)
    }).strict()).min(1).max(200).optional()
  }).strict()
}).strict()

// 2. Chapter Transition Event
export const ChapterTransitionEventSchema = BaseEventSchema.extend({
  type: z.literal('chapter_transition'),
  payload: z.object({
    from_chapter_id: didSchema,
    from_chapter_version: semverSchema,
    to_chapter_id: didSchema.nullable(),
    to_chapter_version: semverSchema.nullable(),
    trigger: z.enum(['scroll_end', 'next_button', 'prev_button', 'toc_jump', 'link_internal', 'book_close']),
    time_in_chapter_seconds: z.number().int().min(0),
    chapter_completion_percentage: z.number().min(0).max(1)
  }).strict()
}).strict()

// 3. Book Lifecycle Event
export const BookLifecycleEventSchema = BaseEventSchema.extend({
  type: z.literal('book_lifecycle'),
  payload: z.object({
    action: z.enum(['started', 'completed']),
    trigger: z.string().min(1),
    total_active_reading_time_seconds: z.number().int().min(0),
    completion_percentage: z.number().min(0).max(1),
    chapters_started: z.number().int().min(0),
    chapters_completed: z.number().int().min(0)
  }).strict()
}).strict()

// 4. Interaction Event
export const InteractionEventSchema = BaseEventSchema.extend({
  type: z.literal('interaction'),
  payload: z.object({
    action: z.enum(['highlight', 'comment', 'copy', 'share', 'bookmark', 'search_definition', 'link_click']),
    target_node_id: z.string().min(1),
    target_node_type: z.string().min(1),
    text_selection: z.string().optional(),
    selection_length: z.number().int().min(0),
    annotation: z.string().optional(),
    // Optional: the part of the target paragraph acted on, as positions in its plain text (UTF-16 code units). Positions
    // only, never text; end must be greater than start, which a consumer checks.
    fragment: z.object({
      start: z.number().int().min(0).max(1000000),
      end: z.number().int().min(0).max(1000000)
    }).strict().optional()
  }).strict()
}).strict()

// 5. App Lifecycle Event
export const AppLifecycleEventSchema = BaseEventSchema.extend({
  type: z.literal('app_lifecycle'),
  payload: z.object({
    action: z.enum(['open', 'background', 'foreground', 'close']),
    source: z.enum(['direct', 'notification', 'deeplink', 'widget']).optional(),
    time_since_last_session_seconds: z.number().int().min(0).optional()
  }).strict()
}).strict()

// 6. Reading events
export const RereadEventSchema = BaseEventSchema.extend({
  type: z.literal('reread'),
  payload: z
    .object({
      from_node_id: nodeIdSchema,
      to_chapter_id: didSchema,
      to_chapter_version: semverSchema,
      to_node_id: nodeIdSchema,
      method: z.enum(['scroll', 'toc_jump', 'link_internal', 'search', 'companion'])
    })
    .strict()
}).strict()

// shared_entry must not be linkable to a reader: its envelope has no reader_id and no session_id.
const AnonymousEventContextSchema = EventContextSchema.omit({ reader_id: true }).strict()

export const SharedEntryEventSchema = z.object({
  id: z.string().uuid(),
  timestamp: iso8601Schema,
  context: AnonymousEventContextSchema,
  type: z.literal('shared_entry'),
  payload: z
    .object({
      stage: z.enum(['arrived', 'continued_from_entry', 'began_from_start']),
      entry_chapter_id: didSchema,
      entry_chapter_version: semverSchema,
      entry_node_id: nodeIdSchema,
      days_since_entry: z.enum(['0', '1-7', '8-30', '31-90']).optional()
    })
    .strict()
    .superRefine((p, ctx) => {
      if ((p.stage === 'began_from_start') !== (p.days_since_entry !== undefined)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['days_since_entry'],
          message: 'days_since_entry is required for began_from_start and forbidden otherwise'
        })
      }
    })
}).strict()

export const CompanionOpenEventSchema = BaseEventSchema.extend({
  type: z.literal('companion_open'),
  payload: z
    .object({
      surface: z.enum(['who_is_who', 'entity_card', 'map']),
      entity_id: entityIdSchema.optional(),
      at_node_id: nodeIdSchema,
      trigger: z.enum(['name_tap', 'menu']).optional()
    })
    .strict()
    .superRefine((p, ctx) => {
      if (p.surface === 'entity_card' && p.entity_id === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['entity_id'], message: 'An entity card names its entity' })
      }
    })
}).strict()

export const RecapViewEventSchema = BaseEventSchema.extend({
  type: z.literal('recap_view'),
  payload: z
    .object({
      action: z.enum(['offered', 'viewed', 'dismissed']),
      trigger: z.enum(['return_prompt', 'manual']),
      at_node_id: nodeIdSchema,
      dormancy: z.enum(['<1d', '1-3d', '4-7d', '8-30d', '31d+'])
    })
    .strict()
}).strict()

export const SpoilerWarningEventSchema = BaseEventSchema.extend({
  type: z.literal('spoiler_warning'),
  payload: z
    .object({
      action: z.enum(['shown', 'accepted', 'cancelled']),
      surface: z.enum(['share', 'copy_link']),
      target_node_id: nodeIdSchema
    })
    .strict()
}).strict()

export const AccessGateEventSchema = BaseEventSchema.extend({
  type: z.literal('access_gate'),
  payload: z
    .object({
      gate: z.enum(['purchase', 'subscription', 'wait']),
      signed_in: z.boolean(),
      unlocks_at: iso8601Schema.optional()
    })
    .strict()
    .superRefine((p, ctx) => {
      if (p.gate !== 'wait' && p.unlocks_at !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['unlocks_at'], message: 'unlocks_at is only for the wait gate' })
      }
    })
}).strict()

// The six reading events.
export const ReadingEventSchema = z.discriminatedUnion('type', [
  RereadEventSchema,
  SharedEntryEventSchema,
  CompanionOpenEventSchema,
  RecapViewEventSchema,
  SpoilerWarningEventSchema,
  AccessGateEventSchema
])

// Any event (discriminated union by 'type').
export const BookManifestEventSchema = z.discriminatedUnion('type', [
  HeartbeatEventSchema,
  ChapterTransitionEventSchema,
  BookLifecycleEventSchema,
  InteractionEventSchema,
  AppLifecycleEventSchema,
  RereadEventSchema,
  SharedEntryEventSchema,
  CompanionOpenEventSchema,
  RecapViewEventSchema,
  SpoilerWarningEventSchema,
  AccessGateEventSchema
])

// Event batch (what gets sent to the API): 1 to 100 events.
export const EventBatchSchema = z
  .object({
    events: z.array(BookManifestEventSchema).min(1).max(100)
  })
  .strict()

export type ReadingEvent = z.infer<typeof ReadingEventSchema>
export type BookManifestEvent = z.infer<typeof BookManifestEventSchema>
export type EventBatch = z.infer<typeof EventBatchSchema>

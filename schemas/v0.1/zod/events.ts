import { z } from 'zod'
import { didSchema, semverSchema, iso8601Schema } from './validators'

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
    progress_percentage: z.number().min(0).max(1)
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
    annotation: z.string().optional()
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

// Union type for any event (discriminated union by 'type')
export const BDSEventSchema = z.discriminatedUnion('type', [
  HeartbeatEventSchema,
  ChapterTransitionEventSchema,
  BookLifecycleEventSchema,
  InteractionEventSchema,
  AppLifecycleEventSchema
])

// Event batch (what gets sent to the API)
export const EventBatchSchema = z.object({
  events: z.array(BDSEventSchema).min(1).max(100)
}).strict()

// v0.3. The five v0.3 reading events, and the v0.3 event union (v0.1's five, unchanged, plus these).
// Every payload is closed (.strict()): positions, ids and enums only; no text, no free strings, no exact
// durations, nothing that identifies a person. See docs/v0.3/reading-events.md.
import { z } from 'zod';
import { didSchema, semverSchema, iso8601Schema, nodeIdSchema, entityIdSchema } from './validators';
import { HeartbeatEventSchema, ChapterTransitionEventSchema, BookLifecycleEventSchema, InteractionEventSchema, AppLifecycleEventSchema } from '../../v0.1/zod/events';
// Same context as v0.1 (the v0.1 schema does not export it).
const EventContextSchema = z
    .object({
    reader_id: didSchema,
    book_id: didSchema,
    manifest_id: didSchema,
    manifest_version: semverSchema,
    chapter_id: didSchema,
    chapter_version: semverSchema,
    device_type: z.enum(['mobile', 'tablet', 'desktop']),
    app_id: z.string().min(1),
    app_version: semverSchema
})
    .strict();
const BaseEventSchema = z.object({
    id: z.string().uuid(),
    timestamp: iso8601Schema,
    session_id: z.string().uuid(),
    context: EventContextSchema
});
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
}).strict();
// shared_entry must not be linkable to a reader: its envelope has no reader_id and no session_id.
const AnonymousEventContextSchema = EventContextSchema.omit({ reader_id: true }).strict();
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
            });
        }
    })
}).strict();
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
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['entity_id'], message: 'An entity card names its entity' });
        }
    })
}).strict();
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
}).strict();
export const SpoilerWarningEventSchema = BaseEventSchema.extend({
    type: z.literal('spoiler_warning'),
    payload: z
        .object({
        action: z.enum(['shown', 'accepted', 'cancelled']),
        surface: z.enum(['share', 'copy_link']),
        target_node_id: nodeIdSchema
    })
        .strict()
}).strict();
export const ReadingEventV03Schema = z.discriminatedUnion('type', [
    RereadEventSchema,
    SharedEntryEventSchema,
    CompanionOpenEventSchema,
    RecapViewEventSchema,
    SpoilerWarningEventSchema
]);
export const BookManifestEventV03Schema = z.discriminatedUnion('type', [
    HeartbeatEventSchema,
    ChapterTransitionEventSchema,
    BookLifecycleEventSchema,
    InteractionEventSchema,
    AppLifecycleEventSchema,
    RereadEventSchema,
    SharedEntryEventSchema,
    CompanionOpenEventSchema,
    RecapViewEventSchema,
    SpoilerWarningEventSchema
]);
export const EventBatchV03Schema = z
    .object({
    events: z.array(BookManifestEventV03Schema).min(1).max(100)
})
    .strict();

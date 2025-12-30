import { describe, it, expect } from 'vitest'
import {
  HeartbeatEventSchema,
  ChapterTransitionEventSchema,
  BookLifecycleEventSchema,
  InteractionEventSchema,
  AppLifecycleEventSchema,
  BDSEventSchema,
  EventBatchSchema
} from '../../zod/events'
import eventBatch from '../../examples/events/batch-valid.json'

describe('Event Schemas', () => {
  it('should validate heartbeat event', () => {
    const event = eventBatch.events.find(e => e.type === 'heartbeat')
    expect(() => HeartbeatEventSchema.parse(event)).not.toThrow()
  })

  it('should validate chapter_transition event', () => {
    const event = eventBatch.events.find(e => e.type === 'chapter_transition')
    expect(() => ChapterTransitionEventSchema.parse(event)).not.toThrow()
  })

  it('should validate book_lifecycle event', () => {
    const event = eventBatch.events.find(e => e.type === 'book_lifecycle')
    expect(() => BookLifecycleEventSchema.parse(event)).not.toThrow()
  })

  it('should validate interaction event', () => {
    const event = eventBatch.events.find(e => e.type === 'interaction')
    expect(() => InteractionEventSchema.parse(event)).not.toThrow()
  })

  it('should validate app_lifecycle event', () => {
    const event = eventBatch.events.find(e => e.type === 'app_lifecycle')
    expect(() => AppLifecycleEventSchema.parse(event)).not.toThrow()
  })

  it('should require session_id and context for all events', () => {
    const invalidEvent = {
      id: 'uuid-123',
      timestamp: '2025-01-01T00:00:00Z',
      type: 'heartbeat',
      payload: {
        duration_seconds: 30,
        active_seconds: 28,
        start_node_id: 'p-001',
        end_node_id: 'p-003',
        focus_node_id: 'p-002',
        progress_percentage: 0.5
      }
      // missing session_id and context
    }

    expect(() => HeartbeatEventSchema.parse(invalidEvent)).toThrow()
  })

  it('should validate event batch', () => {
    expect(() => EventBatchSchema.parse(eventBatch)).not.toThrow()
  })

  it('should validate discriminated union of events', () => {
    eventBatch.events.forEach(event => {
      expect(() => BDSEventSchema.parse(event)).not.toThrow()
    })
  })
})

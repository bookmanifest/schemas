/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Major milestones in book reading (started, completed)
 */
export type BookLifecycleEvent = EventEnvelope & {
  type?: 'book_lifecycle';
  payload?: {
    /**
     * Lifecycle action
     */
    action: 'started' | 'completed';
    /**
     * What triggered this action
     */
    trigger: string;
    /**
     * Total active reading time
     */
    total_active_reading_time_seconds: number;
    /**
     * Book completion percentage
     */
    completion_percentage: number;
    /**
     * Number of chapters started
     */
    chapters_started: number;
    /**
     * Number of chapters completed
     */
    chapters_completed: number;
  };
  [k: string]: unknown;
};
/**
 * When the event occurred (client time)
 */
export type ISO8601DateTime = string;
/**
 * Decentralized Identifier for BDS entities
 */
export type BDSDID = string;
/**
 * Semantic versioning string (major.minor.patch)
 */
export type SemanticVersion = string;

/**
 * Common structure for all BDS events
 */
export interface EventEnvelope {
  /**
   * Unique event identifier
   */
  id: string;
  timestamp: ISO8601DateTime;
  /**
   * Event type
   */
  type: 'heartbeat' | 'chapter_transition' | 'book_lifecycle' | 'interaction' | 'app_lifecycle';
  /**
   * Groups events from one reading session
   */
  session_id: string;
  context: {
    reader_id: BDSDID;
    book_id: BDSDID;
    manifest_id: BDSDID;
    manifest_version: SemanticVersion;
    chapter_id: BDSDID;
    chapter_version: SemanticVersion;
    device_type: 'mobile' | 'tablet' | 'desktop';
    app_id: string;
    app_version: SemanticVersion;
  };
  /**
   * Event-specific data
   */
  payload: {
    [k: string]: unknown;
  };
}

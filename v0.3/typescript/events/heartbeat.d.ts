/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Periodic reading activity tracking
 */
export type HeartbeatEvent = EventEnvelope & {
  type?: 'heartbeat';
  payload?: {
    /**
     * Time since last heartbeat
     */
    duration_seconds: number;
    /**
     * Time with detected user interaction
     */
    active_seconds: number;
    /**
     * First visible paragraph
     */
    start_node_id: string;
    /**
     * Last visible paragraph
     */
    end_node_id: string;
    /**
     * Center of viewport
     */
    focus_node_id: string;
    /**
     * Position in chapter (0-1)
     */
    progress_percentage: number;
    /**
     * Optional. The paragraphs the screen or page showed, in reading order, each with the number of its words that were on it. A paginated reader knows these exactly; a consumer then shares the heartbeat's time by these words instead of estimating them from the range.
     *
     * @minItems 1
     * @maxItems 200
     */
    visible?: [
      {
        /**
         * Paragraph id
         */
        node_id: string;
        /**
         * Words of the paragraph that were shown
         */
        words: number;
      },
      ...{
        /**
         * Paragraph id
         */
        node_id: string;
        /**
         * Words of the paragraph that were shown
         */
        words: number;
      }[]
    ];
  };
  [k: string]: unknown;
};
/**
 * When the event occurred (client time)
 */
export type ISO8601DateTime = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID = string;
/**
 * Semantic versioning string (major.minor.patch)
 */
export type SemanticVersion = string;

/**
 * Common structure of every event except `shared_entry`, which has its own envelope without identity (envelope-anonymous.json). `reader_id` is a pseudonymous, random reader id (never derived from the device, deleted on opt-out); it is used only to count distinct readers for aggregation thresholds and is never shown to authors.
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
  type:
    | 'heartbeat'
    | 'chapter_transition'
    | 'book_lifecycle'
    | 'interaction'
    | 'app_lifecycle'
    | 'reread'
    | 'companion_open'
    | 'recap_view'
    | 'spoiler_warning'
    | 'access_gate';
  /**
   * Groups events from one reading session
   */
  session_id: string;
  context: {
    reader_id: BookManifestDID;
    book_id: BookManifestDID;
    manifest_id: BookManifestDID;
    manifest_version: SemanticVersion;
    chapter_id: BookManifestDID;
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

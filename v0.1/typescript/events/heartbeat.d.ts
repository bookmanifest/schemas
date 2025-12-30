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
 * Common structure for all Book Manifest events
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

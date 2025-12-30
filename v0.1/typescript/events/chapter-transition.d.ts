/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Fired when the user moves between chapters
 */
export type ChapterTransitionEvent = EventEnvelope & {
  type?: 'chapter_transition';
  payload?: {
    from_chapter_id: BookManifestDID1;
    from_chapter_version: SemanticVersion1;
    /**
     * Chapter being entered (null if closing book)
     */
    to_chapter_id?: BookManifestDID | null;
    /**
     * Version of chapter being entered
     */
    to_chapter_version?: SemanticVersion | null;
    /**
     * How the transition happened
     */
    trigger: 'scroll_end' | 'next_button' | 'prev_button' | 'toc_jump' | 'link_internal' | 'book_close';
    /**
     * Total time spent in the chapter
     */
    time_in_chapter_seconds: number;
    /**
     * How much of the chapter was read
     */
    chapter_completion_percentage: number;
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
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID1 = string;
/**
 * Semantic versioning string (major.minor.patch)
 */
export type SemanticVersion1 = string;

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

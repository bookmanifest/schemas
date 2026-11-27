/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * The reader went back to an earlier paragraph and stayed there: the destination of a backward jump. Carries two positions and how the reader got there, nothing else. The origin is the context chapter plus `from_node_id`; the destination may be in another chapter.
 */
export type ReReadEvent = EventEnvelope & {
  type?: 'reread';
  payload?: {
    /**
     * Paragraph the reader was on, in the context chapter.
     */
    from_node_id: string;
    to_chapter_id: BookManifestDID1;
    to_chapter_version: SemanticVersion;
    /**
     * Paragraph returned to.
     */
    to_node_id: string;
    /**
     * How the reader went back.
     */
    method: 'scroll' | 'toc_jump' | 'link_internal' | 'search' | 'companion';
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
    | 'spoiler_warning';
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

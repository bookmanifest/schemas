/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * User interactions with content (highlights, annotations, etc.)
 */
export type InteractionEvent = EventEnvelope & {
  type?: 'interaction';
  payload?: {
    /**
     * Type of interaction
     */
    action: 'highlight' | 'comment' | 'copy' | 'share' | 'bookmark' | 'search_definition' | 'link_click';
    /**
     * ProseMirror node ID
     */
    target_node_id: string;
    /**
     * Type of node
     */
    target_node_type: string;
    /**
     * Selected text (if applicable)
     */
    text_selection?: string;
    /**
     * Length of selected text
     */
    selection_length: number;
    /**
     * User annotation (if applicable)
     */
    annotation?: string;
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

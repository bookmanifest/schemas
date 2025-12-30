/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for this library entry
 */
export type BDSDID = string;
/**
 * Reader reference
 */
export type BDSDID1 = string;
/**
 * Book reference
 */
export type BDSDID2 = string;
/**
 * Which version the reader is on
 */
export type BDSDID3 = string;
/**
 * When added to library
 */
export type ISO8601DateTime = string;
export type ISO8601DateTime1 = string;
/**
 * Current chapter
 */
export type BDSDID4 = string;
/**
 * Version of current chapter
 */
export type SemanticVersion = string;

/**
 * A book in a reader's personal library. Tracks reading status.
 */
export interface LibraryEntry {
  id: BDSDID;
  reader_id: BDSDID1;
  book_id: BDSDID2;
  manifest_id: BDSDID3;
  /**
   * Reading status
   */
  status: 'want-to-read' | 'reading' | 'finished' | 'abandoned' | 'paused';
  added_at: ISO8601DateTime;
  /**
   * When started reading
   */
  started_at?: ISO8601DateTime1 | null;
  /**
   * When finished
   */
  finished_at?: ISO8601DateTime1 | null;
  current_chapter_id?: BDSDID4;
  current_chapter_version?: SemanticVersion;
  /**
   * Position in chapter (0-1)
   */
  current_position?: number;
  /**
   * ProseMirror node ID for precise position
   */
  current_node_id?: string;
}

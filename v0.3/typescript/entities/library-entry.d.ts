/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for this library entry
 */
export type BookManifestDID = string;
/**
 * Reader reference
 */
export type BookManifestDID1 = string;
/**
 * Book reference
 */
export type BookManifestDID2 = string;
/**
 * Which version the reader is on
 */
export type BookManifestDID3 = string;
/**
 * When added to library
 */
export type ISO8601DateTime = string;
export type ISO8601DateTime1 = string;
/**
 * Current chapter
 */
export type BookManifestDID4 = string;
/**
 * Version of current chapter
 */
export type SemanticVersion = string;

/**
 * A book in a reader's personal library. Tracks reading status.
 */
export interface LibraryEntry {
  id: BookManifestDID;
  reader_id: BookManifestDID1;
  book_id: BookManifestDID2;
  manifest_id: BookManifestDID3;
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
  current_chapter_id?: BookManifestDID4;
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

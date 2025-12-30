/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for this manifest
 */
export type BookManifestDID = string;
/**
 * Reference to parent Book
 */
export type BookManifestDID1 = string;
/**
 * Version number (major.minor.patch)
 */
export type SemanticVersion = string;
/**
 * Publication timestamp
 */
export type ISO8601DateTime = string;
/**
 * Chapter reference
 */
export type BookManifestDID2 = string;
/**
 * Specific version of the chapter
 */
export type SemanticVersion1 = string;

/**
 * An immutable snapshot of a book version. Created each time an author publishes changes.
 */
export interface Manifest {
  id: BookManifestDID;
  book_id: BookManifestDID1;
  version: SemanticVersion;
  /**
   * Description of changes in this version
   */
  changelog?: string;
  published_at: ISO8601DateTime;
  /**
   * Table of contents with chapter references
   *
   * @minItems 1
   * @maxItems 1000
   */
  toc: [
    {
      chapter_id: BookManifestDID2;
      chapter_version: SemanticVersion1;
      /**
       * Reading order position
       */
      order: number;
      /**
       * Chapter title (for display)
       */
      title: string;
      /**
       * Grouping label (e.g., 'Part 1', 'Prologue')
       */
      section?: string;
    },
    ...{
      chapter_id: BookManifestDID2;
      chapter_version: SemanticVersion1;
      /**
       * Reading order position
       */
      order: number;
      /**
       * Chapter title (for display)
       */
      title: string;
      /**
       * Grouping label (e.g., 'Part 1', 'Prologue')
       */
      section?: string;
    }[]
  ];
  stats: {
    /**
     * Number of chapters
     */
    total_chapters: number;
    /**
     * Total word count
     */
    word_count: number;
    /**
     * Estimated reading time
     */
    estimated_reading_time_minutes: number;
  };
}

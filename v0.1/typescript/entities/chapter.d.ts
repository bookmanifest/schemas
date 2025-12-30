/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique ID for this specific version (includes version in DID)
 */
export type BookManifestDID = string;
/**
 * Base chapter identifier (version-agnostic)
 */
export type BookManifestDID1 = string;
/**
 * Reference to parent Book
 */
export type BookManifestDID2 = string;
/**
 * Chapter version
 */
export type SemanticVersion = string;
/**
 * Creation timestamp
 */
export type ISO8601DateTime = string;

/**
 * The content of a specific version of a chapter. Each version is a separate, immutable document.
 */
export interface Chapter {
  id: BookManifestDID;
  chapter_id: BookManifestDID1;
  book_id: BookManifestDID2;
  version: SemanticVersion;
  /**
   * Chapter title
   */
  title: string;
  /**
   * URL-friendly identifier
   */
  slug: string;
  created_at: ISO8601DateTime;
  metadata: {
    /**
     * Word count
     */
    word_count: number;
    /**
     * Estimated reading time
     */
    estimated_reading_time_minutes: number;
    /**
     * Point of view character (for analytics)
     */
    pov_character?: string;
    /**
     * Content tags (for analytics)
     *
     * @maxItems 20
     */
    tags?:
      | []
      | [string]
      | [string, string]
      | [string, string, string]
      | [string, string, string, string]
      | [string, string, string, string, string]
      | [string, string, string, string, string, string]
      | [string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string, string, string, string]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ];
  };
  content: ProseMirrorDocument;
}
/**
 * Chapter content in ProseMirror JSON format
 */
export interface ProseMirrorDocument {
  /**
   * Node type
   */
  type: string;
  /**
   * Child nodes
   */
  content?: ProseMirrorDocument1[];
  /**
   * Node attributes
   */
  attrs?: {
    [k: string]: unknown;
  };
  /**
   * Text marks (for inline formatting)
   */
  marks?: {
    type: string;
    attrs?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }[];
  /**
   * Text content (for text nodes)
   */
  text?: string;
  [k: string]: unknown;
}
/**
 * ProseMirror JSON document structure for chapter content
 */
export interface ProseMirrorDocument1 {
  /**
   * Node type
   */
  type: string;
  /**
   * Child nodes
   */
  content?: ProseMirrorDocument1[];
  /**
   * Node attributes
   */
  attrs?: {
    [k: string]: unknown;
  };
  /**
   * Text marks (for inline formatting)
   */
  marks?: {
    type: string;
    attrs?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }[];
  /**
   * Text content (for text nodes)
   */
  text?: string;
  [k: string]: unknown;
}

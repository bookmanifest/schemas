/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for the series
 */
export type BDSDID = string;
/**
 * Decentralized Identifier for BDS entities
 */
export type BDSDID1 = string;
/**
 * Series cover art URL
 */
export type URL = string;
/**
 * Creation timestamp
 */
export type ISO8601DateTime = string;
/**
 * Last update timestamp
 */
export type ISO8601DateTime1 = string;

/**
 * A collection of related books in reading order (trilogies, sagas, etc.)
 */
export interface Series {
  id: BDSDID;
  /**
   * Series title
   */
  title: string;
  /**
   * Series description
   */
  description?: string;
  /**
   * Authors (supports multiple for collaborations)
   *
   * @minItems 1
   * @maxItems 50
   */
  author_ids: [BDSDID1, ...BDSDID1[]];
  cover_image?: URL;
  /**
   * Genre tags
   *
   * @maxItems 10
   */
  genres?:
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
    | [string, string, string, string, string, string, string, string, string, string];
  /**
   * Series status
   */
  status: 'ongoing' | 'completed' | 'hiatus';
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime1;
}

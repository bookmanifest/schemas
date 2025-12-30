/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for the publisher
 */
export type BDSDID = string;
/**
 * Publisher logo URL
 */
export type URL = string;
/**
 * Official website URL
 */
export type URL1 = string;
/**
 * Creation timestamp
 */
export type ISO8601DateTime = string;
/**
 * Last update timestamp
 */
export type ISO8601DateTime1 = string;

/**
 * Optional entity for traditional publishers or imprints
 */
export interface Publisher {
  id: BDSDID;
  /**
   * Human-readable handle (can use custom domain)
   */
  handle: string;
  /**
   * Publisher name
   */
  name: string;
  logo?: URL;
  website?: URL1;
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime1;
}

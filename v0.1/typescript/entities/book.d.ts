/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for the book
 */
export type BookManifestDID = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID1 = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID2 = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID3 = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID4 = string;
/**
 * Cover art URL
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
 * The core entity representing a literary work. Contains stable metadata and points to the latest published version (Manifest).
 */
export interface Book {
  id: BookManifestDID;
  /**
   * Book title
   */
  title: string;
  /**
   * URL-friendly identifier
   */
  slug: string;
  /**
   * Authors (supports co-authorship)
   *
   * @minItems 1
   * @maxItems 50
   */
  author_ids: [BookManifestDID1, ...BookManifestDID1[]];
  publisher_id?: BookManifestDID2;
  series_id?: BookManifestDID3;
  /**
   * Position in series
   */
  series_order?: number;
  /**
   * Primary language code (ISO 639-1)
   */
  language: string;
  latest_manifest_id: BookManifestDID4;
  metadata: {
    cover_image?: URL;
    /**
     * Book blurb/synopsis
     */
    description?: string;
    /**
     * Genre classifications
     *
     * @maxItems 20
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
    /**
     * Additional tags for discovery
     *
     * @maxItems 50
     */
    tags?: string[];
    /**
     * Content advisories
     *
     * @maxItems 20
     */
    content_warnings?:
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
    /**
     * ISBN if traditionally published
     */
    isbn?: string;
    [k: string]: unknown;
  };
  pricing?: {
    /**
     * Pricing model
     */
    model: 'free' | 'paid' | 'pay-what-you-want' | 'subscription';
    /**
     * Price amount (if applicable)
     */
    price?: number;
    /**
     * Currency code (ISO 4217)
     */
    currency?: string;
    [k: string]: unknown;
  };
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime1;
}

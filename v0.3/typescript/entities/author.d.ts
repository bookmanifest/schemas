/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for the author
 */
export type BookManifestDID = string;
/**
 * Profile image URL
 */
export type URL = string;
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
 * The creator of books in Book Manifest
 */
export interface Author {
  id: BookManifestDID;
  /**
   * Human-readable handle (can use custom domain)
   */
  handle: string;
  /**
   * Display name of the author
   */
  name: string;
  /**
   * Author biography
   */
  bio?: string;
  avatar?: URL;
  /**
   * External links (website, social media)
   *
   * @maxItems 10
   */
  links?:
    | []
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ]
    | [
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        },
        {
          type: 'website' | 'bluesky' | 'twitter' | 'mastodon' | 'instagram' | 'other';
          url: URL1;
          [k: string]: unknown;
        }
      ];
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime1;
}

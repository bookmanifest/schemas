/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Unique identifier for the reader
 */
export type BookManifestDID = string;
/**
 * Profile image URL
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
 * The user who reads books. Owns their reading data.
 */
export interface Reader {
  id: BookManifestDID;
  /**
   * Human-readable handle (optional for readers)
   */
  handle?: string;
  /**
   * Display name
   */
  display_name?: string;
  avatar?: URL;
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime1;
  /**
   * Reading preferences
   */
  preferences?: {
    /**
     * UI theme preference
     */
    theme?: 'light' | 'dark' | 'sepia';
    /**
     * Font size preference
     */
    font_size?: 'small' | 'medium' | 'large' | 'xlarge';
    /**
     * Font family preference
     */
    font_family?: 'serif' | 'sans-serif' | 'monospace';
    /**
     * Line height preference
     */
    line_height?: 'compact' | 'normal' | 'relaxed' | 'loose';
  };
}

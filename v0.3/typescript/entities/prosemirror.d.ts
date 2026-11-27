/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * ProseMirror JSON document structure for chapter content
 */
export interface ProseMirrorDocument {
  /**
   * Node type
   */
  type: string;
  /**
   * Child nodes
   */
  content?: ProseMirrorDocument[];
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

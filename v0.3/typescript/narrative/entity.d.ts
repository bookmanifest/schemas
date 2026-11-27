/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId = string;
/**
 * First paragraph after which a reader may know the entity under `name` (usually its first appearance).
 */
export type ParagraphAddress = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress1 = string;

/**
 * A character, place, organisation or object the other pieces refer to by id. Only what other pieces need: the full knowledge about an entity lives in the producer's own output.
 */
export interface Entity {
  id: EntityId;
  kind: 'character' | 'place' | 'org' | 'object';
  /**
   * The name a reader who has passed `revealed_at` knows the entity by.
   */
  name: string;
  revealed_at: ParagraphAddress;
  /**
   * @maxItems 50
   */
  aliases?: {
    name: string;
    revealed_at: ParagraphAddress1;
  }[];
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
}

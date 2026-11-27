/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * What one character knows or believes about one key truth, and from where. Two positions are kept apart: `since`, from which paragraph the character holds it (the character's knowing), and `revealed_at`, from which paragraph a reader may be shown that the character holds it. Both are distinct from the truth's own `revealed_at` (the reader's knowing of the truth). Beliefs may be false.
 */
export type KnowledgeLink = Support & {
  [k: string]: unknown;
} & {
  id: string;
  truth: string;
  knower: EntityId;
  /**
   * `knows`: holds the truth and is right. `believes`: holds something firmly, right or wrong. `suspects`: entertains it without commitment.
   */
  stance: 'knows' | 'believes' | 'suspects';
  /**
   * true: the character holds the truth as stated. false: the character holds its contrary (a false belief). `knows` implies true.
   */
  holds: boolean;
  /**
   * Paragraph from which the character holds it, or `before_text` when the character holds it before the narrative begins.
   */
  since: ParagraphAddress | 'before_text';
  revealed_at: ParagraphAddress1;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * Paragraphs whose text supports the item. An address that does not exist in the manifest version invalidates the item.
 *
 * @minItems 1
 */
export type AddressList = [ParagraphAddress, ...ParagraphAddress[]];
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress = string;
/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress1 = string;

/**
 * How an item is grounded in the text. Every assertion in the layer carries it.
 */
export interface Support {
  /**
   * `asserted`: one cited paragraph states it (a time marker, a named place, a line of dialogue). `inferred`: it follows from reading, not from one sentence; `quote` is then required.
   */
  basis: 'asserted' | 'inferred';
  evidence: AddressList;
  /**
   * The literal words, copied from one of the evidence paragraphs, that justify the item. Required when `basis` is `inferred`.
   */
  quote?: string;
  /**
   * Producer's confidence in the item, 0 to 1. Informative; consumers must not treat it as a calibrated probability.
   */
  confidence?: number;
  /**
   * Verification state: `verified`, `doubtful` (shown as such), `review` (needs a human). Absent means not verified.
   */
  status?: 'verified' | 'doubtful' | 'review';
  [k: string]: unknown;
}

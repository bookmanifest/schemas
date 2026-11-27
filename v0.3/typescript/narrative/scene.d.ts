/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * A contiguous range of paragraphs, in reading order, with one place, one story time and one cast. A scene may cross a chapter boundary. Scenes never overlap; they need not cover every paragraph. The support cites the paragraphs that mark the scene's boundaries.
 */
export type Scene = Support & {
  id: string;
  start: ParagraphAddress1;
  end: ParagraphAddress2;
  place?: EntityId;
  /**
   * When the scene happens in the story.
   */
  time?: Support & {
    [k: string]: unknown;
  };
  /**
   * Position of the scene in story (fabula) order, 1 = earliest. Scenes may share a value when the order between them is unknown. Comparing it with reading order shows the anachronies (Genette's order).
   */
  story_order?: number;
  /**
   * Characters present in the scene.
   *
   * @maxItems 200
   */
  cast?: EntityId1[];
  duration?: StoryDuration;
  /**
   * Id of an earlier scene this one resumes after an interruption (same place, time and cast, broken by other text).
   */
  continues?: string;
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
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress1 = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress2 = string;
/**
 * Where the scene happens: an entity of kind `place`. Absent when the producer cannot tell.
 */
export type EntityId = string;
/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId1 = string;
/**
 * How much story time a stretch of text covers (Genette's duration). Approximate by design: a magnitude in one unit, a range, zero (a pause: text, but the story does not advance), or explicitly unknown. Absent means the producer stayed silent.
 */
export type StoryDuration = Support & {
  unit?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  /**
   * Approximate magnitude in `unit`. 0 marks a pause.
   */
  value?: number;
  min?: number;
  max?: number;
  /**
   * True when the text gives no way to tell how much time passes. Then no unit or magnitude.
   */
  unknown?: true;
  [k: string]: unknown;
} & {
  [k: string]: unknown;
};

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

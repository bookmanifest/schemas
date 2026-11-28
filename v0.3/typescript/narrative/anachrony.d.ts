/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * A jump in story time over a paragraph or a contiguous range of paragraphs: the narration tells what happened earlier than the story's present (`analepsis`: a flashback, backstory, a past told later than it happened) or what will happen later (`prolepsis`: an announcement). Inside a scene, between scenes or outside any scene. Spans never overlap.
 */
export type Anachrony = Support & {
  id: string;
  start: ParagraphAddress;
  end?: ParagraphAddress1;
  /**
   * `analepsis`: the narration goes back to an earlier story time. `prolepsis`: it goes forward to a later one.
   */
  kind: 'analepsis' | 'prolepsis';
  /**
   * How far it jumps, as the text says it, in the book's language: «años atrás», «when she was a child», «the following spring». Not normalised.
   */
  reach?: string;
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
  /**
   * Who verified the item. `producer`: the program that wrote the layer checked the item against its cited paragraphs. `author`: the book's author confirmed it by hand. Allowed only when `status` is `verified`; absent says nothing about who verified it.
   *
   * @minItems 1
   * @maxItems 2
   */
  verified_by?: ['producer' | 'author'] | ['producer' | 'author', 'producer' | 'author'];
  [k: string]: unknown;
}

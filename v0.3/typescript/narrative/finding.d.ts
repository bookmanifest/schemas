/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * @minItems 1
 */
export type AddressList = [ParagraphAddress, ...ParagraphAddress[]];
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress = string;

/**
 * Something the author may not know about their own book: a continuity slip, a long absence, an imbalance of voices, a divergence between reading and story order, an open question. Always private to the author: a finding can never be public.
 */
export interface Finding {
  id: string;
  kind: 'continuity' | 'absence' | 'voice_balance' | 'reading_vs_story_order' | 'open_question';
  /**
   * What was found, described and never judged.
   */
  text: string;
  /**
   * Ids of other layer items the finding is about.
   */
  refs?: string[];
  evidence: AddressList;
  visibility: 'author';
}

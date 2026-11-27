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
  setting?: Summary;
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
 * The frame that holds over the scene (where, when, on which plane, in whose voice, how it is told, weather, light, company), with its own support. Paragraph-level detail goes in the layer's setting spans.
 */
export type Summary = Frame;
/**
 * The slots of a setting, with their support. At least one slot is present. Shared by setting spans and by a scene's `setting`.
 */
export type Frame = Support & {
  [k: string]: unknown;
} & {
  /**
   * Where the body of the narration is. `interior`: inside a building or room. `exterior`: in the open. `vehicle`: inside or on a vehicle (a coach, a ship, a train). `no_place`: there is no where, as in a letter, a summary of years or a narrator's reflection; this differs from an absent `enclosure`, which means the text does not say.
   */
  enclosure?: 'interior' | 'exterior' | 'vehicle' | 'no_place';
  place?: EntityId2;
  /**
   * The vehicle's name or a short description, in the book's language. Only when `enclosure` is `vehicle`.
   */
  vehicle?: string;
  /**
   * What lies around the narration: `city`, `nature` or `water`. Only when `enclosure` is `exterior` or `vehicle`.
   */
  surroundings?: 'city' | 'nature' | 'water';
  /**
   * The hour of the narration, in six parts.
   */
  time_of_day?: 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk' | 'night';
  /**
   * The season of the narration.
   */
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  /**
   * The date or time reference as the text gives it, in the book's language: «25 de septiembre», «al día siguiente». Free text, not normalised.
   */
  date_or_reference?: string;
  /**
   * Which story the paragraphs tell. `main`: the main story. `memory`: an analepsis, a return to an earlier time of the story. `embedded`: a story told inside the story; `plane_level` then says how deep.
   */
  plane?: 'main' | 'memory' | 'embedded';
  /**
   * Depth of an embedded story: 1 is a story inside the main story, 2 a story inside that one. Required when `plane` is `embedded`, forbidden otherwise.
   */
  plane_level?: number;
  /**
   * Who tells, and in what medium. `outside_narrator`: a narrator who is not a character of the story told. `first_person_life`: a character telling their own life. `character_telling`: a character telling others aloud. `written_text`: a letter, a diary or a telegram. `theatre`: dialogue and directions with no narrator.
   */
  voice?: 'outside_narrator' | 'first_person_life' | 'character_telling' | 'written_text' | 'theatre';
  /**
   * How it is told. `scene`: action narrated as it happens. `dialogue`: characters' speech. `thought`: a character's thinking. `summary`: much story time told briefly. `description`: a pause, the story does not advance. `document`: a text quoted whole (a letter, a sign, a poem). `address`: the narrator speaking to the reader.
   */
  mode?: 'scene' | 'dialogue' | 'thought' | 'summary' | 'description' | 'document' | 'address';
  /**
   * The weather the text states.
   *
   * @minItems 1
   * @maxItems 6
   */
  weather?:
    | ['rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold']
    | ['rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold', 'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold']
    | [
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold'
      ]
    | [
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold'
      ]
    | [
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold'
      ]
    | [
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold',
        'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold'
      ];
  /**
   * The light, only when the hour does not already give it: `darkness`, `artificial` (a candle, a lamp, electric light) or `moon`.
   */
  light?: 'darkness' | 'artificial' | 'moon';
  /**
   * How many people are present: `alone` (one), `two`, `group` (a few) or `crowd` (many).
   */
  company?: 'alone' | 'two' | 'group' | 'crowd';
  /**
   * `true` when animals are present.
   */
  animals?: boolean;
  [k: string]: unknown;
};
/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId2 = string;

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

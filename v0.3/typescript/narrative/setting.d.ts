/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * A paragraph or a contiguous range of paragraphs, in reading order, over which the frame of the narration holds: where the text is, when, on which plane, in whose voice, how it is told, under what weather and light, and with how many people around. A producer asks these questions paragraph by paragraph and carries each answer forward until the text changes it; a span ends where any value changes. Every slot is optional and an absent slot means the text does not say. Spans never overlap and need not cover every paragraph.
 */
export type SettingSpan = Frame & {
  id: string;
  start: ParagraphAddress1;
  end?: ParagraphAddress2;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * The slots of a setting, with their support. At least one slot is present. Shared by setting spans and by a scene's `setting`.
 */
export type Frame = Support & {
  [k: string]: unknown;
} & Frame1 & {
    /**
     * Where the body of the narration is. `interior`: inside a building or room. `exterior`: in the open. `vehicle`: inside or on a vehicle (a coach, a ship, a train). `no_place`: there is no where, as in a letter, a summary of years or a narrator's reflection; this differs from an absent `enclosure`, which means the text does not say.
     */
    enclosure?: 'interior' | 'exterior' | 'vehicle' | 'no_place';
    place?: EntityId;
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
      | [Weather]
      | [Weather, Weather]
      | [Weather, Weather, Weather]
      | [Weather, Weather, Weather, Weather]
      | [Weather, Weather, Weather, Weather, Weather]
      | [Weather, Weather, Weather, Weather, Weather, Weather];
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
 * Paragraphs whose text supports the item. An address that does not exist in the manifest version invalidates the item.
 *
 * @minItems 1
 */
export type AddressList = [ParagraphAddress, ...ParagraphAddress[]];
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress = string;
export type Frame1 = {
  [k: string]: unknown;
};
/**
 * Where the narration is: an entity of kind `place`.
 */
export type EntityId = string;
/**
 * One kind of weather: `rain`, `storm`, `snow`, `wind`, `heat` or `cold`.
 */
export type Weather = 'rain' | 'storm' | 'snow' | 'wind' | 'heat' | 'cold';
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress1 = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress2 = string;

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

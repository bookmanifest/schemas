/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID = string;
/**
 * The manifest version every address resolves against.
 */
export type SemanticVersion = string;
export type ISO8601DateTime = string;
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
 * A contiguous range of paragraphs, in reading order, with one place, one story time and one cast. A scene may cross a chapter boundary. Scenes never overlap; they need not cover every paragraph. The support cites the paragraphs that mark the scene's boundaries.
 */
export type Scene = Support & {
  id: string;
  start: ParagraphAddress2;
  end: ParagraphAddress3;
  place?: EntityId1;
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
  cast?: EntityId[];
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
export type AddressList = [ParagraphAddress1, ...ParagraphAddress1[]];
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress2 = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress3 = string;
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
 * Who perceives over a paragraph or a contiguous range of paragraphs (a scene, or part of one). Distinct from who narrates: the narrating voice is a slot of setting spans (setting.json). `internal`: the text renders what `focalizer` perceives or thinks; `zero`: an unrestricted narrator, no character's perception; `external`: only what an outside observer could see. Spans never overlap.
 */
export type FocalizationSpan = Support & {
  [k: string]: unknown;
} & {
  id: string;
  start: ParagraphAddress1;
  end?: ParagraphAddress4;
  mode: 'internal' | 'zero' | 'external';
  focalizer?: EntityId3;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress4 = string;
/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId3 = string;
/**
 * A paragraph or a contiguous range of paragraphs, in reading order, over which the frame of the narration holds: where the text is, when, on which plane, in whose voice, how it is told, under what weather and light, and with how many people around. A producer asks these questions paragraph by paragraph and carries each answer forward until the text changes it; a span ends where any value changes. Every slot is optional and an absent slot means the text does not say. Spans never overlap and need not cover every paragraph.
 */
export type SettingSpan = Frame & {
  id: string;
  start: ParagraphAddress5;
  end?: ParagraphAddress6;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress5 = string;
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress6 = string;
/**
 * A jump in story time over a paragraph or a contiguous range of paragraphs: the narration tells what happened earlier than the story's present (`analepsis`: a flashback, backstory, a past told later than it happened) or what will happen later (`prolepsis`: an announcement). Inside a scene, between scenes or outside any scene. Spans never overlap.
 */
export type Anachrony = Support & {
  id: string;
  start: ParagraphAddress1;
  end?: ParagraphAddress7;
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
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress7 = string;
/**
 * One of the few revelations that matter in the book: a fact the reader does not know at first and learns at a precise point. A book has a handful, not hundreds. `evidence` cites the paragraphs of the reveal.
 */
export type KeyTruth = Support & {
  id: string;
  /**
   * The truth as one self-contained sentence in the book's language: full names, an explicit verb, one fact.
   */
  text: string;
  /**
   * Entities the truth is about.
   *
   * @maxItems 20
   */
  subjects?:
    | []
    | [EntityId]
    | [EntityId, EntityId]
    | [EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId, EntityId]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ]
    | [
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId,
        EntityId
      ];
  revealed_at: ParagraphAddress8;
  clues?: AddressList1;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress8 = string;
/**
 * Earlier paragraphs that hint at the truth before it is revealed (planted clues). All before `revealed_at`.
 *
 * @minItems 1
 */
export type AddressList1 = [ParagraphAddress1, ...ParagraphAddress1[]];
/**
 * What one character knows or believes about one key truth, and from where. Two positions are kept apart: `since`, from which paragraph the character holds it (the character's knowing), and `revealed_at`, from which paragraph a reader may be shown that the character holds it. Both are distinct from the truth's own `revealed_at` (the reader's knowing of the truth). Beliefs may be false. An optional `until` says when the character stops holding it.
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
  since: ParagraphAddress1 | 'before_text';
  revealed_at: ParagraphAddress9;
  /**
   * When the character stops holding it (a false belief corrected, a suspicion dropped, a secret forgotten, a death), with its own support. Absent: the text does not say the character stops holding it.
   */
  until?: Support;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress9 = string;
/**
 * Something that happens in the story, told at `at`, with its salience (Barthes). Operational rule: a `kernel` is an event the book picks up later (a later paragraph depends on it, refers back to it or follows from it), listed in `picked_up_at`; a `catalysis` is one the book does not pick up. The label describes, it never judges.
 */
export type StoryEventWithSalience = Support & {
  [k: string]: unknown;
} & {
  id: string;
  /**
   * The event as one self-contained sentence in the book's language.
   */
  text: string;
  at: ParagraphAddress10;
  salience: 'kernel' | 'catalysis';
  picked_up_at?: AddressList2;
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * A paragraph of one chapter version: `<chapter-slug>#p-NNN`. The slug is the Chapter's `slug`; `p-NNN` is the paragraph node id in that chapter version's content. An address is resolved against the manifest version named by the document that holds it, so the same address in another manifest version may point elsewhere. Reading order is the manifest's chapter order, then the paragraph number.
 */
export type ParagraphAddress10 = string;
/**
 * Later paragraphs that pick the event up. Required and non-empty for a kernel; absent for a catalysis. All after `at`.
 *
 * @minItems 1
 */
export type AddressList2 = [ParagraphAddress1, ...ParagraphAddress1[]];
/**
 * Two or more paragraphs that tell the same story event (Genette's repetitive frequency: told several times, happened once). Each telling may name its teller when it is not the main narrator.
 */
export type EventCoreference = Support & {
  id: string;
  /**
   * The story event told, when it is listed in `events`.
   */
  event?: string;
  /**
   * @minItems 2
   * @maxItems 50
   */
  tellings: [
    {
      at: ParagraphAddress1;
      teller?: EntityId4;
    },
    {
      at: ParagraphAddress1;
      teller?: EntityId4;
    },
    ...{
      at: ParagraphAddress1;
      teller?: EntityId4;
    }[]
  ];
  /**
   * Who may see the item. `public`: may be published with the book and shown to readers by spoiler-safe features, gated by the item's reveal position. `author`: private to the author, never published. Absent means `author` (fail closed).
   */
  visibility?: 'public' | 'author';
  [k: string]: unknown;
};
/**
 * Book-local id of a character, place, organisation or object in a narrative layer: `e:` followed by a lowercase slug. Stable across manifest versions of the same book where possible.
 */
export type EntityId4 = string;
/**
 * @minItems 1
 */
export type AddressList3 = [ParagraphAddress1, ...ParagraphAddress1[]];

/**
 * An optional document that describes how one manifest version of a book is told: scenes and their story duration, focalization, setting, anachronies, key truths and who knows them, event salience and event coreference, plus findings private to the author. It sits beside the manifest and does not change it: a book without a narrative layer is complete. Every address in it is resolved against the manifest version it names. Every piece is optional; the producer may stay silent but may not guess.
 */
export interface NarrativeLayer {
  /**
   * Version of this document's format.
   */
  narrative_layer: '0.3';
  book_id: BookManifestDID;
  manifest_id: BookManifestDID;
  manifest_version: SemanticVersion;
  /**
   * ISO 639-1 language of the text fields.
   */
  language: string;
  generated_at?: ISO8601DateTime;
  /**
   * The program that produced the layer. No personal data.
   */
  generator?: {
    name: string;
    version: string;
  };
  /**
   * @maxItems 5000
   */
  entities?: Entity[];
  /**
   * @maxItems 20000
   */
  scenes?: Scene[];
  /**
   * @maxItems 50000
   */
  focalization?: FocalizationSpan[];
  /**
   * @maxItems 50000
   */
  setting?: SettingSpan[];
  /**
   * @maxItems 20000
   */
  anachronies?: Anachrony[];
  /**
   * @maxItems 200
   */
  truths?: KeyTruth[];
  /**
   * @maxItems 5000
   */
  knowledge?: KnowledgeLink[];
  /**
   * @maxItems 20000
   */
  events?: StoryEventWithSalience[];
  /**
   * @maxItems 5000
   */
  coreference?: EventCoreference[];
  /**
   * @maxItems 5000
   */
  findings?: Finding[];
}
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
  evidence: AddressList3;
  visibility: 'author';
}

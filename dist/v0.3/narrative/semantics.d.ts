import type { NarrativeLayer, Entity, Scene, Duration, Focalization, Truth, Knowledge, StoryEvent, Coreference } from '../zod/narrative';
/** Reading order of the manifest version the layer names. */
export interface ReadingOrder {
    /** Chapter slugs in manifest order. */
    chapters: string[];
    /** Optional: paragraphs per chapter slug, to check that every address exists. */
    paragraphs?: Record<string, number>;
}
export interface SemanticIssue {
    code: 'duplicate_id' | 'unknown_reference' | 'wrong_entity_kind' | 'unknown_address' | 'range_reversed' | 'overlap' | 'revealed_before_evidence' | 'clue_after_reveal' | 'pickup_not_later' | 'continues_not_earlier' | 'public_references_private' | 'duplicate_telling';
    path: string;
    message: string;
}
interface Position {
    chapter: string;
    paragraph: number;
}
export declare function parseAddress(address: string): Position;
/**
 * Compare two addresses in reading order: negative if `a` comes first, 0 if equal, positive if after.
 * Returns null when they are in different chapters and the order of those chapters is unknown.
 */
export declare function compareAddresses(a: string, b: string, order?: ReadingOrder): number | null;
/** Semantic checks on a layer that already passed the schema. Returns every issue found; empty means valid. */
export declare function validateNarrativeLayer(layer: NarrativeLayer, order?: ReadingOrder): SemanticIssue[];
/**
 * What may be published: the public items only, findings never. A layer that passes validateNarrativeLayer
 * projects without dangling references, because public items may only point at public items.
 */
export declare function publicProjection(layer: NarrativeLayer): NarrativeLayer;
/** An item as a reader may see it: no quote, and only the evidence the reader has already passed. */
export type Cited<T> = Omit<T, 'quote' | 'evidence'> & {
    evidence?: string[];
};
/** A scene in the cut: `end` and `duration` only once the scene is over; `story_order` never. */
export type SceneView = Omit<Cited<Scene>, 'end' | 'duration' | 'time' | 'story_order'> & {
    end?: string;
    time?: Cited<NonNullable<Scene['time']>>;
    duration?: Cited<Duration>;
};
/** A spoiler-safe view: a public layer cut at a position. Not a layer document. */
export type SpoilerSafeView = Pick<NarrativeLayer, 'narrative_layer' | 'book_id' | 'manifest_id' | 'manifest_version' | 'language' | 'generated_at' | 'generator'> & {
    entities?: Entity[];
    scenes?: SceneView[];
    focalization?: Cited<Focalization>[];
    truths?: Cited<Truth>[];
    knowledge?: Cited<Knowledge>[];
    events?: Array<Omit<Cited<StoryEvent>, 'salience'> & {
        salience?: StoryEvent['salience'];
    }>;
    coreference?: Cited<Coreference>[];
};
/**
 * The spoiler-safe cut of a public layer for a reader at `position`: only what that reader may know, and no
 * address after `position` anywhere in it. Gates (docs/v0.3/narrative-layer.md, «Spoiler-safe use»): an entity
 * at its revealed_at (each alias at its own); a scene and a focalization span at their start; a truth at its
 * revealed_at; a knowledge link at the latest of its revealed_at, its since and its truth's revealed_at; a story
 * event at `at`, with only the pickups already passed and its salience only once the first pickup is passed; a
 * coreference once its second telling is passed. In every item shown, quotes are dropped and evidence is cut to
 * what the reader has passed; a scene shows its end and duration only once it is over, and never its story
 * order; a span shows its end only once passed. References to entities the reader has not met are dropped.
 * Items whose position cannot be ordered are left out.
 */
export declare function spoilerSafeCut(layer: NarrativeLayer, position: string, order: ReadingOrder): SpoilerSafeView;
export {};

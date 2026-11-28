/* Auto-generated from JSON Schema - DO NOT EDIT */

/**
 * Periodic reading activity tracking
 */
export type HeartbeatEvent = EventEnvelope & {
  type?: 'heartbeat';
  payload?: {
    /**
     * Time since last heartbeat
     */
    duration_seconds: number;
    /**
     * Time with detected user interaction
     */
    active_seconds: number;
    /**
     * First visible paragraph
     */
    start_node_id: string;
    /**
     * Last visible paragraph
     */
    end_node_id: string;
    /**
     * Center of viewport
     */
    focus_node_id: string;
    /**
     * Position in chapter (0-1)
     */
    progress_percentage: number;
    /**
     * Optional. The paragraphs the screen or page showed, in reading order, each with the number of its words that were on it. A paginated reader knows these exactly; a consumer then shares the heartbeat's time by these words instead of estimating them from the range.
     *
     * @minItems 1
     * @maxItems 200
     */
    visible?: [
      {
        /**
         * Paragraph id
         */
        node_id: string;
        /**
         * Words of the paragraph that were shown
         */
        words: number;
      },
      ...{
        /**
         * Paragraph id
         */
        node_id: string;
        /**
         * Words of the paragraph that were shown
         */
        words: number;
      }[]
    ];
  };
  [k: string]: unknown;
};
/**
 * When the event occurred (client time)
 */
export type ISO8601DateTime = string;
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID = string;
/**
 * Semantic versioning string (major.minor.patch)
 */
export type SemanticVersion = string;
/**
 * Fired when the user moves between chapters
 */
export type ChapterTransitionEvent = EventEnvelope & {
  type?: 'chapter_transition';
  payload?: {
    from_chapter_id: BookManifestDID1;
    from_chapter_version: SemanticVersion1;
    /**
     * Chapter being entered (null if closing book)
     */
    to_chapter_id?: BookManifestDID | null;
    /**
     * Version of chapter being entered
     */
    to_chapter_version?: SemanticVersion | null;
    /**
     * How the transition happened
     */
    trigger: 'scroll_end' | 'next_button' | 'prev_button' | 'toc_jump' | 'link_internal' | 'book_close';
    /**
     * Total time spent in the chapter
     */
    time_in_chapter_seconds: number;
    /**
     * How much of the chapter was read
     */
    chapter_completion_percentage: number;
  };
  [k: string]: unknown;
};
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID1 = string;
/**
 * Semantic versioning string (major.minor.patch)
 */
export type SemanticVersion1 = string;
/**
 * Major milestones in book reading (started, completed)
 */
export type BookLifecycleEvent = EventEnvelope & {
  type?: 'book_lifecycle';
  payload?: {
    /**
     * Lifecycle action
     */
    action: 'started' | 'completed';
    /**
     * What triggered this action
     */
    trigger: string;
    /**
     * Total active reading time
     */
    total_active_reading_time_seconds: number;
    /**
     * Book completion percentage
     */
    completion_percentage: number;
    /**
     * Number of chapters started
     */
    chapters_started: number;
    /**
     * Number of chapters completed
     */
    chapters_completed: number;
  };
  [k: string]: unknown;
};
/**
 * User interactions with content (highlights, annotations, etc.)
 */
export type InteractionEvent = EventEnvelope & {
  type?: 'interaction';
  payload?: {
    /**
     * Type of interaction
     */
    action: 'highlight' | 'comment' | 'copy' | 'share' | 'bookmark' | 'search_definition' | 'link_click';
    /**
     * ProseMirror node ID
     */
    target_node_id: string;
    /**
     * Type of node
     */
    target_node_type: string;
    /**
     * Selected text (if applicable)
     */
    text_selection?: string;
    /**
     * Length of selected text
     */
    selection_length: number;
    /**
     * User annotation (if applicable)
     */
    annotation?: string;
  };
  [k: string]: unknown;
};
/**
 * App state changes (open, background, foreground, close)
 */
export type AppLifecycleEvent = EventEnvelope & {
  type?: 'app_lifecycle';
  payload?: {
    /**
     * App lifecycle action
     */
    action: 'open' | 'background' | 'foreground' | 'close';
    /**
     * How the app was opened
     */
    source?: 'direct' | 'notification' | 'deeplink' | 'widget';
    /**
     * Time since last session
     */
    time_since_last_session_seconds?: number;
  };
  [k: string]: unknown;
};
/**
 * The reader went back to an earlier paragraph and stayed there: the destination of a backward jump. Carries two positions and how the reader got there, nothing else. The origin is the context chapter plus `from_node_id`; the destination may be in another chapter.
 */
export type ReReadEvent = EventEnvelope & {
  type?: 'reread';
  payload?: {
    /**
     * Paragraph the reader was on, in the context chapter.
     */
    from_node_id: string;
    to_chapter_id: BookManifestDID2;
    to_chapter_version: SemanticVersion;
    /**
     * Paragraph returned to.
     */
    to_node_id: string;
    /**
     * How the reader went back.
     */
    method: 'scroll' | 'toc_jump' | 'link_internal' | 'search' | 'companion';
  };
  [k: string]: unknown;
};
/**
 * Decentralized Identifier for Book Manifest entities using did:web method
 */
export type BookManifestDID2 = string;
/**
 * Entry into the book through a shared paragraph link, and whether that entry later leads to starting the book from its beginning. The device keeps the entry paragraph locally and joins arrival and start itself, so the server never links two events of one reader: it counts `arrived` and `began_from_start` per entry paragraph and divides. No reader id, session id, referrer, share token, sharer or channel is sent (anonymous envelope). Each stage is sent at most once per entry per device.
 */
export type SharedEntryEvent = AnonymousEventEnvelope & {
  type?: 'shared_entry';
  payload?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
};
/**
 * When the event occurred (client time)
 */
export type ISO8601DateTime1 = string;
/**
 * The reader opened a reading-companion surface (who is who, an entity card, the spoiler-safe map) at a position. Says where readers look for help and about whom; never what they typed or searched.
 */
export type CompanionOpenEvent = EventEnvelope & {
  type?: 'companion_open';
  payload?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
};
/**
 * The «what happened» recap (a few lines of the story up to where the reader stopped) was offered, viewed or dismissed. The gap since the last reading is sent as a coarse bucket.
 */
export type RecapViewEvent = EventEnvelope & {
  type?: 'recap_view';
  payload?: {
    action: 'offered' | 'viewed' | 'dismissed';
    /**
     * `return_prompt`: offered on coming back after a pause. `manual`: opened from the menu.
     */
    trigger: 'return_prompt' | 'manual';
    /**
     * Paragraph the recap runs up to (context chapter).
     */
    at_node_id: string;
    /**
     * Time since the previous reading on this device, bucketed.
     */
    dormancy: '<1d' | '1-3d' | '4-7d' | '8-30d' | '31d+';
  };
  [k: string]: unknown;
};
/**
 * Before sharing or copying the link of a paragraph that is the reveal of a public key truth, the reader saw a warning and accepted or cancelled. Which truths it reveals is known from the narrative layer and is not sent.
 */
export type SpoilerWarningEvent = EventEnvelope & {
  type?: 'spoiler_warning';
  payload?: {
    action: 'shown' | 'accepted' | 'cancelled';
    surface: 'share' | 'copy_link';
    /**
     * Paragraph being shared (context chapter).
     */
    target_node_id: string;
  };
  [k: string]: unknown;
};
/**
 * The reader reached a chapter they cannot read yet, and the app showed the way in instead of its text: buy the book, subscribe, or wait. The chapter is the context chapter. It is not reading: the chapter was not opened, so no chapter_transition or heartbeat follows from it.
 */
export type AccessGateEvent = EventEnvelope & {
  type?: 'access_gate';
  payload?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
};

/**
 * A batch of 1 to 100 events: the five session events (heartbeat, chapter_transition, book_lifecycle, interaction, app_lifecycle) and the six reading events (reread, shared_entry, companion_open, recap_view, spoiler_warning, access_gate).
 */
export interface EventBatch {
  /**
   * @minItems 1
   * @maxItems 100
   */
  events: [
    (
      | HeartbeatEvent
      | ChapterTransitionEvent
      | BookLifecycleEvent
      | InteractionEvent
      | AppLifecycleEvent
      | ReReadEvent
      | SharedEntryEvent
      | CompanionOpenEvent
      | RecapViewEvent
      | SpoilerWarningEvent
      | AccessGateEvent
    ),
    ...(
      | HeartbeatEvent
      | ChapterTransitionEvent
      | BookLifecycleEvent
      | InteractionEvent
      | AppLifecycleEvent
      | ReReadEvent
      | SharedEntryEvent
      | CompanionOpenEvent
      | RecapViewEvent
      | SpoilerWarningEvent
      | AccessGateEvent
    )[]
  ];
}
/**
 * Common structure of every event except `shared_entry`, which has its own envelope without identity (envelope-anonymous.json). `reader_id` is a pseudonymous, random reader id (never derived from the device, deleted on opt-out); it is used only to count distinct readers for aggregation thresholds and is never shown to authors.
 */
export interface EventEnvelope {
  /**
   * Unique event identifier
   */
  id: string;
  timestamp: ISO8601DateTime;
  /**
   * Event type
   */
  type:
    | 'heartbeat'
    | 'chapter_transition'
    | 'book_lifecycle'
    | 'interaction'
    | 'app_lifecycle'
    | 'reread'
    | 'companion_open'
    | 'recap_view'
    | 'spoiler_warning'
    | 'access_gate';
  /**
   * Groups events from one reading session
   */
  session_id: string;
  context: {
    reader_id: BookManifestDID;
    book_id: BookManifestDID;
    manifest_id: BookManifestDID;
    manifest_version: SemanticVersion;
    chapter_id: BookManifestDID;
    chapter_version: SemanticVersion;
    device_type: 'mobile' | 'tablet' | 'desktop';
    app_id: string;
    app_version: SemanticVersion;
  };
  /**
   * Event-specific data
   */
  payload: {
    [k: string]: unknown;
  };
}
/**
 * Envelope for events that must not be linkable to a reader: no `reader_id` and no `session_id`. Used by `shared_entry`. Each such event is sent at most once per entry per device, so counts of events stand in for counts of readers.
 */
export interface AnonymousEventEnvelope {
  /**
   * Unique event identifier
   */
  id: string;
  timestamp: ISO8601DateTime1;
  /**
   * Event type
   */
  type: 'shared_entry';
  context: {
    book_id: BookManifestDID;
    manifest_id: BookManifestDID;
    manifest_version: SemanticVersion;
    chapter_id: BookManifestDID;
    chapter_version: SemanticVersion;
    device_type: 'mobile' | 'tablet' | 'desktop';
    app_id: string;
    app_version: SemanticVersion;
  };
  /**
   * Event-specific data
   */
  payload: {
    [k: string]: unknown;
  };
}

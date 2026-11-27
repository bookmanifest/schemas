import { z } from 'zod';
export declare const HeartbeatEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"heartbeat">;
    payload: z.ZodObject<{
        duration_seconds: z.ZodNumber;
        active_seconds: z.ZodNumber;
        start_node_id: z.ZodString;
        end_node_id: z.ZodString;
        focus_node_id: z.ZodString;
        progress_percentage: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    }, {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "heartbeat";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    };
}, {
    type: "heartbeat";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    };
}>;
export declare const ChapterTransitionEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"chapter_transition">;
    payload: z.ZodObject<{
        from_chapter_id: z.ZodString;
        from_chapter_version: z.ZodString;
        to_chapter_id: z.ZodNullable<z.ZodString>;
        to_chapter_version: z.ZodNullable<z.ZodString>;
        trigger: z.ZodEnum<["scroll_end", "next_button", "prev_button", "toc_jump", "link_internal", "book_close"]>;
        time_in_chapter_seconds: z.ZodNumber;
        chapter_completion_percentage: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    }, {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "chapter_transition";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    };
}, {
    type: "chapter_transition";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    };
}>;
export declare const BookLifecycleEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"book_lifecycle">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["started", "completed"]>;
        trigger: z.ZodString;
        total_active_reading_time_seconds: z.ZodNumber;
        completion_percentage: z.ZodNumber;
        chapters_started: z.ZodNumber;
        chapters_completed: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    }, {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "book_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    };
}, {
    type: "book_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    };
}>;
export declare const InteractionEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"interaction">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["highlight", "comment", "copy", "share", "bookmark", "search_definition", "link_click"]>;
        target_node_id: z.ZodString;
        target_node_type: z.ZodString;
        text_selection: z.ZodOptional<z.ZodString>;
        selection_length: z.ZodNumber;
        annotation: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    }, {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "interaction";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    };
}, {
    type: "interaction";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    };
}>;
export declare const AppLifecycleEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"app_lifecycle">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["open", "background", "foreground", "close"]>;
        source: z.ZodOptional<z.ZodEnum<["direct", "notification", "deeplink", "widget"]>>;
        time_since_last_session_seconds: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    }, {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "app_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    };
}, {
    type: "app_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    };
}>;
export declare const RereadEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"reread">;
    payload: z.ZodObject<{
        from_node_id: z.ZodString;
        to_chapter_id: z.ZodString;
        to_chapter_version: z.ZodString;
        to_node_id: z.ZodString;
        method: z.ZodEnum<["scroll", "toc_jump", "link_internal", "search", "companion"]>;
    }, "strict", z.ZodTypeAny, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}>;
export declare const SharedEntryEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    context: z.ZodObject<Omit<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "reader_id">, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
    type: z.ZodLiteral<"shared_entry">;
    payload: z.ZodEffects<z.ZodObject<{
        stage: z.ZodEnum<["arrived", "continued_from_entry", "began_from_start"]>;
        entry_chapter_id: z.ZodString;
        entry_chapter_version: z.ZodString;
        entry_node_id: z.ZodString;
        days_since_entry: z.ZodOptional<z.ZodEnum<["0", "1-7", "8-30", "31-90"]>>;
    }, "strict", z.ZodTypeAny, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}>;
export declare const CompanionOpenEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"companion_open">;
    payload: z.ZodEffects<z.ZodObject<{
        surface: z.ZodEnum<["who_is_who", "entity_card", "map"]>;
        entity_id: z.ZodOptional<z.ZodString>;
        at_node_id: z.ZodString;
        trigger: z.ZodOptional<z.ZodEnum<["name_tap", "menu"]>>;
    }, "strict", z.ZodTypeAny, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}>;
export declare const RecapViewEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"recap_view">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["offered", "viewed", "dismissed"]>;
        trigger: z.ZodEnum<["return_prompt", "manual"]>;
        at_node_id: z.ZodString;
        dormancy: z.ZodEnum<["<1d", "1-3d", "4-7d", "8-30d", "31d+"]>;
    }, "strict", z.ZodTypeAny, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}>;
export declare const SpoilerWarningEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"spoiler_warning">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["shown", "accepted", "cancelled"]>;
        surface: z.ZodEnum<["share", "copy_link"]>;
        target_node_id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}>;
export declare const ReadingEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"reread">;
    payload: z.ZodObject<{
        from_node_id: z.ZodString;
        to_chapter_id: z.ZodString;
        to_chapter_version: z.ZodString;
        to_node_id: z.ZodString;
        method: z.ZodEnum<["scroll", "toc_jump", "link_internal", "search", "companion"]>;
    }, "strict", z.ZodTypeAny, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    context: z.ZodObject<Omit<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "reader_id">, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
    type: z.ZodLiteral<"shared_entry">;
    payload: z.ZodEffects<z.ZodObject<{
        stage: z.ZodEnum<["arrived", "continued_from_entry", "began_from_start"]>;
        entry_chapter_id: z.ZodString;
        entry_chapter_version: z.ZodString;
        entry_node_id: z.ZodString;
        days_since_entry: z.ZodOptional<z.ZodEnum<["0", "1-7", "8-30", "31-90"]>>;
    }, "strict", z.ZodTypeAny, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"companion_open">;
    payload: z.ZodEffects<z.ZodObject<{
        surface: z.ZodEnum<["who_is_who", "entity_card", "map"]>;
        entity_id: z.ZodOptional<z.ZodString>;
        at_node_id: z.ZodString;
        trigger: z.ZodOptional<z.ZodEnum<["name_tap", "menu"]>>;
    }, "strict", z.ZodTypeAny, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"recap_view">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["offered", "viewed", "dismissed"]>;
        trigger: z.ZodEnum<["return_prompt", "manual"]>;
        at_node_id: z.ZodString;
        dormancy: z.ZodEnum<["<1d", "1-3d", "4-7d", "8-30d", "31d+"]>;
    }, "strict", z.ZodTypeAny, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"spoiler_warning">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["shown", "accepted", "cancelled"]>;
        surface: z.ZodEnum<["share", "copy_link"]>;
        target_node_id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}>]>;
export declare const BookManifestEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"heartbeat">;
    payload: z.ZodObject<{
        duration_seconds: z.ZodNumber;
        active_seconds: z.ZodNumber;
        start_node_id: z.ZodString;
        end_node_id: z.ZodString;
        focus_node_id: z.ZodString;
        progress_percentage: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    }, {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "heartbeat";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    };
}, {
    type: "heartbeat";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        duration_seconds: number;
        active_seconds: number;
        start_node_id: string;
        end_node_id: string;
        focus_node_id: string;
        progress_percentage: number;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"chapter_transition">;
    payload: z.ZodObject<{
        from_chapter_id: z.ZodString;
        from_chapter_version: z.ZodString;
        to_chapter_id: z.ZodNullable<z.ZodString>;
        to_chapter_version: z.ZodNullable<z.ZodString>;
        trigger: z.ZodEnum<["scroll_end", "next_button", "prev_button", "toc_jump", "link_internal", "book_close"]>;
        time_in_chapter_seconds: z.ZodNumber;
        chapter_completion_percentage: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    }, {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "chapter_transition";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    };
}, {
    type: "chapter_transition";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        from_chapter_id: string;
        from_chapter_version: string;
        to_chapter_id: string | null;
        to_chapter_version: string | null;
        trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
        time_in_chapter_seconds: number;
        chapter_completion_percentage: number;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"book_lifecycle">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["started", "completed"]>;
        trigger: z.ZodString;
        total_active_reading_time_seconds: z.ZodNumber;
        completion_percentage: z.ZodNumber;
        chapters_started: z.ZodNumber;
        chapters_completed: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    }, {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "book_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    };
}, {
    type: "book_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: string;
        action: "completed" | "started";
        total_active_reading_time_seconds: number;
        completion_percentage: number;
        chapters_started: number;
        chapters_completed: number;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"interaction">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["highlight", "comment", "copy", "share", "bookmark", "search_definition", "link_click"]>;
        target_node_id: z.ZodString;
        target_node_type: z.ZodString;
        text_selection: z.ZodOptional<z.ZodString>;
        selection_length: z.ZodNumber;
        annotation: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    }, {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "interaction";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    };
}, {
    type: "interaction";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
        target_node_id: string;
        target_node_type: string;
        selection_length: number;
        text_selection?: string | undefined;
        annotation?: string | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"app_lifecycle">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["open", "background", "foreground", "close"]>;
        source: z.ZodOptional<z.ZodEnum<["direct", "notification", "deeplink", "widget"]>>;
        time_since_last_session_seconds: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    }, {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "app_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    };
}, {
    type: "app_lifecycle";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "open" | "background" | "foreground" | "close";
        source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
        time_since_last_session_seconds?: number | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"reread">;
    payload: z.ZodObject<{
        from_node_id: z.ZodString;
        to_chapter_id: z.ZodString;
        to_chapter_version: z.ZodString;
        to_node_id: z.ZodString;
        method: z.ZodEnum<["scroll", "toc_jump", "link_internal", "search", "companion"]>;
    }, "strict", z.ZodTypeAny, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }, {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}, {
    type: "reread";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        to_chapter_id: string;
        to_chapter_version: string;
        from_node_id: string;
        to_node_id: string;
        method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    context: z.ZodObject<Omit<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "reader_id">, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
    type: z.ZodLiteral<"shared_entry">;
    payload: z.ZodEffects<z.ZodObject<{
        stage: z.ZodEnum<["arrived", "continued_from_entry", "began_from_start"]>;
        entry_chapter_id: z.ZodString;
        entry_chapter_version: z.ZodString;
        entry_node_id: z.ZodString;
        days_since_entry: z.ZodOptional<z.ZodEnum<["0", "1-7", "8-30", "31-90"]>>;
    }, "strict", z.ZodTypeAny, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }, {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}, {
    type: "shared_entry";
    id: string;
    timestamp: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        stage: "arrived" | "continued_from_entry" | "began_from_start";
        entry_chapter_id: string;
        entry_chapter_version: string;
        entry_node_id: string;
        days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"companion_open">;
    payload: z.ZodEffects<z.ZodObject<{
        surface: z.ZodEnum<["who_is_who", "entity_card", "map"]>;
        entity_id: z.ZodOptional<z.ZodString>;
        at_node_id: z.ZodString;
        trigger: z.ZodOptional<z.ZodEnum<["name_tap", "menu"]>>;
    }, "strict", z.ZodTypeAny, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }, {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}, {
    type: "companion_open";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        surface: "map" | "who_is_who" | "entity_card";
        at_node_id: string;
        trigger?: "name_tap" | "menu" | undefined;
        entity_id?: string | undefined;
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"recap_view">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["offered", "viewed", "dismissed"]>;
        trigger: z.ZodEnum<["return_prompt", "manual"]>;
        at_node_id: z.ZodString;
        dormancy: z.ZodEnum<["<1d", "1-3d", "4-7d", "8-30d", "31d+"]>;
    }, "strict", z.ZodTypeAny, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }, {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}, {
    type: "recap_view";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        trigger: "return_prompt" | "manual";
        action: "offered" | "viewed" | "dismissed";
        at_node_id: string;
        dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
    };
}>, z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    session_id: z.ZodString;
    context: z.ZodObject<{
        reader_id: z.ZodString;
        book_id: z.ZodString;
        manifest_id: z.ZodString;
        manifest_version: z.ZodString;
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
        app_id: z.ZodString;
        app_version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }, {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    }>;
} & {
    type: z.ZodLiteral<"spoiler_warning">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["shown", "accepted", "cancelled"]>;
        surface: z.ZodEnum<["share", "copy_link"]>;
        target_node_id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }, {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    }>;
}, "strict", z.ZodTypeAny, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}, {
    type: "spoiler_warning";
    id: string;
    timestamp: string;
    session_id: string;
    context: {
        chapter_id: string;
        chapter_version: string;
        book_id: string;
        reader_id: string;
        manifest_id: string;
        manifest_version: string;
        device_type: "mobile" | "tablet" | "desktop";
        app_id: string;
        app_version: string;
    };
    payload: {
        action: "shown" | "accepted" | "cancelled";
        target_node_id: string;
        surface: "share" | "copy_link";
    };
}>]>;
export declare const EventBatchSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"heartbeat">;
        payload: z.ZodObject<{
            duration_seconds: z.ZodNumber;
            active_seconds: z.ZodNumber;
            start_node_id: z.ZodString;
            end_node_id: z.ZodString;
            focus_node_id: z.ZodString;
            progress_percentage: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        }, {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "heartbeat";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        };
    }, {
        type: "heartbeat";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"chapter_transition">;
        payload: z.ZodObject<{
            from_chapter_id: z.ZodString;
            from_chapter_version: z.ZodString;
            to_chapter_id: z.ZodNullable<z.ZodString>;
            to_chapter_version: z.ZodNullable<z.ZodString>;
            trigger: z.ZodEnum<["scroll_end", "next_button", "prev_button", "toc_jump", "link_internal", "book_close"]>;
            time_in_chapter_seconds: z.ZodNumber;
            chapter_completion_percentage: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        }, {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "chapter_transition";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        };
    }, {
        type: "chapter_transition";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"book_lifecycle">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["started", "completed"]>;
            trigger: z.ZodString;
            total_active_reading_time_seconds: z.ZodNumber;
            completion_percentage: z.ZodNumber;
            chapters_started: z.ZodNumber;
            chapters_completed: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        }, {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "book_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        };
    }, {
        type: "book_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"interaction">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["highlight", "comment", "copy", "share", "bookmark", "search_definition", "link_click"]>;
            target_node_id: z.ZodString;
            target_node_type: z.ZodString;
            text_selection: z.ZodOptional<z.ZodString>;
            selection_length: z.ZodNumber;
            annotation: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        }, {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "interaction";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        };
    }, {
        type: "interaction";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"app_lifecycle">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["open", "background", "foreground", "close"]>;
            source: z.ZodOptional<z.ZodEnum<["direct", "notification", "deeplink", "widget"]>>;
            time_since_last_session_seconds: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        }, {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "app_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        };
    }, {
        type: "app_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"reread">;
        payload: z.ZodObject<{
            from_node_id: z.ZodString;
            to_chapter_id: z.ZodString;
            to_chapter_version: z.ZodString;
            to_node_id: z.ZodString;
            method: z.ZodEnum<["scroll", "toc_jump", "link_internal", "search", "companion"]>;
        }, "strict", z.ZodTypeAny, {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        }, {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "reread";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        };
    }, {
        type: "reread";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        context: z.ZodObject<Omit<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "reader_id">, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
        type: z.ZodLiteral<"shared_entry">;
        payload: z.ZodEffects<z.ZodObject<{
            stage: z.ZodEnum<["arrived", "continued_from_entry", "began_from_start"]>;
            entry_chapter_id: z.ZodString;
            entry_chapter_version: z.ZodString;
            entry_node_id: z.ZodString;
            days_since_entry: z.ZodOptional<z.ZodEnum<["0", "1-7", "8-30", "31-90"]>>;
        }, "strict", z.ZodTypeAny, {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        }, {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        }>, {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        }, {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "shared_entry";
        id: string;
        timestamp: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        };
    }, {
        type: "shared_entry";
        id: string;
        timestamp: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"companion_open">;
        payload: z.ZodEffects<z.ZodObject<{
            surface: z.ZodEnum<["who_is_who", "entity_card", "map"]>;
            entity_id: z.ZodOptional<z.ZodString>;
            at_node_id: z.ZodString;
            trigger: z.ZodOptional<z.ZodEnum<["name_tap", "menu"]>>;
        }, "strict", z.ZodTypeAny, {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        }, {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        }>, {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        }, {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "companion_open";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        };
    }, {
        type: "companion_open";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"recap_view">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["offered", "viewed", "dismissed"]>;
            trigger: z.ZodEnum<["return_prompt", "manual"]>;
            at_node_id: z.ZodString;
            dormancy: z.ZodEnum<["<1d", "1-3d", "4-7d", "8-30d", "31d+"]>;
        }, "strict", z.ZodTypeAny, {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        }, {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "recap_view";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        };
    }, {
        type: "recap_view";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        };
    }>, z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        session_id: z.ZodString;
        context: z.ZodObject<{
            reader_id: z.ZodString;
            book_id: z.ZodString;
            manifest_id: z.ZodString;
            manifest_version: z.ZodString;
            chapter_id: z.ZodString;
            chapter_version: z.ZodString;
            device_type: z.ZodEnum<["mobile", "tablet", "desktop"]>;
            app_id: z.ZodString;
            app_version: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }, {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        }>;
    } & {
        type: z.ZodLiteral<"spoiler_warning">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["shown", "accepted", "cancelled"]>;
            surface: z.ZodEnum<["share", "copy_link"]>;
            target_node_id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        }, {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "spoiler_warning";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        };
    }, {
        type: "spoiler_warning";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        };
    }>]>, "many">;
}, "strict", z.ZodTypeAny, {
    events: ({
        type: "heartbeat";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        };
    } | {
        type: "chapter_transition";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        };
    } | {
        type: "book_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        };
    } | {
        type: "interaction";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        };
    } | {
        type: "app_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        };
    } | {
        type: "reread";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        };
    } | {
        type: "shared_entry";
        id: string;
        timestamp: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        };
    } | {
        type: "companion_open";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        };
    } | {
        type: "recap_view";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        };
    } | {
        type: "spoiler_warning";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        };
    })[];
}, {
    events: ({
        type: "heartbeat";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            duration_seconds: number;
            active_seconds: number;
            start_node_id: string;
            end_node_id: string;
            focus_node_id: string;
            progress_percentage: number;
        };
    } | {
        type: "chapter_transition";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            from_chapter_id: string;
            from_chapter_version: string;
            to_chapter_id: string | null;
            to_chapter_version: string | null;
            trigger: "scroll_end" | "next_button" | "prev_button" | "toc_jump" | "link_internal" | "book_close";
            time_in_chapter_seconds: number;
            chapter_completion_percentage: number;
        };
    } | {
        type: "book_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: string;
            action: "completed" | "started";
            total_active_reading_time_seconds: number;
            completion_percentage: number;
            chapters_started: number;
            chapters_completed: number;
        };
    } | {
        type: "interaction";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "highlight" | "comment" | "copy" | "share" | "bookmark" | "search_definition" | "link_click";
            target_node_id: string;
            target_node_type: string;
            selection_length: number;
            text_selection?: string | undefined;
            annotation?: string | undefined;
        };
    } | {
        type: "app_lifecycle";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "open" | "background" | "foreground" | "close";
            source?: "direct" | "notification" | "deeplink" | "widget" | undefined;
            time_since_last_session_seconds?: number | undefined;
        };
    } | {
        type: "reread";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            to_chapter_id: string;
            to_chapter_version: string;
            from_node_id: string;
            to_node_id: string;
            method: "toc_jump" | "link_internal" | "scroll" | "search" | "companion";
        };
    } | {
        type: "shared_entry";
        id: string;
        timestamp: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            stage: "arrived" | "continued_from_entry" | "began_from_start";
            entry_chapter_id: string;
            entry_chapter_version: string;
            entry_node_id: string;
            days_since_entry?: "0" | "1-7" | "8-30" | "31-90" | undefined;
        };
    } | {
        type: "companion_open";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            surface: "map" | "who_is_who" | "entity_card";
            at_node_id: string;
            trigger?: "name_tap" | "menu" | undefined;
            entity_id?: string | undefined;
        };
    } | {
        type: "recap_view";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            trigger: "return_prompt" | "manual";
            action: "offered" | "viewed" | "dismissed";
            at_node_id: string;
            dormancy: "<1d" | "1-3d" | "4-7d" | "8-30d" | "31d+";
        };
    } | {
        type: "spoiler_warning";
        id: string;
        timestamp: string;
        session_id: string;
        context: {
            chapter_id: string;
            chapter_version: string;
            book_id: string;
            reader_id: string;
            manifest_id: string;
            manifest_version: string;
            device_type: "mobile" | "tablet" | "desktop";
            app_id: string;
            app_version: string;
        };
        payload: {
            action: "shown" | "accepted" | "cancelled";
            target_node_id: string;
            surface: "share" | "copy_link";
        };
    })[];
}>;
export type ReadingEvent = z.infer<typeof ReadingEventSchema>;
export type BookManifestEvent = z.infer<typeof BookManifestEventSchema>;
export type EventBatch = z.infer<typeof EventBatchSchema>;

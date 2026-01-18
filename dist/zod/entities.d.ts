import { z } from 'zod';
export declare const AuthorSchema: z.ZodObject<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["website", "bluesky", "twitter", "mastodon", "instagram", "other"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "website" | "bluesky" | "twitter" | "mastodon" | "instagram" | "other";
        url: string;
    }, {
        type: "website" | "bluesky" | "twitter" | "mastodon" | "instagram" | "other";
        url: string;
    }>, "many">>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    handle: string;
    name: string;
    created_at: string;
    updated_at: string;
    bio?: string | undefined;
    avatar?: string | undefined;
    links?: {
        type: "website" | "bluesky" | "twitter" | "mastodon" | "instagram" | "other";
        url: string;
    }[] | undefined;
}, {
    id: string;
    handle: string;
    name: string;
    created_at: string;
    updated_at: string;
    bio?: string | undefined;
    avatar?: string | undefined;
    links?: {
        type: "website" | "bluesky" | "twitter" | "mastodon" | "instagram" | "other";
        url: string;
    }[] | undefined;
}>;
export declare const PublisherSchema: z.ZodObject<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodString;
    logo: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    handle: string;
    name: string;
    created_at: string;
    updated_at: string;
    website?: string | undefined;
    logo?: string | undefined;
}, {
    id: string;
    handle: string;
    name: string;
    created_at: string;
    updated_at: string;
    website?: string | undefined;
    logo?: string | undefined;
}>;
export declare const SeriesSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    author_ids: z.ZodArray<z.ZodString, "many">;
    cover_image: z.ZodOptional<z.ZodString>;
    genres: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodEnum<["ongoing", "completed", "hiatus"]>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strict", z.ZodTypeAny, {
    status: "ongoing" | "completed" | "hiatus";
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    author_ids: string[];
    description?: string | undefined;
    cover_image?: string | undefined;
    genres?: string[] | undefined;
}, {
    status: "ongoing" | "completed" | "hiatus";
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    author_ids: string[];
    description?: string | undefined;
    cover_image?: string | undefined;
    genres?: string[] | undefined;
}>;
export declare const BookSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    author_ids: z.ZodArray<z.ZodString, "many">;
    publisher_id: z.ZodOptional<z.ZodString>;
    series_id: z.ZodOptional<z.ZodString>;
    series_order: z.ZodOptional<z.ZodNumber>;
    language: z.ZodString;
    latest_manifest_id: z.ZodString;
    metadata: z.ZodOptional<z.ZodObject<{
        cover_image: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        genres: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        content_warnings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isbn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        cover_image?: string | undefined;
        genres?: string[] | undefined;
        tags?: string[] | undefined;
        content_warnings?: string[] | undefined;
        isbn?: string | undefined;
    }, {
        description?: string | undefined;
        cover_image?: string | undefined;
        genres?: string[] | undefined;
        tags?: string[] | undefined;
        content_warnings?: string[] | undefined;
        isbn?: string | undefined;
    }>>;
    pricing: z.ZodOptional<z.ZodObject<{
        model: z.ZodEnum<["free", "paid", "pay-what-you-want", "subscription"]>;
        price: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        model: "free" | "paid" | "pay-what-you-want" | "subscription";
        price?: number | undefined;
        currency?: string | undefined;
    }, {
        model: "free" | "paid" | "pay-what-you-want" | "subscription";
        price?: number | undefined;
        currency?: string | undefined;
    }>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    author_ids: string[];
    slug: string;
    language: string;
    latest_manifest_id: string;
    publisher_id?: string | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    metadata?: {
        description?: string | undefined;
        cover_image?: string | undefined;
        genres?: string[] | undefined;
        tags?: string[] | undefined;
        content_warnings?: string[] | undefined;
        isbn?: string | undefined;
    } | undefined;
    pricing?: {
        model: "free" | "paid" | "pay-what-you-want" | "subscription";
        price?: number | undefined;
        currency?: string | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    author_ids: string[];
    slug: string;
    language: string;
    latest_manifest_id: string;
    publisher_id?: string | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    metadata?: {
        description?: string | undefined;
        cover_image?: string | undefined;
        genres?: string[] | undefined;
        tags?: string[] | undefined;
        content_warnings?: string[] | undefined;
        isbn?: string | undefined;
    } | undefined;
    pricing?: {
        model: "free" | "paid" | "pay-what-you-want" | "subscription";
        price?: number | undefined;
        currency?: string | undefined;
    } | undefined;
}>;
export declare const ManifestSchema: z.ZodObject<{
    id: z.ZodString;
    book_id: z.ZodString;
    version: z.ZodString;
    changelog: z.ZodOptional<z.ZodString>;
    published_at: z.ZodString;
    toc: z.ZodArray<z.ZodObject<{
        chapter_id: z.ZodString;
        chapter_version: z.ZodString;
        order: z.ZodNumber;
        title: z.ZodString;
        section: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title: string;
        chapter_id: string;
        chapter_version: string;
        order: number;
        section?: string | undefined;
    }, {
        title: string;
        chapter_id: string;
        chapter_version: string;
        order: number;
        section?: string | undefined;
    }>, "many">;
    stats: z.ZodObject<{
        total_chapters: z.ZodNumber;
        word_count: z.ZodNumber;
        estimated_reading_time_minutes: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        total_chapters: number;
        word_count: number;
        estimated_reading_time_minutes: number;
    }, {
        total_chapters: number;
        word_count: number;
        estimated_reading_time_minutes: number;
    }>;
}, "strict", z.ZodTypeAny, {
    id: string;
    book_id: string;
    version: string;
    published_at: string;
    toc: {
        title: string;
        chapter_id: string;
        chapter_version: string;
        order: number;
        section?: string | undefined;
    }[];
    stats: {
        total_chapters: number;
        word_count: number;
        estimated_reading_time_minutes: number;
    };
    changelog?: string | undefined;
}, {
    id: string;
    book_id: string;
    version: string;
    published_at: string;
    toc: {
        title: string;
        chapter_id: string;
        chapter_version: string;
        order: number;
        section?: string | undefined;
    }[];
    stats: {
        total_chapters: number;
        word_count: number;
        estimated_reading_time_minutes: number;
    };
    changelog?: string | undefined;
}>;
export declare const ChapterSchema: z.ZodObject<{
    id: z.ZodString;
    chapter_id: z.ZodString;
    book_id: z.ZodString;
    version: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    created_at: z.ZodString;
    metadata: z.ZodObject<{
        word_count: z.ZodNumber;
        estimated_reading_time_minutes: z.ZodNumber;
        pov_character: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        word_count: number;
        estimated_reading_time_minutes: number;
        tags?: string[] | undefined;
        pov_character?: string | undefined;
    }, {
        word_count: number;
        estimated_reading_time_minutes: number;
        tags?: string[] | undefined;
        pov_character?: string | undefined;
    }>;
    content: z.ZodType<any, z.ZodTypeDef, any>;
}, "strict", z.ZodTypeAny, {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    metadata: {
        word_count: number;
        estimated_reading_time_minutes: number;
        tags?: string[] | undefined;
        pov_character?: string | undefined;
    };
    chapter_id: string;
    book_id: string;
    version: string;
    content?: any;
}, {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    metadata: {
        word_count: number;
        estimated_reading_time_minutes: number;
        tags?: string[] | undefined;
        pov_character?: string | undefined;
    };
    chapter_id: string;
    book_id: string;
    version: string;
    content?: any;
}>;
export declare const ReaderSchema: z.ZodObject<{
    id: z.ZodString;
    handle: z.ZodOptional<z.ZodString>;
    display_name: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    preferences: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodEnum<["light", "dark", "sepia"]>>;
        font_size: z.ZodOptional<z.ZodEnum<["small", "medium", "large", "xlarge"]>>;
        font_family: z.ZodOptional<z.ZodEnum<["serif", "sans-serif", "monospace"]>>;
        line_height: z.ZodOptional<z.ZodEnum<["compact", "normal", "relaxed", "loose"]>>;
    }, "strict", z.ZodTypeAny, {
        theme?: "light" | "dark" | "sepia" | undefined;
        font_size?: "small" | "medium" | "large" | "xlarge" | undefined;
        font_family?: "serif" | "sans-serif" | "monospace" | undefined;
        line_height?: "compact" | "normal" | "relaxed" | "loose" | undefined;
    }, {
        theme?: "light" | "dark" | "sepia" | undefined;
        font_size?: "small" | "medium" | "large" | "xlarge" | undefined;
        font_family?: "serif" | "sans-serif" | "monospace" | undefined;
        line_height?: "compact" | "normal" | "relaxed" | "loose" | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    handle?: string | undefined;
    avatar?: string | undefined;
    display_name?: string | undefined;
    preferences?: {
        theme?: "light" | "dark" | "sepia" | undefined;
        font_size?: "small" | "medium" | "large" | "xlarge" | undefined;
        font_family?: "serif" | "sans-serif" | "monospace" | undefined;
        line_height?: "compact" | "normal" | "relaxed" | "loose" | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    handle?: string | undefined;
    avatar?: string | undefined;
    display_name?: string | undefined;
    preferences?: {
        theme?: "light" | "dark" | "sepia" | undefined;
        font_size?: "small" | "medium" | "large" | "xlarge" | undefined;
        font_family?: "serif" | "sans-serif" | "monospace" | undefined;
        line_height?: "compact" | "normal" | "relaxed" | "loose" | undefined;
    } | undefined;
}>;
export declare const LibraryEntrySchema: z.ZodObject<{
    id: z.ZodString;
    reader_id: z.ZodString;
    book_id: z.ZodString;
    manifest_id: z.ZodString;
    status: z.ZodEnum<["want-to-read", "reading", "finished", "abandoned", "paused"]>;
    added_at: z.ZodString;
    started_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finished_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    current_chapter_id: z.ZodOptional<z.ZodString>;
    current_chapter_version: z.ZodOptional<z.ZodString>;
    current_position: z.ZodOptional<z.ZodNumber>;
    current_node_id: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status: "want-to-read" | "reading" | "finished" | "abandoned" | "paused";
    id: string;
    book_id: string;
    reader_id: string;
    manifest_id: string;
    added_at: string;
    started_at?: string | null | undefined;
    finished_at?: string | null | undefined;
    current_chapter_id?: string | undefined;
    current_chapter_version?: string | undefined;
    current_position?: number | undefined;
    current_node_id?: string | undefined;
}, {
    status: "want-to-read" | "reading" | "finished" | "abandoned" | "paused";
    id: string;
    book_id: string;
    reader_id: string;
    manifest_id: string;
    added_at: string;
    started_at?: string | null | undefined;
    finished_at?: string | null | undefined;
    current_chapter_id?: string | undefined;
    current_chapter_version?: string | undefined;
    current_position?: number | undefined;
    current_node_id?: string | undefined;
}>;

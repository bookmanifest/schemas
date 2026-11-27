import { z } from 'zod';
export declare const VisibilitySchema: z.ZodEnum<["public", "author"]>;
export declare const EntitySchema: z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodEnum<["character", "place", "org", "object"]>;
    name: z.ZodString;
    revealed_at: z.ZodString;
    aliases: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        revealed_at: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        name: string;
        revealed_at: string;
    }, {
        name: string;
        revealed_at: string;
    }>, "many">>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    kind: "object" | "character" | "place" | "org";
    name: string;
    revealed_at: string;
    aliases?: {
        name: string;
        revealed_at: string;
    }[] | undefined;
    visibility?: "public" | "author" | undefined;
}, {
    id: string;
    kind: "object" | "character" | "place" | "org";
    name: string;
    revealed_at: string;
    aliases?: {
        name: string;
        revealed_at: string;
    }[] | undefined;
    visibility?: "public" | "author" | undefined;
}>;
export declare const DurationSchema: z.ZodEffects<z.ZodObject<{
    unit: z.ZodOptional<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "year"]>>;
    value: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    unknown: z.ZodOptional<z.ZodLiteral<true>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    basis: "asserted" | "inferred";
    evidence: string[];
    value?: number | undefined;
    status?: "verified" | "doubtful" | "review" | undefined;
    unknown?: true | undefined;
    quote?: string | undefined;
    unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
    min?: number | undefined;
    max?: number | undefined;
    confidence?: number | undefined;
}, {
    basis: "asserted" | "inferred";
    evidence: string[];
    value?: number | undefined;
    status?: "verified" | "doubtful" | "review" | undefined;
    unknown?: true | undefined;
    quote?: string | undefined;
    unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
    min?: number | undefined;
    max?: number | undefined;
    confidence?: number | undefined;
}>, {
    basis: "asserted" | "inferred";
    evidence: string[];
    value?: number | undefined;
    status?: "verified" | "doubtful" | "review" | undefined;
    unknown?: true | undefined;
    quote?: string | undefined;
    unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
    min?: number | undefined;
    max?: number | undefined;
    confidence?: number | undefined;
}, {
    basis: "asserted" | "inferred";
    evidence: string[];
    value?: number | undefined;
    status?: "verified" | "doubtful" | "review" | undefined;
    unknown?: true | undefined;
    quote?: string | undefined;
    unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
    min?: number | undefined;
    max?: number | undefined;
    confidence?: number | undefined;
}>;
export declare const SceneSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    start: z.ZodString;
    end: z.ZodString;
    place: z.ZodOptional<z.ZodString>;
    time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    }, {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    }>, {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    }, {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    }>>;
    story_order: z.ZodOptional<z.ZodNumber>;
    cast: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    duration: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        unit: z.ZodOptional<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "year"]>>;
        value: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        unknown: z.ZodOptional<z.ZodLiteral<true>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    }, {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    }>, {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    }, {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    }>>;
    continues: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    end: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    place?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    time?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    } | undefined;
    story_order?: number | undefined;
    cast?: string[] | undefined;
    duration?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    } | undefined;
    continues?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    end: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    place?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    time?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    } | undefined;
    story_order?: number | undefined;
    cast?: string[] | undefined;
    duration?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    } | undefined;
    continues?: string | undefined;
}>, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    end: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    place?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    time?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    } | undefined;
    story_order?: number | undefined;
    cast?: string[] | undefined;
    duration?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    } | undefined;
    continues?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    end: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    place?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    time?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        status?: "verified" | "doubtful" | "review" | undefined;
        date?: string | undefined;
        quote?: string | undefined;
        confidence?: number | undefined;
        label?: string | undefined;
    } | undefined;
    story_order?: number | undefined;
    cast?: string[] | undefined;
    duration?: {
        basis: "asserted" | "inferred";
        evidence: string[];
        value?: number | undefined;
        status?: "verified" | "doubtful" | "review" | undefined;
        unknown?: true | undefined;
        quote?: string | undefined;
        unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
        min?: number | undefined;
        max?: number | undefined;
        confidence?: number | undefined;
    } | undefined;
    continues?: string | undefined;
}>;
export declare const FocalizationSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    start: z.ZodString;
    end: z.ZodOptional<z.ZodString>;
    mode: z.ZodEnum<["internal", "zero", "external"]>;
    focalizer: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    mode: "internal" | "zero" | "external";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    end?: string | undefined;
    focalizer?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    mode: "internal" | "zero" | "external";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    end?: string | undefined;
    focalizer?: string | undefined;
}>, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    mode: "internal" | "zero" | "external";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    end?: string | undefined;
    focalizer?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    start: string;
    mode: "internal" | "zero" | "external";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    end?: string | undefined;
    focalizer?: string | undefined;
}>;
export declare const TruthSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    subjects: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    revealed_at: z.ZodString;
    clues: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    subjects?: string[] | undefined;
    clues?: string[] | undefined;
}, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    subjects?: string[] | undefined;
    clues?: string[] | undefined;
}>, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    subjects?: string[] | undefined;
    clues?: string[] | undefined;
}, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    subjects?: string[] | undefined;
    clues?: string[] | undefined;
}>;
export declare const KnowledgeSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    truth: z.ZodString;
    knower: z.ZodString;
    stance: z.ZodEnum<["knows", "believes", "suspects"]>;
    holds: z.ZodBoolean;
    since: z.ZodUnion<[z.ZodString, z.ZodLiteral<"before_text">]>;
    revealed_at: z.ZodString;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    truth: string;
    knower: string;
    stance: "knows" | "believes" | "suspects";
    holds: boolean;
    since: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
}, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    truth: string;
    knower: string;
    stance: "knows" | "believes" | "suspects";
    holds: boolean;
    since: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
}>, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    truth: string;
    knower: string;
    stance: "knows" | "believes" | "suspects";
    holds: boolean;
    since: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
}, {
    id: string;
    revealed_at: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    truth: string;
    knower: string;
    stance: "knows" | "believes" | "suspects";
    holds: boolean;
    since: string;
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
}>;
export declare const StoryEventSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    at: z.ZodString;
    salience: z.ZodEnum<["kernel", "catalysis"]>;
    picked_up_at: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    at: string;
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    salience: "kernel" | "catalysis";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    picked_up_at?: string[] | undefined;
}, {
    at: string;
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    salience: "kernel" | "catalysis";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    picked_up_at?: string[] | undefined;
}>, {
    at: string;
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    salience: "kernel" | "catalysis";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    picked_up_at?: string[] | undefined;
}, {
    at: string;
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    text: string;
    salience: "kernel" | "catalysis";
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    picked_up_at?: string[] | undefined;
}>;
export declare const CoreferenceSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    event: z.ZodOptional<z.ZodString>;
    tellings: z.ZodArray<z.ZodObject<{
        at: z.ZodString;
        teller: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        at: string;
        teller?: string | undefined;
    }, {
        at: string;
        teller?: string | undefined;
    }>, "many">;
    visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    basis: z.ZodEnum<["asserted", "inferred"]>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    quote: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    tellings: {
        at: string;
        teller?: string | undefined;
    }[];
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    event?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    tellings: {
        at: string;
        teller?: string | undefined;
    }[];
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    event?: string | undefined;
}>, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    tellings: {
        at: string;
        teller?: string | undefined;
    }[];
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    event?: string | undefined;
}, {
    id: string;
    basis: "asserted" | "inferred";
    evidence: string[];
    tellings: {
        at: string;
        teller?: string | undefined;
    }[];
    status?: "verified" | "doubtful" | "review" | undefined;
    quote?: string | undefined;
    visibility?: "public" | "author" | undefined;
    confidence?: number | undefined;
    event?: string | undefined;
}>;
export declare const FindingSchema: z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodEnum<["continuity", "absence", "voice_balance", "reading_vs_story_order", "open_question"]>;
    text: z.ZodString;
    refs: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    visibility: z.ZodLiteral<"author">;
}, "strict", z.ZodTypeAny, {
    id: string;
    kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
    visibility: "author";
    evidence: string[];
    text: string;
    refs?: string[] | undefined;
}, {
    id: string;
    kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
    visibility: "author";
    evidence: string[];
    text: string;
    refs?: string[] | undefined;
}>;
export declare const NarrativeLayerSchema: z.ZodObject<{
    narrative_layer: z.ZodLiteral<"0.3">;
    book_id: z.ZodString;
    manifest_id: z.ZodString;
    manifest_version: z.ZodString;
    language: z.ZodString;
    generated_at: z.ZodOptional<z.ZodString>;
    generator: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        name: string;
        version: string;
    }, {
        name: string;
        version: string;
    }>>;
    entities: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<["character", "place", "org", "object"]>;
        name: z.ZodString;
        revealed_at: z.ZodString;
        aliases: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            revealed_at: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            name: string;
            revealed_at: string;
        }, {
            name: string;
            revealed_at: string;
        }>, "many">>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        kind: "object" | "character" | "place" | "org";
        name: string;
        revealed_at: string;
        aliases?: {
            name: string;
            revealed_at: string;
        }[] | undefined;
        visibility?: "public" | "author" | undefined;
    }, {
        id: string;
        kind: "object" | "character" | "place" | "org";
        name: string;
        revealed_at: string;
        aliases?: {
            name: string;
            revealed_at: string;
        }[] | undefined;
        visibility?: "public" | "author" | undefined;
    }>, "many">>;
    scenes: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        start: z.ZodString;
        end: z.ZodString;
        place: z.ZodOptional<z.ZodString>;
        time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            basis: z.ZodEnum<["asserted", "inferred"]>;
            evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
            quote: z.ZodOptional<z.ZodString>;
            confidence: z.ZodOptional<z.ZodNumber>;
            status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
        }, "strict", z.ZodTypeAny, {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        }, {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        }>, {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        }, {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        }>>;
        story_order: z.ZodOptional<z.ZodNumber>;
        cast: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
        duration: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            unit: z.ZodOptional<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "year"]>>;
            value: z.ZodOptional<z.ZodNumber>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            unknown: z.ZodOptional<z.ZodLiteral<true>>;
            basis: z.ZodEnum<["asserted", "inferred"]>;
            evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
            quote: z.ZodOptional<z.ZodString>;
            confidence: z.ZodOptional<z.ZodNumber>;
            status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
        }, "strict", z.ZodTypeAny, {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        }, {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        }>, {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        }, {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        }>>;
        continues: z.ZodOptional<z.ZodString>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }>, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }>, "many">>;
    focalization: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        start: z.ZodString;
        end: z.ZodOptional<z.ZodString>;
        mode: z.ZodEnum<["internal", "zero", "external"]>;
        focalizer: z.ZodOptional<z.ZodString>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }>, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }>, "many">>;
    truths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        subjects: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
        revealed_at: z.ZodString;
        clues: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }>, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }>, "many">>;
    knowledge: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        truth: z.ZodString;
        knower: z.ZodString;
        stance: z.ZodEnum<["knows", "believes", "suspects"]>;
        holds: z.ZodBoolean;
        since: z.ZodUnion<[z.ZodString, z.ZodLiteral<"before_text">]>;
        revealed_at: z.ZodString;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }>, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }, {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }>, "many">>;
    events: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        at: z.ZodString;
        salience: z.ZodEnum<["kernel", "catalysis"]>;
        picked_up_at: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }, {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }>, {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }, {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }>, "many">>;
    coreference: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        event: z.ZodOptional<z.ZodString>;
        tellings: z.ZodArray<z.ZodObject<{
            at: z.ZodString;
            teller: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            at: string;
            teller?: string | undefined;
        }, {
            at: string;
            teller?: string | undefined;
        }>, "many">;
        visibility: z.ZodOptional<z.ZodEnum<["public", "author"]>>;
        basis: z.ZodEnum<["asserted", "inferred"]>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        quote: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["verified", "doubtful", "review"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }>, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }, {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }>, "many">>;
    findings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<["continuity", "absence", "voice_balance", "reading_vs_story_order", "open_question"]>;
        text: z.ZodString;
        refs: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
        evidence: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
        visibility: z.ZodLiteral<"author">;
    }, "strict", z.ZodTypeAny, {
        id: string;
        kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
        visibility: "author";
        evidence: string[];
        text: string;
        refs?: string[] | undefined;
    }, {
        id: string;
        kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
        visibility: "author";
        evidence: string[];
        text: string;
        refs?: string[] | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    narrative_layer: "0.3";
    book_id: string;
    manifest_id: string;
    manifest_version: string;
    language: string;
    generated_at?: string | undefined;
    generator?: {
        name: string;
        version: string;
    } | undefined;
    entities?: {
        id: string;
        kind: "object" | "character" | "place" | "org";
        name: string;
        revealed_at: string;
        aliases?: {
            name: string;
            revealed_at: string;
        }[] | undefined;
        visibility?: "public" | "author" | undefined;
    }[] | undefined;
    scenes?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }[] | undefined;
    focalization?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }[] | undefined;
    truths?: {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }[] | undefined;
    knowledge?: {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }[] | undefined;
    events?: {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }[] | undefined;
    coreference?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }[] | undefined;
    findings?: {
        id: string;
        kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
        visibility: "author";
        evidence: string[];
        text: string;
        refs?: string[] | undefined;
    }[] | undefined;
}, {
    narrative_layer: "0.3";
    book_id: string;
    manifest_id: string;
    manifest_version: string;
    language: string;
    generated_at?: string | undefined;
    generator?: {
        name: string;
        version: string;
    } | undefined;
    entities?: {
        id: string;
        kind: "object" | "character" | "place" | "org";
        name: string;
        revealed_at: string;
        aliases?: {
            name: string;
            revealed_at: string;
        }[] | undefined;
        visibility?: "public" | "author" | undefined;
    }[] | undefined;
    scenes?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        end: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        place?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        time?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            status?: "verified" | "doubtful" | "review" | undefined;
            date?: string | undefined;
            quote?: string | undefined;
            confidence?: number | undefined;
            label?: string | undefined;
        } | undefined;
        story_order?: number | undefined;
        cast?: string[] | undefined;
        duration?: {
            basis: "asserted" | "inferred";
            evidence: string[];
            value?: number | undefined;
            status?: "verified" | "doubtful" | "review" | undefined;
            unknown?: true | undefined;
            quote?: string | undefined;
            unit?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | undefined;
            min?: number | undefined;
            max?: number | undefined;
            confidence?: number | undefined;
        } | undefined;
        continues?: string | undefined;
    }[] | undefined;
    focalization?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        start: string;
        mode: "internal" | "zero" | "external";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        end?: string | undefined;
        focalizer?: string | undefined;
    }[] | undefined;
    truths?: {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        subjects?: string[] | undefined;
        clues?: string[] | undefined;
    }[] | undefined;
    knowledge?: {
        id: string;
        revealed_at: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        truth: string;
        knower: string;
        stance: "knows" | "believes" | "suspects";
        holds: boolean;
        since: string;
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
    }[] | undefined;
    events?: {
        at: string;
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        text: string;
        salience: "kernel" | "catalysis";
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        picked_up_at?: string[] | undefined;
    }[] | undefined;
    coreference?: {
        id: string;
        basis: "asserted" | "inferred";
        evidence: string[];
        tellings: {
            at: string;
            teller?: string | undefined;
        }[];
        status?: "verified" | "doubtful" | "review" | undefined;
        quote?: string | undefined;
        visibility?: "public" | "author" | undefined;
        confidence?: number | undefined;
        event?: string | undefined;
    }[] | undefined;
    findings?: {
        id: string;
        kind: "continuity" | "absence" | "voice_balance" | "reading_vs_story_order" | "open_question";
        visibility: "author";
        evidence: string[];
        text: string;
        refs?: string[] | undefined;
    }[] | undefined;
}>;
export type NarrativeLayer = z.infer<typeof NarrativeLayerSchema>;
export type Entity = z.infer<typeof EntitySchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Duration = z.infer<typeof DurationSchema>;
export type Focalization = z.infer<typeof FocalizationSchema>;
export type Truth = z.infer<typeof TruthSchema>;
export type Knowledge = z.infer<typeof KnowledgeSchema>;
export type StoryEvent = z.infer<typeof StoryEventSchema>;
export type Coreference = z.infer<typeof CoreferenceSchema>;
export type Finding = z.infer<typeof FindingSchema>;
export type Visibility = z.infer<typeof VisibilitySchema>;

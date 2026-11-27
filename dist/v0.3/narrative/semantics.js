export function parseAddress(address) {
    const [chapter, node] = address.split('#');
    return { chapter, paragraph: Number(node.slice(2)) };
}
/**
 * Compare two addresses in reading order: negative if `a` comes first, 0 if equal, positive if after.
 * Returns null when they are in different chapters and the order of those chapters is unknown.
 */
export function compareAddresses(a, b, order) {
    const pa = parseAddress(a);
    const pb = parseAddress(b);
    if (pa.chapter === pb.chapter)
        return pa.paragraph - pb.paragraph;
    if (!order)
        return null;
    const ia = order.chapters.indexOf(pa.chapter);
    const ib = order.chapters.indexOf(pb.chapter);
    if (ia < 0 || ib < 0)
        return null;
    return ia - ib;
}
const isPublic = (item) => item.visibility === 'public';
function earliest(addresses, order) {
    let first = addresses[0] ?? null;
    for (const address of addresses.slice(1)) {
        const c = compareAddresses(address, first, order);
        if (c === null)
            return null;
        if (c < 0)
            first = address;
    }
    return first;
}
/** Semantic checks on a layer that already passed the schema. Returns every issue found; empty means valid. */
export function validateNarrativeLayer(layer, order) {
    const issues = [];
    const add = (code, path, message) => issues.push({ code, path, message });
    const cmp = (a, b) => compareAddresses(a, b, order);
    const entities = new Map();
    const byId = new Map();
    const collections = [
        ['entities', layer.entities],
        ['scenes', layer.scenes],
        ['focalization', layer.focalization],
        ['truths', layer.truths],
        ['knowledge', layer.knowledge],
        ['events', layer.events],
        ['coreference', layer.coreference],
        ['findings', layer.findings]
    ];
    for (const [name, items] of collections) {
        items?.forEach((item, i) => {
            if (byId.has(item.id))
                add('duplicate_id', `${name}[${i}].id`, `Duplicate id ${item.id}`);
            byId.set(item.id, item);
        });
    }
    layer.entities?.forEach((e) => entities.set(e.id, e));
    // Every address exists in the manifest version, when the reading order says how many paragraphs there are.
    if (order) {
        const walk = (value, path) => {
            if (typeof value === 'string' && /#p-[0-9]{3,}$/.test(value)) {
                const { chapter, paragraph } = parseAddress(value);
                const count = order.paragraphs?.[chapter];
                if (!order.chapters.includes(chapter) || (count !== undefined && (paragraph < 1 || paragraph > count))) {
                    add('unknown_address', path, `Address ${value} does not exist in this manifest version`);
                }
            }
            else if (Array.isArray(value)) {
                value.forEach((v, i) => walk(v, `${path}[${i}]`));
            }
            else if (value && typeof value === 'object') {
                for (const [k, v] of Object.entries(value))
                    walk(v, path ? `${path}.${k}` : k);
            }
        };
        walk(layer, '');
    }
    // A reference resolves, has the right kind, and a public item only points at public items.
    const ref = (owner, id, path, kinds) => {
        if (id === undefined)
            return;
        const target = byId.get(id);
        if (!target)
            return add('unknown_reference', path, `Unknown id ${id}`);
        const entity = entities.get(id);
        if (kinds && (!entity || !kinds.includes(entity.kind))) {
            add('wrong_entity_kind', path, `${id} must be an entity of kind ${kinds.join(' or ')}`);
        }
        if (isPublic(owner) && !isPublic(target)) {
            add('public_references_private', path, `Public item points at ${id}, which is not public`);
        }
    };
    const checkRange = (start, end, path) => {
        if (end === undefined)
            return;
        const c = cmp(start, end);
        if (c !== null && c > 0)
            add('range_reversed', path, `Range ends (${end}) before it starts (${start})`);
    };
    const checkNoOverlap = (spans, name) => {
        spans.forEach((a, i) => spans.forEach((b, j) => {
            if (j <= i)
                return;
            const aEnd = a.end ?? a.start;
            const bEnd = b.end ?? b.start;
            const startsBeforeOtherEnds = cmp(a.start, bEnd);
            const otherStartsBeforeEnd = cmp(b.start, aEnd);
            if (startsBeforeOtherEnds !== null && otherStartsBeforeEnd !== null && startsBeforeOtherEnds <= 0 && otherStartsBeforeEnd <= 0) {
                add('overlap', `${name}[${j}]`, `${name}[${i}] and ${name}[${j}] overlap`);
            }
        }));
    };
    const checkRevealAfterEvidence = (item, path) => {
        const first = earliest(item.evidence, order);
        if (first === null)
            return;
        const c = cmp(item.revealed_at, first);
        if (c !== null && c < 0) {
            add('revealed_before_evidence', `${path}.revealed_at`, `revealed_at ${item.revealed_at} comes before the earliest evidence ${first}`);
        }
    };
    layer.scenes?.forEach((s, i) => {
        const path = `scenes[${i}]`;
        checkRange(s.start, s.end, path);
        if (s.duration?.min !== undefined && s.duration.max !== undefined && s.duration.min > s.duration.max) {
            add('range_reversed', `${path}.duration`, `Duration min ${s.duration.min} is greater than max ${s.duration.max}`);
        }
        ref(s, s.place, `${path}.place`, ['place']);
        s.cast?.forEach((c, j) => ref(s, c, `${path}.cast[${j}]`, ['character']));
        if (s.continues !== undefined) {
            ref(s, s.continues, `${path}.continues`);
            const earlier = layer.scenes?.find((x) => x.id === s.continues);
            if (earlier) {
                const c = cmp(earlier.end, s.start);
                if (c !== null && c >= 0)
                    add('continues_not_earlier', `${path}.continues`, `${s.continues} does not end before ${s.id} starts`);
            }
        }
    });
    if (layer.scenes)
        checkNoOverlap(layer.scenes, 'scenes');
    layer.focalization?.forEach((f, i) => {
        const path = `focalization[${i}]`;
        checkRange(f.start, f.end, path);
        ref(f, f.focalizer, `${path}.focalizer`, ['character']);
    });
    if (layer.focalization)
        checkNoOverlap(layer.focalization, 'focalization');
    layer.truths?.forEach((t, i) => {
        const path = `truths[${i}]`;
        checkRevealAfterEvidence(t, path);
        t.subjects?.forEach((s, j) => ref(t, s, `${path}.subjects[${j}]`));
        t.clues?.forEach((clue, j) => {
            const c = cmp(clue, t.revealed_at);
            if (c !== null && c >= 0)
                add('clue_after_reveal', `${path}.clues[${j}]`, `Clue ${clue} is not before the reveal ${t.revealed_at}`);
        });
    });
    layer.knowledge?.forEach((k, i) => {
        const path = `knowledge[${i}]`;
        checkRevealAfterEvidence(k, path);
        ref(k, k.truth, `${path}.truth`);
        ref(k, k.knower, `${path}.knower`, ['character', 'org']);
    });
    layer.events?.forEach((e, i) => {
        const path = `events[${i}]`;
        e.picked_up_at?.forEach((p, j) => {
            const c = cmp(p, e.at);
            if (c !== null && c <= 0)
                add('pickup_not_later', `${path}.picked_up_at[${j}]`, `Pickup ${p} is not after the event at ${e.at}`);
        });
    });
    layer.coreference?.forEach((co, i) => {
        const path = `coreference[${i}]`;
        ref(co, co.event, `${path}.event`);
        const seen = new Set();
        co.tellings.forEach((t, j) => {
            if (seen.has(t.at))
                add('duplicate_telling', `${path}.tellings[${j}].at`, `${t.at} is listed twice`);
            seen.add(t.at);
        });
        co.tellings.forEach((t, j) => ref(co, t.teller, `${path}.tellings[${j}].teller`, ['character', 'org']));
    });
    layer.findings?.forEach((f, i) => f.refs?.forEach((r, j) => ref(f, r, `findings[${i}].refs[${j}]`)));
    return issues;
}
/**
 * What may be published: the public items only, findings never. A layer that passes validateNarrativeLayer
 * projects without dangling references, because public items may only point at public items.
 */
export function publicProjection(layer) {
    const keep = (items) => {
        const kept = items?.filter(isPublic);
        return kept && kept.length > 0 ? kept : undefined;
    };
    const { findings: _findings, ...rest } = layer;
    const projected = {
        ...rest,
        entities: keep(layer.entities),
        scenes: keep(layer.scenes),
        focalization: keep(layer.focalization),
        truths: keep(layer.truths),
        knowledge: keep(layer.knowledge),
        events: keep(layer.events),
        coreference: keep(layer.coreference)
    };
    for (const key of Object.keys(projected)) {
        if (projected[key] === undefined)
            delete projected[key];
    }
    return projected;
}
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
export function spoilerSafeCut(layer, position, order) {
    const passed = (address) => {
        const c = compareAddresses(address, position, order);
        return c !== null && c <= 0;
    };
    function cite(item) {
        const { quote: _quote, evidence, ...rest } = item;
        const seen = evidence.filter(passed);
        return (seen.length > 0 ? { ...rest, evidence: seen } : rest);
    }
    const pub = publicProjection(layer);
    const entities = pub.entities
        ?.filter((e) => passed(e.revealed_at))
        .map((e) => {
        const aliases = e.aliases?.filter((a) => passed(a.revealed_at));
        const { aliases: _aliases, ...rest } = e;
        return aliases && aliases.length > 0 ? { ...rest, aliases } : rest;
    });
    const met = new Set(entities?.map((e) => e.id));
    const shownTruths = pub.truths?.filter((t) => passed(t.revealed_at));
    const knownTruths = new Set(shownTruths?.map((t) => t.id));
    const truths = shownTruths?.map((t) => {
        const out = cite(t);
        if (out.subjects)
            out.subjects = out.subjects.filter((x) => met.has(x));
        return out;
    });
    const scenes = pub.scenes
        ?.filter((s) => passed(s.start))
        .map((s) => {
        const { end, duration, time, story_order: _order, ...rest } = cite(s);
        const out = { ...rest };
        if (passed(end)) {
            out.end = end;
            if (duration)
                out.duration = cite(duration);
        }
        if (time)
            out.time = cite(time);
        if (out.place !== undefined && !met.has(out.place))
            delete out.place;
        if (out.cast)
            out.cast = out.cast.filter((c) => met.has(c));
        return out;
    });
    const focalization = pub.focalization
        ?.filter((f) => passed(f.start) && (f.focalizer === undefined || met.has(f.focalizer)))
        .map((f) => {
        const out = cite(f);
        if (out.end !== undefined && !passed(out.end))
            delete out.end;
        return out;
    });
    const knowledge = pub.knowledge
        ?.filter((k) => knownTruths.has(k.truth) &&
        passed(k.revealed_at) &&
        (k.since === 'before_text' || passed(k.since)) &&
        met.has(k.knower))
        .map(cite);
    const events = pub.events
        ?.filter((e) => passed(e.at))
        .map((e) => {
        const pickups = e.picked_up_at?.filter(passed) ?? [];
        const { picked_up_at: _p, salience, ...rest } = cite(e);
        // Before the first pickup, saying «kernel» would announce that the book comes back to it.
        if (salience === 'kernel' && pickups.length === 0)
            return rest;
        return pickups.length > 0 ? { ...rest, salience, picked_up_at: pickups } : { ...rest, salience };
    });
    const coreference = pub.coreference
        ?.map((co) => ({
        ...cite(co),
        tellings: co.tellings
            .filter((t) => passed(t.at))
            .map((t) => (t.teller !== undefined && !met.has(t.teller) ? { at: t.at } : t))
    }))
        .filter((co) => co.tellings.length >= 2);
    const { findings: _findings, entities: _e, scenes: _s, focalization: _f, truths: _t, knowledge: _k, events: _ev, coreference: _c, ...header } = pub;
    const cut = { ...header, entities, scenes, focalization, truths, knowledge, events, coreference };
    for (const key of Object.keys(cut)) {
        const value = cut[key];
        if (value === undefined || (Array.isArray(value) && value.length === 0))
            delete cut[key];
    }
    return cut;
}

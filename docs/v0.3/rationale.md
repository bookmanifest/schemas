# Why the narrative layer looks like this (v0.3)

> **Status: released in v0.3.0 (2026-11-27).** Every v0.1 document stays valid.

Each piece of the [narrative layer](narrative-layer.md) and each new [reading event](reading-events.md) comes from a concept that narrative theory or the psychology of reading has already defined, and exists because a feature for authors or readers needs it. This page links the two. The theory is used as a **lens, never a norm**: the layer says «Barthes would call this a catalysis», never «this could go».

## A caveat that applies to everything below

Most of the empirical findings cited here come from **laboratory studies with short texts, tens of participants and a single session**. Whether they hold for whole novels read at home over weeks is not known; measuring that is one of the reasons this layer exists. Nothing here predicts success, and nothing here should be turned into advice about how a book ought to be written. Correlation in aggregated reading data is reported as «coincides with», never as «causes».

## The pieces

| Piece | Theory | What it makes possible |
|---|---|---|
| **Scenes** | Genette's *scene* as a unit of tempo; the event-indexing model (Zwaan, Langston and Graesser), in which readers track place, time, protagonist, causality and intention; event segmentation (Zacks and colleagues): readers divide a story into events, and boundaries cost time. | Reading behaviour per scene instead of per chapter; where readers naturally stop; a «where and when are we» line when the scene changes; story order against reading order. |
| **Story duration** | Genette's *duration*: story time against text length, with four tempos (scene, summary, ellipsis, pause); Underwood's method of measuring narrated time by asking for it passage by passage. | Three clocks side by side: how much time passes in the story, how much text it takes, how long it takes to read. Ellipses can be found where the story jumps. |
| **Focalization** | Genette's *mood*: who perceives, distinct from who speaks (zero, internal, external focalization); Bal's separation of the focalizer from what is focalized. | Seeing changes of perspective even when the narrator stays the same, and setting them against where readers slow down or leave. |
| **Key truths** | Sternberg's three effects of withheld information: **suspense** (what will happen), **curiosity** (what already happened that we were not told) and **surprise** (a reveal without warning); Brewer and Lichtenstein's structural-affect account of the same three; Iser's *gaps*, the blanks a reader fills. | A map of the secret: when each revelation lands, and which earlier paragraphs (`clues`) prepared it. Spoiler-safe help for readers, a warning before sharing a reveal, and a way to study spoilers in the field. |
| **Knowledge links** | Dramatic irony, a form of Sternberg's suspense: the reader knows what a character does not; Gerrig on suspense without uncertainty; information propagation between characters as modelled by Sims and Bamman. | Finding, paragraph by paragraph, who is in the dark, which needs the character's knowing (`since`) apart from the reader's (`revealed_at`), and room for false beliefs. Without the link to a truth, «X knows something» cannot be checked against «the reader knows it». |
| **Event salience** | Barthes' *cardinal functions* (kernels), which open or close alternatives, and *catalyses*, which fill the space between them. The layer uses an operational form that can be checked against the text: a kernel is an event the book picks up later. | Seeing **what** readers skip: what the theory calls a catalysis, or what holds the story up. Never a judgement that something should be cut. |
| **Event coreference** | Genette's *frequency*: singulative, repetitive (told several times, happened once) and iterative. The layer models the repetitive case. | Showing when and how a book retells an event, and whether readers slow down or skim the second time. |
| **Visibility** | Not a narratological concept: the rule that structure about a book belongs to its author, and that what a reader may see depends on where the reader is. | Spoiler-safe reader features from the public projection; findings kept for the author alone. |

## The events

| Event | Theory | What it makes possible |
|---|---|---|
| `reread` | Iser's gaps; Sternberg's curiosity and surprise, which make readers revise what they read before. | Whether readers go back to the clues after a reveal, or to where a gap opened. Today only the rate of re-reading is known, not its destination. |
| `shared_entry` | Leavitt and Christenfeld reported that spoilers increased enjoyment of short stories; later replications found the opposite or no effect. The question is open and has only been studied with short texts in the lab. | An observational, aggregated comparison of people who enter a book through a reveal with people who enter through an innocuous paragraph. Observational only: what people choose to share differs. |
| `companion_open` | The situation model is updated with each new character (Zwaan and Radvansky); a large cast loads it. | Where readers need help with who is who, and about whom. |
| `recap_view` | The same: after a long pause the situation model has to be rebuilt. | Which pauses and which points make readers want a recap. |
| `spoiler_warning` | Same as `shared_entry`. | How often a reveal is about to be shared, and how often readers hold back. |

## Sources

- Genette, Gérard. *Narrative Discourse: An Essay in Method*. 1972; English translation 1980. Order, duration, frequency, mood, voice.
- Bal, Mieke. *Narratology: Introduction to the Theory of Narrative*. 1985; 4th edition 2017. Fabula, story and text; focalizer and focalized.
- Barthes, Roland. «Introduction to the Structural Analysis of Narratives». 1966. Cardinal functions and catalyses.
- Sternberg, Meir. *Expositional Modes and Temporal Ordering in Fiction*. 1978; and his later «Telling in Time» essays in *Poetics Today*. Suspense, curiosity and surprise.
- Brewer, William F., and Edward H. Lichtenstein. «Stories are to entertain: A structural-affect theory of stories». *Journal of Pragmatics*, 1982.
- Iser, Wolfgang. *The Act of Reading: A Theory of Aesthetic Response*. 1976; English translation 1978. Gaps and the reader's filling of them.
- Gerrig, Richard J. «Suspense in the absence of uncertainty». *Journal of Memory and Language*, 1989.
- Zwaan, Rolf A., Mark C. Langston, and Arthur C. Graesser. «The construction of situation models in narrative comprehension: An event-indexing model». *Psychological Science*, 1995.
- Zwaan, Rolf A., and Gabriel A. Radvansky. «Situation models in language comprehension and memory». *Psychological Bulletin*, 1998.
- Zacks, Jeffrey M., Nicole K. Speer, and Jeremy R. Reynolds. «Segmentation in reading and film comprehension». *Journal of Experimental Psychology: General*, 2009.
- Underwood, Ted. «Why Literary Time Is Measured in Minutes». *ELH*, 2018.
- Sims, Matthew, and David Bamman. «Measuring Information Propagation in Literary Social Networks». *EMNLP*, 2020.
- Leavitt, Jonathan D., and Nicholas J. S. Christenfeld. «Story spoilers don't spoil stories». *Psychological Science*, 2011.

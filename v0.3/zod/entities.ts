import { z } from 'zod'
import { didSchema, iso8601Schema, urlSchema, languageCodeSchema, currencyCodeSchema, semverSchema } from './validators.js'

const AuthorLinkSchema = z.object({
  type: z.enum(['website', 'bluesky', 'twitter', 'mastodon', 'instagram', 'other']),
  url: urlSchema
})

export const AuthorSchema = z.object({
  id: didSchema,
  handle: z.string().regex(/^[a-zA-Z0-9-]+\.(bds\.pub|[a-zA-Z0-9-]+\.[a-z]{2,})$/, {
    message: 'Invalid handle format. Expected: name.bookmanifest.org or custom domain'
  }),
  name: z.string().min(1).max(200),
  bio: z.string().max(5000).optional(),
  avatar: urlSchema.optional(),
  links: z.array(AuthorLinkSchema).max(10).optional(),
  created_at: iso8601Schema,
  updated_at: iso8601Schema
}).strict()

export const PublisherSchema = z.object({
  id: didSchema,
  handle: z.string().regex(/^[a-zA-Z0-9-]+\.(bds\.pub|[a-zA-Z0-9-]+\.[a-z]{2,})$/, {
    message: 'Invalid handle format. Expected: name.bookmanifest.org or custom domain'
  }),
  name: z.string().min(1).max(200),
  logo: urlSchema.optional(),
  website: urlSchema.optional(),
  created_at: iso8601Schema,
  updated_at: iso8601Schema
}).strict()

export const SeriesSchema = z.object({
  id: didSchema,
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  author_ids: z.array(didSchema).min(1).max(50),
  cover_image: urlSchema.optional(),
  genres: z.array(z.string().min(1).max(50)).max(10).optional(),
  status: z.enum(['ongoing', 'completed', 'hiatus']),
  created_at: iso8601Schema,
  updated_at: iso8601Schema
}).strict()

const BookMetadataSchema = z.object({
  cover_image: urlSchema.optional(),
  description: z.string().max(5000).optional(),
  genres: z.array(z.string().min(1).max(50)).max(20).optional(),
  tags: z.array(z.string().min(1).max(50)).max(50).optional(),
  content_warnings: z.array(z.string().min(1).max(50)).max(20).optional(),
  isbn: z.string().regex(/^(978|979)-?[0-9]{1,5}-?[0-9]{1,7}-?[0-9]{1,7}-?[0-9]$/, {
    message: 'Invalid ISBN format'
  }).optional()
}).optional()

const BookPricingSchema = z.object({
  model: z.enum(['free', 'paid', 'pay-what-you-want', 'subscription']),
  price: z.number().min(0).optional(),
  currency: currencyCodeSchema.optional()
})

export const BookSchema = z.object({
  id: didSchema,
  title: z.string().min(1).max(500),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only'
  }).min(1).max(200),
  author_ids: z.array(didSchema).min(1).max(50),
  publisher_id: didSchema.optional(),
  series_id: didSchema.optional(),
  series_order: z.number().int().min(1).optional(),
  language: languageCodeSchema,
  latest_manifest_id: didSchema,
  metadata: BookMetadataSchema,
  pricing: BookPricingSchema.optional(),
  created_at: iso8601Schema,
  updated_at: iso8601Schema
}).strict()

const TocEntrySchema = z.object({
  chapter_id: didSchema,
  chapter_version: semverSchema,
  order: z.number().int().min(1),
  title: z.string().min(1).max(500),
  section: z.string().max(200).optional()
}).strict()

const ManifestStatsSchema = z.object({
  total_chapters: z.number().int().min(1),
  word_count: z.number().int().min(0),
  estimated_reading_time_minutes: z.number().int().min(0)
}).strict()

export const ManifestSchema = z.object({
  id: didSchema,
  book_id: didSchema,
  version: semverSchema,
  changelog: z.string().max(5000).optional(),
  published_at: iso8601Schema,
  toc: z.array(TocEntrySchema).min(1).max(1000),
  stats: ManifestStatsSchema
}).strict()

// ProseMirror JSON schema (recursive)
const ProseMirrorNodeSchema: z.ZodType<any> = z.lazy(() => z.object({
  type: z.string(),
  content: z.array(ProseMirrorNodeSchema).optional(),
  attrs: z.record(z.any()).optional(),
  marks: z.array(z.object({
    type: z.string(),
    attrs: z.record(z.any()).optional()
  })).optional(),
  text: z.string().optional()
}).passthrough())

const ChapterMetadataSchema = z.object({
  word_count: z.number().int().min(0),
  estimated_reading_time_minutes: z.number().int().min(0),
  pov_character: z.string().max(200).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional()
}).strict()

export const ChapterSchema = z.object({
  id: didSchema,
  chapter_id: didSchema,
  book_id: didSchema,
  version: semverSchema,
  title: z.string().min(1).max(500),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only'
  }).min(1).max(200),
  created_at: iso8601Schema,
  metadata: ChapterMetadataSchema,
  content: ProseMirrorNodeSchema
}).strict()

const ReaderPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'sepia']).optional(),
  font_size: z.enum(['small', 'medium', 'large', 'xlarge']).optional(),
  font_family: z.enum(['serif', 'sans-serif', 'monospace']).optional(),
  line_height: z.enum(['compact', 'normal', 'relaxed', 'loose']).optional()
}).strict()

export const ReaderSchema = z.object({
  id: didSchema,
  handle: z.string().regex(/^[a-zA-Z0-9-]+\.(bds\.pub|[a-zA-Z0-9-]+\.[a-z]{2,})$/, {
    message: 'Invalid handle format. Expected: name.bookmanifest.org or custom domain'
  }).optional(),
  display_name: z.string().min(1).max(200).optional(),
  avatar: urlSchema.optional(),
  created_at: iso8601Schema,
  updated_at: iso8601Schema,
  preferences: ReaderPreferencesSchema.optional()
}).strict()

export const LibraryEntrySchema = z.object({
  id: didSchema,
  reader_id: didSchema,
  book_id: didSchema,
  manifest_id: didSchema,
  status: z.enum(['want-to-read', 'reading', 'finished', 'abandoned', 'paused']),
  added_at: iso8601Schema,
  started_at: iso8601Schema.nullable().optional(),
  finished_at: iso8601Schema.nullable().optional(),
  current_chapter_id: didSchema.optional(),
  current_chapter_version: semverSchema.optional(),
  current_position: z.number().min(0).max(1).optional(),
  current_node_id: z.string().min(1).max(200).optional()
}).strict()

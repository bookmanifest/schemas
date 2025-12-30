import { z } from 'zod'
import { didSchema, iso8601Schema, urlSchema } from './validators'

const AuthorLinkSchema = z.object({
  type: z.enum(['website', 'bluesky', 'twitter', 'mastodon', 'instagram', 'other']),
  url: urlSchema
})

export const AuthorSchema = z.object({
  id: didSchema,
  handle: z.string().regex(/^[a-zA-Z0-9-]+\.(bds\.pub|[a-zA-Z0-9-]+\.[a-z]{2,})$/, {
    message: 'Invalid handle format. Expected: name.bds.pub or custom domain'
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
    message: 'Invalid handle format. Expected: name.bds.pub or custom domain'
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

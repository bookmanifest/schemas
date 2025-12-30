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

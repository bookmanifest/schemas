import { describe, it, expect } from 'vitest'
import { EventBatchSchema } from '../../zod/events'
import { glob } from 'glob'
import { readFile } from 'fs/promises'

describe('Book Manifest Event Compliance', () => {
  it('should validate all valid event batches', async () => {
    const validFiles = await glob('./v0.3/examples/events/*-valid.json')

    for (const file of validFiles) {
      const data = JSON.parse(await readFile(file, 'utf-8'))
      expect(() => EventBatchSchema.parse(data), `${file} should be valid`).not.toThrow()
    }
  })

  it('should reject invalid event batches', async () => {
    const invalidFiles = await glob('./v0.3/examples/events/*-invalid.json')

    for (const file of invalidFiles) {
      const data = JSON.parse(await readFile(file, 'utf-8'))
      expect(() => EventBatchSchema.parse(data), `${file} should be invalid`).toThrow()
    }
  })
})

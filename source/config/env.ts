import { z } from 'zod'

export const envSchema = z.object({
    PORT: z.coerce.number().min(1).default(3000),
    HOST: z.string().default('localhost'),
    DATABASE_URL: z.url()
})

export const env = envSchema.parse(process.env)

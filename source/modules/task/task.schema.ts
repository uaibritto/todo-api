import { z } from 'zod'

export const taskSchema = {
    entity: z.object({
        id: z.cuid2(),
        title: z.string(),
        done: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date()
    }),
    createTaskDto: z.object({ title: z.string(), done: z.boolean() }),
    updateTaskDto: z.object({
        title: z.optional(z.string()),
        done: z.optional(z.boolean())
    })
}

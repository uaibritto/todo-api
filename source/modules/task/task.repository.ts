import { eq } from 'drizzle-orm'

import { db } from '@/infrastructure/database/client'
import { tasks } from '@/infrastructure/database/schemas/task'
import type { Task } from '@/modules/task/task.types'

export abstract class TaskRepository {
    static async findMany(): Promise<Task[]> {
        return await db.select().from(tasks)
    }

    static async findOne(id: string): Promise<Task | undefined> {
        const [row] = await db.select().from(tasks).where(eq(tasks.id, id))

        return row
    }

    static async create(task: Task): Promise<Task | undefined> {
        const [row] = await db.insert(tasks).values(task).returning()

        return row
    }

    static async delete(id: string): Promise<Task | undefined> {
        const [row] = await db.delete(tasks).where(eq(tasks.id, id)).returning()

        return row
    }
}

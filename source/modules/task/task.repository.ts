import { eq } from 'drizzle-orm'

import { db } from '@/infrastructure/database/client'
import { tasks } from '@/infrastructure/database/schemas/task'
import type {
    Task,
    CreateTaskDto,
    UpdateTaskDto
} from '@/modules/task/task.types'

export abstract class TaskRepository {
    static async findMany(): Promise<Task[]> {
        return await db.select().from(tasks)
    }

    static async findOne(id: string): Promise<Task | null> {
        const [row] = await db.select().from(tasks).where(eq(tasks.id, id))

        return row ?? null
    }

    static async create(task: CreateTaskDto): Promise<Task | null> {
        const [row] = await db.insert(tasks).values(task).returning()

        return row ?? null
    }

    static async update(
        id: string,
        update: UpdateTaskDto
    ): Promise<Task | null> {
        const [row] = await db
            .update(tasks)
            .set(update)
            .where(eq(tasks.id, id))
            .returning()

        return row ?? null
    }

    static async delete(id: string): Promise<Task | null> {
        const [row] = await db.delete(tasks).where(eq(tasks.id, id)).returning()

        return row ?? null
    }
}

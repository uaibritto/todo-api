import { eq } from 'drizzle-orm'

import { db } from '@/infrastructure/database/client'
import { tasks } from '@/infrastructure/database/schemas/task'
import type {
    CreateTaskDto,
    Task,
    UpdateTaskDto
} from '@/modules/task/task.types'

interface TaskRepository {
    create(data: CreateTaskDto): Promise<Task | null>
    findMany(): Promise<Task[]>
    findOne(id: string): Promise<Task | null>
    update(id: string, update: UpdateTaskDto): Promise<Task | null>
    delete(id: string): Promise<Task | null>
}

export type TaskDeps = { taskRepository: TaskRepository }

export const taskRepository = {
    async findMany(): Promise<Task[]> {
        return await db.select().from(tasks)
    },

    async findOne(id: string): Promise<Task | null> {
        const [row] = await db.select().from(tasks).where(eq(tasks.id, id))

        return row ?? null
    },

    async create(task: CreateTaskDto): Promise<Task | null> {
        const [row] = await db.insert(tasks).values(task).returning()

        return row ?? null
    },

    async update(id: string, data: UpdateTaskDto): Promise<Task | null> {
        const [row] = await db
            .update(tasks)
            .set(data)
            .where(eq(tasks.id, id))
            .returning()

        return row ?? null
    },

    async delete(id: string): Promise<Task | null> {
        const [row] = await db.delete(tasks).where(eq(tasks.id, id)).returning()

        return row ?? null
    }
} satisfies TaskRepository

import { TaskRepository } from '@/modules/task/task.repository'
import type { CreateTaskDto } from '@/modules/task/task.types'
import { createId } from '@/shared/utils/generateId'

export class TaskService {
    static async createTask({ title, done }: CreateTaskDto) {
        const id = createId()

        const task = {
            id,
            title,
            done,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await TaskRepository.db.set(id, task)
    }
}

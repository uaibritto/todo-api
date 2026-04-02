import { TaskRepository } from '@/modules/task/task.repository'
import type { CreateTaskDto } from '@/modules/task/task.types'
import { AppError } from '@/shared/errors/AppError'
import { createId } from '@/shared/utils/generateId'

export class TaskService {
    static async createTask({ title, done }: CreateTaskDto) {
        const newTask = {
            id: createId(),
            title,
            done,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const task = await TaskRepository.create(newTask)

        if (!task) {
            throw new AppError('Failed to create task')
        }

        return task
    }

    static async findTask(id: string) {
        const task = await TaskRepository.findOne(id)

        if (!task) {
            throw new AppError('Task not found')
        }

        return task
    }

    static async findAllTasks() {
        const tasks = await TaskRepository.findMany()

        return tasks
    }

    static async removeTask(id: string) {
        const task = await TaskRepository.findOne(id)

        if (!task) {
            throw new AppError('Task not found')
        }

        return TaskRepository.delete(id)
    }
}

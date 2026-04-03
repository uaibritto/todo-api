import { TaskRepository } from '@/modules/task/task.repository'
import type { CreateTaskDto, UpdateTaskDto } from '@/modules/task/task.types'

export class TaskService {
    static async createTask({ title, done }: CreateTaskDto) {
        const task = await TaskRepository.create({ title, done })

        if (!task) {
            throw new Error('Failed to create task')
        }

        return task
    }

    static async findTask(id: string) {
        const task = await TaskRepository.findOne(id)

        if (!task) {
            throw new Error('Task not found')
        }

        return task
    }

    static async findAllTasks() {
        const tasks = await TaskRepository.findMany()

        return tasks
    }

    static async updateTask(id: string, update: UpdateTaskDto) {
        const task = await TaskRepository.update(id, update)

        if (!task) {
            throw new Error('Task not found')
        }

        return task
    }

    static async removeTask(id: string) {
        const deleted = await TaskRepository.delete(id)

        if (!deleted) {
            throw new Error('Task not found')
        }

        return deleted
    }
}

import type { TaskDeps } from '@/modules/task/task.repository'
import type { CreateTaskDto } from '@/modules/task/task.types'

export async function createTask(data: CreateTaskDto, deps: TaskDeps) {
    const task = await deps.taskRepository.create(data)

    if (!task) {
        throw new Error('Failed to create task')
    }

    return task
}

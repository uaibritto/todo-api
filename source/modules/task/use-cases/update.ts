import type { TaskDeps } from '@/modules/task/task.repository'
import type { UpdateTaskDto } from '@/modules/task/task.types'

export async function updateTask(
    id: string,
    data: UpdateTaskDto,
    deps: TaskDeps
) {
    const task = await deps.taskRepository.update(id, data)

    if (!task) {
        throw new Error('Failed! Task not found')
    }

    return task
}

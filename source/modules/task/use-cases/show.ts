import type { TaskDeps } from '@/modules/task/task.repository'

export async function showTask(id: string, deps: TaskDeps) {
    const task = await deps.taskRepository.findOne(id)

    if (!task) {
        throw new Error('Task not found')
    }

    return task
}

import type { TaskDeps } from '@/modules/task/task.repository'

export async function removeTask(id: string, deps: TaskDeps) {
    const deleted = await deps.taskRepository.delete(id)

    if (!deleted) {
        throw new Error('Task not found')
    }

    return deleted
}

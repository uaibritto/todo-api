import type { TaskDeps } from '@/modules/task/task.repository'

export async function listTask(deps: TaskDeps) {
    const tasks = await deps.taskRepository.findMany()

    return tasks
}

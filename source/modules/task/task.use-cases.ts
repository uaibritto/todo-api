import { taskRepository } from '@/modules/task/task.repository'
import type { CreateTaskDto, UpdateTaskDto } from '@/modules/task/task.types'
import {
    createTask,
    listTask,
    removeTask,
    showTask,
    updateTask
} from '@/modules/task/use-cases'

export const taskUseCases = {
    create: (data: CreateTaskDto) => createTask(data, { taskRepository }),
    list: () => listTask({ taskRepository }),
    show: (id: string) => showTask(id, { taskRepository }),
    update: (id: string, data: UpdateTaskDto) =>
        updateTask(id, data, { taskRepository }),
    remove: (id: string) => removeTask(id, { taskRepository })
}

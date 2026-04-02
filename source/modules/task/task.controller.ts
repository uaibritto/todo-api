import { Elysia } from 'elysia'

import { taskSchema } from '@/modules/task/task.schema'
import { TaskService } from '@/modules/task/task.service'
import { AppError } from '@/shared/errors/AppError'

export const taskController = new Elysia().post(
    '/',
    ({ body, status }) => {
        try {
            const task = TaskService.createTask(body)

            status(201, task)
        } catch (error) {
            return new AppError((error as Error).message)
        }
    },
    { body: taskSchema.createTaskDto }
)

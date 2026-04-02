import { Elysia } from 'elysia'

import { taskSchema } from '@/modules/task/task.schema'
import { TaskService } from '@/modules/task/task.service'

export const taskController = new Elysia()
    .post(
        '/',
        ({ body, status }) => {
            try {
                const task = TaskService.createTask(body)

                status(201, task)
            } catch {
                return status(422, 'Failed to create task')
            }
        },
        { body: taskSchema.createTaskDto }
    )
    .get('/', async ({ status }) => {
        try {
            const tasks = TaskService.findAllTasks()

            return status(200, tasks)
        } catch {
            return status(500, 'Failed to fetch tasks')
        }
    })
    .get('/:id', async ({ params, status }) => {
        try {
            const task = await TaskService.findTask(params.id)

            return status(200, task)
        } catch {
            return status(404, 'Task not found')
        }
    })
    .delete('/:id', async ({ params, status }) => {
        try {
            await TaskService.removeTask(params.id)

            return status(204, 'Task deleted')
        } catch {
            return status(404, 'Task not found')
        }
    })

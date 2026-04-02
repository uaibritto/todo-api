import { Elysia } from 'elysia'
import { z } from 'zod'

import { taskSchema } from '@/modules/task/task.schema'
import { TaskService } from '@/modules/task/task.service'

export const taskController = new Elysia({ prefix: '/tasks' })
    .post(
        '/',
        async ({ body, status }) => {
            const task = await TaskService.createTask(body)

            return status(201, task)
        },
        { body: taskSchema.createTaskDto }
    )
    .get('/', async ({ status }) => {
        const tasks = await TaskService.findAllTasks()

        return status(200, tasks)
    })
    .get(
        '/:id',
        async ({ params, status }) => {
            const task = await TaskService.findTask(params.id)

            return status(200, task)
        },
        { params: z.object({ id: z.string() }) }
    )
    .put(
        '/:id',
        async ({ params, body, status }) => {
            const task = await TaskService.updateTask(params.id, body)

            return status(200, task)
        },
        { body: taskSchema.updateTaskDto, params: z.object({ id: z.string() }) }
    )
    .delete(
        '/:id',
        async ({ params, status }) => {
            await TaskService.removeTask(params.id)

            return status(204, 'Task deleted')
        },
        { params: z.object({ id: z.string() }) }
    )

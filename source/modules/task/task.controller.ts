import { Elysia } from 'elysia'
import { z } from 'zod'

import { taskSchema } from '@/modules/task/task.schema'
import { taskUseCases } from '@/modules/task/task.use-cases'

export const taskController = new Elysia({ prefix: '/tasks' })
    .post(
        '/',
        async ({ body, status }) => {
            const task = await taskUseCases.create(body)

            return status(201, task)
        },
        { body: taskSchema.createTaskDto }
    )
    .get('/', async ({ status }) => {
        const tasks = await taskUseCases.list()

        return status(200, tasks)
    })
    .get(
        '/:id',
        async ({ params, status }) => {
            const task = await taskUseCases.show(params.id)

            return status(200, task)
        },
        { params: z.object({ id: z.string() }) }
    )
    .patch(
        '/:id',
        async ({ params, body, status }) => {
            const task = await taskUseCases.update(params.id, body)

            return status(200, task)
        },
        { body: taskSchema.updateTaskDto, params: z.object({ id: z.string() }) }
    )
    .delete(
        '/:id',
        async ({ params, status }) => {
            await taskUseCases.remove(params.id)

            return status(204, 'Task deleted')
        },
        { params: z.object({ id: z.string() }) }
    )

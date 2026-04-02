import { Elysia } from 'elysia'

import { taskController } from '@/modules/task/task.controller'
import { AppError } from '@/shared/errors/AppError'

export const application = new Elysia()
    .onError(({ error, code }) => {
        switch (code) {
            case 'VALIDATION':
                return new AppError(error.message)
            case 'NOT_FOUND':
                return new AppError(error.message)
            default:
                return new AppError('Something went wrong')
        }
    })
    .use(taskController)

import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { audit } from '@/infrastructure/http/plugins/audit'
import { taskController } from '@/modules/task/task.controller'
import { AppError } from '@/shared/errors/AppError'

export const application = new Elysia()
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }))
    .error({ AppError })
    .onError(({ error, code, status }) => {
        switch (code) {
            case 'AppError':
                return status(418, error.message)

            default:
                return { message: 'Something went wrong' }
        }
    })
    .use(audit)
    .use(taskController)

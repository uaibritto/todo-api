import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { audit } from '@/infrastructure/http/plugins/audit'
import { taskController } from '@/modules/task/task.controller'

export const application = new Elysia()
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }))
    .onError(({ error, code, status }) => {
        switch (code) {
            case 'INVALID_COOKIE_SIGNATURE':
                return status(401, error.message)
            case 'NOT_FOUND':
                return status(404, error.message)
            case 'VALIDATION':
                return status(422, error.message)
            case 'INTERNAL_SERVER_ERROR':
                return status(500, error.message)
            default:
                return { message: 'Something went wrong' }
        }
    })
    .use(audit)
    .use(taskController)

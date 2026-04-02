import { URL } from 'node:url'
import { styleText } from 'node:util'

import { Elysia } from 'elysia'

export const audit = new Elysia({ name: 'audit' }).onAfterResponse(
    { as: 'scoped' },
    ({ request, set }) => {
        const url = new URL(request.url)
        const method = request.method
        const status = set.status ?? 200

        let color: Parameters<typeof styleText>[0] = 'white'

        switch (method) {
            case 'GET':
                color = 'blue'
                break
            case 'POST':
                color = 'green'
                break
            case 'PUT':
                color = 'yellow'
                break
            case 'DELETE':
                color = 'red'
                break
            default:
                color = 'gray'
        }

        console.log(`[${status}]`, styleText(color, method), url.pathname)
    }
)

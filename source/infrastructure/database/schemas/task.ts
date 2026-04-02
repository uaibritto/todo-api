import { sql } from 'drizzle-orm'
import { pgTable as table, text, boolean, timestamp } from 'drizzle-orm/pg-core'

import { createId } from '@/shared/utils/generateId'

export const tasks = table('tasks', {
    id: text('id')
        .primaryKey()
        .$default(() => createId()),
    title: text('title').notNull(),
    done: boolean('done').default(false).notNull(),
    createdAt: timestamp('created_at')
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp('updated_at')
        .notNull()
        .default(sql`now()`)
})

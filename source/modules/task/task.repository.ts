import type { Task } from '@/modules/task/task.types'

export abstract class TaskRepository {
    private static _db: Map<string, Task> = new Map()

    static get db() {
        return this._db
    }

    static set db(value: Map<string, Task>) {
        this._db = value
    }
}

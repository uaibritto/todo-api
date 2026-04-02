import { z } from 'zod'

import { taskSchema } from '@/modules/task/task.schema'

export type Task = z.infer<typeof taskSchema.entity>
export type CreateTaskDto = z.infer<typeof taskSchema.createTaskDto>
export type UpdateTaskDto = z.infer<typeof taskSchema.updateTaskDto>

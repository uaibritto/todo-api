import { styleText } from 'node:util'

import { application } from '@/application'
import { env } from '@/config/env'

application
    .onStart(() => console.log(styleText('bgBlue', ' Server started ')))
    .listen({ port: env.PORT, hostname: env.HOST })

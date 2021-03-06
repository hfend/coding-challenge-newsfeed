import { makeSchema } from 'nexus'
import { join } from 'path'

import * as types from './types'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'graphql_server', 'generated', 'nexus-typegen.ts'),
    schema: join(process.cwd(), 'graphql_server', 'generated', 'schema.graphql'),
  },
})

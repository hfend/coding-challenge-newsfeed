import { extendType, arg, nonNull } from 'nexus'

import db, {UserRow} from '../../db'


export const UserQuery = extendType({

  type: 'Query',

  definition(t) {

    t.nonNull.field('user', {
      type: 'User',
      args: {
        id: arg({
          type: nonNull("Int"),
        })
      },
      async resolve(_, {id}) {
        const user: UserRow | undefined = await db.getOne(
          'SELECT * FROM users WHERE id = ?',
          [id]
        )
        if (!user) {
          throw new Error(`User ${id} not found`)
        }
        return user
      }
    })

  }

})

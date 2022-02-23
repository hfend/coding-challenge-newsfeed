import { extendType, arg, nonNull } from 'nexus'

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
      async resolve(_, {id}, ctx) {
        const user = (await ctx.usersLoader.load(id))[0]

        if (!user) {
          throw new Error(`User ${id} not found`)
        }
        return user
      }
    })

  }

})

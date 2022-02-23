import { objectType, nonNull, list} from 'nexus'

export const User = objectType({

  name: 'User',

  definition(t) {
    
    t.nonNull.int('id')

    t.nonNull.string('fellowship')

    t.nonNull.string('name')

    t.nonNull.string('bio')

    t.nonNull.string('avatar_url')

    t.nonNull.string('created_ts')

    t.nonNull.string('updated_ts')

    t.field('projects', {
      type: nonNull(list(nonNull('Project'))),
      async resolve(user, _, ctx) {
        return ctx.userProjectsLoader.load(user.id)
      }
    })

  }

})

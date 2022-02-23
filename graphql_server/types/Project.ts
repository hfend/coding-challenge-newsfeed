import { objectType, nonNull, list} from 'nexus'

export const Project = objectType({

  name: 'Project',

  definition(t) {
    
    t.nonNull.int('id')

    t.nonNull.string('name')

    t.nonNull.string('description')

    t.nonNull.string('icon_url')

    t.nonNull.string('created_ts')

    t.nonNull.string('updated_ts')

    t.field('users', {
      type: nonNull(list(nonNull('User'))),
      async resolve(project, _,ctx) {
        return ctx.projectUsersLoader.load(project.id)
      }
    })

  }

})

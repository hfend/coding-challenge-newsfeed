import { extendType, arg, nonNull } from 'nexus'

export const ProjectQuery = extendType({

  type: 'Query',

  definition(t) {

    t.nonNull.field('project', {
      type: 'Project',
      args: {
        id: arg({
          type: nonNull("Int"),
        })
      },
      async resolve(_, {id}, ctx) {
        const project = (await ctx.projectsLoader.load(id))[0]

        if (!project) {
          throw new Error(`Project ${id} not found`)
        }
        return project
      }
    })

  }

})

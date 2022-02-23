import { extendType, arg, nonNull } from 'nexus'

import db, {ProjectRow} from '../../db'


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
      async resolve(_, {id}) {
        const project: ProjectRow | undefined = await db.getOne(
          'SELECT * FROM projects WHERE id = ?',
          [id]
        )
        if (!project) {
          throw new Error(`Project ${id} not found`)
        }
        return project
      }
    })

  }

})

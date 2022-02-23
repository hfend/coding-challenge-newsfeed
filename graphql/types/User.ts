import { objectType, nonNull, list} from 'nexus'

import db, {ProjectRow} from '../db'

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
      async resolve(user) {
        const projects: ProjectRow[] = await db.getAll(
          `
            SELECT p.*
            FROM user_projects up
            JOIN projects p ON up.project_id = p.id
            WHERE up.user_id = ?
          `,
          [user.id]
        )
        return projects
      }
    })

  }

})

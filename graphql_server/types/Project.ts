import { objectType, nonNull, list} from 'nexus'

import db, {UserRow} from '../db'

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
      async resolve(project) {
        const users: UserRow[] = await db.getAll(
          `
            SELECT u.*
            FROM user_projects up
            JOIN users u ON up.user_id = u.id
            WHERE up.project_id = ?
          `,
          [project.id]
        )
        return users
      }
    })

  }

})

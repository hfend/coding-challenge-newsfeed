import { objectType } from 'nexus'

import db, {UserRow, ProjectRow, AnnouncementRow} from '../db'

export const NewsfeedItem = objectType({

  name: 'NewsfeedItem',

  definition(t) {

    t.nonNull.string('type')

    t.nonNull.int('id')

    t.nonNull.string('created_ts')

    t.nonNull.field('data', {

      type: 'NewsfeedItemData',

      async resolve(newsfeed_row) {

        switch (newsfeed_row.type) {

          case 'Announcement':
            const announcement: AnnouncementRow | undefined = await db.getOne(
              'SELECT * FROM announcements WHERE id = ?',
              [newsfeed_row.id]
            )
            if (!announcement) {
              throw new Error(`Announcement ${newsfeed_row.id} not found`)
            }
            return {...announcement, type: 'Announcement'}

          case 'Project':
            const project: ProjectRow | undefined = await db.getOne(
              'SELECT * FROM projects WHERE id = ?',
              [newsfeed_row.id]
            )
            if (!project) {
              throw new Error(`Project ${newsfeed_row.id} not found`)
            }
            return {...project, type: 'Project'}

          case 'User':
            const user: UserRow | undefined = await db.getOne(
              'SELECT * FROM users WHERE id = ?',
              [newsfeed_row.id]
            )
            if (!user) {
              throw new Error(`User ${newsfeed_row.id} not found`)
            }
            return {...user, type: 'User'}

        }

      }
    })
  }

})

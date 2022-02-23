import { objectType } from 'nexus'

import db, {UserRow, ProjectRow, AnnouncementRow} from '../db'

export const NewsfeedItem = objectType({

  name: 'NewsfeedItem',

  definition(t) {

    t.nonNull.string('type')

    t.nonNull.int('id')

    t.nonNull.string('created_ts')

    t.field('announcement', {

      type: 'Announcement',

      async resolve(item) {

        if (item.type === 'Announcement') {
          const announcement: AnnouncementRow | undefined = await db.getOne(
            'SELECT * FROM announcements WHERE id = ?',
            [item.id]
          )
          if (!announcement) {
            throw new Error(`Announcement ${item.id} not found`)
          }
          return announcement
        }

        return null

      }
    })

    t.field('project', {

      type: 'Project',

      async resolve(item) {

        if (item.type === 'Project') {
          const project: ProjectRow | undefined = await db.getOne(
            'SELECT * FROM projects WHERE id = ?',
            [item.id]
          )
          if (!project) {
            throw new Error(`Project ${item.id} not found`)
          }
          return project
        }

        return null

      }
    })
    
    t.field('user', {

      type: 'User',

      async resolve(item) {

        if (item.type === 'User') {
          const user: UserRow | undefined = await db.getOne(
            'SELECT * FROM users WHERE id = ?',
            [item.id]
          )
          if (!user) {
            throw new Error(`User ${item.id} not found`)
          }
          return user
        }

        return null

      }
    })

  }

})

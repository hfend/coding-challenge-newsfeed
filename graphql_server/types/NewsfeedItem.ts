import { objectType } from 'nexus'

export const NewsfeedItem = objectType({

  name: 'NewsfeedItem',

  definition(t) {

    t.nonNull.string('type')

    t.nonNull.int('id')

    t.nonNull.string('created_ts')

    t.field('announcement', {

      type: 'Announcement',

      async resolve(item, _, ctx) {

        if (item.type === 'Announcement') {
          const announcement = (await ctx.announcementsLoader.load(item.id))[0]

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

      async resolve(item, _, ctx) {

        if (item.type === 'Project') {
          const project = (await ctx.projectsLoader.load(item.id))[0]

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

      async resolve(item, _, ctx) {

        if (item.type === 'User') {
          const user = (await ctx.usersLoader.load(item.id))[0]

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

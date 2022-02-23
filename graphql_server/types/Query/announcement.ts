import { extendType, arg, nonNull } from 'nexus'

export const AnnouncementQuery = extendType({

  type: 'Query',

  definition(t) {

    t.nonNull.field('announcement', {
      type: 'Announcement',
      args: {
        id: arg({
          type: nonNull("Int"),
        })
      },
      async resolve(_, {id}, ctx) {
        const announcement = (await ctx.announcementsLoader.load(id))[0]

        if (!announcement) {
          throw new Error(`Announcement ${id} not found`)
        }
          return announcement
      }
    })

  }

})

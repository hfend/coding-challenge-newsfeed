import { extendType, arg, nonNull } from 'nexus'

import db, {AnnouncementRow} from '../../db'


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
      async resolve(_, {id}) {
        const announcement: AnnouncementRow | undefined = await db.getOne(
          'SELECT * FROM announcements WHERE id = ?',
          [id]
        )
        if (!announcement) {
          throw new Error(`Announcement ${id} not found`)
        }
        return announcement
      }
    })

  }

})

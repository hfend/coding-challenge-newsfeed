import { objectType } from 'nexus'

export const Announcement = objectType({

  name: 'Announcement',

  definition(t) {
    
    t.nonNull.int('id')

    t.nonNull.string('fellowship')

    t.nonNull.string('title')

    t.nonNull.string('body')

    t.nonNull.string('created_ts')

    t.nonNull.string('updated_ts')

  }

})

import { unionType } from 'nexus'

export const NewsfeedItemData = unionType({

  name: 'NewsfeedItemData',

  definition(t) {

    t.members('Announcement', 'Project', 'User')

  },

  resolveType: (item) => item.type,

})

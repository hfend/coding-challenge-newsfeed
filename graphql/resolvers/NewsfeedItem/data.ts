import {NewsfeedRow, UserRow, ProjectRow, AnnouncementRow} from '../../db'
import announcementResolver from '../Query/announcement'
import projectResolver from '../Query/project'
import userResolver from '../Query/user'

export default async function data(newsfeed_row: NewsfeedRow): Promise<(UserRow | ProjectRow | AnnouncementRow) & {type: "Announcement" | "Project" | "User"}> {

  switch (newsfeed_row.type) {
    case 'Announcement':
      return {...await announcementResolver(null, {id: newsfeed_row.id}), type: 'Announcement'}
    case 'Project':
      return {...await projectResolver(null, {id: newsfeed_row.id}), type: 'Project'}
    case 'User':
      return {...await userResolver(null, {id: newsfeed_row.id}), type: 'User'}
  }
}

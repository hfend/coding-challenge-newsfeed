import { ApolloServer } from 'apollo-server-micro'
import DataLoader from 'dataloader'

import { schema } from './schema'
import db, { AnnouncementRow, ProjectRow, UserRow } from './db'

export const server = new ApolloServer({
    schema,
    context: () => {
        return {

            announcementsLoader: new DataLoader(async (keys: readonly number[]) => {

                const announcements: AnnouncementRow[] = await db.getAll(
                    `SELECT * FROM announcements WHERE id IN (${keys.join(',')})`
                )

                const announcementsMap = {} as any
                
                announcements.forEach(announcement => {
                    announcementsMap[announcement.id] = [
                        ...(announcement.id in announcementsMap)
                        ? [...announcementsMap[announcement.id]]
                        : [],
                        announcement
                    ]
                })

                return keys.map(key => announcementsMap[key]?announcementsMap[key]:[]);
            }),

            projectsLoader: new DataLoader(async (keys: readonly number[]) => {

                const projects: ProjectRow[] = await db.getAll(
                    `SELECT * FROM projects WHERE id IN (${keys.join(',')})`
                )

                const projectsMap = {} as any

                projects.forEach(project => {
                    projectsMap[project.id] = [
                        ...(project.id in projectsMap)
                            ? [...projectsMap[project.id]]
                            : [],
                        project
                    ]
                })

                return keys.map(key => projectsMap[key]?projectsMap[key]:[]);
            }),

            usersLoader: new DataLoader(async (keys: readonly number[]) => {

                const users: UserRow[] = await db.getAll(
                    `SELECT * FROM users WHERE id IN (${keys.join(',')})`
                )

                const usersMap = {} as any

                users.forEach(user => {
                    usersMap[user.id] = [
                        ...(user.id in usersMap)
                            ? [...usersMap[user.id]]
                            : [],
                        user
                    ]
                })

                return keys.map(key => usersMap[key]?usersMap[key]:[]);
            }),

            userProjectsLoader: new DataLoader(async (keys: readonly number[]) => {

                interface UserProjectRow extends ProjectRow {
                    user_id: number
                }
                
                const projects: UserProjectRow[] = await db.getAll(
                    `
                    SELECT p.*, up.user_id
                    FROM user_projects up
                    JOIN projects p ON up.project_id = p.id
                    WHERE up.user_id IN (${keys.join(',')})
                `
                )

                const userProjectsMap = {} as any

                projects.forEach(project => {
                    userProjectsMap[project.user_id] = [
                        ...(project.user_id in userProjectsMap)
                            ? [...userProjectsMap[project.user_id]]
                            : [],
                        project
                    ]
                })

                return keys.map(key => userProjectsMap[key]?userProjectsMap[key]:[]);
            }),

            projectUsersLoader: new DataLoader(async (keys: readonly number[]) => {

                interface ProjectUserRow extends UserRow {
                    project_id: number
                }
                
                const users: ProjectUserRow[] = await db.getAll(
                    `
                    SELECT u.*, up.project_id
                    FROM user_projects up
                    JOIN users u ON up.user_id = u.id
                    WHERE up.project_id IN (${keys.join(',')})
                `
                )

                const projectUsersMap = {} as any

                users.forEach(user => {
                    projectUsersMap[user.project_id] = [
                        ...(user.project_id in projectUsersMap)
                            ? [...projectUsersMap[user.project_id]]
                            : [],
                        user
                    ]
                })

                return keys.map(key => projectUsersMap[key]?projectUsersMap[key]:[]);
            })
        };
    }
})

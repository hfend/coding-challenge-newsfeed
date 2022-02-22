import db, {NewsfeedRow} from '../../db'

type Args = {
  fellowship: string; // TODO type
  offset: number;
  limit: number;
}

export default async function newsfeed(parent: unknown, {fellowship, offset, limit}: Args): Promise<NewsfeedRow[]> {

  let userQueryFellowshipCondition = ''

  switch (fellowship) {
    case 'angels':
      userQueryFellowshipCondition += 'fellowship = \'angels\' OR fellowship = \'founders\''
      break;
    case 'founders':
      userQueryFellowshipCondition += 'fellowship = \'angels\' OR fellowship = \'founders\''
      break;
    case 'writers':
      userQueryFellowshipCondition += 'fellowship = \'writers\''
      break;
  }

  let newsfeedBaseQuery = `
    SELECT id, created_ts, 'User' as type
    FROM users
    WHERE ${userQueryFellowshipCondition}

    UNION

    SELECT id, created_ts, 'Announcement' as type
    FROM announcements
    WHERE fellowship = '${fellowship}' OR fellowship = 'all'
  `

  // Only show projects for angels or founders, not writers.
  if (['angels', 'founders'].indexOf(fellowship) >= 0) {
    // NOTE
    // The spec says "Founders and angels are interested in new founders' projects".
    // I'm assuming project owners are guaranteed to be always founders.
    // If this is not the case, a `LEFT JOIN users..` can be used for restricting the following query's result to founders.
    newsfeedBaseQuery += `
      UNION

      SELECT id, created_ts, 'Project' as type
      FROM projects
    `
  }

  const fullQuery = `
    SELECT *
    FROM (
      ${newsfeedBaseQuery}
    ) BASE
    ORDER BY created_ts DESC
    LIMIT ${limit} OFFSET ${offset}
  `

  // NOTE: would've (possibly) joined the actual data to the newsfeed base result
  // however, node-sqlite3 overrides duplicate columns data unless they are each manually aliased
  // https://github.com/mapbox/node-sqlite3/issues/443

  // LEFT JOIN (SELECT *, 'Announcement' as type FROM announcements) a USING(id, type)
  // LEFT JOIN (SELECT *, 'Project' as type FROM projects) p USING(id, type)
  // LEFT JOIN (SELECT *, 'User' as type FROM users) u USING(id, type)

  return await db.getAll(fullQuery)

}

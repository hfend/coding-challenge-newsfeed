import path from 'path'
import {Database} from 'sqlite3'

class AsyncDatabase {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename)
  }

  async getOne<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    const rows = await this.getAll(sql, params);
    return rows[0];
  }

  async getAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(sql)
      stmt.all(...params, (err: Error | undefined, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

export default new AsyncDatabase(path.join(process.cwd(), 'db.sqlite'))

export type UserRow = {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  fellowship: "founders" | "angels" | "writers";
  created_ts: string;
  updated_ts: string;
}

export type ProjectRow = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts: string;
  updated_ts: string;
}

export type UserProjectRow = {
  user_id: number;
  project_id: number;
}

export type AnnouncementRow = {
  id: number;
  fellowship: "founders" | "angels" | "writers" | "all";
  title: string;
  body: string;
  created_ts: string;
  updated_ts: string;
}

export type NewsfeedRow = {
  type: "Announcement" | "Project" | "User";
  id: number;
  created_ts: string;
}

import { MongoClient, Db } from 'mongodb'
export let _database: Db | undefined
import * as Logger from 'loglevel'

export async function initializeDB(): Promise<Db> {
  try {
    const client = new MongoClient(process.env.DB_URL)
    const con = await client.connect()
    _database = await con.db()
    return _database
  } catch (e) {
    Logger.error('DB Connection Failed')
    Logger.error(e)
  }
}

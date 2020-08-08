import mysql, {Connection} from 'mysql'
let _database: Connection

export function initializeDB() {

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
  })

  _database = connection
  connection.connect()
}  

export function getDB(): Connection {
  if (_database) return _database
}

export function closeDB() {
  if (_database) _database.end()
}

const sqliteDb = require('src/db/sqlite')
const mysqlDb = require('src/db/mysql')

const dbType = process.env.DATABASE

let db

if (dbType === 'sqlite') {
  db = sqliteDb()
} else if (dbType === 'mysql') {
  db = mysqlDb({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 10,
  })
} else {
  throw new Error(`Invalid database type: ${dbType}`)
}

module.exports = db

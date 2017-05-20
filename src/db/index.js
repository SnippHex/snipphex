const sqliteDb = require('src/db/sqlite')

const dbType = process.env.DATABASE

let db

if (dbType === 'sqlite') {
  db = sqliteDb()
} else {
  throw new Error(`Invalid database type: ${dbType}`)
}

module.exports = db

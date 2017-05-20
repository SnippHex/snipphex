const sqliteRepo = require('./sqlite')

const dbType = process.env.DATABASE

let repo

if (dbType === 'sqlite') {
  repo = sqliteRepo
} else {
  throw new Error(`Invalid database type: ${dbType}`)
}

module.exports = repo

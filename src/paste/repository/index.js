const sqliteRepo = require('./sqlite')
const mysqlRepo = require('./mysql')

const dbType = process.env.DATABASE

let repo

if (dbType === 'sqlite') {
  repo = sqliteRepo
} else if (dbType === 'mysql') {
  repo = mysqlRepo
} else {
  throw new Error(`Invalid database type: ${dbType}`)
}

module.exports = repo

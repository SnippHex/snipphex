const sqlite3 = require('sqlite3')
const path = require('path')

const fileName = 'db.db'

module.exports = function create() {
  const db = new sqlite3.Database(path.join(ROOT, 'data', fileName))

  return db
}

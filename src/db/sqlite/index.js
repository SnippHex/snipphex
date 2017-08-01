const sqlite3 = require('sqlite3')
const path = require('path')
const Promise = require('bluebird')

sqlite3.Database.prototype = Promise.promisifyAll(sqlite3.Database.prototype)

const fileName = 'db.db'

module.exports = function create() {
  const db = new sqlite3.Database(path.join(ROOT, 'data', fileName))

  db._finish = function _finish() {}

  return db
}

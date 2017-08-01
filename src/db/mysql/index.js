const mysql = require('mysql')
const Promise = require('bluebird')
const Pool = require('mysql/lib/Pool')
const Connection = require('mysql/lib/Connection')

Promise.promisifyAll([Pool, Connection])

module.exports = function create(options) {
  const pool = mysql.createPool(options)

  pool._finish = function _finish() {
    return pool.end()
  }

  return pool
}

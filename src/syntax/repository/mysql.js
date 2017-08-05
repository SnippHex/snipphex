const db = require('src/db')

async function all() {
  return db.queryAsync('SELECT id, name, extension, lexer from syntax').then(results => results)
}

async function getById(id) {
  return db.queryAsync('SELECT id, name, extension, lexer FROM syntax WHERE id = ?', [id])
          .then((results) => {
            return (results) ? results[0] : null
          })
}

async function create(data) {
  return db.queryAsync('INSERT INTO syntax (name, extension, lexer) VALUES (?, ?, ?)', [data.name, data.extension, data.lexer])
          .then(results => results.insertId)
}

module.exports = {
  all,
  getById,
  create,
}

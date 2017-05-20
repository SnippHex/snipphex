const db = require('src/db')

async function all() {
  return db.allAsync('SELECT id, name, extension from syntax').then(rows => rows)
}

async function getById(id) {
  return db.getAsync('SELECT id, name, extension FROM syntax WHERE id = ?', [id])
}

async function create(data) {
  return db.runAsync('INSERT INTO syntax (name, extension, lexer) VALUES (?, ?, ?)', [data.name, data.extension, data.lexer])
    .then(result => result.lastID)
}

module.exports = {
  all,
  getById,
  create,
}

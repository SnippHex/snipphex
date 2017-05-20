const db = require('src/db')

async function all() {
  return db.allAsync('SELECT id, name, extension from syntax').then(rows => rows)
}

async function getById(id) {
  return db.getAsync('SELECT id, name, extension FROM syntax WHERE id = ?', [id])
}

async function create(data) {
  return db.runAsync('INSERT INTO syntax SET name = ?, extension = ?', [data.name, data.extension])
    .then(result => result.lastID)
}

module.exports = {
  all,
  getById,
  create,
}

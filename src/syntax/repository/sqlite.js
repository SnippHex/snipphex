const promisify = require('promisify-node')
const db = promisify(require('src/db'))

async function all() {
  return db.all('SELECT id, name, extension from syntax')
}

async function getById(id) {
  return db.get('SELECT id, name, extension FROM syntax WHERE id = ?', [id])
}

async function create(data) {
  return db.run('INSERT INTO syntax SET name = ?, extension = ?', [data.name, data.extension])
    .then(result => result.lastID)
}

module.exports = {
  all,
  getById,
  create,
}

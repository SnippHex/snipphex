const db = require('src/db')
const pasteKeyCoder = require('src/paste/key-coder')

async function getById(id) {
  return db.getAsync('SELECT id, title, visiblity FROM paste WHERE id = ?', [id])
}

async function getByKey(key) {
  const id = pasteKeyCoder.decode(key)

  return getById(id)
}

async function create(data) {
  return db.runAsync('INSERT INTO paste SET title = ?, visiblity = ?, syntax_id = ?', [data.title, data.visibility, data.syntax_id])
    .then(result => result.lastID)
}

module.exports = {
  getById,
  getByKey,
  create,
}

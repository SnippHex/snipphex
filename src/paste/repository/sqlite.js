const db = require('src/db')
const pasteKeyCoder = require('src/paste/key-coder')

async function getById(id) {
  return db.getAsync('SELECT id, title, visibility, syntax_id as syntaxId FROM paste WHERE id = ?', [id])
}

async function getByKey(key) {
  const id = pasteKeyCoder.decode(key)

  return getById(id)
}

async function create(data) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO paste (title, visibility, syntax_id) VALUES (?, ?, ?)', [data.title, data.visibility, data.syntaxId], function createCb(err) {
      if (err) {
        return reject(err)
      }

      resolve(this.lastID)
    })
  })
}

module.exports = {
  getById,
  getByKey,
  create,
}

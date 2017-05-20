const db = require('src/db')

async function all() {
  return db.allAsync('SELECT id, name, extension, lexer from syntax').then(rows => rows)
}

async function getById(id) {
  return db.getAsync('SELECT id, name, extension, lexer FROM syntax WHERE id = ?', [id])
}

async function create(data) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO syntax (name, extension, lexer) VALUES (?, ?, ?)', [data.name, data.extension, data.lexer], function createCb(err) {
      if (err) {
        return reject(err)
      }

      resolve(this.lastID)
    })
  })
}

module.exports = {
  all,
  getById,
  create,
}

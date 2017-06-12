const moment = require('moment')
const db = require('src/db')
const pasteKeyCoder = require('src/paste/key-coder')

function mapRow(row) {
  if (row) {
    row.createdAt = moment.utc(row.createdAt).unix()
    row.key = pasteKeyCoder.encode(row.id)
  }

  return row
}

async function getById(id) {
  return db.getAsync('SELECT id, title, visibility, syntax_id as syntaxId, created_at as createdAt, size, lines FROM paste WHERE id = ?', [id]).then(mapRow)
}

async function getByKey(key) {
  const id = pasteKeyCoder.decode(key)

  return getById(id)
}

async function getLatests(limit) {
  return db.allAsync(`
    SELECT paste.id as id, title, syntax.name as syntaxName, created_at as createdAt, size
    FROM paste
    JOIN syntax ON syntax.id = paste.syntax_id
    ORDER BY createdAt DESC
    LIMIT ${limit}
    `).then(rows => rows.map(mapRow))
}

async function create(data) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO paste (title, visibility, syntax_id, size, lines) VALUES (?, ?, ?, ?, ?)',
      [data.title, data.visibility, data.syntaxId, data.size, data.lines],
      function createCb(err) {
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
  getLatests,
  create,
}

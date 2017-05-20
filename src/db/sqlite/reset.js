const fse = require('fs-extra')
const path = require('path')

module.exports = async function reset(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        return reject(err)
      }

      resolve(fse.unlink(path.join(ROOT, 'data', 'db.db')))
    })
  })
}

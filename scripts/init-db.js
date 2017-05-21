require('../bootstrap')
require('src/db')
const initPromise = require('src/db/init')
const syntaxService = require('src/syntax/service')
const syntaxes = require('./data/syntaxes')

async function initDb() {
  if (initPromise) {
    return initPromise.then(async () => {
      for (let i = 0; i < syntaxes.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await syntaxService.create(syntaxes[i])
      }
    })
  }
}

initDb()

require('../bootstrap')
require('src/db')
const initPromise = require('src/db/init')
const syntaxService = require('src/syntax/service')
const syntaxes = require('./data/syntaxes')

if (initPromise) {
  initPromise.then(() => {
    syntaxes.forEach(v => syntaxService.create(v))
  })
}

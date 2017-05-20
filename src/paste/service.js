const repo = require('./repository')
const content = require('./content')
const syntaxService = require('src/syntax/service')
const keyCoder = require('./key-coder')
const pygmentsGenerateHtml = require('src/pygments').generateHtml

async function generateHtml(paste) {
  return pygmentsGenerateHtml(content.generateFullPath(paste.id), 'monokai', paste.syntax.lexer)
}

module.exports = {
  repository: repo,
  contentProvider: content,

  getById: repo.getById,
  getByKey: repo.getByKey,
  create: repo.create,
  getSizeOfContent: content.size,
  getContent: content.get,
  putContent: content.put,

  includeSyntax: async (paste) => {
    let syntax

    if (paste.syntaxId) {
      syntax = await syntaxService.getById(paste.syntaxId)
    } else {
      syntax = null
    }

    paste.syntax = syntax

    return paste
  },

  encodeId: keyCoder.encode,
  decodeKey: keyCoder.decode,
  generateHtml,
}

const repo = require('./repository')
const content = require('./content')
const syntaxService = require('src/syntax/service')
const keyCoder = require('./key-coder')
const pygmentsGenerateHtml = require('src/pygments').generateHtml

const VISIBILITY_PUBLIC = 0
const VISIBILITY_UNLISTED = 1

const DEFAULT_TITLE = 'snipp'
const DEFAULT_VISIBILITY = VISIBILITY_PUBLIC
const DEFAULT_SYNTAX_ID = 1

async function generateHtml(paste) {
  return pygmentsGenerateHtml(content.generateFullPath(paste.id), 'monokai', paste.syntax.lexer)
}

module.exports = {
  repository: repo,
  contentProvider: content,

  getById: repo.getById,
  getByKey: repo.getByKey,
  getLatests: repo.getLatests,
  create: async (paste) => {
    if (!paste.visibility ||
        paste.visibility !== VISIBILITY_PUBLIC &&
        paste.visibility !== VISIBILITY_UNLISTED) {
      paste.visibility = DEFAULT_VISIBILITY
    }

    return repo.create(paste)
  },
  getSizeOfContent: content.size,
  getContent: content.get,
  putContent: content.put,
  getContentPath: content.generateFullPath,

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

  VISIBILITY_PUBLIC,
  VISIBILITY_UNLISTED,

  DEFAULT_TITLE,
  DEFAULT_VISIBILITY,
  DEFAULT_SYNTAX_ID,
}

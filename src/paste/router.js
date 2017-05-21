const express = require('express')
const pasteService = require('./service')
const syntaxService = require('src/syntax/service')
const logger = require('src/logger')
const errors = require('restify-errors')

const router = express.Router()

const LATEST_CPS_LIMIT = process.env.LATEST_CPS_LIMIT || 10

router.put('/paste', async (req, res) => {
  const title = req.body.title || pasteService.DEFAULT_TITLE
  const visibility = req.body.visibility || pasteService.DEFAULT_VISIBILITY
  const syntaxId = req.body.syntaxId || pasteService.DEFAULT_SYNTAX_ID
  const content = req.body.content

  // Make sure we have all parameters
  if (typeof title !== 'string' || typeof visibility !== 'number' || typeof syntaxId !== 'number' || typeof content !== 'string') {
    return res.sendError(new errors.MissingParameterError('Not enough parameters'))
  }

  // Check for syntax
  const syntax = await syntaxService.getById(syntaxId)
  if (!syntax) {
    // TODO: Status and error
    return res.sendError(new errors.InvalidArgumentError('Binary files are not allowed'))
  }

  // Make sure content is not binary
  const contentBuffer = Buffer.from(content, 'base64')
  const length = (contentBuffer.length > 1024) ? 1024 : contentBuffer.length
  let nulls = 0
  for (let i = 0; i < length; ++i) {
    if (contentBuffer[i] === 0) {
      ++nulls
    }
  }

  const isContentBinary = nulls > 0
  if (isContentBinary) {
    return res.sendError(new errors.InvalidContentError('Binary files are not allowed'))
  }

  const contentUtf8 = contentBuffer.toString('utf8')

  let id
  try {
    await pasteService.create({ title, visibility, syntaxId, size: contentUtf8.length }) // Persist meta
      .then((insertId) => {
        id = insertId
        // Persist content
        pasteService.putContent(id, contentUtf8)
      })
  } catch (err) {
    // Failed to persist
    logger.error('Failed to persist meta or content', { err, title, visibility, syntaxId, content })
    res.sendError(new errors.InternalServerError('Failed to fetch paste'))
  }

  res.json({ data: { key: pasteService.encodeId(id) } })
})

router.get('/paste/latests', async (req, res) => {
  try {
    const pastes = await pasteService.getLatests(LATEST_CPS_LIMIT)

    res.json({ data: pastes })
  } catch (err) {
    logger.error('Route failed /paste/latests', { err })
    res.sendError(new errors.InternalServerError('Failed to fetch latest cps'))
  }
})

router.get('/paste/:key', async (req, res) => {
  const key = req.params.key

  try {
    const paste = await pasteService.getByKey(key)
    if (!paste) {
      return res.sendError(new errors.NotFoundError('Paste not found'))
    }
    await pasteService.includeSyntax(paste)
    paste.size = await pasteService.getSizeOfContent(paste.id)

    res.json({ data: paste })
  } catch (err) {
    logger.error('Route failed /paste/:key/content/html', { err, key: req.params.key })
    res.sendError(new errors.InternalServerError('Failed to fetch paste'))
  }
})

router.get('/paste/:key/content/html', async (req, res) => {
  try {
    const paste = await pasteService.getByKey(req.params.key)
    if (!paste) {
      return res.sendError(new errors.NotFoundError('Paste not found'))
    }
    await pasteService.includeSyntax(paste)
    res.send(await pasteService.generateHtml(paste))
  } catch (err) {
    logger.error('Route failed /paste/:key/content/html', { err, key: req.params.key })
    res.sendError(new errors.InternalServerError('Failed to fetch content'))
  }
})

router.get('/paste/:key/content/raw', async (req, res) => {
  try {
    const paste = await pasteService.getByKey(req.params.key)
    if (!paste) {
      return res.sendError(new errors.NotFoundError('Paste not found'))
    }
    res.sendFile(pasteService.getContentPath(paste.id))
  } catch (err) {
    logger.error('Route failed /paste/:key/content/raw', { err, key: req.params.key })
    res.sendError(new errors.InternalServerError('Failed to fetch content'))
  }
})

module.exports = router

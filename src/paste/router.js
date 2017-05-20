const express = require('express')
const pasteService = require('./service')
const syntaxService = require('src/syntax/service')
const logger = require('src/logger')

const router = express.Router()

router.put('/paste', async (req, res) => {
  const title = req.body.title
  const visibility = req.body.visibility
  const syntaxId = req.body.syntaxId
  const content = req.body.content

  // TODO: Title constraint / default
  // TODO: Visibility constraint / default

  // Make sure we have all parameters
  if (typeof title !== 'string' || typeof visibility !== 'number' || typeof syntaxId !== 'number' || typeof content !== 'string') {
    // TODO: Status and error
    return res.json({ error: { code: 1, message: 'parameters' } })
  }

  // Check for syntax
  const syntax = await syntaxService.getById(syntaxId)
  if (!syntax) {
    // TODO: Status and error
    return res.json({ error: { code: 3, message: 'syntax' } })
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
    // TODO: Status and error
    return res.json({ error: { code: 2, message: 'binary' } })
  }

  const contentUtf8 = contentBuffer.toString('utf8')

  let id
  try {
    await pasteService.create({ title, visibility, syntaxId }) // Persist meta
      .then((insertId) => {
        id = insertId
        // Persist content
        pasteService.putContent(id, contentUtf8)
      })
  } catch (e) {
    // Failed to persist
    // TODO: status and error
    logger.error(e)
    return res.json({ error: { code: 4, message: 'persist' } })
  }

  res.json({ data: { key: pasteService.encodeId(id) } })
})

router.get('/paste/:key', async (req, res) => {
  const key = req.params.key

  try {
    const paste = await pasteService.getByKey(key).then(pasteService.includeSyntax)

    res.json({ data: paste })
  } catch (e) {
    logger.error(e)
    res.status(404).json({ code: 404, message: 'Paste not found' })
  }
})

router.get('/paste/:key/content/html', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

module.exports = router

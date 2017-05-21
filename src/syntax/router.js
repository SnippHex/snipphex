const express = require('express')
const logger = require('src/logger')
const syntaxService = require('src/syntax/service')
const errors = require('restify-errors')

const router = express.Router()

router.get('/syntax', async (req, res) => {
  try {
    const syntaxes = await syntaxService.all()
    res.json({ data: syntaxes })
  } catch (err) {
    logger.error('Route failed /syntax', { err })
    res.sendError(new errors.InternalServerError('Failed to fetch syntaxes'))
  }
})

module.exports = router

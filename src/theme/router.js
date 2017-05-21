const express = require('express')
const themeService = require('./service')
const logger = require('src/logger')
const errors = require('restify-errors')

const router = express.Router()

router.get('/theme', async (req, res) => {
  try {
    res.json({ data: await themeService.all() })
  } catch (err) {
    logger.error('Route failed /theme', { err, name: req.params.name })
    res.sendError(new errors.InternalServerError('Failed to fetch themes'))
  }
})

router.get('/theme/:name/css', async (req, res) => {
  try {
    const css = await themeService.getCss(req.params.name)

    if (!css) {
      return res.sendError(new errors.NotFoundError('Theme not found'))
    }

    res.send(css)
  } catch (err) {
    logger.error('Route failed /theme/:name/css', { err, name: req.params.name })
    res.sendError(new errors.InternalServerError('Failed to fetch theme CSS'))
  }
})

module.exports = router

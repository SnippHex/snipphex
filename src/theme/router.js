const express = require('express')
const themeService = require('./service')

const router = express.Router()

router.get('/theme', async (req, res) => {
  res.json({ data: await themeService.all() })
})

router.get('/theme/:name/css', async (req, res) => {
  res.send(await themeService.getCss(req.params.name))
})

module.exports = router

const express = require('express')
const syntaxService = require('src/syntax/service')

const router = express.Router()

router.get('/syntax', async (req, res) => {
  res.json(await syntaxService.all())
})

module.exports = router

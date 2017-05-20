const express = require('express')
const syntaxService = require('src/syntax/service')

const router = express.Router()

router.get('/syntax', async (req, res) => {
  const syntaxes = await syntaxService.all()
  res.json({ data: syntaxes })
})

module.exports = router

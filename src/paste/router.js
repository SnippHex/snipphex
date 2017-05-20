const express = require('express')

const router = express.Router()

router.put('/paste', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

router.get('/paste/:key', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

router.get('/paste/:key/content/html', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

module.exports = router

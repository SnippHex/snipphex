const express = require('express')

const router = express.Router()

router.get('/theme', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

router.get('/theme/:id/css', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

module.exports = router

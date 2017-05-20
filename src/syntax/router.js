const express = require('express')

const router = express.Router()

router.get('/syntax', (req, res) => {
  res.json({ error: { code: 0, message: 'Not yet implemented' } })
})

module.exports = router

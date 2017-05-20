const express = require('express')
const logger = require('src/logger')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  logger.info(`HTTP Server listening on port ${port}!`)
})

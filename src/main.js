const express = require('express')
const logger = require('src/logger')

const app = express()
const port = process.env.PORT || 3000

app.use(require('src/paste/router'))
app.use(require('src/syntax/router'))
app.use(require('src/theme/router'))

app.listen(port, () => {
  logger.info(`HTTP Server listening on port ${port}!`)
})

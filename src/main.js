const express = require('express')
const logger = require('src/logger')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())

app.use((req, res, next) => {
  res.sendError = (error) => {
    res.status(error.statusCode).json(error.body)
  }
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Accept,Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST')
  next()
})

app.use(bodyParser.json({ limit: '10mb' }))
app.use(require('src/paste/router'))
app.use(require('src/syntax/router'))
app.use(require('src/theme/router'))

app.listen(port, () => {
  logger.info(`HTTP Server listening on port ${port}!`)
})

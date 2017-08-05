const express = require('express')
const logger = require('src/logger')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const errors = require('restify-errors')
const RateLimiter = require('limiter').RateLimiter

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

app.use(bodyParser.json({ limit: process.env.JSON_REQUEST_SIZE_LIMIT || '1mb' }))

const limiter = new RateLimiter(process.env.LIMITER_COUNT || 5, process.env.LIMITER_INTERVAL || 'second', true)
app.use((req, res, next) => {
  limiter.removeTokens(1, (err, remainingTokens) => {
    if (remainingTokens > 0) {
      next()
    } else {
      return res.sendError(new errors.TooManyRequestsError('Too many requests'))
    }
  })
})

app.use(require('src/paste/router'))
app.use(require('src/syntax/router'))
app.use(require('src/theme/router'))

app.listen(port, () => {
  logger.info(`HTTP Server listening on port ${port}!`)
})

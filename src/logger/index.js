const winston = require('winston')

winston.level = process.env.LOG_LEVEL || 'debug'

module.exports = winston

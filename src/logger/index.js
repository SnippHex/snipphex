const winston = require('winston')
const path = require('path')

const logger = new winston.Logger({
  level: process.env.LOG_LEVEL || 'debug',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: path.join(ROOT, 'logs', 'log.log') }),
  ],
  filters: [
    function filterErrors(level, msg, meta) {
      if (meta && meta.err) {
        meta.err = {
          message: meta.err.message,
          stack: meta.err.stack,
        }
      }

      return msg
    },
  ],
})

module.exports = logger

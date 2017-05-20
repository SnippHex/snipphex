const db = require('src/db')
const logger = require('src/logger')

try {
  // eslint-disable-next-line
  const reset = require(`src/db/${process.env.DATABASE}/reset`)
  reset(db)
} catch (e) {
  logger.error(`Failed to reset: ${process.env.DATABASE}`)
}

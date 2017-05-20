const db = require('src/db')
const logger = require('src/logger')

try {
  // eslint-disable-next-line
  const init = require(`src/db/${process.env.DATABASE}/init`)
  init(db)
} catch (e) {
  logger.error(`Failed to initalize: ${process.env.DATABASE}`)
}

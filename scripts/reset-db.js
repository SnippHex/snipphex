require('../bootstrap')
const db = require('src/db')
require('src/db/reset').then(() => db._finish())

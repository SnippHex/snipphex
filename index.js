require('app-module-path/register')

require('dotenv').config()

global.ROOT = __dirname

require('src/main')

const execFile = require('child_process').execFile
const path = require('path')

const pygmentize = path.join(ROOT, 'pygments', 'pygmentize')
const formatterFile = 'pygment_formatter.py'
const wrapperClassName = 's_h'

async function getThemeCss(name) {
  const args = [
    '-f', 'html',
    '-S', name,
    '-a', `.${wrapperClassName}`,
  ]

  return execPygmentize(args)
}

async function generateHtml(filePath, style, lexerArg) {
  const lexer = lexerArg || 'text'

  const args = [
    '-O', `style=${style}`,
    '-l', lexer,
    '-f', formatterFile,
    '-x',
    filePath,
  ]

  return execPygmentize(args)
}

async function execPygmentize(args) {
  return new Promise((resolve, reject) => {
    execFile('python', [pygmentize, ...args], (err, stdout) => {
      if (err) {
        return reject(err)
      }

      resolve(stdout)
    })
  })
}

module.exports = {
  getThemeCss,
  generateHtml,
  exec: execPygmentize,
}

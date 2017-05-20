const exec = require('child_process').exec
const path = require('path')

const pygmentize = path.join(ROOT, 'pygments', 'pygmentize')
const formatterFile = 'pygment_formatter.py'
const wrapperClassName = 's_h'

async function getThemeCss(name) {
  return execPygmentize(`-f html -S ${name} -a .${wrapperClassName}`)
}

async function generateHtml(filePath, style, lexer) {
  return execPygmentize(`-O style=${style} -l ${lexer} -f ${formatterFile} -x ${filePath}`)
}

async function execPygmentize(arg) {
  return new Promise((resolve, reject) => {
    exec(`python ${pygmentize} ${arg}`, (err, stdout) => {
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

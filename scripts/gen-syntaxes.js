require('../bootstrap')

const pygments = require('src/pygments')
const os = require('os')
const fs = require('fs')
const path = require('path')

async function doIt() {
  const out = await pygments.exec(['-L', 'lexers'])
  const lines = out.split(os.EOL).slice(4, -1)

  const results = []
  for (let i = 0; i < lines.length; i += 2) {
    const lexers = lines[i]
    const meta = lines[i + 1]

    if (lexers && meta) {
      const lexer = lexers.slice(2, -1).split(',')[0]
      const fileNamesIndex = meta.indexOf('(filenames')
      const name = (fileNamesIndex !== -1) ? meta.substring(0, fileNamesIndex).trim() : meta.trim()

      let extension = meta.match(/(\*\.[^.,)]{0,})/gi)
      if (!extension) {
        extension = ''
      } else {
        extension = extension[0]

        // This seems redundant because of the regex, but hey...
        if (extension.indexOf('*.') === -1) {
          extension = ''
        } else {
          extension = extension.substr(2)
        }
      }

      results.push({
        name,
        extension,
        lexer,
      })
    }
  }

  fs.writeFileSync(path.join(ROOT, 'scripts', 'data', 'syntaxes.out.json'), JSON.stringify(results))
}

doIt()

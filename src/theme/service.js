const pygments = require('src/pygments')
const os = require('os')

async function all() {
  const stylesOut = await pygments.exec(['-L', 'styles'])
  const lines = stylesOut.split(os.EOL)
  const styles = lines.slice(4).filter((v, k) => k % 2 === 0 && v !== '').map(v => v.slice(2, -1))

  return styles
}

module.exports = {
  all,
  getCss: pygments.getThemeCss,
}

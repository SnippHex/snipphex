const pygments = require('src/pygments')
const os = require('os')

let stylesCache

async function all() {
  if (stylesCache) {
    return stylesCache
  }

  const stylesOut = await pygments.exec(['-L', 'styles'])
  const lines = stylesOut.split(os.EOL)
  const styles = lines.slice(4).filter((v, k) => k % 2 === 0 && v !== '').map(v => v.slice(2, -1))

  stylesCache = styles

  return stylesCache
}

module.exports = {
  all,
  getCss: (name) => {
    name = name.toLowerCase()
    if (!all()[name]) {
      return null
    }

    return pygments.getThemeCss(name)
  },
}

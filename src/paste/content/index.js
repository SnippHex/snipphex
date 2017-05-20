const fse = require('fs-extra')
const path = require('path')

const sectionCount = 7
const sectionSize = 3

const paddingStr = new Array(sectionCount * sectionSize + 1).join('0')
const encoding = 'UTF-8'

const directoryPath = path.join(ROOT, 'data', 'paste', 'content')

function generatePath(id) {
  const idStr = `${id}`
  const paddedIdStr = (paddingStr + idStr).substring(idStr.length)

  let dirPath = ''
  const sections = Math.ceil(paddedIdStr.length / sectionSize)
  for (let i = 0; i < sections; i++) {
    dirPath += path.sep + paddedIdStr.substr(i * sectionSize, sectionSize)
  }

  return dirPath
}

function generateFullPath(id) {
  return path.join(directoryPath, generatePath(id))
}

async function get(id) {
  const filePath = generateFullPath(id)

  return fse.readFile(filePath, encoding)
}

async function put(id, content) {
  const filePath = generateFullPath(id)

  return fse.outputFile(filePath, content)
}

async function size(id) {
  const filePath = generateFullPath(id)

  return fse.stat(filePath).then(stats => stats.size)
}

module.exports = {
  get,
  put,
  size,
  generatePath,
  generateFullPath,
}

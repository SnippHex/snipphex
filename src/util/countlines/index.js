module.exports = function countLines(buffer) {
  let index = -1
  let count = 0

  while ((index = buffer.indexOf(10, index + 1)) > -1) {
    count++
  }

  return (!count) ? 1 : count
}

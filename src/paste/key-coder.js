const codeMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
const base = codeMap.length

module.exports = {
  encode: function encode(id) {
    --id
    let key = ''

    do {
      key += codeMap.charAt(id % base)
      id = Math.floor(id / base)
    } while (id > 0)

    return key.split('').reverse().join('')
  },

  decode: function decode(key) {
    let id = 0

    for (let i = 0, len = key.length; i < len; i++) {
      id = id * base + codeMap.indexOf(key.charAt(i))
    }

    return ++id
  },

  codeMap,
  base,
}

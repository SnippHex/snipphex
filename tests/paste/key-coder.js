const expect = require('chai').expect
const keyCoder = require('src/paste/key-coder')

const returnChecks = [
  [1, 'a'],
  [2, 'b'],
  [64, '_'],
  [65, 'ba'],
  [66, 'bb'],
  [129, 'ca'],
]

describe('paste', () => {
  describe('key-coder', () => {
    describe('#encode', () => {
      it('should exists', () => {
        expect(keyCoder.encode).to.be.a.function
      })

      it('should return the right base64 equivalent', () => {
        returnChecks.forEach(val => expect(keyCoder.encode(val[0])).to.be.eq(val[1]))
      })
    })

    describe('#decode', () => {
      it('should exists', () => {
        expect(keyCoder.decode).to.be.a.function
      })

      it('should return the right base10 equivalent', () => {
        returnChecks.forEach(val => expect(keyCoder.decode(val[1])).to.be.eq(val[0]))
      })
    })
  })
})

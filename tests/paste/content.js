const expect = require('chai').expect
const pasteContent = require('src/paste/content')

describe('paste', () => {
  describe('content', () => {
    describe('#put', () => {
      it('should exists', () => {
        expect(pasteContent.put).to.be.a.function
      })

      it('should save content of file', (done) => {
        pasteContent.put(1, 'asd').then(done).catch(err => done(err))
      })
    })

    describe('#get', () => {
      it('should exists', () => {
        expect(pasteContent.get).to.be.a.function
      })

      it('should throw error for non-existing paste content', (done) => {
        pasteContent.get(8756).then(() => done(true)).catch(() => done())
      })

      it('should return contents of file', (done) => {
        pasteContent.get(1).then(content => done(content === 'asd')).catch(err => done(err))
      })
    })
  })
})

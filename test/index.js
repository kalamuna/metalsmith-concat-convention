const assertDir = require('assert-dir-equal')
const Metalsmith = require('metalsmith')
const collections = require('..')

/* global it describe */
function test(name) {
  const path = 'test/fixtures/' + name
  it(path, done => {
    const metalsmith = new Metalsmith(path)
    metalsmith
      .use(collections())
      .build(err => {
        if (err) {
          return done(err)
        }

        // Check whether the files were build just file.
        assertDir(path + '/build', path + '/expected')

        done()
      })
  })
}

describe('metalsmith-concat-conventions', () => {
  test('basic')
  test('multiple')
  test('pattern')
  test('subfolder')
  test('outputchange')
})

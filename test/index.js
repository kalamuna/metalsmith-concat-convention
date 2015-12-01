var assertDir = require('assert-dir-equal')
var collections = require('../')
var Metalsmith = require('metalsmith')

/* global it describe */
function test(name) {
  var path = 'test/fixtures/' + name
  it(path, function (done) {
    var metalsmith = new Metalsmith(path)
    metalsmith
      .use(collections())
      .build(function (err) {
        if (err) {
          return done(err)
        }

        // Check whether the files were build just file.
        assertDir(path + '/build', path + '/expected')

        done()
      })
  })
}

describe('metalsmith-concat-conventions', function () {
  test('basic')
  test('multiple')
})

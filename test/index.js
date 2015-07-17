var assertDir = require('assert-dir-equal')
var collections = require('../')
var Metalsmith = require('metalsmith')

/* global it */
it('test/fixtures/basic', function (done) {
  var metalsmith = Metalsmith('test/fixtures/basic')
  metalsmith
    .use(collections())
    .build(function (err) {
      if (err) {
        return done(err)
      }

      // Check whether the files were build just file.
      assertDir('test/fixtures/basic/build', 'test/fixtures/basic/expected')

      done()
    })
})

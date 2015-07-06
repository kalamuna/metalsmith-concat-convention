'use strict'

var metalsmithConcat = require('metalsmith-concat')
var path = require('path')
var extend = require('extend')
var async = require('async')

module.exports = function (opts) {
  return function (files, metalsmith, done) {
    // Collect each concat file.
    var concats = []
    for (var file in files) {
      // Check if it matches the convention.
      if (path.extname(file) === '.concat') {
        // Add it to the concat array.
        concats.push(extend({}, files[file], {
          // Provide the output file name.
          output: path.basename(file, '.concat')
        }))
        delete files[file]
      }
    }

    // Use async to process each concat object.
    async.each(concats, function (concat, complete) {
      // Tell Metalsmith Concat plugin to do its thing.
      metalsmithConcat(concat)(files, metalsmith, complete)
    }, done)
  }
}

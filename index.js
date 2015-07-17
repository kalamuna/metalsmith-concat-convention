'use strict'

var metalsmithConcat = require('metalsmith-concat')
var path = require('path')
var extend = require('extend')
var async = require('async')

module.exports = function (opts) {
  opts = opts || {}
  opts.extname = '.concat'

  return function (files, metalsmith, done) {
    // Collect each concat file.
    var concats = []
    for (var file in files) {
      // Check if it matches the convention.
      if (path.extname(file) === opts.extname) {
        // Ensure the file has a files entry.
        if (files[file].files) {
          // Append the current file itself to the end of concatenation.
          files[file].files.push(file)
          // Add the file to the concat array queue.
          concats.push(extend({}, files[file], {
            // Tell Metalsmith Concat where to save the file.
            output: path.basename(file, opts.extname)
          }))
        }
      }
    }

    // Use async to process each concat object.
    async.each(concats, function (concat, complete) {
      // Tell Metalsmith Concat plugin to do its thing.
      metalsmithConcat(concat)(files, metalsmith, complete)
    }, done)
  }
}

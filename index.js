'use strict'

var path = require('path')
var metalsmithConcat = require('metalsmith-concat')
var async = require('async')

module.exports = function (opts) {
  // Default configuration.
  opts = opts || {}
  opts.extname = opts.extname || '.concat'

  // Execute the plugin.
  return function (files, metalsmith, done) {
    /**
     * Check if the given file is a .concat file. Call done() with result.
     */
    function filterFile(file, done) {
      // Ensure it matches the extension.
      var correctExtention = path.extname(file) === opts.extname

      // Make sure it has defined files.
      var hasFiles = files[file].files
      done(null, correctExtention && hasFiles)
    }

    /**
     * Tell Metalsmith Concatenate to process on the given file config.
     */
    function concatenateFile(file, done) {
      // Append the concat file itself to the end of the concatenation.
      files[file].files.push(file)

      // Output the file to the destination, without the ".concat".
      files[file].output = files[file].output || path.basename(file, opts.extname)

      // Tell Metalsmith Concat plugin to concatinate the files.
      metalsmithConcat(files[file])(files, metalsmith, done)
    }

    // Find all the .concat files.
    async.filter(Object.keys(files), filterFile, function (err, concats) {
      if (err) {
        done(err)
      } else {
        // Use async to process each concat object.
        async.each(concats, concatenateFile, done)
      }
    })
  }
}

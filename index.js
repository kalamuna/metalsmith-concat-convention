'use strict'

const path = require('path')
const metalsmithConcat = require('metalsmith-concat')
const async = require('async')

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
      const correctExtention = path.extname(file) === opts.extname

      // Make sure it has defined files.
      const hasFiles = files[file].files
      done(null, correctExtention && hasFiles)
    }

    /**
     * Tell Metalsmith Concatenate to process on the given file config.
     */
    function concatenateFile(file, done) {
      // Append the concat file itself to the end of the concatenation.
      files[file].files.push(file)

      // Make sure the output is defined.
      if (!Object.prototype.hasOwnProperty.call(files[file], 'output')) {
        // Output the file to the destination, without the ".concat".
        const dir = path.dirname(file)
        const filename = path.basename(file, opts.extname)
        const final = path.join(dir, filename)
        files[file].output = final
      }

      // Tell Metalsmith Concat plugin to concatinate the files.
      metalsmithConcat(files[file])(files, metalsmith, done)
    }

    // Find all the .concat files.
    async.filter(Object.keys(files), filterFile, (err, concats) => {
      if (err) {
        done(err)
      } else {
        // Use async to process each concat object.
        async.each(concats, concatenateFile, done)
      }
    })
  }
}

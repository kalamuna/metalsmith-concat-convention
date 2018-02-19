# Metalsmith Concat Convention Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-concat-convention.svg)](https://www.npmjs.org/package/metalsmith-concat-convention)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-concat-convention/master.svg)](https://travis-ci.org/RobLoach/metalsmith-concat-convention)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-concat-convention.png)](https://david-dm.org/RobLoach/metalsmith-concat-convention)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobLoach/metalsmith-concat-convention.svg)](https://greenkeeper.io/)

[Metalsmith](http://metalsmith.io) plugin to [concatenate files](https://github.com/aymericbeaumet/metalsmith-concat) through file conventions.

## Installation

    npm install --save metalsmith-concat-convention

### CLI

If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-concat-convention` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-concat-convention": {
      "extname": ".concat"
    }
  }
}
```

### JavaScript

If you are using the JS Api for Metalsmith, then you can require the module and add it to your `.use()` directives:

```js
var concat = require('metalsmith-concat-convention');

metalsmith.use(concat({
  extname: '.concat'
}));
```

## Usage

Each concatenation is handled through naming the destination file `<name>.concat`. The file's metadata options are passed off to [`metalsmith-concat`](https://github.com/aymericbeaumet/metalsmith-concat) to output the concatenated files. All [`metalsmith-concat` options](https://github.com/aymericbeaumet/metalsmith-concat#files) apply, aside from `output`, which is provided by the filename itself.

### Example
#### `src/scripts.js.concat`
``` yaml
---
files:
- script1.js
- script2.js
insertNewLine: false
---
// This is the collection of all scripts.
```

The above will result in `scripts.js` being `script1.js`, `script2.js`, along with the ending content comment.

## License

MIT

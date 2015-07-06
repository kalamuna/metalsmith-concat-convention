# Metalsmith Concat Convention Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-concat-convention.svg)](https://www.npmjs.org/package/metalsmith-concat-convention)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-concat-convention/master.svg)](https://travis-ci.org/RobLoach/metalsmith-concat-convention)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-concat-convention.png)](https://david-dm.org/RobLoach/metalsmith-concat-convention)

[Metalsmith](http://metalsmith.io) plugin to [concatenate files] through file conventions.

## Installation

    npm install --save metalsmith-concat-convention

## Usage

Each concatenation is handled through naming the destination file `<name>.concat`.

### Example
#### src/scripts.js.concat
``` yaml
---
files:
- script1.js
- script2.js
insertNewLine: false
---
This is the collection of all scripts.
```

### CLI

If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-concat-convention` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-concat-convention": {}
  }
}
```

### JavaScript

If you are using the JS Api for Metalsmith, then you can require the module and add it to your `.use()` directives:

```js
var concat = require('metalsmith-concat-convention');

metalsmith.use(concat());
```

## License

MIT
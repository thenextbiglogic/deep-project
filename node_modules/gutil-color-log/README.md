## gutil-color-log

A wrapper around gulp-util's log for less verbose colored logs.

## Install

`npm install --save-dev gutil-color-log`

## Usage

```javascript
const log = require('gutil-color-log')

function greaterThanTen(num) {
  if(num > 10) {
    log('green', 'Success')
  } else {
    log('red', 'Failure')
  }
}

greaterThanTen(25) // green output

greaterThanTen(7) // red output

log('magenta', 'There are more colors')
log('cyan', 'See them all at the link below')
log('blue', 'https://www.npmjs.com/package/chalk')
```

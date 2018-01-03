/**
 * Created by timur on 8/9/16.
 */

const gutil = require('gulp-util')

const log = (color, msg) => gutil.log(gutil.colors[color](msg))

module.exports = log

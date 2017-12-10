/**
 * gulpfile js
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var appUtils = require('./code-base/src/utils/app-contants');

/**
 * gulp tasks
 */
gulp.task('default',function(){
    console.log('gulp started at:-'+ new Date());
});

gulp.task('build',function(){
return gulp.src(appUtils.scripts.utils)
.pipe(gulp.dest(appUtils.scripts.public.js));
});
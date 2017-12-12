/**
 * gulpfile js
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var appUtils = require('./code-base/src/utils/index.util.js');
var $= require('gulp-load-plugins')({
    lazy:true
});
var args = require('yargs');

/**
 * Tasks Array
 */

 var tasks={
     injectDependencies:function()
     {
        var wiredep = require('wiredep').stream;
        appUtils.logger.info('injecting dependencies');
        var srcPath = appUtils.constants.paths.htmlFiles;
        var destPath = appUtils.constants.paths.public.views;
        var options = {
            bowerJson:require(appUtils.constants.paths.bowerJson),
            directory: appUtils.constants.paths.externalLibs,
            ignorePath:'../..'+appUtils.constants.paths.externalLibs
        }

        console.log('srcPath:'+ srcPath);
        console.log('destPath:'+ destPath);

        return gulp.src(srcPath)
                   .pipe(wiredep(options))
                   .pipe($.print())
                   .pipe(gulp.dest(destPath));
     }
 };

/**
 * gulp tasks
 */
gulp.task('default',function(){
    console.log('gulp started at:-'+ new Date());
});

gulp.task('inject',function(){
return tasks.injectDependencies();
});

gulp.task('build',['inject'],function(){
    var srcPath = appUtils.constants.paths.utils;
    var destPath = appUtils.constants.paths.public.js;
console.log('srcPath-'+srcPath);
console.log('destPath-'+ destPath);
return gulp.src(srcPath)
.pipe($.print())
.pipe(gulp.dest(destPath));
});


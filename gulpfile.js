/**
 * gulpfile js
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var appUtils = require('./code-base/src/utils/index.util.js');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var args = require('yargs');
var del = require('del');
/**
 * Tasks Array
 */

var tasks = {
    injectDependencies: function () {
        var wiredep = require('wiredep').stream;
        appUtils.logger.info('injecting dependencies');
        var srcPath = appUtils.constants.paths.htmlFiles;
        var destPath = appUtils.constants.paths.public.views;
        var options = {
            bowerJson: require(appUtils.constants.paths.bowerJson),
            directory: appUtils.constants.paths.externalLibs,
            ignorePath: '../..' + appUtils.constants.paths.externalLibs
        }

        appUtils.logger.info('srcPath:' + srcPath);
        appUtils.logger.info('destPath:' + destPath);

        return gulp.src(srcPath)
            .pipe(wiredep(options))
            .pipe($.print())
            .pipe(gulp.dest(destPath));
    },
    app: {
        build: function () {
            var srcPath = appUtils.constants.paths.utils;
            var destPath = appUtils.constants.paths.public.js;

            appUtils.logger.info('srcPath-' + srcPath);
            appUtils.logger.info('destPath-' + destPath);

            return gulp.src(srcPath)
                .pipe($.rename({
                    suffix: '.min'
                }))
                .pipe($.print())
                .pipe(gulp.dest(destPath));
        },

        clean: function () {
            appUtils.logger.info('cleaning files...');
            return del([appUtils.constants.paths.public.js, appUtils.constants.paths.public.scripts, appUtils.constants.paths.public.views]);
        },

        config: function () {
            var destPath = appUtils.constants.paths.public.scripts;
            var serverConfigPath = appUtils.constants.paths.server.config;
            appUtils.logger.message('serverconfigpath:' + serverConfigPath);
            appUtils.logger.message('destPath:' + destPath);
            return gulp.src(serverConfigPath)
                .pipe($.rename({
                    suffix: '.min'
                }))
                .pipe($.print())
                .pipe(gulp.dest(destPath));
        }
    }
};

/**
 * gulp tasks
 */
gulp.task('default', function () {
    appUtils.logger.info('gulp started at:-' + new Date());
});

gulp.task('inject', function () {
    return tasks.injectDependencies();
});

gulp.task('clean', function () {
    return tasks.app.clean();
});

gulp.task('start', ['clean'], function () {
    appUtils.logger.info('building & injecting app files...');
    $.sequence([tasks.app.build(), tasks.app.config(), tasks.injectDependencies()]);
});

gulp.task('build', function () {
    appUtils.logger.info('building & copying app files...');
    $.sequence([tasks.app.build()]);
});
/**
 * gulp file js
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var appUtils = require('./code-base/src/utils/index.util.js');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var args = require('yargs').argv;
var del = require('del');
var browserSync = require('browser-sync').create();
var path = require('path');
/**
 * Tasks Array
 */

var tasks = {
    injectDependencies: function () {
        var wiredep = require('wiredep').stream;
        appUtils.logger.info('injecting dependencies');
        var bowerDirPath = path.join(__dirname,appUtils.constants.paths.externalLibs);
        var srcPath = appUtils.constants.paths.htmlFiles;
        var destPath = appUtils.constants.paths.public.views;
        var customStylePath = appUtils.constants.paths.public.css;
      
        var options = {
            bowerJson: require(appUtils.constants.paths.bowerJson),
            directory:bowerDirPath ,
            ignorePath: '../../external-libs/client'
        };

        appUtils.logger.info('bower dir path:' + bowerDirPath);
        appUtils.logger.info('srcPath:' + srcPath);
        appUtils.logger.info('destPath:' + destPath);

        appUtils.logger.info('injecting custom dependencies');
        appUtils.logger.info('custom style path::' + customStylePath);
        return gulp.src(srcPath)
            .pipe(wiredep(options))
            .pipe($.inject(gulp.src(customStylePath,{read:false}),{
                ignorePath:appUtils.constants.paths.static
            }))
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
                .pipe($.print())
                .pipe($.minify({
                    ext: {
                        min: '.min.js'
                    },
                    noSource: true
                }))
                .pipe(gulp.dest(destPath));
        },

        clean: function () {
            appUtils.logger.info('cleaning files...');
            return del([appUtils.constants.paths.public.js, appUtils.constants.paths.public.scripts, appUtils.constants.paths.public.views]);
        },

        config: function () {
            var destPath = appUtils.constants.paths.public.scripts;
            var serverConfigPath = appUtils.constants.paths.server.config;
            appUtils.logger.message('server config path:' + serverConfigPath);
            appUtils.logger.message('destPath:' + destPath);
            return gulp.src(serverConfigPath)
                .pipe($.print())
                .pipe($.minify({
                    ext: {
                        min: '.min.js'
                    },
                    noSource: true
                }))
                .pipe(gulp.dest(destPath));
        },

        start: function (verbose) {
            if (verbose) {
                if (browserSync.active) {
                    appUtils.logger.info('browserSync already running');
                    return;
                }

                appUtils.logger.info('Browser sync starting...........');
                browserSync.init({
                    proxy: 'localhost:1304'
                });

                gulp.watch([appUtils.constants.paths.utils, appUtils.constants.paths.server.config, appUtils.constants.paths.htmlFiles], ['reload'])
            }
        },

        reload: {
            app: function () {
                appUtils.logger.info('reloading & copying app files...');
                $.sequence([tasks.app.build(), tasks.app.config(), tasks.injectDependencies(), tasks.app.reload.browserSync()]);
            },
            browserSync: function () {
                appUtils.logger.info('reloading browser Sync server & files.....');
                browserSync.reload();
            }
        }
    },

    lint: {
        js: function () {
            var srcPath = [appUtils.constants.paths.utils, appUtils.constants.paths.server.config];
            var destPath = [appUtils.constants.paths.public.js, appUtils.constants.paths.public.scripts];
            appUtils.logger.message('Linting started ....');
            appUtils.logger.info('srcPath-' + srcPath[0] + ',' + srcPath[1]);
            appUtils.logger.info('destPath-' + destPath[0] + ',' + destPath[1]);

            return gulp.src(srcPath)
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish', {
                    verbose: true
                }))
                .pipe($.jscs())
                .pipe(gulp.dest(destPath[0])).pipe(gulp.dest(destPath[1]));
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
    var verbose = args.verbose;
    $.sequence([tasks.app.build(), tasks.app.config(), tasks.injectDependencies(), tasks.app.start(verbose || false)]);
});

gulp.task('build', function () {
    appUtils.logger.info('building & copying app files...');
    $.sequence([tasks.lint.js(), tasks.app.build()]);
});

gulp.task('reload', function () {
    tasks.app.reload.app();
});
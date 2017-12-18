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
var cleanCSS = require('gulp-clean-css');

/**
 * Tasks Array
 */

var tasks = {
    injectDependencies: function () {
        var wiredep = require('wiredep').stream;
        appUtils.Logger.info('injecting dependencies');
        var bowerDirPath = path.join(__dirname, appUtils.Constants.paths.externalLibs);
        var srcPath = appUtils.Constants.paths.htmlFiles.layout;
        var destPath = appUtils.Constants.paths.public.views;
        var customStylePath = appUtils.Constants.paths.public.styles;
        var options = {
            bowerJson: require(appUtils.Constants.paths.bowerJson),
            directory: bowerDirPath,
            ignorePath: appUtils.Constants.paths.ignorePaths.client
        };

        appUtils.Logger.info('bower dir path:' + bowerDirPath);
        appUtils.Logger.info('srcPath:' + srcPath);
        appUtils.Logger.info('destPath:' + destPath);

        appUtils.Logger.info('injecting custom dependencies');
        appUtils.Logger.info('custom style path::' + customStylePath);
        return gulp.src(srcPath)
            .pipe(wiredep(options))

            .pipe($.inject(gulp.src(customStylePath, {
                read: false
            }), {
                ignorePath: appUtils.Constants.paths.static
            }))
            .pipe($.print())
            .pipe(gulp.dest(destPath));
    },

    minify: {
        css: function () {
            var srcPath = appUtils.Constants.paths.cssFiles;
            var destPath = appUtils.Constants.paths.public.css;

            appUtils.Logger.info('srcPath-' + srcPath);
            appUtils.Logger.info('destPath-' + destPath);

            return gulp.src(srcPath)
                .pipe($.print())
                .pipe(cleanCSS())
                .pipe(gulp.dest(destPath));
        }
    },
    copy: {
        views: function () {
            var srcPath = [appUtils.Constants.paths.htmlFiles.all,'!'+ appUtils.Constants.paths.htmlFiles.layout]; 
            var destPath = appUtils.Constants.paths.public.views;

            appUtils.Logger.info('srcPath-' + srcPath[0]);
            appUtils.Logger.info('destPath-' + destPath);
            appUtils.Logger.info('Copying view files');
            return gulp.src(srcPath)
                .pipe($.print())
                .pipe(gulp.dest(destPath));
        }
    },

    server:{
        nodemon:function(verbose)
        {
         var options={
             delay:5000,
             server:appUtils.Constants.paths.server.base,
             env:{
                 'PORT':appUtils.Constants.paths.server.port,
             'NODE_ENV':'build'
             },
             watch:appUtils.Constants.paths.watchFiles
         };

         appUtils.Logger.message('Starting Nodemon server on port: '+ appUtils.Constants.paths.server.port);
         $.sequence([ $.nodemon(options)]);
        },
        native:function()
        {
           
        }
    },

    app: {
        build: function () {
            var srcPath = [appUtils.Constants.paths.utils, appUtils.Constants.paths.routes, appUtils.Constants.paths.controllers];
            var destPath = appUtils.Constants.paths.public.js;

            appUtils.Logger.info('srcPath-' + srcPath[0] + ',' + srcPath[1] + ',' + srcPath[2]);
            appUtils.Logger.info('destPath-' + destPath);

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
            appUtils.Logger.info('cleaning files...');
            return del([appUtils.Constants.paths.public.js, appUtils.Constants.paths.public.styles, appUtils.Constants.paths.public.scripts, appUtils.Constants.paths.public.views]);
        },

        config: function () {
            var destPath = appUtils.Constants.paths.public.scripts;
            var serverConfigPath = appUtils.Constants.paths.server.config;
            appUtils.Logger.message('server config path:' + serverConfigPath);
            appUtils.Logger.message('destPath:' + destPath);
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
            tasks.server.native();
            if (verbose) {
                if (browserSync.active) {
                    appUtils.Logger.info('browserSync already running');
                    return;
                }

                appUtils.Logger.info('Browser sync starting...........');
                browserSync.init({
                    proxy: 'localhost:1304'
                });

                gulp.watch([appUtils.Constants.paths.utils, appUtils.Constants.paths.server.config, appUtils.Constants.paths.htmlFiles.all], ['reload'])
            }
        },

        reload: {
            app: function () {
                appUtils.Logger.info('reloading & copying app files...');
                $.sequence([tasks.app.build(), tasks.app.config(), tasks.injectDependencies(), tasks.app.reload.browserSync()]);
            },
            browserSync: function () {
                appUtils.Logger.info('reloading browser Sync server & files.....');
                browserSync.reload();
            }
        }
    },

    lint: {
        js: function () {
            var srcPath = [appUtils.Constants.paths.utils, appUtils.Constants.paths.server.config];
            var destPath = [appUtils.Constants.paths.public.js, appUtils.Constants.paths.public.scripts];
            appUtils.Logger.message('Linting started ....');
            appUtils.Logger.info('srcPath-' + srcPath[0] + ',' + srcPath[1]);
            appUtils.Logger.info('destPath-' + destPath[0] + ',' + destPath[1]);

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
    appUtils.Logger.info('gulp started at:-' + new Date());
});

gulp.task('inject', function () {
    return tasks.injectDependencies();
});

gulp.task('clean', function () {
    return tasks.app.clean();
});

gulp.task('minify', ['clean'], function () {
    return tasks.minify.css();
});

gulp.task('start', ['minify'], function () {
    appUtils.Logger.info('building & injecting app files...');
    var verbose = args.verbose;
    $.wait(1500);
    $.sequence([tasks.lint.js(),tasks.app.build(), tasks.app.config(), tasks.injectDependencies(),tasks.copy.views(), tasks.app.start(verbose || false)]);
});

gulp.task('build', function () {
    appUtils.Logger.info('building & copying app files...');
    $.sequence([tasks.lint.js(), tasks.app.build()]);
});

gulp.task('reload', function () {
    tasks.app.reload.app();
});

gulp.task('serve',['start'],function(){
return tasks.server.nodemon();
});
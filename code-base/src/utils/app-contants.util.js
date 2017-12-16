/**
 * Constants for the app
 */

const root = './code-base',
    appRoot = '/',
    common = '/common',
    source = '/src',
    wwwroot = '/wwwroot',
    utils = '/utils/*.util.js',
    controllers = '/controllers/*.controller.js',
    externalLibs = '/external-libs/client',
    html = '/views/*.view.html',
    css = '/styles/*.app.css',
    config = '/configs',
    server = {
        config: config + '/*.config.js'
    },
    path = require('path');

var constants = {
    appRoot: '/',
    root:root,
    server: 'app.js',
    view: {
        engine: 'view-engine',
        type: ''
    },
    paths: {
        ignorePaths: {
            client: '../../common/external-libs/client',
            public: '../../common/public',
            styles: '../..//common/public/css'
        },
        static:'code-base/common',
        common: common,
        bowerJson: './bower.json',
        controllers: root + source + controllers,
        utils: root + source + utils,
        externalLibs: root + common + externalLibs,
        cssFiles: root + source + css,
        public: {
            base:'/public',
            js: root + common + '/public/js/',
            css:root+ common + '/public/css/style.app.min.css',
            views: root + wwwroot + '/views/',
            scripts: root + common + '/public/scripts/',
            styles: root + common + '/public/css/*.app.css'
        },
        server: {
            config: root + source + server.config
        },
        htmlFiles: root + common+'/public' + html,
    },
    routes: {
        allowed: function (dirname) {
            var routes = [];
            routes.push({
                libs: path.join(dirname, constants.paths.externalLibs)
            });
            routes.push({
                views: path.join(dirname, constants.paths.public.views)
            });

            return routes;
        }
    }
};

/**
 * Export the module
 */
module.exports = constants;
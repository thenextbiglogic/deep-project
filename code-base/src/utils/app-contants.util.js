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
    routes = '/routes/*.route.js',
    externalLibs = '/external-libs/client',
    html = '/views/*.view.*',
    css = '/styles/*.app.css',
    config = '/configs',
    server = {
        config: config + '/*.config.js'
    },
    path = require('path'),
    viewType='ejs';

var constants = {
    appRoot: '/',
    Empty: '',
    root: root,
    server: 'app.js',
    view: {
        base: 'views',
        engine: 'view-engine',
        type: viewType
    },
    paths: {
        ignorePaths: {
            client: '../../common/external-libs/client',
            public: '../../common/public',
            styles: '../..//common/public/css'
        },
        static: 'code-base/common',
        common: common,
        bowerJson: './bower.json',
        controllers: root + source + controllers,
        utils: root + source + utils,
        externalLibs: root + common + externalLibs,
        cssFiles: root + source + css,
        routes: root + source + routes,
        public: {
            base: '/public',
            js: root + common + '/public/js/',
            css: root + common + '/public/css/',
            views: root + wwwroot + '/views/',
            scripts: root + common + '/public/scripts/',
            styles: root + common + '/public/css/*.app.css'
        },
        server: {
            config: root + source + server.config
        },
        htmlFiles: root + common + '/public' + html
    },
    appRoutes: {
        allowed: function (dirname) {
            var routes = [];
            routes.push({
                libs: path.join(dirname, constants.paths.externalLibs)
            });
            routes.push({
                views: path.join(dirname, constants.paths.public.views)
            });
            routes.push({
                name: '/',
                controllers: 'base-app.controller.*',
                args: []
            });
            return routes;
        }
    },
    Server: {
        Messages: [
            //0:
            'Starting {0}',
            // 1:
            'Configuring {0}',
            //2:
            'Listening on port:{0}',
            //3:
            '{0} not initialized',
            //4:
            '{0} not set. Cannot initialize Express Server',
            //5:
            '{0} Started.',
            //6:
            '{1} not set. Cannot initialize {0}'
        ],
        Properties: {
            Name: 'Express Server',
            Version: '1.0.0.0'
        }
    },
    ViewEngine: {
        Messages: [
            //0:
            'Setting up views path to {0}',
            //1:
            'View Engine not set.',
        ],
        Properties: {
            Name: viewType,
            IsDefault: true,
            IsSet: false
        }
    },
    Project: {
        Properties: {
            Name: 'Project Maestro'
        }
    },

    AppRegex: {
        Controller: '..\\js\\{0}.controller.min.js',
        View: '{0}.view.*',
        Util: '{0}.util.*',
        Config: '{0}.config.*'
    }
};

/**
 * Export the module
 */
module.exports = constants;
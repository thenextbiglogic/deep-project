/**
 * Private variables
 */
var version = '1.0.0.0',
  name = 'Project Maestro ',
  utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min')
  },
  viewEngineSet = false,
  dirname = __dirname,
  allowedRoutes = [];

const express = require('express'),
  port = process.env.port || 1304,
  app = express(),
  viewEngine = utils.Constants.view.engine,
  path = require('path');

var server = {

  getVersion: function () {
    return this.version;
  },
  getExpress: function () {
    return this.app();
  },
  getName: function () {
    return this.name;
  },

  configure: {
    app: function (options) {
      if (!options) {
        utils.Logger.info('Options not set. Cannot initialize Express Server');
      } else {
        if (!options.route) {
          options.route = utils.Constants.appRoot;
        }
        if (options.dirname) {
          dirname = options.dirname;
        }
        if (options.useViewEngine) {
          utils.Logger.info('Setting up views path to :' + dirname);
          this.views(dirname);
        }

        utils.Logger.info('Configuring Express server');
        utils.Logger.info('Starting Express server');
        server.Serve(options);
        if (!options.port) {
          options.port = port;
        }
        app.listen(options.port, () => {
          utils.Logger.info('Listening on port:' + options.port);
        });
      }
    },

    views: function (dirname) {
      allowedRoutes = utils.Constants.routes.allowed(dirname);
      if (!app) {
        utils.Logger.error('app not initialized');
      } else {
        if (!viewEngineSet) {
          utils.Logger.info(allowedRoutes['views']);
          //app.use(express.static(allowedRoutes['libs']));
          //app.use(express.static(allowedRoutes['views']));
          app.use(express.static(path.join(dirname,'src/styles')));
          app.use(express.static(path.join(dirname, utils.Constants.paths.common)));
          app.use(express.static(path.join(dirname, utils.Constants.paths.externalLibs)));
          app.use(express.static(path.join(dirname, utils.Constants.paths.public.views)));
          app.set('views', allowedRoutes['views']);
          app.engine('html', require('ejs').renderFile);
          app.set('view engine', 'html');
          viewEngineSet = true;
        }
      }
    }
  }
};

Object.defineProperty(server, 'version', {
  get: function () {
    return version;
  },
  IEnumerable: true,
  configurable: false,
});

Object.defineProperty(server, 'name', {
  get: function () {
    return name;
  },
  set: function (value) {
    server.name = value;
  },
  IEnumerable: true,
  configurable: false,
});

server.Serve = function (options) {
  app.get(options.route, function (req, res) {
    var msg = 'Express Server Started. Proxying through browser Sync API';
    utils.Logger.info(msg);
    if (!viewEngineSet && options.useViewEngine) {
      msg += 'View Engine not set';
      utils.Logger.info(msg);
      res.send(msg);
    } else if (options.useViewEngine) {
      res.render(path.join(dirname, utils.Constants.paths.public.views) + 'index.view.html', {
        title: 'Home',
        name:name,
        data: {
          Message:msg,
          Time: new Date().toString()
        }
      });
    } else {
      res.send(msg);
    }
  });
  app.get('/123', function (req, res) {
    var msg = 'Serving on different url. URL:' + req.url;
    utils.Logger.info(msg);
    if (!viewEngineSet) {
      msg += 'View Engine not set';
      utils.Logger.info(msg);
      res.sendFile(utils.Constants.paths.public.views + 'index.view.html');
    } else {
      res.send(msg);
    }
  });
};

module.exports = server;
/**
 * Private variables
 */
var fs = require('fs');
const utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min'),
    Exception:require('../js/app-exception.util.min')
  },

  //require(fs.existsSync('./code-base/common/public/js/index.util.min') ? './code-base/common/public/js/index.util.min' : '../utils/index.util.js'),
  route = require('../js/app.route.min'),
  //require(fs.existsSync('./code-base/common/public/js/app.route.min') ? './code-base/common/public/js/app.route.min' : '../routes/app.route.js'),
  express = require('express'),
  port = process.env.port || 1304,
  app = express(),
  viewEngine = utils.Constants.view.engine,
  path = require('path'),
  ejs = require('ejs-locals');

var version = utils.Constants.Server.Properties.version,
  name = utils.Constants.Server.Properties.Name,
  project = {
    name: utils.Constants.Project.Properties.Name
  },
  viewEngineSet = utils.Constants.ViewEngine.Properties.IsSet,
  dirname = __dirname,
  allowedRoutes = [],
  routeList = [];

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
      var check = utils.Exception.Handle(options);
      if (check.Status && check.Message === utils.Constants.Empty) {
        if (!options.route) {
          options.route = utils.Constants.appRoot;
        }
        if (options.dirname) {
          dirname = options.dirname;
        }
        if (options.useViewEngine) {
          utils.Logger.info(utils.Constants.ViewEngine.Messages[0].replace('{0}', dirname));
          this.views(dirname);
        }

        utils.Logger.info(utils.Constants.Server.Messages[1].replace('{0}', server.name));
        // configure routes
        route.configure();

        server.Serve(options);
        if (!options.port) {
          options.port = port;
        }
        app.listen(options.port, () => {
          utils.Logger.info(utils.Constants.Server.Messages[0].replace('{0}', server.name));
          utils.Logger.info('Listening on port:' + options.port);
        });


      } else {
        utils.Logger.info(utils.Constants.Server.Messages[6].replace('{0}', name).replace('{1}', arguments[0]));
      }
    },

    views: function (dirname) {
      allowedRoutes = utils.Constants.appRoutes.allowed(dirname);
      var check = utils.Exception.Handle(app);
      if (check.Status && check.Message === utils.Constants.Empty) {
        if (!viewEngineSet) {
          utils.Logger.info(allowedRoutes['views']);
          app.use(express.static(utils.Constants.paths.static));
          app.set(utils.Constants.view.base, allowedRoutes[utils.Constants.view.base]);
          app.engine(utils.Constants.view.type, ejs);
          app.set(utils.Constants.view.engine, utils.Constants.view.type);
          viewEngineSet = true;
          utils.Constants.ViewEngine.Properties.IsSet = viewEngineSet;
        }
      } else {
        utils.Logger.error(utils.Constants.Server.Message[4].replace('{0}', name));
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
  if (options.route === utils.Constants.appRoot) {
     var router = route.get('home');
    console.log(Object.keys(router));
    app.route(options.route).get(function(req,res){
      router.actions.get(req,res,dirname);
    });
  } else {
    app.get(options.route, function (req, res) {
      var msg = utils.Constants.Server.Message[6];
      utils.Logger.info();
      if (!viewEngineSet && options.useViewEngine) {
        msg += utils.Constants.ViewEngine.Message[1];
        utils.Logger.info(msg);
        res.send(msg);
      } else if (options.useViewEngine) {
        res.render(path.join(dirname, utils.Constants.paths.public.views) + 'index.view.ejs', {
          title: 'Home',
          name: name,
          data: {
            Message: msg,
            Time: new Date().toString()
          }
        });
      } else {
        res.send(msg);
      }
    });
  }
};

module.exports = server;
/**
 * Home Controller
 */

const utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min'),
    Exception: require('../js/app-exception.util.min'),
    Status: require('../js/app-status.util.min')
},
path = require('path');

var name = 'Node',
    viewPath = 'node/';

var homeController = {
    Name: 'Node',
    ViewPath: 'node/',
    Configure: function (app, route) {
        var check = utils.Exception.Handle(app);
        if (check.Status === utils.Status.OK && check.Message === utils.Constants.Empty) {

        } else {
            utils.Logger.Error(utils.Constants.Server.Messages[3].replace('{0}', arguments[0]));
        }
    },

    Get: function (req, res,dirname) {
        res.render(path.join(dirname, utils.Constants.paths.public.views) +viewPath+ 'index.view.ejs', {
            title: 'Node Controller',
            name: name,
            data: {
              Message: 'Response from Node Controller',
              Time: new Date().toString()
            }
          });
    }
};

Object.defineProperty(homeController, 'name', {
    get: function () {
        return name;
    }
});

Object.defineProperty(homeController, 'viewPath', {
    get: function () {
        return viewPath;
    }
});

function Serve() {

}

module.exports = homeController;
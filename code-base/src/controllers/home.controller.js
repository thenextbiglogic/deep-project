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

var name = 'Home',
    viewPath = '/Home/';

var homeController = {
    Name: 'Home',
    ViewPath: '/Home/',
    Configure: function (app, route) {
        var check = utils.Exception.Handle(app);
        if (check.Status === utils.Status.OK && check.Message === utils.Constants.Empty) {

        } else {
            utils.Logger.Error(utils.Constants.Server.Messages[3].replace('{0}', arguments[0]));
        }
    },

    Get: function (req, res,dirname) {
        res.render(path.join(dirname, utils.Constants.paths.public.views) + 'index.view.ejs', {
            title: 'Home Controller',
            name: name,
            data: {
              Message: 'Response from Home Controller',
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
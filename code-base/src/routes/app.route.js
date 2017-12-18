/**
 * App Routing 
 */
const utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min'),
    Exception: require('../js/app-exception.util.min'),
    _: require('lodash')
};
var router;
var routeList = [];
var route = {
    configure: function () {
        utils.Logger.info('Configuring routes');
        PrepareRouteList('home');
        PrepareRouteList('node');
        PrepareRouteList('error');
    },
    add: function (routeName) {
        PrepareRouteList(routeName);
        return routeList;
    },
    get: function (routeName) {
        return utils._.find(routeList, (route) => {
            if (route.name === routeName) {
                utils.Logger.message('Name:' + route.name);
                return route;
            }
        });
    }
};

function PrepareRouteList(routeName) {
    utils.Logger.info('Preparing Route List');
    var controllerPath = utils.Constants.AppRegex.Controller;
    controllerPath = controllerPath.replace('{0}', routeName);
    routeList.push({
        name: routeName,
        controller: controllerPath,
        actions: {
            get: function (req, res, dirname) {
                var controller = require(controllerPath);
                utils.Logger.message(controllerPath);
                console.log(Object.keys(controller));
                utils.Logger.message('Calling controller:' + controller.name);
                controller.Get(req, res, dirname);
            },
            post: function (req, res) {
                return route.post(req, res);
            }
        },
        LastAccessed: new Date().getTime()
    });
};


module.exports = route;
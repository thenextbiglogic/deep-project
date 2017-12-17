/**
 * App Routing 
 */
const utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min'),
    Exception: require('../js/app-exception.util.min'),
    _:require('lodash')
};
var router;
var routeList = [];
var controllerPath = utils.Constants.AppRegex.Controller;
var route = {
    configure: function () {
        utils.Logger.info('Configuring routes');
        PrepareRouteList('home');
    },
    add: function (routeName) {
        PrepareRouteList(routeName);
        return routeList;
    },
    get: function (routeName) {
        return utils._.find(routeList,(route)=>{
            return route.name === routeName;
        });
    }
};

function PrepareRouteList(routeName) {
    utils.Logger.info('Preparing Route List');
    controllerPath = controllerPath.replace('{0}', routeName);
    var currentController = require(controllerPath);
    routeList.push({
        name: routeName,
        controller: controllerPath,
        actions: {
            get: function (req, res, dirname) {
                utils.Logger.message(controllerPath);
                console.log(Object.keys(currentController));
                utils.Logger.message('Calling controller:' + currentController.name);
                currentController.Get(req, res, dirname);
            },
            post: function (req, res) {
                return route.post(req, res);
            }
        },
        LastAccessed: new Date().getTime()
    });
};


module.exports = route;
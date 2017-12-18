/**
 * Base App Controller
 */
const utils = {
    Logger: require('../js/app-log.util.min'),
    Constants: require('../js/app-contants.util.min'),
};

var lastAccessed = new Date().getTime(),
    createdAt = new Date(),
    name = 'Controller',
    appName=utils.Constants.Project.Properties.Name;
var controller = {
};

Object.defineProperty(controller, 'LastAccessed', {
    get: function () {
        return lastAccessed;
    },
    set: function (value) {
        lastAccessed = value;
    }
});

Object.defineProperty(controller, 'Name', {
    get: function () {
        return name;
    },
    set: function (value) {
        name = value;
    }
});

Object.defineProperty(controller, 'CreatedAt', {
    get: function () {
        return createdAt;
    }
});

Object.defineProperty(controller, 'AppName', {
    get: function () {
        return appName;
    }
});

module.exports = controller;

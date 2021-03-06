/**
 * Index file for module
 */
var fs = require('fs');
var utils = {
    Constants: require(fs.existsSync('./code-base/common/public/js/app-contants.util.min')? './code-base/common/public/js/app-contants.util.min':'./app-contants.util.js'),
    Logger:require(fs.existsSync('./code-base/common/public/js/app-log.util.min')? './code-base/common/public/js/app-log.util.min':'./app-log.util.js'),
    Exception:require(fs.existsSync('./code-base/common/public/js/app-exception.util.min')? './code-base/common/public/js/app-exception.util.min':'./app-exception.util.js'),
    Status: require(fs.existsSync('./code-base/common/public/js/app-status.util.min')? './code-base/common/public/js/app-status.util.min':'./app-status.util.js'),
};

module.exports = utils;
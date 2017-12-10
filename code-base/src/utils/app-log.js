/**
 * Log object to log message to console or any other data source
 */
// import the required depnedencies

const color = require('gutil-color-log');

var log= {
message:function (msg) {
   log('Azure',formatMessage(msg,'Message'));
  },
  error:function (msg) {
    log('Red',formatMessage(msg,'Message'));
    },
  info:function (msg) {  
    log('Green',formatMessage(msg,'Message'));
  },
  exception:function (msg) {
    log('White',formatMessage(msg,'Exception'));
    }
};

/**
 * Format the message
 * @param {*} message 
 * @param {*} type 
 */
var formatMessage = function(message, type)
{
   var msgStr = type + ':{0}, Time:{1}';
    msgStr.replace('{0}',message);
    msgStr.replace('{1}',new Date());
    return msgStr;
}

/**
 * export the module
 */
module.exports = log;
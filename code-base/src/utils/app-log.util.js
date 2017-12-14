/**
 * Log object to log message to console or any other data source
 */
// import the required depnedencies
//var usage = require('usage');
const log =console.log;
const chalk = require('chalk');

var appLog= {
message:function (msg) {
   logMessage(msg,'Message');
  },
  error:function (msg) {
    logMessage(msg,'Error');
    },
  info:function (msg) {  
    logMessage(msg,'Info');
  },
  exception:function (msg) {
   logMessage(msg,'Exception');
    }
};

/**
 * 
 * @param {*} msg 
 * @param {*} type 
 */
function logMessage(msg,type)
{
  log(chalk`
  ${type}: {red ${msg}}
  Time: {green ${new Date().toString()}}
  `);
}

/**
 * export the module
 */
module.exports = appLog;
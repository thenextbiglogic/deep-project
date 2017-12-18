/**
 * Log object to log message to console or any other data source
 */
// import the required dependencies
//var usage = require('usage');
const log =console.log;
const chalk = require('chalk');

var appLog= {
message:function (msg) {
   logMessage(msg,'Message','blue');
  },
  error:function (msg) {
    logMessage(msg,'Error','red');
    },
  info:function (msg) {  
    logMessage(msg,'Info','green');
  },
  exception:function (msg) {
   logMessage(msg,'Exception','white');
    }
};

/**
 * 
 * @param {*} msg 
 * @param {*} type 
 */
function logMessage(msg,type, color)
{
  log(chalk`
  {${color} ${type}}: {red ${msg}}
  Time: {green ${new Date().toString()}}
  `);
}

/**
 * export the module
 */
module.exports = appLog;
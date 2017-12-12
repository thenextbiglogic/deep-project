/**
 * Log object to log message to console or any other data source
 */
// import the required depnedencies
//var usage = require('usage');
const log =console.log;
const chalk = require('chalk');

var appLog= {
message:function (msg) {
   console.log('Azure',formatMessage(msg,'Message'));
  },
  error:function (msg) {
    console.log('Red',formatMessage(msg,'Error'));
    },
  info:function (msg) {  
    console.log(formatMessage(msg,'Info'),'background:#fffff');
  },
  exception:function (msg) {
    console.log('White',formatMessage(msg,'Exception'));
    }
};

/**
 * Format the message
 * @param {*} message 
 * @param {*} type 
 */
var formatMessage = function(message, type)
{
   var msgStr = type + ':'+message+', Time:'+new Date().toString();
   // msgStr.replace('{0}',message);
   // msgStr.replace('{1}',new Date().toString());
   // ES2015 tagged template literal
  
logUsage();
    return msgStr;
}

function logUsage()
{
  var pid = process.pid;
  var options = { keepHistory: true }
  // usage.lookup(pid, options, function(err, result) {
  //   log(chalk`
  //   CPU: {red ${result.cpu}%}
  //   RAM: {green ${result.memory}%}
  //   `);
  // });

  log(chalk`
  CPU: {red ${10}%}
  RAM: {green ${34}%}
  `);
}

/**
 * export the module
 */
module.exports = appLog;
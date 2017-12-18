/**
 * App Exception Handler
 */

// var utils = {
//     Logger: require('../js/app-log.util.min'),
//     Constants: require('../js/app-contants.util.min')
//   };

var exception = {
    Handle: function (obj) {
        var status = 200;
        var msg = '';
        if (!obj) {
            msg = '{0} is not defined';
            msg = msg.replace('{0}', arguments[0]);
            //utils.Logger.error(msg);
        }
        return {
            Status: status,
            Message: msg
        };
    },

    Throw: function (obj, msg) {
    
    }
};

module.exports = exception;
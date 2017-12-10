/**
 * Constants for the app
 */

var constants ={
    appRoot:'/',
    server:'../configs/server.js'
};

var paths ={
scripts:{
    bowerFiles:'../../bower.json',
    controllers:'../controllers/',
    utils:'../utils/',
    externalLibs:'../../external-libs/client/',
    public:{
       js: '../../public/js/',
       css:'../../public/css/',
       views:'../../public/views/'
    }
}
};

/**
 * Export the module
 */
module.exports = constants;
module.exports = paths;
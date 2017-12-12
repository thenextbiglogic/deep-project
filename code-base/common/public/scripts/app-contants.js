/**
 * Constants for the app
 */
// const root = 'code-base',
//       appRoot ='/',
//       common='/common',
//       source='/src',
//       wwwroot='/wwwroot',
//       utils='/utils/',
//       controllers='/controllers/';

var constants ={
    appRoot:'/',
    server:'../configs/server.js',

    paths :{
        bowerFiles: './bower.json',
        controllers: 'code-base/src/controllers/*.js',
        utils: 'code-base/src/utils/*.js',
        externalLibs:'code-base/common/external-libs/client/',
        public:{
                js: 'code-base/common/public/scripts/',
                css:'code-base/common/public/css/',
                views:'code-base/common/public/views/'
            }   
    }
};

/**
 * Export the module
 */
module.exports = constants;
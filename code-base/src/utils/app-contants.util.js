/**
 * Constants for the app
 */
const root = 'code-base',
      appRoot ='/',
      common='/common',
      source='/src',
      wwwroot='/wwwroot',
      utils='/utils/*.util.js',
      controllers='/controllers/*.controller.js',
      externalLibs='/external-libs/client',
      html='/public/views/*.view.html';

var constants ={
    appRoot:'/',
    server:'../configs/server.js',

    paths :{
        bowerJson: './bower.json',
        controllers: root+source+controllers,
        utils: root+source+utils,
        externalLibs:root+common+externalLibs,
        htmlFiles:root+common+html,
        public:{
                js: root+ common+'/public/js/',
                css:root+common+'/public/css/',
                views:root+wwwroot+'/views/',
                scripts:root+common+'/public/scripts/'
            }   
    }
};

/**
 * Export the module
 */
module.exports = constants;
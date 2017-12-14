var app = {
    Utils:{Logger: require('./code-base/common/public/js/app-log.util.min.js')},
    Server: require('./code-base/common/public/scripts/server.config.min.js')
};

function setMessage(msg) {
    app.Utils.Logger.message(msg);
    app.Utils.Logger.info(app.Server.getVersion());
}

setMessage(app.Server.getName());
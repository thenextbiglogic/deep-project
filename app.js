var app = {
    Utils: require('./code-base/common/public/js/index.util.js'),
    Server: require('./code-base/common/public/scripts/server.config')
}

function setMessage(msg) {
    app.Utils.logger.message(msg);
    app.Utils.logger.info(app.Server.getVersion());
}

setMessage(app.Server.getName());
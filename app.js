var app = {
    Utils: {
        Logger: require('./code-base/common/public/js/app-log.util.min'),
        Constants: require('./code-base/common/public/js/app-contants.util.min')
    },
    Server: require('./code-base/common/public/scripts/server.config.min.js')
};

const port = process.env.PORT || 3000;
app.Server.configure.views(__dirname);
app.Server.configure.app({
    route: app.Utils.Constants.appRoot,
    dirname: __dirname,
    useViewEngine: true,
    port: port
});

function setMessage(msg) {
    app.Utils.Logger.message(msg);
    app.Utils.Logger.info(app.Server.getVersion());
}

setMessage('App listening on port-'+port);
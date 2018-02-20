// Openshift stuff
// 

exports.init = function (app, process)
{
    var port            = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
        ip              = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
        mongoURL        = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || null,
        mongoURLLabel   = "";

    // if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    //     var mongoServiceName    = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
    //         mongoHost           = process.env[mongoServiceName + '_SERVICE_HOST'],
    //         mongoPort           = process.env[mongoServiceName + '_SERVICE_PORT'],
    //         mongoDatabase       = process.env[mongoServiceName + '_DATABASE'],
    //         mongoPassword       = process.env[mongoServiceName + '_PASSWORD']
    //         mongoUser           = process.env[mongoServiceName + '_USER'];

    //     if (mongoHost && mongoPort && mongoDatabase) {
    //         mongoURLLabel = mongoURL = 'mongodb://';

    //         if (mongoUser && mongoPassword) {
    //             mongoURL += mongoUser + ':' + mongoPassword + '@';
    //         }

    //         // Provide UI label that excludes user id and pw
    //         mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    //         mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
    //     }
    // }

    app.openshiftDbUrl = mongoURL;

    app.isOnOpenshift = false;

    if (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL) {
        app.isOnOpenshift = true;
    }

    //app.listen(port, ip);
}
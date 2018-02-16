// mongodb stuff

exports.init = function (app){
    var mongoURL = 'mongodb://GMCR:DF1f3bYD6HKBxxRV@gmcrdb-shard-00-00-gxz2p.mongodb.net:27017,gmcrdb-shard-00-01-gxz2p.mongodb.net:27017,gmcrdb-shard-00-02-gxz2p.mongodb.net:27017/test?ssl=true&replicaSet=GMCRDB-shard-0&authSource=admin';

    app.db        = null;
    app.mongodb   = null;

    app.initDb = function(callback) {
        if (mongoURL == null) return;

        mongodb = require('mongodb');
        let Server = mongodb.Server;
        let MongoClient = mongodb.MongoClient;
        if (mongodb == null) return;

        console.log('Trying to connect to database...');

        MongoClient.connect(mongoURL, function(err, conn) {
            if (err) {
                callback(err);
            return;
            }

            app.db = conn;

            console.log('Connected to MongoDB at: %s', mongoURL);
        });
    };

    app.initDb(function(err){
        console.log('Error connecting to Mongo. Message:\n'+err);
    });
      
}
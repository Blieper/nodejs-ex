// mongodb stuff

exports.init = function (app){
    var mongoURL = 'mongodb://GMCR:DF1f3bYD6HKBxxRV@gmcrdb-shard-00-00-gxz2p.mongodb.net:27017,gmcrdb-shard-00-01-gxz2p.mongodb.net:27017,gmcrdb-shard-00-02-gxz2p.mongodb.net:27017/db?ssl=true&replicaSet=GMCRDB-shard-0&authSource=admin';

    mongoURL = app.openshiftDbUrl;

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

            let dbo = app.db.db('db');

            //dbo.collection("users").drop();

            dbo.createCollection("users", function(err, res) {
                if (err) throw err;
                console.log("Users collection created!");
            });
            
            console.log('Connected to MongoDB at: %s', mongoURL);
        });
    };

    app.initDb(function(err){
        console.log('Error connecting to Mongo. Message:\n'+err);
    });  
}
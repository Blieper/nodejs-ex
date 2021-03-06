// mongodb stuff

exports.init = function (app){
    // let mongoURL = '';

    // if (app.isOnOpenshift) {
    //     mongoURL = 'mongodb://userBU7:uVB410wyBTMnbbul@172.30.64.238:27017/sampledb';
    // }else {
    //     mongoURL = 'mongodb://GMCR:DF1f3bYD6HKBxxRV@gmcrdb-shard-00-00-gxz2p.mongodb.net:27017,gmcrdb-shard-00-01-gxz2p.mongodb.net:27017,gmcrdb-shard-00-02-gxz2p.mongodb.net:27017/sampledb?ssl=true&replicaSet=GMCRDB-shard-0&authSource=admin';
    // }

    console.log('Mongo: ' + app.mongoURL);

    app.db        = null;
    app.mongodb   = null;

    app.initDb = function(callback) {
        if (app.mongoURL == null) return;

        mongodb = require('mongodb');
        let Server = mongodb.Server;
        let MongoClient = mongodb.MongoClient;
        if (mongodb == null) return;

        console.log('Trying to connect to database...');

        MongoClient.connect(app.mongoURL, function(err, conn) {
            if (err) {
                callback(err);
                return;
            }

            app.db = conn;

            let dbo = app.db.db('sampledb');

            //dbo.collection("users").drop();

            dbo.createCollection("steamusers", function(err, res) {
                if (err) throw err;
                console.log("Users collection created!");
            });
            
            console.log('Connected to MongoDB at: %s', app.mongoURL);
        });
    };

    app.initDb(function(err){
        console.log('Error connecting to Mongo. Message:\n'+err);
    });  
}
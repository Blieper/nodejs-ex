
var express     = require('express'),
    app         = express(),
    morgan      = require('morgan'),
    express     = require('express'),
    session     = require('express-session');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);

/* 
Own database (half-size, but customisable):
  USN: GMCR
  PWD: DF1f3bYD6HKBxxRV

  mongodb+srv://GMCR:DF1f3bYD6HKBxxRV@gmcrdb-gxz2p.mongodb.net/database
*/

var port          = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip            = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    //mongoURL      = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://userBU7:uVB410wyBTMnbbul@172.30.64.238:27017/sampledb',
    mongoURLLabel = "";

var mongoURL = 'mongodb+srv://GMCR:DF1f3bYD6HKBxxRV@gmcrdb-gxz2p.mongodb.net/database';

// if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
//   var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase() || 'MONGODB',
//       mongoHost     = process.env[mongoServiceName + '_SERVICE_HOST'] || '172.30.64.238',
//       mongoPort     = process.env[mongoServiceName + '_SERVICE_PORT'] || '27017',
//       mongoDatabase = process.env[mongoServiceName + '_DATABASE'] || 'sampledb',
//       mongoPassword = process.env[mongoServiceName + '_PASSWORD'] || 'uVB410wyBTMnbbul',
//       mongoUser     = process.env[mongoServiceName + '_USER'] || 'userBU7';

//     if (mongoHost && mongoPort && mongoDatabase) {
//       mongoURLLabel = mongoURL = 'mongodb://';
//       if (mongoUser && mongoPassword) {
//         mongoURL += mongoUser + ':' + mongoPassword + '@';
//       }
//       // Provide UI label that excludes user id and pw
//       mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
//       mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
//     }
// }

// console.log('Mongo stuff:');
// console.log(' mongoServiceName: ' + mongoServiceName);
// console.log(' mongoHost: ' + mongoHost);
// console.log(' mongoPort: ' + mongoPort);
// console.log(' mongoDatabase: ' + mongoDatabase);
// console.log(' mongoPassword: ' + mongoPassword);
// console.log(' mongoUser: ' + mongoUser);
// console.log(' mongoURL: ' + mongoURL);

app.db        = null;
app.dbDetails = new Object();
app.mongodb   = null;

app.initDb = function(callback) {
  if (mongoURL == null) return;

  mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    app.db = conn;
    app.dbDetails.databaseName = app.db.databaseName;
    app.dbDetails.url = mongoURLLabel;
    app.dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

// ----------------------Middleware---------------------- //
app.use(session({
  secret: 'keyboard cat',
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false }
  })
);

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.status(500).send('Something bad happened!');
// });

// app.use(morgan('combined'))
// ------------------------------------------------------ //

var steamAuthentication  = require("./modules/steam").init(app);
var pagecounter          = require("./modules/pagecount").init(app);
var api                  = require("./modules/api").init(app);

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!app.db) {
    app.initDb(function(err){});
  }
  if (app.db) {
    var col = app.db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      if (err) {
        console.log('Error running count. Message:\n'+err);
      }
      //res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    //res.render('index.html', { pageCountMessage : null});
  }

  res.send(req.session.steamUser == null ? 'not logged in' : 'hello ' + req.session.steamUser.username).end();
});

app.listen(3000);
console.log('listening');

app.initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;



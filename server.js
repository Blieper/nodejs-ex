var express         = require('express'),
    app             = express(),
    session         = require('express-session');
    
app.engine('html', require('ejs').renderFile);

app.url = 'http://localhost:8080'

// ----------------------Middleware---------------------- //
  // Session stuff
  app.use(session({
    secret: 'seecret',
    resave: false, 
    saveUninitialized: false
  }));

  app.use(express.static(__dirname + '/../../public'));

  // Static path for css
  app.use("/style",express.static(__dirname + '/views/style/'));
  // Static path for clientside javascript
  app.use("/javascript",express.static(__dirname + '/views/javascript/'));
// ------------------------------------------------------ //

// Importing seperate files for orginisation
var steamAuthentication   = require("./modules/steam").init(app, process);
var openshift             = require("./modules/openshift").init(app, process);
var mongo                 = require("./modules/mongo").init(app);
var pagecounter           = require("./modules/pagecount").init(app);
var api                   = require("./modules/api").init(app);

// Main page
app.get('/', function (req, res) {
  if (!app.db) {
    app.initDb(function(err){});
  }

  res.render('main.html', { isLoggedIn : req.user != null});
});

//app.listen(3000);

module.exports = app ;



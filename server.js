var express         = require('express'),
    app             = express(),
    session         = require('express-session');
    
app.engine('html', require('ejs').renderFile);

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
// ------------------------------------------------------ //

// Importing seperate files for orginisation
var steamAuthentication   = require("./modules/steam").init(app);
var mongo                 = require("./modules/mongo").init(app);
var pagecounter           = require("./modules/pagecount").init(app);
var api                   = require("./modules/api").init(app);
var openshift             = require("./modules/openshift").init(app, process);

// Main page
app.get('/', function (req, res) {
  if (!app.db) {
    app.initDb(function(err){});
  }

  res.render('index.html', { loggedInMessage : req.user == null ? null : 'Hello ' + req.user.displayName});
});

app.listen(3000);

module.exports = app ;



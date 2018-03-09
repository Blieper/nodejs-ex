var express = require("express"),
  app = express(),
  session = require("express-session");

// Getting ports and return urls based on the environment
try {
  // try to find a config file, if it doesn't exist, it means the app is running on openshift and will use their settings
  var m = require("./config/networkcfg");

  app.mongoURL = "mongodb://admin:popo@ds012188.mlab.com:12188/sampledb";

  app.port = m.port;
  app.ip = "0.0.0.0";

  app.baseURL = "http://localhost:" + app.port + "/";
} catch (ex) {
  app.mongoURL =
    "mongodb://userBU7:uVB410wyBTMnbbul@172.30.64.238:27017/sampledb";
  app.baseURL =
    "http://nodejs-mongo-persistent-gmodcarregistration.193b.starter-ca-central-1.openshiftapps.com/";

  app.port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
  app.ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
}

app.engine("html", require("ejs").renderFile);

// ----------------------Middleware---------------------- //
// Session stuff
app.use(
  session({
    secret: "seecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(__dirname + "/../../public"));

// Static path for css
app.use("/style", express.static(__dirname + "/views/style/"));
// Static path for clientside javascript
app.use("/javascript", express.static(__dirname + "/views/javascript/"));
// Static path for html files
app.use("/pages", express.static(__dirname + "/views/pages/"));
// Static path for images
app.use("/img", express.static(__dirname + "/views/img/"));



// ------------------------------------------------------ //

// Importing seperate files for organisation
var openshift = require("./modules/openshift").init(app, process);
var registering = require("./modules/registering").init(app);
var socket = require("./modules/socket").init(app);
var steamAuthentication = require("./modules/steam").init(app, process);
var mongo = require("./modules/mongo").init(app);
var pagecounter = require("./modules/pagecount").init(app);
var api = require("./modules/api").init(app);

// Main page
app.get("/", function (req, res) {
  if (!app.db) {
    app.initDb(function (err) { });
  }

  res.render("main.html", { isLoggedIn: req.user != null });
});

// About page
app.get("/test", function (req, res) {
  res.render("main.html", { pagefile: 'loadquery', isLoggedIn: req.user != null });
});

// About page
app.get("/about", function (req, res) {
  res.render("about.html", { isLoggedIn: req.user != null });
});


module.exports = app;

// api stuff

exports.init = function(app) {
  let querystring = require("querystring");
  let license = require("./licensing");
  let url = require("url");

  // API page
  app.get("/apiwiki", function(req, res) {
    res.render('apiwiki.html', {isLoggedIn : req.user != null});
  });

  app.get("/api", function(req, res) {
    var params = url.parse(req.url);
    var queried = querystring.parse(params.query);
    var returnData = new Object();

    // try to initialize the db on every request if it's not already
    // initialized.
    if (!app.db) {
      app.initDb(function(err) {});
    }

    // get database
    let dbo = app.db.db("sampledb");

    let token = queried.token;

    console.log(token);

    // try to find the user in the database
    dbo
      .collection("steamusers")
      .findOne(
        { apitoken: token },
        { _id: 0, steamid: 1, apitoken: 1 },
        function(err, result) {
          if (err) throw err;

          if (result) {
            // random license
            if (queried.randlicense != undefined && queried.host != undefined) {
              returnData.license = license.generateLicenseCode(queried.host);
            }

            res.send(JSON.stringify(returnData));
          } else {
            res.send("Invalid token!");
          }
        }
      );
  });
};

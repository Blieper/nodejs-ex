// api stuff

exports.init = function (app){
    let querystring = require('querystring');
    let license     = require('./licensing');
    let url         = require('url');

    app.get('/api', function (req, res) {
        var params = url.parse(req.url);
        var queried = querystring.parse(params.query);
        var returnData = new Object();
      
        // try to initialize the db on every request if it's not already
        // initialized.
        if (!app.db) {
          app.initDb(function(err){});
        }
      
        if (queried.randlicense != undefined) {
          console.log("RL: " + queried.randlicense);
          if (queried.host != undefined) {
            console.log("host: " + queried.host);
            returnData.license = license.generateLicenseCode(queried.host);
          }
        }
   
        res.send(JSON.stringify(returnData));
    });
}
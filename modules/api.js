// api stuff

exports.init = function (app){
    let querystring = require('querystring');
    let license     = require('./licensing');
    let url         = require('url');

    app.get('/api', function (req, res) {
        var params      = url.parse(req.url);
        var queried     = querystring.parse(params.query);
        var returnData  = new Object();
      
        // try to initialize the db on every request if it's not already
        // initialized.
        if (!app.db) {
          app.initDb(function(err){});
        }
              
        // get database
        let dbo = app.db.db('db');

        let token = queried.token;

        console.log(token);

        // try to find the user in the database
        dbo.collection('users').findOne({apitoken: token}, { _id: 0, steamid: 1, apitoken: 1}, function(err, result) {
            if (err) throw err;
        
            if (result) {

              // random license
              if (queried.randlicense != undefined && queried.host != undefined) {
                  returnData.license = license.generateLicenseCode(queried.host);
              }

              res.send(JSON.stringify(returnData));    
            }else {       
              res.send("Invalid token!");            
            }
        });
    });
}
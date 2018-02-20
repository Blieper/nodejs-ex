// api stuff

exports.init = function(app) {
  let querystring = require("querystring");
  let license = require("./licensing");
  let url = require("url");

  let apiFunctions = [];

  // API page
  app.get("/apiwiki", function(req, res) {
    res.render('apiwiki.html', {isLoggedIn : req.user != null, apiFuncs: JSON.stringify(apiFunctions)});
  });

  function apiFunction (fnName, pars, description, callback) {

    let wikiObject = {
      name: fnName,
      description: description,
      parameters: []
    }

    for (i in pars) {
      let name      = pars[i].name;
      let type      = pars[i].type || 'string';
      let optional  = pars[i].optional || false; 

      wikiObject.parameters.push({
        name: name,
        type: type,
        optional: optional,
      });
    }
    
    apiFunctions.push(
      wikiObject
    );

    app.get("/api/" + fnName, function(req, res) {
      var params = url.parse(req.url);
      var queried = querystring.parse(params.query);
 
      // try to initialize the db on every request if it's not already
      // initialized.
      if (!app.db) {
        app.initDb(function(err) {});
      }
  
      // get database
      let dbo = app.db.db("sampledb");
  
      let token = queried.token;
  
      console.log('API call! ' + token);
  
      // try to find the user in the database
      dbo
        .collection("steamusers")
        .findOne(
          { apitoken: token },
          { _id: 0, steamid: 1, apitoken: 1 },
          function(err, result) {
            if (err) throw err;
  
            if (result) {
              //check parameters
              let parErr = 'Error!\n'
              let hasError = false;

              for (i in pars) {
                let name      = pars[i].name;
                let type      = pars[i].type || 'string';
                let optional  = pars[i].optional || false; 

                //find in query
                let inQuery = queried[name];

                if (!optional && inQuery == undefined) {
                  parErr += '\tRequired parameter \'' + name + '\' not found!';
                  hasError = true;
                  continue;
                }

                if (type == "numeric" && Number(inQuery) == NaN) {
                  parErr += '\tParameter \'' + name + '\' expected a numeric value, but got a string value instead!\n';
                  hasError = true;
                }

                if (type == "nonnum" && !(Number(inQuery) !== Number(inQuery))) {
                  parErr += '\tParameter \'' + name + '\' expected a non-numeric value, but got a numeric value instead!\n';
                  hasError = true;
                }                
              }

              if (hasError) {
                res.send(parErr);
                return;
              }

              callback(queried,res);
            } else {
              res.send("Invalid token!");
            }
          }
        );
    });    
  }

  // random license
  apiFunction('randlicense',[
    {name: 'host', type: 'nonnum'},
    {name: 'test', type: 'string', optional: true},
    
  ],
  'Returns a random license based on the region of \'host\' and the current year.'
  ,function (queried,res) {
    let returnData = {};
    returnData.license = license.generateLicenseCode(queried.host);
    res.send(JSON.stringify(returnData));
  });
};

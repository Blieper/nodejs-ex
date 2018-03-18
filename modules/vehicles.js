exports.init = function (app) {
    let querystring = require("querystring");
    let license = require("./licensing");
    let url = require("url");

    let apiFunctions = [];

    app.get("/browse", function (req, res) {
        var params = url.parse(req.url);
        var queried = querystring.parse(params.query);

        // try to initialize the db on every request if it's not already
        // initialized.
        if (!app.db) {
            app.initDb(function (err) { });
        }

        // get database
        let dbo = app.db.db("sampledb");

        let license = queried.license;

        console.log(license);

        // try to find the user in the database
        dbo.collection("vehicles").findOne({ license: license }, { 
            _id: 0, 
            name: 1,
            description: 1,
            region: 1,
            country: 1,
            tags: 1,
            images: 1,
            coowners: 1,
            specs: 1,
            license: 1
        },
            function (err, result) {
                if (err) throw err;

                if (result) {
                    res.render('main.html', { 
                        pagefile: 'vehicle/vehicle', 
                        isLoggedIn: req.user != null, 
                        requser: JSON.stringify(req.user), 
                        extra: JSON.stringify(result) 
                    });
                } else {
                    res.send("Not found!");
                }
            }
        );
    });

}
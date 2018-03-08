// steam authentication

exports.init = function (app, process) {
    let passport = require('passport'),
        passport_steam = require('passport-steam'),
        token = require('./token'),
        SteamStrategy = passport_steam.Strategy;
        server = require('http').createServer(app),
        request = require('request');

    console.log(app.port);

    server.listen(app.port, app.ip, function () { // or define ip and port manually   
        var io = require('socket.io')(server);

        io.on("connection", socket => {
            console.log("User connected! (" + socket + ")")

            socket.on("change_token", currentToken => {
                // get database
                let dbo = app.db.db('sampledb');

                // try to find the user in the database
                dbo.collection('steamusers').findOne({ apitoken: currentToken }, { _id: 0, steamid: 1, apitoken: 1 }, function (err, result) {
                    if (err) throw err;

                    if (result) {
                        // Make a unique document for the new user
                        console.log('User found! Changing token...');

                        // generate a unique api token for the user
                        generateUniqueToken(token.generateToken(), function (newtoken) {
                            var query = { apitoken: currentToken };
                            var newvalues = { $set: { apitoken: newtoken } };

                            dbo.collection("steamusers").updateOne(query, newvalues, function (err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                console.log(currentToken + " -> " + newtoken);
                            });

                            socket.emit("get_new_token", newtoken);
                        });
                    } else {
                        // Don't do anything if the user is not found
                        console.log('User not found!');
                    }
                });
            })

            socket.on("register_vehicle", data => {
                console.log(JSON.stringify(data));

                let hasError = false;
                let errorObject = {};

                request({
                    uri: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=10B1849DB0B2137A8F84489F2B570AA9&steamids=' + data.coowners.join(),
                    method: 'GET',
                    json: true
                }, function (error, response, body) {
                    if (error) console.log(error);
                    else {
                        let players = body.response.players;
                        let idsCopy = data.coowners.slice();

                        for (pl of players) {
                            let id = pl.steamid;

                            for (i in idsCopy) {
                                if (id === idsCopy[i]) {
                                    idsCopy.splice(i, 1);
                                }
                            }
                        }

                        if (idsCopy.length > 0) {
                            hasError = true;
                            errorObject.invalidSteamids = [];
                        }

                        for (id of idsCopy) {
                            errorObject.invalidSteamids.push(id);
                        }

                        if (data.region == "nothing" || !data.region) {
                            hasError = true;
                            errorObject.region = "invalid";
                        }

                        if (data.country == "nothing" || !data.country) {
                            hasError = true;
                            errorObject.country = "invalid";
                        }

                        if (data.name.length == 0) {
                            hasError = true;
                            errorObject.name = "invalid";
                        }                        

                        if (hasError) {
                            socket.emit("register_error", errorObject);
                        } else {
                            // Succesful register
                        }
                    }
                });
            })
        });
    });

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete Steam profile is serialized
    //   and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // Use the SteamStrategy within Passport.
    //   Strategies in passport require a `validate` function, which accept
    //   credentials (in this case, an OpenID identifier and profile), and invoke a
    //   callback with a user object.

    console.log('return url: ' + app.baseURL);

    passport.use(new SteamStrategy({

        returnURL: app.baseURL + 'auth/steam/return',
        realm: app.baseURL,
        apiKey: '10B1849DB0B2137A8F84489F2B570AA9'
    },
        function (identifier, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Steam profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Steam account with a user record in your database,
                // and return that user instead.
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    ));

    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }

    function generateUniqueToken(testToken, callback) {
        // get database
        let dbo = app.db.db('sampledb');

        // try to find 'testToken'
        dbo.collection('tokens').findOne({ apitoken: testToken }, { _id: 0, token: 1 }, function (err, result) {
            if (err) throw err;

            if (result) {
                // tested token exists, try to make a new one
                console.log('Found existing token!')
                testToken = token.generateToken();

                generateUniqueToken(testToken, callback);
            } else {
                console.log('Made unique token!')

                // tested token is unique; fire callback with the new token
                callback(testToken);
            }
        });
    }

    app.get('/account', ensureAuthenticated, function (req, res) {
        // get database
        let dbo = app.db.db('sampledb');

        // get the user's steamid
        let userSteamId = req.user._json.steamid;

        // try to find the user in the database
        dbo.collection('steamusers').findOne({ steamid: userSteamId }, { _id: 0, steamid: 1, apitoken: 1 }, function (err, result) {
            if (err) throw err;

            if (result) {
                res.render('account.html', {
                    isLoggedIn: req.user !== null,
                    loggedInMessage: req.user == null ? null : 'Hello ' + req.user.displayName,
                    APIToken: result.apitoken
                });
            }
        });
    });

    // Register page
    app.get("/register", ensureAuthenticated, function (req, res) {
        res.render('main.html', { pagefile: 'register', isLoggedIn: req.user != null});
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // GET /auth/steam
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Steam authentication will involve redirecting
    //   the user to steamcommunity.com.  After authenticating, Steam will redirect the
    //   user back to this application at /auth/steam/return
    app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
        res.redirect('/');
    });

    // GET /auth/steam/return
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
        let dbo = app.db.db('sampledb');

        // get the user's steamid
        let userSteamId = req.user._json.steamid;

        // try to find the user in the database
        dbo.collection('steamusers').findOne({ steamid: userSteamId }, { _id: 0, steamid: 1, apitoken: 1 }, function (err, result) {
            if (err) throw err;

            if (result) {
                // Don't do anything if the user is found
                console.log('User found! ' + JSON.stringify(result));
            } else {
                // Make a unique document for the new user
                console.log('New user found! Creating documents...');

                // generate a unique api token for the user
                generateUniqueToken(token.generateToken(), function (newtoken) {
                    let doc = {
                        steamid: userSteamId,
                        apitoken: newtoken
                    }

                    dbo.collection('steamusers').insertOne(doc, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted: \n" + res);
                    });
                });
            }
        });

        res.redirect('/');
    });
}
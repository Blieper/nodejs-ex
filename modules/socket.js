// socket io stuff

exports.init = function (app, process) {
    let token = require('./token'),
        server = require('http').createServer(app),
        request = require('request');

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
                        token.generateUniqueToken(token.generateToken(), app, function (newtoken) {
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

            socket.on("request_regions", data => {
                regions = [
                    {text: 'Cre8ive', value: 'Cre8ive'},
                    {text: 'Daemon Effect', value: 'Daemon Effect'},
                    {text: 'Vehicle Heaven', value: 'Vehicle Heaven'},
                    {text: 'Genesis Build', value: 'Genesis Build'},        
                ];

                socket.emit('get_regions', regions);
            });

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
}
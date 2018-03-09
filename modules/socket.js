// socket io stuff

exports.init = function (app, process) {
    let token = require('./token'),
        server = require('http').createServer(app),
        request = require('request');

    let countries = "Afghanistan, Albania, Algeria, Andorra, Angola, Antigua & Deps, Argentina, Armenia, Australia, Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, Belgium, Belize, Benin, Bhutan, Bolivia, Bosnia Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina, Burma, Burundi, Cambodia, Cameroon, Canada, Cape Verde, Central African Rep, Chad, Chile, People's Republic of China, Republic of China, Colombia, Comoros, Democratic Republic of the Congo, Republic of the Congo, Costa Rica,, Croatia, Cuba, Cyprus, Czech Republic, Danzig, Denmark, Djibouti, Dominica, Dominican Republic, East Timor, Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Estonia, Ethiopia, Fiji, Finland, France, Gabon, Gaza Strip, The Gambia, Georgia, Germany, Ghana, Greece, Grenada, Guatemala, Guinea, Guinea-Bissau, Guyana, Haiti, Holy Roman Empire, Honduras, Hungary, Iceland, India, Indonesia, Iran, Iraq, Republic of Ireland, Israel, Italy, Ivory Coast, Jamaica, Japan, Jonathanland, Jordan, Kazakhstan, Kenya, Kiribati, North Korea, South Korea, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Macedonia, Madagascar, Malawi, Malaysia, Maldives, Mali, Malta, Marshall Islands, Mauritania, Mauritius, Mexico, Micronesia, Moldova, Monaco, Mongolia, Montenegro, Morocco, Mount Athos, Mozambique, Namibia, Nauru, Nepal, Newfoundland, Netherlands, New Zealand, Nicaragua, Niger, Nigeria, Norway, Oman, Ottoman Empire, Pakistan, Palau, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Poland, Portugal, Prussia, Qatar, Romania, Rome, Russian Federation, Rwanda, St Kitts & Nevis, St Lucia, Saint Vincent & the, Grenadines, Samoa, San Marino, Sao Tome & Principe, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, Solomon Islands, Somalia, South Africa, Spain, Sri Lanka, Sudan, Suriname, Swaziland, Sweden, Switzerland, Syria, Tajikistan, Tanzania, Thailand, Togo, Tonga, Trinidad & Tobago, Tunisia, Turkey, Turkmenistan, Tuvalu, Uganda, Ukraine, United Arab Emirates, United Kingdom, United States of America,  Uruguay, Uzbekistan, Vanuatu, Vatican City, Venezuela, Vietnam, Yemen, Zambia, Zimbabwe";

    // Formatting country list
    app.countryList = [];
    countries = countries.split(',');

    for (i of countries) {
        app.countryList.push({ text: i.trim(), value: i.trim() });
    }

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

            socket.on("request_registerdata", data => {
                regions = [
                    { text: 'Cre8ive', value: 'Cre8ive' },
                    { text: 'Daemon Effect', value: 'Daemon Effect' },
                    { text: 'Vehicle Heaven', value: 'Vehicle Heaven' },
                    { text: 'Genesis Build', value: 'Genesis Build' },
                ];

                socket.emit('get_registerdata', {regions: regions, countries: app.countryList});
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

                        if (data.country == "nothing" || !data.country || countryList.indexOf(data.country) > -1) {
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

exports.generateToken = function () {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

    return token;
}

exports.generateUniqueToken = function (testToken, app, callback) {
    // get database
    let dbo = app.db.db('sampledb');

    // try to find 'testToken'
    dbo.collection('tokens').findOne({ apitoken: testToken }, { _id: 0, token: 1 }, function (err, result) {
        if (err) throw err;

        if (result) {
            // tested token exists, try to make a new one
            console.log('Found existing token!')
            testToken = generateToken();

            generateUniqueToken(testToken, callback);
        } else {
            console.log('Made unique token!')

            // tested token is unique; fire callback with the new token
            callback(testToken);
        }
    });
}

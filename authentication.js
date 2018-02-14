const crypto = require('crypto');

exports.createUserDatabase = function (db, dbname) {
    let dbo = db.db(db.databaseName);

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}

exports.registerAndCheckUser = function (db, id, password) {
    let dbo = db.db(db.databaseName);
    let foundUsers;
    let userExists = false;

    // find user 
    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        foundUsers = result;
    });

    if (foundUsers) {
        userExists = foundUsers.find(function(element){
            return element.steamid == id && element.pwd == password;
        });

        if (!userExists) {  
            dbo.collection("users").insertOne({steamid: id, pwd: password}, function(err, res) {
                if (err) throw err;
                console.log("User: " + id + " added!");
            });
        } else {
            console.log("User: " + id + " already exists!");
        }
    }

    return userExists;
}


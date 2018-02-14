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
    let foundUsers = [];
    let userExists = false;
    let user;

    // find user 
    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;

        console.log("1 Found users: " + result);

        for (t in result) {
            foundUsers.push(t);
        }
    });

    console.log("Found users: " + foundUsers);

    if (foundUsers.length > 0) {
        userExists = foundUsers.find(function(element){
            user = element;
            return element.steamid == id;
        });

        console.log("Found user: " + user.steamid);

        if (!userExists) {  
            dbo.collection("users").insertOne({steamid: id, pwd: password}, function(err, res) {
                if (err) throw err;
                console.log("User: " + id + " added!");
            });
        } else {
            console.log("User: " + id + " already exists!");
        }
    }else{
        dbo.collection("users").insertOne({steamid: id, pwd: password}, function(err, res) {
            if (err) throw err;
            console.log("No users found! User: " + id + " added!");
        });
    }

    return user;
}


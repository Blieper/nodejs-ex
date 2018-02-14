const crypto = require('crypto');

exports.createUserDatabase = function (db, dbname) {
    let dbo = db.db(db.databaseName);

    dbo.collection("users").dropDatabase();

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}

exports.registerAndCheckUser = function (db, id, password) {
    let dbo = db.db(db.databaseName);
    let userExists = false;
    let user;

    // find user 
    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            userExists = result.find(function(element){
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
    });


    return user;
}


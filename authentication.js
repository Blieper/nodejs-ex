const crypto = require('crypto');

exports.createUserDatabase = function (db, dbname) {
    let dbo = db.db(db.databaseName);

    dbo.collection("users").drop();

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}

exports.registerAndCheckUser = function (db, id, password, res, query) {
    let dbo = db.db(db.databaseName);

    // find user 
    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;

        let userExists = false;
        let user;

        if (result.length > 0) {
            userExists = result.find(function(element){
                user = element;
                return element.steamid == id;
            });
    
            console.log("Found user: " + user.steamid);
    
            if (!userExists) {  
                dbo.collection("users").insertOne({steamid: id, pwd: password}, function(err, result) {
                    if (err) throw err;
                    console.log("User: " + id + " added!");
                });
            } 
        }else{
            dbo.collection("users").insertOne({steamid: id, pwd: password}, function(err, result) {
                if (err) throw err;
                console.log("No users found! User: " + id + " added!");
            });
        }
   
        if (user != undefined) {
            if (user.pwd == query.pw) {
                console.log("Login succesful!");

                var returnData = new Object();

                res.send(JSON.stringify(returnData));
            }else{
                console.log("Steamid and password do not match!");
                res.send("Steamid and password do not match!");
            }
        }
    });
}


const crypto = require('crypto');

exports.createUserDatabase = function (db, dbname) {
    let dbo = db.db(db.databaseName);

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}

exports.registerUser = function (db, id, password) {
    let dbo = db.db(db.databaseName);

    if (!dbo.getUser(id)) {
        dbo.createUser(
            {
                user: id,
                pwd: password,
                // roles: [
                //     { role: "read", db: "reporting" },
                //     { role: "read", db: "products" },
                //     { role: "read", db: "sales" },
                //     { role: "readWrite", db: "accounts" }
                // ]
            }
        )

        console.log("User: " + id + " added!");
    } else {
        console.log("User: " + id + " already exists!");
    }
}



exports.createUserDatabase = function (db, dbname) {
    let dbo = db.db(db.databaseName);

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}
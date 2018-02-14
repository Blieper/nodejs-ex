
exports.createUserDatabase = function (db) {
    let dbo = db.db(mongoDatabase);

    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User collection created!");
    });
}
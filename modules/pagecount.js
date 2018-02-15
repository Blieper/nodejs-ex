// stupid necessary pagecount shit

exports.init = function (app){
    app.get('/pagecount', function (req, res) {
        if (!app.db) {
            app.initDb(function(err){});
        }
        if (app.db) {
            app.db.collection('counts').count(function(err, count ){
                res.send('{ pageCount: ' + count + '}');
            });
        } else {
            res.send('{ pageCount: -1 }');
        }
    });
}
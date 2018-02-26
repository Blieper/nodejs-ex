// api stuff

exports.init = function (app) {
    let querystring = require("querystring");
    let license = require("./licensing");
    let url = require("url");

    // Register page
    app.get("/register", function (req, res) {
        res.render('register.html', { isLoggedIn: req.user != null});
    });
};

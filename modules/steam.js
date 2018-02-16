// steam authentication

exports.init = function (app){
    steam = require('steam-login');

    app.use(steam.middleware({
        realm:  'localhost:8080', 
        verify: 'localhost:8080/verify',
        apiKey: '3E1190FDDEE75FCC8A5DA2650A07E06E'
        })
      );

    app.get('/authenticate', steam.authenticate(), function(req, res) {
        res.redirect('/');
    });
    
    app.get('/verify', steam.verify(), function(req, res) {
        res.send(res.session.steamUser);
    });
    
    app.get('/logout', steam.enforceLogin('/'), function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
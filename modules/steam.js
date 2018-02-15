// steam authentication

exports.init = function (app){
    steam       = require('steam-login');

    app.use(steam.middleware({
        realm:  'http://localhost:8080', 
        verify: 'http://localhost:8080' + '/verify',
        apiKey: '4F0EB4E0843A507321AFAA139C6FEB9A',
        useSession: true
        })
      );

    app.get('/authenticate', steam.authenticate(), function(req, res) {
        res.redirect('/');
    });
    
    app.get('/verify', steam.verify(), function(req, res) {
        res.send(req.session.steamUser).end();
    });
    
    app.get('/logout', steam.enforceLogin('/'), function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
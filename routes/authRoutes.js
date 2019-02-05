const passport = require('passport');
//Route Handlers

module.exports = (app) =>{
//google has an internal identifier 'google' string
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),

    ); 
//kills the cookie and logs outs, when user accesses this route
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    });

    // app.get('/auth/facebook', passport.authenticate('facebook'),
    // );

    // app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    // )

    // app.get('/privacy', passport.authenticate('facebook '),
    
    // );

    // app.get('/terms', passport.authenticate('facebook '),
    
    // );

};
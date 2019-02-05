const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FBStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users')


//user.id references auto generated Mongo ID
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//The first argument of deserializeUser corresponds to the key of the user object that was given to the done function user.id 
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then (user => {done(null, user);
    })
});

passport.use( 
    new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //google strategy does not trust proxy, will revert from https => http:// w/o proxy true
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id})
        .then((existingUser) => {
            if(existingUser){
                // if we have record of user
                done(null, existingUser);
                } else {
                new User ({ googleID: profile.id})
                .save()
                // if we do not
                .then(user => done(null, user));
                }
            });
        }
    )
);

// passport.use(
//     new FBStrategy(
//     {
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: '/auth/facebook/callback'
//     },
//     (accessToken, refreshToken, profile, cb) => {
//         User.findOrCreate ({ facebookID: profile.id}, (err, user) =>
//             cb(err, user));
            
//         }
//     )
// );

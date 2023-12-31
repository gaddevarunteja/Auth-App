const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
    // TODO - create new ClientID
        clientID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
        clientSecret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    }, async function(accessToken, refreshToken, profile, done) {
        let user = await User.findOne({email: profile.emails[0].value});

        if (user){
            // if found, set this user as req.user
            return done(null, user);
        } else {
            // if not found, create the user and set it as req.user
            let user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, user);
        }
    } 
));

module.exports = passport;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async function(req, email, password, done) {
        try {
            let user = await User.findOne({email: email}); 
            if(!user || password != user.password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user); 
        } catch(err) {
            if(err) {
                req.flash('error', err);
                return done(err);
            }
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch(err) {
        if(err) {
            return done(err);
        }
    }
});

passport.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
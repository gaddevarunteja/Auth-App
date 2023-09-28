const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async function(req, email, password, done) {
        let user = await User.findOne({email: email});
        //  function(err, user) {
        //     if(err) {
        //         console.log('Error in finding user through passport');
        //         return done(err);
        //     } 
        if(!user || password != user.password) {
            // console.log('Invalid user/password');
            return done(null, false);
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    let user = await User.findById(id);
    //  function(err, user) {
    //     if(err) {
    //         console.log('Error in finding user through passport');
    //         return done(err);
    //     }
    return done(null, user);
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
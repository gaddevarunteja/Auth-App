const User = require("../models/user");

// render sign up page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'AuthApp | Sign Up'
    });
};

// render sign in page
module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in', {
        title: 'AuthApp | Sign In'
    });
};

// render profile page
module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'AuthApp | Profile'
    })
};

module.exports.create = async function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        req.flash('error', 'passwords dont match');
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user) {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            req.flash('success', 'You have signed up successfully');
            return res.redirect('/users/sign-in');
        } else {
            req.flash('success', 'User already exists');
            res.redirect('back');
        }
    } catch(err) {
        if(err) {
            req.flash('error', err);
            return;
        }
    }
}

module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    });
}
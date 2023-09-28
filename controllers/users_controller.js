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
        return res.redirect('back');
    }
    let user = await User.findOne({email: req.body.email});
    // function(err, user) {
    //     if(err) {
    //         console.log('Error in finding the password');
    //         return;
    //     }
    if(!user) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        // , function(err, user) {
        //     if(err) {console.log('error in creating user'); return;}
        return res.redirect('/users/sign-in');
    } else res.redirect('back');
}

module.exports.createSession = function(req, res) {
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
        if(err) {next(err);}
        return res.redirect('/');
    });
}
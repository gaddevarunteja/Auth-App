// render sign up page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'AuthApp | Sign Up'
    });
};

// render sign in page
module.exports.signIn = function(req, res) {
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

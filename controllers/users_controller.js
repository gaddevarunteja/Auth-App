module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'AuthApp | Sign Up'
    });
};

module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'AuthApp | Sign In'
    });
};

module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'AuthApp | Profile'
    })
};

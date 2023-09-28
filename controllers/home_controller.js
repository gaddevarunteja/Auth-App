// render home page
module.exports.index = function(req, res) {
    return res.render('home', {
        title: 'Home'
    });
};
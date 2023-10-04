// render home page
module.exports.index = function(req, res) {
    return res.render('home.ejs', {title: 'Home'});
};
const homeView = (req, res) => {
    res.render('pages/home', {
        user: req.session.user
    });
};

module.exports = {
    homeView
};
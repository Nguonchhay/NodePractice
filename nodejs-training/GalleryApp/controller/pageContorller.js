const homeView = (req, res) => {
    res.render('pages/home', {
        user: req.session.user,
        pageTitle: 'Home'
    });
};

const contactView = (req, res) => {
    res.render('pages/contact', {
        user: req.session.user,
        pageTitle: 'Contact'
    })
}

module.exports = {
    homeView,
    contactView
};
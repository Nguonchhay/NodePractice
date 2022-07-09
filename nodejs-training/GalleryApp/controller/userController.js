const loginView = (req, res) => {
    res.render('pages/auth/login', {
        layout: 'layouts/auth'
    });
};

const postLogin = (req, res) => {
    req.session.user = {
        id: 1,
        name: "Dummy",
    };
    res.redirect('/');
};

const registerView = (req, res) => {
    res.render('pages/auth/register', {
        layout: 'layouts/auth'
    });
}

module.exports = {
    loginView,
    postLogin,
    registerView
};
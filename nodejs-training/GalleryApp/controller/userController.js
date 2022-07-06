const loginView = (req, res) => {
    res.render('pages/auth/login', {
        layout: 'layouts/auth'
    });
};

const registerView = (res, req) => {
    res.render('pages/auth/register', {});
}

module.exports = {
    loginView,
    registerView
};
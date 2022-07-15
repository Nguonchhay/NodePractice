const userModel = require('./../models/User');

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

const usersView = (req, res) => {
    userModel.list()
        .then(([rows]) => {
            res.render('pages/users/index', {
                user: null,
                pageTitle: 'Users',
                users: rows
            });
        })
        .catch(err => console.log(err));
};

module.exports = {
    loginView,
    postLogin,
    registerView,
    usersView
};
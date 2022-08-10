const passport = require('passport');

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

const usersPgView = (req, res) => {
    userModel.listPg()
        .then(result => {
            res.render('pages/users/index', {
                user: null,
                pageTitle: 'Users',
                users: result.rows
            });
        })
        .catch(err => console.log(err));
};

// Social Google login
const loginGoogle = (req, res) => {
    console.log('Start Google authentication request...');
    passport.authenticate('google', { scope: ['profile']});
};

const loginGoogleCallback = (req, res) => {
    res.render('pages/users/index', {
        layout: 'layouts/auth'
    });
};

module.exports = {
    loginView,
    postLogin,
    registerView,
    usersView,
    usersPgView,
    loginGoogle,
    loginGoogleCallback
};
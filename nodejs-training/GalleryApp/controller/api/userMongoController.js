const User = require('./../../models_mongoose/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./../../passports/LocalStrategyMongo')(passport);

const register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true, 
                user
            });
        }
    });
};

const login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.json({
                success: false,
                messsage: err
            });
        }

        if (!user) {
            return res.json({
                success: false,
                message: 'Email or password are invalid!'
            });
        }

        req.login(user, async (err) => {
            if (err) {
                res.json({
                    success: false,
                    messsage: err
                });
            }
            const secretkey = 'secretkey';
            const token = await jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                secretkey,
                { expiresIn: '5m' }
            );

            res.json({
                success: true,
                token
            });
        });
    })(req, res);
};

const show = (req, res) => {
    res.json({
        user: req.user
    });
}

const changePassword = (req, res) => {
    User.findOne({ _id: req.user.id }, (err, queryUser) => {
        if (err) {
            res.json({ success: false, message: 'User does not exist!' });
        }

        queryUser.changePassword(req.body.password, req.body.newPassword, (err) => {
            if(err) {
                if (err.name === 'IncorrectPasswordError') {
                    res.json({ success: false, message: 'Incorrect password' });
                } else {
                    res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                }
            } else {
                res.json({ success: true, message: 'Your password has been changed successfully' });
            }
        });
    });
}

const logout = async (req, res) => {
    req.logout(err => {
        if (err) { 
            res.json(err);
        }
        res.json({
            message: 'User is logout successfully'
        });
    });
}


module.exports = {
    login,
    register,
    show,
    changePassword,
    logout
}
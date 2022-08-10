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
            res.json({
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
                { expiresIn: '24h'}
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

module.exports = {
    login,
    register,
    show
}
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { initPassportWithJwt } = require('./../../passports/JwtStrategyPostgres');

initPassportWithJwt(passport);

const login = (req, res, next) => {
    passport.authenticate('login', { session: false }, async (err, user, info) => {
        if (err) {
            res.json({
                success: false,
                error: 'Invalid credentials'
            });
        } else {
            const secretkey = 'secretkey';
            const token = await jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                },
                secretkey,
                { expiresIn: '10m' }
            );
    
            res.json({
                success: true,
                token
            });
        }
    })(req, res, next);
};

const register = (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (err) {
            res.json({
                success: false,
                error: 'User already exist!'
            });
        } else {
            res.json({
                success: true,
                user
            });
        }
    })(req, res, next);
}

const show = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}

module.exports = {
    login,
    register,
    show
};
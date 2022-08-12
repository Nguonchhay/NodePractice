const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');

const initPassportWithJwt = (passport) => {

    // Passport for register user
    passport.use(
        'register',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
                session: false
            },
            async (req, email, password, done) => {
                try {
                    User.findOne(
                        {
                            where: {
                                email
                            }
                        }
                    ).then(user => {
                        if (user) {
                            done(true, null, 'User already exist!');
                        } else {
                            const salt = bcryptjs.genSaltSync(10);
                            const hashPassword = bcryptjs.hashSync(password, salt);
                            User.create(
                                {
                                    email,
                                    password: hashPassword,
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name
                                }
                            ).then(user => {
                                done(null, user, { message: 'User is register successfully' })
                            })
                            .catch(err => {
                                done(null, err, { message: 'Something went wrong!' });
                            });
                        }
                    });
                } catch(err) {
                    console.log(err);
                }
            }
        )
    );

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false
            },
            async (email, password, done) => {
                User.findOne(
                    {
                        where: {
                            email
                        }
                    }
                ).then(user => {
                    if (!user) {
                        done(true, null, { message: 'Invalid email' });
                    } else {
                        if (bcryptjs.compareSync(password, user.password)) {
                            done(false, user, { message: 'Login success' });
                        } else {
                            done(true, null, { message: 'Invalid password' });
                        }
                    }
                });
            }
        )
    );

    passport.use(
        'jwt',
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey   : 'secretkey'
            },
            async (payload, done) => {
                return User.findOne(
                    {
                        where: {
                            email: payload.email
                        }
                    }
                ).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Invalid credentials' });
                    }
                    return done(null, user, { message: 'Valid credentials' })
                })
                .catch(err => {
                    return done(true, null, { message: 'Something went wrong on jwt' });
                });
            }
        )
    );
}

module.exports = {
    initPassportWithJwt
}
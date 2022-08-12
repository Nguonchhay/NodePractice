const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

    // General JWT protection
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

    // Passport with Google login
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
            state: true
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Profile => ', profile.emails);
            try {
                User.findOne(
                    {
                        where: {
                            email: profile.emails[0].value
                        }
                    }
                ).then(user => {
                    if (user) {
                        console.log('User existed');
                        return done(null, user);
                    } else {
                        console.log('New user');
                        User.create(
                            {
                                email: profile.emails[0].value,
                                password: accessToken,
                                first_name: profile.name.givenName,
                                last_name: profile.name.familyName
                            }
                        ).then(user => {
                            return done(null, user)
                        })
                        .catch(err => {
                            return done(err);
                        });
                    }
                });
            } catch(err) {
                console.log('Catch', err);
                return done(err);
            }
        }
    ));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
}

module.exports = {
    initPassportWithJwt
}
//const LocalStrategy = require('passport-local').Strategy;
const User = require('../models_mongoose/User');


module.exports = (passport) => {

    passport.use(User.createStrategy());
    //passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
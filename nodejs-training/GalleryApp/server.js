const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const mongoose = require("mongoose");

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const app = express();

// Define environment with .env
require('dotenv').config();

// Session
app.use(expressSession({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000 // 1 hour
    }
}));

// Configure form data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport with Google login
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile'],
        state: true
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log('Google call back');
        console.log('accessToken => ', accessToken);
        console.log('refreshToken => ', refreshToken);
        console.log('profile => ', profile);
    }
));

app.use(passport.initialize());
app.use(passport.session());


// Render static assets
app.use(express.static('public'));

// Configure view engine
app.use(expressLayouts)
app.set('layout', './layouts/app');
app.set('view engine', 'ejs');
app.set('views', 'views');

// Configure routes
require('./routes/index')(app);
//app.use('/api', require('./routes/api/user'));

// Configure API docs
require('./docs')(app);

// Sync defined table to table in database
// const sequelize = require('./services/SequelizePostgres');
// const Product = require('./models/Product');
// const Category = require('./models/Category');
// const Post = require('./models/Post');

// Post.belongsTo(Category, { constraints: true, onDelete: 'CASCADE'});
// Category.hasMany(Post);

// sequelize
//     .sync({ force: true })
//     .then(result => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => console.log(err));

// sequalizeMysql.sync({ force: true });
// const sequalizeMysql = require('./services/SequalizeMysql');

//const { sequelize } = require('./models/index');

const conn_str = 'mongodb+srv://admin:admin12345@attractionapp.ld0iq.mongodb.net/galleryapp?retryWrites=true&w=majority'
mongoose.connect(
    conn_str,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("mongodb is connected");
        }
    }
);

const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
    //await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`);
});
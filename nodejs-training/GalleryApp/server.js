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

switch (process.env.DB_CONNECTION) {
    case 'postgres':
        const { sequelize } = require('./models/index');
        sequelize.authenticate()
            .then(() => {
                console.log("PostgreSQL is connected");
            })
            .catch(err => {
                console.log(err);
            });
        break;
    case 'mongo':
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
                    console.log("Mongodb is connected");
                }
            }
        );
        break;
    default:
        console.log('No Database connection was specify!');
}


const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
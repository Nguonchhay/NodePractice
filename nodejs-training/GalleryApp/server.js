const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');

const app = express();
const PORT = process.env.PORT || 3003;

// Session
app.use(expressSession({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 // 1 hour
    }
}));

// Configure form data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3003;

// Configure form data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure view engine
app.set('view engine', 'ejs');

// Configure routes
require('./routes/index')(app);
//app.use('/api', require('./routes/api/user'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
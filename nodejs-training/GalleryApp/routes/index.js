const userRoute = require('./web/user');
const categoryRotue = require('./web/category');

const userApiRoute = require('./api/user');

const routes = app => {
    app.get('/', (req, res) => {
        res.render('pages/home');
    });
 
    app.use('/users', userRoute);
    app.use('/categories', categoryRotue);

    app.use('/api', userApiRoute);
}

module.exports = routes
const pageRoute = require('./web/page');
const userRoute = require('./web/user');
const categoryRotue = require('./web/category');

const userApiRoute = require('./api/user');

const routes = app => {
    app.use('/', pageRoute);
    app.use('/users', userRoute);
    app.use('/categories', categoryRotue);

    app.use('/api', userApiRoute);
}

module.exports = routes
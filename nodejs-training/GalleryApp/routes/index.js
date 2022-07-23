const pageRoute = require('./web/page');
const userRoute = require('./web/user');
const categoryRotue = require('./web/category');

const userApiRoute = require('./api/user');
const productApiRoute = require('./api/product');

const routes = app => {
    app.use('/', pageRoute);
    app.use('/users', userRoute);
    app.use('/categories', categoryRotue);

    app.use('/api', userApiRoute);
    app.use('/api', productApiRoute);
}

module.exports = routes
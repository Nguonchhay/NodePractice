const pageRoute = require('./web/page');
const userRoute = require('./web/user');
const categoryRotue = require('./web/category');

const userApiRoute = require('./api/user');
const userMongoApiRoute = require('./api/userMongo');
const productApiRoute = require('./api/product');
const categoryApiRoute = require('./api/category');
const saleApiRoute = require('./api/sale');

const routes = app => {
    app.use('/', pageRoute);
    app.use('/users', userRoute);
    app.use('/categories', categoryRotue);

    app.use('/api', userApiRoute);
    app.use('/api', userMongoApiRoute);
    app.use('/api', categoryApiRoute);
    app.use('/api', productApiRoute);
    app.use('/api', saleApiRoute);
}

module.exports = routes
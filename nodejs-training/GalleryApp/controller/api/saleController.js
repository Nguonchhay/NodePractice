const { Sale, Product, User } = require('./../../models');

const list = (req, res) => {
    Sale.findAll({
        include: [
            {
                model: Product,
                as: 'product'
            },
            {
                model: User,
                as: 'user'
            }
        ],
        attributes: {
            exclude: ['user_id']
        }
    })
    .then(sales => res.json(sales))
    .catch(err => res.json(err));
};

const rawList = (req, res) => {
    Sale.getRawSales()
    .then(([rows]) => res.json(rows))
    .catch(err => res.json(err));
};

module.exports = {
    list,
    rawList
};